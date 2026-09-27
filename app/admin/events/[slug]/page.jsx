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
  ChevronLeft,
  ChevronRight,
  Paperclip,
  FileText
} from 'lucide-react';
import ImageUploader from '../../../../components/admin/ImageUploader';
import PdfUploader from '../../../../components/admin/PdfUploader';
import { slugify } from '../../../../lib/slug';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// Helper to convert dateDay, dateMonth, dateYear to 'YYYY-MM-DD' for <input type="date" />
const getIsoDate = (day, monthStr, year) => {
  if (!day || !monthStr || !year) return '';
  let mIdx = MONTHS.indexOf(String(monthStr).toUpperCase().trim());
  if (mIdx === -1) {
    const numM = parseInt(monthStr, 10);
    if (!isNaN(numM) && numM >= 1 && numM <= 12) {
      mIdx = numM - 1;
    } else {
      const fullDate = new Date(`${monthStr} 1, 2000`);
      if (!isNaN(fullDate.getTime())) {
        mIdx = fullDate.getMonth();
      }
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

// Helper to convert time string to 'HH:mm' for <input type="time" />
const getTime24 = (timeStr) => {
  if (!timeStr) return '';
  const match = String(timeStr).match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return '';
  let hours = parseInt(match[1], 10);
  const mins = match[2];
  const ampm = match[3] ? match[3].toUpperCase() : null;
  if (ampm === 'PM' && hours < 12) hours += 12;
  if (ampm === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${mins}`;
};

// Helper to convert closing date string into 'YYYY-MM-DD' for date input (handles DD/MM/YYYY, DD-MM-YYYY, etc.)
const getIsoDateFromClosing = (str) => {
  if (!str) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  const ddmmyyyyMatch = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (ddmmyyyyMatch) {
    const dd = String(ddmmyyyyMatch[1]).padStart(2, '0');
    const mm = String(ddmmyyyyMatch[2]).padStart(2, '0');
    const yyyy = ddmmyyyyMatch[3];
    return `${yyyy}-${mm}-${dd}`;
  }
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  return '';
};

// Helper to format any dateDay, dateMonth, dateYear cleanly into DD/MM/YYYY
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

export default function AdminLiveEventPlatformEditor({ params }) {
  const resolvedParams = params && typeof params.then === 'function' ? use(params) : params;
  const eventSlugOrId = resolvedParams?.slug || resolvedParams?.id || '1';
  const router = useRouter();

  const [authChecking, setAuthChecking] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [registrations, setRegistrations] = useState([]);

  // Registration Pagination
  const [registrationPage, setRegistrationPage] = useState(1);
  const regsPerPage = 10;
  const totalRegPages = Math.ceil(registrations.length / regsPerPage) || 1;
  const currentRegistrations = registrations.slice(
    (registrationPage - 1) * regsPerPage,
    registrationPage * regsPerPage
  );

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

  // Highlight Icon Picker State
  const [openIconPickerIdx, setOpenIconPickerIdx] = useState(null);
  const AVAILABLE_ICONS = ['Star', 'User', 'Users', 'MapPin', 'Clock', 'Calendar', 'Building', 'Mic', 'Projector', 'FlaskConical', 'Network', 'GraduationCap', 'Briefcase', 'Monitor', 'Microscope', 'Sparkles'];

  // Drag to adjust image position state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = React.useRef({ x: 0, y: 0, pos: { x: 50, y: 50 } });

  const parsePosition = (posStr) => {
    if (!posStr) return { x: 50, y: 50 };
    if (posStr === 'left center') return { x: 0, y: 50 };
    const parts = posStr.split(' ');
    let x = 50, y = 50;
    if (parts[0]) x = parseFloat(parts[0]) || 50;
    if (parts[1]) y = parseFloat(parts[1]) || 50;
    return { x, y };
  };

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const startPos = parsePosition(heroSettings.objectPosition);
    dragStartRef.current = { x: e.clientX, y: e.clientY, pos: startPos };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const sensitivity = 0.2;
    let newX = dragStartRef.current.pos.x - (dx * sensitivity);
    let newY = dragStartRef.current.pos.y - (dy * sensitivity);
    newX = Math.max(0, Math.min(100, newX));
    newY = Math.max(0, Math.min(100, newY));
    updateHeroSetting('objectPosition', `${newX.toFixed(2)}% ${newY.toFixed(2)}%`);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  const [heroDateInput, setHeroDateInput] = useState('');

  useEffect(() => {
    setHeroDateInput(formatDateDDMMYYYY(baseEvent.dateDay, baseEvent.dateMonth, baseEvent.dateYear));
  }, [baseEvent.dateDay, baseEvent.dateMonth, baseEvent.dateYear]);


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

            // Fetch Registrations
            const regRes = await fetch(`/api/events/${encodeURIComponent(eventSlugOrId)}/register`);
            if (regRes.ok) {
              const regData = await regRes.json();
              setRegistrations(regData);
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

  // Live Date & Time Handlers
  const handleDateChange = (isoVal) => {
    if (!isoVal) {
      setBaseEvent(prev => ({ ...prev, dateDay: '', dateMonth: '', dateYear: '' }));
      return;
    }
    const [year, monthNum, dayNum] = isoVal.split('-');
    if (year && monthNum && dayNum) {
      const monthIdx = parseInt(monthNum, 10) - 1;
      const day = String(parseInt(dayNum, 10));
      const month = MONTHS[monthIdx] || 'JAN';
      setBaseEvent(prev => ({
        ...prev,
        dateDay: day,
        dateMonth: month,
        dateYear: year
      }));
    }
  };

  const handleTimeChange = (time24) => {
    if (!time24) {
      setDetails(prev => ({ ...prev, time: '' }));
      return;
    }
    const [hStr, mins] = time24.split(':');
    let hours = parseInt(hStr, 10);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let h12 = hours % 12;
    if (h12 === 0) h12 = 12;
    const formatted = `${String(h12).padStart(2, '0')}:${mins} ${ampm} Onwards`;
    setDetails(prev => ({ ...prev, time: formatted }));
  };

  const handleClosingDateChange = (isoVal) => {
    if (!isoVal) {
      setDetails(prev => ({ ...prev, closingDate: '' }));
      return;
    }
    const [yyyy, mm, dd] = isoVal.split('-');
    if (yyyy && mm && dd) {
      const day = String(parseInt(dd, 10)).padStart(2, '0');
      const month = String(parseInt(mm, 10)).padStart(2, '0');
      const formatted = `${day}/${month}/${yyyy}`;
      setDetails(prev => ({ ...prev, closingDate: formatted }));
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
        <div className={`fixed bottom-6 right-6 z-[80] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border transition-all animate-bounce ${toast.type === 'success'
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
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Live Platform Editor
              </span>
              <span className="hidden lg:inline text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                Click any sentence to edit directly
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
      {/* 1. HERO SECTION (Identical to Live /events/[id]) */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden">

        {/* Background Image on Right with live Change & Adjust triggers */}
        <div
          className="absolute top-0 right-0 h-full min-h-[520px] lg:h-[620px] xl:h-[670px] z-0 rounded-l-[3rem] overflow-hidden hidden lg:block transition-all duration-300"
          style={{ width: `${heroSettings.widthPercent}%` }}
        >
          <img
            src={baseEvent.imageUrl}
            alt="Event Background"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`w-full h-full object-cover ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{
              objectPosition: heroSettings.objectPosition,
              transform: `scale(${heroSettings.scale / 100})`,
              opacity: heroSettings.opacity / 100,
              transition: isDragging ? 'none' : 'all 0.2s ease-out'
            }}
            onError={(e) => { e.currentTarget.src = "/events/e1.png"; }}
            title="Drag to adjust image position"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#edf4e8] via-[#edf4e8]/90 via-[15%] to-transparent to-[50%] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#edf4e8] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#edf4e8] to-transparent pointer-events-none" />
        </div>

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
          </div>

          {/* Mobile View Hero Banner (when showOnMobile is enabled) */}
          {heroSettings.showOnMobile && (
            <div className="lg:hidden w-full h-52 sm:h-64 rounded-3xl overflow-hidden mb-5 border border-slate-200 shadow-sm relative">
              <img
                src={baseEvent.imageUrl}
                alt={baseEvent.title}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`w-full h-full object-cover ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                  objectPosition: heroSettings.objectPosition,
                  transform: `scale(${heroSettings.scale / 100})`,
                  opacity: heroSettings.opacity / 100,
                  transition: isDragging ? 'none' : 'all 0.2s ease-out'
                }}
                onError={(e) => { e.currentTarget.src = "/events/e1.png"; }}
                title="Drag to adjust image position"
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

                {/* Date Pill (Hybrid Text Input + Hidden Date Picker) */}
                <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/80 shadow-xs hover:border-[#2d5a3c] transition-colors">
                  <div className="text-[#2d5a3c] shrink-0 relative overflow-hidden w-5 h-5 flex items-center justify-center">
                    <Calendar size={18} className="absolute pointer-events-none" />
                    <input
                      type="date"
                      value={getIsoDate(baseEvent.dateDay, baseEvent.dateMonth, baseEvent.dateYear)}
                      onChange={(e) => handleDateChange(e.target.value)}
                      onClick={(e) => { try { e.target.showPicker(); } catch (err) { } }}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      title="Click to pick date from calendar"
                    />
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <input
                      type="text"
                      value={heroDateInput}
                      onChange={(e) => setHeroDateInput(e.target.value)}
                      onBlur={(e) => {
                        const str = e.target.value;
                        const parts = str.split(/[\/\-]/);
                        let d = parts[0] || '';
                        let m = parts[1] || '';
                        let y = parts[2] || '';
                        let mStr = m;
                        if (m && !isNaN(m)) {
                          const mIdx = parseInt(m, 10) - 1;
                          if (mIdx >= 0 && mIdx < 12) mStr = MONTHS[mIdx];
                        }
                        setBaseEvent(prev => ({ ...prev, dateDay: d, dateMonth: mStr, dateYear: y }));
                      }}
                      placeholder="DD/MM/YYYY"
                      title="Enter event date (DD/MM/YYYY)"
                      className="text-xs sm:text-[13px] font-bold text-[#19241c] bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 w-24 sm:w-28"
                    />
                    <div className="text-[10px] text-[#556758] font-bold truncate">Date</div>
                  </div>
                </div>

                {/* Time Pill (Native Time Input Picker) */}
                <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-[#d2e0d3]/80 shadow-xs hover:border-[#2d5a3c] transition-colors">
                  <div className="text-[#2d5a3c] shrink-0"><Clock size={18} /></div>
                  <div className="min-w-0">
                    <input
                      type="time"
                      value={getTime24(details.time)}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      title="Click to pick session time"
                      className="text-xs sm:text-[13px] font-bold text-[#19241c] bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 cursor-pointer block"
                    />
                    <div className="text-[10px] text-[#556758] font-medium truncate max-w-[130px]" title={details.time || 'Session Time'}>
                      {details.time || 'Set Session Time'}
                    </div>
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

              {openIconPickerIdx !== null && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setOpenIconPickerIdx(null)}
                />
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative z-50">
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

                    <div className="relative mb-3">
                      <div
                        onClick={() => setOpenIconPickerIdx(openIconPickerIdx === idx ? null : idx)}
                        className={`w-12 h-12 rounded-2xl bg-[#f5f8f3] border flex items-center justify-center text-[#2d5a3c] shadow-xs cursor-pointer transition-colors ${openIconPickerIdx === idx ? 'border-[#2d5a3c] bg-emerald-50' : 'border-[#e4ebe5] hover:border-[#2d5a3c]/40'}`}
                        title="Change Icon"
                      >
                        {renderIcon(item.icon, 20)}
                      </div>

                      {openIconPickerIdx === idx && (
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-64 bg-white p-3 rounded-2xl shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150">
                          <div className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider text-left pl-1">Choose Icon</div>
                          <div className="grid grid-cols-4 gap-2">
                            {AVAILABLE_ICONS.map(ico => (
                              <button
                                key={ico}
                                type="button"
                                onClick={() => {
                                  updateHighlight(idx, 'icon', ico);
                                  setOpenIconPickerIdx(null);
                                }}
                                className={`p-2 rounded-xl flex items-center justify-center transition-all ${item.icon === ico ? 'bg-[#2d5a3c] text-white shadow-xs' : 'bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-[#2d5a3c]'}`}
                                title={ico}
                              >
                                {renderIcon(ico, 16)}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateHighlight(idx, 'title', e.target.value)}
                      placeholder="Card Title"
                      className="text-center font-bold text-xs text-[#19241c] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none w-full mb-1"
                    />

                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => updateHighlight(idx, 'desc', e.target.value)}
                      placeholder="Short sentence description"
                      className="text-center text-[11px] text-[#637667] bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#2d5a3c] outline-none w-full resize-none"
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

                {/* Dates (Auto-synced from top date picker - DD/MM/YYYY) */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><Calendar size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Dates</h4>
                      <span className="text-[9px] text-[#2d5a3c] bg-[#eaf1e4] px-1.5 py-0.5 rounded font-bold">Synced</span>
                    </div>
                    <p className="text-[12px] text-[#556758] font-semibold">
                      {baseEvent.dateDay && baseEvent.dateMonth && baseEvent.dateYear
                        ? formatDateDDMMYYYY(baseEvent.dateDay, baseEvent.dateMonth, baseEvent.dateYear)
                        : <span className="text-slate-400 italic font-normal">Set date at top</span>}
                    </p>
                  </div>
                </div>

                {/* Time (Auto-synced from top time picker) */}
                <div className="flex gap-4 items-start">
                  <div className="text-[#2d5a3c] shrink-0 mt-0.5"><Clock size={18} strokeWidth={1.5} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11.5px] font-bold text-[#19241c] mb-0.5">Time</h4>
                      <span className="text-[9px] text-[#2d5a3c] bg-[#eaf1e4] px-1.5 py-0.5 rounded font-bold">Synced</span>
                    </div>
                    <p className="text-[12px] text-[#556758] font-semibold">
                      {details.time ? details.time : <span className="text-slate-400 italic font-normal">Set time at top</span>}
                    </p>
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

                  <div className="text-[11px] text-center text-[#6c7d70] mt-3 font-medium flex items-center justify-center gap-1.5 flex-wrap">
                    <span>Registration closes on:</span>
                    <div className="inline-flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs hover:border-[#2d5a3c] transition-colors">
                      <div className="relative w-4 h-4 flex items-center justify-center text-[#2d5a3c]">
                        <Calendar size={14} className="absolute pointer-events-none" />
                        <input
                          type="date"
                          value={getIsoDateFromClosing(details.closingDate)}
                          onChange={(e) => handleClosingDateChange(e.target.value)}
                          onClick={(e) => { try { e.target.showPicker(); } catch (err) { } }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          title="Click to pick closing date"
                        />
                      </div>
                      <input
                        type="text"
                        value={details.closingDate}
                        onChange={(e) => setDetails(prev => ({ ...prev, closingDate: e.target.value }))}
                        placeholder="DD/MM/YYYY"
                        title="Enter registration closing date (DD/MM/YYYY)"
                        className="text-xs font-bold text-[#19241c] bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 w-20 text-center"
                      />
                    </div>
                  </div>
                  {details.closingDate && (
                    <p className="text-[10.5px] text-center text-[#556758] mt-1 font-semibold">
                      Date (DD/MM/YYYY): <span className="text-[#2d5a3c] font-bold">{details.closingDate}</span>
                    </p>
                  )}
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
      {/* 3. EVENT REGISTRATIONS ADMIN PANEL */}
      {/* ============================================================ */}
      <div id="registrations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-24 scroll-mt-32">
        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />

          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-serif text-slate-800 flex items-center gap-2 mb-1">
                <Users className="text-emerald-600" size={24} />
                Registered Participants
              </h3>
              <p className="text-sm text-slate-500">People who have successfully registered for this event.</p>
            </div>
            <div className="px-5 py-2.5 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 flex items-center gap-3 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider">Total Registrations</span>
              <span className="text-2xl font-black">{registrations.length}</span>
            </div>
          </div>

          {registrations.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
              <Users size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">No registrations yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <th className="py-4 px-5">Name</th>
                    <th className="py-4 px-5">Phone</th>
                    <th className="py-4 px-5">DOB</th>
                    <th className="py-4 px-5">Institution</th>
                    <th className="py-4 px-5 text-right">Registered At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentRegistrations.map(reg => (
                    <tr key={reg.id} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="py-4 px-5 text-sm font-bold text-slate-800">{reg.name}</td>
                      <td className="py-4 px-5 text-sm font-medium text-slate-600">{reg.phone}</td>
                      <td className="py-4 px-5 text-sm font-medium text-slate-600">{reg.dob}</td>
                      <td className="py-4 px-5 text-sm font-medium text-slate-600">{reg.institution || '-'}</td>
                      <td className="py-4 px-5 text-xs font-semibold text-slate-400 text-right">
                        {new Date(reg.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination Controls */}
              {totalRegPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200 bg-slate-50">
                  <span className="text-xs text-slate-500 font-medium">
                    Showing {(registrationPage - 1) * regsPerPage + 1} to {Math.min(registrationPage * regsPerPage, registrations.length)} of {registrations.length} registrations
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRegistrationPage(prev => Math.max(prev - 1, 1))}
                      disabled={registrationPage === 1}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-bold text-slate-700 px-2">Page {registrationPage} of {totalRegPages}</span>
                    <button
                      onClick={() => setRegistrationPage(prev => Math.min(prev + 1, totalRegPages))}
                      disabled={registrationPage === totalRegPages}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
