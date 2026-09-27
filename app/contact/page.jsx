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
  Leaf
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setIsSubmitting(true);
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
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
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
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#030b06] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/40 transition-colors duration-500">
      
      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT BLEND (Deep Emerald Glass) */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[75%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img 
          src="/campus_building.jpg" 
          alt="LEnSE Campus" 
          className="w-full h-full object-cover object-center lg:object-right-top scale-[1.05] transform-gpu opacity-40 dark:opacity-20 mix-blend-overlay" 
          onError={(e) => { e.currentTarget.src = "/home/bg.png"; }}
        />
        {/* Massive vignette and gradient to blend into the dark/light background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#030b06] via-[#fcfdfa]/90 dark:via-[#030b06]/90 via-[30%] to-transparent w-full h-full hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfdfa] dark:from-[#030b06] via-[#fcfdfa]/90 dark:via-[#030b06]/90 via-[40%] to-transparent w-full h-full block lg:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#fcfdfa] dark:from-[#030b06] to-transparent" />
      </div>

      {/* Extreme Neon Glows (Glassmorphism Core) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a2d45e]/10 dark:bg-[#a2d45e]/[0.07] blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[60%] bg-[#1a5e35]/10 dark:bg-[#1a5e35]/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-[#4e965f]/10 dark:bg-[#a2d45e]/[0.05] blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 relative">
          
          <div className="lg:col-span-8 space-y-7 z-10">
            {/* Glowing Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-[#06180d]/60 backdrop-blur-xl border border-white/60 dark:border-[#a2d45e]/30 shadow-[0_4px_20px_rgba(162,212,94,0.15)] transition-all duration-300">
              <span className="w-2 h-2 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e] animate-pulse shadow-[0_0_10px_#a2d45e]" />
              <span className="text-[10px] sm:text-[11px] font-black tracking-[0.25em] text-[#2d5a3c] dark:text-[#a2d45e] uppercase">
                CONNECT &bull; COLLABORATE &bull; ENGAGE
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-serif font-medium text-[#0f1a13] dark:text-white leading-[1.05] tracking-tight drop-shadow-sm">
              Get in Touch with<br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#1a5e35] to-[#4e965f] dark:from-[#a2d45e] dark:to-[#6fb840]">LEnSE.</span>
            </h1>

            <p className="text-[#35473a] dark:text-[#b8d4c2] text-sm sm:text-base leading-[1.7] max-w-lg font-medium drop-shadow-sm">
              We welcome academic collaborations, research partnerships, institutional inquiries, and invitations for school STEM camps across Kerala and beyond.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 rounded-full bg-[#1b3726] hover:bg-[#13281c] dark:bg-[#a2d45e] dark:hover:bg-[#b8e874] text-white dark:text-[#030b06] text-[12px] font-black uppercase tracking-[0.15em] flex items-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(27,55,38,0.3)] dark:shadow-[0_0_30px_rgba(162,212,94,0.3)] hover:scale-105 active:scale-95"
              >
                <Send size={14} />
                <span>Send a Message</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={scrollToOffice}
                className="px-7 py-4 rounded-full bg-white/30 dark:bg-[#06180d]/40 backdrop-blur-xl border border-white/60 dark:border-[#a2d45e]/30 hover:bg-white/50 dark:hover:bg-[#0a2414]/60 text-[#1b3726] dark:text-[#a2d45e] text-[12px] font-bold uppercase tracking-[0.1em] flex items-center gap-2.5 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(162,212,94,0.2)] hover:scale-105 active:scale-95"
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
        <div className="p-3 sm:p-5 rounded-[3rem] bg-white/40 dark:bg-[#06180d]/40 backdrop-blur-[40px] border border-white/60 dark:border-[#a2d45e]/20 shadow-[0_8px_32px_rgba(26,94,53,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative z-20 group">
          <div className="absolute inset-0 rounded-[3rem] border border-white/40 dark:border-[#a2d45e]/10 pointer-events-none mix-blend-overlay" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/50 dark:divide-[#1a5e35]/30 relative z-10">
            {[
              { icon: Mail, title: 'Email Us', desc: 'lenseedu24@gmail.com\nOfficial enquiries', href: 'mailto:lenseedu24@gmail.com' },
              { icon: MapPin, title: 'Visit Campus', desc: 'Kariavattom Campus\nThiruvananthapuram', href: '#director-office-card' },
              { icon: Building2, title: 'Centre Office', desc: 'Dept. of Education\nUniversity of Kerala', href: '#director-office-card' },
              { icon: Clock, title: 'Office Hours', desc: '09:30 AM – 05:00 PM\nWorking days (IST)', href: '#director-office-card' }
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href} 
                className="flex flex-col items-center text-center p-6 sm:p-8 hover:bg-white/30 dark:hover:bg-[#a2d45e]/[0.03] transition-all duration-500 rounded-[2.5rem] cursor-pointer hover:-translate-y-2 group/card"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/60 dark:bg-[#0a2414]/80 backdrop-blur-md border border-white dark:border-[#a2d45e]/40 shadow-lg flex items-center justify-center text-[#1b3726] dark:text-[#a2d45e] mb-4 group-hover/card:scale-110 group-hover/card:rotate-6 group-hover/card:shadow-[0_0_20px_rgba(162,212,94,0.4)] transition-all duration-500">
                  <item.icon size={26} strokeWidth={1.5} />
                </div>
                <h4 className="text-[17px] font-serif font-bold text-[#101e14] dark:text-white mb-1.5 group-hover/card:text-[#1a5e35] dark:group-hover/card:text-[#a2d45e] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-xs text-[#486350] dark:text-[#8ba895] leading-relaxed whitespace-pre-line font-medium">
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
          <div className="lg:col-span-7 rounded-[3rem] bg-white/40 dark:bg-[#06180d]/60 backdrop-blur-[50px] border border-white/60 dark:border-[#a2d45e]/20 p-8 sm:p-12 shadow-[0_15px_40px_rgba(26,94,53,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            
            {/* Soft inner glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#a2d45e]/10 dark:bg-[#a2d45e]/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-2 pb-6 border-b border-white/50 dark:border-[#1a5e35]/30 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-[#0a2414]/60 border border-white/80 dark:border-[#a2d45e]/30 text-[#1b3726] dark:text-[#a2d45e] text-[10px] font-black uppercase tracking-widest shadow-sm">
                <span>DIRECT ENQUIRY</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif font-medium text-[#122016] dark:text-white pt-2">
                Send us a Message
              </h3>
              <p className="text-sm text-[#486350] dark:text-[#8ba895] font-medium leading-relaxed">
                Submit your query, institutional collaboration proposal, or camp request. We typically respond within 1–2 working days.
              </p>
            </div>

            {submitted ? (
              <div className="p-10 rounded-[2.5rem] bg-white/60 dark:bg-[#0a2414]/60 backdrop-blur-xl border border-white/80 dark:border-[#a2d45e]/30 text-center space-y-4 mt-6 animate-in fade-in zoom-in-95 duration-500 shadow-xl">
                <div className="w-20 h-20 bg-[#1b3726] dark:bg-[#a2d45e] rounded-full flex items-center justify-center text-white dark:text-[#030b06] mx-auto shadow-[0_0_30px_rgba(162,212,94,0.4)]">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-[#14261a] dark:text-white">Message Received!</h4>
                <p className="text-sm text-[#486350] dark:text-[#b8d4c2] max-w-sm mx-auto font-medium">
                  Your enquiry has been securely sent to the Director's Office. We will contact you shortly at <span className="font-bold text-[#1b3726] dark:text-[#a2d45e]">{form.email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 mt-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1b3726] dark:text-[#a2d45e] uppercase tracking-widest ml-2">Your Name *</label>
                    <input 
                      type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Dr. Ramesh Kumar" 
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-[#0a2414]/50 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/30 text-sm font-semibold text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-[#4a6b57] focus:outline-none focus:ring-4 focus:ring-[#a2d45e]/20 focus:border-[#a2d45e] dark:focus:border-[#a2d45e] shadow-inner transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1b3726] dark:text-[#a2d45e] uppercase tracking-widest ml-2">Email Address *</label>
                    <input 
                      type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. ramesh@university.edu" 
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-[#0a2414]/50 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/30 text-sm font-semibold text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-[#4a6b57] focus:outline-none focus:ring-4 focus:ring-[#a2d45e]/20 focus:border-[#a2d45e] dark:focus:border-[#a2d45e] shadow-inner transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1b3726] dark:text-[#a2d45e] uppercase tracking-widest ml-2">Organization / School</label>
                    <input 
                      type="text" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g. Govt. HSS" 
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-[#0a2414]/50 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/30 text-sm font-semibold text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-[#4a6b57] focus:outline-none focus:ring-4 focus:ring-[#a2d45e]/20 focus:border-[#a2d45e] dark:focus:border-[#a2d45e] shadow-inner transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-[#1b3726] dark:text-[#a2d45e] uppercase tracking-widest ml-2">Inquiry Category</label>
                    <select
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-[#0a2414]/50 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/30 text-sm font-semibold text-[#19241c] dark:text-white focus:outline-none focus:ring-4 focus:ring-[#a2d45e]/20 focus:border-[#a2d45e] dark:focus:border-[#a2d45e] shadow-inner transition-all duration-300 cursor-pointer appearance-none"
                    >
                      <option value="General Enquiry" className="dark:bg-[#06180d] dark:text-white">General Enquiry</option>
                      <option value="Research Collaboration" className="dark:bg-[#06180d] dark:text-white">Research &amp; Academic Collaboration</option>
                      <option value="School STEM Camp Request" className="dark:bg-[#06180d] dark:text-white">School STEM Camp / Workshop Request</option>
                      <option value="Teacher Development" className="dark:bg-[#06180d] dark:text-white">Teacher Capacity Building Program</option>
                      <option value="Scholar Connect" className="dark:bg-[#06180d] dark:text-white">Scholar Connect Series Participation</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[#1b3726] dark:text-[#a2d45e] uppercase tracking-widest ml-2">Message Details *</label>
                  <textarea 
                    required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your proposal or requirements..."
                    className="w-full px-5 py-4 rounded-2xl bg-white/50 dark:bg-[#0a2414]/50 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/30 text-sm font-semibold text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-[#4a6b57] focus:outline-none focus:ring-4 focus:ring-[#a2d45e]/20 focus:border-[#a2d45e] dark:focus:border-[#a2d45e] shadow-inner resize-y transition-all duration-300"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#1b3726] hover:bg-[#13281c] dark:bg-[#a2d45e] dark:hover:bg-[#b8e874] text-white dark:text-[#030b06] text-[12px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(27,55,38,0.3)] dark:shadow-[0_0_30px_rgba(162,212,94,0.3)] hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
            
            {/* DIRECTOR OFFICE CARD (Neon Frosted Glass) */}
            <div id="director-office-card" className="scroll-mt-32 rounded-[3rem] bg-white/40 dark:bg-[#06180d]/60 backdrop-blur-[60px] p-8 sm:p-10 text-[#14261a] dark:text-white shadow-[0_15px_40px_rgba(26,94,53,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-7 relative overflow-hidden border border-white/60 dark:border-[#a2d45e]/30 group transition-all duration-500 hover:shadow-[0_20px_60px_rgba(162,212,94,0.15)] dark:hover:shadow-[0_0_60px_rgba(162,212,94,0.15)] hover:-translate-y-1">
              
              {/* Intense Neon Orb behind the photo */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#a2d45e]/30 dark:bg-[#a2d45e]/20 rounded-full blur-[70px] pointer-events-none group-hover:bg-[#a2d45e]/40 transition-colors duration-700" />
              
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
                <div className="relative shrink-0">
                  <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-[#1a5e35]/40 via-[#a2d45e]/60 to-[#a2d45e]/20 dark:from-[#a2d45e]/50 dark:via-[#4e965f]/50 dark:to-[#a2d45e]/20 blur-xl group-hover:blur-2xl transition-all duration-700 opacity-60 dark:opacity-80 animate-pulse" />
                  
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-[1.8rem] overflow-hidden border-[3px] border-white/90 dark:border-[#a2d45e]/50 shadow-2xl bg-[#0a1c11]">
                    <img 
                      src="/divya1.png" 
                      alt="Dr. Divya C. Senan" 
                      className="w-full h-full object-cover object-top filter contrast-[1.1] group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="space-y-2 flex-1 min-w-0 pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-[#0a2414]/80 backdrop-blur-md text-[#1b3726] dark:text-[#a2d45e] border border-white/80 dark:border-[#a2d45e]/40 text-[9px] font-black uppercase tracking-widest shadow-sm mb-1">
                    DIRECTOR'S OFFICE
                  </span>
                  <h3 className="text-2xl sm:text-[28px] font-serif font-bold leading-tight text-[#0f1a13] dark:text-white">
                    Dr. Divya C. Senan
                  </h3>
                  <p className="text-[13px] text-[#2d5a3c] dark:text-[#a2d45e] font-semibold leading-relaxed">
                    Director, CLESE
                  </p>
                  <p className="text-[11px] text-[#486350] dark:text-[#8ba895] font-medium leading-tight">
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
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/50 dark:bg-[#0a2414]/40 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/20 hover:border-[#a2d45e]/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-[#a2d45e]/10 border border-white dark:border-[#a2d45e]/30 flex items-center justify-center text-[#1b3726] dark:text-[#a2d45e] shrink-0 shadow-sm">
                      <item.icon size={18} />
                    </div>
                    <div className="space-y-1 mt-0.5">
                      <span className="block text-[10px] font-black text-[#1b3726] dark:text-[#a2d45e] uppercase tracking-wider">{item.label}</span>
                      {item.isLink ? (
                        <a href={`mailto:${item.value}`} className="text-[#122016] dark:text-white font-semibold text-xs block hover:text-[#1b3726] dark:hover:text-[#a2d45e] transition-colors">{item.value}</a>
                      ) : (
                        <span className="text-[#35473a] dark:text-[#b8d4c2] text-xs font-medium leading-relaxed block">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-3 relative z-10">
                <a 
                  href="mailto:lenseedu24@gmail.com"
                  className="flex-1 py-4 px-4 rounded-2xl bg-[#1b3726] hover:bg-[#13281c] dark:bg-[#a2d45e] dark:hover:bg-[#b8e874] text-white dark:text-[#030b06] font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_10px_20px_rgba(27,55,38,0.2)] dark:shadow-[0_0_20px_rgba(162,212,94,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <Mail size={14} />
                  <span>Email Director</span>
                </a>
              </div>
            </div>

            {/* PARTNERS CARD (Frosted Glass) */}
            <div className="rounded-[3rem] bg-white/40 dark:bg-[#06180d]/60 backdrop-blur-[50px] border border-white/60 dark:border-[#a2d45e]/20 p-8 sm:p-10 shadow-[0_15px_40px_rgba(26,94,53,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 group hover:-translate-y-1 transition-all duration-500">
              <h4 className="text-xl font-serif font-bold text-[#122016] dark:text-white flex items-center gap-3">
                <Users className="text-[#1b3726] dark:text-[#a2d45e]" />
                Academic Partners
              </h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                {[
                  { name: 'SIET Kerala', sub: 'Govt. of Kerala' },
                  { name: 'Clarkson University', sub: 'STEM Centre, USA' },
                  { name: 'ICSSR New Delhi', sub: 'Social Science Research' },
                  { name: 'Child Dev Centre', sub: 'Kazhakkoottam' }
                ].map((partner, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/50 dark:bg-[#0a2414]/40 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/20 hover:border-[#1b3726]/30 dark:hover:border-[#a2d45e]/50 hover:bg-white/80 dark:hover:bg-[#a2d45e]/10 transition-all duration-300 cursor-default">
                    <span className="block font-bold text-[#14261a] dark:text-white leading-tight mb-1">{partner.name}</span>
                    <span className="block text-[10px] font-medium text-[#486350] dark:text-[#8ba895]">{partner.sub}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. BOTTOM VALUE BANNER (Neon Glass) */}
        {/* =================================================================== */}
        <div className="rounded-[3rem] bg-white/40 dark:bg-[#06180d]/60 backdrop-blur-[60px] border border-white/60 dark:border-[#a2d45e]/20 p-10 sm:p-14 shadow-[0_15px_40px_rgba(26,94,53,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#a2d45e]/5 dark:via-[#a2d45e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-[#0a2414]/80 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/40 text-[#1b3726] dark:text-[#a2d45e] text-[10px] font-black uppercase tracking-widest shadow-sm">
                <Leaf size={12} className="fill-current" />
                <span>OUR CORE COMMITMENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium italic text-[#122016] dark:text-white leading-[1.3] drop-shadow-sm">
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
                <div key={idx} className="flex flex-col items-center text-center p-5 rounded-3xl bg-white/50 dark:bg-[#0a2414]/40 backdrop-blur-md border border-white/80 dark:border-[#a2d45e]/20 hover:-translate-y-2 hover:bg-white/80 dark:hover:bg-[#a2d45e]/10 hover:border-[#1b3726]/30 dark:hover:border-[#a2d45e]/50 hover:shadow-[0_10px_30px_rgba(162,212,94,0.15)] transition-all duration-500 group/pill">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-[#06180d]/80 border border-white dark:border-[#a2d45e]/30 text-[#1b3726] dark:text-[#a2d45e] flex items-center justify-center mb-3 shadow-sm group-hover/pill:scale-110 group-hover/pill:rotate-6 group-hover/pill:shadow-[0_0_20px_rgba(162,212,94,0.3)] transition-all duration-500">
                    <pill.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] text-[#122016] dark:text-white font-bold leading-tight block mb-1">
                    {pill.title}
                  </span>
                  <span className="text-[11px] text-[#486350] dark:text-[#8ba895] font-medium leading-tight block">
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
