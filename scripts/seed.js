import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : '',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000
});

const officialEvents = [
  {
    slug: 'fourth-siet-international-conference-on-educational-technology',
    dateDay: '14-15',
    dateMonth: 'MAR',
    dateYear: '2025',
    category: 'CONFERENCE',
    filterType: 'Conferences',
    title: 'Fourth SIET International Conference on Educational Technology',
    subtitle: 'Educational Technology in STEAM Education',
    imageUrl: '/events/conference.jpg',
    details: {
      time: '09:30 AM – 05:00 PM IST',
      venue: 'Thiruvananthapuram, Kerala',
      mode: 'In-person & Hybrid Sessions',
      closingDate: '10 March 2025',
      organizedBy: 'State Institute of Educational Technology (SIET), Govt. of Kerala in collaboration with Centre for Learning Engineering and Sustainability Education (LEnSE / CLESE)',
      chiefGuest: 'Prof. Jan De Waters, STEM Centre, Clarkson University, USA',
      inauguration: 'Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala',
      aboutText: 'State Institute of Educational Technology collaborated with Centre for Learning Engineering and Sustainability Education for the Fourth SIET International Conference on Educational Technology entitled "Educational Technology in STEAM Education". The conference was conducted on 14th & 15th March 2025. Prof. Jan De Waters of Clarkson University was the chief guest and Hon’ble Minister for Education Sri. V. Sivankutty inaugurated the programme.',
      highlights: [
        'State Level Inauguration by Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala',
        'Chief Guest Keynote Address by Prof. Jan De Waters (Clarkson University, USA)',
        'STEAM Pedagogical Innovations & Learning Engineering Frameworks',
        'Scholarly presentations and panel discussions on digital education in Kerala'
      ],
      speakers: [
        { name: 'Prof. Jan De Waters', title: 'Professor, STEM Centre, Clarkson University, USA' },
        { name: 'Sri. V. Sivankutty', title: 'Hon’ble Minister for Education, Govt. of Kerala' },
        { name: 'Dr. Divya C. Senan', title: 'Director, Centre for Learning Engineering & Sustainability Education' }
      ]
    }
  },
  {
    slug: 'prompt-engineering-for-educators',
    dateDay: '10',
    dateMonth: 'JAN',
    dateYear: '2025',
    category: 'LECTURE',
    filterType: 'Lectures',
    title: 'Prompt Engineering for Educators',
    subtitle: 'How to Improve Quality of Instruction',
    imageUrl: '/events/workshop.jpg',
    details: {
      time: '10:30 AM – 01:00 PM IST',
      venue: 'Department of Education, University of Kerala, Karyavattom Campus',
      mode: 'Offline Interactive Lecture',
      closingDate: '08 January 2025',
      organizedBy: 'Centre for Learning Engineering and Sustainability Education (LEnSE)',
      chiefGuest: 'Dr. Briju Tankachan, Executive Director, EdTech Society & Visiting Professor, IIT Mumbai',
      inauguration: 'Department of Education, University of Kerala',
      aboutText: 'Invited Lecture by Dr. Briju Tankachan, Executive Director, EdTech Society & Visiting Professor, IIT Mumbai on the topic "Prompt Engineering for Educators: How to improve quality of Instruction" on 10th January 2025 at Department of Education, University of Kerala, Karyavattom Campus.',
      highlights: [
        'Masterclass on Prompt Engineering frameworks for educators',
        'AI-assisted lesson planning and assessment design',
        'Hands-on instructional quality improvement techniques',
        'Hosted at Department of Education, University of Kerala, Karyavattom Campus'
      ],
      speakers: [
        { name: 'Dr. Briju Tankachan', title: 'Executive Director, EdTech Society & Visiting Professor, IIT Mumbai' },
        { name: 'Dr. Divya C. Senan', title: 'Director, Centre for Learning Engineering & Sustainability Education' }
      ]
    }
  },
  {
    slug: 'selected-literary-terms-fyugp-course',
    dateDay: 'APR-MAY',
    dateMonth: '2025',
    dateYear: '2025',
    category: 'COURSE',
    filterType: 'Courses',
    title: 'Selected Literary Terms (FYUGP Semester II)',
    subtitle: 'Extended Learning Programme for Higher Education Learners',
    imageUrl: '/events/events_globe_books.jpg',
    details: {
      time: 'Self-Paced Extended Learning (2-Month Duration)',
      venue: 'Centre for Learning Engineering & Sustainability Education (Online Learning Portal)',
      mode: 'Technology-Enabled, Interactive Self-Directed Course',
      closingDate: 'Rolling Enrollment',
      organizedBy: 'Centre for Learning Engineering & Sustainability Education, University of Kerala',
      chiefGuest: 'Ms. Greeshma Raveendran (Course Developer) with guidance from Dr. Divya C. Senan',
      inauguration: 'Aligned with Ability Enhancement Course (AEC) in FYUGP Semester II',
      aboutText: 'Conducted a two-month course on Selected Literary Terms as an extended learning programme aligned with the Ability Enhancement Course in Semester II, designed to support FYUGP learners under the University of Kerala. The course was developed by Ms. Greeshma Raveendran with guidance from Dr. Divya C. Senan and was offered through Centre for Learning Engineering & Sustainability Education. The course combined interactive video lessons, reading materials, quizzes, and assessments to promote self-directed, technology-enabled learning.',
      highlights: [
        'Aligned with Ability Enhancement Course (AEC) for FYUGP Semester II',
        'Interactive video lessons, reading materials, and self-directed quizzes',
        'Course developed by Ms. Greeshma Raveendran under Dr. Divya C. Senan',
        'Scalable digital pedagogy adopted across university colleges'
      ],
      speakers: [
        { name: 'Ms. Greeshma Raveendran', title: 'Course Developer & Doctoral Research Scholar' },
        { name: 'Dr. Divya C. Senan', title: 'Director, CLESE & Associate Professor' }
      ]
    }
  },
  {
    slug: 'shaping-and-nurturing-future-teachers-of-english',
    dateDay: '30-31',
    dateMonth: 'MAY',
    dateYear: '2025',
    category: 'WORKSHOP',
    filterType: 'Workshops',
    title: 'Shaping and Nurturing Future Teachers of English',
    subtitle: 'Transformative English Pedagogy at the Secondary Level of Education',
    imageUrl: '/events/sustainability.jpg',
    details: {
      time: '09:30 AM – 04:30 PM IST (Two Days)',
      venue: 'Centre for Under Graduate Studies, University of Kerala',
      mode: 'Two-Day Interactive Workshop',
      closingDate: '25 May 2025',
      organizedBy: 'Centre for Learning Engineering & Sustainability Education in collaboration with ELTAI and Hornby Trust (UK)',
      chiefGuest: 'Representatives from ELTAI and Hornby Trust (UK)',
      inauguration: 'Centre for Under Graduate Studies, University of Kerala',
      aboutText: 'Conducted workshop on "Shaping and nurturing future teachers of English at the secondary level of education" in collaboration with ELTAI, the English Language Teachers\' Association of India which is the oldest professional network of teachers of English in the country, and the Hornby Trust (UK) on 30 and 31st May 2025 at Centre for Under Graduate Studies, University of Kerala. The workshop aimed at bringing about transformative and impactful changes in the ways in which English is taught and learnt at the secondary level education.',
      highlights: [
        'Collaborative initiative with ELTAI and Hornby Trust (UK)',
        'Transformative changes in secondary level English language teaching',
        'Interactive pedagogical strategies and classroom material design',
        'Held at Centre for Under Graduate Studies, University of Kerala'
      ],
      speakers: [
        { name: 'ELTAI & Hornby Trust Mentors', title: 'English Pedagogy Specialists' },
        { name: 'Dr. Divya C. Senan', title: 'Director, CLESE & Associate Professor' }
      ]
    }
  },
  {
    slug: 'state-wide-stem-4-girls-camp-series',
    dateDay: 'STATE-WIDE',
    dateMonth: '2025',
    dateYear: '2025',
    category: 'STEM CAMPS',
    filterType: 'STEM Camps',
    title: "State-wide 'STEM 4 Girls' Camp Series",
    subtitle: 'Empowering Young Women in Science Across Kerala',
    imageUrl: '/events/events_hero.jpg',
    details: {
      time: 'State-Level Multi-Day Camp Series',
      venue: 'Govt. HSS Puthoor (Kollam), Govt. HSS Paruthippally (Thiruvananthapuram), Govt. HSS & VHSE Nedumkandam (Idukki)',
      mode: 'Hands-on Experimental School Camps',
      closingDate: 'District-wise Schedule',
      organizedBy: 'Department of Education, University of Kerala & CLESE in collaboration with Indian Council for Social Science Research (ICSSR), New Delhi',
      chiefGuest: 'Sri. K. N. Balagopal, Hon’ble Minister for Finance, Govt. of Kerala',
      inauguration: 'State-level inauguration by Sri. K. N. Balagopal, Hon’ble Minister for Finance, Govt. of Kerala',
      aboutText: 'The Centre for Learning Engineering and Sustainability Education at the University of Kerala collaborated with the Department of Education, University of Kerala, and the Indian Council for Social Science Research (ICSSR), New Delhi, to launch a state-wide initiative to conduct STEM camps in schools across Kerala for girls. Supported by funding from the ICSSR to promote STEM education and innovation among students. Through STEM-focused education, the camp seeks to empower young women from economically and socially disadvantaged families in Kerala by offering skill development and evaluation programs that prepare them for careers in science. Conducted in Govt. HSS Puthoor (Kollam), Govt. HSS Paruthippally (Thiruvananthapuram), and Govt HSS & VHSE Nedumkandam (Idukki). State level inauguration was done by Sri. KN Balagopal, Hon’ble Minister for Finance, Govt. of Kerala. (State Level Programme implemented in one school from each district of Kerala).',
      highlights: [
        'Funded by Indian Council for Social Science Research (ICSSR), New Delhi',
        'State-level inauguration by Sri. K. N. Balagopal, Hon’ble Minister for Finance',
        'Conducted across Kollam (Puthoor), Thiruvananthapuram (Paruthippally), and Idukki (Nedumkandam)',
        'Empowering girls from disadvantaged families through robotics, coding, and hands-on STEM'
      ],
      speakers: [
        { name: 'Sri. K. N. Balagopal', title: 'Hon’ble Minister for Finance, Govt. of Kerala' },
        { name: 'Dr. Divya C. Senan', title: 'Director, CLESE / Project Investigator' }
      ]
    }
  },
  {
    slug: 'three-day-stem-camp-for-56-gifted-students',
    dateDay: '18-20',
    dateMonth: 'JUL',
    dateYear: '2025',
    category: 'STEM CAMPS',
    filterType: 'STEM Camps',
    title: 'Three-Day STEM Camp for 56 Gifted Students Across Kerala',
    subtitle: 'Residential Innovation Bootcamp at ACSTI Manvila',
    imageUrl: '/events/events_book_plant.jpg',
    details: {
      time: 'Three-Day Residential Bootcamp (July 18 to 20, 2025)',
      venue: 'Agriculture Cooperative Staff Training Institute (ACSTI), Manvila, Thiruvananthapuram',
      mode: 'Residential Hands-on STEM Bootcamp',
      closingDate: 'State-wide Cohort Selection',
      organizedBy: 'Centre for Learning Engineering & Sustainability Education in collaboration with State Institute of Educational Technology (SIET), Dept of General Education, Govt. of Kerala',
      chiefGuest: 'Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala',
      inauguration: 'State-level inauguration by Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala',
      aboutText: 'The Centre for Learning Engineering and Sustainability Education at the University of Kerala collaborated with the State Institute of Educational Technology (SIET), functioning under the Department of General Education, Government of Kerala, successfully organized a three-day STEM camp from July 18 to 20, 2025 for 56 Gifted Students across Kerala. The camp was conducted at the Agriculture Cooperative Staff Training Institute (ACSTI), located in Manvila, Thiruvananthapuram. The State level inauguration was done by Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala. (State Level Programme implemented among selected students from all educational districts of Kerala).',
      highlights: [
        '3-day residential STEM camp for 56 selected Gifted Students from all educational districts',
        'State-level inauguration by Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala',
        'Conducted at Agriculture Cooperative Staff Training Institute (ACSTI), Manvila',
        'Joint collaboration with SIET and Department of General Education, Kerala'
      ],
      speakers: [
        { name: 'Sri. V. Sivankutty', title: 'Hon’ble Minister for Education, Govt. of Kerala' },
        { name: 'Dr. Divya C. Senan', title: 'Director, CLESE & Associate Professor' }
      ]
    }
  },
  {
    slug: 'stem-camps-for-gifted-students-across-41-educational-districts',
    dateDay: '41 DISTRICTS',
    dateMonth: '2025',
    dateYear: '2025',
    category: 'STEM CAMPS',
    filterType: 'Outreach & Community',
    title: 'STEM Camps for Gifted Students Across 41 Educational Districts',
    subtitle: 'State-wide Outreach in Collaboration with SIET, Government of Kerala',
    imageUrl: '/events/scholar.jpg',
    details: {
      time: 'State-wide Phase Rollout (41 Educational Districts)',
      venue: '44 Schools Across All 41 Educational Districts of Kerala',
      mode: 'Hands-on Experiential Workshops & Lab Kits',
      closingDate: 'State-wide Implementation',
      organizedBy: 'Centre for Learning Engineering and Sustainability Education (CLESE) in collaboration with State Institute of Educational Technology (SIET), Govt. of Kerala',
      chiefGuest: 'Department of General Education, Government of Kerala',
      inauguration: 'State Level Programme implemented among selected students from all educational districts',
      aboutText: 'Organizing STEM Camps for Gifted Students across 41 educational districts of Kerala in collaboration with State Institute of Educational Technology (SIET). In addition, CLESE has undertaken collaborative projects with SIET, Government of Kerala, to provide STEM training to gifted students from 44 schools across Kerala, supporting their intellectual curiosity, creativity, problem-solving abilities, and scientific thinking. (State Level Programme implemented among selected students from all educational districts of Kerala).',
      highlights: [
        'State Level Programme implemented across all 41 educational districts of Kerala',
        'Provides STEM training to gifted students from 44 schools',
        'Activity-based kits, robotics workbenches, and scientific inquiry sessions',
        'In collaboration with State Institute of Educational Technology (SIET), Govt. of Kerala'
      ],
      speakers: [
        { name: 'SIET Kerala Leadership', title: 'State Institute of Educational Technology, Govt. of Kerala' },
        { name: 'Dr. Divya C. Senan', title: 'Director, CLESE & Associate Professor' }
      ]
    }
  }
];

async function seed() {
  try {
    console.log('Connecting to database and updating official events...');
    
    // Ensure table structure exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255),
        date_day VARCHAR(255) NOT NULL,
        date_month VARCHAR(255) NOT NULL,
        date_year VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT,
        image_url TEXT NOT NULL,
        filter_type VARCHAR(255) NOT NULL,
        details JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE UNIQUE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
    `);

    // Remove spam / test events (e.g., 'ooooo', 'juhhhhhhhhhhhhhhhhhh', 'qqqqqqqqqqqqqqqqqqqqqqqqqq', '777777ttt')
    await pool.query(`
      DELETE FROM events 
      WHERE title ILIKE '%ooooo%' 
         OR title ILIKE '%juhhh%' 
         OR title ILIKE '%qqqqq%' 
         OR title ILIKE '%777777ttt%'
         OR length(title) < 4;
    `);

    // Upsert the 7 authentic official events
    for (const e of officialEvents) {
      await pool.query(`
        INSERT INTO events (slug, date_day, date_month, date_year, category, title, subtitle, image_url, filter_type, details) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)
        ON CONFLICT (slug) DO UPDATE SET
          date_day = EXCLUDED.date_day,
          date_month = EXCLUDED.date_month,
          date_year = EXCLUDED.date_year,
          category = EXCLUDED.category,
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          image_url = EXCLUDED.image_url,
          filter_type = EXCLUDED.filter_type,
          details = EXCLUDED.details;
      `, [
        e.slug,
        e.dateDay,
        e.dateMonth,
        e.dateYear,
        e.category,
        e.title,
        e.subtitle,
        e.imageUrl,
        e.filterType,
        JSON.stringify(e.details)
      ]);
    }

    console.log('Successfully seeded database with all 7 official events and cleaned test entries!');
  } catch (e) {
    console.error('Seed error:', e);
  } finally {
    await pool.end();
  }
}

seed();
