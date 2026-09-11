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
  Shield
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

let clientCachedEvents = null;

export default function EventsPage() {
  const [events, setEvents] = useState(() => {
    if (clientCachedEvents && clientCachedEvents.length > 0) return clientCachedEvents;
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('clese_events_cache');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            clientCachedEvents = parsed;
            return parsed;
          }
        }
      } catch (e) {}
    }
    return [];
  });
  const [loading, setLoading] = useState(events.length === 0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadData() {
      try {
        const res = await fetch('/api/events', { 
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            const formatted = data.map(item => ({
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
              imageUrl: item.imageUrl || item.image_url || '/events/conference.jpg',
              dateDay: item.dateDay || item.date_day || '14',
              dateMonth: item.dateMonth || item.date_month || 'MAR',
              dateYear: item.dateYear || item.date_year || '2025'
            }));
            clientCachedEvents = formatted;
            setEvents(formatted);
            setLoading(false);
            try {
              sessionStorage.setItem('clese_events_cache', JSON.stringify(formatted));
            } catch (e) {}
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Events fetch notice:', err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { 
      isMounted = false;
      controller.abort();
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
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-20 sm:pb-24 selection:bg-[#a2d45e]/30 pt-24 sm:pt-28 relative overflow-hidden transition-colors duration-300">

      {/* ============================================================ */}
      {/* 0. HERO BACKGROUND ART (Continuous Organic Canvas Blend) */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-[55%] sm:w-[65%] lg:w-[68%] xl:w-[62%] h-[380px] sm:h-[650px] lg:h-[840px] pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/event1.png"
          alt="LEnSE Events Botanical Illustration"
          className="w-full h-full object-cover object-[78%_25%] sm:object-right-top scale-[1.03]"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Soft Organic Fades into canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/85 dark:via-[#031008]/85 via-[15%] sm:via-[18%] to-transparent to-[55%] w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-48 bg-gradient-to-t from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/70 dark:via-[#031008]/70 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] to-transparent" />
      </div>

      {/* Ambient Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full animate-pulse duration-1000" />
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
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold">Events</span>
            </div>

            <h1 className="text-[1.7rem] xs:text-[2.1rem] sm:text-[3.2rem] lg:text-[4.2rem] font-normal text-[#131f17] dark:text-white leading-[1.06] tracking-tight font-serif">
              Events that<br />
              <span className="italic text-[#1a5e35] dark:text-[#a2d45e] font-serif font-normal">inspire change.</span>
            </h1>

            <p className="text-[#405245] dark:text-slate-300 text-[9.5px] xs:text-[11px] sm:text-[13.5px] leading-[1.45] sm:leading-[1.55] max-w-[440px] font-normal">
              Discover seminars, workshops, conferences and training programmes that bring people together to share knowledge, spark ideas and create a more sustainable future.
            </p>

            <div className="pt-0.5 sm:pt-2">
              <a href="#events-section" className="inline-flex">
                <button className="px-3.5 sm:px-7 py-2 sm:py-3.5 rounded-full bg-[#1b3726] hover:bg-[#254d35] text-white text-[10px] sm:text-[12px] font-bold tracking-wide flex items-center gap-1.5 sm:gap-3 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 group cursor-pointer dark:bg-[#1b432a] dark:hover:bg-[#245437]">
                  <span>Explore All Events</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300 sm:w-3.5 sm:h-3.5" />
                </button>
              </a>
            </div>
          </div>

          {/* Right: Floating 18+ Glass Badge */}
          <div className="col-span-5 sm:col-span-5 lg:col-span-5 relative flex items-start justify-end pt-1 sm:pt-6">
            <div className="relative w-full max-w-[130px] xs:max-w-[160px] sm:max-w-[220px]">
              
              {/* Floating Glass Card */}
              <div className="bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-xl p-2.5 xs:p-3 sm:p-5 rounded-2xl sm:rounded-[2rem] border border-white/95 dark:border-[#183a27] shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)] z-20 hover:-translate-y-1 transition-all duration-300 relative w-full">

                {/* Calendar Icon Badge on top right */}
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#132c1e] backdrop-blur-2xl border border-white dark:border-[#1e422c] shadow-sm flex items-center justify-center absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-[#1b3726] dark:text-[#a2d45e] z-30">
                  <Calendar size={12} strokeWidth={1.75} className="text-[#1b3726] dark:text-[#a2d45e] sm:w-5 sm:h-5" />
                </div>

                <p className="text-[6.5px] xs:text-[7.5px] sm:text-[9.5px] font-bold text-[#455c4a] dark:text-[#a2d45e] uppercase tracking-wider mb-0.5">
                  UPCOMING EVENTS
                </p>

                <h3 className="text-xl xs:text-2xl sm:text-4xl font-serif text-[#0f1d13] dark:text-white mb-0.5 tracking-tight font-normal leading-none">
                  {events.length > 0 ? `${events.length}+` : '10+'}
                </h3>

                <p className="text-[6.5px] xs:text-[7.5px] sm:text-[10px] text-[#4a5e4f] dark:text-slate-300 leading-tight font-medium">
                  Interactive talks, workshops and more.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. FIVE CATEGORY CARDS DOCK (1 Row of 5 Columns) */}
        {/* ============================================================ */}
        <div className="p-1 sm:p-3.5 rounded-[1.3rem] sm:rounded-[2.6rem] bg-white dark:bg-[#0b1c14] border border-[#e8efe9] dark:border-[#183a27] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.3)] relative z-20">
          <div className="grid grid-cols-5 divide-x divide-[#e8efe9] dark:divide-[#183a27]">
            {categories.map((cat, i) => {
              const isSelected = selectedCategory === cat.name;
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`flex flex-col items-center text-center px-0.5 sm:px-3 py-1 sm:py-3.5 group transition-all duration-300 rounded-xl sm:rounded-2xl cursor-pointer ${
                    isSelected 
                      ? 'bg-[#f0f6ee] dark:bg-[#132c1e]' 
                      : 'hover:bg-white/60 dark:hover:bg-[#10271c]'
                  }`}
                >
                  <div className={`w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-[#f4f8f3] dark:bg-[#11261a] border border-[#e2ede4] dark:border-[#1e422c] shadow-xs flex items-center justify-center text-[#1b3726] dark:text-[#a2d45e] mb-1 sm:mb-2 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-[#2d5a3c] dark:ring-[#a2d45e] bg-white dark:bg-[#1e422c]' : ''
                  }`}>
                    <Icon size={12} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                  </div>

                  <h4 className="text-[7.5px] xs:text-[8.5px] sm:text-[14px] font-serif font-semibold text-[#101e14] dark:text-white mb-0.5 leading-tight group-hover:text-[#1b3726] dark:group-hover:text-[#a2d45e] transition-colors break-words">
                    {cat.name}
                  </h4>

                  <p className="text-[5.5px] xs:text-[6.5px] sm:text-[10.5px] text-[#556758] dark:text-slate-400 leading-[1.2] whitespace-pre-line font-medium">
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
        <div id="events-section" className="relative z-20 space-y-3 sm:space-y-6 pt-1 sm:pt-2">

          {/* Section Header */}
          <div className="flex items-center justify-between pb-2 border-b border-[#e8efe9] dark:border-[#183a27]">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                <span className="text-[8px] sm:text-[10.5px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
                  UPCOMING EVENTS
                </span>
              </div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-[2.6rem] font-serif font-normal text-[#142218] dark:text-white tracking-tight">
                Explore what's next.
              </h2>
            </div>

            <button
              onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
              className="px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white dark:bg-[#0b1c14] border border-[#d6e2d7] dark:border-[#183a27] text-[9.5px] sm:text-[12px] font-bold text-[#183120] dark:text-[#a2d45e] hover:bg-[#f0f6ee] dark:hover:bg-[#132c1e] flex items-center gap-1 sm:gap-1.5 transition-all shadow-xs group cursor-pointer"
            >
              <span>View All Events</span>
              <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Events List */}
          <div className="space-y-2.5 sm:space-y-4">
            {loading ? (
              <div className="bg-white dark:bg-[#0b1c14] rounded-[2rem] border border-[#e8efe9] dark:border-[#183a27] p-12 text-center shadow-xs">
                <LoadingSpinner message="Fetching upcoming events..." />
              </div>
            ) : paginatedEvents.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-[#0b1c14] rounded-[2rem] border border-[#e8efe9] dark:border-[#183a27] p-8 shadow-xs">
                <div className="w-12 h-12 bg-[#f4f8f3] dark:bg-[#11261a] rounded-full flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] mx-auto mb-3 shadow-xs">
                  <Calendar size={20} />
                </div>
                <h3 className="text-base font-serif text-[#122016] dark:text-white mb-1">No events found in this category</h3>
                <p className="text-xs text-[#526656] dark:text-slate-400 max-w-sm mx-auto mb-4">
                  Check back soon for upcoming announcements in this category.
                </p>
                <button
                  onClick={() => { setSelectedCategory('All'); setCurrentPage(1); }}
                  className="px-5 py-2 rounded-full bg-[#1b3726] dark:bg-[#154628] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#244833] transition-colors cursor-pointer"
                >
                  Show All Events
                </button>
              </div>
            ) : (
              paginatedEvents.map((evt) => (
                <Link key={evt.id} href={`/events/${evt.slug || evt.id}`} className="block group">
                  <div className="flex items-center gap-2 sm:gap-6">
                    
                    {/* Left Date Column */}
                    <div className="w-9 sm:w-16 text-center shrink-0">
                      <span className="block text-base xs:text-lg sm:text-3xl font-serif font-normal text-[#122016] dark:text-white leading-none">
                        {evt.dateDay}
                      </span>
                      <span className="block text-[7.5px] sm:text-[10.5px] font-bold text-[#556758] dark:text-[#a2d45e] mt-0.5 uppercase tracking-wider">
                        {evt.dateMonth}
                      </span>
                      <span className="block text-[7px] sm:text-[9px] text-[#7a8e7e] dark:text-slate-400 font-medium">
                        {evt.dateYear}
                      </span>
                    </div>

                    {/* Event White Glass Card */}
                    <div className="flex-1 rounded-[1.2rem] sm:rounded-[2.2rem] bg-white dark:bg-[#0b1c14] border border-[#e8efe9] dark:border-[#183a27] p-2 sm:p-4 flex items-center gap-2.5 sm:gap-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-xl hover:-translate-y-1 hover:border-[#1a5e35]/30 transition-all duration-300 w-full relative min-w-0 overflow-hidden">
                      
                      {/* Image Thumbnail with Explicit Dimensions */}
                      <div className="w-[82px] min-w-[82px] sm:w-[176px] sm:min-w-[176px] h-[64px] sm:h-[110px] rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-[#05110a] shadow-xs relative">
                        <img
                          src={evt.imageUrl}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out absolute inset-0 block"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            e.currentTarget.src = "/events/conference.jpg";
                          }}
                        />
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 py-0.5 sm:py-1 w-full flex flex-col justify-center min-w-0">
                        <span className="inline-block px-1.5 sm:px-2.5 py-0.5 rounded text-[7px] sm:text-[8.5px] font-bold uppercase tracking-widest bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] mb-0.5 sm:mb-1 w-max">
                          {evt.categoryTag || evt.category}
                        </span>

                        <h3 className="text-[10.5px] xs:text-[12px] sm:text-[16px] font-serif font-semibold text-[#122016] dark:text-white leading-snug mb-0.5 sm:mb-1 group-hover:text-[#1b3726] dark:group-hover:text-[#a2d45e] transition-colors line-clamp-1 sm:line-clamp-2">
                          {evt.title}
                        </h3>

                        <p className="text-[8px] xs:text-[9.5px] sm:text-[12px] text-[#445548] dark:text-slate-300 leading-tight sm:leading-relaxed line-clamp-1 sm:line-clamp-2 mb-1 font-normal">
                          {evt.subtitle || evt.desc || 'Explore collaborative learning and sustainability education initiatives.'}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3.5 text-[7.5px] sm:text-[11px] text-[#556758] dark:text-slate-400 font-medium">
                          <span className="flex items-center gap-1 truncate">
                            <MapPin size={9} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0 sm:w-3 sm:h-3" />
                            {evt.location || 'Kazhakkoottam, Kerala'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={9} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0 sm:w-3 sm:h-3" />
                            {evt.duration || 'Session'}
                          </span>
                        </div>
                      </div>

                      {/* Right Circular Arrow Button */}
                      <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-[#f4f8f3] dark:bg-[#11261a] border border-[#e2ede4] dark:border-[#183a27] shadow-xs flex items-center justify-center text-[#14261a] dark:text-[#a2d45e] group-hover:bg-[#1b3726] dark:group-hover:bg-[#a2d45e] group-hover:text-white dark:group-hover:text-[#031008] transition-all duration-300 shrink-0 cursor-pointer group-hover:scale-110 mr-0.5">
                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-300 sm:w-3.5 sm:h-3.5 text-[#2d5a3c] group-hover:text-white dark:text-[#a2d45e]" />
                      </div>

                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* ============================================================ */}
          {/* PAGINATION CONTROLS (Calculated dynamically from total events) */}
          {/* ============================================================ */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-3 sm:pt-6">
              {/* Previous Page Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-[#0b1c14] border border-[#d6e2d7] dark:border-[#183a27] text-[#1b3726] dark:text-white flex items-center justify-center hover:bg-[#eaf1e4] dark:hover:bg-[#132c1e] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xs cursor-pointer"
                title="Previous Page"
                aria-label="Previous Page"
              >
                <ChevronLeft size={13} />
              </button>

              {/* Dynamic Page Number Buttons */}
              {getPageNumbers().map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="w-5 text-center text-xs text-[#556758] dark:text-slate-400 select-none">
                      ...
                    </span>
                  );
                }
                const isCurrent = currentPage === page;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[10.5px] sm:text-xs font-bold transition-all duration-300 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#143422] dark:bg-[#a2d45e] text-white dark:text-[#031008] scale-105 shadow-md'
                        : 'bg-white dark:bg-[#0b1c14] border border-[#d6e2d7] dark:border-[#183a27] text-[#14261a] dark:text-slate-300 hover:bg-[#f0f6ee] dark:hover:bg-[#132c1e]'
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Page Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-[#0b1c14] border border-[#d6e2d7] dark:border-[#183a27] text-[#1b3726] dark:text-white flex items-center justify-center hover:bg-[#eaf1e4] dark:hover:bg-[#132c1e] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xs cursor-pointer"
                title="Next Page"
                aria-label="Next Page"
              >
                <ChevronRight size={13} />
              </button>
            </div>
          )}

        </div>

        {/* ============================================================ */}
        {/* 4. FEATURED EVENT BANNER ("Be a part of the movement.") */}
        {/* ============================================================ */}
        <div className="pt-1 sm:pt-4">
          <div className="rounded-[1.4rem] sm:rounded-[2.4rem] bg-[#143422] dark:bg-[#0b1c14] border border-white/10 dark:border-[#183a27] p-3.5 xs:p-4 sm:p-8 lg:p-10 shadow-xl text-white grid grid-cols-12 gap-3 sm:gap-8 items-center relative overflow-hidden group">
            
            {/* Left Copy */}
            <div className="col-span-6 sm:col-span-6 space-y-1.5 xs:space-y-2 sm:space-y-4 relative z-10">
              <h3 className="text-base xs:text-lg sm:text-3xl lg:text-4xl font-serif text-white leading-tight">
                Be a part of<br />
                the movement.
              </h3>

              <p className="text-[9px] xs:text-[10.5px] sm:text-[13px] text-[#c0d4c5] leading-relaxed max-w-sm font-normal">
                Join inspiring events that create real-world impact.
              </p>

              <div className="pt-0.5 sm:pt-2">
                <Link href="/about">
                  <button className="px-3 xs:px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-full bg-white hover:bg-[#f2f7f3] text-[#143422] text-[9.5px] xs:text-[10.5px] sm:text-xs font-bold tracking-wide flex items-center gap-1.5 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer">
                    <span>Explore Events</span>
                    <ArrowRight size={11} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Greenhouse Botanical Visual with Overlay Text */}
            <div className="col-span-6 sm:col-span-6 h-[100px] xs:h-[130px] sm:h-56 rounded-xl sm:rounded-3xl overflow-hidden shadow-lg relative bg-slate-900">
              <img
                src="/about/about4.png"
                alt="Greenhouse Learning"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out absolute inset-0 block"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = "/events/sustainability.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-end p-2.5 sm:p-6">
                <div className="text-right text-white font-serif italic text-[9.5px] xs:text-[12px] sm:text-lg drop-shadow-md leading-tight">
                  Learning today,<br />leading tomorrow.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. STAY UPDATED NEWSLETTER (Standard Clean Borderless Rounded Pill) */}
        {/* ============================================================ */}
        <div className="pt-1">
          <div className="rounded-[1.4rem] sm:rounded-[2.4rem] bg-[#f4f7f2] dark:bg-[#0b1c14] border border-[#e4ede5] dark:border-[#183a27] p-3 xs:p-3.5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            
            {/* Left Info */}
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white dark:bg-[#11261a] border border-[#dce8dc] dark:border-[#1e422c] flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] shadow-xs shrink-0">
                <Mail size={16} strokeWidth={1.75} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-2xl font-serif text-[#122016] dark:text-white leading-tight">
                  Stay updated
                </h3>
                <p className="text-[9px] xs:text-[9.5px] sm:text-xs text-[#526656] dark:text-slate-300 mt-0.5">
                  Subscribe to our newsletter for upcoming events, insights and more.
                </p>
              </div>
            </div>

            {/* Right Borderless Rounded Pill Input Form */}
            <div className="w-full sm:w-auto shrink-0">
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-white dark:bg-[#11261a] px-5 py-2.5 rounded-full shadow-sm">
                  <CheckCircle2 size={15} />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubscribe} 
                  className="bg-white dark:bg-[#05110a] rounded-full p-1 pl-4 pr-1 flex items-center shadow-[0_2px_15px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_15px_rgba(0,0,0,0.4)] w-full sm:w-[320px] md:w-[350px]"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="text-[10.5px] xs:text-[11px] sm:text-xs text-slate-800 dark:text-white placeholder:text-[#889c8d] dark:placeholder-slate-500 bg-transparent border-0 outline-none ring-0 flex-1 font-medium min-w-0 pr-2"
                  />
                  <button
                    type="submit"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#143422] dark:bg-[#a2d45e] hover:bg-[#254d35] dark:hover:bg-[#b8e874] text-white dark:text-[#031008] flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                    title="Subscribe"
                  >
                    <ArrowRight size={12} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
