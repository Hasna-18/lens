'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowDown,
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  Building,
  Sparkles,
  Download,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Star,
  X,
  AlertCircle,
  Home,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Leaf,
  Sprout
} from 'lucide-react';
import { getFromCache, setInCache } from '../../../lib/clientCache';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const formatDateDDMMYYYY = (day, monthStr, year) => {
  if (!day && !monthStr && !year) return '';
  let mIdx = MONTHS.indexOf(String(monthStr).toUpperCase().trim());
  let mm = '';
  if (mIdx !== -1) {
    mm = String(mIdx + 1).padStart(2, '0');
  } else {
    const numM = parseInt(monthStr, 10);
    if (!isNaN(numM) && numM >= 1 && numM <= 12) {
      mm = String(numM).padStart(2, '0');
    } else {
      mm = '01';
    }
  }
  const dNum = parseInt(String(day).replace(/[^\d]/g, ''), 10);
  const dd = isNaN(dNum) ? String(day || '01').padStart(2, '0') : String(dNum).padStart(2, '0');
  const yNum = parseInt(String(year).replace(/[^\d]/g, ''), 10);
  const yyyy = isNaN(yNum) ? String(year || '2025') : String(yNum);
  return `${dd}/${mm}/${yyyy}`;
};

export default function EventDetailPage({ params }) {
  const eventSlug = String(params?.slug || params?.id || '1');

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readMore, setReadMore] = useState(false);

  // Registration Modal State
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({ name: '', phone: '', dob: '', institution: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegError('');
    try {
      const res = await fetch(`/api/events/${encodeURIComponent(eventSlug)}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationForm)
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsRegisterModalOpen(false);
          setIsSuccess(false);
          setRegistrationForm({ name: '', phone: '', dob: '', institution: '' });
        }, 3000);
      } else {
        const errData = await res.json().catch(() => ({}));
        setRegError(errData.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error registering:", err);
      setRegError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCalendar = () => {
    try {
      const mIdx = MONTHS.indexOf(String(event?.dateMonth).toUpperCase().trim());
      let mm = '01';
      if (mIdx !== -1) mm = String(mIdx + 1).padStart(2, '0');

      const dNum = parseInt(String(event?.dateDay).replace(/[^\d]/g, ''), 10);
      const dd = isNaN(dNum) ? '01' : String(dNum).padStart(2, '0');

      const yNum = parseInt(String(event?.dateYear).replace(/[^\d]/g, ''), 10);
      const yyyy = isNaN(yNum) ? '2025' : String(yNum);

      const dateStr = `${yyyy}${mm}${dd}`;

      const url = new URL('https://calendar.google.com/calendar/render');
      url.searchParams.append('action', 'TEMPLATE');
      url.searchParams.append('text', event?.title || 'Event');
      url.searchParams.append('details', event?.subtitle || '');
      url.searchParams.append('location', event?.details?.venue !== 'TBA' ? (event?.details?.venue || '') : '');
      url.searchParams.append('dates', `${dateStr}/${dateStr}`);

      window.open(url.toString(), '_blank');
    } catch (err) {
      console.error('Error generating calendar link:', err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (!event) {
      const specific = getFromCache(`clese_event_${eventSlug}_cache`);
      if (specific && (specific.title || specific.id)) {
        setEvent(specific);
        setLoading(false);
      } else {
        const allEvents = getFromCache('clese_events_cache');
        if (Array.isArray(allEvents)) {
          const match = allEvents.find(e => String(e.slug) === eventSlug || String(e.id) === eventSlug);
          if (match) {
            setEvent(match);
            setLoading(false);
          }
        }
      }
    }

    async function fetchEventData() {
      try {
        if (!event && !getFromCache(`clese_event_${eventSlug}_cache`)) {
          setLoading(true);
        }
        const res = await fetch(`/api/events/${encodeURIComponent(eventSlug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && isMounted) {
            setEvent(data);
            setInCache(`clese_event_${eventSlug}_cache`, data);
            setError(null);
          }
        } else {
          if (isMounted && !event && !getFromCache(`clese_event_${eventSlug}_cache`)) {
            setError('Event not found');
          }
        }
      } catch (err) {
        console.error('Error fetching event from database:', err);
        if (isMounted && !event && !getFromCache(`clese_event_${eventSlug}_cache`)) {
          setError('Error connecting to database');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchEventData();
    return () => { isMounted = false; };
  }, [eventSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] flex items-center justify-center font-sans">
        <div className="text-center space-y-3 animate-in fade-in duration-200">
          <Loader2 className="animate-spin text-[#1a5e35] dark:text-[#a2d45e] mx-auto" size={32} />
          <p className="text-[#556758] dark:text-slate-400 text-xs font-semibold tracking-wider uppercase">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] flex items-center justify-center font-sans">
        <div className="text-center space-y-4 max-w-sm p-6 bg-white dark:bg-[#0b1c14] rounded-3xl border border-[#e8efe9] dark:border-[#183a27] shadow-lg">
          <AlertCircle className="text-rose-500 mx-auto" size={44} />
          <h2 className="text-xl font-bold text-[#131f17] dark:text-white">Event Not Found</h2>
          <p className="text-[#556758] dark:text-slate-400 text-xs leading-relaxed">The event you are looking for does not exist or has been relocated.</p>
          <Link href="/events" className="inline-flex px-5 py-2.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-xs font-bold transition-all shadow-md">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const details = event.details || {};
  const time = details.time || 'Three-Day Residential Bootcamp (July 18 to 20, 2025)';
  const venue = details.venue || 'Agriculture Cooperative Staff Training Institute (ACSTI), Manvila, Thiruvananthapuram';
  const mode = details.mode || 'Residential Hands-on STEM Bootcamp';
  const closingDate = details.closingDate || 'State-wide Cohort Selection';
  const organizedBy = details.organizedBy || 'Centre for Learning Engineering & Sustainability Education in collaboration with State Institute of Educational Technology (SIET), Dept. of General Education, Govt. of Kerala';
  const chiefGuest = details.chiefGuest || "Sri. V. Sivankutty, Hon'ble Minister for Education, Govt. of Kerala";
  const inauguration = details.inauguration || "State-level inauguration by Sri. V. Sivankutty, Hon'ble Minister for Education, Govt. of Kerala";
  const aboutText = details.aboutText || 'The Centre for Learning Engineering and Sustainability Education at the University of Kerala collaborated with the State Institute of Educational Technology (SIET), functioning under the Department of General Education, Government of Kerala, successfully organized a three-day STEM camp from July 18 to 20, 2025 for 56 Gifted Students across Kerala.\n\nThe camp was conducted at the Agriculture Cooperative Staff Training Institute (ACSTI), located in Manvila, Thiruvananthapuram. The State level inauguration was done by Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala. (State Level Programme implemented among selected students from all educational districts of Kerala).';
  const resources = Array.isArray(details.resources) && details.resources.length > 0 ? details.resources : [];

  // Title Splitting for exact styling match ("Across Kerala" in italic electric blue)
  let mainTitle = event.title;
  let highlightTitle = "";
  if (event.title?.includes("Across Kerala")) {
    mainTitle = event.title.replace("Across Kerala", "").trim();
    highlightTitle = "Across Kerala";
  } else if (event.title?.includes(" - ")) {
    const parts = event.title.split(" - ");
    mainTitle = parts[0];
    highlightTitle = parts[1];
  }

  // 4 Default Highlights matching the mockup
  const highlightsData = [
    {
      icon: GraduationCap,
      title: '56 Gifted Students',
      desc: 'From across Kerala'
    },
    {
      icon: Lightbulb,
      title: '3 Days of Learning',
      desc: 'Hands-on STEM activities'
    },
    {
      icon: Users,
      title: 'Innovation & Exploration',
      desc: 'Projects, ideas and collaboration'
    },
    {
      icon: BookOpen,
      title: 'Expert Guidance',
      desc: 'Facilitated by educators and researchers'
    }
  ];

  // Key Speakers matching the mockup
  const speakersData = [
    {
      name: 'Sri. V. Sivankutty',
      role: "Hon'ble Minister for Education, Govt. of Kerala",
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/V_sivankutty.jpg/400px-V_sivankutty.jpg'
    },
    {
      name: 'Dr. Divya C. Senan',
      role: 'Director, CLESE \nAssociate Professor, University of Kerala',
      imageUrl: '/divya1.png'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 selection:bg-[#a2d45e]/30 pt-28 sm:pt-36 relative overflow-hidden transition-colors duration-300">

      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT & SPHERE */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img
          src={event.imageUrl || "/about/about1.png"}
          alt={event.title || "LEnSE Sustainability Sphere"}
          className="w-full h-full object-cover object-right-top transform-gpu transition-transform duration-1000 ease-out"
          onError={(e) => { e.currentTarget.src = "/about/about1.png"; }}
        />

        {/* Soft Organic Fade Masks into the Canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/90 dark:via-[#031008]/90 via-[38%] to-transparent to-[65%] w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/60 dark:via-[#031008]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] to-transparent" />
      </div>

      {/* Ambient background glows (matching homepage) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dbe9dd]/50 via-[#e4efe3]/30 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eef4ea]/50 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ============================================================ */}
        {/* A. DESKTOP VIEW (VISIBLE ON LARGE SCREENS ONLY) */}
        {/* ============================================================ */}
        <div className="hidden lg:block pb-14">

          {/* 1. HERO SECTION */}
          <div className="grid grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] sm:min-h-[560px]">

            {/* Left: Text & CTA */}
            <div className="col-span-7 xl:col-span-7 space-y-6 lg:pr-4 z-10">
              <div className="flex flex-wrap items-center gap-3">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-1.5 text-xs text-[#556758] dark:text-slate-400 font-medium">
                  <Link href="/" className="flex items-center gap-1 hover:text-[#1a5e35] dark:hover:text-[#a2d45e] transition-colors">
                    <Home size={13} className="text-[#1a5e35] dark:text-[#a2d45e]" />
                    <span>Home</span>
                  </Link>
                  <span>&gt;</span>
                  <Link href="/events" className="hover:text-[#1a5e35] dark:hover:text-[#a2d45e] transition-colors">
                    Events
                  </Link>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#0c1f15]/80 backdrop-blur-md border border-[#e8efe9] dark:border-[#1e422c] shadow-sm hover:border-[#1a5e35]/40 transition-colors duration-300">
                  <span className="text-[11px] font-bold tracking-[0.22em] text-[#455748] dark:text-[#a2d45e] uppercase">
                    {event.category || 'STEM CAMPS'}
                  </span>
                </div>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[4.2rem] font-normal text-[#131f17] dark:text-white leading-[1.06] tracking-tight font-serif">
                {mainTitle}
                {highlightTitle && (
                  <>
                    <br />
                    <span className="italic text-[#243a29] dark:text-[#a2d45e] font-serif font-normal">
                      {highlightTitle}
                    </span>
                  </>
                )}
              </h1>

              {event.subtitle && (
                <p className="font-serif italic text-base sm:text-lg text-[#283d2d] dark:text-slate-300">
                  {event.subtitle}
                </p>
              )}

              <p className="text-[#405245] dark:text-slate-300 text-[13.5px] leading-[1.72] max-w-[540px] font-normal line-clamp-3">
                {aboutText}
              </p>

              {/* Event Quick Details Pill Row */}
              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-[#354839] dark:text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#1a5e35] dark:text-[#a2d45e] shrink-0" strokeWidth={2} />
                  <span className="font-semibold text-[#131f17] dark:text-white">
                    {event.dateDay && event.dateMonth ? `${event.dateDay} ${event.dateMonth} ${event.dateYear}` : '18 July - 20 July 2025'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#1a5e35] dark:text-[#a2d45e] shrink-0" strokeWidth={2} />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-[#1a5e35] dark:text-[#a2d45e] shrink-0" strokeWidth={2} />
                  <span className="truncate max-w-[170px]">{mode}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(15,35,22,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437] hover:shadow-[0_16px_36px_rgba(15,35,22,0.45)]"
                >
                  <span>Register Now</span>
                  <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <ArrowRight size={10} className="text-white group-hover:text-[#11261a] group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </button>

                <button
                  onClick={handleAddToCalendar}
                  className="px-6 py-3.5 rounded-full bg-white/70 hover:bg-white dark:bg-[#0b1c14] dark:hover:bg-[#11261a] backdrop-blur-xl border border-white dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.04)] text-[#162d1f] dark:text-[#a2d45e] text-[11px] font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Calendar size={14} className="text-[#1a5e35] dark:text-[#a2d45e]" />
                  <span>Add to Calendar</span>
                </button>
              </div>
            </div>

            {/* Right: Transparent Crystal Glass "Established in 2024" Card */}
            <div className="col-span-5 xl:col-span-5 relative flex items-center justify-start lg:justify-center min-h-[340px] sm:min-h-[420px]">
              <div className="relative lg:ml-[-30px] xl:ml-[-60px] bg-gradient-to-br from-white/60 via-white/35 to-white/20 dark:from-[#0b1c14]/80 dark:via-[#08180f]/75 dark:to-[#040e08]/70 backdrop-blur-2xl p-6 sm:p-7 rounded-[2.2rem] border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),inset_2px_0_4px_rgba(255,255,255,0.8),0_25px_50px_-10px_rgba(0,30,15,0.25)] dark:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.5)] w-56 sm:w-64 z-20 group transition-all duration-500 hover:-translate-y-2 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_35px_70px_-10px_rgba(0,30,15,0.35)] cursor-pointer">
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/70 via-white/20 to-transparent dark:from-white/10 dark:via-transparent rounded-tl-[2.2rem] pointer-events-none" />
                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white/90 via-white/60 to-white/30 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,25,12,0.18)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center absolute -top-5 -right-5 text-[#122418] dark:text-[#a2d45e] z-30 transition-all duration-500 group-hover:scale-115 group-hover:rotate-12 group-hover:text-[#1a5e35] dark:group-hover:text-[#bbf07d] group-hover:from-white group-hover:to-[#e8f2e7] dark:group-hover:from-[#1b3e2a] dark:group-hover:to-[#10281b]">
                  <Sprout size={20} strokeWidth={1.75} />
                </div>
                <p className="text-[10px] font-bold text-[#354839] dark:text-[#a2d45e] uppercase tracking-[0.2em] mb-1.5 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none group-hover:tracking-[0.25em] transition-all duration-300">
                  {event.dateMonth ? `${event.dateMonth} Session` : 'Event Year'}
                </p>
                <h3 className="text-4xl sm:text-5xl font-serif text-[#0f1d13] dark:text-white mb-2.5 tracking-tight font-normal relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] dark:drop-shadow-none group-hover:scale-105 origin-left transition-transform duration-300">
                  {event.dateYear || '2024'}
                </h3>
                <p className="text-[11px] text-[#2c3d30] dark:text-slate-300 leading-relaxed font-medium mb-3 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                  {event.dateDay && event.dateMonth ? `${event.dateDay} ${event.dateMonth} ${event.dateYear}` : '18-20 July 2025'}<br />
                  <span className="text-[10.5px] opacity-80">{venue.split(',')[0]}</span>
                </p>
                <div className="w-5 h-[1.5px] bg-[#1d3527]/70 dark:bg-[#a2d45e] rounded-full mt-2 relative z-10 group-hover:w-10 transition-all duration-300" />
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* B. MOBILE VIEW (VISIBLE ON MOBILE / SCREENS < LG) */}
        {/* ============================================================ */}
        <div className="block lg:hidden pb-10">

          {/* 1. Mobile Hero */}
          <div className="pt-2 pb-2 relative">
            <div className="grid grid-cols-12 gap-2.5 items-start">
              {/* Left text */}
              <div className="col-span-7 space-y-2.5 z-10 pr-0.5">
                {/* Homepage-style Pill Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e8efe9] dark:border-[#1e422c] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:scale-105 transition-transform duration-300">
                  <Leaf size={11} className="fill-[#1b432a] text-[#1b432a] dark:fill-[#a2d45e] dark:text-[#a2d45e]" />
                  <span className="text-[9.5px] font-bold tracking-wider text-[#1b432a] dark:text-[#a2d45e] uppercase">
                    {event.category || 'LEARN • RESEARCH • IMPACT'}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-normal text-[#112318] dark:text-white leading-[1.1] tracking-tight font-serif">
                  {mainTitle}
                  {highlightTitle && (
                    <>
                      <br />
                      <span className="italic text-[#1a5e35] dark:text-[#a2d45e] font-serif font-normal">
                        {highlightTitle}
                      </span>
                    </>
                  )}
                </h1>

                <p className="text-[#556758] dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal line-clamp-3">
                  {aboutText}
                </p>

                <div className="pt-1">
                  <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="px-5 py-2.5 rounded-full bg-[#083a20] hover:bg-[#114427] text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg dark:bg-[#124225] dark:hover:bg-[#1a5c34] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Register Now</span>
                    <ArrowRight size={12} className="text-white group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Right Glass Card: Established in 2024 */}
              <div className="col-span-5 flex justify-end items-start pt-1 relative">
                <div className="relative bg-white/90 dark:bg-[#0b1c14]/85 backdrop-blur-2xl p-3.5 sm:p-4 rounded-2xl border border-[#e8efe9] dark:border-[#183a27] shadow-[0_8px_25px_rgba(0,0,0,0.05)] w-full max-w-[165px] z-20 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
                  {/* Signature Mint Circle Badge */}
                  <div className="w-8 h-8 rounded-full bg-[#eef4ef] dark:bg-[#11261a] border border-[#d6e2d8] dark:border-[#1e422c] shadow-sm flex items-center justify-center absolute -top-2.5 -right-2.5 text-[#174b2b] dark:text-[#a2d45e] z-30 group-hover:scale-115 group-hover:rotate-12 group-hover:bg-[#dce9de] dark:group-hover:bg-[#183d28] group-hover:text-[#1a5e35] dark:group-hover:text-[#bbf07d] transition-all duration-300">
                    <Sprout size={16} strokeWidth={2} />
                  </div>

                  <p className="text-[9px] font-bold text-[#1b432a] dark:text-[#a2d45e] uppercase tracking-wider mb-0.5 relative z-10 group-hover:tracking-widest transition-all duration-300">
                    {event.dateMonth ? `${event.dateMonth} Session` : 'Event Year'}
                  </p>

                  <h3 className="text-3xl font-serif text-[#112318] dark:text-white mb-0.5 tracking-tight font-bold relative z-10 group-hover:scale-105 origin-left transition-transform duration-300">
                    {event.dateYear || '2024'}
                  </h3>

                  <p className="text-[10px] text-[#556758] dark:text-slate-300 leading-snug font-medium mb-1 relative z-10">
                    {event.dateDay && event.dateMonth ? `${event.dateDay} ${event.dateMonth}` : 'Pioneering learning for a sustainable tomorrow.'}
                  </p>

                  <div className="w-5 h-[2px] bg-[#1a5e35] dark:bg-[#a2d45e] rounded-full mt-1.5 relative z-10 group-hover:w-8 transition-all duration-300" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. MAIN CONTENT AREA (Left Column Cards + Right Glance) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-16">

          {/* Left Column: About, Highlights & Speakers */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-8">

            {/* Card 1: About the Event */}
            <div className="bg-white/80 dark:bg-[#0b1c14]/85 backdrop-blur-md rounded-[2.2rem] border border-[#e8efe9] dark:border-[#183a27] shadow-[0_4px_25px_rgba(0,30,15,0.03)] p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e8efe9] dark:border-[#1e422c] text-[#1a5e35] dark:text-[#a2d45e] text-[10px] font-bold tracking-widest uppercase">
                  <BookOpen size={12} />
                  <span>ABOUT THE EVENT</span>
                </div>
                <div className="flex items-center gap-1 opacity-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a5e35] dark:bg-[#a2d45e] block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a5e35]/40 dark:bg-[#a2d45e]/40 block" />
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#131f17] dark:text-white mt-3 mb-4">
                About the Event
              </h2>

              <div className="text-[#405245] dark:text-slate-300 text-xs sm:text-[13.5px] leading-[1.8] space-y-3 whitespace-pre-line">
                <p>
                  The Centre for Learning Engineering and Sustainability Education at the University of Kerala collaborated with the State Institute of Educational Technology (SIET), functioning under the Department of General Education, Government of Kerala, successfully organized a three-day STEM camp from July 18 to 20, 2025 for 56 Gifted Students across Kerala.
                </p>
                {readMore ? (
                  <p className="animate-in fade-in duration-300">
                    The camp was conducted at the Agriculture Cooperative Staff Training Institute (ACSTI), Manvila, Thiruvananthapuram. The State level inauguration was done by Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala. (State Level Programme implemented among selected students from all educational districts of Kerala).
                  </p>
                ) : (
                  <p className="line-clamp-2">
                    The camp was conducted at the Agriculture Cooperative Staff Training Institute (ACSTI), Manvila, Thiruvananthapuram. The State level inauguration was done by Sri. V. Sivankutty, Hon’ble Minister for Education, Govt. of Kerala.
                  </p>
                )}
              </div>

              {/* Bottom Row: Read More Button + Italic Quote */}
              <div className="pt-6 mt-4 border-t border-[#e8efe9] dark:border-[#183a27]/60 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="px-5 py-2 rounded-full bg-white dark:bg-[#11261a] border border-[#e8efe9] dark:border-[#1e422c] text-[#1a5e35] dark:text-[#a2d45e] text-xs font-semibold shadow-xs hover:bg-[#eef4ef] dark:hover:bg-[#183d28] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{readMore ? 'Read Less' : 'Read More'}</span>
                  <ArrowDown size={13} className={`text-[#1a5e35] dark:text-[#a2d45e] transition-transform ${readMore ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex items-center gap-2.5 text-right ml-auto">
                  <span className="font-serif text-3xl text-[#1a5e35]/30 dark:text-[#a2d45e]/40 leading-none select-none">“</span>
                  <p className="font-serif italic text-[#405245] dark:text-slate-400 text-xs sm:text-[12.5px] leading-snug">
                    Empowering bright minds through hands-on learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Highlights Grid */}
            <div className="bg-white/80 dark:bg-[#0b1c14]/85 backdrop-blur-md rounded-[2.2rem] border border-[#e8efe9] dark:border-[#183a27] shadow-[0_4px_25px_rgba(0,30,15,0.03)] p-6 sm:p-8 relative">

              {/* Left Accent Dot Matrix */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden sm:flex gap-1">
                {[...Array(3)].map((_, col) => (
                  <div key={col} className="flex flex-col gap-1.5">
                    {[...Array(8)].map((_, row) => (
                      <span key={row} className="w-1 h-1 rounded-full bg-[#1a5e35] block" />
                    ))}
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e8efe9] dark:border-[#1e422c] text-[#1a5e35] dark:text-[#a2d45e] text-[10px] font-bold tracking-widest uppercase">
                <Star size={12} />
                <span>HIGHLIGHTS</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#131f17] dark:text-white mt-2 mb-6">
                Highlights
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {highlightsData.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-gradient-to-b from-white/90 to-[#f2f7f4]/90 dark:from-[#11261a]/60 dark:to-[#08180f]/40 rounded-2xl p-4 sm:p-5 border border-[#e8efe9] dark:border-[#183a27] hover:border-[#1a5e35]/40 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-200 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white dark:bg-[#11261a] shadow-xs border border-[#e8efe9] dark:border-[#1e422c] flex items-center justify-center text-[#1a5e35] dark:text-[#a2d45e] mb-3 group-hover:scale-110 transition-transform">
                        <ItemIcon size={20} strokeWidth={1.8} />
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#131f17] dark:text-white leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-[#556758] dark:text-slate-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 3: Key Speakers */}
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e8efe9] dark:border-[#1e422c] text-[#1a5e35] dark:text-[#a2d45e] text-[10px] font-bold tracking-widest uppercase mb-3">
                <Users size={12} />
                <span>KEY SPEAKERS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {speakersData.map((spk, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-3xl bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-md border border-[#e8efe9] dark:border-[#183a27] shadow-xs flex items-center justify-between gap-3.5 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white dark:border-[#183a27] shadow-sm shrink-0 bg-slate-100">
                        <img
                          src={spk.imageUrl}
                          referrerPolicy="no-referrer"
                          alt={spk.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (idx === 0) {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80";
                            } else {
                              e.currentTarget.src = "/divya1.png";
                            }
                          }}
                        />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs sm:text-[13.5px] font-bold text-[#131f17] dark:text-white leading-tight truncate">
                          {spk.name}
                        </h4>
                        <p className="text-[10.5px] sm:text-[11px] text-[#556758] dark:text-slate-400 mt-1 leading-snug whitespace-pre-line">
                          {spk.role}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-[#11261a] border border-[#e8efe9] dark:border-[#1e422c] text-[#1a5e35] dark:text-[#a2d45e] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#1a5e35] group-hover:text-white transition-all ml-1">
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Event at a Glance Sidebar */}
          <div className="lg:col-span-5 xl:col-span-5 relative">
            <div className="bg-white/90 dark:bg-[#0b1c14]/85 backdrop-blur-md rounded-[2.2rem] border border-[#e8efe9] dark:border-[#183a27] shadow-[0_10px_35px_rgba(0,30,15,0.05)] p-6 sm:p-8 space-y-5 sticky top-28">

              {/* Glance Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#eef4ef] dark:bg-[#11261a] border border-[#d6e2d8] dark:border-[#1e422c] text-[#1a5e35] dark:text-[#a2d45e] flex items-center justify-center shrink-0">
                    <Calendar size={18} strokeWidth={2} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#131f17] dark:text-white">
                    Event at a Glance
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a5e35] dark:bg-[#a2d45e] block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a5e35]/40 dark:bg-[#a2d45e]/40 block" />
                </div>
              </div>

              {/* Accent Indicator */}
              <div className="w-7 h-[2.5px] bg-[#1a5e35] dark:bg-[#a2d45e] rounded-full" />

              {/* Items Stack */}
              <div className="space-y-4 pt-1">
                {[
                  {
                    icon: Calendar,
                    label: 'Dates',
                    value: '18/07/2025 - 20/07/2025'
                  },
                  {
                    icon: Clock,
                    label: 'Time',
                    value: time
                  },
                  {
                    icon: MapPin,
                    label: 'Venue',
                    value: venue
                  },
                  {
                    icon: Users,
                    label: 'Mode',
                    value: mode
                  },
                  {
                    icon: Building,
                    label: 'Organized by',
                    value: organizedBy
                  },
                  {
                    icon: User,
                    label: 'Chief Guest',
                    value: chiefGuest
                  },
                  {
                    icon: Sparkles,
                    label: 'Inauguration',
                    value: inauguration
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3.5 items-start">
                    <div className="text-[#1a5e35] dark:text-[#a2d45e] shrink-0 mt-0.5">
                      <item.icon size={18} strokeWidth={1.8} />
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="text-[11.5px] font-bold text-[#131f17] dark:text-white mb-0.5">
                        {item.label}
                      </h4>
                      <p className="text-[12px] text-[#455748] dark:text-slate-300 font-medium leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Glance CTA */}
              <div className="pt-4 border-t border-[#e8efe9] dark:border-[#183a27]/60 space-y-2">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="w-full py-4 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(15,35,22,0.32)] hover:scale-[1.02] active:scale-98 transition-all cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]"
                >
                  <span>Register Now</span>
                  <ArrowRight size={14} strokeWidth={2.4} />
                </button>
                <p className="text-[10.5px] text-[#556758] dark:text-slate-400 text-center block font-medium pt-1">
                  Registration closes on {closingDate}
                </p>
              </div>

            </div>

            {/* Event Resources if present */}
            {resources.length > 0 && (
              <div className="bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-md rounded-[2rem] border border-[#e8efe9] dark:border-[#183a27] p-6 sm:p-7 mt-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#131f17] dark:text-white">
                  Event Resources
                </h3>
                <div className="space-y-2.5">
                  {resources.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.link && doc.link !== '#' ? doc.link : undefined}
                      target={doc.link && doc.link !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#eef4ef]/60 dark:bg-[#11261a]/60 border border-[#e8efe9] dark:border-[#183a27] hover:bg-[#eef4ef] dark:hover:bg-[#183d28] transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#11261a] flex items-center justify-center text-[#1a5e35] dark:text-[#a2d45e] shadow-xs shrink-0">
                          <Download size={16} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[12.5px] font-bold text-[#131f17] dark:text-white truncate">{doc.title}</h4>
                          <p className="text-[10.5px] text-[#556758] dark:text-slate-400">{doc.type}</p>
                        </div>
                      </div>
                      <ChevronRight size={15} className="text-[#556758] dark:text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Right Accent Dot Matrix */}
            <div className="absolute -right-4 -bottom-10 pointer-events-none opacity-20 hidden lg:flex gap-1.5">
              {[...Array(4)].map((_, col) => (
                <div key={col} className="flex flex-col gap-1.5">
                  {[...Array(10)].map((_, row) => (
                    <span key={row} className="w-1.5 h-1.5 rounded-full bg-[#1a5e35] block" />
                  ))}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. REGISTRATION MODAL */}
      {/* ============================================================ */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-[#031008]/70 backdrop-blur-sm"
            onClick={() => !isSubmitting && !isSuccess && setIsRegisterModalOpen(false)}
          />
          <div className="relative bg-white dark:bg-[#0b1c14] w-full max-w-md rounded-[2.2rem] shadow-2xl overflow-hidden border border-[#e8efe9] dark:border-[#183a27] animate-in zoom-in-95 duration-200 select-none">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-[#e8efe9] dark:border-[#183a27]">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#131f17] dark:text-white">Register for Event</h3>
                <p className="text-[11px] text-[#556758] dark:text-slate-400 mt-0.5">{event.title}</p>
              </div>
              {!isSubmitting && !isSuccess && (
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#eef4ef] dark:bg-[#11261a] text-[#556758] hover:text-[#131f17] dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#eef4ef] dark:bg-[#11261a] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1a5e35] dark:text-[#a2d45e]">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-[#131f17] dark:text-white">Registered Successfully!</h4>
                  <p className="text-xs text-[#556758] dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                    Thank you for registering. You will receive cohort updates and camp details via phone/email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {regError && (
                    <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle size={15} className="shrink-0" />
                      <span>{regError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#131f17] dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={registrationForm.name}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08180f] border border-[#e8efe9] dark:border-[#183a27] text-sm text-[#131f17] dark:text-white outline-none focus:border-[#1a5e35] focus:ring-1 focus:ring-[#1a5e35] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#131f17] dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 9876543210"
                        value={registrationForm.phone}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08180f] border border-[#e8efe9] dark:border-[#183a27] text-sm text-[#131f17] dark:text-white outline-none focus:border-[#1a5e35] focus:ring-1 focus:ring-[#1a5e35] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#131f17] dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Date of Birth
                      </label>
                      <input
                        required
                        type="date"
                        value={registrationForm.dob}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, dob: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08180f] border border-[#e8efe9] dark:border-[#183a27] text-sm text-[#131f17] dark:text-white outline-none focus:border-[#1a5e35] focus:ring-1 focus:ring-[#1a5e35] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#131f17] dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                      School / College Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Govt Model Higher Secondary School"
                      value={registrationForm.institution}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, institution: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#08180f] border border-[#e8efe9] dark:border-[#183a27] text-sm text-[#131f17] dark:text-white outline-none focus:border-[#1a5e35] focus:ring-1 focus:ring-[#1a5e35] transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_12px_28px_rgba(15,35,22,0.32)] hover:scale-[1.02] active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]"
                    >
                      {isSubmitting ? (
                        <><Loader2 size={16} className="animate-spin" /> Processing...</>
                      ) : (
                        <><CheckCircle2 size={16} /> Complete Registration</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
