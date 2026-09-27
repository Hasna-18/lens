'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, Trash2, RefreshCw, Clock, Building2, Search, ArrowLeft, Send, MoreVertical, Inbox } from 'lucide-react';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []); // Run only on mount as requested

  const markAsRead = async (id) => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_read', id })
      });
      if (res.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: 'read' } : e));
      }
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const res = await fetch(`/api/enquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        const newEnquiries = enquiries.filter(e => e.id !== id);
        setEnquiries(newEnquiries);
        if (selectedId === id) {
          setSelectedId(newEnquiries.length > 0 ? newEnquiries[0].id : null);
        }
      }
    } catch (error) {
      console.error("Failed to delete enquiry", error);
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
    <div className="min-h-screen bg-[#f1f5f3] text-[#19241c] p-4 sm:p-8 font-sans relative overflow-hidden transition-colors duration-500">
      
      {/* Background Leaves/Glows (Nature Theme) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a2d45e]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[60%] bg-[#1a5e35]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto space-y-6 relative z-10">
        
        {/* ========================================================= */}
        {/* TOP HEADER */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="p-3 bg-white hover:bg-[#e4ece7] border border-slate-200 shadow-sm rounded-xl text-[#1b3726] transition-all"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#2d5a3c] mb-1">
                INBOX
              </div>
              <h1 className="text-3xl font-serif font-bold text-[#14261a] leading-tight">
                Enquiries & Messages
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#889d8f]" size={16} />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#19241c] placeholder:text-[#889d8f] focus:outline-none focus:ring-2 focus:ring-[#1b3726] transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={fetchEnquiries}
              className="p-3 bg-[#1b3726] hover:bg-[#13281c] text-white rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center"
              title="Refresh Inbox"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TWO-PANE LAYOUT */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[75vh] min-h-[600px]">
          
          {/* LEFT PANE: List */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden">
            
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <h2 className="font-bold text-[#14261a] flex items-center gap-2">
                <Inbox size={18} className="text-[#2d5a3c]" />
                All Messages
              </h2>
              <span className="px-3 py-1 bg-[#eef5ee] text-[#1b3726] text-xs font-bold rounded-full">
                {filteredEnquiries.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2 custom-scrollbar">
              {loading ? (
                <div className="p-10 text-center text-[#889d8f]">
                  <RefreshCw size={24} className="animate-spin mx-auto mb-3" />
                  <p className="text-sm">Loading...</p>
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="p-10 text-center text-[#889d8f]">
                  <p className="text-sm">No messages found.</p>
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
                      className={`w-full p-4 rounded-[1.5rem] cursor-pointer transition-all border-l-4 ${
                        isSelected 
                          ? 'bg-[#f4faee] border-[#2d5a3c] shadow-sm' 
                          : 'bg-white border-transparent hover:bg-[#f8faf9]'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                          isUnread ? 'bg-[#1b3726] text-white' : 'bg-[#e4ece7] text-[#1b3726]'
                        }`}>
                          {enq.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm truncate pr-2 ${isUnread ? 'font-bold text-[#14261a]' : 'font-semibold text-[#35473a]'}`}>
                              {enq.name}
                            </span>
                            <span className={`text-[10px] shrink-0 ${isUnread ? 'font-bold text-[#2d5a3c]' : 'text-[#889d8f]'}`}>
                              {formatRelativeTime(enq.createdAt)}
                            </span>
                          </div>
                          <div className={`text-xs truncate mb-1 ${isUnread ? 'font-semibold text-[#2d5a3c]' : 'text-[#486350]'}`}>
                            {enq.subject}
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs text-[#889d8f] truncate font-medium">
                              {enq.message.substring(0, 40)}...
                            </p>
                            {isUnread && <span className="w-2 h-2 rounded-full bg-[#a2d45e] shrink-0 shadow-[0_0_8px_#a2d45e]" />}
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
          <div className="lg:col-span-8 bg-white rounded-[2rem] border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col overflow-hidden relative">
            {!selected ? (
              <div className="flex-1 flex flex-col items-center justify-center text-[#889d8f]">
                <Mail size={48} className="mb-4 opacity-20" />
                <p className="font-medium text-lg text-[#35473a]">No message selected</p>
                <p className="text-sm">Select a message from the list to read it.</p>
              </div>
            ) : (
              <>
                {/* Message Header */}
                <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-[#1b3726] text-white flex items-center justify-center font-serif font-bold text-xl shrink-0 shadow-md">
                      {selected.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#14261a] leading-tight mb-1">
                        {selected.name}
                      </h2>
                      <a href={`mailto:${selected.email}`} className="text-sm font-medium text-[#486350] hover:text-[#2d5a3c] transition-colors">
                        {selected.email}
                      </a>
                      
                      {selected.organization && (
                        <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-[#1b3726] uppercase tracking-wider">
                          <Building2 size={14} className="text-[#889d8f]" />
                          <span>Organization:</span>
                          <span className="text-[#486350] font-semibold normal-case ml-1">{selected.organization}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-medium text-[#889d8f] sm:self-start mt-2 sm:mt-0">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {new Date(selected.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </span>
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 overflow-y-auto p-8 bg-[#fdfdfc]">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-[#eef5ee] text-[#1b3726] text-[10px] font-black uppercase tracking-widest rounded-lg border border-[#d6e5d8]">
                      {selected.subject}
                    </span>
                    {selected.status === 'unread' && (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-[#a2d45e]/20 text-[#1b3726] text-[10px] font-black uppercase tracking-widest rounded-lg border border-[#a2d45e]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1b3726]" />
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <div className="prose prose-sm max-w-none text-[#35473a] font-medium leading-relaxed whitespace-pre-wrap bg-[#f4faee]/30 p-8 rounded-3xl border border-[#eef5ee] shadow-inner relative overflow-hidden">
                    {/* Subtle leaf overlay in corner */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[url('/home/bg.png')] bg-cover opacity-5 pointer-events-none filter grayscale" />
                    <p className="relative z-10">{selected.message}</p>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                  {selected.status === 'unread' && (
                    <button 
                      onClick={() => markAsRead(selected.id)}
                      className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-[#1b3726] text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
                    >
                      <CheckCircle2 size={16} />
                      <span>Mark as read</span>
                    </button>
                  )}
                  
                  <a 
                    href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                    className="px-6 py-2.5 bg-[#1b3726] hover:bg-[#13281c] text-white text-sm font-bold rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
                  >
                    <Send size={15} />
                    <span>Reply</span>
                  </a>

                  <button 
                    onClick={() => deleteEnquiry(selected.id)}
                    className="p-2.5 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-100 text-red-500 rounded-xl transition-all shadow-sm hover:shadow-md"
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
      
      <style dangerouslySetInnerHTML={{__html: `
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
