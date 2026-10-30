'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, ArrowRight, Users, Building2, MapPin, Calendar, LayoutGrid, MonitorPlay, MessageSquare, GraduationCap, Tent, Mail, Plus, Edit3, Trash2, Settings, X, CheckCircle2, AlertCircle, Loader2, ExternalLink, RefreshCw, Sparkles, Save, ChevronLeft, ChevronRight, Layers, LogOut, Home, FileText, Clock, Leaf
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '../../../components/admin/ImageUploader';
import { slugify } from '../../../lib/slug';
import { sortEventsLatestFirst } from '../../../lib/eventUtils';

/* ------------------------------------------------------------------ */
/* Home Page Design Language Tokens & Shared Decorative Components     */
/* ------------------------------------------------------------------ */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const TEAL = '#009ab1';

const Em = ({ children, light = false }) => (
  <em style={SERIF} className={`italic font-normal ${light ? 'text-[#009ab1]' : 'text-[#009ab1]'}`}>{children}</em>
);

function SectionTag({ number, text, light = false, circle = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {number && (circle ? (
        <span style={SERIF} className="w-9 h-9 rounded-full bg-[#009ab1]/15 border border-[#009ab1]/30 backdrop-blur text-[#009ab1] flex items-center justify-center text-lg">{number}</span>
      ) : (
        <span style={SERIF} className="text-[22px] italic text-[#009ab1]/70 -ml-1 font-light">{number}</span>
      ))}
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
        <span className="text-[10.5px] font-bold tracking-[0.22em] uppercase text-[#009ab1]">{text}</span>
      </span>
    </div>
  );
}

function Dots({ rows = 5, cols = 8, className = '' }) {
  return (
    <div className={`grid gap-2 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#009ab1]/35" />
      ))}
    </div>
  );
}

const Swirl = ({ className = '' }) => (
  <div className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-[#009ab1]/20 via-[#38bdf8]/15 to-transparent blur-3xl ${className}`} />
);

function WaveAccent({ className = '' }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 1200 120" fill="none" preserveAspectRatio="none">
      <path d="M 0 60 C 240 100, 480 20, 720 70 C 960 110, 1100 40, 1200 65" stroke="#009ab1" strokeOpacity="0.2" strokeWidth="1.2" />
      <circle cx="280" cy="78" r="3.5" fill="#009ab1" fillOpacity="0.45" />
      <circle cx="680" cy="62" r="3.5" fill="#009ab1" fillOpacity="0.45" />
      <circle cx="980" cy="85" r="3.5" fill="#009ab1" fillOpacity="0.45" />
    </svg>
  );
}

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const getIsoDate = (day, monthStr, year) => {
  if (!day || !monthStr || !year) return '';
  let mIdx = MONTHS.indexOf(String(monthStr).toUpperCase().trim());
  if (mIdx === -1) {
    const numM = parseInt(monthStr, 10);
    if (!isNaN(numM) && numM >= 1 && numM <= 12) {
      mIdx = numM - 1;
    }
  }
  if (mIdx === -1) return '';
  const mm = String(mIdx + 1).padStart(2, '0');
  const dNum = parseInt(String(day).replace(/[^\d]/g, ''), 10);
  const dd = isNaN(dNum) ? '01' : String(dNum).padStart(2, '0');
  const yNum = parseInt(String(year).replace(/[^\d]/g, ''), 10);
  const yyyy = isNaN(yNum) ? '2025' : String(yNum);
  return `${yyyy}-${mm}-${dd}`;
};

const formatDateDDMMYYYY = (day, monthStr, year) => {
  if (!day && !monthStr && !year) return 'DD/MM/YYYY';
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

export default function AdminEventsPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [adminUser, setAdminUser] = useState('admin');
  const [filterCategory, setFilterCategory] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Settings (Stats & Newsletter)
  const [settings, setSettings] = useState({
    heroTag: 'EVENTS',
    heroTitle: 'Discover. Learn.\nConnect.',
    heroSubtitle: 'Explore our conferences, workshops, lectures, courses and STEM initiatives that inspire learning and create sustainable impact.',
    heroImage: '/events/e1.png',
    stat1Number: '56+',
    stat1Text: 'Gifted Students<br/>Supported',
    stat2Number: '44',
    stat2Text: 'Schools in<br/>Kerala',
    stat3Number: '41',
    stat3Text: 'Educational<br/>Districts',
    stat4Number: '6+',
    stat4Text: 'Programmes<br/>Organized',
    newsletterTitle: 'Stay Updated',
    newsletterText: 'Subscribe to our newsletter and never miss an update on our events and programmes.'
  });

  // Modal / Inline Add state
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const getTodayDMY = () => {
    const d = new Date();
    return {
      day: String(d.getDate()),
      month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      year: String(d.getFullYear())
    };
  };

  const initialDMY = getTodayDMY();

  // Event Form State
  const [eventForm, setEventForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    dateDay: initialDMY.day,
    dateMonth: initialDMY.month,
    dateYear: initialDMY.year,
    category: 'Conference',
    imageUrl: '/events/e1.png',
    filterType: 'Conferences'
  });

  const categories = [
    { name: 'All Events', icon: LayoutGrid },
    { name: 'Conferences', icon: Users },
    { name: 'Workshops', icon: MonitorPlay },
    { name: 'Lectures', icon: MessageSquare },
    { name: 'Courses', icon: GraduationCap },
    { name: 'STEM Camps', icon: Tent },
  ];

  const filterCategories = ['Conferences', 'Workshops', 'Lectures', 'Courses', 'STEM Camps'];

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 2500);
  };

  // Fetch events & settings
  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [eventsRes, settingsRes] = await Promise.all([
        fetch('/api/events', { cache: 'no-store' }),
        fetch('/api/event-settings', { cache: 'no-store' })
      ]);

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        if (Array.isArray(eventsData)) setEvents(sortEventsLatestFirst(eventsData));
      }

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData && settingsData.heroTag) {
          setSettings(prev => ({ ...prev, ...settingsData }));
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      if (!silent) showToast('error', 'Error syncing with database');
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Fast Auth check & initial fetch
  useEffect(() => {
    let isMounted = true;
    async function verifyAuthAndFetch() {
      // 1. Instant optimistic unlock if admin session is already in localStorage
      if (typeof window !== 'undefined') {
        const cachedUser = localStorage.getItem('lense_admin_user');
        if (cachedUser) {
          setAdminUser(cachedUser);
          setAuthChecking(false);
        }
      }

      try {
        // Concurrently run cookie verification and initial data fetch
        const [authRes] = await Promise.all([
          fetch('/api/admin/check', { cache: 'no-store' }),
          fetchData(true)
        ]);

        if (!authRes.ok) {
          router.replace('/admin/login');
          return;
        }

        const data = await authRes.json();
        if (isMounted && data.user?.username) {
          setAdminUser(data.user.username);
        }
      } catch (err) {
        if (isMounted) router.replace('/admin/login');
      } finally {
        if (isMounted) {
          setAuthChecking(false);
          setLoading(false);
        }
      }
    }
    verifyAuthAndFetch();
    return () => { isMounted = false; };
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lense_admin_user');
      }
      router.push('/admin/login');
    }
  };

  // Open inline add form for Event
  const handleOpenAdd = (tab) => {
    setEditingEventId(null);
    const cat = tab && tab !== 'All Events' ? tab : 'Conferences';
    const d = getTodayDMY();
    setEventForm({
      slug: '',
      title: '',
      subtitle: '',
      dateDay: d.day,
      dateMonth: d.month,
      dateYear: d.year,
      category: cat.toUpperCase(),
      imageUrl: '/events/e1.png',
      filterType: cat
    });
    setShowAddForm(true);
    const el = document.getElementById('admin-event-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Open edit mode for Event
  const handleStartEdit = (evt) => {
    setEditingEventId(evt.id);
    setEventForm({
      slug: evt.slug || slugify(evt.title) || '',
      title: evt.title || '',
      subtitle: evt.subtitle || '',
      dateDay: evt.dateDay || '',
      dateMonth: evt.dateMonth || '',
      dateYear: evt.dateYear || '',
      category: evt.category || 'CONFERENCE',
      imageUrl: evt.imageUrl || '/events/e1.png',
      filterType: evt.filterType || 'Conferences'
    });
    setShowAddForm(true);
    const el = document.getElementById('admin-event-form-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    showToast('info', `Editing event: "${evt.title}"`);
  };

  // Submit Event Add / Update
  const handleEventSubmit = async (e, proceedToDetails = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!eventForm.title.trim()) {
      showToast('error', 'Please enter an event title');
      return;
    }

    setSaving(true);
    const isEditing = Boolean(editingEventId);
    const payload = {
      ...eventForm,
      imageUrl: eventForm.imageUrl && eventForm.imageUrl.trim() ? eventForm.imageUrl.trim() : '/events/e1.png',
      ...(isEditing ? { id: editingEventId } : {})
    };

    try {
      const res = await fetch('/api/events', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save event');

      const targetSlugOrId = data.slug || editingEventId || data.id;

      if (proceedToDetails && targetSlugOrId) {
        showToast('success', 'Event saved! Opening visual editor...');
        router.push(`/admin/events/${targetSlugOrId}`);
        return;
      }

      // Fast optimistic UI update
      const savedItem = {
        ...payload,
        ...data,
        id: data.id || editingEventId || Date.now(),
        slug: data.slug || payload.slug || slugify(payload.title),
        registrationCount: data.registrationCount || 0
      };

      if (isEditing) {
        setEvents(prev => sortEventsLatestFirst(
          prev.map(ev => (String(ev.id) === String(editingEventId) || (savedItem.slug && ev.slug === savedItem.slug)) ? savedItem : ev)
        ));
      } else {
        setEvents(prev => sortEventsLatestFirst([savedItem, ...prev]));
      }

      showToast('success', isEditing ? 'Event updated!' : 'Event published to database!');
      setShowAddForm(false);
      setEditingEventId(null);
      // Background silent sync so the UI never blinks or shows full-page loader
      fetchData(true);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete event smoothly without screen blur or freeze
  const handleExecuteDelete = async (evt) => {
    if (!evt || (evt.id == null && !evt.slug)) return;
    const targetId = evt.id;
    const targetSlug = evt.slug || '';

    // 1. Instantly reset confirmation state
    setDeleteConfirmId(null);

    // 2. Optimistically remove from list immediately (0ms smooth reaction, no freeze, no blur)
    const prevEvents = [...events];
    setEvents(prev => prev.filter(e => {
      if (targetId != null && String(e.id) === String(targetId)) return false;
      if (targetSlug && e.slug && String(e.slug) === String(targetSlug)) return false;
      return true;
    }));

    if ((targetId != null && String(editingEventId) === String(targetId)) || (targetSlug && editingEventId === targetSlug)) {
      setShowAddForm(false);
      setEditingEventId(null);
    }

    showToast('success', 'Event deleted permanently');

    // 3. Fast non-blocking API call to delete from DB
    try {
      const queryParams = new URLSearchParams();
      if (targetId != null) queryParams.set('id', String(targetId));
      if (targetSlug) queryParams.set('slug', String(targetSlug));

      const res = await fetch(`/api/events?${queryParams.toString()}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: targetId, slug: targetSlug })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete event from database');
      }
    } catch (err) {
      // Revert if error
      setEvents(prevEvents);
      showToast('error', err.message || 'Failed to delete event');
    }
  };

  // Sidebar Settings Update
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/event-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (!res.ok) throw new Error('Failed to update page settings');

      showToast('success', 'Settings & statistics saved successfully!');
      setShowSettingsModal(false);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // Filter events
  const filteredEvents = events.filter((item) => {
    const matchesCategory = filterCategory === 'All Events' ||
      item.filterType?.toLowerCase() === filterCategory.toLowerCase() ||
      item.category?.toLowerCase() === filterCategory.toLowerCase();

    const matchesSearch = searchQuery === '' ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categoryCounts = useMemo(() => {
    const counts = { 'All Events': events.length };
    categories.forEach(cat => {
      if (cat.name !== 'All Events') {
        counts[cat.name] = events.filter(e =>
          e.filterType?.toLowerCase() === cat.name.toLowerCase() ||
          e.category?.toLowerCase() === cat.name.toLowerCase()
        ).length;
      }
    });
    return counts;
  }, [events, categories]);

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <Swirl className="-left-20 top-10 w-96 h-96 opacity-30" />
        <div className="text-center space-y-3 glass-ultra p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,154,177,0.12)] border border-white/90 relative z-10">
          <Loader2 className="animate-spin text-[#009ab1] mx-auto" size={32} />
          <p className="text-slate-600 text-xs font-bold tracking-wider uppercase">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-800 pb-32 relative overflow-x-hidden selection:bg-[#009ab1]/20 selection:text-[#00869c]">

      {/* Ambient background glows safely positioned in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <Swirl className="-left-32 top-10 w-[420px] h-[420px] opacity-25" />
        <Swirl className="-right-32 top-[550px] w-[460px] h-[460px] opacity-20" />
        <Dots rows={6} cols={6} className="absolute right-12 top-20 opacity-20 hidden xl:grid" />
      </div>

      {/* Sleek Floating Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-[80] px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border text-xs font-semibold backdrop-blur-xl transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-3 ${
          toast.type === 'success'
            ? 'bg-white/95 text-emerald-900 border-emerald-300/80 shadow-[0_14px_35px_rgba(16,185,129,0.18)]'
            : toast.type === 'error'
              ? 'bg-white/95 text-rose-900 border-rose-300/80 shadow-[0_14px_35px_rgba(244,63,94,0.18)]'
              : 'bg-white/95 text-slate-900 border-white/90 shadow-[0_14px_35px_rgba(0,154,177,0.15)]'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} className="text-[#009ab1] shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-rose-500 shrink-0" />
          )}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}



      {/* ========================================================================= */}
      {/* ADMIN FLOATING TOP CONTROLLER BAR                                          */}
      {/* ========================================================================= */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/80 shadow-[0_4px_20px_rgba(0,154,177,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009ab1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#009ab1]"></span>
            </span>
            <div className="flex items-center gap-2.5">
              <span style={SERIF} className="text-base sm:text-lg font-normal text-slate-900 tracking-tight">
                Events Console <Em>Live</Em>
              </span>
              <span className="text-[10px] bg-[#009ab1]/10 text-[#00869c] font-bold px-2.5 py-0.5 rounded-full border border-[#009ab1]/20">
                {events.length} Events Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Add Button */}
            <button
              onClick={() => handleOpenAdd(filterCategory)}
              className="btn-teal text-white font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-[0_8px_20px_rgba(0,154,177,0.28)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Add Event</span>
            </button>

            {/* Stats Settings */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="bg-white/80 hover:bg-white text-slate-700 font-bold text-xs px-3.5 py-2 rounded-full flex items-center gap-1.5 border border-white/90 hover:border-[#009ab1]/30 transition-all shadow-xs cursor-pointer"
            >
              <Settings size={14} className="text-slate-500" />
              <span className="hidden md:inline">Stats & Newsletter</span>
            </button>

            {/* Refresh */}
            <button
              onClick={fetchData}
              title="Refresh Data from DB"
              className="p-2 bg-white/80 hover:bg-white text-slate-600 border border-white/90 rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-[#009ab1]" : "text-slate-500"} />
              <span className="hidden sm:inline pr-1">Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER                                                             */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">

        {/* EXECUTIVE HERO SHOWCASE BANNER */}
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-white/95 via-white/85 to-[#009ab1]/12 backdrop-blur-2xl border border-white/95 shadow-[0_25px_60px_rgba(0,154,177,0.12)] p-7 sm:p-10 mb-8 overflow-hidden">
          {/* Ambient wave vectors inside hero */}
          <svg className="absolute -right-20 -bottom-10 w-[550px] h-[220px] opacity-25 pointer-events-none" viewBox="0 0 550 220" fill="none">
            <path d="M 0 160 C 150 60, 300 200, 450 90 C 500 50, 530 80, 550 60" stroke="#009ab1" strokeWidth="2" fill="none" />
            <path d="M 0 190 C 180 90, 320 220, 480 120 C 520 90, 540 110, 550 90" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
            <circle cx="230" cy="120" r="4" fill="#009ab1" />
            <circle cx="450" cy="90" r="4" fill="#009ab1" />
          </svg>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <SectionTag text="LIVE EVENT MANAGEMENT" />
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Neon Database Live
                </span>
              </div>

              <h1 style={SERIF} className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-slate-900 leading-[1.14] tracking-tight">
                Curate & publish <Em>live events.</Em> <span className="font-light text-[#009ab1]/40 not-italic ml-2 text-2xl sm:text-3xl select-none">//</span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">
                Direct synchronization with your live database. Configure conferences, workshops, lectures and STEM camps with high-fidelity visual layouts and registration tracking.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => handleOpenAdd(filterCategory)}
                className="btn-teal px-6 py-3 rounded-full text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_10px_25px_rgba(0,154,177,0.35)] hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Create New Event</span>
              </button>

              <Link
                href="/events"
                target="_blank"
                className="px-5 py-3 rounded-full bg-white/90 hover:bg-white border border-white/95 shadow-[0_8px_20px_rgba(0,154,177,0.10)] text-[#009ab1] hover:text-[#00869c] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <span>View Public Portal</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* CONTROLS DOCK: CATEGORIES & LIVE SEARCH */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs Dock */}
          <div className="p-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_8px_25px_rgba(0,154,177,0.06)] flex items-center gap-1.5 overflow-x-auto custom-scrollbar w-full lg:w-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = filterCategory === cat.name;
              const count = categoryCounts[cat.name] || 0;
              return (
                <button
                  key={cat.name}
                  onClick={() => setFilterCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'btn-teal text-white shadow-[0_8px_20px_rgba(0,154,177,0.28)] scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-[#009ab1]'} />
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, category, or description..."
              className="w-full pl-10 pr-9 py-2.5 bg-white/80 backdrop-blur-xl border border-white/90 rounded-full text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#009ab1] focus:ring-4 focus:ring-[#009ab1]/15 shadow-[0_8px_25px_rgba(0,154,177,0.06)] transition-all"
            />
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#009ab1]" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* 2-COLUMN LAYOUT: TIMELINE ON LEFT (8 cols), SIDEBAR ON RIGHT (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Timeline Events (8 cols) */}
          <div className="lg:col-span-8 space-y-6 relative">

            {/* Subtle vertical connector line behind timeline */}
            <div className="absolute left-[42px] top-6 bottom-6 w-px bg-gradient-to-b from-[#009ab1]/40 via-[#009ab1]/20 to-transparent hidden sm:block pointer-events-none" />

            {/* INLINE ADD / EDIT EVENT FORM */}
            {showAddForm && (
              <div
                id="admin-event-form-section"
                className="sm:ml-24 rounded-[2.4rem] bg-gradient-to-br from-white/95 via-[#f8faf9]/90 to-[#009ab1]/10 backdrop-blur-2xl border border-white/95 shadow-[0_25px_65px_rgba(0,154,177,0.14)] p-6 sm:p-8 relative z-20 animate-in fade-in-50 duration-300 overflow-hidden"
              >
                {/* Decorative ambient swirl inside card */}
                <Swirl className="-right-12 -top-12 w-48 h-48 opacity-20" />

                {/* Form Header */}
                <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-slate-200/80 relative z-10">
                  <div>
                    <SectionTag text={editingEventId ? "EDIT EVENT RECORD" : "CREATE NEW EVENT"} />
                    <h3 style={SERIF} className="text-2xl sm:text-3xl font-normal text-slate-900 leading-tight mt-1.5">
                      {editingEventId ? 'Update Event' : 'Create New Event'} <Em>Listing</Em>
                    </h3>
                    <p className="text-xs text-slate-500 font-normal mt-1">
                      Configure title, live URL slug, date, badge tag, and poster image.
                    </p>
                  </div>
                  <button
                    onClick={() => { setShowAddForm(false); setEditingEventId(null); }}
                    className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-700 border border-slate-200/80 shadow-xs flex items-center justify-center transition-all cursor-pointer shrink-0"
                    title="Close form"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleEventSubmit} className="space-y-5 relative z-10">

                  {/* Panel 1: Event Identity (Title, URL Slug, Subtitle) */}
                  <div className="p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,154,177,0.04)] space-y-4">
                    {/* Event Title */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Sparkles size={12} className="text-[#009ab1]" />
                          <span>Event Title *</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-medium">Clear & descriptive headline</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={eventForm.title}
                        onChange={(e) => {
                          const newTitle = e.target.value;
                          setEventForm(prev => ({
                            ...prev,
                            title: newTitle,
                            slug: !editingEventId || !prev.slug ? slugify(newTitle) : prev.slug
                          }));
                        }}
                        placeholder="e.g. National Conference on AI in Sustainability"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200/80 text-[14px] font-semibold text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#009ab1] focus:ring-4 focus:ring-[#009ab1]/15 outline-none transition-all shadow-xs"
                      />
                    </div>

                    {/* URL Slug */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <FileText size={12} className="text-[#009ab1]" />
                          <span>Live Web URL Slug *</span>
                        </label>
                        <span className="text-[10px] text-[#009ab1] font-mono bg-[#009ab1]/10 px-2 py-0.5 rounded-md border border-[#009ab1]/20 font-bold">
                          auto-generated
                        </span>
                      </div>
                      <div className="flex items-center rounded-xl bg-white border border-slate-200/80 px-4 py-2.5 text-xs font-mono text-slate-600 focus-within:border-[#009ab1] focus-within:ring-4 focus-within:ring-[#009ab1]/15 transition-all shadow-xs">
                        <span className="text-[#009ab1] select-none shrink-0 font-medium font-sans mr-1">/events/</span>
                        <input
                          type="text"
                          required
                          value={eventForm.slug}
                          onChange={(e) => setEventForm({ ...eventForm, slug: slugify(e.target.value) })}
                          placeholder="event-slug-title"
                          className="bg-transparent border-none outline-none flex-1 text-slate-900 font-bold"
                        />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Subtitle / Brief Description
                      </label>
                      <textarea
                        rows={2}
                        value={eventForm.subtitle}
                        onChange={(e) => setEventForm({ ...eventForm, subtitle: e.target.value })}
                        placeholder="Brief overview of agenda, audience, and key highlights..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#009ab1] focus:ring-4 focus:ring-[#009ab1]/15 outline-none transition-all shadow-xs resize-none"
                      />
                    </div>
                  </div>

                  {/* Panel 2: Scheduling & Classification Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Date Picker Card with Live Badge Preview */}
                    <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,154,177,0.04)] flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                          <Calendar size={13} className="text-[#009ab1]" /> Event Date
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const d = getTodayDMY();
                            setEventForm(prev => ({ ...prev, dateDay: d.day, dateMonth: d.month, dateYear: d.year }));
                          }}
                          className="text-[10px] font-bold text-[#009ab1] hover:underline cursor-pointer"
                        >
                          Set to Today
                        </button>
                      </div>

                      <div className="flex items-center gap-3.5">
                        {/* Mini Home-Page Date Badge Preview */}
                        <div className="w-14 h-16 rounded-2xl bg-white border border-slate-200/70 shadow-sm flex flex-col items-center justify-center shrink-0">
                          <span style={SERIF} className="block text-2xl font-normal text-slate-900 leading-none">
                            {eventForm.dateDay || '--'}
                          </span>
                          <span className="block text-[9.5px] font-bold text-[#009ab1] mt-0.5 uppercase tracking-wider">
                            {eventForm.dateMonth || 'MON'}
                          </span>
                          <span className="block text-[8px] font-semibold text-slate-400">
                            {eventForm.dateYear || 'YEAR'}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <input
                            type="date"
                            required
                            value={getIsoDate(eventForm.dateDay, eventForm.dateMonth, eventForm.dateYear)}
                            onChange={(e) => {
                              const isoVal = e.target.value;
                              if (!isoVal) {
                                setEventForm({ ...eventForm, dateDay: '', dateMonth: '', dateYear: '' });
                                return;
                              }
                              const [year, monthNum, dayNum] = isoVal.split('-');
                              if (year && monthNum && dayNum) {
                                const monthIdx = parseInt(monthNum, 10) - 1;
                                const day = String(parseInt(dayNum, 10));
                                const month = MONTHS[monthIdx] || 'JAN';
                                setEventForm({
                                  ...eventForm,
                                  dateDay: day,
                                  dateMonth: month,
                                  dateYear: year
                                });
                              }
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-800 focus:border-[#009ab1] focus:ring-4 focus:ring-[#009ab1]/15 outline-none cursor-pointer"
                          />
                          <div className="text-[10.5px] text-slate-400 font-mono mt-1.5 flex items-center gap-1.5">
                            <span>Formatted:</span>
                            <span className="font-bold text-[#009ab1] font-sans">
                              {formatDateDDMMYYYY(eventForm.dateDay, eventForm.dateMonth, eventForm.dateYear)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Classification Card with 1-Click Category Pills */}
                    <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,154,177,0.04)] space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Badge Category Tag
                        </label>
                        <input
                          type="text"
                          value={eventForm.category}
                          onChange={(e) => setEventForm({ ...eventForm, category: e.target.value.toUpperCase() })}
                          placeholder="e.g. CONFERENCE"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-800 uppercase focus:border-[#009ab1] focus:ring-4 focus:ring-[#009ab1]/15 outline-none"
                        />
                        {/* Quick Category Select Pills */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {['CONFERENCE', 'WORKSHOP', 'LECTURE', 'COURSE', 'STEM CAMP'].map((pill) => (
                            <button
                              key={pill}
                              type="button"
                              onClick={() => {
                                const filterMatch = filterCategories.find(c => c.toUpperCase() === pill || c.toUpperCase().includes(pill)) || 'Conferences';
                                setEventForm(prev => ({ ...prev, category: pill, filterType: filterMatch }));
                              }}
                              className={`px-2 py-0.5 rounded-md text-[9.5px] font-bold transition-all cursor-pointer ${
                                eventForm.category === pill
                                  ? 'bg-[#009ab1] text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-[#009ab1]/10 text-slate-600 hover:text-[#009ab1]'
                              }`}
                            >
                              {pill}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Filter Tab Section
                        </label>
                        <select
                          value={eventForm.filterType}
                          onChange={(e) => setEventForm({ ...eventForm, filterType: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 focus:border-[#009ab1] focus:ring-4 focus:ring-[#009ab1]/15 outline-none cursor-pointer"
                        >
                          {filterCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                  </div>

                  {/* Panel 3: Poster Image Card */}
                  <div className="p-4 rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(0,154,177,0.04)]">
                    <ImageUploader
                      value={eventForm.imageUrl}
                      onChange={(url) => setEventForm({ ...eventForm, imageUrl: url })}
                      category="events"
                      label="Event Poster Image"
                      helperText="Upload image from device (saved to Cloudinary CDN) or enter URL."
                    />
                  </div>

                  {/* Panel 4: Form Actions Bar */}
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80">
                    <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-[#009ab1]" />
                      <span>All updates sync directly with Neon database</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      {editingEventId && (
                        deleteConfirmId === editingEventId ? (
                          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200/90 px-3 py-1.5 rounded-full animate-in fade-in duration-150">
                            <span className="text-[11px] font-bold text-rose-700">Delete this event?</span>
                            <button
                              type="button"
                              onClick={() => {
                                const ev = events.find(e => String(e.id) === String(editingEventId) || e.slug === editingEventId);
                                if (ev) handleExecuteDelete(ev);
                              }}
                              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-full text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 size={11} />
                              <span>Yes, Delete</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded-full text-[11px] font-semibold transition-all border border-slate-200 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(editingEventId)}
                            className="px-3.5 py-2.5 rounded-full border border-rose-200 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                            title="Delete this event"
                          >
                            <Trash2 size={13} />
                            <span>Delete Event</span>
                          </button>
                        )
                      )}
                      <button
                        type="button"
                        onClick={() => { setShowAddForm(false); setEditingEventId(null); setDeleteConfirmId(null); }}
                        className="px-4 py-2.5 rounded-full border border-slate-200/80 bg-white/80 text-slate-600 font-bold text-xs hover:bg-white hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={(e) => handleEventSubmit(e, false)}
                        className="px-5 py-2.5 rounded-full border border-[#009ab1]/30 bg-white hover:bg-slate-50 text-[#00869c] font-bold text-xs transition-colors cursor-pointer shadow-xs"
                      >
                        Save & Close
                      </button>
                      <button
                        type="button"
                        disabled={saving}
                        onClick={(e) => handleEventSubmit(e, true)}
                        className="btn-teal px-6 py-2.5 rounded-full text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_10px_24px_rgba(0,154,177,0.32)] hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
                      >
                        {saving ? <Loader2 className="animate-spin" size={14} /> : <ArrowRight size={14} />}
                        <span>Next: Customize Live Event Page →</span>
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            )}

            {/* TIMELINE LISTING */}
            {loading && events.length === 0 ? (
              <div className="sm:ml-24 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-[1.8rem] bg-gradient-to-br from-white/95 via-white/85 to-[#009ab1]/10 backdrop-blur-xl border border-white/95 p-5 shadow-xs animate-pulse">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                      <div className="h-5 w-24 bg-slate-200/80 rounded-full" />
                      <div className="h-6 w-36 bg-slate-200/60 rounded-full" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mt-3">
                      <div className="w-full sm:w-[210px] h-[130px] bg-slate-200/80 rounded-2xl shrink-0" />
                      <div className="flex-1 min-w-0 space-y-3 w-full">
                        <div className="h-5 w-3/4 bg-slate-200/90 rounded-lg" />
                        <div className="h-3.5 w-1/2 bg-slate-200/60 rounded-lg" />
                        <div className="h-3 w-1/3 bg-slate-200/40 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="sm:ml-24 text-center py-16 rounded-[2rem] bg-gradient-to-br from-white/90 via-white/80 to-[#009ab1]/10 backdrop-blur-xl border border-white/90 shadow-[0_18px_45px_rgba(0,154,177,0.08)] p-8">
                <div className="w-14 h-14 bg-[#009ab1]/10 border border-[#009ab1]/25 text-[#009ab1] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar size={24} />
                </div>
                <h3 style={SERIF} className="text-2xl font-normal text-slate-900 mb-1.5">No events found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed font-normal">
                  {searchQuery ? `No results matching "${searchQuery}".` : `No events currently assigned to category "${filterCategory}".`}
                </p>
                <button
                  onClick={() => handleOpenAdd(filterCategory)}
                  className="btn-teal px-5 py-2.5 text-white rounded-full text-xs font-bold transition-all inline-flex items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.28)]"
                >
                  <Plus size={14} strokeWidth={2.5} /> Add First Event
                </button>
              </div>
            ) : (
              filteredEvents.map((evt) => (
                <div key={evt.id} className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch group pt-1">

                  {/* Home Page Style Timeline Date (Left of line) */}
                  <div className="hidden sm:flex flex-col items-center w-[84px] shrink-0 relative z-10 pt-3 text-center select-none">
                    <div className="w-14 h-16 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-[0_8px_20px_rgba(0,154,177,0.10)] flex flex-col items-center justify-center group-hover:scale-105 group-hover:border-[#009ab1]/40 transition-all duration-300">
                      <span style={SERIF} className="block text-2xl font-normal text-slate-900 leading-none group-hover:text-[#009ab1] transition-colors">{evt.dateDay}</span>
                      <span className="block text-[10px] font-bold text-[#009ab1] mt-0.5 uppercase tracking-wider">{evt.dateMonth}</span>
                    </div>
                    <span className="block text-[11px] font-bold text-slate-400 mt-1.5">{evt.dateYear}</span>
                    <span className="w-2 h-2 rounded-full bg-[#009ab1] mt-2 ring-4 ring-[#009ab1]/20 group-hover:scale-125 transition-transform" />
                  </div>

                  {/* Frosted Glass Event Card (Home Page Aesthetic - Zero Overlap Layout) */}
                  <div className="flex-1 rounded-[1.8rem] bg-gradient-to-br from-white/95 via-white/85 to-[#009ab1]/10 backdrop-blur-xl border border-white/95 shadow-[0_18px_45px_rgba(0,154,177,0.08)] p-5 hover:shadow-[0_24px_55px_rgba(0,154,177,0.16)] hover:-translate-y-1 hover:border-[#009ab1]/40 transition-all duration-300 flex flex-col gap-4">

                    {/* Top Row in Natural Flow: Badges on left, Action Buttons on right */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100/90">
                      {/* Left: Category & Registration Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex px-3 py-1 rounded-full bg-[#009ab1]/10 border border-[#009ab1]/25 text-[#009ab1] text-[10px] font-bold uppercase tracking-wider">
                          {evt.category}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-white/90 border border-slate-200/80 px-2.5 py-1 rounded-full">
                          Tab: {evt.filterType}
                        </span>
                        <Link
                          href={`/admin/events/${evt.slug || evt.id}#registrations`}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 hover:bg-sky-100 transition-colors text-[10px] font-bold cursor-pointer"
                        >
                          <Users size={12} />
                          <span>{evt.registrationCount || 0} Registrations</span>
                        </Link>
                      </div>

                      {/* Right: Actions (In document flow, NEVER overlapping) */}
                      {deleteConfirmId === evt.id ? (
                        <div className="flex items-center gap-2 bg-rose-50 border border-rose-200/90 px-3 py-1.5 rounded-full animate-in fade-in zoom-in-95 duration-150">
                          <span className="text-[11px] font-bold text-rose-700">Do you want to delete this event?</span>
                          <button
                            type="button"
                            onClick={() => handleExecuteDelete(evt)}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white rounded-full text-[11px] font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 size={11} />
                            <span>Yes, Delete</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded-full text-[11px] font-semibold transition-all border border-slate-200 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <Link
                            href={`/admin/events/${evt.slug || evt.id}`}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-[#009ab1]/15 to-[#14b4cb]/15 hover:from-[#009ab1] hover:to-[#00869c] text-[#00869c] hover:text-white border border-[#009ab1]/30 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs group/btn cursor-pointer"
                            title="Customize live event page, about text, speakers, and layout"
                          >
                            <Sparkles size={12} className="text-[#009ab1] group-hover/btn:text-white transition-colors" />
                            <span>Customize Live Page</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleStartEdit(evt)}
                            className="px-3 py-1.5 bg-white/90 hover:bg-white text-slate-700 hover:text-[#009ab1] border border-slate-200/80 hover:border-[#009ab1]/30 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                            title="Edit event"
                          >
                            <Edit3 size={12} />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(evt.id)}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200/80 hover:border-rose-600 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                            title="Delete event"
                          >
                            <Trash2 size={12} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Main Body Row: Poster Image + Details */}
                    <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                      {/* Poster Image with Home-Page Floating Date Badge */}
                      <div className="w-full sm:w-[210px] h-[145px] rounded-2xl overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200/80 shadow-xs group/img">
                        <img
                          src={evt.imageUrl}
                          alt={evt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          onError={(e) => {
                            e.currentTarget.src = "/events/e1.png";
                          }}
                        />
                        {/* Floating Date Tag Badge on Poster (Home Page Aesthetic) */}
                        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-slate-900 border border-white/90 shadow-md text-center">
                          <span className="block text-[15px] font-bold leading-none mb-0.5 text-slate-900">{evt.dateDay}</span>
                          <span className="block text-[9.5px] tracking-wider uppercase font-bold text-[#009ab1]">{evt.dateMonth}</span>
                        </div>
                      </div>

                      {/* Content: Metadata, Title, Subtitle & Live Link */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5 text-[#009ab1] font-bold">
                            <Calendar size={13} />
                            {formatDateDDMMYYYY(evt.dateDay, evt.dateMonth, evt.dateYear)}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="truncate font-mono text-[11px] text-slate-400">/events/{evt.slug || evt.id}</span>
                        </div>

                        <h3 style={SERIF} className="text-xl sm:text-[23px] font-normal text-slate-900 leading-snug group-hover:text-[#009ab1] transition-colors line-clamp-2">
                          {evt.title}
                        </h3>

                        <p className="text-[13px] text-slate-600 line-clamp-2 leading-relaxed font-normal">
                          {evt.subtitle || 'No description provided.'}
                        </p>

                        <div className="pt-1 flex items-center justify-between">
                          <Link
                            href={`/events/${evt.slug || evt.id}`}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009ab1] hover:text-[#00869c] hover:underline cursor-pointer"
                          >
                            <span>Open Public View</span>
                            <ExternalLink size={12} />
                          </Link>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: {String(evt.id).slice(-6)}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}

          </div>

          {/* Right Column: Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* IMPACT STATISTICS CARD */}
            <div className="rounded-[2.4rem] bg-gradient-to-br from-white/95 via-white/85 to-[#009ab1]/12 backdrop-blur-2xl border border-white/95 shadow-[0_20px_50px_rgba(0,154,177,0.08)] p-6 sm:p-7 relative overflow-hidden">
              {/* Decorative Swirl */}
              <Swirl className="-right-10 -top-10 w-44 h-44 opacity-25" />

              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200/80 relative z-10">
                <div>
                  <SectionTag text="LIVE IMPACT METRICS" />
                  <h4 style={SERIF} className="text-xl font-normal text-slate-900 mt-1">
                    Public Impact <Em>Display</Em>
                  </h4>
                </div>
                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#009ab1] hover:text-[#00869c] text-xs font-bold border border-slate-200/80 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Edit3 size={12} />
                  <span>Edit Stats</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3.5 relative z-10">
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xs hover:border-[#009ab1]/30 hover:-translate-y-0.5 transition-all group/stat">
                  <span style={SERIF} className="text-3xl sm:text-4xl font-normal text-[#009ab1] block leading-none group-hover/stat:scale-105 transition-transform origin-left">
                    {settings.stat1Number}
                  </span>
                  <span className="text-[11.5px] font-semibold text-slate-600 block mt-2.5 leading-snug" dangerouslySetInnerHTML={{ __html: settings.stat1Text }} />
                </div>
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xs hover:border-[#009ab1]/30 hover:-translate-y-0.5 transition-all group/stat">
                  <span style={SERIF} className="text-3xl sm:text-4xl font-normal text-[#009ab1] block leading-none group-hover/stat:scale-105 transition-transform origin-left">
                    {settings.stat2Number}
                  </span>
                  <span className="text-[11.5px] font-semibold text-slate-600 block mt-2.5 leading-snug" dangerouslySetInnerHTML={{ __html: settings.stat2Text }} />
                </div>
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xs hover:border-[#009ab1]/30 hover:-translate-y-0.5 transition-all group/stat">
                  <span style={SERIF} className="text-3xl sm:text-4xl font-normal text-[#009ab1] block leading-none group-hover/stat:scale-105 transition-transform origin-left">
                    {settings.stat3Number}
                  </span>
                  <span className="text-[11.5px] font-semibold text-slate-600 block mt-2.5 leading-snug" dangerouslySetInnerHTML={{ __html: settings.stat3Text }} />
                </div>
                <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-xs hover:border-[#009ab1]/30 hover:-translate-y-0.5 transition-all group/stat">
                  <span style={SERIF} className="text-3xl sm:text-4xl font-normal text-[#009ab1] block leading-none group-hover/stat:scale-105 transition-transform origin-left">
                    {settings.stat4Number}
                  </span>
                  <span className="text-[11.5px] font-semibold text-slate-600 block mt-2.5 leading-snug" dangerouslySetInnerHTML={{ __html: settings.stat4Text }} />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 relative z-10">
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                  <CheckCircle2 size={13} className="text-[#009ab1]" /> Displayed live on Public Portal
                </span>
              </div>
            </div>

            {/* Quick Portal Shortcut Card */}
            <div className="rounded-[2.2rem] bg-gradient-to-br from-white/90 via-white/80 to-[#009ab1]/08 backdrop-blur-xl border border-white/90 shadow-[0_15px_35px_rgba(0,154,177,0.06)] p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#009ab1]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Pro Tip</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Click <strong className="text-slate-800">"Customize Live Page"</strong> on any event card to visually configure about text, speaker rosters, event schedule, and custom hero banners.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* EDIT STATS & NEWSLETTER SETTINGS MODAL                   */}
      {/* ======================================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in-50 duration-200">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2.2rem] max-w-2xl w-full p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,154,177,0.22)] border border-white/90 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 style={SERIF} className="text-2xl font-normal text-slate-900 flex items-center gap-2.5">
                  <Settings className="text-[#009ab1]" size={22} />
                  Stats & Newsletter Settings
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Update statistics numbers, labels, and newsletter subscription text.
                </p>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-700 border border-slate-200/60 flex items-center justify-center transition-colors shadow-xs"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSettingsSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">

              {/* Impact Statistics */}
              <div className="p-5 bg-white/80 rounded-2xl border border-white/90 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#009ab1]">Impact Statistics</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 1 Number</label>
                    <input
                      type="text"
                      value={settings.stat1Number}
                      onChange={(e) => setSettings({ ...settings, stat1Number: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-900 focus:border-[#009ab1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 1 Text (use &lt;br/&gt; for break)</label>
                    <input
                      type="text"
                      value={settings.stat1Text}
                      onChange={(e) => setSettings({ ...settings, stat1Text: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 font-mono focus:border-[#009ab1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 2 Number</label>
                    <input
                      type="text"
                      value={settings.stat2Number}
                      onChange={(e) => setSettings({ ...settings, stat2Number: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-900 focus:border-[#009ab1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 2 Text</label>
                    <input
                      type="text"
                      value={settings.stat2Text}
                      onChange={(e) => setSettings({ ...settings, stat2Text: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 font-mono focus:border-[#009ab1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 3 Number</label>
                    <input
                      type="text"
                      value={settings.stat3Number}
                      onChange={(e) => setSettings({ ...settings, stat3Number: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-900 focus:border-[#009ab1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 3 Text</label>
                    <input
                      type="text"
                      value={settings.stat3Text}
                      onChange={(e) => setSettings({ ...settings, stat3Text: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 font-mono focus:border-[#009ab1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 4 Number</label>
                    <input
                      type="text"
                      value={settings.stat4Number}
                      onChange={(e) => setSettings({ ...settings, stat4Number: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-900 focus:border-[#009ab1] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 4 Text</label>
                    <input
                      type="text"
                      value={settings.stat4Text}
                      onChange={(e) => setSettings({ ...settings, stat4Text: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 font-mono focus:border-[#009ab1] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Newsletter Block */}
              <div className="p-5 bg-white/80 rounded-2xl border border-white/90 shadow-xs space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#009ab1]">Newsletter Block</h4>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Title</label>
                  <input
                    type="text"
                    value={settings.newsletterTitle}
                    onChange={(e) => setSettings({ ...settings, newsletterTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs font-bold text-slate-900 focus:border-[#009ab1] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={settings.newsletterText}
                    onChange={(e) => setSettings({ ...settings, newsletterText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-800 focus:border-[#009ab1] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-200/80 bg-white/80 text-slate-600 font-bold text-xs hover:bg-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-teal px-6 py-2.5 rounded-full text-white font-bold text-xs flex items-center gap-2 transition-all shadow-[0_8px_20px_rgba(0,154,177,0.28)] disabled:opacity-50 cursor-pointer"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>{saving ? 'Saving Settings...' : 'Save All Settings to Database'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
