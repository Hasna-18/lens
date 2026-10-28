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
const BLUE = 'text-[#1a6dff]';
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

/* Silky ocean streaks background for the hero (exact About page SVG) */
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
        <linearGradient id="ocean-base-initiatives" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf6ff" />
          <stop offset="0.45" stopColor="#4cb8f5" />
          <stop offset="1" stopColor="#1e40af" />
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
      {/* 0. HERO SECTION (Matching About Page Design System) */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden min-h-[calc(100vh-70px)] sm:min-h-screen flex flex-col justify-center py-20 sm:py-24">
        {/* Ocean Waves Background matching About page */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[75%] pointer-events-none select-none">
          <OceanWaves />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/70 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/85 to-transparent pointer-events-none" />

        {/* Left Side Blue Color Design: Ambient Glow, Silk Streaks, Curved Waves & Frosted Glass Orbs */}
        <div className="absolute top-[8%] -left-[12%] w-[48%] h-[72%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/40 via-sky-100/25 to-transparent blur-[90px] rounded-full pointer-events-none" />
        <div className="hidden lg:block absolute -left-[90px] top-[15%] w-[240px] h-[240px] rounded-full bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.3)_0%,rgba(96,165,250,0.18)_45%,transparent_70%)] blur-[8px] pointer-events-none" />

        {/* Left-side subtle oceanic silk streak flow */}
        <div className="hidden lg:block absolute inset-y-0 left-0 w-[42%] pointer-events-none select-none opacity-30 overflow-hidden">
          <svg viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full -scale-x-100" fill="none">
            <g filter="url(#ocean-blur-initiatives)">
              <path d="M -80 100 C 180 20, 360 220, 540 120" stroke="#7dd3fc" strokeWidth={16} opacity={0.35} strokeLinecap="round" />
              <path d="M -60 180 C 200 90, 390 310, 560 200" stroke="#38bdf8" strokeWidth={12} opacity={0.3} strokeLinecap="round" />
              <path d="M -40 270 C 220 170, 420 390, 580 280" stroke="#1d4ed8" strokeWidth={14} opacity={0.25} strokeLinecap="round" />
              <path d="M -20 360 C 240 250, 440 470, 600 360" stroke="#bae6fd" strokeWidth={16} opacity={0.4} strokeLinecap="round" />
            </g>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f4f8ff]/50 to-[#f4f8ff]" />
        </div>

        {/* Sweeping Thin Blue Vector Arcs */}
        <svg className="hidden lg:block absolute -left-8 top-[140px] w-[460px] h-[320px] pointer-events-none z-0 opacity-55" viewBox="0 0 460 320" fill="none">
          <path d="M0 60 C 140 20, 290 150, 440 100" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M0 115 C 160 70, 310 210, 460 150" stroke="#38bdf8" strokeWidth="1" />
          <path d="M0 170 C 180 120, 330 270, 450 210" stroke="#1d4ed8" strokeWidth="0.8" strokeOpacity="0.5" />
        </svg>

        {/* Ambient 3D Glass Orbs on Left Side */}
        <div className="hidden lg:block absolute -left-12 top-[26%] w-24 h-24 rounded-full bg-gradient-to-br from-white/80 via-sky-200/40 to-blue-500/25 backdrop-blur-md border border-white/80 shadow-[0_18px_40px_rgba(37,99,235,0.14),inset_0_2px_6px_#fff] pointer-events-none z-0" />
        <div className="hidden lg:block absolute left-8 top-[68%] w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/35 to-sky-300/20 border border-white/70 shadow-sm pointer-events-none z-0" />

        {/* Decorative Ring + Dots on left edge (matching About page) */}
        <div className="hidden lg:block absolute -left-[270px] top-[22%] w-[320px] h-[320px] rounded-full border border-sky-400/50 pointer-events-none" />
        <div className="hidden lg:block absolute left-[80px] top-[60%] w-2.5 h-2.5 rounded-full bg-[#1a6dff] shadow-[0_0_12px_rgba(26,109,255,0.6)] pointer-events-none" />
        <Dots rows={8} cols={5} className="hidden lg:grid absolute left-3 bottom-16 pointer-events-none" />

        <Wrap className="w-full relative z-10 my-auto">
          <div className="grid lg:grid-cols-12 items-center gap-10 lg:gap-8">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase ${BLUE}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a6dff]" />LEnSE INITIATIVES
                </span>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Home size={12} className="text-[#1a6dff]" />
                  <Link href="/" className="hover:text-[#1a6dff] transition-colors">Home</Link>
                  <span className="text-slate-300">&gt;</span>
                  <span className="text-[#1a6dff]">Initiatives</span>
                </div>
              </div>

              <h1 style={SERIF} className="text-[52px] sm:text-[66px] lg:text-[74px] leading-[1.03] tracking-tight text-slate-900 font-normal">
                Community &amp;<br />
                <Em>State Initiatives.</Em>
              </h1>

              <p className="text-slate-600 text-[15px] sm:text-[16px] leading-[1.8] max-w-[500px]">
                LEnSE operates on an inclusive, socially responsible model through state-wide STEM camps, girls’ empowerment, SIET gifted bootcamps, and global partnerships across Kerala.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <a href="#initiatives-section" className="inline-flex">
                  <span className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 shadow-[0_12px_26px_rgba(10,108,255,0.4)] hover:scale-[1.03] transition">
                    EXPLORE INITIATIVES <ArrowRight size={13} />
                  </span>
                </a>

                <Link href="/contact" className="inline-flex">
                  <span className="px-7 py-3.5 rounded-full bg-white/90 border border-white shadow-[0_10px_24px_rgba(37,99,235,0.12)] text-[#1a6dff] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-[1.03] transition">
                    REQUEST CAMP
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: Floating Glass Card (Matching About Page Estd Card) */}
            <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center lg:justify-end">
              <div className="relative w-[300px] sm:w-[320px] rounded-[1.8rem] p-7 sm:p-8 bg-gradient-to-br from-white/55 via-sky-50/40 to-blue-100/30 backdrop-blur-xl border border-white/80 shadow-[0_25px_60px_rgba(2,60,140,0.22),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition duration-300">
                <span className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-white/90 border border-white text-sky-500 flex items-center justify-center shadow-md">
                  <Sparkles size={17} />
                </span>
                <p className="text-[10px] font-bold tracking-[0.22em] text-slate-600 uppercase mb-1">KEY INITIATIVES</p>
                <p style={SERIF} className="text-6xl sm:text-[68px] text-slate-900 leading-none my-2 font-normal">
                  {initiatives.length > 0 ? `${initiatives.length}+` : '4+'}
                </p>
                <p className="text-[13.5px] text-slate-600 leading-relaxed max-w-[210px] mt-2">
                  State-wide camps, outreach &amp; educational partnerships.
                </p>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <Wrap className="space-y-12 sm:space-y-16 relative z-10">

        {/* ============================================================ */}
        {/* 1. FOUR IMPACT METRICS DOCK (1 Row of 4 Columns) */}
        {/* ============================================================ */}
        <div className={`${GLASS} rounded-[2rem] sm:rounded-[2.4rem] p-3 sm:p-5 shadow-[0_20px_50px_rgba(37,99,235,0.08)]`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-blue-100/70 gap-4 sm:gap-0">
            {[
              { icon: MapPin, title: '41 Districts', desc: 'State-wide coverage\nacross Kerala schools.' },
              { icon: Users, title: '2,000+ Students', desc: 'Hands-on robotics &\nSTEM bootcamps.' },
              { icon: School, title: '500+ Teachers', desc: 'Capacity building &\nlearning engineering.' },
              { icon: Award, title: '100% Impact', desc: 'Social reinvestment for\nrural education.' }
            ].map((ft, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center px-3 py-3 sm:py-4 group transition-all duration-300 rounded-2xl hover:bg-white/60 cursor-default"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a6dff] mb-2.5 group-hover:scale-105 transition-transform shadow-xs">
                  <ft.icon size={20} strokeWidth={1.6} />
                </div>

                <h4 style={SERIF} className="text-[15px] sm:text-[17px] font-normal text-slate-900 mb-1 leading-tight group-hover:text-[#1a6dff] transition-colors">
                  {ft.title}
                </h4>

                <p className="text-[11px] sm:text-[12px] text-slate-500 leading-snug whitespace-pre-line font-normal">
                  {ft.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

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
              className="self-start sm:self-auto px-5 py-2.5 rounded-full bg-white/90 border border-blue-100 text-xs font-bold text-[#1a6dff] hover:bg-blue-50 flex items-center gap-2 transition shadow-sm"
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
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1a6dff] text-[9.5px] font-bold uppercase tracking-wider border border-white shadow-sm">
                      {item.tag || 'OUTREACH'}
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
                    <div className="space-y-1">
                      {item.partner && (
                        <span className="text-[10px] sm:text-[11px] font-bold text-[#1a6dff] uppercase tracking-wider block">
                          Partner: {item.partner}
                        </span>
                      )}
                      <h3 style={SERIF} className="text-2xl sm:text-3xl font-normal text-[#0f1a3a] leading-tight group-hover:text-[#1a6dff] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    {item.outcomes && (
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/80 border border-blue-100 text-xs text-slate-700 flex items-center gap-2.5 shadow-sm">
                        <CheckCircle2 size={16} className="text-[#1a6dff] shrink-0" />
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
                        <MapPin size={13} className="text-[#1a6dff]" />
                        {item.locations || 'Across Kerala'}
                      </span>

                      <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#1a6dff] hover:text-blue-700 transition-colors group/link">
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
                    <ArrowRight size={13} className="text-[#1a6dff]" />
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
