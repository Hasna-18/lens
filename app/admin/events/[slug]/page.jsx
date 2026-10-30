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

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

function SectionTag({ label, light = false }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-2 ${
        light
          ? 'bg-white/10 text-white/90 border border-white/15'
          : 'bg-[#009ab1]/10 text-[#009ab1] border border-[#009ab1]/25'
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] animate-pulse" />
      {label}
    </div>
  );
}

function Em({ children }) {
  return (
    <span
      style={{
        fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif",
        fontStyle: 'italic',
        fontWeight: 400,
      }}
      className="text-[#009ab1] font-normal"
    >
      {children}
    </span>
  );
}

function Dots({ rows = 5, cols = 8, className = '' }) {
  return (
    <div className={`grid gap-2 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#009ab1]/45" />
      ))}
    </div>
  );
}

function Swirl({ className = '' }) {
  return (
    <div className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-[#009ab1]/25 via-sky-400/15 to-transparent blur-3xl ${className}`} />
  );
}

/* Silky ocean streaks background for the hero matching Home & About page */
function OceanWaves() {
  const colors = ['#ffffff', '#7dd3fc', '#0284c7', '#2563eb', '#bae6fd', '#0369a1'];
  const streaks = Array.from({ length: 40 }, (_, i) => ({
    d: `M -150 ${20 + i * 14} C 250 ${-80 + i * 12}, 650 ${240 - i * 3}, 1350 ${60 + i * 16}`,
    c: colors[(i * 5) % colors.length],
    w: 5 + ((i * 7) % 26),
    o: 0.25 + ((i * 13) % 50) / 100,
  }));
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full pointer-events-none select-none opacity-90" fill="none">
      <defs>
        <linearGradient id="ocean-base-admin-events" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f8ff" />
          <stop offset="0.45" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
        <filter id="ocean-blur-admin-events"><feGaussianBlur stdDeviation="8" /></filter>
      </defs>
      <rect width="1200" height="600" fill="url(#ocean-base-admin-events)" />
      <g filter="url(#ocean-blur-admin-events)">
        {streaks.map((s, i) => (
          <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} opacity={s.o} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

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
      <div className="min-h-screen bg-gradient-to-br from-[#f8fbfb] via-[#f0f8f9] to-[#edf6f8] flex items-center justify-center font-sans">
        <div className="text-center space-y-4 bg-white/80 backdrop-blur-xl p-9 rounded-[2rem] shadow-xl border border-white/90">
          <Loader2 className="animate-spin text-[#009ab1] mx-auto" size={36} />
          <p className="text-slate-600 text-xs font-bold tracking-wider uppercase">Loading Live Event Editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbfb] via-[#f0f8f9] to-[#edf6f8] text-slate-800 font-sans pb-32 pt-20 sm:pt-24 relative overflow-hidden">

      {/* Ambient background glows & patterns from home page */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#009ab1]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-sky-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-teal-300/8 rounded-full blur-3xl pointer-events-none" />
      <Dots className="absolute top-28 left-8" />
      <Swirl className="absolute top-44 right-12 w-48" />

      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-[80] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border transition-all animate-bounce ${
          toast.type === 'success'
            ? 'bg-white/95 text-slate-900 border-[#009ab1]/40 shadow-[0_15px_40px_rgba(0,154,177,0.2)]'
            : 'bg-rose-50 text-rose-950 border-rose-300 shadow-xl'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={22} className="text-[#009ab1]" /> : <AlertCircle size={22} className="text-rose-600" />}
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* STICKY ACTION CONTROLLER DOCKED BELOW ADMIN NAVBAR */}
      {/* ============================================================ */}
      <div className="sticky top-18 z-40 bg-white/80 backdrop-blur-xl border-b border-white/80 shadow-[0_4px_20px_rgba(0,154,177,0.05)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">

          <div className="flex items-center gap-3">
            <Link
              href="/admin/events"
              className="px-3.5 py-2 bg-white/90 hover:bg-slate-100 rounded-xl text-slate-700 hover:text-slate-900 transition-all border border-slate-200/80 flex items-center gap-1.5 text-xs font-bold shadow-2xs hover:border-[#009ab1]/40"
              title="Return to Events Timeline"
            >
              <ArrowLeft size={16} />
              <span className="hidden md:inline">Back to Events</span>
            </Link>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#009ab1] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                Live Platform Editor
              </span>
              <span className="hidden lg:inline text-[11px] font-medium text-slate-500 bg-[#009ab1]/5 px-2.5 py-0.5 rounded-full border border-[#009ab1]/15">
                Click any element to edit directly
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href={`/events/${baseEvent.slug || eventSlugOrId}`}
              target="_blank"
              className="px-3.5 py-2 bg-white/90 hover:bg-[#009ab1]/5 text-slate-700 hover:text-[#009ab1] font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-200/80 shadow-2xs transition-colors"
            >
              <Eye size={14} />
              <span className="hidden sm:inline">View Public Page</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white font-black text-xs flex items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.3)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
              <span>{saving ? 'Saving Live...' : 'Save All Changes'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. HERO SECTION (Matching About page hero & Home design)     */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden min-h-[580px] sm:min-h-[660px] flex flex-col justify-center pt-8 pb-16">

        {/* Silky Ocean Streaks Backdrop behind hero (matching Home & About) */}
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[68%] pointer-events-none z-0 opacity-40"
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 60%)'
          }}
        >
          <OceanWaves />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/60 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/85 to-transparent pointer-events-none" />

        {/* Natural Environment Blend Container (Full Bleed Right with Ultra-Smooth Feathered Blend) */}
        {baseEvent.imageUrl && (
          <div 
            className="absolute top-0 right-0 h-full min-h-[520px] lg:h-[620px] xl:h-[670px] w-full lg:w-[68%] xl:w-[64%] pointer-events-none z-0 overflow-hidden select-none hidden lg:block transition-all duration-500"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, rgba(0,0,0,0.03) 24%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.76) 66%, rgba(0,0,0,0.95) 82%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, rgba(0,0,0,0.03) 24%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.76) 66%, rgba(0,0,0,0.95) 82%, black 100%)'
            }}
          >
            <img
              src={baseEvent.imageUrl}
              alt={baseEvent.title || "Event Poster"}
              className="w-full h-full object-cover object-left-center transition-all duration-300"
              onError={(e) => { e.currentTarget.src = "/events/e1.png"; }}
            />
            {/* Edge Fading layers to blend smoothly with canvas */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/70 via-[20%] to-transparent to-[70%] w-full h-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/85 via-[35%] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#f4f8ff] to-transparent pointer-events-none" />
          </div>
        )}

        {/* Decorative ring + dots on the left edge (matching About page hero) */}
        <div className="hidden lg:block absolute -left-[270px] top-[22%] w-[320px] h-[320px] rounded-full border border-sky-400/40 pointer-events-none" />
        <div className="hidden lg:block absolute left-[80px] top-[60%] w-2.5 h-2.5 rounded-full bg-blue-600 pointer-events-none" />
        <Dots rows={8} cols={5} className="hidden lg:grid absolute left-3 bottom-16 pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-4 w-full my-auto">

          {/* FLOATING ACTION BUTTONS ON TOP-RIGHT */}
          <div className="hidden lg:flex absolute top-6 right-6 lg:right-10 z-30 items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={openHeroImageModal}
              className="px-4 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-800 text-xs font-bold shadow-[0_8px_30px_rgba(0,154,177,0.15)] border border-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
              title="Upload new image from device or URL"
            >
              <Camera size={15} className="text-[#009ab1]" />
              <span>Change Poster</span>
            </button>
          </div>

          {/* Mobile View Hero Banner (when showOnMobile is enabled) */}
          {heroSettings.showOnMobile && (
            <div className="lg:hidden w-full h-56 sm:h-64 rounded-[2rem] overflow-hidden mb-5 border border-white/80 shadow-md relative">
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
          <div className="lg:hidden mb-4 p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/90 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img src={baseEvent.imageUrl} alt="Poster" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-800 block truncate">Hero Poster Image</span>
                <span className="text-[10px] text-[#009ab1] font-mono block">{heroSettings.objectPosition} • {heroSettings.scale}%</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={openHeroImageModal}
                className="px-3 py-1.5 bg-[#009ab1]/10 hover:bg-[#009ab1]/20 text-[#009ab1] text-xs font-bold rounded-lg flex items-center gap-1 border border-[#009ab1]/20"
              >
                <Camera size={12} />
                <span>Change</span>
              </button>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 min-h-[500px] lg:min-h-[600px] xl:min-h-[650px] items-center pb-12 lg:pb-0 pointer-events-none">

            <div className="lg:col-span-7 space-y-6 lg:pr-10 pt-4 pointer-events-auto">

              {/* Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                <Sparkles size={14} className="text-[#009ab1]" />
                <Link href="/" className="hover:text-[#009ab1] transition-colors cursor-pointer">Home</Link>
                <span className="text-slate-300">&gt;</span>
                <Link href="/admin/events" className="hover:text-[#009ab1] transition-colors cursor-pointer">Events</Link>
                <span className="text-slate-300">&gt;</span>
                <span className="text-slate-900 font-bold line-clamp-1 max-w-[200px] sm:max-w-xs">{baseEvent.title || 'Event Details'}</span>
              </div>

              {/* Category Tag & Slug (Directly Editable) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <input
                  type="text"
                  value={baseEvent.category}
                  onChange={(e) => setBaseEvent({ ...baseEvent, category: e.target.value.toUpperCase() })}
                  title="Click to edit category badge"
                  className="inline-flex px-3.5 py-1 rounded-full bg-[#009ab1]/10 text-[#009ab1] text-[10.5px] font-bold uppercase tracking-widest border border-[#009ab1]/25 outline-none focus:outline-none focus:ring-2 focus:ring-[#009ab1]/20 transition-all cursor-text max-w-[170px]"
                />
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 text-xs font-mono text-[#009ab1] shadow-xs">
                  <span className="text-slate-400 select-none text-[11px]">/events/</span>
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

              {/* Event Title (Directly Editable in-place with exact home page serif) */}
              <div className="relative group/title">
                <textarea
                  rows={2}
                  value={baseEvent.title}
                  onChange={(e) => setBaseEvent({ ...baseEvent, title: e.target.value })}
                  placeholder="Enter event title..."
                  style={SERIF}
                  title="Click to edit event title directly"
                  className="w-full text-4xl sm:text-5xl lg:text-[3.2rem] font-normal text-slate-900 leading-[1.12] tracking-tight max-w-2xl bg-transparent border-none focus:ring-0 outline-none focus:outline-none p-1 -ml-1 transition-all resize-none cursor-text"
                />
                <span className="absolute -top-3 right-4 opacity-0 group-hover/title:opacity-100 transition-opacity text-[10px] font-bold text-[#009ab1] bg-[#009ab1]/10 px-2.5 py-0.5 rounded-full border border-[#009ab1]/20 pointer-events-none">
                  Click to edit title
                </span>
              </div>

              {/* Event Subtitle (Directly Editable in-place) */}
              <div className="relative group/sub">
                <input
                  type="text"
                  value={baseEvent.subtitle}
                  onChange={(e) => setBaseEvent({ ...baseEvent, subtitle: e.target.value })}
                  placeholder="Enter event subtitle sentence..."
                  style={SERIF}
                  title="Click to edit subtitle sentence directly"
                  className="w-full text-xl sm:text-2xl italic text-[#009ab1] bg-transparent border-none focus:ring-0 outline-none focus:outline-none px-1 -ml-1 transition-all cursor-text font-normal"
                />
                <span className="absolute -top-3 right-4 opacity-0 group-hover/sub:opacity-100 transition-opacity text-[10px] font-bold text-[#009ab1] bg-[#009ab1]/10 px-2.5 py-0.5 rounded-full border border-[#009ab1]/20 pointer-events-none">
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
                  className="w-full text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-xl font-normal bg-transparent border-none focus:ring-0 outline-none focus:outline-none p-1 -ml-1 transition-all resize-none cursor-text"
                />
                <span className="absolute -top-2 right-4 opacity-0 group-hover/abs:opacity-100 transition-opacity text-[10px] font-bold text-[#009ab1] bg-[#009ab1]/10 px-2.5 py-0.5 rounded-full border border-[#009ab1]/20 pointer-events-none">
                  Click to edit about summary
                </span>
              </div>

              {/* 4 Quick Info Pills (Directly Editable in-place, clean frosted glass style) */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 pt-2 pb-4">

                {/* Date Pill (Hybrid Text Input + Hidden Date Picker) */}
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/90 shadow-[0_8px_25px_rgba(0,154,177,0.06)] hover:border-[#009ab1]/40 hover:shadow-[0_12px_30px_rgba(0,154,177,0.12)] transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0 relative overflow-hidden">
                    <Calendar size={18} className="pointer-events-none" />
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
                      className="text-xs sm:text-[13px] font-bold text-slate-800 bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 w-24 sm:w-28"
                    />
                    <div className="text-[10px] text-[#009ab1] font-bold uppercase tracking-wider">Date</div>
                  </div>
                </div>

                {/* Time Pill (Native Time Input Picker) */}
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/90 shadow-[0_8px_25px_rgba(0,154,177,0.06)] hover:border-[#009ab1]/40 hover:shadow-[0_12px_30px_rgba(0,154,177,0.12)] transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <div className="min-w-0">
                    <input
                      type="time"
                      value={getTime24(details.time)}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      title="Click to pick session time"
                      className="text-xs sm:text-[13px] font-bold text-slate-800 bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 cursor-pointer block"
                    />
                    <div className="text-[10px] text-[#009ab1] font-bold uppercase tracking-wider truncate max-w-[130px]" title={details.time || 'Session Time'}>
                      {details.time || 'Time'}
                    </div>
                  </div>
                </div>

                {/* Venue Pill */}
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/90 shadow-[0_8px_25px_rgba(0,154,177,0.06)] hover:border-[#009ab1]/40 hover:shadow-[0_12px_30px_rgba(0,154,177,0.12)] transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={details.venue}
                      onChange={(e) => setDetails({ ...details, venue: e.target.value })}
                      className="w-32 sm:w-36 text-xs sm:text-[13px] font-bold text-slate-800 bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 truncate"
                      placeholder="Thiruvananthapuram"
                      title="Venue"
                    />
                    <div className="text-[10px] text-[#009ab1] font-bold uppercase tracking-wider">Location</div>
                  </div>
                </div>

                {/* Mode Pill */}
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/90 shadow-[0_8px_25px_rgba(0,154,177,0.06)] hover:border-[#009ab1]/40 hover:shadow-[0_12px_30px_rgba(0,154,177,0.12)] transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0">
                    <Users size={18} />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={details.mode}
                      onChange={(e) => setDetails({ ...details, mode: e.target.value })}
                      className="w-28 sm:w-32 text-xs sm:text-[13px] font-bold text-slate-800 bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 truncate"
                      placeholder="Hybrid Mode"
                      title="Mode"
                    />
                    <div className="text-[10px] text-[#009ab1] font-bold uppercase tracking-wider">Format</div>
                  </div>
                </div>

              </div>

              {/* Buttons Row (Preview) */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 shadow-[0_12px_26px_rgba(0,154,177,0.32)] pointer-events-none opacity-90"
                >
                  <span>Register Now (Preview)</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  type="button"
                  className="px-7 py-3.5 rounded-full bg-white/90 border border-white text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.06)] pointer-events-none opacity-90"
                >
                  <Calendar size={14} className="text-[#009ab1]" />
                  <span>Add to Calendar (Preview)</span>
                </button>
              </div>

            </div>

            {/* Right Column: Signature 3D Crystal Glass Card from About Page */}
            <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center lg:justify-end pointer-events-auto">
              <div className="relative w-[300px] sm:w-[340px] rounded-[1.8rem] p-6 sm:p-7 bg-gradient-to-br from-white/85 via-sky-50/65 to-blue-100/40 backdrop-blur-xl border border-white/90 shadow-[0_25px_60px_rgba(2,60,140,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition duration-300">
                <span className="absolute -top-3.5 -right-3.5 w-10 h-10 rounded-full bg-white/95 border border-white text-blue-600 flex items-center justify-center shadow-md">
                  <Sparkles size={18} />
                </span>

                {/* Event Poster Photo container inside the card with Change trigger */}
                {baseEvent.imageUrl && (
                  <div className="w-full h-44 rounded-2xl overflow-hidden mb-4 border border-white/90 shadow-sm relative group/img">
                    <img
                      src={baseEvent.imageUrl}
                      alt={baseEvent.title || "Poster"}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = "/events/e1.png"; }}
                    />
                    <button
                      type="button"
                      onClick={openHeroImageModal}
                      className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Camera size={18} />
                      <span>Change Poster</span>
                    </button>
                  </div>
                )}

                <p className="text-[10px] font-bold tracking-[0.22em] text-slate-500 uppercase mb-1">
                  {baseEvent.dateMonth ? `${baseEvent.dateMonth} SESSION` : 'CENTRE FOR LEARNING'}
                </p>
                <p style={SERIF} className="text-4xl sm:text-[46px] text-slate-900 leading-none my-1 font-normal">
                  {baseEvent.dateYear || '2025'}
                </p>
                <div className="space-y-1 mt-2.5">
                  <p className="text-[13px] font-semibold text-slate-800 line-clamp-2">
                    {baseEvent.title || 'Event Title'}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-relaxed truncate">
                    {details.venue || 'University of Kerala'}
                  </p>
                </div>
                <div className="w-8 h-[2px] bg-blue-600 rounded-full mt-3" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-6">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#009ab1]/25 to-transparent" />
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN CONTENT AREA (Two Columns, matching live site) */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">

          {/* Left Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">

            {/* ABOUT THE EVENT (Directly Editable Paragraphs) */}
            <section className="bg-white/80 backdrop-blur-xl rounded-[2.2rem] p-7 sm:p-9 border border-white/90 shadow-[0_12px_40px_rgba(0,154,177,0.06)] relative group/about overflow-hidden">
              <Dots className="absolute -top-8 -right-8 opacity-10" />
              <div className="flex items-center justify-between mb-4">
                <div>
                  <SectionTag label="Overview" />
                  <h2 style={SERIF} className="text-2xl sm:text-3xl text-slate-900 font-normal">About the Event</h2>
                </div>
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5 bg-[#009ab1]/5 px-3 py-1.5 rounded-full border border-[#009ab1]/15">
                  <Edit3 size={12} className="text-[#009ab1]" /> In-place editor
                </span>
              </div>
              <textarea
                rows={7}
                value={details.aboutText}
                onChange={(e) => setDetails({ ...details, aboutText: e.target.value })}
                placeholder="Enter detailed description of the event..."
                className="w-full p-5 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-[#009ab1]/50 focus:border-[#009ab1] focus:ring-4 focus:ring-[#009ab1]/10 text-slate-700 text-sm sm:text-[15px] leading-relaxed outline-none transition-all shadow-inner"
              />
            </section>

            {/* HIGHLIGHTS SECTION (Live card grid with in-place editable titles & descriptions) */}
            <section className="bg-white/80 backdrop-blur-xl rounded-[2.2rem] p-7 sm:p-9 border border-white/90 shadow-[0_12px_40px_rgba(0,154,177,0.06)] relative overflow-hidden">
              <Dots className="absolute -bottom-8 -left-8 opacity-10" />
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <SectionTag label="Key Elements" />
                  <h3 style={SERIF} className="text-2xl sm:text-3xl text-slate-900 font-normal">Highlights</h3>
                  <p className="text-xs text-slate-500 mt-1">Cards display directly on the live event page</p>
                </div>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#009ab1]/10 to-[#14b4cb]/15 hover:from-[#009ab1]/20 hover:to-[#14b4cb]/25 text-[#009ab1] border border-[#009ab1]/30 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Plus size={15} />
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
                  <div key={idx} className="flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-br from-white via-white/90 to-[#009ab1]/5 border border-slate-200/80 relative group hover:border-[#009ab1]/50 hover:shadow-[0_10px_30px_rgba(0,154,177,0.08)] transition-all">

                    {/* Delete button on hover */}
                    <button
                      type="button"
                      onClick={() => removeHighlight(idx)}
                      className="absolute top-2.5 right-2.5 p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Remove highlight"
                    >
                      <Trash2 size={13} />
                    </button>

                    <div className="relative mb-3.5">
                      <div
                        onClick={() => setOpenIconPickerIdx(openIconPickerIdx === idx ? null : idx)}
                        className={`w-12 h-12 rounded-2xl border flex items-center justify-center text-[#009ab1] shadow-xs cursor-pointer transition-all ${openIconPickerIdx === idx ? 'border-[#009ab1] bg-[#009ab1]/15 ring-4 ring-[#009ab1]/10 scale-105' : 'bg-[#009ab1]/10 border-[#009ab1]/20 hover:bg-[#009ab1]/15 hover:border-[#009ab1]/40'}`}
                        title="Change Icon"
                      >
                        {renderIcon(item.icon, 20)}
                      </div>

                      {openIconPickerIdx === idx && (
                        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150">
                          <div className="text-[10px] font-black text-[#009ab1] mb-2 uppercase tracking-wider text-left pl-1">Choose Icon</div>
                          <div className="grid grid-cols-4 gap-2">
                            {AVAILABLE_ICONS.map(ico => (
                              <button
                                key={ico}
                                type="button"
                                onClick={() => {
                                  updateHighlight(idx, 'icon', ico);
                                  setOpenIconPickerIdx(null);
                                }}
                                className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${item.icon === ico ? 'bg-[#009ab1] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-[#009ab1]/10 hover:text-[#009ab1]'}`}
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
                      className="text-center font-bold text-xs text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none w-full mb-1.5 transition-colors"
                    />

                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => updateHighlight(idx, 'desc', e.target.value)}
                      placeholder="Short sentence description"
                      className="text-center text-[11.5px] text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none w-full resize-none transition-colors"
                    />
                  </div>
                ))}
              </div>

              {(!details.highlights || details.highlights.length === 0) && (
                <div className="text-center py-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-400">No highlight cards configured. Click "+ Add Highlight Card" above.</p>
                </div>
              )}
            </section>

            {/* KEY SPEAKERS SECTION (Live Cards with direct photo click & in-place sentence edits) */}
            <section className="bg-white/80 backdrop-blur-xl rounded-[2.2rem] p-7 sm:p-9 border border-white/90 shadow-[0_12px_40px_rgba(0,154,177,0.06)] relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                  <SectionTag label="Distinguished Speakers" />
                  <h2 style={SERIF} className="text-2xl sm:text-3xl text-slate-900 font-normal">Key Speakers</h2>
                  <p className="text-xs text-slate-500 mt-1">Click on photos or text to edit details in real-time</p>
                </div>
                <button
                  type="button"
                  onClick={addSpeaker}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#009ab1]/10 to-[#14b4cb]/15 hover:from-[#009ab1]/20 hover:to-[#14b4cb]/25 text-[#009ab1] border border-[#009ab1]/30 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Plus size={15} />
                  <span>Add Key Speaker</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(details.speakers || []).map((spk, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-5 rounded-[2rem] bg-gradient-to-br from-white via-white/95 to-[#009ab1]/5 border border-slate-200/80 shadow-[0_4px_20px_rgba(0,154,177,0.04)] hover:border-[#009ab1]/40 hover:shadow-[0_10px_30px_rgba(0,154,177,0.1)] transition-all relative group"
                  >
                    {/* Delete Speaker */}
                    <button
                      type="button"
                      onClick={() => removeSpeaker(idx)}
                      className="absolute top-3.5 right-3.5 p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Remove speaker"
                    >
                      <Trash2 size={14} />
                    </button>

                    {/* Speaker Avatar with Click to Upload */}
                    <div
                      onClick={() => openSpeakerImageModal(idx)}
                      className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-white shadow-md relative group/avatar cursor-pointer"
                      title="Click to upload/change photo"
                    >
                      <img
                        src={spk.imageUrl}
                        alt={spk.name}
                        className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform"
                        onError={(e) => { e.currentTarget.src = 'https://i.pravatar.cc/150?u=' + idx; }}
                      />
                      <div className="absolute inset-0 bg-[#009ab1]/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                        <Camera size={18} />
                        <span className="text-[9px] font-bold mt-0.5">Edit Photo</span>
                      </div>
                    </div>

                    {/* Speaker Direct In-Place Editable Content */}
                    <div className="flex-1 space-y-1.5 min-w-0 pr-6">
                      <input
                        type="text"
                        value={spk.name}
                        onChange={(e) => updateSpeaker(idx, 'name', e.target.value)}
                        placeholder="Speaker Full Name"
                        className="w-full text-[15px] font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none transition-colors"
                      />

                      <div>
                        <input
                          type="text"
                          value={spk.role}
                          onChange={(e) => updateSpeaker(idx, 'role', e.target.value)}
                          placeholder="e.g. Chief Guest / Keynote"
                          className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#009ab1]/10 text-[#009ab1] border border-[#009ab1]/20 hover:border-[#009ab1]/50 focus:border-[#009ab1] outline-none transition-colors"
                        />
                      </div>

                      <input
                        type="text"
                        value={spk.organization}
                        onChange={(e) => updateSpeaker(idx, 'organization', e.target.value)}
                        placeholder="Organization or University"
                        className="w-full text-xs text-slate-500 font-medium leading-snug bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none transition-colors"
                      />

                      <textarea
                        rows={2}
                        value={spk.bio}
                        onChange={(e) => updateSpeaker(idx, 'bio', e.target.value)}
                        placeholder="Short bio sentence..."
                        className="w-full text-[11.5px] text-slate-500 leading-relaxed bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none resize-none pt-1 transition-colors"
                      />
                    </div>

                  </div>
                ))}
              </div>

              {(!details.speakers || details.speakers.length === 0) && (
                <div className="p-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-400">No speakers configured. Click "+ Add Key Speaker" to add presenters.</p>
                </div>
              )}
            </section>

          </div>

          {/* Right Sidebar (4 cols, matching live site) */}
          <div className="lg:col-span-4 space-y-8">

            {/* EVENT AT A GLANCE CARD */}
            <div className="bg-white/85 backdrop-blur-xl rounded-[2.2rem] border border-white/90 shadow-[0_15px_45px_rgba(0,154,177,0.08)] overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-[#009ab1] via-[#14b4cb] to-[#38bdf8]" />
              <div className="px-7 pt-6 pb-4 flex items-center justify-between">
                <div>
                  <SectionTag label="Quick Facts" />
                  <h3 style={SERIF} className="text-2xl text-slate-900 font-normal">Event at a Glance</h3>
                </div>
                <span className="text-[10px] text-[#009ab1] font-bold bg-[#009ab1]/10 px-2.5 py-1 rounded-full border border-[#009ab1]/25">
                  Live Synced
                </span>
              </div>

              <div className="px-7 pb-7 space-y-5">

                {/* Dates (Auto-synced from top date picker - DD/MM/YYYY) */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar size={17} strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11.5px] font-bold text-slate-900 mb-0.5">Dates</h4>
                      <span className="text-[9px] text-[#009ab1] bg-[#009ab1]/10 px-1.5 py-0.5 rounded font-bold">Synced</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold">
                      {baseEvent.dateDay && baseEvent.dateMonth && baseEvent.dateYear
                        ? formatDateDDMMYYYY(baseEvent.dateDay, baseEvent.dateMonth, baseEvent.dateYear)
                        : <span className="text-slate-400 italic font-normal">Set date at top</span>}
                    </p>
                  </div>
                </div>

                {/* Time (Auto-synced from top time picker) */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={17} strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[11.5px] font-bold text-slate-900 mb-0.5">Time</h4>
                      <span className="text-[9px] text-[#009ab1] bg-[#009ab1]/10 px-1.5 py-0.5 rounded font-bold">Synced</span>
                    </div>
                    <p className="text-xs text-slate-600 font-semibold">
                      {details.time ? details.time : <span className="text-slate-400 italic font-normal">Set time at top</span>}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={17} strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-slate-900 mb-0.5">Venue</h4>
                    <input
                      type="text"
                      value={details.venue}
                      onChange={(e) => setDetails({ ...details, venue: e.target.value })}
                      className="w-full text-xs text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Mode */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0 mt-0.5">
                    <Users size={17} strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-slate-900 mb-0.5">Mode</h4>
                    <input
                      type="text"
                      value={details.mode}
                      onChange={(e) => setDetails({ ...details, mode: e.target.value })}
                      className="w-full text-xs text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Organized by */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0 mt-0.5">
                    <Building size={17} strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-slate-900 mb-0.5">Organized By</h4>
                    <textarea
                      rows={2}
                      value={details.organizedBy}
                      onChange={(e) => setDetails({ ...details, organizedBy: e.target.value })}
                      className="w-full text-xs text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none resize-none leading-snug transition-colors"
                    />
                  </div>
                </div>

                {/* Chief Guest */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0 mt-0.5">
                    <User size={17} strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-slate-900 mb-0.5">Chief Guest</h4>
                    <input
                      type="text"
                      value={details.chiefGuest}
                      onChange={(e) => setDetails({ ...details, chiefGuest: e.target.value })}
                      className="w-full text-xs text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Inauguration */}
                <div className="flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles size={17} strokeWidth={1.7} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[11.5px] font-bold text-slate-900 mb-0.5">Inauguration</h4>
                    <input
                      type="text"
                      value={details.inauguration}
                      onChange={(e) => setDetails({ ...details, inauguration: e.target.value })}
                      className="w-full text-xs text-slate-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#009ab1] outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Registration Closing Date */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white text-[12px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(0,154,177,0.3)] pointer-events-none opacity-90"
                  >
                    <span>Register Now (Preview)</span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="text-[11px] text-center text-slate-500 mt-3 font-medium flex items-center justify-center gap-1.5 flex-wrap">
                    <span>Registration closes on:</span>
                    <div className="inline-flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-2xs hover:border-[#009ab1] transition-colors">
                      <div className="relative w-4 h-4 flex items-center justify-center text-[#009ab1]">
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
                        className="text-xs font-bold text-slate-800 bg-transparent outline-none border-none focus:outline-none focus:ring-0 p-0 m-0 w-20 text-center"
                      />
                    </div>
                  </div>
                  {details.closingDate && (
                    <p className="text-[10.5px] text-center text-slate-500 mt-1.5 font-semibold">
                      Date (DD/MM/YYYY): <span className="text-[#009ab1] font-bold">{details.closingDate}</span>
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* EVENT RESOURCES BOX */}
            <div className="bg-gradient-to-br from-[#009ab1]/5 via-white/85 to-[#14b4cb]/10 backdrop-blur-xl rounded-[2.2rem] border border-[#009ab1]/20 p-7 shadow-[0_12px_40px_rgba(0,154,177,0.06)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <SectionTag label="Downloads" />
                  <h3 style={SERIF} className="text-2xl text-slate-900 font-normal">Event Resources</h3>
                </div>
                <button
                  type="button"
                  onClick={addResource}
                  className="text-xs text-[#009ab1] hover:text-[#00869c] font-bold hover:underline flex items-center gap-1 cursor-pointer bg-white/80 px-2.5 py-1 rounded-full border border-[#009ab1]/20"
                >
                  <Plus size={13} /> Add
                </button>
              </div>

              <div className="space-y-3">
                {(details.resources || []).map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 relative group hover:border-[#009ab1]/40 shadow-xs hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <button
                        type="button"
                        onClick={() => openPdfModal(idx)}
                        className="w-9 h-9 rounded-xl bg-[#009ab1]/10 hover:bg-[#009ab1]/20 flex items-center justify-center text-[#009ab1] shrink-0 transition-colors cursor-pointer"
                        title="Upload/Attach PDF to Cloudinary"
                      >
                        <Download size={16} strokeWidth={1.7} />
                      </button>
                      <div className="min-w-0 flex-1 pr-2">
                        <input
                          type="text"
                          value={doc.title}
                          onChange={(e) => updateResource(idx, 'title', e.target.value)}
                          placeholder="Brochure Title"
                          className="text-[12px] font-bold text-slate-800 bg-transparent outline-none w-full"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={doc.type}
                            onChange={(e) => updateResource(idx, 'type', e.target.value)}
                            placeholder="PDF Document"
                            className="text-[10px] text-slate-500 bg-transparent outline-none flex-1"
                          />
                          {doc.link && doc.link !== '#' && (
                            <span className="text-[9px] text-[#009ab1] bg-[#009ab1]/10 px-1.5 py-0.5 rounded-full border border-[#009ab1]/25 font-mono truncate max-w-[120px]" title={doc.link}>
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
                        className="p-1.5 text-slate-400 hover:text-[#009ab1] hover:bg-[#009ab1]/10 rounded-lg transition-colors cursor-pointer"
                        title="Upload / Attach PDF to Cloudinary"
                      >
                        <Paperclip size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeResource(idx)}
                        className="p-1 text-slate-300 hover:text-rose-600 rounded cursor-pointer transition-colors"
                        title="Remove resource"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
                {(!details.resources || details.resources.length === 0) && (
                  <p className="text-xs text-slate-400 text-center py-3 bg-white/50 rounded-xl border border-dashed border-slate-200">
                    No download resources configured yet.
                  </p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.25)] border border-white/90 relative my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center font-bold">
                  <Camera size={18} />
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">{imageModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setImageModal(prev => ({ ...prev, isOpen: false }))}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
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
                  className="flex-1 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleImageModalSave(imageModal.currentUrl)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_8px_20px_rgba(0,154,177,0.25)] cursor-pointer"
                >
                  <CheckCircle2 size={15} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] max-w-lg w-full p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.25)] border border-white/90 relative my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#009ab1]/10 text-[#009ab1] flex items-center justify-center font-bold">
                  <Download size={18} />
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900">{pdfModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPdfModal(prev => ({ ...prev, isOpen: false }))}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
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
                  className="flex-1 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handlePdfModalSave(pdfModal.currentUrl)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-[0_8px_20px_rgba(0,154,177,0.25)] cursor-pointer"
                >
                  <CheckCircle2 size={15} />
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
      <div id="registrations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24 scroll-mt-32">
        <div className="bg-white/85 backdrop-blur-xl rounded-[2.2rem] p-8 sm:p-10 border border-white/90 shadow-[0_15px_45px_rgba(0,154,177,0.06)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#009ab1] via-[#14b4cb] to-[#38bdf8]" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <SectionTag label="Attendees" />
              <h3 style={SERIF} className="text-2xl sm:text-3xl text-slate-900 font-normal flex items-center gap-2 mb-1">
                <Users className="text-[#009ab1]" size={26} />
                Registered Participants
              </h3>
              <p className="text-sm text-slate-500">People who have successfully registered for this event.</p>
            </div>
            <div className="px-5 py-2.5 bg-[#009ab1]/10 text-[#009ab1] rounded-2xl border border-[#009ab1]/25 flex items-center gap-3 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider">Total Registrations</span>
              <span className="text-2xl font-black">{registrations.length}</span>
            </div>
          </div>

          {registrations.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
              <Users size={32} className="mx-auto text-slate-300 mb-3" />
              <p className="text-slate-500 font-medium">No registrations yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#009ab1]/5">
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
                    <tr key={reg.id} className="hover:bg-[#009ab1]/5 transition-colors">
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
                <div className="flex items-center justify-between px-5 py-4 border-t border-slate-200 bg-slate-50/70">
                  <span className="text-xs text-slate-500 font-medium">
                    Showing {(registrationPage - 1) * regsPerPage + 1} to {Math.min(registrationPage * regsPerPage, registrations.length)} of {registrations.length} registrations
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRegistrationPage(prev => Math.max(prev - 1, 1))}
                      disabled={registrationPage === 1}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-[#009ab1]/10 hover:text-[#009ab1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-bold text-slate-700 px-2">Page {registrationPage} of {totalRegPages}</span>
                    <button
                      onClick={() => setRegistrationPage(prev => Math.min(prev + 1, totalRegPages))}
                      disabled={registrationPage === totalRegPages}
                      className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-[#009ab1]/10 hover:text-[#009ab1] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
