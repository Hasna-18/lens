'use client';
import React, { useState, useEffect } from 'react';
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
  LayoutGrid
} from 'lucide-react';

import { getFromCache, fetchWithCache, prefetchEndpoint } from '../lib/clientCache';
import { sortEventsLatestFirst } from '../lib/eventUtils';
import LiquidChrome from '../components/LiquidChrome';

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

export default function HomePage() {
  const [upcomingEvents, setUpcomingEvents] = useState(defaultFallbackEvents);

  useEffect(() => {
    let isMounted = true;

    const cached = getFromCache('clese_events_cache');
    if (cached && Array.isArray(cached) && cached.length > 0) {
      setUpcomingEvents(formatEvents(cached));
    }

    fetchWithCache('/api/events', 'clese_events_cache', formatEvents)
      .then((formatted) => {
        if (isMounted && Array.isArray(formatted) && formatted.length > 0) {
          setUpcomingEvents(formatted);
        }
      })
      .catch((err) => {
        console.warn('Home events fetch notice:', err.message);
      });

    prefetchEndpoint('/api/initiatives', 'clese_initiatives_cache');
    prefetchEndpoint('/api/news', 'clese_news_cache');
    prefetchEndpoint('/api/resources', 'clese_resources_cache');

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans selection:bg-[#38bdf8]/30 selection:text-white transition-colors duration-300 relative overflow-x-hidden">

      {/* GLOBAL AMBIENT MESH BACKGROUND FOR GLASS REFRACTION */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-100 dark:opacity-30 dark:mix-blend-screen">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-sky-400/40 dark:bg-sky-300/40 blur-[120px] animate-liquid-float"></div>
        <div className="absolute top-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-blue-500/30 dark:bg-blue-400/30 blur-[120px] animate-liquid-float-rev" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[55%] h-[55%] rounded-full bg-indigo-400/30 dark:bg-indigo-300/30 blur-[130px] animate-liquid-float" style={{ animationDelay: "4s" }}></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-400/40 dark:bg-cyan-300/40 blur-[100px] animate-liquid-float-rev" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO AREA: FULL-VIEWPORT IMMERSIVE SHOWCASE */}
      {/* ========================================================================= */}
      <section
        className="relative w-full min-h-[95vh] sm:min-h-[100dvh] flex flex-col justify-center pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#030a16] dark:bg-[#020610]"
        style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)" }}
      >

        {/* Immersive Interactive Liquid Chrome Background */}
        <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden w-full h-full opacity-90 transition-opacity duration-1000">
          <LiquidChrome
            baseColor={[0.1, 0.42, 0.86]} // Royal Electric Blue / Sapphire Base
            speed={0.3}
            amplitude={0.4}
            interactive={true}
          />
          {/* Subtle dark overlay for better contrast */}
          <div className="absolute inset-0 bg-[#030a16]/30 dark:bg-[#020610]/40 pointer-events-none"></div>
          {/* Subtle vignette overlay to ensure content readability */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] mix-blend-multiply pointer-events-none"></div>
        </div>

        {/* Main Hero Container */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto my-auto py-4 sm:py-6">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 max-w-[720px]">

              {/* Top Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:bg-white/20 transition-all duration-500 cursor-default group">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]"></span>
                </span>
                <span className="text-white text-[12px] sm:text-[13px] font-semibold tracking-[0.1em] uppercase">
                  Learning Today, Sustaining Tomorrow
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[2.8rem] xs:text-[3.5rem] sm:text-[4rem] lg:text-[4.8rem] xl:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight font-serif drop-shadow-lg">
                <span className="block">Empowering</span>
                <span className="block">minds. Building a</span>
                <span className="block">
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#7dd3fc] via-[#38bdf8] to-[#93c5fd] pr-3 filter drop-shadow-[0_0_20px_rgba(56,189,248,0.8)] font-serif">
                    sustainable
                  </span>
                </span>
                <span className="block">future.</span>
              </h1>

              {/* Subtext */}
              <p className="text-blue-50/90 dark:text-slate-200 text-[15px] sm:text-[16.5px] xl:text-[18px] leading-[1.7] max-w-[600px] font-light">
                Advancing innovative, inclusive, and sustainable education with a special focus on hands-on STEM learning. Join us in cultivating curiosity and shaping impactful futures.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-3">
                <Link
                  href="/about"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-[14px] sm:text-[15px] font-semibold tracking-wide flex items-center gap-3 transition-all duration-300 shadow-[0_8px_30px_rgba(2,132,199,0.5)] hover:shadow-[0_12px_40px_rgba(2,132,199,0.7)] hover:-translate-y-1 active:translate-y-0 group"
                >
                  <span>Explore Our Journey</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                <Link
                  href="/events"
                  className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-[14px] sm:text-[15px] font-semibold tracking-wide flex items-center gap-3 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 active:translate-y-0 group"
                >
                  <Calendar size={18} className="text-sky-300 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  <span>Upcoming Events</span>
                </Link>
              </div>

            </div>

            {/* Right Side: Frosted Glass Pillars 2x2 Showcase */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 relative z-20 mt-8 lg:mt-0">
              {[
                { title: 'STEM Education', desc: 'Hands-on learning & scientific inquiry', icon: LayoutGrid },
                { title: 'Sustainability', desc: 'Eco-conscious practices for a greener future', icon: Leaf },
                { title: 'Teacher Empowerment', desc: 'Pedagogical training & mentor support', icon: UserCheck },
                { title: 'Inclusive Learning', desc: 'Equal opportunities for every student', icon: Users }
              ].map((item, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden p-5 sm:p-6 rounded-[1.8rem] liquid-glass-card shadow-[0_8px_32px_rgba(0,0,0,0.25)] group cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/15 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_0_15px_rgba(56,189,248,0.4)] text-white flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all duration-500">
                      <item.icon size={22} strokeWidth={2} />
                    </div>
                    <h4 className="text-[15px] sm:text-[16px] font-bold text-white leading-tight mb-1.5 group-hover:text-sky-300 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[12.5px] sm:text-[13px] text-blue-100/80 dark:text-slate-300 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* MAIN CONTENT SECTIONS CONTAINER - ONE UNIFIED LIQUID GLASS BOX */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-10 2xl:px-12 -mt-16 sm:-mt-24 pb-24">

        {/* Ambient Liquid Light Elements behind the liquid glass container */}
        <div className="absolute -top-20 left-1/4 w-96 sm:w-[520px] h-96 sm:h-[520px] bg-gradient-to-tr from-sky-400/20 via-blue-600/15 to-indigo-500/10 rounded-full blur-[110px] pointer-events-none animate-liquid-float -z-10" />
        <div className="absolute top-1/3 right-10 w-80 sm:w-[460px] h-80 sm:h-[460px] bg-gradient-to-br from-blue-500/15 via-cyan-400/15 to-teal-400/10 rounded-full blur-[110px] pointer-events-none animate-liquid-float-rev -z-10" />
        <div className="absolute bottom-1/4 left-10 w-80 sm:w-[480px] h-80 sm:h-[480px] bg-gradient-to-tr from-indigo-500/15 via-sky-500/15 to-blue-600/10 rounded-full blur-[110px] pointer-events-none animate-liquid-float -z-10" />

        {/* ONE UNIFIED CONTINUOUS LIQUID GLASS CONTAINER */}
        <div className="relative w-full rounded-[2.5rem] sm:rounded-[3.5rem] liquid-glass-container p-4 sm:p-8 lg:p-12 flex flex-col gap-16 sm:gap-20 lg:gap-24">

          {/* ========================================================================= */}
          {/* 2. STATS DOCK */}
          {/* ========================================================================= */}
          <div className="w-full relative mx-auto liquid-glass-dock rounded-[2rem] md:rounded-full py-4 sm:py-5 px-5 sm:px-8 md:px-12 -mt-8 sm:-mt-10 lg:-mt-18">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-0 sm:divide-x divide-slate-200/60 dark:divide-white/10 gap-4 sm:gap-5 md:gap-0">
              {[
                { titleTop: 'Hands-on STEM', titleBottom: 'Learning', desc: 'For students & teachers', icon: GraduationCap },
                { titleTop: '44+', titleBottom: 'Schools Impacted', desc: 'Across Kerala', icon: Users },
                { titleTop: 'Global', titleBottom: 'Collaboration', desc: 'With Clarkson Univ, USA', icon: Globe },
                { titleTop: 'Social', titleBottom: 'Impact', desc: 'Supporting rural learners', icon: Sprout }
              ].map((stat, idx) => (
                <div key={idx} className={`flex items-center gap-3 sm:gap-4 py-2 group cursor-default hover:-translate-y-1 transition-transform duration-300 ${idx === 0 ? 'md:pr-8' : idx === 3 ? 'md:pl-8' : 'md:px-8'}`}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full liquid-glass-icon flex items-center justify-center text-blue-600 dark:text-sky-400 shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 transition-all duration-300">
                    <stat.icon size={20} strokeWidth={1.5} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 group-hover:translate-x-1 transition-transform duration-300">
                    <h4 className="text-[13px] sm:text-[15px] font-bold leading-tight">
                      <span className="block text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">{stat.titleTop}</span>
                      {stat.titleBottom && <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 truncate">{stat.titleBottom}</span>}
                    </h4>
                    <p className="text-[10px] sm:text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-snug whitespace-pre-line hidden xs:block">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. OUR TRUSTED COLLABORATORS - TRANSPARENT MARQUEE (MOVING RIGHT) */}
          {/* ========================================================================= */}
          <div className="w-full relative mx-auto py-2">
            {/* Header Matching Reference Design */}
            <div className="text-center space-y-1.5 mb-8 sm:mb-10">
              <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-[17px] font-normal tracking-tight">
                Backed by global partnerships.
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
                Trusted by educators.
              </h3>
            </div>

            {/* Seamless Transparent Rightward Moving Marquee */}
            <div className="relative w-full overflow-hidden marquee-mask py-3">
              <div className="animate-marquee-right flex items-center gap-8 sm:gap-12 md:gap-16">
                {[
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
                ].concat([
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
                ]).map((collab, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 px-4 sm:px-6 py-2.5 rounded-2xl bg-transparent hover:bg-white/40 dark:hover:bg-white/[0.06] backdrop-blur-md transition-all duration-300 group cursor-default shrink-0"
                  >
                    <div className="text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-sky-400 group-hover:scale-105 transition-all duration-300 drop-shadow-sm">
                      {collab.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className={`text-[15px] sm:text-[17px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-sky-300 transition-colors duration-300 whitespace-nowrap ${collab.isSerif ? 'font-serif' : 'font-sans'}`}>
                        {collab.name}
                      </span>
                      {collab.sub && (
                        <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-wider uppercase whitespace-nowrap">
                          {collab.sub}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. ABOUT LEnSE SECTION */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch pt-4">

            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 text-sm">◀</span>
                  <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 uppercase">
                    ABOUT LEnSE
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-serif text-slate-900 dark:text-white leading-[1.15]">
                  Driving <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 hover:brightness-110 transition-all duration-300">meaningful change</span> through education.
                </h2>

                <p className="text-[14px] sm:text-[15px] text-slate-600 dark:text-slate-300 leading-[1.75] font-normal">
                  Established in 2024, the Centre for Learning Engineering and Sustainability Education (LEnSE) promotes innovative, inclusive and sustainable approaches to education, with a special focus on STEM education.
                </p>

                <p className="text-[14px] sm:text-[15px] text-slate-600 dark:text-slate-300 leading-[1.75] font-normal">
                  We organize seminars, workshops, conferences, training programmes and academic activities that inspire learners, empower educators and strengthen communities.
                </p>
              </div>

              <div className="pt-2">
                <Link href="/about" className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full liquid-glass-pill text-xs sm:text-sm font-bold text-blue-600 dark:text-sky-400 hover:bg-blue-600 hover:text-white dark:hover:bg-sky-500 dark:hover:text-slate-950 transition-all duration-300 group shadow-sm">
                  <span>Learn more about us</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Right Area: Metric Grid + Campus Card */}
            <div className="lg:col-span-7 space-y-5">

              {/* Metric Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                {[
                  { label: 'Established in', value: '2024', icon: Calendar },
                  { label: 'Events Organised', value: '18+', icon: Users },
                  { label: 'Collaborations with', value: '10+', sub: 'Institutions', icon: Landmark },
                  { label: 'Impacting', value: '1000+', sub: 'Learners', icon: Globe }
                ].map((card, i) => (
                  <div key={i} className="p-4 sm:p-5 rounded-2xl sm:rounded-[1.75rem] liquid-glass-card flex flex-col justify-between group cursor-default">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl liquid-glass-icon text-blue-600 dark:text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 transition-all duration-400">
                      <card.icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform duration-400">
                      <span className="block text-[10.5px] sm:text-[11.5px] text-slate-500 dark:text-slate-400 font-semibold leading-tight mb-1">{card.label}</span>
                      <span className="block text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-none group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-400">{card.value}</span>
                      {card.sub && <span className="block text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1.5">{card.sub}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Campus Card */}
              <div className="w-full rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden bg-slate-900 border border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 relative group flex flex-col justify-end min-h-[180px] sm:min-h-[220px]">
                <img
                  src="/campus_building.jpg"
                  alt="LEnSE Modern Campus Architecture"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050e1f]/95 via-[#050e1f]/40 to-transparent group-hover:via-[#050e1f]/30 transition-all duration-500" />

                <div className="relative z-10 p-5 sm:p-8 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h4 className="text-[16px] sm:text-[18px] font-bold text-white group-hover:text-sky-300 transition-colors duration-300">Creating a better tomorrow</h4>
                    <p className="text-[12px] sm:text-[13px] text-blue-100/90 leading-tight font-normal mt-1 max-w-sm">
                      through education, innovation and sustainability.
                    </p>
                  </div>
                  <Link href="/about" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600/90 hover:bg-sky-500 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 backdrop-blur-sm transition-all duration-300">
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* 5. WHAT WE DO SECTION */}
          {/* ========================================================================= */}
          <div className="space-y-6 sm:space-y-8 pt-4">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 uppercase block">
                WHAT WE DO
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white leading-[1.1]">
                Empowering through <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 hover:brightness-110 transition-all duration-300">learning and discovery</span>
              </h2>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: 'Conferences',
                  desc: 'Global conversations on education and innovation.',
                  img: '/events/conferences_showcase.jpg',
                  link: '/events'
                },
                {
                  title: 'Workshops',
                  desc: 'Hands-on learning experiences and skill building.',
                  img: '/events/workshops_showcase.jpg',
                  link: '/events'
                },
                {
                  title: 'Training Programmes',
                  desc: 'Capacity building for educators and learners.',
                  img: '/events/training_showcase.jpg',
                  link: '/events'
                },
                {
                  title: 'STEM Labs',
                  desc: 'Experiential learning through practical exploration.',
                  img: '/events/stem_labs_showcase.jpg',
                  link: '/events'
                }
              ].map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-[2rem] liquid-glass-card flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-full h-36 sm:h-44 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#050b16] shadow-inner relative border border-white/40 dark:border-white/5">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                    <div>
                      <h3 className="text-[15px] sm:text-[17px] font-serif font-semibold text-slate-900 dark:text-white leading-tight mb-1.5 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Link href={item.link} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full liquid-glass-pill text-blue-600 dark:text-sky-400 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 group-hover:scale-110">
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. OUR FOCUS AREAS */}
          {/* ========================================================================= */}
          <div className="space-y-4 sm:space-y-6 pt-2">
            <div className="flex items-center gap-2.5">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 text-sm">◀</span>
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 uppercase">
                OUR FOCUS AREAS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
              {[
                { title: 'STEM\nEducation', icon: Atom },
                { title: 'Digital Learning\n& AI in Education', icon: Monitor },
                { title: 'Sustainability\nEducation', icon: Leaf },
                { title: 'Teacher Capacity\nBuilding', icon: Users },
                { title: 'Research &\nInnovation', icon: Lightbulb },
                { title: 'Equity & Inclusive\nEducation', icon: HeartHandshake }
              ].map((area, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem] liquid-glass-card text-center flex flex-col items-center justify-center min-h-[140px] sm:min-h-[160px] group cursor-default">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl liquid-glass-icon text-blue-600 dark:text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 transition-all duration-400">
                    <area.icon size={22} strokeWidth={1.5} />
                  </div>
                  <span className="text-[12px] sm:text-[13px] font-bold text-slate-800 dark:text-slate-100 whitespace-pre-line leading-snug group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-400">
                    {area.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 7. CREATE PROJECT SHOWCASE BANNER */}
          {/* ========================================================================= */}
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] liquid-glass-dock p-8 sm:p-12 lg:p-14 group transition-all duration-500 mt-2">

            {/* Decorative fluid wave lines in background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.25),transparent_70%)] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

              {/* Left CREATE Brand Logo */}
              <div className="lg:col-span-3 flex items-center justify-center lg:justify-start">
                <div className="p-4 sm:p-5 rounded-2xl sm:rounded-[1.5rem] liquid-glass-card shadow-md group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-700">
                  <img
                    src="/create.png"
                    alt="CREATE Project Logo"
                    className="w-40 sm:w-48 lg:w-56 h-auto object-contain"
                  />
                </div>
              </div>

              {/* Center Content */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase shadow-sm">
                    SPARC II FUNDED
                  </span>
                  <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 uppercase flex items-center gap-1.5 liquid-glass-pill px-3 py-1 rounded-full">
                    <Globe size={14} /> Global Collaboration
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                  CREATE <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500">Project</span>
                </h3>

                <p className="text-[13.5px] sm:text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-lg">
                  CREATE aims to advance climate science research, energy education, and ecological sustainability through international collaboration between Indian and global institutions. A visionary project promoting cross-border innovation and green education.
                </p>

                <div className="pt-3">
                  <a
                    href="https://www.createsparc.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-sky-500 text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-wider inline-flex items-center gap-2.5 transition-all duration-300 shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_25px_rgba(2,132,199,0.6)] hover:-translate-y-1 active:translate-y-0 cursor-pointer group/btn"
                  >
                    <span>Visit CREATE Platform</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                  </a>
                </div>
              </div>

              {/* Right home3.png Visual Graphic */}
              <div className="lg:col-span-4 flex items-center justify-center lg:justify-end relative">
                <img
                  src="/home3.png"
                  alt="CREATE Global Collaboration Architecture & Sphere"
                  className="w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(56,189,248,0.25)] group-hover:scale-105 group-hover:translate-y-[-8px] transition-all duration-700 ease-out"
                />
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* 9. UPCOMING EVENTS */}
          {/* ========================================================================= */}
          <div className="space-y-4 sm:space-y-6 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 text-sm">◀</span>
                <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500 uppercase">
                  UPCOMING EVENTS
                </span>
              </div>

              <Link href="/events" className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-pill text-[12px] sm:text-[13px] font-bold text-blue-600 dark:text-sky-400 hover:bg-blue-600 hover:text-white dark:hover:bg-sky-500 dark:hover:text-slate-950 transition-all duration-300 group shadow-sm">
                <span>View All Events</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {upcomingEvents.slice(0, 4).map((evt, idx) => (
                <Link key={evt.id} href={evt.link} className="block group">
                  <div className="rounded-[1.8rem] sm:rounded-[2rem] liquid-glass-card p-3.5 sm:p-4 space-y-3.5">

                    {/* Image Thumbnail with Date Tag overlay */}
                    <div className="h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#050b16] relative shadow-inner border border-white/40 dark:border-white/5">
                      <img
                        src={evt.img || defaultFallbackEvents[idx % defaultFallbackEvents.length].img}
                        alt={evt.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                        onError={(e) => {
                          e.currentTarget.src = defaultFallbackEvents[idx % defaultFallbackEvents.length].img;
                        }}
                      />
                      {/* Top Left Date Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-[0.85rem] bg-[#061224]/95 backdrop-blur-md text-white border border-sky-500/40 text-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <span className="block text-[15px] sm:text-[17px] font-bold leading-none mb-0.5">{evt.day}</span>
                        <span className="block text-[9px] sm:text-[10px] tracking-widest text-sky-400 uppercase font-semibold">{evt.month}</span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2.5 px-1.5 pb-1.5">
                  

                      <h4 className="text-[14px] sm:text-[16px] font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                        {evt.title}
                      </h4>

                      <div className="space-y-1.5 pt-2 text-[11px] sm:text-[12px] text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-blue-600 dark:text-sky-400 shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-blue-600 dark:text-sky-400 shrink-0" />
                            <span>{evt.duration}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full liquid-glass-pill text-blue-600 dark:text-sky-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-400 dark:group-hover:text-slate-950 transition-all duration-300">
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 10. OUR IMPACT */}
          {/* ========================================================================= */}
          <div className="space-y-4 sm:space-y-6 pt-2">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white">
                Our Impact
              </h3>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent"></div>
            </div>

            <div className="w-full liquid-glass-dock rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 lg:p-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y-0 sm:divide-x divide-slate-200/60 dark:divide-white/10">
                {[
                  { count: '44', label: 'Schools Reached', sub: '(Gifted Students Programme)', icon: School },
                  { count: '500+', label: 'Teachers Empowered', icon: Users },
                  { count: '1000+', label: 'Students', icon: GraduationCap },
                  { count: '1', label: 'Global Academic Collaboration', icon: Globe }
                ].map((stat, idx) => (
                  <div key={idx} className={`flex items-center gap-4 px-2 group cursor-default hover:-translate-y-1 transition-transform duration-300 ${idx === 0 ? '' : 'sm:pl-8'}`}>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl liquid-glass-icon text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 transition-all duration-300">
                      <stat.icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white leading-none mb-1 group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                        {stat.count}
                      </span>
                      <span className="block text-[12px] sm:text-[13px] font-semibold text-slate-700 dark:text-slate-200 leading-tight">
                        {stat.label}
                      </span>
                      {stat.sub && (
                        <span className="block text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{stat.sub}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 11. BUILDING PARTNERSHIPS. DRIVING CHANGE. SHOWCASE */}
          {/* ========================================================================= */}
          <div className="rounded-[2.5rem] sm:rounded-[3rem] liquid-glass-dock p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mt-2">

            {/* Left Showcase Visual */}
            <div className="lg:col-span-4 h-48 sm:h-56 rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-[#050b16] shadow-md relative group cursor-pointer border border-white/50 dark:border-white/5">
              <img
                src="/events/partnerships_showcase.jpg"
                alt="Building Global Educational Partnerships and Driving Change"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
              />
            </div>

            {/* Center Copy */}
            <div className="lg:col-span-4 space-y-4 sm:space-y-5">
              <h3 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-serif text-slate-900 dark:text-white leading-[1.15]">
                Building partnerships.<br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 dark:from-teal-300 dark:via-blue-400 dark:to-indigo-500">Driving change.</span>
              </h3>
              <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-slate-600 dark:text-slate-300 leading-[1.7] max-w-sm">
                We collaborate with institutions, educators and communities to create meaningful learning experiences and a brighter, sustainable future for all.
              </p>
              <div className="pt-2">
                <Link
                  href="/initiatives"
                  className="px-6 sm:px-7 py-3 rounded-full bg-blue-600 hover:bg-sky-500 text-white text-[12px] sm:text-[13px] font-bold uppercase tracking-widest inline-flex items-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0 cursor-pointer group"
                >
                  <span>Our Initiatives</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Right 2 Feature Cards */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-4">
              <div className="p-4 sm:p-5 rounded-[1.5rem] liquid-glass-card flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl liquid-glass-icon text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 transition-all duration-400">
                  <GraduationCap size={20} strokeWidth={1.5} />
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-400">
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-400">STEM Learning Lab</h4>
                  <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">Hands-on, activity-based STEM learning.</p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-[1.5rem] liquid-glass-card flex items-center gap-4 group cursor-default">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl liquid-glass-icon text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950 transition-all duration-400">
                  <Users size={20} strokeWidth={1.5} />
                </div>
                <div className="group-hover:translate-x-1 transition-transform duration-400">
                  <h4 className="text-[14px] sm:text-[15px] font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-400">Scholar Connect</h4>
                  <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">A platform for research exchange and collaboration.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
