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

const mockEvents = [
  { dateDay: '15', dateMonth: 'MAR', dateYear: '2024', category: 'CONFERENCE', title: 'SIET International Conference', subtitle: 'Educational Technology in STEAM Education', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop', filterType: 'Conferences' },
  { dateDay: '10', dateMonth: 'JAN', dateYear: '2024', category: 'LECTURE', title: 'Prompt Engineering for Educators', subtitle: 'How to Improve Quality of Instruction', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop', filterType: 'Lectures' },
  { dateDay: 'APR', dateMonth: '–', dateYear: 'MAY 2024', category: 'COURSE', title: 'Selected Literary Terms', subtitle: 'A Certificate Course for Higher Secondary Students', imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop', filterType: 'Courses' },
  { dateDay: '30-31', dateMonth: 'MAY', dateYear: '2024', category: 'WORKSHOP', title: 'Shaping & Nurturing Future Teachers', subtitle: 'Transformative English Pedagogy', imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop', filterType: 'Workshops' },
  { dateDay: '2024', dateMonth: '', dateYear: '', category: 'INITIATIVE', title: 'STEM 4 Girls', subtitle: 'Empowering girl students across Kerala through hands-on STEM experiences', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop', filterType: 'STEM Camps' },
  { dateDay: '18-20', dateMonth: 'JUL', dateYear: '2025', category: 'STEM CAMP', title: 'STEM Camp for Gifted Students', subtitle: 'Inspiring young minds through innovation and exploration', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop', filterType: 'STEM Camps' }
];

async function seed() {
  try {
    for (const e of mockEvents) {
      const query = `
        INSERT INTO events (date_day, date_month, date_year, category, title, subtitle, image_url, filter_type) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      await pool.query(query, [e.dateDay, e.dateMonth, e.dateYear, e.category, e.title, e.subtitle, e.imageUrl, e.filterType]);
    }
    console.log('Seeded database with mock events!');
  } catch(e) {
    console.error('Seed error:', e);
  } finally {
    process.exit(0);
  }
}

seed();
