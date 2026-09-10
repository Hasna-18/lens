'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Calendar, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  GraduationCap, 
  Trophy, 
  Handshake, 
  FlaskConical, 
  Users, 
  Radio, 
  Bell, 
  FileText,
  Mail,
  ExternalLink,
  BookOpen,
  Globe,
  Sparkles
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Achievements',
  'Partnerships',
  'Research',
  'Initiatives',
  'Community',
  'Media',
  'Announcements'
];

const MEDIA_MENTIONS = [
  {
    id: 1,
    source: 'The Hindu',
    badge: 'THE HINDU',
    badgeBg: 'bg-slate-900 text-white font-serif',
    title: "LEnSE's STEM Camp Featured in The Hindu",
    date: '15 May 2025'
  },
  {
    id: 2,
    source: 'Mathrubhumi News',
    badge: 'm',
    badgeSub: 'MATHRUBHUMI',
    badgeBg: 'bg-[#0f4c81] text-white font-bold',
    title: 'Innovative Teacher Training Initiative by LEnSE',
    subtitle: 'Mathrubhumi News',
    date: '28 Apr 2025'
  },
  {
    id: 3,
    source: 'News Bytes',
    badge: 'NEWS BYTES',
    badgeBg: 'bg-slate-100 text-slate-800 font-bold border border-slate-300',
    title: 'LEnSE Clarkson Collaboration in News Bytes',
    date: '21 Apr 2025'
  }
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchNews() {
      try {
        setLoading(true);
        const res = await fetch('/api/news');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && isMounted) {
            setNewsList(data);
          }
        }
      } catch (err) {
        console.error("Error fetching news from database:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchNews();
    return () => { isMounted = false; };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const filteredNews = useMemo(() => {
    return newsList.filter(item => {
      const matchesCategory = selectedCategory === 'All' || 
        (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase() === selectedCategory.toLowerCase());
      const matchesSearch = !searchQuery || 
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [newsList, selectedCategory, searchQuery]);

  const featuredNews = filteredNews[0] || newsList[0];

  const glanceStats = useMemo(() => [
    { label: 'Total News', count: String(newsList.length), icon: FileText },
    { label: 'Achievements', count: String(newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('achievement')).length), icon: Trophy },
    { label: 'Partnerships', count: String(newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('partner')).length), icon: Handshake },
    { label: 'Research Updates', count: String(newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('research')).length), icon: FlaskConical },
    { label: 'Initiatives', count: String(newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('initiat')).length), icon: Globe },
    { label: 'Community Stories', count: String(newsList.filter(n => (n.category || n.tag || '').toLowerCase().includes('communit')).length), icon: Users },
  ], [newsList]);

  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* 0. HERO NATURAL ENVIRONMENT BLEND */}
      {/* ============================================================ */}
      <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
        <img 
          src="/events/events_book_plant.jpg" 
          alt="LEnSE News & Insights" 
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ============================================================ */}
        {/* A. DESKTOP VIEW HERO (LARGE SCREENS) */}
        {/* ============================================================ */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 gap-8 lg:gap-4 items-center min-h-[460px] sm:min-h-[520px]">

            {/* Left Content */}
            <div className="col-span-12 lg:col-span-8 space-y-6 lg:pr-4 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#0c1f15]/80 backdrop-blur-md border border-[#e8efe9] dark:border-[#1e422c] shadow-sm hover:border-[#1a5e35]/40 transition-colors duration-300">
                <span className="text-[11px] font-bold tracking-[0.22em] text-[#455748] dark:text-[#a2d45e] uppercase">
                  UPDATES &amp; STORIES
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-[4.3rem] font-normal text-[#131f17] dark:text-white leading-[1.05] tracking-tight font-serif">
                News &amp; Insights.<br />
                <span className="italic text-[#243a29] dark:text-[#a2d45e] font-serif font-normal">Stories that inspire.</span>
              </h1>

              <p className="text-[#405245] dark:text-slate-300 text-[13.5px] leading-[1.72] max-w-lg font-normal">
                Stay informed with the latest research breakthroughs, state-wide STEM training milestones, global academic partnerships, and community initiatives from the Centre for Learning Engineering and Sustainability Education.
              </p>
            </div>

          </div>
        </div>

        {/* ============================================================ */}
        {/* B. MOBILE VIEW HERO (SCREENS < LG) */}
        {/* ============================================================ */}
        <div className="block lg:hidden pb-4">
          <div className="pt-3 pb-2 relative">
            <div className="w-full space-y-3 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e8efe9] dark:border-[#1e422c] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:scale-105 transition-transform duration-300">
                <span className="text-[9.5px] font-bold tracking-wider text-[#1b432a] dark:text-[#a2d45e] uppercase">
                  NEWS &bull; INSIGHTS
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-normal text-[#112318] dark:text-white leading-[1.1] tracking-tight font-serif">
                News &amp; Insights.<br />
                <span className="italic text-[#1a5e35] dark:text-[#a2d45e] font-serif font-normal">Stories that inspire.</span>
              </h1>

              <p className="text-[#556758] dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-lg">
                Stay updated with achievements, initiatives, partnerships and community stories from LEnSE.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. SEARCH & CATEGORY FILTER DOCK */}
        {/* ============================================================ */}
        <div className="relative z-20 mt-6 sm:mt-8 flex flex-col lg:flex-row items-center gap-3.5 pb-8">
          
          {/* Search Input Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#647969] dark:text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/90 dark:bg-[#0b1c14] backdrop-blur-md border border-[#d5e2d6] dark:border-[#183a27] text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#7f9484] dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]/30 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            />
          </div>

          {/* Category Filter Pills (Scrollable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full no-scrollbar py-1">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-[0_4px_12px_rgba(27,55,38,0.25)] scale-[1.02]'
                      : 'bg-white/70 dark:bg-[#0b1c14]/70 hover:bg-white dark:hover:bg-[#11261a] text-[#384c3e] dark:text-slate-300 border border-[#dbe6dc] dark:border-[#183a27]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. MAIN TWO-COLUMN CONTENT GRID */}
        {/* ============================================================ */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Column (8 cols): Featured Card + Latest News List + Pagination */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* FEATURED STORY BANNER (100% Dynamic from Database) */}
            {featuredNews && (
              <div className="relative rounded-[2.2rem] bg-gradient-to-br from-[#1c3827] via-[#152e1f] to-[#0d1f14] dark:from-[#0b1c14] dark:via-[#07160f] dark:to-[#040e09] border border-white/10 dark:border-[#1e422c] p-6 sm:p-8 lg:p-10 shadow-[0_15px_40px_rgba(20,45,28,0.2)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden group">
                
                {/* Background Image with Radial Mask */}
                <div 
                  className="absolute inset-0 bg-cover bg-right opacity-35 pointer-events-none mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-1000"
                  style={{ 
                    backgroundImage: `radial-gradient(circle at center, rgba(162,212,94,0.15) 0%, transparent 70%), url('${featuredNews.imageUrl || "/events/events_book_plant.jpg"}')`
                  }}
                />
                
                {/* Soft Gradient Mask */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1b3726] dark:from-[#0b1c14] via-[#1b3726]/85 dark:via-[#0b1c14]/85 to-transparent pointer-events-none" />

                <div className="relative z-10 max-w-xl space-y-4">
                  <span className="inline-flex px-3 py-1 rounded-md bg-[#a2d45e]/20 text-[#c2ec8b] border border-[#a2d45e]/30 text-[10px] font-bold uppercase tracking-widest">
                    {featuredNews.tag || featuredNews.category || 'FEATURED STORY'}
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-serif font-normal leading-snug tracking-tight text-white">
                    {featuredNews.title}
                  </h2>

                  <p className="text-[13px] text-[#b8d1be] leading-relaxed font-normal">
                    {featuredNews.desc}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#c5ddcc]">
                    <Link href={`/news/${featuredNews.slug || featuredNews.id}`}>
                      <button className="px-6 py-3 rounded-full bg-white dark:bg-[#154628] text-[#122016] dark:text-white hover:bg-slate-100 dark:hover:bg-[#1c5c34] text-[11px] font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md group/btn cursor-pointer">
                        <span>Read Full Story</span>
                        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </Link>

                    <span className="flex items-center gap-1.5 font-medium text-white/80">
                      <Calendar size={14} className="text-[#a2d45e]" />
                      {featuredNews.date}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* LATEST NEWS HEADER */}
            <div className="pt-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                <h3 className="text-xl sm:text-2xl font-serif text-[#122016] dark:text-white">
                  Latest News
                </h3>
              </div>

              {/* NEWS CARDS LIST */}
              {loading ? (
                <div className="text-center py-16 bg-white/60 dark:bg-[#0b1c14]/60 backdrop-blur-xl rounded-[2rem] border border-white/90 dark:border-[#183a27] p-8 shadow-sm">
                  <div className="inline-block animate-spin w-8 h-8 border-4 border-[#2d5a3c]/30 dark:border-[#a2d45e]/30 border-t-[#2d5a3c] dark:border-t-[#a2d45e] rounded-full mb-3"></div>
                  <h4 className="text-base font-serif text-[#122016] dark:text-white mb-1">Loading News...</h4>
                </div>
              ) : filteredNews.length === 0 ? (
                <div className="text-center py-16 bg-white/60 dark:bg-[#0b1c14]/60 backdrop-blur-xl rounded-[2rem] border border-white/90 dark:border-[#183a27] p-8 shadow-sm">
                  <div className="w-14 h-14 bg-[#eaf1e4] dark:bg-[#11261a] rounded-full flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] mx-auto mb-3 shadow-inner">
                    <FileText size={24} />
                  </div>
                  <h4 className="text-base font-serif text-[#122016] dark:text-white mb-1">No news found</h4>
                  <p className="text-xs text-[#526656] dark:text-slate-400 max-w-xs mx-auto mb-4">
                    Try adjusting your search query or selecting a different category filter.
                  </p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                    className="px-5 py-2 rounded-full bg-[#1b3726] dark:bg-[#154628] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#244833] dark:hover:bg-[#1c5c34] transition-colors cursor-pointer"
                  >
                    Show All News
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNews.map((item) => (
                    <Link key={item.id} href={`/news/${item.slug || item.id}`} className="block">
                      <div className="group rounded-[1.8rem] bg-white/80 dark:bg-[#0b1c14]/80 hover:bg-white dark:hover:bg-[#10271c] backdrop-blur-xl border border-white/95 dark:border-[#183a27] p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_rgba(0,25,12,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                        {/* Image Thumbnail */}
                        <div className="w-full sm:w-[175px] h-[130px] rounded-[1.3rem] overflow-hidden shrink-0 bg-slate-100 dark:bg-[#05110a] shadow-sm relative">
                          <img 
                            src={item.imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            onError={(e) => {
                              e.currentTarget.src = "/events/events_book_plant.jpg";
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full space-y-1.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] text-[9.5px] font-bold uppercase tracking-widest">
                            {item.tag}
                          </span>

                          <h4 className="text-[15px] sm:text-[16px] font-serif font-semibold text-[#122016] dark:text-white leading-snug group-hover:text-[#2d5a3c] dark:group-hover:text-[#a2d45e] transition-colors">
                            {item.title}
                          </h4>

                          <p className="text-[12px] text-[#485b4d] dark:text-slate-300 leading-relaxed line-clamp-2 font-normal">
                            {item.desc}
                          </p>

                          {/* Meta & Read More */}
                          <div className="flex items-center justify-between text-[11px] text-[#637667] dark:text-slate-400 pt-2 border-t border-[#f0f4ef]/80 dark:border-[#183a27]">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Calendar size={13} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                              {item.date}
                            </span>

                            <span className="flex items-center gap-1 font-bold text-[#1b3726] dark:text-[#a2d45e] group-hover:text-[#2d5a3c] transition-colors">
                              <span>Read More</span>
                              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* PAGINATION */}
            <div className="pt-6 flex items-center justify-center gap-2 select-none">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1c14] border border-[#d5e2d6] dark:border-[#183a27] text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#eaf1e4] dark:hover:bg-[#11261a] transition-colors shadow-sm disabled:opacity-40 cursor-pointer"
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {[1, 2, 3, 4, 5].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-sm scale-105'
                      : 'bg-white dark:bg-[#0b1c14] hover:bg-[#eaf1e4] dark:hover:bg-[#11261a] text-[#384c3e] dark:text-slate-300 border border-[#d5e2d6] dark:border-[#183a27]'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <span className="text-xs text-[#7f9484] dark:text-slate-500 px-1 font-bold">...</span>

              <button
                onClick={() => setCurrentPage(10)}
                className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  currentPage === 10
                    ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-sm'
                    : 'bg-white dark:bg-[#0b1c14] hover:bg-[#eaf1e4] dark:hover:bg-[#11261a] text-[#384c3e] dark:text-slate-300 border border-[#d5e2d6] dark:border-[#183a27]'
                }`}
              >
                10
              </button>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, 10))}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#0b1c14] border border-[#d5e2d6] dark:border-[#183a27] text-[#2d5a3c] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#eaf1e4] dark:hover:bg-[#11261a] transition-colors shadow-sm cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

          {/* Right Sidebar Column (4 cols): News at a Glance + Media Mentions + Stay Updated */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CARD 1: NEWS AT A GLANCE */}
            <div className="rounded-[2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#f0f4ef] dark:border-[#183a27]">
                <div className="w-8 h-8 rounded-xl bg-[#eaf1e4] dark:bg-[#11261a] flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e]">
                  <GraduationCap size={18} />
                </div>
                <h3 className="text-lg font-serif text-[#122016] dark:text-white">
                  News at a Glance
                </h3>
              </div>

              <div className="space-y-3">
                {glanceStats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedCategory(stat.label.includes('News') ? 'All' : stat.label.split(' ')[0])}
                    className="flex items-center justify-between text-xs py-1.5 px-2 rounded-xl hover:bg-[#f3f6f0] dark:hover:bg-[#11261a] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 text-[#3b4e41] dark:text-slate-300 group-hover:text-[#1b3726] dark:group-hover:text-[#a2d45e] font-medium">
                      <stat.icon size={15} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                      <span>{stat.label}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] font-bold text-[11px]">
                      {stat.count}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#f0f4ef] dark:border-[#183a27]">
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className="w-full text-[11.5px] font-bold text-[#1b3726] dark:text-[#a2d45e] hover:text-[#2d5a3c] flex items-center justify-center gap-1.5 transition-colors py-1 cursor-pointer group"
                >
                  <span>View All News</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* CARD 2: MEDIA MENTIONS */}
            <div className="rounded-[2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-[#f0f4ef] dark:border-[#183a27]">
                <h3 className="text-lg font-serif text-[#122016] dark:text-white">
                  Media Mentions
                </h3>
              </div>

              <div className="space-y-4">
                {MEDIA_MENTIONS.map((media) => (
                  <div key={media.id} className="flex items-start gap-3.5 group cursor-pointer">
                    {/* Media Publication Badge */}
                    <div className="w-12 h-12 rounded-xl bg-[#f4f7f2] dark:bg-[#11261a] border border-[#e2ece4] dark:border-[#1e422c] flex flex-col items-center justify-center text-center shrink-0 p-1 group-hover:scale-105 transition-transform shadow-xs">
                      {media.id === 1 && (
                        <span className="text-[7.5px] font-serif font-black tracking-tight leading-tight text-slate-800 dark:text-slate-100 uppercase">
                          THE<br />HINDU
                        </span>
                      )}
                      {media.id === 2 && (
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-black text-[#0f4c81] dark:text-[#38bdf8] leading-none">m</span>
                          <span className="text-[5.5px] font-bold text-slate-600 dark:text-slate-400 tracking-tighter">MATHRUBHUMI</span>
                        </div>
                      )}
                      {media.id === 3 && (
                        <span className="text-[7px] font-bold text-slate-800 dark:text-slate-100 leading-tight text-center">
                          NEWS<br />BYTES
                        </span>
                      )}
                    </div>

                    {/* Mentions Content */}
                    <div className="space-y-0.5 flex-1">
                      <h4 className="text-[13px] font-bold text-[#19241c] dark:text-white leading-snug group-hover:text-[#2d5a3c] dark:group-hover:text-[#a2d45e] transition-colors">
                        {media.title}
                      </h4>
                      {media.subtitle && (
                        <p className="text-[10.5px] text-[#556758] dark:text-slate-400">{media.subtitle}</p>
                      )}
                      <p className="text-[10.5px] text-[#788e7f] dark:text-slate-400 font-medium">{media.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#f0f4ef] dark:border-[#183a27]">
                <button 
                  onClick={() => setSelectedCategory('Media')}
                  className="w-full text-[11.5px] font-bold text-[#1b3726] dark:text-[#a2d45e] hover:text-[#2d5a3c] flex items-center justify-center gap-1.5 transition-colors py-1 cursor-pointer group"
                >
                  <span>View All Media</span>
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* CARD 3: STAY UPDATED NEWSLETTER */}
            <div className="rounded-[2rem] bg-gradient-to-b from-[#eef3eb] to-[#e4eee0] dark:from-[#0b1c14] dark:to-[#08180f] border border-[#dbe6d7] dark:border-[#183a27] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-4 relative overflow-hidden transition-all duration-300">
              
              <div className="space-y-1 relative z-10">
                <h3 className="text-xl font-serif text-[#122016] dark:text-white">
                  Stay Updated
                </h3>
                <p className="text-[11.5px] text-[#4d6052] dark:text-slate-300 leading-relaxed">
                  Subscribe to our newsletter and never miss an update.
                </p>
              </div>

              <div className="relative z-10 pt-1">
                {subscribed ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-white dark:bg-[#11261a] px-4 py-2.5 rounded-full shadow-sm">
                    <CheckCircle2 size={15} />
                    <span>Subscribed! Thank you.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2.5">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Your email address" 
                      className="w-full px-4 py-2.5 rounded-full bg-white dark:bg-[#05110a] border border-[#cddcd0] dark:border-[#1f422e] text-xs font-medium text-slate-800 dark:text-white placeholder:text-[#8aa091] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]/30 shadow-xs"
                    />
                    <button 
                      type="submit" 
                      className="w-full py-2.5 rounded-full bg-[#1b3726] dark:bg-[#154628] hover:bg-[#244b34] dark:hover:bg-[#1c5c34] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(27,55,38,0.2)] cursor-pointer"
                    >
                      <span>Subscribe</span>
                      <ArrowRight size={13} />
                    </button>
                  </form>
                )}
              </div>

              {/* Botanical Envelope Illustration at bottom right */}
              <div className="absolute right-0 bottom-0 pointer-events-none opacity-50 dark:opacity-20 scale-95 translate-x-2 translate-y-2">
                <svg width="120" height="90" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 25L50 50L90 25V70C90 75.5228 85.5228 80 80 80H20C14.4772 80 10 75.5228 10 70V25Z" fill="#cfe1d1" className="dark:fill-[#1e422c]" />
                  <path d="M90 25L50 50L10 25L45.5279 2.76393C48.2936 1.38107 51.7064 1.38107 54.4721 2.76393L90 25Z" fill="#bcd4bf" className="dark:fill-[#153420]" />
                  <path d="M70 70C70 50 85 40 85 40C85 40 70 30 70 10C70 30 55 40 55 40C55 40 70 50 70 70Z" fill="#a4c7a8" className="dark:fill-[#2a5d3c]" />
                </svg>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
