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
  FlaskConical,
  Calendar,
  Sparkles,
  Atom,
  Lightbulb,
  Building,
  School,
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  MapPin,
  Clock,
  Compass,
  Monitor,
  HeartHandshake,
  Layers,
  Cpu,
  Tv,
  CheckCircle2,
  Mail,
  Sprout,
  UserCheck
} from 'lucide-react';

import { getFromCache, fetchWithCache, prefetchEndpoint } from '../lib/clientCache';

function formatEvents(data) {
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    id: item.id,
    day: item.dateDay || item.date_day || item.day || '14',
    month: item.dateMonth || item.date_month || item.month || 'MAR',
    year: item.dateYear || item.date_year || item.year || '2025',
    tag: (item.categoryTag || item.category || item.filterType || 'EVENT').toUpperCase(),
    title: item.title,
    location: item.location || (item.details && item.details.venue) || 'Thiruvananthapuram, Kerala',
    duration: item.duration || (item.details && item.details.time) || '2 Days Event',
    img: item.imageUrl || item.image_url || item.img || '/events/conference.jpg',
    link: `/events/${item.slug || item.id}`
  }));
}

export default function HomePage() {
  const [currentEventIdx, setCurrentEventIdx] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState(() => {
    const cached = getFromCache('clese_events_cache');
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return formatEvents(cached);
    }
    return [];
  });

  useEffect(() => {
    let isMounted = true;

    fetchWithCache('/api/events', 'clese_events_cache', formatEvents)
      .then((formatted) => {
        if (isMounted && Array.isArray(formatted) && formatted.length > 0) {
          setUpcomingEvents(formatted);
        }
      })
      .catch((err) => {
        console.warn('Home events fetch notice:', err.message);
      });

    // Warm caches for other pages during idle time
    prefetchEndpoint('/api/initiatives', 'clese_initiatives_cache');
    prefetchEndpoint('/api/news', 'clese_news_cache');
    prefetchEndpoint('/api/resources', 'clese_resources_cache');

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-12 pt-20 sm:pt-24 lg:pt-28 relative overflow-hidden flex flex-col justify-between selection:bg-[#a2d45e]/30 transition-colors duration-300">

      {/* Background Decorative Waves */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top left soft yellow-green glow */}
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full animate-pulse duration-1000" />

        {/* Bottom right soft green-blue glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dbe9dd]/50 via-[#e4efe3]/30 to-transparent blur-[120px] rounded-full" />

        {/* Bottom left subtle glow */}
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eef4ea]/50 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10">

        {/* ========================================================================= */}
        {/* 1. HERO AREA: TEXT & OVERLAPPING IMAGE/GLASS PANEL */}
        {/* ========================================================================= */}
        <div className="relative flex items-center min-h-auto lg:min-h-[500px] xl:min-h-[540px] w-full pt-2 sm:pt-0">

          {/* Desktop Background Art Image */}
          <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-[-5%] sm:right-[-2%] md:right-0 w-[120%] sm:w-[100%] lg:w-[70%] xl:w-[65%] z-0 pointer-events-none justify-end">
            <img
              src="/image.png"
              alt="LEnSE Science & Sustainability"
              className="w-full h-auto object-contain object-right transform-gpu hover:scale-[1.02] transition-transform duration-1000 ease-out"
              onError={(e) => {
                e.currentTarget.src = "/events/events_book_plant.jpg";
              }}
            />
          </div>

          {/* Main Hero Content (Grid / Flex) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:flex lg:justify-between lg:items-center relative z-10 items-center">

            {/* Left Hero Content */}
            <div className="md:col-span-7 lg:w-[50%] xl:w-[48%] space-y-4 sm:space-y-6 max-w-[560px]">

              {/* Badge with micro-animation */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-[2rem] bg-white/90 dark:bg-[#0c1f15]/90 backdrop-blur-md border border-[#e8efe9] dark:border-[#1e422c] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-[#1a5e35]/40 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-default group">
                <div className="w-2 h-2 rounded-full bg-[#1b432a] dark:bg-[#a2d45e] group-hover:scale-125 transition-transform duration-300" />
                <span className="text-[#1b432a] dark:text-[#a2d45e] text-[10.5px] sm:text-[12px] font-bold tracking-wide">
                  Learning Today, Sustaining Tomorrow
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-[2.2rem] xs:text-[2.6rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5rem] font-medium text-[#112318] dark:text-white leading-[1.04] tracking-tight font-serif">
                Empowering minds.<br />
                Building a <span className="italic text-[#1a5e35] dark:text-[#a2d45e] hover:brightness-110 transition-all duration-300">sustainable</span><br />
                future.
              </h1>

              {/* Subtext */}
              <p className="text-[#556758] dark:text-slate-300 text-[12px] sm:text-[14px] xl:text-[16px] leading-[1.6] max-w-[480px]">
                Advancing innovative, inclusive and sustainable education with a special focus on STEM. Together, let's create impactful learning experiences and a better tomorrow.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <Link href="/about">
                  <button className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-[#083a20] hover:bg-[#114427] text-white text-[12px] sm:text-[14px] font-semibold tracking-wide flex items-center gap-2 sm:gap-3 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 dark:bg-[#124225] dark:hover:bg-[#1a5c34] group cursor-pointer">
                    <span>Explore Our Journey</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300 sm:w-4 sm:h-4" />
                  </button>
                </Link>

                <Link href="/events">
                  <button className="px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-white hover:bg-[#f8faf8] border border-[#d6e0d8] text-[#0a311b] text-[12px] sm:text-[14px] font-semibold tracking-wide flex items-center gap-2 sm:gap-3 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 dark:bg-[#0c1f15] dark:hover:bg-[#122c1e] dark:border-[#1e422c] dark:text-[#a2d45e] group cursor-pointer">
                    <span>Upcoming Events</span>
                    <Calendar size={14} className="text-[#0a311b] dark:text-[#a2d45e] sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </button>
                </Link>
              </div>

            </div>

            {/* Mobile/Tablet Hero Arched Card */}
            <div className="md:col-span-5 lg:hidden flex justify-center w-full group">
              <div className="w-full max-w-[340px] sm:max-w-[400px] h-[260px] sm:h-[320px] rounded-[2.2rem] overflow-hidden shadow-lg hover:shadow-2xl border border-white/80 dark:border-[#183a27] relative bg-slate-100 dark:bg-[#05110a] transition-all duration-500 hover:scale-[1.02]">
                <img
                  src="/image.png"
                  alt="LEnSE Science & Sustainability"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "/events/events_book_plant.jpg";
                  }}
                />
              </div>
            </div>

            {/* Desktop Right Glass Panel (Overlapping Image) */}
            <div className="hidden lg:flex flex-col gap-5 w-[280px] xl:w-[300px] p-6 rounded-[1.5rem] bg-white/60 dark:bg-[#0b1c14]/70 backdrop-blur-md border border-white/80 dark:border-[#183a27]/60 shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-2xl hover:bg-white/80 dark:hover:bg-[#0b1c14]/90 transition-all duration-300 relative z-20 xl:-translate-x-4">
              {[
                { title: 'STEM Education', desc: 'Hands-on learning\nfor all', icon: Atom },
                { title: 'Sustainability', desc: 'Building a better,\ngreener future', icon: Leaf },
                { title: 'Teacher Empowerment', desc: 'Training and supporting\neducators', icon: UserCheck },
                { title: 'Inclusive Learning', desc: 'Opportunities for every\nlearner', icon: Users }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default p-1 rounded-xl hover:bg-white/50 dark:hover:bg-[#132c1e]/40 transition-all duration-300">
                  <div className="w-[3rem] h-[3rem] rounded-full bg-[#f4f8f4]/90 dark:bg-[#132c1e]/90 text-[#1a4a2c] dark:text-[#a2d45e] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-white/60 dark:border-[#1e422c]/50 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#e4efe2] dark:group-hover:bg-[#1c3f2b] transition-all duration-300">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col group-hover:translate-x-1 transition-transform duration-300">
                    <h4 className="text-[13px] font-bold text-[#14261a] dark:text-white leading-tight group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#556758] dark:text-slate-300 leading-snug mt-0.5 whitespace-pre-line">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. STATS DOCK */}
        {/* ========================================================================= */}
        <div className="w-full relative z-10 mx-auto bg-white dark:bg-[#0b1c14] border border-[#f0f4f1] dark:border-[#183a27] shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-shadow duration-300 rounded-[1.8rem] md:rounded-[3rem] py-3.5 sm:py-5 px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-0 sm:divide-x divide-[#e8efe9] dark:divide-[#183a27] gap-3 sm:gap-4 md:gap-0">
            {[
              { titleTop: 'Hands-on STEM', titleBottom: 'Learning', desc: 'For students & teachers', icon: GraduationCap },
              { titleTop: '44+', titleBottom: 'Schools Impacted', desc: 'Across Kerala', icon: Users },
              { titleTop: 'Global', titleBottom: 'Collaboration', desc: 'With Clarkson University, USA', icon: Globe },
              { titleTop: 'Social Impact', titleBottom: '', desc: 'Supporting rural &\nunderprivileged learners', icon: Sprout }
            ].map((stat, idx) => (
              <div key={idx} className={`flex items-center gap-2.5 sm:gap-4 py-1 sm:py-2 md:py-0 group cursor-default hover:-translate-y-0.5 transition-transform duration-300 ${idx === 0 ? 'md:pr-6' : idx === 3 ? 'md:pl-6' : 'md:px-6'}`}>
                <div className="w-9 h-9 sm:w-[3.25rem] sm:h-[3.25rem] rounded-full bg-[#eef4ef] dark:bg-[#11261a] flex items-center justify-center text-[#174b2b] dark:text-[#a2d45e] shrink-0 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#dce9de] dark:group-hover:bg-[#183d28] transition-all duration-300 shadow-xs">
                  <stat.icon size={16} strokeWidth={1.5} className="sm:w-[22px] sm:h-[22px]" />
                </div>
                <div className="flex flex-col justify-center min-w-0 group-hover:translate-x-0.5 transition-transform duration-300">
                  <h4 className="text-[11px] sm:text-[14px] font-bold leading-tight">
                    <span className="block text-[#14261a] dark:text-white truncate group-hover:text-[#174b2b] dark:group-hover:text-[#a2d45e] transition-colors duration-300">{stat.titleTop}</span>
                    {stat.titleBottom && <span className="block text-[#1a5e35] dark:text-[#a2d45e] truncate">{stat.titleBottom}</span>}
                  </h4>
                  <p className="text-[9px] sm:text-[11px] text-[#556758] dark:text-slate-400 mt-0.5 leading-snug whitespace-pre-line hidden xs:block">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. OUR TRUSTED COLLABORATORS */}
        {/* ========================================================================= */}
        <div className="w-full relative z-10 mx-auto">
          {/* Centered Heading with Line Dividers */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="h-[1px] bg-[#dce6df] dark:bg-[#183a27] flex-1 max-w-[140px] sm:max-w-[200px]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#2c3d31] dark:text-[#a2d45e] uppercase text-center">
              OUR TRUSTED COLLABORATORS
            </span>
            <div className="h-[1px] bg-[#dce6df] dark:bg-[#183a27] flex-1 max-w-[140px] sm:max-w-[200px]" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {[
              {
                name: 'SIET',
                desc: 'Govt. of Kerala',
                icon: Building,
                iconBg: 'bg-[#154628] dark:bg-[#0d3822]',
                iconColor: 'text-white'
              },
              {
                name: 'REFORM',
                desc: 'Advancing Education',
                icon: Leaf,
                iconBg: 'bg-[#eef5f0] dark:bg-[#11261a]',
                iconColor: 'text-[#154628] dark:text-[#a2d45e]'
              },
              {
                name: 'Child Development Centre',
                desc: 'Kazhakkoottam',
                icon: Atom,
                iconBg: 'bg-[#eef5f0] dark:bg-[#11261a]',
                iconColor: 'text-[#154628] dark:text-[#a2d45e]'
              },
              {
                name: 'Clarkson',
                desc: 'University',
                icon: () => <span className="font-serif font-bold text-[16px] sm:text-[20px]">C</span>,
                iconBg: 'bg-[#154628] dark:bg-[#007040]',
                iconColor: 'text-white'
              }
            ].map((collab, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0b1c14] border border-[#f0f4f1] dark:border-[#183a27] rounded-[2rem] sm:rounded-[3rem] py-2 sm:py-3 px-3 sm:px-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg hover:-translate-y-1 hover:border-[#1a5e35]/30 transition-all duration-300 flex items-center gap-2.5 sm:gap-4 group cursor-default">
                <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full ${collab.iconBg} ${collab.iconColor} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs`}>
                  {typeof collab.icon === 'function' ? <collab.icon /> : <collab.icon size={16} strokeWidth={1.5} className="sm:w-5 sm:h-5" />}
                </div>
                <div className="flex flex-col min-w-0 group-hover:translate-x-0.5 transition-transform duration-300">
                  <span className="text-[11px] sm:text-[13px] font-bold text-[#14261a] dark:text-white leading-tight truncate group-hover:text-[#154628] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                    {collab.name}
                  </span>
                  {collab.desc && (
                    <span className="text-[9.5px] sm:text-[11px] text-[#6b7d6e] dark:text-slate-400 mt-0.5 truncate">
                      {collab.desc}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. ABOUT LEnSE SECTION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">

          {/* Left Description */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4 flex flex-col justify-between">
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
                  ABOUT LEnSE
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#122016] dark:text-white leading-snug">
                Driving <span className="italic text-[#243d2c] dark:text-[#a2d45e] hover:brightness-110 transition-all duration-300">meaningful change</span> through education.
              </h2>

              <p className="text-[11.5px] sm:text-xs lg:text-[12.5px] text-[#455749] dark:text-slate-300 leading-relaxed font-normal">
                Established in 2024, the Centre for Learning Engineering and Sustainability Education (LEnSE) promotes innovative, inclusive and sustainable approaches to education, with a special focus on STEM education.
              </p>

              <p className="text-[11.5px] sm:text-xs lg:text-[12.5px] text-[#455749] dark:text-slate-300 leading-relaxed font-normal">
                We organize seminars, workshops, conferences, training programmes and academic activities that inspire learners, empower educators and strengthen communities.
              </p>
            </div>

            <div className="pt-1 sm:pt-2">
              <Link href="/about" className="inline-flex items-center gap-2 text-xs font-bold text-[#1b3726] dark:text-[#a2d45e] hover:text-[#2d5a3c] dark:hover:text-[#b8e874] transition-all duration-300 group">
                <span>Learn more about us</span>
                <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right Area: 2x2 Metric Grid + Wide Campus Card */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* 2x2 Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Established in', value: '2024', icon: Calendar },
                { label: 'Events Organised', value: '18+', icon: Users },
                { label: 'Collaborations with', value: '10+', sub: 'Institutions', icon: Landmark },
                { label: 'Impacting', value: '1000+', sub: 'Learners', icon: Globe }
              ].map((card, i) => (
                <div key={i} className="p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/70 dark:bg-[#0b1c14]/80 backdrop-blur-xl border border-white/90 dark:border-[#183a27] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-xl hover:-translate-y-1.5 hover:border-[#1a5e35]/30 flex flex-col justify-between hover:bg-white dark:hover:bg-[#10271c] transition-all duration-300 group cursor-default">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-115 group-hover:rotate-6 group-hover:bg-[#dce9de] dark:group-hover:bg-[#183d28] transition-all duration-300 shadow-xs">
                    <card.icon size={16} strokeWidth={1.5} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="group-hover:translate-x-0.5 transition-transform duration-300">
                    <span className="block text-[9.5px] sm:text-[10.5px] text-[#556758] dark:text-slate-400 font-medium leading-tight mb-0.5">{card.label}</span>
                    <span className="block text-xl sm:text-2xl font-serif font-bold text-[#122016] dark:text-white leading-none group-hover:text-[#1b432a] dark:group-hover:text-[#a2d45e] transition-colors duration-300">{card.value}</span>
                    {card.sub && <span className="block text-[9px] sm:text-[10px] text-[#556758] dark:text-slate-400 font-medium mt-0.5">{card.sub}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Greenhouse Campus Card with zoom on hover */}
            <div className="w-full rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden bg-slate-900 border border-white/90 dark:border-[#183a27] shadow-md hover:shadow-2xl transition-all duration-500 relative group flex flex-col justify-end min-h-[160px] sm:min-h-[190px]">
              <img
                src="/about/about4.png"
                alt="LEnSE Campus Solar Facility"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.src = "/events/sustainability.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2216]/95 via-[#0d2216]/40 to-transparent group-hover:via-[#0d2216]/30 transition-all duration-500" />

              <div className="relative z-10 p-4 sm:p-6 text-white flex items-center justify-between">
                <div>
                  <h4 className="text-[13px] sm:text-[15px] font-bold text-white group-hover:text-[#a2d45e] transition-colors duration-300">Creating a better tomorrow</h4>
                  <p className="text-[10px] sm:text-[11px] text-[#c2d8c7] leading-tight font-normal mt-0.5">
                    through education, innovation and sustainability.
                  </p>
                </div>
                <Link href="/about" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1b432a]/90 hover:bg-[#255e3b] backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-110 group-hover:bg-[#255e3b] transition-all duration-300">
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5. WHAT WE DO SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center space-y-1 max-w-xl mx-auto">
            <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase block">
              WHAT WE DO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#122016] dark:text-white">
              Empowering through <span className="italic text-[#243d2c] dark:text-[#a2d45e] hover:brightness-110 transition-all duration-300">learning and discovery</span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                title: 'Conferences',
                desc: 'Global conversations on education and innovation.',
                img: '/events/conference.jpg',
                link: '/events'
              },
              {
                title: 'Workshops',
                desc: 'Hands-on learning experiences and skill building.',
                img: '/events/workshop.jpg',
                link: '/events'
              },
              {
                title: 'Training Programmes',
                desc: 'Capacity building for educators and learners.',
                img: '/events/events_book_plant.jpg',
                link: '/events'
              },
              {
                title: 'STEM Labs',
                desc: 'Experiential learning through practical exploration.',
                img: '/events/scholar.jpg',
                link: '/events'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-3.5 sm:p-5 rounded-[1.6rem] sm:rounded-[2rem] bg-white/80 dark:bg-[#0b1c14]/80 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 hover:bg-white dark:hover:bg-[#10271c] hover:border-[#1a5e35]/30 dark:hover:border-[#245437] transition-all duration-300 group">
                <div className="space-y-2 sm:space-y-3">
                  <div className="w-full h-24 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#05110a] shadow-xs relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <h3 className="text-[13px] sm:text-[15px] font-serif font-semibold text-[#14261a] dark:text-white leading-tight group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11.5px] text-[#4d6052] dark:text-slate-300 leading-snug">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-2 sm:pt-4 flex justify-end">
                  <Link href={item.link} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] group-hover:bg-[#1b3726] dark:group-hover:bg-[#a2d45e] group-hover:text-white dark:group-hover:text-[#031008] text-[#1b3726] dark:text-[#a2d45e] flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-110">
                    <ArrowRight size={12} className="sm:w-[13px] sm:h-[13px] group-hover:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. OUR FOCUS AREAS */}
        {/* ========================================================================= */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
            <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
              OUR FOCUS AREAS
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {[
              { title: 'STEM\nEducation', icon: Atom },
              { title: 'Digital Learning\n& AI in Education', icon: Monitor },
              { title: 'Sustainability\nEducation', icon: Leaf },
              { title: 'Teacher Capacity\nBuilding', icon: Users },
              { title: 'Research &\nInnovation', icon: GraduationCap },
              { title: 'Equity & Inclusive\nEducation', icon: HeartHandshake }
            ].map((area, idx) => (
              <div key={idx} className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/75 dark:bg-[#0b1c14]/75 backdrop-blur-md border border-white/95 dark:border-[#183a27] text-center flex flex-col items-center justify-center hover:bg-white dark:hover:bg-[#10271c] hover:border-[#1a5e35]/30 dark:hover:border-[#245437] hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 shadow-xs group cursor-default">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-115 group-hover:rotate-6 group-hover:bg-[#dce9de] dark:group-hover:bg-[#183d28] transition-all duration-300 shadow-xs">
                  <area.icon size={15} strokeWidth={1.5} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <span className="text-[9px] sm:text-[10.5px] font-bold text-[#14261a] dark:text-slate-100 whitespace-pre-line leading-tight group-hover:text-[#1b432a] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                  {area.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 7. UPCOMING EVENTS */}
        {/* ========================================================================= */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
              <span className="text-[10px] sm:text-[10.5px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
                UPCOMING EVENTS
              </span>
            </div>

            <Link href="/events" className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#1b3726] dark:text-[#a2d45e] hover:text-[#2d5a3c] transition-colors duration-300 group">
              <span>View All Events</span>
              <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {upcomingEvents.slice(0, 3).map((evt) => (
              <Link key={evt.id} href={evt.link} className="block group">
                <div className="rounded-[1.6rem] sm:rounded-[1.8rem] bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-xl border border-white/95 dark:border-[#183a27] p-3 sm:p-3.5 space-y-2.5 sm:space-y-3 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-xl hover:-translate-y-2 hover:bg-white dark:hover:bg-[#10271c] hover:border-[#1a5e35]/30 dark:hover:border-[#245437] transition-all duration-300">
                  {/* Image Thumbnail with Date Tag overlay */}
                  <div className="h-28 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#05110a] relative shadow-xs">
                    <img
                      src={evt.img}
                      alt={evt.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Top Left Date Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 sm:py-1 rounded-xl bg-[#0f2417]/85 backdrop-blur-md text-white border border-[#1e422c]/50 text-center shadow-md group-hover:scale-105 transition-transform duration-300">
                      <span className="block text-xs sm:text-sm font-bold leading-none">{evt.day}</span>
                      <span className="block text-[7.5px] sm:text-[8px] tracking-wider text-[#a2d45e] uppercase">{evt.month}</span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-1 px-0.5 sm:px-1">
                    <span className="inline-block px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[8.5px] font-bold uppercase tracking-widest bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] group-hover:bg-[#dce9de] dark:group-hover:bg-[#183d28] transition-colors duration-300">
                      {evt.tag}
                    </span>

                    <h4 className="text-[11.5px] sm:text-[12.5px] font-bold text-[#14261a] dark:text-white leading-tight line-clamp-2 group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                      {evt.title}
                    </h4>

                    <div className="space-y-0.5 pt-0.5 text-[9.5px] sm:text-[10.5px] text-[#556758] dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={11} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                        <span>{evt.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 8. OUR IMPACT */}
        {/* ========================================================================= */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-serif text-[#122016] dark:text-white">
            Our Impact
          </h3>

          <div className="w-full bg-white dark:bg-[#0b1c14] border border-[#f0f4f1] dark:border-[#183a27] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 rounded-[1.8rem] sm:rounded-[2.4rem] p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y-0 sm:divide-x divide-[#e8efe9] dark:divide-[#183a27]">
              {[
                { count: '44', label: 'Schools Reached', sub: '(Gifted Students Programme)', icon: School },
                { count: '500+', label: 'Teachers Empowered', icon: Users },
                { count: '1000+', label: 'Students', icon: GraduationCap },
                { count: '1', label: 'Global Academic Collaboration', icon: Globe }
              ].map((stat, idx) => (
                <div key={idx} className={`flex items-center gap-3 px-2 group cursor-default hover:-translate-y-0.5 transition-transform duration-300 ${idx === 0 ? '' : 'sm:pl-6'}`}>
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-115 group-hover:rotate-6 group-hover:bg-[#dce9de] dark:group-hover:bg-[#183d28] transition-all duration-300">
                    <stat.icon size={18} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="block text-xl sm:text-2xl font-serif font-bold text-[#14261a] dark:text-white leading-none mb-0.5 group-hover:text-[#1b432a] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                      {stat.count}
                    </span>
                    <span className="block text-[11px] sm:text-xs font-semibold text-[#485b4d] dark:text-slate-200 leading-tight">
                      {stat.label}
                    </span>
                    {stat.sub && (
                      <span className="block text-[9px] sm:text-[10px] text-[#718476] dark:text-slate-400">{stat.sub}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 9. BUILDING PARTNERSHIPS. DRIVING CHANGE. SHOWCASE */}
        {/* ========================================================================= */}
        <div className="rounded-[2rem] sm:rounded-[2.4rem] bg-gradient-to-r from-[#f7f9f5] via-white to-[#f4f8f2] dark:from-[#0b1c14] dark:via-[#08160f] dark:to-[#040e09] border border-white/95 dark:border-[#183a27] p-4 sm:p-8 lg:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center">

          {/* Left Book / AI Visual */}
          <div className="lg:col-span-3 h-36 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#05110a] shadow-sm relative group cursor-pointer">
            <img
              src="/events/events_book_plant.jpg"
              alt="Innovation and Collaboration"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-[#1b3726]/30 flex items-center justify-center group-hover:bg-[#1b3726]/20 transition-colors duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-md flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] shadow-lg group-hover:scale-115 group-hover:rotate-12 transition-all duration-300">
                <Sparkles size={20} className="sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>

          {/* Center Copy */}
          <div className="lg:col-span-5 space-y-2 sm:space-y-3">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#122016] dark:text-white leading-tight">
              Building partnerships.<br />
              <span className="italic text-[#243d2c] dark:text-[#a2d45e]">Driving change.</span>
            </h3>
            <p className="text-[11.5px] sm:text-xs lg:text-[12.5px] text-[#4d6052] dark:text-slate-300 leading-relaxed max-w-sm">
              We collaborate with institutions, educators and communities to create meaningful learning experiences and a brighter, sustainable future for all.
            </p>
            <div className="pt-1 sm:pt-2">
              <Link href="/projects">
                <button className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#1b3726] hover:bg-[#254c35] text-white text-[10.5px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer dark:bg-[#1b3726] dark:hover:bg-[#234631] dark:border dark:border-[#2d5c3f] group">
                  <span>Our Initiatives</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right 2 Feature Cards */}
          <div className="lg:col-span-4 space-y-2.5 sm:space-y-3">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#05110a]/80 border border-[#e4ede6] dark:border-[#183a27] shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[#1a5e35]/30 transition-all duration-300 flex items-center gap-3 sm:gap-3.5 group cursor-default">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center shrink-0 group-hover:scale-115 group-hover:rotate-6 group-hover:bg-[#dce9de] dark:group-hover:bg-[#183d28] transition-all duration-300 shadow-xs">
                <GraduationCap size={16} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
              </div>
              <div className="group-hover:translate-x-0.5 transition-transform duration-300">
                <h4 className="text-[11.5px] sm:text-[13px] font-bold text-[#14261a] dark:text-white group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">STEM Learning Lab</h4>
                <p className="text-[9.5px] sm:text-[11px] text-[#556758] dark:text-slate-400 leading-tight">Hands-on, activity-based STEM learning.</p>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-[#05110a]/80 border border-[#e4ede6] dark:border-[#183a27] shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[#1a5e35]/30 transition-all duration-300 flex items-center gap-3 sm:gap-3.5 group cursor-default">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#dce9de] dark:group-hover:bg-[#183d28] transition-all duration-300 shadow-xs">
                <Users size={16} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
              </div>
              <div className="group-hover:translate-x-0.5 transition-transform duration-300">
                <h4 className="text-[11.5px] sm:text-[13px] font-bold text-[#14261a] dark:text-white group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">Scholar Connect</h4>
                <p className="text-[9.5px] sm:text-[11px] text-[#556758] dark:text-slate-400 leading-tight">A platform for research exchange and collaboration.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
