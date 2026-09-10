'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';
import MobileDrawer from './MobileDrawer';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
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
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 py-5 pointer-events-none transition-all duration-300">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">

          {/* Left Brand with Logo & Title */}
          <Link href="/" className="pointer-events-auto flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt="CLESE Logo"
              className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_12px_rgba(162,212,94,0.3)] transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Center Navigation Capsule */}
          <nav className="pointer-events-auto hidden lg:flex items-center gap-1 xl:gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border border-[#dce6dd] dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === '/programs' && pathname === '/academics');

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 text-xs font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-[#132418] dark:text-white font-semibold bg-[#eaf1e4] dark:bg-white/10 shadow-inner'
                      : 'text-[#455748] dark:text-slate-300 hover:text-[#132418] dark:hover:text-white hover:bg-[#eaf1e4]/50 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-[3px] bg-[#2d5a3c] dark:bg-cyan-400 rounded-full shadow-[0_0_10px_#2d5a3c] dark:shadow-[0_0_10px_#22d3ee,0_0_5px_#22d3ee]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools: Theme Toggle & Explore Button */}
          <div className="pointer-events-auto flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="w-10 h-10 rounded-full bg-white/80 dark:bg-[#0b1c14]/80 backdrop-blur-xl border border-[#dce6dd] dark:border-white/15 text-[#132418] dark:text-slate-300 hover:text-[#1b3726] dark:hover:text-white hover:border-[#2d5a3c] dark:hover:border-[#a2d45e] hover:bg-[#eaf1e4] dark:hover:bg-[#133524] flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun size={17} className="text-[#a2d45e] group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon size={17} className="text-[#1b3726] group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Get Involved Button */}
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#143021] to-[#0d2217] dark:from-[#143021] dark:to-[#0d2217] hover:from-[#1b3d2b] hover:to-[#122e1f] border border-[#2d5c3f] hover:border-[#428159] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(20,48,33,0.3)] dark:shadow-[0_0_20px_rgba(20,48,33,0.6)] group"
            >
              <span>Get Involved</span>
              <ArrowRight size={14} className="text-[#a2d45e] group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-full bg-white/80 dark:bg-[#0b1c14]/80 border border-[#dce6dd] dark:border-white/10 text-[#132418] dark:text-white hover:bg-[#eaf1e4] dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => {
          setMobileOpen(false);
        }}
      />
    </>
  );
}
