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

export default function InitiativesPage() {
  const [initiatives, setInitiatives] = useState(() => {
    const cached = getFromCache('clese_initiatives_cache');
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return [];
  });
  const [loading, setLoading] = useState(initiatives.length === 0);

  useEffect(() => {
    let isMounted = true;

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
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 selection:bg-[#a2d45e]/30 pt-28 sm:pt-36 relative overflow-hidden transition-colors duration-300">

      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT & IMAGE */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/home/bg.png"
          alt="LEnSE Initiatives & Outreach"
          className="w-full h-full object-cover object-center lg:object-right-top scale-[1.04] transform-gpu transition-transform duration-1000 ease-out"
          onError={(e) => {
            e.currentTarget.src = "/about/about1.png";
          }}
        />

        {/* Soft Organic Fade Masks into the Canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/80 dark:via-[#031008]/85 via-[18%] to-transparent to-[42%] w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/60 dark:via-[#031008]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] to-transparent" />
      </div>

      {/* Ambient background glows (matching About & Home pages) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full animate-pulse duration-1000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dbe9dd]/50 via-[#e4efe3]/30 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eef4ea]/50 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ============================================================ */}
        {/* A. DESKTOP VIEW (VISIBLE ON LARGE SCREENS ONLY) */}
        {/* ============================================================ */}
        <div className="hidden lg:block">

          {/* 1. HERO SECTION */}
          <div className="grid grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] sm:min-h-[560px]">

            {/* Left: Text & CTA */}
            <div className="col-span-12 lg:col-span-6 space-y-6 lg:pr-2 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#0c1f15]/80 backdrop-blur-md border border-[#e8efe9] dark:border-[#1e422c] shadow-sm hover:border-[#1a5e35]/40 transition-colors duration-300">
                <span className="text-[11px] font-bold tracking-[0.22em] text-[#455748] dark:text-[#a2d45e] uppercase">
                  COMMUNITY &amp; OUTREACH
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[4.3rem] font-normal text-[#131f17] dark:text-white leading-[1.05] tracking-tight font-serif">
                Community &amp; State<br />
                <span className="italic text-[#243a29] dark:text-[#a2d45e] font-serif font-normal">Initiatives.</span>
              </h1>

              <p className="text-[#405245] dark:text-slate-300 text-[13.5px] leading-[1.72] max-w-[480px] font-normal">
                LEnSE operates on an inclusive, socially responsible model. Through state-wide STEM camps, ICSSR funded girls’ empowerment, SIET gifted bootcamps, and global partnerships, we create transformative educational opportunities for students and educators across Kerala.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link href="/contact" className="inline-flex group">
                  <button className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(15,35,22,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437] hover:shadow-[0_16px_36px_rgba(15,35,22,0.45)]">
                    <span>Request School Camp</span>
                    <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                      <ArrowRight size={10} className="text-white group-hover:text-[#11261a] group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </button>
                </Link>

                <a href="#initiatives-list" className="inline-flex group">
                  <button className="px-6 py-3.5 rounded-full bg-white/70 hover:bg-white dark:bg-[#0b1c14] dark:hover:bg-[#11261a] backdrop-blur-xl border-[1.5px] border-white dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.04)] text-[#162d1f] dark:text-[#a2d45e] text-[11px] font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer">
                    <span>Explore Programmes</span>
                    <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </button>
                </a>
              </div>
            </div>

            {/* Right: Clean space showing visual with no box on top */}
            <div className="hidden lg:block lg:col-span-6" />

          </div>

          {/* 2. FOUR IMPACT METRICS DOCK */}
          <div className="mt-8 sm:mt-12 p-3 sm:p-4 rounded-[2.8rem] bg-gradient-to-b from-white/50 via-white/30 to-white/20 dark:from-[#0b1c14]/85 dark:via-[#08180f]/80 dark:to-[#040e08]/75 backdrop-blur-3xl border-[1.5px] border-white/90 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),0_25px_60px_-10px_rgba(0,25,12,0.15)] dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.4)] relative z-20 transition-all duration-500">
            <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-95 pointer-events-none" />
            <div className="grid grid-cols-4 divide-x divide-white/70 dark:divide-[#183a27] relative z-10">
              {[
                { icon: MapPin, title: '41 Educational\nDistricts', desc: 'State-wide coverage\nacross Kerala schools.' },
                { icon: Users, title: '2,000+\nStudents Reached', desc: 'Hands-on robotics and\nSTEM bootcamps.' },
                { icon: School, title: '500+\nTeachers Trained', desc: 'Capacity building and\nlearning engineering.' },
                { icon: Award, title: '100% Social\nReinvestment', desc: 'Programme fees channeled\nto rural schools.' }
              ].map((ft, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 sm:p-8 group hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-300 rounded-[2.2rem] relative cursor-pointer hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/25 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_3px_6px_rgba(255,255,255,1),inset_0_-3px_5px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,25,12,0.12)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#112417] dark:text-[#a2d45e] mb-4 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#1a5e35] group-hover:text-white dark:group-hover:bg-[#a2d45e] dark:group-hover:text-[#0b1c14] group-hover:shadow-[inset_0_3px_6px_rgba(255,255,255,1),0_16px_32px_rgba(0,25,12,0.22)] transition-all duration-300">
                    <ft.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-[17px] font-serif font-normal text-[#101e14] dark:text-white mb-2 leading-snug whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                    {ft.title}
                  </h4>
                  <p className="text-[11.5px] text-[#3f5244] dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                    {ft.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. DESKTOP INITIATIVES CARDS LIST */}
          <div id="initiatives-list" className="mt-16 sm:mt-24 lg:mt-32 space-y-8 relative z-20">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#0c1f15]/80 backdrop-blur-md border border-[#e8efe9] dark:border-[#1e422c] shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
                  STATE &amp; NATIONAL IMPACT
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#122016] dark:text-white tracking-tight">
                Key Outreach Initiatives
              </h2>
            </div>

            <div className="space-y-8">
              {loading && initiatives.length === 0 ? (
                <div className="py-16 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full border-[2.5px] border-[#2d5a3c]/20 dark:border-[#a2d45e]/20 border-t-[#2d5a3c] dark:border-t-[#a2d45e] animate-spin flex items-center justify-center">
                    <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                  </div>
                  <span className="text-xs font-semibold text-[#485b4d] dark:text-slate-400 tracking-wide">
                    Loading outreach initiatives...
                  </span>
                </div>
              ) : initiatives.length === 0 ? (
                <div className="p-12 text-center rounded-[2.4rem] bg-white/60 dark:bg-[#0b1c14]/80 backdrop-blur-xl border border-white/80 dark:border-[#183a27]">
                  <p className="text-sm text-[#4d6052] dark:text-slate-400">No initiatives found at this time.</p>
                </div>
              ) : (
                initiatives.map((item) => (
                  <div
                    key={item.id || item.slug}
                    className="rounded-[2.4rem] bg-gradient-to-b from-white/70 via-white/45 to-white/25 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] p-6 sm:p-8 lg:p-10 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_15px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group cursor-pointer"
                  >
                    {/* Left Thumbnail */}
                    <div className="lg:col-span-4 h-64 sm:h-72 rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-[#05110a] relative shadow-sm border border-white/80 dark:border-[#183a27]">
                      <img
                        src={item.img || '/events/workshop.jpg'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
                      />
                      <div className="absolute top-3.5 left-3.5 px-3.5 py-1 rounded-full bg-[#082012]/85 dark:bg-[#05110a]/90 backdrop-blur-md text-[#a2d45e] text-[9.5px] font-bold uppercase tracking-wider border border-white/20 dark:border-[#1e422c]/60 shadow-sm">
                        {item.tag}
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-[#2d5a3c] dark:text-[#a2d45e] uppercase tracking-wider block">
                          Partner: {item.partner}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#14261a] dark:text-white leading-tight group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-[13.5px] text-[#4d6052] dark:text-slate-300 leading-relaxed font-normal">
                        {item.desc}
                      </p>

                      {item.outcomes && (
                        <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#11261a]/80 backdrop-blur-xl border border-white/90 dark:border-[#1e422c] text-xs text-[#334b38] dark:text-[#a2d45e] flex items-center gap-2.5 shadow-sm">
                          <CheckCircle2 size={16} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                          <span className="dark:text-slate-200 font-medium">{item.outcomes}</span>
                        </div>
                      )}

                      {/* Stats Bar */}
                      {item.stats && item.stats.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          {item.stats.map((s, i) => (
                            <div key={i} className="p-3 rounded-2xl bg-white/60 dark:bg-[#08180f] backdrop-blur-xl border border-white/90 dark:border-[#183a27] text-center shadow-sm group-hover:border-[#1a5e35]/30 transition-colors duration-300">
                              <span className="block text-sm font-bold text-[#14261a] dark:text-white">{s.val}</span>
                              <span className="block text-[10px] text-[#637667] dark:text-slate-400 font-medium">{s.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-xs text-[#718476] dark:text-slate-400 flex items-center gap-1.5">
                          <MapPin size={14} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                          {item.locations}
                        </span>

                        <Link href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-[#1b3726] dark:text-[#a2d45e] hover:text-[#2d5a3c] dark:hover:text-[#b8e874] transition-colors group/link">
                          <span>Request Camp at Your School</span>
                          <ArrowRight size={13} className="group-link:translate-x-0.5 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 4. DESKTOP CTA BANNER */}
          <div className="mt-16 sm:mt-24 mb-12 rounded-[2.4rem] bg-gradient-to-b from-white/60 via-white/40 to-white/25 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-3xl border-[1.5px] border-white/95 dark:border-[#183a27] p-7 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:shadow-xl z-20">
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 rounded-[1.8rem] bg-gradient-to-b from-white/95 via-white/60 to-white/30 dark:from-[#183d28] dark:to-[#112c1d] backdrop-blur-xl border border-white dark:border-[#1e422c] shadow-[inset_0_2px_3px_rgba(255,255,255,1),0_6px_14px_rgba(0,20,10,0.08)] flex items-center justify-center text-[#162d1f] dark:text-[#a2d45e] shrink-0">
                <HeartHandshake size={28} strokeWidth={1.5} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#122016] dark:text-white font-normal">
                  Partner with LEnSE for School STEM Camps
                </h3>
                <p className="text-xs sm:text-[13.5px] text-[#4d6052] dark:text-slate-300 max-w-xl leading-relaxed">
                  Are you an educator, district administrator, or school principal? Invite LEnSE to conduct hands-on STEM workshops and activity camps for your students.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0">
              <Link href="/contact" className="inline-flex group">
                <button className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(15,35,22,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]">
                  <span>Request Camp Partnership</span>
                  <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <ArrowRight size={10} className="text-white group-hover:text-[#11261a] group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </button>
              </Link>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* B. MOBILE VIEW (MATCHING EXACT MOCKUP FOR MOBILE) */}
        {/* ============================================================ */}
        <div className="block lg:hidden pb-6">

          {/* 1. Mobile Hero */}
          <div className="pt-2 pb-2 relative">
            <div className="w-full space-y-3 z-10">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e8efe9] dark:border-[#1e422c] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                <span className="text-[10px] font-bold tracking-wider text-[#455748] dark:text-[#a2d45e] uppercase">
                  COMMUNITY &bull; OUTREACH
                </span>
              </div>

              <h1 className="text-[2.2rem] sm:text-[2.6rem] font-normal text-[#112318] dark:text-white leading-[1.08] tracking-tight font-serif">
                Community &amp;<br />
                State <span className="italic text-[#243a29] dark:text-[#a2d45e] font-serif font-normal">Initiatives.</span>
              </h1>

              <p className="text-[#455748] dark:text-slate-300 text-[13px] sm:text-sm leading-relaxed font-normal max-w-lg">
                LEnSE creates an inclusive, socially responsible model through state-wide STEM camps, partnerships, and community building.
              </p>

              <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                <Link href="/contact" className="inline-flex group">
                  <button className="px-5 py-2.5 rounded-full bg-[#1b3726] hover:bg-[#11261a] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg dark:bg-[#124225] dark:hover:bg-[#1a5c34] transition-all duration-300 hover:scale-105 active:scale-95">
                    <span>Request School Camp</span>
                    <ArrowRight size={12} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>

                <a href="#mobile-initiatives-list" className="inline-flex group">
                  <button className="px-4 py-2.5 rounded-full bg-white hover:bg-[#f8faf8] dark:bg-[#0b1c14] dark:hover:bg-[#11261a] border border-[#e2eae4] dark:border-[#183a27] text-[#162d1f] dark:text-[#a2d45e] text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95">
                    <span>Explore Programmes</span>
                    <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* 2. Mobile Four Impact Metrics Dock */}
          <div className="mt-8 p-3.5 sm:p-4 rounded-[2rem] bg-white/95 dark:bg-[#0b1c14]/90 backdrop-blur-2xl border border-white/90 dark:border-[#183a27] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative z-20">
            <div className="grid grid-cols-4 divide-x divide-[#e8efe9] dark:divide-[#183a27] relative z-10">
              {[
                { icon: MapPin, num: '41', label: 'Educational\nDistricts' },
                { icon: Users, num: '2,000+', label: 'Students\nReached' },
                { icon: GraduationCap, num: '500+', label: 'Teachers\nTrained' },
                { icon: Globe, num: '100%', label: 'Social\nReinvestment' }
              ].map((ft, i) => (
                <div key={i} className="flex flex-col items-center text-center px-1 py-1 group cursor-pointer hover:bg-[#eef5f0]/50 dark:hover:bg-white/5 rounded-xl transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#eef4ef] dark:bg-[#11261a] border border-[#dce8de] dark:border-[#1e422c] shadow-sm flex items-center justify-center text-[#174b2b] dark:text-[#a2d45e] mb-2 group-hover:scale-110 transition-transform duration-300">
                    <ft.icon size={16} strokeWidth={1.6} />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#112318] dark:text-white leading-tight mb-0.5">
                    {ft.num}
                  </span>
                  <p className="text-[9px] sm:text-[10px] text-[#556758] dark:text-slate-400 leading-tight whitespace-pre-line font-medium">
                    {ft.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Section Header: Key Outreach Initiatives */}
          <div id="mobile-initiatives-list" className="mt-9 mb-4 flex items-end justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#455748] dark:text-[#a2d45e] tracking-[0.2em] uppercase">
                <span className="w-4 h-[2px] bg-[#1a5e35] dark:bg-[#a2d45e] rounded-full inline-block" />
                <span>STATE &amp; NATIONAL IMPACT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#112318] dark:text-white font-normal leading-tight">
                Key Outreach <span className="italic text-[#243a29] dark:text-[#a2d45e]">Initiatives</span>
              </h2>
            </div>

            <Link href="/initiatives" className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e2eae4] dark:border-[#183a27] shadow-sm text-[11px] font-bold text-[#1b3726] dark:text-[#a2d45e] hover:scale-105 active:scale-95 transition-all">
              <span>View All</span>
              <ArrowRight size={10} />
            </Link>
          </div>

          {/* 4. Mobile Initiatives Cards List */}
          <div className="space-y-4">
            {loading && initiatives.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full border-[2px] border-[#2d5a3c]/20 dark:border-[#a2d45e]/20 border-t-[#2d5a3c] dark:border-t-[#a2d45e] animate-spin flex items-center justify-center">
                  <Leaf size={12} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                </div>
                <span className="text-xs font-semibold text-[#485b4d] dark:text-slate-400 tracking-wide">
                  Loading outreach initiatives...
                </span>
              </div>
            ) : initiatives.length === 0 ? (
              <div className="p-8 text-center rounded-[2rem] bg-white/95 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-[#e8efe9] dark:border-[#183a27]">
                <p className="text-xs text-[#4d6052] dark:text-slate-400">No initiatives found at this time.</p>
              </div>
            ) : (
              initiatives.map((item) => (
                <div
                  key={item.id || item.slug}
                  className="rounded-[2rem] bg-white/95 dark:bg-[#0b1c14]/90 backdrop-blur-2xl border border-white/90 dark:border-[#183a27] p-3.5 sm:p-4 shadow-[0_8px_25px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col"
                >
                  {/* Image Thumbnail */}
                  <div className="w-full h-44 sm:h-48 rounded-[1.4rem] overflow-hidden relative mb-3.5 shadow-sm border border-[#e8efe9] dark:border-[#183a27]">
                    <img
                      src={item.img || '/events/workshop.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
                    />
                    <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#133020]/90 dark:bg-[#081f12]/95 backdrop-blur-md text-[#a2d45e] text-[9px] font-bold uppercase tracking-wider border border-white/20 dark:border-[#1e422c]">
                      {item.mobileTag || item.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-[9.5px] font-bold text-[#354c3a] dark:text-[#a2d45e] uppercase tracking-wider block mb-0.5">
                        PARTNER: {item.mobilePartner || item.partner}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#112318] dark:text-white leading-snug">
                        {item.mobileTitle || item.title}
                      </h3>
                      <p className="text-xs text-[#556758] dark:text-slate-300 leading-relaxed mt-1">
                        {item.mobileDesc || item.desc}
                      </p>
                    </div>

                    {/* 3 Metric Boxes in a row */}
                    {((item.mobileStats && item.mobileStats.length > 0) ? item.mobileStats : (item.stats || [])).length > 0 && (
                      <div className="grid grid-cols-3 gap-2 py-1">
                        {((item.mobileStats && item.mobileStats.length > 0) ? item.mobileStats : (item.stats || [])).map((s, idx) => (
                          <div key={idx} className="p-2 rounded-xl bg-[#f8faf7] dark:bg-[#08180f] border border-[#e8efe9] dark:border-[#183a27] text-center">
                            <span className="block text-xs sm:text-sm font-bold text-[#112318] dark:text-white leading-tight">{s.val}</span>
                            <span className="block text-[9px] sm:text-[10px] text-[#556758] dark:text-slate-400 font-medium leading-tight mt-0.5">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#f0f4f0] dark:border-[#142e1f] text-xs">
                      <span className="text-[11px] text-[#607364] dark:text-slate-400 flex items-center gap-1.5 truncate max-w-[65%]">
                        <MapPin size={12} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                        <span className="truncate">{item.mobileLocations || item.locations}</span>
                      </span>

                      <Link href="/contact" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1b3726] dark:text-[#a2d45e] hover:underline shrink-0">
                        <span>Read more</span>
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 5. Mobile CTA Banner */}
          <div className="mt-8 p-4 sm:p-5 rounded-[2rem] bg-white/95 dark:bg-[#0b1c14]/90 backdrop-blur-2xl border border-white/90 dark:border-[#183a27] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col gap-3.5">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#f4f8f4] dark:bg-[#11261a] border border-[#e0eae2] dark:border-[#1e422c] flex items-center justify-center text-[#1b3726] dark:text-[#a2d45e] shrink-0 mt-0.5">
                <HeartHandshake size={22} strokeWidth={1.6} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-serif font-bold text-[#112318] dark:text-white leading-tight">
                  Partner with LEnSE for School STEM Camps
                </h3>
                <p className="text-[11px] text-[#556758] dark:text-slate-300 leading-relaxed">
                  Are you an educator, administrator, or school principal? Let&apos;s conduct hands-on STEM workshops and activity camps for your students.
                </p>
              </div>
            </div>

            <div className="self-end pt-0.5">
              <Link href="/contact" className="inline-flex group">
                <button className="px-4 py-2.5 rounded-full bg-[#1b3726] hover:bg-[#11261a] text-white text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all">
                  <span>Request Partnership</span>
                  <ArrowRight size={11} className="text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
