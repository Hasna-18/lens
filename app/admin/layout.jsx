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
  Mail
} from 'lucide-react';
import Footer from '../../components/Footer';

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

  return (
    <div className="min-h-screen bg-[#edf4e8] text-slate-900 font-sans flex flex-col justify-between selection:bg-[#2d5a3c]/20 selection:text-[#1b3726]">
      
      {/* ========================================================================= */}
      {/* 1. STANDARD ADMIN NAVBAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand */}
          <Link href="/admin" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.png"
              alt="LEnSE Logo"
              className="h-9 w-auto object-contain"
            />
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base text-slate-900 tracking-tight">
                LEnSE
              </span>
              <span className="text-xs font-medium text-slate-500">
                Admin Panel
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.active
                      ? 'bg-[#edf4e8] text-[#1b3726] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={16} className={item.active ? 'text-[#2d5a3c]' : 'text-slate-400'} />
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
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              title="Preview public site in new tab"
            >
              <ExternalLink size={14} className="text-slate-500" />
              <span>View Site</span>
            </Link>

            {/* Admin User */}
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 font-medium px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
              <div className="w-5 h-5 rounded-full bg-[#1b3726] text-white flex items-center justify-center text-[10px] font-bold">
                {adminUser ? adminUser.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="max-w-[120px] truncate">{adminUser}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
              title="Sign out of Admin Console"
            >
              <LogOut size={14} />
              <span>{loggingOut ? 'Signing out...' : 'Logout'}</span>
            </button>

          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden overflow-x-auto border-t border-slate-200 px-3 py-2 bg-slate-50 flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  item.active
                    ? 'bg-white text-[#1b3726] font-semibold shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon size={14} className={item.active ? 'text-[#2d5a3c]' : 'text-slate-400'} />
                <span>{item.label}</span>
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
      {/* 3. STANDARD FOOTER */}
      {/* ========================================================================= */}
      <Footer />

    </div>
  );
}
