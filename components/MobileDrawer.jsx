'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Info, 
  Calendar, 
  Megaphone,
  BookOpen,
  FileText, 
  Mail, 
  X, 
  ChevronRight,
  ArrowRight,
  Users,
  MapPin
} from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

export default function MobileDrawer({ isOpen, onClose }) {
  const pathname = usePathname();

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const navItems = [
    { href: '/', label: 'Home', icon: Home, desc: 'LEnSE Portal Overview' },
    { href: '/about', label: 'About Us', icon: Info, desc: 'Vision, Objectives & Centre' },
    { href: '/events', label: 'Events & Conferences', icon: Calendar, desc: 'Workshops, Symposia & Talks' },
    { href: '/initiatives', label: 'Initiatives & Outreach', icon: Megaphone, desc: 'State-wide School STEM Camps' },
    { href: '/resources', label: 'Academic Resources', icon: BookOpen, desc: 'Courseware, Toolkits & Downloads' },
    { href: '/news', label: 'News & Announcements', icon: FileText, desc: 'Latest Updates & Press Releases' },
    { href: '/contact', label: 'Contact Us', icon: Mail, desc: "Director's Office & Kariavattom Campus" }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#040e24]/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Mobile Navigation Drawer - Edge-docked, full-height navbar drawer (not a centered popup) */}
      <div 
        className="w-full sm:w-[420px] max-w-full h-full min-h-[100dvh] bg-gradient-to-b from-[#f2f7ff] via-[#eaf2fc] to-[#d8e8fc] text-slate-800 sm:border-l sm:border-white/80 shadow-[-12px_0_50px_rgba(26,109,255,0.22)] flex flex-col justify-between p-4 sm:p-5 relative overflow-hidden animate-in slide-in-from-right duration-300 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Visual Element 1: Soft Translucent Blue Ribbons at Top Right */}
        <svg 
          className="absolute -top-10 -right-10 w-72 h-72 pointer-events-none opacity-50" 
          viewBox="0 0 300 300" 
          fill="none"
        >
          <path d="M40 0 C140 70, 220 110, 300 80 L300 0 Z" fill="url(#mobileWave1)" />
          <path d="M100 0 C170 100, 230 160, 300 220 L300 0 Z" fill="url(#mobileWave2)" />
          <defs>
            <linearGradient id="mobileWave1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="mobileWave2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </svg>

        {/* Background Visual Element 2: Left Dot Grid Matrix */}
        <div className="absolute left-1.5 top-[38%] pointer-events-none opacity-30 flex gap-1.5 z-0">
          {[...Array(3)].map((_, col) => (
            <div key={col} className="flex flex-col gap-1.5">
              {[...Array(14)].map((_, row) => (
                <span key={row} className="w-1 h-1 rounded-full bg-blue-600/70 block" />
              ))}
            </div>
          ))}
        </div>

        {/* Background Visual Element 3: Bottom Campus Building Watermark */}
        <div className="absolute bottom-0 left-0 right-0 h-52 pointer-events-none overflow-hidden z-0">
          <img 
            src="/campus_building.jpg" 
            alt="" 
            className="w-full h-full object-cover object-bottom opacity-30 mix-blend-multiply filter contrast-125" 
          />
          {/* Subtle gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#d8e8fc] via-[#d8e8fc]/70 to-transparent" />
          {/* Curved blue wave line at bottom */}
          <svg className="absolute bottom-0 left-0 right-0 w-full h-24 opacity-40" viewBox="0 0 400 100" fill="none" preserveAspectRatio="none">
            <path d="M0 45 C120 10, 260 85, 400 30 L400 100 L0 100 Z" fill="url(#bottomBlueWave)" />
            <defs>
              <linearGradient id="bottomBlueWave" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Scrollable Main Flow */}
        <div className="relative z-10 flex-1 overflow-y-auto scrollbar-none pr-0.5 space-y-3">
          {/* Header Row: Circular Logo Emblem, Brand Title, Portal Badge, University & Close Button */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Circular White Emblem */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white shadow-[0_4px_16px_rgba(37,99,235,0.12)] border border-blue-50/80 p-2 sm:p-2.5 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="LEnSE Logo" className="w-full h-full object-contain" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span style={SERIF} className="text-xl sm:text-2xl font-medium tracking-tight text-slate-800 leading-none">
                    LEnSE
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#dbeafe] text-[9px] sm:text-[9.5px] font-bold tracking-wider text-[#1d4ed8] uppercase leading-none">
                    PORTAL
                  </span>
                </div>
                <span className="text-[9px] sm:text-[9.5px] font-semibold tracking-[0.16em] uppercase text-slate-400 block mt-1">
                  UNIVERSITY OF KERALA
                </span>
              </div>
            </div>

            {/* Circular Frosted Close Button */}
            <button 
              onClick={onClose} 
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/80 backdrop-blur-md shadow-xs border border-white/80 text-slate-600 hover:bg-white hover:text-[#1d63ed] flex items-center justify-center transition-all cursor-pointer group"
              aria-label="Close navigation"
            >
              <X size={18} strokeWidth={2.2} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>

          {/* Accent Divider: Pip Dot & Thin Progress Track */}
          <div className="flex items-center gap-1.5 px-0.5 pt-0.5">
            <div className="w-2 h-2 rounded-full bg-[#1d63ed] shadow-[0_0_8px_rgba(29,99,237,0.7)] shrink-0" />
            <div className="h-[1.5px] flex-1 bg-gradient-to-r from-blue-300/60 via-blue-200/40 to-transparent rounded-full" />
          </div>

          {/* Section Indicator */}
          <div className="flex items-center gap-2 px-0.5 pt-0.5 pb-0.5">
            <div className="w-[3px] h-3.5 bg-[#1d63ed] rounded-full" />
            <span className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Navigation Menu
            </span>
          </div>

          {/* Navigation Items (Home to Contact Us) */}
          <div className="space-y-1.5 sm:space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

              if (isActive) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-[#1b62ec] via-[#2467f5] to-[#38bdf8] text-white shadow-[0_10px_25px_rgba(27,98,236,0.38)] rounded-[1.25rem] sm:rounded-[1.35rem] px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between relative overflow-hidden group transition-all"
                  >
                    {/* Subtle diagonal gloss streak */}
                    <div className="absolute -top-12 -left-12 w-48 h-32 bg-white/20 rotate-45 pointer-events-none filter blur-sm" />

                    <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 text-white shadow-inner">
                        <Icon size={19} strokeWidth={1.8} className="text-white" />
                      </div>
                      <div className="flex flex-col text-left min-w-0">
                        <span className="text-[13.5px] sm:text-[14px] font-semibold text-white tracking-tight leading-snug">
                          {item.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-normal text-sky-100 leading-tight mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>

                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 ml-2">
                      <ChevronRight size={14} strokeWidth={2.4} className="text-white" />
                    </div>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={onClose}
                  className="w-full bg-white/75 backdrop-blur-md border border-white/90 shadow-[0_2px_8px_rgba(37,99,235,0.03)] hover:bg-white hover:shadow-[0_4px_16px_rgba(37,99,235,0.08)] rounded-[1.25rem] sm:rounded-[1.35rem] px-3 sm:px-3.5 py-2 sm:py-2.5 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-blue-50/80 flex items-center justify-center text-[#1d63ed] shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={19} strokeWidth={1.8} className="text-[#1d63ed]" />
                    </div>
                    <div className="flex flex-col text-left min-w-0">
                      <span className="text-[13.5px] sm:text-[14px] font-semibold text-slate-800 tracking-tight leading-snug group-hover:text-[#1d63ed] transition-colors">
                        {item.label}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-normal text-slate-400 leading-tight mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>

                  <ChevronRight size={15} strokeWidth={2} className="text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                </Link>
              );
            })}
          </div>

          {/* GET INVOLVED Highlight Button - immediately following the items stack */}
          <div className="pt-1">
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full bg-gradient-to-r from-[#1b62ec] via-[#2467f5] to-[#38bdf8] hover:from-[#1855cc] hover:to-[#2ca5dd] text-white shadow-[0_12px_28px_rgba(27,98,236,0.42)] rounded-[1.3rem] sm:rounded-[1.4rem] p-2.5 sm:p-3.5 flex items-center gap-3 relative overflow-hidden transition-all active:scale-[0.98] group cursor-pointer"
            >
              {/* Gloss glare */}
              <div className="absolute -top-12 -left-12 w-48 h-32 bg-white/20 rotate-45 pointer-events-none filter blur-sm" />

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 text-white shadow-inner group-hover:scale-105 transition-transform">
                <Users size={20} strokeWidth={1.9} className="text-white" />
              </div>

              <div className="flex flex-col text-left min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12.5px] sm:text-[13.5px] font-bold tracking-wider uppercase text-white font-sans">
                    GET INVOLVED
                  </span>
                  <ArrowRight size={13} strokeWidth={2.4} className="text-white group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[9.5px] sm:text-[10.5px] text-sky-100 font-medium tracking-wide block mt-0.5">
                  Collaborate • Participate • Make an Impact
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Area: Overlaid over the bottom campus building facade */}
        <div className="relative z-10 pt-4 pb-1 shrink-0 flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
            <MapPin size={13} className="text-[#1d63ed] shrink-0" strokeWidth={2.4} />
            <span className="text-[10px] sm:text-[10.5px] font-medium tracking-tight">
              Kariavattom Campus, Thiruvananthapuram
            </span>
          </div>

          {/* Circular White Badge with Red Acrobat / Brochure PDF Emblem */}
          <Link
            href="/resources"
            onClick={onClose}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-pointer group ml-2"
            title="Academic Resources & Brochure"
            aria-label="Download LEnSE Brochure and Documents"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 text-[#e5252a] fill-current drop-shadow-xs" aria-hidden="true">
              <path d="M13.882 17.546c.995 1.944 2.215 3.536 3.03 3.536.568 0 .973-.414.973-1.096 0-1.428-1.677-3.957-4.003-2.44zm-3.764-1.956c-1.344.896-3.292 1.93-4.52 2.12-.662.102-.998-.184-.998-.67 0-1.053 1.838-2.23 5.518-1.45zm2.128-2.584c-.456-1.57-1.077-4.14-1.077-5.59 0-1.077.412-1.517.973-1.517.587 0 .95.467.95 1.272 0 1.543-.39 4.225-.846 5.835zm8.908.625c-.276-.79-1.454-2.164-3.57-2.674-.633-.153-1.282-.228-1.927-.228-.68 0-1.35.085-1.996.252-.406-1.512-.693-3.26-.693-4.567 0-2.025-.92-3.414-2.615-3.414-1.576 0-2.533 1.264-2.533 3.197 0 1.927.487 4.545 1.135 6.425-2.88 1.176-6.23 2.825-7.054 4.887-.417 1.04-.33 2.158.243 3.067.625.99 1.684 1.528 2.898 1.528 2.392 0 5.127-1.848 7.37-4.116 1.884 1.28 3.864 2.122 5.378 2.122 1.802 0 3.076-1.072 3.076-2.946 0-1.73-.896-2.87-2.712-3.533z"/>
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
