'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
  Search,
  Download,
  BookOpen,
  Layers,
  Sparkles,
  Calendar,
  HardDrive,
  Check,
  SlidersHorizontal,
  Palette,
  Eye,
  Image as ImageIcon,
  Type,
  ArrowRight
} from 'lucide-react';
import PdfUploader from '../../../components/admin/PdfUploader';
import ImageUploader from '../../../components/admin/ImageUploader';
import PublicationCover, { COVER_TEMPLATES, THEME_PRESETS } from '../../../components/PublicationCover';

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

function Dots({ className = '' }) {
  return (
    <svg className={`pointer-events-none opacity-25 ${className}`} width="120" height="120" viewBox="0 0 120 120" fill="none">
      <pattern id="dot-pattern-resources" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#009ab1" />
      </pattern>
      <rect width="120" height="120" fill="url(#dot-pattern-resources)" />
    </svg>
  );
}

function Swirl({ className = '' }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 200 60" fill="none">
      <path d="M10 40 C 60 10, 140 70, 190 20" stroke="#009ab1" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 6" opacity="0.35" />
    </svg>
  );
}

export default function AdminResourcesPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [loading, setLoading] = useState(true);
  const [resourcesList, setResourcesList] = useState([]);

  // Search, filter, and sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'az', 'za'

  // Modal / Form state
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    coverTitle: '',
    coverSubtitle: '',
    coverDate: '',
    category: 'Brochures',
    type: 'PDF',
    size: '1.2 MB',
    desc: '',
    date: 'March 2025',
    downloadUrl: '#',
    coverType: 'brochure',
    themeColor: 'crimson',
    customBadge: 'BROCHURE',
    coverImage: '/campus_building.jpg'
  });

  const categories = ['All', 'Brochures', 'Submissions', 'Courseware', 'Toolkits', 'Guides', 'Reports'];
  const formCategories = ['Brochures', 'Submissions', 'Courseware', 'Toolkits', 'Guides', 'Reports'];

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 3500);
  };

  // Helper to determine cover template from category
  const getDefaultTemplateForCategory = (cat) => {
    const c = (cat || '').toLowerCase();
    if (c.includes('guide')) return { template: 'guide', theme: 'cyan', badge: 'LEnSE', l1: 'AI', l2: 'in Education' };
    if (c.includes('toolkit')) return { template: 'toolkit', theme: 'amber', badge: 'LEnSE', l1: 'STEM', l2: 'Activity Toolkit' };
    if (c.includes('course')) return { template: 'courseware', theme: 'lime', badge: 'FYUGP', l1: 'Learning', l2: 'Module' };
    if (c.includes('submission')) return { template: 'submission', theme: 'indigo', badge: 'SIET', l1: 'Call', l2: 'for Papers' };
    if (c.includes('brochure')) return { template: 'brochure', theme: 'crimson', badge: 'BROCHURE', l1: 'SIET 2025', l2: 'Conference' };
    return { template: 'report', theme: 'emerald', badge: 'LEnSE', l1: 'Annual', l2: 'Report' };
  };

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/resources');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const processed = data.map((item) => {
            const defaults = getDefaultTemplateForCategory(item.category);
            return {
              ...item,
              coverType: item.coverType || item.cover_type || defaults.template,
              themeColor: item.themeColor || item.theme_color || defaults.theme,
              customBadge: item.customBadge || item.custom_badge || defaults.badge,
              coverImage: item.coverImage || item.cover_image || '/campus_building.jpg',
              coverTitle: item.coverTitle || item.cover_title || '',
              coverSubtitle: item.coverSubtitle || item.cover_subtitle || '',
              coverDate: item.coverDate || item.cover_date || ''
            };
          });
          setResourcesList(processed);
        }
      } else {
        showToast('error', 'Failed to retrieve academic resources');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      showToast('error', 'Network error while contacting database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function verifyAuthAndLoad() {
      try {
        const res = await fetch('/api/admin/check');
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        await fetchResources();
      } catch (err) {
        router.replace('/admin/login');
      } finally {
        setAuthChecking(false);
      }
    }
    verifyAuthAndLoad();
  }, [router]);

  const handleOpenAdd = () => {
    setEditingId(null);
    const defaults = getDefaultTemplateForCategory('Brochures');
    const curDate = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });
    setFormData({
      title: '',
      coverTitle: '',
      coverSubtitle: '',
      coverDate: curDate,
      category: 'Brochures',
      type: 'PDF',
      size: 'Auto',
      desc: '',
      date: curDate,
      downloadUrl: '#',
      coverType: defaults.template,
      themeColor: defaults.theme,
      customBadge: defaults.badge,
      coverImage: '/campus_building.jpg'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    const defaults = getDefaultTemplateForCategory(item.category);
    setFormData({
      title: item.title || '',
      coverTitle: item.coverTitle || item.cover_title || '',
      coverSubtitle: item.coverSubtitle || item.cover_subtitle || '',
      coverDate: item.coverDate || item.cover_date || item.date || '',
      category: item.category || 'Brochures',
      type: item.type || 'PDF',
      size: item.size || 'Auto',
      desc: item.desc || '',
      date: item.date || '',
      downloadUrl: item.downloadUrl || item.download_url || '#',
      coverType: item.coverType || item.cover_type || defaults.template,
      themeColor: item.themeColor || item.theme_color || defaults.theme,
      customBadge: item.customBadge || item.custom_badge || defaults.badge,
      coverImage: item.coverImage || item.cover_image || '/campus_building.jpg'
    });
    setShowModal(true);
  };

  const handleCategoryChange = (newCat) => {
    const defaults = getDefaultTemplateForCategory(newCat);
    setFormData((prev) => ({
      ...prev,
      category: newCat,
      coverType: prev.coverType || defaults.template,
      themeColor: prev.themeColor || defaults.theme,
      customBadge: prev.customBadge || defaults.badge
    }));
  };

  const handleSaveResource = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('error', 'Resource Title is required');
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        // Update existing resource
        const res = await fetch('/api/resources', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData })
        });
        if (!res.ok) throw new Error('Update failed');
        showToast('success', 'Academic resource updated successfully');
      } else {
        // Add new resource
        const res = await fetch('/api/resources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Creation failed');
        showToast('success', 'New academic resource published successfully');
      }

      setShowModal(false);
      await fetchResources();
    } catch (err) {
      console.error('Save error:', err);
      showToast('error', 'Failed to save resource in database');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteResource = async (id) => {
    try {
      const res = await fetch(`/api/resources?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      showToast('success', 'Resource permanently removed');
      setDeleteConfirmId(null);
      await fetchResources();
    } catch (err) {
      console.error('Delete error:', err);
      showToast('error', 'Failed to delete resource');
    }
  };

  // Filtered and sorted resources
  const filtered = resourcesList
    .filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q)) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.type && item.type.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === 'az') return (a.title || '').localeCompare(b.title || '');
      if (sortOrder === 'za') return (b.title || '').localeCompare(a.title || '');
      return 0;
    });

  // Calculate quick metrics
  const totalCount = resourcesList.length;
  const brochuresCount = resourcesList.filter((r) => r.category === 'Brochures').length;
  const toolkitsCount = resourcesList.filter((r) => r.category === 'Toolkits' || r.category === 'Courseware').length;
  const guidesCount = resourcesList.filter((r) => r.category === 'Guides' || r.category === 'Reports').length;

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fbfb] via-[#f0f8f9] to-[#edf6f8] flex items-center justify-center font-sans">
        <div className="text-center space-y-4 bg-white/80 backdrop-blur-xl p-9 rounded-[2rem] shadow-xl border border-white/90">
          <Loader2 className="animate-spin text-[#009ab1] mx-auto" size={36} />
          <p className="text-slate-600 text-xs font-bold tracking-wider uppercase">Verifying Authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbfb] via-[#f0f8f9] to-[#edf6f8] text-slate-800 font-sans pb-32 pt-20 sm:pt-24 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glows & patterns from home page */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#009ab1]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-sky-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-teal-300/8 rounded-full blur-3xl pointer-events-none" />
      <Dots className="absolute top-28 left-8" />
      <Swirl className="absolute top-44 right-12 w-48" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-300">

        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-6 py-4 rounded-2xl shadow-2xl border text-xs font-bold animate-in slide-in-from-bottom duration-300 ${
              toast.type === 'error'
                ? 'bg-rose-50 text-rose-950 border-rose-300 shadow-xl'
                : 'bg-white/95 text-slate-900 border-[#009ab1]/40 shadow-[0_15px_40px_rgba(0,154,177,0.2)]'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle size={18} className="text-rose-600" /> : <CheckCircle2 size={18} className="text-[#009ab1]" />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 1. TOP HEADER & BREADCRUMB */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-white/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <Sparkles size={14} className="text-[#009ab1]" />
              <Link href="/admin" className="hover:text-[#009ab1] transition-colors">
                Admin Console
              </Link>
              <span className="text-slate-300">&gt;</span>
              <span className="text-slate-900 font-bold">Academic Resources &amp; Downloads</span>
            </div>
            <SectionTag label="Knowledge Repository" />
            <h1 style={SERIF} className="text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 tracking-tight">
              Academic Resources &amp; <Em>Downloads</Em>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-normal mt-2 max-w-2xl leading-relaxed">
              Manage official conference brochures, syllabus courseware, STEM toolkits, research proceedings, and university policy documents. Custom cover typography, image assets, and color themes sync dynamically to the public catalog.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={fetchResources}
              disabled={loading}
              className="p-3 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/80 text-slate-700 hover:text-[#009ab1] transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Refresh database records"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>

            <Link
              href="/resources"
              target="_blank"
              className="px-4 py-3 rounded-2xl bg-white/90 hover:bg-[#009ab1]/5 border border-slate-200/80 text-slate-700 hover:text-[#009ab1] text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <Eye size={15} />
              <span>Public Site View</span>
            </Link>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.3)] transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>Upload Resource</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. STATS OVERVIEW CARDS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 sm:p-6 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_rgba(0,154,177,0.05)] flex items-center gap-4 hover:shadow-[0_15px_40px_rgba(0,154,177,0.1)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#009ab1]/10 border border-[#009ab1]/20 flex items-center justify-center text-[#009ab1] shrink-0">
              <BookOpen size={22} />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Resources
              </span>
              <span style={SERIF} className="text-2xl sm:text-3xl font-normal text-slate-900 leading-tight block mt-0.5">
                {totalCount} <span className="text-xs font-sans text-slate-500 font-semibold">Files</span>
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_rgba(0,154,177,0.05)] flex items-center gap-4 hover:shadow-[0_15px_40px_rgba(0,154,177,0.1)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#009ab1]/10 border border-[#009ab1]/20 flex items-center justify-center text-[#009ab1] shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Brochures
              </span>
              <span style={SERIF} className="text-2xl sm:text-3xl font-normal text-slate-900 leading-tight block mt-0.5">
                {brochuresCount} <span className="text-xs font-sans text-slate-500 font-semibold">Documents</span>
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_rgba(0,154,177,0.05)] flex items-center gap-4 hover:shadow-[0_15px_40px_rgba(0,154,177,0.1)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#009ab1]/10 border border-[#009ab1]/20 flex items-center justify-center text-[#009ab1] shrink-0">
              <Layers size={22} />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Courseware &amp; Kits
              </span>
              <span style={SERIF} className="text-2xl sm:text-3xl font-normal text-slate-900 leading-tight block mt-0.5">
                {toolkitsCount} <span className="text-xs font-sans text-slate-500 font-semibold">Toolkits</span>
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_rgba(0,154,177,0.05)] flex items-center gap-4 hover:shadow-[0_15px_40px_rgba(0,154,177,0.1)] transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#009ab1]/10 border border-[#009ab1]/20 flex items-center justify-center text-[#009ab1] shrink-0">
              <HardDrive size={22} />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Guides &amp; Reports
              </span>
              <span style={SERIF} className="text-2xl sm:text-3xl font-normal text-slate-900 leading-tight block mt-0.5">
                {guidesCount} <span className="text-xs font-sans text-slate-500 font-semibold">Handbooks</span>
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SEARCH & CATEGORY FILTER DOCK */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_rgba(0,154,177,0.05)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#009ab1]" />
            <input
              type="text"
              placeholder="Search resources by title, format, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category Pills & Sort Toggle */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white shadow-[0_4px_15px_rgba(0,154,177,0.3)]'
                      : 'bg-white/90 hover:bg-[#009ab1]/10 text-slate-700 hover:text-[#009ab1] border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <button
              onClick={() => {
                if (sortOrder === 'default') setSortOrder('az');
                else if (sortOrder === 'az') setSortOrder('za');
                else setSortOrder('default');
              }}
              className={`p-2.5 rounded-xl border border-slate-200/80 transition-all shadow-xs cursor-pointer ${
                sortOrder !== 'default'
                  ? 'bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white'
                  : 'bg-white/90 text-slate-600 hover:bg-[#009ab1]/10 hover:text-[#009ab1]'
              }`}
              title={`Sort: ${sortOrder === 'az' ? 'A to Z' : sortOrder === 'za' ? 'Z to A' : 'Default'}`}
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. RESOURCE ITEMS LIST / CARDS */}
        {/* ========================================================================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-[#009ab1]" size={32} />
            <span className="text-xs font-semibold text-slate-500">
              Loading academic repository...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-14 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white/90 text-center space-y-4 shadow-sm">
            <BookOpen size={40} className="mx-auto text-slate-300" />
            <h3 style={SERIF} className="text-xl font-normal text-slate-900">No Academic Resources Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery || selectedCategory !== 'All'
                ? 'No resources match your current search or category filter. Try resetting filters.'
                : 'Your resources repository is currently empty. Click "Upload Resource" above to add the first document.'}
            </p>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 text-xs font-bold text-[#009ab1] hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const themeConfig = THEME_PRESETS[item.themeColor] || THEME_PRESETS.emerald;
              const hasPdf = Boolean(item.downloadUrl && item.downloadUrl !== '#' && item.downloadUrl.trim() !== '');

              return (
                <div
                  key={item.id}
                  className="rounded-[2rem] bg-white/85 backdrop-blur-2xl border border-white/90 p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,154,177,0.06)] hover:shadow-[0_20px_50px_rgba(0,154,177,0.12)] hover:-translate-y-1 hover:border-[#009ab1]/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle glass reflection highlight on top edge */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#009ab1]/30 to-transparent pointer-events-none" />

                  {/* Horizontal split inside card */}
                  <div className="grid grid-cols-12 gap-4 items-stretch relative z-10">
                    {/* Left Column: Publication Cover */}
                    <div className="col-span-4 sm:col-span-4 flex items-center justify-center">
                      <div className="w-full max-w-[115px] sm:max-w-[125px] aspect-[1/1.38]">
                        <PublicationCover
                          type={item.coverType}
                          theme={item.themeColor}
                          title={item.title}
                          coverTitle={item.coverTitle}
                          coverSubtitle={item.coverSubtitle}
                          date={item.date}
                          coverDate={item.coverDate}
                          customBadge={item.customBadge}
                          coverImage={item.coverImage}
                        />
                      </div>
                    </div>

                    {/* Right Column: Information & Meta */}
                    <div className="col-span-8 sm:col-span-8 flex flex-col justify-between space-y-2">
                      <div>
                        {/* Category Badge & Size */}
                        <div className="flex items-center justify-between gap-1 flex-wrap mb-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider ${themeConfig.badgeStyle}`}
                          >
                            {item.category || 'General'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {item.type || 'PDF'} • {item.size || 'N/A'}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 style={SERIF} className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-[1.3] group-hover:text-[#009ab1] transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11.5px] text-slate-600 leading-relaxed font-normal line-clamp-2 mt-1">
                          {item.desc || 'No detailed description provided.'}
                        </p>
                      </div>

                      {/* PDF Attachment Status Pill */}
                      {hasPdf ? (
                        <div className="flex items-center justify-between p-2 px-3 rounded-xl bg-[#009ab1]/10 border border-[#009ab1]/25 text-[10px] font-bold text-[#009ab1]">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <CheckCircle2 size={13} className="text-[#009ab1] shrink-0" />
                            <span className="truncate">Attached ({item.size || 'PDF'})</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={`/api/resources/download?id=${item.id}&mode=preview`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#009ab1] hover:text-[#00869c] font-bold flex items-center gap-1 hover:underline"
                              title="Preview document in browser viewer"
                            >
                              <Eye size={11} />
                              <span>Preview</span>
                            </a>
                            <span className="text-slate-300">•</span>
                            <a
                              href={`/api/resources/download?id=${item.id}&mode=download`}
                              download
                              className="text-[10px] text-[#009ab1] hover:text-[#00869c] font-bold flex items-center gap-1 hover:underline"
                              title="Download document file"
                            >
                              <Download size={11} />
                              <span>Download</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-2 px-3 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[10px] font-bold text-amber-900">
                          <div className="flex items-center gap-1.5">
                            <AlertCircle size={13} className="text-amber-600 shrink-0" />
                            <span>No PDF Uploaded</span>
                          </div>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="text-[10px] text-amber-800 underline hover:text-amber-950 font-bold cursor-pointer"
                          >
                            Attach PDF
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Card Footer: Date & Admin Actions */}
                  <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <Calendar size={13} className="text-[#009ab1]" />
                      <span>{item.date || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-3.5 py-1.5 rounded-full bg-white hover:bg-[#009ab1] hover:text-white text-slate-700 text-[11px] font-bold transition-all shadow-2xs border border-slate-200/80 flex items-center gap-1.5 cursor-pointer"
                        title="Edit resource metadata & design template"
                      >
                        <Edit3 size={11} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete resource"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. ADD / EDIT RESOURCE MODAL WITH LIVE PREVIEW & COMPLETE CUSTOMIZATION */}
        {/* ========================================================================= */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="w-full max-w-5xl bg-white/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/90 shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden my-6">
              {/* Modal Top Header */}
              <div className="p-6 sm:p-7 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-white via-white/80 to-[#009ab1]/5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#009ab1]/10 border border-[#009ab1]/25 flex items-center justify-center text-[#009ab1]">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h3 style={SERIF} className="text-xl sm:text-2xl font-bold text-slate-900">
                      {editingId ? 'Edit Academic Resource' : 'Publish Academic Resource'}
                    </h3>
                    <span className="text-xs text-slate-500">
                      Configure cover typography, custom image, palette, document metadata, and attach download PDF.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body: Split Grid (Left: Live Preview, Right: Edit Form) */}
              <form onSubmit={handleSaveResource} className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                  {/* --------------------------------------------------------------- */}
                  {/* LEFT COLUMN: LIVE CARD & COVER PREVIEW */}
                  {/* --------------------------------------------------------------- */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye size={15} className="text-[#009ab1]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Live Portal Preview
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#009ab1]/10 text-[#009ab1] border border-[#009ab1]/25">
                        {formData.coverType.toUpperCase()} • {formData.themeColor.toUpperCase()}
                      </span>
                    </div>

                    {/* Preview Card Shell (Identical to public site) */}
                    <div className="rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-slate-200/80 p-5 shadow-lg space-y-3">
                      <div className="grid grid-cols-12 gap-4 items-stretch">
                        {/* Cover Preview */}
                        <div className="col-span-5 flex items-center justify-center">
                          <div className="w-full max-w-[125px] aspect-[1/1.38]">
                            <PublicationCover
                              type={formData.coverType}
                              theme={formData.themeColor}
                              title={formData.title || 'Untitled Resource'}
                              coverTitle={formData.coverTitle}
                              coverSubtitle={formData.coverSubtitle}
                              date={formData.date}
                              coverDate={formData.coverDate}
                              customBadge={formData.customBadge}
                              coverImage={formData.coverImage}
                            />
                          </div>
                        </div>

                        {/* Card Info Preview */}
                        <div className="col-span-7 flex flex-col justify-between space-y-2 py-0.5">
                          <div>
                            <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${(THEME_PRESETS[formData.themeColor] || THEME_PRESETS.emerald).badgeStyle}`}
                              >
                                {formData.category}
                              </span>
                              <span className="text-[9.5px] font-mono text-slate-500">
                                {formData.type} • {formData.size}
                              </span>
                            </div>

                            <h4 style={SERIF} className="text-[14px] font-bold text-slate-900 leading-[1.3] line-clamp-2">
                              {formData.title || 'Resource Title Preview...'}
                            </h4>

                            <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3 mt-1 font-normal">
                              {formData.desc || 'Document synopsis or key topics outline will be rendered here.'}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-100">
                            <span className="flex items-center gap-1 font-medium">
                              <Calendar size={11} className="text-[#009ab1]" />
                              {formData.date || 'March 2025'}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white text-[9.5px] font-bold flex items-center gap-1 shadow-xs">
                              <span>Download</span>
                              <Download size={10} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Helpful Design Tip */}
                    <div className="p-4 rounded-2xl bg-[#009ab1]/5 border border-[#009ab1]/20 text-[11px] text-slate-600 leading-relaxed">
                      <strong className="text-[#009ab1] block mb-1">
                        Real-time Synchronized:
                      </strong>
                      Changes made to the cover title, subtitle, badge, template, and colors update live here and immediately sync with the public downloads catalog.
                    </div>
                  </div>

                  {/* --------------------------------------------------------------- */}
                  {/* RIGHT COLUMN: CUSTOMIZATION & FORM INPUTS */}
                  {/* --------------------------------------------------------------- */}
                  <div className="lg:col-span-7 space-y-5 max-h-[64vh] overflow-y-auto pr-1 no-scrollbar">

                    {/* A. TEMPLATE PICKER */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#009ab1]" />
                        <span>1. Publication Cover Template</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {COVER_TEMPLATES.map((tmpl) => {
                          const isSelected = formData.coverType === tmpl.id;
                          return (
                            <button
                              key={tmpl.id}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  coverType: tmpl.id,
                                  customBadge: prev.customBadge || tmpl.defaultBadge
                                }))
                              }
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                                isSelected
                                  ? 'bg-[#009ab1]/10 border-[#009ab1] ring-2 ring-[#009ab1]/20 shadow-xs'
                                  : 'bg-white border-slate-200/80 hover:border-[#009ab1]/40 hover:bg-[#009ab1]/5'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900">
                                  {tmpl.name}
                                </span>
                                {isSelected && (
                                  <Check size={14} className="text-[#009ab1]" />
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                                {tmpl.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* B. THEME COLOR SELECTION */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Palette size={14} className="text-[#009ab1]" />
                        <span>2. Color Palette &amp; Accent</span>
                      </label>
                      <div className="flex items-center gap-2 flex-wrap">
                        {Object.values(THEME_PRESETS).map((t) => {
                          const isSelected = formData.themeColor === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, themeColor: t.id }))}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-white border-[#009ab1] shadow-xs ring-2 ring-[#009ab1]/25 text-[#009ab1]'
                                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0"
                                style={{ backgroundColor: t.hex }}
                              />
                              <span className="text-[11px] font-semibold">
                                {t.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* C. COVER TYPOGRAPHY (TITLE, SUBTITLE, DATE & BADGE) */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 pb-1.5 border-b border-slate-100">
                        <Type size={14} className="text-[#009ab1]" />
                        <span>3. Cover Typography &amp; Badge</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600 block">
                            Cover Main Title (Line 1)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Annual, AI, STEM, Learning"
                            value={formData.coverTitle}
                            onChange={(e) => setFormData({ ...formData, coverTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600 block">
                            Cover Subtitle (Line 2)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Report, in Education, Activity Toolkit"
                            value={formData.coverSubtitle}
                            onChange={(e) => setFormData({ ...formData, coverSubtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600 block">
                            Cover Date / Academic Year
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 2024 - 2025, Semester II, March 2025"
                            value={formData.coverDate}
                            onChange={(e) => setFormData({ ...formData, coverDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-600 block">
                            Cover Badge Text
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. LEnSE, SIET, FYUGP, BROCHURE"
                            value={formData.customBadge}
                            onChange={(e) => setFormData({ ...formData, customBadge: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* D. COVER IMAGE / VISUAL ASSET */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <ImageIcon size={14} className="text-[#009ab1]" />
                          <span>4. Cover Photo &amp; Visual Asset</span>
                        </div>
                        {(formData.coverType === 'brochure' || formData.coverType === 'photo' || formData.coverType === 'image') && (
                          <span className="text-[10px] font-bold text-[#009ab1] bg-[#009ab1]/10 px-2 py-0.5 rounded-full border border-[#009ab1]/25">
                            {formData.coverType === 'brochure' ? 'Active in Brochure Arch Window' : 'Active in Full Photo Cover'}
                          </span>
                        )}
                      </div>

                      <ImageUploader
                        value={formData.coverImage}
                        onChange={(url) => setFormData((prev) => ({ ...prev, coverImage: url }))}
                        category="resources"
                        label="Upload Cover Architecture or Conference Photo"
                        helperText="Upload official photograph to render inside brochure arch window or visual cover."
                      />
                    </div>

                    {/* E. DOCUMENT METADATA */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 pb-1.5 border-b border-slate-100">
                        <FileText size={14} className="text-[#009ab1]" />
                        <span>5. Catalog Document Metadata</span>
                      </div>

                      {/* Full Document Title */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 block">
                          Catalog Document Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 4th SIET International Conference Official Brochure"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                        />
                      </div>

                      {/* Category & Format Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700 block">
                            Category *
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                          >
                            {formCategories.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700 block">
                            File Type / Format *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. PDF, PDF / Interactive, ZIP"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                          />
                        </div>
                      </div>

                      {/* Publication Date & Auto-detected File Size */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-700 block">
                            Publication / Term Date
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. March 2025, Semester II 2025"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                          />
                        </div>

                        {/* File Size: Auto-detected from uploaded PDF */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-semibold text-slate-700 block">
                              Detected File Size
                            </label>
                            <span className="text-[9.5px] text-[#009ab1] font-semibold">
                              Auto from PDF
                            </span>
                          </div>
                          <div className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center justify-between">
                            <span className="truncate">{formData.size || 'Auto (upload PDF)'}</span>
                            <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-[#009ab1]/10 text-[#009ab1] font-sans font-bold shrink-0">
                              Auto
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 block">
                          Description / Synopsis
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Outline key topics covered, intended audience, authors or mentors..."
                          value={formData.desc}
                          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1]"
                        />
                      </div>
                    </div>

                    {/* F. PDF DOCUMENT ATTACHMENT */}
                    <div className="pt-1">
                      <PdfUploader
                        value={formData.downloadUrl}
                        onChange={(url) => setFormData((prev) => ({ ...prev, downloadUrl: url }))}
                        onFileDetails={({ size, type, filename }) => {
                          setFormData((prev) => ({
                            ...prev,
                            size: size || prev.size,
                            type: type || prev.type,
                            title: prev.title.trim()
                              ? prev.title
                              : filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
                          }));
                        }}
                        category="resources"
                        label="Attach Downloadable PDF Document (10MB Max Limit)"
                        helperText="Upload official PDF file from your device (up to 10MB limit). File size will be automatically detected and saved."
                      />
                    </div>

                  </div>
                </div>

                {/* Modal Action Buttons Footer */}
                <div className="pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.3)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
                    <span>{saving ? 'Saving...' : editingId ? 'Save Changes' : 'Publish Resource'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. DELETE CONFIRMATION MODAL */}
        {/* ========================================================================= */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-[2rem] border border-white/90 shadow-2xl p-7 space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                  <Trash2 size={20} />
                </div>
                <div>
                  <h3 style={SERIF} className="text-lg font-bold text-slate-900">
                    Delete Academic Resource?
                  </h3>
                  <span className="text-xs text-slate-500">
                    This action is permanent and will remove the document from both admin and public catalogs.
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Keep Resource
                </button>
                <button
                  onClick={() => handleDeleteResource(deleteConfirmId)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
