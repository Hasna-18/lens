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
import { getFromCache, fetchWithCache, prefetchEndpoint } from '../../lib/clientCache';
import { sortEventsLatestFirst } from '../../lib/eventUtils';
import LoadingSpinner from '../../components/LoadingSpinner';

/* ---------- shared design system matching Home & About ---------- */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const BLUE = 'text-[#1a6dff]';
const GLASS =
  'bg-gradient-to-br from-white/80 via-sky-50/60 to-blue-100/40 backdrop-blur-xl border border-white/90 shadow-[0_18px_45px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,1)]';

const Wrap = ({ children, className = '' }) => (
  <div className={`relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Em = ({ children, light = false }) => (
  <em style={SERIF} className={`italic font-normal ${light ? 'text-sky-300' : BLUE}`}>{children}</em>
);

function SectionTag({ text, light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-sky-300' : 'bg-[#1a6dff]'}`} />
      <span className={`text-[11px] font-bold tracking-[0.22em] uppercase ${light ? 'text-sky-200' : BLUE}`}>{text}</span>
      <span className={`w-16 h-px ${light ? 'bg-white/20' : 'bg-blue-200'}`} />
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

/* Silky ocean streaks background for the hero (matching About page) */
function OceanWaves() {
  const colors = ['#ffffff', '#7dd3fc', '#0ea5e9', '#1d4ed8', '#bae6fd', '#0369a1'];
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
          <stop offset="0%" stopColor="#eaf6ff" />
          <stop offset="0.45" stopColor="#4cb8f5" />
          <stop offset="1" stopColor="#1e40af" />
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
      setEvents(formatEventsList(cached));
      setLoading(false);
    }

    fetchWithCache('/api/events', 'clese_events_cache', formatEventsList)
      .then((formatted) => {
        if (isMounted && Array.isArray(formatted) && formatted.length > 0) {
          setEvents(formatted);
          setLoading(false);
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
    <div className="min-h-screen bg-[#f4f8ff] text-slate-800 font-sans pb-20 sm:pb-28 selection:bg-blue-100 relative overflow-hidden">

      {/* ============================================================ */}
      {/* 0. HERO SECTION (Crisp & Clean - Matching About Page) */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden min-h-[calc(100vh-70px)] sm:min-h-screen flex flex-col justify-center py-20 sm:py-24">
        {/* Ocean Waves Background matching About page */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[75%] pointer-events-none select-none">
          <OceanWaves />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/70 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/85 to-transparent pointer-events-none" />

        {/* Decorative Ring + Dots on left edge (matching About page) */}
        <div className="hidden lg:block absolute -left-[270px] top-[22%] w-[320px] h-[320px] rounded-full border border-sky-400/50 pointer-events-none" />
        <div className="hidden lg:block absolute left-[80px] top-[60%] w-2.5 h-2.5 rounded-full bg-[#1a6dff] pointer-events-none" />
        <Dots rows={8} cols={5} className="hidden lg:grid absolute left-3 bottom-16 pointer-events-none" />

        <Wrap className="w-full relative z-10 my-auto">
          <div className="grid lg:grid-cols-12 items-center gap-10 lg:gap-8">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase ${BLUE}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a6dff]" />LEnSE EVENTS
                </span>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Home size={12} className="text-[#1a6dff]" />
                  <Link href="/" className="hover:text-[#1a6dff] transition-colors">Home</Link>
                  <span className="text-slate-300">&gt;</span>
                  <span className="text-[#1a6dff]">Events</span>
                </div>
              </div>

              <h1 style={SERIF} className="text-[52px] sm:text-[66px] lg:text-[74px] leading-[1.03] tracking-tight text-slate-900 font-normal">
                Events that<br />
                <em className={`${BLUE} font-normal`}>inspire change.</em>
              </h1>

              <p className="text-slate-600 text-[15px] sm:text-[16px] leading-[1.8] max-w-[500px]">
                Discover seminars, workshops, conferences and training programmes that bring people together to share knowledge, spark ideas and create a more sustainable future.
              </p>

              <div className="pt-2">
                <a href="#events-section" className="inline-flex">
                  <span className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 shadow-[0_12px_26px_rgba(10,108,255,0.4)] hover:scale-[1.03] transition">
                    EXPLORE ALL EVENTS <ArrowRight size={13} />
                  </span>
                </a>
              </div>
            </div>

            {/* Right: Floating Glass Card (Matching About Page Estd Card) */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end hidden sm:flex">
              <div className="relative w-[300px] sm:w-[320px] rounded-[1.8rem] p-7 sm:p-8 bg-gradient-to-br from-white/55 via-sky-50/40 to-blue-100/30 backdrop-blur-xl border border-white/80 shadow-[0_25px_60px_rgba(2,60,140,0.22),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition duration-300">
                <span className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-white/90 border border-white text-sky-500 flex items-center justify-center shadow-md">
                  <Sparkles size={17} />
                </span>
                <p className="text-[10px] font-bold tracking-[0.22em] text-slate-600 uppercase mb-1">UPCOMING EVENTS</p>
                <p style={SERIF} className="text-6xl sm:text-[68px] text-slate-900 leading-none my-2 font-normal">
                  {events.length > 0 ? `${events.length}+` : '18+'}
                </p>
                <p className="text-[13.5px] text-slate-600 leading-relaxed max-w-[210px] mt-2">
                  Promoting innovative, inclusive and sustainable learning events.
                </p>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <Wrap className="space-y-10 sm:space-y-14 relative z-10">

        {/* ============================================================ */}
        {/* 2. FIVE CATEGORY CARDS DOCK (1 Row of 5 Columns) */}
        {/* ============================================================ */}
        <div className={`${GLASS} rounded-[2rem] sm:rounded-[2.4rem] p-2.5 sm:p-4 shadow-[0_20px_50px_rgba(37,99,235,0.08)]`}>
          <div className="grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-blue-100/70 gap-2 sm:gap-0">
            {categories.map((cat, i) => {
              const isSelected = selectedCategory === cat.name;
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`flex flex-col items-center text-center px-2 sm:px-4 py-3 sm:py-4 group transition-all duration-300 rounded-2xl cursor-pointer ${isSelected
                    ? 'bg-blue-50/90 shadow-sm ring-2 ring-[#1a6dff]/30'
                    : 'hover:bg-white/60'
                    }`}
                >
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2.5 transition-all duration-300 ${isSelected
                    ? 'bg-[#1a6dff] text-white shadow-md scale-105'
                    : 'bg-blue-50 border border-blue-100 text-[#1a6dff] group-hover:scale-105'
                    }`}>
                    <Icon size={20} strokeWidth={1.6} />
                  </div>

                  <h4 style={SERIF} className={`text-[15px] sm:text-[16px] font-normal mb-1 leading-tight transition-colors ${isSelected ? 'text-[#1a6dff] font-bold' : 'text-slate-900 group-hover:text-[#1a6dff]'}`}>
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
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-blue-100">
              <div className="space-y-1">
                <SectionTag text="UPCOMING EVENTS" />
                <h2 style={SERIF} className="text-3xl sm:text-4xl font-normal text-[#0f1a3a] tracking-tight">
                  Explore what's <Em>next.</Em>
                </h2>
              </div>

              <button
                onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
                className="self-start sm:self-auto px-4 py-2 rounded-full bg-white/90 border border-blue-100 text-xs font-bold text-[#1a6dff] hover:bg-blue-50 flex items-center gap-2 transition shadow-sm cursor-pointer"
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
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[#1a6dff] mx-auto mb-3 shadow-sm">
                    <Calendar size={22} />
                  </div>
                  <h3 style={SERIF} className="text-xl font-normal text-slate-900 mb-1">No events found in this category</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    Check back soon for upcoming announcements in this category.
                  </p>
                  <button
                    onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
                    className="px-5 py-2.5 rounded-full bg-[#1a6dff] text-white text-[11px] font-bold uppercase tracking-wider hover:scale-105 transition shadow-sm cursor-pointer"
                  >
                    Show All Events
                  </button>
                </div>
              ) : (
                paginatedEvents.map((evt) => {
                  const CategoryIcon = getCategoryIcon(evt.categoryTag || evt.category);
                  return (
                    <Link key={evt.id} href={`/events/${evt.slug || evt.id}`} className="block group">
                      <div className="flex items-center gap-3 sm:gap-5">

                        {/* Left Date Column */}
                        <div className="w-12 sm:w-16 text-center shrink-0">
                          <span style={SERIF} className="block text-2xl sm:text-3xl font-normal text-[#0f1a3a] leading-none">
                            {evt.dateDay}
                          </span>
                          <span className="block text-[9.5px] sm:text-[11px] font-bold text-[#1a6dff] mt-1 uppercase tracking-wider">
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
                            <span className="inline-block px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-[#1a6dff] mb-1.5 w-max border border-blue-100">
                              {evt.categoryTag || evt.category}
                            </span>

                            <h3 style={SERIF} className="text-[16px] sm:text-[19px] font-normal text-[#0f1a3a] leading-tight mb-1 group-hover:text-[#1a6dff] transition-colors line-clamp-1 sm:line-clamp-2">
                              {evt.title}
                            </h3>

                            <p className="text-[11.5px] sm:text-[13px] text-slate-500 leading-relaxed line-clamp-1 sm:line-clamp-2 mb-2 font-normal">
                              {evt.subtitle || evt.desc || 'Explore collaborative learning and sustainability education initiatives.'}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[10.5px] sm:text-[11.5px] text-slate-500 font-medium">
                              <span className="flex items-center gap-1.5 truncate">
                                <MapPin size={12} className="text-[#1a6dff] shrink-0" />
                                {evt.location || 'Kazhakkoottam, Kerala'}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={12} className="text-[#1a6dff] shrink-0" />
                                {evt.duration || 'Session'}
                              </span>
                            </div>
                          </div>

                          {/* Right Circular Arrow Button */}
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-[0_6px_14px_rgba(37,99,235,0.12)] border border-white flex items-center justify-center text-[#1a6dff] group-hover:bg-[#1a6dff] group-hover:text-white transition-all duration-300 shrink-0">
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
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-blue-100 text-slate-700 flex items-center justify-center hover:bg-blue-50 transition disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
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
                        ? 'bg-[#1a6dff] text-white shadow-md scale-105'
                        : 'bg-white border border-blue-100 text-slate-700 hover:bg-blue-50 shadow-sm'
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
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-blue-100 text-slate-700 flex items-center justify-center hover:bg-blue-50 transition disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer"
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
              <div className="pb-3.5 mb-4 border-b border-blue-100/70">
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
          <div className="rounded-[2.4rem] bg-gradient-to-r from-[#041a45] via-[#0a3a9c] to-[#1d5be0] text-white p-7 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(3,21,51,0.32)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
              <path d="M0 240 C300 120 500 320 800 180 C1000 80 1100 160 1200 100 L1200 400 L0 400Z" fill="#38bdf8" opacity="0.4" />
              <path d="M0 80 C240 -20 500 180 800 60 C1000 -20 1100 40 1200 10 L1200 0 L0 0Z" fill="#7dd3fc" opacity="0.3" />
              <circle cx="950" cy="180" r="140" fill="#60a5fa" opacity="0.25" />
            </svg>

            {/* Left Copy */}
            <div className="md:col-span-7 space-y-4 relative z-10">
              <SectionTag text="LEnSE MOVEMENT" light />
              <h3 style={SERIF} className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.12]">
                Be a part of<br />
                <em style={SERIF} className="italic text-sky-300">the movement.</em>
              </h3>

              <p className="text-sky-100/90 text-sm sm:text-base leading-relaxed max-w-md font-normal">
                Join inspiring events, academic programs and research workshops that create real-world educational impact.
              </p>

              <div className="pt-2">
                <Link href="/about" className="inline-flex">
                  <span className="px-6 py-3.5 rounded-full bg-white hover:bg-sky-50 text-[#0f1a3a] text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-md hover:scale-105 active:scale-95">
                    <span>Explore About LEnSE</span>
                    <ArrowRight size={13} className="text-[#1a6dff]" />
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#041a45]/90 via-[#041a45]/30 to-transparent flex items-end justify-end p-5">
                  <div style={SERIF} className="text-right text-white italic text-sm sm:text-base leading-tight">
                    Learning today,<br /><span className="text-sky-300">leading tomorrow.</span>
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
          <div className={`${GLASS} rounded-[2.2rem] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(37,99,235,0.08)]`}>

            {/* Left Info */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a6dff] shadow-sm shrink-0">
                <Mail size={22} strokeWidth={1.75} />
              </div>
              <div>
                <h3 style={SERIF} className="text-2xl sm:text-3xl font-normal text-[#0f1a3a] leading-tight">
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
                <div className="flex items-center gap-2 text-xs font-bold text-[#1a6dff] bg-blue-50 border border-blue-100 px-6 py-3 rounded-full shadow-sm">
                  <CheckCircle2 size={16} />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="bg-white rounded-full p-1.5 pl-5 pr-1.5 flex items-center shadow-[0_6px_20px_rgba(37,99,235,0.12)] border border-blue-100 w-full sm:w-[340px] md:w-[360px]"
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
                    className="w-9 h-9 rounded-full bg-[#1a6dff] hover:bg-blue-600 text-white flex items-center justify-center transition shadow-md hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
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
