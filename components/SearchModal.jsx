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

  // 10 Primary Pages from CLESE Specification PDF
  const searchItems = [
    { title: 'Home Page', category: 'Primary Page', href: '/', icon: Home, desc: 'CLESE Academic Portal overview, vision, and project scope' },
    { title: 'About the Institution', category: 'Primary Page', href: '/about', icon: Info, desc: 'CLESE 2024 establishment, 5 core objectives & collaborations' },
    { title: 'Administration', category: 'Primary Page', href: '/administration', icon: ShieldCheck, desc: 'Single Administrator (CLESE) CMS panel & SEO management' },
    { title: 'Departments', category: 'Primary Page', href: '/departments', icon: Building2, desc: 'Learning Engineering, STEM Education & Sustainability divisions' },
    { title: 'Faculty', category: 'Primary Page', href: '/faculty', icon: UserCheck, desc: 'Dynamic Faculty Management System, Dr. Divya C. Senan & scholars' },
    { title: 'Events', category: 'Primary Page', href: '/events', icon: Calendar, desc: '4th SIET Conference, Prompt Engg lecture, STEM camps & workshops' },
    { title: 'News & Announcements', category: 'Primary Page', href: '/news', icon: Newspaper, desc: 'STEM 4 Girls ICSSR launch, SIET 44 schools project & FYUGP course' },
    { title: 'Media / Gallery', category: 'Primary Page', href: '/gallery', icon: ImageIcon, desc: 'Dynamic image gallery, photo collections & event media' },
    { title: 'Academic Information', category: 'Primary Page', href: '/academics', icon: BookOpen, desc: 'Portal framework, degree courses, M.Ed/Ph.D learning engineering' },
    { title: 'Contact', category: 'Primary Page', href: '/contact', icon: Mail, desc: 'University of Kerala Kariavattom Campus address & lenseedu24@gmail.com' }
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
          <Search size={22} className="text-amber-500 shrink-0" />
          <input
            type="text"
            placeholder="Search CLESE 10 primary pages, faculty, events, news..."
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
                  className="group flex items-start gap-3.5 p-3 sm:p-3.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-all border border-transparent hover:border-amber-400/30"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-outfit font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{item.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-500">
              <Sparkles size={32} className="mx-auto mb-2 text-amber-500/50" />
              <p className="text-sm font-semibold">No pages matching &quot;{query}&quot;</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for &quot;Faculty&quot;, &quot;Events&quot;, &quot;News&quot;, or &quot;Administration&quot;</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 px-5">
          <span>CLESE • University of Kerala (10 Primary Pages)</span>
          <span className="flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
            Click to navigate
          </span>
        </div>
      </div>
    </div>
  );
}
