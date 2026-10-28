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
  GraduationCap
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

  // Synchronously initialize state from memory cache for instant 0ms rendering
  const [event, setEvent] = useState(() => {
    if (typeof window === 'undefined') return null;
    const specific = getFromCache(`clese_event_${eventSlug}_cache`);
    if (specific && (specific.title || specific.id)) return specific;

    const allEvents = getFromCache('clese_events_cache');
    if (Array.isArray(allEvents)) {
      const match = allEvents.find(e => String(e.slug) === eventSlug || String(e.id) === eventSlug);
      if (match) return match;
    }
    return null;
  });

  const [loading, setLoading] = useState(() => !event);
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
      <div className="min-h-screen bg-[#f0f6ff] dark:bg-[#030712] flex items-center justify-center font-sans">
        <div className="text-center space-y-3 animate-in fade-in duration-200">
          <Loader2 className="animate-spin text-[#1d63ed] dark:text-sky-400 mx-auto" size={32} />
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold tracking-wider uppercase">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#f0f6ff] dark:bg-[#030712] flex items-center justify-center font-sans">
        <div className="text-center space-y-4 max-w-sm p-6 bg-white dark:bg-slate-900 rounded-3xl border border-blue-100 dark:border-white/10 shadow-lg">
          <AlertCircle className="text-red-500 mx-auto" size={44} />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Event Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">The event you are looking for does not exist or has been relocated.</p>
          <Link href="/events" className="inline-flex px-5 py-2.5 rounded-full bg-[#1d63ed] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md">
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
    <div className="min-h-screen bg-gradient-to-b from-[#f2f7ff] via-[#eaf2fc] to-[#f4f9ff] dark:from-[#060d1f] dark:via-[#09142b] dark:to-[#040814] text-slate-800 dark:text-slate-100 font-sans pb-24 pt-24 sm:pt-32 relative overflow-hidden transition-colors duration-300">

      {/* Atmospheric Background Wave Ribbons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        {/* Top-Right Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/20 via-sky-300/15 to-transparent rounded-full blur-3xl" />
        
        {/* Center Sweeping Fluid Ribbon */}
        <svg className="absolute top-[20%] right-[-5%] w-[800px] h-[800px] opacity-25 dark:opacity-10" viewBox="0 0 800 800" fill="none">
          <path d="M100 0 C400 200, 200 600, 800 500 L800 0 Z" fill="url(#heroWaveGrad)" />
          <defs>
            <linearGradient id="heroWaveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>

        {/* Bottom Sweeping Blue Waves */}
        <svg className="absolute bottom-0 left-0 right-0 w-full h-[300px] opacity-35 dark:opacity-15" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none">
          <path d="M0 160 C320 280, 720 80, 1440 200 L1440 320 L0 320 Z" fill="url(#bottomRibbon1)" />
          <path d="M0 220 C480 120, 960 290, 1440 180 L1440 320 L0 320 Z" fill="url(#bottomRibbon2)" />
          <defs>
            <linearGradient id="bottomRibbon1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1d63ed" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="bottomRibbon2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* ============================================================ */}
        {/* 1. HERO SECTION WITH VINTAGE OPEN BOOK & BOTANICAL ACCENTS */}
        {/* ============================================================ */}
        <div className="pt-2 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-5">

              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
                <Link href="/" className="flex items-center gap-1 hover:text-[#1d63ed] transition-colors">
                  <Home size={13} className="text-[#1d63ed]" />
                  <span>Home</span>
                </Link>
                <span className="text-slate-400">&gt;</span>
                <Link href="/events" className="hover:text-[#1d63ed] transition-colors">
                  Events
                </Link>
                <span className="text-slate-400">&gt;</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[240px] sm:max-w-md">
                  {event.title}
                </span>
              </div>

              {/* Category Pill Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/80 border border-blue-200/60 dark:border-blue-500/30 text-[#1d63ed] dark:text-sky-400 text-[10.5px] font-bold uppercase tracking-wider shadow-xs">
                <Sparkles size={12} className="text-[#1d63ed] dark:text-sky-400" />
                <span>{event.category || 'STEM CAMPS'}</span>
              </div>

              {/* Hero Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-serif font-normal text-slate-900 dark:text-white leading-[1.14] tracking-tight">
                  {mainTitle}
                </h1>
                {highlightTitle && (
                  <span className="font-serif italic text-3xl sm:text-4xl lg:text-[3.2rem] text-[#1d63ed] dark:text-sky-400 block mt-0.5 leading-[1.14]">
                    {highlightTitle}
                  </span>
                )}
              </div>

              {/* Subtitle */}
              {event.subtitle && (
                <p className="font-serif italic text-slate-700 dark:text-slate-300 text-base sm:text-lg font-normal leading-snug">
                  {event.subtitle}
                </p>
              )}

              {/* Summary Paragraph */}
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] leading-[1.75] max-w-xl font-normal line-clamp-3">
                {aboutText}
              </p>

              {/* Inline Metadata Row with Blue Icons */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#1d63ed] shrink-0" strokeWidth={2} />
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {event.dateDay && event.dateMonth ? `${event.dateDay} ${event.dateMonth} ${event.dateYear}` : '18 July - 20 July 2025'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#1d63ed] shrink-0" strokeWidth={2} />
                  <span className="truncate max-w-[190px] sm:max-w-xs">{venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-[#1d63ed] shrink-0" strokeWidth={2} />
                  <span className="truncate max-w-[190px] sm:max-w-xs">{mode}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#1d63ed] via-[#2467f5] to-[#38bdf8] hover:from-[#1855cc] hover:to-[#2ca5dd] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-[0_8px_22px_rgba(29,99,237,0.38)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight size={14} strokeWidth={2.4} />
                </button>

                <button
                  onClick={handleAddToCalendar}
                  className="px-6 py-3.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-blue-100/90 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white hover:text-[#1d63ed] text-xs font-semibold tracking-wide flex items-center gap-2 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Calendar size={15} className="text-[#1d63ed]" />
                  <span>Add to Calendar</span>
                </button>
              </div>

            </div>

            {/* Right Hero Image Card with Floating Glass Capsule */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Outer Organic Glowing Shell */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(26,109,255,0.2)] border border-white/80 dark:border-white/10 aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] w-full group">
                <img
                  src={event.imageUrl || "/events/events_book_plant.jpg"}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
                />

                {/* Subtle Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Frosted Pill Badge at Bottom-Right */}
                <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 bg-slate-950/65 backdrop-blur-md border border-white/20 rounded-full px-4.5 py-2.5 sm:px-5 sm:py-3 flex items-center gap-3 shadow-2xl text-white select-none">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
                    <BookOpen size={17} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-serif text-[12px] sm:text-[13px] leading-tight text-white font-medium">Ideas today.</span>
                    <span className="font-serif italic text-[12px] sm:text-[13px] leading-tight text-sky-200">A brighter tomorrow.</span>
                  </div>
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
            <div className="bg-white/80 dark:bg-slate-900/75 backdrop-blur-md rounded-[2.2rem] border border-blue-100/70 dark:border-white/10 shadow-[0_4px_25px_rgba(37,99,235,0.04)] p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/80 border border-blue-200/50 text-[#1d63ed] dark:text-sky-400 text-[10px] font-bold tracking-widest uppercase">
                  <BookOpen size={12} />
                  <span>ABOUT THE EVENT</span>
                </div>
                <div className="flex items-center gap-1 opacity-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-200 block" />
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white mt-3 mb-4">
                About the Event
              </h2>

              <div className="text-slate-600 dark:text-slate-300 text-xs sm:text-[13.5px] leading-[1.8] space-y-3 whitespace-pre-line">
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
              <div className="pt-6 mt-4 border-t border-blue-50/80 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-white/10 text-[#1d63ed] dark:text-sky-400 text-xs font-semibold shadow-xs hover:bg-blue-50 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{readMore ? 'Read Less' : 'Read More'}</span>
                  <ArrowDown size={13} className={`text-[#1d63ed] transition-transform ${readMore ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex items-center gap-2.5 text-right ml-auto">
                  <span className="font-serif text-3xl text-blue-300 dark:text-blue-500 leading-none select-none">“</span>
                  <p className="font-serif italic text-slate-500 dark:text-slate-400 text-xs sm:text-[12.5px] leading-snug">
                    Empowering bright minds through hands-on learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Highlights Grid */}
            <div className="bg-white/80 dark:bg-slate-900/75 backdrop-blur-md rounded-[2.2rem] border border-blue-100/70 dark:border-white/10 shadow-[0_4px_25px_rgba(37,99,235,0.04)] p-6 sm:p-8 relative">
              
              {/* Left Accent Dot Matrix */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden sm:flex gap-1">
                {[...Array(3)].map((_, col) => (
                  <div key={col} className="flex flex-col gap-1.5">
                    {[...Array(8)].map((_, row) => (
                      <span key={row} className="w-1 h-1 rounded-full bg-blue-600 block" />
                    ))}
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/80 border border-blue-200/50 text-[#1d63ed] dark:text-sky-400 text-[10px] font-bold tracking-widest uppercase">
                <Star size={12} />
                <span>HIGHLIGHTS</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-slate-900 dark:text-white mt-2 mb-6">
                Highlights
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {highlightsData.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-gradient-to-b from-[#f2f7ff]/90 to-[#eaf2fc]/90 dark:from-slate-800/60 dark:to-slate-800/30 rounded-2xl p-4 sm:p-5 border border-blue-100/60 dark:border-white/10 flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-200 group"
                    >
                      <div className="w-11 h-11 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-blue-50 dark:border-white/10 flex items-center justify-center text-[#1d63ed] dark:text-sky-400 mb-3 group-hover:scale-110 transition-transform">
                        <ItemIcon size={20} strokeWidth={1.8} />
                      </div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 3: Key Speakers */}
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 dark:bg-blue-950/80 border border-blue-200/50 text-[#1d63ed] dark:text-sky-400 text-[10px] font-bold tracking-widest uppercase mb-3">
                <Users size={12} />
                <span>KEY SPEAKERS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {speakersData.map((spk, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-3xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-md border border-blue-100/70 dark:border-white/10 shadow-xs flex items-center justify-between gap-3.5 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm shrink-0 bg-slate-100">
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
                        <h4 className="text-xs sm:text-[13.5px] font-bold text-slate-900 dark:text-white leading-tight truncate">
                          {spk.name}
                        </h4>
                        <p className="text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug whitespace-pre-line">
                          {spk.role}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-white/10 text-[#1d63ed] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#1d63ed] group-hover:text-white transition-all ml-1">
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Event at a Glance Sidebar */}
          <div className="lg:col-span-5 xl:col-span-5 relative">
            <div className="bg-white/90 dark:bg-slate-900/85 backdrop-blur-md rounded-[2.2rem] border border-blue-100/80 dark:border-white/10 shadow-[0_10px_35px_rgba(37,99,235,0.06)] p-6 sm:p-8 space-y-5 sticky top-28">

              {/* Glance Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200/60 dark:border-blue-500/30 text-[#1d63ed] dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Calendar size={18} strokeWidth={2} />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Event at a Glance
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-200 block" />
                </div>
              </div>

              {/* Accent Indicator */}
              <div className="w-7 h-[2.5px] bg-[#1d63ed] rounded-full" />

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
                    <div className="text-[#1d63ed] shrink-0 mt-0.5">
                      <item.icon size={18} strokeWidth={1.8} />
                    </div>
                    <div className="text-left min-w-0">
                      <h4 className="text-[11.5px] font-bold text-slate-900 dark:text-white mb-0.5">
                        {item.label}
                      </h4>
                      <p className="text-[12px] text-slate-600 dark:text-slate-300 font-medium leading-snug">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Glance CTA */}
              <div className="pt-4 border-t border-blue-50 dark:border-white/10 space-y-2">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#1d63ed] via-[#2467f5] to-[#38bdf8] hover:from-[#1855cc] hover:to-[#2ca5dd] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(37,99,235,0.38)] hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight size={14} strokeWidth={2.4} />
                </button>
                <p className="text-[10.5px] text-slate-400 text-center block font-medium pt-1">
                  Registration closes on {closingDate}
                </p>
              </div>

            </div>

            {/* Event Resources if present */}
            {resources.length > 0 && (
              <div className="bg-white/85 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-blue-100/70 dark:border-white/10 p-6 sm:p-7 mt-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white">
                  Event Resources
                </h3>
                <div className="space-y-2.5">
                  {resources.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.link && doc.link !== '#' ? doc.link : undefined}
                      target={doc.link && doc.link !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/50 dark:bg-slate-800/50 border border-blue-100/60 dark:border-white/10 hover:bg-blue-50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-[#1d63ed] shadow-xs shrink-0">
                          <Download size={16} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[12.5px] font-bold text-slate-900 dark:text-white truncate">{doc.title}</h4>
                          <p className="text-[10.5px] text-slate-400">{doc.type}</p>
                        </div>
                      </div>
                      <ChevronRight size={15} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
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
                    <span key={row} className="w-1.5 h-1.5 rounded-full bg-blue-600 block" />
                  ))}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. REGISTRATION MODAL WITH BLUE THEME */}
      {/* ============================================================ */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => !isSubmitting && !isSuccess && setIsRegisterModalOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.2rem] shadow-2xl overflow-hidden border border-blue-100 dark:border-white/10 animate-in zoom-in-95 duration-200 select-none">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-blue-50 dark:border-white/10">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">Register for Event</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{event.title}</p>
              </div>
              {!isSubmitting && !isSuccess && (
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-4 text-[#1d63ed]">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">Registered Successfully!</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
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
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={registrationForm.name}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-blue-100 dark:border-white/10 text-sm text-slate-900 dark:text-white outline-none focus:border-[#1d63ed] focus:ring-1 focus:ring-[#1d63ed] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 9876543210"
                        value={registrationForm.phone}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-blue-100 dark:border-white/10 text-sm text-slate-900 dark:text-white outline-none focus:border-[#1d63ed] focus:ring-1 focus:ring-[#1d63ed] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Date of Birth
                      </label>
                      <input
                        required
                        type="date"
                        value={registrationForm.dob}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, dob: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-blue-100 dark:border-white/10 text-sm text-slate-900 dark:text-white outline-none focus:border-[#1d63ed] focus:ring-1 focus:ring-[#1d63ed] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                      School / College Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Govt Model Higher Secondary School"
                      value={registrationForm.institution}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, institution: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-blue-100 dark:border-white/10 text-sm text-slate-900 dark:text-white outline-none focus:border-[#1d63ed] focus:ring-1 focus:ring-[#1d63ed] transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1d63ed] via-[#2467f5] to-[#38bdf8] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_rgba(29,99,237,0.3)] hover:scale-[1.02] active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
