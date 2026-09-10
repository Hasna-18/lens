'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, ArrowRight, Users, Building2, MapPin, Calendar, LayoutGrid, MonitorPlay, MessageSquare, GraduationCap, Tent, Mail, Plus, Edit3, Trash2, Settings, X, CheckCircle2, AlertCircle, Loader2, ExternalLink, RefreshCw, Sparkles, Save, ChevronLeft, ChevronRight, Layers, LogOut, Home, FileText
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '../../../components/admin/ImageUploader';
import { slugify } from '../../../lib/slug';

export default function AdminEventsPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [adminUser, setAdminUser] = useState('admin');
  const [filterCategory, setFilterCategory] = useState('All Events');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Settings & Initiatives
  const [currentInitiativeIndex, setCurrentInitiativeIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const [settings, setSettings] = useState({
    heroTag: 'EVENTS',
    heroTitle: 'Discover. Learn.\nConnect.',
    heroSubtitle: 'Explore our conferences, workshops, lectures, courses and STEM initiatives that inspire learning and create sustainable impact.',
    heroImage: '/events/e1.png',
    featuredInitiatives: [
      {
        id: "init-1",
        tag: "FEATURED INITIATIVE",
        title: "STEM 4 Girls",
        subtitle: "Creating opportunities.<br/>Inspiring futures.",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
        link: "#"
      },
      {
        id: "init-2",
        tag: "UPCOMING INITIATIVE",
        title: "Experiential STEM Labs",
        subtitle: "Interactive robotics & AI education across 44+ schools in Kerala.",
        imageUrl: "/events/e1.png",
        link: "#"
      },
      {
        id: "init-3",
        tag: "SPECIAL PROGRAMME",
        title: "Gifted Student STEM Camp",
        subtitle: "Empowering young innovators through hands-on science & technology.",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
        link: "#"
      }
    ],
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
  const [showInitiativeModal, setShowInitiativeModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingInitiativeId, setEditingInitiativeId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const getTodayDMY = () => {
    const d = new Date();
    return {
      day: String(d.getDate()),
      month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      year: String(d.getFullYear())
    };
  };

  const initialDMY = getTodayDMY();

  // Event Form State (Clean state, all live data comes from Neon DB)
  const [eventForm, setEventForm] = useState({
    slug: '',
    title: '',
    subtitle: '',
    dateDay: initialDMY.day,
    dateMonth: initialDMY.month,
    dateYear: initialDMY.year,
    category: 'Conference',
    imageUrl: '',
    filterType: 'Conferences'
  });

  // Initiative Form State
  const [initiativeForm, setInitiativeForm] = useState({
    tag: 'FEATURED INITIATIVE',
    title: '',
    subtitle: '',
    imageUrl: '/events/e1.png',
    link: '#'
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
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 3500);
  };

  // Carousel timer
  useEffect(() => {
    const inits = settings.featuredInitiatives || [];
    if (inits.length <= 1 || isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentInitiativeIndex((prev) => (prev + 1) % inits.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [settings.featuredInitiatives, isCarouselPaused]);

  // Fetch events & settings
  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsRes, settingsRes] = await Promise.all([
        fetch('/api/events'),
        fetch('/api/event-settings')
      ]);

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        if (Array.isArray(eventsData)) setEvents(eventsData);
      }

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData && settingsData.heroTag) {
          setSettings(prev => ({ ...prev, ...settingsData }));
        }
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showToast('error', 'Error syncing with PostgreSQL database');
    } finally {
      setLoading(false);
    }
  };

  // Auth check & initial fetch
  useEffect(() => {
    async function verifyAuthAndFetch() {
      try {
        const res = await fetch('/api/admin/check');
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.user?.username) setAdminUser(data.user.username);
        await fetchData();
      } catch (err) {
        router.replace('/admin/login');
      } finally {
        setAuthChecking(false);
      }
    }
    verifyAuthAndFetch();
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
      imageUrl: '',
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
      imageUrl: evt.imageUrl || '',
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
    try {
      const isEditing = Boolean(editingEventId);
      const method = isEditing ? 'PUT' : 'POST';
      const payload = isEditing ? { ...eventForm, id: editingEventId } : eventForm;

      const res = await fetch('/api/events', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save event');

      const targetSlugOrId = data.slug || editingEventId || data.id;

      if (proceedToDetails && targetSlugOrId) {
        showToast('success', 'Event saved! Opening live platform visual editor...');
        router.push(`/admin/events/${targetSlugOrId}`);
        return;
      }

      showToast('success', isEditing ? 'Event updated successfully in database!' : 'New event published to database!');
      setShowAddForm(false);
      setEditingEventId(null);
      fetchData();
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete event from DB
  const handleDeleteEvent = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
      showToast('success', 'Event deleted from PostgreSQL database');
      if (editingEventId === id) {
        setShowAddForm(false);
        setEditingEventId(null);
      }
      fetchData();
    } catch (err) {
      showToast('error', err.message);
    }
  };

  // ==========================================
  // INITIATIVES MANAGEMENT (Add, Edit, Delete)
  // ==========================================
  const handleOpenAddInitiative = () => {
    setEditingInitiativeId(null);
    setInitiativeForm({
      tag: 'FEATURED INITIATIVE',
      title: '',
      subtitle: '',
      imageUrl: '/events/e1.png',
      link: '#'
    });
    setShowInitiativeModal(true);
  };

  const handleStartEditInitiative = (init) => {
    setEditingInitiativeId(init.id);
    setInitiativeForm({
      tag: init.tag || 'FEATURED INITIATIVE',
      title: init.title || '',
      subtitle: (init.subtitle || '').replace(/<br\s*[\/]?>/gi, '\n'),
      imageUrl: init.imageUrl || '/events/e1.png',
      link: init.link || '#'
    });
    setShowInitiativeModal(true);
  };

  const handleInitiativeSubmit = async (e) => {
    e.preventDefault();
    if (!initiativeForm.title.trim()) {
      showToast('error', 'Please enter an initiative title');
      return;
    }

    setSaving(true);
    try {
      const formattedSubtitle = initiativeForm.subtitle.replace(/\n/g, '<br/>');
      let updatedInitiatives = [...(settings.featuredInitiatives || [])];

      if (editingInitiativeId) {
        updatedInitiatives = updatedInitiatives.map(item =>
          item.id === editingInitiativeId
            ? { ...item, ...initiativeForm, subtitle: formattedSubtitle }
            : item
        );
      } else {
        const newInit = {
          id: `init-${Date.now()}`,
          ...initiativeForm,
          subtitle: formattedSubtitle
        };
        updatedInitiatives.push(newInit);
      }

      const updatedSettings = { ...settings, featuredInitiatives: updatedInitiatives };
      const res = await fetch('/api/event-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });

      if (!res.ok) throw new Error('Failed to update initiatives');

      setSettings(updatedSettings);
      setShowInitiativeModal(false);
      setEditingInitiativeId(null);
      showToast('success', editingInitiativeId ? 'Initiative updated!' : 'New initiative added to carousel!');
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteInitiative = async (initId, title) => {
    if (!confirm(`Are you sure you want to delete initiative "${title}"?`)) return;

    try {
      const updatedInitiatives = (settings.featuredInitiatives || []).filter(item => item.id !== initId);
      const updatedSettings = { ...settings, featuredInitiatives: updatedInitiatives };

      const res = await fetch('/api/event-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });

      if (!res.ok) throw new Error('Failed to delete initiative');

      setSettings(updatedSettings);
      if (currentInitiativeIndex >= updatedInitiatives.length) {
        setCurrentInitiativeIndex(Math.max(0, updatedInitiatives.length - 1));
      }
      showToast('success', 'Initiative removed from carousel');
    } catch (err) {
      showToast('error', err.message);
    }
  };

  // ==========================================
  // SIDEBAR & HERO SETTINGS UPDATE
  // ==========================================
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

  const initiatives = settings.featuredInitiatives || [];
  const activeInitiative = initiatives[currentInitiativeIndex] || {
    tag: 'FEATURED INITIATIVE',
    title: 'No Initiatives Added',
    subtitle: 'Add initiatives using the button above to showcase them here.',
    imageUrl: '/events/e1.png',
    link: '#'
  };

  const handleNextInitiative = () => {
    setCurrentInitiativeIndex((prev) => (prev + 1) % initiatives.length);
  };

  const handlePrevInitiative = () => {
    setCurrentInitiativeIndex((prev) => (prev - 1 + initiatives.length) % initiatives.length);
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-outfit">
        <div className="text-center space-y-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80">
          <Loader2 className="animate-spin text-[#2d5a3c] mx-auto" size={32} />
          <p className="text-slate-600 text-xs font-semibold tracking-wide">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-32 font-outfit relative">

      {/* Toast Notification Alert */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-[60] px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border transition-all animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-50 text-emerald-900 border-emerald-300' 
            : toast.type === 'error' 
              ? 'bg-rose-50 text-rose-900 border-rose-300' 
              : 'bg-white text-slate-900 border-slate-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={22} className="text-emerald-700" /> : <AlertCircle size={22} className="text-rose-600" />}
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      {/* ADMIN FLOATING TOP CONTROLLER */}
      <div className="bg-white/95 text-slate-800 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2d5a3c]"></span>
            </span>
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-900">Live Events Admin</span>
              <span className="text-[10px] bg-emerald-50 text-[#2d5a3c] font-black px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                PostgreSQL • {events.length} Events • {initiatives.length} Initiatives
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Quick Add Button */}
            <button
              onClick={() => handleOpenAdd(filterCategory)}
              className="bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={16} strokeWidth={3} />
              <span>Add Event Directly</span>
            </button>

            {/* Manage Initiatives Button */}
            <button
              onClick={handleOpenAddInitiative}
              className="bg-emerald-50 hover:bg-emerald-100 text-[#2d5a3c] font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-emerald-200/80 transition-colors shadow-xs cursor-pointer"
            >
              <Layers size={15} />
              <span>+ Add Initiative</span>
            </button>

            {/* Sidebar & Settings */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-slate-200 transition-colors shadow-xs cursor-pointer"
            >
              <Settings size={15} />
              <span className="hidden md:inline">Edit Stats & Hero</span>
            </button>

            {/* Refresh */}
            <button
              onClick={fetchData}
              title="Refresh Data from DB"
              className="p-2 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-xl transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-[#2d5a3c]" : ""} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>
          </div>
        </div>
      </div>

      {/* HERO PREVIEW BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative min-h-[380px] rounded-3xl overflow-hidden bg-gradient-to-r from-[#173822] via-[#234e32] to-[#2d5a3c] text-white shadow-lg flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src={settings.heroImage || "/events/e1.png"}
              alt="Events Hero illustration"
              className="w-full h-full object-cover object-center lg:object-right opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#173822]/90 via-[#173822]/70 to-transparent"></div>
          </div>

          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block text-[#a2d45e] font-black tracking-widest text-xs uppercase bg-black/30 border border-[#a2d45e]/40 px-3 py-1 rounded-full backdrop-blur-md">
                {settings.heroTag || 'EVENTS'}
              </span>
              <button
                onClick={() => setShowSettingsModal(true)}
                className="text-[11px] font-bold text-emerald-200 hover:text-white flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-md transition-colors"
              >
                <Edit3 size={11} /> Edit Hero
              </button>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight whitespace-pre-line text-white">
              {settings.heroTitle}
            </h2>

            <p className="mt-4 text-emerald-100/90 text-sm sm:text-base font-normal leading-relaxed">
              {settings.heroSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* CONTROLS BAR: CATEGORY PILLS & SEARCH */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          
          {/* Categories Tab Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = filterCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setFilterCategory(cat.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#2d5a3c] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-[#2d5a3c]'} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search live events..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2d5a3c] focus:ring-2 focus:ring-[#2d5a3c]/10 shadow-xs"
            />
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={12} />
              </button>
            )}
          </div>

        </div>

        {/* 2-COLUMN LAYOUT: TIMELINE ON LEFT (8 cols), SIDEBAR ON RIGHT (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">

          {/* Left Column: Timeline Events (8 cols) */}
          <div className="lg:col-span-8 space-y-6 relative">

            {/* Decorative Timeline Guide Line */}
            <div className="hidden sm:block absolute left-[40px] top-6 bottom-6 w-[2px] bg-slate-200 -z-0"></div>

            {/* INLINE ADD / EDIT EVENT FORM */}
            {showAddForm && (
              <div id="admin-event-form-section" className="sm:ml-20 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md relative z-10">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#2d5a3c] flex items-center justify-center font-black">
                      <Plus size={16} />
                    </div>
                    <h3 className="text-base font-black text-slate-900">
                      {editingEventId ? 'Edit Event' : 'Add New Event'}
                    </h3>
                  </div>
                  <button
                    onClick={() => { setShowAddForm(false); setEditingEventId(null); }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleEventSubmit} className="space-y-4">
                  {/* Title & Subtitle */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Event Title *
                    </label>
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
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#2d5a3c] focus:ring-2 focus:ring-[#2d5a3c]/10 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>URL Slug (Unique Page Link) *</span>
                      <span className="text-[10px] text-slate-400 font-normal lowercase font-mono">auto-generated from title</span>
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-mono text-slate-600 focus-within:border-[#2d5a3c] focus-within:bg-white transition-colors">
                      <span className="text-slate-400 select-none shrink-0 font-medium">/events/</span>
                      <input
                        type="text"
                        required
                        value={eventForm.slug}
                        onChange={(e) => setEventForm({ ...eventForm, slug: slugify(e.target.value) })}
                        placeholder="event-slug-title"
                        className="bg-transparent border-none outline-none flex-1 text-slate-900 font-bold ml-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Subtitle / Brief Description
                    </label>
                    <textarea
                      rows={2}
                      value={eventForm.subtitle}
                      onChange={(e) => setEventForm({ ...eventForm, subtitle: e.target.value })}
                      placeholder="Brief overview of agenda and audience..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#2d5a3c] focus:ring-2 focus:ring-[#2d5a3c]/10 outline-none transition-all"
                    />
                  </div>

                  {/* Dates Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Day</label>
                      <input
                        type="text"
                        required
                        value={eventForm.dateDay}
                        onChange={(e) => setEventForm({ ...eventForm, dateDay: e.target.value })}
                        placeholder="15"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Month</label>
                      <input
                        type="text"
                        required
                        value={eventForm.dateMonth}
                        onChange={(e) => setEventForm({ ...eventForm, dateMonth: e.target.value.toUpperCase() })}
                        placeholder="MAR"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none text-center uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">Year</label>
                      <input
                        type="text"
                        required
                        value={eventForm.dateYear}
                        onChange={(e) => setEventForm({ ...eventForm, dateYear: e.target.value })}
                        placeholder="2025"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none text-center"
                      />
                    </div>
                  </div>

                  {/* Category & Filter Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Badge Category Tag
                      </label>
                      <input
                        type="text"
                        value={eventForm.category}
                        onChange={(e) => setEventForm({ ...eventForm, category: e.target.value.toUpperCase() })}
                        placeholder="e.g. CONFERENCE"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 uppercase focus:bg-white focus:border-[#2d5a3c] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Filter Tab Section
                      </label>
                      <select
                        value={eventForm.filterType}
                        onChange={(e) => setEventForm({ ...eventForm, filterType: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none"
                      >
                        {filterCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Local Device Image Uploader Component */}
                  <div className="pt-1">
                    <ImageUploader
                      value={eventForm.imageUrl}
                      onChange={(url) => setEventForm({ ...eventForm, imageUrl: url })}
                      category="events"
                      label="Event Poster Image"
                      helperText="Upload image from your device (saved to public/admin/events/) or provide a URL."
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="pt-3 flex flex-wrap items-center justify-end gap-2 sm:gap-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => { setShowAddForm(false); setEditingEventId(null); }}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 hover:text-slate-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={(e) => handleEventSubmit(e, false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Save & Close
                    </button>
                    <button
                      type="button"
                      disabled={saving}
                      onClick={(e) => handleEventSubmit(e, true)}
                      className="px-5 py-2.5 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                    >
                      {saving ? <Loader2 className="animate-spin" size={14} /> : <ArrowRight size={14} />}
                      <span>Next: Customize Live Event Page →</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ADD EVENT CALLOUT BUTTON (when form not opened) */}
            {!showAddForm && (
              <div
                onClick={() => handleOpenAdd(filterCategory)}
                className="sm:ml-20 border-2 border-dashed border-slate-300 hover:border-[#2d5a3c] bg-white/70 hover:bg-emerald-50/20 rounded-3xl p-6 text-center cursor-pointer transition-all flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 group shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#2d5a3c] border border-emerald-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Plus size={20} strokeWidth={2.5} />
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-[#2d5a3c] transition-colors">
                    Click to Add an Event to this Timeline
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Upload poster images from device and publish directly into PostgreSQL
                  </p>
                </div>
              </div>
            )}

            {/* TIMELINE LISTING */}
            {loading ? (
              <div className="sm:ml-20 text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <Loader2 className="animate-spin text-[#2d5a3c] mx-auto mb-2" size={28} />
                <div className="text-slate-600 text-xs font-bold">Syncing live events from PostgreSQL...</div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="sm:ml-20 text-center py-14 bg-white rounded-3xl border border-slate-200 shadow-xs p-8">
                <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 text-[#2d5a3c] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">No events in this view</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                  {searchQuery ? `No results matching "${searchQuery}".` : `No events currently assigned to category "${filterCategory}".`}
                </p>
                <button
                  onClick={() => handleOpenAdd(filterCategory)}
                  className="px-4 py-2 bg-[#2d5a3c] text-white rounded-xl text-xs font-bold hover:bg-[#23462f] transition-colors inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Plus size={14} /> Add First Event
                </button>
              </div>
            ) : (
              filteredEvents.map((evt) => (
                <div key={evt.id} className="relative flex flex-col sm:flex-row gap-4 sm:gap-8 items-stretch group pt-1">

                  {/* Timeline Date (Left of line) */}
                  <div className="hidden sm:flex flex-col items-center w-[80px] shrink-0 relative z-10 pt-4 text-center">
                    <span className="block text-2xl font-black text-slate-900 leading-none group-hover:text-[#2d5a3c] transition-colors">{evt.dateDay}</span>
                    <span className="block text-xs font-black text-[#2d5a3c] mt-1 uppercase tracking-wider">{evt.dateMonth}</span>
                    <span className="block text-xs font-bold text-slate-400 mt-0.5">{evt.dateYear}</span>
                  </div>

                  {/* Dot on the Line */}
                  <div className="hidden sm:flex absolute left-[40px] top-8 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-white bg-slate-300 ring-2 ring-slate-200 z-20 group-hover:bg-[#2d5a3c] group-hover:ring-[#2d5a3c]/30 transition-all duration-300">
                  </div>

                  {/* Event Card */}
                  <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-[#2d5a3c]/40 transition-all relative overflow-hidden flex flex-col sm:flex-row gap-4">

                    {/* Quick action pill buttons in top-right corner */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                      <Link
                        href={`/admin/events/${evt.slug || evt.id}`}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#2d5a3c] border border-emerald-200/80 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                        title="Customize live event page, about text, speakers, and layout"
                      >
                        <Sparkles size={12} className="text-[#2d5a3c]" />
                        <span>Customize Live Page</span>
                      </Link>
                      <button
                        onClick={() => handleStartEdit(evt)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
                        title="Edit event"
                      >
                        <Edit3 size={12} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(evt.slug || evt.id, evt.title)}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
                        title="Delete event"
                      >
                        <Trash2 size={12} />
                        <span>Delete</span>
                      </button>
                    </div>

                    {/* Mobile Date Header */}
                    <div className="sm:hidden w-full flex items-center justify-between border-b border-slate-100 pb-2 mb-1 pr-36">
                      <span className="text-xs font-bold text-[#2d5a3c] flex items-center gap-1">
                        <Calendar size={14} /> {evt.dateDay} {evt.dateMonth} {evt.dateYear}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="w-full sm:w-[190px] h-[135px] rounded-xl overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200">
                      <img
                        src={evt.imageUrl}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src = "/events/e1.png";
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-0.5 w-full flex flex-col justify-center pr-2 relative z-10">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-[#2d5a3c] text-[10px] font-extrabold uppercase tracking-wider">
                          {evt.category}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          Tab: {evt.filterType}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-1 pr-36 group-hover:text-[#2d5a3c] transition-colors">
                        {evt.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600 line-clamp-2 leading-relaxed">
                        {evt.subtitle}
                      </p>
                    </div>

                  </div>
                </div>
              ))
            )}

          </div>

          {/* Right Column: Sidebar (4 cols) with Auto-Scroll Carousel & Controls */}
          <div className="lg:col-span-4 space-y-6">

            {/* FEATURED INITIATIVES AUTO-SCROLL CAROUSEL */}
            <div
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 relative overflow-hidden group hover:shadow-md hover:border-[#2d5a3c]/40 transition-all"
            >
              {/* Top Controls: Tag + Admin Quick Action Badges */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-extrabold text-[#2d5a3c] tracking-wider uppercase flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <Sparkles size={12} className="text-[#2d5a3c]" />
                  <span>{activeInitiative.tag || 'FEATURED INITIATIVE'}</span>
                </div>

                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                  <button
                    onClick={() => handleStartEditInitiative(activeInitiative)}
                    className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors text-[10px] font-bold"
                    title="Edit this initiative"
                  >
                    <Edit3 size={12} />
                  </button>

                  <button
                    onClick={() => handleDeleteInitiative(activeInitiative.id, activeInitiative.title)}
                    className="p-1.5 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-600 transition-colors text-[10px]"
                    title="Delete this initiative"
                  >
                    <Trash2 size={12} />
                  </button>

                  <div className="w-px h-4 bg-slate-200 mx-1"></div>

                  <button
                    onClick={handleOpenAddInitiative}
                    className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#2d5a3c] transition-colors text-[11px] font-bold flex items-center gap-1"
                    title="Add new initiative to carousel"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
              </div>

              {/* Slide Content */}
              <div className="transition-all duration-300">
                <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">{activeInitiative.title}</h3>
                <p
                  className="text-xs font-medium text-slate-600 mb-4 leading-relaxed min-h-[36px]"
                  dangerouslySetInnerHTML={{ __html: activeInitiative.subtitle || '' }}
                />

                <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-200">
                  <img
                    src={activeInitiative.imageUrl || "/events/e1.png"}
                    alt={activeInitiative.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = "/events/e1.png"; }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2d5a3c] flex items-center gap-1.5">
                    Learn More <ArrowRight size={14} />
                  </span>

                  {/* Carousel Controls & Index */}
                  {initiatives.length > 1 && (
                    <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-200">
                      <button
                        onClick={handlePrevInitiative}
                        className="w-6 h-6 rounded-full hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-xs"
                        title="Previous initiative"
                      >
                        <ChevronLeft size={14} />
                      </button>

                      {/* Dots */}
                      <div className="flex items-center gap-1.5 px-1">
                        {initiatives.map((_, idx) => (
                          <span
                            key={idx}
                            onClick={() => setCurrentInitiativeIndex(idx)}
                            className={`block w-2 h-2 rounded-full cursor-pointer transition-all ${
                              idx === currentInitiativeIndex ? 'bg-[#2d5a3c] w-4' : 'bg-slate-300 hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={handleNextInitiative}
                        className="w-6 h-6 rounded-full hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-xs"
                        title="Next initiative"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* IMPACT STATISTICS CARD */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 relative">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider">
                  Live Impact Statistics
                </span>
                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="text-xs text-[#2d5a3c] font-bold hover:underline flex items-center gap-1"
                >
                  <Edit3 size={12} /> Edit Stats
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-2xl font-black text-slate-900 block leading-tight">{settings.stat1Number}</span>
                  <span className="text-[11px] font-medium text-slate-600 block mt-1" dangerouslySetInnerHTML={{ __html: settings.stat1Text }} />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-2xl font-black text-slate-900 block leading-tight">{settings.stat2Number}</span>
                  <span className="text-[11px] font-medium text-slate-600 block mt-1" dangerouslySetInnerHTML={{ __html: settings.stat2Text }} />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-2xl font-black text-slate-900 block leading-tight">{settings.stat3Number}</span>
                  <span className="text-[11px] font-medium text-slate-600 block mt-1" dangerouslySetInnerHTML={{ __html: settings.stat3Text }} />
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-2xl font-black text-slate-900 block leading-tight">{settings.stat4Number}</span>
                  <span className="text-[11px] font-medium text-slate-600 block mt-1" dangerouslySetInnerHTML={{ __html: settings.stat4Text }} />
                </div>
              </div>
            </div>

            {/* QUICK LINK TO NEWS & RESOURCES */}
            <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-200/80 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-black text-slate-900">News & Resources Admin</h4>
                <p className="text-xs text-slate-600 mt-0.5">Manage articles, publications, and downloads</p>
              </div>
              <Link
                href="/admin/news"
                className="px-3.5 py-2 bg-[#2d5a3c] hover:bg-[#23462f] text-white text-xs font-bold rounded-xl shadow-xs shrink-0 flex items-center gap-1.5"
              >
                <span>Open</span>
                <ArrowRight size={13} />
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: ADD / EDIT INITIATIVE MODAL */}
      {/* ======================================================== */}
      {showInitiativeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#2d5a3c] flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <h3 className="text-base font-black text-slate-900">
                  {editingInitiativeId ? 'Edit Carousel Initiative' : 'Add New Carousel Initiative'}
                </h3>
              </div>
              <button
                onClick={() => { setShowInitiativeModal(false); setEditingInitiativeId(null); }}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleInitiativeSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Initiative Tag
                </label>
                <input
                  type="text"
                  value={initiativeForm.tag}
                  onChange={(e) => setInitiativeForm({ ...initiativeForm, tag: e.target.value.toUpperCase() })}
                  placeholder="FEATURED INITIATIVE"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Initiative Title *
                </label>
                <input
                  type="text"
                  required
                  value={initiativeForm.title}
                  onChange={(e) => setInitiativeForm({ ...initiativeForm, title: e.target.value })}
                  placeholder="STEM 4 Girls"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Subtitle Description
                </label>
                <textarea
                  rows={2}
                  value={initiativeForm.subtitle}
                  onChange={(e) => setInitiativeForm({ ...initiativeForm, subtitle: e.target.value })}
                  placeholder="Short impact statement..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none"
                />
              </div>

              {/* Local Device Image Uploader for Initiative */}
              <div className="pt-1">
                <ImageUploader
                  value={initiativeForm.imageUrl}
                  onChange={(url) => setInitiativeForm({ ...initiativeForm, imageUrl: url })}
                  category="initiatives"
                  label="Initiative Banner Image"
                  helperText="Upload image from device (stored in public/admin/initiatives/) or enter URL."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Learn More Link URL
                </label>
                <input
                  type="text"
                  value={initiativeForm.link}
                  onChange={(e) => setInitiativeForm({ ...initiativeForm, link: e.target.value })}
                  placeholder="#"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none"
                />
              </div>

              <div className="pt-3 flex gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowInitiativeModal(false); setEditingInitiativeId(null); }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                  <span>{saving ? 'Saving...' : editingInitiativeId ? 'Update Initiative' : 'Add to Carousel'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: EDIT SIDEBAR & HERO SETTINGS MODAL */}
      {/* ======================================================== */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Settings className="text-[#2d5a3c]" size={18} />
                  Edit Sidebar, Hero & Stats Settings
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Update statistics numbers, labels, newsletter, and hero banner.
                </p>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSettingsSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">

              {/* Hero Banner settings */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-black uppercase text-[#2d5a3c] flex items-center gap-1.5">
                  <Sparkles size={13} /> Hero Banner Section
                </h4>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tag (e.g. EVENTS)</label>
                  <input
                    type="text"
                    value={settings.heroTag}
                    onChange={(e) => setSettings({ ...settings, heroTag: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 focus:border-[#2d5a3c] outline-none text-xs font-bold text-slate-900"
                  />
                </div>

                {/* Hero Banner Image with Local Uploader */}
                <ImageUploader
                  value={settings.heroImage}
                  onChange={(url) => setSettings({ ...settings, heroImage: url })}
                  category="events"
                  label="Hero Banner Image"
                  helperText="Upload custom banner from your device or use /events/e1.png"
                />

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Subtitle</label>
                  <textarea
                    rows={2}
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 focus:border-[#2d5a3c] outline-none text-xs font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Impact Statistics */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-black uppercase text-[#2d5a3c]">Impact Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 1 Number</label>
                    <input
                      type="text"
                      value={settings.stat1Number}
                      onChange={(e) => setSettings({ ...settings, stat1Number: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 1 Text (use &lt;br/&gt; for break)</label>
                    <input
                      type="text"
                      value={settings.stat1Text}
                      onChange={(e) => setSettings({ ...settings, stat1Text: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 2 Number</label>
                    <input
                      type="text"
                      value={settings.stat2Number}
                      onChange={(e) => setSettings({ ...settings, stat2Number: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 2 Text</label>
                    <input
                      type="text"
                      value={settings.stat2Text}
                      onChange={(e) => setSettings({ ...settings, stat2Text: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 3 Number</label>
                    <input
                      type="text"
                      value={settings.stat3Number}
                      onChange={(e) => setSettings({ ...settings, stat3Number: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 3 Text</label>
                    <input
                      type="text"
                      value={settings.stat3Text}
                      onChange={(e) => setSettings({ ...settings, stat3Text: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 4 Number</label>
                    <input
                      type="text"
                      value={settings.stat4Number}
                      onChange={(e) => setSettings({ ...settings, stat4Number: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Stat 4 Text</label>
                    <input
                      type="text"
                      value={settings.stat4Text}
                      onChange={(e) => setSettings({ ...settings, stat4Text: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Newsletter Block */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-black uppercase text-[#2d5a3c]">Newsletter Block</h4>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Title</label>
                  <input
                    type="text"
                    value={settings.newsletterTitle}
                    onChange={(e) => setSettings({ ...settings, newsletterTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={settings.newsletterText}
                    onChange={(e) => setSettings({ ...settings, newsletterText: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
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
