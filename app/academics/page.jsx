'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Leaf,
  Home,
  Download,
  FileText,
  Search,
  BookOpen,
  Users,
  Info,
  ArrowRight,
  Sparkles,
  Layers, 
  Calendar,
  SlidersHorizontal,
  X,
  Globe,
  Lightbulb
} from 'lucide-react';

// ============================================================================
// 1. DATA DEFINITIONS & SHOWCASE RESOURCES
// ============================================================================

const CATEGORIES = [
  { id: 'All', label: 'All' },
  { id: 'Reports', label: 'Reports' },
  { id: 'Brochures', label: 'Brochures' },
  { id: 'Submissions', label: 'Submissions' },
  { id: 'Courseware', label: 'Courseware' },
  { id: 'Toolkits', label: 'Toolkits' },
  { id: 'Guides', label: 'Guides' }
];

// (Static data removed - all resources are fetched live from database via /api/resources)

// ============================================================================
// 2. REALISTIC PUBLICATION COVER COMPONENT (LIGHT & DARK GLASS STYLING)
// ============================================================================

function PublicationCover({ type }) {
  switch (type) {
    case 'report':
      return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#faf6ef] dark:bg-[#0a2016]/90 p-3 flex flex-col justify-between shadow-sm border border-slate-200/60 dark:border-emerald-500/25 select-none group-hover:shadow-md transition-all duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span className="text-[13px] font-serif font-bold text-[#14261a] dark:text-emerald-100 leading-tight block">Annual</span>
            <span className="text-[13px] font-serif font-bold text-[#14261a] dark:text-emerald-100 leading-tight block">Report</span>
            <span className="text-[8px] font-sans text-[#435948] dark:text-emerald-400 tracking-wider block pt-0.5 font-medium">2024 - 2025</span>
          </div>

          {/* Layered Topo Contours filling bottom area */}
          <div className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none overflow-hidden">
            <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,32 Q25,12 52,28 T100,18 L100,80 L0,80 Z" fill="#9db59f" className="opacity-45 dark:opacity-20" />
              <path d="M0,44 Q30,24 60,38 T100,28 L100,80 L0,80 Z" fill="#678d6c" className="opacity-60 dark:opacity-35" />
              <path d="M0,54 Q35,38 72,50 T100,42 L100,80 L0,80 Z" fill="#35583b" className="opacity-80 dark:opacity-55" />
              <path d="M0,66 Q40,52 75,62 T100,56 L100,80 L0,80 Z" fill="#1b3d23" className="dark:fill-[#05160d]" />
            </svg>
          </div>

          <div className="relative z-10 self-center">
            <span className="px-2.5 py-0.5 rounded-full bg-[#122b1b]/80 dark:bg-emerald-950/80 backdrop-blur-xs text-white dark:text-emerald-200 text-[7.5px] font-bold tracking-widest uppercase border border-white/10 dark:border-emerald-400/20">
              LEnSE
            </span>
          </div>
        </div>
      );

    case 'guide':
      return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#f2f6f2] dark:bg-[#071d17]/90 p-3 flex flex-col justify-between shadow-sm border border-slate-200/60 dark:border-emerald-500/25 select-none group-hover:shadow-md transition-all duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span className="text-xl font-bold font-serif text-[#142b1a] dark:text-emerald-100 block leading-none">AI</span>
            <span className="text-[10.5px] font-sans font-semibold text-[#204029] dark:text-emerald-200 leading-tight block">in Education</span>
            <span className="text-[7.5px] font-sans text-[#335e3f] dark:text-emerald-400 block pt-0.5 font-medium">A Practical Guide</span>
          </div>

          {/* Concentric Wave Ripples */}
          <div className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none overflow-hidden flex items-end justify-center">
            <div className="w-[140%] aspect-square rounded-full bg-gradient-to-t from-[#1b3d26] dark:from-[#051a11] via-[#2f5d3d] dark:via-[#0c3121] to-[#598468] dark:to-[#174831] translate-y-[45%] flex items-center justify-center p-3">
              <div className="w-[75%] h-[75%] rounded-full border border-white/25 dark:border-emerald-400/20" />
            </div>
          </div>

          <div className="relative z-10 self-center">
            <span className="px-2.5 py-0.5 rounded-full bg-[#102b19]/80 dark:bg-emerald-950/80 backdrop-blur-xs text-white dark:text-emerald-200 text-[7.5px] font-bold tracking-widest uppercase border border-white/10 dark:border-emerald-400/20">
              LEnSE
            </span>
          </div>
        </div>
      );

    case 'toolkit':
      return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#f8f5ee] dark:bg-[#121c16]/90 p-3 flex flex-col justify-between shadow-sm border border-slate-200/60 dark:border-emerald-500/25 select-none group-hover:shadow-md transition-all duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span className="text-[13px] font-sans font-extrabold text-[#2d291e] dark:text-emerald-100 tracking-wide block leading-tight">STEM</span>
            <span className="text-[9.5px] font-sans font-semibold text-[#484232] dark:text-emerald-300 block">Activity Toolkit</span>
          </div>
          
          {/* 3 Intersecting Floating Bubbles */}
          <div className="relative z-10 flex flex-col items-center gap-1.5 my-auto py-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2a261c]/80 dark:bg-emerald-900/60 backdrop-blur-xs flex items-center justify-center text-white dark:text-emerald-200 shadow-xs border border-white/10">
                <Sparkles size={11} />
              </div>
              <div className="w-6 h-6 rounded-full bg-[#3d4d38]/80 dark:bg-emerald-800/60 backdrop-blur-xs flex items-center justify-center text-white dark:text-emerald-200 shadow-xs border border-white/10">
                <BookOpen size={11} />
              </div>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#2a261c]/80 dark:bg-emerald-900/60 backdrop-blur-xs flex items-center justify-center text-white dark:text-emerald-200 shadow-xs border border-white/10">
              <Layers size={11} />
            </div>
          </div>

          <div className="relative z-10 self-center">
            <span className="px-2.5 py-0.5 rounded-full bg-[#2a261c]/80 dark:bg-emerald-950/80 backdrop-blur-xs text-white dark:text-emerald-200 text-[7.5px] font-bold tracking-widest uppercase border border-white/10 dark:border-emerald-400/20">
              LEnSE
            </span>
          </div>
        </div>
      );

    case 'courseware':
      return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#faf6ef] dark:bg-[#0b1e16]/90 p-3 flex flex-col justify-between shadow-sm border border-slate-200/60 dark:border-emerald-500/25 select-none group-hover:shadow-md transition-all duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span className="text-[13px] font-serif font-bold text-[#233527] dark:text-emerald-100 leading-tight block">Learning</span>
            <span className="text-[13px] font-serif font-bold text-[#233527] dark:text-emerald-100 leading-tight block">Module</span>
            <span className="text-[8px] font-sans text-[#435948] dark:text-emerald-400 font-semibold block pt-0.5">FYUGP Sem II</span>
          </div>
          
          {/* Flowing Landscape Hills */}
          <div className="absolute inset-0 pointer-events-none flex items-end">
            <svg viewBox="0 0 100 80" className="w-full h-1/2" preserveAspectRatio="none" fill="none">
              <path d="M0,40 Q30,10 65,35 T100,20 L100,80 L0,80 Z" fill="#8ca890" className="opacity-45 dark:opacity-20" />
              <path d="M0,50 Q45,25 75,55 T100,45 L100,80 L0,80 Z" fill="#587a5f" className="opacity-65 dark:opacity-35" />
              <path d="M0,62 Q35,45 70,60 T100,52 L100,80 L0,80 Z" fill="#284d30" className="opacity-90 dark:opacity-55" />
            </svg>
          </div>

          <div className="relative z-10 self-center">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1a2e20]/75 dark:bg-emerald-950/80 backdrop-blur-xs text-white dark:text-emerald-200 text-[7.5px] font-bold tracking-widest uppercase border border-white/10 dark:border-emerald-400/20">
              FYUGP
            </span>
          </div>
        </div>
      );

    case 'submission':
      return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#f0f6f2] dark:bg-[#071c17]/90 p-3 flex flex-col justify-between shadow-sm border border-slate-200/60 dark:border-emerald-500/25 select-none group-hover:shadow-md transition-all duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Top Title with Line */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span className="text-[13px] font-serif font-bold text-[#14362b] dark:text-emerald-100 leading-tight block">Call</span>
            <span className="text-[13px] font-serif font-bold text-[#14362b] dark:text-emerald-100 leading-tight block">for Papers</span>
            <div className="w-7 h-[2px] bg-[#1e4839] dark:bg-emerald-400 rounded-full mt-1.5 opacity-80" />
          </div>
          
          {/* Abstract Rising Wave */}
          <div className="absolute inset-0 pointer-events-none flex items-end">
            <svg viewBox="0 0 100 80" className="w-full h-1/2" preserveAspectRatio="none" fill="none">
              <path d="M0,42 C30,18 65,58 100,32 L100,80 L0,80 Z" fill="#2c6251" className="opacity-50 dark:opacity-25" />
              <path d="M0,55 C40,35 75,65 100,48 L100,80 L0,80 Z" fill="#153c30" className="opacity-95 dark:opacity-60" />
            </svg>
          </div>

          <div className="relative z-10 self-center">
            <span className="px-2.5 py-0.5 rounded-full bg-[#13372b]/80 dark:bg-emerald-950/80 backdrop-blur-xs text-white dark:text-emerald-200 text-[7.5px] font-bold tracking-widest uppercase border border-white/10 dark:border-emerald-400/20">
              SIET
            </span>
          </div>
        </div>
      );

    case 'brochure':
      return (
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm border border-slate-200/60 dark:border-emerald-500/25 select-none group group-hover:shadow-md transition-all duration-300 bg-[#f4f7f4] dark:bg-[#0b1f16]/90 p-2.5 flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/15 dark:via-white/5 to-transparent pointer-events-none z-20" />
          
          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1">
            <span className="text-[11.5px] font-sans font-extrabold text-[#173322] dark:text-emerald-100 leading-tight block">SIET 2025</span>
            <span className="text-[9.5px] font-sans font-medium text-[#345c41] dark:text-emerald-300 leading-tight block">Conference</span>
          </div>

          {/* Arched Architectural Window */}
          <div className="relative w-full h-[85px] rounded-t-full overflow-hidden border border-white/80 dark:border-emerald-400/30 shadow-xs my-auto">
            <img
              src="/campus_building.jpg"
              alt="SIET 2025 Conference"
              className="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e2116]/50 dark:from-[#020617]/70 via-transparent to-transparent" />
          </div>

          <span className="relative z-10 self-center px-2.5 py-0.5 rounded-full bg-[#0a1810]/80 dark:bg-emerald-950/80 backdrop-blur-xs text-white dark:text-emerald-200 text-[7.5px] font-bold tracking-widest uppercase border border-white/10 dark:border-emerald-400/20 shadow-xs">
            BROCHURE
          </span>
        </div>
      );

    default:
      return (
        <div className="w-full h-full min-h-[160px] rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
          <BookOpen size={24} />
        </div>
      );
  }
}

// ============================================================================
// 3. MAIN PAGE COMPONENT
// ============================================================================

export default function AcademicResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default'); // default, az, za
  const [howToUseModalOpen, setHowToUseModalOpen] = useState(false);
  const [resourcesList, setResourcesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchDynamic() {
      try {
        const res = await fetch('/api/resources');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            const formatted = data.map(d => {
              const catLower = (d.category || '').toLowerCase();
              
              let bStyle = 'bg-[#e8f5e9] text-[#1e6e34] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#c8e6c9] dark:border-emerald-400/30';
              if (catLower.includes('guide')) {
                bStyle = 'bg-[#e0f7fa] text-[#00796b] dark:bg-cyan-950/60 dark:text-cyan-300 border border-[#b2ebf2] dark:border-cyan-400/30';
              } else if (catLower.includes('toolkit')) {
                bStyle = 'bg-[#e0f2f1] text-[#00695c] dark:bg-teal-950/60 dark:text-teal-300 border border-[#b2dfdb] dark:border-teal-400/30';
              } else if (catLower.includes('course')) {
                bStyle = 'bg-[#f1f8e9] text-[#497926] dark:bg-lime-950/60 dark:text-lime-300 border border-[#dcedc8] dark:border-lime-400/30';
              } else if (catLower.includes('submission')) {
                bStyle = 'bg-[#e0f2f1] text-[#00695c] dark:bg-teal-950/60 dark:text-teal-300 border border-[#b2dfdb] dark:border-teal-400/30';
              } else if (catLower.includes('brochure')) {
                bStyle = 'bg-[#fff8e1] text-[#b76e00] dark:bg-amber-950/60 dark:text-amber-300 border border-[#ffecb3] dark:border-amber-400/30';
              }

              const downloadTarget = d.downloadUrl || d.download_url || '';
              const hasDownload = Boolean(downloadTarget && downloadTarget !== '#' && downloadTarget.trim() !== '');

              return {
                id: d.id,
                category: d.category || 'General',
                badgeStyle: bStyle,
                type: d.type || 'PDF',
                size: d.size || 'N/A',
                title: d.title || 'Untitled Resource',
                desc: d.desc || '',
                date: d.date || '',
                downloadUrl: downloadTarget || '#',
                status: hasDownload ? 'download' : 'coming_soon',
                coverType: catLower.includes('guide') ? 'guide' :
                           catLower.includes('toolkit') ? 'toolkit' :
                           catLower.includes('course') ? 'courseware' :
                           catLower.includes('brochure') ? 'brochure' :
                           catLower.includes('submission') ? 'submission' : 'report'
              };
            });
            setResourcesList(formatted);
          }
        }
      } catch (e) {
        console.error('Failed to fetch resources:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchDynamic();
    return () => { isMounted = false; };
  }, []);

  // Filter and search logic
  const filteredResources = useMemo(() => {
    return resourcesList.filter((res) => {
      const matchCat = activeCategory === 'All' || res.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch =
        searchQuery.trim() === '' ||
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortOrder === 'az') return a.title.localeCompare(b.title);
      if (sortOrder === 'za') return b.title.localeCompare(a.title);
      return 0;
    });
  }, [resourcesList, activeCategory, searchQuery, sortOrder]);

  const scrollToCatalog = () => {
    const el = document.getElementById('resources-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-24 sm:pt-28 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">
      
      {/* Ambient soft background glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[6%] -left-36 w-[550px] h-[550px] bg-[#e1ecd6]/70 dark:bg-emerald-950/30 rounded-full blur-3xl" />
        <div className="absolute top-[18%] right-0 w-[550px] h-[550px] bg-[#dbe8d0]/60 dark:bg-[#0e2a1b]/40 rounded-full blur-3xl" />
        <div className="absolute top-[60%] -right-40 w-[650px] h-[650px] bg-[#dbe8d0]/60 dark:bg-emerald-950/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#e1ecd6]/50 dark:bg-[#082014]/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">

        {/* =================================================================== */}
        {/* 1. HERO SECTION - SEAMLESS BLEND TO BG */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center pt-2 relative">
          
          {/* Left Content Column */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6 z-10 lg:-ml-2 xl:-ml-6">
            
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-medium text-[#485b4d] dark:text-slate-400">
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors flex items-center gap-1.5">
                <Home size={14} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                <span>Home</span>
              </Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-semibold">Academic Resources</span>
            </div>

            {/* Tagline Badge */}
            <div className="text-[11px] font-bold tracking-[0.22em] text-[#4e6252] dark:text-[#a2d45e] uppercase">
              KNOWLEDGE SHAPES TOMORROW
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-serif font-normal text-[#122016] dark:text-white leading-[1.05] tracking-tight">
              Resources &amp;<br />
              <span className="italic font-normal text-[#1d3d29] dark:text-[#a2d45e]">Downloads</span>
            </h1>

            {/* Subtext Paragraph */}
            <p className="text-[#405245] dark:text-slate-300 text-sm sm:text-[14.5px] leading-[1.7] max-w-lg font-normal">
              Access digital courseware, conference proceedings, STEM learning toolkits, educator handbooks, and institutional reports published by LEnSE.
            </p>

            {/* Dual CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={scrollToCatalog}
                className="px-6 py-3 rounded-full bg-[#122b1c] hover:bg-[#1d442c] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-semibold tracking-wide flex items-center gap-2.5 transition-all shadow-md cursor-pointer hover:scale-[1.02]"
              >
                <BookOpen size={15} />
                <span>Explore Resources</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => setHowToUseModalOpen(true)}
                className="px-5 py-3 rounded-full bg-white/80 dark:bg-[#0c2217]/50 hover:bg-white dark:hover:bg-[#112d1f]/70 backdrop-blur-xl border border-[#d5e2d6] dark:border-emerald-500/25 text-[#19241c] dark:text-slate-200 text-xs font-medium flex items-center gap-2 transition-all shadow-xs cursor-pointer hover:scale-[1.02]"
              >
                <Info size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                <span>How to Use</span>
              </button>
            </div>

            {/* 4 Value Pillars Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-5 border-t border-[#d8e4d9]/70 dark:border-white/10 mt-2">
              <div className="flex items-center gap-2.5">
                <BookOpen size={20} strokeWidth={1.5} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-semibold text-[#14261a] dark:text-white">Learn</span>
                  <span className="text-[#556758] dark:text-slate-400 font-normal">today</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Users size={20} strokeWidth={1.5} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-semibold text-[#14261a] dark:text-white">Share</span>
                  <span className="text-[#556758] dark:text-slate-400 font-normal">knowledge</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Leaf size={20} strokeWidth={1.5} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-semibold text-[#14261a] dark:text-white">Create</span>
                  <span className="text-[#556758] dark:text-slate-400 font-normal">impact</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe size={20} strokeWidth={1.5} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                <div className="flex flex-col text-xs leading-tight">
                  <span className="font-semibold text-[#14261a] dark:text-white">Build a</span>
                  <span className="text-[#556758] dark:text-slate-400 font-normal whitespace-nowrap">sustainable future</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual with Organic Blended Aesthetic */}
          <div className="lg:col-span-7 xl:col-span-7 relative w-full">
            
            {/* Soft Ambient Aura behind campus visual */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent rounded-tl-[10rem] rounded-[4rem] blur-2xl -z-10 pointer-events-none opacity-80 dark:opacity-40" />

            {/* Outer Circular Curved Text Arc (Top Left of Campus Photo) */}
            <div className="absolute -top-16 -left-16 sm:-top-20 sm:-left-20 w-64 h-64 sm:w-72 sm:h-72 pointer-events-none z-10 select-none hidden md:block">
              <svg viewBox="0 0 240 240" className="w-full h-full">
                <defs>
                  <path
                    id="heroOrbitArc"
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
                <text className="text-[8.5px] font-sans font-semibold uppercase tracking-[0.22em] fill-[#4a7253] dark:fill-[#a2d45e]">
                  <textPath href="#heroOrbitArc" startOffset="50%" textAnchor="middle">
                    — LEARNING — ENGINEERING — SUSTAINABILITY •
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Campus Frame Container with Mockup's Sweeping Arch & Gradients that Blend to BG */}
            <div className="relative w-full h-[460px] sm:h-[530px] lg:h-[560px] rounded-tl-[6rem] sm:rounded-tl-[8rem] lg:rounded-tl-[9rem] rounded-tr-[3.5rem] rounded-br-[3.5rem] rounded-bl-[3.5rem] overflow-hidden shadow-2xl border border-white/60 dark:border-white/10 select-none group z-20">
              
              {/* Campus Architecture Image */}
              <img
                src="/campus_building.jpg"
                alt="LEnSE Campus Architecture - Sustainable Learning Tomorrow"
                className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-1000"
                onError={(e) => {
                  e.currentTarget.src = "/home/bg.png";
                }}
              />

              {/* Seamless Blending Gradients to Page Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f3f5ed] dark:from-[#031008] via-[#f3f5ed]/60 dark:via-[#031008]/65 via-[18%] to-transparent to-[50%] pointer-events-none z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#f3f5ed] dark:from-[#031008] via-[#f3f5ed]/40 dark:via-[#031008]/50 to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#f3f5ed]/50 dark:from-[#031008]/60 to-transparent pointer-events-none z-10" />

              {/* Overlaid Frosted Glass Quote Card */}
              <div className="absolute top-6 sm:top-8 left-6 sm:left-8 z-20 pointer-events-auto rounded-2xl sm:rounded-3xl bg-white/85 dark:bg-[#05180f]/80 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] border border-white/95 dark:border-emerald-500/30 max-w-[210px] sm:max-w-[230px]">
                <p className="font-serif italic text-lg sm:text-xl text-[#1a3824] dark:text-[#a2d45e] leading-snug tracking-tight">
                  “Open Knowledge<br />
                  for a Brighter<br />
                  Tomorrow”
                </p>
                <div className="w-8 h-[2px] bg-[#2d5a3c] dark:bg-[#a2d45e] mt-2.5 rounded-full opacity-85" />
              </div>

              {/* Building Facade Typography Overlay (Top Right) */}
              <div className="absolute top-8 sm:top-10 right-8 sm:right-10 z-20 pointer-events-none hidden sm:flex flex-col gap-0.5 text-right">
                <span className="text-xs sm:text-[13px] font-sans font-medium text-[#22382c] dark:text-emerald-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Education</span>
                <span className="text-xs sm:text-[13px] font-sans font-medium text-[#22382c] dark:text-emerald-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Innovation</span>
                <span className="text-xs sm:text-[13px] font-sans font-medium text-[#22382c] dark:text-emerald-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Sustainability</span>
                <span className="text-xs sm:text-[13px] font-sans font-medium text-[#22382c] dark:text-emerald-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">Impact</span>
                <div className="w-6 h-[2px] bg-[#22382c] dark:bg-[#a2d45e] self-end mt-1 rounded-full opacity-80" />
              </div>

              {/* Floating Glass Pill Banner at bottom right */}
              <div className="absolute bottom-6 right-6 left-6 sm:left-auto z-20 pointer-events-auto">
                <div className="px-5 py-3 rounded-full bg-white/85 dark:bg-[#05180f]/80 backdrop-blur-2xl border border-white/95 dark:border-emerald-500/30 shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4 group/pill hover:bg-white dark:hover:bg-[#0a2719] transition-all">
                  <div className="flex flex-col text-xs sm:text-[12.5px] font-serif italic text-[#14261a] dark:text-emerald-100 font-medium leading-tight">
                    <span>Empowering Educators.</span>
                    <span>Inspiring Learners.</span>
                    <span>Building a Sustainable Future.</span>
                  </div>
                  <button
                    onClick={scrollToCatalog}
                    className="w-8 h-8 rounded-full bg-[#f0f4ee] hover:bg-[#122b1c] hover:text-white text-[#14261a] dark:bg-white/10 dark:text-white flex items-center justify-center group-hover/pill:scale-105 transition-all shrink-0 cursor-pointer shadow-xs"
                    title="Explore resources"
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================================== */}
        {/* 2. SEARCH & CATEGORY FILTER CONTROLS */}
        {/* =================================================================== */}
        <div id="resources-catalog" className="scroll-mt-32 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Clean Text Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#122b1c] dark:bg-emerald-600 text-white shadow-md'
                        : 'bg-white/80 dark:bg-[#0c2217]/40 backdrop-blur-xl hover:bg-white dark:hover:bg-[#112d1f]/70 text-[#3b4e41] dark:text-slate-200 border border-[#dee8df] dark:border-emerald-500/20 shadow-xs'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Right Search Input & Sorter */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7f9484] dark:text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/80 dark:bg-[#0c2217]/40 backdrop-blur-xl border border-[#dee8df] dark:border-emerald-500/20 text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#7f9484] dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]/30 dark:focus:ring-emerald-400/40 shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Sort Toggle Button */}
              <button
                onClick={() => {
                  if (sortOrder === 'default') setSortOrder('az');
                  else if (sortOrder === 'az') setSortOrder('za');
                  else setSortOrder('default');
                }}
                className={`p-2.5 rounded-full border border-[#dee8df] dark:border-emerald-500/20 transition-colors shadow-xs cursor-pointer ${
                  sortOrder !== 'default'
                    ? 'bg-[#122b1c] dark:bg-emerald-600 text-white'
                    : 'bg-white/80 dark:bg-[#0c2217]/40 backdrop-blur-xl text-[#4d6052] dark:text-slate-300 hover:bg-slate-50'
                }`}
                title={`Sort: ${sortOrder === 'az' ? 'A to Z' : sortOrder === 'za' ? 'Z to A' : 'Default'}`}
              >
                <SlidersHorizontal size={16} />
              </button>
            </div>

          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. DOWNLOADABLE RESOURCES 3-COLUMN GRID - GLASSMORPHISM CARDS */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-[1.6rem] bg-white/75 dark:bg-[#0c2217]/35 backdrop-blur-2xl border border-white/80 dark:border-emerald-500/20 p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] animate-pulse flex flex-col justify-between"
              >
                <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
                  <div className="col-span-4 flex items-center justify-center">
                    <div className="w-full max-w-[115px] sm:max-w-[125px] aspect-[1/1.38] rounded-xl bg-slate-200/80 dark:bg-emerald-950/40" />
                  </div>
                  <div className="col-span-8 space-y-2 py-1">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-16 rounded bg-slate-200/80 dark:bg-emerald-950/50" />
                      <div className="h-3 w-12 rounded bg-slate-200/60 dark:bg-emerald-950/40" />
                    </div>
                    <div className="h-4 w-5/6 rounded bg-slate-200/80 dark:bg-emerald-950/60 mt-2" />
                    <div className="h-4 w-2/3 rounded bg-slate-200/80 dark:bg-emerald-950/60" />
                    <div className="h-3 w-full rounded bg-slate-200/50 dark:bg-emerald-950/30 mt-3" />
                    <div className="h-3 w-4/5 rounded bg-slate-200/50 dark:bg-emerald-950/30" />
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-[#f0f4ef] dark:border-white/10 flex items-center justify-between">
                  <div className="h-3 w-20 rounded bg-slate-200/70 dark:bg-emerald-950/40" />
                  <div className="h-6 w-20 rounded-full bg-slate-200/80 dark:bg-emerald-950/60" />
                </div>
              </div>
            ))
          ) : filteredResources.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white/70 dark:bg-[#0c2217]/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/90 dark:border-emerald-500/20 p-8 shadow-sm">
              <BookOpen size={36} className="mx-auto text-[#718476] dark:text-slate-500 mb-3 opacity-60" />
              <h4 className="text-lg font-serif text-[#122016] dark:text-white mb-1">No resources found</h4>
              <p className="text-xs text-[#526656] dark:text-slate-400 max-w-sm mx-auto mb-4">
                No materials matched your search &quot;{searchQuery}&quot;. Try clearing filters or searching for another keyword.
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="px-5 py-2 rounded-full bg-[#122b1c] dark:bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredResources.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl sm:rounded-[1.6rem] bg-white/75 dark:bg-[#0c2217]/35 backdrop-blur-2xl border border-white/80 dark:border-emerald-500/20 p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-white/90 dark:hover:bg-[#0f2c1e]/50 hover:shadow-[0_16px_40px_rgba(45,90,60,0.1)] dark:hover:shadow-[0_16px_40px_rgba(16,185,129,0.12)] hover:-translate-y-1 hover:border-[#2d5a3c]/40 dark:hover:border-emerald-400/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle glass reflection highlight on top edge */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-emerald-400/30 to-transparent pointer-events-none" />
                
                {/* Ambient glowing radial blob in card corner */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-500/5 dark:bg-emerald-400/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

                {/* Horizontal split inside each card */}
                <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-stretch relative z-10">
                  
                  {/* Left Column: Document Preview Cover */}
                  <div className="col-span-4 sm:col-span-4 flex items-center justify-center">
                    <div className="w-full max-w-[115px] sm:max-w-[125px] aspect-[1/1.38]">
                      <PublicationCover type={res.coverType} />
                    </div>
                  </div>

                  {/* Right Column: Information & Meta */}
                  <div className="col-span-8 sm:col-span-8 flex flex-col justify-between space-y-1.5">
                    <div>
                      {/* Category Badge & Size */}
                      <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                        <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider ${res.badgeStyle}`}>
                          {res.category}
                        </span>
                        <span className="text-[10px] font-medium text-[#718476] dark:text-slate-400">
                          {res.type} • {res.size}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[13.5px] sm:text-[14px] font-serif font-bold text-[#14261a] dark:text-white leading-[1.3] group-hover:text-[#2d5a3c] dark:group-hover:text-emerald-300 transition-colors line-clamp-3">
                        {res.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-[11px] sm:text-[11.5px] text-[#4d6052] dark:text-slate-300 leading-relaxed font-normal line-clamp-3 mt-1.5">
                        {res.desc}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Bottom Card Footer: Date & Action Button */}
                <div className="pt-3 mt-2.5 border-t border-[#f0f4ef] dark:border-white/10 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-1.5 text-[10.5px] text-[#718476] dark:text-slate-400 font-medium">
                    <Calendar size={12} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                    <span>{res.date}</span>
                  </div>

                  {res.status === 'download' ? (
                    <a
                      href={res.downloadUrl}
                      download
                      className="px-3.5 py-1.5 rounded-full bg-[#122b1c] hover:bg-[#1d442c] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      title={`Download ${res.title}`}
                    >
                      <span>Download</span>
                      <Download size={11} />
                    </a>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#edf2ed] dark:bg-white/10 text-[#768a7b] dark:text-slate-300 dark:border dark:border-white/10 text-[10.5px] font-medium flex items-center gap-1 opacity-90 select-none">
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* =================================================================== */}
        {/* 4. BOTTOM VALUE BANNER ("KNOWLEDGE SHARED TODAY") - GLASSMORPHISM */}
        {/* =================================================================== */}
        <div className="rounded-[2.2rem] sm:rounded-[2.8rem] bg-white/75 dark:bg-[#0c2217]/35 backdrop-blur-2xl border border-white/80 dark:border-emerald-500/20 p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-300">
          
          {/* Top subtle highlight reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-emerald-400/30 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Column: Heading Quote */}
            <div className="lg:col-span-6 space-y-3">
              <h2 className="text-2xl sm:text-[28px] lg:text-[30px] font-serif italic text-[#14261a] dark:text-white leading-snug">
                “Knowledge shared today<br />
                builds a more equitable and sustainable tomorrow.”
              </h2>
              <div className="w-10 h-[2.5px] bg-[#2d5a3c] dark:bg-[#a2d45e] rounded-full" />
            </div>

            {/* Right Column: 4 Feature Highlights */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <div className="flex flex-col items-center text-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-[#eaf1e4] dark:bg-emerald-950/60 dark:border dark:border-emerald-500/30 text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center shadow-xs">
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
                <div className="w-10 h-10 rounded-full bg-[#eaf1e4] dark:bg-emerald-950/60 dark:border dark:border-emerald-500/30 text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center shadow-xs">
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
                <div className="w-10 h-10 rounded-full bg-[#eaf1e4] dark:bg-emerald-950/60 dark:border dark:border-emerald-500/30 text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center shadow-xs">
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
                <div className="w-10 h-10 rounded-full bg-[#eaf1e4] dark:bg-emerald-950/60 dark:border dark:border-emerald-500/30 text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center shadow-xs">
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

      {/* =================================================================== */}
      {/* 5. "HOW TO USE" MODAL */}
      {/* =================================================================== */}
      {howToUseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white/90 dark:bg-[#071d13]/90 backdrop-blur-2xl border border-white/80 dark:border-emerald-500/30 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#e2ebd0] dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#eaf1e4] dark:bg-emerald-950/80 text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center border dark:border-emerald-500/30">
                  <Info size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#14261a] dark:text-white">
                    How to Use LEnSE Academic Resources
                  </h3>
                  <span className="text-[11px] text-[#556758] dark:text-slate-400">
                    Open Academic Repository • University of Kerala
                  </span>
                </div>
              </div>
              <button
                onClick={() => setHowToUseModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-[13px] text-[#405245] dark:text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-[#f4f7f2] dark:bg-white/5 border border-[#e2ebd0] dark:border-white/10">
                <strong className="text-[#14261a] dark:text-white block mb-1">Accessing Publications &amp; Guides:</strong>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  <li>Click <strong>&quot;Download&quot;</strong> on any published resource to receive the complete PDF/Toolkit.</li>
                  <li>Resources labeled <strong>&quot;Coming Soon&quot;</strong> are currently undergoing committee peer review.</li>
                  <li>Use the category filters and keyword search to quickly locate specific curriculum materials.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <strong className="text-[#14261a] dark:text-white block">Licensing &amp; Open Access:</strong>
                <p>
                  All materials are released under the Creative Commons Attribution 4.0 (CC-BY) license. Educators and researchers are free to share, adapt, and build upon these materials with attribution.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#eaf1e4] dark:bg-emerald-950/60 text-[#1b3726] dark:text-emerald-300 flex items-center justify-between gap-3 border dark:border-emerald-500/30">
                <span className="font-semibold text-xs">
                  Have a suggestion or contribution?
                </span>
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-full bg-[#122b1c] dark:bg-emerald-600 text-white text-[11px] font-semibold flex items-center gap-1.5 shrink-0"
                >
                  <span>Contact Committee</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setHowToUseModalOpen(false)}
                className="px-5 py-2 rounded-full bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-semibold cursor-pointer hover:opacity-90"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
