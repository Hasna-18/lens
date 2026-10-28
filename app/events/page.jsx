'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Users,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Home,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
  Globe,
  Clock,
  Atom,
  Lightbulb
} from 'lucide-react';
import { getFromCache, setInCache, fetchWithCache, prefetchEndpoint } from '../../lib/clientCache';
import { sortEventsLatestFirst } from '../../lib/eventUtils';
import LoadingSpinner from '../../components/LoadingSpinner';

/* ---------- shared design system matching Home & About ---------- */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const BLUE = 'text-[#009ab1]';
const GLASS =
  'bg-gradient-to-br from-white/80 via-[#EDF6F5]/60 to-[#009ab1]/12 backdrop-blur-xl border border-white/90 shadow-[0_18px_45px_rgba(21,159,150,0.10),inset_0_1px_0_rgba(255,255,255,1)]';

const Wrap = ({ children, className = '' }) => (
  <div className={`relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Em = ({ children, light = false }) => (
  <em style={SERIF} className={`italic font-normal ${light ? 'text-[#009ab1]' : BLUE}`}>{children}</em>
);

function SectionTag({ text, light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-[#009ab1]' : 'bg-[#009ab1]'}`} />
      <span className={`text-[11px] font-bold tracking-[0.22em] uppercase ${light ? 'text-[#00616f]' : BLUE}`}>{text}</span>
      <span className={`w-16 h-px ${light ? 'bg-white/20' : 'bg-[#009ab1]/25'}`} />
    </div>
  );
}

function Dots({ rows = 5, cols = 10, className = '' }) {
  return (
    <div className={`grid gap-2 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#009ab1]/60" />
      ))}
    </div>
  );
}

/* Soft abstract forms inspired by the About page's flowing lines and glass accents */
function Swirl({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-[#009ab1]/20 via-[#8ecbd0]/15 to-transparent blur-3xl ${className}`}
    />
  );
}

function Flow({ className = '' }) {
  return (
    <svg aria-hidden="true" className={`absolute pointer-events-none ${className}`} viewBox="0 0 800 160" fill="none" preserveAspectRatio="none">
      <path d="M0 150 C200 20 420 10 800 60" stroke="#009ab1" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d="M0 160 C220 50 440 40 800 90" stroke="#4fa8b2" strokeOpacity="0.32" strokeWidth="1" />
      <path d="M0 140 C180 0 400 -10 800 30" stroke="#8ecbd0" strokeOpacity="0.55" strokeWidth="1" />
    </svg>
  );
}

/* Silky ocean streaks background for the hero (matching About page) */
function OceanWaves() {
  const colors = ['#ffffff', '#4fa8b2', '#009ab1', '#009ab1', '#b7dce0', '#00616f'];
  const streaks = Array.from({ length: 40 }, (_, i) => ({
    d: `M -150 ${20 + i * 14} C 250 ${-80 + i * 12}, 650 ${240 - i * 3}, 1350 ${60 + i * 16}`,
    c: colors[(i * 5) % colors.length],
    w: 5 + ((i * 7) % 26),
    o: 0.25 + ((i * 13) % 50) / 100,
  }));
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full pointer-events-none" fill="none">
      <defs>
        <linearGradient id="ocean-base-events" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4eadb" />
          <stop offset="0.45" stopColor="#009ab1" />
          <stop offset="1" stopColor="#009ab1" />
        </linearGradient>
        <filter id="ocean-blur-events"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect width="1200" height="600" fill="url(#ocean-base-events)" />
      <g filter="url(#ocean-blur-events)">
        {streaks.map((s, i) => (
          <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} opacity={s.o} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

function getCategoryIcon(catName) {
  const c = (catName || '').toLowerCase();
  if (c.includes('conf')) return Users;
  if (c.includes('work')) return BookOpen;
  if (c.includes('train') || c.includes('course') || c.includes('lect')) return GraduationCap;
  if (c.includes('stem') || c.includes('lab')) return FlaskConical;
  if (c.includes('outreach') || c.includes('comm')) return Shield;
  return Calendar;
}

function formatEventsList(data) {
  if (!Array.isArray(data)) return [];
  const sorted = sortEventsLatestFirst(data);
  return sorted.map(item => ({
    ...item,
    id: item.id,
    slug: item.slug || String(item.id),
    categoryTag: item.categoryTag || (item.category ? item.category.toUpperCase() : 'EVENT'),
    category: item.category || item.filterType || 'Events',
    filterType: item.filterType || item.category || 'Events',
    title: item.title,
    subtitle: item.subtitle || '',
    location: item.location || (item.details && item.details.venue) || 'Thiruvananthapuram, Kerala',
    duration: item.duration || (item.details && item.details.time) || '2 Days Event',
    dateDay: item.dateDay || item.date_day || '14',
    dateMonth: item.dateMonth || item.date_month || 'MAR',
    dateYear: item.dateYear || item.date_year || '2025'
  }));
}

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [settings, setSettings] = useState({
    stat1Number: '56+', stat1Text: 'Gifted Students<br/>Supported',
    stat2Number: '44', stat2Text: 'Schools in<br/>Kerala',
    stat3Number: '41', stat3Text: 'Educational<br/>Districts',
    stat4Number: '6+', stat4Text: 'Programmes<br/>Organized',
    featuredInitiatives: [],
    newsletterTitle: 'Stay updated',
    newsletterText: 'Subscribe to our newsletter for upcoming events, insights and more.'
  });
  const [currentInitiativeIndex, setCurrentInitiativeIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useEffect(() => {
    const inits = settings.featuredInitiatives || [];
    if (inits.length <= 1 || isCarouselPaused) return;
    const interval = setInterval(() => {
      setCurrentInitiativeIndex((prev) => (prev + 1) % inits.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [settings.featuredInitiatives, isCarouselPaused]);

  useEffect(() => {
    let isMounted = true;

    // Load from cache synchronously on client mount after hydration
    const cached = getFromCache('clese_events_cache');
    if (cached && Array.isArray(cached) && cached.length > 0) {
      const list = formatEventsList(cached);
      setEvents(list);
      setLoading(false);
      // Pre-warm individual event slug caches in memory
      list.forEach(e => {
        const s = e.slug || e.id;
        if (s) setInCache(`clese_event_${s}_cache`, e);
      });
    }

    fetchWithCache('/api/events', 'clese_events_cache', formatEventsList)
      .then((formatted) => {
        if (isMounted && Array.isArray(formatted) && formatted.length > 0) {
          setEvents(formatted);
          setLoading(false);
          // Pre-warm individual event slug caches in memory
          formatted.forEach(e => {
            const s = e.slug || e.id;
            if (s) setInCache(`clese_event_${s}_cache`, e);
          });
        }
      })
      .catch((err) => {
        console.warn('Events fetch notice:', err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    const cachedSettings = getFromCache('clese_event_settings_cache');
    if (cachedSettings && cachedSettings.stat1Number) {
      setSettings(prev => ({ ...prev, ...cachedSettings }));
    }
    fetchWithCache('/api/event-settings', 'clese_event_settings_cache', (d) => d)
      .then((data) => {
        if (isMounted && data && data.stat1Number) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.warn('Event settings fetch notice:', err.message));

    // Prefetch other sections
    prefetchEndpoint('/api/initiatives', 'clese_initiatives_cache');
    prefetchEndpoint('/api/news', 'clese_news_cache');
    prefetchEndpoint('/api/resources', 'clese_resources_cache');

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    {
      name: 'Conferences',
      icon: Users,
      desc: 'Global perspectives\non education.'
    },
    {
      name: 'Workshops',
      icon: BookOpen,
      desc: 'Hands-on learning\nand skill building.'
    },
    {
      name: 'Training Programmes',
      icon: GraduationCap,
      desc: 'Capacity building\nfor educators.'
    },
    {
      name: 'STEM Labs',
      icon: FlaskConical,
      desc: 'Experiential learning\nand innovation.'
    },
    {
      name: 'Outreach & Community',
      icon: Shield,
      desc: 'Engaging communities\nfor change.'
    },
  ];

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(e => {
      const cat = (e.category || '').toLowerCase();
      const filt = (e.filterType || '').toLowerCase();
      const tag = (e.categoryTag || '').toLowerCase();
      const target = selectedCategory.toLowerCase();

      if (filt === target || cat === target || tag === target) return true;
      if (target === 'conferences' && (cat.includes('conf') || filt.includes('conf'))) return true;
      if (target === 'workshops' && (cat.includes('work') || filt.includes('work'))) return true;
      if (target === 'training programmes' && (cat.includes('train') || cat.includes('course') || cat.includes('lect') || filt.includes('train') || filt.includes('course') || filt.includes('lect'))) return true;
      if (target === 'stem labs' && (cat.includes('stem') || filt.includes('stem') || tag.includes('stem'))) return true;
      if (target === 'outreach & community' && (cat.includes('outreach') || cat.includes('comm') || filt.includes('outreach') || filt.includes('comm'))) return true;
      return false;
    });

  // Dynamic pagination calculation
  const totalEvents = filteredEvents.length;
  const totalPages = Math.ceil(totalEvents / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName === selectedCategory ? 'All' : catName);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        const el = document.getElementById('events-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Helper to generate dynamic page number sequence
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#143f45] font-sans pb-20 sm:pb-28 selection:bg-[#009ab1]/30 pt-28 sm:pt-36 relative overflow-hidden">

      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT & SPHERE */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="https://images.pexels.com/photos/7869140/pexels-photo-7869140.jpeg"
          alt="LEnSE Sustainability Sphere"
          className="w-full h-full object-cover object-center lg:object-right-top scale-[1.04] transform-gpu transition-transform duration-1000 ease-out"
        />

        {/* Soft Organic Fade Masks into the Canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAF9] via-[#F8FAF9]/80 via-[18%] to-transparent to-[42%] w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#F8FAF9] via-[#F8FAF9]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#F8FAF9] to-transparent" />
      </div>

      {/* About-page-inspired abstract geometry and soft off-white ambience */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1100px] z-0 pointer-events-none overflow-hidden">
        <Swirl className="-top-16 -left-24 w-[420px] h-[360px]" />
        <Swirl className="top-[390px] right-[-100px] w-[420px] h-[420px] opacity-70" />
        <div className="hidden lg:block absolute -left-[190px] top-[250px] w-[320px] h-[320px] rounded-full border border-[#009ab1]/20" />
        <div className="hidden lg:block absolute left-[92px] top-[405px] w-2.5 h-2.5 rounded-full bg-[#009ab1]/60" />
        <div className="hidden lg:block absolute right-[7%] top-[520px] w-[180px] h-[180px] rounded-full border border-[#009ab1]/15" />
        <Dots rows={8} cols={6} className="hidden sm:grid absolute left-5 top-[560px] opacity-60" />
        <Dots rows={7} cols={10} className="hidden lg:grid absolute right-10 top-[690px] opacity-50" />
        <Flow className="hidden lg:block absolute right-0 top-[610px] w-[52%] h-40" />
      </div>

      {/* Ambient background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009ab1]/20 via-[#EDF6F5]/30 to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009ab1]/20 via-[#EDF6F5]/30 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#EDF6F5]/40 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10">

        {/* ============================================================ */}
        {/* A. DESKTOP VIEW (VISIBLE ON LARGE SCREENS ONLY) */}
        {/* ============================================================ */}
        <div className="hidden lg:block">

          {/* 1. HERO SECTION */}
          <div className="grid grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] sm:min-h-[560px]">

            {/* Left: Text & CTA */}
            <div className="col-span-6 space-y-6 lg:pr-2 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#F8FAF9]/80 shadow-sm hover:border-[#009ab1]/70 transition-colors duration-300">
                <span className="text-[11px] font-bold tracking-[0.22em] text-[#009ab1] uppercase">
                  LEnSE EVENTS
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-normal text-[#143f45] leading-[1.05] tracking-tight font-serif">
                Events that<br />
                <span className="italic text-[#009ab1] font-serif font-normal">inspire change.</span>
              </h1>

              <p className="text-slate-600 text-[13.5px] leading-[1.72] max-w-[430px] font-normal">
                Discover seminars, workshops, conferences and training programmes that bring people together to share knowledge, spark ideas and create a more sustainable future.
              </p>

              <div className="pt-2">
                <a href="#events-section" className="inline-flex group">
                  <button className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#009ab1] to-[#009ab1] hover:from-[#005b68] hover:to-[#1694a2] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(21,159,150,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer">
                    <span>Explore All Events</span>
                    <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center group-hover:bg-[#EDF6F5] group-hover:border-white transition-all duration-300">
                      <ArrowRight size={10} className="text-white group-hover:text-[#009ab1] group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </button>
                </a>
              </div>
            </div>

            {/* Right: Transparent Crystal Glass "Upcoming Events" Card */}
            <div className="col-span-6 relative flex items-center justify-start lg:justify-center min-h-[340px] sm:min-h-[420px]">
              <div className="relative lg:ml-[-50px] xl:ml-[-90px] bg-gradient-to-br from-white/65 via-[#EDF6F5]/45 to-[#009ab1]/12 backdrop-blur-2xl p-6 sm:p-7 rounded-[2.2rem] border-[1.5px] border-white/95 shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),inset_2px_0_4px_rgba(255,255,255,0.8),0_25px_50px_-10px_rgba(21,100,92,0.18)] w-52 sm:w-60 z-20 group transition-all duration-500 hover:-translate-y-2 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_35px_70px_-10px_rgba(21,100,92,0.28)] cursor-pointer">
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/70 via-white/20 to-transparent rounded-tl-[2.2rem] pointer-events-none" />
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white/95 via-[#EDF6F5]/60 to-[#009ab1]/12 backdrop-blur-2xl border-[1.5px] border-white shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06),0_10px_20px_rgba(21,100,92,0.15)] flex items-center justify-center absolute -top-5 -right-5 text-[#009ab1] z-30 transition-all duration-500 group-hover:scale-115 group-hover:rotate-12 group-hover:text-[#005b68]">
                  <Calendar size={20} strokeWidth={1.75} />
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1.5 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] group-hover:tracking-[0.25em] transition-all duration-300">
                  Upcoming Events
                </p>
                <h3 className="text-4xl sm:text-5xl font-serif text-[#143f45] mb-3 tracking-tight font-normal relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] group-hover:scale-105 origin-left transition-transform duration-300">
                  {events.length > 0 ? `${events.length}+` : '18+'}
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium mb-3 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  Promoting innovative, inclusive and sustainable learning events.
                </p>
                <div className="w-5 h-[1.5px] bg-[#009ab1] rounded-full mt-2 relative z-10 group-hover:w-10 transition-all duration-300" />
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* B. MOBILE VIEW (VISIBLE ON MOBILE / SCREENS < LG) */}
        {/* ============================================================ */}
        <div className="block lg:hidden pb-6">

          {/* 1. Mobile Hero */}
          <div className="pt-3 pb-2 relative">
            <div className="grid grid-cols-12 gap-2.5 items-start">
              {/* Left text */}
              <div className="col-span-7 space-y-2.5 z-10 pr-0.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#F8FAF9]/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:scale-105 transition-transform duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                  <span className="text-[9.5px] font-bold tracking-wider text-[#009ab1] uppercase">
                    LEnSE EVENTS
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-normal text-[#143f45] leading-[1.1] tracking-tight font-serif">
                  Events that<br />
                  <span className="italic text-[#009ab1] font-serif font-normal">inspire change.</span>
                </h1>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                  Discover seminars, workshops, conferences and training programmes that bring people together to share knowledge, spark ideas and create a more sustainable future.
                </p>

                <div className="pt-1">
                  <a href="#events-section" className="inline-flex group">
                    <button className="px-5 py-2.5 rounded-full bg-[#009ab1] hover:bg-[#005b68] text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                      <span>Explore All Events</span>
                      <ArrowRight size={12} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </a>
                </div>
              </div>

              {/* Right Glass Card: Upcoming Events */}
              <div className="col-span-5 flex justify-end items-start pt-1 relative">
                <div className="relative bg-white/90 backdrop-blur-2xl p-3.5 sm:p-4 rounded-2xl border border-[#F8FAF9]/80 shadow-[0_8px_25px_rgba(21,100,92,0.08)] w-full max-w-[165px] z-20 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-[#EAF4F3] border border-[#F8FAF9]/80 shadow-sm flex items-center justify-center absolute -top-2.5 -right-2.5 text-[#009ab1] z-30 group-hover:scale-115 group-hover:rotate-12 transition-all duration-300">
                    <Calendar size={16} strokeWidth={2} />
                  </div>

                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-0.5 relative z-10 group-hover:tracking-widest transition-all duration-300">
                    UPCOMING EVENTS
                  </p>

                  <h3 className="text-3xl font-serif text-[#143f45] mb-0.5 tracking-tight font-bold relative z-10 group-hover:scale-105 origin-left transition-transform duration-300">
                    {events.length > 0 ? `${events.length}+` : '18+'}
                  </h3>

                  <p className="text-[10px] text-slate-600 leading-snug font-medium mb-1 relative z-10">
                    Promoting innovative, inclusive and sustainable learning events.
                  </p>

                  <div className="w-5 h-[2px] bg-[#009ab1] rounded-full mt-1.5 relative z-10 group-hover:w-8 transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Wrap className="space-y-10 sm:space-y-14 relative z-10">
        <Flow className="hidden xl:block absolute -right-20 top-[300px] w-[55%] h-40 opacity-70" />
        <Dots rows={6} cols={10} className="hidden lg:grid absolute -left-3 top-[520px] opacity-45" />

        {/* ============================================================ */}
        {/* 2. FIVE CATEGORY CARDS DOCK (1 Row of 5 Columns) */}
        {/* ============================================================ */}
        <div className={`${GLASS} rounded-[2rem] sm:rounded-[2.4rem] p-2.5 sm:p-4 shadow-[0_20px_50px_rgba(21,159,150,0.08)]`}>
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-[#F8FAF9]/70 gap-2 sm:gap-0">
            {categories.map((cat, i) => {
              const isSelected = selectedCategory === cat.name;
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`flex flex-col items-center text-center px-2 sm:px-4 py-3 sm:py-4 group transition-all duration-300 rounded-2xl cursor-pointer ${isSelected
                    ? 'bg-[#EAF4F3]/90 shadow-sm ring-2 ring-[#009ab1]/30'
                    : 'hover:bg-white/60'
                    }`}
                >
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2.5 transition-all duration-300 ${isSelected
                    ? 'bg-[#009ab1] text-white shadow-md scale-105'
                    : 'bg-[#EAF4F3] border border-[#F8FAF9]/80 text-[#009ab1] group-hover:scale-105'
                    }`}>
                    <Icon size={20} strokeWidth={1.6} />
                  </div>

                  <h4 style={SERIF} className={`text-[15px] sm:text-[16px] font-normal mb-1 leading-tight transition-colors ${isSelected ? 'text-[#009ab1] font-bold' : 'text-[#143f45] group-hover:text-[#009ab1]'}`}>
                    {cat.name}
                  </h4>

                  <p className="text-[11px] text-slate-500 leading-snug whitespace-pre-line font-normal">
                    {cat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MAIN SECTION: EXPLORE WHAT'S NEXT & EVENTS TIMELINE */}
        {/* ============================================================ */}
        <div id="events-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-2 sm:pt-4 items-start">

          {/* Left Column: Events Timeline */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#F8FAF9]/80">
              <div className="space-y-1">
                <SectionTag text="UPCOMING EVENTS" />
                <h2 style={SERIF} className="text-3xl sm:text-4xl font-normal text-[#143f45] tracking-tight">
                  Explore what's <Em>next.</Em>
                </h2>
              </div>

              <button
                onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
                className="self-start sm:self-auto px-4 py-2 rounded-full bg-white/90 border border-[#F8FAF9]/80 text-xs font-bold text-[#009ab1] hover:bg-[#EAF4F3] flex items-center gap-2 transition shadow-sm cursor-pointer"
              >
                <span>View All Events</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Events List (NO IMAGES) */}
            <div className="space-y-4">
              {loading ? (
                <div className={`${GLASS} rounded-[2rem] p-12 text-center`}>
                  <LoadingSpinner message="Fetching upcoming events..." />
                </div>
              ) : paginatedEvents.length === 0 ? (
                <div className={`${GLASS} text-center py-12 rounded-[2rem] p-8`}>
                  <div className="w-12 h-12 bg-[#EAF4F3] border border-[#F8FAF9]/80 rounded-full flex items-center justify-center text-[#009ab1] mx-auto mb-3 shadow-sm">
                    <Calendar size={22} />
                  </div>
                  <h3 style={SERIF} className="text-xl font-normal text-[#143f45] mb-1">No events found in this category</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    Check back soon for upcoming announcements in this category.
                  </p>
                  <button
                    onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
                    className="px-5 py-2.5 rounded-full bg-[#009ab1] text-white text-[11px] font-bold uppercase tracking-wider hover:scale-105 transition shadow-sm cursor-pointer"
                  >
                    Show All Events
                  </button>
                </div>
              ) : (
                paginatedEvents.map((evt) => {
                  const CategoryIcon = getCategoryIcon(evt.categoryTag || evt.category);
                  const targetSlug = evt.slug || evt.id;
                  const eventUrl = `/events/${targetSlug}`;

                  const handleWarmSlug = () => {
                    setInCache(`clese_event_${targetSlug}_cache`, evt);
                    prefetchEndpoint(`/api/events/${encodeURIComponent(targetSlug)}`, `clese_event_${targetSlug}_cache`);
                  };

                  return (
                    <Link
                      key={evt.id}
                      href={eventUrl}
                      prefetch={true}
                      onMouseEnter={handleWarmSlug}
                      onTouchStart={handleWarmSlug}
                      onFocus={handleWarmSlug}
                      className="block group"
                    >
                      <div className="flex items-center gap-3 sm:gap-5">

                        {/* Left Date Column */}
                        <div className="w-12 sm:w-16 text-center shrink-0">
                          <span style={SERIF} className="block text-2xl sm:text-3xl font-normal text-[#143f45] leading-none">
                            {evt.dateDay}
                          </span>
                          <span className="block text-[9.5px] sm:text-[11px] font-bold text-[#009ab1] mt-1 uppercase tracking-wider">
                            {evt.dateMonth}
                          </span>
                          <span className="block text-[8.5px] sm:text-[9.5px] text-slate-400 font-medium">
                            {evt.dateYear}
                          </span>
                        </div>

                        {/* Event Card (Pristine Vector / Icon Badge, No Images) */}
                        <div className={`${GLASS} flex-1 rounded-[1.8rem] sm:rounded-[2.2rem] p-3.5 sm:p-5 flex items-center gap-3.5 sm:gap-5 hover:-translate-y-1 transition duration-300 w-full relative min-w-0 overflow-hidden`}>

                          {/* Image Thumbnail from DB */}
                          <div className="w-[84px] min-w-[84px] sm:w-[155px] sm:min-w-[155px] h-[72px] sm:h-[105px] rounded-2xl overflow-hidden shrink-0 bg-slate-100 relative border border-white shadow-sm">
                            <img
                              src={evt.imageUrl}
                              alt={evt.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0 block"
                              onError={(e) => {
                                e.currentTarget.src = "/events/conference.jpg";
                              }}
                            />
                          </div>

                          {/* Content Area */}
                          <div className="flex-1 py-0.5 sm:py-1 w-full flex flex-col justify-center min-w-0">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-[#EAF4F3] text-[#009ab1] mb-1.5 w-max border border-[#F8FAF9]/80">
                              {evt.categoryTag || evt.category}
                            </span>

                            <h3 style={SERIF} className="text-[16px] sm:text-[19px] font-normal text-[#143f45] leading-tight mb-1 group-hover:text-[#009ab1] transition-colors line-clamp-1 sm:line-clamp-2">
                              {evt.title}
                            </h3>

                            <p className="text-[11.5px] sm:text-[13px] text-slate-500 leading-relaxed line-clamp-1 sm:line-clamp-2 mb-2 font-normal">
                              {evt.subtitle || evt.desc || 'Explore collaborative learning and sustainability education initiatives.'}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10.5px] sm:text-[11.5px] text-slate-500 font-medium">
                              <span className="flex items-center gap-1.5 truncate">
                                <MapPin size={12} className="text-[#009ab1] shrink-0" />
                                {evt.location || 'Kazhakkoottam, Kerala'}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={12} className="text-[#009ab1] shrink-0" />
                                {evt.duration || 'Session'}
                              </span>
                            </div>
                          </div>

                          {/* Right Circular Arrow Button */}
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EDF6F5] shadow-[0_6px_14px_rgba(21,159,150,0.12)] border border-white flex items-center justify-center text-[#009ab1] group-hover:bg-[#009ab1] group-hover:text-white transition-all duration-300 shrink-0">
                            <ArrowRight size={13} strokeWidth={2} />
                          </div>

                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* ============================================================ */}
            {/* PAGINATION CONTROLS */}
            {/* ============================================================ */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4 sm:pt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EDF6F5] border border-[#F8FAF9]/80 text-slate-700 flex items-center justify-center hover:bg-[#EAF4F3] transition disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                  title="Previous Page"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={14} />
                </button>

                {getPageNumbers().map((page, idx) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${idx}`} className="w-5 text-center text-xs text-slate-400 select-none">
                        ...
                      </span>
                    );
                  }
                  const isCurrent = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${isCurrent
                        ? 'bg-[#009ab1] text-white shadow-md scale-105'
                        : 'bg-[#EDF6F5] border border-[#F8FAF9]/80 text-slate-700 hover:bg-[#EAF4F3] shadow-sm'
                        }`}
                      aria-label={`Page ${page}`}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EDF6F5] border border-[#F8FAF9]/80 text-slate-700 flex items-center justify-center hover:bg-[#EAF4F3] transition disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                  title="Next Page"
                  aria-label="Next Page"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar (Stats + Carousel, No Images) */}
          <div className="lg:col-span-4 space-y-6">

            {/* LIVE IMPACT STATISTICS */}
            <div className={`${GLASS} rounded-[2.2rem] p-6 shadow-sm`}>
              <div className="pb-3.5 mb-4 border-b border-[#F8FAF9]/80/70">
                <SectionTag text="LIVE IMPACT STATISTICS" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                {[
                  { num: settings.stat1Number, text: settings.stat1Text },
                  { num: settings.stat2Number, text: settings.stat2Text },
                  { num: settings.stat3Number, text: settings.stat3Text },
                  { num: settings.stat4Number, text: settings.stat4Text }
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/70 border border-white shadow-sm hover:-translate-y-0.5 transition duration-300">
                    <span style={SERIF} className={`text-2xl sm:text-3xl font-normal leading-none block mb-1 ${BLUE}`}>
                      {stat.num}
                    </span>
                    <span
                      className="text-[11px] text-slate-500 block font-medium leading-snug"
                      dangerouslySetInnerHTML={{ __html: stat.text }}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. FEATURED EVENT BANNER (Sleek Oceanic Vector Banner, No Images) */}
        {/* ============================================================ */}
        <div className="pt-2">
          <div className="rounded-[2.4rem] bg-gradient-to-r from-[#30291f] via-[#005b68] to-[#009ab1] text-white p-7 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(48,41,31,0.24)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
              <path d="M0 240 C300 120 500 320 800 180 C1000 80 1100 160 1200 100 L1200 400 L0 400Z" fill="#009ab1" opacity="0.4" />
              <path d="M0 80 C240 -20 500 180 800 60 C1000 -20 1100 40 1200 10 L1200 0 L0 0Z" fill="#4fa8b2" opacity="0.3" />
              <circle cx="950" cy="180" r="140" fill="#74ddd4" opacity="0.25" />
            </svg>

            {/* Left Copy */}
            <div className="md:col-span-7 space-y-4 relative z-10">
              <SectionTag text="LEnSE MOVEMENT" light />
              <h3 style={SERIF} className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.12]">
                Be a part of<br />
                <em style={SERIF} className="italic text-[#009ab1]">the movement.</em>
              </h3>

              <p className="text-[#e5fffb] text-sm sm:text-base leading-relaxed max-w-md font-normal">
                Join inspiring events, academic programs and research workshops that create real-world educational impact.
              </p>

              <div className="pt-2">
                <Link href="/about" className="inline-flex">
                  <span className="px-6 py-3.5 rounded-full bg-[#EDF6F5] hover:bg-[#EDF6F5] text-[#143f45] text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-md hover:scale-105 active:scale-95">
                    <span>Explore About LEnSE</span>
                    <ArrowRight size={13} className="text-[#009ab1]" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="md:col-span-5 relative z-10 flex justify-center md:justify-end">
              <div className="w-full max-w-[340px] h-[190px] sm:h-[220px] rounded-3xl overflow-hidden shadow-2xl relative border border-white/20 bg-slate-900 group">
                <img
                  src="/about/about4.png"
                  alt="Be a part of the movement"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "/events/sustainability.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#243c38]/90 via-[#243c38]/30 to-transparent flex items-end justify-end p-5">
                  <div style={SERIF} className="text-right text-white italic text-sm sm:text-base leading-tight">
                    Learning today,<br /><span className="text-[#009ab1]">leading tomorrow.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. STAY UPDATED NEWSLETTER */}
        {/* ============================================================ */}
        <div className="pt-2">
          <div className={`${GLASS} rounded-[2.2rem] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(21,159,150,0.08)]`}>

            {/* Left Info */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#EAF4F3] border border-[#F8FAF9]/80 flex items-center justify-center text-[#009ab1] shadow-sm shrink-0">
                <Mail size={22} strokeWidth={1.75} />
              </div>
              <div>
                <h3 style={SERIF} className="text-2xl sm:text-3xl font-normal text-[#143f45] leading-tight">
                  {settings.newsletterTitle || 'Stay updated'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md font-normal">
                  {settings.newsletterText || 'Subscribe to our newsletter for upcoming events, insights and more.'}
                </p>
              </div>
            </div>

            {/* Right Rounded Pill Form */}
            <div className="w-full md:w-auto shrink-0">
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-[#009ab1] bg-[#EAF4F3] border border-[#F8FAF9]/80 px-6 py-3 rounded-full shadow-sm">
                  <CheckCircle2 size={16} />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="bg-[#EDF6F5] rounded-full p-1.5 pl-5 pr-1.5 flex items-center shadow-[0_6px_20px_rgba(21,159,150,0.12)] border border-[#F8FAF9]/80 w-full sm:w-[340px] md:w-[360px]"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="text-xs text-slate-800 placeholder:text-slate-400 bg-transparent border-0 outline-none ring-0 flex-1 font-medium min-w-0 pr-2"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-[#009ab1] hover:bg-[#005b68] text-white flex items-center justify-center transition shadow-md hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
                    title="Subscribe"
                  >
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </Wrap>

    </div>
  );
}
