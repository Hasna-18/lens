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
  AlertCircle,
  User,
  ListFilter,
  ChevronDown
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
        {/* 2. FOUR QUICK CONTACT GLASS DOCK (Compact & Sleek Real Glass) */}
        {/* ========================================================================= */}
        <div className="relative z-20 max-w-5xl mx-auto">
          {/* Subtle Ambient 3D Beads near dock */}
          <div className="absolute -top-2 right-8 w-4 h-4 rounded-full bg-gradient-to-br from-sky-300 via-blue-500 to-blue-700 border border-white/70 shadow-[0_4px_10px_rgba(37,99,235,0.3)] pointer-events-none z-30" />
          <div className="absolute -bottom-2 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-white/60 shadow-xs pointer-events-none z-30 opacity-70" />

          <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/65 via-white/45 to-white/60 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-950/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_16px_40px_rgba(37,99,235,0.07),inset_0_1.5px_2px_rgba(255,255,255,1),inset_0_-1px_1.5px_rgba(255,255,255,0.4)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] relative overflow-hidden">
            {/* Real Glass Surface Glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-50/15 pointer-events-none rounded-[inherit]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-blue-100/60 dark:divide-slate-800/80 relative z-10">

              {/* 1. Email Us */}
              <div className="flex flex-col items-center text-center py-3.5 px-3 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl sm:rounded-2xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/95 via-blue-50/75 to-blue-100/50 dark:from-slate-800 dark:via-blue-950/60 dark:to-slate-900 border border-white/95 dark:border-blue-900/40 shadow-[0_4px_12px_rgba(37,99,235,0.08),inset_0_1.5px_2px_#fff] flex items-center justify-center text-[#0a6cff] dark:text-sky-400 mb-2 group-hover:scale-105 group-hover:bg-[#0a6cff] group-hover:text-white transition-all duration-300">
                  <Mail size={18} strokeWidth={2} />
                </div>
                <h4 className="text-[13.5px] font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-[#0a6cff] transition-colors">
                  Email Us
                </h4>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-normal leading-tight">
                  lenseedu24@gmail.com
                </p>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Official enquiries</span>
              </div>

              {/* 2. Visit Campus */}
              <div className="flex flex-col items-center text-center py-3.5 px-3 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl sm:rounded-2xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/95 via-blue-50/75 to-blue-100/50 dark:from-slate-800 dark:via-blue-950/60 dark:to-slate-900 border border-white/95 dark:border-blue-900/40 shadow-[0_4px_12px_rgba(37,99,235,0.08),inset_0_1.5px_2px_#fff] flex items-center justify-center text-[#0a6cff] dark:text-sky-400 mb-2 group-hover:scale-105 group-hover:bg-[#0a6cff] group-hover:text-white transition-all duration-300">
                  <MapPin size={18} strokeWidth={2} />
                </div>
                <h4 className="text-[13.5px] font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-[#0a6cff] transition-colors">
                  Visit Campus
                </h4>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-normal leading-tight">
                  Kariavattom Campus, TVM
                </p>
                <a
                  href="https://maps.google.com/?q=University+of+Kerala+Kariavattom+Campus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0a6cff] dark:text-sky-400 hover:text-[#0052e0] mt-1 group/link"
                >
                  <span>View on Maps</span>
                  <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* 3. Centre Office */}
              <div className="flex flex-col items-center text-center py-3.5 px-3 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl sm:rounded-2xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/95 via-blue-50/75 to-blue-100/50 dark:from-slate-800 dark:via-blue-950/60 dark:to-slate-900 border border-white/95 dark:border-blue-900/40 shadow-[0_4px_12px_rgba(37,99,235,0.08),inset_0_1.5px_2px_#fff] flex items-center justify-center text-[#0a6cff] dark:text-sky-400 mb-2 group-hover:scale-105 group-hover:bg-[#0a6cff] group-hover:text-white transition-all duration-300">
                  <Building2 size={18} strokeWidth={2} />
                </div>
                <h4 className="text-[13.5px] font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-[#0a6cff] transition-colors">
                  Centre Office
                </h4>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-normal leading-tight">
                  Dept. of Education, TVM
                </p>
                <a
                  href="#director-office-card"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0a6cff] dark:text-sky-400 hover:text-[#0052e0] mt-1 group/link"
                >
                  <span>Get Directions</span>
                  <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* 4. Office Hours */}
              <div className="flex flex-col items-center text-center py-3.5 px-3 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl sm:rounded-2xl transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/95 via-blue-50/75 to-blue-100/50 dark:from-slate-800 dark:via-blue-950/60 dark:to-slate-900 border border-white/95 dark:border-blue-900/40 shadow-[0_4px_12px_rgba(37,99,235,0.08),inset_0_1.5px_2px_#fff] flex items-center justify-center text-[#0a6cff] dark:text-sky-400 mb-2 group-hover:scale-105 group-hover:bg-[#0a6cff] group-hover:text-white transition-all duration-300">
                  <Clock size={18} strokeWidth={2} />
                </div>
                <h4 className="text-[13.5px] font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-[#0a6cff] transition-colors">
                  Office Hours
                </h4>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-normal leading-tight">
                  09:30 AM – 05:00 PM
                </p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-50/90 dark:bg-blue-950/70 text-[#0a6cff] dark:text-sky-400 border border-blue-100 dark:border-blue-900/40 font-bold text-[10px]">
                  Mon – Fri
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MAIN INTERACTIVE FORM & CONTACT DETAILS GRID (matching picture) */}
        {/* ============================================================ */}
        <div id="contact-form-section" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10">

          {/* Ambient Colorful Light Emitters directly behind glass cards for optical refraction */}
          <div className="hidden lg:block absolute -left-20 top-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="hidden lg:block absolute -right-20 top-1/3 w-96 h-96 bg-sky-300/25 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Ambient 3D Glass Sphere on Far Left */}
          <div className="hidden lg:block absolute -left-14 top-24 w-28 h-28 rounded-full bg-gradient-to-br from-blue-300/40 via-sky-300/25 to-blue-600/30 backdrop-blur-md border border-white/70 shadow-[0_20px_45px_rgba(37,99,235,0.18),inset_0_4px_12px_#fff] pointer-events-none -z-10" />

          {/* Left Column: Interactive Contact Form (7 cols) - Real Frosted Glass */}
          <div className="lg:col-span-7 rounded-[2.8rem] bg-gradient-to-b from-white/65 via-white/45 to-white/60 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-950/65 backdrop-blur-3xl border border-white/80 dark:border-white/15 p-8 sm:p-12 shadow-[0_25px_60px_rgba(37,99,235,0.08),inset_0_2px_3px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.4)] dark:shadow-[0_25px_65px_rgba(0,0,0,0.5)] relative overflow-hidden space-y-6">

            {/* Real Glass Surface Glare across Form */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-sky-100/15 pointer-events-none rounded-[inherit]" />

            {/* 3D Paper Airplane Graphic in Top Right (matching picture) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-36 h-36 pointer-events-none select-none z-0">
              <svg className="w-full h-full drop-shadow-[0_12px_24px_rgba(37,99,235,0.2)]" viewBox="0 0 140 140" fill="none">
                <defs>
                  <linearGradient id="plane-wing-1" x1="40" y1="20" x2="110" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60a5fa" />
                    <stop offset="1" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="plane-wing-2" x1="50" y1="30" x2="120" y2="60" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#93c5fd" />
                    <stop offset="1" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                {/* Dashed trail */}
                <path d="M 15 110 C 35 95, 60 90, 85 65" stroke="#93c5fd" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" opacity="0.6" />
                <path d="M 40 120 C 65 110, 80 85, 100 68" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.35" />
                <circle cx="28" cy="102" r="3.5" fill="#3b82f6" opacity="0.8" />
                <circle cx="85" cy="65" r="2.5" fill="#60a5fa" />
                {/* 3D Origami Plane */}
                <g transform="translate(15, -5)">
                  <polygon points="105,25 45,65 75,70" fill="url(#plane-wing-1)" />
                  <polygon points="105,25 75,70 65,85" fill="#1d4ed8" />
                  <polygon points="105,25 65,85 78,82" fill="#2563eb" />
                  <polygon points="105,25 75,70 115,50" fill="url(#plane-wing-2)" opacity="0.9" />
                </g>
              </svg>
            </div>

            {/* Bottom Right Curved Contour Waves (matching picture) */}
            <div className="absolute -bottom-8 -right-8 w-60 h-48 pointer-events-none select-none z-0 opacity-40 dark:opacity-20">
              <svg className="w-full h-full" viewBox="0 0 200 160" fill="none">
                <path d="M 0 160 C 60 120, 120 130, 200 80" stroke="#93c5fd" strokeWidth="1" />
                <path d="M 30 160 C 90 125, 140 135, 200 100" stroke="#60a5fa" strokeWidth="0.8" />
                <path d="M 60 160 C 110 135, 160 145, 200 120" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3 3" />
                <circle cx="105" cy="132" r="3" fill="#3b82f6" />
              </svg>
            </div>

            {/* Form Header */}
            <div className="space-y-2 relative z-10 pr-20">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0a6cff]" />
                <span className="text-[11px] font-bold tracking-[0.22em] text-[#0a6cff] dark:text-sky-400 uppercase">
                  DIRECT ENQUIRY
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                Send us a <span className="font-serif italic font-normal text-[#0a6cff] dark:text-sky-400">Message.</span>
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed max-w-md">
                Submit your query, institutional collaboration proposal, or camp request. We typically respond within 1–2 working days.
              </p>
            </div>

            {submitted ? (
              <div className="p-10 rounded-[2.5rem] bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/80 dark:border-white/15 text-center space-y-4 mt-6 animate-in fade-in zoom-in-95 duration-500 shadow-[0_20px_50px_rgba(37,99,235,0.1),inset_0_2px_3px_#fff] relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0a6cff] to-[#1fa2ff] rounded-full flex items-center justify-center text-white mx-auto shadow-[0_10px_30px_rgba(10,108,255,0.35),inset_0_2px_3px_#fff]">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">Message Received!</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto font-medium">
                  Your enquiry has been securely sent to the Director's Office. We will contact you shortly at <span className="font-bold text-[#0a6cff]">{form.email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-rose-50/80 backdrop-blur-xl border border-rose-200/90 text-rose-700 text-xs font-semibold flex items-center gap-2.5 shadow-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Row 1: Name and Email - Frosted Glass Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Your Name <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative group/input">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a6cff] transition-transform duration-300 group-focus-within/input:scale-110" />
                      <input
                        type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Dr. Ramesh Kumar"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/80 dark:border-white/15 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white/75 dark:focus:bg-slate-800/70 focus:border-[#0a6cff] focus:ring-4 focus:ring-blue-400/20 shadow-[0_4px_16px_rgba(180,215,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.9)] transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Email Address <span className="text-blue-600">*</span>
                    </label>
                    <div className="relative group/input">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a6cff] transition-transform duration-300 group-focus-within/input:scale-110" />
                      <input
                        type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. ramesh@university.edu"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/80 dark:border-white/15 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white/75 dark:focus:bg-slate-800/70 focus:border-[#0a6cff] focus:ring-4 focus:ring-blue-400/20 shadow-[0_4px_16px_rgba(180,215,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.9)] transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Organization and Inquiry Category - Frosted Glass Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Organization / School
                    </label>
                    <div className="relative group/input">
                      <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a6cff] transition-transform duration-300 group-focus-within/input:scale-110" />
                      <input
                        type="text" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        placeholder="e.g. Govt. HSS"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/80 dark:border-white/15 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white/75 dark:focus:bg-slate-800/70 focus:border-[#0a6cff] focus:ring-4 focus:ring-blue-400/20 shadow-[0_4px_16px_rgba(180,215,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.9)] transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Inquiry Category
                    </label>
                    <div className="relative">
                      <ListFilter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0a6cff] pointer-events-none" />
                      <select
                        value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/80 dark:border-white/15 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:bg-white/75 dark:focus:bg-slate-800/70 focus:border-[#0a6cff] focus:ring-4 focus:ring-blue-400/20 shadow-[0_4px_16px_rgba(180,215,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.9)] transition-all duration-300 cursor-pointer appearance-none"
                      >
                        <option value="General Enquiry">General Enquiry</option>
                        <option value="Research Collaboration">Research &amp; Academic Collaboration</option>
                        <option value="School STEM Camp Request">School STEM Camp / Workshop Request</option>
                        <option value="Teacher Development">Teacher Capacity Building Program</option>
                        <option value="Scholar Connect">Scholar Connect Series Participation</option>
                      </select>
                      <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Row 3: Message Details - Frosted Glass Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Message Details <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    required rows={5} maxLength={500} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your proposal or requirements..."
                    className="w-full p-4 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/80 dark:border-white/15 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:bg-white/75 dark:focus:bg-slate-800/70 focus:border-[#0a6cff] focus:ring-4 focus:ring-blue-400/20 shadow-[0_4px_16px_rgba(180,215,255,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.9)] resize-y transition-all duration-300 min-h-[140px]"
                  />
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-mono">{form.message.length}/500</span>
                  </div>
                </div>

                {/* Submit Button with High-Gloss Specular Glass Highlight */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0052e0] via-[#1a6dff] to-[#38bdf8] hover:from-[#0047c4] hover:to-[#0ea5e9] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_12px_28px_rgba(26,109,255,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} />
                    <span>{isSubmitting ? 'Sending...' : 'SUBMIT MESSAGE'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Director Office Card & Academic Partners (5 cols) (matching picture) */}
          <div className="lg:col-span-5 space-y-6">

            {/* DIRECTOR OFFICE CARD - Real Frosted Glass */}
            <div id="director-office-card" className="scroll-mt-32 rounded-[2.8rem] bg-gradient-to-b from-white/65 via-white/45 to-white/60 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-950/65 backdrop-blur-3xl border border-white/80 dark:border-white/15 p-7 sm:p-8 space-y-6 shadow-[0_25px_60px_rgba(37,99,235,0.08),inset_0_2px_3px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.4)] dark:shadow-[0_25px_65px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-500 hover:shadow-[0_30px_70px_rgba(26,109,255,0.16)]">

              {/* Real Glass Surface Glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-blue-50/15 pointer-events-none rounded-[inherit]" />

              {/* Profile Header */}
              <div className="flex items-center gap-5 relative z-10">
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden border-[3px] border-white/95 dark:border-slate-700 shadow-[0_8px_24px_rgba(37,99,235,0.2),inset_0_2px_4px_#fff] bg-blue-950">
                    <img
                      src="/divya1.png"
                      alt="Dr. Divya C. Senan"
                      className="w-full h-full object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0a6cff]" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#0a6cff] dark:text-sky-400 uppercase">
                      DIRECTOR'S OFFICE
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-[26px] font-serif font-bold leading-tight text-slate-900 dark:text-white">
                    Dr. Divya C. Senan
                  </h3>
                  <p className="text-[13px] text-[#0a6cff] dark:text-sky-400 font-semibold leading-relaxed">
                    Director, CLESE
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal leading-tight">
                    Associate Professor, University of Kerala
                  </p>
                </div>
              </div>

              {/* 3 Contact Info Rows - Frosted Glass Pills */}
              <div className="space-y-3 relative z-10">
                {[
                  { icon: Building2, label: 'Centre', value: 'Centre for Learning Engineering & Sustainability Education' },
                  { icon: MapPin, label: 'Location', value: 'Dept. of Education, Kariavattom Campus, TVM – 695581' },
                  { icon: Mail, label: 'Email', value: 'lenseedu24@gmail.com', isLink: true }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-[0_6px_20px_rgba(180,215,255,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.95)] hover:bg-white/70 dark:hover:bg-slate-800/70 hover:shadow-[0_10px_25px_rgba(37,99,235,0.14)] hover:scale-[1.01] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/95 via-blue-50/75 to-blue-100/50 dark:from-slate-800 dark:via-blue-950/60 dark:to-slate-900 border border-white/95 dark:border-blue-900/40 flex items-center justify-center text-[#0a6cff] dark:text-sky-400 shrink-0 shadow-[0_4px_12px_rgba(37,99,235,0.1),inset_0_1.5px_2px_#fff]">
                      <item.icon size={18} strokeWidth={1.8} />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <span className="block text-[10px] font-bold text-[#0a6cff] dark:text-sky-400 uppercase tracking-wider">{item.label}</span>
                      {item.isLink ? (
                        <a href={`mailto:${item.value}`} className="text-slate-900 dark:text-white font-semibold text-xs block hover:text-[#0a6cff] transition-colors truncate">{item.value}</a>
                      ) : (
                        <span className="text-slate-700 dark:text-slate-300 text-xs font-medium leading-snug block">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Email Director CTA Button */}
              <div className="pt-1 relative z-10">
                <a
                  href="mailto:lenseedu24@gmail.com"
                  className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#0052e0] via-[#1a6dff] to-[#38bdf8] hover:from-[#0047c4] hover:to-[#0ea5e9] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(26,109,255,0.35),inset_0_1.5px_1.5px_rgba(255,255,255,0.6)] hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Mail size={15} />
                  <span>EMAIL DIRECTOR</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* ACADEMIC PARTNERS CARD (matching picture) - Real Frosted Glass */}
            <div className="rounded-[2.5rem] bg-gradient-to-b from-white/65 via-white/45 to-white/60 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-950/65 backdrop-blur-3xl border border-white/80 dark:border-white/15 p-6 sm:p-7 shadow-[0_25px_60px_rgba(37,99,235,0.08),inset_0_2px_3px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.4)] space-y-4 relative overflow-hidden">
              {/* Real Glass Surface Glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-blue-50/15 pointer-events-none rounded-[inherit]" />

              <div className="flex items-center justify-between relative z-10">
                <h4 className="text-lg font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <Users size={19} className="text-[#0a6cff] dark:text-sky-400" />
                  Academic Partners
                </h4>
                <Link href="/about#partners" className="text-xs font-bold text-[#0a6cff] dark:text-sky-400 hover:text-[#0052e0] flex items-center gap-1 group/link">
                  <span>View All</span>
                  <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* 2x2 Grid of Partners - Frosted Glass Boxes (with circular placeholder containers for user's icons) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs relative z-10">
                {[
                  { name: 'SIET Kerala', sub: 'Govt. of Kerala' },
                  { name: 'Clarkson University', sub: 'STEM Curriculum, USA' },
                  { name: 'ICSSR New Delhi', sub: 'Social Science Research' },
                  { name: 'Child Dev Centre', sub: 'Kerala Association' }
                ].map((partner, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-[0_6px_20px_rgba(180,215,255,0.2),inset_0_1.5px_2px_rgba(255,255,255,0.95)] hover:bg-white/75 dark:hover:bg-slate-800/70 hover:shadow-[0_10px_25px_rgba(37,99,235,0.15),inset_0_2px_3px_#fff] hover:scale-[1.02] transition-all duration-300 cursor-default group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-white/95 via-blue-50/70 to-blue-100/40 dark:bg-slate-900 border border-white dark:border-slate-700 flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.1),inset_0_1.5px_2px_#fff] shrink-0 overflow-hidden">
                      {/* Circular placeholder ready for user's 4 image icons */}
                      <span className="text-[10px] font-bold text-[#0a6cff] dark:text-sky-400">
                        {partner.name.split(' ')[0].slice(0, 3)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="block font-bold text-slate-900 dark:text-white leading-tight truncate">{partner.name}</span>
                      <span className="block text-[10px] font-normal text-slate-400 dark:text-slate-500 truncate">{partner.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. BOTTOM VALUE BANNER (matching picture) - Real Frosted Glass */}
        {/* =================================================================== */}
        <div className="relative">
          {/* Ambient Colorful Light Emitter behind Banner */}
          <div className="absolute -inset-2 bg-gradient-to-r from-sky-400/20 via-blue-500/20 to-indigo-400/20 rounded-[3.2rem] blur-xl pointer-events-none -z-10" />

          {/* Ambient 3D Glass Sphere on left margin */}
          <div className="hidden lg:block absolute -left-8 -top-8 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/40 to-sky-300/30 border border-white/60 shadow-lg pointer-events-none z-20" />

          <div className="rounded-[2.8rem] bg-gradient-to-b from-white/65 via-white/45 to-white/60 dark:from-slate-900/70 dark:via-slate-900/50 dark:to-slate-950/65 backdrop-blur-3xl border border-white/80 dark:border-white/15 p-8 sm:p-12 shadow-[0_25px_60px_rgba(37,99,235,0.08),inset_0_2px_3px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.4)] dark:shadow-[0_25px_65px_rgba(0,0,0,0.5)] relative overflow-hidden">
            {/* Real Glass Surface Glare */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-blue-50/15 pointer-events-none rounded-[inherit]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">

              {/* Left Quote Column (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0a6cff]" />
                  <span className="text-[11px] font-bold tracking-[0.22em] text-[#0a6cff] dark:text-sky-400 uppercase">
                    OUR CORE COMMITMENT
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-serif font-bold text-slate-900 dark:text-white leading-[1.25] tracking-tight">
                  <span className="text-4xl text-[#0a6cff] font-serif leading-none mr-1">“</span>Knowledge shared today<br />
                  builds a more equitable and<br />
                  <span className="font-serif italic font-normal text-[#0a6cff] dark:text-sky-400">sustainable tomorrow.”</span>
                </h2>
              </div>

              {/* Right 4-Pillars Column (7 cols) - Real Glass Pillar Tiles */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
                {[
                  { icon: BookOpen, title: 'Open Access', sub: 'For all learners' },
                  { icon: Users, title: 'Stronger Communities', sub: 'Social empowerment' },
                  { icon: Lightbulb, title: 'Innovative Education', sub: 'Hands-on pedagogy' },
                  { icon: Leaf, title: 'Sustainable Impact', sub: 'Long-term change' }
                ].map((pill, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-5 rounded-3xl bg-white/50 dark:bg-slate-800/40 backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-[0_8px_24px_rgba(180,215,255,0.22),inset_0_1.5px_2px_rgba(255,255,255,0.95)] hover:bg-white/75 dark:hover:bg-slate-800/70 hover:shadow-[0_14px_32px_rgba(37,99,235,0.16),inset_0_2px_3px_#fff] hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-white/95 via-blue-50/75 to-blue-100/50 dark:from-slate-800 dark:via-blue-950/60 dark:to-slate-900 border border-white/95 dark:border-blue-900/40 text-[#0a6cff] dark:text-sky-400 flex items-center justify-center mb-3 shadow-[0_6px_16px_rgba(37,99,235,0.1),inset_0_2px_4px_#fff] group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(37,99,235,0.18)] transition-all duration-300">
                      <pill.icon size={22} strokeWidth={1.8} />
                    </div>
                    <span className="text-[13px] text-slate-900 dark:text-white font-bold leading-tight block mb-0.5">
                      {pill.title}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal leading-tight block">
                      {pill.sub}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
