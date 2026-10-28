'use client';
import React from 'react';
import Link from 'next/link';
import {
    ArrowRight, Sparkles, Users, User, GraduationCap, Globe, Monitor, Atom,
    Landmark, Heart, FileText, BookOpen, Leaf, CheckCircle2,
    ChevronLeft, ChevronRight, Settings, Gem, MapPin, Mail,
    Tag, UsersRound, Cpu, Brain, Award, Calendar, Layers, Compass, ExternalLink,
} from 'lucide-react';

/* ---------- shared tokens ---------- */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const BLUE = 'text-blue-600 dark:text-sky-400';
const GLASS =
    'bg-gradient-to-br from-white/85 via-sky-50/65 to-blue-100/40 backdrop-blur-xl border border-white/90 shadow-[0_18px_45px_rgba(37,99,235,0.08),inset_0_1px_0_rgba(255,255,255,1)]';

const Wrap = ({ children, className = '' }) => (
    <div className={`relative max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
);

const Em = ({ children, light = false }) => (
    <em style={SERIF} className={`italic font-normal ${light ? 'text-sky-300' : 'text-blue-600 dark:text-sky-400'}`}>{children}</em>
);

function SectionTag({ number, text, light = false, circle = false }) {
    return (
        <div className="flex items-center gap-3 select-none">
            {number && (circle ? (
                <span style={SERIF} className="w-10 h-10 rounded-full bg-white/15 border border-white/40 backdrop-blur text-white flex items-center justify-center text-xl">{number}</span>
            ) : (
                <span style={SERIF} className="text-[26px] italic text-slate-400/90 -ml-1 font-light">{number}</span>
            ))}
            <span className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-sky-300' : 'bg-blue-600'}`} />
                <span className={`text-[11px] font-bold tracking-[0.22em] uppercase ${light ? 'text-sky-200' : 'text-blue-600 dark:text-sky-400'}`}>{text}</span>
            </span>
        </div>
    );
}

function Dots({ rows = 5, cols = 10, className = '' }) {
    return (
        <div className={`grid gap-2 pointer-events-none select-none ${className}`} style={{ gridTemplateColumns: `repeat(${cols}, 3px)` }}>
            {Array.from({ length: rows * cols }).map((_, i) => (
                <span key={i} className="w-[3px] h-[3px] rounded-full bg-sky-400/60" />
            ))}
        </div>
    );
}

const ArrowBtn = ({ className = '' }) => (
    <span className={`w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.35)] ${className}`}>
        <ArrowRight size={13} />
    </span>
);

const PillBtn = ({ href, children }) => (
    <Link href={href} className="inline-flex">
        <span className="px-6 py-3 rounded-full bg-white/90 border border-white shadow-[0_10px_24px_rgba(37,99,235,0.12)] text-blue-600 text-xs font-bold uppercase tracking-wider flex items-center gap-3 hover:scale-[1.03] transition">
            {children}<ArrowRight size={13} />
        </span>
    </Link>
);

/* ---------- hero: silky ocean streaks ---------- */
function OceanWaves() {
    const colors = ['#ffffff', '#7dd3fc', '#0284c7', '#2563eb', '#bae6fd', '#0369a1'];
    const streaks = Array.from({ length: 40 }, (_, i) => ({
        d: `M -150 ${20 + i * 14} C 250 ${-80 + i * 12}, 650 ${240 - i * 3}, 1350 ${60 + i * 16}`,
        c: colors[(i * 5) % colors.length],
        w: 5 + ((i * 7) % 26),
        o: 0.25 + ((i * 13) % 50) / 100,
    }));
    return (
        <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none">
            <defs>
                <linearGradient id="ocean-base" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#eaf6ff" />
                    <stop offset="0.45" stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#1d4ed8" />
                </linearGradient>
                <filter id="ocean-blur"><feGaussianBlur stdDeviation="8" /></filter>
            </defs>
            <rect width="1200" height="600" fill="url(#ocean-base)" />
            <g filter="url(#ocean-blur)">
                {streaks.map((s, i) => (
                    <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} opacity={s.o} strokeLinecap="round" />
                ))}
            </g>
        </svg>
    );
}

function Hero() {
    return (
        <section className="relative overflow-hidden min-h-[calc(100vh-70px)] sm:min-h-screen flex flex-col justify-center py-20 sm:py-24">
            <div className="absolute inset-y-0 right-0 w-full lg:w-[75%]">
                <OceanWaves />
                <div className="absolute inset-0 bg-gradient-to-r from-[#f4f8ff] via-[#f4f8ff]/70 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f8ff] via-[#f4f8ff]/85 to-transparent pointer-events-none" />
            {/* decorative ring + dots on the left edge */}
            <div className="hidden lg:block absolute -left-[270px] top-[22%] w-[320px] h-[320px] rounded-full border border-sky-400/50" />
            <div className="hidden lg:block absolute left-[80px] top-[60%] w-2.5 h-2.5 rounded-full bg-blue-600" />
            <Dots rows={8} cols={5} className="hidden lg:grid absolute left-3 bottom-16" />

            <Wrap className="w-full relative z-10 my-auto">
                <div className="grid lg:grid-cols-12 items-center gap-10 lg:gap-8">
                    <div className="lg:col-span-7 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/60 shadow-sm backdrop-blur">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-blue-600">ABOUT CLESE / LENSE</span>
                        </div>
                        <h1 style={SERIF} className="text-[34px] sm:text-[46px] lg:text-[54px] xl:text-[60px] leading-[1.08] tracking-tight text-slate-900 font-normal">
                            <span className="block whitespace-nowrap">Engineering learning.</span>
                            <em className="block text-blue-600 font-normal italic mt-1.5 sm:mt-2">
                                Sustaining tomorrow.
                            </em>
                        </h1>
                        <p className="text-slate-600 text-[15px] sm:text-[16px] leading-[1.8] max-w-[530px]">
                            The Centre for Learning Engineering and Sustainability Education (CLESE / LEnSE) at the University of Kerala was established in 2024 to advance the science of learning engineering, educational computing, and experiential STEM. We engineer human-centred digital learning environments and mathematical learning models while nurturing a scientifically literate, creative, and sustainable society.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link href="/academics" className="inline-flex">
                                <span className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 shadow-[0_12px_26px_rgba(37,99,235,0.35)] hover:scale-[1.03] transition">
                                    EXPLORE PROGRAMMES <ArrowRight size={13} />
                                </span>
                            </Link>
                            <a href="#programmes" className="inline-flex">
                                <span className="px-7 py-3.5 rounded-full bg-white/90 border border-white text-slate-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:text-blue-600 transition">
                                    ACTIVITIES & CAMPS
                                </span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center lg:justify-end">
                        <div className="relative w-[300px] sm:w-[330px] rounded-[1.8rem] p-7 sm:p-8 bg-gradient-to-br from-white/70 via-sky-50/50 to-blue-100/40 backdrop-blur-xl border border-white/85 shadow-[0_25px_60px_rgba(2,60,140,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition duration-300">
                            <span className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-white/90 border border-white text-sky-500 flex items-center justify-center shadow-md">
                                <Sparkles size={17} />
                            </span>
                            <p className="text-[10px] font-bold tracking-[0.22em] text-slate-500 uppercase mb-1">UNIVERSITY OF KERALA</p>
                            <p style={SERIF} className="text-6xl sm:text-[68px] text-slate-900 leading-none my-2 font-normal">2024</p>
                            <div className="space-y-1 mt-3">
                                <p className="text-[13px] font-semibold text-slate-800">Centre for Learning Engineering & Sustainability Education</p>
                                <p className="text-[12px] text-slate-500 leading-relaxed">Pioneering learning science, AI, advanced computing & STEM pedagogy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrap>
        </section>
    );
}

/* ---------- section 01 vision diagram ---------- */
function VisionNode({ icon: Icon, title, desc, pos, tone = 'blue' }) {
    return (
        <div className={`absolute ${pos} w-[45%] ${GLASS} rounded-[2rem] p-4 sm:p-5 shadow-[0_12px_30px_rgba(37,99,235,0.08)]`}>
            <span className={`w-9 h-9 rounded-full bg-white border ${tone === 'green' ? 'border-emerald-200 text-emerald-600' : 'border-blue-100 text-blue-600'} flex items-center justify-center shadow-sm mb-2.5`}>
                <Icon size={18} strokeWidth={1.8} />
            </span>
            <h5 className="text-[14px] sm:text-[14.5px] font-bold text-slate-900 leading-tight">{title}</h5>
            <p className="text-[11px] sm:text-[11.5px] text-slate-600 leading-snug mt-1.5">{desc}</p>
        </div>
    );
}

function VisionDiagram() {
    return (
        <div className="relative w-full max-w-[600px] h-[560px] mx-auto">
            <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-br from-white/70 via-sky-100/60 to-blue-100/50 blur-[2px]" />
            <svg viewBox="0 0 600 560" className="absolute inset-0 w-full h-full" fill="none">
                <circle cx="300" cy="280" r="170" stroke="#38bdf8" strokeOpacity="0.35" strokeDasharray="4 6" />
                <circle cx="300" cy="280" r="135" stroke="#93c5fd" strokeOpacity="0.4" />
                <path d="M150 140 Q230 200 255 235 M450 140 Q370 200 345 235 M150 420 Q230 360 255 325 M450 420 Q370 360 345 325" stroke="#38bdf8" strokeOpacity="0.55" strokeDasharray="3 4" />
                {[[150, 140], [450, 140], [150, 420], [450, 420], [300, 95]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3.5" fill="#38bdf8" />
                ))}
            </svg>
            <VisionNode icon={Brain} title="Learning Engineering" desc="Applying cognitive principles, AI, and advanced computing to optimize human learning." pos="top-3 left-2" />
            <VisionNode icon={Atom} title="Experiential STEM" desc="Hands-on STEM Learning Labs, practical activities, and state-wide talent development." pos="top-6 right-2" />
            <VisionNode icon={UsersRound} title="Socially Inclusive" desc="Utilizing programme fees to support STEM education in rural and underprivileged schools." pos="bottom-6 left-2" />
            <VisionNode icon={Leaf} tone="green" title="Sustainability Education" desc="Connecting sustainability, global interdependence, and civic action through coursework." pos="bottom-3 right-2" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-br from-white via-sky-50 to-sky-100 border-[3px] border-white shadow-[0_20px_60px_rgba(37,99,235,0.25),inset_0_2px_8px_#fff] flex flex-col items-center justify-center text-center p-6 z-10">
                <span style={SERIF} className="text-xs uppercase tracking-widest text-blue-600 font-semibold mb-1">Our Core Vision</span>
                <span style={SERIF} className="text-[34px] text-slate-900 leading-none">Learning</span>
                <span style={SERIF} className="text-[30px] text-blue-600 leading-none italic font-normal">Engineering</span>
                <p className="text-[10.5px] text-slate-500 leading-snug mt-2.5 max-w-[145px]">Engineering innovative education for a sustainable, equitable society.</p>
            </div>
        </div>
    );
}

/* ---------- glass slabs for flagship card ---------- */
function Slabs() {
    const slabs = [
        { x: 120, y: 30, h: 130, c: '#bae6fd', o: 0.55 },
        { x: 95, y: 42, h: 130, c: '#60a5fa', o: 0.65 },
        { x: 70, y: 56, h: 128, c: '#3b82f6', o: 0.75 },
        { x: 45, y: 72, h: 120, c: '#1d4ed8', o: 0.85 },
    ];
    return (
        <svg viewBox="0 0 240 220" className="w-full h-auto drop-shadow-[0_25px_35px_rgba(37,99,235,0.35)]" fill="none">
            <ellipse cx="120" cy="196" rx="90" ry="14" fill="#38bdf8" opacity="0.35" />
            {slabs.map((s, i) => (
                <g key={i}>
                    <path d={`M${s.x} ${s.y} L${s.x + 55} ${s.y + 23} L${s.x + 55} ${s.y + s.h + 23} L${s.x} ${s.y + s.h} Z`} fill={s.c} fillOpacity={s.o} stroke="#fff" strokeOpacity="0.8" />
                    <path d={`M${s.x - 10} ${s.y - 5} L${s.x} ${s.y} L${s.x} ${s.y + s.h} L${s.x - 10} ${s.y + s.h - 5} Z`} fill="#fff" fillOpacity="0.5" stroke="#fff" strokeOpacity="0.8" />
                </g>
            ))}
            <rect x="196" y="176" width="14" height="14" rx="3" fill="#2563eb" transform="rotate(45 203 183)" />
        </svg>
    );
}

const Swirl = ({ className = '' }) => (
    <div className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-sky-300/50 to-blue-500/40 blur-2xl ${className}`} />
);

/* thin flowing line used behind sections */
const Flow = ({ className = '' }) => (
    <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 800 160" fill="none" preserveAspectRatio="none">
        <path d="M0 150 C200 20 420 10 800 60" stroke="#3b82f6" strokeOpacity="0.45" strokeWidth="1.2" />
        <path d="M0 160 C220 50 440 40 800 90" stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1" />
        <path d="M0 140 C180 0 400 -10 800 30" stroke="#93c5fd" strokeOpacity="0.45" strokeWidth="1" />
    </svg>
);

/* =========================================================================
   PAGE
   ========================================================================= */
export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f4f8ff] text-slate-900 font-sans overflow-x-hidden relative" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

            <Hero />

            {/* ================= 01 ABOUT THE CENTRE ================= */}
            <section className="relative pt-6 pb-24">
                <Swirl className="-left-24 bottom-0 w-96 h-72 rotate-12" />
                <Swirl className="-right-20 top-10 w-72 h-72 opacity-60" />
                <Dots rows={9} cols={7} className="hidden lg:grid absolute left-10 top-8 opacity-60" />
                <Wrap>
                    <div className="grid lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-6 space-y-5">
                            <SectionTag number="01" text="ABOUT THE CENTRE" />
                            <h2 style={SERIF} className="text-[38px] sm:text-5xl leading-[1.12] tracking-tight font-normal text-slate-900">
                                Centre for Learning<br />Engineering and<br />
                                <Em>Sustainability Education</Em>
                            </h2>
                            <p className="text-slate-600 text-[14px] leading-[1.85] max-w-[600px]">
                                The Centre for Learning Engineering and Sustainability Education (CLESE / LEnSE) was established in 2024 with the vision of promoting innovative, inclusive, and sustainable approaches to education, with a special focus on <strong>Learning Engineering</strong> and STEM (Science, Technology, Engineering and Mathematics) education.
                            </p>
                            <p className="text-slate-600 text-[14px] leading-[1.85] max-w-[600px]">
                                The Centre serves as a dynamic platform for academic engagement, capacity building, knowledge sharing, and collaborative initiatives aimed at strengthening learning and teaching practices. It organizes seminars, workshops, conferences, training programmes, and research activities in emerging areas of education, computational learning engineering, prompt engineering, and sustainability.
                            </p>
                            <p className="text-slate-600 text-[14px] leading-[1.85] max-w-[600px]">
                                Through experiential STEM learning opportunities for school students, specialized programmes for prospective teachers, and collaborative research with state and international bodies, CLESE strives to build a robust ecosystem for innovative education and contribute to a scientifically literate, creative, and sustainable society.
                            </p>
                            <div className="pt-2 flex flex-wrap gap-4">
                                <PillBtn href="/initiatives">EXPLORE OUR INITIATIVES</PillBtn>
                            </div>
                        </div>
                        <div className="lg:col-span-6"><VisionDiagram /></div>
                    </div>
                </Wrap>
            </section>

            {/* ================= 02 FOCUS AREAS ================= */}
            <section className="relative bg-gradient-to-br from-[#06265f] via-[#09358b] to-[#1e58c8] text-white overflow-hidden pt-14 pb-16">
                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
                    <path d="M0 60 C300 -60 500 220 800 80 C1000 0 1100 60 1200 20 L1200 0 L0 0Z" fill="#7dd3fc" opacity="0.5" />
                    <path d="M0 300 C300 160 600 400 1200 220 L1200 400 L0 400Z" fill="#60a5fa" opacity="0.35" />
                </svg>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#dbeafe]/40 to-transparent pointer-events-none" />
                <Wrap>
                    <div className="grid lg:grid-cols-2 gap-6 items-end">
                        <div className="space-y-4">
                            <SectionTag number="02" text="OUR FOCUS AREAS" light circle />
                            <h2 style={SERIF} className="text-4xl sm:text-[46px] leading-[1.12] font-normal">
                                Pioneering Learning Engineering<br /><Em light>& Educational Sciences.</Em>
                            </h2>
                        </div>
                        <div className="flex items-end gap-6 lg:justify-end">
                            <p className="text-[13px] text-sky-100/90 leading-relaxed max-w-[340px]">
                                We merge cognitive learning science, advanced computing, AI methodologies, and sustainability to architect evidence-based education.
                            </p>
                            <div className="flex gap-2 shrink-0">
                                {[ChevronLeft, ChevronRight].map((Ic, i) => (
                                    <button key={i} aria-label={i ? 'Next' : 'Previous'} className="w-7 h-7 rounded-full bg-white/90 text-blue-600 flex items-center justify-center hover:bg-white transition">
                                        <Ic size={14} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        {[
                            { n: '01', icon: Brain, t: 'Learning Engineering & AI', d: 'Integrating human learning psychology, AI, prompt engineering, and computational modeling into educational design.' },
                            { n: '02', icon: Atom, t: 'Experiential STEM Labs', d: 'Providing practical, hands-on activity-based STEM training to foster curiosity, problem-solving, and scientific thinking.' },
                            { n: '03', icon: GraduationCap, t: 'Pedagogical Capacity Building', d: 'Equipping prospective and practicing teachers with state-of-the-art classroom practices and digital learning tools.' },
                            { n: '04', icon: Leaf, t: 'Sustainability & Civic Action', d: 'Connecting sustainability, global interdependence, and equity into coursework and civic engagement.' },
                        ].map((c) => (
                            <div key={c.n} className="rounded-[1.4rem] bg-gradient-to-br from-white/95 via-sky-50/80 to-blue-100/60 backdrop-blur-xl border border-white/90 text-slate-900 p-5 min-h-[250px] flex flex-col justify-between shadow-[0_18px_40px_rgba(3,21,51,0.25),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-1 transition">
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span style={SERIF} className="text-xl text-blue-600 font-semibold">{c.n}</span>
                                        <c.icon size={22} strokeWidth={1.7} className="text-blue-600" />
                                    </div>
                                    <h4 className="text-[15px] font-bold mb-2 text-slate-900">{c.t}</h4>
                                    <p className="text-[12px] text-slate-600 leading-relaxed">{c.d}</p>
                                </div>
                                <div className="flex justify-end pt-3"><ArrowBtn /></div>
                            </div>
                        ))}
                    </div>
                </Wrap>
            </section>

            {/* ================= 03 KEY INITIATIVES ================= */}
            <section className="relative pt-16 pb-16">
                <Swirl className="-right-24 top-0 w-[480px] h-48 -rotate-6 opacity-50" />
                <Flow className="right-0 top-0 w-[60%] h-40 hidden lg:block" />
                <Dots rows={8} cols={14} className="absolute right-24 top-24 hidden lg:grid" />
                <Wrap>
                    <SectionTag number="03" text="KEY INITIATIVES" />
                    <h2 style={SERIF} className="text-4xl sm:text-5xl leading-[1.12] font-normal mt-4 mb-8">
                        Learning Engineering<br /><Em>in Action.</Em>
                    </h2>

                    <div className="grid lg:grid-cols-12 gap-5 items-stretch">
                        <div className={`lg:col-span-5 ${GLASS} rounded-[1.8rem] p-7 relative overflow-hidden min-h-[340px]`}>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-white bg-gradient-to-r from-blue-600 to-sky-500 px-3 py-1 rounded-full mb-5 shadow-sm">
                                <Gem size={9} /> FLAGSHIP INITIATIVE
                            </span>
                            <h3 style={SERIF} className="text-3xl sm:text-[34px] font-normal text-slate-900 mb-3">STEM Learning Lab</h3>
                            <p className="text-[13px] text-slate-700 leading-relaxed max-w-[270px] mb-5">
                                A dedicated state-of-the-art facility designed to provide practical, activity-based STEM training to school students. The lab fosters intellectual curiosity, creativity, mathematical problem-solving, and scientific thinking.
                            </p>
                            <Link href="/initiatives" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md text-xs font-semibold text-blue-600 hover:scale-105 transition">
                                Explore the Lab <ArrowRight size={12} />
                            </Link>
                            <div className="absolute bottom-0 right-0 w-[52%] max-w-[230px] pointer-events-none"><Slabs /></div>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: Cpu, t: 'Prompt Engineering & AI Tools', d: 'Workshops on Prompt Engineering for educators, instructional quality improvement, and AI-driven pedagogical tools.' },
                                { icon: Users, t: 'Scholar Connect Series', d: 'A dynamic platform for researchers to exchange ideas, share computational findings, and initiate joint research.' },
                                { icon: Award, t: 'STEM for Gifted Students', d: 'State-wide residential STEM camps and training conducted in collaboration with SIET across educational districts.' },
                                { icon: Globe, t: 'Global Academic Engagement', d: 'International academic collaboration with the STEM Centre at Clarkson University, USA for knowledge exchange.' },
                            ].map((i) => (
                                <div key={i.t} className={`${GLASS} rounded-[1.4rem] p-5 flex flex-col justify-between min-h-[160px] hover:-translate-y-1 transition`}>
                                    <div className="flex gap-3">
                                        <i.icon size={22} strokeWidth={1.6} className="text-blue-600 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-[14.5px] font-bold mb-1.5 text-slate-900">{i.t}</h4>
                                            <p className="text-[12px] text-slate-600 leading-relaxed">{i.d}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-2"><ArrowBtn className="!w-5 !h-5" /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Wrap>
            </section>

            {/* ================= 04 PROGRAMMES ORGANIZED ================= */}
            <section id="programmes" className="relative py-16 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent">
                <Wrap>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div>
                            <SectionTag number="04" text="ACADEMIC MILESTONES" />
                            <h2 style={SERIF} className="text-4xl sm:text-5xl leading-[1.12] font-normal mt-3">
                                Programmes &amp;<br /><Em>Activities Organised</Em>
                            </h2>
                        </div>
                        <p className="text-[13px] text-slate-600 max-w-[420px] leading-relaxed">
                            A track record of high-impact state-wide initiatives, international conferences, faculty workshops, and student learning camps conducted by CLESE.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
                            {
                                tag: 'International Conference',
                                date: '14th & 15th March 2025',
                                title: '4th SIET International Conference on Educational Technology',
                                desc: 'Theme: "Educational Technology in STEAM Education", conducted in collaboration with SIET. Inaugurated by Hon’ble Minister for Education Sri. V. Sivankutty with Prof. Jan De Waters of Clarkson University as Chief Guest.',
                                icon: Globe,
                            },
                            {
                                tag: 'AI & Instruction Lecture',
                                date: '10th January 2025',
                                title: 'Prompt Engineering for Educators: Improving Instruction',
                                desc: 'Invited lecture by Dr. Briju Tankachan, Executive Director, EdTech Society & Visiting Professor, IIT Mumbai at Dept. of Education, University of Kerala, Karyavattom Campus.',
                                icon: Cpu,
                            },
                            {
                                tag: 'FYUGP Extended Courseware',
                                date: 'Extended 2-Month Programme',
                                title: 'Digital Courseware on Selected Literary Terms',
                                desc: 'Offered for FYUGP Semester II learners under University of Kerala. Developed by Ms. Greeshma Raveendran under the guidance of Dr. Divya C. Senan, blending interactive video lessons, quizzes, and assessments.',
                                icon: BookOpen,
                            },
                            {
                                tag: 'International Workshop',
                                date: '30th & 31st May 2025',
                                title: 'Nurturing Future Teachers of English at Secondary Level',
                                desc: 'Conducted at Centre for Under Graduate Studies, University of Kerala in collaboration with ELTAI and the Hornby Trust (UK), driving transformative changes in language pedagogy.',
                                icon: GraduationCap,
                            },
                            {
                                tag: 'ICSSR State-wide Initiative',
                                date: 'State-wide District Series',
                                title: 'STEM 4 Girls Camp Series across Kerala',
                                desc: 'Joint initiative with ICSSR New Delhi to empower young women from disadvantaged families. Inaugurated at the State level by Sri. KN Balagopal, Hon’ble Minister for Finance, Govt. of Kerala.',
                                icon: Atom,
                            },
                            {
                                tag: 'SIET Gifted Students Camp',
                                date: '18th to 20th July 2025',
                                title: '3-Day State Camp for 56 Gifted Students',
                                desc: 'Residential camp organized at Agriculture Cooperative Staff Training Institute, Manvila in collaboration with SIET. State-level inauguration by Sri. V. Sivankutty, Hon’ble Minister for Education.',
                                icon: Award,
                            },
                            {
                                tag: 'State-wide Outreach',
                                date: 'Ongoing State Initiative',
                                title: 'STEM Camps across 41 Educational Districts',
                                desc: 'Collaborative initiative with SIET, Government of Kerala, delivering intensive hands-on STEM engineering and scientific training to gifted students across all 41 educational districts of Kerala.',
                                icon: Landmark,
                            },
                        ].map((prog, idx) => (
                            <div key={idx} className={`${GLASS} rounded-[1.6rem] p-6 flex flex-col justify-between hover:-translate-y-1.5 transition duration-300 group`}>
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-[10px] font-bold tracking-wider uppercase text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-full">
                                            {prog.tag}
                                        </span>
                                        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                                            <Calendar size={12} className="text-blue-500" />
                                            {prog.date}
                                        </span>
                                    </div>
                                    <h4 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug mb-2">
                                        {prog.title}
                                    </h4>
                                    <p className="text-[12.5px] text-slate-600 leading-relaxed">
                                        {prog.desc}
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-blue-100/60 mt-4 flex items-center justify-between text-blue-600">
                                    <span className="text-[11px] font-semibold uppercase tracking-wider">Centre Programme</span>
                                    <ArrowBtn className="!w-6 !h-6" />
                                </div>
                            </div>
                        ))}
                    </div>
                </Wrap>
            </section>

            {/* ================= 05 PARTNERSHIPS ================= */}
            <section className="relative py-16">
                <Swirl className="-left-24 top-24 w-48 h-64 bg-blue-600/40" />
                <Dots rows={7} cols={18} className="absolute left-[48%] top-6 hidden lg:grid opacity-50" />
                <Wrap>
                    <div className="grid lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-5 space-y-4">
                            <SectionTag number="05" text="OUR PARTNERSHIPS" />
                            <h2 style={SERIF} className="text-4xl sm:text-5xl leading-[1.12] font-normal">
                                Collaborating for<br /><Em>greater impact.</Em>
                            </h2>
                            <p className="text-[13.5px] text-slate-600 leading-relaxed max-w-sm">
                                LEnSE has established collaborations with reputed state, national, and international organisations to facilitate joint academic programmes, research initiatives, and educational outreach.
                            </p>
                            <PillBtn href="/initiatives">ALL PARTNERSHIPS</PillBtn>
                        </div>

                        <div className="lg:col-span-7 relative">
                            <div className="hidden sm:flex absolute -top-24 right-4 items-start gap-1 select-none">
                                <span style={{ fontFamily: "'Mrs Saint Delafield', cursive" }} className="text-[44px] text-slate-400 leading-[0.85] -rotate-12 text-right">
                                    Stronger<br />Together
                                </span>
                                <svg width="70" height="56" viewBox="0 0 70 56" fill="none" className="text-blue-600 mt-3">
                                    <path d="M4 40 C20 -4, 55 -2, 62 40" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />
                                    <path d="M56 32 L62 42 L68 31" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {[
                                    { icon: Landmark, t: 'SIET Kerala', s: 'Department of General Education, Govt. of Kerala' },
                                    { icon: Globe, t: 'Clarkson University', s: 'STEM Centre, Potsdam, New York, USA' },
                                    { icon: Landmark, t: 'ICSSR New Delhi', s: 'Indian Council of Social Science Research' },
                                    { icon: Heart, t: 'Child Development Centre', s: 'CDC, Kazhakkoottam' },
                                    { icon: BookOpen, t: 'REFORM', s: 'Educational Transformation Network' },
                                    { icon: GraduationCap, t: 'ELTAI & Hornby Trust', s: 'English Language Teachers’ Network & UK' },
                                ].map((p) => (
                                    <div key={p.t} className={`${GLASS} rounded-[1.2rem] p-4 flex flex-col items-center text-center min-h-[145px] hover:-translate-y-1 transition`}>
                                        <p.icon size={22} strokeWidth={1.6} className="text-blue-600 mb-2.5" />
                                        <h4 className="text-[12px] font-bold leading-snug">{p.t}</h4>
                                        <p className="text-[10px] text-slate-500 mt-1">{p.s}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Wrap>
            </section>

            {/* ================= 06 SOCIAL IMPACT ================= */}
            <section className="relative py-14">
                <Wrap>
                    <SectionTag number="06" text="SOCIAL IMPACT & RESPONSIBILITY" />
                    <div className="grid lg:grid-cols-12 gap-6 items-center mt-5">
                        <div className={`lg:col-span-4 ${GLASS} rounded-[1.8rem] p-7 relative min-h-[290px]`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full">INCLUSIVE MODEL</span>
                                <FileText size={22} strokeWidth={1.4} className="text-blue-600" />
                            </div>
                            <p style={SERIF} className="text-[88px] sm:text-[96px] leading-none my-3 text-blue-600">100%</p>
                            <p className="text-[13.5px] text-slate-700 leading-snug mt-2 max-w-[270px]">
                                Training programme revenues are dedicated to providing free STEM training and learning engineering kits for disadvantaged students in rural schools across Kerala.
                            </p>
                        </div>

                        <div className="lg:col-span-4 space-y-3">
                            <h2 style={SERIF} className="text-3xl sm:text-4xl leading-[1.15] font-normal">
                                Learning Engineering with<br /><Em>social responsibility.</Em>
                            </h2>
                            <p className="text-[13px] text-slate-700 leading-[1.78] font-normal">
                                The Centre follows an inclusive and socially responsible model in promoting STEM education. Programme fees collected from training activities are utilized to support STEM education for socially and economically disadvantaged students in rural schools across Kerala, creating opportunities for students who otherwise face limited access to quality STEM resources and modern learning technologies.
                            </p>
                        </div>

                        <div className={`lg:col-span-4 ${GLASS} rounded-[1.4rem] p-6 space-y-4`}>
                            {[
                                { icon: Landmark, t: 'Support for rural and remote schools across Kerala' },
                                { icon: User, t: 'Empowering disadvantaged young women via STEM 4 Girls' },
                                { icon: CheckCircle2, t: 'Breaking socio-economic & gender accessibility barriers' },
                                { icon: Gem, t: 'Equitable access to advanced computing & STEM learning' },
                            ].map((r) => (
                                <div key={r.t} className="flex items-center gap-3">
                                    <r.icon size={17} strokeWidth={1.6} className="text-blue-600 shrink-0" />
                                    <span className="text-[12.5px] font-medium text-slate-800">{r.t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Wrap>
            </section>

            {/* ================= 07 OFFICIAL OBJECTIVES ================= */}
            <section className="relative pt-14 pb-14">
                <Swirl className="-left-24 top-10 w-64 h-64 opacity-40" />
                <Wrap>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                        <div>
                            <SectionTag number="07" text="OUR MANDATE & OBJECTIVES" />
                            <h2 style={SERIF} className="text-4xl sm:text-[44px] font-normal mt-3">Core Objectives of CLESE</h2>
                        </div>
                        <p className="text-[12.5px] text-slate-500 sm:text-right max-w-[340px] leading-relaxed sm:mt-2">
                            The five guiding institutional objectives defining the research, computational, and outreach mandate of the Centre.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                        {[
                            {
                                n: '01',
                                icon: Monitor,
                                t: 'Advanced Computing\n& Career Guidance',
                                d: 'To create educational environments using advanced computing capabilities to address career guidance at secondary level and professional employability at higher education level, to all irrespective of social, economic, cultural, gender or accessibility barriers.'
                            },
                            {
                                n: '02',
                                icon: Cpu,
                                t: 'Innovative\nDigital Tools',
                                d: 'To build new innovative digital tools that are helping catalyse measurable improvements in students\' learning, cognition, and educational outcomes.'
                            },
                            {
                                n: '03',
                                icon: Brain,
                                t: 'Mathematical Models,\nLearning Sciences & AI',
                                d: 'To initiate a comprehensive programme constructing mathematical models for education. To integrate psychological principles of human learning and AI with computational methods in order to widen the scope of educational sciences for aptitude and employability development.'
                            },
                            {
                                n: '04',
                                icon: Leaf,
                                t: 'Sustainability Education\n& Civic Engagement',
                                d: 'To create and support opportunities for learning about sustainability through coursework, research, co-curricular activities, and active civic engagement.'
                            },
                            {
                                n: '05',
                                icon: Globe,
                                t: 'Global Interdependence\n& Teacher Development',
                                d: 'To improve opportunities for students to connect sustainability, global interdependence, equity, and civic action in their academic studies, and provide research-informed professional development for teachers and school leaders.'
                            },
                        ].map((o) => (
                            <div key={o.n} className={`${GLASS} rounded-[1.4rem] p-5 min-h-[330px] flex flex-col justify-between hover:-translate-y-1.5 transition duration-300 shadow-sm`}>
                                <div>
                                    <div className="flex items-center justify-between mb-5">
                                        <span style={SERIF} className="text-xl text-blue-600 font-semibold">{o.n}</span>
                                        <o.icon size={20} strokeWidth={1.6} className="text-blue-600" />
                                    </div>
                                    <h4 className="text-[13.5px] font-bold leading-snug mb-2.5 whitespace-pre-line text-slate-900">{o.t}</h4>
                                    <p className="text-[11.5px] text-slate-600 leading-[1.65]">{o.d}</p>
                                </div>
                                <div className="flex justify-end pt-3"><ArrowBtn className="!w-5 !h-5" /></div>
                            </div>
                        ))}
                    </div>
                </Wrap>
            </section>

            {/* ================= LEADERSHIP & CONTACT CARD ================= */}
            <Wrap className="py-6">
                <div className={`${GLASS} rounded-[2rem] p-8 sm:p-10 border border-white/90 shadow-[0_20px_50px_rgba(37,99,235,0.12)]`}>
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white flex items-center justify-center shadow-lg mb-4">
                                <GraduationCap size={40} strokeWidth={1.5} />
                            </div>
                            <span className="text-[11px] font-bold tracking-widest uppercase text-blue-600 mb-1">Centre Leadership</span>
                            <h3 style={SERIF} className="text-2xl font-bold text-slate-900">Dr. Divya C Senan</h3>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Director</p>
                        </div>
                        <div className="md:col-span-8 space-y-4">
                            <h4 className="text-base font-bold text-slate-800">
                                Centre for Learning Engineering and Sustainability Education (CLESE)
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4 text-[13px] text-slate-600">
                                <div className="flex items-start gap-2.5">
                                    <MapPin size={18} className="text-blue-600 shrink-0 mt-0.5" />
                                    <span>Department of Education, University of Kerala, Kariavattom Campus, Thiruvananthapuram - 695581, Kerala, India</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Mail size={18} className="text-blue-600 shrink-0" />
                                    <a href="mailto:lenseedu24@gmail.com" className="hover:text-blue-600 font-medium transition">
                                        lenseedu24@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="pt-2 flex flex-wrap gap-3">
                                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700 transition">
                                    Contact the Centre <ArrowRight size={13} />
                                </Link>
                                <Link href="/academics" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-700 text-xs font-semibold border border-slate-200 hover:text-blue-600 transition">
                                    Academics & Research
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Wrap>

            {/* ================= CTA BANNER ================= */}
            <Wrap className="py-10">
                <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-r from-[#041a45] via-[#09358b] to-[#1e58c8] text-white px-8 sm:px-12 py-10 shadow-[0_25px_60px_rgba(3,21,51,0.35)]">
                    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none">
                        <path d="M0 220 C250 80 450 300 750 150 C950 50 1100 120 1200 40 L1200 300 L0 300Z" fill="#38bdf8" opacity="0.5" />
                        <path d="M0 120 C200 40 400 160 600 90" stroke="#bae6fd" strokeWidth="2" />
                    </svg>
                    <div className="relative grid md:grid-cols-12 items-center gap-6">
                        <div className="md:col-span-5 space-y-2">
                            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-sky-200 uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />BE PART OF CLESE / LENSE
                            </span>
                            <h2 style={SERIF} className="text-3xl sm:text-4xl leading-[1.1] font-normal">Shape the future of<br />Learning Engineering.</h2>
                        </div>
                        <p className="md:col-span-4 text-[13px] text-sky-100/90 leading-relaxed">
                            Collaborate with us in research, digital tool design, STEM training, or inclusive community outreach to build an innovative and sustainable educational future.
                        </p>
                        <div className="md:col-span-3 md:text-right">
                            <Link href="/contact" className="inline-flex">
                                <span className="px-6 py-3 rounded-full bg-white text-[#0a2a6b] font-bold text-[11px] uppercase tracking-wider flex items-center gap-3 shadow-xl hover:scale-105 transition">
                                    GET INVOLVED <ArrowRight size={13} />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Wrap>

        </div>
    );
}