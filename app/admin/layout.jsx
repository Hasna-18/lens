'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Calendar,
  FileText,
  LayoutDashboard,
  ExternalLink,
  LogOut,
  Sparkles,
  Database,
  Building,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const [adminUser, setAdminUser] = useState('Administrator');
  const [loggingOut, setLoggingOut] = useState(false);

  // Force Light Theme across all Admin Pages
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.setAttribute('data-theme', 'light');

    // Also check saved username
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lense_admin_user');
      if (stored) setAdminUser(stored);
    }
  }, [pathname]);

  // Check auth user quietly
  useEffect(() => {
    if (isLoginPage) return;
    let isMounted = true;
    async function checkUser() {
      try {
        const res = await fetch('/api/admin/check');
        if (res.ok) {
          const data = await res.json();
          if (data.user?.username && isMounted) {
            setAdminUser(data.user.username);
            if (typeof window !== 'undefined') {
              localStorage.setItem('lense_admin_user', data.user.username);
            }
          }
        }
      } catch (err) {
        // silent
      }
    }
    checkUser();
    return () => { isMounted = false; };
  }, [isLoginPage]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lense_admin_user');
      }
      setLoggingOut(false);
      router.push('/admin/login');
    }
  };

  // If on login page, render clean container without admin navbar/footer
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#edf4e8] text-slate-900 font-sans">
        {children}
      </div>
    );
  }

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin'
    },
    {
      label: 'Events & Conferences',
      href: '/admin/events',
      icon: Calendar,
      active: pathname.startsWith('/admin/events')
    },
    {
      label: 'Academic Resources',
      href: '/admin/resources',
      icon: BookOpen,
      active: pathname.startsWith('/admin/resources')
    },
    {
      label: 'News & Media',
      href: '/admin/news',
      icon: FileText,
      active: pathname.startsWith('/admin/news')
    }
  ];

  return (
    <div className="min-h-screen bg-[#edf4e8] text-slate-900 font-sans flex flex-col justify-between selection:bg-[#2d5a3c]/20 selection:text-[#1b3726]">
      
      {/* ========================================================================= */}
      {/* 1. ULTRA-PREMIUM ADMIN NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#e2ece3] shadow-[0_4px_24px_rgba(20,40,25,0.04)] transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Area */}
          <div className="flex items-center gap-3.5 shrink-0">
            <Link href="/admin" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="LEnSE Logo"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base sm:text-lg text-[#132418] tracking-tight group-hover:text-[#2d5a3c] transition-colors">
                    LEnSE Console
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eef5ee] text-[#2d5a3c] border border-[#d6e5d8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] animate-pulse" />
                    Admin
                  </span>
                </div>
                <span className="text-[11px] text-[#556959] font-medium hidden sm:block">
                  University of Kerala • Executive Management
                </span>
              </div>
            </Link>
          </div>

          {/* Central Capsule Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#f1f6f1] border border-[#d8e5d9] shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                    item.active
                      ? 'bg-white text-[#183a27] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#d6e5d8]'
                      : 'text-[#4d6352] hover:text-[#183a27] hover:bg-white/60'
                  }`}
                >
                  <Icon size={14} className={item.active ? 'text-[#2d5a3c]' : 'text-[#6b8270]'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Live Database Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eef5ee] border border-[#d6e5d8] text-[11px] font-semibold text-[#2d5a3c]">
              <Database size={13} />
              <span>PostgreSQL Live</span>
            </div>

            {/* Public Website Preview Link */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#f3f7f2] border border-[#dbe6dc] text-xs font-bold text-[#2d4032] shadow-xs transition-all hover:scale-[1.02]"
              title="Preview public site in new tab"
            >
              <ExternalLink size={13} className="text-[#2d5a3c]" />
              <span className="hidden sm:inline">View Public Site</span>
            </Link>

            {/* Admin User Profile Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#dbe6dc] shadow-xs">
              <div className="w-6 h-6 rounded-full bg-[#2d5a3c] text-white flex items-center justify-center text-[10px] font-bold">
                {adminUser ? adminUser.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="text-xs font-bold text-[#1a2f21]">{adminUser}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#fdf2f2] hover:bg-[#fce4e4] border border-[#f5c6c6] text-[#b91c1c] text-xs font-bold transition-all hover:scale-[1.02] cursor-pointer"
              title="Sign out of Admin Console"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">{loggingOut ? 'Signing out...' : 'Logout'}</span>
            </button>

          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-around border-t border-[#e2ece3] px-2 py-1.5 bg-[#edf4e8]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  item.active
                    ? 'bg-white text-[#183a27] shadow-xs border border-[#d6e5d8]'
                    : 'text-[#586e5c]'
                }`}
              >
                <Icon size={14} />
                <span>{item.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. ADMIN MAIN CONTENT WRAPPER WITH SMOOTH ROUTE TRANSITION */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full admin-page-transition">
        {children}
      </main>

      {/* ========================================================================= */}
      {/* 3. EXECUTIVE ADMIN FOOTER */}
      {/* ========================================================================= */}
      <footer className="w-full bg-white border-t border-[#e2ece3] mt-20 pt-8 pb-10 shadow-[0_-4px_24px_rgba(20,40,25,0.02)]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#ebf2ec] items-center">
            
            {/* Left: Centre Affiliation */}
            <div className="md:col-span-6 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#2d5a3c]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#2d5a3c]">
                  LEnSE Management Console
                </span>
              </div>
              <p className="font-serif text-sm sm:text-base text-[#14261a] font-normal">
                Centre for Learning Engineering &amp; Sustainability Education
              </p>
              <p className="text-xs text-[#5f7464]">
                University of Kerala, Kariavattom Campus, Thiruvananthapuram - 695581, Kerala, India
              </p>
            </div>

            {/* Right: Fast Administrative Navigation */}
            <div className="md:col-span-6 flex flex-wrap items-center md:justify-end gap-3 text-xs font-semibold text-[#445849]">
              <Link href="/admin" className="hover:text-[#2d5a3c] transition-colors">
                Dashboard
              </Link>
              <span>•</span>
              <Link href="/admin/events" className="hover:text-[#2d5a3c] transition-colors">
                Events Manager
              </Link>
              <span>•</span>
              <Link href="/admin/news" className="hover:text-[#2d5a3c] transition-colors">
                News &amp; Publications
              </Link>
              <span>•</span>
              <Link href="/" target="_blank" className="hover:text-[#2d5a3c] transition-colors">
                Public Site Preview
              </Link>
            </div>

          </div>

          {/* Bottom Copyright & Security Badge */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e8373]">
            <div>
              &copy; 2024&ndash;2026 LEnSE, University of Kerala. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#2d5a3c] bg-[#eef5ee] px-2.5 py-1 rounded-full border border-[#d8e8da]">
                <ShieldCheck size={13} />
                Encrypted Session • Master Admin
              </span>
              <span className="text-[11px] text-[#869b8b]">v2.4 LTS</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
