'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Leaf,
  Home,
  Download,
  FileText,
  Search,
  BookOpen,
  Users,
  ArrowRight,
  Sparkles,
  Calendar,
  SlidersHorizontal,
  X,
  Globe,
  Lightbulb,
  Eye,
  CheckCircle2
} from 'lucide-react';
import PublicationCover, { THEME_PRESETS } from '../../components/PublicationCover';
import LoadingSpinner from '../../components/LoadingSpinner';

/* ---------- shared design system matching About & Events ---------- */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const BLUE = 'text-[#009ab1]';
const GLASS =
  'bg-gradient-to-br from-white/80 via-sky-50/60 to-blue-100/40 backdrop-blur-xl border border-white/90 shadow-[0_18px_45px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,1)]';

const Wrap = ({ children, className = '' }) => (
  <div className={`relative max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
);

const Em = ({ children, light = false }) => (
  <em style={SERIF} className={`italic font-normal ${light ? 'text-sky-300' : BLUE}`}>{children}</em>
);

function SectionTag({ text, light = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-sky-300' : 'bg-[#009ab1]'}`} />
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

/* Silky ocean streaks background for the hero */
function OceanWaves() {
  const colors = ['#ffffff', '#7dd3fc', '#0ea5e9', '#1d4ed8', '#bae6fd', '#0369a1'];
  const streaks = Array.from({ length: 40 }, (_, i) => ({
    d: `M -150 ${20 + i * 14} C 250 ${-80 + i * 12}, 650 ${240 - i * 3}, 1350 ${60 + i * 16}`,
    c: colors[(i * 5) % colors.length],
    w: 5 + ((i * 7) % 26),
    o: 0.25 + ((i * 13) % 50) / 100,
  }));
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full pointer-events-none select-none opacity-90" fill="none">
      <defs>
        <linearGradient id="ocean-base-resources" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f8ff" />
          <stop offset="0.45" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <filter id="ocean-blur-resources"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect width="1200" height="600" fill="url(#ocean-base-resources)" />
      <g filter="url(#ocean-blur-resources)">
        {streaks.map((s, i) => (
          <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} opacity={s.o} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

const CATEGORIES = [
  { id: 'All', label: 'All' },
  { id: 'Reports', label: 'Reports' },
  { id: 'Brochures', label: 'Brochures' },
  { id: 'Submissions', label: 'Submissions' },
  { id: 'Courseware', label: 'Courseware' },
  { id: 'Toolkits', label: 'Toolkits' },
  { id: 'Guides', label: 'Guides' }
];

export default function AcademicResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default'); // default, az, za
  const [resourcesList, setResourcesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDynamic() {
      try {
        const res = await fetch('/api/resources');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            const formatted = data.map(d => {
              const catLower = (d.category || '').toLowerCase();
              const themeKey = d.themeColor || d.theme_color || (
                catLower.includes('guide') ? 'cyan' :
                  catLower.includes('toolkit') ? 'amber' :
                    catLower.includes('course') ? 'lime' :
                      catLower.includes('brochure') ? 'crimson' :
                        catLower.includes('submission') ? 'indigo' : 'emerald'
              );
              const themePreset = THEME_PRESETS[themeKey] || THEME_PRESETS.emerald;

              const downloadTarget = d.downloadUrl || d.download_url || '';
              const hasDownload = Boolean(downloadTarget && downloadTarget !== '#' && downloadTarget.trim() !== '');

              return {
                id: d.id,
                category: d.category || 'General',
                badgeStyle: themePreset.badgeStyle,
                type: d.type || 'PDF',
                size: d.size || 'N/A',
                title: d.title || 'Untitled Resource',
                desc: d.desc || '',
                date: d.date || '',
                downloadUrl: downloadTarget || '#',
                status: hasDownload ? 'download' : 'coming_soon',
                coverType: d.coverType || d.cover_type || (
                  catLower.includes('guide') ? 'guide' :
                    catLower.includes('toolkit') ? 'toolkit' :
                      catLower.includes('course') ? 'courseware' :
                        catLower.includes('brochure') ? 'brochure' :
                          catLower.includes('submission') ? 'submission' : 'report'
                ),
                themeColor: themeKey,
                customBadge: d.customBadge || d.custom_badge || '',
                coverImage: d.coverImage || d.cover_image || '/campus_building.jpg',
                coverTitle: d.coverTitle || d.cover_title || '',
                coverSubtitle: d.coverSubtitle || d.cover_subtitle || '',
                coverDate: d.coverDate || d.cover_date || ''
              };
            });
            setResourcesList(formatted);
          }
        }
      } catch (e) {
        console.error('Failed to fetch resources:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchDynamic();
    return () => { isMounted = false; };
  }, []);

  // Filter and search logic
  const filteredResources = useMemo(() => {
    return resourcesList.filter((res) => {
      const matchCat = activeCategory === 'All' || res.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch =
        searchQuery.trim() === '' ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortOrder === 'az') return a.title.localeCompare(b.title);
      if (sortOrder === 'za') return b.title.localeCompare(a.title);
      return 0;
    });
  }, [resourcesList, activeCategory, searchQuery, sortOrder]);

  const scrollToCatalog = () => {
    const el = document.getElementById('resources-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-slate-800 font-sans pb-20 sm:pb-28 selection:bg-blue-100 relative overflow-hidden">

      {/* ============================================================ */}
      {/* 0. AMBIENT GLOWS & GEOMETRIC ACCENTS (News Page Style)       */}
      {/* ============================================================ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[55%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009ab1]/15 via-sky-400/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-sky-400/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Decorative ring + dots on the left background edge */}
      <div className="hidden lg:block absolute -left-[220px] top-[14%] w-[340px] h-[340px] rounded-full border border-[#009ab1]/20 pointer-events-none" />
      <div className="hidden lg:block absolute left-[90px] top-[26%] w-2.5 h-2.5 rounded-full bg-[#009ab1]/70 pointer-events-none" />
      <Dots rows={7} cols={5} className="hidden lg:grid absolute left-6 top-[32%]" />

      {/* ============================================================ */}
      {/* 1. HERO SECTION WITH OCEAN WAVES & BLENDED IMAGE             */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden">

        {/* Silky Ocean Streaks Backdrop behind hero */}
        <div
          className="absolute inset-y-0 right-0 w-full lg:w-[68%] pointer-events-none z-0 opacity-40"
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 60%)'
          }}
        >
          <OceanWaves />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/60 to-transparent" />
        </div>

        {/* Natural Environment Blend Container (Full Bleed Right with Ultra-Smooth Feathered Blend) */}
        <div
          className="absolute top-0 right-0 h-full min-h-[520px] lg:h-[620px] xl:h-[670px] w-full lg:w-[68%] xl:w-[64%] pointer-events-none z-0 overflow-hidden select-none hidden lg:block transition-all duration-500"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, rgba(0,0,0,0.03) 24%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.76) 66%, rgba(0,0,0,0.95) 82%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, rgba(0,0,0,0.03) 24%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.76) 66%, rgba(0,0,0,0.95) 82%, black 100%)'
          }}
        >
          <img
            src="https://images.pexels.com/photos/3992949/pexels-photo-3992949.jpeg"
            alt="Academic Resources & Literature"
            className="w-full h-full object-cover object-left-center transition-all duration-300"
            onError={(e) => { e.currentTarget.src = "/campus_building.jpg"; }}
          />
          {/* Edge Fading layers to blend smoothly with canvas */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/70 via-[20%] to-transparent to-[70%] w-full h-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/85 via-[35%] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#f4f8ff] to-transparent pointer-events-none" />
        </div>

        {/* Mobile Background Fallback */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 block lg:hidden opacity-15">
          <img
            src="https://cdn.pixabay.com/photo/2020/05/16/16/43/book-5178205_1280.jpg"
            alt="Academic Resources"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/90 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center min-h-[440px] sm:min-h-[500px]">

            <div className="lg:col-span-7 xl:col-span-6 space-y-6 sm:space-y-7 lg:pr-6 z-10">

              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <span className="w-2 h-2 rounded-full bg-[#009ab1]" />
                <Link href="/" className="hover:text-[#009ab1] transition-colors">Home</Link>
                <span className="text-slate-300">&gt;</span>
                <span className="text-[#009ab1] font-bold">Resources</span>
              </div>

              {/* Category Pill Tag matching News Page Style */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#009ab1]/25 shadow-[0_4px_16px_rgba(0,154,177,0.08)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#009ab1] uppercase">
                  OPEN REPOSITORY &amp; ARCHIVES
                </span>
              </div>

              {/* Main Headline with Serif Accent & Double Slashes */}
              <h1 style={SERIF} className="text-4xl sm:text-5xl lg:text-[4.1rem] leading-[1.06] tracking-tight font-normal text-slate-900">
                Academic Resources &amp;<br />
                <Em>Downloads.</Em>
                <span className="font-light text-[#009ab1]/40 not-italic ml-2 text-3xl sm:text-4xl select-none">//</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-[15px] leading-[1.78] max-w-2xl font-normal">
                Access peer-reviewed toolkits, digital courseware, conference proceedings, STEM learning frameworks, educator handbooks, and institutional reports published by LEnSE.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={scrollToCatalog}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_26px_rgba(0,154,177,0.32)] hover:scale-[1.03] active:scale-95 cursor-pointer"
                >
                  <BookOpen size={14} />
                  <span>Explore Catalog</span>
                  <ArrowRight size={13} />
                </button>

                <div className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/80 border border-blue-100 text-xs font-bold text-slate-700 shadow-2xs">
                  <FileText size={14} className="text-[#009ab1]" />
                  <span>{resourcesList.length > 0 ? `${resourcesList.length}+` : '12+'} Publications</span>
                </div>
              </div>

              {/* Clean Inline Meta Info Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-slate-600 font-medium border-t border-[#009ab1]/20 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Globe size={15} className="text-[#009ab1]" />
                  <span className="font-bold text-slate-900">Open Access</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-[#009ab1]" />
                  <span>Verified PDFs</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-2">
                  <Sparkles size={15} className="text-[#009ab1]" />
                  <span>University of Kerala</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 1.5. 4 QUICK PILLARS STRIP (News-Page Style Snapshot)       */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-10 sm:mb-14">
        <div className="rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border border-white p-2 sm:p-2.5 shadow-[0_12px_36px_rgba(0,154,177,0.08)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {[
              { label: 'Access Type', val: 'Free & Open Public Domain', icon: Globe },
              { label: 'Total Catalog', val: `${resourcesList.length > 0 ? resourcesList.length : '12'}+ Curated Documents`, icon: FileText },
              { label: 'Primary Formats', val: 'Digital PDF & Teaching Toolkits', icon: BookOpen },
              { label: 'Institutional Center', val: 'CLESE / LEnSE Kerala', icon: Sparkles }
            ].map((item, i) => (
              <div key={i} className="p-3 sm:p-3.5 flex items-center gap-3.5 hover:bg-[#f4f8ff] rounded-xl sm:rounded-2xl transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-[#009ab1]/10 border border-[#009ab1]/20 flex items-center justify-center text-[#009ab1] shrink-0 group-hover:bg-[#009ab1] group-hover:text-white transition-all duration-300 shadow-xs">
                  <item.icon size={18} strokeWidth={1.7} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-400 font-bold block">
                    {item.label}
                  </span>
                  <h4 className="text-[13px] font-bold text-slate-800 leading-tight group-hover:text-[#009ab1] transition-colors truncate mt-0.5">
                    {item.val}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Wrap className="space-y-10 sm:space-y-14 relative z-10">

        {/* ============================================================ */}
        {/* 1. SEARCH & CATEGORY FILTER DOCK */}
        {/* ============================================================ */}
        <div id="resources-catalog" className="scroll-mt-28">
          <div className={`${GLASS} rounded-[2rem] sm:rounded-[2.4rem] p-3 sm:p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)]`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 no-scrollbar">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${isActive
                        ? 'bg-[#009ab1] text-white shadow-md scale-105'
                        : 'bg-white/80 border border-blue-100 text-slate-700 hover:bg-blue-50/80 shadow-2xs'
                        }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Search & Sort */}
              <div className="flex items-center gap-2.5 w-full lg:w-auto">
                <div className="relative flex-1 sm:w-80">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search resources..."
                    className="w-full pl-10 pr-8 py-2.5 rounded-full bg-white border border-blue-100 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#009ab1]/30 shadow-xs"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Sorter Button */}
                <button
                  onClick={() => {
                    if (sortOrder === 'default') setSortOrder('az');
                    else if (sortOrder === 'az') setSortOrder('za');
                    else setSortOrder('default');
                  }}
                  className={`p-2.5 rounded-full border border-blue-100 transition-all shadow-xs cursor-pointer ${sortOrder !== 'default'
                    ? 'bg-[#009ab1] text-white'
                    : 'bg-white text-slate-600 hover:bg-blue-50'
                    }`}
                  title={`Sort: ${sortOrder === 'az' ? 'A to Z' : sortOrder === 'za' ? 'Z to A' : 'Default'}`}
                >
                  <SlidersHorizontal size={16} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. DOWNLOADABLE RESOURCES 3-COLUMN GRID */}
        {/* ============================================================ */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-blue-100">
            <div className="space-y-1">
              <SectionTag text="PUBLICATIONS & REPOSITORY" />
              <h2 style={SERIF} className="text-3xl sm:text-4xl font-normal text-[#0f1a3a] tracking-tight">
                Curated <Em>Publications.</Em>
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Showing {filteredResources.length} {filteredResources.length === 1 ? 'material' : 'materials'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full py-16">
                <LoadingSpinner message="Fetching academic resources..." />
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-blue-100 p-8 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 text-[#009ab1] flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <BookOpen size={22} />
                </div>
                <h4 style={SERIF} className="text-xl font-normal text-slate-900 mb-1">No resources found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  No materials matched your search &quot;{searchQuery}&quot;. Try clearing filters or searching for another keyword.
                </p>
                <button
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className="px-5 py-2.5 rounded-full bg-[#009ab1] text-white text-xs font-bold uppercase tracking-wider hover:scale-105 transition shadow-sm cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredResources.map((res) => (
                <div
                  key={res.id}
                  className={`${GLASS} rounded-[2rem] p-4 sm:p-5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
                >
                  {/* Card Content Split */}
                  <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-stretch relative z-10">
                    {/* Left Column: Publication Cover from Component */}
                    <div className="col-span-4 flex items-center justify-center">
                      <div className="w-full max-w-[115px] sm:max-w-[125px] aspect-[1/1.38] rounded-xl overflow-hidden shadow-sm">
                        <PublicationCover
                          type={res.coverType}
                          theme={res.themeColor}
                          title={res.title}
                          coverTitle={res.coverTitle}
                          coverSubtitle={res.coverSubtitle}
                          date={res.date}
                          coverDate={res.coverDate}
                          customBadge={res.customBadge}
                          coverImage={res.coverImage}
                        />
                      </div>
                    </div>

                    {/* Right Column: Meta & Description */}
                    <div className="col-span-8 flex flex-col justify-between space-y-1.5">
                      <div>
                        {/* Category Badge & Meta */}
                        <div className="flex items-center justify-between gap-1 flex-wrap mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-[#009ab1] border border-blue-100">
                            {res.category}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">
                            {res.type} • {res.size}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={SERIF} className="text-[16px] sm:text-[17px] font-normal text-slate-900 group-hover:text-[#009ab1] transition-colors leading-snug line-clamp-2">
                          {res.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-[11px] sm:text-[11.5px] text-slate-500 leading-relaxed font-normal line-clamp-3 mt-1.5">
                          {res.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Date & Buttons */}
                  <div className="pt-3 mt-3 border-t border-blue-100/70 flex items-center justify-between relative z-10 gap-2">
                    <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 font-medium shrink-0">
                      <Calendar size={12} className="text-[#009ab1]" />
                      <span>{res.date}</span>
                    </div>

                    {res.status === 'download' ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`/api/resources/download?id=${res.id}&mode=preview`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-full bg-white border border-blue-100 text-[#009ab1] hover:bg-blue-50 text-[11px] font-bold flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
                          title={`Preview ${res.title} in browser`}
                        >
                          <Eye size={12} />
                          <span>Preview</span>
                        </a>

                        <a
                          href={`/api/resources/download?id=${res.id}&mode=download`}
                          download
                          className="px-3.5 py-1.5 rounded-full bg-[#009ab1] hover:bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1.5 transition shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                          title={`Download ${res.title}`}
                        >
                          <Download size={11} />
                          <span>Download</span>
                        </a>
                      </div>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-400 text-[10.5px] font-medium flex items-center gap-1 opacity-90 select-none">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM VALUE BANNER (Oceanic Design System) */}
        {/* ============================================================ */}
        <div className="pt-2">
          <div className="rounded-[2.4rem] bg-gradient-to-r from-[#041a45] via-[#0a3a9c] to-[#1d5be0] text-white p-7 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(3,21,51,0.32)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
              <path d="M0 240 C300 120 500 320 800 180 C1000 80 1100 160 1200 100 L1200 400 L0 400Z" fill="#38bdf8" opacity="0.4" />
              <path d="M0 80 C240 -20 500 180 800 60 C1000 -20 1100 40 1200 10 L1200 0 L0 0Z" fill="#7dd3fc" opacity="0.3" />
              <circle cx="950" cy="180" r="140" fill="#60a5fa" opacity="0.25" />
            </svg>

            {/* Left Copy Quote */}
            <div className="md:col-span-6 space-y-3 relative z-10">
              <SectionTag text="KNOWLEDGE FOR TOMORROW" light />
              <h2 style={SERIF} className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-snug">
                “Knowledge shared today<br />
                <em style={SERIF} className="italic text-sky-300">builds a more equitable and sustainable tomorrow.”</em>
              </h2>
            </div>

            {/* Right 4 Value Pillars */}
            <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
              {[
                { title: 'Open Access', desc: 'for everyone', icon: BookOpen },
                { title: 'Stronger', desc: 'Communities', icon: Users },
                { title: 'Innovative', desc: 'Education', icon: Lightbulb },
                { title: 'Sustainable', desc: 'Impact', icon: Globe }
              ].map((item, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center flex flex-col items-center justify-center hover:bg-white/15 transition">
                  <div className="w-9 h-9 rounded-full bg-white/20 text-sky-300 flex items-center justify-center mb-2 shadow-xs">
                    <item.icon size={17} strokeWidth={1.6} />
                  </div>
                  <span className="text-xs font-bold text-white block leading-tight">{item.title}</span>
                  <span className="text-[10.5px] text-sky-200/80 block mt-0.5">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </Wrap>



    </div>
  );
}
