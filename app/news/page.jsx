'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  GraduationCap,
  Trophy,
  Handshake,
  FlaskConical,
  Users,
  FileText,
  Globe,
  Sparkles,
  Activity,
  BookOpen,
  Lightbulb
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Achievements',
  'Partnerships',
  'Research',
  'Initiatives',
  'Community',
  'Media',
  'Announcements'
];

const MEDIA_MENTIONS = [
  {
    id: 1,
    source: 'The Hindu',
    badge: 'THE HINDU',
    badgeBg: 'bg-slate-900 text-white font-serif',
    title: "LEnSE's STEM Camp Featured in The Hindu",
    date: '15 May 2025'
  },
  {
    id: 2,
    source: 'Mathrubhumi News',
    badge: 'm',
    badgeSub: 'MATHRUBHUMI',
    badgeBg: 'bg-[#0f4c81] text-white font-bold',
    title: 'Innovative Teacher Training Initiative by LEnSE',
    subtitle: 'Mathrubhumi News',
    date: '28 Apr 2025'
  },
  {
    id: 3,
    source: 'News Bytes',
    badge: 'NEWS BYTES',
    badgeBg: 'bg-slate-100 text-slate-800 font-bold border border-slate-300',
    title: 'LEnSE Clarkson Collaboration in News Bytes',
    date: '21 Apr 2025'
  }
];

const SectionDots = ({ cols, rows, gap = 16, className = '' }) => (
  <div
    className={`grid pointer-events-none select-none ${className}`}
    style={{ gridTemplateColumns: `repeat(${cols}, 3px)`, gap }}
  >
    {Array.from({ length: cols * rows }).map((_, i) => (
      <span key={i} className="w-[3px] h-[3px] rounded-full bg-blue-500/50 dark:bg-blue-400/40" />
    ))}
  </div>
);

function Dots({ rows = 5, cols = 10, className = '' }) {
  return (
    <div className={`grid gap-2 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#009ab1]/60 dark:bg-sky-400/60" />
      ))}
    </div>
  );
}

function Swirl({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-[#009ab1]/20 via-[#38bdf8]/15 to-transparent blur-3xl ${className}`}
    />
  );
}

function Flow({ className = '' }) {
  return (
    <svg aria-hidden="true" className={`absolute pointer-events-none ${className}`} viewBox="0 0 800 160" fill="none" preserveAspectRatio="none">
      <path d="M0 150 C200 20 420 10 800 60" stroke="#009ab1" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d="M0 160 C220 50 440 40 800 90" stroke="#38bdf8" strokeOpacity="0.32" strokeWidth="1" />
      <path d="M0 140 C180 0 400 -10 800 30" stroke="#93c5fd" strokeOpacity="0.55" strokeWidth="1" />
    </svg>
  );
}

const parseDateParts = (dateStr) => {
  if (!dateStr) return { day: '18', month: 'MAY', year: '2025' };
  try {
    const parts = dateStr.trim().split(/[\s,/-]+/);
    if (parts.length >= 3) {
      if (isNaN(parts[1]) && !isNaN(parts[0])) {
        return {
          day: parts[0].padStart(2, '0'),
          month: parts[1].slice(0, 3).toUpperCase(),
          year: parts[2]
        };
      }
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return {
          day: String(d.getDate()).padStart(2, '0'),
          month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
          year: String(d.getFullYear())
        };
      }
    }
  } catch (e) {}
  return { day: '18', month: 'MAY', year: '2025' };
};

const CARD_THEMES = [
  {
    tagBg: 'bg-blue-50 text-blue-600 border-blue-200/80',
    waveColor: '#3b82f6',
    gradient: 'from-blue-500/15 via-sky-400/10 to-transparent',
    iconBg: 'bg-gradient-to-br from-[#009ab1] to-sky-400 shadow-[0_8px_20px_rgba(10,108,255,0.3)] text-white',
    icon: GraduationCap,
  },
  {
    tagBg: 'bg-amber-50 text-amber-600 border-amber-200/80',
    waveColor: '#f59e0b',
    gradient: 'from-amber-500/15 via-orange-400/10 to-transparent',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-400 shadow-[0_8px_20px_rgba(245,158,11,0.3)] text-white',
    icon: FileText,
  },
  {
    tagBg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80',
    waveColor: '#10b981',
    gradient: 'from-emerald-500/15 via-teal-400/10 to-transparent',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-400 shadow-[0_8px_20px_rgba(16,185,129,0.3)] text-white',
    icon: Users,
  },
  {
    tagBg: 'bg-purple-50 text-purple-600 border-purple-200/80',
    waveColor: '#a855f7',
    gradient: 'from-purple-500/15 via-indigo-400/10 to-transparent',
    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-400 shadow-[0_8px_20px_rgba(168,85,247,0.3)] text-white',
    icon: FlaskConical,
  },
];

const getCardTheme = (item, index) => {
  const text = `${item.tag || ''} ${item.category || ''} ${item.title || ''}`.toLowerCase();
  if (text.includes('announc') || text.includes('call for') || text.includes('paper')) return CARD_THEMES[1];
  if (text.includes('communit') || text.includes('camp') || text.includes('girl') || text.includes('initiat')) return CARD_THEMES[2];
  if (text.includes('research') || text.includes('ai') || text.includes('personalized')) return CARD_THEMES[3];
  if (text.includes('feature') || text.includes('clarkson') || text.includes('partner') || text.includes('achieve')) return CARD_THEMES[0];
  return CARD_THEMES[index % CARD_THEMES.length];
};

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchNews() {
      try {
        setLoading(true);
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            setNewsList(data);
          }
        }
      } catch (err) {
        console.error("Error fetching news from database:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchNews();
    return () => { isMounted = false; };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const filteredNews = useMemo(() => {
    return newsList.filter(item => {
      const matchesCategory = selectedCategory === 'All' ||
        (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase() === selectedCategory.toLowerCase());
      const matchesSearch = !searchQuery ||
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [newsList, selectedCategory, searchQuery]);

  const glanceStats = useMemo(() => [
    {
      label: 'Total News',
      desc: 'All latest updates from LEnSE',
      count: String(newsList.length || 7),
      icon: FileText,
      category: 'All'
    },
    {
      label: 'Achievements',
      desc: 'Recognitions and awards',
      count: String(newsList.length ? newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('achievement')).length : 1),
      icon: Trophy,
      category: 'Achievements'
    },
    {
      label: 'Partnerships',
      desc: 'Collaborations and MoUs',
      count: String(newsList.length ? newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('partner')).length : 2),
      icon: Handshake,
      category: 'Partnerships'
    },
    {
      label: 'Research Updates',
      desc: 'Publications and breakthroughs',
      count: String(newsList.length ? newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('research')).length : 1),
      icon: BookOpen,
      category: 'Research'
    },
    {
      label: 'Initiatives',
      desc: 'Programs and projects',
      count: String(newsList.length ? newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('initiat')).length : 1),
      icon: Lightbulb,
      category: 'Initiatives'
    },
    {
      label: 'Community Stories',
      desc: 'People and impact',
      count: String(newsList.length ? newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('communit')).length : 1),
      icon: Users,
      category: 'Community'
    },
  ], [newsList]);

  // Dynamic pagination calculation (4 items per page for balanced layout)
  const itemsPerPage = 4;
  const totalNews = filteredNews.length;
  const totalPages = Math.ceil(totalNews / itemsPerPage) || 1;

  // Reset to first page when search or category filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredNews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredNews, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (typeof page === 'number' && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (typeof window !== 'undefined') {
        const el = document.getElementById('news-list-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-blue-500/20 transition-colors duration-300">

      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT & SPHERE (MATCHING EVENTS PAGE) */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="https://images.pexels.com/photos/14314638/pexels-photo-14314638.jpeg"
          alt="LEnSE Sustainability Sphere"
          className="w-full h-full object-cover object-center lg:object-right-top scale-[1.04] transform-gpu transition-transform duration-1000 ease-out"
        />

        {/* Soft Organic Fade Masks into the Canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] dark:from-[#030712] via-[#f8fafc]/80 dark:via-[#030712]/80 via-[18%] to-transparent to-[42%] w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f8fafc] dark:from-[#030712] via-[#f8fafc]/60 dark:via-[#030712]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f8fafc] dark:from-[#030712] to-transparent" />
      </div>

      {/* Abstract geometry and soft ambience (matching Events page) */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[1100px] z-0 pointer-events-none overflow-hidden">
        <Swirl className="-top-16 -left-24 w-[420px] h-[360px]" />
        <Swirl className="top-[390px] right-[-100px] w-[420px] h-[420px] opacity-70" />
        <div className="hidden lg:block absolute -left-[190px] top-[250px] w-[320px] h-[320px] rounded-full border border-[#009ab1]/20 dark:border-sky-400/20" />
        <div className="hidden lg:block absolute left-[92px] top-[405px] w-2.5 h-2.5 rounded-full bg-[#009ab1]/60 dark:bg-sky-400/60" />
        <div className="hidden lg:block absolute right-[7%] top-[520px] w-[180px] h-[180px] rounded-full border border-[#009ab1]/15 dark:border-sky-400/15" />
        <Dots rows={8} cols={6} className="hidden sm:grid absolute left-5 top-[560px] opacity-60" />
        <Dots rows={7} cols={10} className="hidden lg:grid absolute right-10 top-[690px] opacity-50" />
        <Flow className="hidden lg:block absolute right-0 top-[610px] w-[52%] h-40" />
      </div>

      {/* Ambient background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009ab1]/15 dark:from-blue-950/20 via-sky-50/30 dark:via-transparent to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009ab1]/15 dark:from-blue-900/15 via-sky-50/30 dark:via-transparent to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-50/40 dark:from-indigo-950/20 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10">

        {/* ============================================================ */}
        {/* A. DESKTOP VIEW HERO (VISIBLE ON LARGE SCREENS ONLY) */}
        {/* ============================================================ */}
        <div className="hidden lg:block">

          {/* 1. HERO SECTION */}
          <div className="grid grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] sm:min-h-[560px]">

            {/* Left: Text & CTA */}
            <div className="col-span-6 space-y-6 lg:pr-2 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white/80 dark:border-slate-800 shadow-sm hover:border-[#009ab1]/70 transition-colors duration-300">
                <span className="text-[11px] font-bold tracking-[0.22em] text-[#009ab1] dark:text-sky-400 uppercase">
                  LEnSE NEWS &amp; MEDIA
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-normal text-slate-900 dark:text-white leading-[1.05] tracking-tight font-serif">
                Stories that<br />
                <span className="italic text-[#009ab1] dark:text-sky-400 font-serif font-normal">inspire change.</span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-[13.5px] leading-[1.72] max-w-[430px] font-normal">
                Discover research breakthroughs, statewide STEM training milestones, partnerships, and stories that bring people together to create a more sustainable future.
              </p>

              <div className="pt-2">
                <a href="#news-list-section" className="inline-flex group">
                  <button className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#009ab1] to-[#009ab1] hover:from-[#0052cc] hover:to-[#009ab1] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(10,108,255,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer">
                    <span>Explore All Stories</span>
                    <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center group-hover:bg-white/20 group-hover:border-white transition-all duration-300">
                      <ArrowRight size={10} className="text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </button>
                </a>
              </div>
            </div>

            {/* Right: Transparent Crystal Glass "Latest Coverage" Card */}
            <div className="col-span-6 relative flex items-center justify-start lg:justify-center min-h-[340px] sm:min-h-[420px]">
              <div className="relative lg:ml-[-50px] xl:ml-[-90px] bg-gradient-to-br from-white/65 dark:from-slate-900/65 via-white/45 dark:via-slate-900/45 to-[#009ab1]/12 backdrop-blur-2xl p-6 sm:p-7 rounded-[2.2rem] border-[1.5px] border-white/95 dark:border-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),inset_2px_0_4px_rgba(255,255,255,0.8),0_25px_50px_-10px_rgba(10,108,255,0.18)] dark:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.5)] w-52 sm:w-60 z-20 group transition-all duration-500 hover:-translate-y-2 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_35px_70px_-10px_rgba(10,108,255,0.28)] cursor-pointer">
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/70 dark:from-white/10 via-white/20 to-transparent rounded-tl-[2.2rem] pointer-events-none" />
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white/95 dark:from-slate-800 via-blue-50/60 dark:via-slate-800/60 to-[#009ab1]/12 backdrop-blur-2xl border-[1.5px] border-white dark:border-slate-700 shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06),0_10px_20px_rgba(10,108,255,0.15)] flex items-center justify-center absolute -top-5 -right-5 text-[#009ab1] dark:text-sky-400 z-30 transition-all duration-500 group-hover:scale-115 group-hover:rotate-12 group-hover:text-blue-700 dark:group-hover:text-sky-300">
                  <FileText size={20} strokeWidth={1.75} />
                </div>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1.5 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] group-hover:tracking-[0.25em] transition-all duration-300">
                  Latest Coverage
                </p>
                <h3 className="text-4xl sm:text-5xl font-serif text-slate-900 dark:text-white mb-3 tracking-tight font-normal relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] group-hover:scale-105 origin-left transition-transform duration-300">
                  {newsList.length > 0 ? `${newsList.length}+` : '8+'}
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-3 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  Promoting innovative, inclusive and sustainable learning insights.
                </p>
                <div className="w-5 h-[1.5px] bg-[#009ab1] dark:bg-sky-400 rounded-full mt-2 relative z-10 group-hover:w-10 transition-all duration-300" />
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 border border-white/80 dark:border-slate-800 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:scale-105 transition-transform duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                  <span className="text-[9.5px] font-bold tracking-wider text-[#009ab1] dark:text-sky-400 uppercase">
                    LEnSE NEWS
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white leading-[1.1] tracking-tight font-serif">
                  Stories that<br />
                  <span className="italic text-[#009ab1] dark:text-sky-400 font-serif font-normal">inspire change.</span>
                </h1>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                  Stay updated with achievements, initiatives, partnerships and community stories from LEnSE.
                </p>

                <div className="pt-1">
                  <a href="#news-list-section" className="inline-flex group">
                    <button className="px-5 py-2.5 rounded-full bg-[#009ab1] hover:bg-blue-600 text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95">
                      <span>Explore All Stories</span>
                      <ArrowRight size={12} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </a>
                </div>
              </div>

              {/* Right Glass Card: Latest Coverage */}
              <div className="col-span-5 flex justify-end items-start pt-1 relative">
                <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl p-3.5 sm:p-4 rounded-2xl border border-white/80 dark:border-slate-800 shadow-[0_8px_25px_rgba(10,108,255,0.08)] w-full max-w-[165px] z-20 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 border border-white/80 dark:border-slate-700 shadow-sm flex items-center justify-center absolute -top-2.5 -right-2.5 text-[#009ab1] dark:text-sky-400 z-30 group-hover:scale-115 group-hover:rotate-12 transition-all duration-300">
                    <FileText size={16} strokeWidth={2} />
                  </div>

                  <p className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5 relative z-10 group-hover:tracking-widest transition-all duration-300">
                    LATEST COVERAGE
                  </p>

                  <h3 className="text-3xl font-serif text-slate-900 dark:text-white mb-0.5 tracking-tight font-bold relative z-10 group-hover:scale-105 origin-left transition-transform duration-300">
                    {newsList.length > 0 ? `${newsList.length}+` : '8+'}
                  </h3>

                  <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug font-medium mb-1 relative z-10">
                    Promoting innovative, inclusive and sustainable learning insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. AMBIENT BACKGROUND GLOWS & 3D GLASS ORBS (matching picture) */}
        {/* ============================================================ */}
        {/* Far Left 3D Glass Spheres with Inner Highlights */}
        <div className="hidden lg:block absolute -left-16 top-[460px] w-32 h-32 rounded-full bg-gradient-to-br from-blue-300/40 via-sky-300/25 to-blue-600/30 backdrop-blur-md border border-white/70 shadow-[0_20px_45px_rgba(37,99,235,0.18),inset_0_4px_12px_#fff] pointer-events-none z-0" />
        <div className="hidden lg:block absolute -left-8 top-[680px] w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/40 to-sky-300/30 border border-white/60 shadow-md pointer-events-none z-0" />
        <div className="hidden lg:block absolute -left-14 bottom-[180px] w-24 h-24 rounded-full bg-gradient-to-br from-sky-300/40 via-blue-500/25 to-transparent border border-white/60 shadow-lg pointer-events-none z-0" />

        {/* Far Right 3D Glass Sphere above the sidebar card */}
        <div className="hidden xl:block absolute -right-10 top-[440px] w-24 h-24 rounded-full bg-gradient-to-br from-blue-300/40 via-sky-300/20 to-blue-600/25 border border-white/70 shadow-lg pointer-events-none z-0" />

        {/* Sweeping Thin SVG Wave Background Curves */}
        <svg className="hidden lg:block absolute -left-10 top-[380px] w-[500px] h-[360px] pointer-events-none z-0 opacity-40 dark:opacity-20" viewBox="0 0 500 360" fill="none">
          <path d="M0 80 C 180 30, 320 180, 500 120" stroke="#93c5fd" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M0 130 C 160 90, 340 240, 500 180" stroke="#60a5fa" strokeWidth="0.8" />
          <path d="M0 190 C 200 150, 300 300, 500 240" stroke="#3b82f6" strokeWidth="0.6" strokeOpacity="0.5" />
        </svg>

        {/* Dot Grids in Background matching picture */}
        <SectionDots cols={5} rows={5} gap={15} className="hidden xl:grid absolute -right-4 top-[540px] z-0 opacity-70" />
        <SectionDots cols={6} rows={4} gap={14} className="hidden xl:grid absolute right-[35%] bottom-[40px] z-0 opacity-40" />

        {/* ============================================================ */}
        {/* 2. SEARCH & CATEGORY FILTER DOCK (matching picture) */}
        {/* ============================================================ */}
        <div className="relative z-20 mt-8 sm:mt-12 mb-8 sm:mb-10 flex flex-col xl:flex-row items-center justify-between gap-4">

          {/* Search Input Box with Glass Pill */}
          <div className="relative w-full xl:w-80 shrink-0">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, topics, tags..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/85 dark:border-white/10 text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#009ab1]/25 focus:border-[#009ab1] shadow-[0_4px_20px_rgba(0,0,0,0.03),inset_0_1px_1px_#fff]"
            />
          </div>

          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar py-1">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#009ab1] to-[#009ab1] text-white shadow-[0_4px_16px_rgba(10,108,255,0.38),inset_0_1px_1px_rgba(255,255,255,0.4)] scale-[1.02]'
                      : 'bg-white/65 dark:bg-slate-900/65 hover:bg-white/90 dark:hover:bg-slate-800/90 backdrop-blur-xl text-slate-700 dark:text-slate-300 border border-white/80 dark:border-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.02),inset_0_1px_1px_#fff] hover:border-blue-200 dark:hover:border-blue-900/50'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. MAIN TWO-COLUMN CONTENT GRID */}
        {/* ============================================================ */}
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

          {/* Left Column (8 cols): Latest News List + Pagination */}
          <div className="lg:col-span-8 space-y-6">

            {/* LATEST NEWS HEADER (matching picture) */}
            <div id="news-list-section" className="scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#009ab1]" />
                    <span className="text-[10.5px] font-bold tracking-[0.22em] text-[#009ab1] dark:text-sky-400 uppercase">
                      NEWS &amp; INSIGHTS
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                      Latest <span className="font-serif italic font-normal text-[#009ab1] dark:text-sky-400">News</span>
                    </h2>
                    <span className="text-slate-300 dark:text-slate-600 text-2xl font-light hidden sm:inline">—</span>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] font-normal max-w-sm">
                      Stories, milestones and updates from the LEnSE community.
                    </p>
                  </div>
                </div>

                {/* Right side: Showing count and mini arrow buttons */}
                <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Showing {totalNews > 0 ? `${(currentPage - 1) * itemsPerPage + 1}–${Math.min(currentPage * itemsPerPage, totalNews)}` : '0'} of {totalNews}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-[#009ab1] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition cursor-pointer shadow-2xs"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft size={15} />
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 rounded-full bg-[#009ab1] text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition cursor-pointer shadow-sm shadow-blue-500/30"
                      aria-label="Next Page"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* NEWS CARDS LIST (matching picture) */}
              {loading ? (
                <div className="text-center py-16 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
                  <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-500/20 border-t-[#009ab1] rounded-full mb-3"></div>
                  <h4 className="text-base font-serif text-slate-900 dark:text-white mb-1">Loading News...</h4>
                </div>
              ) : filteredNews.length === 0 ? (
                <div className="text-center py-16 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 dark:border-slate-800 p-8 shadow-sm">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-950/60 rounded-full flex items-center justify-center text-[#009ab1] dark:text-sky-400 mx-auto mb-3 shadow-inner border border-blue-100 dark:border-blue-900/40">
                    <FileText size={24} />
                  </div>
                  <h4 className="text-base font-serif text-slate-900 dark:text-white mb-1">No news found</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto mb-4">
                    Try adjusting your search query or selecting a different category filter.
                  </p>
                  <button
                    onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-[#009ab1] to-[#009ab1] hover:from-[#095edb] hover:to-[#155edb] text-white text-[11px] font-bold uppercase tracking-wider transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    Show All News
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedNews.map((item, index) => {
                    const theme = getCardTheme(item, index);
                    const dateParts = parseDateParts(item.date);
                    return (
                      <Link key={item.id} href={`/news/${item.slug || item.id}`} className="block">
                        <div className="group rounded-[2.2rem] bg-gradient-to-r from-white/80 via-white/60 to-blue-50/30 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-blue-950/30 backdrop-blur-2xl border border-white/90 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-700/50 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center shadow-[0_16px_45px_rgba(37,99,235,0.06),inset_0_1.5px_2px_#fff,inset_0_-1px_1px_rgba(255,255,255,0.35)] dark:shadow-[0_16px_45px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_24px_55px_rgba(37,99,235,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">

                          {/* Right Corner Wavy Aura & Ambient Gradient (matching picture) */}
                          <div className={`absolute top-0 right-0 w-[45%] h-full bg-gradient-to-l ${theme.gradient} pointer-events-none rounded-r-[2rem]`} />

                          {/* Right Corner Flowing Decorative Wave Curves */}
                          <svg className="absolute -top-4 -right-4 w-48 h-36 pointer-events-none opacity-40 dark:opacity-20 group-hover:opacity-75 transition-opacity duration-500" viewBox="0 0 160 120" fill="none">
                            {[0, 1, 2, 3].map((i) => (
                              <path
                                key={i}
                                d={`M0 ${70 + i * 10} C 50 ${50 + i * 8}, 110 ${30 + i * 5}, 160 ${10 + i * 12}`}
                                stroke={theme.waveColor}
                                strokeOpacity={0.45 - i * 0.08}
                                strokeWidth="1"
                              />
                            ))}
                          </svg>

                          {/* Top Right: Three Dots Action Menu */}
                          <div className="absolute top-4 right-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition text-sm select-none font-bold tracking-widest cursor-pointer z-10">
                            &bull;&bull;&bull;
                          </div>

                          {/* Floating 3D Frosted Glass Diamond/Badge in right wave */}
                          <div className="absolute right-7 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none">
                            <div className={`w-13 h-13 rounded-2xl ${theme.iconBg} transform rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 flex items-center justify-center border-2 border-white/70 dark:border-white/20 backdrop-blur-md`}>
                              <theme.icon size={22} className="transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                            </div>
                          </div>

                          {/* Image Thumbnail with Left Pinned Floating Date Pill */}
                          <div className="relative w-full sm:w-[220px] md:w-[240px] h-[155px] shrink-0 rounded-[1.6rem] overflow-hidden bg-slate-100 dark:bg-slate-950 border border-white/80 dark:border-slate-800 shadow-sm">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              onError={(e) => {
                                e.currentTarget.src = "/events/events_book_plant.jpg";
                              }}
                            />

                            {/* Floating Glassmorphic Date Badge (matching picture) */}
                            <div className="absolute left-3 top-3 bottom-3 w-[54px] rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_1.5px_#fff] flex flex-col items-center justify-center py-2 select-none z-10">
                              <span className="text-xl font-bold font-sans text-slate-900 dark:text-white leading-none">
                                {dateParts.day}
                              </span>
                              <span className="text-[10px] font-extrabold text-slate-600 dark:text-slate-300 tracking-wider uppercase mt-1">
                                {dateParts.month}
                              </span>
                              <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                                {dateParts.year}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 w-full min-w-0 space-y-1.5 py-1 pr-0 md:pr-16 z-10">
                            {/* Category Pill */}
                            <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-2xs ${theme.tagBg}`}>
                              {item.tag || item.category || 'News'}
                            </span>

                            {/* Title */}
                            <h3 className="text-base sm:text-[17px] font-serif font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#009ab1] dark:group-hover:text-sky-400 transition-colors line-clamp-2 mt-1">
                              {item.title}
                            </h3>

                            {/* Desc */}
                            <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-normal">
                              {item.desc}
                            </p>

                            {/* Meta row: Date + Read Story */}
                            <div className="flex items-center justify-between text-xs pt-2">
                              <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-medium">
                                <Calendar size={13} className="text-[#009ab1] dark:text-sky-400" />
                                <span>{item.date}</span>
                              </span>

                              <div className="inline-flex items-center gap-2 group/btn">
                                <span className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/40 text-[#009ab1] dark:text-sky-400 flex items-center justify-center group-hover:bg-[#009ab1] group-hover:text-white transition-colors shadow-2xs">
                                  <ArrowRight size={13} />
                                </span>
                                <span className="text-xs font-bold text-[#009ab1] dark:text-sky-400 group-hover:text-blue-700 transition-colors">
                                  Read Story
                                </span>
                              </div>
                            </div>
                          </div>

                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CLEAN PAGINATION CONTROLS (matching picture) */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2 select-none">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#009ab1] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition cursor-pointer shadow-2xs"
                  title="Previous Page"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={15} />
                </button>

                {getPageNumbers().map((page, idx) => {
                  if (page === '...') {
                    return (
                      <span key={`dots-${idx}`} className="w-6 text-center text-xs text-slate-400 dark:text-slate-500 font-bold select-none">
                        ...
                      </span>
                    );
                  }
                  const isCurrent = currentPage === page;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#009ab1] text-white shadow-md shadow-blue-500/30 scale-105'
                          : 'bg-white dark:bg-slate-900 hover:bg-blue-50/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
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
                  className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#009ab1] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition cursor-pointer shadow-2xs"
                  title="Next Page"
                  aria-label="Next Page"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            )}

          </div>

          {/* Right Sidebar Column (4 cols): Key Updates at a Glance (Glassmorphism) */}
          <div className="lg:col-span-4 space-y-6 relative">

            {/* Ambient Glassmorphic Color Backdrops that diffuse through the frosted glass */}
            <div className="absolute -top-12 -right-12 w-80 h-80 bg-gradient-to-br from-blue-400/25 via-sky-300/20 to-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-gradient-to-tr from-sky-400/20 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            {/* CARD: KEY UPDATES AT A GLANCE (Ultra-Refined Glassmorphism) */}
            <div className="relative overflow-hidden rounded-[2.8rem] bg-gradient-to-b from-white/75 via-white/55 to-white/65 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-950/70 backdrop-blur-2xl border border-white/90 dark:border-white/10 p-6 sm:p-7 shadow-[0_30px_70px_rgba(37,99,235,0.09),inset_0_1.5px_2px_rgba(255,255,255,1),inset_0_-1px_1.5px_rgba(255,255,255,0.4)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] space-y-6">

              {/* Glossy Diagonal Specular Light Sheen */}
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-white/60 via-white/15 to-transparent rounded-full blur-2xl pointer-events-none z-0" />

              {/* Glowing 3D Glass Newspaper Graphic in Top Right (matching picture) */}
              <div className="absolute -top-4 -right-4 w-56 h-56 pointer-events-none select-none z-0">
                <div className="absolute inset-0 bg-blue-400/25 dark:bg-blue-600/20 rounded-full blur-2xl transform scale-90" />
                <svg className="w-full h-full drop-shadow-[0_16px_32px_rgba(37,99,235,0.22)]" viewBox="0 0 200 200" fill="none">
                  <defs>
                    <linearGradient id="doc-glass-sheet" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="0.5" stopColor="#f0f7ff" stopOpacity="0.68" />
                      <stop offset="1" stopColor="#dbeafe" stopOpacity="0.48" />
                    </linearGradient>
                    <linearGradient id="doc-specular" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                      <stop offset="40%" stopColor="#ffffff" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="orbit-ring-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#60a5fa" stopOpacity="0.95" />
                      <stop offset="0.5" stopColor="#3b82f6" strokeOpacity="0.6" />
                      <stop offset="1" stopColor="#93c5fd" stopOpacity="0.25" />
                    </linearGradient>
                    <radialGradient id="blue-bead-1" cx="30%" cy="30%" r="70%">
                      <stop stopColor="#93c5fd" />
                      <stop offset="0.4" stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#1d4ed8" />
                    </radialGradient>
                    <radialGradient id="blue-bead-2" cx="35%" cy="35%" r="65%">
                      <stop stopColor="#bfdbfe" />
                      <stop offset="0.4" stopColor="#60a5fa" />
                      <stop offset="1" stopColor="#2563eb" />
                    </radialGradient>
                    <radialGradient id="glass-orb-float" cx="35%" cy="30%" r="70%">
                      <stop stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="0.3" stopColor="#bfdbfe" stopOpacity="0.6" />
                      <stop offset="0.75" stopColor="#60a5fa" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#2563eb" stopOpacity="0.5" />
                    </radialGradient>
                  </defs>

                  {/* Delicate Wave Lines in Background */}
                  <path d="M 110 0 C 135 35, 170 45, 200 25" stroke="#bfdbfe" strokeWidth="1" strokeOpacity="0.4" fill="none" />
                  <path d="M 130 0 C 150 45, 180 55, 200 40" stroke="#93c5fd" strokeWidth="1" strokeOpacity="0.35" fill="none" />
                  <path d="M 150 0 C 168 55, 190 65, 200 55" stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />

                  {/* Back orbital ring section (behind document) */}
                  <ellipse cx="120" cy="95" rx="64" ry="50" stroke="url(#orbit-ring-grad)" strokeWidth="2.2" transform="rotate(-16 120 95)" strokeDasharray="185 85" />

                  {/* Back layered sheet */}
                  <rect x="96" y="28" width="62" height="82" rx="14" fill="#ffffff" fillOpacity="0.45" stroke="#93c5fd" strokeWidth="1.5" transform="rotate(16 96 28)" />

                  {/* Main 3D Frosted Glass Document Sheet */}
                  <g transform="rotate(9 88 34)">
                    <rect x="76" y="32" width="68" height="90" rx="16" fill="url(#doc-glass-sheet)" stroke="#ffffff" strokeWidth="2.5" />
                    {/* Diagonal Specular Sheen across sheet */}
                    <path d="M 76 32 L 120 32 L 76 96 Z" fill="url(#doc-specular)" pointerEvents="none" />
                    {/* Top Left Blue Photo Block */}
                    <rect x="86" y="44" width="28" height="23" rx="6" fill="#3b82f6" fillOpacity="0.9" />
                    {/* Top Right Header Bars */}
                    <rect x="120" y="46" width="16" height="4" rx="2" fill="#93c5fd" />
                    <rect x="120" y="54" width="16" height="4" rx="2" fill="#cbd5e1" />
                    <rect x="120" y="62" width="12" height="3" rx="1.5" fill="#e2e8f0" />
                    {/* Body Skeleton Bars */}
                    <rect x="86" y="75" width="48" height="4" rx="2" fill="#3b82f6" fillOpacity="0.65" />
                    <rect x="86" y="83" width="48" height="4" rx="2" fill="#94a3b8" />
                    <rect x="86" y="91" width="48" height="4" rx="2" fill="#cbd5e1" />
                    <rect x="86" y="99" width="34" height="4" rx="2" fill="#e2e8f0" />
                  </g>

                  {/* Front orbital ring curve passing in front of document */}
                  <path d="M 68 118 C 86 146, 154 148, 178 106" stroke="#38bdf8" strokeWidth="2.4" strokeLinecap="round" />

                  {/* 3D Glass Orbs & Beads on Orbit */}
                  <circle cx="168" cy="65" r="6.5" fill="url(#blue-bead-1)" />
                  <circle cx="166" cy="63" r="1.6" fill="#ffffff" />

                  <circle cx="162" cy="116" r="5" fill="url(#blue-bead-2)" />
                  <circle cx="160.5" cy="114.5" r="1.2" fill="#ffffff" />

                  {/* Big floating translucent glass orb on far right */}
                  <circle cx="174" cy="136" r="16" fill="url(#glass-orb-float)" stroke="#ffffff" strokeWidth="1.2" />
                  <circle cx="169" cy="131" r="4" fill="#ffffff" fillOpacity="0.8" />
                </svg>
              </div>

              {/* Sidebar Header */}
              <div className="space-y-2.5 relative z-10 pr-14">
                <div className="inline-flex items-center gap-2">
                  <Activity size={18} strokeWidth={2.4} className="text-[#009ab1] dark:text-sky-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] dark:bg-sky-400" />
                  <span className="text-[11px] font-bold tracking-[0.22em] text-[#009ab1] dark:text-sky-400 uppercase">
                    NEWS AT A GLANCE
                  </span>
                </div>
                <h3 className="text-3xl sm:text-[36px] font-serif font-bold text-slate-900 dark:text-white leading-[1.12] tracking-tight">
                  Key Updates<br />
                  <span className="font-serif italic font-normal text-[#009ab1] dark:text-sky-400">at a Glance.</span>
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-[270px]">
                  Explore the latest stories, milestones and announcements from LEnSE.
                </p>
              </div>

              {/* 6 Stat Rows with High-Gloss Glassmorphic Pills */}
              <div className="space-y-3 relative z-10">
                {glanceStats.map((stat, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategory(stat.category)}
                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-[1.4rem] bg-white/55 dark:bg-slate-800/40 backdrop-blur-xl border border-white/85 dark:border-white/10 shadow-[0_8px_24px_rgba(180,215,255,0.32),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.3)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/80 dark:hover:bg-slate-800/70 hover:shadow-[0_12px_30px_rgba(37,99,235,0.18),inset_0_2px_3px_#fff] hover:scale-[1.01] transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Ambient pill glass sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-blue-50/20 dark:from-white/5 dark:to-transparent pointer-events-none" />

                    <div className="flex items-center gap-3.5 relative z-10">
                      {/* 3D Liquid Frosted Glass Pebble Bubble */}
                      <div className="w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-[1.15rem] bg-gradient-to-b from-white/95 via-blue-50/70 to-blue-100/50 dark:from-slate-700/80 dark:via-blue-950/60 dark:to-slate-800/80 backdrop-blur-md border border-white/95 dark:border-white/20 shadow-[0_8px_20px_rgba(37,99,235,0.14),inset_0_2px_4px_#fff,inset_0_-2px_4px_rgba(147,197,253,0.4)] flex items-center justify-center text-[#009ab1] dark:text-sky-400 shrink-0 group-hover:scale-105 group-hover:shadow-[0_10px_25px_rgba(37,99,235,0.22)] transition-all duration-300 relative overflow-hidden">
                        {/* Specular glass reflection rim on top-left of pebble */}
                        <div className="absolute top-1 left-1.5 w-4 h-2 bg-white/70 rounded-full blur-[0.5px] pointer-events-none transform -rotate-12" />
                        <stat.icon size={22} strokeWidth={1.9} className="relative z-10" />
                      </div>
                      <div>
                        <h4 className="text-[14.5px] sm:text-[15px] font-serif font-bold text-slate-900 dark:text-white group-hover:text-[#009ab1] dark:group-hover:text-sky-400 transition-colors leading-tight">
                          {stat.label}
                        </h4>
                        <p className="text-[11.5px] sm:text-[12px] text-slate-400 dark:text-slate-500 font-normal leading-tight mt-0.5">
                          {stat.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pr-1 relative z-10">
                      <span className="px-3 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-400/15 backdrop-blur-md text-[#009ab1] dark:text-sky-400 font-bold text-[12.5px] border border-blue-200/70 dark:border-blue-400/30 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] min-w-[28px]">
                        {stat.count}
                      </span>
                      <ChevronRight size={15} strokeWidth={2.4} className="text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Dual-Capsule CTA Dock with Glossy Glass Finish */}
              <div className="pt-2 flex items-center gap-3 relative z-10">
                {/* Left: View All News Pill Button with Wave Art */}
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="flex-1 h-13 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#008296] via-[#009ab1] to-[#38bdf8] hover:from-[#0047c4] hover:to-[#0ea5e9] text-white font-medium text-[14px] shadow-[0_14px_32px_rgba(26,109,255,0.38),inset_0_1.5px_2px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 group transition-all duration-300 relative overflow-hidden cursor-pointer active:scale-[0.98]"
                >
                  {/* Glass top reflection */}
                  <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 200 50" preserveAspectRatio="none">
                    <path d="M0 35 C 50 15, 150 45, 200 25" stroke="#ffffff" strokeWidth="1.5" fill="none" />
                    <path d="M0 45 C 70 25, 130 40, 200 30" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" fill="none" />
                  </svg>
                  <span className="relative z-10 font-semibold text-[14px]">View All News</span>
                  <ArrowRight size={15} strokeWidth={2.2} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Right: Circular 3D Blue Glass Button with Arrow */}
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="w-13 h-13 rounded-full bg-gradient-to-br from-[#38bdf8] via-[#009ab1] to-[#008296] hover:scale-105 active:scale-95 text-white flex items-center justify-center shrink-0 shadow-[0_14px_32px_rgba(26,109,255,0.38),inset_0_2px_3px_rgba(255,255,255,0.6)] border border-white/60 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  aria-label="View All News"
                >
                  <span className="absolute top-1 left-2 w-4 h-2 bg-white/60 rounded-full blur-[0.5px] pointer-events-none transform -rotate-12" />
                  <ArrowRight size={18} strokeWidth={2.2} className="relative z-10" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
