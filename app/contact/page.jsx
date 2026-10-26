'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Building2,
  Clock,
  Globe,
  ArrowRight,
  BookOpen,
  Users,
  Lightbulb,
  Leaf,
  AlertCircle
} from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Enquiry',
    organization: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setForm({ name: '', email: '', subject: 'General Enquiry', organization: '', message: '' });
        }, 4500);
      } else {
        const errData = await res.json().catch(() => ({}));
        setErrorMessage(errData.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToOffice = () => {
    const el = document.getElementById('director-office-card');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-slate-800 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-blue-100 transition-colors duration-500">
      
      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT BLEND (Deep Blue Glass) */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[75%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img 
          src="/campus_building.jpg" 
          alt="LEnSE Campus" 
          className="w-full h-full object-cover object-center lg:object-right-top scale-[1.05] transform-gpu opacity-35 mix-blend-overlay" 
          onError={(e) => { e.currentTarget.src = "/home/bg.png"; }}
        />
        {/* Massive vignette and gradient to blend into the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/90 via-[30%] to-transparent w-full h-full hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8ff] via-[#f4f8ff]/90 via-[40%] to-transparent w-full h-full block lg:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#f4f8ff] to-transparent" />
      </div>

      {/* Extreme Neon Glows (Glassmorphism Core in Oceanic Blue) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a6dff]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[60%] bg-[#0a6cff]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-[#38bdf8]/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 relative">
          
          <div className="lg:col-span-8 space-y-7 z-10">
            {/* Glowing Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-blue-100 shadow-[0_4px_20px_rgba(26,109,255,0.12)] transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-[#1a6dff] animate-pulse shadow-[0_0_10px_#1a6dff]" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#1a6dff] uppercase">
                CONNECT &bull; COLLABORATE &bull; ENGAGE
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-serif font-medium text-[#0f1a3a] leading-[1.05] tracking-tight drop-shadow-sm">
              Get in Touch with<br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff]">LEnSE.</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-[1.7] max-w-lg font-medium drop-shadow-sm">
              We welcome academic collaborations, research partnerships, institutional inquiries, and invitations for school STEM camps across Kerala and beyond.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] text-white text-[12px] font-black uppercase tracking-[0.15em] flex items-center gap-3 transition-all duration-300 shadow-[0_12px_26px_rgba(10,108,255,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Send size={14} />
                <span>Send a Message</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={scrollToOffice}
                className="px-7 py-4 rounded-full bg-white/80 backdrop-blur-xl border border-blue-100 hover:bg-white text-[#1a6dff] text-[12px] font-bold uppercase tracking-[0.1em] flex items-center gap-2.5 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(26,109,255,0.18)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Building2 size={16} />
                <span>Director's Office</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. FOUR QUICK CONTACT GLASS DOCK */}
        {/* ========================================================================= */}
        <div className="p-3 sm:p-5 rounded-[3rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_18px_45px_rgba(37,99,235,0.08)] relative z-20 group">
          <div className="absolute inset-0 rounded-[3rem] border border-white/60 pointer-events-none mix-blend-overlay" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-blue-100/70 relative z-10">
            {[
              { icon: Mail, title: 'Email Us', desc: 'lenseedu24@gmail.com\nOfficial enquiries', href: 'mailto:lenseedu24@gmail.com' },
              { icon: MapPin, title: 'Visit Campus', desc: 'Kariavattom Campus\nThiruvananthapuram', href: '#director-office-card' },
              { icon: Building2, title: 'Centre Office', desc: 'Dept. of Education\nUniversity of Kerala', href: '#director-office-card' },
              { icon: Clock, title: 'Office Hours', desc: '09:30 AM – 05:00 PM\nWorking days (IST)', href: '#director-office-card' }
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href} 
                className="flex flex-col items-center text-center p-6 sm:p-8 hover:bg-blue-50/50 transition-all duration-500 rounded-[2.5rem] cursor-pointer hover:-translate-y-2 group/card"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50/90 border border-blue-100 shadow-sm flex items-center justify-center text-[#1a6dff] mb-4 group-hover/card:scale-110 group-hover/card:rotate-6 group-hover/card:shadow-[0_0_20px_rgba(26,109,255,0.3)] transition-all duration-500">
                  <item.icon size={26} strokeWidth={1.5} />
                </div>
                <h4 className="text-[17px] font-serif font-bold text-slate-900 mb-1.5 group-hover/card:text-[#1a6dff] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed whitespace-pre-line font-medium">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MAIN INTERACTIVE FORM & CONTACT DETAILS GRID */}
        {/* ============================================================ */}
        <div id="contact-form-section" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-[3rem] bg-gradient-to-br from-white/90 via-sky-50/50 to-blue-50/30 backdrop-blur-xl border border-white/90 p-8 sm:p-12 shadow-[0_18px_45px_rgba(37,99,235,0.10)] relative overflow-hidden">
            
            {/* Soft inner glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#1a6dff]/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-2 pb-6 border-b border-blue-100 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[#1a6dff] text-[10px] font-black uppercase tracking-widest shadow-sm">
                <span>DIRECT ENQUIRY</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-medium text-[#0f1a3a] pt-2">
                Send us a Message
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Submit your query, institutional collaboration proposal, or camp request. We typically respond within 1–2 working days.
              </p>
            </div>

            {submitted ? (
              <div className="p-10 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-blue-100 text-center space-y-4 mt-6 animate-in fade-in zoom-in-95 duration-500 shadow-xl">
                <div className="w-20 h-20 bg-[#1a6dff] rounded-full flex items-center justify-center text-white mx-auto shadow-[0_0_30px_rgba(26,109,255,0.35)]">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900">Message Received!</h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto font-medium">
                  Your enquiry has been securely sent to the Director's Office. We will contact you shortly at <span className="font-bold text-[#1a6dff]">{form.email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 mt-6 relative z-10">
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1a6dff] uppercase tracking-widest ml-2">Your Name *</label>
                    <input 
                      type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Dr. Ramesh Kumar" 
                      className="w-full px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-100 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-[#1a6dff] shadow-inner transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1a6dff] uppercase tracking-widest ml-2">Email Address *</label>
                    <input 
                      type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. ramesh@university.edu" 
                      className="w-full px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-100 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-[#1a6dff] shadow-inner transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1a6dff] uppercase tracking-widest ml-2">Organization / School</label>
                    <input 
                      type="text" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g. Govt. HSS" 
                      className="w-full px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-100 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-[#1a6dff] shadow-inner transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1a6dff] uppercase tracking-widest ml-2">Inquiry Category</label>
                    <select
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-100 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-[#1a6dff] shadow-inner transition-all duration-300 cursor-pointer appearance-none"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Research Collaboration">Research &amp; Academic Collaboration</option>
                      <option value="School STEM Camp Request">School STEM Camp / Workshop Request</option>
                      <option value="Teacher Development">Teacher Capacity Building Program</option>
                      <option value="Scholar Connect">Scholar Connect Series Participation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1a6dff] uppercase tracking-widest ml-2">Message Details *</label>
                  <textarea 
                    required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your proposal or requirements..."
                    className="w-full px-5 py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-100 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-400/20 focus:border-[#1a6dff] shadow-inner resize-y transition-all duration-300"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] text-white text-[12px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_12px_26px_rgba(10,108,255,0.35)] hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Submit Message'}</span>
                    {!isSubmitting && <Send size={15} />}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Director Office Card & Institutional Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* DIRECTOR OFFICE CARD */}
            <div id="director-office-card" className="scroll-mt-32 rounded-[3rem] bg-gradient-to-br from-white/90 via-sky-50/50 to-blue-50/30 backdrop-blur-xl p-8 sm:p-10 text-slate-900 shadow-[0_18px_45px_rgba(37,99,235,0.10)] space-y-7 relative overflow-hidden border border-white/90 group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(26,109,255,0.15)] hover:-translate-y-1">
              
              {/* Intense Neon Orb behind the photo */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-sky-400/25 rounded-full blur-[70px] pointer-events-none group-hover:bg-blue-400/35 transition-colors duration-700" />
              
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-blue-600/40 via-sky-400/60 to-blue-400/20 blur-xl group-hover:blur-2xl transition-all duration-700 opacity-60 animate-pulse" />
                  
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[1.8rem] overflow-hidden border-[3px] border-white/90 shadow-2xl bg-blue-950">
                    <img 
                      src="/divya1.png" 
                      alt="Dr. Divya C. Senan" 
                      className="w-full h-full object-cover object-top filter contrast-[1.1] group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="space-y-2 flex-1 min-w-0 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#1a6dff] border border-blue-100 text-[9px] font-black uppercase tracking-widest shadow-sm mb-1">
                    DIRECTOR'S OFFICE
                  </span>
                  <h3 className="text-2xl sm:text-[28px] font-serif font-bold leading-tight text-slate-900">
                    Dr. Divya C. Senan
                  </h3>
                  <p className="text-[13px] text-[#1a6dff] font-semibold leading-relaxed">
                    Director, CLESE
                  </p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">
                    Associate Professor, University of Kerala
                  </p>
                </div>
              </div>

              {/* Glass Pills for Contact Details */}
              <div className="space-y-3 relative z-10 pt-4">
                {[
                  { icon: Building2, label: 'Centre', value: 'Centre for Learning Engineering & Sustainability Education' },
                  { icon: MapPin, label: 'Location', value: 'Dept. of Education, Kariavattom Campus, TVM - 695581' },
                  { icon: Mail, label: 'Email', value: 'lenseedu24@gmail.com', isLink: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 hover:border-blue-200 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a6dff] shrink-0 shadow-sm">
                      <item.icon size={18} />
                    </div>
                    <div className="space-y-1 mt-0.5">
                      <span className="block text-[10px] font-black text-[#1a6dff] uppercase tracking-wider">{item.label}</span>
                      {item.isLink ? (
                        <a href={`mailto:${item.value}`} className="text-slate-900 font-semibold text-xs block hover:text-[#1a6dff] transition-colors">{item.value}</a>
                      ) : (
                        <span className="text-slate-600 text-xs font-medium leading-relaxed block">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3 relative z-10">
                <a 
                  href="mailto:lenseedu24@gmail.com"
                  className="flex-1 py-4 px-4 rounded-2xl bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] text-white font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(26,109,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Mail size={14} />
                  <span>Email Director</span>
                </a>
              </div>
            </div>

            {/* PARTNERS CARD */}
            <div className="rounded-[3rem] bg-gradient-to-br from-white/90 via-sky-50/50 to-blue-50/30 backdrop-blur-xl border border-white/90 p-8 sm:p-10 shadow-[0_18px_45px_rgba(37,99,235,0.08)] space-y-6 group hover:-translate-y-1 transition-all duration-500">
              <h4 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-3">
                <Users className="text-[#1a6dff]" />
                Academic Partners
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                {[
                  { name: 'SIET Kerala', sub: 'Govt. of Kerala' },
                  { name: 'Clarkson University', sub: 'STEM Centre, USA' },
                  { name: 'ICSSR New Delhi', sub: 'Social Science Research' },
                  { name: 'Child Dev Centre', sub: 'Kazhakkoottam' }
                ].map((partner, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 hover:border-blue-200 hover:bg-white transition-all duration-300 cursor-default">
                    <span className="block font-bold text-slate-900 leading-tight mb-1">{partner.name}</span>
                    <span className="block text-[10px] font-medium text-slate-500">{partner.sub}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. BOTTOM VALUE BANNER */}
        {/* =================================================================== */}
        <div className="rounded-[3rem] bg-gradient-to-br from-white/90 via-sky-50/50 to-blue-50/30 backdrop-blur-xl border border-white/90 p-10 sm:p-14 shadow-[0_18px_45px_rgba(37,99,235,0.10)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a6dff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-[#1a6dff] text-[10px] font-black uppercase tracking-widest shadow-sm">
                <Leaf size={12} className="fill-current text-[#1a6dff]" />
                <span>OUR CORE COMMITMENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium italic text-slate-900 leading-[1.3] drop-shadow-sm">
                “Knowledge shared today builds a more equitable and sustainable tomorrow.”
              </h2>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full">
              {[
                { icon: BookOpen, title: 'Open Access', sub: 'For all learners' },
                { icon: Users, title: 'Stronger Communities', sub: 'Social empowerment' },
                { icon: Lightbulb, title: 'Innovative Education', sub: 'Hands-on pedagogy' },
                { icon: Globe, title: 'Sustainable Impact', sub: 'Long-term change' }
              ].map((pill, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-5 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 hover:-translate-y-2 hover:bg-white hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(26,109,255,0.15)] transition-all duration-500 group/pill">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-[#1a6dff] flex items-center justify-center mb-3 shadow-sm group-hover/pill:scale-110 group-hover/pill:rotate-6 group-hover/pill:shadow-[0_0_20px_rgba(26,109,255,0.3)] transition-all duration-500">
                    <pill.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] text-slate-900 font-bold leading-tight block mb-1">
                    {pill.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium leading-tight block">
                    {pill.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
