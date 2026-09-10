'use client';
import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  Users,
  GraduationCap,
  Globe,
  Monitor,
  Brain,
  Sprout,
  Building2,
  HeartHandshake,
  FlaskConical,
  Mail,
  MapPin,
  Calendar,
  Award,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 selection:bg-[#a2d45e]/30 pt-28 sm:pt-36 relative overflow-hidden transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT & SPHERE */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img 
          src="/about/about1.png" 
          alt="LEnSE Sustainability Sphere" 
          className="w-full h-full object-cover object-center lg:object-right-top scale-[1.04] transform-gpu" 
        />
        
        {/* Soft Organic Fade Masks into the Canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f3f5ed] dark:from-[#031008] via-[#f3f5ed]/80 dark:via-[#031008]/85 via-[18%] to-transparent to-[42%] w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#f3f5ed] dark:from-[#031008] via-[#f3f5ed]/60 dark:via-[#031008]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f3f5ed] dark:from-[#031008] to-transparent" />
      </div>

      {/* Ambient background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[38%] -left-40 w-[600px] h-[600px] bg-[#e2edd8]/50 dark:bg-[#0f301d]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-8 w-[650px] h-[650px] bg-[#dbe8d0]/50 dark:bg-[#082214]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* 1. HERO SECTION */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] sm:min-h-[560px]">
          
          {/* Left: Text & CTA */}
          <div className="lg:col-span-6 space-y-6 lg:pr-2 z-10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#455748] dark:text-[#a2d45e] uppercase">
                ABOUT LEnSE
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-normal text-[#131f17] dark:text-white leading-[1.05] tracking-tight font-serif">
              Learning today.<br />
              <span className="italic text-[#243a29] dark:text-[#a2d45e] font-serif font-normal">Sustaining tomorrow.</span>
            </h1>

            <p className="text-[#405245] dark:text-slate-300 text-[13.5px] leading-[1.72] max-w-[430px] font-normal">
              The Centre for Learning Engineering and Sustainability Education (LEnSE) at the University of Kerala was established in 2024 with the vision of promoting innovative, inclusive, and sustainable approaches to education, with a special focus on STEM (Science, Technology, Engineering and Mathematics) education. The Centre serves as a platform for academic engagement, capacity building, knowledge sharing, and collaborative initiatives aimed at strengthening learning and teaching practices.
            </p>

            <div className="pt-2">
              <Link href="/academics" className="inline-flex">
                <button className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 shadow-[0_12px_28px_rgba(15,35,22,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.03] group cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]">
                  <span>Our Programmes</span>
                  <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center">
                    <ArrowRight size={10} className="text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Transparent Crystal Glass "Established in 2024" Card */}
          <div className="lg:col-span-6 relative flex items-center justify-start lg:justify-center min-h-[340px] sm:min-h-[420px]">
            
            {/* Real Transparent Glass Card */}
            <div className="relative lg:ml-[-50px] xl:ml-[-90px] bg-gradient-to-br from-white/45 via-white/25 to-white/15 dark:from-[#0b1c14]/80 dark:via-[#08180f]/75 dark:to-[#040e08]/70 backdrop-blur-2xl p-6 sm:p-7 rounded-[2.2rem] border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),inset_2px_0_4px_rgba(255,255,255,0.8),0_25px_50px_-10px_rgba(0,30,15,0.25)] dark:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.5)] w-52 sm:w-60 z-20 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_30px_60px_-10px_rgba(0,30,15,0.3)]">
              
              {/* Top-Left Specular Corner Sheen */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/70 via-white/20 to-transparent dark:from-white/10 dark:via-transparent rounded-tl-[2.2rem] pointer-events-none" />

              {/* 3D Glass Crystal Lens Badge (Unclipped) */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white/90 via-white/60 to-white/30 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,25,12,0.18)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center absolute -top-5 -right-5 text-[#122418] dark:text-[#a2d45e] z-30 transition-transform duration-500 hover:scale-110">
                <Sprout size={20} strokeWidth={1.75} />
              </div>

              <p className="text-[10px] font-bold text-[#354839] dark:text-[#a2d45e] uppercase tracking-[0.2em] mb-1.5 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                Established in
              </p>
              
              <h3 className="text-4xl sm:text-5xl font-serif text-[#0f1d13] dark:text-white mb-3 tracking-tight font-normal relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] dark:drop-shadow-none">
                2024
              </h3>
              
              <p className="text-[11px] text-[#2c3d30] dark:text-slate-300 leading-relaxed font-medium mb-3 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                Promoting innovative, inclusive, and sustainable approaches to STEM education.
              </p>
              
              <div className="w-5 h-[1.5px] bg-[#1d3527]/70 dark:bg-[#a2d45e] rounded-full mt-2 relative z-10" />
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. FOUR FEATURE CARDS DOCK */}
        {/* ============================================================ */}
        <div className="mt-8 sm:mt-12 p-3 sm:p-4 rounded-[2.8rem] bg-gradient-to-b from-white/40 via-white/25 to-white/15 dark:from-[#0b1c14]/85 dark:via-[#08180f]/80 dark:to-[#040e08]/75 backdrop-blur-3xl border-[1.5px] border-white/90 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),0_25px_60px_-10px_rgba(0,25,12,0.15)] dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.4)] relative z-20 transition-all duration-500">
          
          {/* Top Specular Edge Highlight Beam */}
          <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-95 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/70 dark:divide-[#183a27] relative z-10">
            {[
              { icon: Users, title: 'Inclusive by\nPurpose', desc: 'Creating opportunities\nfor all learners.' },
              { icon: Leaf, title: 'Sustainability\nat Core', desc: 'Education that builds a\nbetter tomorrow.' },
              { icon: GraduationCap, title: 'STEM\nFocused', desc: 'Hands-on learning for\nreal-world impact.' },
              { icon: Globe, title: 'Global\nConnections', desc: 'Collaborating across\nborders for knowledge\nand growth.' }
            ].map((ft, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 sm:p-8 group hover:bg-white/30 dark:hover:bg-white/5 transition-all duration-500 rounded-[2.2rem] relative">
                
                {/* Real 3D Transparent Glass Lens Sphere */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/25 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_3px_6px_rgba(255,255,255,1),inset_0_-3px_5px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,25,12,0.12)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#112417] dark:text-[#a2d45e] mb-4 group-hover:scale-110 group-hover:shadow-[inset_0_3px_6px_rgba(255,255,255,1),0_16px_32px_rgba(0,25,12,0.18)] transition-all duration-500">
                  <ft.icon size={24} strokeWidth={1.5} />
                </div>
                
                <h4 className="text-[17px] font-serif font-normal text-[#101e14] dark:text-white mb-2 leading-snug whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                  {ft.title}
                </h4>
                
                <p className="text-[11.5px] text-[#3f5244] dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                  {ft.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. ABOUT LEnSE BENTO GRID */}
        {/* ============================================================ */}
        <div className="mt-24 sm:mt-32 lg:mt-36 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-20">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
                ABOUT LEnSE
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-serif font-normal text-[#142218] dark:text-white leading-[1.12] tracking-tight">
              Empowering minds.<br />
              Building a <span className="italic text-[#243d2c] dark:text-[#a2d45e]">sustainable future.</span>
            </h2>
            
            <p className="text-[#455649] dark:text-slate-300 text-[13.5px] leading-[1.7] font-normal max-w-md">
              LEnSE organizes seminars, workshops, conferences, training programmes, and academic activities in emerging areas of education, learning engineering, sustainability, and STEM.
            </p>
            <p className="text-[#455649] dark:text-slate-300 text-[13.5px] leading-[1.7] font-normal max-w-md">
              Through collaborations with reputed institutions including SIET (Govt. of Kerala), REFORM, Child Development Centre Kazhakkoottam, and Clarkson University (USA), we create meaningful opportunities for students, teachers, scholars, and communities.
            </p>
            
            <div className="pt-2">
              <Link href="/projects" className="inline-flex">
                <button className="px-7 py-3.5 rounded-full bg-white/60 hover:bg-white/90 dark:bg-[#0b1c14] dark:hover:bg-[#11261a] backdrop-blur-xl border-[1.5px] border-white dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.04)] dark:shadow-none text-[#162d1f] dark:text-[#a2d45e] text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 hover:scale-[1.03] group cursor-pointer">
                  <span>Explore Research & Projects</span>
                  <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-[#1e422c] flex items-center justify-center">
                    <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Bento Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Top Wide Glass Card */}
            <div className="sm:col-span-2 relative h-52 sm:h-56 rounded-[2.2rem] overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_15px_35px_rgba(0,25,12,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] group border-[1.5px] border-white/90 dark:border-[#183a27] transition-all duration-500 hover:-translate-y-1">
              <img 
                src="/about/about2.png" 
                alt="Inspiring environments" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute left-6 sm:left-8 bottom-6 flex items-center gap-3.5 bg-white/25 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border-[1.5px] border-white/80 dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.2)] rounded-full p-2.5 pr-6 text-white transition-all duration-500 group-hover:bg-white/35 dark:group-hover:bg-[#122c1e]">
                <div className="w-9 h-9 rounded-full bg-white/40 dark:bg-[#132c1e] backdrop-blur-md border border-white/80 dark:border-[#1e422c] flex items-center justify-center shrink-0 shadow-sm text-white dark:text-[#a2d45e]">
                  <Building2 size={16} />
                </div>
                <span className="text-xs font-semibold drop-shadow-sm max-w-[170px] leading-snug">
                  Inspiring environments for impactful learning.
                </span>
              </div>
            </div>

            {/* Middle Left Glass Card */}
            <div className="relative h-52 sm:h-56 rounded-[2.2rem] overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_15px_35px_rgba(0,25,12,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] group border-[1.5px] border-white/90 dark:border-[#183a27] transition-all duration-500 hover:-translate-y-1">
              <img 
                src="/about/about3.png" 
                alt="Collaborating" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <div className="flex flex-col items-center gap-3 bg-white/25 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border-[1.5px] border-white/80 dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.2)] rounded-[1.8rem] p-5 w-full text-white transition-all duration-500 group-hover:bg-white/35 dark:group-hover:bg-[#122c1e]">
                  <div className="w-9 h-9 rounded-full bg-white/40 dark:bg-[#132c1e] backdrop-blur-md border border-white/80 dark:border-[#1e422c] flex items-center justify-center shrink-0 shadow-sm text-white dark:text-[#a2d45e]">
                    <Users size={16} />
                  </div>
                  <span className="text-xs font-semibold drop-shadow-sm max-w-[150px] leading-snug">
                    Collaborating for a stronger academic ecosystem.
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Right (Pure Glass Card) */}
            <div className="relative h-52 sm:h-56 rounded-[2.2rem] bg-gradient-to-br from-white/55 via-white/35 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),0_20px_45px_rgba(0,25,12,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-center transition-all duration-500 hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/30 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_8px_18px_rgba(0,25,12,0.1)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#162d1f] dark:text-[#a2d45e] mb-4 group-hover:scale-110 transition-all duration-500">
                <FlaskConical size={22} strokeWidth={1.5} />
              </div>
              <p className="text-[#132216] dark:text-white text-[13.5px] font-medium leading-snug max-w-[190px] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                A dedicated STEM Learning Lab for hands-on, experiential learning.
              </p>
            </div>

            {/* Bottom Wide Glass Card */}
            <div className="sm:col-span-2 relative h-44 sm:h-48 rounded-[2.2rem] overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_15px_35px_rgba(0,25,12,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] group border-[1.5px] border-white/90 dark:border-[#183a27] transition-all duration-500 hover:-translate-y-1">
              <img 
                src="/about/about4.png" 
                alt="Innovative labs" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute left-6 sm:left-8 bottom-6 flex items-center gap-3.5 bg-white/30 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border-[1.5px] border-white/80 dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.2)] rounded-full p-2.5 pr-6 text-white transition-all duration-500 group-hover:bg-white/40 dark:group-hover:bg-[#122c1e]">
                <div className="w-9 h-9 rounded-full bg-white/40 dark:bg-[#132c1e] backdrop-blur-md border border-white/80 dark:border-[#1e422c] flex items-center justify-center shrink-0 shadow-sm text-white dark:text-[#a2d45e]">
                  <Leaf size={16} />
                </div>
                <span className="text-xs font-semibold drop-shadow-sm max-w-[190px] leading-snug">
                  Innovative learning labs for exploration and experimentation.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. OUR OBJECTIVES (FROM OFFICIAL PDF) */}
        {/* ============================================================ */}
        <div className="mt-24 sm:mt-32 lg:mt-36 relative z-20">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-normal text-[#142218] dark:text-white leading-[1.12] tracking-tight">
                Guiding our vision.<br />
                <span className="italic text-[#283d2d] dark:text-[#a2d45e] font-serif font-normal">Driving meaningful change.</span>
              </h2>
            </div>
            
            <Link href="/projects" className="shrink-0">
              <button className="px-6 py-3 rounded-full bg-white/80 hover:bg-white dark:bg-[#0b1c14] dark:hover:bg-[#11261a] backdrop-blur-xl border border-white/90 dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.03)] dark:shadow-none text-[#162d1f] dark:text-[#a2d45e] text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 hover:scale-[1.03] group cursor-pointer">
                <span>View All Objectives</span>
                <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-[#1e422c] flex items-center justify-center">
                  <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { 
                num: '01', 
                icon: Users, 
                title: 'Accessible\nEducation', 
                desc: 'Create educational environments using advanced computing to address career guidance and employability for all irrespective of barriers.' 
              },
              { 
                num: '02', 
                icon: Monitor, 
                title: 'Innovative\nDigital Tools', 
                desc: 'Build new innovative digital tools that are helping catalyse continuous improvements in students learning.' 
              },
              { 
                num: '03', 
                icon: Brain, 
                title: 'Learning\nEngineering', 
                desc: 'Integrate psychological principles of human learning and AI with computational methods for aptitude & skill development.' 
              },
              { 
                num: '04', 
                icon: Sprout, 
                title: 'Sustainability\nEducation', 
                desc: 'Create and support opportunities for learning about sustainability through coursework, research, and civic engagement.' 
              },
              { 
                num: '05', 
                icon: Globe, 
                title: 'Equity & Global\nAwareness', 
                desc: 'Connect sustainability, global interdependence, equity and civic action, providing research-informed development for educators.' 
              }
            ].map((obj, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-b from-white/60 via-white/35 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.3),0_15px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-500 h-full group"
              >
                {/* 3D Glass Lens Icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white/95 via-white/65 to-white/30 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06),0_8px_18px_rgba(0,25,12,0.08)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#14261a] dark:text-[#a2d45e] mb-6 shrink-0 group-hover:scale-110 transition-all duration-500">
                  <obj.icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#637567] dark:text-[#a2d45e] uppercase tracking-widest mb-1.5">
                    {obj.num}
                  </div>
                  <h4 className="text-[17px] font-serif font-semibold text-[#142217] dark:text-white mb-2 leading-snug whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                    {obj.title}
                  </h4>
                  <p className="text-[12px] text-[#4d5e51] dark:text-slate-300 leading-[1.65] font-normal">
                    {obj.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 5. KEY INITIATIVES (FROM OFFICIAL PDF) */}
        {/* ============================================================ */}
        <div className="mt-24 sm:mt-32 lg:mt-36 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Left Large Glass Card */}
            <div className="lg:col-span-4 rounded-[2rem] bg-gradient-to-br from-white/60 via-white/40 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px] group transition-all duration-500 hover:-translate-y-1.5">
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-5">
                  <Leaf size={13} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
                  <span className="text-[10.5px] font-bold tracking-[0.18em] text-[#3d5042] dark:text-[#a2d45e] uppercase">
                    KEY INITIATIVES
                  </span>
                </div>
                <h3 className="text-3xl font-serif font-normal text-[#122016] dark:text-white tracking-tight mb-3 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                  STEM Learning Lab
                </h3>
                <p className="text-[12.5px] text-[#445548] dark:text-slate-300 leading-relaxed max-w-[200px] font-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                  Activity-based STEM training for school students and specialized programmes for prospective teachers in a state-of-the-art lab.
                </p>
              </div>

              {/* White Round Arrow Button */}
              <div className="w-9 h-9 rounded-full bg-white dark:bg-[#11261a] border border-white/90 dark:border-[#1e422c] shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#14261a] dark:text-[#a2d45e] hover:scale-110 transition-all duration-500 cursor-pointer z-10 mt-6 shrink-0">
                <ArrowRight size={13} />
              </div>

              {/* Microscope Image on Bottom Right */}
              <div className="absolute -bottom-2 -right-4 w-[78%] max-w-[250px] pointer-events-none group-hover:scale-105 transition-transform duration-700 z-0 opacity-90 dark:opacity-75">
                <img 
                  src="/about/a1.png" 
                  alt="Microscope STEM Lab" 
                  className="w-full h-auto object-contain rounded-2xl drop-shadow-md" 
                />
              </div>
            </div>

            {/* Right 2x2 Grid Glass Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { 
                  title: 'Scholar Connect', 
                  desc: 'A platform for scholars to interact, share research ideas, and explore collaborative opportunities.', 
                  img: '/about/a3.png' 
                },
                { 
                  title: 'Institutional Collaborations', 
                  desc: 'Partnerships with SIET (Govt. of Kerala), REFORM, and Child Development Centre (CDC), Kazhakkoottam.', 
                  img: '/about/a5.png' 
                },
                { 
                  title: 'STEM 4 Girls & Gifted Camps', 
                  desc: 'Collaborative projects with SIET across 41 districts & ICSSR state-wide STEM training empowering young girls.', 
                  img: '/about/a2.png' 
                },
                { 
                  title: 'Global Academic Partnerships', 
                  desc: 'International collaboration with the STEM Centre at Clarkson University, USA with Prof. Jan De Waters.', 
                  img: '/about/a4.png' 
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="rounded-[2rem] overflow-hidden relative min-h-[220px] sm:min-h-[230px] border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_15px_35px_rgba(0,25,12,0.05)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] bg-white/40 dark:bg-[#0b1c14]/90 backdrop-blur-xl flex flex-col justify-between p-7 sm:p-8 group transition-all duration-500 hover:-translate-y-1.5"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-60" 
                  />
                  {/* Frosted Translucent Fade Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f0f3eb]/95 via-[#f0f3eb]/75 to-transparent dark:from-[#08180f]/95 dark:via-[#08180f]/75 dark:to-transparent" />
                  
                  <div className="relative z-10">
                    <h4 className="text-[17px] font-serif font-semibold text-[#122016] dark:text-white mb-2 leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                      {item.title}
                    </h4>
                    <p className="text-[12px] text-[#445548] dark:text-slate-300 leading-relaxed max-w-[230px] font-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="relative z-10 w-9 h-9 rounded-full bg-white dark:bg-[#11261a] border border-white/90 dark:border-[#1e422c] shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#14261a] dark:text-[#a2d45e] hover:scale-110 transition-all duration-500 cursor-pointer shrink-0 mt-4">
                    <ArrowRight size={13} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* 6. SOCIAL IMPACT BANNER (FROM OFFICIAL PDF) */}
        {/* ============================================================ */}
        <div className="mt-16 sm:mt-24 mb-12 rounded-[2.4rem] bg-gradient-to-b from-white/55 via-white/40 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-3xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-20 transition-all duration-500">
          
          {/* Left Image in Glass Frame */}
          <div className="lg:col-span-3 h-44 sm:h-48 rounded-[2rem] overflow-hidden border border-white/80 dark:border-[#183a27] shadow-sm">
            <img 
              src="/about/a5.png" 
              alt="Lush nature" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
            />
          </div>

          {/* Middle Content */}
          <div className="lg:col-span-6 space-y-3 px-1 sm:px-2">
            <div className="flex items-center gap-1.5">
              <Leaf size={12} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#556758] dark:text-[#a2d45e] uppercase">
                SOCIAL IMPACT
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#122016] dark:text-white leading-tight tracking-tight whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
              Education with{'\n'}social responsibility.
            </h2>
            
            <div className="space-y-2 max-w-xl text-[12.5px] text-[#445548] dark:text-slate-300 leading-[1.7]">
              <p>
                Programme fees collected from our training activities are utilized to support STEM education for socially and economically disadvantaged students in rural schools across Kerala.
              </p>
              <p>
                We believe every learner deserves the opportunity to explore, innovate, and excel.
              </p>
            </div>
          </div>

          {/* Right Glass Card */}
          <div className="lg:col-span-3 p-6 rounded-[2rem] bg-gradient-to-b from-white/75 via-white/50 to-white/30 dark:from-[#11261a]/90 dark:via-[#0c1f15]/80 dark:to-[#08160f]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_12px_28px_rgba(0,25,12,0.05)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-1 min-h-[170px]">
            <div className="w-13 h-13 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/30 dark:from-[#183d28] dark:to-[#112c1d] backdrop-blur-xl border border-white dark:border-[#1e422c] shadow-[inset_0_2px_3px_rgba(255,255,255,1),0_6px_14px_rgba(0,20,10,0.08)] flex items-center justify-center text-[#162d1f] dark:text-[#a2d45e] mb-3.5">
              <HeartHandshake size={22} strokeWidth={1.5} />
            </div>
            <p className="text-[12px] font-semibold text-[#182b1d] dark:text-white leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
              Empowering learners.<br />
              Enriching communities.<br />
              Sustaining the future.
            </p>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 7. LEADERSHIP & UNIVERSITY AFFILIATION (FROM OFFICIAL PDF) */}
        {/* ============================================================ */}
        <div className="mt-8 mb-4 rounded-[2.4rem] bg-gradient-to-b from-white/60 via-white/40 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-3xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-8 sm:p-10 relative z-20 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Director Details */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#556758] dark:text-[#a2d45e] uppercase">
                  CENTRE LEADERSHIP
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#122016] dark:text-white">
                Dr. Divya C Senan
              </h3>
              <p className="text-sm font-medium text-[#2d5a3c] dark:text-[#a2d45e]">
                Director, Centre for Learning Engineering and Sustainability Education (LEnSE)
              </p>
              <p className="text-xs text-[#445548] dark:text-slate-300 leading-relaxed max-w-xl pt-1">
                Leading academic engagement, research initiatives, and state-wide STEM outreach programs in collaboration with national and international institutions.
              </p>
            </div>

            {/* University Location & Contact */}
            <div className="lg:col-span-5 space-y-3 p-5 sm:p-6 rounded-[1.8rem] bg-white/50 dark:bg-[#11261a]/70 backdrop-blur-xl border border-white/90 dark:border-[#1e422c] shadow-sm">
              <div className="flex items-start gap-3 text-xs text-[#354639] dark:text-slate-300">
                <MapPin size={16} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0 mt-0.5" />
                <span>
                  University of Kerala, Kariavattom Campus,<br />
                  Thiruvananthapuram - 695581, Kerala, India
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#354639] dark:text-slate-300 pt-1">
                <Mail size={16} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                <a href="mailto:lenseedu24@gmail.com" className="text-[#1a3825] dark:text-[#a2d45e] font-semibold hover:underline">
                  lenseedu24@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
