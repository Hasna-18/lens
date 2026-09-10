'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Leaf,
  GraduationCap,
  Mail,
  Award,
  BookOpen,
  Sparkles,
  Globe,
  Building2,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Search,
  School
} from 'lucide-react';

export default function FacultyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Divya C. Senan",
      photo: "/events/events_book_plant.jpg",
      designation: "Director & Associate Professor",
      department: "Learning Engineering & STEM Education",
      qualification: "Ph.D. in Education (Univ. of Kerala), Postdoc (Univ. of Alabama in Huntsville, USA)",
      specialization: "Learning Engineering, STEM Pedagogy, Climate & Energy Literacy, AI Computational Modeling",
      contact: "lenseedu24@gmail.com",
      bio: "Director of the Centre for Learning Engineering and Sustainability Education (LEnSE) and Associate Professor at the Department of Education, University of Kerala. Fulbright-Nehru & UGC-Raman Postdoctoral Fellow with over 18 years of academic leadership.",
      honors: ["Fulbright-Nehru Postdoctoral Fellow (USA)", "UGC-Raman Fellow", "National Educator Innovation Award"]
    },
    {
      id: 2,
      name: "Prof. Jan De Waters",
      photo: "/events/events_globe_books.jpg",
      designation: "Honorary International Visiting Scholar",
      department: "International STEM Collaboration & Clean Tech",
      qualification: "Ph.D. in Environmental Science & Engineering (Clarkson University, USA)",
      specialization: "International STEM Collaboration, Energy Literacy Benchmarks, Clean Technology Pedagogy",
      contact: "jwaters@clarkson.edu",
      bio: "Directs international academic engagement between Clarkson University USA and LEnSE University of Kerala. Served as Chief Guest at the 4th SIET International Conference on Educational Technology.",
      honors: ["Chief Guest, 4th SIET International Conference 2025", "Clarkson STEM Leadership Award"]
    },
    {
      id: 3,
      name: "Ms. Greeshma Raveendran",
      photo: "/events/scholar.jpg",
      designation: "Research Fellow & Extended Course Developer",
      department: "Technology-Enabled Pedagogy",
      qualification: "M.Ed, M.A. English Literature",
      specialization: "Technology-Enabled Instruction, FYUGP Extended Learning Courseware, Literary Pedagogy",
      contact: "lenseedu24@gmail.com",
      bio: "Developed the two-month course on 'Selected Literary Terms' for FYUGP Semester II learners under University of Kerala, integrating interactive video lessons, quizzes, and technology-enabled assessments.",
      honors: ["FYUGP Digital Courseware Innovation Award", "LEnSE Pedagogy Research Fellow"]
    },
    {
      id: 4,
      name: "Dr. Briju Tankachan",
      photo: "/events/workshop.jpg",
      designation: "Visiting Academic & EdTech Advisor",
      department: "Educational Technology & AI",
      qualification: "Ph.D. in Instructional Technology",
      specialization: "Prompt Engineering, Generative AI for Higher Education, Instructional Quality Improvement",
      contact: "lenseedu24@gmail.com",
      bio: "Executive Director of EdTech Society and Visiting Professor at IIT Mumbai. Leads specialized research on prompt engineering and generative AI frameworks for university educators.",
      honors: ["EdTech Leadership Award", "IIT Mumbai Visiting Fellow"]
    }
  ];

  const filteredFaculty = facultyMembers.filter(member => {
    const matchesDept = selectedDept === 'All' || member.department.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesSearch = searchQuery === '' ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 pt-28 sm:pt-36 relative overflow-hidden selection:bg-[#a2d45e]/30 transition-colors duration-300">

      {/* Ambient glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] -left-40 w-[600px] h-[600px] bg-[#e2edd8]/40 dark:bg-[#0f301d]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-8 w-[650px] h-[650px] bg-[#dbe8d0]/40 dark:bg-[#082214]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">

        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <div className="relative">

          {/* Hero Visual on Right */}
          <div className="absolute top-0 right-0 w-full lg:w-[56%] h-[460px] sm:h-[520px] pointer-events-none z-0 rounded-l-[4rem] overflow-hidden select-none hidden lg:block">
            <img
              src="/home/bg.png"
              alt="LEnSE Faculty & Leadership"
              className="w-full h-full object-cover object-center scale-[1.03]"
              onError={(e) => {
                e.currentTarget.src = "/events/events_book_plant.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f3f5ed] dark:from-[#031008] via-[#f3f5ed]/80 dark:via-[#031008]/85 via-[20%] to-transparent to-[55%]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f3f5ed] dark:from-[#031008] via-[#f3f5ed]/60 dark:via-[#031008]/60 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#f3f5ed] dark:from-[#031008] to-transparent" />
          </div>

          {/* Left Content */}
          <div className="relative z-10 max-w-xl space-y-5 pt-2 pb-6">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#485b4d] dark:text-slate-400">
              <Leaf size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
              <Link href="/" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">Home</Link>
              <span className="text-[#879b8c] dark:text-slate-500">&gt;</span>
              <span className="text-[#1b3726] dark:text-[#a2d45e] font-bold">Faculty &amp; Leadership</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-normal text-[#122016] dark:text-white leading-[1.1] tracking-tight font-serif">
              Faculty Profiles &amp;<br />
              <span className="italic text-[#243d2c] dark:text-[#a2d45e]">Academic Leadership</span>
            </h1>

            <p className="text-[#405245] dark:text-slate-300 text-sm sm:text-[14.5px] leading-[1.7] max-w-lg font-normal">
              Meet the educators, researchers, and visiting scholars leading learning engineering, STEM innovations, and sustainability curricula at LEnSE.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-md">
              <div className="p-3 rounded-2xl bg-white/85 dark:bg-[#0b1c14]/85 border border-[#dce6dd] dark:border-[#183a27] shadow-xs text-center">
                <span className="block text-xl font-serif font-bold text-[#14261a] dark:text-white">18+</span>
                <span className="block text-[10px] text-[#556758] dark:text-slate-400 font-medium">Years Leadership</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/85 dark:bg-[#0b1c14]/85 border border-[#dce6dd] dark:border-[#183a27] shadow-xs text-center">
                <span className="block text-xl font-serif font-bold text-[#14261a] dark:text-white">20+</span>
                <span className="block text-[10px] text-[#556758] dark:text-slate-400 font-medium">Indexed Papers</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/85 dark:bg-[#0b1c14]/85 border border-[#dce6dd] dark:border-[#183a27] shadow-xs text-center">
                <span className="block text-xl font-serif font-bold text-[#14261a] dark:text-white">Global</span>
                <span className="block text-[10px] text-[#556758] dark:text-slate-400 font-medium">Fellowships</span>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. SEARCH & FILTER CONTROLS */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2">

          {/* Department Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
            {['All', 'Learning Engineering', 'STEM Collaboration', 'Technology-Enabled Pedagogy'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedDept === dept
                    ? 'bg-[#1b3726] dark:bg-[#154628] text-white shadow-sm'
                    : 'bg-white/80 dark:bg-[#0b1c14]/80 hover:bg-white dark:hover:bg-[#11261a] text-[#384c3e] dark:text-slate-300 border border-[#dbe6dc] dark:border-[#183a27]'
                  }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7f9484] dark:text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-[#0b1c14] border border-[#d5e2d6] dark:border-[#183a27] text-xs font-medium text-[#19241c] dark:text-white placeholder:text-[#7f9484] dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2d5a3c]/30 shadow-xs"
            />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. FACULTY CARDS GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              className="rounded-[2.2rem] bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-xl border border-white/95 dark:border-[#183a27] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-lg hover:-translate-y-1 hover:bg-white dark:hover:bg-[#10271c] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">

                {/* Header Profile Row */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#05110a] border border-[#e2ece4] dark:border-[#1e422c] shrink-0 shadow-xs">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.src = "/events/events_book_plant.jpg"; }}
                    />
                  </div>

                  <div className="space-y-1 flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#eaf1e4] dark:bg-[#11261a] text-[#2d5a3c] dark:text-[#a2d45e] text-[9.5px] font-bold uppercase tracking-wider">
                      {member.department}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-[#14261a] dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#4d6052] dark:text-slate-300">
                      {member.designation}
                    </p>
                  </div>
                </div>

                {/* Qualification & Specialization */}
                <div className="space-y-2 pt-2 border-t border-[#f0f4ef] dark:border-[#183a27] text-xs">
                  <div>
                    <span className="text-[11px] font-bold text-[#19241c] dark:text-white block">Qualification:</span>
                    <p className="text-[#556758] dark:text-slate-400 leading-snug">{member.qualification}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#19241c] dark:text-white block">Specialization:</span>
                    <p className="text-[#556758] dark:text-slate-400 leading-snug">{member.specialization}</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#19241c] dark:text-white block">Professional Bio:</span>
                    <p className="text-[#485b4e] dark:text-slate-300 leading-relaxed text-[12.5px]">{member.bio}</p>
                  </div>
                </div>

                {/* Honors & Fellowships */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {member.honors.map((h, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#f4f7f2] dark:bg-[#11261a] border border-[#e2ece4] dark:border-[#1e422c] text-[10.5px] text-[#334637] dark:text-[#a2d45e] font-medium flex items-center gap-1">
                      <Award size={12} className="text-[#2d5a3c] dark:text-[#a2d45e]" />
                      <span className="dark:text-slate-200">{h}</span>
                    </span>
                  ))}
                </div>

              </div>

              {/* Footer Contact */}
              <div className="pt-4 border-t border-[#f0f4ef] dark:border-[#183a27] mt-4 flex items-center justify-between">
                <a
                  href={`mailto:${member.contact}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1b3726] dark:text-[#a2d45e] hover:text-[#2d5a3c] transition-colors"
                >
                  <Mail size={14} />
                  <span>{member.contact}</span>
                </a>

                <Link href="/contact" className="w-8 h-8 rounded-full bg-[#f4f7f2] dark:bg-[#11261a] group-hover:bg-[#1b3726] dark:group-hover:bg-[#a2d45e] group-hover:text-white dark:group-hover:text-[#031008] text-[#1b3726] dark:text-[#a2d45e] flex items-center justify-center transition-colors shadow-xs">
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
