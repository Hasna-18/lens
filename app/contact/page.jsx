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
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#020617] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-24 sm:pt-28 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">
      
      {/* Ambient background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[8%] -left-36 w-[550px] h-[550px] bg-[#e1ecd6]/60 dark:bg-emerald-950/20 rounded-full blur-3xl" />
        <div className="absolute top-[18%] right-0 w-[500px] h-[500px] bg-[#dbe8d0]/50 dark:bg-sky-950/20 rounded-full blur-3xl" />
        <div className="absolute top-[65%] -right-40 w-[650px] h-[650px] bg-[#dbe8d0]/50 dark:bg-emerald-950/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION - MATCHING MOCKUP DESIGN SYSTEM */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center pt-2 relative">
          
          {/* Left Content Column */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6 z-10 lg:-ml-2 xl:-ml-6">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#485b4d] dark:text-slate-400">
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors flex items-center gap-1.5">
                <Home size={14} className="text-[#2d5a3c] dark:text-[#60a5fa]" />
                <span>Home</span>
              </Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#60a5fa] font-semibold">Contact &amp; Location</span>
            </div>

            {/* Tagline Badge */}
            <div className="text-[11px] font-bold tracking-[0.22em] text-[#4e6252] dark:text-[#60a5fa] uppercase">
              CONNECT • COLLABORATE • ENGAGE
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-serif font-normal text-[#122016] dark:text-white leading-[1.05] tracking-tight">
              Get in Touch with<br />
              <span className="italic font-normal text-[#1d3d29] dark:text-[#60a5fa]">LEnSE</span>
            </h1>

            {/* Subtext Paragraph */}
            <p className="text-[#405245] dark:text-slate-300 text-sm sm:text-[14.5px] leading-[1.7] max-w-lg font-normal">
              We welcome academic collaborations, research partnerships, institutional inquiries, and invitations for school STEM camps across Kerala and beyond.
            </p>

            {/* Dual CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={scrollToForm}
                className="px-6 py-3 rounded-full bg-[#122b1c] hover:bg-[#1d442c] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-semibold tracking-wide flex items-center gap-2.5 transition-all shadow-sm cursor-pointer hover:scale-[1.02]"
              >
                <Send size={14} />
                <span>Send a Message</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={scrollToOffice}
                className="px-5 py-3 rounded-full bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/20 border border-[#d5e2d6] dark:border-white/10 text-[#19241c] dark:text-slate-200 text-xs font-medium flex items-center gap-2 transition-all shadow-xs cursor-pointer hover:scale-[1.02]"
              >
                <Building2 size={15} className="text-[#2d5a3c] dark:text-[#60a5fa]" />
                <span>Director's Office</span>
              </button>
            </div>

            {/* 4 Value Pillars / Quick Info Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-5 border-t border-[#d8e4d9]/70 dark:border-white/10 mt-2">
              <div className="flex items-center gap-2.5">
                <Mail size={20} strokeWidth={1.5} className="text-[#2d5a3c] dark:text-[#60a5fa] shrink-0" />
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-semibold text-[#14261a] dark:text-white">Email Us</span>
                  <span className="text-[#556758] dark:text-slate-400 font-normal truncate max-w-[90px]">lenseedu24</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MapPin size={20} strokeWidth={1.5} className="text-[#2d5a3c] dark:text-[#60a5fa] shrink-0" />
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-semibold text-[#14261a] dark:text-white">Location</span>
                  <span className="text-[#556758] dark:text-slate-400 font-normal whitespace-nowrap">Kariavattom</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={20} strokeWidth={1.5} className="text-[#2d5a3c] dark:text-[#60a5fa] shrink-0" />
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-semibold text-[#14261a] dark:text-white">Call Us</span>
                  <span className="text-[#556758] dark:text-slate-400 font-normal whitespace-nowrap">+91 1234 567</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock size={20} strokeWidth={1.5} className="text-[#2d5a3c] dark:text-[#60a5fa] shrink-0" />
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-semibold text-[#14261a] dark:text-white">Office Hours</span>
                  <span className="text-[#556758] dark:text-slate-400 font-normal whitespace-nowrap">09:30 - 17:00</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual with Organic Curved Aesthetic & Circular Orbit Badge */}
          <div className="lg:col-span-7 xl:col-span-7 relative w-full">
            
            {/* Outer Circular Curved Text Arc */}
            <div className="absolute -top-16 -left-16 sm:-top-20 sm:-left-20 w-64 h-64 sm:w-72 sm:h-72 pointer-events-none z-10 select-none hidden md:block">
              <svg viewBox="0 0 240 240" className="w-full h-full">
                <defs>
                  <path
                    id="contactOrbitArc"
                    d="M 40,120 A 80,80 0 0,1 200,120"
                    fill="none"
                  />
                </defs>
                <path
                  d="M 48,120 A 72,72 0 1,1 192,120 A 72,72 0 1,1 48,120"
                  fill="none"
                  stroke="#799d81"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                  opacity="0.5"
                />
                <text className="text-[8.5px] font-sans font-semibold uppercase tracking-[0.22em] fill-[#4a7253] dark:fill-emerald-400">
                  <textPath href="#contactOrbitArc" startOffset="50%" textAnchor="middle">
                    — LEARNING — ENGINEERING — SUSTAINABILITY •
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Campus Frame Container with Mockup's Sweeping Arch */}
            <div className="relative w-full h-[460px] sm:h-[530px] lg:h-[560px] rounded-tl-[6rem] sm:rounded-tl-[8rem] lg:rounded-tl-[9rem] rounded-tr-[3.5rem] rounded-br-[3.5rem] rounded-bl-[3.5rem] overflow-hidden shadow-2xl border border-white/60 dark:border-white/10 select-none group z-20">
              
              {/* Campus Architecture Image */}
              <img
                src="/campus_building.jpg"
                alt="LEnSE University of Kerala Campus"
                className="absolute inset-0 w-full h-full object-cover object-center scale-[1.01] group-hover:scale-105 transition-transform duration-1000"
                onError={(e) => {
                  e.currentTarget.src = "/home/bg.png";
                }}
              />

              {/* Overlaid Frosted Glass Quote Card */}
              <div className="absolute top-6 sm:top-8 left-6 sm:left-8 z-20 pointer-events-auto rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#020617]/80 backdrop-blur-xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-white/90 dark:border-white/20 max-w-[210px] sm:max-w-[230px]">
                <p className="font-serif italic text-lg sm:text-xl text-[#1a3824] dark:text-[#60a5fa] leading-snug tracking-tight">
                  “Open Dialogue<br />
                  for Sustainable<br />
                  Learning”
                </p>
                <div className="w-8 h-[2px] bg-[#2d5a3c] dark:bg-[#3b82f6] mt-2.5 rounded-full opacity-85" />
              </div>

              {/* Building Facade Typography Overlay (Top Right) */}
              <div className="absolute top-8 sm:top-10 right-8 sm:right-10 z-20 pointer-events-none hidden sm:flex flex-col gap-0.5 text-right">
                <span className="text-xs sm:text-[13px] font-sans font-medium text-[#22382c] dark:text-white/95">Inquiry</span>
                <span className="text-xs sm:text-[13px] font-sans font-medium text-[#22382c] dark:text-white/95">Collaboration</span>
                <span className="text-xs sm:text-[13px] font-sans font-medium text-[#22382c] dark:text-white/95">Outreach</span>
                <span className="text-xs sm:text-[13px] font-sans font-medium text-[#22382c] dark:text-white/95">Impact</span>
                <div className="w-6 h-[2px] bg-[#22382c] dark:bg-white/90 self-end mt-1 rounded-full opacity-80" />
              </div>

              {/* Floating Glass Pill Banner at bottom right */}
              <div className="absolute bottom-6 right-6 left-6 sm:left-auto z-20 pointer-events-auto">
                <div className="px-5 py-3 rounded-full bg-white/85 dark:bg-[#020617]/75 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.12)] flex items-center justify-between gap-4 group/pill hover:bg-white dark:hover:bg-[#10271c] transition-all">
                  <div className="flex flex-col text-xs sm:text-[12.5px] font-serif italic text-[#14261a] dark:text-slate-100 font-medium leading-tight">
                    <span>Empowering Educators.</span>
                    <span>Inspiring Learners.</span>
                    <span>Building a Sustainable Future.</span>
                  </div>
                  <button
                    onClick={scrollToForm}
                    className="w-8 h-8 rounded-full bg-[#f0f4ee] hover:bg-[#122b1c] hover:text-white text-[#14261a] dark:bg-white/10 dark:text-white flex items-center justify-center group-hover/pill:scale-105 transition-all shrink-0 cursor-pointer shadow-xs"
                    title="Send a message"
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. MAIN INTERACTIVE FORM & CONTACT DETAILS GRID */}
        {/* ============================================================ */}
        <div id="contact-form-section" className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-[2.2rem] sm:rounded-[2.5rem] bg-white dark:bg-[#020617]/70 border border-[#e2ece2] dark:border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-6">
            
            <div className="space-y-1 pb-3 border-b border-[#f0f4ef] dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e8f5e9] dark:bg-emerald-900/30 text-[#1e6e34] dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-[#c8e6c9] dark:border-emerald-400/20">
                  DIRECT ENQUIRY
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#122016] dark:text-white pt-1">
                Send us a Message
              </h3>
              <p className="text-xs text-[#526656] dark:text-slate-400">
                Submit your message or partnership query. Our team typically responds within 1–2 working days.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#eaf1e4] dark:bg-emerald-950/40 border border-[#d0e0cf] dark:border-emerald-800/30 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 bg-white dark:bg-emerald-900/60 rounded-full flex items-center justify-center text-[#2d5a3c] dark:text-emerald-300 mx-auto shadow-sm">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-serif font-bold text-[#14261a] dark:text-white">Thank you for reaching out!</h4>
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#dee8df] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2d5a3c] shadow-xs"
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#dee8df] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2d5a3c] shadow-xs"
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#dee8df] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2d5a3c] shadow-xs"
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#dee8df] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white focus:outline-none focus:ring-1 focus:ring-[#2d5a3c] shadow-xs cursor-pointer"
                    >
                      <option value="General Enquiry" className="dark:bg-[#020617] dark:text-white">General Enquiry</option>
                      <option value="Research Collaboration" className="dark:bg-[#020617] dark:text-white">Research &amp; Academic Collaboration</option>
                      <option value="School STEM Camp Request" className="dark:bg-[#020617] dark:text-white">School STEM Camp / Workshop Request</option>
                      <option value="Teacher Development" className="dark:bg-[#020617] dark:text-white">Teacher Capacity Building Program</option>
                      <option value="Scholar Connect" className="dark:bg-[#020617] dark:text-white">Scholar Connect Series Participation</option>
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-[#dee8df] dark:border-white/10 text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#2d5a3c] shadow-xs resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#122b1c] hover:bg-[#1d442c] dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
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
            <div id="director-office-card" className="scroll-mt-32 rounded-[2.2rem] bg-gradient-to-br from-[#122b1c] via-[#163623] to-[#0c1e14] dark:from-[#0a1f13] dark:via-[#07170e] dark:to-[#020a05] p-7 text-white shadow-xl space-y-6 relative overflow-hidden border border-white/15 dark:border-white/10">
              <div className="space-y-2 relative z-10">
                <span className="inline-flex px-3 py-1 rounded-md bg-[#a2d45e]/20 text-[#c2ec8b] border border-[#a2d45e]/30 text-[9.5px] font-bold uppercase tracking-widest">
                  DIRECTOR'S OFFICE
                </span>
                
                <h3 className="text-2xl font-serif leading-snug">
                  Dr. Divya C. Senan
                </h3>
                
                <p className="text-xs text-[#a8cfb0] font-medium">
                  Director, Centre for Learning Engineering &amp; Sustainability Education
                </p>
              </div>

              <div className="space-y-4 text-xs text-[#d0e6d5] relative z-10 pt-2 border-t border-white/10">
                
                {/* Centre Name */}
                <div className="flex items-start gap-3">
                  <Building2 size={16} className="text-[#a2d45e] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white">Centre:</span>
                    <span>Centre for Learning Engineering and Sustainability Education (LEnSE / CLESE)</span>
                  </div>
                </div>

                {/* Campus Address */}
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#a2d45e] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white">Campus Location:</span>
                    <span>Department of Education, University of Kerala, Kariavattom Campus, Thiruvananthapuram - 695581, Kerala, India</span>
                  </div>
                </div>

                {/* Official Email */}
                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-[#a2d45e] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white">Official Email:</span>
                    <a href="mailto:lenseedu24@gmail.com" className="text-[#a2d45e] hover:underline font-semibold">
                      lenseedu24@gmail.com
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3">
                  <Clock size={16} className="text-[#a2d45e] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white">Office Hours:</span>
                    <span>Monday – Friday: 09:30 AM – 05:00 PM IST</span>
                  </div>
                </div>

              </div>

              {/* Decorative botanical artwork */}
              <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 translate-x-4 translate-y-4">
                <Leaf size={140} />
              </div>
            </div>

            {/* INSTITUTIONAL COLLABORATORS CARD */}
            <div className="rounded-[2.2rem] bg-white dark:bg-[#020617]/70 border border-[#e2ece2] dark:border-white/10 p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-4">
              <h4 className="text-base font-serif font-bold text-[#14261a] dark:text-white pb-2 border-b border-[#f0f4ef] dark:border-white/10">
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
                  <div key={idx} className="p-3 rounded-xl bg-[#f5f8f3] dark:bg-white/5 border border-[#e5efe4] dark:border-white/10">
                    <span className="block font-bold text-[#14261a] dark:text-white leading-tight">{partner.name}</span>
                    <span className="block text-[10px] text-[#607464] dark:text-slate-400">{partner.sub}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* 3. BOTTOM VALUE BANNER ("KNOWLEDGE SHARED TODAY") */}
        {/* =================================================================== */}
        <div className="rounded-[2.2rem] sm:rounded-[2.8rem] bg-white/95 dark:bg-[#020617]/50 backdrop-blur-xl border border-white/95 dark:border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading Quote */}
            <div className="lg:col-span-6 space-y-3">
              <h2 className="text-2xl sm:text-[28px] lg:text-[30px] font-serif italic text-[#14261a] dark:text-white leading-snug">
                “Knowledge shared today<br />
                builds a more equitable and sustainable tomorrow.”
              </h2>
              <div className="w-10 h-[2.5px] bg-[#2d5a3c] dark:bg-[#3b82f6] rounded-full" />
            </div>

            {/* Right Column: 4 Feature Highlights */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-[#eaf1e4] dark:bg-white/10 text-[#2d5a3c] dark:text-[#60a5fa] flex items-center justify-center shadow-xs">
                  <BookOpen size={18} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-[#14261a] dark:text-white font-semibold leading-tight block">
                  Open Access
                </span>
                <span className="text-[11px] text-[#556758] dark:text-slate-400 leading-tight block">
                  for everyone
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-[#eaf1e4] dark:bg-white/10 text-[#2d5a3c] dark:text-[#60a5fa] flex items-center justify-center shadow-xs">
                  <Users size={18} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-[#14261a] dark:text-white font-semibold leading-tight block">
                  Stronger
                </span>
                <span className="text-[11px] text-[#556758] dark:text-slate-400 leading-tight block">
                  Communities
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-[#eaf1e4] dark:bg-white/10 text-[#2d5a3c] dark:text-[#60a5fa] flex items-center justify-center shadow-xs">
                  <Lightbulb size={18} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-[#14261a] dark:text-white font-semibold leading-tight block">
                  Innovative
                </span>
                <span className="text-[11px] text-[#556758] dark:text-slate-400 leading-tight block">
                  Education
                </span>
              </div>

              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-[#eaf1e4] dark:bg-white/10 text-[#2d5a3c] dark:text-[#60a5fa] flex items-center justify-center shadow-xs">
                  <Globe size={18} strokeWidth={1.5} />
                </div>
                <span className="text-xs text-[#14261a] dark:text-white font-semibold leading-tight block">
                  Sustainable
                </span>
                <span className="text-[11px] text-[#556758] dark:text-slate-400 leading-tight block">
                  Impact
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
