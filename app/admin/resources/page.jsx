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
  Type
} from 'lucide-react';
import PdfUploader from '../../../components/admin/PdfUploader';
import ImageUploader from '../../../components/admin/ImageUploader';
import PublicationCover, { COVER_TEMPLATES, THEME_PRESETS } from '../../../components/PublicationCover';

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="animate-spin text-[#2d5a3c] dark:text-[#60a5fa]" size={32} />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#556959]">
          Verifying Console Authorization...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#020617] text-[#19241c] dark:text-slate-100 font-sans relative overflow-hidden transition-colors duration-300">
      {/* Ambient soft background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[8%] -left-40 w-[600px] h-[600px] bg-[#e1ecd6]/50 dark:bg-emerald-950/20 rounded-full blur-3xl" />
        <div className="absolute top-[50%] -right-40 w-[650px] h-[650px] bg-[#dbe8d0]/50 dark:bg-emerald-950/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in duration-300">

        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-xl border text-xs font-bold animate-in slide-in-from-bottom duration-300 ${
              toast.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
            <span>{toast.message}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 1. TOP HEADER & BREADCRUMB */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e2ece3] dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-[#5c7361] dark:text-slate-400 uppercase tracking-wider mb-1.5">
              <Link href="/admin" className="hover:text-[#1b3726] dark:hover:text-[#60a5fa] transition-colors">
                Admin Console
              </Link>
              <span>/</span>
              <span className="text-[#132418] dark:text-white">Academic Resources &amp; Downloads</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-[#122417] dark:text-white tracking-tight">
              Academic Resources &amp; Downloads
            </h1>
            <p className="text-xs sm:text-sm text-[#546b59] dark:text-slate-300 font-normal mt-1 max-w-2xl leading-relaxed">
              Manage official conference brochures, syllabus courseware, experiential STEM toolkits, research proceedings, and university policy documents. Custom cover typography, image assets &amp; themes sync dynamically to the public catalog.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={fetchResources}
              disabled={loading}
              className="p-2.5 rounded-xl bg-white dark:bg-[#020617]/40 dark:backdrop-blur-xl border border-[#d8e5da] dark:border-white/10 text-[#2d4032] dark:text-slate-200 hover:bg-[#f1f6f1] dark:hover:bg-white/10 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Refresh database records"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>

            <Link
              href="/resources"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#020617]/40 dark:backdrop-blur-xl border border-[#d8e5da] dark:border-white/10 text-[#1b3726] dark:text-emerald-300 hover:bg-[#f1f6f1] dark:hover:bg-white/10 text-xs font-bold transition-all shadow-xs flex items-center gap-2"
            >
              <span>Public Site View</span>
              <ExternalLink size={14} />
            </Link>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-xl bg-[#1b3726] hover:bg-[#254d35] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
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
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#020617]/40 dark:backdrop-blur-xl border border-[#e2ece3] dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#eef5ee] dark:bg-white/10 border border-[#d6e6d8] dark:border-white/10 flex items-center justify-center text-[#2d5a3c] dark:text-emerald-400 shrink-0">
              <BookOpen size={22} />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-[#627766] dark:text-slate-400 uppercase tracking-wider block">
                Total Resources
              </span>
              <span className="text-xl sm:text-2xl font-serif font-normal text-[#122417] dark:text-white leading-tight block mt-0.5">
                {totalCount} <span className="text-xs font-sans text-[#485e4d] dark:text-slate-400">Files</span>
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#020617]/40 dark:backdrop-blur-xl border border-[#e2ece3] dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#eef5ee] dark:bg-white/10 border border-[#d6e6d8] dark:border-white/10 flex items-center justify-center text-[#2d5a3c] dark:text-emerald-400 shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-[#627766] dark:text-slate-400 uppercase tracking-wider block">
                Brochures
              </span>
              <span className="text-xl sm:text-2xl font-serif font-normal text-[#122417] dark:text-white leading-tight block mt-0.5">
                {brochuresCount} <span className="text-xs font-sans text-[#485e4d] dark:text-slate-400">Documents</span>
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#020617]/40 dark:backdrop-blur-xl border border-[#e2ece3] dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#eef5ee] dark:bg-white/10 border border-[#d6e6d8] dark:border-white/10 flex items-center justify-center text-[#2d5a3c] dark:text-emerald-400 shrink-0">
              <Layers size={22} />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-[#627766] dark:text-slate-400 uppercase tracking-wider block">
                Courseware &amp; Kits
              </span>
              <span className="text-xl sm:text-2xl font-serif font-normal text-[#122417] dark:text-white leading-tight block mt-0.5">
                {toolkitsCount} <span className="text-xs font-sans text-[#485e4d] dark:text-slate-400">Toolkits</span>
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#020617]/40 dark:backdrop-blur-xl border border-[#e2ece3] dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#eef5ee] dark:bg-white/10 border border-[#d6e6d8] dark:border-white/10 flex items-center justify-center text-[#2d5a3c] dark:text-emerald-400 shrink-0">
              <HardDrive size={22} />
            </div>
            <div>
              <span className="text-[10.5px] font-bold text-[#627766] dark:text-slate-400 uppercase tracking-wider block">
                Guides &amp; Reports
              </span>
              <span className="text-xl sm:text-2xl font-serif font-normal text-[#122417] dark:text-white leading-tight block mt-0.5">
                {guidesCount} <span className="text-xs font-sans text-[#485e4d] dark:text-slate-400">Handbooks</span>
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SEARCH & CATEGORY FILTER BAR */}
        {/* ========================================================================= */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#020617]/40 dark:backdrop-blur-xl border border-[#e2ece3] dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#738a79] dark:text-slate-400" />
            <input
              type="text"
              placeholder="Search resources by title, format, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#f8faf8] dark:bg-white/5 border border-[#d8e5da] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889b8d] dark:placeholder:text-slate-500 focus:outline-none focus:border-[#2d5a3c] dark:focus:border-emerald-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#889b8d] dark:text-slate-500 hover:text-[#19241c] dark:hover:text-white"
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
                      ? 'bg-[#1b3726] dark:bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#f0f5f0] dark:bg-white/10 text-[#3f5444] dark:text-slate-300 hover:bg-[#e4ece4] dark:hover:bg-white/20 hover:text-[#19241c] dark:hover:text-white'
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
              className={`p-2 rounded-xl border border-[#d8e5da] dark:border-white/10 transition-colors shadow-xs cursor-pointer ${
                sortOrder !== 'default'
                  ? 'bg-[#1b3726] dark:bg-emerald-600 text-white'
                  : 'bg-white dark:bg-white/5 text-[#4d6052] dark:text-slate-300 hover:bg-slate-50'
              }`}
              title={`Sort: ${sortOrder === 'az' ? 'A to Z' : sortOrder === 'za' ? 'Z to A' : 'Default'}`}
            >
              <SlidersHorizontal size={15} />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. RESOURCE ITEMS LIST / CARDS (MATCHING PUBLIC PAGE AESTHETIC) */}
        {/* ========================================================================= */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-[#2d5a3c] dark:text-emerald-400" size={28} />
            <span className="text-xs font-semibold text-[#667d6c] dark:text-slate-400">
              Loading database repository...
            </span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white dark:bg-[#020617]/40 dark:backdrop-blur-xl border border-[#e2ece3] dark:border-white/10 text-center space-y-3">
            <BookOpen size={36} className="mx-auto text-[#94a899]" />
            <h3 className="text-base font-bold text-[#142618] dark:text-white">No Academic Resources Found</h3>
            <p className="text-xs text-[#637667] dark:text-slate-400 max-w-sm mx-auto">
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
                className="mt-2 text-xs font-bold text-[#2d5a3c] dark:text-emerald-400 hover:underline cursor-pointer"
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
                  className="rounded-2xl sm:rounded-[1.6rem] bg-white/85 dark:bg-[#0c2217]/35 backdrop-blur-2xl border border-white/90 dark:border-emerald-500/20 p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(45,90,60,0.1)] dark:hover:shadow-[0_16px_40px_rgba(16,185,129,0.12)] hover:-translate-y-1 hover:border-[#2d5a3c]/40 dark:hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle glass reflection highlight on top edge */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-emerald-400/30 to-transparent pointer-events-none" />

                  {/* Horizontal split inside card */}
                  <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-stretch relative z-10">
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
                            className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider ${themeConfig.badgeStyle}`}
                          >
                            {item.category || 'General'}
                          </span>
                          <span className="text-[10px] font-medium text-[#718476] dark:text-slate-400">
                            {item.type || 'PDF'} • {item.size || 'N/A'}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[13.5px] sm:text-[14px] font-serif font-bold text-[#14261a] dark:text-white leading-[1.3] group-hover:text-[#2d5a3c] dark:group-hover:text-emerald-300 transition-colors line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] sm:text-[11.5px] text-[#4d6052] dark:text-slate-300 leading-relaxed font-normal line-clamp-2 mt-1">
                          {item.desc || 'No detailed description provided.'}
                        </p>
                      </div>

                      {/* PDF Attachment Status Pill */}
                      {hasPdf ? (
                        <div className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-500/20 text-[10px] font-bold text-emerald-900 dark:text-emerald-300">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <CheckCircle2 size={12} className="text-emerald-700 dark:text-emerald-400 shrink-0" />
                            <span className="truncate">PDF Ready ({item.size || 'PDF'})</span>
                          </div>
                          <a
                            href={item.downloadUrl}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="text-[9.5px] text-emerald-800 dark:text-emerald-300 underline hover:text-emerald-950 flex items-center gap-0.5 shrink-0"
                          >
                            <Download size={10} />
                            <span>Preview</span>
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-1.5 px-2.5 rounded-lg bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-500/20 text-[10px] font-bold text-amber-900 dark:text-amber-300">
                          <div className="flex items-center gap-1.5">
                            <AlertCircle size={12} className="text-amber-700 dark:text-amber-400 shrink-0" />
                            <span>No PDF</span>
                          </div>
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="text-[9.5px] text-amber-800 dark:text-amber-300 underline hover:text-amber-950 cursor-pointer"
                          >
                            Attach
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Card Footer: Date & Admin Actions */}
                  <div className="pt-3 mt-3 border-t border-[#f0f4ef] dark:border-white/10 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-1 text-[10.5px] text-[#718476] dark:text-slate-400 font-medium">
                      <Calendar size={12} className="text-[#2d5a3c] dark:text-emerald-400" />
                      <span>{item.date || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-3 py-1.5 rounded-full bg-[#f4f7f2] dark:bg-white/10 hover:bg-[#1b3726] hover:text-white dark:hover:bg-emerald-600 text-[#1b3726] dark:text-slate-200 text-[11px] font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                        title="Edit resource metadata & design template"
                      >
                        <Edit3 size={11} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                        title="Delete resource"
                      >
                        <Trash2 size={13} />
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
          <div className="fixed inset-0 z-50 bg-[#07170e]/60 dark:bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
            <div className="w-full max-w-5xl bg-white dark:bg-[#071d13] rounded-3xl border border-[#e2ece3] dark:border-emerald-500/30 shadow-2xl overflow-hidden my-6">
              {/* Modal Top Header */}
              <div className="p-5 sm:p-6 border-b border-[#e8f0e9] dark:border-white/10 flex items-center justify-between bg-[#f8faf8] dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eef5ee] dark:bg-emerald-950/60 border border-[#d6e6d8] dark:border-emerald-500/30 flex items-center justify-center text-[#2d5a3c] dark:text-emerald-400">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#142618] dark:text-white">
                      {editingId ? 'Edit Academic Resource' : 'Publish Academic Resource'}
                    </h3>
                    <span className="text-[11px] text-[#637667] dark:text-slate-400">
                      Configure cover typography, custom image, palette, document metadata, and attach download PDF.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl text-[#718575] hover:text-[#142618] dark:hover:text-white hover:bg-[#ebf2ec] dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body: Split Grid (Left: Live Preview, Right: Edit Form) */}
              <form onSubmit={handleSaveResource} className="p-5 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* --------------------------------------------------------------- */}
                  {/* LEFT COLUMN: LIVE CARD & COVER PREVIEW */}
                  {/* --------------------------------------------------------------- */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye size={14} className="text-[#2d5a3c] dark:text-emerald-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#3d5442] dark:text-slate-300">
                          Live Portal Preview
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#eef5ee] dark:bg-emerald-950/60 text-[#2d5a3c] dark:text-emerald-300 border border-[#d6e6d8] dark:border-emerald-500/20">
                        {formData.coverType.toUpperCase()} • {formData.themeColor.toUpperCase()}
                      </span>
                    </div>

                    {/* Preview Card Shell (Identical to public site) */}
                    <div className="rounded-2xl bg-white/90 dark:bg-[#0c2217]/50 backdrop-blur-2xl border border-[#d6e6d8] dark:border-emerald-500/30 p-4 shadow-md space-y-3">
                      <div className="grid grid-cols-12 gap-3.5 items-stretch">
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
                                className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                  (THEME_PRESETS[formData.themeColor] || THEME_PRESETS.emerald).badgeStyle
                                }`}
                              >
                                {formData.category}
                              </span>
                              <span className="text-[9.5px] font-medium text-[#718476] dark:text-slate-400">
                                {formData.type} • {formData.size}
                              </span>
                            </div>

                            <h4 className="text-[13px] font-serif font-bold text-[#14261a] dark:text-white leading-[1.3] line-clamp-2">
                              {formData.title || 'Resource Title Preview...'}
                            </h4>

                            <p className="text-[11px] text-[#4d6052] dark:text-slate-300 leading-relaxed line-clamp-3 mt-1 font-normal">
                              {formData.desc || 'Document synopsis or key topics outline will be rendered here.'}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-[#718476] dark:text-slate-400 pt-2 border-t border-[#f0f4ef] dark:border-white/10">
                            <span className="flex items-center gap-1 font-medium">
                              <Calendar size={11} className="text-[#2d5a3c] dark:text-emerald-400" />
                              {formData.date || 'March 2025'}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#122b1c] text-white dark:bg-emerald-600 text-[9.5px] font-bold flex items-center gap-1">
                              <span>Download</span>
                              <Download size={9} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Helpful Design Tip */}
                    <div className="p-3 rounded-xl bg-[#f4f7f2] dark:bg-white/5 border border-[#e2ece3] dark:border-white/10 text-[11px] text-[#556b59] dark:text-slate-400 leading-relaxed">
                      <strong className="text-[#1b3726] dark:text-emerald-300 block mb-0.5">
                        Real-time Synchronized:
                      </strong>
                      Changes made to the cover title, subtitle, badge, template, and colors update live here and immediately sync with the public downloads catalog.
                    </div>
                  </div>

                  {/* --------------------------------------------------------------- */}
                  {/* RIGHT COLUMN: CUSTOMIZATION & FORM INPUTS */}
                  {/* --------------------------------------------------------------- */}
                  <div className="lg:col-span-7 space-y-4 max-h-[64vh] overflow-y-auto pr-1 no-scrollbar">
                    
                    {/* A. TEMPLATE PICKER */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1c2e21] dark:text-white flex items-center gap-1.5">
                        <Sparkles size={13} className="text-[#2d5a3c] dark:text-emerald-400" />
                        <span>1. Publication Cover Template</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                                isSelected
                                  ? 'bg-[#eef5ee] dark:bg-emerald-950/60 border-[#2d5a3c] dark:border-emerald-400 ring-2 ring-[#2d5a3c]/20 shadow-xs'
                                  : 'bg-[#fbfdfb] dark:bg-white/5 border-[#d8e5da] dark:border-white/10 hover:border-[#b8cdbc] hover:bg-[#f6f9f6]'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#142618] dark:text-white">
                                  {tmpl.name}
                                </span>
                                {isSelected && (
                                  <Check size={14} className="text-[#2d5a3c] dark:text-emerald-400" />
                                )}
                              </div>
                              <span className="text-[10px] text-[#637767] dark:text-slate-400 leading-snug line-clamp-2">
                                {tmpl.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* B. THEME COLOR SELECTION */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1c2e21] dark:text-white flex items-center gap-1.5">
                        <Palette size={13} className="text-[#2d5a3c] dark:text-emerald-400" />
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
                                  ? 'bg-white dark:bg-white/15 border-slate-900 dark:border-white shadow-xs ring-2 ring-slate-900/10 dark:ring-white/20'
                                  : 'bg-[#fbfdfb] dark:bg-white/5 border-[#d8e5da] dark:border-white/10 hover:bg-[#f3f7f3]'
                              }`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full shadow-xs shrink-0"
                                style={{ backgroundColor: t.hex }}
                              />
                              <span className="text-[11px] font-semibold text-[#19241c] dark:text-white">
                                {t.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* C. COVER TYPOGRAPHY (TITLE, SUBTITLE, DATE & BADGE) */}
                    <div className="p-3.5 rounded-2xl bg-[#fbfdfb] dark:bg-white/5 border border-[#d8e5da] dark:border-white/10 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#142618] dark:text-white pb-1 border-b border-[#edf3ee] dark:border-white/10">
                        <Type size={14} className="text-[#2d5a3c] dark:text-emerald-400" />
                        <span>3. Cover Typography &amp; Badge</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2d4032] dark:text-slate-300 block">
                            Cover Main Title (Line 1)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Annual, AI, STEM, Learning"
                            value={formData.coverTitle}
                            onChange={(e) => setFormData({ ...formData, coverTitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2d4032] dark:text-slate-300 block">
                            Cover Subtitle (Line 2)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Report, in Education, Activity Toolkit"
                            value={formData.coverSubtitle}
                            onChange={(e) => setFormData({ ...formData, coverSubtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2d4032] dark:text-slate-300 block">
                            Cover Date / Academic Year
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 2024 - 2025, Semester II, March 2025"
                            value={formData.coverDate}
                            onChange={(e) => setFormData({ ...formData, coverDate: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#2d4032] dark:text-slate-300 block">
                            Cover Badge Text
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. LEnSE, SIET, FYUGP, BROCHURE"
                            value={formData.customBadge}
                            onChange={(e) => setFormData({ ...formData, customBadge: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* D. COVER IMAGE / VISUAL ASSET */}
                    <div className="p-3.5 rounded-2xl bg-[#fbfdfb] dark:bg-white/5 border border-[#d8e5da] dark:border-white/10 space-y-3">
                      <div className="flex items-center justify-between pb-1 border-b border-[#edf3ee] dark:border-white/10">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#142618] dark:text-white">
                          <ImageIcon size={14} className="text-[#2d5a3c] dark:text-emerald-400" />
                          <span>4. Cover Photo &amp; Visual Asset</span>
                        </div>
                        {(formData.coverType === 'brochure' || formData.coverType === 'photo' || formData.coverType === 'image') && (
                          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-700">
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
                    <div className="p-3.5 rounded-2xl bg-[#fbfdfb] dark:bg-white/5 border border-[#d8e5da] dark:border-white/10 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#142618] dark:text-white pb-1 border-b border-[#edf3ee] dark:border-white/10">
                        <FileText size={14} className="text-[#2d5a3c] dark:text-emerald-400" />
                        <span>5. Catalog Document Metadata</span>
                      </div>

                      {/* Full Document Title */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#1c2e21] dark:text-white block">
                          Catalog Document Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 4th SIET International Conference Official Brochure"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                        />
                      </div>

                      {/* Category & Format Type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#1c2e21] dark:text-white block">
                            Category *
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                          >
                            {formCategories.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#1c2e21] dark:text-white block">
                            File Type / Format *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. PDF, PDF / Interactive, ZIP"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                          />
                        </div>
                      </div>

                      {/* Publication Date & Auto-detected File Size */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-[#1c2e21] dark:text-white block">
                            Publication / Term Date
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. March 2025, Semester II 2025"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                          />
                        </div>

                        {/* File Size: Auto-detected from uploaded PDF */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-semibold text-[#1c2e21] dark:text-white block">
                              Detected File Size
                            </label>
                            <span className="text-[9.5px] text-emerald-700 dark:text-emerald-400 font-medium">
                              Auto from PDF
                            </span>
                          </div>
                          <div className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#d5e2d6] dark:border-white/10 text-xs font-mono text-[#19241c] dark:text-slate-200 flex items-center justify-between">
                            <span className="truncate">{formData.size || 'Auto (upload PDF)'}</span>
                            <span className="text-[9.5px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-sans font-bold shrink-0">
                              Auto
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-[#1c2e21] dark:text-white block">
                          Description / Synopsis
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Outline key topics covered, intended audience, authors or mentors..."
                          value={formData.desc}
                          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#071d13] border border-[#d5e2d6] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:border-[#2d5a3c]"
                        />
                      </div>
                    </div>

                    {/* F. PDF DOCUMENT ATTACHMENT (10MB MAX, AUTO-SIZE DETECTION) */}
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
                <div className="pt-4 border-t border-[#e8f0e9] dark:border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#d8e5da] dark:border-white/10 text-xs font-bold text-[#4e6453] dark:text-slate-300 hover:bg-[#f1f6f1] dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-[#1b3726] hover:bg-[#254d35] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-[#07170e]/60 dark:bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-[#071d13] rounded-3xl border border-[#e2ece3] dark:border-white/10 shadow-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600">
                  <Trash2 size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#142618] dark:text-white">
                    Delete Academic Resource?
                  </h3>
                  <span className="text-xs text-[#667d6c] dark:text-slate-400">
                    This action is permanent and will remove the document from both admin and public catalogs.
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#edf3ee] dark:border-white/10 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-4 py-2 rounded-xl border border-[#d8e5da] dark:border-white/10 text-xs font-bold text-[#4e6453] dark:text-slate-300 hover:bg-[#f1f6f1] dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Keep Resource
                </button>
                <button
                  onClick={() => handleDeleteResource(deleteConfirmId)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
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
