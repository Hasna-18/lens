'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText, ArrowRight, Download, Link as LinkIcon, Calendar, LayoutGrid, MonitorPlay, Plus, Edit3, Trash2, X, CheckCircle2, AlertCircle, Loader2, ExternalLink, RefreshCw, Layers, LogOut, Home, FileBox, Database, ChevronLeft, ChevronRight, Sparkles, Check
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '../../../components/admin/ImageUploader';
import { slugify } from '../../../lib/slug';

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
      <pattern id="dot-pattern-news" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#009ab1" />
      </pattern>
      <rect width="120" height="120" fill="url(#dot-pattern-news)" />
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

export default function AdminNewsResourcesPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [adminUser, setAdminUser] = useState('admin');
  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'resources'
  const [loading, setLoading] = useState(true);

  // Pagination for News list (10 per page)
  const [newsPage, setNewsPage] = useState(1);
  const newsPerPage = 10;

  // Data
  const [newsList, setNewsList] = useState([]);
  const [resourcesList, setResourcesList] = useState([]);

  // Modals / Forms
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [deleteNewsModal, setDeleteNewsModal] = useState({ show: false, id: null, title: '', deleting: false });
  const [deleteResourceModal, setDeleteResourceModal] = useState({ show: false, id: null, title: '', deleting: false });

  const getTodayDateStr = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const getMonthYearStr = () => new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  // News Form State
  const [newsForm, setNewsForm] = useState({
    slug: '',
    tag: '',
    category: 'Achievements',
    title: '',
    desc: '',
    date: '',
    author: '',
    readTime: '3 min read',
    imageUrl: '',
    content: '',
    details: {}
  });

  // Resource Form State
  const [resourceForm, setResourceForm] = useState({
    title: '',
    category: 'Brochures',
    type: 'PDF',
    size: '',
    desc: '',
    date: '',
    downloadUrl: ''
  });

  const newsCategories = ['Achievements', 'Partnerships', 'Research', 'Initiatives', 'Community', 'Media', 'Announcements'];
  const resourceCategories = ['Brochures', 'Submissions', 'Courseware', 'Toolkits', 'Guides', 'Reports'];
  const resourceTypes = ['PDF', 'PDF / Interactive', 'Word Document', 'Excel Format', 'Image', 'Archive (ZIP)'];

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [newsRes, resRes] = await Promise.all([
        fetch('/api/news'),
        fetch('/api/resources')
      ]);

      if (newsRes.ok) {
        const data = await newsRes.json();
        if (Array.isArray(data)) setNewsList(data);
      }
      if (resRes.ok) {
        const data = await resRes.json();
        if (Array.isArray(data)) setResourcesList(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showToast('error', 'Error syncing with database');
    } finally {
      setLoading(false);
    }
  };

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

  // --- NEWS HANDLERS ---
  const handleOpenNewsAdd = () => {
    setEditingId(null);
    setNewsForm({
      slug: '',
      tag: 'ANNOUNCEMENT',
      category: 'Achievements',
      title: '',
      desc: '',
      date: getTodayDateStr(),
      author: adminUser || 'LEnSE Admin',
      readTime: '3 min read',
      imageUrl: '',
      content: '',
      details: {}
    });
    setShowNewsForm(true);
  };

  const handleStartNewsEdit = (item) => {
    setEditingId(item.id);
    setNewsForm({
      slug: item.slug || slugify(item.title) || '',
      tag: item.tag || '',
      category: item.category || 'Achievements',
      title: item.title || '',
      desc: item.desc || '',
      date: item.date || '',
      author: item.author || '',
      readTime: item.readTime || '',
      imageUrl: item.imageUrl || '',
      content: item.details?.content || item.details?.aboutText || item.desc || '',
      details: item.details || {}
    });
    setShowNewsForm(true);
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    if (!newsForm.title.trim()) {
      showToast('error', 'Please enter a title');
      return;
    }
    setSaving(true);
    const isEditing = Boolean(editingId);
    const method = isEditing ? 'PUT' : 'POST';
    const finalSlug = newsForm.slug || slugify(newsForm.title);
    const payload = isEditing
      ? {
        ...newsForm,
        id: editingId,
        slug: finalSlug,
        details: {
          ...(newsForm.details || {}),
          aboutText: newsForm.content || newsForm.details?.aboutText || newsForm.desc
        }
      }
      : {
        ...newsForm,
        slug: finalSlug,
        details: {
          aboutText: newsForm.content || newsForm.desc
        }
      };

    try {
      const res = await fetch('/api/news', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save news entry');

      // Fast optimistic update
      const savedItem = {
        ...payload,
        id: data?.id || editingId || Date.now(),
        slug: data?.slug || finalSlug
      };

      if (isEditing) {
        setNewsList(prev => prev.map(item => (item.id === editingId || item.slug === savedItem.slug) ? savedItem : item));
      } else {
        setNewsList(prev => [savedItem, ...prev]);
      }

      showToast('success', isEditing ? 'News updated!' : 'News published!');
      setShowNewsForm(false);
      setEditingId(null);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePromptDeleteNews = (idOrSlug, title) => {
    setDeleteNewsModal({ show: true, id: idOrSlug, title, deleting: false });
  };

  const handleConfirmDeleteNews = async () => {
    const { id: idOrSlug } = deleteNewsModal;
    if (!idOrSlug) return;

    setDeleteNewsModal(prev => ({ ...prev, deleting: true }));
    const prevNews = [...newsList];

    // Instant optimistic update
    setNewsList(prev => prev.filter(item => item.id !== idOrSlug && item.slug !== idOrSlug));
    setDeleteNewsModal({ show: false, id: null, title: '', deleting: false });
    showToast('success', 'News deleted');

    try {
      const res = await fetch(`/api/news?id=${idOrSlug}`, { method: 'DELETE' });
      if (!res.ok) {
        setNewsList(prevNews);
        showToast('error', 'Failed to delete news from database');
      }
    } catch (err) {
      setNewsList(prevNews);
      showToast('error', err.message);
    }
  };

  // --- RESOURCES HANDLERS ---
  const handleOpenResourceAdd = () => {
    setEditingId(null);
    setResourceForm({
      title: '',
      category: 'Brochures',
      type: 'PDF',
      size: '',
      desc: '',
      date: getMonthYearStr(),
      downloadUrl: ''
    });
    setShowResourceForm(true);
  };

  const handleStartResourceEdit = (item) => {
    setEditingId(item.id);
    setResourceForm({
      title: item.title || '',
      category: item.category || 'Brochures',
      type: item.type || 'PDF',
      size: item.size || '',
      desc: item.desc || '',
      date: item.date || '',
      downloadUrl: item.downloadUrl || ''
    });
    setShowResourceForm(true);
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    if (!resourceForm.title.trim()) {
      showToast('error', 'Please enter a title');
      return;
    }
    setSaving(true);
    const isEditing = Boolean(editingId);
    const method = isEditing ? 'PUT' : 'POST';
    const payload = isEditing ? { ...resourceForm, id: editingId } : resourceForm;

    try {
      const res = await fetch('/api/resources', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save resource entry');

      // Fast optimistic update
      const savedItem = { ...payload, id: data?.id || editingId || Date.now() };
      if (isEditing) {
        setResourcesList(prev => prev.map(item => item.id === editingId ? savedItem : item));
      } else {
        setResourcesList(prev => [savedItem, ...prev]);
      }

      showToast('success', isEditing ? 'Resource updated!' : 'Resource published!');
      setShowResourceForm(false);
      setEditingId(null);
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePromptDeleteResource = (id, title) => {
    setDeleteResourceModal({ show: true, id, title, deleting: false });
  };

  const handleConfirmDeleteResource = async () => {
    const { id } = deleteResourceModal;
    if (!id) return;

    setDeleteResourceModal(prev => ({ ...prev, deleting: true }));
    const prevResources = [...resourcesList];

    // Instant optimistic update
    setResourcesList(prev => prev.filter(item => item.id !== id));
    setDeleteResourceModal({ show: false, id: null, title: '', deleting: false });
    showToast('success', 'Resource deleted');

    try {
      const res = await fetch(`/api/resources?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setResourcesList(prevResources);
        showToast('error', 'Failed to delete resource from database');
      }
    } catch (err) {
      setResourcesList(prevResources);
      showToast('error', err.message);
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fbfb] via-[#f0f8f9] to-[#edf6f8] flex items-center justify-center font-sans">
        <div className="text-center space-y-4 bg-white/80 backdrop-blur-xl p-9 rounded-[2rem] shadow-xl border border-white/90">
          <Loader2 className="animate-spin text-[#009ab1] mx-auto" size={36} />
          <p className="text-slate-600 text-xs font-bold tracking-wider uppercase">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbfb] via-[#f0f8f9] to-[#edf6f8] text-slate-800 pb-32 font-sans relative overflow-hidden transition-colors duration-300">

      {/* Ambient background glows & patterns from home page */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#009ab1]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-sky-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-teal-300/8 rounded-full blur-3xl pointer-events-none" />
      <Dots className="absolute top-28 left-8" />
      <Swirl className="absolute top-44 right-12 w-48" />

      {/* Floating Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-[70] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border text-xs font-bold transition-all animate-bounce ${
          toast.type === 'success'
            ? 'bg-white/95 text-slate-900 border-[#009ab1]/40 shadow-[0_15px_40px_rgba(0,154,177,0.2)]'
            : 'bg-rose-50 text-rose-950 border-rose-300 shadow-xl'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} className="text-[#009ab1] shrink-0" /> : <AlertCircle size={18} className="text-rose-600 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Modern Delete News Confirmation Popup */}
      {deleteNewsModal.show && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] max-w-sm w-full p-6 shadow-2xl border border-white/90 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 style={SERIF} className="text-lg font-bold text-slate-900 leading-tight">Delete News Article?</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteNewsModal.title}"</span>?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteNewsModal({ show: false, id: null, title: '', deleting: false })}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteNews}
                disabled={deleteNewsModal.deleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {deleteNewsModal.deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                <span>{deleteNewsModal.deleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Delete Resource Confirmation Popup */}
      {deleteResourceModal.show && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] max-w-sm w-full p-6 shadow-2xl border border-white/90 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 style={SERIF} className="text-lg font-bold text-slate-900 leading-tight">Delete Resource?</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteResourceModal.title}"</span>?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteResourceModal({ show: false, id: null, title: '', deleting: false })}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteResource}
                disabled={deleteResourceModal.deleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {deleteResourceModal.deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                <span>{deleteResourceModal.deleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOP CONTROLLER */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-white/80 shadow-[0_4px_20px_rgba(0,154,177,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">

          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#009ab1] animate-pulse" />
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-900">News &amp; Media Admin</span>
              <span className="text-[10px] bg-[#009ab1]/10 text-[#009ab1] font-bold px-2.5 py-0.5 rounded-full border border-[#009ab1]/25">
                {newsList.length} Articles • {resourcesList.length} Downloads
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => activeTab === 'news' ? handleOpenNewsAdd() : handleOpenResourceAdd()}
              className="bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-[0_8px_20px_rgba(0,154,177,0.3)] transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={16} strokeWidth={3} />
              <span>Add {activeTab === 'news' ? 'News' : 'Resource'}</span>
            </button>

            <button
              onClick={fetchData}
              title="Refresh Data from DB"
              className="p-2.5 bg-white/90 hover:bg-white text-slate-600 hover:text-[#009ab1] border border-slate-200/80 rounded-xl transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-[#009ab1]" : ""} />
              <span className="hidden sm:inline">Sync DB</span>
            </button>
          </div>
        </div>
      </div>

      {/* HERO / TABS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative rounded-[2.2rem] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/90 p-8 sm:p-12 shadow-[0_12px_40px_rgba(0,154,177,0.06)] mb-8">
          <SectionTag label="Press & Media" />
          <h1 style={SERIF} className="text-3xl sm:text-5xl font-normal text-slate-900 leading-tight tracking-tight mb-2">
            Manage Publications &amp; <Em>Downloads</Em>
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            Update university press announcements, research accomplishments, and provide downloadable academic courseware directly to the public portal.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'news'
                ? 'bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white shadow-[0_4px_15px_rgba(0,154,177,0.3)]'
                : 'bg-white/90 text-slate-600 hover:text-[#009ab1] border border-slate-200/80 hover:bg-[#009ab1]/10'
            }`}
          >
            <FileText size={16} />
            <span>News &amp; Updates ({newsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white shadow-[0_4px_15px_rgba(0,154,177,0.3)]'
                : 'bg-white/90 text-slate-600 hover:text-[#009ab1] border border-slate-200/80 hover:bg-[#009ab1]/10'
            }`}
          >
            <FileBox size={16} />
            <span>Academic Resources ({resourcesList.length})</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {loading ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/90 shadow-sm">
            <Loader2 className="animate-spin text-[#009ab1] mx-auto mb-2" size={32} />
            <div className="text-slate-600 text-xs font-bold">Syncing {activeTab} from database...</div>
          </div>
        ) : activeTab === 'news' ? (
          <div className="space-y-4">
            {/* INLINE ADD / EDIT NEWS FORM */}
            {showNewsForm && (
              <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-8 border border-white/90 shadow-[0_20px_60px_rgba(0,154,177,0.12)] relative z-10 mb-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <h3 style={SERIF} className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="text-[#009ab1]" size={20} />
                    {editingId ? 'Edit News Entry' : 'Publish New Story'}
                  </h3>
                  <button onClick={() => setShowNewsForm(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tag Badge *</label>
                      <input type="text" required value={newsForm.tag} onChange={(e) => setNewsForm({ ...newsForm, tag: e.target.value.toUpperCase() })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 uppercase focus:bg-white focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category *</label>
                      <select value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 outline-none transition-all">
                        {newsCategories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">News Title *</label>
                    <input
                      type="text"
                      required
                      value={newsForm.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewsForm(prev => ({
                          ...prev,
                          title: val,
                          slug: !editingId || !prev.slug ? slugify(val) : prev.slug
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>URL Slug (Unique Link) *</span>
                      <span className="text-[10px] text-slate-400 font-mono lowercase">auto-generated from title</span>
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-mono text-slate-600 focus-within:border-[#009ab1] focus-within:bg-white transition-colors">
                      <span className="text-slate-400 select-none shrink-0 font-medium">/news/</span>
                      <input
                        type="text"
                        required
                        value={newsForm.slug}
                        onChange={(e) => setNewsForm({ ...newsForm, slug: slugify(e.target.value) })}
                        placeholder="news-article-slug"
                        className="bg-transparent border-none outline-none flex-1 text-slate-900 font-bold ml-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Author</label>
                      <input
                        type="text"
                        value={newsForm.author || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                        placeholder="LEnSE Admin"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Read Time</label>
                      <input
                        type="text"
                        value={newsForm.readTime || ''}
                        onChange={(e) => setNewsForm({ ...newsForm, readTime: e.target.value })}
                        placeholder="5 min read"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description / Snippet *</label>
                    <textarea rows={2} required value={newsForm.desc} onChange={(e) => setNewsForm({ ...newsForm, desc: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Article Content / Details</label>
                    <textarea rows={4} value={newsForm.content || ''} onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })} placeholder="Detailed story content displayed on the full article page..." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Date String *</label>
                    <input type="text" required value={newsForm.date} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none" placeholder="15 May 2025" />
                  </div>

                  {/* News Image with Local Device ImageUploader */}
                  <div>
                    <ImageUploader
                      value={newsForm.imageUrl}
                      onChange={(url) => setNewsForm({ ...newsForm, imageUrl: url })}
                      category="news"
                      label="News Cover Image"
                      helperText="Upload image from your device (saved to Cloudinary/local) or provide a URL."
                    />
                  </div>

                  <div className="pt-3 flex gap-3 border-t border-slate-100">
                    <button type="button" onClick={() => setShowNewsForm(false)} className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
                    <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white font-extrabold text-xs flex justify-center items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.25)] disabled:opacity-50 transition-all cursor-pointer">
                      {saving ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle2 size={14} />} Save News
                    </button>
                  </div>
                </form>
              </div>
            )}

            {newsList.slice((newsPage - 1) * newsPerPage, newsPage * newsPerPage).map(item => (
              <div key={item.id} className="bg-white/85 backdrop-blur-2xl rounded-[2rem] p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center shadow-[0_10px_35px_rgba(0,154,177,0.06)] border border-white/90 hover:border-[#009ab1]/40 hover:shadow-[0_20px_50px_rgba(0,154,177,0.12)] transition-all relative group overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#009ab1]/30 to-transparent pointer-events-none" />

                <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = "/events/e1.png"; }} />
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-0.5 rounded-full bg-[#009ab1]/10 text-[#009ab1] text-[10px] font-black uppercase tracking-wider border border-[#009ab1]/25">{item.tag}</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{item.category} • {item.date}</span>
                  </div>
                  <h3 style={SERIF} className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-1 group-hover:text-[#009ab1] transition-colors line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 sm:self-center w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                  <Link
                    href={`/news/${item.slug || item.id}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#009ab1]/5 text-slate-700 hover:text-[#009ab1] border border-slate-200/80 text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
                    title="View public article"
                  >
                    <ExternalLink size={13} /> View
                  </Link>
                  <button onClick={() => handleStartNewsEdit(item)} className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#009ab1] hover:text-white text-slate-700 border border-slate-200/80 text-xs font-bold flex items-center gap-1 transition-all shadow-2xs cursor-pointer">
                    <Edit3 size={13} /> Edit
                  </button>
                  <button onClick={() => handlePromptDeleteNews(item.slug || item.id, item.title)} className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
            {newsList.length === 0 && (
              <div className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/90 shadow-sm">
                <p className="text-slate-500 text-sm font-semibold">No news entries available. Click "+ Add News" to create one.</p>
              </div>
            )}

            {/* Admin News Pagination (10 per page) */}
            {newsList.length > newsPerPage && (
              <div className="flex items-center justify-center gap-2 p-4 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/90 shadow-sm">
                <button
                  onClick={() => setNewsPage(p => Math.max(1, p - 1))}
                  disabled={newsPage === 1}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#009ab1]/10 hover:text-[#009ab1] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: Math.ceil(newsList.length / newsPerPage) }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setNewsPage(p)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      newsPage === p
                        ? 'bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-[#009ab1]/10 hover:text-[#009ab1]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setNewsPage(p => Math.min(Math.ceil(newsList.length / newsPerPage), p + 1))}
                  disabled={newsPage === Math.ceil(newsList.length / newsPerPage)}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#009ab1]/10 hover:text-[#009ab1] disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {resourcesList.map(item => (
              <div key={item.id} className="bg-white/85 backdrop-blur-2xl rounded-[2rem] p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-center justify-between shadow-[0_10px_35px_rgba(0,154,177,0.06)] border border-white/90 hover:border-[#009ab1]/40 hover:shadow-[0_20px_50px_rgba(0,154,177,0.12)] transition-all group">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#009ab1]/10 border border-[#009ab1]/25 text-[#009ab1] flex items-center justify-center shrink-0">
                    <FileBox size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">{item.category}</span>
                      <span className="text-[10px] font-mono text-[#009ab1] bg-[#009ab1]/10 px-2 py-0.5 rounded-full border border-[#009ab1]/25">{item.type} • {item.size}</span>
                    </div>
                    <h3 style={SERIF} className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#009ab1] transition-colors">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                  <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-[#009ab1] hover:bg-[#009ab1]/10 rounded-xl transition-colors" title="Download Link">
                    <Download size={16} />
                  </a>
                  <button onClick={() => handleStartResourceEdit(item)} className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#009ab1] hover:text-white text-slate-700 border border-slate-200/80 text-xs font-bold flex items-center gap-1 transition-all shadow-2xs cursor-pointer">
                    <Edit3 size={13} /> Edit
                  </button>
                  <button onClick={() => handlePromptDeleteResource(item.id, item.title)} className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
            {resourcesList.length === 0 && (
              <div className="text-center py-16 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/90 shadow-sm">
                <p className="text-slate-500 text-sm font-semibold">No resources uploaded yet. Click "+ Add Resource" to upload one.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 2: ADD / EDIT RESOURCE */}
      {showResourceForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] max-w-2xl w-full p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.25)] border border-white/90 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 style={SERIF} className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileBox className="text-[#009ab1]" size={20} />
                {editingId ? 'Edit Resource' : 'Add Academic Resource'}
              </h3>
              <button onClick={() => setShowResourceForm(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleResourceSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Document Title *</label>
                <input type="text" required value={resourceForm.title} onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category *</label>
                  <select value={resourceForm.category} onChange={(e) => setResourceForm({ ...resourceForm, category: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none">
                    {resourceCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">File Type *</label>
                  <select value={resourceForm.type} onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none">
                    {resourceTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">File Size String *</label>
                  <input type="text" required value={resourceForm.size} onChange={(e) => setResourceForm({ ...resourceForm, size: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none" placeholder="1.2 MB" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Release Date *</label>
                  <input type="text" required value={resourceForm.date} onChange={(e) => setResourceForm({ ...resourceForm, date: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none" placeholder="March 2025" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description</label>
                <textarea rows={3} required value={resourceForm.desc} onChange={(e) => setResourceForm({ ...resourceForm, desc: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Download URL Link or File Path *</label>
                <input type="text" required value={resourceForm.downloadUrl} onChange={(e) => setResourceForm({ ...resourceForm, downloadUrl: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:bg-white focus:border-[#009ab1] outline-none" placeholder="https://... or /admin/resources/file.pdf" />
              </div>

              <div className="pt-3 flex gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowResourceForm(false)} className="flex-1 py-3 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors cursor-pointer">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white font-extrabold text-xs flex justify-center items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.25)] disabled:opacity-50 transition-all cursor-pointer">
                  {saving ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle2 size={14} />} Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d9d3;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
