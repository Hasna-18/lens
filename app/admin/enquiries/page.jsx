'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Clock,
  Building2,
  Search,
  ArrowLeft,
  Send,
  MoreVertical,
  Inbox,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';

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
      <pattern id="dot-pattern-enquiries" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#009ab1" />
      </pattern>
      <rect width="120" height="120" fill="url(#dot-pattern-enquiries)" />
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

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '', deleting: false });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: '', message: '' }), 3000);
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch enquiries", error);
      showToast('error', 'Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const markAsRead = async (id) => {
    // Instant optimistic update
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status: 'read' } : e));
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_read', id })
      });
      if (!res.ok) {
        fetchEnquiries();
      }
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const handlePromptDelete = (id, name) => {
    setDeleteModal({ show: true, id, title: name || 'this enquiry', deleting: false });
  };

  const handleConfirmDelete = async () => {
    const { id } = deleteModal;
    if (!id) return;

    setDeleteModal(prev => ({ ...prev, deleting: true }));
    const prevEnquiries = [...enquiries];
    const newEnquiries = enquiries.filter(e => e.id !== id);
    
    // Instant optimistic update
    setEnquiries(newEnquiries);
    if (selectedId === id) {
      setSelectedId(newEnquiries.length > 0 ? newEnquiries[0].id : null);
    }
    setDeleteModal({ show: false, id: null, title: '', deleting: false });
    showToast('success', 'Enquiry deleted');

    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
      if (!res.ok) {
        setEnquiries(prevEnquiries);
        showToast('error', 'Failed to delete enquiry from database');
      }
    } catch (error) {
      setEnquiries(prevEnquiries);
      showToast('error', error.message || 'Failed to delete enquiry');
    }
  };

  const filteredEnquiries = enquiries.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.organization && e.organization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selected = filteredEnquiries.find(e => e.id === selectedId) || (filteredEnquiries.length > 0 ? filteredEnquiries[0] : null);

  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbfb] via-[#f0f8f9] to-[#edf6f8] text-slate-800 p-4 sm:p-8 font-sans relative overflow-hidden transition-colors duration-300">

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

      {/* Modern Delete Enquiry Confirmation Popup */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] max-w-sm w-full p-6 shadow-2xl border border-white/90 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 style={SERIF} className="text-lg font-bold text-slate-900 leading-tight">Delete Enquiry?</h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  Are you sure you want to delete message from <span className="font-semibold text-slate-800">"{deleteModal.title}"</span>?
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

      <div className="max-w-[1400px] mx-auto space-y-6 relative z-10">

        {/* ========================================================= */}
        {/* TOP HEADER */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-7 sm:p-8 rounded-[2.2rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_12px_40px_rgba(0,154,177,0.06)]">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-2xs rounded-2xl text-slate-700 hover:text-[#009ab1] transition-all"
              title="Return to Dashboard"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <SectionTag label="Communications Hub" />
              <h1 style={SERIF} className="text-3xl sm:text-4xl font-normal text-slate-900 leading-tight tracking-tight">
                Enquiries &amp; <Em>Messages</Em>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#009ab1]" size={16} />
              <input
                type="text"
                placeholder="Search messages, names, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/90 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#009ab1] focus:ring-2 focus:ring-[#009ab1]/20 transition-all shadow-2xs"
              />
            </div>
            <button
              onClick={fetchEnquiries}
              className="p-3.5 bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white rounded-2xl transition-all shadow-[0_8px_20px_rgba(0,154,177,0.3)] active:scale-95 flex items-center justify-center cursor-pointer"
              title="Refresh Inbox"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TWO-PANE LAYOUT */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[75vh] min-h-[620px]">

          {/* LEFT PANE: List */}
          <div className="lg:col-span-4 bg-white/85 backdrop-blur-2xl rounded-[2.2rem] border border-white/90 shadow-[0_10px_35px_rgba(0,154,177,0.06)] flex flex-col overflow-hidden">

            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white/50 shrink-0">
              <h2 style={SERIF} className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Inbox size={19} className="text-[#009ab1]" />
                All Messages
              </h2>
              <span className="px-3 py-1 bg-[#009ab1]/10 text-[#009ab1] border border-[#009ab1]/25 text-xs font-bold rounded-full">
                {filteredEnquiries.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 space-y-2 custom-scrollbar">
              {loading ? (
                <div className="p-12 text-center text-slate-400">
                  <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-[#009ab1]" />
                  <p className="text-xs font-semibold">Loading messages...</p>
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <p className="text-xs font-semibold">No messages found.</p>
                </div>
              ) : (
                filteredEnquiries.map((enq) => {
                  const isSelected = selected?.id === enq.id;
                  const isUnread = enq.status === 'unread';
                  return (
                    <div
                      key={enq.id}
                      onClick={() => {
                        setSelectedId(enq.id);
                        if (isUnread) markAsRead(enq.id);
                      }}
                      className={`w-full p-4 rounded-2xl cursor-pointer transition-all border-l-4 ${
                        isSelected
                          ? 'bg-[#009ab1]/10 border-[#009ab1] shadow-xs'
                          : 'bg-white/80 border-transparent hover:bg-[#009ab1]/5'
                      }`}
                    >
                      <div className="flex gap-3.5 items-start">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs ${
                          isUnread
                            ? 'bg-gradient-to-r from-[#009ab1] to-[#14b4cb] text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {enq.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm truncate pr-2 ${isUnread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                              {enq.name}
                            </span>
                            <span className={`text-[10.5px] shrink-0 ${isUnread ? 'font-bold text-[#009ab1]' : 'text-slate-400'}`}>
                              {formatRelativeTime(enq.createdAt)}
                            </span>
                          </div>
                          <div className={`text-xs truncate mb-1 ${isUnread ? 'font-bold text-[#009ab1]' : 'text-slate-600'}`}>
                            {enq.subject}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-slate-500 truncate font-normal">
                              {enq.message.substring(0, 45)}...
                            </p>
                            {isUnread && <span className="w-2 h-2 rounded-full bg-[#009ab1] shrink-0 animate-pulse shadow-[0_0_8px_#009ab1]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANE: Details */}
          <div className="lg:col-span-8 bg-white/90 backdrop-blur-2xl rounded-[2.2rem] border border-white/90 shadow-[0_10px_35px_rgba(0,154,177,0.06)] flex flex-col overflow-hidden relative">
            {!selected ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8">
                <Mail size={48} className="mb-4 opacity-25 text-[#009ab1]" />
                <p style={SERIF} className="font-normal text-xl text-slate-700">No message selected</p>
                <p className="text-xs text-slate-500 mt-1">Select an enquiry from the left list to read details.</p>
              </div>
            ) : (
              <>
                {/* Message Header */}
                <div className="p-7 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-4 bg-gradient-to-r from-white via-white/80 to-[#009ab1]/5">
                  <div className="flex gap-4 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#009ab1] to-[#14b4cb] text-white flex items-center justify-center font-serif font-bold text-2xl shrink-0 shadow-[0_8px_20px_rgba(0,154,177,0.25)]">
                      {selected.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 style={SERIF} className="text-2xl font-bold text-slate-900 leading-tight mb-1">
                        {selected.name}
                      </h2>
                      <a href={`mailto:${selected.email}`} className="text-xs sm:text-sm font-semibold text-[#009ab1] hover:underline transition-colors">
                        {selected.email}
                      </a>

                      {selected.organization && (
                        <div className="flex items-center gap-1.5 mt-2.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
                          <Building2 size={14} className="text-[#009ab1]" />
                          <span>Organization:</span>
                          <span className="text-slate-800 font-semibold normal-case ml-1">{selected.organization}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-400 sm:self-start mt-2 sm:mt-0">
                    <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                      <Clock size={13} className="text-[#009ab1]" />
                      {new Date(selected.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 overflow-y-auto p-7 sm:p-8 bg-white/60">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3.5 py-1.5 bg-[#009ab1]/10 text-[#009ab1] text-[10.5px] font-bold uppercase tracking-widest rounded-full border border-[#009ab1]/25">
                      {selected.subject}
                    </span>
                    {selected.status === 'unread' && (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-[#009ab1]/15 text-[#009ab1] text-[10px] font-extrabold uppercase tracking-widest rounded-full border border-[#009ab1]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] animate-pulse" />
                        NEW
                      </span>
                    )}
                  </div>

                  <div className="prose prose-sm max-w-none text-slate-700 font-normal leading-relaxed whitespace-pre-wrap bg-white p-7 rounded-[2rem] border border-slate-200/80 shadow-xs relative overflow-hidden">
                    <p className="relative z-10 text-sm leading-relaxed">{selected.message}</p>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  {selected.status === 'unread' && (
                    <button
                      onClick={() => markAsRead(selected.id)}
                      className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
                    >
                      <CheckCircle2 size={15} className="text-[#009ab1]" />
                      <span>Mark as read</span>
                    </button>
                  )}

                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#009ab1] to-[#14b4cb] hover:from-[#00869c] hover:to-[#009ab1] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all shadow-[0_8px_20px_rgba(0,154,177,0.25)] active:scale-95 cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Reply</span>
                  </a>

                  <button
                    onClick={() => handlePromptDelete(selected.id, selected.name)}
                    className="p-2.5 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-rose-600 rounded-xl transition-all shadow-2xs cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>

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
