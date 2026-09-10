'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Target,
  Users,
  MonitorPlay,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Globe,
  X,
  Sparkles,
  CheckCircle2,
  Layers,
  Leaf
} from 'lucide-react';

export default function DepartmentsPage() {
  const [activeModal, setActiveModal] = useState(null);

  const departments = [
    {
      id: "edu",
      name: "Department of Education",
      code: "EDU-UOK",
      stats: "Established Department",
      statsSub: "18+ Years Leadership",
      head: "Dr. Divya C. Senan",
      headRole: "(Associate Professor & Honorary Director)",
      desc: "Central department under University of Kerala conducting M.Ed, Ph.D coursework, and research in educational technology, curriculum modeling, and learning sciences.",
      badgeClass: "bg-emerald-50/80 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-[#a2d45e] dark:border-[#1e422c]",
      statsClass: "text-emerald-700 dark:text-[#a2d45e]",
      btnClass: "border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:border-[#1e422c] dark:text-[#a2d45e] dark:hover:bg-[#11261a]",
      headColor: "text-orange-600 dark:text-orange-400",
      iconImg: "/departments/e1.png",
      cornerImg: "/departments/e5.png",
      glowColor: "bg-emerald-400/30",
      highlights: [
        "M.Ed & Ph.D in Educational Technology & Pedagogy",
        "Curriculum Design & Quantitative Learning Analytics",
        "National Assessment & Accreditation Leadership",
        "Over 120+ Published Doctoral Dissertations"
      ],
      facilities: ["EdTech Sandbox Lab", "Instructional Design Studio", "Pedagogical Archive"],
      collaborations: "UGC, ICSSR, SIET Kerala, Kerala State Higher Education Council"
    },
    {
      id: "ai",
      name: "Learning Engineering & AI Pedagogy Division",
      code: "CLESE-AI",
      stats: "Collaborations with",
      statsSub: "IIT Mumbai & EdTech Society",
      head: "CLESE Research Core",
      headRole: "",
      desc: "Focuses on prompt engineering for educators, mathematical modeling in education, computing capabilities for career guidance, and AI-driven adaptive learning.",
      badgeClass: "bg-blue-50/80 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
      statsClass: "text-blue-700 dark:text-blue-400",
      btnClass: "border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-950/30",
      headColor: "text-orange-600 dark:text-orange-400",
      iconImg: "/departments/e2.png",
      cornerImg: "/departments/e6.png",
      glowColor: "bg-blue-400/30",
      highlights: [
        "GenAI & Prompt Engineering frameworks for teachers",
        "Adaptive testing algorithms & cognitive state modeling",
        "AI Ethics in K-12 and Higher Education pipelines",
        "Natural Language Processing for multilingual Kerala classrooms"
      ],
      facilities: ["AI Neural Pedagogics Cluster", "Adaptive Analytics Sandbox", "Virtual Tutor Studio"],
      collaborations: "IIT Bombay, EdTech Society of India, IEEE Education Chapter"
    },
    {
      id: "stem",
      name: "STEM Education & Experiential Labs Division",
      code: "CLESE-STEM",
      stats: "State Level SIET &",
      statsSub: "ICSSR Funded Programmes",
      head: "STEM Learning Lab Director",
      headRole: "",
      desc: "Operates dedicated STEM learning labs, robotics workbench kits, and mobile STEM experiential vans for 44+ rural schools and 41 educational districts across Kerala.",
      badgeClass: "bg-purple-50/80 text-purple-700 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50",
      statsClass: "text-purple-700 dark:text-purple-400",
      btnClass: "border-purple-200 text-purple-600 hover:bg-purple-50 dark:border-purple-900/50 dark:text-purple-400 dark:hover:bg-purple-950/30",
      headColor: "text-orange-600 dark:text-orange-400",
      iconImg: "/departments/e3.png",
      cornerImg: "/departments/e7.png",
      glowColor: "bg-purple-400/30",
      highlights: [
        "Mobile Experiential STEM Labs covering 41 Educational Sub-Districts",
        "Low-Cost Robotics & Sensor Kits for Rural Schools",
        "State Institute of Educational Technology (SIET) Training Modules",
        "Design Thinking Workshops for high school educators"
      ],
      facilities: ["Maker & FabLab Prototyping Space", "Sensory Science Station", "Mobile STEM Van Fleet"],
      collaborations: "State SIET, Samagra Shiksha Kerala, Vigyan Prasar"
    },
    {
      id: "sust",
      name: "Energy & Sustainability Education Division",
      code: "CLESE-SUST",
      stats: "International",
      statsSub: "MoU Partnership",
      head: "Clarkson US Bilateral Taskforce",
      headRole: "",
      desc: "Curriculum integration of zero-carbon literacy, solar energy simulation, and global interdependence in collaboration with Clarkson University, USA.",
      badgeClass: "bg-emerald-50/80 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-[#a2d45e] dark:border-[#1e422c]",
      statsClass: "text-emerald-700 dark:text-[#a2d45e]",
      btnClass: "border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:border-[#1e422c] dark:text-[#a2d45e] dark:hover:bg-[#11261a]",
      headColor: "text-orange-600 dark:text-orange-400",
      iconImg: "/departments/e4.png",
      cornerImg: "/departments/e8.png",
      glowColor: "bg-emerald-400/30",
      highlights: [
        "US-India Bilateral Climate Education Initiative",
        "Solar & Wind Micro-Grid educational simulators for schools",
        "Zero-Waste campus pedagogical framework",
        "Cross-continental student symposiums on ecological equity"
      ],
      facilities: ["Renewable Energy Simulation Suite", "Bioclimatic Classroom Lab", "Campus Eco-Station"],
      collaborations: "Clarkson University (USA), UNEP Youth Forum, Kerala Energy Management Centre"
    }
  ];

  const objectives = [
    { id: 1, icon: Users, desc: "Create educational environments to address career guidance and employability for all, irrespective of barriers." },
    { id: 2, icon: MonitorPlay, desc: "Build innovative digital tools that catalyse improvements in students learning." },
    { id: 3, icon: TrendingUp, desc: "Integrate AI, psychological principles, and computational methods to enhance aptitude development and employability skills." },
    { id: 4, icon: Globe, desc: "Create and support opportunities for learning about sustainability through coursework, research & engagement." },
    { id: 5, icon: Target, desc: "Improve opportunities to connect sustainability, equity, and global action with academic and co-curricular life." }
  ];

  return (
    <div className="relative min-h-screen bg-[#f3f5ed] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 overflow-hidden font-sans pb-28 pt-28 sm:pt-36 transition-colors duration-300 selection:bg-[#a2d45e]/30">

      {/* Liquid Glass Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] bg-[#e2edd8]/40 dark:bg-[#0f301d]/20 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-[#dbe8d0]/40 dark:bg-[#082214]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-cyan-300/10 dark:bg-cyan-950/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* 1. Hero Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-7 lg:pr-8 relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#0b1c14] border border-emerald-100 dark:border-[#183a27] shadow-sm mb-6 backdrop-blur-sm">
                  <BookOpen size={14} className="text-emerald-700 dark:text-[#a2d45e]" />
                  <span className="text-[11px] font-black tracking-widest text-emerald-700 dark:text-[#a2d45e] uppercase">
                    OUR ACADEMIC STRENGTH
                  </span>
                </div>

                <h1 className="font-serif text-5xl sm:text-6xl lg:text-[72px] font-normal text-[#1a2332] dark:text-white tracking-tight leading-[1.05]">
                  Academic <br />
                  <span className="italic text-[#15803d] dark:text-[#a2d45e]">
                    Departments
                  </span>
                </h1>
              </div>

              <p className="text-[#405245] dark:text-slate-300 text-[15px] sm:text-[16px] leading-relaxed max-w-[420px] font-normal">
                Academic departments and specialized research divisions under the Centre for Learning Engineering and Sustainability Education (CLESE).
              </p>

              <div className="pt-2">
                <div className="inline-flex items-center justify-between gap-6 p-2.5 pr-3 rounded-full bg-white/80 dark:bg-[#0b1c14]/80 backdrop-blur-xl border border-white/90 dark:border-[#183a27] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] group cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-all">
                  <div className="flex items-center gap-3 pl-2">
                    <div className="text-emerald-700 dark:text-[#a2d45e]">
                      <BookOpen size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-snug pr-4">
                      Knowledge that drives <br />learning and impact.
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white dark:bg-[#11261a] flex items-center justify-center shadow-sm border border-slate-100 dark:border-[#1e422c] text-slate-700 dark:text-[#a2d45e] group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] lg:h-[650px] flex items-center justify-end">
              <div className="absolute inset-0 right-[-5%] flex items-center justify-end pointer-events-none">
                <Image
                  src="/departments/hero.png"
                  alt="CLESE Eco-Campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain object-right"
                  priority
                />
              </div>
            </div>

          </div>
        </section>

        {/* 2. Section 2 Banner */}
        <section className="mb-14">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-emerald-50/90 dark:bg-[#0b1c14] border border-emerald-100/90 dark:border-[#183a27] backdrop-blur-sm shadow-sm">
              <span className="text-[11px] font-black tracking-[0.2em] text-[#15803d] dark:text-[#a2d45e] uppercase">
                SECTION 2 • INSTITUTIONAL DIVISIONS
              </span>
            </div>
            <p className="text-[14px] text-[#4d6052] dark:text-slate-300 font-medium max-w-2xl px-4 leading-relaxed">
              Our departments and research divisions work collaboratively to advance innovation, educator practice, and sustainability for a better future.
            </p>
          </div>
        </section>

        {/* 3. Grid of Cards */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {departments.map((dept) => (
              <div
                key={dept.id}
                className="group relative rounded-[36px] p-8 sm:p-10 bg-white/70 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border border-white/90 dark:border-[#183a27] shadow-[0_12px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col"
              >
                {/* Specular highlight */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-90" />

                {/* Faint watermark image */}
                <div className="absolute -bottom-2 -right-2 w-48 h-48 sm:w-64 sm:h-64 opacity-80 dark:opacity-40 pointer-events-none transition-transform duration-700 group-hover:scale-110 z-0 flex items-end justify-end">
                  <img src={dept.cornerImg} alt="" className="w-full h-full object-contain object-bottom object-right" />
                </div>

                {/* Top: Code and Stats */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <span className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${dept.badgeClass}`}>
                    {dept.code}
                  </span>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-0.5">{dept.stats}</p>
                    <p className={`text-[12px] font-bold ${dept.statsClass}`}>{dept.statsSub}</p>
                  </div>
                </div>

                {/* Middle: Icon & Title */}
                <div className="flex items-center gap-6 mb-6 relative z-10">
                  <div className="relative shrink-0">
                    <div className={`absolute inset-0 ${dept.glowColor} blur-2xl rounded-full scale-125`} />
                    <div className="w-24 h-24 rounded-full bg-white/90 dark:bg-[#11261a] backdrop-blur-xl border border-white dark:border-[#1e422c] shadow-sm flex items-center justify-center relative p-3 group-hover:scale-105 transition-transform">
                      <img src={dept.iconImg} alt={dept.name} className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-serif text-2xl lg:text-[26px] font-bold text-slate-900 dark:text-white leading-[1.1]">
                      {dept.name}
                    </h2>
                    <p className={`text-[11.5px] font-bold ${dept.headColor}`}>
                      Head/Lead: {dept.head} <br className="hidden sm:block mt-1" /> <span className="font-medium text-slate-500 dark:text-slate-400">{dept.headRole}</span>
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13.5px] text-[#4d6052] dark:text-slate-300 leading-relaxed max-w-[85%] relative z-10 mb-8 flex-1 font-normal">
                  {dept.desc}
                </p>

                {/* Bottom Action */}
                <div className="relative z-10 mt-auto">
                  <button
                    onClick={() => setActiveModal(dept)}
                    className={`inline-flex items-center gap-2 px-4.5 py-2 rounded-full border bg-white/80 dark:bg-[#11261a] backdrop-blur-sm text-[12px] font-black shadow-sm transition-colors cursor-pointer ${dept.btnClass}`}
                  >
                    <span className="px-1">View Details</span> <ArrowRight size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Objectives */}
        <section className="mb-12 relative z-10">
          <div className="rounded-[36px] p-8 sm:p-12 bg-white/70 dark:bg-[#0b1c14]/80 backdrop-blur-3xl border border-white/90 dark:border-[#183a27] shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
              <div className="flex items-center gap-3">
                <div className="text-emerald-600 dark:text-[#a2d45e]">
                  <Target size={28} strokeWidth={2} />
                </div>
                <h3 className="font-serif font-bold text-[28px] text-slate-900 dark:text-white">
                  Our Objectives
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#183a27] bg-white/50 dark:bg-[#11261a] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1e422c] transition-colors shadow-sm cursor-pointer">
                  <ChevronLeft size={18} />
                </button>
                <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-[#183a27] bg-white/50 dark:bg-[#11261a] flex items-center justify-center text-slate-800 dark:text-[#a2d45e] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1e422c] transition-colors shadow-sm cursor-pointer">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
              {objectives.map((obj, idx) => (
                <React.Fragment key={obj.id}>
                  <div className="flex-1 flex flex-col space-y-4">
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl font-serif font-bold text-emerald-600 dark:text-[#a2d45e]">{obj.id}</span>
                      <div className="w-11 h-11 rounded-full bg-white/90 dark:bg-[#11261a] border border-white dark:border-[#1e422c] flex items-center justify-center shadow-sm text-slate-600 dark:text-[#a2d45e]">
                        <obj.icon size={20} strokeWidth={1.5} />
                      </div>
                    </div>
                    <p className="text-[12px] text-[#4d6052] dark:text-slate-300 leading-relaxed font-medium">
                      {obj.desc}
                    </p>
                  </div>
                  {idx < objectives.length - 1 && (
                    <div className="hidden md:flex items-center h-12 px-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300/80 dark:bg-[#183a27]" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>
        </section>

      </div>

      {/* 5. Detailed Department Modal (Glassmorphic Popover) */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[36px] bg-white/95 dark:bg-[#0b1c14] backdrop-blur-3xl border border-white/80 dark:border-[#183a27] p-6 sm:p-8 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-[#11261a] hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all shadow-sm cursor-pointer"
              aria-label="Close details"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 pr-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-white/80 dark:bg-[#11261a] p-2 shadow-sm border border-slate-100 dark:border-[#1e422c]">
                <img src={activeModal.iconImg} alt={activeModal.name} className="w-12 h-12 object-contain" />
              </div>
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border mb-1 ${activeModal.badgeClass}`}>
                  {activeModal.code}
                </span>
                <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
                  {activeModal.name}
                </h3>
              </div>
            </div>

            {/* Leadership Box */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25">
              <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                Division Leadership: <span className="font-medium text-slate-700 dark:text-slate-200">{activeModal.head} {activeModal.headRole}</span>
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModal.desc}
            </p>

            {/* Key Focus & Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-500 dark:text-[#a2d45e]" />
                Key Focus &amp; Strategic Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModal.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#11261a] border border-slate-200/60 dark:border-[#1e422c] text-xs text-slate-700 dark:text-slate-200 font-medium">
                    <CheckCircle2 size={15} className="text-emerald-500 dark:text-[#a2d45e] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities & Infrastructure */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center gap-1.5">
                <Layers size={14} className="text-teal-500 dark:text-[#a2d45e]" />
                Specialized Laboratories &amp; Studios
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModal.facilities.map((fac, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-[#11261a] text-[#15803d] dark:text-[#a2d45e] text-xs font-semibold border border-emerald-200 dark:border-[#1e422c]">
                    {fac}
                  </span>
                ))}
              </div>
            </div>

            {/* Institutional Collaborations */}
            <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-[#11261a]/60 border border-slate-200 dark:border-[#1e422c] text-xs">
              <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                Institutional Collaborators &amp; Partners:
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                {activeModal.collaborations}
              </p>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-full bg-slate-200 dark:bg-[#11261a] hover:bg-slate-300 dark:hover:bg-[#1e422c] text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/academics"
                className="px-5 py-2.5 rounded-full bg-[#15803d] dark:bg-[#154628] hover:bg-emerald-600 dark:hover:bg-[#1c5c34] text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>View Academic Programs</span>
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
