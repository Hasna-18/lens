'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, Sun, Moon, Search } from 'lucide-react';
import MobileDrawer from './MobileDrawer';
import SearchModal from './SearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check initial theme or saved preference
    const savedTheme = localStorage.getItem('clese-theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('clese-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/events', label: 'Events' },
    { href: '/initiatives', label: 'Initiatives' },
    { href: '/resources', label: 'Resources' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <>
      {/* Floating Glassmorphic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 py-4 sm:py-5 pointer-events-none transition-all duration-300">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">

          {/* Left Brand with Logo & Title */}
          <Link href="/" className="pointer-events-auto flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt="LEnSE Logo"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Center Navigation Capsule */}
          <nav className="pointer-events-auto hidden md:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#080f1e]/90 backdrop-blur-2xl border border-blue-100/90 dark:border-white/10 shadow-[0_8px_32px_rgba(2,132,199,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/programs' && pathname === '/academics');

              const handlePrefetch = () => {
                if (link.href === '/events') {
                  import('../lib/clientCache').then(m => m.prefetchEndpoint('/api/events', 'clese_events_cache'));
                } else if (link.href === '/initiatives') {
                  import('../lib/clientCache').then(m => m.prefetchEndpoint('/api/initiatives', 'clese_initiatives_cache'));
                } else if (link.href === '/news') {
                  import('../lib/clientCache').then(m => m.prefetchEndpoint('/api/news', 'clese_news_cache'));
                } else if (link.href === '/resources') {
                  import('../lib/clientCache').then(m => m.prefetchEndpoint('/api/resources', 'clese_resources_cache'));
                }
              };

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={handlePrefetch}
                  onTouchStart={handlePrefetch}
                  className={`relative px-3.5 py-1.5 lg:px-4 lg:py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold bg-blue-600 shadow-[0_2px_10px_rgba(37,99,235,0.4)]'
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/70 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools: Search, Theme Toggle & Get Involved Button */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search website"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#080f1e]/90 backdrop-blur-xl border border-blue-100/90 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-sky-400 hover:bg-blue-50 dark:hover:bg-sky-950/60 flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer"
            >
              <Search size={16} className="group-hover:scale-110 transition-transform duration-300" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#080f1e]/90 backdrop-blur-xl border border-blue-100/90 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-sky-400 hover:bg-blue-50 dark:hover:bg-sky-950/60 flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon size={16} className="text-blue-600 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Get Involved Button */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 shadow-[0_4px_16px_rgba(2,132,199,0.35)] hover:shadow-[0_6px_22px_rgba(2,132,199,0.5)] hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span>Get Involved</span>
              <ArrowRight size={13} className="text-sky-200 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-full bg-white/90 dark:bg-[#080f1e]/90 border border-blue-100/90 dark:border-white/10 text-slate-800 dark:text-white hover:bg-blue-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => {
          setMobileOpen(false);
          setSearchOpen(true);
        }}
      />
    </>
  );
}
