'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Search, X, Copy, ExternalLink, Check, BookOpen, Leaf } from 'lucide-react';
import { DEFAULT_PUBLICATIONS, getStoredData } from '../../lib/data';
import { useToast } from '../../components/Toast';

export default function PublicationsPage() {
  const { showToast } = useToast();
  const [publications, setPublications] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    setPublications(getStoredData('publications', DEFAULT_PUBLICATIONS));
  }, []);

  const categories = ['All', 'Journals', 'Conferences', 'Books'];

  const filteredPubs = publications.filter((pub) => {
    const matchesCategory = activeCategory === 'All' || pub.category === activeCategory;
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyCitation = (pub) => {
    const text = `${pub.authors} (${pub.year}). "${pub.title}." ${pub.journal}. ${pub.doi}`;
    navigator.clipboard.writeText(text);
    setCopiedId(pub.id);
    showToast('APA Citation copied to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">
      
      {/* Top Hero Section */}
      <div className="relative pb-12 overflow-hidden text-center max-w-5xl mx-auto px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[#e2edd8]/40 dark:bg-[#0f301d]/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400 mb-3">
          <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
          <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
          <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
          <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold">Research Publications</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl font-normal text-[#131f17] dark:text-white tracking-tight mt-2">
          Academic <span className="italic text-[#243d2c] dark:text-[#a2d45e]">Publications</span>
        </h1>

        <p className="text-[#405245] dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mt-3 leading-relaxed font-normal">
          Explore our publications showcasing research, insights, and innovations that advance education, sustainability, and inclusive learning practices.
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6 space-y-8">
        <div className="text-left border-b border-[#e2ece4] dark:border-[#183a27] pb-4">
          <h2 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white">Publications Collection</h2>
          <p className="text-xs text-[#556758] dark:text-slate-400 mt-1">
            Discover our curated collection of academic publications that reflect innovative research and impactful findings.
          </p>
        </div>

        {/* Control Bar */}
        <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-sm'
                    : 'bg-[#f4f7f2] dark:bg-[#11261a] text-[#384c3e] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#1e422c]'
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-3 text-[#7f9484] dark:text-slate-400" />
            <input
              type="text"
              placeholder="Search papers or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#f4f7f2] dark:bg-[#05110a] border border-[#d5e2d6] dark:border-[#183a27] text-slate-900 dark:text-white text-xs placeholder:text-[#889d8f] dark:placeholder-slate-500 focus:outline-none focus:border-[#2d5a3c]"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 cursor-pointer">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredPubs.map((pub) => (
            <div
              key={pub.id}
              className="p-6 rounded-[2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-center min-w-[70px] p-2.5 rounded-xl bg-[#eaf1e4] dark:bg-[#11261a] border border-[#d2e0d3] dark:border-[#1e422c] shrink-0">
                  <span className="font-serif font-bold text-xl text-[#14261a] dark:text-white block">{pub.year}</span>
                  <span className="text-[10px] font-bold text-[#2d5a3c] dark:text-[#a2d45e] uppercase block">{pub.category}</span>
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#14261a] dark:text-white leading-snug">{pub.title}</h3>
                  <p className="text-xs text-[#485b4e] dark:text-slate-300 font-medium">{pub.authors}</p>
                  <p className="text-xs text-[#637667] dark:text-slate-400 italic">{pub.journal}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => copyCitation(pub)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#f4f7f2] dark:bg-[#11261a] hover:bg-slate-200 dark:hover:bg-[#1e422c] border border-[#d5e2d6] dark:border-[#183a27] text-xs font-bold text-[#14261a] dark:text-[#a2d45e] transition-colors cursor-pointer"
                >
                  {copiedId === pub.id ? <Check size={14} className="text-emerald-600 dark:text-[#a2d45e]" /> : <Copy size={14} />}
                  <span>{copiedId === pub.id ? 'Copied' : 'Cite APA'}</span>
                </button>

                <a
                  href={pub.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b3726] dark:bg-[#154628] hover:bg-[#254d35] dark:hover:bg-[#1c5c34] text-xs font-bold text-white shadow-sm transition-all"
                >
                  <span>DOI</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredPubs.length === 0 && (
          <div className="text-center p-12 rounded-2xl bg-white/90 dark:bg-[#0b1c14]/90 border border-white/95 dark:border-[#183a27] shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400">No publications found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
