'use client';

import React, { useState, useEffect, useId } from 'react';
import Link from 'next/link';
import {
  Calendar, FileText, BookOpen, Mail, ArrowRight, ExternalLink,
  ArrowUp, Minus, Network
} from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const TEAL = '#009ab1';

/* ------------------------------------------------------------------ */
/* Small SVG building blocks                                           */
/* ------------------------------------------------------------------ */

function DotGrid({ className = '' }) {
  return (
    <svg aria-hidden="true" className={`pointer-events-none select-none ${className}`} viewBox="0 0 120 80" fill="none">
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 9 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={10 + c * 12} cy={10 + r * 12} r="1.5" fill={TEAL} />
        ))
      )}
    </svg>
  );
}

function Sparkline({ color = TEAL, d = 'M0 34 C14 34 18 14 34 18 C50 22 54 36 70 28 C86 20 92 8 120 14' }) {
  const rawId = useId();
  const id = 'spark-' + rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg aria-hidden="true" viewBox="0 0 120 44" preserveAspectRatio="none" className="absolute bottom-0 left-0 right-0 w-full h-12 pointer-events-none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".22" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L120 44 L0 44 Z`} fill={`url(#${id})`} />
      <path d={d} stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function BarAccent({ color }) {
  return (
    <div aria-hidden="true" className="absolute bottom-4 right-4 flex items-end gap-1.5 pointer-events-none">
      {[10, 16, 24, 34].map((h, i) => (
        <span key={i} style={{ height: h, background: color, opacity: 0.55 + i * 0.15 }} className="w-2 rounded-[3px]" />
      ))}
    </div>
  );
}

/* Hero: flowing ribbons, mesh lines, and a glass sphere */
function HeroArt() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
      <svg viewBox="0 0 1200 560" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" fill="none">
        <defs>
          <linearGradient id="hr1" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0aa8c0" stopOpacity=".55" />
            <stop offset=".5" stopColor="#38bdf8" stopOpacity=".32" />
            <stop offset="1" stopColor="#009ab1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hr2" x1="0" y1=".3" x2="1" y2=".7">
            <stop offset="0" stopColor="#38bdf8" stopOpacity=".05" />
            <stop offset=".5" stopColor="#009ab1" stopOpacity=".38" />
            <stop offset="1" stopColor="#7dd3fc" stopOpacity=".25" />
          </linearGradient>
          <linearGradient id="hl" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#009ab1" stopOpacity=".55" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity=".1" />
          </linearGradient>
        </defs>
        <path d="M520 -20 C700 140 930 70 1240 300 L1240 580 C960 440 720 560 520 400 C380 290 420 90 520 -20Z" fill="url(#hr1)" />
        <path d="M380 210 C620 330 900 200 1240 440 L1240 540 C930 330 640 470 420 330Z" fill="url(#hr2)" />
        {Array.from({ length: 16 }).map((_, i) => (
          <path
            key={i}
            d={`M ${360 + i * 12} ${130 + i * 12} C ${600 + i * 10} ${260 + i * 7}, ${880 + i * 8} ${170 + i * 10}, ${1200} ${400 + i * 8}`}
            stroke="url(#hl)"
            strokeWidth={i % 2 ? 0.8 : 1.2}
            opacity={0.25 + (i % 5) * 0.1}
          />
        ))}
      </svg>
      <DotGrid className="absolute right-[26%] top-6 w-32 h-20 opacity-40 hidden xl:block" />
      <DotGrid className="absolute right-6 bottom-4 w-28 h-16 opacity-30 hidden md:block" />
      {/* glass sphere */}
      <div
        className="lense-float absolute hidden lg:block w-28 h-28 rounded-full right-[17%] top-[15%]"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, rgba(255,255,255,.95) 0%, rgba(186,236,247,.65) 35%, rgba(56,189,248,.35) 70%, rgba(0,154,177,.25) 100%)',
          boxShadow: '0 18px 40px rgba(0,154,177,.28), inset -8px -10px 22px rgba(0,154,177,.25), inset 6px 6px 14px rgba(255,255,255,.8)'
        }}
      />
    </div>
  );
}

/* Module card illustrations (soft, translucent, top-right) */
function BooksArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 180 110" className="absolute right-4 top-12 w-44 pointer-events-none" fill="none">
      {[{ y: 62, c: '#c7d2fe' }, { y: 44, c: '#bae6fd' }, { y: 26, c: '#a5f3fc' }].map((b, i) => (
        <g key={i} transform={`translate(${i * 8} 0)`}>
          <path d={`M20 ${b.y + 18} L120 ${b.y + 4} L160 ${b.y + 18} L60 ${b.y + 34}Z`} fill={b.c} opacity=".75" />
          <path d={`M20 ${b.y + 18} L20 ${b.y + 26} L60 ${b.y + 42} L60 ${b.y + 34}Z`} fill="#fff" opacity=".7" />
          <path d={`M60 ${b.y + 34} L60 ${b.y + 42} L160 ${b.y + 26} L160 ${b.y + 18}Z`} fill={b.c} opacity=".5" />
        </g>
      ))}
    </svg>
  );
}
function NewsArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 110" className="absolute right-6 top-14 w-40 pointer-events-none" fill="none">
      <g transform="rotate(-12 80 55)">
        <rect x="26" y="20" width="104" height="72" rx="10" fill="#e0f2fe" opacity=".85" />
        <rect x="26" y="20" width="104" height="72" rx="10" stroke="#bae6fd" />
        <text x="40" y="58" fontFamily="Georgia, serif" fontStyle="italic" fontSize="26" fill="#7dd3fc" opacity=".9">NEWS</text>
        <rect x="40" y="68" width="74" height="4" rx="2" fill="#bae6fd" />
        <rect x="40" y="77" width="52" height="4" rx="2" fill="#bae6fd" />
      </g>
    </svg>
  );
}
function LeafArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 120" className="absolute right-0 top-2 w-52 pointer-events-none" fill="none">
      <circle cx="140" cy="62" r="52" fill="#ccfbf1" opacity=".55" />
      <circle cx="140" cy="62" r="52" stroke="#99f6e4" opacity=".7" />
      <path d="M140 100 C140 78 128 66 112 62 C112 82 124 96 140 100Z" fill="#5eead4" opacity=".8" />
      <path d="M140 100 C140 70 154 52 176 48 C178 74 164 94 140 100Z" fill="#2dd4bf" opacity=".75" />
      <path d="M140 100 V70" stroke="#14b8a6" strokeWidth="1.5" opacity=".7" />
      <path d="M40 40 C60 10 96 6 112 34 C84 44 58 52 40 40Z" fill="#a7f3d0" opacity=".6" />
    </svg>
  );
}
function CalendarArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 160 110" className="absolute right-6 top-14 w-40 pointer-events-none" fill="none">
      <g transform="rotate(8 80 55)">
        <rect x="30" y="22" width="96" height="70" rx="12" fill="#e0f2fe" opacity=".75" />
        <rect x="30" y="22" width="96" height="70" rx="12" stroke="#bae6fd" />
        <rect x="30" y="22" width="96" height="18" rx="10" fill="#bae6fd" opacity=".8" />
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x={40 + (i % 4) * 20} y={48 + Math.floor(i / 4) * 14} width="12" height="8" rx="2" fill="#bae6fd" opacity=".85" />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

async function loadList(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    if (data && Array.isArray(data.events)) return data.events;
    if (data && Array.isArray(data.news)) return data.news;
    if (data && Array.isArray(data.resources)) return data.resources;
    if (data && Array.isArray(data.initiatives)) return data.initiatives;
    if (data && Array.isArray(data.enquiries)) return data.enquiries;
    return null;
  } catch {
    return null;
  }
}

/* Items created in the last 30 days (needs createdAt / created_at on the record) */
function summarize(list) {
  if (!list) return null;
  const now = Date.now();
  const recent = list.filter((it) => {
    const raw = it?.createdAt ?? it?.created_at;
    const t = raw ? new Date(raw).getTime() : NaN;
    return Number.isFinite(t) && now - t <= MONTH_MS;
  }).length;
  return { total: list.length, recent };
}

const ENDPOINTS = {
  events: '/api/events',
  news: '/api/news',
  resources: '/api/resources',
  initiatives: '/api/initiatives',
  enquiries: '/api/enquiries'
};

const METRICS = [
  { key: 'events', label: 'Live Events', href: '/admin/events', icon: Calendar, color: '#0ea5e9', tint: 'text-sky-600', unit: 'this month', art: 'wave' },
  { key: 'news', label: 'News & Media', href: '/admin/news', icon: FileText, color: '#4f46e5', tint: 'text-indigo-600', unit: 'new articles', art: 'bars' },
  { key: 'resources', label: 'Resources', href: '/admin/resources', icon: BookOpen, color: '#0ea5e9', tint: 'text-sky-600', unit: 'new files', art: 'wave' },
  { key: 'initiatives', label: 'Key Initiatives', href: '/admin/initiatives', icon: Network, color: TEAL, tint: 'text-[#009ab1]', unit: 'active', art: 'wave' },
  { key: 'enquiries', label: 'Enquiries', href: '/admin/enquiries', icon: Mail, color: '#f59e0b', tint: 'text-amber-600', unit: 'new', art: 'wave' }
];

const WAVES = [
  'M0 34 C14 34 18 14 34 18 C50 22 54 36 70 28 C86 20 92 8 120 14',
  'M0 30 C20 36 30 22 50 26 C70 30 80 12 100 16 C110 18 116 14 120 12',
  'M0 36 C16 30 26 38 44 30 C62 22 72 30 90 20 C102 14 112 18 120 10',
  'M0 32 C18 20 30 34 48 28 C66 22 78 34 96 24 C108 18 114 20 120 16',
  'M0 30 C20 36 34 18 52 22 C70 26 82 38 100 24 C110 16 116 18 120 14'
];

const MODULES = [
  {
    title: 'Events & Conferences', badge: 'SCHEDULE', icon: Calendar, art: CalendarArt,
    accent: 'sky', manage: 'MANAGE', href: '/admin/events', preview: '/events', previewLabel: 'events',
    body: 'Publish international conferences, workshops, faculty development programmes, and STEM camps with speaker images and schedules.'
  },
  {
    title: 'Academic Resources', badge: 'DOWNLOADS', icon: BookOpen, art: BooksArt,
    accent: 'indigo', manage: 'EDIT FILES', href: '/admin/resources', preview: '/resources', previewLabel: 'resources',
    body: 'Edit and upload conference brochures, laboratory toolkits, FYUGP courseware, prompt engineering handbooks, and policy reports.'
  },
  {
    title: 'News & Media', badge: 'MEDIA', icon: FileText, art: NewsArt,
    accent: 'sky', manage: 'MANAGE', href: '/admin/news', preview: '/news', previewLabel: 'news',
    body: 'Post press announcements, institutional MoU updates, media highlights, and academic achievements with photo coverage.'
  },
  {
    title: 'Key Initiatives', badge: 'PROJECTS', icon: Network, art: LeafArt,
    accent: 'teal', manage: 'EDIT INITIATIVES', href: '/admin/initiatives', preview: '/initiatives', previewLabel: 'initiatives',
    body: 'Manage flagship programmes like STEM 4 Girls, collaborative university partnerships, and community learning labs.'
  }
];

const ACCENTS = {
  sky: { iconText: 'text-sky-600', badge: 'bg-white/70 text-sky-700 border-white/90' },
  indigo: { iconText: 'text-indigo-600', badge: 'bg-white/70 text-indigo-700 border-white/90' },
  teal: { iconText: 'text-[#009ab1]', badge: 'bg-white/70 text-[#007f93] border-white/90' }
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({}); // key -> { total, recent } | null (failed) | undefined (loading)

  useEffect(() => {
    let alive = true;
    (async () => {
      const entries = await Promise.all(
        Object.entries(ENDPOINTS).map(async ([key, url]) => [key, summarize(await loadList(url))])
      );
      if (alive) setStats(Object.fromEntries(entries));
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">

      {/* Atmospheric Refraction Lights (shining through frosted glass) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-1/4 w-[480px] h-[480px] rounded-full bg-cyan-300/25 blur-[95px]" />
        <div className="absolute top-1/2 right-12 w-[520px] h-[520px] rounded-full bg-sky-300/20 blur-[105px]" />
        <div className="absolute bottom-10 left-10 w-[420px] h-[420px] rounded-full bg-teal-200/25 blur-[95px]" />
      </div>

      {/* ============ HERO ============ */}
      <section className="glass-panel glass-shine relative rounded-[2.5rem] overflow-hidden min-h-[400px] lg:min-h-[440px] shadow-[0_30px_70px_rgba(0,154,177,0.18)]">
        <HeroArt />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-7 sm:p-10 lg:p-14">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/90 shadow-[0_2px_10px_rgba(0,154,177,0.08),inset_0_1px_0_#fff]">
              <span className="w-2 h-2 rounded-full bg-[#009ab1] shadow-[0_0_8px_#009ab1]" />
              <span className="text-[10.5px] sm:text-[11px] font-bold tracking-[0.2em] text-[#007f93]">
                LEARNING ENGINEERING TODAY, SUSTAINING TOMORROW
              </span>
            </div>

            <h1 style={SERIF} className="text-[44px] sm:text-6xl lg:text-[68px] leading-[1.04] tracking-tight font-normal text-[#0f1a3a] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Empowering minds.
              <br />
              <em className="text-[#009ab1] font-normal">Building a<br />sustainable future.</em>
            </h1>

            <p className="max-w-lg text-[14.5px] sm:text-[15px] leading-relaxed text-slate-700/90 font-medium">
              Advancing innovative, inclusive, and sustainable education with a special focus on hands-on STEM learning. Join us in cultivating curiosity and shaping impactful futures.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Link href="/about" target="_blank"
                className="btn-teal inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-white text-[13px] font-bold transition-all hover:scale-[1.02] active:scale-[0.99] shadow-[0_12px_28px_rgba(0,154,177,0.35),inset_0_1.5px_1px_rgba(255,255,255,0.5)]">
                Explore Our Journey <ArrowRight size={15} />
              </Link>
              <Link href="/events" target="_blank"
                className="glass-ultra glass-ultra-hover inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-[#007f93] text-[13px] font-bold transition-all shadow-[0_8px_20px_rgba(0,154,177,0.12),inset_0_1.5px_1px_#fff]">
                <Calendar size={16} className="text-[#009ab1]" /> Upcoming Events
              </Link>
            </div>
          </div>

          {/* Established card */}
          <div className="lg:col-span-5 flex lg:justify-end lg:pt-20">
            <div className="glass-ultra glass-shine glass-ultra-hover relative w-full max-w-[320px] rounded-[2rem] p-7 sm:p-8 shadow-[0_24px_55px_rgba(0,154,177,0.22)]">
              <span aria-hidden="true"
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_25px_rgba(0,154,177,0.25),inset_0_1.5px_1px_#fff] flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
                  <path d="M20 3 C21.5 13 27 18.5 37 20 C27 21.5 21.5 27 20 37 C18.5 27 13 21.5 3 20 C13 18.5 18.5 13 20 3Z" fill="#009ab1" />
                </svg>
              </span>
              <p className="text-[11px] font-bold tracking-[0.2em] text-slate-500">ESTABLISHED IN</p>
              <p style={SERIF} className="text-6xl text-[#0f1a3a] leading-none mt-2 tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">2024</p>
              <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-[#009ab1] to-[#38bdf8] my-4 shadow-sm" />
              <p className="text-[13px] leading-relaxed text-slate-700/90 font-medium">
                Promoting innovative, inclusive and sustainable education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ METRICS ============ */}
      <section aria-label="Content overview" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
        {METRICS.map((m, i) => {
          const s = stats[m.key];
          const Icon = m.icon;
          const loading = s === undefined;
          const total = loading ? '–' : s ? s.total : '–';
          const recent = s?.recent ?? 0;
          return (
            <Link key={m.key} href={m.href}
              className={`glass-ultra glass-shine glass-sheen glass-ultra-hover group relative overflow-hidden rounded-[2rem] p-5 pb-16 ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <span className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/75 backdrop-blur-xl border border-white/95 shadow-[0_6px_18px_rgba(0,154,177,0.12),inset_0_1.5px_1px_#fff] transition-all duration-300 group-hover:scale-110 group-hover:border-white ${m.tint}`}>
                <Icon size={21} strokeWidth={2} />
              </span>
              <p style={SERIF} className="text-[36px] font-normal leading-none text-[#0f1a3a] mt-4 tracking-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">{total}</p>
              <p className="text-[13px] font-bold text-slate-700 mt-2">{m.label}</p>
              <div className="mt-2.5 inline-flex">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/90 text-[11px] font-bold shadow-[0_2px_6px_rgba(0,154,177,0.06),inset_0_1px_0_#fff] ${recent > 0 ? 'text-[#009ab1]' : 'text-slate-500'}`}>
                  {recent > 0 ? <ArrowUp size={11} strokeWidth={2.5} /> : <Minus size={11} strokeWidth={2.5} />}
                  {loading ? 'Loading…' : recent > 0 ? `+${recent} ${m.unit}` : 'No change'}
                </span>
              </div>
              {m.art === 'bars' ? <BarAccent color={m.color} /> : <Sparkline color={m.color} d={WAVES[i]} />}
            </Link>
          );
        })}
      </section>

      {/* ============ MODULES HEADER ============ */}
      <div className="flex items-center gap-4 pt-4">
        <div className="glass-pill px-4 py-1.5 rounded-full inline-flex items-center gap-2.5 border border-white/90 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#009ab1] shadow-[0_0_10px_rgba(0,154,177,.9)]" />
          <h2 className="text-[12px] font-extrabold tracking-[0.22em] text-[#0f1a3a]">MANAGEMENT MODULES</h2>
        </div>
        <span aria-hidden="true" className="hidden sm:block flex-1 h-px bg-gradient-to-r from-[#009ab1]/40 via-[#009ab1]/20 to-transparent" />
        <span className="text-xs text-slate-500 font-semibold tracking-wide">Quick Access to Core Modules</span>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const Art = mod.art;
          const a = ACCENTS[mod.accent];
          return (
            <article key={mod.title} className="glass-ultra glass-shine glass-sheen glass-ultra-hover group relative overflow-hidden rounded-[2.25rem] p-7 sm:p-9 flex flex-col">
              <Art />
              <div className="relative z-10 flex items-start justify-between">
                <span className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/80 backdrop-blur-xl border border-white/95 shadow-[0_8px_24px_rgba(0,154,177,0.14),inset_0_2px_1.5px_#fff] transition-all duration-300 group-hover:scale-105 group-hover:border-white ${a.iconText}`}>
                  <Icon size={26} strokeWidth={1.8} />
                </span>
                <span className={`px-4 py-1.5 rounded-full border text-[10.5px] font-extrabold tracking-wider backdrop-blur-md shadow-[0_2px_10px_rgba(0,154,177,0.08),inset_0_1px_0_#fff] ${a.badge}`}>
                  {mod.badge}
                </span>
              </div>

              <h3 style={SERIF} className="relative z-10 mt-6 text-[30px] font-normal leading-tight text-[#0f1a3a] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">{mod.title}</h3>
              <p className="relative z-10 mt-3 mb-8 max-w-[34rem] text-[14px] leading-relaxed text-slate-600 font-medium">{mod.body}</p>

              <div className="relative z-10 mt-auto flex items-center gap-3">
                <Link href={mod.href}
                  className="btn-teal flex-1 inline-flex items-center justify-center gap-2.5 py-4 rounded-2xl text-white text-xs font-bold tracking-wider shadow-[0_10px_25px_rgba(0,154,177,0.32),inset_0_1.5px_1px_rgba(255,255,255,0.45)] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
                  {mod.manage} <ArrowRight size={14} />
                </Link>
                <Link href={mod.preview} target="_blank" rel="noopener noreferrer"
                  aria-label={`Open public ${mod.previewLabel} page in a new tab`}
                  title={`Open public ${mod.previewLabel} page`}
                  className="w-13 h-13 px-3.5 py-3.5 shrink-0 rounded-2xl bg-white/75 hover:bg-white/95 backdrop-blur-xl border border-white/90 text-[#0f1a3a] hover:text-[#009ab1] flex items-center justify-center shadow-[0_6px_18px_rgba(0,154,177,0.12),inset_0_1.5px_1px_#fff] transition-all duration-200 hover:scale-105">
                  <ExternalLink size={17} />
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}