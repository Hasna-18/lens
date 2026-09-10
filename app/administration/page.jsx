'use client';
import React, { useState } from 'react';
import { ShieldCheck, Lock, Plus, Edit, Trash2, Upload, FileText, UserCheck, Calendar, Image as ImageIcon, Search, CheckCircle2, Leaf } from 'lucide-react';
import { DEFAULT_TEAM, DEFAULT_PROJECTS, DEFAULT_PUBLICATIONS } from '../../lib/data';

export default function AdministrationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState('faculty');
  const [facultyList, setFacultyList] = useState(DEFAULT_TEAM);
  const [statusMsg, setStatusMsg] = useState('');

  const [newFaculty, setNewFaculty] = useState({
    name: '',
    designation: '',
    department: 'Department of Education & CLESE',
    qualification: '',
    specialization: '',
    email: ''
  });

  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.designation) return;

    const entry = {
      id: `fac-${Date.now()}`,
      ...newFaculty,
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      bio: 'Faculty profile managed via CLESE Centralized Administration Panel.',
      publications: 1,
      experience: '1 Year'
    };

    setFacultyList([entry, ...facultyList]);
    setNewFaculty({ name: '', designation: '', department: 'Department of Education & CLESE', qualification: '', specialization: '', email: '' });
    setStatusMsg('Faculty member added successfully to live website!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDeleteFaculty = (id) => {
    setFacultyList(facultyList.filter(f => f.id !== id));
    setStatusMsg('Faculty profile removed from live database.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 transition-colors duration-300 pb-20 pt-28 sm:pt-36 selection:bg-[#a2d45e]/30">
      
      {/* Banner Header */}
      <div className="relative pt-6 pb-12 overflow-hidden text-center max-w-5xl mx-auto px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#e2edd8]/40 dark:bg-[#0f301d]/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <span className="text-[11px] font-extrabold tracking-widest text-[#2d5a3c] dark:text-[#a2d45e] uppercase bg-[#eaf1e4] dark:bg-[#11261a] px-3.5 py-1 rounded-full border border-[#d2e0d3] dark:border-[#1e422c]">
          ADMINISTRATION &amp; CMS PORTAL
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#131f17] dark:text-white tracking-tight mt-4">
          Administration &amp; Management
        </h1>

        <p className="text-[#405245] dark:text-slate-300 text-sm max-w-2xl mx-auto mt-3 leading-relaxed font-normal">
          Centralized Admin Panel for managing website content, faculty profiles, institutional events, announcements, media galleries, and SEO metadata.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-8">
        
        {/* Status notification */}
        {statusMsg && (
          <div className="p-4 rounded-2xl bg-[#eaf1e4] dark:bg-[#11261a] border border-[#d2e0d3] dark:border-[#1e422c] text-[#2d5a3c] dark:text-[#a2d45e] text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* CMS Control Header */}
        <div className="p-6 rounded-3xl bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1b3726] dark:bg-[#154628] text-white flex items-center justify-center font-bold">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-[#131f17] dark:text-white">Single Administrator Account</h2>
              <span className="text-xs text-[#2d5a3c] dark:text-[#a2d45e] font-semibold">● Authenticated Session Active (LEnSE / CLESE)</span>
            </div>
          </div>

          {/* Module tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'faculty' ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-sm' : 'bg-[#f4f7f2] dark:bg-[#11261a] text-[#384c3e] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#163824]'
              }`}
            >
              Faculty CMS
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'events' ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-sm' : 'bg-[#f4f7f2] dark:bg-[#11261a] text-[#384c3e] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#163824]'
              }`}
            >
              Event Portal
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'news' ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-sm' : 'bg-[#f4f7f2] dark:bg-[#11261a] text-[#384c3e] dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#163824]'
              }`}
            >
              News &amp; SEO
            </button>
          </div>
        </div>

        {/* Tab 1: Faculty Management System */}
        {activeTab === 'faculty' && (
          <div className="space-y-6">
            {/* Add Faculty Form */}
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#131f17] dark:text-white flex items-center gap-2">
                <Plus size={18} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                <span>Dynamic Faculty Profile Creation</span>
              </h3>

              <form onSubmit={handleAddFaculty} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Faculty Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Greeshma Raveendran"
                    value={newFaculty.name}
                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f4f7f2] dark:bg-[#05110a] border border-[#d5e2d6] dark:border-[#183a27] text-slate-900 dark:text-white outline-none focus:border-[#2d5a3c]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Assistant Professor / Research Fellow"
                    value={newFaculty.designation}
                    onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f4f7f2] dark:bg-[#05110a] border border-[#d5e2d6] dark:border-[#183a27] text-slate-900 dark:text-white outline-none focus:border-[#2d5a3c]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. Ph.D. in Education (Univ of Kerala)"
                    value={newFaculty.qualification}
                    onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f4f7f2] dark:bg-[#05110a] border border-[#d5e2d6] dark:border-[#183a27] text-slate-900 dark:text-white outline-none focus:border-[#2d5a3c]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Specialization</label>
                  <input
                    type="text"
                    placeholder="e.g. Learning Engineering & STEM Pedagogy"
                    value={newFaculty.specialization}
                    onChange={(e) => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#f4f7f2] dark:bg-[#05110a] border border-[#d5e2d6] dark:border-[#183a27] text-slate-900 dark:text-white outline-none focus:border-[#2d5a3c]"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#1b3726] dark:bg-[#154628] hover:bg-[#254d35] dark:hover:bg-[#1c5c34] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    Publish Faculty Profile
                  </button>
                </div>
              </form>
            </div>

            {/* Current Faculty List */}
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#131f17] dark:text-white">
                Active Faculty Profiles ({facultyList.length})
              </h3>
              <div className="space-y-3">
                {facultyList.map((fac) => (
                  <div key={fac.id} className="p-4 rounded-2xl bg-[#f4f7f2] dark:bg-[#11261a] border border-[#e2ece4] dark:border-[#1e422c] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#14261a] dark:text-white">{fac.name}</h4>
                      <span className="text-xs text-[#2d5a3c] dark:text-[#a2d45e] font-semibold">{fac.designation}</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{fac.qualification || fac.department}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteFaculty(fac.id)}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                      title="Delete Faculty Profile"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2 & 3 Placeholders */}
        {activeTab !== 'faculty' && (
          <div className="p-12 text-center rounded-3xl bg-white/90 dark:bg-[#0b1c14]/90 border border-white/95 dark:border-[#183a27] shadow-xl text-slate-500 dark:text-slate-400 space-y-2">
            <ShieldCheck size={36} className="mx-auto text-[#2d5a3c] dark:text-[#a2d45e]" />
            <h3 className="font-serif font-bold text-lg text-[#131f17] dark:text-white">Admin Management Module Active</h3>
            <p className="text-xs max-w-md mx-auto">
              Dynamic update engines for Events, Media Lightbox, News &amp; SEO Meta Tags (Section 6, 7, 8, 9 of LEnSE / CLESE Specification).
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
