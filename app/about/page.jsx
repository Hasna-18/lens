'use client';
import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Leaf,
    Users,
    GraduationCap,
    Globe,
    Monitor,
    Brain,
    Sprout,
    Building2,
    HeartHandshake,
    FlaskConical,
    Mail,
    MapPin,
    Calendar,
    Award,
    Phone,
} from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 font-sans pb-28 selection:bg-[#a2d45e]/30 pt-28 sm:pt-36 relative overflow-hidden transition-colors duration-300">

            {/* ============================================================ */}
            {/* 0. HERO NATURAL ENVIRONMENT & SPHERE */}
            {/* ============================================================ */}
            <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
                <img
                    src="/about/about1.png"
                    alt="LEnSE Sustainability Sphere"
                    className="w-full h-full object-cover object-center lg:object-right-top scale-[1.04] transform-gpu"
                />

                {/* Soft Organic Fade Masks into the Canvas */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/80 dark:via-[#031008]/85 via-[18%] to-transparent to-[42%] w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#fcfdfa] dark:from-[#031008] via-[#fcfdfa]/60 dark:via-[#031008]/60 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#fcfdfa] dark:from-[#031008] to-transparent" />
            </div>

            {/* Ambient background glows (matching homepage) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[0%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f7f5e1]/60 via-[#ebf2e1]/30 to-transparent blur-[100px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#dbe9dd]/50 via-[#e4efe3]/30 to-transparent blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eef4ea]/50 to-transparent blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ============================================================ */}
                {/* A. DESKTOP VIEW (VISIBLE ON LARGE SCREENS ONLY - UNTOUCHED) */}
                {/* ============================================================ */}
                <div className="hidden lg:block">

                    {/* 1. HERO SECTION */}
                    <div className="grid grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] sm:min-h-[560px]">

                        {/* Left: Text & CTA */}
                        <div className="col-span-6 space-y-6 lg:pr-2 z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                                <span className="text-[11px] font-bold tracking-[0.22em] text-[#455748] dark:text-[#a2d45e] uppercase">
                                    ABOUT LEnSE
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-normal text-[#131f17] dark:text-white leading-[1.05] tracking-tight font-serif">
                                Learning today.<br />
                                <span className="italic text-[#243a29] dark:text-[#a2d45e] font-serif font-normal">Sustaining tomorrow.</span>
                            </h1>

                            <p className="text-[#405245] dark:text-slate-300 text-[13.5px] leading-[1.72] max-w-[430px] font-normal">
                                The Centre for Learning Engineering and Sustainability Education (LEnSE) at the University of Kerala was established in 2024 with the vision of promoting innovative, inclusive, and sustainable approaches to education, with a special focus on STEM (Science, Technology, Engineering and Mathematics) education. The Centre serves as a platform for academic engagement, capacity building, knowledge sharing, and collaborative initiatives aimed at strengthening learning and teaching practices.
                            </p>

                            <div className="pt-2">
                                <Link href="/academics" className="inline-flex">
                                    <button className="px-7 py-3.5 rounded-full bg-gradient-to-b from-[#1b3726] to-[#11261a] hover:from-[#234631] hover:to-[#173323] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 shadow-[0_12px_28px_rgba(15,35,22,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:scale-[1.03] group cursor-pointer dark:bg-gradient-to-b dark:from-[#1b432a] dark:to-[#112c1b] dark:border dark:border-[#245437]">
                                        <span>Our Programmes</span>
                                        <div className="w-5 h-5 rounded-full border border-white/35 flex items-center justify-center">
                                            <ArrowRight size={10} className="text-white group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Transparent Crystal Glass "Established in 2024" Card */}
                        <div className="col-span-6 relative flex items-center justify-start lg:justify-center min-h-[340px] sm:min-h-[420px]">
                            <div className="relative lg:ml-[-50px] xl:ml-[-90px] bg-gradient-to-br from-white/45 via-white/25 to-white/15 dark:from-[#0b1c14]/80 dark:via-[#08180f]/75 dark:to-[#040e08]/70 backdrop-blur-2xl p-6 sm:p-7 rounded-[2.2rem] border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),inset_2px_0_4px_rgba(255,255,255,0.8),0_25px_50px_-10px_rgba(0,30,15,0.25)] dark:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.5)] w-52 sm:w-60 z-20 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_30px_60px_-10px_rgba(0,30,15,0.3)]">
                                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/70 via-white/20 to-transparent dark:from-white/10 dark:via-transparent rounded-tl-[2.2rem] pointer-events-none" />
                                <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white/90 via-white/60 to-white/30 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.1),0_10px_20px_rgba(0,25,12,0.18)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center absolute -top-5 -right-5 text-[#122418] dark:text-[#a2d45e] z-30 transition-transform duration-500 hover:scale-110">
                                    <Sprout size={20} strokeWidth={1.75} />
                                </div>
                                <p className="text-[10px] font-bold text-[#354839] dark:text-[#a2d45e] uppercase tracking-[0.2em] mb-1.5 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                    Established in
                                </p>
                                <h3 className="text-4xl sm:text-5xl font-serif text-[#0f1d13] dark:text-white mb-3 tracking-tight font-normal relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] dark:drop-shadow-none">
                                    2024
                                </h3>
                                <p className="text-[11px] text-[#2c3d30] dark:text-slate-300 leading-relaxed font-medium mb-3 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                    Promoting innovative, inclusive, and sustainable approaches to STEM education.
                                </p>
                                <div className="w-5 h-[1.5px] bg-[#1d3527]/70 dark:bg-[#a2d45e] rounded-full mt-2 relative z-10" />
                            </div>
                        </div>

                    </div>

                    {/* 2. FOUR FEATURE CARDS DOCK */}
                    <div className="mt-8 sm:mt-12 p-3 sm:p-4 rounded-[2.8rem] bg-gradient-to-b from-white/40 via-white/25 to-white/15 dark:from-[#0b1c14]/85 dark:via-[#08180f]/80 dark:to-[#040e08]/75 backdrop-blur-3xl border-[1.5px] border-white/90 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),0_25px_60px_-10px_rgba(0,25,12,0.15)] dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.4)] relative z-20 transition-all duration-500">
                        <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-95 pointer-events-none" />
                        <div className="grid grid-cols-4 divide-x divide-white/70 dark:divide-[#183a27] relative z-10">
                            {[
                                { icon: Users, title: 'Inclusive by\nPurpose', desc: 'Creating opportunities\nfor all learners.' },
                                { icon: Leaf, title: 'Sustainability\nat Core', desc: 'Education that builds a\nbetter tomorrow.' },
                                { icon: GraduationCap, title: 'STEM\nFocused', desc: 'Hands-on learning for\nreal-world impact.' },
                                { icon: Globe, title: 'Global\nConnections', desc: 'Collaborating across\nborders for knowledge\nand growth.' }
                            ].map((ft, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-6 sm:p-8 group hover:bg-white/30 dark:hover:bg-white/5 transition-all duration-500 rounded-[2.2rem] relative">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/25 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_3px_6px_rgba(255,255,255,1),inset_0_-3px_5px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,25,12,0.12)] dark:shadow-[0_12px_24px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#112417] dark:text-[#a2d45e] mb-4 group-hover:scale-110 group-hover:shadow-[inset_0_3px_6px_rgba(255,255,255,1),0_16px_32px_rgba(0,25,12,0.18)] transition-all duration-500">
                                        <ft.icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <h4 className="text-[17px] font-serif font-normal text-[#101e14] dark:text-white mb-2 leading-snug whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                                        {ft.title}
                                    </h4>
                                    <p className="text-[11.5px] text-[#3f5244] dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                                        {ft.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. ABOUT LEnSE BENTO GRID */}
                    <div className="mt-24 sm:mt-32 lg:mt-36 grid grid-cols-12 gap-10 lg:gap-12 items-center relative z-20">
                        <div className="col-span-5 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                                <span className="text-[11px] font-bold tracking-[0.2em] text-[#4d5e50] dark:text-[#a2d45e] uppercase">
                                    ABOUT LEnSE
                                </span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-serif font-normal text-[#142218] dark:text-white leading-[1.12] tracking-tight">
                                Empowering minds.<br />
                                Building a <span className="italic text-[#243d2c] dark:text-[#a2d45e]">sustainable future.</span>
                            </h2>

                            <p className="text-[#455649] dark:text-slate-300 text-[13.5px] leading-[1.7] font-normal max-w-md">
                                LEnSE organizes seminars, workshops, conferences, training programmes, and academic activities in emerging areas of education, learning engineering, sustainability, and STEM.
                            </p>
                            <p className="text-[#455649] dark:text-slate-300 text-[13.5px] leading-[1.7] font-normal max-w-md">
                                Through collaborations with reputed institutions including SIET (Govt. of Kerala), REFORM, Child Development Centre Kazhakkoottam, and Clarkson University (USA), we create meaningful opportunities for students, teachers, scholars, and communities.
                            </p>

                            <div className="pt-2">
                                <Link href="/projects" className="inline-flex">
                                    <button className="px-7 py-3.5 rounded-full bg-white/60 hover:bg-white/90 dark:bg-[#0b1c14] dark:hover:bg-[#11261a] backdrop-blur-xl border-[1.5px] border-white dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.04)] dark:shadow-none text-[#162d1f] dark:text-[#a2d45e] text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 hover:scale-[1.03] group cursor-pointer">
                                        <span>Explore Research & Projects</span>
                                        <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-[#1e422c] flex items-center justify-center">
                                            <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Bento Grid */}
                        <div className="col-span-7 grid grid-cols-2 gap-4">
                            <div className="col-span-2 relative h-52 sm:h-56 rounded-[2.2rem] overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_15px_35px_rgba(0,25,12,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] group border-[1.5px] border-white/90 dark:border-[#183a27] transition-all duration-500 hover:-translate-y-1">
                                <img
                                    src="/about/about2.png"
                                    alt="Inspiring environments"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute left-6 sm:left-8 bottom-6 flex items-center gap-3.5 bg-white/25 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border-[1.5px] border-white/80 dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.2)] rounded-full p-2.5 pr-6 text-white transition-all duration-500 group-hover:bg-white/35 dark:group-hover:bg-[#122c1e]">
                                    <div className="w-9 h-9 rounded-full bg-white/40 dark:bg-[#132c1e] backdrop-blur-md border border-white/80 dark:border-[#1e422c] flex items-center justify-center shrink-0 shadow-sm text-white dark:text-[#a2d45e]">
                                        <Building2 size={16} />
                                    </div>
                                    <span className="text-xs font-semibold drop-shadow-sm max-w-[170px] leading-snug">
                                        Inspiring environments for impactful learning.
                                    </span>
                                </div>
                            </div>

                            <div className="relative h-52 sm:h-56 rounded-[2.2rem] overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_15px_35px_rgba(0,25,12,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] group border-[1.5px] border-white/90 dark:border-[#183a27] transition-all duration-500 hover:-translate-y-1">
                                <img
                                    src="/about/about3.png"
                                    alt="Collaborating"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                                    <div className="flex flex-col items-center gap-3 bg-white/25 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border-[1.5px] border-white/80 dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.2)] rounded-[1.8rem] p-5 w-full text-white transition-all duration-500 group-hover:bg-white/35 dark:group-hover:bg-[#122c1e]">
                                        <div className="w-9 h-9 rounded-full bg-white/40 dark:bg-[#132c1e] backdrop-blur-md border border-white/80 dark:border-[#1e422c] flex items-center justify-center shrink-0 shadow-sm text-white dark:text-[#a2d45e]">
                                            <Users size={16} />
                                        </div>
                                        <span className="text-xs font-semibold drop-shadow-sm max-w-[150px] leading-snug">
                                            Collaborating for a stronger academic ecosystem.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-52 sm:h-56 rounded-[2.2rem] bg-gradient-to-br from-white/55 via-white/35 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),0_20px_45px_rgba(0,25,12,0.06)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-6 sm:p-7 flex flex-col justify-center transition-all duration-500 hover:-translate-y-1 group">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/30 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_8px_18px_rgba(0,25,12,0.1)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#162d1f] dark:text-[#a2d45e] mb-4 group-hover:scale-110 transition-all duration-500">
                                    <FlaskConical size={22} strokeWidth={1.5} />
                                </div>
                                <p className="text-[#132216] dark:text-white text-[13.5px] font-medium leading-snug max-w-[190px] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                    A dedicated STEM Learning Lab for hands-on, experiential learning.
                                </p>
                            </div>

                            <div className="col-span-2 relative h-44 sm:h-48 rounded-[2.2rem] overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_15px_35px_rgba(0,25,12,0.06)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] group border-[1.5px] border-white/90 dark:border-[#183a27] transition-all duration-500 hover:-translate-y-1">
                                <img
                                    src="/about/about4.png"
                                    alt="Innovative labs"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute left-6 sm:left-8 bottom-6 flex items-center gap-3.5 bg-white/30 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border-[1.5px] border-white/80 dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_10px_25px_rgba(0,0,0,0.2)] rounded-full p-2.5 pr-6 text-white transition-all duration-500 group-hover:bg-white/40 dark:group-hover:bg-[#122c1e]">
                                    <div className="w-9 h-9 rounded-full bg-white/40 dark:bg-[#132c1e] backdrop-blur-md border border-white/80 dark:border-[#1e422c] flex items-center justify-center shrink-0 shadow-sm text-white dark:text-[#a2d45e]">
                                        <Leaf size={16} />
                                    </div>
                                    <span className="text-xs font-semibold drop-shadow-sm max-w-[190px] leading-snug">
                                        Innovative learning labs for exploration and experimentation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. OUR OBJECTIVES */}
                    <div className="mt-24 sm:mt-32 lg:mt-36 relative z-20">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-10">
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-serif font-normal text-[#142218] dark:text-white leading-[1.12] tracking-tight">
                                    Guiding our vision.<br />
                                    <span className="italic text-[#283d2d] dark:text-[#a2d45e] font-serif font-normal">Driving meaningful change.</span>
                                </h2>
                            </div>

                            <Link href="/projects" className="shrink-0">
                                <button className="px-6 py-3 rounded-full bg-white/80 hover:bg-white dark:bg-[#0b1c14] dark:hover:bg-[#11261a] backdrop-blur-xl border border-white/90 dark:border-[#183a27] shadow-[inset_0_1.5px_2px_rgba(255,255,255,1),0_8px_20px_rgba(0,0,0,0.03)] dark:shadow-none text-[#162d1f] dark:text-[#a2d45e] text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 hover:scale-[1.03] group cursor-pointer">
                                    <span>View All Objectives</span>
                                    <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-[#1e422c] flex items-center justify-center">
                                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </button>
                            </Link>
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                            {[
                                {
                                    num: '01',
                                    icon: Users,
                                    title: 'Accessible\nEducation',
                                    desc: 'Create educational environments using advanced computing to address career guidance and employability for all irrespective of barriers.'
                                },
                                {
                                    num: '02',
                                    icon: Monitor,
                                    title: 'Innovative\nDigital Tools',
                                    desc: 'Build new innovative digital tools that are helping catalyse continuous improvements in students learning.'
                                },
                                {
                                    num: '03',
                                    icon: Brain,
                                    title: 'Learning\nEngineering',
                                    desc: 'Integrate psychological principles of human learning and AI with computational methods for aptitude & skill development.'
                                },
                                {
                                    num: '04',
                                    icon: Sprout,
                                    title: 'Sustainability\nEducation',
                                    desc: 'Create and support opportunities for learning about sustainability through coursework, research, and civic engagement.'
                                },
                                {
                                    num: '05',
                                    icon: Globe,
                                    title: 'Equity & Global\nAwareness',
                                    desc: 'Connect sustainability, global interdependence, equity and civic action, providing research-informed development for educators.'
                                }
                            ].map((obj, i) => (
                                <div
                                    key={i}
                                    className="bg-gradient-to-b from-white/60 via-white/35 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-1px_2px_rgba(255,255,255,0.3),0_15px_35px_rgba(0,0,0,0.04)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-500 h-full group"
                                >
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-b from-white/95 via-white/65 to-white/30 dark:from-[#132c1e] dark:to-[#0b1c14] backdrop-blur-2xl border-[1.5px] border-white dark:border-[#1e422c] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06),0_8px_18px_rgba(0,25,12,0.08)] dark:shadow-[0_8px_18px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#14261a] dark:text-[#a2d45e] mb-6 shrink-0 group-hover:scale-110 transition-all duration-500">
                                        <obj.icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="text-[11px] font-bold text-[#637567] dark:text-[#a2d45e] uppercase tracking-widest mb-1.5">
                                            {obj.num}
                                        </div>
                                        <h4 className="text-[17px] font-serif font-semibold text-[#142217] dark:text-white mb-2 leading-snug whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                            {obj.title}
                                        </h4>
                                        <p className="text-[12px] text-[#4d5e51] dark:text-slate-300 leading-[1.65] font-normal">
                                            {obj.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 5. KEY INITIATIVES */}
                    <div className="mt-24 sm:mt-32 lg:mt-36 relative z-20">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4 rounded-[2rem] bg-gradient-to-br from-white/60 via-white/40 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px] group transition-all duration-500 hover:-translate-y-1.5">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-1.5 mb-5">
                                        <Leaf size={13} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
                                        <span className="text-[10.5px] font-bold tracking-[0.18em] text-[#3d5042] dark:text-[#a2d45e] uppercase">
                                            KEY INITIATIVES
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-serif font-normal text-[#122016] dark:text-white tracking-tight mb-3 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                        STEM Learning Lab
                                    </h3>
                                    <p className="text-[12.5px] text-[#445548] dark:text-slate-300 leading-relaxed max-w-[200px] font-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                                        Activity-based STEM training for school students and specialized programmes for prospective teachers in a state-of-the-art lab.
                                    </p>
                                </div>

                                <div className="w-9 h-9 rounded-full bg-white dark:bg-[#11261a] border border-white/90 dark:border-[#1e422c] shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#14261a] dark:text-[#a2d45e] hover:scale-110 transition-all duration-500 cursor-pointer z-10 mt-6 shrink-0">
                                    <ArrowRight size={13} />
                                </div>

                                <div className="absolute -bottom-2 -right-4 w-[78%] max-w-[250px] pointer-events-none group-hover:scale-105 transition-transform duration-700 z-0 opacity-90 dark:opacity-75">
                                    <img
                                        src="/about/a1.png"
                                        alt="Microscope STEM Lab"
                                        className="w-full h-auto object-contain rounded-2xl drop-shadow-md"
                                    />
                                </div>
                            </div>

                            <div className="col-span-8 grid grid-cols-2 gap-4">
                                {[
                                    {
                                        title: 'Scholar Connect',
                                        desc: 'A platform for scholars to interact, share research ideas, and explore collaborative opportunities.',
                                        img: '/about/a3.png'
                                    },
                                    {
                                        title: 'Institutional Collaborations',
                                        desc: 'Partnerships with SIET (Govt. of Kerala), REFORM, and Child Development Centre (CDC), Kazhakkoottam.',
                                        img: '/about/a5.png'
                                    },
                                    {
                                        title: 'STEM 4 Girls & Gifted Camps',
                                        desc: 'Collaborative projects with SIET across 41 districts & ICSSR state-wide STEM training empowering young girls.',
                                        img: '/about/a2.png'
                                    },
                                    {
                                        title: 'Global Academic Partnerships',
                                        desc: 'International collaboration with the STEM Centre at Clarkson University, USA with Prof. Jan De Waters.',
                                        img: '/about/a4.png'
                                    }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="rounded-[2rem] overflow-hidden relative min-h-[220px] sm:min-h-[230px] border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_15px_35px_rgba(0,25,12,0.05)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] bg-white/40 dark:bg-[#0b1c14]/90 backdrop-blur-xl flex flex-col justify-between p-7 sm:p-8 group transition-all duration-500 hover:-translate-y-1.5"
                                    >
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#f0f3eb]/95 via-[#f0f3eb]/75 to-transparent dark:from-[#08180f]/95 dark:via-[#08180f]/75 dark:to-transparent" />

                                        <div className="relative z-10">
                                            <h4 className="text-[17px] font-serif font-semibold text-[#122016] dark:text-white mb-2 leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                                {item.title}
                                            </h4>
                                            <p className="text-[12px] text-[#445548] dark:text-slate-300 leading-relaxed max-w-[230px] font-normal drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div className="relative z-10 w-9 h-9 rounded-full bg-white dark:bg-[#11261a] border border-white/90 dark:border-[#1e422c] shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-[#14261a] dark:text-[#a2d45e] hover:scale-110 transition-all duration-500 cursor-pointer shrink-0 mt-4">
                                            <ArrowRight size={13} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 6. SOCIAL IMPACT BANNER */}
                    <div className="mt-16 sm:mt-24 mb-12 rounded-[2.4rem] bg-gradient-to-b from-white/55 via-white/40 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-3xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-5 sm:p-6 grid grid-cols-12 gap-6 items-center relative z-20 transition-all duration-500">
                        <div className="col-span-3 h-44 sm:h-48 rounded-[2rem] overflow-hidden border border-white/80 dark:border-[#183a27] shadow-sm">
                            <img
                                src="/about/a5.png"
                                alt="Lush nature"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        <div className="col-span-6 space-y-3 px-1 sm:px-2">
                            <div className="flex items-center gap-1.5">
                                <Leaf size={12} className="text-[#2d5a3c] dark:text-[#a2d45e] fill-[#2d5a3c] dark:fill-[#a2d45e]" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-[#556758] dark:text-[#a2d45e] uppercase">
                                    SOCIAL IMPACT
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#122016] dark:text-white leading-tight tracking-tight whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                                Education with{'\n'}social responsibility.
                            </h2>

                            <div className="space-y-2 max-w-xl text-[12.5px] text-[#445548] dark:text-slate-300 leading-[1.7]">
                                <p>
                                    Programme fees collected from our training activities are utilized to support STEM education for socially and economically disadvantaged students in rural schools across Kerala.
                                </p>
                                <p>
                                    We believe every learner deserves the opportunity to explore, innovate, and excel.
                                </p>
                            </div>
                        </div>

                        <div className="col-span-3 p-6 rounded-[2rem] bg-gradient-to-b from-white/75 via-white/50 to-white/30 dark:from-[#11261a]/90 dark:via-[#0c1f15]/80 dark:to-[#08160f]/80 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_12px_28px_rgba(0,25,12,0.05)] dark:shadow-[0_12px_28px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center transition-all duration-500 hover:-translate-y-1 min-h-[170px]">
                            <div className="w-13 h-13 rounded-full bg-gradient-to-b from-white/95 via-white/60 to-white/30 dark:from-[#183d28] dark:to-[#112c1d] backdrop-blur-xl border border-white dark:border-[#1e422c] shadow-[inset_0_2px_3px_rgba(255,255,255,1),0_6px_14px_rgba(0,20,10,0.08)] flex items-center justify-center text-[#162d1f] dark:text-[#a2d45e] mb-3.5">
                                <HeartHandshake size={22} strokeWidth={1.5} />
                            </div>
                            <p className="text-[12px] font-semibold text-[#182b1d] dark:text-white leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                Empowering learners.<br />
                                Enriching communities.<br />
                                Sustaining the future.
                            </p>
                        </div>
                    </div>

                    {/* 7. LEADERSHIP & UNIVERSITY AFFILIATION */}
                    <div className="mt-8 mb-4 rounded-[2.4rem] bg-gradient-to-b from-white/60 via-white/40 to-white/20 dark:from-[#0b1c14]/90 dark:via-[#08180f]/85 dark:to-[#040e08]/80 backdrop-blur-3xl border-[1.5px] border-white/95 dark:border-[#183a27] shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_20px_45px_rgba(0,25,12,0.05)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] p-8 sm:p-10 relative z-20 transition-all duration-500">
                        <div className="grid grid-cols-12 gap-8 items-center">
                            <div className="col-span-7 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#2d5a3c] dark:bg-[#a2d45e]" />
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#556758] dark:text-[#a2d45e] uppercase">
                                        CENTRE LEADERSHIP
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#122016] dark:text-white">
                                    Dr. Divya C Senan
                                </h3>
                                <p className="text-sm font-medium text-[#2d5a3c] dark:text-[#a2d45e]">
                                    Director, Centre for Learning Engineering and Sustainability Education (LEnSE)
                                </p>
                                <p className="text-xs text-[#445548] dark:text-slate-300 leading-relaxed max-w-xl pt-1">
                                    Leading academic engagement, research initiatives, and state-wide STEM outreach programs in collaboration with national and international institutions.
                                </p>
                            </div>

                            <div className="col-span-5 space-y-3 p-5 sm:p-6 rounded-[1.8rem] bg-white/50 dark:bg-[#11261a]/70 backdrop-blur-xl border border-white/90 dark:border-[#1e422c] shadow-sm">
                                <div className="flex items-start gap-3 text-xs text-[#354639] dark:text-slate-300">
                                    <MapPin size={16} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0 mt-0.5" />
                                    <span>
                                        University of Kerala, Kariavattom Campus,<br />
                                        Thiruvananthapuram - 695581, Kerala, India
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-[#354639] dark:text-slate-300 pt-1">
                                    <Mail size={16} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                                    <a href="mailto:lenseedu24@gmail.com" className="text-[#1a3825] dark:text-[#a2d45e] font-semibold hover:underline">
                                        lenseedu24@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ============================================================ */}
                {/* B. MOBILE VIEW (VISIBLE ON MOBILE / SCREENS < LG) */}
                {/* MATCHES THE USER'S REFERENCE IMAGE EXACTLY */}
                {/* ============================================================ */}
                <div className="block lg:hidden pb-12">

                    {/* 1. Mobile Hero */}
                    <div className="pt-3 pb-2 relative">
                        <div className="grid grid-cols-12 gap-2.5 items-start">
                            {/* Left text */}
                            <div className="col-span-7 space-y-2.5 z-10 pr-0.5">
                                {/* Homepage-style Pill Badge */}
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e8efe9] dark:border-[#1e422c] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
                                    <Leaf size={11} className="fill-[#1b432a] text-[#1b432a] dark:fill-[#a2d45e] dark:text-[#a2d45e]" />
                                    <span className="text-[9.5px] font-bold tracking-wider text-[#1b432a] dark:text-[#a2d45e] uppercase">
                                        LEARN &bull; RESEARCH &bull; IMPACT
                                    </span>
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-normal text-[#112318] dark:text-white leading-[1.1] tracking-tight font-serif">
                                    Learning today.<br />
                                    <span className="italic text-[#1a5e35] dark:text-[#a2d45e] font-serif font-normal">Sustaining tomorrow.</span>
                                </h1>

                                <p className="text-[#556758] dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                                    The Centre for Learning Engineering and Sustainability Education (LEnSE) works at the intersection of education, technology and sustainability to build a more inclusive, equitable and resilient future.
                                </p>

                                <div className="pt-1">
                                    <Link href="/academics" className="inline-flex">
                                        <button className="px-5 py-2.5 rounded-full bg-[#083a20] hover:bg-[#114427] text-white text-xs font-semibold tracking-wide flex items-center gap-2 shadow-md hover:shadow-lg dark:bg-[#124225] dark:hover:bg-[#1a5c34] transition-all">
                                            <span>Our Programmes</span>
                                            <ArrowRight size={12} className="text-white" />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Glass Card: Established in 2024 */}
                            <div className="col-span-5 flex justify-end items-start pt-1 relative">
                                <div className="relative bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-2xl p-3.5 sm:p-4 rounded-2xl border border-[#e8efe9] dark:border-[#183a27] shadow-[0_8px_25px_rgba(0,0,0,0.05)] w-full max-w-[165px] z-20">
                                    {/* Signature Mint Circle Badge */}
                                    <div className="w-8 h-8 rounded-full bg-[#eef4ef] dark:bg-[#11261a] border border-[#d6e2d8] dark:border-[#1e422c] shadow-sm flex items-center justify-center absolute -top-2.5 -right-2.5 text-[#174b2b] dark:text-[#a2d45e] z-30">
                                        <Sprout size={16} strokeWidth={2} />
                                    </div>

                                    <p className="text-[9px] font-bold text-[#1b432a] dark:text-[#a2d45e] uppercase tracking-wider mb-0.5 relative z-10">
                                        Established in
                                    </p>

                                    <h3 className="text-3xl font-serif text-[#112318] dark:text-white mb-0.5 tracking-tight font-bold relative z-10">
                                        2024
                                    </h3>

                                    <p className="text-[10px] text-[#556758] dark:text-slate-300 leading-snug font-medium mb-1 relative z-10">
                                        Pioneering learning for a sustainable tomorrow.
                                    </p>

                                    <div className="w-5 h-[2px] bg-[#1a5e35] dark:bg-[#a2d45e] rounded-full mt-1.5 relative z-10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Mobile Four Feature Cards Dock */}
                    <div className="mt-8 p-2.5 sm:p-3.5 rounded-2xl bg-white/80 dark:bg-[#0b1c14]/80 backdrop-blur-2xl border border-[#e8efe9] dark:border-[#183a27] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative z-20">
                        <div className="grid grid-cols-4 divide-x divide-[#e8efe9] dark:divide-[#183a27] relative z-10">
                            {[
                                { icon: Users, title: 'Inclusive by\nPurpose', desc: 'Creating opportunities\nfor all learners.' },
                                { icon: Leaf, title: 'Sustainability\nat Core', desc: 'Learner-centered\nsolutions for\nreal-world impact.' },
                                { icon: GraduationCap, title: 'STEM for\nSocial Good', desc: 'Hands-on\nlearning for\nmeaningful change.' },
                                { icon: Globe, title: 'Global\nConnections', desc: 'Collaborating\nacross borders\nfor a better world.' }
                            ].map((ft, i) => (
                                <div key={i} className="flex flex-col items-center text-center px-1 sm:px-2 py-1.5 sm:py-2 group">
                                    <div className="w-10 h-10 rounded-full bg-[#eef4ef] dark:bg-[#11261a] border border-[#dce8de] dark:border-[#1e422c] shadow-sm flex items-center justify-center text-[#174b2b] dark:text-[#a2d45e] mb-1.5 group-hover:scale-105 transition-transform">
                                        <ft.icon size={16} strokeWidth={1.6} />
                                    </div>
                                    <h4 className="text-[10px] sm:text-xs font-serif font-bold text-[#112318] dark:text-white mb-0.5 leading-tight whitespace-pre-line">
                                        {ft.title}
                                    </h4>
                                    <p className="text-[8.5px] sm:text-[9.5px] text-[#556758] dark:text-slate-400 leading-tight whitespace-pre-line font-medium">
                                        {ft.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Mobile About LEnSE Bento Grid */}
                    <div className="mt-8 grid grid-cols-12 gap-3 items-center relative z-20">
                        {/* Left text */}
                        <div className="col-span-5 space-y-2 pr-0.5">
                            {/* Homepage-style Pill Badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#0c1f15] border border-[#e8efe9] dark:border-[#1e422c] shadow-sm">
                                <Leaf size={10} className="fill-[#1b432a] text-[#1b432a] dark:fill-[#a2d45e] dark:text-[#a2d45e]" />
                                <span className="text-[9.5px] font-bold tracking-wider text-[#1b432a] dark:text-[#a2d45e] uppercase">
                                    ABOUT LEnSE
                                </span>
                            </div>

                            <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#112318] dark:text-white leading-tight tracking-tight">
                                Empowering minds.<br />
                                Building a <span className="italic text-[#1a5e35] dark:text-[#a2d45e]">sustainable future.</span>
                            </h2>

                            <p className="text-[#556758] dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                                LEnSE engages in research, education, teaching programmes and collaborative initiatives to reimagine learning for a more equitable and sustainable world.
                            </p>

                            <div className="pt-1">
                                <Link href="/projects" className="inline-flex">
                                    <button className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white hover:bg-[#f8faf8] dark:bg-[#0c1f15] dark:hover:bg-[#122c1e] border border-[#d6e0d8] dark:border-[#1e422c] shadow-sm text-[#0a311b] dark:text-[#a2d45e] text-[9.5px] sm:text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all">
                                        <span>Explore Research & Projects</span>
                                        <ArrowRight size={10} />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Bento Grid */}
                        <div className="col-span-7 grid grid-cols-2 gap-2">
                            {/* Top Wide Glass Card */}
                            <div className="col-span-2 relative h-20 sm:h-26 rounded-xl overflow-hidden shadow-sm border border-[#e8efe9] dark:border-[#183a27]">
                                <img
                                    src="/about/about2.png"
                                    alt="Inspiring environments"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute left-2 bottom-1.5 flex items-center gap-1.5 bg-[#082012]/80 dark:bg-black/70 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 text-white">
                                    <div className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                                        <ArrowRight size={8} />
                                    </div>
                                    <span className="text-[8.5px] sm:text-[10px] font-medium leading-tight">
                                        Inspiring environments for impactful learning.
                                    </span>
                                </div>
                            </div>

                            {/* Middle Left Glass Card */}
                            <div className="relative h-20 sm:h-26 rounded-xl overflow-hidden shadow-sm border border-[#e8efe9] dark:border-[#183a27]">
                                <img
                                    src="/about/about3.png"
                                    alt="Collaborating"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute left-1.5 bottom-1.5 right-1.5 flex items-center gap-1 bg-[#082012]/80 dark:bg-black/70 backdrop-blur-md border border-white/20 rounded-full px-2 py-1 text-white">
                                    <div className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                                        <ArrowRight size={7} />
                                    </div>
                                    <span className="text-[8px] sm:text-[9.5px] font-medium leading-tight truncate">
                                        Collaborating for academic ecosystem.
                                    </span>
                                </div>
                            </div>

                            {/* Middle Right (Mint Green Card) */}
                            <div className="relative h-20 sm:h-26 rounded-xl bg-white/90 dark:bg-[#0b1c14]/90 backdrop-blur-2xl border border-[#e8efe9] dark:border-[#183a27] shadow-sm p-2 flex flex-col justify-center items-center text-center">
                                <div className="w-7 h-7 rounded-full bg-[#eef4ef] dark:bg-[#11261a] border border-[#dce8de] dark:border-[#1e422c] shadow-sm flex items-center justify-center text-[#174b2b] dark:text-[#a2d45e] mb-1">
                                    <FlaskConical size={13} strokeWidth={1.6} />
                                </div>
                                <p className="text-[#112318] dark:text-white text-[9px] sm:text-[10.5px] font-medium leading-snug">
                                    A dedicated STEM Learning Lab for hands-on, experiential learning.
                                </p>
                            </div>

                            {/* Bottom Wide Glass Card */}
                            <div className="col-span-2 relative h-20 sm:h-26 rounded-xl overflow-hidden shadow-sm border border-[#e8efe9] dark:border-[#183a27]">
                                <img
                                    src="/about/about4.png"
                                    alt="Innovative labs"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute left-2 bottom-1.5 flex items-center gap-1.5 bg-[#082012]/80 dark:bg-black/70 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1 text-white">
                                    <div className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                                        <ArrowRight size={8} />
                                    </div>
                                    <span className="text-[8.5px] sm:text-[10px] font-medium leading-tight">
                                        Innovative learning labs for exploration and experimentation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Mobile Guiding Our Vision (Objectives) */}
                    <div className="mt-8 relative z-20">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#112318] dark:text-white leading-tight tracking-tight">
                                    Guiding our vision.<br />
                                    <span className="italic text-[#1a5e35] dark:text-[#a2d45e] font-serif font-normal">Driving meaningful change.</span>
                                </h2>
                            </div>

                            <Link href="/projects" className="shrink-0">
                                <button className="px-3 py-1.5 rounded-full bg-white hover:bg-[#f8faf8] dark:bg-[#0c1f15] dark:hover:bg-[#122c1e] border border-[#d6e0d8] dark:border-[#1e422c] text-[#0a311b] dark:text-[#a2d45e] text-[9px] sm:text-[10.5px] font-semibold tracking-wide flex items-center gap-1 shadow-sm transition-all">
                                    <span>View All Objectives</span>
                                    <ArrowRight size={8} />
                                </button>
                            </Link>
                        </div>

                        {/* Row 1: 3 cards */}
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            {[
                                {
                                    num: '01',
                                    icon: Users,
                                    title: 'Accessible\nEducation',
                                    desc: 'Create educational environments that are inclusive, equitable and accessible for all learners irrespective of context.'
                                },
                                {
                                    num: '02',
                                    icon: Monitor,
                                    title: 'Innovative\nDigital Tools',
                                    desc: 'Build or use technological tools that enhance learning experiences for diverse students and communities.'
                                },
                                {
                                    num: '03',
                                    icon: Brain,
                                    title: 'Learning\nEngineering',
                                    desc: 'Incorporate pedagogical principles of human learning and AI/ML in educational design to create accessible and effective content.'
                                }
                            ].map((obj, i) => (
                                <div
                                    key={i}
                                    className="bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-2xl border border-[#e8efe9] dark:border-[#183a27] rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#eef4ef] dark:bg-[#11261a] border border-[#dce8de] dark:border-[#1e422c] shadow-sm flex items-center justify-center text-[#174b2b] dark:text-[#a2d45e] mb-2 shrink-0">
                                        <obj.icon size={15} strokeWidth={1.6} />
                                    </div>
                                    <div>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-[#1a5e35] dark:text-[#a2d45e] uppercase tracking-wider mb-0.5">
                                            {obj.num}
                                        </div>
                                        <h4 className="text-[10.5px] sm:text-xs font-serif font-bold text-[#112318] dark:text-white mb-1 leading-snug whitespace-pre-line">
                                            {obj.title}
                                        </h4>
                                        <p className="text-[8.5px] sm:text-[9.5px] text-[#556758] dark:text-slate-300 leading-snug font-normal">
                                            {obj.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Row 2: 2 cards in 3 cols matching row 1 */}
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                {
                                    num: '04',
                                    icon: Sprout,
                                    title: 'Sustainability\nEducation',
                                    desc: 'Create and support opportunities for learning about sustainability through courses, research, and civic engagement.'
                                },
                                {
                                    num: '05',
                                    icon: Globe,
                                    title: 'Equity & Global\nAwareness',
                                    desc: 'Build partnerships for a more equitable and globally connected world.'
                                }
                            ].map((obj, i) => (
                                <div
                                    key={i}
                                    className="bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-2xl border border-[#e8efe9] dark:border-[#183a27] rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#eef4ef] dark:bg-[#11261a] border border-[#dce8de] dark:border-[#1e422c] shadow-sm flex items-center justify-center text-[#174b2b] dark:text-[#a2d45e] mb-2 shrink-0">
                                        <obj.icon size={15} strokeWidth={1.6} />
                                    </div>
                                    <div>
                                        <div className="text-[9px] sm:text-[10px] font-bold text-[#1a5e35] dark:text-[#a2d45e] uppercase tracking-wider mb-0.5">
                                            {obj.num}
                                        </div>
                                        <h4 className="text-[10.5px] sm:text-xs font-serif font-bold text-[#112318] dark:text-white mb-1 leading-snug whitespace-pre-line">
                                            {obj.title}
                                        </h4>
                                        <p className="text-[8.5px] sm:text-[9.5px] text-[#556758] dark:text-slate-300 leading-snug font-normal">
                                            {obj.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 5. Mobile Key Initiatives */}
                    <div className="mt-8 relative z-20">
                        {/* Top Large Card: STEM Learning Lab */}
                        <div className="rounded-2xl bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-2xl border border-[#e8efe9] dark:border-[#183a27] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-4 relative overflow-hidden mb-2.5">
                            <div className="relative z-10 max-w-[58%]">
                                <div className="flex items-center gap-1.5 mb-1">
                                    <Leaf size={11} className="fill-[#1b432a] text-[#1b432a] dark:fill-[#a2d45e] dark:text-[#a2d45e]" />
                                    <span className="text-[9.5px] font-bold tracking-wider text-[#1b432a] dark:text-[#a2d45e] uppercase">
                                        KEY INITIATIVES
                                    </span>
                                </div>
                                <h3 className="text-base sm:text-xl font-serif font-normal text-[#112318] dark:text-white tracking-tight mb-1">
                                    STEM Learning Lab
                                </h3>
                                <p className="text-[10.5px] sm:text-xs text-[#556758] dark:text-slate-300 leading-snug font-normal mb-2.5">
                                    An open hub for experimentation, innovation and hands-on learning experiences.
                                </p>
                                <Link href="/projects" className="inline-flex">
                                    <button className="px-3 py-1.5 rounded-full bg-white hover:bg-[#f8faf8] border border-[#d6e0d8] dark:bg-[#0c1f15] dark:border-[#1e422c] shadow-sm text-[#0a311b] dark:text-[#a2d45e] text-[9px] sm:text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all">
                                        <span>Explore Research & Projects</span>
                                        <ArrowRight size={8} />
                                    </button>
                                </Link>
                            </div>

                            {/* Microscope photo on right */}
                            <div className="absolute top-2.5 bottom-2.5 right-2.5 w-[38%] rounded-xl overflow-hidden shadow-sm border border-[#e8efe9]">
                                <img
                                    src="/about/a1.png"
                                    alt="Microscope STEM Lab"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute right-2 bottom-2 w-5 h-5 rounded-full bg-[#083a20] dark:bg-[#124225] shadow-sm flex items-center justify-center text-white dark:text-[#a2d45e]">
                                    <ArrowRight size={9} />
                                </div>
                            </div>
                        </div>

                        {/* Bottom 2x2 Grid Glass Cards */}
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                {
                                    title: 'Scholar Connect',
                                    desc: 'A platform that bridges students, researchers and institutions for collaboration.',
                                    img: '/about/a3.png'
                                },
                                {
                                    title: 'Institutional Collaborations',
                                    desc: 'Partnering with universities and industry to expand opportunities and impact.',
                                    img: '/about/a5.png'
                                },
                                {
                                    title: 'STEM 4 Girls & Gifted Camps',
                                    desc: 'Nurturing the next generation of innovators.',
                                    img: '/about/a2.png'
                                },
                                {
                                    title: 'Global Academic Partnerships',
                                    desc: 'Building international networks and knowledge exchange.',
                                    img: '/about/a4.png'
                                }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl overflow-hidden relative min-h-[95px] sm:min-h-[110px] border border-[#e8efe9] dark:border-[#183a27] shadow-sm bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-xl flex flex-col justify-between p-3"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-85 dark:opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/35 dark:from-[#08180f]/95 dark:via-[#08180f]/80 dark:to-transparent" />

                                    <div className="relative z-10">
                                        <h4 className="text-[11px] sm:text-xs font-serif font-bold text-[#112318] dark:text-white mb-0.5 leading-snug">
                                            {item.title}
                                        </h4>
                                        <p className="text-[9.5px] sm:text-[11px] text-[#556758] dark:text-slate-300 leading-snug font-normal max-w-[130px]">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="relative z-10 w-5 h-5 rounded-full bg-[#083a20] dark:bg-[#124225] border border-white/20 shadow-sm flex items-center justify-center text-white dark:text-[#a2d45e] shrink-0 mt-1 self-end">
                                        <ArrowRight size={8} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 6. Mobile Social Impact Banner */}
                    <div className="mt-8 rounded-2xl bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-3xl border border-[#e8efe9] dark:border-[#183a27] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-3.5 grid grid-cols-12 gap-2.5 items-center relative z-20">
                        {/* Left image */}
                        <div className="col-span-3 h-20 sm:h-24 rounded-xl overflow-hidden border border-[#e8efe9] shadow-sm">
                            <img
                                src="/about/a5.png"
                                alt="Lush nature"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Middle text */}
                        <div className="col-span-6 space-y-1 px-0.5">
                            <div className="flex items-center gap-1">
                                <Leaf size={10} className="fill-[#1b432a] text-[#1b432a] dark:fill-[#a2d45e] dark:text-[#a2d45e]" />
                                <span className="text-[9px] font-bold tracking-wider text-[#1b432a] dark:text-[#a2d45e] uppercase">
                                    SOCIAL IMPACT
                                </span>
                            </div>

                            <h2 className="text-xs sm:text-sm font-serif font-bold text-[#112318] dark:text-white leading-tight">
                                Education with{'\n'}social responsibility.
                            </h2>

                            <p className="text-[9px] sm:text-[10.5px] text-[#556758] dark:text-slate-300 leading-snug">
                                Focusing on responsible and inclusive learning contributes to educational outcomes that create a force for good - empowering individuals and communities to create a fairer, more sustainable future.
                            </p>
                        </div>

                        {/* Right Glass Card */}
                        <div className="col-span-3 p-2 rounded-xl bg-[#eef5f0] dark:bg-[#11261a] border border-[#d6e2d8] dark:border-[#1e422c] shadow-sm flex flex-col items-center justify-center text-center min-h-[75px]">
                            <div className="w-7 h-7 rounded-full bg-white dark:bg-[#0b1c14] border border-[#dce8de] shadow-sm flex items-center justify-center text-[#174b2b] dark:text-[#a2d45e] mb-1">
                                <HeartHandshake size={14} strokeWidth={1.6} />
                            </div>
                            <p className="text-[8.5px] sm:text-[9.5px] font-semibold text-[#14261a] dark:text-white leading-tight">
                                Empowering learners.<br />
                                Strengthening communities.<br />
                                Sustaining the future.
                            </p>
                        </div>
                    </div>

                    {/* 7. Mobile Centre Leadership */}
                    <div className="mt-8 rounded-2xl bg-white/85 dark:bg-[#0b1c14]/85 backdrop-blur-3xl border border-[#e8efe9] dark:border-[#183a27] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-3.5 grid grid-cols-12 gap-2 items-center relative z-20">
                        {/* Left: Director details */}
                        <div className="col-span-5 space-y-1">
                            <div className="flex items-center gap-1">
                                <Leaf size={9} className="fill-[#1b432a] text-[#1b432a] dark:fill-[#a2d45e] dark:text-[#a2d45e]" />
                                <span className="text-[8.5px] sm:text-[9.5px] font-bold tracking-wider text-[#1b432a] dark:text-[#a2d45e] uppercase">
                                    CENTRE LEADERSHIP
                                </span>
                            </div>
                            <h3 className="text-xs sm:text-sm font-serif font-bold text-[#112318] dark:text-white leading-tight">
                                Dr. Divya C Senan
                            </h3>
                            <p className="text-[9px] sm:text-[10px] font-medium text-[#1a5e35] dark:text-[#a2d45e] leading-snug">
                                Director, Centre for Learning Engineering and Sustainability Education (LEnSE)
                            </p>
                            <p className="text-[8.5px] sm:text-[9.5px] text-[#556758] dark:text-slate-300 leading-snug">
                                Leading initiatives in sustainable education, interdisciplinary research, and inclusive learning for a better tomorrow.
                            </p>
                            <div className="pt-0.5">
                                <Link href="/about/director" className="inline-flex">
                                    <button className="px-2.5 py-1 rounded-full bg-white hover:bg-[#f8faf8] border border-[#d6e0d8] dark:bg-[#0c1f15] dark:border-[#1e422c] shadow-sm text-[#0a311b] dark:text-[#a2d45e] text-[8.5px] sm:text-[9.5px] font-semibold tracking-wider flex items-center gap-1">
                                        <span>Know More</span>
                                        <ArrowRight size={7} />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Middle: Photo */}
                        <div className="col-span-3 flex justify-center">
                            <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-xl overflow-hidden shadow-sm border border-[#e8efe9]">
                                <img src="/about/a1.png" className="w-full h-full object-cover" alt="Director" />
                            </div>
                        </div>

                        {/* Right: University Contact */}
                        <div className="col-span-4 space-y-1.5 p-2 sm:p-2.5 rounded-xl bg-[#eef5f0]/80 dark:bg-[#11261a]/80 backdrop-blur-xl border border-[#d6e2d8] dark:border-[#1e422c] shadow-sm">
                            <div className="flex items-start gap-1 text-[8px] sm:text-[9px] text-[#3c4e41] dark:text-slate-200">
                                <MapPin size={9} className="text-[#174b2b] dark:text-[#a2d45e] shrink-0 mt-0.5" />
                                <span className="leading-tight">
                                    University of Kerala<br />
                                    Kariavattom, TVM<br />
                                    Kerala, India
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-[#3c4e41] dark:text-slate-200 pt-0.5">
                                <Mail size={9} className="text-[#174b2b] dark:text-[#a2d45e] shrink-0" />
                                <a href="mailto:lense@keralauniversity.ac.in" className="text-[#1a5e35] dark:text-[#a2d45e] font-semibold hover:underline truncate">
                                    lense@keralauniversity.ac.in
                                </a>
                            </div>
                            <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-[#3c4e41] dark:text-slate-200">
                                <Phone size={9} className="text-[#174b2b] dark:text-[#a2d45e] shrink-0" />
                                <span>+91 123 456 7890</span>
                            </div>
                        </div>
                    </div>

                    {/* 8. Mobile "Be part of the change" Banner */}
                    <div className="mt-8 rounded-2xl bg-[#083a20] dark:bg-[#0b2416] p-4 flex items-center justify-between shadow-lg relative z-20">
                        <div className="space-y-0.5 max-w-[65%]">
                            <h3 className="text-sm sm:text-base font-serif text-white font-normal">
                                Be part of the change.
                            </h3>
                            <p className="text-[10.5px] sm:text-xs text-[#c6e5ce] dark:text-emerald-200/90 leading-snug">
                                Together we can create innovative learning solutions for a more sustainable world.
                            </p>
                        </div>
                        <Link href="/contact" className="inline-flex shrink-0">
                            <button className="px-4 py-2 rounded-full bg-white text-[#083a20] text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 hover:bg-slate-100 transition-colors">
                                <span>Get Involved</span>
                                <ArrowRight size={8} />
                            </button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}
