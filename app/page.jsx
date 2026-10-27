'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  Users,
  GraduationCap,
  Landmark,
  Globe,
  Calendar,
  Sparkles,
  Atom,
  Lightbulb,
  Building,
  School,
  MapPin,
  Clock,
  Monitor,
  HeartHandshake,
  Sprout,
  UserCheck,
  LayoutGrid,
  FlaskConical,
  Handshake,
  Building2,
  BookOpen
} from 'lucide-react';

import { getFromCache, fetchWithCache, prefetchEndpoint } from '../lib/clientCache';
import { sortEventsLatestFirst } from '../lib/eventUtils';

/* ---------- shared tokens matching About page ---------- */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const BLUE = 'text-[#1a6dff]';
const GLASS =
  'bg-gradient-to-br from-white/80 via-sky-50/60 to-blue-100/40 backdrop-blur-xl border border-white/90 shadow-[0_18px_45px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,1)]';

const Wrap = ({ children, className = '' }) => (
  <div className={`relative max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
);

const Em = ({ children, light = false }) => (
  <em style={SERIF} className={`italic font-normal ${light ? 'text-sky-300' : BLUE}`}>{children}</em>
);

function SectionTag({ number, text, light = false, circle = false, className = '' }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {number && (circle ? (
        <span style={SERIF} className="w-10 h-10 rounded-full bg-white/15 border border-white/40 backdrop-blur text-white flex items-center justify-center text-xl">{number}</span>
      ) : (
        <span style={SERIF} className="text-[26px] italic text-slate-400/90 -ml-1 font-light">{number}</span>
      ))}
      <span className="flex items-center gap-2">
        <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-sky-300' : 'bg-[#1a6dff]'}`} />
        <span className={`text-[11px] font-bold tracking-[0.22em] uppercase ${light ? 'text-sky-200' : BLUE}`}>{text}</span>
      </span>
    </div>
  );
}

function Dots({ rows = 5, cols = 10, className = '' }) {
  return (
    <div className={`grid gap-2 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-sky-400/60" />
      ))}
    </div>
  );
}

const ArrowBtn = ({ className = '' }) => (
  <span className={`w-7 h-7 rounded-full bg-[#1a6dff] text-white flex items-center justify-center shadow-[0_6px_14px_rgba(26,109,255,0.4)] ${className}`}>
    <ArrowRight size={13} />
  </span>
);

const Swirl = ({ className = '' }) => (
  <div className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-sky-300/50 to-blue-500/40 blur-2xl ${className}`} />
);

/* ---------- silky ocean streaks background ---------- */
function OceanWaves() {
  const colors = ['#ffffff', '#7dd3fc', '#0ea5e9', '#1d4ed8', '#bae6fd', '#0369a1'];
  const streaks = Array.from({ length: 40 }, (_, i) => ({
    d: `M -150 ${20 + i * 14} C 250 ${-80 + i * 12}, 650 ${240 - i * 3}, 1350 ${60 + i * 16}`,
    c: colors[(i * 5) % colors.length],
    w: 5 + ((i * 7) % 26),
    o: 0.25 + ((i * 13) % 50) / 100,
  }));
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="ocean-base-home" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf6ff" />
          <stop offset="0.45" stopColor="#4cb8f5" />
          <stop offset="1" stopColor="#1e40af" />
        </linearGradient>
        <filter id="ocean-blur-home"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect width="1200" height="600" fill="url(#ocean-base-home)" />
      <g filter="url(#ocean-blur-home)">
        {streaks.map((s, i) => (
          <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} opacity={s.o} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

const defaultFallbackEvents = [
  {
    id: 1,
    slug: 'lon-deb-strategy-hackathon',
    day: '29',
    month: 'NOV',
    year: '2025',
    tag: 'CONFERENCE',
    title: 'Lon-DEB Strategy Hackathon',
    location: 'Thiruvananthapuram, Kerala',
    duration: '2 Days Event',
    img: '/events/conference.jpg',
    link: '/events/lon-deb-strategy-hackathon'
  },
  {
    id: 2,
    slug: 'prompt-engineering-for-educators',
    day: '29',
    month: 'NOV',
    year: '2025',
    tag: 'WORKSHOP',
    title: 'Prompt Engineering for Educators',
    location: 'Thiruvananthapuram, Kerala',
    duration: '1 Day Workshop',
    img: '/events/workshop.jpg',
    link: '/events/prompt-engineering-for-educators'
  },
  {
    id: 3,
    slug: 'national-conference-for-stem',
    day: '30',
    month: 'NOV',
    year: '2025',
    tag: 'CONFERENCE',
    title: 'National Conference for stem',
    location: 'Thiruvananthapuram, Kerala',
    duration: '2 Days Event',
    img: '/events/scholar.jpg',
    link: '/events/national-conference-for-stem'
  },
  {
    id: 4,
    slug: 'global-sustainability-summit',
    day: '05',
    month: 'DEC',
    year: '2025',
    tag: 'SUMMIT',
    title: 'Global Sustainability Summit',
    location: 'Virtual',
    duration: '1 Day Event',
    img: '/events/conference.jpg',
    link: '/events/global-sustainability-summit'
  }
];

function formatEvents(data) {
  if (!Array.isArray(data) || data.length === 0) return defaultFallbackEvents;
  const sorted = sortEventsLatestFirst(data);
  return sorted.map((item, idx) => ({
    id: item.id || idx,
    slug: item.slug || `event-${item.id || idx}`,
    day: item.dateDay || item.date_day || item.day || '29',
    month: (item.dateMonth || item.date_month || item.month || 'NOV').toUpperCase(),
    year: item.dateYear || item.date_year || item.year || '2025',
    tag: (item.categoryTag || item.category || item.filterType || 'EVENT').toUpperCase(),
    title: item.title,
    location: item.location || (item.details && item.details.venue) || 'Thiruvananthapuram, Kerala',
    duration: item.duration || (item.details && item.details.time) || '2 Days Event',
    img: item.imageUrl || item.image_url || item.img || defaultFallbackEvents[idx % defaultFallbackEvents.length].img,
    link: `/events/${item.slug || item.id}`
  }));
}

// Static definition outside component to prevent re-creation and memory thrash
const PARTNER_COLLABORATORS = [
  {
    name: 'Clarkson',
    sub: 'University',
    isSerif: true,
    icon: (
      <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" className="opacity-60" />
        <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 15H27C27 21 22 25 22 25C22 25 17 21 17 15Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="22" cy="19" r="2" fill="currentColor" />
        <path d="M20 22L24 22" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    )
  },
  {
    name: 'University of Kerala',
    sub: 'Estd. 1937',
    isSerif: true,
    icon: (
      <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="19" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="22" cy="22" r="15" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" className="opacity-70" />
        <path d="M22 12L24.5 17H19.5L22 12Z" fill="currentColor" />
        <circle cx="22" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 29C17.5 25 26.5 25 28 29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 24C15 27 29 27 29 24" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    )
  },
  {
    name: 'SPARC',
    sub: 'MHRD / SPARC II Initiative',
    isSerif: false,
    icon: (
      <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 14C23 11 16 14 16 20C16 26 28 24 28 30C28 34 23 36 18 34" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="25" cy="19" r="6" stroke="currentColor" strokeWidth="1.6" className="opacity-50" />
        <ellipse cx="25" cy="19" rx="6" ry="2" stroke="currentColor" strokeWidth="1.2" className="opacity-75" />
      </svg>
    )
  },
  {
    name: 'University of Southampton',
    sub: 'United Kingdom',
    isSerif: true,
    icon: (
      <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 13H30V26C30 31 22 35 22 35C22 35 14 31 14 26V13Z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
        <path d="M22 17V28M17 22H27" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="22" cy="22" r="2" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'SIET',
    sub: 'Govt. of Kerala',
    isSerif: false,
    icon: (
      <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="13" y="13" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.1" />
        <path d="M17 26V18L22 22L27 18V26" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'REFORM',
    sub: 'Advancing Education',
    isSerif: false,
    icon: (
      <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12C15 15 14 24 22 32C30 24 29 15 22 12Z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.12" />
        <path d="M22 17V28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M22 21C25 20 26 19 26 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Child Development Centre',
    sub: 'Kazhakkoottam',
    isSerif: false,
    icon: (
      <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="16" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="22" cy="22" rx="13" ry="5" stroke="currentColor" strokeWidth="1.2" transform="rotate(30 22 22)" className="opacity-70" />
        <ellipse cx="22" cy="22" rx="13" ry="5" stroke="currentColor" strokeWidth="1.2" transform="rotate(-30 22 22)" className="opacity-70" />
        <circle cx="22" cy="22" r="3" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'CREATE Initiative',
    sub: 'SPARC II Project',
    isSerif: false,
    icon: (
      <svg viewBox="0 0 44 44" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="17" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" className="opacity-60" />
        <circle cx="22" cy="22" r="9" stroke="currentColor" strokeWidth="1.8" fill="currentColor" fillOpacity="0.15" />
        <path d="M22 5V13M22 31V39M5 22H13M31 22H39" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }
];

/* ------------------------------------------------------------------
   WHAT WE DO section helpers & art
------------------------------------------------------------------- */
const WWD_CARD =
  'relative overflow-hidden h-[236px] rounded-[1.6rem] bg-gradient-to-br from-white/85 via-white/60 to-blue-50/50 backdrop-blur-xl border border-white shadow-[0_22px_50px_rgba(37,99,235,0.10),inset_0_1px_0_#fff] hover:-translate-y-1 transition duration-300';

/* small dot-grid used inside card 4 and on the right of the section */
const WwdDots = ({ cols, rows, gap = 16, className = '' }) => (
  <div
    className={`grid pointer-events-none select-none ${className}`}
    style={{ gridTemplateColumns: `repeat(${cols}, 3px)`, gap }}
  >
    {Array.from({ length: cols * rows }).map((_, i) => (
      <span key={i} className="w-[3px] h-[3px] rounded-full bg-blue-500/70" />
    ))}
  </div>
);

/* ---------- decorative art, one per card ---------- */
const ArtConferences = () => (
  <>
    {/* glossy blue corner blob */}
    <div className="absolute top-0 right-0 w-[98px] h-[94px] rounded-bl-[64px] bg-[radial-gradient(circle_at_85%_20%,#2f6bff_0%,#6ea2ff_45%,#cfe0ff_100%)] opacity-90" />
    {/* fine mesh lines */}
    <svg className="absolute top-0 right-[70px] w-[90px] h-[120px]" viewBox="0 0 90 120" fill="none">
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M${90} ${i * 4} C ${55 - i * 3} ${10 + i * 8}, ${40 - i * 3} ${60 + i * 6}, ${90} ${118 - i * 3}`} stroke="#60a5fa" strokeOpacity="0.35" strokeWidth="0.6" />
      ))}
    </svg>
    <span className="absolute left-[142px] top-[58px] w-[15px] h-[15px] rounded-full bg-blue-300/70" />
    <span className="absolute left-[250px] top-[110px] w-[7px] h-[7px] rounded-full bg-blue-400" />
  </>
);

const ArtWorkshops = () => (
  <>
    <svg className="absolute top-0 right-0 w-[300px] h-[125px]" viewBox="0 0 300 125" fill="none">
      <defs>
        <linearGradient id="wwd-wave" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0" />
          <stop offset="1" stopColor="#93c5fd" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path d="M40 100 C110 80 150 30 220 0 L300 0 L300 125 C240 110 200 70 140 85 C100 95 80 110 40 100Z" fill="url(#wwd-wave)" />
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M30 ${98 + i * 1.5} C 100 ${72 + i * 3}, 160 ${25 + i * 5}, 300 ${14 + i * 12}`} stroke="#3b82f6" strokeOpacity="0.28" strokeWidth="0.6" />
      ))}
    </svg>
    <span className="absolute left-[255px] top-[68px] w-2 h-2 rounded-full bg-blue-600" />
  </>
);

const ArtTraining = () => (
  <>
    <div className="absolute left-[170px] top-[52px] w-[62px] h-[54px] rounded-xl bg-blue-200/30 backdrop-blur-sm border border-white/60" />
    <div className="absolute left-[222px] top-[26px] w-[54px] h-[52px] rounded-xl bg-blue-300/35 backdrop-blur-sm border border-white/60" />
    <div className="absolute left-[205px] top-[44px] w-[50px] h-[52px] rounded-xl bg-blue-400/30 backdrop-blur-sm border border-white/60" />
    <span className="absolute left-[169px] top-[60px] w-[18px] h-[18px] rounded-full bg-blue-200/70" />
    <span className="absolute left-[264px] top-[96px] w-2 h-2 rounded-full bg-blue-300" />
  </>
);

const ArtStem = () => (
  <>
    <div className="absolute -top-[48px] right-[-6px] w-[160px] h-[160px] rounded-full bg-[radial-gradient(circle_at_70%_30%,#2f6bff_0%,#6ea2ff_40%,#dbe8ff_100%)] opacity-85" />
    <div className="absolute -top-[40px] right-[4px] w-[210px] h-[210px] rounded-full border border-blue-200/50" />
    <WwdDots cols={5} rows={3} gap={15} className="absolute left-[192px] top-[80px]" />
    <span className="absolute left-[270px] top-[96px] w-[10px] h-px bg-blue-300" />
  </>
);

/* ---------- section ---------- */
function WhatWeDo() {
  const items = [
    { title: 'Conferences', desc: 'Global conversations on education and innovation.', icon: Users, art: <ArtConferences />, link: '/events' },
    { title: 'Workshops', desc: 'Hands-on learning experiences and skill building.', icon: Lightbulb, art: <ArtWorkshops />, link: '/events' },
    { title: 'Training Programmes', desc: 'Capacity building for educators and learners.', icon: GraduationCap, art: <ArtTraining />, link: '/events' },
    { title: 'STEM Labs', desc: 'Experiential learning through practical exploration.', icon: FlaskConical, art: <ArtStem />, link: '/events' },
  ];

  return (
    <section className="relative overflow-hidden pt-14 pb-14 bg-[#f6f9ff]">
      {/* ---- left: big blue orb + concentric arcs + dot ---- */}
      <div className="hidden lg:block absolute -left-[150px] top-[105px] w-[330px] h-[240px] rounded-full bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.75)_0%,rgba(96,165,250,0.45)_45%,rgba(191,219,254,0)_75%)] blur-[6px]" />
      <svg className="hidden lg:block absolute left-0 top-[20px] w-[320px] h-[240px] pointer-events-none" viewBox="0 0 320 240" fill="none">
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M0 ${52 + i * 6} C ${120 + i * 6} ${30 + i * 6}, ${250 + i * 8} ${90 + i * 8}, ${290 + i * 6} ${230}`} stroke="#60a5fa" strokeOpacity={0.4 - i * 0.07} strokeWidth="0.8" />
        ))}
      </svg>
      <span className="hidden lg:block absolute left-[173px] top-[106px] w-[14px] h-[14px] rounded-full bg-blue-500" />

      {/* ---- right: soft blob, swoosh lines, dot grid, ring ---- */}
      <div className="hidden lg:block absolute -right-[60px] -top-[40px] w-[260px] h-[220px] rounded-full bg-sky-200/60 blur-3xl" />
      <svg className="hidden lg:block absolute right-0 top-0 w-[420px] h-[260px] pointer-events-none" viewBox="0 0 420 260" fill="none">
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M0 ${250 - i * 4} C 150 ${215 - i * 6}, 300 ${130 - i * 10}, 420 ${i * 10}`} stroke="#3b82f6" strokeOpacity={0.5 - i * 0.12} strokeWidth="0.9" />
        ))}
      </svg>
      <WwdDots cols={4} rows={6} gap={16} className="hidden lg:grid absolute right-[12px] top-[150px]" />
      <span className="hidden lg:block absolute right-[54px] top-[335px] w-[10px] h-[10px] rounded-full border border-blue-500" />

      <Wrap>
        {/* heading */}
        <div className="text-center mb-11">
          <span className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a6dff]" />
            <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${BLUE}`}>WHAT WE DO</span>
          </span>
          <h2 style={SERIF} className="text-[40px] sm:text-5xl font-normal text-[#0f1a3a] leading-[1.06] tracking-tight">
            Empowering through<br /><Em>learning and discovery.</Em>
          </h2>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px] lg:px-6">
          {items.map((item) => (
            <div key={item.title} className={`${WWD_CARD} group`}>
              {item.art}

              <div className="relative p-[30px] pt-[26px]">
                <span className="w-[58px] h-[58px] rounded-full bg-white/80 border border-white shadow-[0_8px_20px_rgba(37,99,235,0.12),inset_0_1px_0_#fff] flex items-center justify-center">
                  <item.icon size={24} strokeWidth={1.5} className={BLUE} />
                </span>
                <h3 style={SERIF} className="text-[25px] font-normal text-[#0f1a3a] leading-tight mt-[18px] group-hover:text-[#1a6dff] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-[1.5] mt-2 max-w-[260px]">{item.desc}</p>
              </div>

              <span className="absolute left-[30px] bottom-[27px] w-[26px] h-px bg-slate-300" />
              <Link href={item.link} aria-label={item.title} className="absolute right-4 bottom-4 inline-flex">
                <ArrowBtn className="!w-10 !h-10" />
              </Link>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------
   Drop-in "Building partnerships. Driving change." section (no image).
   Uses helpers already in your page: Link, Em, SERIF, BLUE, ArrowRight
------------------------------------------------------------------- */

/* ---------- little dot grid (SVG, screenshot-style) ---------- */
const PDots = ({ cols, rows, gap = 16, className = '', color = 'bg-sky-400/50' }) => (
  <div className={`grid pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 2px)`, gap }}>
    {Array.from({ length: cols * rows }).map((_, i) => (
      <span key={i} className={`w-[2px] h-[2px] rounded-full ${color}`} />
    ))}
  </div>
);

/* ---------- centre orbit diagram (drawn in screenshot coordinates) ---------- */
function OrbitDiagram() {
  const S = 1.38; // screenshot px -> css px
  const at = (x, y, size) => ({
    left: (x - 640) / S - size / 2,
    top: (y - 150) / S - size / 2,
    width: size,
    height: size,
  });
  const node = 'absolute rounded-full bg-white/85 backdrop-blur-md border border-white flex items-center justify-center shadow-[0_14px_30px_rgba(37,99,235,0.16),inset_0_2px_6px_#fff]';

  const dotsA = [];
  for (let r = 0; r < 6; r++) for (let c = 0; c < 8; c++) dotsA.push([944 + c * 20, 242 + r * 18]);
  const dotsB = [];
  for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) dotsB.push([802 + c * 17, 548 + r * 20]);

  return (
    <div className="relative w-[362px] h-[391px] mx-auto xl:mx-0 shrink-0">
      <svg viewBox="640 150 500 540" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <radialGradient id="pb-blob" cx="0.5" cy="0.45" r="0.55">
            <stop offset="0" stopColor="#8fbaff" stopOpacity="0.85" />
            <stop offset="0.7" stopColor="#bfd8ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#dbeafe" stopOpacity="0" />
          </radialGradient>
          <filter id="pb-blur"><feGaussianBlur stdDeviation="9" /></filter>
        </defs>
        <ellipse cx="945" cy="360" rx="165" ry="190" fill="#dbeafe" opacity="0.55" filter="url(#pb-blur)" />
        <circle cx="850" cy="330" r="128" fill="url(#pb-blob)" />
        <ellipse cx="880" cy="335" rx="215" ry="160" transform="rotate(-22 880 335)" stroke="#bfdbfe" strokeDasharray="4 6" />
        <ellipse cx="868" cy="350" rx="210" ry="128" transform="rotate(-27 868 350)" stroke="#3b82f6" strokeOpacity="0.55" strokeWidth="1.2" />
        <ellipse cx="945" cy="520" rx="122" ry="150" transform="rotate(14 945 520)" stroke="#3b82f6" strokeOpacity="0.45" strokeWidth="1.1" />
        <circle cx="928" cy="452" r="100" stroke="#93c5fd" strokeDasharray="4 5" />
        {dotsA.map(([x, y], i) => <circle key={`a${i}`} cx={x} cy={y} r="1.3" fill="#93c5fd" opacity={0.7 - (i % 8) * 0.07} />)}
        {dotsB.map(([x, y], i) => <circle key={`b${i}`} cx={x} cy={y} r="1.3" fill="#93c5fd" opacity="0.6" />)}
        {[[1020, 245, 7], [722, 398, 7], [1006, 375, 6], [832, 523, 7], [854, 641, 3]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#1a6dff" />
        ))}
      </svg>

      <span className={node} style={at(803, 352, 67)}><Handshake size={26} strokeWidth={1.5} className={BLUE} /></span>
      <span className={`${node} ring-[10px] ring-white/40`} style={at(928, 452, 81)}><Handshake size={30} strokeWidth={1.5} className={BLUE} /></span>
      <span className={node} style={at(1074, 509, 64)}><BookOpen size={26} strokeWidth={1.5} className={BLUE} /></span>
      <span className={node} style={at(980, 628, 62)}><Sprout size={24} strokeWidth={1.5} className={BLUE} /></span>
    </div>
  );
}

/* ---------- card artwork (bottom-right waves) ---------- */
function CardArt({ id, wave, tone, lines = false, dot, curve }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 270 195" preserveAspectRatio="xMaxYMax slice" fill="none">
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={tone[0]} stopOpacity="0.05" />
          <stop offset="1" stopColor={tone[1]} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path d={wave} fill={`url(#g-${id})`} />
      {lines && Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d={`M${150 + i * 2} 195 C ${190 + i * 2} ${185 - i}, ${215 + i * 2} ${170 - i * 2}, ${240 + i} ${120 - i * 2} S ${255} ${100 - i * 1.5}, 262 ${94 - i}`} stroke={tone[1]} strokeOpacity="0.35" strokeWidth="0.6" />
      ))}
      {curve && <path d={curve} stroke={tone[1]} strokeOpacity="0.6" strokeWidth="0.9" />}
      {dot && <circle cx={dot[0]} cy={dot[1]} r={dot[2]} fill={dot[3]} />}
    </svg>
  );
}

const PCARD =
  'relative overflow-hidden h-[195px] rounded-[1.8rem] bg-gradient-to-br from-white/80 via-white/55 to-blue-50/40 backdrop-blur-xl border border-white shadow-[0_18px_40px_rgba(37,99,235,0.08),inset_0_1px_0_#fff] hover:-translate-y-1 transition duration-300';

function PartnershipsShowcase() {
  const cards = [
    {
      n: '01', t: 'STEM Learning Lab', d: 'Hands-on, activity-based STEM learning for school students.',
      icon: GraduationCap, iconBg: 'bg-blue-100/90', iconColor: BLUE, dw: 'max-w-[165px]',
      art: <CardArt id="c1" lines tone={['#93c5fd', '#3b82f6']} wave="M147 195 C 185 185, 215 170, 235 135 C 245 118, 252 105, 262 95 L262 195Z" dot={[212, 149, 2.5, '#3b82f6']} />,
    },
    {
      n: '02', t: 'Scholar Connect', d: 'A platform for research exchange and collaborative opportunities.',
      icon: Users, iconBg: 'bg-blue-100/90', iconColor: BLUE, dw: 'max-w-[170px]',
      art: <CardArt id="c2" tone={['#c4b5fd', '#a5b4fc']} wave="M150 195 C 190 170, 225 150, 245 110 C 255 90, 262 70, 270 62 L270 195Z" curve="M190 195 C 215 170, 245 130, 270 100" dot={[198, 175, 4, '#6366f1']} />,
    },
    {
      n: '03', t: 'Institutional Collaborations', d: 'Partnering with reputed institutions for greater impact.',
      icon: Building2, iconBg: 'bg-cyan-50', iconColor: 'text-cyan-500', dw: 'max-w-[190px]',
      art: <CardArt id="c3" tone={['#99f6e4', '#5eead4']} wave="M115 195 C 160 190, 200 175, 225 150 C 240 130, 252 112, 262 100 L262 195Z" dot={[201, 165, 3, '#34d399']} />,
    },
    {
      n: '04', t: 'Global Engagement', d: 'Creating opportunities for a more inclusive and sustainable future.',
      icon: Globe, iconBg: 'bg-blue-100/90', iconColor: BLUE, dw: 'max-w-[165px]',
      art: <CardArt id="c4" tone={['#bfdbfe', '#60a5fa']} wave="M190 195 C 205 150, 235 130, 250 100 C 258 90, 265 85, 270 80 L270 195Z" curve="M214 158 C 222 110, 232 80, 247 64" dot={[247, 64, 4, '#60a5fa']} />,
    },
  ];

  return (
    <section className="relative overflow-hidden py-14">
      <div className="relative mx-auto max-w-[1376px] px-4 xl:px-0">
        {/* ---- decorations that bleed outside the panel ---- */}
        <div className="hidden xl:block absolute -left-[70px] -top-[20px] w-[200px] h-[130px] rounded-full bg-sky-300/40 blur-3xl pointer-events-none" />
        <div className="hidden xl:block absolute -right-[60px] -top-[30px] w-[170px] h-[200px] rounded-full bg-blue-300/50 blur-3xl pointer-events-none" />
        <PDots cols={6} rows={4} gap={16} className="hidden xl:grid absolute right-[192px] -top-[51px]" />

        {/* ---- the big glass panel ---- */}
        <div className="relative rounded-[2.8rem] bg-gradient-to-br from-white/75 via-[#f1f6ff]/80 to-[#e6efff]/70 backdrop-blur-xl border border-white/90 shadow-[0_30px_70px_rgba(37,99,235,0.10),inset_0_1px_0_#fff] px-6 py-10 xl:px-0 xl:py-0 xl:h-[460px] xl:grid xl:grid-cols-[67px_365px_362px_minmax(0,1fr)] xl:items-start">
          <PDots cols={9} rows={5} gap={14} className="hidden xl:grid absolute left-[100px] bottom-[28px] opacity-60" />
          <div className="hidden xl:block" />

          {/* left copy */}
          <div className="xl:pt-[45px]">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a6dff]" />
              <span className={`text-[12px] font-medium tracking-[0.12em] uppercase ${BLUE}`}>OUR PARTNERSHIPS</span>
              <span className="hidden sm:block w-[107px] h-px bg-gradient-to-r from-blue-400/60 to-transparent" />
            </div>
            <h3 style={SERIF} className="mt-[22px] text-[40px] sm:text-5xl font-normal text-[#0f1a3a] leading-[1.15] tracking-tight whitespace-nowrap">
              Building partnerships.<br />
              <Em>Driving change.</Em>
            </h3>
            <p className="mt-6 text-[15px] leading-[1.4] text-slate-500 max-w-[365px]">
              We collaborate with institutions, educators and communities to create meaningful learning experiences and a brighter, sustainable future for all.
            </p>
            <Link href="/initiatives" className="inline-flex mt-8">
              <span className="h-[45px] pl-7 pr-2.5 rounded-full bg-gradient-to-r from-[#0a6cff] to-[#1b8cff] text-white text-[13px] font-bold uppercase tracking-[0.1em] flex items-center gap-7 shadow-[0_14px_28px_rgba(10,108,255,0.38)] hover:scale-[1.03] transition">
                Our Initiatives
                <span className="w-[30px] h-[30px] rounded-full bg-white/25 flex items-center justify-center"><ArrowRight size={14} /></span>
              </span>
            </Link>
          </div>

          {/* centre orbit */}
          <div className="mt-10 xl:mt-[62px] xl:ml-[8px]"><OrbitDiagram /></div>

          {/* right 2x2 cards */}
          <div className="mt-10 xl:mt-[36px] xl:ml-[6px] xl:pr-[29px] grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            {cards.map((c) => (
              <div key={c.n} className={`${PCARD} group`}>
                {c.art}
                <div className="relative px-[22px] pt-[15px]">
                  <div className="flex items-start gap-5">
                    <span className={`w-14 h-14 rounded-full ${c.iconBg} flex items-center justify-center shadow-[inset_0_1px_0_#fff]`}>
                      <c.icon size={24} strokeWidth={1.5} className={c.iconColor} />
                    </span>
                    <span className="text-[12px] font-medium text-[#a5bde8] mt-[6px]">{c.n}</span>
                  </div>
                  <h4 className="mt-[22px] text-[15.5px] font-semibold text-[#0f1a3a] leading-tight">{c.t}</h4>
                  <p className={`mt-1.5 text-[12px] leading-[16px] text-slate-500 ${c.dw}`}>{c.d}</p>
                </div>
                <Link href="/initiatives" aria-label={c.t} className="absolute left-6 bottom-[10px] w-7 h-7 rounded-full bg-white shadow-[0_6px_14px_rgba(37,99,235,0.15)] flex items-center justify-center text-[#1a6dff] hover:scale-110 transition">
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ---- curves that cross the panel edges ---- */}
        <svg className="hidden xl:block absolute -left-[35px] top-[300px] w-[180px] h-[240px] pointer-events-none z-10" viewBox="0 0 180 240" fill="none">
          <path d="M0 19 C 40 50, 70 80, 88 100 C 105 135, 130 185, 175 235" stroke="#3b82f6" strokeOpacity="0.55" strokeWidth="1" />
          <path d="M0 40 C 35 62, 65 85, 88 100 C 112 150, 140 190, 160 240" stroke="#93c5fd" strokeOpacity="0.5" strokeWidth="1" />
          <circle cx="88" cy="100" r="8" fill="#1a6dff" />
        </svg>
        <svg className="hidden xl:block absolute -right-[35px] -top-[58px] w-[260px] h-[140px] pointer-events-none z-10" viewBox="0 0 260 140" fill="none">
          <path d="M40 0 C 70 30, 95 50, 115 52 C 150 55, 205 48, 260 105" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="1" />
          <path d="M115 52 C 170 38, 230 58, 260 88" stroke="#93c5fd" strokeOpacity="0.6" strokeWidth="1" />
          <circle cx="115" cy="52" r="7.5" fill="#1a6dff" />
        </svg>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   FOCUS AREAS SECTION HELPERS & ART (matching design mockup)
------------------------------------------------------------------- */
const FocusArtStem = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 330" fill="none">
    <defs>
      <radialGradient id="stem-blob" cx="0.85" cy="0.85" r="0.6">
        <stop offset="0" stopColor="#3b82f6" stopOpacity="0.55" />
        <stop offset="0.6" stopColor="#93c5fd" stopOpacity="0.3" />
        <stop offset="1" stopColor="#dbeafe" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="210" cy="290" r="100" fill="url(#stem-blob)" />
    {Array.from({ length: 6 }).map((_, i) => (
      <path
        key={i}
        d={`M ${110 + i * 15} 330 C ${140 + i * 12} ${295 - i * 5}, ${180 + i * 8} ${260 - i * 4}, 240 ${245 - i * 6}`}
        stroke="#60a5fa"
        strokeOpacity={0.35 - i * 0.04}
        strokeWidth="0.75"
      />
    ))}
    <path d="M 120 310 C 160 280, 195 260, 240 250" stroke="#3b82f6" strokeOpacity="0.65" strokeWidth="0.9" />
    <circle cx="185" cy="272" r="3.5" fill="#1a6dff" />
  </svg>
);

const FocusArtDigital = () => (
  <div className="absolute right-2 bottom-3 w-[130px] h-[130px] pointer-events-none select-none">
    <div className="absolute right-9 bottom-9 w-[54px] h-[60px] rounded-xl bg-blue-300/30 backdrop-blur-md border border-white/60 shadow-sm transform -rotate-3" />
    <div className="absolute right-3 bottom-5 w-[62px] h-[68px] rounded-2xl bg-gradient-to-br from-blue-400/35 via-blue-500/25 to-sky-300/20 backdrop-blur-md border border-white/80 shadow-[0_8px_20px_rgba(37,99,235,0.12)]" />
    <div className="absolute right-7 bottom-2 w-[48px] h-[50px] rounded-xl bg-sky-200/40 backdrop-blur-sm border border-white/60" />
    <span className="absolute right-[52px] bottom-[32px] w-2 h-2 rounded-full bg-blue-500/80" />
  </div>
);

const FocusArtSustainability = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 330" fill="none">
    <defs>
      <linearGradient id="c3-teal-wave" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#5eead4" stopOpacity="0.15" />
        <stop offset="0.7" stopColor="#0d9488" stopOpacity="0.45" />
        <stop offset="1" stopColor="#14b8a6" stopOpacity="0.75" />
      </linearGradient>
    </defs>
    <path d="M 120 330 C 150 280, 185 240, 240 215 L 240 330 Z" fill="url(#c3-teal-wave)" />
    <path d="M 100 330 C 145 285, 185 235, 240 200" stroke="#14b8a6" strokeOpacity="0.55" strokeWidth="1" />
    <circle cx="178" cy="265" r="3.5" fill="#0d9488" />
  </svg>
);

const FocusArtTeacher = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 330" fill="none">
    <defs>
      <linearGradient id="c4-blue-wave" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#93c5fd" stopOpacity="0.2" />
        <stop offset="0.6" stopColor="#3b82f6" stopOpacity="0.65" />
        <stop offset="1" stopColor="#1d4ed8" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <path d="M 140 330 C 160 260, 200 230, 240 205 L 240 330 Z" fill="url(#c4-blue-wave)" />
    <path d="M 120 330 C 160 270, 210 210, 240 185" stroke="#3b82f6" strokeOpacity="0.6" strokeWidth="1" />
    <circle cx="218" cy="216" r="3.5" fill="#1a6dff" />
  </svg>
);

const FocusArtEquity = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 330" fill="none">
    <defs>
      <radialGradient id="c5-violet-glow" cx="0.8" cy="0.85" r="0.65">
        <stop offset="0" stopColor="#6366f1" stopOpacity="0.6" />
        <stop offset="0.55" stopColor="#818cf8" stopOpacity="0.35" />
        <stop offset="1" stopColor="#c7d2fe" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="205" cy="285" r="85" fill="url(#c5-violet-glow)" />
    <path d="M 130 330 C 165 270, 205 240, 240 235" stroke="#6366f1" strokeOpacity="0.6" strokeWidth="1" />
    <circle cx="195" cy="265" r="3.5" fill="#4f46e5" />
  </svg>
);

function FocusAreas() {
  const areas = [
    {
      num: '01',
      title: 'STEM\nEducation',
      desc: 'Advancing Science, Technology, Engineering and Mathematics education for future-ready learners.',
      iconBadge: (
        <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2f6bff] to-[#1a5ce6] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] ring-8 ring-blue-100/50 shrink-0">
          <Atom size={22} strokeWidth={1.75} className="text-white" />
        </span>
      ),
      art: <FocusArtStem />,
      link: '/initiatives'
    },
    {
      num: '02',
      title: 'Digital Learning\n& AI in Education',
      desc: 'Developing innovative digital tools and integrating AI to enhance learning experiences.',
      iconBadge: (
        <span className="w-12 h-12 rounded-full bg-white/85 border border-white text-[#1a6dff] flex items-center justify-center shadow-[0_6px_18px_rgba(37,99,235,0.12),inset_0_1px_0_#fff] ring-8 ring-blue-50/70 shrink-0">
          <Monitor size={20} strokeWidth={1.6} className="text-[#1a6dff]" />
        </span>
      ),
      art: <FocusArtDigital />,
      link: '/initiatives'
    },
    {
      num: '03',
      title: 'Sustainability\nEducation',
      desc: 'Integrating sustainability into education and community engagement.',
      iconBadge: (
        <span className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.6)] ring-8 ring-blue-100/50 shrink-0">
          <Leaf size={20} strokeWidth={1.75} className="text-white" />
        </span>
      ),
      art: <FocusArtSustainability />,
      link: '/initiatives'
    },
    {
      num: '04',
      title: 'Teacher Capacity\nBuilding',
      desc: 'Strengthening the skills and competencies of teachers and educators.',
      iconBadge: (
        <span className="w-12 h-12 rounded-full bg-white/85 border border-white text-[#1a6dff] flex items-center justify-center shadow-[0_6px_18px_rgba(37,99,235,0.12),inset_0_1px_0_#fff] ring-8 ring-blue-50/70 shrink-0">
          <Users size={20} strokeWidth={1.6} className="text-[#1a6dff]" />
        </span>
      ),
      art: <FocusArtTeacher />,
      link: '/initiatives'
    },
    {
      num: '05',
      title: 'Equity & Inclusive\nEducation',
      desc: 'Creating opportunities for all learners, without barriers.',
      iconBadge: (
        <span className="w-12 h-12 rounded-full bg-white/85 border border-white text-[#1a6dff] flex items-center justify-center shadow-[0_6px_18px_rgba(37,99,235,0.12),inset_0_1px_0_#fff] ring-8 ring-blue-50/70 shrink-0">
          <HeartHandshake size={20} strokeWidth={1.6} className="text-[#1a6dff]" />
        </span>
      ),
      art: <FocusArtEquity />,
      link: '/initiatives'
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-[#f8faff] via-white to-[#f4f8ff]/60">
      {/* Background Ambience: Left Mesh Lines & Glow */}
      <div className="hidden lg:block absolute -left-[100px] top-[20px] w-[380px] h-[340px] rounded-full bg-blue-200/35 blur-3xl pointer-events-none" />
      <svg className="hidden lg:block absolute -left-[70px] top-[30px] w-[400px] h-[380px] pointer-events-none" viewBox="0 0 400 380" fill="none">
        {Array.from({ length: 18 }).map((_, i) => (
          <path
            key={i}
            d={`M 0 ${50 + i * 16} C ${70 + i * 8} ${110 + i * 10}, ${150 + i * 12} ${250}, ${340} ${190 + i * 5}`}
            stroke="#93c5fd"
            strokeOpacity={0.42 - i * 0.016}
            strokeWidth="0.75"
          />
        ))}
        <path d="M 0 290 C 130 290, 210 250, 280 205" stroke="#3b82f6" strokeOpacity="0.55" strokeWidth="1" />
        <circle cx="280" cy="205" r="4.5" fill="#1a6dff" />
        <circle cx="280" cy="205" r="9" stroke="#93c5fd" strokeOpacity="0.45" strokeWidth="1" />
      </svg>

      {/* Background Ambience: Top Right Orbit with Text Along Curve & Glowing Flare */}
      <svg className="hidden xl:block absolute right-[-20px] -top-[45px] w-[540px] h-[280px] pointer-events-none" viewBox="0 0 540 280" fill="none">
        <defs>
          <path id="orbit-text-curve" d="M 120 200 C 220 120, 350 50, 510 24" fill="none" />
          <filter id="flare-glow"><feGaussianBlur stdDeviation="7" /></filter>
        </defs>
        <path d="M 100 220 C 205 132, 350 62, 520 34" stroke="#bfdbfe" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="3 5" />
        <path d="M 135 188 C 230 110, 360 45, 530 18" stroke="#60a5fa" strokeOpacity="0.35" strokeWidth="0.9" />
        <path d="M 165 160 C 255 92, 375 32, 540 6" stroke="#93c5fd" strokeOpacity="0.3" strokeWidth="0.75" />

        <text fill="#94a3b8" fontSize="9.5" fontWeight="600" letterSpacing="0.26em" opacity="0.85">
          <textPath href="#orbit-text-curve" startOffset="3%">
            • LEARN • INNOVATE • COLLABORATE • SUSTAIN •
          </textPath>
        </text>

        <circle cx="390" cy="46" r="16" fill="#38bdf8" filter="url(#flare-glow)" opacity="0.5" />
        <circle cx="390" cy="46" r="5" fill="#1a6dff" />
        <circle cx="220" cy="145" r="2.5" fill="#60a5fa" />
        <circle cx="475" cy="26" r="3" fill="#3b82f6" />
      </svg>

      {/* Subtle connector line passing behind cards */}
      <svg className="hidden lg:block absolute left-0 bottom-[75px] w-full h-[100px] pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 100" fill="none">
        <path d="M 30 80 C 230 95, 460 45, 680 65 C 890 85, 1060 30, 1180 75" stroke="#93c5fd" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="270" cy="88" r="3" fill="#1a6dff" />
        <circle cx="630" cy="61" r="3" fill="#1a6dff" />
        <circle cx="950" cy="68" r="3" fill="#1a6dff" />
      </svg>

      <div className="relative mx-auto max-w-[1376px] px-4 sm:px-6 xl:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1a6dff]" />
              <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#1a6dff]">OUR FOCUS AREAS</span>
              <span className="w-20 h-px bg-blue-200" />
            </div>
            <h2 style={SERIF} className="text-[38px] sm:text-5xl font-normal text-[#0f1a3a] leading-[1.08] tracking-tight">
              Key areas of<br />
              <Em>educational innovation.</Em> <span className="font-light text-blue-300 not-italic ml-2 text-3xl sm:text-4xl select-none">//</span>
            </h2>
          </div>

          <div className="flex items-start gap-3 max-w-[430px] lg:mb-2">
            <span className="w-2 h-2 rounded-full bg-[#1a6dff] mt-2 shrink-0" />
            <p className="text-[13.5px] sm:text-[14px] text-slate-500 leading-relaxed font-normal">
              We work at the intersection of learning, technology and sustainability to create meaningful opportunities for students, teachers and the wider community.
            </p>
          </div>
        </div>

        {/* 5 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-4.5">
          {areas.map((area) => (
            <div
              key={area.num}
              className="relative rounded-[2rem] bg-gradient-to-b from-white/95 via-white/80 to-[#f0f6ff]/75 backdrop-blur-xl border border-white shadow-[0_20px_45px_rgba(37,99,235,0.08),inset_0_1px_0_#fff] p-6 pb-5 flex flex-col justify-between overflow-hidden h-[335px] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {area.art}

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span style={SERIF} className="text-[26px] font-normal text-blue-300 select-none leading-none">
                    {area.num}
                  </span>
                  {area.iconBadge}
                </div>

                <div className="mt-6">
                  <h3 style={SERIF} className="text-[20px] font-normal text-[#0f1a3a] leading-[1.18] tracking-tight group-hover:text-[#1a6dff] transition-colors whitespace-pre-line">
                    {area.title}
                  </h3>
                  <p className="text-[12px] sm:text-[12.5px] text-slate-500 leading-[1.55] mt-2.5 max-w-[210px] font-normal">
                    {area.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between relative z-10">
                <Link
                  href={area.link}
                  aria-label={area.title.replace('\n', ' ')}
                  className="w-9 h-9 rounded-full bg-white shadow-[0_6px_16px_rgba(37,99,235,0.14)] border border-white flex items-center justify-center text-[#1a6dff] hover:scale-110 group-hover:bg-[#1a6dff] group-hover:text-white transition-all duration-300 shrink-0"
                >
                  <ArrowRight size={14} strokeWidth={2} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  // Read instant cache synchronously to prevent layout shifts & flash of empty content
  const [upcomingEvents, setUpcomingEvents] = useState(() => {
    if (typeof window !== 'undefined') {
      const cached = getFromCache('clese_events_cache');
      if (cached && Array.isArray(cached) && cached.length > 0) {
        return formatEvents(cached);
      }
    }
    return defaultFallbackEvents;
  });

  useEffect(() => {
    let isMounted = true;

    // Fetch fresh events smoothly in background
    fetchWithCache('/api/events', 'clese_events_cache', formatEvents)
      .then((formatted) => {
        if (isMounted && Array.isArray(formatted) && formatted.length > 0) {
          setUpcomingEvents(formatted);
        }
      })
      .catch((err) => {
        // Silently fallback without disrupting UI
      });

    // Defer prefetching secondary endpoints until the browser is idle to avoid network contention
    let timeoutId;
    if (typeof window !== 'undefined') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => {
          if (isMounted) {
            prefetchEndpoint('/api/initiatives', 'clese_initiatives_cache');
            prefetchEndpoint('/api/news', 'clese_news_cache');
            prefetchEndpoint('/api/resources', 'clese_resources_cache');
          }
        });
      } else {
        timeoutId = setTimeout(() => {
          if (isMounted) {
            prefetchEndpoint('/api/initiatives', 'clese_initiatives_cache');
            prefetchEndpoint('/api/news', 'clese_news_cache');
            prefetchEndpoint('/api/resources', 'clese_resources_cache');
          }
        }, 2500);
      }
    }

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const marqueeList = useMemo(() => [...PARTNER_COLLABORATORS, ...PARTNER_COLLABORATORS], []);

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-slate-900 font-sans overflow-x-hidden relative" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=Mrs+Saint+Delafield&display=swap');`}</style>

      {/* ========================================================================= */}
      {/* 1. HERO AREA: FULL-VIEWPORT SHOWCASE */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden min-h-[calc(100vh-70px)] sm:min-h-screen flex flex-col justify-center py-20 sm:py-24">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[75%]">
          <OceanWaves />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/70 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/85 to-transparent pointer-events-none" />

        {/* decorative ring + dots on the left edge */}
        <div className="hidden lg:block absolute -left-[270px] top-[22%] w-[320px] h-[320px] rounded-full border border-sky-400/50" />
        <div className="hidden lg:block absolute left-[80px] top-[60%] w-2.5 h-2.5 rounded-full bg-[#1a6dff]" />
        <Dots rows={8} cols={5} className="hidden lg:grid absolute left-3 bottom-16" />

        <Wrap className="w-full relative z-10 my-auto">
          <div className="grid lg:grid-cols-12 items-center gap-10 lg:gap-8">

            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase ${BLUE}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a6dff]" />LEARNING TODAY, SUSTAINING TOMORROW
              </span>

              <h1 style={SERIF} className="text-[52px] sm:text-[66px] lg:text-[74px] leading-[1.03] tracking-tight font-normal text-slate-900">
                Empowering minds.<br />
                <em className={`${BLUE} font-normal`}>Building a<br />sustainable future.</em>
              </h1>

              <p className="text-slate-600 text-[15px] sm:text-[16px] leading-[1.8] max-w-[500px]">
                Advancing innovative, inclusive, and sustainable education with a special focus on hands-on STEM learning. Join us in cultivating curiosity and shaping impactful futures.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/about" className="inline-flex">
                  <span className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 shadow-[0_12px_26px_rgba(10,108,255,0.4)] hover:scale-[1.03] transition">
                    Explore Our Journey <ArrowRight size={13} />
                  </span>
                </Link>

                <Link href="/events" className="inline-flex">
                  <span className="px-8 py-3.5 rounded-full bg-white/90 border border-white shadow-[0_10px_24px_rgba(37,99,235,0.14)] text-[#1a6dff] text-xs font-bold uppercase tracking-wider flex items-center gap-3 hover:scale-[1.03] transition">
                    <Calendar size={15} /> Upcoming Events
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side: Floating Frosted Glass Card matching About page */}
            <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center lg:justify-end">
              <div className="relative w-[300px] sm:w-[320px] rounded-[1.8rem] p-7 sm:p-8 bg-gradient-to-br from-white/55 via-sky-50/40 to-blue-100/30 backdrop-blur-xl border border-white/80 shadow-[0_25px_60px_rgba(2,60,140,0.22),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition duration-300">
                <span className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-white/90 border border-white text-sky-500 flex items-center justify-center shadow-md">
                  <Sparkles size={17} />
                </span>
                <p className="text-[10px] font-bold tracking-[0.22em] text-slate-600 uppercase mb-1">ESTABLISHED IN</p>
                <p style={SERIF} className="text-6xl sm:text-[68px] text-slate-900 leading-none my-2 font-normal">2024</p>
                <p className="text-[13.5px] text-slate-600 leading-relaxed max-w-[210px] mt-2">Promoting innovative, inclusive and sustainable education.</p>
              </div>
            </div>

          </div>

          {/* 4 Pillars in a refined glass row across bottom of hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-sky-100/70">
            {[
              { title: 'STEM Education', desc: 'Hands-on learning & scientific inquiry', icon: LayoutGrid },
              { title: 'Sustainability', desc: 'Eco-conscious practices for a greener future', icon: Leaf },
              { title: 'Teacher Empowerment', desc: 'Pedagogical training & mentor support', icon: UserCheck },
              { title: 'Inclusive Learning', desc: 'Equal opportunities for every student', icon: Users }
            ].map((item, i) => (
              <div
                key={i}
                className={`${GLASS} rounded-[1.6rem] p-4.5 flex items-center gap-3.5 hover:-translate-y-1 transition duration-300 group cursor-default`}
              >
                <div className="w-10 h-10 rounded-full bg-blue-50/90 border border-blue-100 flex items-center justify-center text-[#1a6dff] shrink-0 group-hover:scale-105 transition-transform">
                  <item.icon size={18} strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900 leading-snug group-hover:text-[#1a6dff] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11.5px] text-slate-500 leading-tight mt-0.5 font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS DOCK */}
      {/* ========================================================================= */}
      <section className="relative py-6 sm:py-8">
        <Wrap>
          <div className={`${GLASS} rounded-[2rem] py-5 px-6 sm:px-10 shadow-[0_20px_50px_rgba(37,99,235,0.12)]`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-blue-100/70 gap-6 sm:gap-0">
              {[
                { titleTop: 'Hands-on STEM', titleBottom: 'Learning', desc: 'For students & teachers', icon: GraduationCap },
                { titleTop: '44+', titleBottom: 'Schools Impacted', desc: 'Across Kerala', icon: Users },
                { titleTop: 'Global', titleBottom: 'Collaboration', desc: 'With Clarkson Univ, USA', icon: Globe },
                { titleTop: 'Social', titleBottom: 'Impact', desc: 'Supporting rural learners', icon: Sprout }
              ].map((stat, idx) => (
                <div key={idx} className={`flex items-center gap-4 py-2 group cursor-default hover:-translate-y-0.5 transition-transform duration-300 ${idx === 0 ? 'sm:pr-6' : idx === 3 ? 'sm:pl-6' : 'sm:px-6'}`}>
                  <div className="w-12 h-12 rounded-full bg-blue-50/90 border border-blue-100 flex items-center justify-center text-[#1a6dff] shrink-0 shadow-sm group-hover:scale-105 transition-all duration-300">
                    <stat.icon size={22} strokeWidth={1.6} />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <h4 className="text-[14px] sm:text-[15px] font-bold leading-tight text-slate-900">
                      <span className="block truncate">{stat.titleTop}</span>
                      {stat.titleBottom && <span className="block text-[#1a6dff] truncate">{stat.titleBottom}</span>}
                    </h4>
                    <p className="text-[11.5px] text-slate-500 mt-1 leading-snug">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR TRUSTED COLLABORATORS - MARQUEE */}
      {/* ========================================================================= */}
      <section className="relative py-12">
        <Swirl className="-left-24 top-0 w-80 h-72 opacity-50" />
        <Wrap>
          <div className="text-center space-y-1.5 mb-8">
            <p className="text-slate-500 text-sm font-medium tracking-wide uppercase">
              Backed by global partnerships.
            </p>
            <h3 style={SERIF} className="text-3xl sm:text-4xl font-normal text-slate-900">
              Trusted by <Em>educators.</Em>
            </h3>
          </div>

          <div
            className="relative w-full overflow-hidden py-3"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
          >
            <div className="animate-marquee-right flex items-center gap-8 sm:gap-12 will-change-transform">
              {marqueeList.map((collab, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3.5 px-5 py-3 rounded-2xl ${GLASS} hover:-translate-y-1 transition duration-300 group cursor-default shrink-0`}
                >
                  <div className="text-[#1a6dff] group-hover:scale-105 transition-transform duration-300">
                    {collab.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className={`text-[15px] font-bold text-slate-900 group-hover:text-[#1a6dff] transition-colors whitespace-nowrap ${collab.isSerif ? 'font-serif' : 'font-sans'}`}>
                      {collab.name}
                    </span>
                    {collab.sub && (
                      <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase whitespace-nowrap">
                        {collab.sub}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* ========================================================================= */}
      {/* 4. ABOUT LEnSE SECTION */}
      {/* ========================================================================= */}
      <section className="relative py-16">
        <Swirl className="-right-20 top-10 w-96 h-80 opacity-40" />
        <Wrap>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

            {/* Left Description */}
            <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <SectionTag text="ABOUT LEnSE" />
                <h2 style={SERIF} className="text-4xl sm:text-5xl leading-[1.12] font-normal text-slate-900">
                  Driving <Em>meaningful change</Em><br />through education.
                </h2>
                <p className="text-slate-600 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-normal">
                  Established in 2024, the Centre for Learning Engineering and Sustainability Education (LEnSE) promotes innovative, inclusive and sustainable approaches to education, with a special focus on STEM education.
                </p>
                <p className="text-slate-600 text-[13.5px] sm:text-[14.5px] leading-[1.8] font-normal">
                  We organize seminars, workshops, conferences, training programmes and academic activities that inspire learners, empower educators and strengthen communities.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/about" className="inline-flex">
                  <span className="px-6 py-3 rounded-full bg-white/90 border border-white shadow-[0_10px_24px_rgba(37,99,235,0.14)] text-[#1a6dff] text-xs font-bold uppercase tracking-wider flex items-center gap-3 hover:scale-[1.03] transition">
                    Learn more about us <ArrowRight size={13} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Area: Metric Grid + Campus Card */}
            <div className="lg:col-span-7 space-y-5">
              {/* Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: 'Established in', value: '2024', icon: Calendar },
                  { label: 'Events Organised', value: '18+', icon: Users },
                  { label: 'Collaborations with', value: '10+', sub: 'Institutions', icon: Landmark },
                  { label: 'Impacting', value: '1000+', sub: 'Learners', icon: Globe }
                ].map((card, i) => (
                  <div key={i} className={`${GLASS} rounded-[1.6rem] p-5 flex flex-col justify-between hover:-translate-y-1 transition duration-300 group cursor-default`}>
                    <div className="w-10 h-10 rounded-full bg-blue-50/90 border border-blue-100 flex items-center justify-center text-[#1a6dff] mb-3 group-hover:scale-105 transition-transform">
                      <card.icon size={19} strokeWidth={1.6} />
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-500 font-semibold leading-tight mb-1">{card.label}</span>
                      <span style={SERIF} className={`block text-3xl font-normal leading-none ${BLUE}`}>{card.value}</span>
                      {card.sub && <span className="block text-[10px] text-slate-500 font-medium mt-1">{card.sub}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Campus Card */}
              <div className="w-full rounded-[2rem] overflow-hidden bg-slate-900 border border-white/90 shadow-[0_20px_45px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition duration-500 relative group flex flex-col justify-end min-h-[190px] sm:min-h-[230px]">
                <img
                  src="/campus_building.jpg"
                  alt="LEnSE Modern Campus Architecture"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041a45]/95 via-[#041a45]/40 to-transparent" />

                <div className="relative z-10 p-6 sm:p-7 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h4 style={SERIF} className="text-xl sm:text-2xl font-normal text-white">Creating a better tomorrow</h4>
                    <p className="text-[12.5px] text-sky-100/90 leading-tight font-normal mt-1 max-w-sm">
                      through education, innovation and sustainability.
                    </p>
                  </div>
                  <Link href="/about" className="w-10 h-10 rounded-full bg-[#1a6dff] text-white flex items-center justify-center hover:scale-110 transition shadow-md shrink-0">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </Wrap>
      </section>

      {/* ========================================================================= */}
      {/* 5. WHAT WE DO SECTION */}
      {/* ========================================================================= */}
      <WhatWeDo />

      {/* ========================================================================= */}
      {/* 6. OUR FOCUS AREAS */}
      {/* ========================================================================= */}
      <FocusAreas />

      {/* ========================================================================= */}
      {/* 7. CREATE PROJECT SHOWCASE BANNER */}
      {/* ========================================================================= */}
      <section className="relative py-10">
        <Wrap>
          <div className="relative overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-[#041a45] via-[#0a3a9c] to-[#1d5be0] text-white p-8 sm:p-12 shadow-[0_25px_60px_rgba(3,21,51,0.35)]">
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
              <path d="M0 240 C300 120 500 320 800 180 C1000 80 1100 160 1200 100 L1200 400 L0 400Z" fill="#38bdf8" opacity="0.4" />
              <path d="M0 80 C240 -20 500 180 800 60 C1000 -20 1100 40 1200 10 L1200 0 L0 0Z" fill="#7dd3fc" opacity="0.3" />
            </svg>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">

              {/* Left Logo */}
              <div className="lg:col-span-3 flex items-center justify-center lg:justify-start">
                <div className="p-4 sm:p-5 rounded-[1.6rem] bg-white/95 backdrop-blur-xl border border-white shadow-lg">
                  <img
                    src="/create.png"
                    alt="CREATE Project Logo"
                    loading="lazy"
                    decoding="async"
                    className="w-40 sm:w-48 h-auto object-contain"
                  />
                </div>
              </div>

              {/* Center Content */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-[10px] font-bold tracking-wider uppercase">
                    SPARC II FUNDED
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-sky-200 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5">
                    <Globe size={12} /> Global Collaboration
                  </span>
                </div>

                <h3 style={SERIF} className="text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] font-normal text-white">
                  CREATE <em style={SERIF} className="italic text-sky-300">Project</em>
                </h3>

                <p className="text-[13.5px] text-sky-100/90 leading-relaxed font-normal">
                  CREATE aims to advance climate science research, energy education, and ecological sustainability through international collaboration between Indian and global institutions. A visionary project promoting cross-border innovation and green education.
                </p>

                <div className="pt-2">
                  <a
                    href="https://www.createsparc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-7 py-3.5 rounded-full bg-white text-[#0a2a6b] font-bold text-xs uppercase tracking-wider items-center gap-2.5 shadow-xl hover:scale-105 transition cursor-pointer"
                  >
                    <span>Visit CREATE Platform</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Right Visual Graphic */}
              <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
                <img
                  src="/home3.png"
                  alt="CREATE Global Collaboration Architecture & Sphere"
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-[340px] sm:max-w-[400px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(56,189,248,0.25)] hover:scale-105 transition-transform duration-500"
                />
              </div>

            </div>
          </div>
        </Wrap>
      </section>

      {/* ========================================================================= */}
      {/* 8. UPCOMING EVENTS */}
      {/* ========================================================================= */}
      <section className="relative py-16">
        <Swirl className="-right-24 top-10 w-96 h-80 opacity-40" />
        <Wrap>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <SectionTag text="UPCOMING EVENTS" />
              <h2 style={SERIF} className="text-4xl sm:text-5xl font-normal text-slate-900 mt-2">
                Join our <Em>latest events.</Em>
              </h2>
            </div>

            <Link href="/events" className="inline-flex">
              <span className="px-6 py-2.5 rounded-full bg-white/90 border border-white shadow-[0_10px_24px_rgba(37,99,235,0.12)] text-[#1a6dff] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-[1.03] transition">
                <span>View All Events</span>
                <ArrowRight size={13} />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {upcomingEvents.slice(0, 4).map((evt, idx) => (
              <Link key={evt.id} href={evt.link} className="block group">
                <div className={`${GLASS} rounded-[1.8rem] p-4 space-y-3.5 hover:-translate-y-1.5 transition duration-300`}>

                  {/* Image Thumbnail with Date Tag */}
                  <div className="h-40 sm:h-44 rounded-2xl overflow-hidden bg-slate-100 relative shadow-sm border border-white/80">
                    <img
                      src={evt.img || defaultFallbackEvents[idx % defaultFallbackEvents.length].img}
                      alt={evt.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      onError={(e) => {
                        e.currentTarget.src = defaultFallbackEvents[idx % defaultFallbackEvents.length].img;
                      }}
                    />
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 border border-white shadow-md text-center">
                      <span className="block text-[15px] font-bold leading-none mb-0.5 text-slate-900">{evt.day}</span>
                      <span className={`block text-[9px] tracking-wider uppercase font-bold ${BLUE}`}>{evt.month}</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2.5 px-1 pb-1">
                    <h4 className="text-[14.5px] font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#1a6dff] transition-colors">
                      {evt.title}
                    </h4>

                    <div className="space-y-1.5 pt-1 text-[11.5px] text-slate-500">
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className={`${BLUE} shrink-0`} />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock size={13} className={`${BLUE} shrink-0`} />
                          <span>{evt.duration}</span>
                        </div>
                        <ArrowBtn />
                      </div>
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ========================================================================= */}
      {/* 9. OUR IMPACT */}
      {/* ========================================================================= */}
      <section className="relative py-12">
        <Wrap>
          <div className="mb-6">
            <SectionTag text="OUR IMPACT" />
            <h2 style={SERIF} className="text-3xl sm:text-4xl font-normal text-slate-900 mt-2">
              Transforming <Em>communities across Kerala.</Em>
            </h2>
          </div>

          <div className={`${GLASS} rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(37,99,235,0.12)]`}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-blue-100/70">
              {[
                { count: '44', label: 'Schools Reached', sub: '(Gifted Students Programme)', icon: School },
                { count: '500+', label: 'Teachers Empowered', icon: Users },
                { count: '1000+', label: 'Students', icon: GraduationCap },
                { count: '1', label: 'Global Academic Collaboration', icon: Globe }
              ].map((stat, idx) => (
                <div key={idx} className={`flex items-center gap-4 px-2 group cursor-default hover:-translate-y-0.5 transition-transform duration-300 ${idx === 0 ? '' : 'sm:pl-6'}`}>
                  <div className="w-12 h-12 rounded-full bg-blue-50/90 border border-blue-100 flex items-center justify-center text-[#1a6dff] shrink-0 shadow-sm group-hover:scale-105 transition-all duration-300">
                    <stat.icon size={22} strokeWidth={1.6} />
                  </div>
                  <div>
                    <span style={SERIF} className={`block text-3xl sm:text-4xl font-normal leading-none mb-1 ${BLUE}`}>
                      {stat.count}
                    </span>
                    <span className="block text-[12.5px] font-bold text-slate-800 leading-tight">
                      {stat.label}
                    </span>
                    {stat.sub && (
                      <span className="block text-[10.5px] text-slate-500 mt-0.5">{stat.sub}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* ========================================================================= */}
      {/* 10. BUILDING PARTNERSHIPS. DRIVING CHANGE. */}
      {/* ========================================================================= */}
      <PartnershipsShowcase />

    </div>
  );
}
