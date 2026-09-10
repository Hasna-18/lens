'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText, ArrowRight, Download, Link as LinkIcon, Calendar, LayoutGrid, MonitorPlay, Plus, Edit3, Trash2, X, CheckCircle2, AlertCircle, Loader2, ExternalLink, RefreshCw, Layers, LogOut, Home, FileBox, Database
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '../../../components/admin/ImageUploader';
import { slugify } from '../../../lib/slug';

export default function AdminNewsResourcesPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [adminUser, setAdminUser] = useState('admin');
  const [activeTab, setActiveTab] = useState('news'); // 'news' or 'resources'
  const [loading, setLoading] = useState(true);

  // Data
  const [newsList, setNewsList] = useState([]);
  const [resourcesList, setResourcesList] = useState([]);

  // Modals / Forms
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const getTodayDateStr = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const getMonthYearStr = () => new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  // News Form State (Clean state, all live data comes from Neon DB)
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

  // Resource Form State (Clean state, all live data comes from Neon DB)
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
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 3500);
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
      showToast('error', 'Error syncing with PostgreSQL database');
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
      tag: '',
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
    try {
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

      const res = await fetch('/api/news', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save news entry');

      showToast('success', isEditing ? 'News updated successfully!' : 'News published to database!');
      setShowNewsForm(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNews = async (idOrSlug, title) => {
    if (!confirm(`Are you sure you want to delete news "${title}"?`)) return;
    try {
      const res = await fetch(`/api/news?id=${idOrSlug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete news');
      showToast('success', 'News deleted from PostgreSQL');
      fetchData();
    } catch (err) {
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
    try {
      const isEditing = Boolean(editingId);
      const method = isEditing ? 'PUT' : 'POST';
      const payload = isEditing ? { ...resourceForm, id: editingId } : resourceForm;

      const res = await fetch('/api/resources', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save resource entry');

      showToast('success', isEditing ? 'Resource updated!' : 'Resource published to database!');
      setShowResourceForm(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      showToast('error', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteResource = async (id, title) => {
    if (!confirm(`Are you sure you want to delete resource "${title}"?`)) return;
    try {
      const res = await fetch(`/api/resources?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete resource');
      showToast('success', 'Resource deleted from PostgreSQL');
      fetchData();
    } catch (err) {
      showToast('error', err.message);
    }
  };


  if (authChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-outfit">
        <div className="text-center space-y-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <Loader2 className="animate-spin text-[#2d5a3c] mx-auto" size={32} />
          <p className="text-slate-600 text-xs font-semibold tracking-wide">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-32 font-outfit relative">

      {/* Toast */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-[60] px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border transition-all animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-50 text-emerald-900 border-emerald-300' 
            : 'bg-rose-50 text-rose-900 border-rose-300'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={22} className="text-emerald-700" /> : <AlertCircle size={22} className="text-rose-600" />}
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}

      {/* ADMIN FLOATING TOP CONTROLLER */}
      <div className="bg-white/95 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#2d5a3c]"></span>
            </span>
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-slate-900">News & Resources Admin</span>
              <span className="text-[10px] bg-emerald-50 text-[#2d5a3c] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                {newsList.length} Articles • {resourcesList.length} Downloads
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => activeTab === 'news' ? handleOpenNewsAdd() : handleOpenResourceAdd()}
              className="bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={16} strokeWidth={3} />
              <span>Add {activeTab === 'news' ? 'News' : 'Resource'}</span>
            </button>

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

      {/* HERO / TABS SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#173822] via-[#234e32] to-[#2d5a3c] text-white p-8 sm:p-12 shadow-lg mb-8">
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-2">
            Manage Publications & Downloads
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl font-normal">
            Update university news releases, research accomplishments, and provide downloadable academic courseware directly to the student portal.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <button
            onClick={() => setActiveTab('news')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'news'
                ? 'bg-[#2d5a3c] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <FileText size={16} />
            <span>News & Updates ({newsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'resources'
                ? 'bg-[#2d5a3c] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
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
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Loader2 className="animate-spin text-[#2d5a3c] mx-auto mb-2" size={28} />
            <div className="text-slate-600 text-xs font-bold">Syncing {activeTab} from PostgreSQL...</div>
          </div>
        ) : activeTab === 'news' ? (
          <div className="space-y-4">
            {newsList.map(item => (
              <div key={item.id} className="bg-white rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center shadow-xs border border-slate-200/90 hover:border-[#2d5a3c]/30 hover:shadow-md transition-all relative group overflow-hidden">
                <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.currentTarget.src = "/events/e1.png"; }} />
                </div>
                
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-[#2d5a3c] text-[10px] font-black uppercase tracking-wider border border-emerald-200">{item.tag}</span>
                    <span className="text-[11px] text-slate-500 font-semibold">{item.category} • {item.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-1 group-hover:text-[#2d5a3c] transition-colors line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0 sm:self-center w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                  <Link
                    href={`/news/${item.slug || item.id}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 transition-colors shadow-xs"
                    title="View public article"
                  >
                    <ExternalLink size={13} /> View
                  </Link>
                  <button onClick={() => handleStartNewsEdit(item)} className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors">
                    <Edit3 size={13} /> Edit
                  </button>
                  <button onClick={() => handleDeleteNews(item.slug || item.id, item.title)} className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1 transition-colors">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
            {newsList.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <p className="text-slate-500 text-sm font-semibold">No news entries available. Click "+ Add News" to create one.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {resourcesList.map(item => (
              <div key={item.id} className="bg-white rounded-3xl p-5 flex flex-col sm:flex-row gap-5 items-center justify-between shadow-xs border border-slate-200/90 hover:border-[#2d5a3c]/30 hover:shadow-md transition-all group">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#2d5a3c] flex items-center justify-center shrink-0">
                    <FileBox size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold uppercase">{item.category}</span>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{item.type} • {item.size}</span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-[#2d5a3c] transition-colors">{item.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                  <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors" title="Download Link">
                    <Download size={16} />
                  </a>
                  <button onClick={() => handleStartResourceEdit(item)} className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors">
                    <Edit3 size={13} /> Edit
                  </button>
                  <button onClick={() => handleDeleteResource(item.id, item.title)} className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1 transition-colors">
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
            {resourcesList.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
                <p className="text-slate-500 text-sm font-semibold">No resources uploaded yet. Click "+ Add Resource" to upload one.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: ADD / EDIT NEWS */}
      {showNewsForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="text-[#2d5a3c]" size={18} />
                {editingId ? 'Edit News Entry' : 'Publish New Story'}
              </h3>
              <button onClick={() => setShowNewsForm(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Tag Badge *</label>
                  <input type="text" required value={newsForm.tag} onChange={(e) => setNewsForm({...newsForm, tag: e.target.value.toUpperCase()})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 uppercase focus:bg-white focus:border-[#2d5a3c] outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category *</label>
                  <select value={newsForm.category} onChange={(e) => setNewsForm({...newsForm, category: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none">
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
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#2d5a3c] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>URL Slug (Unique Link) *</span>
                  <span className="text-[10px] text-slate-400 font-mono lowercase">auto-generated from title</span>
                </label>
                <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-xs font-mono text-slate-600 focus-within:border-[#2d5a3c] focus-within:bg-white transition-colors">
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
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Read Time</label>
                  <input
                    type="text"
                    value={newsForm.readTime || ''}
                    onChange={(e) => setNewsForm({ ...newsForm, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description / Snippet *</label>
                <textarea rows={2} required value={newsForm.desc} onChange={(e) => setNewsForm({...newsForm, desc: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Article Content / Details</label>
                <textarea rows={4} value={newsForm.content || ''} onChange={(e) => setNewsForm({...newsForm, content: e.target.value})} placeholder="Detailed story content displayed on the full article page..." className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Date String *</label>
                <input type="text" required value={newsForm.date} onChange={(e) => setNewsForm({...newsForm, date: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none" placeholder="15 May 2025" />
              </div>

              {/* News Image with Local Device ImageUploader */}
              <div>
                <ImageUploader
                  value={newsForm.imageUrl}
                  onChange={(url) => setNewsForm({ ...newsForm, imageUrl: url })}
                  category="news"
                  label="News Cover Image"
                  helperText="Upload image from your device (saved to public/admin/news/) or provide a URL."
                />
              </div>

              <div className="pt-3 flex gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowNewsForm(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs flex justify-center items-center gap-2 shadow-xs disabled:opacity-50 transition-all cursor-pointer">
                  {saving ? <Loader2 className="animate-spin" size={14}/> : <CheckCircle2 size={14}/>} Save News
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT RESOURCE */}
      {showResourceForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileBox className="text-[#2d5a3c]" size={18} />
                {editingId ? 'Edit Resource' : 'Add Academic Resource'}
              </h3>
              <button onClick={() => setShowResourceForm(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleResourceSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Document Title *</label>
                <input type="text" required value={resourceForm.title} onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:border-[#2d5a3c] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Category *</label>
                  <select value={resourceForm.category} onChange={(e) => setResourceForm({...resourceForm, category: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none">
                    {resourceCategories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">File Type *</label>
                  <select value={resourceForm.type} onChange={(e) => setResourceForm({...resourceForm, type: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none">
                    {resourceTypes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">File Size String *</label>
                  <input type="text" required value={resourceForm.size} onChange={(e) => setResourceForm({...resourceForm, size: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none" placeholder="1.2 MB" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Release Date *</label>
                  <input type="text" required value={resourceForm.date} onChange={(e) => setResourceForm({...resourceForm, date: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none" placeholder="March 2025" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Description</label>
                <textarea rows={3} required value={resourceForm.desc} onChange={(e) => setResourceForm({...resourceForm, desc: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Download URL Link or File Path *</label>
                <input type="text" required value={resourceForm.downloadUrl} onChange={(e) => setResourceForm({...resourceForm, downloadUrl: e.target.value})} className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:bg-white focus:border-[#2d5a3c] outline-none" placeholder="https://... or /admin/resources/file.pdf" />
              </div>

              <div className="pt-3 flex gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowResourceForm(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-xs flex justify-center items-center gap-2 shadow-xs disabled:opacity-50 transition-all cursor-pointer">
                  {saving ? <Loader2 className="animate-spin" size={14}/> : <CheckCircle2 size={14}/>} Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
