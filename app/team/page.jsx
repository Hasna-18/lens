'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Mail, Award, BookOpen, Sparkles, X, Phone, Leaf } from 'lucide-react';
import { DEFAULT_TEAM, DEFAULT_DIRECTOR, getStoredData } from '../../lib/data';

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const [director, setDirector] = useState(DEFAULT_DIRECTOR);
  const [selectedMember, setSelectedMember] = useState(null);

  // Category indices for sliders
  const [associateIndex, setAssociateIndex] = useState(0);
  const [postdocIndex, setPostdocIndex] = useState(0);
  const [scholarIndex, setScholarIndex] = useState(0);

  useEffect(() => {
    setTeam(getStoredData('team', DEFAULT_TEAM));
  }, []);

  // Filter team members into categories
  const associates = [
    {
      name: "Ajai K.",
      role: "Project Associate",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      bio: "Contributes to LEnSE experiential lab modules & rural STEM outreach deployment across secondary schools in Kerala.",
      email: "lenseedu24@gmail.com"
    },
    {
      name: "Prof. Marcus Sterling",
      role: "Associate Professor",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      bio: "Directs the Advanced Robotics & Automation Facility. Specializes in mechatronics and adaptive learning engineering.",
      email: "lenseedu24@gmail.com"
    }
  ];

  const postdocs = [
    {
      name: "Dr. Shila Jasmine L S",
      role: "Postdoctoral Research Fellow",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      bio: "Specializes in environmental education policy, climate literacy frameworks, and gender-responsive STEM pedagogy.",
      email: "lenseedu24@gmail.com"
    },
    {
      name: "Dr. Aris Thorne",
      role: "Postdoctoral Research Chair",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      bio: "Leads research in AI analytics, predictive learning engineering models, and digital classroom metrics.",
      email: "lenseedu24@gmail.com"
    }
  ];

  const internationalScholars = [
    {
      name: "Ann Liliana Escarraga Forero",
      role: "International Doctoral Scholar",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
      bio: "Visiting research scholar from Colombia investigating cross-cultural energy literacy and inclusive digital learning.",
      email: "lenseedu24@gmail.com"
    },
    {
      name: "Dr. Elena Rostova",
      role: "Visiting Research Fellow",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600",
      bio: "Focuses on bio-remediation literacy and sustainable environmental policy in higher education curricula.",
      email: "lenseedu24@gmail.com"
    }
  ];

  const doctoralScholars = [
    {
      name: "Greeshma Raveendran",
      role: "Doctoral Research Scholar",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
      bio: "Researching interactive physics simulation kits and cognitive learning outcomes in secondary education.",
      email: "lenseedu24@gmail.com"
    },
    {
      name: "Divya Martin",
      role: "Senior Research Fellow",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      bio: "Investigating teacher capacity building frameworks and energy literacy integration in vocational training.",
      email: "lenseedu24@gmail.com"
    }
  ];

  const allTeamMembers = [...team, ...associates, ...postdocs, ...internationalScholars, ...doctoralScholars];

  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">
      
      {/* Top Glow & Hero Section */}
      <div className="relative pb-12 overflow-hidden text-center max-w-5xl mx-auto px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#e2edd8]/40 dark:bg-[#0f301d]/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400 mb-3">
          <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
          <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
          <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
          <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold">Academic Community</span>
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#131f17] dark:text-white tracking-tight mt-2">
          Academic <span className="italic text-[#243d2c] dark:text-[#a2d45e]">Team</span>
        </h1>

        <p className="text-[#405245] dark:text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mt-3 leading-relaxed font-normal">
          The multidisciplinary team of professors, postdoctoral fellows, international scholars, and research associates leading educational engineering and sustainability research.
        </p>
      </div>

      {/* Featured Director Card */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="relative p-6 sm:p-10 rounded-[2.5rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-full md:w-72 h-72 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-[#1e422c] shrink-0">
            <img
              src={director.photo}
              alt={director.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
            />
            <span className="absolute bottom-3 left-3 bg-[#1b3726] dark:bg-[#a2d45e] text-white dark:text-[#031008] text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider shadow">
              HONORARY DIRECTOR
            </span>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <h2 className="font-serif font-bold text-3xl text-[#14261a] dark:text-white">{director.name}</h2>
              <span className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-[#eaf1e4] dark:bg-[#11261a] px-2.5 py-0.5 rounded-md inline-block mt-1">
                Honorary Director, LEnSE
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#405245] dark:text-slate-300 leading-relaxed font-normal">
              {director.bio}
            </p>

            <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#f0f4ef] dark:border-[#183a27] text-center">
              <div>
                <span className="font-serif font-bold text-xl text-[#14261a] dark:text-white block">20+</span>
                <span className="text-[10px] text-[#637667] dark:text-slate-400 font-bold uppercase tracking-wider block">Research Papers</span>
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-[#14261a] dark:text-white block">18+</span>
                <span className="text-[10px] text-[#637667] dark:text-slate-400 font-bold uppercase tracking-wider block">Years Experience</span>
              </div>
            </div>

            <a
              href="mailto:lenseedu24@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1b3726] dark:bg-[#154628] hover:bg-[#254d35] dark:hover:bg-[#1c5c34] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Mail size={14} />
              <span>Contact Director</span>
            </a>
          </div>
        </div>
      </div>

      {/* Categorized Showcase Sections */}
      <div className="max-w-4xl mx-auto px-6 space-y-20">
        {/* Section 1: Project Associates */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e2ece4] dark:border-[#183a27] pb-3">
            <h2 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white flex items-center gap-2">
              <span>Project Associates</span>
            </h2>
            <span className="text-xs text-[#637667] dark:text-slate-400 font-semibold">01 / 02</span>
          </div>

          <div className="p-6 sm:p-8 rounded-[2.2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-64 h-64 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-[#1e422c] shrink-0">
              <img
                src={associates[associateIndex].photo}
                alt={associates[associateIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 text-left flex-1">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white">{associates[associateIndex].name}</h3>
                <span className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-[#eaf1e4] dark:bg-[#11261a] px-2.5 py-0.5 rounded-md inline-block mt-1">
                  {associates[associateIndex].role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#405245] dark:text-slate-300 leading-relaxed font-normal">
                {associates[associateIndex].bio}
              </p>
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedMember(associates[associateIndex])}
                  className="px-4 py-2 rounded-xl bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] text-xs font-bold hover:bg-slate-200 dark:hover:bg-[#1e422c] transition-colors cursor-pointer"
                >
                  Read Bio
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAssociateIndex((prev) => (prev === 0 ? associates.length - 1 : prev - 1))}
                    className="w-9 h-9 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#1b3726] dark:hover:bg-[#a2d45e] hover:text-white dark:hover:text-[#031008] transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={() => setAssociateIndex((prev) => (prev === associates.length - 1 ? 0 : prev + 1))}
                    className="w-9 h-9 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#1b3726] dark:hover:bg-[#a2d45e] hover:text-white dark:hover:text-[#031008] transition-colors cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Postdoctoral Fellows */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e2ece4] dark:border-[#183a27] pb-3">
            <h2 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white flex items-center gap-2">
              <span>Postdoctoral Fellows</span>
            </h2>
            <span className="text-xs text-[#637667] dark:text-slate-400 font-semibold">01 / 02</span>
          </div>

          <div className="p-6 sm:p-8 rounded-[2.2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-64 h-64 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-[#1e422c] shrink-0">
              <img
                src={postdocs[postdocIndex].photo}
                alt={postdocs[postdocIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 text-left flex-1">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white">{postdocs[postdocIndex].name}</h3>
                <span className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-[#eaf1e4] dark:bg-[#11261a] px-2.5 py-0.5 rounded-md inline-block mt-1">
                  {postdocs[postdocIndex].role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#405245] dark:text-slate-300 leading-relaxed font-normal">
                {postdocs[postdocIndex].bio}
              </p>
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedMember(postdocs[postdocIndex])}
                  className="px-4 py-2 rounded-xl bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] text-xs font-bold hover:bg-slate-200 dark:hover:bg-[#1e422c] transition-colors cursor-pointer"
                >
                  Read Bio
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPostdocIndex((prev) => (prev === 0 ? postdocs.length - 1 : prev - 1))}
                    className="w-9 h-9 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#1b3726] dark:hover:bg-[#a2d45e] hover:text-white dark:hover:text-[#031008] transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={() => setPostdocIndex((prev) => (prev === postdocs.length - 1 ? 0 : prev + 1))}
                    className="w-9 h-9 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#1b3726] dark:hover:bg-[#a2d45e] hover:text-white dark:hover:text-[#031008] transition-colors cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Doctoral Scholars */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#e2ece4] dark:border-[#183a27] pb-3">
            <h2 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white flex items-center gap-2">
              <span>Doctoral Research Scholars</span>
            </h2>
            <span className="text-xs text-[#637667] dark:text-slate-400 font-semibold">01 / 02</span>
          </div>

          <div className="p-6 sm:p-8 rounded-[2.2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] shadow-xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-64 h-64 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-[#1e422c] shrink-0">
              <img
                src={doctoralScholars[scholarIndex].photo}
                alt={doctoralScholars[scholarIndex].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 text-left flex-1">
              <div>
                <h3 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white">{doctoralScholars[scholarIndex].name}</h3>
                <span className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-[#eaf1e4] dark:bg-[#11261a] px-2.5 py-0.5 rounded-md inline-block mt-1">
                  {doctoralScholars[scholarIndex].role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#405245] dark:text-slate-300 leading-relaxed font-normal">
                {doctoralScholars[scholarIndex].bio}
              </p>
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setSelectedMember(doctoralScholars[scholarIndex])}
                  className="px-4 py-2 rounded-xl bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] text-xs font-bold hover:bg-slate-200 dark:hover:bg-[#1e422c] transition-colors cursor-pointer"
                >
                  Read Bio
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScholarIndex((prev) => (prev === 0 ? doctoralScholars.length - 1 : prev - 1))}
                    className="w-9 h-9 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#1b3726] dark:hover:bg-[#a2d45e] hover:text-white dark:hover:text-[#031008] transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <button
                    onClick={() => setScholarIndex((prev) => (prev === doctoralScholars.length - 1 ? 0 : prev + 1))}
                    className="w-9 h-9 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] text-[#14261a] dark:text-[#a2d45e] flex items-center justify-center hover:bg-[#1b3726] dark:hover:bg-[#a2d45e] hover:text-white dark:hover:text-[#031008] transition-colors cursor-pointer"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Horizontal Team Member Carousel */}
      <div className="max-w-6xl mx-auto px-6 mt-24 space-y-6">
        <div className="text-center space-y-1">
          <h3 className="font-serif font-bold text-2xl text-[#14261a] dark:text-white">All Academic Members</h3>
          <p className="text-xs text-[#556758] dark:text-slate-400">Explore researchers, associate professors, and visiting scholars</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allTeamMembers.slice(0, 5).map((m, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMember(m)}
              className="group cursor-pointer p-4 rounded-2xl bg-white/90 dark:bg-[#0b1c14]/90 border border-white/95 dark:border-[#183a27] shadow-sm hover:shadow-lg transition-all duration-300 text-center space-y-3 flex flex-col items-center justify-between"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2d5a3c] dark:border-[#a2d45e] shadow-xs group-hover:scale-105 transition-transform">
                <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#14261a] dark:text-white group-hover:text-[#2d5a3c] dark:group-hover:text-[#a2d45e] transition-colors">{m.name}</h4>
                <span className="text-[10px] font-bold text-[#2d5a3c] dark:text-[#a2d45e] bg-[#eaf1e4] dark:bg-[#11261a] px-2 py-0.5 rounded inline-block mt-1">
                  {m.role || m.designation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-[#0d2216]/80 dark:bg-black/85 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <div className="p-6 sm:p-8 rounded-[2rem] bg-white dark:bg-[#0b1c14] border border-white/90 dark:border-[#183a27] max-w-lg w-full space-y-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#2d5a3c] dark:border-[#a2d45e] shrink-0 shadow-xs">
                  <img src={selectedMember.photo} alt={selectedMember.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#14261a] dark:text-white">{selectedMember.name}</h3>
                  <p className="text-xs font-bold text-[#2d5a3c] dark:text-[#a2d45e]">{selectedMember.role || selectedMember.designation}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="p-2 rounded-xl bg-[#f4f7f2] dark:bg-[#11261a] text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#f4f7f2] dark:bg-[#11261a] space-y-2 text-xs">
              <p className="text-[#405245] dark:text-slate-300"><strong className="text-[#14261a] dark:text-white">Email:</strong> {selectedMember.email}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#2d5a3c] dark:text-[#a2d45e]">Biography &amp; Academic Background</h4>
              <p className="text-xs text-[#405245] dark:text-slate-300 leading-relaxed font-normal">{selectedMember.bio}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
