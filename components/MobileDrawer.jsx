'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Info, ShieldCheck, Building2, UserCheck, Calendar, 
  Newspaper, Image as ImageIcon, BookOpen, Mail, X, Search, ChevronRight, Lock,
  Sparkles, FileText, Leaf, ArrowRight
} from 'lucide-react';

export default function MobileDrawer({ isOpen, onClose, onOpenSearch }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home, desc: 'LEnSE Portal Overview' },
    { href: '/about', label: 'About Us', icon: Info, desc: 'Vision, Objectives & Centre' },
    { href: '/events', label: 'Events & Conferences', icon: Calendar, desc: 'Conferences & Workshops' },
    { href: '/initiatives', label: 'Initiatives & Outreach', icon: Sparkles, desc: 'State-wide School STEM Camps' },
    { href: '/projects', label: 'Research & Projects', icon: Leaf, desc: 'Grants & Global Collaborations' },
    { href: '/resources', label: 'Academic Resources', icon: FileText, desc: 'Courseware, Toolkits & Downloads' },
    { href: '/news', label: 'News & Insights', icon: Newspaper, desc: 'Announcements & Media Features' },
    { href: '/gallery', label: 'Media & Gallery', icon: ImageIcon, desc: 'Dynamic Image Collections' },
    { href: '/faculty', label: 'Faculty Profiles', icon: UserCheck, desc: 'Academic Leadership' },
    { href: '/contact', label: 'Contact & Location', icon: Mail, desc: 'University of Kerala Campus' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#07170e]/80 dark:bg-black/80 backdrop-blur-md flex justify-end" onClick={onClose}>
      <div 
        className="w-84 max-w-[88vw] h-full bg-[#f3f5ed] dark:bg-[#08180f] text-[#19241c] dark:text-slate-100 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-250 border-l border-white/80 dark:border-[#183a27]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          
          {/* Header & Close */}
          <div className="flex items-center justify-between border-b border-[#d8e5d9] dark:border-[#183a27] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1b3726] dark:bg-[#11261a] text-white dark:text-[#a2d45e] flex items-center justify-center shadow-xs">
                <Leaf size={18} />
              </div>
              <div>
                <span className="font-serif font-bold text-base text-[#122016] dark:text-white block leading-tight">
                  LEnSE Portal
                </span>
                <span className="text-[9.5px] font-bold text-[#2d5a3c] dark:text-[#a2d45e] tracking-wider block uppercase">
                  University of Kerala
                </span>
              </div>
            </div>
            
            <button 
              onClick={onClose} 
              className="p-2 rounded-xl bg-white dark:bg-[#0b1c14] border border-[#d5e2d6] dark:border-[#183a27] text-[#14261a] dark:text-white hover:bg-[#eaf1e4] dark:hover:bg-[#122c1e] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Items List */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#556758] dark:text-[#a2d45e] px-2 block mb-2">
              Menu Navigation
            </span>
            <ul className="space-y-1 list-none p-0 m-0">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#1b3726] text-white dark:bg-[#143d24] dark:text-[#a2d45e] shadow-md'
                          : 'text-[#2a3c2e] dark:text-slate-300 hover:bg-white dark:hover:bg-[#0f281b] hover:text-[#1b3726] dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isActive ? 'bg-white/20 text-white dark:bg-[#a2d45e]/20 dark:text-[#a2d45e]' : 'bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e]'}`}>
                          <Icon size={15} />
                        </div>
                        <div className="flex flex-col text-left">
                          <span>{item.label}</span>
                          <span className={`text-[9.5px] font-medium leading-tight ${isActive ? 'text-[#c2dfcb] dark:text-slate-300' : 'text-[#637667] dark:text-slate-400'}`}>
                            {item.desc}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={14} className={isActive ? 'text-white dark:text-[#a2d45e]' : 'text-[#829687] dark:text-slate-500'} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Footer Action Button */}
        <div className="pt-6 border-t border-[#d8e5d9] dark:border-[#183a27] mt-6 space-y-3">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full py-3 px-4 rounded-full bg-[#1b3726] dark:bg-[#154628] hover:bg-[#254d35] dark:hover:bg-[#1b5531] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Get Involved</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
