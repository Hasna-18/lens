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
  Mic
} from 'lucide-react';

export default function EventDetailPage({ params }) {
  const resolvedParams = params && typeof params.then === 'function' ? use(params) : params;
  const eventSlug = String(resolvedParams?.slug || resolvedParams?.id || '1');

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
    <div className="min-h-screen bg-[#f9faf7] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden transition-colors duration-300">

      {/* ============================================================ */}
      {/* 1. HERO SECTION WITH IMAGE */}
      {/* ============================================================ */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div 
          className="absolute top-0 right-0 h-full min-h-[500px] lg:h-[600px] xl:h-[650px] pointer-events-none z-0 rounded-l-[3rem] overflow-hidden hidden lg:block transition-all duration-300"
          style={{ width: `${heroSettings.widthPercent}%` }}
        >
          <img
            src={event.imageUrl}
            alt="Event Background"
            className="w-full h-full object-cover transition-all duration-300"
            style={{
              objectPosition: heroSettings.objectPosition,
              transform: `scale(${heroSettings.scale / 100})`,
              opacity: heroSettings.opacity / 100
            }}
            onError={(e) => { e.currentTarget.src = "/events/conference.jpg"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f9faf7] dark:from-[#031008] via-[#f9faf7]/90 dark:via-[#031008]/90 via-[15%] to-transparent to-[50%]" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#f9faf7] dark:from-[#031008] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f9faf7] dark:from-[#031008] to-transparent" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 min-h-[500px] lg:min-h-[600px] xl:min-h-[650px] items-center pb-12 lg:pb-0">

          <div className="lg:col-span-7 space-y-6 lg:pr-10 pt-4">
            
            {/* Mobile Banner (if enabled in heroSettings) */}
            {heroSettings.showOnMobile && (
              <div className="lg:hidden w-full h-52 sm:h-64 rounded-3xl overflow-hidden mb-6 border border-[#d2e0d3] dark:border-[#183a27] shadow-xs relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: heroSettings.objectPosition,
                    transform: `scale(${heroSettings.scale / 100})`,
                    opacity: heroSettings.opacity / 100
                  }}
                  onError={(e) => { e.currentTarget.src = "/events/e1.png"; }}
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400">
              <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <Link href="/events" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Events</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">{event.title}</span>
            </div>

            <div className="inline-flex px-3 py-1 rounded-md bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] text-[10.5px] font-bold uppercase tracking-widest">
              {event.category}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-normal text-[#131f17] dark:text-white leading-[1.1] tracking-tight font-serif max-w-2xl">
              {event.title}
            </h1>

            <p className="text-xl sm:text-2xl font-serif italic text-[#2d5a3c] dark:text-[#a2d45e]">
              {event.subtitle}
            </p>

            {/* Truncated abstract for hero if aboutText is long */}
            <p className="text-[#405245] dark:text-slate-300 text-sm leading-[1.7] max-w-xl font-normal line-clamp-3">
              {aboutText}
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 pt-2 pb-4">
              <div className="flex items-center gap-3 bg-white/70 dark:bg-[#0b1c14]/80 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/60 dark:border-[#183a27] shadow-xs">
                <div className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0"><Calendar size={18} /></div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-[#19241c] dark:text-white">{event.dateDay}</div>
                  <div className="text-[10px] sm:text-[11px] text-[#556758] dark:text-slate-400 font-medium">{event.dateMonth} {event.dateYear}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/70 dark:bg-[#0b1c14]/80 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/60 dark:border-[#183a27] shadow-xs">
                <div className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0"><Clock size={18} /></div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-[#19241c] dark:text-white">{time.split(' ')[0]}</div>
                  <div className="text-[10px] sm:text-[11px] text-[#556758] dark:text-slate-400 font-medium">{time.split(' ').slice(1).join(' ')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/70 dark:bg-[#0b1c14]/80 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/60 dark:border-[#183a27] shadow-xs">
                <div className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0"><MapPin size={18} /></div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-[#19241c] dark:text-white truncate max-w-[110px] sm:max-w-none">{venue.split(',')[0]}</div>
                  <div className="text-[10px] sm:text-[11px] text-[#556758] dark:text-slate-400 font-medium truncate">{venue.split(',').slice(1).join(',')}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/70 dark:bg-[#0b1c14]/80 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/60 dark:border-[#183a27] shadow-xs">
                <div className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0"><Users size={18} /></div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-[#19241c] dark:text-white">{mode.split(' ')[0]}</div>
                  <div className="text-[10px] sm:text-[11px] text-[#556758] dark:text-slate-400 font-medium">{mode.split(' ').slice(1).join(' ')}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11.5px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 shadow-[0_8px_20px_rgba(15,35,22,0.25)] hover:scale-[1.03] group dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]">
                <span>Register Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button className="px-6 py-3.5 rounded-full bg-white dark:bg-[#0b1c14] border border-[#c1d1c4] dark:border-[#183a27] hover:bg-[#f3f6f1] dark:hover:bg-[#11261a] text-[#1b3726] dark:text-[#a2d45e] text-[11.5px] font-bold tracking-wider flex items-center gap-2.5 transition-all duration-300 shadow-sm hover:shadow-md">
                <span>Add to Calendar</span>
                <CalendarPlus size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
              </button>
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
                      <p className="text-[11px] text-[#637667] dark:text-slate-400 leading-snug">{item.desc}</p>
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
                        <p className="text-[11px] text-[#6c7d70] dark:text-slate-400 leading-tight pt-1">{spk.bio}</p>
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
                  { icon: Calendar, label: 'Dates', value: `${event.dateDay} ${event.dateMonth} ${event.dateYear}` },
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
                  <button className="w-full py-4 rounded-full bg-[#1b3726] dark:bg-[#154628] hover:bg-[#234631] dark:hover:bg-[#1c5c34] text-white text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_8px_20px_rgba(27,55,38,0.2)] cursor-pointer">
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

    </div>
  );
}
