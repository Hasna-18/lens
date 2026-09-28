'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  Calendar,
  Clock,
  MapPin,
  Users,
  CalendarPlus,
  User,
  Projector,
  FlaskConical,
  Network,
  GraduationCap,
  Briefcase,
  Monitor,
  Building,
  Microscope,
  Sparkles,
  Download,
  Mail,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Star,
  Mic,
  X,
  AlertCircle
} from 'lucide-react';

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
  const resolvedParams = params && typeof params.then === 'function' ? use(params) : params;
  const eventSlug = String(resolvedParams?.slug || resolvedParams?.id || '1');

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
      const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const mIdx = MONTHS.indexOf(String(event.dateMonth).toUpperCase().trim());
      let mm = '01';
      if (mIdx !== -1) mm = String(mIdx + 1).padStart(2, '0');
      
      const dNum = parseInt(String(event.dateDay).replace(/[^\d]/g, ''), 10);
      const dd = isNaN(dNum) ? '01' : String(dNum).padStart(2, '0');
      
      const yNum = parseInt(String(event.dateYear).replace(/[^\d]/g, ''), 10);
      const yyyy = isNaN(yNum) ? '2025' : String(yNum);
      
      const dateStr = `${yyyy}${mm}${dd}`;
      
      const url = new URL('https://calendar.google.com/calendar/render');
      url.searchParams.append('action', 'TEMPLATE');
      url.searchParams.append('text', event.title || 'Event');
      url.searchParams.append('details', event.subtitle || '');
      url.searchParams.append('location', event.details?.venue !== 'TBA' ? (event.details?.venue || '') : '');
      url.searchParams.append('dates', `${dateStr}/${dateStr}`);
      
      window.open(url.toString(), '_blank');
    } catch (err) {
      console.error('Error generating calendar link:', err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchEventData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/events/${encodeURIComponent(eventSlug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && isMounted) {
            setEvent(data);
            setError(null);
          }
        } else {
          if (isMounted) setError('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event from database:', err);
        if (isMounted) setError('Error connecting to database');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchEventData();
    return () => { isMounted = false; };
  }, [eventSlug]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  // Helper to safely render dynamic icons
  const renderIcon = (iconName, size = 22, className = "") => {
    const IconComponent = {
      'Star': Star, 'User': User, 'Users': Users, 'MapPin': MapPin, 'Clock': Clock,
      'Calendar': Calendar, 'Building': Building, 'Mic': Mic, 'Projector': Projector,
      'FlaskConical': FlaskConical, 'Network': Network, 'GraduationCap': GraduationCap,
      'Briefcase': Briefcase, 'Monitor': Monitor, 'Microscope': Microscope
    }[iconName] || Star;
    return <IconComponent size={size} strokeWidth={1.5} className={className} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9faf7] dark:bg-[#031008] flex items-center justify-center font-outfit">
        <div className="text-center space-y-3">
          <Loader2 className="animate-spin text-[#2d5a3c] dark:text-[#a2d45e] mx-auto" size={32} />
          <p className="text-[#445548] dark:text-slate-400 text-xs font-medium tracking-wide">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#f9faf7] dark:bg-[#031008] flex items-center justify-center font-outfit">
        <div className="text-center space-y-4 max-w-sm">
          <AlertCircle className="text-red-500 mx-auto" size={48} />
          <h2 className="text-xl font-bold text-[#19241c] dark:text-white">Event Not Found</h2>
          <p className="text-[#445548] dark:text-slate-400 text-sm">The event you are looking for does not exist or has been removed.</p>
          <Link href="/events" className="inline-flex px-5 py-2.5 rounded-full bg-[#1b3726] hover:bg-[#234631] text-white text-xs font-bold transition-colors">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const details = event.details || {};
  
  // Safe defaults if details are completely empty
  const time = details.time || 'TBA';
  const venue = details.venue || 'TBA';
  const mode = details.mode || 'TBA';
  const closingDate = details.closingDate || 'TBA';
  const organizedBy = details.organizedBy || 'TBA';
  const chiefGuest = details.chiefGuest || 'TBA';
  const inauguration = details.inauguration || 'TBA';
  const aboutText = details.aboutText || 'Details coming soon.';
  const highlights = Array.isArray(details.highlights) && details.highlights.length > 0 ? details.highlights : [];
  const speakers = Array.isArray(details.speakers) && details.speakers.length > 0 ? details.speakers : [];
  const resources = Array.isArray(details.resources) && details.resources.length > 0 ? details.resources : [];

  const defaultHeroSettings = {
    objectPosition: 'left center',
    scale: 100,
    opacity: 100,
    widthPercent: 55,
    showOnMobile: false
  };

  const heroSettings = {
    ...defaultHeroSettings,
    ...(details.heroSettings || {})
  };

  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dbe9dd]/50 via-[#e4efe3]/30 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eef4ea]/50 to-transparent blur-3xl rounded-full" />
      </div>

      {/* ============================================================ */}
      {/* 1. HERO SECTION WITH BLENDED IMAGE */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden">
        
        {/* Natural Environment Blend Container (Full Bleed Right) */}
        <div 
          className="absolute top-0 right-0 h-full min-h-[520px] lg:h-[620px] xl:h-[670px] pointer-events-none z-0 overflow-hidden select-none hidden lg:block rounded-l-[3rem] transition-all duration-300"
          style={{ width: `${heroSettings.widthPercent}%` }}
        >
          <img
            src={event.imageUrl || "/events/conference.jpg"}
            alt={event.title || "Event Image"}
            className="w-full h-full object-cover"
            style={{
              objectPosition: heroSettings.objectPosition,
              transform: `scale(${heroSettings.scale / 100})`,
              opacity: heroSettings.opacity / 100,
              transition: 'all 0.2s ease-out'
            }}
            onError={(e) => { e.currentTarget.src = "/events/conference.jpg"; }}
          />
          {/* Soft Organic Fade Masks */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/90 dark:via-[#031008]/90 via-[15%] to-transparent to-[50%] w-full h-full pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fcfdfa] dark:from-[#031008] to-transparent pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Mobile View Hero Banner (when showOnMobile is enabled) */}
          {heroSettings.showOnMobile && (
            <div className="lg:hidden w-full h-52 sm:h-64 rounded-3xl overflow-hidden mb-5 border border-slate-200 dark:border-slate-800 shadow-sm relative pt-4">
              <img
                src={event.imageUrl || "/events/conference.jpg"}
                alt={event.title}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: heroSettings.objectPosition,
                  transform: `scale(${heroSettings.scale / 100})`,
                  opacity: heroSettings.opacity / 100
                }}
                onError={(e) => { e.currentTarget.src = "/events/conference.jpg"; }}
              />
            </div>
          )}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 min-h-[500px] lg:min-h-[600px] items-center pb-8 lg:pb-0">

          <div className="lg:col-span-8 space-y-6 lg:pr-8 pt-4">
            
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400">
              <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <Link href="/events" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Events</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">{event.title}</span>
            </div>

            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaf1e4] dark:bg-[#11261a] border border-[#d2e0d3] dark:border-[#1e422c] text-[#2d5a3c] dark:text-[#a2d45e] text-[10.5px] font-bold uppercase tracking-widest shadow-xs">
              <Sparkles size={13} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
              <span>{event.category || 'EVENT'}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-normal text-[#131f17] dark:text-white leading-[1.12] tracking-tight font-serif max-w-2xl">
              {event.title}
            </h1>

            {event.subtitle && (
              <p className="text-xl sm:text-2xl font-serif italic text-[#2d5a3c] dark:text-[#a2d45e]">
                {event.subtitle}
              </p>
            )}

            {/* Truncated abstract for hero if aboutText is long */}
            <p className="text-[#405245] dark:text-slate-300 text-sm leading-[1.7] max-w-xl font-normal line-clamp-3">
              {aboutText}
            </p>

            {/* Clean Inline Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#526656] dark:text-slate-300 font-medium pt-2 max-w-xl">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                <span className="font-semibold text-[#19241c] dark:text-white">
                  {formatDateDDMMYYYY(event.dateDay, event.dateMonth, event.dateYear)}
                </span>
              </div>
              <span className="text-[#c2d3c5] dark:text-slate-600">•</span>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                <span>{time}</span>
              </div>
              <span className="text-[#c2d3c5] dark:text-slate-600">•</span>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                <span className="truncate max-w-[160px] sm:max-w-xs">{venue}</span>
              </div>
              <span className="text-[#c2d3c5] dark:text-slate-600">•</span>
              <div className="flex items-center gap-2">
                <Users size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                <span>{mode}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={() => setIsRegisterModalOpen(true)}
                className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11.5px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_8px_20px_rgba(15,35,22,0.25)] hover:scale-105 active:scale-95 group dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437] cursor-pointer"
              >
                <span>Register Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={handleAddToCalendar}
                className="px-6 py-3.5 rounded-full bg-white/80 dark:bg-[#0b1c14]/80 backdrop-blur-sm border border-[#c1d1c4] dark:border-[#183a27] hover:bg-[#f3f6f1] dark:hover:bg-[#11261a] text-[#1b3726] dark:text-[#a2d45e] text-[11.5px] font-bold tracking-wider flex items-center gap-2.5 transition-all duration-300 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Add to Calendar</span>
                <CalendarPlus size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
              </button>
            </div>

          </div>
        </div>
      </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d2e0d3] dark:via-[#183a27] to-transparent opacity-80" />
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT AREA (Two Columns) */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-16">

            <section>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#122016] dark:text-white mb-5">About the Event</h2>
              <div className="space-y-4 text-[#445548] dark:text-slate-300 text-sm leading-[1.8] whitespace-pre-line">
                {aboutText}
              </div>
            </section>

            {highlights.length > 0 && (
              <section className="bg-white dark:bg-[#0b1c14] rounded-[2rem] p-8 border border-[#e8efe9] dark:border-[#183a27] shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <h3 className="text-xl font-serif text-[#122016] dark:text-white mb-8 text-center sm:text-left">Highlights</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-4 divide-y-0 sm:divide-y-0 sm:divide-x divide-[#e8efe9] dark:divide-[#183a27]">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center px-2 group">
                      <div className="w-12 h-12 rounded-2xl bg-[#f5f8f3] dark:bg-[#11261a] border border-[#e4ebe5] dark:border-[#1e422c] flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                        {renderIcon(item.icon, 22)}
                      </div>
                      <h4 className="text-[12px] font-bold text-[#19241c] dark:text-white leading-tight mb-2">{item.title}</h4>
                      <p className="text-[11px] text-[#637667] dark:text-slate-400 leading-snug whitespace-pre-line">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {speakers.length > 0 && (
              <section>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#122016] dark:text-white mb-6">Key Speakers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {speakers.map((spk, idx) => (
                    <div key={idx} className="flex items-center gap-5 p-5 rounded-[1.8rem] bg-white dark:bg-[#0b1c14] border border-[#e8efe9] dark:border-[#183a27] shadow-[0_2px_15px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform duration-300">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 dark:bg-[#05110a] shrink-0 border-2 border-white dark:border-[#183a27] shadow-sm">
                        <img src={spk.imageUrl} alt={spk.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/150?u=' + idx; }} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-[16px] font-bold text-[#19241c] dark:text-white">{spk.name}</h4>
                        </div>
                        <span className="inline-block px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] mb-1">
                          {spk.role}
                        </span>
                        <p className="text-[12px] text-[#556758] dark:text-slate-300 font-medium leading-snug">{spk.organization}</p>
                        <p className="text-[11px] text-[#6c7d70] dark:text-slate-400 leading-tight pt-1 whitespace-pre-line">{spk.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-8">

            <div className="bg-white dark:bg-[#0b1c14] rounded-[2rem] border border-[#e8efe9] dark:border-[#183a27] shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] overflow-hidden">
              <div className="px-7 pt-7 pb-4">
                <h3 className="text-xl font-serif text-[#122016] dark:text-white">Event at a Glance</h3>
              </div>

              <div className="px-7 pb-7 space-y-5">
                {[
                  { icon: Calendar, label: 'Dates', value: formatDateDDMMYYYY(event.dateDay, event.dateMonth, event.dateYear) },
                  { icon: Clock, label: 'Time', value: time },
                  { icon: MapPin, label: 'Venue', value: venue },
                  { icon: Users, label: 'Mode', value: mode },
                  { icon: Building, label: 'Organized by', value: organizedBy },
                  { icon: User, label: 'Chief Guest', value: chiefGuest },
                  { icon: Sparkles, label: 'Inauguration', value: inauguration },
                ].map((item, idx) => (
                  item.value && item.value !== 'TBA' && (
                    <div key={idx} className="flex gap-4">
                      <div className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0 mt-0.5">
                        <item.icon size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-[11.5px] font-bold text-[#19241c] dark:text-white mb-0.5">{item.label}</h4>
                        <p className="text-[12px] text-[#556758] dark:text-slate-300 whitespace-pre-line leading-snug">{item.value}</p>
                      </div>
                    </div>
                  )
                ))}

                <div className="pt-4 border-t border-[#f0f4f1] dark:border-[#183a27]">
                  <button 
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="w-full py-4 rounded-full bg-[#1b3726] dark:bg-[#154628] hover:bg-[#234631] dark:hover:bg-[#1c5c34] text-white text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_rgba(27,55,38,0.2)] cursor-pointer"
                  >
                    <span>Register Now</span>
                    <ArrowRight size={14} />
                  </button>
                  <p className="text-[10px] text-center text-[#6c7d70] dark:text-slate-400 mt-3 font-medium">
                    Registration closes on {closingDate}
                  </p>
                </div>
              </div>
            </div>

            {resources.length > 0 && (
              <div className="bg-[#f2f6f0] dark:bg-[#0b1c14] rounded-[2rem] border border-[#e4ede6] dark:border-[#183a27] p-7">
                <h3 className="text-xl font-serif text-[#122016] dark:text-white mb-5">Event Resources</h3>

                <div className="space-y-3">
                  {resources.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.link && doc.link !== '#' ? doc.link : undefined}
                      target={doc.link && doc.link !== '#' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      download={doc.link && doc.link !== '#' ? true : undefined}
                      className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#11261a] border border-[#e4ede6] dark:border-[#1e422c] hover:border-[#c9dacd] hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f4f7f2] dark:bg-[#163323] flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e]">
                          <Download size={18} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="text-[13px] font-bold text-[#19241c] dark:text-white">{doc.title}</h4>
                          <p className="text-[11px] text-[#6c7d70] dark:text-slate-400">{doc.type}</p>
                        </div>
                      </div>
                      <div className="text-[#a4b6aa] group-hover:text-[#2d5a3c] dark:group-hover:text-[#a2d45e] transition-colors">
                        <Download size={16} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => !isSubmitting && !isSuccess && setIsRegisterModalOpen(false)} />
          <div className="relative bg-white dark:bg-[#0b1c14] w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-[#e8efe9] dark:border-[#183a27] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-[#f0f4f1] dark:border-[#183a27]">
              <h3 className="text-xl font-serif font-bold text-[#122016] dark:text-white">Register for Event</h3>
              {!isSubmitting && !isSuccess && (
                <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer">
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-[#19241c] dark:text-white">Registered Successfully!</h4>
                  <p className="text-sm text-[#556758] dark:text-slate-400">Thank you for registering. We look forward to seeing you at the event.</p>
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
                    <label className="block text-xs font-bold text-[#445548] dark:text-slate-300 mb-1.5 uppercase tracking-wide">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={registrationForm.name}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9faf7] dark:bg-[#05110a] border border-[#e8efe9] dark:border-[#183a27] text-sm text-[#19241c] dark:text-white outline-none focus:border-[#2d5a3c] focus:ring-1 focus:ring-[#2d5a3c] transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#445548] dark:text-slate-300 mb-1.5 uppercase tracking-wide">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={registrationForm.phone}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#f9faf7] dark:bg-[#05110a] border border-[#e8efe9] dark:border-[#183a27] text-sm text-[#19241c] dark:text-white outline-none focus:border-[#2d5a3c] focus:ring-1 focus:ring-[#2d5a3c] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#445548] dark:text-slate-300 mb-1.5 uppercase tracking-wide">Date of Birth</label>
                      <input
                        required
                        type="date"
                        value={registrationForm.dob}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, dob: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#f9faf7] dark:bg-[#05110a] border border-[#e8efe9] dark:border-[#183a27] text-sm text-[#19241c] dark:text-white outline-none focus:border-[#2d5a3c] focus:ring-1 focus:ring-[#2d5a3c] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#445548] dark:text-slate-300 mb-1.5 uppercase tracking-wide">College / School Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. University of Science (Enter NA if none)"
                      value={registrationForm.institution}
                      onChange={(e) => setRegistrationForm({ ...registrationForm, institution: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#f9faf7] dark:bg-[#05110a] border border-[#e8efe9] dark:border-[#183a27] text-sm text-[#19241c] dark:text-white outline-none focus:border-[#2d5a3c] focus:ring-1 focus:ring-[#2d5a3c] transition-all"
                    />
                    <p className="text-[10px] text-[#6c7d70] mt-1">If you are a student, please provide your institution's name. Otherwise, enter NA.</p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#1b3726] hover:bg-[#234631] dark:bg-[#154628] dark:hover:bg-[#1c5c34] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
