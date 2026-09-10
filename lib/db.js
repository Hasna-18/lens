import { Pool } from 'pg';
import { slugify, generateUniqueSlug } from './slug.js';

let pool = globalThis._pgPool;

function getPool() {
  if (!pool) {
    const connStr = process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : null;
    if (!connStr) {
      throw new Error("DATABASE_URL is not set.");
    }
    pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 30000,
      max: 10
    });
    if (process.env.NODE_ENV !== 'production') {
      globalThis._pgPool = pool;
    }
  }
  return pool;
}

// Ensure tables & columns exist before querying
let tablesEnsured = false;
async function ensureTablesExist() {
  if (tablesEnsured) return;
  const currentPool = getPool();
  try {
    // 1. Events table & columns
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        date_day VARCHAR(255) NOT NULL,
        date_month VARCHAR(255) NOT NULL,
        date_year VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT,
        image_url TEXT NOT NULL,
        filter_type VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE events ADD COLUMN IF NOT EXISTS details JSONB;
      ALTER TABLE events ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
    `);

    // 2. News table & columns
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        tag VARCHAR(100),
        category VARCHAR(100),
        title VARCHAR(255),
        "desc" TEXT,
        date VARCHAR(100),
        image_url VARCHAR(500)
      );
      ALTER TABLE news ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
      ALTER TABLE news ADD COLUMN IF NOT EXISTS details JSONB;
      ALTER TABLE news ADD COLUMN IF NOT EXISTS author VARCHAR(100);
      ALTER TABLE news ADD COLUMN IF NOT EXISTS read_time VARCHAR(50);
      CREATE UNIQUE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
    `);

    // 3. Resources table & columns
    await currentPool.query(`
      CREATE TABLE IF NOT EXISTS resources (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(100),
        type VARCHAR(100),
        size VARCHAR(50),
        "desc" TEXT,
        date VARCHAR(100),
        download_url VARCHAR(500),
        cover_type VARCHAR(50),
        theme_color VARCHAR(50),
        custom_badge VARCHAR(50),
        cover_image VARCHAR(500)
      );
      ALTER TABLE resources ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
      ALTER TABLE resources ADD COLUMN IF NOT EXISTS cover_type VARCHAR(50);
      ALTER TABLE resources ADD COLUMN IF NOT EXISTS theme_color VARCHAR(50);
      ALTER TABLE resources ADD COLUMN IF NOT EXISTS custom_badge VARCHAR(50);
      ALTER TABLE resources ADD COLUMN IF NOT EXISTS cover_image VARCHAR(500);
      ALTER TABLE resources ADD COLUMN IF NOT EXISTS cover_title VARCHAR(255);
      ALTER TABLE resources ADD COLUMN IF NOT EXISTS cover_subtitle VARCHAR(255);
      ALTER TABLE resources ADD COLUMN IF NOT EXISTS cover_date VARCHAR(100);
    `);

    // 4. Backfill missing slugs for events
    try {
      const missingEventSlugs = await currentPool.query(
        "SELECT id, title FROM events WHERE slug IS NULL OR slug = ''"
      );
      for (const row of missingEventSlugs.rows) {
        const uniqueSlug = await generateUniqueSlug(currentPool, 'events', row.title || `event-${row.id}`, row.id);
        await currentPool.query('UPDATE events SET slug = $1 WHERE id = $2', [uniqueSlug, row.id]);
      }
    } catch (e) {
      console.warn("Backfill event slugs warning:", e.message);
    }

    // 5. Backfill missing slugs for news
    try {
      const missingNewsSlugs = await currentPool.query(
        "SELECT id, title FROM news WHERE slug IS NULL OR slug = ''"
      );
      for (const row of missingNewsSlugs.rows) {
        const uniqueSlug = await generateUniqueSlug(currentPool, 'news', row.title || `news-${row.id}`, row.id);
        await currentPool.query('UPDATE news SET slug = $1 WHERE id = $2', [uniqueSlug, row.id]);
      }
    } catch (e) {
      console.warn("Backfill news slugs warning:", e.message);
    }

    tablesEnsured = true;
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

// ==========================================
// EVENTS CRUD
// ==========================================

// Fetch all events from DB
export async function getEvents() {
  await ensureTablesExist();
  const currentPool = getPool();
  
  try {
    const res = await currentPool.query('SELECT * FROM events ORDER BY id ASC');
    
    return res.rows.map(row => ({
      id: row.id,
      slug: row.slug || slugify(row.title) || String(row.id),
      dateDay: row.date_day,
      dateMonth: row.date_month,
      dateYear: row.date_year,
      category: row.category,
      title: row.title,
      subtitle: row.subtitle,
      imageUrl: row.image_url,
      filterType: row.filter_type,
      details: row.details || {}
    }));
  } catch (error) {
    console.error("Error fetching events from DB:", error);
    throw error;
  }
}

// Add a new event to DB
export async function addEvent(eventData) {
  await ensureTablesExist();
  const currentPool = getPool();

  const { dateDay, dateMonth, dateYear, category, title, subtitle, imageUrl, filterType, details, slug } = eventData;

  const finalSlug = await generateUniqueSlug(currentPool, 'events', slug || title || 'event');

  const query = `
    INSERT INTO events (slug, date_day, date_month, date_year, category, title, subtitle, image_url, filter_type, details)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)
    RETURNING *;
  `;

  const values = [
    finalSlug,
    dateDay,
    dateMonth,
    dateYear,
    category,
    title,
    subtitle || '',
    imageUrl,
    filterType,
    JSON.stringify(details || {})
  ];

  try {
    const res = await currentPool.query(query, values);
    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      dateDay: row.date_day,
      dateMonth: row.date_month,
      dateYear: row.date_year,
      category: row.category,
      title: row.title,
      subtitle: row.subtitle,
      imageUrl: row.image_url,
      filterType: row.filter_type,
      details: row.details || {}
    };
  } catch (error) {
    console.error("Error inserting event into DB:", error);
    throw error;
  }
}

// Update an existing event in DB (by numeric ID or slug)
export async function updateEvent(idOrSlug, eventData) {
  await ensureTablesExist();
  const currentPool = getPool();
  const { dateDay, dateMonth, dateYear, category, title, subtitle, imageUrl, filterType, details, slug } = eventData;

  // Resolve existing record to get its ID
  const existing = await getEventById(idOrSlug);
  if (!existing) throw new Error("Event not found");

  const targetId = existing.id;
  const candidateSlug = slug || existing.slug || slugify(title);
  const finalSlug = await generateUniqueSlug(currentPool, 'events', candidateSlug, targetId);

  const query = `
    UPDATE events
    SET slug = $1, date_day = $2, date_month = $3, date_year = $4, category = $5,
        title = $6, subtitle = $7, image_url = $8, filter_type = $9, details = $10::jsonb
    WHERE id = $11
    RETURNING *;
  `;

  const values = [
    finalSlug,
    dateDay,
    dateMonth,
    dateYear,
    category,
    title,
    subtitle || '',
    imageUrl,
    filterType,
    JSON.stringify(details || {}),
    targetId
  ];

  try {
    const res = await currentPool.query(query, values);
    if (res.rows.length === 0) throw new Error("Event not found");
    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      dateDay: row.date_day,
      dateMonth: row.date_month,
      dateYear: row.date_year,
      category: row.category,
      title: row.title,
      subtitle: row.subtitle,
      imageUrl: row.image_url,
      filterType: row.filter_type,
      details: row.details || {}
    };
  } catch (error) {
    console.error("Error updating event in DB:", error);
    throw error;
  }
}

// Delete an event from DB (by numeric ID or slug)
export async function deleteEvent(idOrSlug) {
  await ensureTablesExist();
  const currentPool = getPool();
  try {
    const res = await currentPool.query(
      'DELETE FROM events WHERE id::text = $1 OR slug = $1 RETURNING id, slug;',
      [String(idOrSlug)]
    );
    if (res.rows.length === 0) throw new Error("Event not found");
    return { success: true, id: res.rows[0].id, slug: res.rows[0].slug };
  } catch (error) {
    console.error("Error deleting event from DB:", error);
    throw error;
  }
}

// Get single event by ID or Slug
export async function getEventById(idOrSlug) {
  await ensureTablesExist();
  const currentPool = getPool();
  try {
    const res = await currentPool.query(
      'SELECT * FROM events WHERE slug = $1 OR id::text = $1 LIMIT 1;',
      [String(idOrSlug)]
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug || slugify(row.title) || String(row.id),
      dateDay: row.date_day,
      dateMonth: row.date_month,
      dateYear: row.date_year,
      category: row.category,
      title: row.title,
      subtitle: row.subtitle,
      imageUrl: row.image_url,
      filterType: row.filter_type,
      details: row.details || {}
    };
  } catch (error) {
    console.error("Error fetching event by ID or slug:", error);
    throw error;
  }
}

// ==========================================
// EVENT SETTINGS
// ==========================================

export async function getEventSettings() {
  const currentPool = getPool();
  try {
    const res = await currentPool.query('SELECT * FROM event_settings WHERE id = 1 LIMIT 1;');
    if (res.rows.length === 0) {
      return null;
    }
    const row = res.rows[0];
    
    let featuredInitiatives = [];
    if (row.featured_initiatives) {
      featuredInitiatives = typeof row.featured_initiatives === 'string' 
        ? JSON.parse(row.featured_initiatives) 
        : row.featured_initiatives;
    }

    if (!Array.isArray(featuredInitiatives) || featuredInitiatives.length === 0) {
      featuredInitiatives = [
        {
          id: 'init-1',
          tag: row.featured_tag || 'FEATURED INITIATIVE',
          title: row.featured_title || 'STEM 4 Girls',
          subtitle: row.featured_subtitle || 'Creating opportunities.<br/>Inspiring futures.',
          imageUrl: row.featured_image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
          link: row.featured_link || '#'
        }
      ];
    }

    return {
      id: row.id,
      heroTag: row.hero_tag,
      heroTitle: row.hero_title,
      heroSubtitle: row.hero_subtitle,
      heroImage: row.hero_image,
      featuredTag: row.featured_tag,
      featuredTitle: row.featured_title,
      featuredSubtitle: row.featured_subtitle,
      featuredImage: row.featured_image,
      featuredLink: row.featured_link,
      featuredInitiatives: featuredInitiatives,
      stat1Number: row.stat1_number,
      stat1Text: row.stat1_text,
      stat2Number: row.stat2_number,
      stat2Text: row.stat2_text,
      stat3Number: row.stat3_number,
      stat3Text: row.stat3_text,
      stat4Number: row.stat4_number,
      stat4Text: row.stat4_text,
      newsletterTitle: row.newsletter_title,
      newsletterText: row.newsletter_text,
    };
  } catch (error) {
    console.error("Error fetching event settings from DB:", error);
    throw error;
  }
}

export async function updateEventSettings(settings) {
  const currentPool = getPool();
  const {
    heroTag,
    heroTitle,
    heroSubtitle,
    heroImage,
    featuredTag,
    featuredTitle,
    featuredSubtitle,
    featuredImage,
    featuredLink,
    featuredInitiatives,
    stat1Number,
    stat1Text,
    stat2Number,
    stat2Text,
    stat3Number,
    stat3Text,
    stat4Number,
    stat4Text,
    newsletterTitle,
    newsletterText,
  } = settings;

  const initiativesJson = JSON.stringify(featuredInitiatives || []);

  const query = `
    INSERT INTO event_settings (
      id, hero_tag, hero_title, hero_subtitle, hero_image,
      featured_tag, featured_title, featured_subtitle, featured_image, featured_link,
      stat1_number, stat1_text, stat2_number, stat2_text, stat3_number, stat3_text, stat4_number, stat4_text,
      newsletter_title, newsletter_text, featured_initiatives
    ) VALUES (
      1, $1, $2, $3, $4,
      $5, $6, $7, $8, $9,
      $10, $11, $12, $13, $14, $15, $16, $17,
      $18, $19, $20::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      hero_tag = EXCLUDED.hero_tag,
      hero_title = EXCLUDED.hero_title,
      hero_subtitle = EXCLUDED.hero_subtitle,
      hero_image = EXCLUDED.hero_image,
      featured_tag = EXCLUDED.featured_tag,
      featured_title = EXCLUDED.featured_title,
      featured_subtitle = EXCLUDED.featured_subtitle,
      featured_image = EXCLUDED.featured_image,
      featured_link = EXCLUDED.featured_link,
      stat1_number = EXCLUDED.stat1_number,
      stat1_text = EXCLUDED.stat1_text,
      stat2_number = EXCLUDED.stat2_number,
      stat2_text = EXCLUDED.stat2_text,
      stat3_number = EXCLUDED.stat3_number,
      stat3_text = EXCLUDED.stat3_text,
      stat4_number = EXCLUDED.stat4_number,
      stat4_text = EXCLUDED.stat4_text,
      newsletter_title = EXCLUDED.newsletter_title,
      newsletter_text = EXCLUDED.newsletter_text,
      featured_initiatives = EXCLUDED.featured_initiatives
    RETURNING *;
  `;

  const values = [
    heroTag || 'EVENTS',
    heroTitle || 'Discover. Learn.\nConnect.',
    heroSubtitle || '',
    heroImage || '/events/e1.png',
    featuredTag || 'FEATURED INITIATIVE',
    featuredTitle || 'STEM 4 Girls',
    featuredSubtitle || '',
    featuredImage || '/events/e1.png',
    featuredLink || '#',
    stat1Number || '56+',
    stat1Text || 'Gifted Students<br/>Supported',
    stat2Number || '44',
    stat2Text || 'Schools in<br/>Kerala',
    stat3Number || '41',
    stat3Text || 'Educational<br/>Districts',
    stat4Number || '6+',
    stat4Text || 'Programmes<br/>Organized',
    newsletterTitle || 'Stay Updated',
    newsletterText || '',
    initiativesJson
  ];

  try {
    const res = await currentPool.query(query, values);
    const row = res.rows[0];
    
    let parsedInitiatives = [];
    if (row.featured_initiatives) {
      parsedInitiatives = typeof row.featured_initiatives === 'string' 
        ? JSON.parse(row.featured_initiatives) 
        : row.featured_initiatives;
    }

    return {
      id: row.id,
      heroTag: row.hero_tag,
      heroTitle: row.hero_title,
      heroSubtitle: row.hero_subtitle,
      heroImage: row.hero_image,
      featuredTag: row.featured_tag,
      featuredTitle: row.featured_title,
      featuredSubtitle: row.featured_subtitle,
      featuredImage: row.featured_image,
      featuredLink: row.featured_link,
      featuredInitiatives: parsedInitiatives,
      stat1Number: row.stat1_number,
      stat1Text: row.stat1_text,
      stat2Number: row.stat2_number,
      stat2Text: row.stat2_text,
      stat3Number: row.stat3_number,
      stat3Text: row.stat3_text,
      stat4Number: row.stat4_number,
      stat4Text: row.stat4_text,
      newsletterTitle: row.newsletter_title,
      newsletterText: row.newsletter_text,
    };
  } catch (error) {
    console.error("Error updating event settings in DB:", error);
    throw error;
  }
}

// ==========================================
// NEWS CRUD
// ==========================================

export async function getNews() {
  await ensureTablesExist();
  const currentPool = getPool();
  try {
    const res = await currentPool.query('SELECT * FROM news ORDER BY id DESC');
    return res.rows.map(row => ({
      id: row.id,
      slug: row.slug || slugify(row.title) || String(row.id),
      tag: row.tag,
      category: row.category,
      title: row.title,
      desc: row.desc,
      date: row.date,
      imageUrl: row.image_url,
      author: row.author || 'LEnSE Admin',
      readTime: row.read_time || '5 min read',
      details: row.details || {}
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

export async function getNewsById(idOrSlug) {
  await ensureTablesExist();
  const currentPool = getPool();
  try {
    const res = await currentPool.query(
      'SELECT * FROM news WHERE slug = $1 OR id::text = $1 LIMIT 1;',
      [String(idOrSlug)]
    );
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug || slugify(row.title) || String(row.id),
      tag: row.tag,
      category: row.category,
      title: row.title,
      desc: row.desc,
      date: row.date,
      imageUrl: row.image_url,
      author: row.author || 'LEnSE Admin',
      readTime: row.read_time || '5 min read',
      details: row.details || {}
    };
  } catch (error) {
    console.error("Error fetching news by ID or slug:", error);
    throw error;
  }
}

export async function addNews(newsData) {
  await ensureTablesExist();
  const currentPool = getPool();
  const { tag, category, title, desc, date, imageUrl, slug, details, author, readTime } = newsData;

  const finalSlug = await generateUniqueSlug(currentPool, 'news', slug || title || 'news');

  const query = `
    INSERT INTO news (slug, tag, category, title, "desc", date, image_url, details, author, read_time)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10)
    RETURNING *;
  `;
  try {
    const res = await currentPool.query(query, [
      finalSlug,
      tag,
      category,
      title,
      desc,
      date,
      imageUrl,
      JSON.stringify(details || {}),
      author || 'LEnSE Admin',
      readTime || '5 min read'
    ]);
    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      tag: row.tag,
      category: row.category,
      title: row.title,
      desc: row.desc,
      date: row.date,
      imageUrl: row.image_url,
      author: row.author,
      readTime: row.read_time,
      details: row.details || {}
    };
  } catch (error) {
    console.error("Error inserting news:", error);
    throw error;
  }
}

export async function updateNews(idOrSlug, newsData) {
  await ensureTablesExist();
  const currentPool = getPool();
  const { tag, category, title, desc, date, imageUrl, slug, details, author, readTime } = newsData;

  const existing = await getNewsById(idOrSlug);
  if (!existing) throw new Error("News not found");

  const targetId = existing.id;
  const candidateSlug = slug || existing.slug || slugify(title);
  const finalSlug = await generateUniqueSlug(currentPool, 'news', candidateSlug, targetId);

  const query = `
    UPDATE news
    SET slug = $1, tag = $2, category = $3, title = $4, "desc" = $5, date = $6,
        image_url = $7, details = $8::jsonb, author = $9, read_time = $10
    WHERE id = $11
    RETURNING *;
  `;
  try {
    const res = await currentPool.query(query, [
      finalSlug,
      tag,
      category,
      title,
      desc,
      date,
      imageUrl,
      JSON.stringify(details || {}),
      author || 'LEnSE Admin',
      readTime || '5 min read',
      targetId
    ]);
    if (res.rows.length === 0) throw new Error("News not found");
    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      tag: row.tag,
      category: row.category,
      title: row.title,
      desc: row.desc,
      date: row.date,
      imageUrl: row.image_url,
      author: row.author,
      readTime: row.read_time,
      details: row.details || {}
    };
  } catch (error) {
    console.error("Error updating news:", error);
    throw error;
  }
}

export async function deleteNews(idOrSlug) {
  await ensureTablesExist();
  const currentPool = getPool();
  try {
    const res = await currentPool.query(
      'DELETE FROM news WHERE id::text = $1 OR slug = $1 RETURNING id, slug;',
      [String(idOrSlug)]
    );
    if (res.rows.length === 0) throw new Error("News not found");
    return { success: true, id: res.rows[0].id, slug: res.rows[0].slug };
  } catch (error) {
    console.error("Error deleting news:", error);
    throw error;
  }
}

// ==========================================
// RESOURCES CRUD
// ==========================================

export async function getResources() {
  await ensureTablesExist();
  const currentPool = getPool();
  try {
    let res = await currentPool.query('SELECT * FROM resources ORDER BY id DESC');
    if (res.rows.length === 0) {
      const defaultResources = [
        {
          title: '4th SIET International Conference Official Brochure',
          category: 'Brochures',
          type: 'PDF',
          size: '1.2 MB',
          desc: 'Complete conference schedule, keynote profiles (Prof. Jan De Waters), themes on STEAM in Education, and registration guidelines.',
          date: 'March 2025',
          download_url: '#'
        },
        {
          title: 'Call for Papers: SIET & LEnSE Annual Educational Technology Proceedings',
          category: 'Submissions',
          type: 'PDF',
          size: '876 KB',
          desc: 'Paper formatting guidelines, submission tracks, peer review criteria, and deadlines for scholars and educational researchers.',
          date: 'February 2025',
          download_url: '#'
        },
        {
          title: 'FYUGP Semester II Extended Learning Module: Selected Literary Terms',
          category: 'Courseware',
          type: 'PDF / Interactive',
          size: '2.4 MB',
          desc: 'Technology-enabled supplementary coursework developed by Ms. Greeshma Raveendran with Dr. Divya C. Senan under University of Kerala.',
          date: 'January 2025',
          download_url: '#'
        },
        {
          title: 'Hands-on Activity Toolkit: School STEM Learning Lab Curriculum',
          category: 'Toolkits',
          type: 'PDF',
          size: '3.8 MB',
          desc: 'Comprehensive manual containing 50+ experiential lab activities, microcontroller coding tutorials, and robotics experiments for K-12 educators.',
          date: 'May 2025',
          download_url: '#'
        },
        {
          title: 'Prompt Engineering for Higher Education Educators: Instructional Guide',
          category: 'Guides',
          type: 'PDF',
          size: '1.5 MB',
          desc: 'Curated handbook from Dr. Briju Tankachan (EdTech Society & IIT Mumbai) on leveraging generative AI tools to improve classroom instruction quality.',
          date: 'January 2025',
          download_url: '#'
        },
        {
          title: 'Institutional Annual Report & Policy Document (LEnSE / CLESE 2024-2025)',
          category: 'Reports',
          type: 'PDF',
          size: '4.2 MB',
          desc: 'Comprehensive review of state camp series, gift student programs, international grants, and social inclusion reinvestment metrics.',
          date: 'August 2025',
          download_url: '#'
        }
      ];

      for (const item of defaultResources) {
        const itemSlug = slugify(item.title);
        await currentPool.query(
          `INSERT INTO resources (slug, title, category, type, size, "desc", date, download_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [itemSlug, item.title, item.category, item.type, item.size, item.desc, item.date, item.download_url]
        );
      }
      res = await currentPool.query('SELECT * FROM resources ORDER BY id DESC');
    }

    return res.rows.map(row => ({
      id: row.id,
      slug: row.slug || slugify(row.title) || String(row.id),
      title: row.title,
      category: row.category,
      type: row.type,
      size: row.size,
      desc: row.desc,
      date: row.date,
      downloadUrl: row.download_url,
      coverType: row.cover_type || null,
      themeColor: row.theme_color || null,
      customBadge: row.custom_badge || null,
      coverImage: row.cover_image || null,
      coverTitle: row.cover_title || null,
      coverSubtitle: row.cover_subtitle || null,
      coverDate: row.cover_date || null
    }));
  } catch (error) {
    console.error("Error fetching resources:", error);
    throw error;
  }
}

export async function addResource(resData) {
  await ensureTablesExist();
  const currentPool = getPool();
  const {
    title,
    slug,
    category,
    type,
    size,
    desc,
    date,
    downloadUrl,
    coverType = 'report',
    themeColor = 'emerald',
    customBadge = '',
    coverImage = '/campus_building.jpg',
    coverTitle = '',
    coverSubtitle = '',
    coverDate = ''
  } = resData;

  const finalSlug = await generateUniqueSlug(currentPool, 'resources', slug || title || 'resource');

  const query = `
    INSERT INTO resources (
      slug, title, category, type, size, "desc", date, download_url,
      cover_type, theme_color, custom_badge, cover_image,
      cover_title, cover_subtitle, cover_date
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING *;
  `;
  try {
    const res = await currentPool.query(query, [
      finalSlug,
      title,
      category,
      type,
      size,
      desc,
      date,
      downloadUrl,
      coverType,
      themeColor,
      customBadge,
      coverImage,
      coverTitle,
      coverSubtitle,
      coverDate
    ]);
    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      type: row.type,
      size: row.size,
      desc: row.desc,
      date: row.date,
      downloadUrl: row.download_url,
      coverType: row.cover_type,
      themeColor: row.theme_color,
      customBadge: row.custom_badge,
      coverImage: row.cover_image,
      coverTitle: row.cover_title,
      coverSubtitle: row.cover_subtitle,
      coverDate: row.cover_date
    };
  } catch (error) {
    console.error("Error inserting resource:", error);
    throw error;
  }
}

export async function updateResource(idOrSlug, resData) {
  await ensureTablesExist();
  const currentPool = getPool();
  const {
    title,
    slug,
    category,
    type,
    size,
    desc,
    date,
    downloadUrl,
    coverType = 'report',
    themeColor = 'emerald',
    customBadge = '',
    coverImage = '/campus_building.jpg',
    coverTitle = '',
    coverSubtitle = '',
    coverDate = ''
  } = resData;

  const existingRes = await currentPool.query(
    'SELECT id, slug FROM resources WHERE slug = $1 OR id::text = $1 LIMIT 1',
    [String(idOrSlug)]
  );
  if (existingRes.rows.length === 0) throw new Error("Resource not found");

  const targetId = existingRes.rows[0].id;
  const candidateSlug = slug || existingRes.rows[0].slug || slugify(title);
  const finalSlug = await generateUniqueSlug(currentPool, 'resources', candidateSlug, targetId);

  const query = `
    UPDATE resources
    SET slug = $1, title = $2, category = $3, type = $4, size = $5, "desc" = $6, date = $7, download_url = $8,
        cover_type = $9, theme_color = $10, custom_badge = $11, cover_image = $12,
        cover_title = $13, cover_subtitle = $14, cover_date = $15
    WHERE id = $16
    RETURNING *;
  `;
  try {
    const res = await currentPool.query(query, [
      finalSlug,
      title,
      category,
      type,
      size,
      desc,
      date,
      downloadUrl,
      coverType,
      themeColor,
      customBadge,
      coverImage,
      coverTitle,
      coverSubtitle,
      coverDate,
      targetId
    ]);
    if (res.rows.length === 0) throw new Error("Resource not found");
    const row = res.rows[0];
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      category: row.category,
      type: row.type,
      size: row.size,
      desc: row.desc,
      date: row.date,
      downloadUrl: row.download_url,
      coverType: row.cover_type,
      themeColor: row.theme_color,
      customBadge: row.custom_badge,
      coverImage: row.cover_image,
      coverTitle: row.cover_title,
      coverSubtitle: row.cover_subtitle,
      coverDate: row.cover_date
    };
  } catch (error) {
    console.error("Error updating resource:", error);
    throw error;
  }
}

export async function deleteResource(idOrSlug) {
  await ensureTablesExist();
  const currentPool = getPool();
  try {
    const res = await currentPool.query(
      'DELETE FROM resources WHERE id::text = $1 OR slug = $1 RETURNING id, slug;',
      [String(idOrSlug)]
    );
    if (res.rows.length === 0) throw new Error("Resource not found");
    return { success: true, id: res.rows[0].id, slug: res.rows[0].slug };
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
}
