'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, Sun, Moon, Search } from 'lucide-react';
import MobileDrawer from './MobileDrawer';
import SearchModal from './SearchModal';

import { prefetchEndpoint } from '../lib/clientCache';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);

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

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Support open event or ?nav=1 param
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('nav')) {
      setMobileOpen(true);
    }
    const handleOpen = () => setMobileOpen(true);
    window.addEventListener('open-mobile-nav', handleOpen);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('open-mobile-nav', handleOpen);
    };
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
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/initiatives', label: 'Initiatives' },
    { href: '/resources', label: 'Resources' },
    { href: '/news', label: 'News' },
    { href: '/contact', label: 'Contact' }
  ];

  const handlePrefetch = (href) => {
    if (href === '/events') {
      prefetchEndpoint('/api/events', 'clese_events_cache');
    } else if (href === '/initiatives') {
      prefetchEndpoint('/api/initiatives', 'clese_initiatives_cache');
    } else if (href === '/news') {
      prefetchEndpoint('/api/news', 'clese_news_cache');
    } else if (href === '/resources') {
      prefetchEndpoint('/api/resources', 'clese_resources_cache');
    }
  };

  return (
    <>
      {/* Floating Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 pointer-events-none transition-all duration-300 ${scrolled ? 'py-2.5 sm:py-3' : 'py-3.5 sm:py-4.5'}`}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">

          {/* Left Brand with Logo */}
          <Link href="/" className="pointer-events-auto flex items-center gap-2.5 shrink-0 group">
            <img
              src="/logo.png"
              alt="LEnSE Logo"
              className="h-9 sm:h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.35)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Center Navigation Capsule - White Glass Capsule Starts Before Home & Ends After Contact */}
          <nav className="pointer-events-auto hidden lg:flex items-center gap-1.5 xl:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/90 dark:bg-[#080f1e]/90 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_8px_30px_rgba(2,132,199,0.08),inset_0_1.5px_2px_#fff] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.08)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/programs' && pathname === '/academics');

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={true}
                  onMouseEnter={() => handlePrefetch(link.href)}
                  onTouchStart={() => handlePrefetch(link.href)}
                  className={`relative px-3.5 py-1.5 lg:px-4 xl:px-4.5 text-[13px] lg:text-[13.5px] xl:text-[14px] font-medium tracking-wide rounded-full transition-all duration-200 ease-out active:scale-95 select-none whitespace-nowrap ${
                    isActive
                      ? 'text-white font-semibold bg-gradient-to-r from-blue-600 via-blue-600 to-sky-600 shadow-[0_2px_10px_rgba(37,99,235,0.38)]'
                      : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50/80 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools: Search, Theme Toggle, Get Involved Button & Mobile Trigger */}
          <div className="pointer-events-auto flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Search Trigger Button */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search website"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#080f1e]/90 backdrop-blur-xl border border-white/80 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-sky-400 hover:bg-blue-50 dark:hover:bg-sky-950/60 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Search size={16} />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#080f1e]/90 backdrop-blur-xl border border-white/80 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-sky-400 hover:bg-blue-50 dark:hover:bg-sky-950/60 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-sky-400 group-hover:rotate-45 transition-transform duration-200" />
              ) : (
                <Moon size={16} className="text-blue-600 group-hover:-rotate-12 transition-transform duration-200" />
              )}
            </button>

            {/* Get Involved Button */}
            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-1.5 px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-[12.5px] sm:text-[13px] font-semibold tracking-wide transition-all duration-200 shadow-[0_3px_14px_rgba(2,132,199,0.38)] hover:shadow-[0_5px_18px_rgba(2,132,199,0.5)] hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span>Get Involved</span>
              <ArrowRight size={13} className="text-sky-200 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Mobile Hamburger Button (visible on screens < lg) */}
            <button
              id="mobile-menu-button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 dark:bg-[#080f1e]/90 backdrop-blur-xl border border-white/80 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white hover:border-blue-300 dark:hover:border-sky-400 hover:bg-blue-50 dark:hover:bg-sky-950/60 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={17} className="text-blue-600 dark:text-sky-400" />
              ) : (
                <Menu size={17} />
              )}
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
