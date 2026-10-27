'use client';
import React from 'react';
import Link from 'next/link';
import {
    ArrowRight, Sparkles, Users, User, GraduationCap, Globe, Monitor, Atom,
    Landmark, Heart, FileText, BookOpen, Leaf, CheckCircle2,
    ChevronLeft, ChevronRight, Settings, Gem, MapPin, Mail, Linkedin, Youtube, Instagram,
    Tag, UsersRound,
} from 'lucide-react';

/* ---------- shared tokens ---------- */
const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };
const BLUE = 'text-[#1a6dff]';
const GLASS =
    'bg-gradient-to-br from-white/80 via-sky-50/60 to-blue-100/40 backdrop-blur-xl border border-white/90 shadow-[0_18px_45px_rgba(37,99,235,0.10),inset_0_1px_0_rgba(255,255,255,1)]';

const Wrap = ({ children, className = '' }) => (
    <div className={`relative max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>
);

const Em = ({ children, light = false }) => (
    <em style={SERIF} className={`italic font-normal ${light ? 'text-sky-300' : BLUE}`}>{children}</em>
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
                <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-sky-300' : 'bg-[#1a6dff]'}`} />
                <span className={`text-[11px] font-bold tracking-[0.22em] uppercase ${light ? 'text-sky-200' : BLUE}`}>{text}</span>
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
    <span className={`w-7 h-7 rounded-full bg-[#1a6dff] text-white flex items-center justify-center shadow-[0_6px_14px_rgba(26,109,255,0.4)] ${className}`}>
        <ArrowRight size={13} />
    </span>
);

const PillBtn = ({ href, children }) => (
    <Link href={href} className="inline-flex">
        <span className="px-6 py-3 rounded-full bg-white/90 border border-white shadow-[0_10px_24px_rgba(37,99,235,0.14)] text-[#1a6dff] text-xs font-bold uppercase tracking-wider flex items-center gap-3 hover:scale-[1.03] transition">
            {children}<ArrowRight size={13} />
        </span>
    </Link>
);

/* ---------- hero: silky ocean streaks ---------- */
function OceanWaves() {
    const colors = ['#ffffff', '#7dd3fc', '#0ea5e9', '#1d4ed8', '#bae6fd', '#0369a1'];
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
                    <stop offset="0.45" stopColor="#4cb8f5" />
                    <stop offset="1" stopColor="#1e40af" />
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
            <div className="hidden lg:block absolute left-[80px] top-[60%] w-2.5 h-2.5 rounded-full bg-[#1a6dff]" />
            <Dots rows={8} cols={5} className="hidden lg:grid absolute left-3 bottom-16" />

            <Wrap className="w-full relative z-10 my-auto">
                <div className="grid lg:grid-cols-12 items-center gap-10 lg:gap-8">
                    <div className="lg:col-span-7 space-y-6">
                        <span className={`flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] uppercase ${BLUE}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a6dff]" />ABOUT LENSE
                        </span>
                        <h1 style={SERIF} className="text-[52px] sm:text-[66px] lg:text-[74px] leading-[1.03] tracking-tight text-slate-900 font-normal">
                            Learning today.<br />
                            <em className={`${BLUE} font-normal`}>Sustaining<br />tomorrow.</em>
                        </h1>
                        <p className="text-slate-600 text-[15px] sm:text-[16px] leading-[1.8] max-w-[500px]">
                            The Centre for Learning Engineering and Sustainability Education (LEnSE) at the University of Kerala is established in 2024 with the vision of promoting innovative, inclusive, and sustainable approaches to education. Working at the intersection of technology, engineering and mathematics education, the Centre serves as a platform for academic engagement, capacity building, knowledge sharing, and collaboration for a better and more sustainable future.
                        </p>
                        <div className="pt-2">
                            <Link href="/academics" className="inline-flex">
                                <span className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0a6cff] to-[#1fa2ff] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-3 shadow-[0_12px_26px_rgba(10,108,255,0.4)] hover:scale-[1.03] transition">
                                    OUR PROGRAMMES <ArrowRight size={13} />
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative hidden sm:flex items-center justify-center lg:justify-end">
                        <div className="relative w-[300px] sm:w-[320px] rounded-[1.8rem] p-7 sm:p-8 bg-gradient-to-br from-white/55 via-sky-50/40 to-blue-100/30 backdrop-blur-xl border border-white/80 shadow-[0_25px_60px_rgba(2,60,140,0.22),inset_0_1px_0_rgba(255,255,255,0.95)] hover:-translate-y-1 transition duration-300">
                            <span className="absolute -top-3.5 -right-3.5 w-9 h-9 rounded-full bg-white/90 border border-white text-sky-500 flex items-center justify-center shadow-md">
                                <Sparkles size={17} />
                            </span>
                            <p className="text-[10px] font-bold tracking-[0.22em] text-slate-600 uppercase mb-1">ESTABLISHED IN</p>
                            <p style={SERIF} className="text-6xl sm:text-[68px] text-slate-900 leading-none my-2 font-normal">2024</p>
                            <p className="text-[13.5px] text-slate-600 leading-relaxed max-w-[210px] mt-2">Promoting innovative, inclusive and sustainable education.</p>
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
        <div className={`absolute ${pos} w-[45%] ${GLASS} rounded-[2.4rem] p-5`}>
            <span className={`w-10 h-10 rounded-full bg-white border ${tone === 'green' ? 'border-emerald-200 text-emerald-500' : 'border-blue-100 text-[#1a6dff]'} flex items-center justify-center shadow-sm mb-3`}>
                <Icon size={19} strokeWidth={1.6} />
            </span>
            <h5 className="text-[15px] font-bold text-slate-900 leading-tight">{title}</h5>
            <p className="text-[11.5px] text-slate-500 leading-snug mt-1.5">{desc}</p>
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
            <VisionNode icon={Tag} title="Innovative Education" desc="Creating new approaches to teaching and learning with technology." pos="top-3 left-2" />
            <VisionNode icon={UsersRound} title="Inclusive Opportunities" desc="Equal learning opportunities for all learners, without barriers." pos="top-6 right-2" />
            <VisionNode icon={Leaf} tone="green" title="Sustainable Practices" desc="Integrating sustainability into education and community engagement." pos="bottom-6 left-2" />
            <VisionNode icon={Atom} title="STEM Excellence" desc="Advancing Science, Technology, Engineering and Mathematics education." pos="bottom-3 right-2" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-gradient-to-br from-white via-sky-50 to-sky-100 border-[3px] border-white shadow-[0_20px_60px_rgba(37,99,235,0.28),inset_0_2px_8px_#fff] flex flex-col items-center justify-center text-center p-6 z-10">
                <span style={SERIF} className="text-base text-slate-600">Our</span>
                <span style={SERIF} className="text-[42px] text-slate-900 leading-none">Vision</span>
                <p className="text-[11px] text-slate-500 leading-snug mt-2.5 max-w-[125px]">Innovative education for a sustainable future.</p>
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
            <rect x="196" y="176" width="14" height="14" rx="3" fill="#1a6dff" transform="rotate(45 203 183)" />
        </svg>
    );
}

/* ---------- logo ---------- */
function Logo() {
    return (
        <div className="flex items-end gap-1">
            <svg width="44" height="44" viewBox="0 0 44 44">
                <ellipse cx="22" cy="12" rx="6" ry="11" fill="#2563eb" />
                <ellipse cx="12" cy="20" rx="6" ry="10" fill="#22c55e" transform="rotate(-50 12 20)" />
                <ellipse cx="32" cy="20" rx="6" ry="10" fill="#f59e0b" transform="rotate(50 32 20)" />
                <ellipse cx="15" cy="31" rx="5" ry="9" fill="#ef4444" transform="rotate(-20 15 31)" />
                <ellipse cx="29" cy="31" rx="5" ry="9" fill="#8b5cf6" transform="rotate(20 29 31)" />
            </svg>
            <span style={SERIF} className="text-xl text-slate-800 mb-1">LEnSE</span>
        </div>
    );
}

const XIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 2h3.3l-7.2 8.3L22.8 22h-6.7l-5.2-6.8L4.9 22H1.6l7.7-8.8L1.2 2H8l4.7 6.2L18.2 2zm-1.2 18h1.8L7.1 3.9H5.2L17 20z" /></svg>
);

const Swirl = ({ className = '' }) => (
    <div className={`absolute pointer-events-none rounded-full bg-gradient-to-br from-sky-300/50 to-blue-500/40 blur-2xl ${className}`} />
);

/* thin flowing line used behind sections 03 / 04 */
const Flow = ({ className = '' }) => (
    <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 800 160" fill="none" preserveAspectRatio="none">
        <path d="M0 150 C200 20 420 10 800 60" stroke="#3b82f6" strokeOpacity="0.55" strokeWidth="1.2" />
        <path d="M0 160 C220 50 440 40 800 90" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />
        <path d="M0 140 C180 0 400 -10 800 30" stroke="#93c5fd" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
);

/* =========================================================================
   PAGE
   ========================================================================= */
export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f4f8ff] text-slate-900 font-sans overflow-x-hidden relative" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300;1,6..72,400&family=Mrs+Saint+Delafield&display=swap');`}</style>

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
                            <h2 style={SERIF} className="text-[40px] sm:text-5xl leading-[1.12] tracking-tight font-normal text-slate-900">
                                Centre for Learning<br />Engineering and<br />
                                <Em>Sustainability Education</Em>
                            </h2>
                            <p className="text-slate-600 text-[13.5px] leading-[1.85] max-w-[600px]">
                                The Centre for Learning Engineering and Sustainability Education (LEnSE) was established in 2024 at the University of Kerala with the vision of promoting innovative, inclusive, and sustainable approaches to education, with a special focus on STEM (Science, Technology, Engineering and Mathematics) education.
                            </p>
                            <p className="text-slate-600 text-[13.5px] leading-[1.85] max-w-[600px]">
                                The Centre serves as a platform for academic engagement, capacity building, knowledge sharing, and collaborative initiatives aimed at strengthening learning and teaching practices. Through its diverse academic, training, research and outreach activities, LEnSE strives to build a strong ecosystem for innovative education and contribute to a scientifically literate, creative and sustainable society.
                            </p>
                            <PillBtn href="/initiatives">MORE ABOUT LENSE</PillBtn>
                        </div>
                        <div className="lg:col-span-6"><VisionDiagram /></div>
                    </div>
                </Wrap>
            </section>

            {/* ================= 02 FOCUS AREAS ================= */}
            <section className="relative bg-gradient-to-br from-[#06265f] via-[#0b3a9a] to-[#3b78ee] text-white overflow-hidden pt-14 pb-14">
                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
                    <path d="M0 60 C300 -60 500 220 800 80 C1000 0 1100 60 1200 20 L1200 0 L0 0Z" fill="#7dd3fc" opacity="0.5" />
                    <path d="M0 300 C300 160 600 400 1200 220 L1200 400 L0 400Z" fill="#60a5fa" opacity="0.35" />
                </svg>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#dbeafe]/50 to-transparent pointer-events-none" />
                <Wrap>
                    <div className="grid lg:grid-cols-2 gap-6 items-end">
                        <div className="space-y-4">
                            <SectionTag number="02" text="OUR FOCUS AREAS" light circle />
                            <h2 style={SERIF} className="text-4xl sm:text-[46px] leading-[1.12] font-normal">
                                Building a stronger<br />ecosystem <Em light>for education.</Em>
                            </h2>
                        </div>
                        <div className="flex items-end gap-6 lg:justify-end">
                            <p className="text-[13px] text-sky-100/90 leading-relaxed max-w-[340px]">
                                We work at the intersection of learning, technology and sustainability to create meaningful opportunities for students, teachers and the wider community.
                            </p>
                            <div className="flex gap-2 shrink-0">
                                {[ChevronLeft, ChevronRight].map((Ic, i) => (
                                    <button key={i} aria-label={i ? 'Next' : 'Previous'} className="w-7 h-7 rounded-full bg-white/90 text-[#1a6dff] flex items-center justify-center hover:bg-white">
                                        <Ic size={14} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                        {[
                            { n: '01', icon: GraduationCap, t: 'Academic Engagement', d: 'Organising seminars, workshops, conferences and training programmes in emerging areas.' },
                            { n: '02', icon: Users, t: 'Capacity Building', d: 'Strengthening the skills and competencies of teachers, students and academic communities.' },
                            { n: '03', icon: BookOpen, t: 'Knowledge Sharing', d: 'Creating platforms for collaboration, research discussions and innovation.' },
                            { n: '04', icon: Globe, t: 'Collaborative Initiatives', d: 'Partnering with reputed institutions and organizations for greater impact.' },
                        ].map((c) => (
                            <div key={c.n} className="rounded-[1.4rem] bg-gradient-to-br from-white/90 via-sky-50/75 to-blue-100/60 backdrop-blur-xl border border-white/85 text-slate-900 p-5 min-h-[250px] flex flex-col justify-between shadow-[0_18px_40px_rgba(3,21,51,0.3),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-1 transition">
                                <div>
                                    <div className="flex items-center justify-between mb-7">
                                        <span style={SERIF} className={`text-xl ${BLUE}`}>{c.n}</span>
                                        <c.icon size={22} strokeWidth={1.6} className={BLUE} />
                                    </div>
                                    <h4 className="text-[15px] font-bold mb-2">{c.t}</h4>
                                    <p className="text-[12px] text-slate-600 leading-relaxed max-w-[190px]">{c.d}</p>
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
                        Initiatives for<br /><Em>a brighter tomorrow.</Em>
                    </h2>

                    <div className="grid lg:grid-cols-12 gap-5 items-stretch">
                        <div className={`lg:col-span-5 ${GLASS} rounded-[1.8rem] p-7 relative overflow-hidden min-h-[340px]`}>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-white bg-gradient-to-r from-[#1a6dff] to-sky-400 px-3 py-1 rounded-full mb-5">
                                <Gem size={9} /> FLAGSHIP INITIATIVE
                            </span>
                            <h3 style={SERIF} className="text-3xl sm:text-[34px] font-normal text-slate-900 mb-3">STEM Learning Lab</h3>
                            <p className="text-[13px] text-slate-700 leading-relaxed max-w-[270px] mb-5">
                                A dedicated facility to provide practical, activity-based STEM training for school students, fostering curiosity, creativity, problem-solving abilities and scientific thinking.
                            </p>
                            <Link href="/initiatives" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md text-xs font-semibold text-[#1a6dff]">
                                Learn more <ArrowRight size={12} />
                            </Link>
                            <div className="absolute bottom-0 right-0 w-[52%] max-w-[230px] pointer-events-none"><Slabs /></div>
                        </div>

                        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: BookOpen, t: 'Specialized Programmes', d: 'STEM programmes for prospective teachers to develop innovative classroom practices.' },
                                { icon: Users, t: 'Scholar Connect', d: 'A platform for scholars to interact, share research ideas and explore collaborative opportunities.' },
                                { icon: FileText, t: 'Educational Outreach', d: 'STEM training for gifted students from 44 schools across Kerala in collaboration with SIET.' },
                                { icon: Globe, t: 'Global Collaboration', d: 'International collaboration with the STEM Centre at Clarkson University, USA.' },
                            ].map((i) => (
                                <div key={i.t} className={`${GLASS} rounded-[1.4rem] p-5 flex flex-col justify-between min-h-[158px] hover:-translate-y-1 transition`}>
                                    <div className="flex gap-3">
                                        <i.icon size={22} strokeWidth={1.5} className={`${BLUE} shrink-0 mt-0.5`} />
                                        <div>
                                            <h4 className="text-[14.5px] font-bold mb-1.5">{i.t}</h4>
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

            {/* ================= 04 PARTNERSHIPS ================= */}
            <section className="relative py-16">
                <Swirl className="-left-24 top-24 w-48 h-64 bg-blue-600/60" />
                <Dots rows={7} cols={18} className="absolute left-[48%] top-6 hidden lg:grid opacity-50" />
                <Wrap>
                    <div className="grid lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-5 space-y-4">
                            <SectionTag number="04" text="OUR PARTNERSHIPS" />
                            <h2 style={SERIF} className="text-4xl sm:text-5xl leading-[1.12] font-normal">
                                Collaborating for<br /><Em>greater impact.</Em>
                            </h2>
                            <p className="text-[13.5px] text-slate-600 leading-relaxed max-w-sm">
                                LEnSE has established collaborations with reputed institutions and organisations to facilitate joint academic programmes, training initiatives and educational outreach activities.
                            </p>
                            <PillBtn href="/initiatives">OUR PARTNERS</PillBtn>
                        </div>

                        <div className="lg:col-span-7 relative">
                            <div className="hidden sm:flex absolute -top-24 right-4 items-start gap-1 select-none">
                                <span style={{ fontFamily: "'Mrs Saint Delafield', cursive" }} className="text-[44px] text-slate-400 leading-[0.85] -rotate-12 text-right">
                                    Stronger<br />Together
                                </span>
                                <svg width="70" height="56" viewBox="0 0 70 56" fill="none" className="text-[#1a6dff] mt-3">
                                    <path d="M4 40 C20 -4, 55 -2, 62 40" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" strokeLinecap="round" />
                                    <path d="M56 32 L62 42 L68 31" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { icon: Landmark, t: 'State Institute of Educational Technology (SIET)', s: 'Government of Kerala' },
                                    { icon: BookOpen, t: 'REFORM', s: 'REFORM' },
                                    { icon: Heart, t: 'Child Development Centre', s: 'Kazhakkoottam' },
                                    { icon: Globe, t: 'STEM Centre Clarkson University', s: 'USA' },
                                ].map((p) => (
                                    <div key={p.t} className={`${GLASS} rounded-[1.2rem] p-4 flex flex-col items-center text-center min-h-[150px] hover:-translate-y-1 transition`}>
                                        <p.icon size={24} strokeWidth={1.5} className={`${BLUE} mb-3`} />
                                        <h4 className="text-[12px] font-bold leading-snug">{p.t}</h4>
                                        <p className="text-[10px] text-slate-500 mt-1">{p.s}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Wrap>
            </section>

            {/* ================= 05 SOCIAL IMPACT ================= */}
            <section className="relative py-14">
                <Wrap>
                    <SectionTag number="05" text="SOCIAL IMPACT" />
                    <div className="grid lg:grid-cols-12 gap-6 items-center mt-5">
                        <div className={`lg:col-span-4 ${GLASS} rounded-[1.8rem] p-7 relative min-h-[290px]`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold tracking-wider uppercase text-[#1a6dff] bg-blue-100/70 px-3 py-1 rounded-full">EDUCATION FOR ALL</span>
                                <FileText size={22} strokeWidth={1.4} className={BLUE} />
                            </div>
                            <p style={SERIF} className={`text-[88px] sm:text-[96px] leading-none my-3 ${BLUE}`}>100%</p>
                            <p className="text-[13.5px] text-slate-700 leading-snug mt-2 max-w-[270px]">
                                Programme fees are utilized to support STEM education for disadvantaged students in rural schools across Kerala.
                            </p>
                        </div>

                        <div className="lg:col-span-4 space-y-3">
                            <h2 style={SERIF} className="text-3xl sm:text-4xl leading-[1.15] font-normal">
                                Education with<br /><Em>social responsibility.</Em>
                            </h2>
                            <p className="text-[13px] text-slate-700 leading-[1.78] font-normal">
                                The Centre follows an inclusive and socially responsible model in promoting STEM education. Programme fees collected from its training activities are utilized to support STEM education for socially and economically disadvantaged students in rural schools across Kerala, creating opportunities for students who may have limited access to quality STEM learning resources.
                            </p>
                        </div>

                        <div className={`lg:col-span-4 ${GLASS} rounded-[1.4rem] p-6 space-y-5`}>
                            {[
                                { icon: Landmark, t: 'Support for rural schools' },
                                { icon: User, t: 'Opportunities for underprivileged students' },
                                { icon: CheckCircle2, t: 'Equitable access to STEM education' },
                                { icon: Gem, t: 'A brighter, more inclusive future' },
                            ].map((r) => (
                                <div key={r.t} className="flex items-center gap-3">
                                    <r.icon size={17} strokeWidth={1.5} className={`${BLUE} shrink-0`} />
                                    <span className="text-[12.5px] font-medium text-slate-800">{r.t}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Wrap>
            </section>

            {/* ================= 06 OBJECTIVES ================= */}
            <section className="relative pt-14 pb-10">
                <Swirl className="-left-24 top-10 w-64 h-64 opacity-40" />
                <Wrap>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                        <div>
                            <SectionTag number="06" text="OUR OBJECTIVES" />
                            <h2 style={SERIF} className="text-4xl sm:text-[44px] font-normal mt-3">Guiding our mission.</h2>
                        </div>
                        <p className="text-[12.5px] text-slate-500 sm:text-right max-w-[320px] leading-relaxed sm:mt-2">
                            Our objectives reflect our commitment to innovative education, equitable access and a sustainable future.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {[
                            { n: '01', icon: GraduationCap, t: 'Career Guidance\n& Employability', d: 'Create educational environments for career guidance at secondary level and employability at higher education level, for all without barriers.' },
                            { n: '02', icon: Monitor, t: 'Innovative\nDigital Tools', d: 'Build new digital tools to improve student learning and outcomes.' },
                            { n: '03', icon: Settings, t: 'AI & Learning\nResearch', d: 'Integrate psychological principles of human learning and AI with computational methods for aptitude development and employability skills.' },
                            { n: '04', icon: Leaf, t: 'Sustainability\nEducation', d: 'Create and support opportunities for learning about sustainability through coursework, research, co-curricular activities and civic engagement.' },
                            { n: '05', icon: Globe, t: 'Global Awareness\n& Equity', d: 'Connect sustainability, global interdependence, equity and civic action, and provide research-informed professional development for teachers and school leaders.' },
                        ].map((o) => (
                            <div key={o.n} className={`${GLASS} rounded-[1.4rem] p-5 min-h-[320px] flex flex-col justify-between hover:-translate-y-1 transition`}>
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <span style={SERIF} className={`text-xl ${BLUE}`}>{o.n}</span>
                                        <o.icon size={20} strokeWidth={1.5} className={BLUE} />
                                    </div>
                                    <h4 className="text-[14px] font-bold leading-snug mb-2 whitespace-pre-line">{o.t}</h4>
                                    <p className="text-[11.5px] text-slate-600 leading-[1.65]">{o.d}</p>
                                </div>
                                <div className="flex justify-end pt-3"><ArrowBtn className="!w-5 !h-5" /></div>
                            </div>
                        ))}
                    </div>
                </Wrap>
            </section>

            {/* ================= CTA BANNER ================= */}
            <Wrap className="py-8">
                <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-r from-[#041a45] via-[#0a3a9c] to-[#1d5be0] text-white px-8 sm:px-12 py-10 shadow-[0_25px_60px_rgba(3,21,51,0.35)]">
                    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none">
                        <path d="M0 220 C250 80 450 300 750 150 C950 50 1100 120 1200 40 L1200 300 L0 300Z" fill="#38bdf8" opacity="0.5" />
                        <path d="M0 120 C200 40 400 160 600 90" stroke="#bae6fd" strokeWidth="2" />
                    </svg>
                    <div className="relative grid md:grid-cols-12 items-center gap-6">
                        <div className="md:col-span-5 space-y-2">
                            <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-sky-200 uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />BE PART OF LENSE
                            </span>
                            <h2 style={SERIF} className="text-3xl sm:text-4xl leading-[1.1] font-normal">Be part of<br />a meaningful change.</h2>
                        </div>
                        <p className="md:col-span-4 text-[13px] text-sky-100/90 leading-relaxed">
                            Collaborate, contribute, or participate in our programmes to help build a more inclusive, innovative, and sustainable future.
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