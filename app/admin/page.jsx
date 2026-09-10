'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar, 
  Layers, 
  Settings, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  LayoutDashboard,
  FileText,
  Loader2,
  Globe,
  Upload,
  BookOpen,
  Award,
  Users,
  Building
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminUser, setAdminUser] = useState('Administrator');
  const [eventsCount, setEventsCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [resourcesCount, setResourcesCount] = useState(0);

  useEffect(() => {
    async function verifyAuthAndFetch() {
      try {
        const checkRes = await fetch('/api/admin/check');
        if (!checkRes.ok) {
          router.replace('/admin/login');
          return;
        }
        const data = await checkRes.json();
        if (data.user?.username) {
          setAdminUser(data.user.username);
        }

        // Fetch counts concurrently
        const [eventsRes, newsRes, resourcesRes] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/news'),
          fetch('/api/resources')
        ]);

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          if (Array.isArray(eventsData)) setEventsCount(eventsData.length);
        }
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          if (Array.isArray(newsData)) setNewsCount(newsData.length);
        }
        if (resourcesRes.ok) {
          const resData = await resourcesRes.json();
          if (Array.isArray(resData)) setResourcesCount(resData.length);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    verifyAuthAndFetch();
  }, [router]);

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="text-center space-y-3 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e2ece3]">
          <Loader2 className="animate-spin text-[#2d5a3c] mx-auto" size={32} />
          <p className="text-[#3b4e3f] text-xs font-bold tracking-wide">Loading Executive Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* ========================================================================= */}
      {/* 1. EXECUTIVE WELCOME HERO BANNER */}
      {/* ========================================================================= */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#1b3726] via-[#142e1f] to-[#0d2216] text-white p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(15,35,22,0.18)] border border-white/10 overflow-hidden">
        
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_rgba(162,212,94,0.18),transparent_70%)] pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_rgba(45,90,60,0.3),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#c2ec8b] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>LEnSE Administrative Command Centre</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white leading-tight">
            Welcome back, <span className="italic text-[#a2d45e] font-serif">{adminUser}</span>.
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-[15px] leading-relaxed font-normal max-w-2xl pt-1">
            Manage live events, publish conferences and workshops, update university news, upload research publications, and customize live STEM initiative banners in real-time.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3.5">
            <Link
              href="/admin/events"
              className="px-6 py-3 rounded-full bg-gradient-to-b from-white to-[#f4f7f2] hover:bg-white text-[#153421] text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Create / Manage Events</span>
              <ArrowRight size={13} />
            </Link>

            <Link
              href="/admin/news"
              className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <FileText size={14} />
              <span>Publish News &amp; Resources</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/15 text-white/90 text-xs font-medium flex items-center gap-2 border border-white/10 transition-colors"
            >
              <ExternalLink size={13} />
              <span>View Public Portal</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LIVE METRICS ROW */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Events */}
        <div className="p-6 rounded-[2rem] bg-white border border-[#e2ece3] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-[#eef5ee] border border-[#d6e6d8] flex items-center justify-center text-[#2d5a3c] shrink-0 group-hover:scale-105 transition-transform">
            <Calendar size={24} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#627766] uppercase tracking-wider block">Live Published Events</span>
            <span className="text-2xl sm:text-3xl font-serif font-normal text-[#122417] leading-tight block mt-0.5">
              {eventsCount} <span className="text-sm font-sans font-medium text-[#485e4d]">Events</span>
            </span>
          </div>
        </div>

        {/* Metric 2: News */}
        <div className="p-6 rounded-[2rem] bg-white border border-[#e2ece3] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-[#eef5ee] border border-[#d6e6d8] flex items-center justify-center text-[#2d5a3c] shrink-0 group-hover:scale-105 transition-transform">
            <FileText size={24} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#627766] uppercase tracking-wider block">News &amp; Stories</span>
            <span className="text-2xl sm:text-3xl font-serif font-normal text-[#122417] leading-tight block mt-0.5">
              {newsCount} <span className="text-sm font-sans font-medium text-[#485e4d]">Articles</span>
            </span>
          </div>
        </div>

        {/* Metric 3: Resources */}
        <Link
          href="/admin/resources"
          className="p-6 rounded-[2rem] bg-white border border-[#e2ece3] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 group hover:-translate-y-1 hover:border-[#2d5a3c]/50 transition-all duration-300"
          title="Click to manage Academic Resources"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#eef5ee] border border-[#d6e6d8] flex items-center justify-center text-[#2d5a3c] shrink-0 group-hover:scale-105 transition-transform">
            <BookOpen size={24} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#627766] uppercase tracking-wider block">Academic Resources</span>
            <span className="text-2xl sm:text-3xl font-serif font-normal text-[#122417] leading-tight block mt-0.5">
              {resourcesCount} <span className="text-sm font-sans font-medium text-[#485e4d]">Files</span>
            </span>
          </div>
        </Link>

        {/* Metric 4: Database Status */}
        <div className="p-6 rounded-[2rem] bg-white border border-[#e2ece3] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex items-center gap-4 group hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 rounded-2xl bg-[#eef5ee] border border-[#d6e6d8] flex items-center justify-center text-[#2d5a3c] shrink-0 group-hover:scale-105 transition-transform">
            <Database size={24} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#627766] uppercase tracking-wider block">Database Status</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-bold text-[#142919]">PostgreSQL Live</span>
            </div>
            <span className="text-[10px] text-[#6e8574] font-medium block mt-0.5">SSL Secure Connection</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. MANAGEMENT MODULE CARDS */}
      {/* ========================================================================= */}
      <div className="space-y-6">
        
        <div className="flex items-center justify-between border-b border-[#e2ece3] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#2d5a3c]" />
            <h2 className="text-sm font-bold tracking-[0.2em] text-[#3e5343] uppercase">
              Management Modules
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#667d6c]">Real-time synchronization enabled</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Events & Conferences */}
          <div className="rounded-[2.2rem] bg-white border border-[#e2ece3] p-6 sm:p-7 flex flex-col justify-between hover:border-[#2d5a3c]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(20,40,25,0.06)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#eef5ee] border border-[#d6e6d8] flex items-center justify-center text-[#2d5a3c] group-hover:scale-105 transition-transform">
                  <Calendar size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#eef5ee] text-[#2d5a3c] border border-[#d6e6d8]">
                  Schedule
                </span>
              </div>

              <h3 className="text-xl font-serif font-normal text-[#122016] group-hover:text-[#2d5a3c] transition-colors leading-tight">
                Events &amp; Conferences
              </h3>

              <p className="text-xs text-[#485e4d] leading-relaxed font-normal">
                Publish international conferences, workshops, faculty development programmes, and STEM camps with poster images and schedules.
              </p>
            </div>

            <div className="pt-5 border-t border-[#edf3ee] mt-5 flex items-center gap-2">
              <Link
                href="/admin/events"
                className="flex-1 py-2.5 rounded-xl bg-[#1b3726] hover:bg-[#254d35] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
              >
                <span>Manage</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                href="/events"
                target="_blank"
                className="p-2.5 rounded-xl bg-[#f4f7f2] hover:bg-[#eaf1e5] text-[#2d4032] border border-[#d8e5da] transition-colors"
                title="View Public Events Page"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: Academic Resources & Downloads */}
          <div className="rounded-[2.2rem] bg-white border border-[#e2ece3] p-6 sm:p-7 flex flex-col justify-between hover:border-[#2d5a3c]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(20,40,25,0.06)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#eef5ee] border border-[#d6e6d8] flex items-center justify-center text-[#2d5a3c] group-hover:scale-105 transition-transform">
                  <BookOpen size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#eef5ee] text-[#2d5a3c] border border-[#d6e6d8]">
                  Downloads
                </span>
              </div>

              <h3 className="text-xl font-serif font-normal text-[#122016] group-hover:text-[#2d5a3c] transition-colors leading-tight">
                Academic Resources
              </h3>

              <p className="text-xs text-[#485e4d] leading-relaxed font-normal">
                Edit and upload conference brochures, laboratory toolkits, FYUGP courseware, prompt engineering handbooks, and policy reports.
              </p>
            </div>

            <div className="pt-5 border-t border-[#edf3ee] mt-5 flex items-center gap-2">
              <Link
                href="/admin/resources"
                className="flex-1 py-2.5 rounded-xl bg-[#1b3726] hover:bg-[#254d35] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
              >
                <span>Edit Files</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                href="/resources"
                target="_blank"
                className="p-2.5 rounded-xl bg-[#f4f7f2] hover:bg-[#eaf1e5] text-[#2d4032] border border-[#d8e5da] transition-colors"
                title="View Public Academic Resources Page"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Card 3: News & Publications */}
          <div className="rounded-[2.2rem] bg-white border border-[#e2ece3] p-6 sm:p-7 flex flex-col justify-between hover:border-[#2d5a3c]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(20,40,25,0.06)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#eef5ee] border border-[#d6e6d8] flex items-center justify-center text-[#2d5a3c] group-hover:scale-105 transition-transform">
                  <FileText size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#eef5ee] text-[#2d5a3c] border border-[#d6e6d8]">
                  Media
                </span>
              </div>

              <h3 className="text-xl font-serif font-normal text-[#122016] group-hover:text-[#2d5a3c] transition-colors leading-tight">
                News &amp; Media
              </h3>

              <p className="text-xs text-[#485e4d] leading-relaxed font-normal">
                Post press announcements, institutional MoU updates, media highlights, and academic achievements with photo coverage.
              </p>
            </div>

            <div className="pt-5 border-t border-[#edf3ee] mt-5 flex items-center gap-2">
              <Link
                href="/admin/news"
                className="flex-1 py-2.5 rounded-xl bg-[#1b3726] hover:bg-[#254d35] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
              >
                <span>Manage</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                href="/news"
                target="_blank"
                className="p-2.5 rounded-xl bg-[#f4f7f2] hover:bg-[#eaf1e5] text-[#2d4032] border border-[#d8e5da] transition-colors"
                title="View Public News Page"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Card 4: Featured Initiatives & Page Settings */}
          <div className="rounded-[2.2rem] bg-white border border-[#e2ece3] p-6 sm:p-7 flex flex-col justify-between hover:border-[#2d5a3c]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(20,40,25,0.06)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#eef5ee] border border-[#d6e6d8] flex items-center justify-center text-[#2d5a3c] group-hover:scale-105 transition-transform">
                  <Layers size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#eef5ee] text-[#2d5a3c] border border-[#d6e6d8]">
                  Metrics
                </span>
              </div>

              <h3 className="text-xl font-serif font-normal text-[#122016] group-hover:text-[#2d5a3c] transition-colors leading-tight">
                Initiatives &amp; Hero
              </h3>

              <p className="text-xs text-[#485e4d] leading-relaxed font-normal">
                Customize the auto-scrolling Initiatives carousel, campus banner imagery, and live student impact counters.
              </p>
            </div>

            <div className="pt-5 border-t border-[#edf3ee] mt-5 flex items-center gap-2">
              <Link
                href="/admin/events"
                className="flex-1 py-2.5 rounded-xl bg-[#f4f7f2] hover:bg-[#eaf1e5] text-[#1b3726] border border-[#d8e5da] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all"
              >
                <Settings size={13} className="text-[#2d5a3c]" />
                <span>Configure</span>
              </Link>

              <Link
                href="/initiatives"
                target="_blank"
                className="p-2.5 rounded-xl bg-[#f4f7f2] hover:bg-[#eaf1e5] text-[#2d4032] border border-[#d8e5da] transition-colors"
                title="View Public Initiatives Page"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. SECURITY & ENVIRONMENT SUMMARY DOCK */}
      {/* ========================================================================= */}
      <div className="rounded-[2rem] bg-white border border-[#e2ece3] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#eaf1eb]">
          
          <div className="flex items-center gap-3.5 pr-4">
            <ShieldCheck size={28} className="text-[#2d5a3c] shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-[#5c7361] uppercase tracking-wider block">Security Protocol</span>
              <span className="text-xs font-bold text-[#142618]">HTTP-Only Token Auth</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 sm:pl-6 pr-4 pt-4 sm:pt-0">
            <Building size={28} className="text-[#2d5a3c] shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-[#5c7361] uppercase tracking-wider block">Campus Facility</span>
              <span className="text-xs font-bold text-[#142618]">Kariavattom Campus</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 sm:pl-6 pr-4 pt-4 sm:pt-0">
            <CheckCircle2 size={28} className="text-[#2d5a3c] shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-[#5c7361] uppercase tracking-wider block">System Status</span>
              <span className="text-xs font-bold text-emerald-700">All Modules Operational</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 sm:pl-6 pt-4 sm:pt-0">
            <Globe size={28} className="text-[#2d5a3c] shrink-0" />
            <div>
              <span className="text-[11px] font-bold text-[#5c7361] uppercase tracking-wider block">Public Preview</span>
              <Link href="/" target="_blank" className="text-xs font-bold text-[#2d5a3c] hover:underline flex items-center gap-1">
                <span>View Live University Site</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
