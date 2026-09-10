import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

// Try to load .env or .env.local
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : '',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000
});

async function initDB() {
  console.log("Connecting to database...");
  if (!process.env.DATABASE_URL) {
    console.error("ERROR: DATABASE_URL is not set in your environment variables.");
    process.exit(1);
  }

  try {
    // 1. Create events table
    await pool.query(`
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
    `);
    console.log("Verified 'events' table.");

    // 2. Create event_settings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS event_settings (
        id INT PRIMARY KEY DEFAULT 1,
        hero_tag VARCHAR(255) DEFAULT 'EVENTS',
        hero_title VARCHAR(255) DEFAULT 'Discover. Learn.\nConnect.',
        hero_subtitle TEXT DEFAULT 'Explore our conferences, workshops, lectures, courses and STEM initiatives that inspire learning and create sustainable impact.',
        hero_image TEXT DEFAULT '/events/e1.png',
        featured_tag VARCHAR(255) DEFAULT 'FEATURED INITIATIVE',
        featured_title VARCHAR(255) DEFAULT 'STEM 4 Girls',
        featured_subtitle TEXT DEFAULT 'Creating opportunities.<br/>Inspiring futures.',
        featured_image TEXT DEFAULT 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
        featured_link TEXT DEFAULT '#',
        stat1_number VARCHAR(100) DEFAULT '56+',
        stat1_text TEXT DEFAULT 'Gifted Students<br/>Supported',
        stat2_number VARCHAR(100) DEFAULT '44',
        stat2_text TEXT DEFAULT 'Schools in<br/>Kerala',
        stat3_number VARCHAR(100) DEFAULT '41',
        stat3_text TEXT DEFAULT 'Educational<br/>Districts',
        stat4_number VARCHAR(100) DEFAULT '6+',
        stat4_text TEXT DEFAULT 'Programmes<br/>Organized',
        newsletter_title VARCHAR(255) DEFAULT 'Stay Updated',
        newsletter_text TEXT DEFAULT 'Subscribe to our newsletter and never miss an update on our events and programmes.',
        featured_initiatives JSONB DEFAULT '[]'::jsonb
      );
    `);

    // Ensure featured_initiatives column exists if table was created previously
    await pool.query(`
      ALTER TABLE event_settings ADD COLUMN IF NOT EXISTS featured_initiatives JSONB DEFAULT '[]'::jsonb;
    `);

    const defaultInitiatives = JSON.stringify([
      {
        id: "init-1",
        tag: "FEATURED INITIATIVE",
        title: "STEM 4 Girls",
        subtitle: "Creating opportunities.<br/>Inspiring futures.",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
        link: "#"
      },
      {
        id: "init-2",
        tag: "UPCOMING INITIATIVE",
        title: "Experiential STEM Labs",
        subtitle: "Interactive robotics & AI education across 44+ schools in Kerala.",
        imageUrl: "/events/e1.png",
        link: "#"
      },
      {
        id: "init-3",
        tag: "SPECIAL PROGRAMME",
        title: "Gifted Student STEM Camp",
        subtitle: "Empowering young innovators through hands-on science & technology.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
        link: "#"
      }
    ]);

    // Seed default settings row if not present or update featured_initiatives
    await pool.query(`
      INSERT INTO event_settings (id, hero_tag, hero_title, hero_subtitle, hero_image, featured_tag, featured_title, featured_subtitle, featured_image, featured_link, stat1_number, stat1_text, stat2_number, stat2_text, stat3_number, stat3_text, stat4_number, stat4_text, newsletter_title, newsletter_text, featured_initiatives)
      VALUES (1, 'EVENTS', 'Discover. Learn.\nConnect.', 'Explore our conferences, workshops, lectures, courses and STEM initiatives that inspire learning and create sustainable impact.', '/events/e1.png', 'FEATURED INITIATIVE', 'STEM 4 Girls', 'Creating opportunities.<br/>Inspiring futures.', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop', '#', '56+', 'Gifted Students<br/>Supported', '44', 'Schools in<br/>Kerala', '41', 'Educational<br/>Districts', '6+', 'Programmes<br/>Organized', 'Stay Updated', 'Subscribe to our newsletter and never miss an update on our events and programmes.', $1::jsonb)
      ON CONFLICT (id) DO UPDATE SET
        featured_initiatives = CASE 
          WHEN event_settings.featured_initiatives IS NULL OR jsonb_array_length(event_settings.featured_initiatives) = 0 
          THEN EXCLUDED.featured_initiatives 
          ELSE event_settings.featured_initiatives 
        END;
    `, [defaultInitiatives]);

    console.log("Database schema & multiple featured initiatives successfully initialized.");
  } catch (err) {
    console.error("Failed to initialize database:", err);
  } finally {
    await pool.end();
  }
}

initDB();
