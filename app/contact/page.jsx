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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: 'General Enquiry', organization: '', message: '' });
    }, 4500);
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
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT BLEND */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img 
          src="/campus_building.jpg" 
          alt="LEnSE Campus & Contact" 
          className="w-full h-full object-cover object-center lg:object-right-top scale-[1.04] transform-gpu transition-transform duration-1000 ease-out" 
          onError={(e) => {
            e.currentTarget.src = "/home/bg.png";
          }}
        />

        {/* Soft Organic Fade Masks into the Canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/85 dark:via-[#031008]/85 via-[20%] to-transparent to-[45%] w-full h-full hidden lg:block" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/80 dark:via-[#031008]/85 via-[30%] to-transparent w-full h-full block lg:hidden" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/60 dark:via-[#031008]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] to-transparent" />
      </div>

      {/* Ambient background glows (matching About & Home pages) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full animate-pulse duration-1000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dbe9dd]/50 via-[#e4efe3]/30 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eef4ea]/50 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center pt-2 relative">
          
          {/* Left Content Column */}
          <div className="lg:col-span-8 space-y-6 z-10">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#0c1f15]/80 backdrop-blur-md border border-[#e8efe9] dark:border-[#1e422c] shadow-sm hover:border-[#1a5e35]/40 transition-colors duration-300">
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#4e6252] dark:text-[#a2d45e] uppercase">
                CONNECT &bull; COLLABORATE &bull; ENGAGE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.4rem] font-serif font-normal text-[#122016] dark:text-white leading-[1.05] tracking-tight">
              Get in Touch with<br />
              <span className="italic font-normal text-[#243a29] dark:text-[#a2d45e]">LEnSE.</span>
            </h1>

            {/* Subtext Paragraph */}
            <p className="text-[#405245] dark:text-slate-300 text-sm sm:text-[14.5px] leading-[1.72] max-w-lg font-normal">
              We welcome academic collaborations, research partnerships, institutional inquiries, and invitations for school STEM camps across Kerala and beyond.
            </p>

            {/* Dual CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={scrollToForm}
                className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(15,35,22,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]"
              >
                <Send size={13} />
                <span>Send a Message</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={scrollToOffice}
                className="px-6 py-3.5 rounded-full bg-white/70 hover:bg-white dark:bg-[#0b1c14] dark:hover:bg-[#11261a] backdrop-blur-xl border-[1.5px] border-white dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.04)] text-[#162d1f] dark:text-[#a2d45e] text-[11px] font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Building2 size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                <span>Director's Office</span>
              </button>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. FOUR QUICK CONTACT GLASS DOCK (Matching About Page's Signature Dock) */}
        {/* ========================================================================= */}
        <div className="p-3 sm:p-4 rounded-[2.8rem] bg-gradient-to-b from-white/55 via-white/35 to-white/20 dark:from-[#0b1c14]/85 dark:via-[#08180f]/80 dark:to-[#040e08]/75 backdrop-blur-3xl border-[1.5px] border-white/90 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),0_25px_60px_-10px_rgba(0,25,12,0.15)] dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.4)] relative z-20 transition-all duration-500">
          <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-95 pointer-events-none" />
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/70 dark:divide-[#183a27] relative z-10">
            {[
              { icon: Mail, title: 'Email Us', desc: 'lenseedu24@gmail.com\nOfficial enquiries', href: 'mailto:lenseedu24@gmail.com' },
              { icon: MapPin, title: 'Visit Campus', desc: 'Kariavattom Campus\nThiruvananthapuram - 695581', href: '#director-office-card' },
              { icon: Building2, title: 'Centre Office', desc: 'Dept. of Education\nUniversity of Kerala', href: '#director-office-card' },
              { icon: Clock, title: 'Office Hours', desc: '09:30 AM – 05:00 PM\nWorking days (IST)', href: '#director-office-card' }
            ].map((item, i) => (
              <a 
                key={i} 
                href={item.href} 
                className="flex flex-col items-center text-center p-5 sm:p-7 group hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-300 rounded-[2.2rem] cursor-pointer hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/25 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_3px_6px_rgba(255,255,255,1),inset_0_-3px_5px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,25,12,0.12)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#112417] dark:text-[#a2d45e] mb-3 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[#1a5e35] group-hover:text-white dark:group-hover:bg-[#a2d45e] dark:group-hover:text-[#0b1c14] group-hover:shadow-[inset_0_3px_6px_rgba(255,255,255,1),0_16px_32px_rgba(0,25,12,0.22)] transition-all duration-300">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <h4 className="text-[16px] font-serif font-normal text-[#101e14] dark:text-white mb-1 leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none group-hover:text-[#1a5e35] dark:group-hover:text-[#a2d45e] transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-[11.5px] text-[#3f5244] dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. MAIN INTERACTIVE FORM & CONTACT DETAILS GRID */}
        {/* ============================================================ */}
        <div id="contact-form-section" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-[2.6rem] bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] p-7 sm:p-10 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_50px_rgba(0,25,12,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-7">
            
            <div className="space-y-1.5 pb-4 border-b border-[#e6eee7] dark:border-[#183a27]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf1e4] dark:bg-[#11261a] border border-[#d2e0d3] dark:border-[#1e422c] text-[#2d5a3c] dark:text-[#a2d45e] text-[10px] font-bold uppercase tracking-widest">
                <span>DIRECT ENQUIRY</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#122016] dark:text-white pt-2">
                Send us a Message
              </h3>
              <p className="text-xs text-[#526656] dark:text-slate-300">
                Submit your query, institutional collaboration proposal, or camp request. We typically respond within 1–2 working days.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-[2rem] bg-[#eaf1e4] dark:bg-[#11261a]/80 border border-[#d0e0cf] dark:border-[#1e422c] text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-white dark:bg-[#1b432a] rounded-full flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] mx-auto shadow-sm">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-xl font-serif font-bold text-[#14261a] dark:text-white">Thank you for reaching out!</h4>
                <p className="text-xs text-[#526656] dark:text-slate-300 max-w-sm mx-auto">
                  Your message has been received by the Director's Office. We will get back to you shortly at {form.email || 'your email address'}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#2d3e31] dark:text-slate-300 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Dr. Ramesh Kumar" 
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/80 dark:bg-[#102418]/80 backdrop-blur-md border border-[#d2dfd4] dark:border-[#1e422c] text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1a5e35]/30 focus:border-[#1a5e35] shadow-xs transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#2d3e31] dark:text-slate-300 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. ramesh@university.edu" 
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/80 dark:bg-[#102418]/80 backdrop-blur-md border border-[#d2dfd4] dark:border-[#1e422c] text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1a5e35]/30 focus:border-[#1a5e35] shadow-xs transition-all"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Organization / Institution */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#2d3e31] dark:text-slate-300 uppercase tracking-wider">
                      Organization / School
                    </label>
                    <input 
                      type="text" 
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      placeholder="e.g. Govt. HSS, Thiruvananthapuram" 
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/80 dark:bg-[#102418]/80 backdrop-blur-md border border-[#d2dfd4] dark:border-[#1e422c] text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1a5e35]/30 focus:border-[#1a5e35] shadow-xs transition-all"
                    />
                  </div>

                  {/* Subject Category */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#2d3e31] dark:text-slate-300 uppercase tracking-wider">
                      Inquiry Category
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/80 dark:bg-[#102418]/80 backdrop-blur-md border border-[#d2dfd4] dark:border-[#1e422c] text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1a5e35]/30 focus:border-[#1a5e35] shadow-xs transition-all cursor-pointer"
                    >
                      <option value="General Enquiry" className="dark:bg-[#0b1c14] dark:text-white">General Enquiry</option>
                      <option value="Research Collaboration" className="dark:bg-[#0b1c14] dark:text-white">Research &amp; Academic Collaboration</option>
                      <option value="School STEM Camp Request" className="dark:bg-[#0b1c14] dark:text-white">School STEM Camp / Workshop Request</option>
                      <option value="Teacher Development" className="dark:bg-[#0b1c14] dark:text-white">Teacher Capacity Building Program</option>
                      <option value="Scholar Connect" className="dark:bg-[#0b1c14] dark:text-white">Scholar Connect Series Participation</option>
                    </select>
                  </div>

                </div>

                {/* Message Box */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#2d3e31] dark:text-slate-300 uppercase tracking-wider">
                    Message Details *
                  </label>
                  <textarea 
                    required 
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your proposal, query or institutional requirements..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-white/80 dark:bg-[#102418]/80 backdrop-blur-md border border-[#d2dfd4] dark:border-[#1e422c] text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1a5e35]/30 focus:border-[#1a5e35] shadow-xs resize-y transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="px-9 py-4 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(15,35,22,0.32)] hover:scale-105 active:scale-95 cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]"
                  >
                    <span>Submit Message</span>
                    <Send size={13} />
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Director Office Card & Institutional Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* DIRECTOR OFFICE CARD */}
            <div id="director-office-card" className="scroll-mt-32 rounded-[2.6rem] bg-gradient-to-br from-white/90 via-[#f7faf7]/85 to-[#edf4ee]/80 dark:from-[#0a1f13] dark:via-[#07170e] dark:to-[#020a05] backdrop-blur-2xl p-7 sm:p-8 text-[#14261a] dark:text-white shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_50px_rgba(0,25,12,0.06)] dark:shadow-2xl space-y-6 relative overflow-hidden border-[1.5px] border-white/95 dark:border-[#1e422c] group transition-all duration-500 hover:shadow-xl dark:hover:shadow-[0_25px_60px_-15px_rgba(15,35,22,0.45)]">
              {/* Ambient lighting glows */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#a2d45e]/20 dark:bg-[#a2d45e]/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-[#1a5e35]/10 dark:bg-[#2e6840]/20 rounded-full blur-2xl pointer-events-none" />
              
              {/* Profile Header with Portrait Photo */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
                {/* Director Portrait Avatar Frame */}
                <div className="relative shrink-0 group/photo">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-[#1a5e35]/25 via-[#a2d45e]/30 to-[#80be3b]/20 dark:from-[#a2d45e]/40 dark:via-[#4e965f]/30 dark:to-[#a2d45e]/10 blur-sm group-hover/photo:blur-md group-hover/photo:scale-105 transition-all duration-500" />
                  
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white dark:border-[#a2d45e]/30 shadow-xl bg-[#eef4ef] dark:bg-[#0a1c11]">
                    <img 
                      src="/divya.png" 
                      alt="Dr. Divya C. Senan" 
                      className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04] group-hover/photo:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 dark:from-[#08160f]/60 dark:to-white/10 dark:opacity-60 pointer-events-none" />
                  </div>

                </div>

                {/* Director Title & Role */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaf1e4] dark:bg-[#a2d45e]/20 text-[#1f4a2d] dark:text-[#c2ec8b] border border-[#cedfce] dark:border-[#a2d45e]/30 text-[9px] font-bold uppercase tracking-widest shadow-xs backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e] animate-pulse" />
                      DIRECTOR'S OFFICE
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-serif font-normal leading-snug pt-0.5 text-[#122016] dark:text-white tracking-wide">
                    Dr. Divya C. Senan
                  </h3>
                  
                  <p className="text-xs text-[#2d5a3c] dark:text-[#b0d9b8] font-medium leading-relaxed">
                    Director, Centre for Learning Engineering &amp; Sustainability Education
                  </p>

                  <p className="text-[11px] text-[#5a6f5e] dark:text-[#86ab8e] font-normal leading-tight">
                    Associate Professor, University of Kerala
                  </p>
                </div>
              </div>

              {/* Office & Institutional Details */}
              <div className="space-y-3 text-xs text-[#3d5242] dark:text-[#d0e6d5] relative z-10 pt-4 border-t border-[#e2ece3] dark:border-white/15">
                
                {/* Centre Name */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/80 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] border border-[#dee8df] dark:border-white/10 hover:border-[#1a5e35]/30 dark:hover:border-[#a2d45e]/30 shadow-xs dark:shadow-none transition-all duration-300">
                  <div className="w-8 h-8 rounded-xl bg-[#eaf1e4] dark:bg-[#a2d45e]/15 border border-[#d2e2d4] dark:border-[#a2d45e]/25 flex items-center justify-center text-[#1b432a] dark:text-[#a2d45e] shrink-0 mt-0.5">
                    <Building2 size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[10.5px] font-bold text-[#14261a] dark:text-white uppercase tracking-wider">Centre</span>
                    <span className="text-[#485d4d] dark:text-[#b9d5bf] text-xs leading-relaxed block">Centre for Learning Engineering and Sustainability Education (LEnSE / CLESE)</span>
                  </div>
                </div>

                {/* Campus Address */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/80 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] border border-[#dee8df] dark:border-white/10 hover:border-[#1a5e35]/30 dark:hover:border-[#a2d45e]/30 shadow-xs dark:shadow-none transition-all duration-300">
                  <div className="w-8 h-8 rounded-xl bg-[#eaf1e4] dark:bg-[#a2d45e]/15 border border-[#d2e2d4] dark:border-[#a2d45e]/25 flex items-center justify-center text-[#1b432a] dark:text-[#a2d45e] shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[10.5px] font-bold text-[#14261a] dark:text-white uppercase tracking-wider">Campus Location</span>
                    <span className="text-[#485d4d] dark:text-[#b9d5bf] text-xs leading-relaxed block">Department of Education, University of Kerala, Kariavattom Campus, Thiruvananthapuram - 695581, Kerala, India</span>
                  </div>
                </div>

                {/* Official Email */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/80 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] border border-[#dee8df] dark:border-white/10 hover:border-[#1a5e35]/30 dark:hover:border-[#a2d45e]/30 shadow-xs dark:shadow-none transition-all duration-300">
                  <div className="w-8 h-8 rounded-xl bg-[#eaf1e4] dark:bg-[#a2d45e]/15 border border-[#d2e2d4] dark:border-[#a2d45e]/25 flex items-center justify-center text-[#1b432a] dark:text-[#a2d45e] shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <span className="block text-[10.5px] font-bold text-[#14261a] dark:text-white uppercase tracking-wider">Official Email</span>
                    <a href="mailto:lenseedu24@gmail.com" className="text-[#1a5e35] dark:text-[#a2d45e] hover:text-[#0e3a1f] dark:hover:text-[#c2ec8b] hover:underline font-semibold text-xs block transition-colors">
                      lenseedu24@gmail.com
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/80 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] border border-[#dee8df] dark:border-white/10 hover:border-[#1a5e35]/30 dark:hover:border-[#a2d45e]/30 shadow-xs dark:shadow-none transition-all duration-300">
                  <div className="w-8 h-8 rounded-xl bg-[#eaf1e4] dark:bg-[#a2d45e]/15 border border-[#d2e2d4] dark:border-[#a2d45e]/25 flex items-center justify-center text-[#1b432a] dark:text-[#a2d45e] shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <span className="block text-[10.5px] font-bold text-[#14261a] dark:text-white uppercase tracking-wider">Office Hours</span>
                    <span className="text-[#485d4d] dark:text-[#b9d5bf] text-xs leading-relaxed block">Monday – Friday: 09:30 AM – 05:00 PM IST</span>
                  </div>
                </div>

              </div>

              {/* Direct Quick Action Buttons */}
              <div className="pt-2 flex items-center gap-3 relative z-10">
                <a 
                  href="mailto:lenseedu24@gmail.com?subject=Enquiry%20to%20Director's%20Office"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white dark:bg-gradient-to-r dark:from-[#a2d45e] dark:to-[#80be3b] dark:hover:from-[#b2e46e] dark:hover:to-[#8fce47] dark:text-[#091a0f] font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <Mail size={13} />
                  <span>Email Director</span>
                </a>
                <Link 
                  href="/about"
                  className="py-3 px-4 rounded-xl bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-[#cedece] dark:border-white/20 text-[#14261a] dark:text-white font-semibold text-[11px] text-center flex items-center justify-center gap-1.5 hover:border-[#1a5e35]/40 dark:hover:border-[#a2d45e]/40 shadow-xs dark:shadow-none transition-all duration-300"
                >
                  <span>About CLESE</span>
                  <ArrowRight size={12} />
                </Link>
              </div>

              {/* Decorative botanical artwork */}
              <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.06] dark:opacity-10 text-[#1b432a] dark:text-white translate-x-6 translate-y-6 group-hover:opacity-10 dark:group-hover:opacity-15 group-hover:scale-105 transition-all duration-500">
                <Leaf size={140} />
              </div>
            </div>

            {/* INSTITUTIONAL COLLABORATORS CARD */}
            <div className="rounded-[2.4rem] bg-gradient-to-br from-white/70 via-white/50 to-white/30 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] p-7 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_15px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] space-y-4">
              <h4 className="text-base font-serif font-bold text-[#14261a] dark:text-white pb-2 border-b border-[#e6eee7] dark:border-[#183a27]">
                Academic &amp; Government Partners
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { name: 'SIET Kerala', sub: 'Govt. of Kerala' },
                  { name: 'Clarkson University', sub: 'STEM Centre, USA' },
                  { name: 'ICSSR New Delhi', sub: 'Social Science Research' },
                  { name: 'Child Dev Centre', sub: 'Kazhakkoottam' },
                  { name: 'REFORM', sub: 'Educational Trust' },
                  { name: 'ELTAI & Hornby', sub: 'United Kingdom' }
                ].map((partner, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/70 dark:bg-[#11261a]/70 border border-[#dee8df] dark:border-[#1e422c] hover:border-[#1a5e35]/30 hover:scale-[1.02] transition-all duration-300">
                    <span className="block font-bold text-[#14261a] dark:text-white leading-tight">{partner.name}</span>
                    <span className="block text-[10px] text-[#607464] dark:text-slate-400 pt-0.5">{partner.sub}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* 4. BOTTOM VALUE BANNER ("KNOWLEDGE SHARED TODAY") */}
        {/* =================================================================== */}
        <div className="rounded-[2.8rem] bg-gradient-to-b from-white/70 via-white/50 to-white/30 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-3xl border-[1.5px] border-white/95 dark:border-[#183a27] p-8 sm:p-10 lg:p-12 shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_50px_rgba(0,25,12,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading Quote */}
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaf1e4] dark:bg-[#11261a] border border-[#d2e0d3] dark:border-[#1e422c] text-[#2d5a3c] dark:text-[#a2d45e] text-[10px] font-bold uppercase tracking-widest">
                <Leaf size={11} className="fill-[#2d5a3c] dark:fill-[#a2d45e]" />
                <span>OUR CORE COMMITMENT</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-normal italic text-[#14261a] dark:text-white leading-snug">
                “Knowledge shared today builds a more equitable and sustainable tomorrow.”
              </h2>
            </div>

            {/* Right Column: 4 Feature Highlights */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {[
                { icon: BookOpen, title: 'Open Access', sub: 'For all learners' },
                { icon: Users, title: 'Stronger Communities', sub: 'Social empowerment' },
                { icon: Lightbulb, title: 'Innovative Education', sub: 'Hands-on pedagogy' },
                { icon: Globe, title: 'Sustainable Impact', sub: 'Long-term change' }
              ].map((pill, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/60 dark:bg-[#11261a]/60 border border-white/80 dark:border-[#1e422c] hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#eaf1e4] to-[#dbeef0]/40 dark:from-[#132c1e] dark:to-[#0b1c14] text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center mb-2 shadow-xs group-hover:scale-110 group-hover:bg-[#1a5e35] group-hover:text-white dark:group-hover:bg-[#a2d45e] dark:group-hover:text-[#0b1c14] transition-all duration-300">
                    <pill.icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-[#14261a] dark:text-white font-bold leading-tight block">
                    {pill.title}
                  </span>
                  <span className="text-[10.5px] text-[#556758] dark:text-slate-400 leading-tight block pt-0.5">
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
