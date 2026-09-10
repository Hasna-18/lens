'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
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
  ExternalLink,
  Edit3,
  X,
  Star,
  Mic,
  ArrowRight,
  Eye,
  SlidersHorizontal,
  ZoomIn,
  Maximize2,
  Layers,
  RotateCcw,
  Check,
  Paperclip,
  FileText
} from 'lucide-react';
import ImageUploader from '../../../../components/admin/ImageUploader';
import PdfUploader from '../../../../components/admin/PdfUploader';
import { slugify } from '../../../../lib/slug';

export default function AdminLiveEventPlatformEditor({ params }) {
  const resolvedParams = params && typeof params.then === 'function' ? use(params) : params;
  const eventSlugOrId = resolvedParams?.slug || resolvedParams?.id || '1';
  const router = useRouter();

  const [authChecking, setAuthChecking] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  // Base Event Fields (Loaded live from database)
  const [baseEvent, setBaseEvent] = useState({
    id: null,
    slug: '',
    title: '',
    subtitle: '',
    dateDay: '',
    dateMonth: '',
    dateYear: '',
    category: '',
    imageUrl: '',
    filterType: 'Conferences'
  });

  // Deep Details State (Loaded live from database)
  const [details, setDetails] = useState({
    time: '',
    venue: '',
    mode: '',
    organizedBy: '',
    chiefGuest: '',
    inauguration: '',
    closingDate: '',
    aboutText: '',
    highlights: [],
    speakers: [],
    resources: []
  });

  // Image Modal state for changing Hero Image or Speaker Photo
  const [imageModal, setImageModal] = useState({
    isOpen: false,
    target: null, // 'hero' | { type: 'speaker', index: number }
    currentUrl: '',
    category: 'events',
    title: 'Update Image'
  });

  // PDF Document Modal state for Event Resources
  const [pdfModal, setPdfModal] = useState({
    isOpen: false,
    resourceIndex: null,
    currentUrl: '',
    title: 'Upload / Attach Resource Document (Cloudinary)'
  });

  // Adjust Hero Image Modal state
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // Hero Image Adjustments
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

  const updateHeroSetting = (field, value) => {
    setDetails(prev => ({
      ...prev,
      heroSettings: {
        ...defaultHeroSettings,
        ...(prev.heroSettings || {}),
        [field]: value
      }
    }));
  };

  const resetHeroSettings = () => {
    setDetails(prev => ({
      ...prev,
      heroSettings: { ...defaultHeroSettings }
    }));
    showToast('info', 'Hero image adjustments reset to default');
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 4000);
  };

  useEffect(() => {
    async function verifyAuthAndFetch() {
      try {
        const authRes = await fetch('/api/admin/check');
        if (!authRes.ok) {
          router.replace('/admin/login');
          return;
        }

        if (eventSlugOrId) {
          const res = await fetch(`/api/events/${encodeURIComponent(eventSlugOrId)}`);
          if (res.ok) {
            const data = await res.json();
            setBaseEvent({
              id: data.id,
              slug: data.slug || '',
              dateDay: data.dateDay || '',
              dateMonth: data.dateMonth || '',
              dateYear: data.dateYear || '',
              category: data.category || 'EVENT',
              title: data.title || '',
              subtitle: data.subtitle || '',
              imageUrl: data.imageUrl || '',
              filterType: data.filterType || 'Conferences'
            });

            if (data.details) {
              setDetails({
                time: data.details.time || '',
                venue: data.details.venue || '',
                mode: data.details.mode || '',
                organizedBy: data.details.organizedBy || '',
                chiefGuest: data.details.chiefGuest || '',
                inauguration: data.details.inauguration || '',
                closingDate: data.details.closingDate || '',
                aboutText: data.details.aboutText || '',
                highlights: Array.isArray(data.details.highlights) ? data.details.highlights : [],
                speakers: Array.isArray(data.details.speakers) ? data.details.speakers : [],
                resources: Array.isArray(data.details.resources) ? data.details.resources : [],
                heroSettings: data.details.heroSettings || {}
              });
            }
          } else {
            showToast('error', 'Event not found in database');
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setAuthChecking(false);
        setLoading(false);
      }
    }
    verifyAuthAndFetch();
  }, [router, eventSlugOrId]);

  // Save All Changes to Database
  const handleSave = async () => {
    setSaving(true);
    try {
      const finalSlug = baseEvent.slug || slugify(baseEvent.title);
      const payload = {
        ...baseEvent,
        slug: finalSlug,
        details: details
      };
      const res = await fetch('/api/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save event updates');
      const updated = await res.json();
      if (updated.slug) {
        setBaseEvent(prev => ({ ...prev, slug: updated.slug }));
      }
      showToast('success', 'Changes saved! Live public page is updated in real-time.');
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  // Speaker Handlers
  const addSpeaker = () => {
    setDetails(prev => ({
      ...prev,
      speakers: [
        ...(prev.speakers || []),
        {
          name: 'Speaker Name',
          role: 'Keynote Speaker',
          organization: 'Institution or Organization',
          bio: 'Short bio describing the speaker achievements and topic.',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
        }
      ]
    }));
  };

  const updateSpeaker = (index, field, value) => {
    const updated = [...(details.speakers || [])];
    updated[index][field] = value;
    setDetails(prev => ({ ...prev, speakers: updated }));
  };

  const removeSpeaker = (index) => {
    const updated = [...(details.speakers || [])];
    updated.splice(index, 1);
    setDetails(prev => ({ ...prev, speakers: updated }));
  };

  // Highlights Handlers
  const addHighlight = () => {
    setDetails(prev => ({
      ...prev,
      highlights: [
        ...(prev.highlights || []),
        { title: 'New Highlight', desc: 'Brief highlight description', icon: 'Star' }
      ]
    }));
  };

  const updateHighlight = (index, field, value) => {
    const updated = [...(details.highlights || [])];
    updated[index][field] = value;
    setDetails(prev => ({ ...prev, highlights: updated }));
  };

  const removeHighlight = (index) => {
    const updated = [...(details.highlights || [])];
    updated.splice(index, 1);
    setDetails(prev => ({ ...prev, highlights: updated }));
  };

  // Resource Handlers
  const addResource = () => {
    setDetails(prev => ({
      ...prev,
      resources: [
        ...(prev.resources || []),
        { title: 'Event Brochure & Agenda', type: 'PDF Document (1.5 MB)', link: '#' }
      ]
    }));
  };

  const updateResource = (index, field, value) => {
    const updated = [...(details.resources || [])];
    updated[index][field] = value;
    setDetails(prev => ({ ...prev, resources: updated }));
  };

  const removeResource = (index) => {
    const updated = [...(details.resources || [])];
    updated.splice(index, 1);
    setDetails(prev => ({ ...prev, resources: updated }));
  };

  // Helper to safely render dynamic icons
  const renderIcon = (iconName, size = 22, className = '') => {
    const IconComponent = {
      'Star': Star, 'User': User, 'Users': Users, 'MapPin': MapPin, 'Clock': Clock,
      'Calendar': Calendar, 'Building': Building, 'Mic': Mic, 'Projector': Projector,
      'FlaskConical': FlaskConical, 'Network': Network, 'GraduationCap': GraduationCap,
      'Briefcase': Briefcase, 'Monitor': Monitor, 'Microscope': Microscope, 'Sparkles': Sparkles
    }[iconName] || Star;
    return <IconComponent size={size} strokeWidth={1.5} className={className} />;
  };

  // Open Image Upload Modal
  const openHeroImageModal = () => {
    setImageModal({
      isOpen: true,
      target: 'hero',
      currentUrl: baseEvent.imageUrl,
      category: 'events',
      title: 'Update Main Event Hero Poster'
    });
  };

  const openSpeakerImageModal = (index) => {
    const current = details.speakers?.[index]?.imageUrl || '';
    setImageModal({
      isOpen: true,
      target: { type: 'speaker', index },
      currentUrl: current,
      category: 'speakers',
      title: `Update Photo for ${details.speakers?.[index]?.name || 'Speaker'}`
    });
  };

  const handleImageModalSave = (newUrl) => {
    if (imageModal.target === 'hero') {
      setBaseEvent(prev => ({ ...prev, imageUrl: newUrl }));
    } else if (imageModal.target?.type === 'speaker') {
      updateSpeaker(imageModal.target.index, 'imageUrl', newUrl);
    }
    setImageModal(prev => ({ ...prev, isOpen: false }));
  };

  const openPdfModal = (index) => {
    const r = details.resources?.[index];
    setPdfModal({
      isOpen: true,
      resourceIndex: index,
      currentUrl: r?.link && r.link !== '#' ? r.link : '',
      title: `Attach PDF Document for ${r?.title || 'Resource'}`
    });
  };

  const handlePdfModalSave = (newUrl) => {
    if (pdfModal.resourceIndex !== null) {
      updateResource(pdfModal.resourceIndex, 'link', newUrl);
    }
    setPdfModal(prev => ({ ...prev, isOpen: false }));
    showToast('success', 'Document linked and saved to Cloudinary!');
  };

  if (authChecking || loading) {
    return (
      <div className="min-h-screen bg-[#edf4e8] flex items-center justify-center font-sans">
        <div className="text-center space-y-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <Loader2 className="animate-spin text-[#2d5a3c] mx-auto" size={32} />
          <p className="text-slate-600 text-xs font-semibold tracking-wide">Loading Live Platform Visual Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edf4e8] text-[#19241c] font-sans pb-32 pt-20 sm:pt-24 relative overflow-hidden">

      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-[80] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border transition-all animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-50 text-emerald-950 border-emerald-300' 
            : 'bg-rose-50 text-rose-950 border-rose-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={22} className="text-[#2d5a3c]" /> : <AlertCircle size={22} className="text-rose-600" />}
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* STICKY ACTION CONTROLLER DOCKED BELOW ADMIN NAVBAR */}
      {/* ============================================================ */}
      <div className="sticky top-18 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <Link
              href="/admin/events"
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 hover:text-slate-900 transition-colors border border-slate-200 flex items-center gap-1.5 text-xs font-bold"
              title="Return to Events Timeline"
            >
              <ArrowLeft size={16} />
              <span className="hidden md:inline">Back to Events</span>
            </Link>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2d5a3c]"></span>
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Live Platform Editor
              </span>
              <span className="hidden lg:inline text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                Click any sentence or image to edit directly
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/events/${baseEvent.slug || eventSlugOrId}`}
              target="_blank"
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-200 shadow-xs transition-colors"
            >
              <Eye size={14} />
              <span className="hidden sm:inline">View Public Page</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-black text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>{saving ? 'Saving Live...' : 'Save All Changes'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. HERO SECTION (Identical to Live /events/[id]) */}
      {/* ============================================================ */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-4">
        
        {/* FLOATING ACTION BUTTONS ON TOP-RIGHT (High Z-Index z-30, fully clickable!) */}
        <div className="hidden lg:flex absolute top-6 right-6 lg:right-10 z-30 items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={openHeroImageModal}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-xl border border-slate-200/90 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            title="Upload new image from device or URL"
          >
            <Camera size={14} className="text-[#2d5a3c]" />
            <span>Change Image</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAdjustModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#2d5a3c] text-xs font-bold shadow-xl border border-slate-200/90 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
            title="Adjust alignment, zoom, position, and brightness"
          >
            <SlidersHorizontal size={14} />
            <span>Adjust Image</span>
          </button>
        </div>

        {/* Background Image on Right with live Change & Adjust triggers */}
        <div 
          className="absolute top-0 right-0 h-full min-h-[520px] lg:h-[620px] xl:h-[670px] z-0 rounded-l-[3rem] overflow-hidden hidden lg:block pointer-events-none transition-all duration-300"
          style={{ width: `${heroSettings.widthPercent}%` }}
        >
          <img
            src={baseEvent.imageUrl}
            alt="Event Background"
            className="w-full h-full object-cover"
            style={{
              objectPosition: heroSettings.objectPosition,
              transform: `scale(${heroSettings.scale / 100})`,
              opacity: heroSettings.opacity / 100,
              transition: 'all 0.2s ease-out'
            }}
            onError={(e) => { e.currentTarget.src = "/events/e1.png"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#edf4e8] via-[#edf4e8]/90 via-[15%] to-transparent to-[50%] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#edf4e8] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#edf4e8] to-transparent pointer-events-none" />
        </div>

        {/* Mobile View Hero Banner (when showOnMobile is enabled) */}
        {heroSettings.showOnMobile && (
          <div className="lg:hidden w-full h-52 sm:h-64 rounded-3xl overflow-hidden mb-5 border border-slate-200 shadow-sm relative">
            <img
              src={baseEvent.imageUrl}
              alt={baseEvent.title}
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

        {/* Mobile Action Controls */}
        <div className="lg:hidden mb-4 p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img src={baseEvent.imageUrl} alt="Poster" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-slate-800 block truncate">Hero Poster Image</span>
              <span className="text-[10px] text-emerald-700 font-mono block">{heroSettings.objectPosition} • {heroSettings.scale}%</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={openHeroImageModal}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1"
            >
              <Camera size={12} />
              <span>Change</span>
            </button>
            <button
              type="button"
              onClick={() => setShowAdjustModal(true)}
              className="px-2.5 py-1.5 bg-[#2d5a3c] text-white text-xs font-bold rounded-lg flex items-center gap-1"
            >
              <SlidersHorizontal size={12} />
              <span>Adjust</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 min-h-[500px] lg:min-h-[600px] xl:min-h-[650px] items-center pb-12 lg:pb-0 pointer-events-none">

          <div className="lg:col-span-7 space-y-6 lg:pr-10 pt-4 pointer-events-auto">
            
            {/* Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#485b4d]">
              <Leaf size={14} className="text-[#2d5a3c] fill-[#2d5a3c]" />
              <span className="hover:text-[#1b3726] transition-colors cursor-pointer">Home</span>
              <span className="text-[#879b8c]">&gt;</span>
              <span className="hover:text-[#1b3726] transition-colors cursor-pointer">Events</span>
              <span className="text-[#879b8c]">&gt;</span>
              <span className="text-[#1b3726] font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">{baseEvent.title}</span>
            </div>

            {/* Category Tag & Slug (Directly Editable) */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={baseEvent.category}
                onChange={(e) => setBaseEvent({ ...baseEvent, category: e.target.value.toUpperCase() })}
                title="Click to edit category badge"
                className="inline-flex px-3 py-1 rounded-md bg-[#eaf1e4] text-[#2d5a3c] text-[10.5px] font-bold uppercase tracking-widest border-none outline-none focus:outline-none focus:ring-0 transition-all cursor-text max-w-[160px]"
              />
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/90 border border-slate-200 text-xs font-mono text-emerald-800 shadow-xs">
                <span className="text-slate-400 select-none text-[10px]">/events/</span>
                <input
                  type="text"
                  value={baseEvent.slug || ''}
                  onChange={(e) => setBaseEvent({ ...baseEvent, slug: slugify(e.target.value) })}
                  placeholder="event-slug"
                  title="Click to customize event slug"
                  className="bg-transparent border-none outline-none font-bold text-slate-800 text-[11px] w-36 sm:w-48"
                />
              </div>
            </div>

            {/* Event Title (Directly Editable in-place with exact live font) */}
            <div className="relative group/title">
              <textarea
                rows={2}
                value={baseEvent.title}
                onChange={(e) => setBaseEvent({ ...baseEvent, title: e.target.value })}
                placeholder="Enter event title..."
                title="Click to edit event title directly"
                className="w-full text-4xl sm:text-5xl lg:text-[3.3rem] font-normal text-[#131f17] leading-[1.1] tracking-tight font-serif max-w-2xl bg-transparent border-none focus:ring-0 outline-none focus:outline-none p-1 -ml-1 transition-all resize-none cursor-text"
              />
              <span className="absolute -top-3 right-4 opacity-0 group-hover/title:opacity-100 transition-opacity text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 pointer-events-none">
                Click to edit title sentence
              </span>
            </div>

            {/* Event Subtitle (Directly Editable in-place) */}
            <div className="relative group/sub">
              <input
                type="text"
                value={baseEvent.subtitle}
                onChange={(e) => setBaseEvent({ ...baseEvent, subtitle: e.target.value })}
                placeholder="Enter event subtitle sentence..."
                title="Click to edit subtitle sentence directly"
                className="w-full text-xl sm:text-2xl font-serif italic text-[#2d5a3c] bg-transparent border-none focus:ring-0 outline-none focus:outline-none px-1 -ml-1 transition-all cursor-text"
              />
              <span className="absolute -top-3 right-4 opacity-0 group-hover/sub:opacity-100 transition-opacity text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 pointer-events-none">
                Click to edit subtitle
              </span>
            </div>

            {/* Abstract / Intro summary snippet */}
            <div className="relative group/abs">
              <textarea
                rows={3}
                value={details.aboutText}
                onChange={(e) => setDetails({ ...details, aboutText: e.target.value })}
                placeholder="Summary description of the event..."
                title="Click to edit event abstract directly"
                className="w-full text-[#405245] text-sm leading-[1.7] max-w-xl font-normal bg-transparent border-none focus:ring-0 outline-none focus:outline-none p-1 -ml-1 transition-all resize-none cursor-text"
              />
              <span className="absolute -top-2 right-4 opacity-0 group-hover/abs:opacity-100 transition-opacity text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 pointer-events-none">
                Click to edit about summary
              </span>
            </div>

            {/* 4 Quick Info Pills (Directly Editable in-place, clean without black outlines) */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 pt-2 pb-4">
              
              {/* Date Pill */}
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/80 shadow-xs hover:border-[#2d5a3c] transition-colors">
                <div className="text-[#2d5a3c] shrink-0"><Calendar size={18} /></div>
                <div>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={baseEvent.dateDay}
                      onChange={(e) => setBaseEvent({ ...baseEvent, dateDay: e.target.value })}
                      className="w-7 text-xs sm:text-[13px] font-bold text-[#19241c] bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0"
                      placeholder="15"
                      title="Day"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={baseEvent.dateMonth}
                      onChange={(e) => setBaseEvent({ ...baseEvent, dateMonth: e.target.value.toUpperCase() })}
                      className="w-9 text-[10px] sm:text-[11px] text-[#556758] font-bold bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 uppercase"
                      placeholder="MAR"
                      title="Month"
                    />
                    <input
                      type="text"
                      value={baseEvent.dateYear}
                      onChange={(e) => setBaseEvent({ ...baseEvent, dateYear: e.target.value })}
                      className="w-9 text-[10px] sm:text-[11px] text-[#556758] font-bold bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0"
                      placeholder="2025"
                      title="Year"
                    />
                  </div>
                </div>
              </div>

              {/* Time Pill */}
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/80 shadow-xs hover:border-[#2d5a3c] transition-colors">
                <div className="text-[#2d5a3c] shrink-0"><Clock size={18} /></div>
                <div>
                  <input
                    type="text"
                    value={details.time}
                    onChange={(e) => setDetails({ ...details, time: e.target.value })}
                    className="w-28 text-xs sm:text-[13px] font-bold text-[#19241c] bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0"
                    placeholder="09:30 AM Onwards"
                    title="Event Time"
                  />
                  <div className="text-[10px] text-[#556758] font-medium">Session Time</div>
                </div>
              </div>

              {/* Venue Pill */}
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/80 shadow-xs hover:border-[#2d5a3c] transition-colors">
                <div className="text-[#2d5a3c] shrink-0"><MapPin size={18} /></div>
                <div>
                  <input
                    type="text"
                    value={details.venue}
                    onChange={(e) => setDetails({ ...details, venue: e.target.value })}
                    className="w-32 sm:w-36 text-xs sm:text-[13px] font-bold text-[#19241c] bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 truncate"
                    placeholder="Thiruvananthapuram"
                    title="Venue"
                  />
                  <div className="text-[10px] text-[#556758] font-medium">Location</div>
                </div>
              </div>

              {/* Mode Pill */}
              <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/80 shadow-xs hover:border-[#2d5a3c] transition-colors">
                <div className="text-[#2d5a3c] shrink-0"><Users size={18} /></div>
                <div>
                  <input
                    type="text"
                    value={details.mode}
                    onChange={(e) => setDetails({ ...details, mode: e.target.value })}
                    className="w-28 sm:w-32 text-xs sm:text-[13px] font-bold text-[#19241c] bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 truncate"
                    placeholder="Hybrid Mode"
                    title="Mode"
                  />
                  <div className="text-[10px] text-[#556758] font-medium">Format</div>
                </div>
              </div>

            </div>

            {/* Buttons Row (Preview) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] text-white text-[11.5px] font-bold uppercase tracking-wider flex items-center gap-3 shadow-[0_8px_20px_rgba(15,35,22,0.25)] pointer-events-none opacity-90"
              >
                <span>Register Now (Preview)</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                className="px-6 py-3.5 rounded-full bg-white border border-[#c1d1c4] text-[#1b3726] text-[11.5px] font-bold tracking-wider flex items-center gap-2.5 shadow-sm pointer-events-none opacity-90"
              >
                <span>Add to Calendar (Preview)</span>
                <CalendarPlus size={15} className="text-[#2d5a3c]" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d2e0d3] to-transparent opacity-80" />
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT AREA (Two Columns, matching live site) */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-16">

            {/* ABOUT THE EVENT (Directly Editable Paragraphs) */}
            <section className="relative group/about">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl sm:text-3xl font-serif text-[#122016]">About the Event</h2>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                  <Edit3 size={12} className="text-[#2d5a3c]" /> Direct sentence editor
                </span>
              </div>
              <textarea
                rows={7}
                value={details.aboutText}
                onChange={(e) => setDetails({ ...details, aboutText: e.target.value })}
                placeholder="Enter detailed description of the event..."
                className="w-full p-4 rounded-2xl bg-white border border-[#e8efe9] hover:border-[#2d5a3c] focus:border-[#2d5a3c] focus:ring-2 focus:ring-[#2d5a3c]/10 text-[#445548] text-sm leading-[1.8] outline-none transition-all shadow-xs"
              />
            </section>

            {/* HIGHLIGHTS SECTION (Live card grid with in-place editable titles & descriptions) */}
            <section className="bg-white rounded-[2rem] p-8 border border-[#e8efe9] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-serif text-[#122016]">Highlights</h3>
                  <p className="text-xs text-[#637667]">Cards display directly on the live event page</p>
                </div>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#2d5a3c] border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Highlight Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {(details.highlights || []).map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#fbfdfa] border border-[#e8efe9] relative group hover:border-[#2d5a3c]/40 transition-all">
                    
                    {/* Delete button on hover */}
                    <button
                      type="button"
                      onClick={() => removeHighlight(idx)}
                      className="absolute top-2 right-2 p-1 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove highlight"
                    >
                      <Trash2 size={13} />
                    </button>

                    <div className="w-12 h-12 rounded-2xl bg-[#f5f8f3] border border-[#e4ebe5] flex items-center justify-center text-[#2d5a3c] mb-3 shadow-xs">
                      {renderIcon(item.icon, 20)}
                    </div>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateHighlight(idx, 'title', e.target.value)}
                      placeholder="Card Title"
                      className="text-center font-bold text-xs text-[#19241c] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none w-full mb-1"
                    />

                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => updateHighlight(idx, 'desc', e.target.value)}
                      placeholder="Short sentence description"
                      className="text-center text-[11px] text-[#637667] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none w-full"
                    />
                  </div>
                ))}
              </div>

              {(!details.highlights || details.highlights.length === 0) && (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-400">No highlight cards configured.</p>
                </div>
              )}
            </section>

            {/* KEY SPEAKERS SECTION (Live Cards with direct photo click & in-place sentence edits) */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#122016]">Key Speakers</h2>
                  <p className="text-xs text-[#637667]">Click on photos or sentences to edit directly</p>
                </div>
                <button
                  type="button"
                  onClick={addSpeaker}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#2d5a3c] border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Key Speaker</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(details.speakers || []).map((spk, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-[1.8rem] bg-white border border-[#e8efe9] shadow-[0_2px_15px_rgba(0,0,0,0.02)] hover:border-[#2d5a3c]/40 hover:shadow-md transition-all relative group"
                  >
                    {/* Delete Speaker */}
                    <button
                      type="button"
                      onClick={() => removeSpeaker(idx)}
                      className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Remove speaker"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* Speaker Avatar with Click to Upload */}
                    <div
                      onClick={() => openSpeakerImageModal(idx)}
                      className="w-20 h-20 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-white shadow-sm relative group/avatar cursor-pointer"
                      title="Click to upload/change photo"
                    >
                      <img
                        src={spk.imageUrl}
                        alt={spk.name}
                        className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform"
                        onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/150?u=' + idx; }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                        <Camera size={18} />
                        <span className="text-[9px] font-bold mt-0.5">Edit Photo</span>
                      </div>
                    </div>

                    {/* Speaker Direct In-Place Editable Content */}
                    <div className="flex-1 space-y-1 min-w-0 pr-6">
                      <input
                        type="text"
                        value={spk.name}
                        onChange={(e) => updateSpeaker(idx, 'name', e.target.value)}
                        placeholder="Speaker Full Name"
                        className="w-full text-[15px] font-bold text-[#19241c] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none"
                      />

                      <div>
                        <input
                          type="text"
                          value={spk.role}
                          onChange={(e) => updateSpeaker(idx, 'role', e.target.value)}
                          placeholder="e.g. Chief Guest / Keynote"
                          className="inline-block px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider bg-[#eaf1e4] text-[#2d5a3c] border border-transparent hover:border-emerald-400 focus:border-[#2d5a3c] outline-none"
                        />
                      </div>

                      <input
                        type="text"
                        value={spk.organization}
                        onChange={(e) => updateSpeaker(idx, 'organization', e.target.value)}
                        placeholder="Organization or University"
                        className="w-full text-[11px] text-[#556758] font-medium leading-snug bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none"
                      />

                      <textarea
                        rows={2}
                        value={spk.bio}
                        onChange={(e) => updateSpeaker(idx, 'bio', e.target.value)}
                        placeholder="Short bio sentence..."
                        className="w-full text-[11px] text-[#6c7d70] leading-tight bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none resize-none pt-1"
                      />
                    </div>

                  </div>
                ))}
              </div>

              {(!details.speakers || details.speakers.length === 0) && (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                  <p className="text-xs text-slate-400">No speakers configured. Click "+ Add Key Speaker" to add presenters.</p>
                </div>
              )}
            </section>

          </div>

          {/* Right Sidebar (4 cols, matching live site) */}
          <div className="lg:col-span-4 space-y-8">

            {/* EVENT AT A GLANCE CARD */}
            <div className="bg-white rounded-[2rem] border border-[#e8efe9] shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden">
              <div className="px-7 pt-7 pb-4 flex items-center justify-between">
                <h3 className="text-xl font-serif text-[#122016]">Event at a Glance</h3>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Editable Fields
                </span>
              </div>

              <div className="px-7 pb-7 space-y-5">
                
                {/* Dates */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><Calendar size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Dates</h4>
                    <p className="text-[12px] text-[#556758]">{baseEvent.dateDay} {baseEvent.dateMonth} {baseEvent.dateYear}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><Clock size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Time</h4>
                    <input
                      type="text"
                      value={details.time}
                      onChange={(e) => setDetails({ ...details, time: e.target.value })}
                      className="w-full text-[12px] text-[#556758] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none"
                    />
                  </div>
                </div>

                {/* Venue */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><MapPin size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Venue</h4>
                    <input
                      type="text"
                      value={details.venue}
                      onChange={(e) => setDetails({ ...details, venue: e.target.value })}
                      className="w-full text-[12px] text-[#556758] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none"
                    />
                  </div>
                </div>

                {/* Mode */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><Users size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Mode</h4>
                    <input
                      type="text"
                      value={details.mode}
                      onChange={(e) => setDetails({ ...details, mode: e.target.value })}
                      className="w-full text-[12px] text-[#556758] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none"
                    />
                  </div>
                </div>

                {/* Organized by */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><Building size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Organized By</h4>
                    <textarea
                      rows={2}
                      value={details.organizedBy}
                      onChange={(e) => setDetails({ ...details, organizedBy: e.target.value })}
                      className="w-full text-[12px] text-[#556758] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none resize-none leading-snug"
                    />
                  </div>
                </div>

                {/* Chief Guest */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><User size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Chief Guest</h4>
                    <input
                      type="text"
                      value={details.chiefGuest}
                      onChange={(e) => setDetails({ ...details, chiefGuest: e.target.value })}
                      className="w-full text-[12px] text-[#556758] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none"
                    />
                  </div>
                </div>

                {/* Inauguration */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><Sparkles size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Inauguration</h4>
                    <input
                      type="text"
                      value={details.inauguration}
                      onChange={(e) => setDetails({ ...details, inauguration: e.target.value })}
                      className="w-full text-[12px] text-[#556758] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none"
                    />
                  </div>
                </div>

                {/* Registration Closing Date */}
                <div className="pt-4 border-t border-[#f0f4f1]">
                  <button
                    type="button"
                    className="w-full py-3.5 rounded-full bg-[#1b3726] text-white text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(27,55,38,0.2)] pointer-events-none opacity-90"
                  >
                    <span>Register Now (Preview)</span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="text-[11px] text-center text-[#6c7d70] mt-3 font-medium flex items-center justify-center gap-1">
                    <span>Registration closes on:</span>
                    <input
                      type="text"
                      value={details.closingDate}
                      onChange={(e) => setDetails({ ...details, closingDate: e.target.value })}
                      className="text-center font-bold text-[#19241c] bg-transparent border-b border-dashed border-slate-300 focus:border-[#2d5a3c] outline-none w-28"
                      placeholder="10 March 2025"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* EVENT RESOURCES BOX */}
            <div className="bg-[#f2f6f0] rounded-[2rem] border border-[#e4ede6] p-7">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-serif text-[#122016]">Event Resources</h3>
                <button
                  type="button"
                  onClick={addResource}
                  className="text-xs text-[#2d5a3c] font-bold hover:underline flex items-center gap-1"
                >
                  <Plus size={13} /> Add
                </button>
              </div>

              <div className="space-y-3">
                {(details.resources || []).map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#e4ede6] relative group hover:border-[#2d5a3c]/30 transition-all">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => openPdfModal(idx)}
                        className="w-9 h-9 rounded-xl bg-[#f4f7f2] hover:bg-emerald-100 flex items-center justify-center text-[#2d5a3c] shrink-0 transition-colors cursor-pointer"
                        title="Upload/Attach PDF to Cloudinary"
                      >
                        <Download size={16} strokeWidth={1.5} />
                      </button>
                      <div className="min-w-0 flex-1 pr-2">
                        <input
                          type="text"
                          value={doc.title}
                          onChange={(e) => updateResource(idx, 'title', e.target.value)}
                          placeholder="Brochure Title"
                          className="text-[12px] font-bold text-[#19241c] bg-transparent outline-none w-full"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={doc.type}
                            onChange={(e) => updateResource(idx, 'type', e.target.value)}
                            placeholder="PDF Document"
                            className="text-[10px] text-[#6c7d70] bg-transparent outline-none flex-1"
                          />
                          {doc.link && doc.link !== '#' && (
                            <span className="text-[9px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-mono truncate max-w-[120px]" title={doc.link}>
                              CDN Attached
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openPdfModal(idx)}
                        className="p-1.5 text-slate-400 hover:text-[#2d5a3c] hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Upload / Attach PDF to Cloudinary"
                      >
                        <Paperclip size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeResource(idx)}
                        className="p-1 text-slate-300 hover:text-rose-600 rounded cursor-pointer"
                        title="Remove resource"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
                {(!details.resources || details.resources.length === 0) && (
                  <p className="text-xs text-slate-400 text-center py-2">No download resources configured yet.</p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* IMAGE UPLOADER MODAL (FOR HERO & SPEAKER PHOTOS) */}
      {/* ============================================================ */}
      {imageModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#2d5a3c] flex items-center justify-center font-bold">
                  <Camera size={16} />
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">{imageModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setImageModal(prev => ({ ...prev, isOpen: false }))}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <ImageUploader
                value={imageModal.currentUrl}
                onChange={(url) => setImageModal(prev => ({ ...prev, currentUrl: url }))}
                category={imageModal.category}
                label="Select image from your device or paste URL"
                helperText="Stored on Cloudinary CDN and optimized for fast global delivery. Supports PNG, JPG, WEBP."
              />

              <div className="pt-3 flex gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setImageModal(prev => ({ ...prev, isOpen: false }))}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleImageModalSave(imageModal.currentUrl)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <CheckCircle2 size={14} />
                  <span>Apply Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* PDF DOCUMENT UPLOADER MODAL FOR EVENT RESOURCES */}
      {/* ============================================================ */}
      {pdfModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#2d5a3c] flex items-center justify-center font-bold">
                  <Download size={16} />
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">{pdfModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPdfModal(prev => ({ ...prev, isOpen: false }))}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <PdfUploader
                value={pdfModal.currentUrl}
                onChange={(url) => setPdfModal(prev => ({ ...prev, currentUrl: url }))}
                onFileDetails={(fileInfo) => {
                  if (pdfModal.resourceIndex !== null && fileInfo?.size) {
                    updateResource(pdfModal.resourceIndex, 'type', `PDF Document (${fileInfo.size})`);
                  }
                }}
                category="events"
                label="Select PDF file from device or paste URL"
                helperText="Uploads directly to Cloudinary CDN and links for public visitor download."
              />

              <div className="pt-3 flex gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPdfModal(prev => ({ ...prev, isOpen: false }))}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handlePdfModalSave(pdfModal.currentUrl)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <CheckCircle2 size={14} />
                  <span>Attach Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADJUST HERO IMAGE MODAL (POSITION, ZOOM, OPACITY, WIDTH) */}
      {/* ============================================================ */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#2d5a3c] flex items-center justify-center font-bold">
                  <SlidersHorizontal size={16} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">Adjust Hero Image</h3>
                  <p className="text-[11px] text-slate-500">Live preview updates instantly behind this dialog</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetHeroSettings}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <RotateCcw size={11} /> Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Alignment Grid */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center justify-between">
                  <span>Focal Alignment / Position</span>
                  <span className="font-mono text-emerald-700 capitalize text-[10px]">{heroSettings.objectPosition}</span>
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                  {[
                    { label: 'Top Left', val: 'top left' },
                    { label: 'Top Center', val: 'top center' },
                    { label: 'Top Right', val: 'top right' },
                    { label: 'Center Left', val: 'left center' },
                    { label: 'Center', val: 'center center' },
                    { label: 'Center Right', val: 'right center' },
                    { label: 'Bottom Left', val: 'bottom left' },
                    { label: 'Bottom Center', val: 'bottom center' },
                    { label: 'Bottom Right', val: 'bottom right' }
                  ].map(pos => {
                    const isSelected = heroSettings.objectPosition === pos.val;
                    return (
                      <button
                        key={pos.val}
                        type="button"
                        onClick={() => updateHeroSetting('objectPosition', pos.val)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-xl transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2d5a3c] text-white shadow-xs'
                            : 'bg-white hover:bg-slate-200/70 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {pos.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zoom / Scale Slider */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5"><ZoomIn size={14} className="text-[#2d5a3c]" /> Zoom / Scale</span>
                  <span className="font-mono text-[#2d5a3c] bg-white px-2 py-0.5 rounded border border-slate-200">{heroSettings.scale}%</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="160"
                  step="2"
                  value={heroSettings.scale}
                  onChange={(e) => updateHeroSetting('scale', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2d5a3c]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Normal (100%)</span>
                  <span>Zoomed (160%)</span>
                </div>
              </div>

              {/* Hero Section Width on Screen */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5"><Maximize2 size={14} className="text-[#2d5a3c]" /> Banner Width on Screen</span>
                  <span className="font-mono text-[#2d5a3c] bg-white px-2 py-0.5 rounded border border-slate-200">{heroSettings.widthPercent}%</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="70"
                  step="1"
                  value={heroSettings.widthPercent}
                  onChange={(e) => updateHeroSetting('widthPercent', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2d5a3c]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Compact (45%)</span>
                  <span>Default (55%)</span>
                  <span>Wide (70%)</span>
                </div>
              </div>

              {/* Opacity / Intensity Slider */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5"><Layers size={14} className="text-[#2d5a3c]" /> Image Opacity / Brightness</span>
                  <span className="font-mono text-[#2d5a3c] bg-white px-2 py-0.5 rounded border border-slate-200">{heroSettings.opacity}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={heroSettings.opacity}
                  onChange={(e) => updateHeroSetting('opacity', Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2d5a3c]"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Soft Fade (40%)</span>
                  <span>Full (100%)</span>
                </div>
              </div>

              {/* Mobile View Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Show Banner on Mobile</span>
                  <span className="text-[11px] text-slate-500">Render poster image above title on mobile/tablets</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(heroSettings.showOnMobile)}
                    onChange={(e) => updateHeroSetting('showOnMobile', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2d5a3c]"></div>
                </label>
              </div>

              {/* Close and Apply */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAdjustModal(false)}
                  className="w-full py-3 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Check size={14} />
                  <span>Apply Adjustments</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
