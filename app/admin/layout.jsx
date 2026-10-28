'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  FileText,
  LayoutDashboard,
  ExternalLink,
  LogOut,
  Sparkles,
  BookOpen,
  Mail,
  ShieldCheck,
  User,
  Users
} from 'lucide-react';
import Footer from '../../components/Footer';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage =
    pathname === '/admin/login' ||
    pathname === '/admin/register' ||
    pathname === '/admin/forgot-password' ||
    pathname === '/admin/reset-password';

  const [adminUser, setAdminUser] = useState({
    name: 'Administrator',
    username: 'admin',
    role: 'admin'
  });
  const [loggingOut, setLoggingOut] = useState(false);

  // Maintain clean styles for admin pages
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lense_admin_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed && typeof parsed === 'object') {
            setAdminUser(parsed);
          } else {
            setAdminUser(prev => ({ ...prev, name: stored, username: stored }));
          }
        } catch {
          setAdminUser(prev => ({ ...prev, name: stored, username: stored }));
        }
      }
    }
  }, [pathname]);

  // Check auth user quietly
  useEffect(() => {
    if (isAuthPage) return;
    let isMounted = true;
    async function checkUser() {
      try {
        const res = await fetch('/api/admin/check');
        if (res.ok) {
          const data = await res.json();
          if (data.user && isMounted) {
            setAdminUser(data.user);
            if (typeof window !== 'undefined') {
              localStorage.setItem('lense_admin_user', JSON.stringify(data.user));
            }
          }
        } else {
          router.replace('/admin/login');
        }
      } catch (err) {
        console.error('Session verify failed:', err);
      }
    }
    checkUser();
    return () => { isMounted = false; };
  }, [isAuthPage, router]);

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

  // If on an auth page (login, register, forgot-password, reset-password), render standalone without admin dashboard bar
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-[#f8fbfe] text-slate-900 selection:bg-[#0284c7]/20 selection:text-[#004b87]">
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
      label: 'Key Initiatives',
      href: '/admin/initiatives',
      icon: Sparkles,
      active: pathname.startsWith('/admin/initiatives')
    },
    {
      label: 'News & Media',
      href: '/admin/news',
      icon: FileText,
      active: pathname.startsWith('/admin/news')
    },
    {
      label: 'Enquiries',
      href: '/admin/enquiries',
      icon: Mail,
      active: pathname.startsWith('/admin/enquiries')
    }
  ];

  const displayName = adminUser.name || adminUser.username || 'Admin';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col justify-between selection:bg-[#009ab1]/20 selection:text-[#0f1a3a]">

      {/* ========================================================================= */}
      {/* 1. ELEVATED ADMIN TOPBAR (Home Page Sapphire Aesthetic) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-[0_4px_20px_rgba(26,109,255,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Brand */}
          <Link href="/admin" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="LEnSE Logo"
                className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-[#0f1a3a] tracking-tight">
                  LEnSE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#009ab1] border border-blue-200/60">
                  Command
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                Administrative Workspace
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    item.active
                      ? 'bg-blue-50/90 text-[#009ab1] shadow-xs border border-blue-200/60 font-bold'
                      : 'text-slate-600 hover:text-[#0f1a3a] hover:bg-slate-100/80 border border-transparent'
                  }`}
                >
                  <Icon size={15} className={item.active ? 'text-[#009ab1]' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-3">

            {/* View Public Site */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:text-[#009ab1] hover:border-blue-300 hover:bg-blue-50/50 transition-all shadow-2xs"
              title="Preview public site in new tab"
            >
              <ExternalLink size={13} className="text-slate-400" />
              <span>Public Site</span>
            </Link>

            {/* Admin User Chip */}
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 shadow-2xs">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#009ab1] to-[#38bdf8] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                {initial}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-tight max-w-[130px] truncate">
                  {displayName}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {adminUser.role || 'Admin'}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200/70 hover:border-rose-300 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
              title="Sign out of Admin Console"
            >
              <LogOut size={13} />
              <span>{loggingOut ? 'Signing out...' : 'Logout'}</span>
            </button>

          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden overflow-x-auto border-t border-slate-200/80 px-3 py-2 bg-slate-50/90 flex items-center gap-1.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  item.active
                    ? 'bg-white text-[#009ab1] shadow-xs border border-blue-200/70'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon size={14} className={item.active ? 'text-[#009ab1]' : 'text-slate-400'} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. ADMIN MAIN CONTENT WRAPPER */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full admin-page-transition">
        {children}
      </main>

      {/* ========================================================================= */}
      {/* 3. STANDARD FOOTER */}
      {/* ========================================================================= */}
      <Footer />

    </div>
  );
}
