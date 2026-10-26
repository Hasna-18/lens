'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Info, 
  Calendar, 
  Newspaper, 
  FileText, 
  Mail, 
  X, 
  Search, 
  ChevronRight,
  Sparkles, 
  ArrowRight,
  Globe
} from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

export default function MobileDrawer({ isOpen, onClose, onOpenSearch }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home, desc: 'LEnSE Portal Overview' },
    { href: '/about', label: 'About Us', icon: Info, desc: 'Vision, Objectives & Centre' },
    { href: '/events', label: 'Events & Conferences', icon: Calendar, desc: 'Workshops, Symposia & Talks' },
    { href: '/initiatives', label: 'Initiatives & Outreach', icon: Sparkles, desc: 'State-wide School STEM Camps' },
    { href: '/resources', label: 'Academic Resources', icon: FileText, desc: 'Courseware, Toolkits & Downloads' },
    { href: '/news', label: 'News & Announcements', icon: Newspaper, desc: 'Latest Updates & Press Releases' },
    { href: '/contact', label: 'Contact Us', icon: Mail, desc: 'Director’s Office & Kariavattom Campus' }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#040e24]/60 backdrop-blur-md flex justify-end animate-in fade-in duration-200" 
      onClick={onClose}
    >
      <div 
        className="w-[340px] max-w-[88vw] h-full bg-gradient-to-b from-white/95 via-[#f0f6ff]/95 to-[#e6efff]/95 dark:from-[#081026]/95 dark:via-[#060c1d]/95 dark:to-[#030712]/95 backdrop-blur-2xl text-slate-800 dark:text-slate-100 p-5 sm:p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(26,109,255,0.25)] overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-white/90 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-5">
          
          {/* Header with Official Logo, Title & Close Button */}
          <div className="flex items-center justify-between border-b border-blue-100/80 dark:border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white dark:bg-[#0c1938] border border-blue-100 dark:border-white/15 p-1.5 flex items-center justify-center shadow-[0_4px_16px_rgba(26,109,255,0.15)] shrink-0">
                <img src="/logo.png" alt="LEnSE Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span style={SERIF} className="text-xl font-normal text-slate-900 dark:text-white block leading-none">
                    LEnSE
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[9px] font-bold tracking-wider text-[#1a6dff] dark:text-sky-400 border border-blue-200/60 dark:border-blue-500/30 uppercase">
                    Portal
                  </span>
                </div>
                <span className="text-[10px] font-medium tracking-[0.14em] uppercase text-slate-400 dark:text-slate-400 block mt-1">
                  University of Kerala
                </span>
              </div>
            </div>
            
            <button 
              onClick={onClose} 
              className="w-9 h-9 rounded-full bg-white/90 dark:bg-white/10 border border-blue-100 dark:border-white/15 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-white/20 hover:text-[#1a6dff] flex items-center justify-center transition-all shadow-xs group cursor-pointer"
              aria-label="Close menu"
            >
              <X size={17} className="group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>


          {/* Navigation Items List */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a6dff] dark:text-sky-400 px-3 block mb-2">
              Navigation Menu
            </span>
            <ul className="space-y-1.5 list-none p-0 m-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all duration-200 group ${
                        isActive
                          ? 'bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] text-white shadow-[0_8px_20px_rgba(26,109,255,0.35)] font-semibold'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-white/90 dark:hover:bg-white/10 hover:text-[#1a6dff] border border-transparent hover:border-blue-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-blue-50 dark:bg-white/10 text-[#1a6dff] dark:text-sky-400 border border-blue-100/80 dark:border-white/10 shadow-xs'
                        }`}>
                          <Icon size={16} strokeWidth={1.8} />
                        </div>
                        <div className="flex flex-col text-left min-w-0">
                          <span className="text-[13px] leading-snug truncate">{item.label}</span>
                          <span className={`text-[10px] font-normal leading-tight truncate ${
                            isActive ? 'text-sky-100' : 'text-slate-400 dark:text-slate-500'
                          }`}>
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={14} className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${
                        isActive ? 'text-white' : 'text-slate-300 dark:text-slate-600'
                      }`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Footer Area with Primary CTA & Campus citation */}
        <div className="pt-5 border-t border-blue-100/80 dark:border-white/10 mt-6 space-y-3">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] hover:from-blue-600 hover:to-sky-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-[0_10px_24px_rgba(26,109,255,0.35)] hover:scale-[1.02] active:scale-98"
          >
            <span>Get Involved</span>
            <ArrowRight size={13} />
          </Link>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-medium pt-1 text-center">
            <Globe size={11} className="text-[#1a6dff]" />
            <span>Kariavattom Campus, Thiruvananthapuram</span>
          </div>
        </div>

      </div>
    </div>
  );
}
