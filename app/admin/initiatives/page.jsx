'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles, Plus, Edit3, Trash2, X, CheckCircle2, AlertCircle, Loader2,
  MapPin, Users, School, Building2, Globe, ArrowRight, RefreshCw, Eye
} from 'lucide-react';
import Link from 'next/link';
import ImageUploader from '../../../components/admin/ImageUploader';
import { slugify } from '../../../lib/slug';

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
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 3500);
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

      if (!res.ok) {
        throw new Error('Failed to save initiative');
      }

      showToast('success', editingId ? 'Initiative updated in database' : 'New initiative created in database');
      setShowModal(false);
      fetchInitiatives();
    } catch (err) {
      console.error(err);
      showToast('error', err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/initiatives/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete initiative');
      showToast('success', 'Initiative removed from database');
      fetchInitiatives();
    } catch (err) {
      console.error(err);
      showToast('error', err.message || 'Delete failed');
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#edf4e8]">
        <div className="flex items-center gap-3 text-[#1f3b28]">
          <Loader2 className="animate-spin" size={24} />
          <span className="font-semibold text-sm">Verifying admin session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7faf6] py-10 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl text-white text-xs font-semibold backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-5 ${
          toast.type === 'success' ? 'bg-[#1b432a] border border-[#2d6e45]' : 'bg-rose-700 border border-rose-500'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white border border-[#e2ece3] shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef5ee] border border-[#d6e5d8] text-[#2d5a3c] text-[10.5px] font-bold tracking-wider uppercase mb-2">
              <Sparkles size={12} />
              <span>Database Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#14261a]">
              Key Outreach Initiatives
            </h1>
            <p className="text-xs text-[#526657] mt-1">
              Manage live state-wide, national, and international initiatives displayed on the public website.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/initiatives"
              target="_blank"
              className="px-4 py-2.5 rounded-full border border-[#d6e5d8] bg-[#f8faf8] hover:bg-[#eef5ee] text-[#1e3c28] text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Eye size={14} />
              <span>Preview Live Page</span>
            </Link>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-full bg-[#1b3726] hover:bg-[#254d35] text-white text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Plus size={15} />
              <span>Add Initiative</span>
            </button>
          </div>
        </div>

        {/* Initiatives List */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-[#e2ece3]">
              <Loader2 className="animate-spin text-[#2d5a3c]" size={28} />
              <span className="text-xs font-semibold text-[#526657]">Loading initiatives from PostgreSQL...</span>
            </div>
          ) : initiatives.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-[#e2ece3] space-y-3">
              <p className="text-sm font-semibold text-[#324b37]">No initiatives in database yet.</p>
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 rounded-full bg-[#1b3726] text-white text-xs font-bold inline-flex items-center gap-2"
              >
                <Plus size={14} />
                <span>Create First Initiative</span>
              </button>
            </div>
          ) : (
            initiatives.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-[#e2ece3] shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full lg:w-auto">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-[#e2ece3] relative">
                    <img
                      src={item.img || '/events/workshop.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/events/events_book_plant.jpg'; }}
                    />
                  </div>

                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#eef5ee] border border-[#d6e5d8] text-[#2d5a3c] text-[9.5px] font-bold uppercase tracking-wider">
                        {item.tag}
                      </span>
                      {item.partner && (
                        <span className="text-[11px] font-bold text-[#556758]">
                          • {item.partner}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-serif font-bold text-[#14261a]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#526657] line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-4 pt-1 text-[11px] text-[#6b7f70]">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-[#2d5a3c]" />
                        {item.locations}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2.5 rounded-full bg-[#f4f8f4] hover:bg-[#e4efe4] text-[#1b3726] border border-[#d6e5d8] transition-all"
                    title="Edit Initiative"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all"
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] border border-[#d6e5d8] shadow-2xl max-w-3xl w-full p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#eef5ee] mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14261a]">
                  {editingId ? 'Edit Outreach Initiative' : 'Add New Outreach Initiative'}
                </h2>
                <p className="text-xs text-[#556758] mt-0.5">
                  Changes save directly to the PostgreSQL database.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[#2d4a34] uppercase tracking-wider">
                    Initiative Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f8faf8] border border-[#d6e5d8] text-sm text-[#14261a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]"
                    placeholder="e.g. State-wide 'STEM 4 Girls' Camp Series"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#2d4a34] uppercase tracking-wider">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f8faf8] border border-[#d6e5d8] text-sm text-[#14261a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]"
                    placeholder="e.g. STATE-WIDE FLAGSHIP"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#2d4a34] uppercase tracking-wider">
                    Partner Organization
                  </label>
                  <input
                    type="text"
                    value={form.partner}
                    onChange={(e) => setForm({ ...form, partner: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f8faf8] border border-[#d6e5d8] text-sm text-[#14261a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]"
                    placeholder="e.g. ICSSR, New Delhi"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#2d4a34] uppercase tracking-wider">
                    Lead Faculty / Dept
                  </label>
                  <input
                    type="text"
                    value={form.lead}
                    onChange={(e) => setForm({ ...form, lead: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f8faf8] border border-[#d6e5d8] text-sm text-[#14261a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]"
                    placeholder="e.g. Dept. of Education, University of Kerala"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#2d4a34] uppercase tracking-wider">
                    Locations / Coverage
                  </label>
                  <input
                    type="text"
                    value={form.locations}
                    onChange={(e) => setForm({ ...form, locations: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f8faf8] border border-[#d6e5d8] text-sm text-[#14261a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]"
                    placeholder="e.g. Puthoor (Kollam), Paruthippally..."
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[#2d4a34] uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.desc}
                    onChange={(e) => setForm({ ...form, desc: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f8faf8] border border-[#d6e5d8] text-sm text-[#14261a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]"
                    placeholder="Comprehensive description of the initiative..."
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[#2d4a34] uppercase tracking-wider">
                    Outcomes & Highlights
                  </label>
                  <input
                    type="text"
                    value={form.outcomes}
                    onChange={(e) => setForm({ ...form, outcomes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#f8faf8] border border-[#d6e5d8] text-sm text-[#14261a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]"
                    placeholder="e.g. Inaugurated by Finance Minister; over 500+ girls empowered."
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-[#2d4a34] uppercase tracking-wider">
                    Thumbnail Image
                  </label>
                  <ImageUploader
                    value={form.img}
                    onChange={(url) => setForm({ ...form, img: url })}
                  />
                </div>
              </div>

              {/* 3 Metrics */}
              <div className="p-4 rounded-2xl bg-[#f5f9f5] border border-[#d6e5d8] space-y-3">
                <span className="text-xs font-bold text-[#24422c] uppercase tracking-wider block">
                  Impact Metric Badges (3 stats)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={form.stat1Val}
                      onChange={(e) => setForm({ ...form, stat1Val: e.target.value })}
                      placeholder="Val: 3 Selected"
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#d6e5d8] text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={form.stat1Label}
                      onChange={(e) => setForm({ ...form, stat1Label: e.target.value })}
                      placeholder="Label: Districts"
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#d6e5d8] text-[11px] text-slate-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      value={form.stat2Val}
                      onChange={(e) => setForm({ ...form, stat2Val: e.target.value })}
                      placeholder="Val: 500+ Girls"
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#d6e5d8] text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={form.stat2Label}
                      onChange={(e) => setForm({ ...form, stat2Label: e.target.value })}
                      placeholder="Label: Participants"
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#d6e5d8] text-[11px] text-slate-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      value={form.stat3Val}
                      onChange={(e) => setForm({ ...form, stat3Val: e.target.value })}
                      placeholder="Val: 100% Free"
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#d6e5d8] text-xs font-bold"
                    />
                    <input
                      type="text"
                      value={form.stat3Label}
                      onChange={(e) => setForm({ ...form, stat3Label: e.target.value })}
                      placeholder="Label: Support Model"
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#d6e5d8] text-[11px] text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#eef5ee]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full bg-[#1b3726] hover:bg-[#254d35] text-white text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-60"
                >
                  {saving && <Loader2 className="animate-spin" size={14} />}
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
