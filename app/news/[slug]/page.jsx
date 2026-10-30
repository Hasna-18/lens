'use client';
import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import {
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
  Loader2,
  AlertCircle,
  FileText,
  Tag,
  Bookmark,
  ExternalLink,
  BookOpen
} from 'lucide-react';

/* ---------- Shared Design Tokens matching Home Page ---------- */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const BLUE = 'text-[#009ab1] dark:text-sky-400';

const Em = ({ children, light = false }) => (
  <em style={SERIF} className={`italic font-normal ${light ? 'text-[#009ab1] dark:text-sky-300' : BLUE}`}>{children}</em>
);

function Dots({ rows = 5, cols = 8, className = '' }) {
  return (
    <div className={`grid gap-2 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <span key={i} className="w-[3px] h-[3px] rounded-full bg-[#009ab1]/50 dark:bg-sky-400/40" />
      ))}
    </div>
  );
}

const Swirl = ({ className = '' }) => (
  <div className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-[#009ab1]/25 via-sky-400/15 to-transparent blur-2xl ${className}`} />
);

/* Silky Ocean Streaks Background matching Home Hero */
function OceanWaves() {
  const colors = ['#f8faf9', '#009ab1', '#38bdf8', '#009ab1', '#bae6fd', '#009ab1'];
  const streaks = Array.from({ length: 36 }, (_, i) => ({
    d: `M -150 ${20 + i * 16} C 250 ${-80 + i * 14}, 650 ${240 - i * 3}, 1350 ${60 + i * 18}`,
    c: colors[(i * 5) % colors.length],
    w: 4 + ((i * 7) % 22),
    o: 0.16 + ((i * 13) % 36) / 100,
  }));
  return (
    <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full pointer-events-none select-none opacity-40 dark:opacity-20" fill="none">
      <defs>
        <linearGradient id="ocean-news-base" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8faf9" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#009ab1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
        </linearGradient>
        <filter id="ocean-news-blur"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>
      <rect width="1200" height="600" fill="url(#ocean-news-base)" />
      <g filter="url(#ocean-news-blur)">
        {streaks.map((s, i) => (
          <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} opacity={s.o} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

/* Subtle corner curved mesh lines decoration */
const CornerMesh = ({ className = '' }) => (
  <svg className={`absolute pointer-events-none select-none ${className}`} viewBox="0 0 110 110" fill="none">
    {Array.from({ length: 7 }).map((_, i) => (
      <path
        key={i}
        d={`M110 ${i * 8} C 75 ${15 + i * 6}, 45 ${55 + i * 7}, 110 ${105 - i * 5}`}
        stroke="#009ab1"
        strokeOpacity="0.3"
        strokeWidth="0.8"
      />
    ))}
    <circle cx="85" cy="40" r="3" fill="#009ab1" fillOpacity="0.7" />
  </svg>
);

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
        // Fetch article by slug or ID from database
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

      // Fetch related news list
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
      Lightbulb,
      Layers,
      Sparkles,
      GraduationCap,
      HeartHandshake,
      CheckCircle2,
      BookOpen
    };
    const IconComponent = map[name] || Sparkles;
    return <IconComponent size={size} className={className} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf9] dark:bg-[#030712] flex items-center justify-center font-sans">
        <div className="text-center space-y-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,154,177,0.12)] border border-[#009ab1]/20 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-[#009ab1]/10 flex items-center justify-center mx-auto text-[#009ab1]">
            <Loader2 className="animate-spin" size={28} />
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold tracking-wide">Loading News Story...</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-[#f8faf9] dark:bg-[#030712] flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-5 max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,154,177,0.10)]">
          <div className="w-14 h-14 rounded-2xl bg-[#009ab1]/10 flex items-center justify-center mx-auto text-[#009ab1]">
            <FileText size={28} />
          </div>
          <h2 style={SERIF} className="text-2xl font-normal text-slate-800 dark:text-white">Article Not Found</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">The requested news article was not found in the database.</p>
          <Link href="/news" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#009ab1] hover:bg-[#008296] text-white text-xs font-bold shadow-[0_8px_20px_rgba(0,154,177,0.35)] transition-all">
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
    <div className="min-h-screen bg-[#f8faf9] dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-28 pt-24 sm:pt-32 relative overflow-hidden selection:bg-[#009ab1]/25 transition-colors duration-300">

      {/* ============================================================ */}
      {/* 0. AMBIENT HOME THEME GLOWS & GEOMETRIC ACCENTS */}
      {/* ============================================================ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft cyan & sky radial glows */}
        <div className="absolute top-[0%] left-[-10%] w-[55%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#009ab1]/15 via-sky-400/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[65%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-sky-400/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-400/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Decorative ring + dots on the left background edge (from Home page) */}
      <div className="hidden lg:block absolute -left-[220px] top-[14%] w-[340px] h-[340px] rounded-full border border-[#009ab1]/20 pointer-events-none" />
      <div className="hidden lg:block absolute left-[90px] top-[26%] w-2.5 h-2.5 rounded-full bg-[#009ab1]/70 pointer-events-none" />
      <Dots rows={7} cols={5} className="hidden lg:grid absolute left-6 top-[32%]" />

      {/* ============================================================ */}
      {/* 1. HERO SECTION WITH OCEAN WAVES & BLENDED IMAGE */}
      {/* ============================================================ */}
      <div className="relative w-full overflow-hidden">

        {/* Silky Ocean Streaks Backdrop behind hero */}
        <div 
          className="absolute inset-y-0 right-0 w-full lg:w-[68%] pointer-events-none z-0 opacity-40 dark:opacity-20"
          style={{
            maskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to right, black 0%, black 20%, transparent 60%)'
          }}
        >
          <OceanWaves />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8faf9] dark:from-[#030712] via-[#f8faf9]/60 dark:via-[#030712]/60 to-transparent" />
        </div>

        {/* Natural Environment Blend Container (Full Bleed Right with Ultra-Smooth Feathered Blend) */}
        <div 
          className="absolute top-0 right-0 h-full min-h-[520px] lg:h-[620px] xl:h-[670px] w-full lg:w-[68%] xl:w-[64%] pointer-events-none z-0 overflow-hidden select-none hidden lg:block transition-all duration-500"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, rgba(0,0,0,0.03) 24%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.76) 66%, rgba(0,0,0,0.95) 82%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 14%, rgba(0,0,0,0.03) 24%, rgba(0,0,0,0.14) 36%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.76) 66%, rgba(0,0,0,0.95) 82%, black 100%)'
          }}
        >
          <img
            src={news.imageUrl || "/events/workshop.jpg"}
            alt={news.title || "News Story"}
            className="w-full h-full object-cover object-left-center transition-all duration-300"
            onError={(e) => { e.currentTarget.src = "/events/workshop.jpg"; }}
          />
          {/* Edge Fading layers to blend smoothly with canvas */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8faf9] via-[#f8faf9]/70 via-[20%] to-transparent to-[70%] dark:from-[#030712] dark:via-[#030712]/70 w-full h-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#f8faf9] via-[#f8faf9]/85 via-[35%] to-transparent dark:from-[#030712] dark:via-[#030712]/85 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#f8faf9] dark:from-[#030712] to-transparent pointer-events-none" />
        </div>

        {/* Mobile Background Fallback */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 block lg:hidden opacity-15">
          <img
            src={news.imageUrl || "/events/workshop.jpg"}
            alt={news.title || "News Story"}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.src = "/events/workshop.jpg"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8faf9] dark:from-[#030712] via-[#f8faf9]/90 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center min-h-[480px] sm:min-h-[560px] pb-6 lg:pb-0">

            <div className="lg:col-span-7 xl:col-span-6 space-y-6 sm:space-y-7 lg:pr-6 z-10 pt-8 lg:pt-0">

              {/* Breadcrumb Navigation */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#009ab1] dark:bg-sky-400" />
                <Link href="/" className="hover:text-[#009ab1] dark:hover:text-sky-300 transition-colors">Home</Link>
                <span className="text-slate-300 dark:text-slate-600">&gt;</span>
                <Link href="/news" className="hover:text-[#009ab1] dark:hover:text-sky-300 transition-colors">News</Link>
                <span className="text-slate-300 dark:text-slate-600">&gt;</span>
                <span className="text-[#009ab1] dark:text-sky-400 font-bold line-clamp-1 max-w-[240px] sm:max-w-md">
                  {news.title}
                </span>
              </div>

              {/* Category Pill Tag matching Home Tag Style */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#009ab1]/25 dark:border-[#009ab1]/30 shadow-[0_4px_16px_rgba(0,154,177,0.08)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                <span className="text-[11px] font-bold tracking-[0.24em] text-[#009ab1] dark:text-sky-400 uppercase">
                  {news.tag || news.category || 'LEnSE NEWS &amp; UPDATES'}
                </span>
              </div>

              {/* Main Headline with Serif Em Accent & Double Slashes */}
              <h1 style={SERIF} className="text-4xl sm:text-5xl lg:text-[4.1rem] leading-[1.06] tracking-tight font-normal text-slate-900 dark:text-white">
                {news.title}
                <span className="font-light text-[#009ab1]/40 not-italic ml-2 text-3xl sm:text-4xl select-none">//</span>
              </h1>

              {news.desc && (
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-[1.78] max-w-2xl font-normal">
                  {news.desc}
                </p>
              )}

              {/* Clean Inline Meta Info Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs text-slate-600 dark:text-slate-300 font-medium border-t border-[#009ab1]/20 dark:border-slate-800 max-w-2xl">
                {news.date && (
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-[#009ab1] dark:text-sky-400" />
                    <span className="font-bold text-slate-900 dark:text-white">{news.date}</span>
                  </div>
                )}
                {news.author && (
                  <>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <div className="flex items-center gap-2">
                      <User size={15} className="text-[#009ab1] dark:text-sky-400" />
                      <span>{news.author}</span>
                    </div>
                  </>
                )}
                {news.readTime && (
                  <>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-[#009ab1] dark:text-sky-400" />
                      <span>{news.readTime}</span>
                    </div>
                  </>
                )}
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-[#009ab1] dark:text-sky-400 hover:text-[#007f91] dark:hover:text-sky-300 font-bold transition-colors cursor-pointer group"
                >
                  <Share2 size={14} className="group-hover:scale-110 transition-transform" />
                  <span>{copied ? 'Link Copied!' : 'Share Story'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1.5. HOME-STYLE 4 QUICK PILLARS STRIP (ARTICLE SNAPSHOT) */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white dark:border-slate-800/90 p-2 sm:p-2.5 shadow-[0_12px_36px_rgba(0,154,177,0.08)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
            {[
              { label: 'Published Date', val: news.date || 'Recent Update', icon: Calendar },
              { label: 'Focus / Category', val: news.category || news.tag || 'STEM & Research', icon: GraduationCap },
              { label: 'Editorial Desk', val: news.author || 'LEnSE Communications', icon: Bookmark },
              { label: 'Estimated Reading', val: news.readTime || '3-4 min read', icon: Clock }
            ].map((item, i) => (
              <div key={i} className="p-3 sm:p-3.5 flex items-center gap-3.5 hover:bg-[#f8faf9] dark:hover:bg-slate-800/50 rounded-xl sm:rounded-2xl transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-[#009ab1]/10 dark:bg-sky-500/15 border border-[#009ab1]/20 dark:border-sky-500/20 flex items-center justify-center text-[#009ab1] dark:text-sky-400 shrink-0 group-hover:bg-[#009ab1] group-hover:text-white transition-all duration-300 shadow-xs">
                  <item.icon size={18} strokeWidth={1.7} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10.5px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
                    {item.label}
                  </span>
                  <h4 className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight group-hover:text-[#009ab1] transition-colors truncate mt-0.5">
                    {item.val}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Wave Connector Line passing behind Main Content Grid */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <svg className="hidden lg:block w-full h-[60px] pointer-events-none opacity-40 dark:opacity-20" preserveAspectRatio="none" viewBox="0 0 1200 60" fill="none">
          <path d="M 30 35 C 230 50, 460 10, 680 25 C 890 40, 1060 15, 1180 30" stroke="#009ab1" strokeWidth="1" />
          <circle cx="230" cy="46" r="3" fill="#009ab1" />
          <circle cx="680" cy="25" r="3" fill="#009ab1" />
          <circle cx="1060" cy="18" r="3" fill="#009ab1" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN TWO-COLUMN CONTENT GRID */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Left Column (8 cols): Story, About, Highlights, Voices, Gallery */}
          <div className="lg:col-span-8 space-y-12">

            {/* Overview / Story Section */}
            <section className="space-y-4 relative">
              <div className="flex items-center gap-2.5 mb-1 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#009ab1] dark:text-sky-400">ARTICLE OVERVIEW</span>
                <span className="w-16 h-px bg-[#009ab1]/30" />
              </div>
              <h2 style={SERIF} className="text-2xl sm:text-[30px] font-normal text-slate-900 dark:text-white leading-tight">
                The Full <Em>Story.</Em> <span className="font-light text-[#009ab1]/40 not-italic ml-1 text-2xl select-none">//</span>
              </h2>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-[14px] sm:text-[14.5px] leading-[1.85] whitespace-pre-line">
                <p>
                  {details.aboutText || details.content || details.overview || news.desc || 'No detailed story text provided.'}
                </p>
              </div>
            </section>

            {/* About the Initiative / Story Context (if in DB) */}
            {details.about && (
              <section className="space-y-5 relative">
                <div className="flex items-center gap-2.5 mb-1 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                  <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#009ab1] dark:text-sky-400">BACKGROUND &amp; VISION</span>
                  <span className="w-16 h-px bg-[#009ab1]/30" />
                </div>
                <h2 style={SERIF} className="text-2xl sm:text-[30px] font-normal text-slate-900 dark:text-white leading-tight">
                  About the <Em>Initiative.</Em> <span className="font-light text-[#009ab1]/40 not-italic ml-1 text-2xl select-none">//</span>
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-[14px] sm:text-[14.5px] leading-[1.85] whitespace-pre-line">
                  {details.about}
                </p>

                {/* Key Impact Highlights Card with Home Frosted Glass & Corner Wave Art */}
                {stats.length > 0 && (
                  <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8faf9]/95 via-white to-[#009ab1]/15 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90 backdrop-blur-xl border border-white dark:border-slate-800 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,154,177,0.10)] mt-6">
                    <CornerMesh className="top-0 right-0 w-32 h-32 opacity-40 dark:opacity-20" />

                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1] dark:bg-sky-400" />
                        <h4 className="text-xs font-bold text-[#009ab1] dark:text-sky-400 uppercase tracking-widest">
                          Key Impact Highlights
                        </h4>
                      </div>
                      <span className="w-7 h-7 rounded-full bg-[#009ab1]/10 flex items-center justify-center text-[#009ab1]">
                        <Sparkles size={14} />
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-y-0 sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-slate-800 relative z-10">
                      {stats.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center px-2 group">
                          <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-slate-800 border border-[#009ab1]/25 dark:border-sky-500/25 flex items-center justify-center text-[#009ab1] dark:text-sky-400 mb-3 shadow-[0_6px_16px_rgba(0,154,177,0.12)] group-hover:scale-105 transition-transform duration-300">
                            {renderIcon(stat.icon, 20)}
                          </div>
                          <span style={SERIF} className="text-3xl sm:text-4xl font-normal text-slate-900 dark:text-white leading-none mb-1 group-hover:text-[#009ab1] transition-colors">
                            {stat.count}
                          </span>
                          <span className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-1">
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
              <section className="space-y-4 relative">
                <div className="flex items-center gap-2.5 mb-1 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                  <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#009ab1] dark:text-sky-400">PERSPECTIVES</span>
                  <span className="w-16 h-px bg-[#009ab1]/30" />
                </div>
                <h2 style={SERIF} className="text-2xl sm:text-[30px] font-normal text-slate-900 dark:text-white leading-tight">
                  Voices &amp; <Em>Acknowledgements.</Em> <span className="font-light text-[#009ab1]/40 not-italic ml-1 text-2xl select-none">//</span>
                </h2>

                <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-[#f8faf9] to-[#009ab1]/15 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/80 border border-white dark:border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-[0_20px_50px_rgba(0,154,177,0.08)]">
                  <CornerMesh className="bottom-0 right-0 w-36 h-36 opacity-30 rotate-180" />

                  <div className="space-y-4 flex-1 relative z-10">
                    <div className="text-[#009ab1] dark:text-sky-400 opacity-40">
                      <Quote size={34} className="rotate-180" />
                    </div>
                    <blockquote style={SERIF} className="text-[15px] sm:text-[16px] italic text-slate-800 dark:text-slate-100 leading-relaxed font-normal">
                      "{quote.text}"
                    </blockquote>
                    <div className="pt-1">
                      {quote.author && <p className="text-xs font-bold text-slate-900 dark:text-white">— {quote.author}</p>}
                      {quote.role && <p className="text-[11px] text-slate-500 dark:text-slate-400">{quote.role}</p>}
                    </div>
                  </div>

                  {quote.image && (
                    <div className="w-full md:w-48 h-36 rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-inner relative z-10">
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
              <section className="space-y-4 relative">
                <div className="flex items-center gap-2.5 mb-1 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009ab1]" />
                  <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#009ab1] dark:text-sky-400">VISUAL HIGHLIGHTS</span>
                  <span className="w-16 h-px bg-[#009ab1]/30" />
                </div>
                <h2 style={SERIF} className="text-2xl sm:text-[30px] font-normal text-slate-900 dark:text-white leading-tight">
                  Event <Em>Gallery.</Em> <span className="font-light text-[#009ab1]/40 not-italic ml-1 text-2xl select-none">//</span>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {gallery.map((item, idx) => (
                    <div key={idx} className="h-28 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 hover:border-[#009ab1]/50 shadow-xs group cursor-pointer transition-all duration-300 hover:-translate-y-1">
                      <img
                        src={item.img || item}
                        alt={item.alt || 'Gallery'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Sidebar (4 cols): News Details, Key Takeaways, Related News */}
          <div className="lg:col-span-4 space-y-6">

            {/* CARD 1: NEWS DETAILS WITH CORNER ART */}
            <div className="relative overflow-hidden rounded-[2rem] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white dark:border-slate-800 p-6 sm:p-7 shadow-[0_18px_45px_rgba(0,154,177,0.08)] space-y-5">
              <CornerMesh className="-top-2 -right-2 w-28 h-28 opacity-35 dark:opacity-20" />

              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 relative z-10">
                <h3 style={SERIF} className="text-xl font-normal text-slate-900 dark:text-white">
                  Story Details
                </h3>
                <span className="w-2 h-2 rounded-full bg-[#009ab1] dark:bg-sky-400" />
              </div>

              <div className="space-y-4 relative z-10">
                {[
                  { label: 'Category', value: news.category || news.tag || 'News', icon: GraduationCap },
                  { label: 'Date', value: news.date || 'Recent', icon: Calendar },
                  { label: 'Author', value: news.author || 'LEnSE Admin', icon: User },
                  { label: 'Read Time', value: news.readTime || '3 min read', icon: Clock }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-[#009ab1]/10 dark:bg-sky-500/15 border border-[#009ab1]/15 dark:border-sky-500/20 flex items-center justify-center text-[#009ab1] dark:text-sky-400 shrink-0 mt-0.5 shadow-xs">
                      <item.icon size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400 font-medium">{item.label}</span>
                      <span className="block text-[13px] font-bold text-slate-800 dark:text-white leading-snug">{item.value}</span>
                    </div>
                  </div>
                ))}

                {/* Social Share Row */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-white">Share Story</span>
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
                        className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#009ab1] dark:hover:bg-[#009ab1] text-slate-600 dark:text-slate-300 hover:text-white dark:hover:text-white flex items-center justify-center transition-all shadow-xs"
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
              <div className="relative overflow-hidden rounded-[2rem] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white dark:border-slate-800 p-6 sm:p-7 shadow-[0_18px_45px_rgba(0,154,177,0.08)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 style={SERIF} className="text-xl font-normal text-slate-900 dark:text-white">
                    Key Takeaways
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#009ab1] dark:bg-sky-400" />
                </div>

                <div className="space-y-3.5">
                  {keyTakeaways.map((text, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="w-7 h-7 rounded-lg bg-[#009ab1]/10 dark:bg-sky-500/15 flex items-center justify-center text-[#009ab1] dark:text-sky-400 shrink-0 mt-0.5 group-hover:bg-[#009ab1] group-hover:text-white transition-all duration-300">
                        <CheckCircle2 size={14} />
                      </div>
                      <p className="text-[12.5px] text-slate-600 dark:text-slate-300 leading-snug font-medium pt-0.5">
                        {typeof text === 'string' ? text : text.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CARD 3: RELATED NEWS */}
            {relatedNews.length > 0 && (
              <div className="relative overflow-hidden rounded-[2rem] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white dark:border-slate-800 p-6 sm:p-7 shadow-[0_18px_45px_rgba(0,154,177,0.08)] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 style={SERIF} className="text-xl font-normal text-slate-900 dark:text-white">
                    Related News
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-[#009ab1] dark:bg-sky-400" />
                </div>

                <div className="space-y-3.5">
                  {relatedNews.map((article, idx) => (
                    <Link
                      key={idx}
                      href={`/news/${article.slug || article.id}`}
                      className="flex items-center gap-3 group/art hover:bg-[#f8faf9] dark:hover:bg-slate-800/60 p-2 rounded-2xl transition-all duration-300"
                    >
                      <div className="w-14 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700/60">
                        <img
                          src={article.imageUrl || '/events/workshop.jpg'}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover/art:scale-110 transition-transform duration-500"
                          onError={(e) => { e.currentTarget.src = "/events/workshop.jpg"; }}
                        />
                      </div>
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <h4 className="text-[12.5px] font-bold text-slate-800 dark:text-white leading-tight group-hover/art:text-[#009ab1] dark:group-hover/art:text-sky-400 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium block">
                          {article.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href="/news"
                    className="w-full text-[12px] font-bold text-[#009ab1] dark:text-sky-400 hover:text-[#008296] dark:hover:text-sky-300 flex items-center justify-center gap-2 transition-colors py-1 group"
                  >
                    <span>View All News &amp; Updates</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
}
