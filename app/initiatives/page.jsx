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
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-20 sm:pb-24 selection:bg-[#a2d45e]/30 pt-24 sm:pt-28 relative overflow-hidden transition-colors duration-300">

      {/* ============================================================ */}
      {/* 0. HERO BACKGROUND ART (Continuous Organic Canvas Blend) */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-[55%] sm:w-[65%] lg:w-[68%] xl:w-[62%] h-[380px] sm:h-[650px] lg:h-[840px] pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/home/bg.png"
          alt="LEnSE Initiatives & Outreach"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[78%_25%] sm:object-right-top scale-[1.03]"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.currentTarget.src = "/about/about1.png";
          }}
        />
        {/* Soft Organic Fades into canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/85 dark:via-[#031008]/85 via-[15%] sm:via-[18%] to-transparent to-[55%] w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-48 bg-gradient-to-t from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/70 dark:via-[#031008]/70 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] to-transparent" />
      </div>

      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dbe9dd]/50 via-[#e4efe3]/30 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-12">

        {/* ============================================================ */}
        {/* 1. HERO SECTION (Side-by-side in Mobile & Desktop) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-12 gap-2 sm:gap-6 lg:gap-8 items-center min-h-[220px] sm:min-h-[440px] lg:min-h-[500px] pt-1 sm:pt-4">

          {/* Left: Text & CTA */}
          <div className="col-span-7 sm:col-span-7 lg:col-span-7 space-y-2 sm:space-y-4 z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[#485b4d] dark:text-slate-400">
              <Home size={12} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold">Initiatives</span>
            </div>

            <h1 className="text-[1.7rem] xs:text-[2.1rem] sm:text-[3.2rem] lg:text-[4.2rem] font-normal text-[#131f17] dark:text-white leading-[1.06] tracking-tight font-serif">
              Community &amp;<br />
              <span className="italic text-[#1a5e35] dark:text-[#a2d45e] font-serif font-normal">State Initiatives.</span>
            </h1>

            <p className="text-[#405245] dark:text-slate-300 text-[9.5px] xs:text-[11px] sm:text-[13.5px] leading-[1.45] sm:leading-[1.55] max-w-[440px] font-normal">
              LEnSE operates on an inclusive, socially responsible model through state-wide STEM camps, girls’ empowerment, SIET gifted bootcamps, and global partnerships across Kerala.
            </p>

            <div className="pt-0.5 sm:pt-2 flex items-center gap-2 sm:gap-3 flex-wrap">
              <a
                href="#initiatives-section"
                className="px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-full bg-[#1b3726] hover:bg-[#254d35] text-white text-[10px] sm:text-[12px] font-bold tracking-wide inline-flex items-center gap-1.5 sm:gap-3 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group cursor-pointer dark:bg-[#1b432a] dark:hover:bg-[#245437]"
              >
                <span>Explore All Initiatives</span>
                <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300 sm:w-3.5 sm:h-3.5" />
              </a>
              <Link
                href="/contact"
                className="px-3 sm:px-5 py-2 sm:py-3.5 rounded-full bg-white/80 hover:bg-white dark:bg-[#0b1c14]/80 dark:hover:bg-[#11261a] border border-[#e2eae4] dark:border-[#183a27] text-[#162d1f] dark:text-[#a2d45e] text-[10px] sm:text-[12px] font-bold tracking-wide inline-flex items-center gap-1.5 transition-all duration-300 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Request Camp</span>
              </Link>
            </div>
          </div>

          {/* Right: Floating Glass Badge */}
          <div className="col-span-5 sm:col-span-5 lg:col-span-5 relative flex items-start justify-end pt-1 sm:pt-6">
            <div className="relative w-full max-w-[130px] xs:max-w-[160px] sm:max-w-[220px]">

              {/* Floating Glass Card */}
              <div className="bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-xl p-2.5 xs:p-3 sm:p-5 rounded-2xl sm:rounded-[2rem] border border-white/95 dark:border-[#183a27] shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)] z-20 hover:-translate-y-1 transition-all duration-300 relative w-full">

                {/* Flagship / Sparkles Icon Badge on top right */}
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#132c1e] backdrop-blur-2xl border border-white dark:border-[#1e422c] shadow-sm flex items-center justify-center absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-[#1b3726] dark:text-[#a2d45e] z-30">
                  <Sparkles size={12} strokeWidth={1.75} className="text-[#1b3726] dark:text-[#a2d45e] sm:w-5 sm:h-5" />
                </div>

                <p className="text-[6.5px] xs:text-[7.5px] sm:text-[9.5px] font-bold text-[#455c4a] dark:text-[#a2d45e] uppercase tracking-wider mb-0.5">
                  KEY INITIATIVES
                </p>

                <h3 className="text-xl xs:text-2xl sm:text-4xl font-serif text-[#0f1d13] dark:text-white mb-0.5 tracking-tight font-normal leading-none">
                  {initiatives.length > 0 ? `${initiatives.length}+` : '4+'}
                </h3>

                <p className="text-[6.5px] xs:text-[7.5px] sm:text-[10px] text-[#4a5e4f] dark:text-slate-300 leading-tight font-medium">
                  State-wide camps, outreach &amp; partnerships.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. FOUR IMPACT METRICS DOCK (1 Row of 4 Columns) */}
        {/* ============================================================ */}
        <div className="p-1 sm:p-3.5 rounded-[1.3rem] sm:rounded-[2.6rem] bg-white dark:bg-[#0b1c14] border border-[#e8efe9] dark:border-[#183a27] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.3)] relative z-20">
          <div className="grid grid-cols-4 divide-x divide-[#e8efe9] dark:divide-[#183a27]">
            {[
              { icon: MapPin, title: '41 Districts', desc: 'State-wide coverage\nacross Kerala schools.' },
              { icon: Users, title: '2,000+ Students', desc: 'Hands-on robotics &\nSTEM bootcamps.' },
              { icon: School, title: '500+ Teachers', desc: 'Capacity building &\nlearning engineering.' },
              { icon: Award, title: '100% Impact', desc: 'Social reinvestment for\nrural education.' }
            ].map((ft, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center px-0.5 sm:px-3 py-1 sm:py-3.5 group transition-all duration-300 rounded-xl sm:rounded-2xl hover:bg-[#f0f6ee] dark:hover:bg-[#132c1e] cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-[#f4f8f3] dark:bg-[#11261a] border border-[#e2ede4] dark:border-[#1e422c] shadow-xs flex items-center justify-center text-[#1b3726] dark:text-[#a2d45e] mb-1 sm:mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <ft.icon size={12} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                </div>

                <h4 className="text-[7.5px] xs:text-[8.5px] sm:text-[14px] font-serif font-semibold text-[#101e14] dark:text-white mb-0.5 leading-tight group-hover:text-[#1b3726] dark:group-hover:text-[#a2d45e] transition-colors break-words">
                  {ft.title}
                </h4>

                <p className="text-[5.5px] xs:text-[6.5px] sm:text-[10.5px] text-[#556758] dark:text-slate-400 leading-[1.2] whitespace-pre-line font-medium hidden xs:block">
                  {ft.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MAIN SECTION: INITIATIVES LIST */}
        {/* ============================================================ */}
        <div id="initiatives-section" className="space-y-6 sm:space-y-8 relative z-20 pt-1 sm:pt-6">
          <div className="flex items-center justify-between pb-2 border-b border-[#e8efe9] dark:border-[#183a27]">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-[#455748] dark:text-[#a2d45e] tracking-[0.2em] uppercase">
                <span className="w-4 h-[2px] bg-[#1a5e35] dark:bg-[#a2d45e] rounded-full inline-block" />
                <span>STATE &amp; NATIONAL IMPACT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#112318] dark:text-white font-normal leading-tight">
                Key Outreach <span className="italic text-[#1a5e35] dark:text-[#a2d45e]">Initiatives</span>
              </h2>
            </div>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {loading && initiatives.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3 bg-white/70 dark:bg-[#0b1c14]/80 backdrop-blur-xl rounded-[2rem] border border-[#e8efe9] dark:border-[#183a27]">
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
                  className="rounded-[2.2rem] sm:rounded-[2.4rem] bg-gradient-to-b from-white/90 via-white/70 to-white/40 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] p-4 sm:p-7 lg:p-9 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_15px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center group"
                >
                  {/* Left Thumbnail */}
                  <div className="lg:col-span-4 h-52 sm:h-64 lg:h-72 rounded-[1.6rem] sm:rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-[#05110a] relative shadow-sm border border-white/80 dark:border-[#183a27]">
                    <img
                      src={item.img || '/events/workshop.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
                    />
                    <div className="absolute top-3.5 left-3.5 px-3.5 py-1 rounded-full bg-[#082012]/85 dark:bg-[#05110a]/90 backdrop-blur-md text-[#a2d45e] text-[9.5px] font-bold uppercase tracking-wider border border-white/20 dark:border-[#1e422c]/60 shadow-sm">
                      {item.tag}
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="lg:col-span-8 space-y-3 sm:space-y-4">
                    <div className="space-y-1">
                      {item.partner && (
                        <span className="text-[10.5px] sm:text-[11px] font-bold text-[#2d5a3c] dark:text-[#a2d45e] uppercase tracking-wider block">
                          Partner: {item.partner}
                        </span>
                      )}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold sm:font-normal text-[#14261a] dark:text-white leading-tight group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-[13.5px] text-[#4d6052] dark:text-slate-300 leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    {item.outcomes && (
                      <div className="p-3 sm:p-3.5 rounded-2xl bg-white/70 dark:bg-[#11261a]/80 backdrop-blur-xl border border-white/90 dark:border-[#1e422c] text-xs text-[#334b38] dark:text-[#a2d45e] flex items-center gap-2.5 shadow-sm">
                        <CheckCircle2 size={16} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                        <span className="dark:text-slate-200 font-medium">{item.outcomes}</span>
                      </div>
                    )}

                    {/* Stats Bar */}
                    {item.stats && item.stats.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1">
                        {item.stats.map((s, i) => (
                          <div key={i} className="p-2.5 sm:p-3 rounded-2xl bg-white/60 dark:bg-[#08180f] backdrop-blur-xl border border-white/90 dark:border-[#183a27] text-center shadow-sm group-hover:border-[#1a5e35]/30 transition-colors duration-300">
                            <span className="block text-xs sm:text-sm font-bold text-[#14261a] dark:text-white">{s.val}</span>
                            <span className="block text-[9.5px] sm:text-[10px] text-[#637667] dark:text-slate-400 font-medium">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#f0f4f0] dark:border-[#142e1f]">
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

        {/* ============================================================ */}
        {/* 4. BOTTOM PARTNERSHIP CTA BANNER */}
        {/* ============================================================ */}
        <div className="mt-12 sm:mt-20 mb-8 sm:mb-12 rounded-[2.4rem] bg-gradient-to-b from-white/60 via-white/40 to-white/25 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-3xl border-[1.5px] border-white/95 dark:border-[#183a27] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 hover:shadow-xl z-20">
          <div className="flex items-center gap-4 sm:gap-5 relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-[1.6rem] sm:rounded-[1.8rem] bg-gradient-to-b from-white/95 via-white/60 to-white/30 dark:from-[#183d28] dark:to-[#112c1d] backdrop-blur-xl border border-white dark:border-[#1e422c] shadow-[inset_0_2px_3px_rgba(255,255,255,1),0_6px_14px_rgba(0,20,10,0.08)] flex items-center justify-center text-[#162d1f] dark:text-[#a2d45e] shrink-0">
              <HeartHandshake size={26} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
            </div>
            <div className="space-y-1 sm:space-y-1.5">
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-serif text-[#122016] dark:text-white font-normal">
                Partner with LEnSE for School STEM Camps
              </h3>
              <p className="text-xs sm:text-[13.5px] text-[#4d6052] dark:text-slate-300 max-w-xl leading-relaxed">
                Are you an educator, district administrator, or school principal? Invite LEnSE to conduct hands-on STEM workshops and activity camps for your students.
              </p>
            </div>
          </div>

          <div className="relative z-10 shrink-0 self-end md:self-center">
            <Link
              href="/contact"
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2.5 sm:gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(15,35,22,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437] group"
            >
              <span>Request Camp Partnership</span>
              <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                <ArrowRight size={10} className="text-white group-hover:text-[#11261a] group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
