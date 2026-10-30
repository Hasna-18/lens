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
  FlaskConical,
  Network,
  Briefcase,
  Monitor,
  Microscope,
  Mic,
  Projector
} from 'lucide-react';
import { getFromCache, setInCache } from '../../../lib/clientCache';

/* ---------- shared design tokens matching Home Page & About Page ---------- */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const BLUE = 'text-[#009ab1] dark:text-sky-400';

const Em = ({ children, light = false }) => (
  <em style={SERIF} className={`italic font-normal ${light ? 'text-[#009ab1] dark:text-sky-300' : BLUE}`}>{children}</em>
);

function Dots({ rows = 5, cols = 8, className = '' }) {
  return (
    <div className={`grid gap-2 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#009ab1]/45 dark:bg-sky-400/40" />
      ))}
    </div>
  );
}

const Swirl = ({ className = '' }) => (
  <div className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-[#009ab1]/25 via-sky-400/15 to-transparent blur-3xl ${className}`} />
);

/* Silky Ocean Streaks Background matching Home Hero & About */
function OceanWaves() {
  const colors = ['#ffffff', '#7dd3fc', '#009ab1', '#0284c7', '#bae6fd', '#007485'];
  const streaks = Array.from({ length: 40 }, (_, i) => ({
    d: `M -150 ${20 + i * 14} C 250 ${-80 + i * 12}, 650 ${240 - i * 3}, 1350 ${60 + i * 16}`,
    c: colors[(i * 5) % colors.length],
    w: 5 + ((i * 7) % 26),
    o: 0.22 + ((i * 13) % 45) / 100,
  }));
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full pointer-events-none select-none opacity-80 dark:opacity-30" fill="none">
      <defs>
        <linearGradient id="ocean-event-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0f8f9" />
          <stop offset="0.45" stopColor="#38bdf8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#009ab1" stopOpacity="0.55" />
        </linearGradient>
        <filter id="ocean-blur-event"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect width="1200" height="600" fill="url(#ocean-event-base)" />
      <g filter="url(#ocean-blur-event)">
        {streaks.map((s, i) => (
          <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} opacity={s.o} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

function SectionTag({ text, light = false, className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase ${
      light
        ? 'bg-white/10 text-white/90 border border-white/15'
        : 'bg-[#009ab1]/10 text-[#009ab1] dark:text-sky-400 border border-[#009ab1]/25 dark:border-sky-400/25'
    } ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] dark:bg-sky-400 animate-pulse" />
      {text}
    </div>
  );
}

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

  const renderIcon = (iconName, size = 20, className = '') => {
    const IconComponent = {
      'Star': Star, 'User': User, 'Users': Users, 'MapPin': MapPin, 'Clock': Clock,
      'Calendar': Calendar, 'Building': Building, 'Mic': Mic, 'Projector': Projector,
      'FlaskConical': FlaskConical, 'Network': Network, 'GraduationCap': GraduationCap,
      'Briefcase': Briefcase, 'Monitor': Monitor, 'Microscope': Microscope, 'Sparkles': Sparkles,
      'BookOpen': BookOpen, 'Lightbulb': Lightbulb
    }[iconName] || Star;
    return <IconComponent size={size} strokeWidth={1.8} className={className} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] dark:bg-[#030712] flex items-center justify-center font-sans">
        <div className="text-center space-y-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,154,177,0.12)] border border-[#009ab1]/20 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-[#009ab1]/10 flex items-center justify-center mx-auto text-[#009ab1]">
            <Loader2 className="animate-spin" size={28} />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold tracking-wide">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#f8faf9] dark:bg-[#030712] flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-5 max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,154,177,0.10)]">
          <div className="w-14 h-14 rounded-2xl bg-[#009ab1]/10 flex items-center justify-center mx-auto text-[#009ab1]">
            <AlertCircle size={28} />
          </div>
          <h2 style={SERIF} className="text-2xl font-normal text-slate-800 dark:text-white">Event Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">The event you are looking for does not exist or has been relocated.</p>
          <Link href="/events" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#009ab1] hover:bg-[#008296] text-white text-xs font-bold shadow-[0_8px_20px_rgba(0,154,177,0.35)] transition-all">
            <ArrowRight size={14} className="rotate-180" />
            <span>Return to Events</span>
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

  // Title Splitting for exact styling match
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

  // Highlights Data
  const defaultHighlights = [
    { icon: 'GraduationCap', title: '56 Gifted Students', desc: 'From across Kerala' },
    { icon: 'Lightbulb', title: '3 Days of Learning', desc: 'Hands-on STEM activities' },
    { icon: 'Users', title: 'Innovation & Exploration', desc: 'Projects, ideas and collaboration' },
    { icon: 'BookOpen', title: 'Expert Guidance', desc: 'Facilitated by educators and researchers' }
  ];
  const highlightsData = Array.isArray(details.highlights) && details.highlights.length > 0 ? details.highlights : defaultHighlights;

  // Key Speakers
  const defaultSpeakers = [
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
  const speakersData = Array.isArray(details.speakers) && details.speakers.length > 0 ? details.speakers : defaultSpeakers;

  return (
    <div className="min-h-screen bg-[#f8faf9] dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-28 pt-24 sm:pt-32 relative overflow-hidden selection:bg-[#009ab1]/25 transition-colors duration-300">

      {/* ============================================================ */}
      {/* 0. AMBIENT HOME THEME GLOWS & PATTERNS                      */}
      {/* ============================================================ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[55%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009ab1]/15 via-sky-400/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-sky-400/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* ============================================================ */}
      {/* 1. HERO SECTION (Matching About page hero & Home patterns)  */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden">

        {/* Silky Ocean Streaks Backdrop behind hero (matching About page) */}
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[68%] pointer-events-none z-0 opacity-40 dark:opacity-20"
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 60%)'
          }}
        >
          <OceanWaves />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8faf9] dark:from-[#030712] via-[#f8faf9]/60 dark:via-[#030712]/60 to-transparent" />
        </div>

        {/* Natural Environment Blend Container (Full Bleed Right with Ultra-Smooth Feathered Blend) */}
        {event.imageUrl && (
          <div 
            className="absolute top-0 right-0 h-full min-h-[520px] lg:h-[620px] xl:h-[670px] w-full lg:w-[68%] xl:w-[64%] pointer-events-none z-0 overflow-hidden select-none hidden lg:block transition-all duration-500"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, rgba(0,0,0,0.03) 24%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.76) 66%, rgba(0,0,0,0.95) 82%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, rgba(0,0,0,0.03) 24%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.76) 66%, rgba(0,0,0,0.95) 82%, black 100%)'
            }}
          >
            <img
              src={event.imageUrl}
              alt={event.title || "Event Poster"}
              className="w-full h-full object-cover object-left-center transition-all duration-300"
              onError={(e) => { e.currentTarget.src = "/events/e1.png"; }}
            />
            {/* Edge Fading layers to blend smoothly with canvas */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f8faf9] via-[#f8faf9]/70 via-[20%] to-transparent to-[70%] dark:from-[#030712] dark:via-[#030712]/70 w-full h-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#f8faf9] via-[#f8faf9]/85 via-[35%] to-transparent dark:from-[#030712] dark:via-[#030712]/85 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#f8faf9] dark:from-[#030712] to-transparent pointer-events-none" />
          </div>
        )}

        {/* Decorative ring + dots on the left edge (matching About page hero) */}
        <div className="hidden lg:block absolute -left-[270px] top-[22%] w-[320px] h-[320px] rounded-full border border-sky-400/40 pointer-events-none" />
        <div className="hidden lg:block absolute left-[80px] top-[60%] w-2.5 h-2.5 rounded-full bg-[#009ab1] pointer-events-none" />
        <Dots rows={8} cols={5} className="hidden lg:grid absolute left-3 bottom-16 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-2 pb-10 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[500px] sm:min-h-[560px]">

            {/* Left: Headline, Info & CTA */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 lg:pr-6 z-10">

              {/* Breadcrumb Navigation & Category */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <Link href="/" className="flex items-center gap-1 hover:text-[#009ab1] dark:hover:text-sky-400 transition-colors">
                    <Home size={13} className="text-[#009ab1] dark:text-sky-400" />
                    <span>Home</span>
                  </Link>
                  <span className="text-slate-300 dark:text-slate-600">&gt;</span>
                  <Link href="/events" className="hover:text-[#009ab1] dark:hover:text-sky-400 transition-colors">
                    Events
                  </Link>
                  <span className="text-slate-300 dark:text-slate-600">&gt;</span>
                  <span className="text-[#009ab1] dark:text-sky-400 font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">
                    {event.title}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#009ab1]/25 dark:border-[#009ab1]/30 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] animate-pulse" />
                  <span className="text-[10.5px] font-bold tracking-[0.22em] text-[#009ab1] dark:text-sky-400 uppercase">
                    {event.category || 'STEM CAMPS'}
                  </span>
                </div>
              </div>

              {/* Headline with Serif and Electric Cyan Accent */}
              <h1 style={SERIF} className="text-4xl sm:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-normal text-slate-900 dark:text-white leading-[1.08] tracking-tight">
                <span>{mainTitle}</span>
                {highlightTitle && (
                  <em className="block text-[#009ab1] dark:text-sky-400 font-normal italic mt-1.5 sm:mt-2">
                    {highlightTitle}
                  </em>
                )}
              </h1>

              {event.subtitle && (
                <p style={SERIF} className="italic text-base sm:text-lg text-[#009ab1] dark:text-sky-400">
                  {event.subtitle}
                </p>
              )}

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[14.5px] leading-[1.78] max-w-[540px] font-normal line-clamp-3">
                {aboutText}
              </p>

              {/* Event Quick Details Pill Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-5 pt-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#009ab1] dark:text-sky-400 shrink-0" strokeWidth={2} />
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {event.dateDay && event.dateMonth ? `${event.dateDay} ${event.dateMonth} ${event.dateYear}` : '18 July - 20 July 2025'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#009ab1] dark:text-sky-400 shrink-0" strokeWidth={2} />
                  <span className="truncate max-w-[200px] sm:max-w-xs">{venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={15} className="text-[#009ab1] dark:text-sky-400 shrink-0" strokeWidth={2} />
                  <span className="truncate max-w-[170px]">{mode}</span>
                </div>
              </div>

              {/* Action Buttons (About Page CTA Style) */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_26px_rgba(0,154,177,0.32)] hover:scale-[1.03] active:scale-95 cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  onClick={handleAddToCalendar}
                  className="px-7 py-3.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-white dark:border-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.06)] text-slate-700 dark:text-slate-200 hover:text-[#009ab1] dark:hover:text-sky-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer"
                >
                  <Calendar size={14} className="text-[#009ab1] dark:text-sky-400" />
                  <span>Add to Calendar</span>
                </button>
              </div>

            </div>

            {/* Right: Signature 3D Crystal Glass Card from About Page */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-[1.8rem] p-7 sm:p-8 bg-gradient-to-br from-white/85 via-sky-50/65 to-[#009ab1]/15 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-[#009ab1]/10 backdrop-blur-xl border border-white/90 dark:border-slate-800 shadow-[0_25px_60px_rgba(0,154,177,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition duration-300 group">
                <span className="absolute -top-3.5 -right-3.5 w-10 h-10 rounded-full bg-white/95 dark:bg-slate-900 border border-white dark:border-slate-800 text-[#009ab1] dark:text-sky-400 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all">
                  <Sparkles size={18} />
                </span>
                <p className="text-[10px] font-bold tracking-[0.22em] text-slate-500 dark:text-slate-400 uppercase mb-1">
                  {event.dateMonth ? `${event.dateMonth} SESSION` : 'UNIVERSITY OF KERALA'}
                </p>
                <p style={SERIF} className="text-6xl sm:text-[68px] text-slate-900 dark:text-white leading-none my-2 font-normal">
                  {event.dateYear || '2025'}
                </p>
                <div className="space-y-1.5 mt-3">
                  <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-2">
                    {event.title}
                  </p>
                  <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed truncate">
                    {venue}
                  </p>
                </div>
                <div className="w-8 h-[2px] bg-[#009ab1] dark:bg-sky-400 rounded-full mt-3 group-hover:w-14 transition-all duration-300" />
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT AREA (Left Column Cards + Right Glance)      */}
      {/* ============================================================ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-16">

          {/* Left Column: About, Highlights & Speakers */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-8">

            {/* Card 1: About the Event */}
            <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-[2.2rem] border border-slate-200/80 dark:border-slate-800 shadow-[0_12px_40px_rgba(0,154,177,0.06)] p-6 sm:p-8 relative overflow-hidden">
              <Dots className="absolute -top-8 -right-8 opacity-10" />
              <div className="flex items-center justify-between mb-2">
                <SectionTag text="ABOUT THE EVENT" />
                <div className="flex items-center gap-1 opacity-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] dark:bg-sky-400 block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]/40 dark:bg-sky-400/40 block" />
                </div>
              </div>

              <h2 style={SERIF} className="text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white mt-3 mb-4">
                About the Event
              </h2>

              <div className="text-slate-600 dark:text-slate-300 text-xs sm:text-[14px] leading-[1.8] space-y-3 whitespace-pre-line font-normal">
                <p>
                  {aboutText}
                </p>
                {readMore && (
                  <p className="animate-in fade-in duration-300 text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    The Centre for Learning Engineering and Sustainability Education (CLESE / LEnSE) at the University of Kerala fosters educational computing, scientific literacy, and human-centred sustainable innovation through experiential learning frameworks.
                  </p>
                )}
              </div>

              {/* Bottom Row: Read More Button + Italic Quote */}
              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-[#009ab1] dark:text-sky-400 text-xs font-semibold shadow-xs hover:bg-[#009ab1]/10 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{readMore ? 'Read Less' : 'Read More'}</span>
                  <ArrowDown size={13} className={`transition-transform ${readMore ? 'rotate-180' : ''}`} />
                </button>

                <div className="flex items-center gap-2.5 text-right ml-auto">
                  <span style={SERIF} className="text-3xl text-[#009ab1]/30 dark:text-sky-400/30 leading-none select-none">“</span>
                  <p style={SERIF} className="italic text-slate-500 dark:text-slate-400 text-xs sm:text-[13px] leading-snug">
                    Empowering bright minds through hands-on learning.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Highlights Grid */}
            <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-[2.2rem] border border-slate-200/80 dark:border-slate-800 shadow-[0_12px_40px_rgba(0,154,177,0.06)] p-6 sm:p-8 relative overflow-hidden">
              <Dots className="absolute -bottom-8 -left-8 opacity-10" />
              <div className="flex items-center justify-between mb-2">
                <SectionTag text="KEY HIGHLIGHTS" />
                <div className="flex items-center gap-1 opacity-50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] dark:bg-sky-400 block" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]/40 dark:bg-sky-400/40 block" />
                </div>
              </div>

              <h2 style={SERIF} className="text-2xl sm:text-3xl font-normal text-slate-900 dark:text-white mt-2 mb-6">
                Highlights
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {highlightsData.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white via-white/95 to-[#009ab1]/5 dark:from-slate-900/90 dark:to-slate-800/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 hover:border-[#009ab1]/50 hover:shadow-[0_12px_30px_rgba(0,154,177,0.1)] flex flex-col items-center text-center hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#009ab1]/10 dark:bg-sky-400/10 border border-[#009ab1]/20 dark:border-sky-400/20 text-[#009ab1] dark:text-sky-400 shadow-xs flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-[#009ab1] group-hover:text-white transition-all">
                      {renderIcon(item.icon, 20)}
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Key Speakers */}
            <div className="relative">
              <div className="mb-4">
                <SectionTag text="DISTINGUISHED SPEAKERS" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {speakersData.map((spk, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-[2rem] bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-[#009ab1]/40 hover:shadow-[0_12px_30px_rgba(0,154,177,0.1)] flex items-center justify-between gap-3.5 transition-all group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm shrink-0 bg-slate-100 dark:bg-slate-800">
                        <img
                          src={spk.imageUrl}
                          referrerPolicy="no-referrer"
                          alt={spk.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
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
                        <h4 className="text-xs sm:text-[14px] font-bold text-slate-900 dark:text-white leading-tight truncate">
                          {spk.name}
                        </h4>
                        <p className="text-[10.5px] sm:text-[11px] text-[#009ab1] dark:text-sky-400 font-semibold mt-0.5 uppercase tracking-wide">
                          {spk.role?.split('\n')[0]}
                        </p>
                        {spk.role?.includes('\n') && (
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug truncate mt-0.5">
                            {spk.role.split('\n')[1]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[#009ab1] dark:text-sky-400 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#009ab1] group-hover:text-white transition-all ml-1">
                      <ArrowRight size={13} strokeWidth={2.2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Event at a Glance Sidebar */}
          <div className="lg:col-span-5 xl:col-span-5 relative">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.2rem] border border-slate-200/80 dark:border-slate-800 shadow-[0_15px_45px_rgba(0,154,177,0.08)] p-6 sm:p-8 space-y-5 sticky top-28 overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#009ab1] via-[#14b4cb] to-[#38bdf8] -mx-8 -mt-8 mb-5" />

              {/* Glance Header */}
              <div className="flex items-center justify-between">
                <div>
                  <SectionTag text="QUICK FACTS" />
                  <h3 style={SERIF} className="text-xl sm:text-2xl font-normal text-slate-900 dark:text-white mt-1">
                    Event at a Glance
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#009ab1]/10 text-[#009ab1] dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Calendar size={18} strokeWidth={2} />
                </div>
              </div>

              {/* Items Stack */}
              <div className="space-y-4 pt-2">
                {[
                  {
                    icon: Calendar,
                    label: 'Dates',
                    value: event.dateDay && event.dateMonth ? formatDateDDMMYYYY(event.dateDay, event.dateMonth, event.dateYear) : '18/07/2025 - 20/07/2025'
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
                    <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 text-[#009ab1] dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={16} strokeWidth={1.8} />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-0.5">
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
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  onClick={() => setIsRegisterModalOpen(true)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(0,154,177,0.32)] hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
                >
                  <span>Register Now</span>
                  <ArrowRight size={14} strokeWidth={2.4} />
                </button>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 text-center block font-medium pt-1">
                  Registration closes on: <span className="text-[#009ab1] dark:text-sky-400 font-bold">{closingDate}</span>
                </p>
              </div>

            </div>

            {/* Event Resources if present */}
            {resources.length > 0 && (
              <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 dark:border-slate-800 p-6 sm:p-7 mt-6 space-y-4 shadow-[0_10px_35px_rgba(0,154,177,0.06)]">
                <div className="flex items-center justify-between">
                  <SectionTag text="DOWNLOADS" />
                  <h3 style={SERIF} className="text-lg font-normal text-slate-900 dark:text-white">
                    Event Resources
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {resources.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.link && doc.link !== '#' ? doc.link : undefined}
                      target={doc.link && doc.link !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[#009ab1]/5 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:border-[#009ab1]/50 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-[#009ab1] dark:text-sky-400 shadow-xs shrink-0">
                          <Download size={16} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[12.5px] font-bold text-slate-900 dark:text-white truncate">{doc.title}</h4>
                          <p className="text-[10.5px] text-slate-500 dark:text-slate-400">{doc.type}</p>
                        </div>
                      </div>
                      <ChevronRight size={15} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#009ab1] transition-all shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. REGISTRATION MODAL                                       */}
      {/* ============================================================ */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => !isSubmitting && !isSuccess && setIsRegisterModalOpen(false)}
          />
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.2rem] shadow-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 animate-in zoom-in-95 duration-200 select-none">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 style={SERIF} className="text-xl font-normal text-slate-900 dark:text-white">Register for Event</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{event.title}</p>
              </div>
              {!isSubmitting && !isSuccess && (
                <button
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-[#009ab1]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#009ab1] dark:text-sky-400">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 style={SERIF} className="text-2xl font-normal text-slate-900 dark:text-white">Registered Successfully!</h4>
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_12px_28px_rgba(0,154,177,0.32)] hover:scale-[1.02] active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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