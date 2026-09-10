'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  Leaf, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  ArrowRight, 
  MapPin, 
  Users, 
  Building2, 
  FlaskConical, 
  Quote, 
  Info, 
  GraduationCap, 
  Sparkles, 
  Lightbulb, 
  HeartHandshake, 
  Layers, 
  CheckCircle2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail,
  ChevronRight,
  Loader2,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function NewsDetailPage({ params }) {
  const resolvedParams = params && typeof params.then === 'function' ? use(params) : params;
  const newsSlug = String(resolvedParams?.slug || resolvedParams?.id || '1');

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchArticleAndRelated() {
      try {
        setLoading(true);
        // Fetch article by slug or ID from Neon DB
        const res = await fetch(`/api/news/${encodeURIComponent(newsSlug)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && isMounted) {
            setNews(data);
            setError(null);
          }
        } else {
          if (isMounted) setError('News article not found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        if (isMounted) setError('Error connecting to database');
      } finally {
        if (isMounted) setLoading(false);
      }

      // Fetch related news list from Neon DB
      try {
        const allRes = await fetch('/api/news');
        if (allRes.ok) {
          const allData = await allRes.json();
          if (Array.isArray(allData) && isMounted) {
            const filtered = allData
              .filter(item => String(item.id) !== newsSlug && item.slug !== newsSlug)
              .slice(0, 3);
            setRelatedNews(filtered);
          }
        }
      } catch (err) {
        console.warn('Could not fetch related news from database', err);
      }
    }

    fetchArticleAndRelated();
    return () => { isMounted = false; };
  }, [newsSlug]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const renderIcon = (name, size = 18, className = '') => {
    const map = {
      Users,
      MapPin,
      Building2,
      FlaskConical,
      Leaf,
      Lightbulb,
      Layers,
      Sparkles,
      GraduationCap,
      HeartHandshake
    };
    const IconComponent = map[name] || Sparkles;
    return <IconComponent size={size} className={className} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] flex items-center justify-center font-sans">
        <div className="text-center space-y-3 bg-white dark:bg-[#0b1c14] p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-[#183a27]">
          <Loader2 className="animate-spin text-[#2d5a3c] dark:text-[#a2d45e] mx-auto" size={32} />
          <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold tracking-wide">Loading News Story...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4 max-w-md bg-white dark:bg-[#0b1c14] p-8 rounded-3xl border border-slate-200 dark:border-[#183a27] shadow-sm">
          <FileText className="text-slate-400 mx-auto" size={40} />
          <h2 className="text-xl font-serif font-bold text-slate-800 dark:text-white">Article Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">The requested news article was not found in the database.</p>
          <Link href="/news" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1b3726] text-white text-xs font-bold">
            <ArrowRight size={14} className="rotate-180" />
            <span>Return to News</span>
          </Link>
        </div>
      </div>
    );
  }

  const details = news.details || {};
  const stats = Array.isArray(details.stats) ? details.stats : [];
  const quote = details.quote || null;
  const gallery = Array.isArray(details.gallery) ? details.gallery : [];
  const keyTakeaways = Array.isArray(details.keyTakeaways) ? details.keyTakeaways : [];

  return (
    <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">
      
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full animate-pulse duration-1000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dbe9dd]/50 via-[#e4efe3]/30 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eef4ea]/50 to-transparent blur-3xl rounded-full" />
      </div>

      {/* ============================================================ */}
      {/* 1. HERO SECTION WITH BLENDED IMAGE */}
      {/* ============================================================ */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Natural Environment Blend Container */}
        <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
          <img 
            src={news.imageUrl || "/events/events_book_plant.jpg"} 
            alt={news.title || "News Story"} 
            className="w-full h-full object-cover object-center lg:object-right-top scale-[1.04] transform-gpu transition-transform duration-1000 ease-out" 
            onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
          />
          {/* Soft Organic Fade Masks into the Canvas */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/85 dark:via-[#031008]/85 via-[20%] to-transparent to-[45%] w-full h-full hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/88 dark:via-[#031008]/90 via-[35%] to-transparent w-full h-full block lg:hidden" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/60 dark:via-[#031008]/60 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center min-h-[480px] sm:min-h-[560px] pb-6 lg:pb-0">
          
          <div className="lg:col-span-8 space-y-6 z-10">
            
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400">
              <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <Link href="/news" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">News</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold line-clamp-1 max-w-[240px] sm:max-w-md">
                {news.title}
              </span>
            </div>

            {/* Category Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#0c1f15]/80 backdrop-blur-md border border-[#e8efe9] dark:border-[#1e422c] shadow-sm hover:border-[#1a5e35]/40 transition-colors duration-300">
              <span className="text-[11px] font-bold tracking-[0.22em] text-[#4e6252] dark:text-[#a2d45e] uppercase">
                {news.tag || news.category || 'LEnSE NEWS'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[4.2rem] font-serif font-normal text-[#122016] dark:text-white leading-[1.08] tracking-tight">
              {news.title}
            </h1>

            {news.desc && (
              <p className="text-[#405245] dark:text-slate-300 text-sm sm:text-[14.5px] leading-[1.72] max-w-2xl font-normal">
                {news.desc}
              </p>
            )}

            {/* Clean Inline Meta Info Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-[#526656] dark:text-slate-300 font-medium border-t border-[#d8e4d9]/70 dark:border-[#183a27] max-w-2xl">
              {news.date && (
                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                  <span className="font-bold text-[#19241c] dark:text-white">{news.date}</span>
                </div>
              )}
              {news.author && (
                <>
                  <span className="text-[#c2d3c5] dark:text-slate-600">•</span>
                  <div className="flex items-center gap-2">
                    <User size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                    <span>{news.author}</span>
                  </div>
                </>
              )}
              {news.readTime && (
                <>
                  <span className="text-[#c2d3c5] dark:text-slate-600">•</span>
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                    <span>{news.readTime}</span>
                  </div>
                </>
              )}
              <span className="text-[#c2d3c5] dark:text-slate-600">•</span>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 text-[#1b3726] dark:text-[#a2d45e] hover:text-[#2d5a3c] font-bold transition-colors cursor-pointer group"
              >
                <Share2 size={14} className="group-hover:scale-110 transition-transform" />
                <span>{copied ? 'Link Copied!' : 'Share Story'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Hero Bottom Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d2e0d3] dark:via-[#183a27] to-transparent opacity-80" />
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN TWO-COLUMN CONTENT GRID */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column (8 cols): Overview, About, Highlights, Voices, Gallery */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview / Story Section */}
            <section className="space-y-4">
              <h2 className="text-2xl sm:text-[26px] font-serif text-[#122016] dark:text-white">
                Overview
              </h2>
              <div className="space-y-3.5 text-[#3f5244] dark:text-slate-300 text-[13.5px] sm:text-sm leading-[1.8] whitespace-pre-line">
                <p>
                  {details.overview || details.content || news.desc || 'No detailed story text provided.'}
                </p>
              </div>
            </section>

            {/* About the Initiative / Story Context (if in DB) */}
            {details.about && (
              <section className="space-y-5">
                <h2 className="text-2xl sm:text-[26px] font-serif text-[#122016] dark:text-white">
                  About the Initiative
                </h2>
                <p className="text-[#3f5244] dark:text-slate-300 text-[13.5px] sm:text-sm leading-[1.8] whitespace-pre-line">
                  {details.about}
                </p>

                {/* Key Impact Highlights Card (if in DB) */}
                {stats.length > 0 && (
                  <div className="rounded-[2rem] bg-white dark:bg-[#0b1c14] border border-[#e4ede5] dark:border-[#183a27] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                    <h4 className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] uppercase tracking-wider mb-6">
                      Key Impact Highlights
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-y-0 sm:divide-y-0 sm:divide-x divide-[#eaf0eb] dark:divide-[#183a27]">
                      {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center px-2">
                          <div className="w-11 h-11 rounded-2xl bg-[#f4f8f3] dark:bg-[#11261a] border border-[#e2ede4] dark:border-[#1e422c] flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] mb-3 shadow-xs">
                            {renderIcon(stat.icon, 20)}
                          </div>
                          <span className="text-2xl sm:text-3xl font-serif font-bold text-[#122016] dark:text-white leading-none mb-1">
                            {stat.count}
                          </span>
                          <span className="text-[11px] text-[#556958] dark:text-slate-400 font-medium leading-tight">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Voices & Acknowledgements Section (if in DB) */}
            {quote && quote.text && (
              <section className="space-y-4">
                <h2 className="text-2xl sm:text-[26px] font-serif text-[#122016] dark:text-white">
                  Voices &amp; Acknowledgements
                </h2>

                <div className="rounded-[2rem] bg-gradient-to-r from-white via-white to-[#f4f7f2] dark:from-[#0b1c14] dark:via-[#08180f] dark:to-[#05110a] border border-[#e4ede5] dark:border-[#183a27] p-6 sm:p-7 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative overflow-hidden">
                  <div className="space-y-4 flex-1">
                    <div className="text-[#2d5a3c] dark:text-[#a2d45e] opacity-40">
                      <Quote size={32} className="rotate-180" />
                    </div>
                    <blockquote className="text-[14px] sm:text-[15px] font-serif italic text-[#192b1f] dark:text-slate-100 leading-relaxed">
                      "{quote.text}"
                    </blockquote>
                    <div>
                      {quote.author && <p className="text-xs font-bold text-[#122016] dark:text-white">— {quote.author}</p>}
                      {quote.role && <p className="text-[11px] text-[#637767] dark:text-slate-400">{quote.role}</p>}
                    </div>
                  </div>

                  {quote.image && (
                    <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-[#05110a] shadow-inner">
                      <img 
                        src={quote.image} 
                        alt={quote.author || "Quote"} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Gallery Section (if in DB) */}
            {gallery.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl sm:text-[26px] font-serif text-[#122016] dark:text-white">
                  Gallery
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  {gallery.map((item, idx) => (
                    <div key={idx} className="h-28 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#05110a] border border-[#e2ece4] dark:border-[#183a27] shadow-xs group cursor-pointer">
                      <img 
                        src={item.img || item} 
                        alt={item.alt || 'Gallery'} 
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Sidebar (4 cols): News Details, Key Takeaways, Related News */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CARD 1: NEWS DETAILS */}
            <div className="rounded-[2rem] bg-white dark:bg-[#0b1c14] border border-[#e4ede5] dark:border-[#183a27] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-5">
              <h3 className="text-lg font-serif text-[#122016] dark:text-white pb-2 border-b border-[#f0f4ef] dark:border-[#183a27]">
                News Details
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'Category', value: news.category || news.tag || 'News', icon: GraduationCap },
                  { label: 'Date', value: news.date || 'Recent', icon: Calendar },
                  { label: 'Author', value: news.author || 'LEnSE Admin', icon: User },
                  { label: 'Read Time', value: news.readTime || '3 min read', icon: Clock }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#f4f8f3] dark:bg-[#11261a] flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] shrink-0 mt-0.5">
                      <item.icon size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#6b7e70] dark:text-slate-400 font-medium">{item.label}</span>
                      <span className="block text-[13px] font-bold text-[#14261a] dark:text-white leading-snug">{item.value}</span>
                    </div>
                  </div>
                ))}

                {/* Social Share Row */}
                <div className="pt-2 border-t border-[#f0f4ef] dark:border-[#183a27] flex items-center justify-between">
                  <span className="text-[11.5px] font-bold text-[#14261a] dark:text-white">Share</span>
                  <div className="flex items-center gap-2">
                    {[
                      { icon: Facebook, href: '#' },
                      { icon: Twitter, href: '#' },
                      { icon: Linkedin, href: '#' },
                      { icon: Mail, href: '#' }
                    ].map((s, i) => (
                      <a 
                        key={i} 
                        href={s.href} 
                        className="w-8 h-8 rounded-full bg-[#1b3726] dark:bg-[#11261a] hover:bg-[#254d35] dark:hover:bg-[#1e422c] text-white dark:text-[#a2d45e] flex items-center justify-center transition-colors shadow-xs"
                      >
                        <s.icon size={13} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: KEY TAKEAWAYS (if in DB) */}
            {keyTakeaways.length > 0 && (
              <div className="rounded-[2rem] bg-white dark:bg-[#0b1c14] border border-[#e4ede5] dark:border-[#183a27] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-4">
                <h3 className="text-lg font-serif text-[#122016] dark:text-white pb-2 border-b border-[#f0f4ef] dark:border-[#183a27]">
                  Key Takeaways
                </h3>

                <div className="space-y-3.5">
                  {keyTakeaways.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="w-7 h-7 rounded-lg bg-[#f0f6ee] dark:bg-[#11261a] flex items-center justify-center text-[#2d5a3c] dark:text-[#a2d45e] shrink-0 mt-0.5 group-hover:bg-[#e4efe2] dark:group-hover:bg-[#1e422c] transition-colors">
                        <Leaf size={14} />
                      </div>
                      <p className="text-[12px] text-[#3d5042] dark:text-slate-300 leading-snug font-medium pt-0.5">
                        {typeof text === 'string' ? text : text.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CARD 3: RELATED NEWS (DYNAMICALLY FETCHED FROM NEON DB) */}
            {relatedNews.length > 0 && (
              <div className="rounded-[2rem] bg-white dark:bg-[#0b1c14] border border-[#e4ede5] dark:border-[#183a27] p-6 sm:p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] space-y-4">
                <h3 className="text-lg font-serif text-[#122016] dark:text-white pb-2 border-b border-[#f0f4ef] dark:border-[#183a27]">
                  Related News
                </h3>

                <div className="space-y-3.5">
                  {relatedNews.map((article, idx) => (
                    <Link 
                      key={idx} 
                      href={`/news/${article.slug || article.id}`} 
                      className="flex items-center gap-3 group/art hover:bg-[#f6f9f4] dark:hover:bg-[#11261a] p-1.5 rounded-xl transition-colors"
                    >
                      <div className="w-14 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#05110a] shrink-0">
                        <img 
                          src={article.imageUrl || '/events/workshop.jpg'} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover/art:scale-108 transition-transform" 
                          onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
                        />
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <h4 className="text-[12px] font-bold text-[#14261a] dark:text-white leading-tight group-hover/art:text-[#2d5a3c] dark:group-hover/art:text-[#a2d45e] transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <span className="text-[10px] text-[#718476] dark:text-slate-400 font-medium block">
                          {article.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#f0f4ef] dark:border-[#183a27]">
                  <Link 
                    href="/news" 
                    className="w-full text-[11.5px] font-bold text-[#1b3726] dark:text-[#a2d45e] hover:text-[#2d5a3c] flex items-center justify-center gap-1.5 transition-colors py-1 group"
                  >
                    <span>View All News</span>
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. BOTTOM STAY UPDATED NEWSLETTER */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="rounded-[2rem] bg-[#eaf0e6] dark:bg-[#0b1c14] border border-[#dce8d8] dark:border-[#183a27] flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 md:p-10 gap-8 relative overflow-hidden shadow-xs transition-all duration-300">
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#2d5a3c] dark:bg-[#11261a] border border-white/20 dark:border-[#1e422c] text-white dark:text-[#a2d45e] flex items-center justify-center shrink-0 shadow-sm">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#122016] dark:text-white">
                Stay Updated
              </h3>
              <p className="text-xs text-[#526656] dark:text-slate-300">
                Subscribe to our newsletter and get the latest news, updates and stories from LEnSE.
              </p>
            </div>
          </div>

          <div className="w-full sm:w-auto relative z-10 shrink-0">
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-white dark:bg-[#11261a] px-5 py-3 rounded-full shadow-sm">
                <CheckCircle2 size={16} />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="bg-white dark:bg-[#05110a] rounded-full p-1.5 pl-5 pr-1.5 flex items-center shadow-sm w-full sm:w-[340px] border border-[#d2dfd2] dark:border-[#183a27]">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email address" 
                  className="text-xs text-slate-800 dark:text-white placeholder:text-[#8a9d90] dark:placeholder-slate-500 bg-transparent outline-none flex-1 font-medium min-w-0"
                />
                <button 
                  type="submit" 
                  className="px-5 py-2.5 rounded-full bg-[#1b3726] dark:bg-[#a2d45e] hover:bg-[#254d35] dark:hover:bg-[#b8e874] text-white dark:text-[#031008] text-[11px] font-bold flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  <span>Subscribe</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            )}
          </div>

          {/* Right botanical illustration */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-40 dark:opacity-20 translate-x-3 translate-y-3">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M80 100C80 70 100 50 100 50C100 50 80 30 80 0C80 30 60 50 60 50C60 50 80 70 80 100Z" fill="#a3bca7" />
              <path d="M30 100C30 85 40 75 40 75C40 75 30 65 30 50C30 65 20 75 20 75C20 75 30 85 30 100Z" fill="#88a88f" />
            </svg>
          </div>

        </div>
      </div>

    </div>
  );
}