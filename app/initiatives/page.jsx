'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Users,
  School,
  Building2,
  FlaskConical,
  ArrowRight,
  CheckCircle2,
  Globe,
  Award,
  Calendar,
  Compass,
  Cpu,
  GraduationCap,
  Layers,
  HeartHandshake,
  Home,
  Sprout,
  Leaf
} from 'lucide-react';
import { getFromCache, fetchWithCache, prefetchEndpoint } from '../../lib/clientCache';
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
        <linearGradient id="ocean-base-initiatives" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f8ff" />
          <stop offset="0.45" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <filter id="ocean-blur-initiatives"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect width="1200" height="600" fill="url(#ocean-base-initiatives)" />
      <g filter="url(#ocean-blur-initiatives)">
        {streaks.map((s, i) => (
          <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} opacity={s.o} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

export default function InitiativesPage() {
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Load from cache synchronously on client mount after hydration
    const cached = getFromCache('clese_initiatives_cache');
    if (cached && Array.isArray(cached) && cached.length > 0) {
      setInitiatives(cached);
      setLoading(false);
    }

    fetchWithCache('/api/initiatives', 'clese_initiatives_cache')
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setInitiatives(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Initiatives fetch notice:', err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    // Prefetch other sections
    prefetchEndpoint('/api/events', 'clese_events_cache');
    prefetchEndpoint('/api/news', 'clese_news_cache');
    prefetchEndpoint('/api/resources', 'clese_resources_cache');

    return () => {
      isMounted = false;
    };
  }, []);

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
            src="https://images.pexels.com/photos/14314638/pexels-photo-14314638.jpeg"
            alt="State & Community STEM Initiatives"
            className="w-full h-full object-cover object-center transition-all duration-300"
          />
          {/* Edge Fading layers to blend smoothly with canvas */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/70 via-[20%] to-transparent to-[70%] w-full h-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/85 via-[35%] to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#f4f8ff] to-transparent pointer-events-none" />
        </div>

        {/* Mobile Background Fallback */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 block lg:hidden opacity-15">
          <img
            src="https://images.pexels.com/photos/14314638/pexels-photo-14314638.jpeg"
            alt="State & Community STEM Initiatives"
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
                <span className="text-[#009ab1] font-bold">Initiatives</span>
              </div>

              {/* Category Pill Tag matching News Page Style */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#009ab1]/25 shadow-[0_4px_16px_rgba(0,154,177,0.08)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#009ab1] uppercase">
                  STATE-WIDE SOCIAL IMPACT &amp; CAMPS
                </span>
              </div>

              {/* Main Headline with Serif Accent & Double Slashes */}
              <h1 style={SERIF} className="text-4xl sm:text-5xl lg:text-[4.1rem] leading-[1.06] tracking-tight font-normal text-slate-900">
                Community &amp;<br />
                <Em>State Initiatives.</Em>
                <span className="font-light text-[#009ab1]/40 not-italic ml-2 text-3xl sm:text-4xl select-none">//</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-[15px] leading-[1.78] max-w-2xl font-normal">
                LEnSE operates on an inclusive, socially responsible model through state-wide STEM camps, girls’ empowerment, SIET gifted bootcamps, and global partnerships across Kerala.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="#initiatives-section"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_26px_rgba(0,154,177,0.32)] hover:scale-[1.03] active:scale-95 cursor-pointer"
                >
                  <span>Explore Initiatives</span>
                  <ArrowRight size={13} />
                </a>

                <Link
                  href="/contact"
                  className="px-7 py-3.5 rounded-full bg-white/90 border border-white hover:border-[#009ab1]/30 shadow-[0_10px_24px_rgba(37,99,235,0.08)] text-[#009ab1] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-[1.03] transition"
                >
                  Request Camp
                </Link>

                <div className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-white/80 border border-blue-100 text-xs font-bold text-slate-700 shadow-2xs">
                  <Sparkles size={14} className="text-[#009ab1]" />
                  <span>{initiatives.length > 0 ? `${initiatives.length}+` : '4+'} Active Programs</span>
                </div>
              </div>

              {/* Clean Inline Meta Info Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-slate-600 font-medium border-t border-[#009ab1]/20 max-w-2xl">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#009ab1]" />
                  <span className="font-bold text-slate-900">14 Districts Covered</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-2">
                  <School size={15} className="text-[#009ab1]" />
                  <span>School &amp; Tribal Outreach</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-2">
                  <HeartHandshake size={15} className="text-[#009ab1]" />
                  <span>100% Social Reinvestment</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 1.5. 4 QUICK PILLARS STRIP (News-Page Style Snapshot)       */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 mb-10 sm:mb-14 relative z-10">
        <div className="rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-xl border border-white p-2 sm:p-2.5 shadow-[0_12px_36px_rgba(0,154,177,0.08)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {[
              { label: 'Coverage', val: '14 Districts of Kerala', icon: MapPin },
              { label: 'Outreach Impact', val: '2,000+ Gifted Students', icon: Users },
              { label: 'Teacher Training', val: '500+ STEM Educators', icon: School },
              { label: 'Equity Focus', val: '100% Free Rural Kits', icon: Award }
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

      <Wrap className="space-y-12 sm:space-y-16 relative z-10">

        {/* ============================================================ */}
        {/* 2. MAIN SECTION: INITIATIVES LIST */}
        {/* ============================================================ */}
        <div id="initiatives-section" className="space-y-6 sm:space-y-8 relative z-20 pt-2 sm:pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-blue-100">
            <div className="space-y-1">
              <SectionTag text="STATE & NATIONAL IMPACT" />
              <h2 style={SERIF} className="text-3xl sm:text-4xl font-normal text-[#0f1a3a] tracking-tight">
                Key Outreach <Em>Initiatives.</Em>
              </h2>
            </div>
            <Link
              href="/contact"
              className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-white/90 border border-blue-100 text-xs font-bold text-[#009ab1] hover:bg-blue-50 flex items-center gap-2 transition shadow-sm"
            >
              <span>Request School Partnership</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {loading && initiatives.length === 0 ? (
              <div className={`${GLASS} rounded-[2rem] p-12 text-center`}>
                <LoadingSpinner message="Loading outreach initiatives..." />
              </div>
            ) : initiatives.length === 0 ? (
              <div className={`${GLASS} p-12 text-center rounded-[2.4rem]`}>
                <p className="text-sm text-slate-500">No initiatives found at this time.</p>
              </div>
            ) : (
              initiatives.map((item) => (
                <div
                  key={item.id || item.slug}
                  className={`${GLASS} rounded-[2.2rem] sm:rounded-[2.6rem] p-5 sm:p-7 lg:p-8 hover:-translate-y-1 transition duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center group`}
                >
                  {/* Left Thumbnail (DB image preserved) */}
                  <div className="lg:col-span-5 h-56 sm:h-64 lg:h-72 rounded-[1.8rem] overflow-hidden bg-slate-100 relative shadow-sm border border-white">
                    <img
                      src={item.img || '/events/workshop.jpg'}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0 block"
                      onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#009ab1] text-[9.5px] font-bold uppercase tracking-wider border border-white shadow-sm">
                      {item.tag || 'OUTREACH'}
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                    <div className="space-y-1">
                      {item.partner && (
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#009ab1] uppercase tracking-wider block">
                          Partner: {item.partner}
                        </span>
                      )}
                      <h3 style={SERIF} className="text-2xl sm:text-3xl font-normal text-[#0f1a3a] leading-tight group-hover:text-[#009ab1] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    {item.outcomes && (
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 border border-blue-100 text-xs text-slate-700 flex items-center gap-2.5 shadow-sm">
                        <CheckCircle2 size={16} className="text-[#009ab1] shrink-0" />
                        <span className="font-medium text-slate-800">{item.outcomes}</span>
                      </div>
                    )}

                    {/* Stats Bar */}
                    {item.stats && item.stats.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                        {item.stats.map((s, i) => (
                          <div key={i} className="p-2.5 sm:p-3 rounded-2xl bg-white/70 border border-white text-center shadow-xs group-hover:border-blue-200 transition-colors">
                            <span style={SERIF} className={`block text-base sm:text-lg font-normal leading-none ${BLUE}`}>{s.val}</span>
                            <span className="block text-[9.5px] sm:text-[10px] text-slate-500 font-medium mt-1">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-blue-100/70">
                      <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                        <MapPin size={13} className="text-[#009ab1]" />
                        {item.locations || 'Across Kerala'}
                      </span>

                      <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#009ab1] hover:text-blue-700 transition-colors group/link">
                        <span>Request Camp at Your School</span>
                        <ArrowRight size={13} className="group-link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM PARTNERSHIP CTA BANNER (Oceanic Design System) */}
        {/* ============================================================ */}
        <div className="pt-4">
          <div className="rounded-[2.4rem] bg-gradient-to-r from-[#041a45] via-[#0a3a9c] to-[#1d5be0] text-white p-7 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(3,21,51,0.32)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
              <path d="M0 240 C300 120 500 320 800 180 C1000 80 1100 160 1200 100 L1200 400 L0 400Z" fill="#38bdf8" opacity="0.4" />
              <path d="M0 80 C240 -20 500 180 800 60 C1000 -20 1100 40 1200 10 L1200 0 L0 0Z" fill="#7dd3fc" opacity="0.3" />
              <circle cx="950" cy="180" r="140" fill="#60a5fa" opacity="0.25" />
            </svg>

            {/* Left Copy */}
            <div className="md:col-span-8 space-y-4 relative z-10">
              <SectionTag text="SCHOOL COLLABORATION" light />
              <h3 style={SERIF} className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.12]">
                Partner with LEnSE for<br />
                <em style={SERIF} className="italic text-sky-300">School STEM Camps.</em>
              </h3>
              <p className="text-sky-100/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Are you an educator, district administrator, or school principal? Invite LEnSE to conduct hands-on STEM workshops and activity bootcamps for your students.
              </p>
              <div className="pt-2">
                <Link href="/contact" className="inline-flex">
                  <span className="px-7 py-3.5 rounded-full bg-white hover:bg-sky-50 text-[#0f1a3a] text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-md hover:scale-105 active:scale-95">
                    <span>Request Camp Partnership</span>
                    <ArrowRight size={13} className="text-[#009ab1]" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Visual Icon Badge */}
            <div className="md:col-span-4 relative z-10 flex justify-center md:justify-end">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center text-sky-300">
                <HeartHandshake size={48} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

      </Wrap>

    </div>
  );
}
