'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  Users,
  GraduationCap,
  Globe,
  BookOpen,
  FlaskConical,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Loader2,
  Home
} from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            setEvents(data.map(item => ({
              ...item,
              categoryTag: item.category ? item.category.toUpperCase() : 'EVENT',
              location: item.location || 'Thiruvananthapuram, Kerala',
              duration: item.duration || 'Session',
              imageUrl: item.imageUrl || '/events/conference.jpg'
            })));
          }
        }
      } catch (err) {
        console.error('Error fetching events from database:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  const categories = [
    {
      name: 'Conferences',
      icon: Users,
      desc: 'Global conversations\non education and\ninnovation.'
    },
    {
      name: 'Workshops',
      icon: BookOpen,
      desc: 'Hands-on learning\nexperiences and\nskill building.'
    },
    {
      name: 'Training Programmes',
      icon: GraduationCap,
      desc: 'Capacity building\nfor educators and\nlearners.'
    },
    {
      name: 'STEM Labs',
      icon: FlaskConical,
      desc: 'Experiential learning\nthrough practical\nexploration.'
    },
    {
      name: 'Outreach & Community',
      icon: Globe,
      desc: 'Engaging communities\nfor a sustainable\nfuture.'
    },
  ];

  const filteredEvents = selectedCategory === 'All'
    ? events
    : events.filter(e => e.filterType?.toLowerCase() === selectedCategory.toLowerCase() || e.category?.toLowerCase() === selectedCategory.toLowerCase());

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
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 selection:bg-[#a2d45e]/30 pt-28 sm:pt-36 relative overflow-hidden transition-colors duration-300">

      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT / BACKGROUND IMAGE */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/event1.png"
          alt="LEnSE Events Hero"
          className="w-full h-full object-cover object-center lg:object-right-top scale-[1.03] transform-gpu"
        />

        {/* Soft Organic Fade Masks into the Canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f3f5ed] dark:from-[#031008] via-[#f3f5ed]/85 dark:via-[#031008]/85 via-[18%] to-transparent to-[45%] w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f3f5ed] dark:from-[#031008] via-[#f3f5ed]/60 dark:via-[#031008]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f3f5ed] dark:from-[#031008] to-transparent" />
      </div>

      {/* Ambient background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[32%] -left-40 w-[600px] h-[600px] bg-[#e2edd8]/50 dark:bg-[#0f301d]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-8 w-[650px] h-[650px] bg-[#dbe8d0]/50 dark:bg-[#082214]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ============================================================ */}
        {/* 1. HERO SECTION */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[460px] sm:min-h-[540px]">

          {/* Left: Text & CTA */}
          <div className="lg:col-span-6 space-y-6 lg:pr-2 z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400">
              <Home size={14} className="text-[#2d5a3c] dark:text-[#60a5fa]" />
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-whitesition-colors">Home</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold">Events</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-normal text-[#131f17] dark:text-white leading-[1.05] tracking-tight font-serif">
              Events that<br />
              <span className="italic text-[#243a29] dark:text-[#a2d45e] font-serif font-normal">inspire change.</span>
            </h1>

            <p className="text-[#405245] dark:text-slate-300 text-[13.5px] leading-[1.72] max-w-[430px] font-normal">
              Discover seminars, workshops, conferences and training programmes that bring ideas to life and drive meaningful impact in education, sustainability and STEM.
            </p>

            <div className="pt-2">
              <a href="#events-section" className="inline-flex">
                <button className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 shadow-[0_12px_28px_rgba(15,35,22,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.03] group cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]">
                  <span>Explore All Events</span>
                  <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center">
                    <ArrowRight size={10} className="text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </a>
            </div>
          </div>

          {/* Right: Transparent Crystal Glass "Upcoming Events" Card */}
          <div className="lg:col-span-6 relative flex items-center justify-start lg:justify-center min-h-[340px] sm:min-h-[420px]">

            {/* Real Transparent Glass Card */}
            <div className="relative lg:ml-[-50px] xl:ml-[-90px] bg-gradient-to-br from-white/55 via-white/35 to-white/20 dark:from-[#0b1c14]/80 dark:via-[#08180f]/75 dark:to-[#040e08]/70 backdrop-blur-2xl p-6 sm:p-7 rounded-[2.2rem] border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),inset_2px_0_4px_rgba(255,255,255,0.8),0_25px_50px_-10px_rgba(0,30,15,0.25)] dark:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.5)] w-52 sm:w-60 z-20 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_30px_60px_-10px_rgba(0,30,15,0.3)]">

              {/* Top-Left Specular Corner Sheen */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/70 via-white/20 to-transparent dark:from-white/10 dark:via-transparent rounded-tl-[2.2rem] pointer-events-none" />

              {/* 3D Glass Crystal Lens Badge */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white/90 via-white/60 to-white/30 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,25,12,0.18)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center absolute -top-5 -right-5 text-[#122418] dark:text-[#a2d45e] z-30 transition-transform duration-500 hover:scale-110">
                <Calendar size={20} strokeWidth={1.75} className="text-[#1b3726] dark:text-[#a2d45e]" />
              </div>

              <p className="text-[10px] font-bold text-[#354839] dark:text-[#a2d45e] uppercase tracking-[0.2em] mb-1.5 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                Upcoming Events
              </p>

              <h3 className="text-4xl sm:text-5xl font-serif text-[#0f1d13] dark:text-white mb-2 tracking-tight font-normal relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] dark:drop-shadow-none">
                18+
              </h3>

              <p className="text-[11px] text-[#2c3d30] dark:text-slate-300 leading-relaxed font-medium mb-4 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                Across seminars, labs, workshops and conferences.
              </p>

              {/* Indicator pills */}
              <div className="flex items-center gap-1.5 relative z-10 pt-1">
                <div className="w-6 h-1 bg-[#1b3726] dark:bg-[#a2d45e] rounded-full" />
                <div className="w-2 h-1 bg-[#b2c4b6] dark:bg-[#1e422c] rounded-full" />
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. FIVE CATEGORY CARDS DOCK */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-12 p-3 sm:p-4 rounded-[2.8rem] bg-gradient-to-b from-white/40 via-white/25 to-white/15 dark:from-[#0b1c14]/85 dark:via-[#08180f]/80 dark:to-[#040e08]/75 backdrop-blur-3xl border-[1.5px] border-white/90 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),0_25px_60px_-10px_rgba(0,25,12,0.15)] dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.4)] relative z-20 transition-all duration-500">

          {/* Top Specular Edge Highlight Beam */}
          <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-95 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-white/70 dark:divide-[#183a27] relative z-10">
            {categories.map((cat, i) => {
              const isSelected = selectedCategory === cat.name;
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedCategory(isSelected ? 'All' : cat.name)}
                  className={`flex flex-col items-center text-center p-6 sm:p-7 group transition-all duration-500 rounded-[2.2rem] relative cursor-pointer ${isSelected ? 'bg-white/60 dark:bg-[#132c1e] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_10px_25px_rgba(0,25,12,0.06)]' : 'hover:bg-white/30 dark:hover:bg-white/5'
                    }`}
                >
                  {/* Real 3D Transparent Glass Lens Sphere */}
                  <div className={`w-15 h-15 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/25 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_3px_6px_rgba(255,255,255,1),inset_0_-3px_5px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,25,12,0.12)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#112417] dark:text-[#a2d45e] mb-3.5 group-hover:scale-110 transition-all duration-500 ${isSelected ? 'ring-2 ring-[#2d5a3c] dark:ring-[#a2d45e]' : ''
                    }`}>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <h4 className="text-[16px] font-serif font-normal text-[#101e14] dark:text-white mb-1.5 leading-snug whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                    {cat.name}
                  </h4>

                  <p className="text-[11px] text-[#3f5244] dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                    {cat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MAIN SECTION: EXPLORE WHAT'S NEXT & EVENT HIGHLIGHTS */}
        {/* ============================================================ */}
        <div id="events-section" className="mt-20 sm:mt-28 relative z-20">

          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
                  UPCOMING EVENTS
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-normal text-[#142218] dark:text-white tracking-tight">
                Explore what's next.
              </h2>
            </div>

            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs sm:text-sm font-semibold text-[#183120] dark:text-[#a2d45e] hover:text-[#2d5a3c] dark:hover:text-[#b8e874] flex items-center gap-1.5 transition-colors group cursor-pointer w-fit pb-1"
            >
              <span>View All Events</span>
              <div className="w-5 h-5 rounded-full border border-[#2d5a3c]/30 dark:border-[#a2d45e]/30 flex items-center justify-center group-hover:bg-[#1b3726] dark:group-hover:bg-[#a2d45e] group-hover:text-white dark:group-hover:text-[#031008] transition-all">
                <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left 8 Cols: Timeline Events List */}
            <div className="lg:col-span-8 space-y-5 relative pb-6">

              {/* Continuous Vertical Timeline Line */}
              <div className="absolute left-[38px] top-6 bottom-6 w-[1.5px] bg-[#d2e0d3] dark:bg-[#183a27] hidden sm:block pointer-events-none" />

              {loading ? (
                <div className="bg-white/50 dark:bg-[#0b1c14]/50 backdrop-blur-xl rounded-[2rem] border border-white/80 dark:border-[#183a27] p-8 shadow-sm">
                  <LoadingSpinner message="Fetching events..." />
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="text-center py-16 bg-white/50 dark:bg-[#0b1c14]/50 backdrop-blur-xl rounded-[2rem] border border-white/80 dark:border-[#183a27] p-8">
                  <div className="w-14 h-14 bg-white dark:bg-[#11261a] rounded-full flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] mx-auto mb-3 shadow-sm">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-lg font-serif text-[#122016] dark:text-white mb-1">No events found in this category</h3>
                  <p className="text-xs text-[#526656] dark:text-slate-400 max-w-sm mx-auto mb-4">
                    Check back soon for upcoming announcements in this category.
                  </p>
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="px-5 py-2 rounded-full bg-[#1b3726] dark:bg-[#154628] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#244833] dark:hover:bg-[#1c5c34] transition-colors cursor-pointer"
                  >
                    Show All Events
                  </button>
                </div>
              ) : (
                filteredEvents.map((evt) => (
                  <Link key={evt.id} href={`/events/${evt.slug || evt.id}`} className="block">
                    <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch group cursor-pointer">

                      {/* Timeline Date (Left) */}
                      <div className="hidden sm:flex flex-col items-center w-[76px] shrink-0 relative z-10 pt-5 text-center">
                        <span className="block text-2xl sm:text-[28px] font-serif font-normal text-[#122016] dark:text-white leading-none">
                          {evt.dateDay}
                        </span>
                        <span className="block text-[10.5px] font-bold text-[#556758] dark:text-[#a2d45e] mt-1.5 uppercase tracking-widest">
                          {evt.dateMonth}
                        </span>
                        <span className="block text-[10px] font-medium text-[#7a8e7e] dark:text-slate-400 mt-0.5">
                          {evt.dateYear}
                        </span>
                      </div>

                      {/* Dot on the Line */}
                      <div className="hidden sm:flex absolute left-[38px] top-9 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#2d5a3c] dark:border-[#a2d45e] bg-white dark:bg-[#031008] ring-4 ring-[#f3f5ed] dark:ring-[#031008] z-20 group-hover:scale-125 transition-transform duration-300">
                        <div className="m-auto w-1 h-1 bg-[#2d5a3c] dark:bg-[#a2d45e] rounded-full" />
                      </div>

                      {/* Event Glass Card */}
                      <div className="flex-1 rounded-[2rem] bg-gradient-to-br from-white/70 via-white/50 to-white/30 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_15px_35px_rgba(0,25,12,0.04)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_25px_45px_rgba(0,25,12,0.08)] transition-all duration-500 w-full relative">

                        {/* Mobile Date Header */}
                        <div className="sm:hidden w-full flex items-center justify-between border-b border-white/80 dark:border-[#183a27] pb-2 mb-1">
                          <span className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] flex items-center gap-1.5">
                            <Calendar size={13} /> {evt.dateDay} {evt.dateMonth} {evt.dateYear}
                          </span>
                          <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] rounded-md">
                            {evt.categoryTag || evt.category}
                          </span>
                        </div>

                        {/* Event Image */}
                        <div className="w-full sm:w-[190px] h-[135px] rounded-[1.4rem] overflow-hidden shrink-0 relative bg-slate-100 dark:bg-[#05110a] shadow-sm">
                          <img
                            src={evt.imageUrl}
                            alt={evt.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              e.currentTarget.src = "/events/conference.jpg";
                            }}
                          />
                        </div>

                        {/* Event Content */}
                        <div className="flex-1 py-1 w-full flex flex-col justify-center">
                          <div className="hidden sm:inline-flex px-2.5 py-0.5 rounded-md bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] text-[9.5px] font-bold uppercase tracking-widest mb-2 w-max">
                            {evt.categoryTag || evt.category}
                          </div>

                          <h3 className="text-[16px] sm:text-[17px] font-serif font-semibold text-[#122016] dark:text-white leading-snug mb-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none group-hover:text-[#2d5a3c] dark:group-hover:text-[#a2d45e] transition-colors">
                            {evt.title}
                          </h3>

                          <p className="text-[12px] text-[#445548] dark:text-slate-300 leading-relaxed line-clamp-2 mb-3 font-normal">
                            {evt.subtitle}
                          </p>

                          {/* Meta info footer */}
                          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#556758] dark:text-slate-400 font-medium pt-0.5">
                            <span className="flex items-center gap-1.5">
                              <MapPin size={13} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                              {evt.location || 'Kazhakkoottam, Kerala'}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={13} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                              {evt.duration || 'Full Day'}
                            </span>
                          </div>
                        </div>

                        {/* Far Right Arrow Button */}
                        <div className="hidden sm:flex w-9 h-9 rounded-full bg-white dark:bg-[#11261a] border border-white/90 dark:border-[#183a27] shadow-[0_4px_12px_rgba(0,0,0,0.06)] items-center justify-center text-[#14261a] dark:text-[#a2d45e] group-hover:bg-[#1b3726] dark:group-hover:bg-[#a2d45e] group-hover:text-white dark:group-hover:text-[#031008] transition-all duration-300 shrink-0 cursor-pointer">
                          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}

            </div>

            {/* Right 4 Cols: Event Highlights Sidebar */}
            <div className="lg:col-span-4 space-y-4">

              {/* Event Highlights Tag */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
                  EVENT HIGHLIGHTS
                </span>
              </div>

              {/* Highlights Container Card */}
              <div className="rounded-[2.2rem] overflow-hidden border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)]">

                {/* Top Green Banner */}
                <div className="bg-[#183424] dark:bg-[#0e2719] p-7 sm:p-8 relative overflow-hidden text-white">
                  {/* Subtle Chalk sketches pattern */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen bg-cover bg-center" style={{ backgroundImage: "url('/events/chalk_bg.jpg')" }} />

                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-[26px] font-serif font-normal leading-tight tracking-tight text-white drop-shadow-sm">
                      Learning today,<br />
                      leading tomorrow.
                    </h3>
                    <div className="w-8 h-[2.5px] bg-[#68a752] dark:bg-[#a2d45e] rounded-full mt-3.5" />
                  </div>
                </div>

                {/* Bottom Highlight Points List */}
                <div className="bg-gradient-to-b from-white/75 via-white/55 to-white/35 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl p-6 sm:p-7 space-y-6">
                  {[
                    {
                      icon: Users,
                      title: 'Expert Speakers',
                      desc: 'Learn from educators, researchers and industry leaders.'
                    },
                    {
                      icon: GraduationCap,
                      title: 'Hands-on Experience',
                      desc: 'Participate in interactive sessions and practical activities.'
                    },
                    {
                      icon: Globe,
                      title: 'Global Perspective',
                      desc: 'Connect with institutions and thought leaders worldwide.'
                    },
                    {
                      icon: Leaf,
                      title: 'Social Impact',
                      desc: 'Contribute to initiatives that build a better, more equitable future.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 group/item">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-b from-white/95 to-white/40 dark:from-[#132c1e] dark:to-[#0b1c14] border border-white dark:border-[#1e422c] flex items-center justify-center text-[#1b3726] dark:text-[#a2d45e] shadow-sm shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                        <item.icon size={18} strokeWidth={1.5} />
                      </div>
                      <div className="space-y-0.5 pt-0.5">
                        <h4 className="text-[13.5px] font-bold text-[#122016] dark:text-white drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                          {item.title}
                        </h4>
                        <p className="text-[11.5px] text-[#445548] dark:text-slate-300 leading-snug font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 4. BOTTOM ROW: TWO HIGHLIGHT & CTA CARDS */}
        {/* ============================================================ */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-20">

          {/* Left Card: "Be a part of the movement." */}
          <div className="lg:col-span-6 rounded-[2.4rem] bg-gradient-to-br from-[#183424] via-[#142d1e] to-[#0f2216] dark:from-[#0b1c14] dark:via-[#08160f] dark:to-[#040e08] p-7 sm:p-8 relative overflow-hidden border border-white/10 dark:border-[#183a27] shadow-[0_20px_45px_rgba(10,30,18,0.25)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)] text-white flex flex-col justify-between min-h-[240px] group">

            {/* Right Desk Globe & Books Visual */}
            <div className="absolute top-0 right-0 bottom-0 w-[55%] sm:w-[50%] pointer-events-none select-none overflow-hidden">
              <img
                src="/events/events_globe_books.jpg"
                alt="Globe and books"
                className="w-full h-full object-cover object-left opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#183424] dark:from-[#0b1c14] via-[#183424]/70 dark:via-[#0b1c14]/70 to-transparent" />
            </div>

            <div className="relative z-10 max-w-[280px] space-y-2">
              <h3 className="text-2xl sm:text-3xl font-serif font-normal leading-tight text-white">
                Be a part of<br />
                the movement.
              </h3>
              <p className="text-[11.5px] text-[#c0d4c5] leading-relaxed font-normal pt-1">
                Join us in our mission to innovate education, empower minds and create a sustainable world through impactful events.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <Link href="/contact" className="inline-flex">
                <button className="px-5 py-2.5 rounded-full bg-white dark:bg-[#154628] text-[#122016] dark:text-white hover:bg-slate-100 dark:hover:bg-[#1c5c34] text-[11px] font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md group/btn cursor-pointer">
                  <span>Register Now</span>
                  <div className="w-4 h-4 rounded-full bg-[#122016]/10 dark:bg-white/20 flex items-center justify-center">
                    <ArrowRight size={10} className="text-[#122016] dark:text-white group-hover/btn:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Card: "Stay updated" */}
          <div className="lg:col-span-6 rounded-[2.4rem] bg-gradient-to-b from-white/70 via-white/50 to-white/30 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] p-7 sm:p-8 relative overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] flex flex-col justify-between min-h-[240px] group">

            {/* Right Stationery Illustration Visual */}
            <div className="absolute top-0 right-0 bottom-0 w-[50%] sm:w-[45%] pointer-events-none select-none overflow-hidden">
              <img
                src="/events/events_stationery.jpg"
                alt="Stationery sketch"
                className="w-full h-full object-cover object-left opacity-85 dark:opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f3f5ed] dark:from-[#0b1c14] via-[#f3f5ed]/60 dark:via-[#0b1c14]/60 to-transparent" />
            </div>

            <div className="relative z-10 max-w-[290px] space-y-2">
              <div className="w-11 h-11 rounded-2xl bg-white/80 dark:bg-[#11261a] border border-white dark:border-[#1e422c] flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] shadow-sm mb-3">
                <Mail size={20} strokeWidth={1.75} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#122016] dark:text-white leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                Stay updated
              </h3>
              <p className="text-[11.5px] text-[#445548] dark:text-slate-300 leading-relaxed font-normal">
                Subscribe to get the latest updates about our upcoming events and programmes.
              </p>
            </div>

            <div className="relative z-10 pt-5">
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-[#eaf1e4] dark:bg-[#11261a] px-4 py-2.5 rounded-full w-fit">
                  <CheckCircle2 size={16} />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="bg-white/90 dark:bg-[#05110a] border border-white/95 dark:border-[#183a27] rounded-full p-1 pl-4 pr-1 flex items-center max-w-[320px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.03)]">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Your email address"
                    className="text-[12px] text-slate-800 dark:text-white placeholder:text-[#7a8e7e] dark:placeholder-slate-500 bg-transparent outline-none flex-1 font-medium pr-2"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-full bg-[#1b3726] dark:bg-[#a2d45e] hover:bg-[#234631] dark:hover:bg-[#b8e874] text-white dark:text-[#031008] flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-sm"
                    title="Subscribe"
                  >
                    <ArrowRight size={13} />
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
