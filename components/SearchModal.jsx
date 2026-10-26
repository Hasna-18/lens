'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, X, Home, Info, ShieldCheck, Building2, UserCheck, 
  Calendar, Newspaper, Image as ImageIcon, BookOpen, Mail, ArrowRight, Sparkles 
} from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Core Navigation Pages aligned with LEnSE portal
  const searchItems = [
    { title: 'Home', category: 'Main Portal', href: '/', icon: Home, desc: 'Centre for Learning Engineering & STEM Education overview, vision, and project scope' },
    { title: 'About Us', category: 'Institutional', href: '/about', icon: Info, desc: 'LEnSE establishment, core objectives, research leadership & collaborations' },
    { title: 'Events & Conferences', category: 'Programs', href: '/events', icon: Calendar, desc: '4th SIET Conference, Prompt Engineering lectures, STEM camps & workshops' },
    { title: 'Initiatives & Outreach', category: 'Outreach', href: '/initiatives', icon: Sparkles, desc: 'STEM 4 Girls ICSSR launch, SIET 44 schools project & state-wide education camps' },
    { title: 'Academic Resources', category: 'Academics', href: '/resources', icon: BookOpen, desc: 'Curriculum framework, research toolkits, publications & downloadable courseware' },
    { title: 'News & Announcements', category: 'Media', href: '/news', icon: Newspaper, desc: 'Latest updates, campus press releases, faculty highlights & notifications' },
    { title: 'Contact & Location', category: 'Office', href: '/contact', icon: Mail, desc: 'Director’s Office, University of Kerala Kariavattom Campus & lenseedu24@gmail.com' }
  ];

  const filteredItems = searchItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (href) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search size={22} className="text-[#1a6dff] shrink-0" />
          <input
            type="text"
            placeholder="Search LEnSE pages, programs, events, resources, news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 font-medium text-base outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <X size={18} />
            </button>
          )}
          <button 
            onClick={onClose} 
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.href)}
                  className="group flex items-start gap-3.5 p-3 sm:p-3.5 rounded-2xl hover:bg-blue-50/70 dark:hover:bg-slate-800/80 cursor-pointer transition-all border border-transparent hover:border-blue-200/60 dark:hover:border-blue-500/30"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1a6dff] dark:text-sky-400 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#0a6cff] group-hover:to-[#1fa2ff] group-hover:text-white transition-all shadow-2xs">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-[#1a6dff] dark:group-hover:text-sky-400 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-white/10 text-[#1a6dff] dark:text-sky-300">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{item.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-[#1a6dff] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-500">
              <Sparkles size={32} className="mx-auto mb-2 text-blue-400/50" />
              <p className="text-sm font-semibold">No pages matching &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for &quot;Events&quot;, &quot;Initiatives&quot;, &quot;Resources&quot;, or &quot;Contact&quot;</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 px-5">
          <span>LEnSE • University of Kerala</span>
          <span className="flex items-center gap-1 font-semibold text-[#1a6dff] dark:text-sky-400">
            Click to navigate
          </span>
        </div>
      </div>
    </div>
  );
}
