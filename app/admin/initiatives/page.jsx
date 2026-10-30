'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Plus,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Users,
  School,
  Building2,
  Globe,
  ArrowRight,
  RefreshCw,
  Eye,
  Check
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
      <pattern id="dot-pattern-initiatives" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#009ab1" />
      </pattern>
      <rect width="120" height="120" fill="url(#dot-pattern-initiatives)" />
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

export default function AdminInitiativesPage() {
  const router = useRouter();
  const [authChecking, setAuthChecking] = useState(true);
  const [initiatives, setInitiatives] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form & Modals
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '', deleting: false });

  const initialForm = {
    title: '',
    mobileTitle: '',
    tag: 'STATE-WIDE FLAGSHIP',
    mobileTag: '',
    partner: '',
    mobilePartner: '',
    lead: '',
    locations: '',
    mobileLocations: '',
    desc: '',
    mobileDesc: '',
    outcomes: '',
    img: '/events/workshop.jpg',
    displayOrder: 0,
    stat1Label: 'Districts Covered',
    stat1Val: '3 Selected',
    stat2Label: 'Participants',
    stat2Val: '500+ Girls',
    stat3Label: 'Support Model',
    stat3Val: '100% Free / Funded'
  };

  const [form, setForm] = useState(initialForm);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 3000);
  };

  const fetchInitiatives = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/initiatives', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setInitiatives(data);
      }
    } catch (err) {
      console.error('Error fetching initiatives:', err);
      showToast('error', 'Failed to fetch initiatives from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch('/api/admin/check');
        if (!res.ok) {
          router.replace('/admin/login');
          return;
        }
        setAuthChecking(false);
        fetchInitiatives();
      } catch (err) {
        router.replace('/admin/login');
      }
    }
    verifyAuth();
  }, [router]);

  const handleOpenAdd = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    const s1 = item.stats?.[0] || {};
    const s2 = item.stats?.[1] || {};
    const s3 = item.stats?.[2] || {};

    setForm({
      title: item.title || '',
      mobileTitle: item.mobileTitle || item.title || '',
      tag: item.tag || 'INITIATIVE',
      mobileTag: item.mobileTag || item.tag || '',
      partner: item.partner || '',
      mobilePartner: item.mobilePartner || item.partner || '',
      lead: item.lead || '',
      locations: item.locations || '',
      mobileLocations: item.mobileLocations || item.locations || '',
      desc: item.desc || '',
      mobileDesc: item.mobileDesc || item.desc || '',
      outcomes: item.outcomes || '',
      img: item.img || '/events/workshop.jpg',
      displayOrder: item.displayOrder ?? 0,
      stat1Label: s1.label || 'Districts Covered',
      stat1Val: s1.val || '',
      stat2Label: s2.label || 'Participants',
      stat2Val: s2.val || '',
      stat3Label: s3.label || 'Support Model',
      stat3Val: s3.val || ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('error', 'Title is required');
      return;
    }

    setSaving(true);
    const stats = [
      { label: form.stat1Label, val: form.stat1Val },
      { label: form.stat2Label, val: form.stat2Val },
      { label: form.stat3Label, val: form.stat3Val }
    ].filter(s => s.label && s.val);

    const payload = {
      title: form.title,
      mobileTitle: form.mobileTitle || form.title,
      tag: form.tag,
      mobileTag: form.mobileTag || form.tag,
      partner: form.partner,
      mobilePartner: form.mobilePartner || form.partner,
      lead: form.lead,
      locations: form.locations,
      mobileLocations: form.mobileLocations || form.locations,
      desc: form.desc,
      mobileDesc: form.mobileDesc || form.desc,
      outcomes: form.outcomes,
      img: form.img,
      displayOrder: Number(form.displayOrder) || 0,
      stats,
      mobileStats: stats
    };

    try {
      const url = editingId ? `/api/initiatives/${editingId}` : '/api/initiatives';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save initiative');
      }

      // Fast optimistic update
      const savedItem = { ...payload, id: data?.id || editingId || Date.now() };
      if (editingId) {
        setInitiatives(prev => prev.map(item => item.id === editingId ? savedItem : item));
      } else {
        setInitiatives(prev => [savedItem, ...prev]);
      }

      showToast('success', editingId ? 'Initiative updated!' : 'Initiative created!');
      setShowModal(false);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      showToast('error', err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handlePromptDelete = (id, title) => {
    setDeleteModal({ show: true, id, title, deleting: false });
  };

  const handleConfirmDelete = async () => {
    const { id } = deleteModal;
    if (!id) return;

    setDeleteModal(prev => ({ ...prev, deleting: true }));
    const prevItems = [...initiatives];
    
    // Instant optimistic update
    setInitiatives(prev => prev.filter(item => item.id !== id));
    setDeleteModal({ show: false, id: null, title: '', deleting: false });
    showToast('success', 'Initiative removed');

    try {
      const res = await fetch(`/api/initiatives/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setInitiatives(prevItems);
        showToast('error', 'Failed to delete initiative from database');
      }
    } catch (err) {
      setInitiatives(prevItems);
      showToast('error', err.message || 'Delete failed');
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fbfb] via-[#f0f8f9] to-[#edf6f8] flex items-center justify-center font-sans">
        <div className="text-center space-y-4 bg-white/80 backdrop-blur-xl p-9 rounded-[2rem] shadow-xl border border-white/90">
          <Loader2 className="animate-spin text-[#009ab1] mx-auto" size={36} />
          <p className="text-slate-600 text-xs font-bold tracking-wider uppercase">Verifying Admin Session...</p>
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

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] max-w-sm w-full p-6 shadow-2xl border border-white/90 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 style={SERIF} className="text-lg font-bold text-slate-900 leading-tight">Delete Initiative?</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Are you sure you want to delete <span className="font-semibold text-slate-800">"{deleteModal.title}"</span>?
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteModal({ show: false, id: null, title: '', deleting: false })}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteModal.deleting}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {deleteModal.deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                <span>{deleteModal.deleting ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">

        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-7 sm:p-8 rounded-[2.2rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_12px_40px_rgba(0,154,177,0.06)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <Sparkles size={14} className="text-[#009ab1]" />
              <Link href="/admin" className="hover:text-[#009ab1] transition-colors">
                Admin Console
              </Link>
              <span className="text-slate-300">&gt;</span>
              <span className="text-slate-900 font-bold">Initiatives Management</span>
            </div>
            <SectionTag label="Outreach Programs" />
            <h1 style={SERIF} className="text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Key Outreach <Em>Initiatives</Em>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Manage live state-wide, national, and international outreach initiatives displayed on the public website.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              onClick={fetchInitiatives}
              disabled={loading}
              className="p-3 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/80 text-slate-700 hover:text-[#009ab1] transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Refresh database records"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>

            <Link
              href="/initiatives"
              target="_blank"
              className="px-4 py-3 rounded-2xl border border-slate-200/80 bg-white/90 hover:bg-[#009ab1]/5 text-slate-700 hover:text-[#009ab1] text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <Eye size={15} />
              <span>Preview Live Page</span>
            </Link>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.3)] transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={16} />
              <span>Add Initiative</span>
            </button>
          </div>
        </div>

        {/* Initiatives List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/90">
              <Loader2 className="animate-spin text-[#009ab1]" size={32} />
              <span className="text-xs font-semibold text-slate-500">Loading initiatives from database...</span>
            </div>
          ) : initiatives.length === 0 ? (
            <div className="py-20 text-center bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/90 space-y-4 shadow-sm p-8">
              <Sparkles size={36} className="mx-auto text-slate-300" />
              <h3 style={SERIF} className="text-xl font-normal text-slate-900">No initiatives in database yet.</h3>
              <button
                onClick={handleOpenAdd}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white text-xs font-bold inline-flex items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.25)]"
              >
                <Plus size={15} />
                <span>Create First Initiative</span>
              </button>
            </div>
          ) : (
            initiatives.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-[2.2rem] bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_10px_35px_rgba(0,154,177,0.06)] hover:shadow-[0_20px_50px_rgba(0,154,177,0.12)] hover:-translate-y-0.5 hover:border-[#009ab1]/40 transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group relative overflow-hidden"
              >
                {/* Top subtle highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#009ab1]/30 to-transparent pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full lg:w-auto">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200/80 relative shadow-sm">
                    <img
                      src={item.img || '/events/workshop.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.currentTarget.src = '/events/events_book_plant.jpg'; }}
                    />
                  </div>

                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-0.5 rounded-full bg-[#009ab1]/10 border border-[#009ab1]/25 text-[#009ab1] text-[9.5px] font-bold uppercase tracking-wider">
                        {item.tag}
                      </span>
                      {item.partner && (
                        <span className="text-xs font-semibold text-slate-500">
                          • {item.partner}
                        </span>
                      )}
                    </div>
                    <h3 style={SERIF} className="text-xl font-bold text-slate-900 group-hover:text-[#009ab1] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-4 pt-1 text-xs text-slate-500 font-medium flex-wrap">
                      {item.locations && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-[#009ab1]" />
                          <span>{item.locations}</span>
                        </span>
                      )}
                      {item.lead && (
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <Building2 size={13} className="text-[#009ab1]" />
                          <span>{item.lead}</span>
                        </span>
                      )}
                    </div>

                    {/* Impact Metric Chips */}
                    {item.stats && item.stats.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-1.5">
                        {item.stats.map((st, sIdx) => (
                          <div key={sIdx} className="px-2.5 py-0.5 rounded-lg bg-[#009ab1]/5 border border-[#009ab1]/15 text-[10.5px]">
                            <span className="font-bold text-[#009ab1]">{st.val}</span>{' '}
                            <span className="text-slate-500 font-medium">{st.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-3 rounded-2xl bg-white hover:bg-[#009ab1] hover:text-white text-slate-700 border border-slate-200/80 transition-all shadow-2xs cursor-pointer"
                    title="Edit Initiative"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handlePromptDelete(item.id, item.title)}
                    className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-all shadow-2xs cursor-pointer"
                    title="Delete Initiative"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2.5rem] border border-white/90 shadow-[0_25px_70px_rgba(0,0,0,0.25)] max-w-3xl w-full p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#009ab1]/10 border border-[#009ab1]/25 flex items-center justify-center text-[#009ab1]">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 style={SERIF} className="text-xl sm:text-2xl font-bold text-slate-900">
                    {editingId ? 'Edit Outreach Initiative' : 'Add New Outreach Initiative'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Changes save directly to the live database.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Initiative Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
                    placeholder="e.g. State-wide 'STEM 4 Girls' Camp Series"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
                    placeholder="e.g. STATE-WIDE FLAGSHIP"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Partner Organization
                  </label>
                  <input
                    type="text"
                    value={form.partner}
                    onChange={(e) => setForm({ ...form, partner: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
                    placeholder="e.g. ICSSR, New Delhi"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Lead Faculty / Dept
                  </label>
                  <input
                    type="text"
                    value={form.lead}
                    onChange={(e) => setForm({ ...form, lead: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
                    placeholder="e.g. Dept. of Education, University of Kerala"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Locations / Coverage
                  </label>
                  <input
                    type="text"
                    value={form.locations}
                    onChange={(e) => setForm({ ...form, locations: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
                    placeholder="e.g. Puthoor (Kollam), Paruthippally..."
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
                    placeholder="Comprehensive description of the initiative..."
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Outcomes & Highlights
                  </label>
                  <input
                    type="text"
                    value={form.outcomes}
                    onChange={(e) => setForm({ ...form, outcomes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all"
                    placeholder="e.g. Inaugurated by Finance Minister; over 500+ girls empowered."
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Thumbnail Image
                  </label>
                  <ImageUploader
                    value={form.img}
                    onChange={(url) => setForm({ ...form, img: url })}
                  />
                </div>
              </div>

              {/* 3 Impact Metrics */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#009ab1]/5 border border-[#009ab1]/20 space-y-3">
                <span className="text-xs font-bold text-[#009ab1] uppercase tracking-wider block">
                  Impact Metric Badges (3 stats)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={form.stat1Val}
                      onChange={(e) => setForm({ ...form, stat1Val: e.target.value })}
                      placeholder="Val: 3 Selected"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#009ab1]"
                    />
                    <input
                      type="text"
                      value={form.stat1Label}
                      onChange={(e) => setForm({ ...form, stat1Label: e.target.value })}
                      placeholder="Label: Districts"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 focus:outline-none focus:border-[#009ab1]"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      value={form.stat2Val}
                      onChange={(e) => setForm({ ...form, stat2Val: e.target.value })}
                      placeholder="Val: 500+ Girls"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#009ab1]"
                    />
                    <input
                      type="text"
                      value={form.stat2Label}
                      onChange={(e) => setForm({ ...form, stat2Label: e.target.value })}
                      placeholder="Label: Participants"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 focus:outline-none focus:border-[#009ab1]"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      value={form.stat3Val}
                      onChange={(e) => setForm({ ...form, stat3Val: e.target.value })}
                      placeholder="Val: 100% Free"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#009ab1]"
                    />
                    <input
                      type="text"
                      value={form.stat3Label}
                      onChange={(e) => setForm({ ...form, stat3Label: e.target.value })}
                      placeholder="Label: Support Model"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 focus:outline-none focus:border-[#009ab1]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_20px_rgba(0,154,177,0.3)] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  <span>{editingId ? 'Save Changes' : 'Create Initiative'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
