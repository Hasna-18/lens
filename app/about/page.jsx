'use client';
import React from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Sparkles,
    Users,
    GraduationCap,
    Globe,
    Monitor,
    Brain,
    Atom,
    Building2,
    HeartHandshake,
    FlaskConical,
    Mail,
    MapPin,
    Calendar,
    Award,
    Cpu,
    Leaf,
    FileText,
    BookOpen,
} from 'lucide-react';

// =========================================================================
// 3D ISOMETRIC GLOWING CRYSTAL CUBES (PURE CODE / SVG)
// =========================================================================
function StemIsometricCubes() {
    const dx = 22;
    const dy = 13;
    const h = 26;
    const originX = 85;
    const originY = 125;

    // Steps 0 to 4 (5 columns), with ascending heights 1 to 5
    const stepsConfig = [
        { u: 0, height: 1, top: 'url(#stem-top-0)', left: 'url(#stem-left-0)', right: 'url(#stem-right-0)' },
        { u: 1, height: 2, top: 'url(#stem-top-1)', left: 'url(#stem-left-1)', right: 'url(#stem-right-1)' },
        { u: 2, height: 3, top: 'url(#stem-top-2)', left: 'url(#stem-left-2)', right: 'url(#stem-right-2)' },
        { u: 3, height: 4, top: 'url(#stem-top-3)', left: 'url(#stem-left-3)', right: 'url(#stem-right-3)' },
        { u: 4, height: 5, top: 'url(#stem-top-4)', left: 'url(#stem-left-4)', right: 'url(#stem-right-4)' },
    ];

    const cubes = [];
    stepsConfig.forEach((step) => {
        for (let v = 0; v < 2; v++) {
            for (let w = 0; w < step.height; w++) {
                const cx = originX + (step.u - v) * dx;
                const cy = originY + (step.u + v) * dy - w * h;
                cubes.push({
                    key: `${step.u}-${v}-${w}`,
                    cx,
                    cy,
                    depth: (step.u + v) * 100 + w,
                    topFill: step.top,
                    leftFill: step.left,
                    rightFill: step.right,
                    isTop: w === step.height - 1,
                });
            }
        }
    });

    // Painter's algorithm sort (back to front)
    cubes.sort((a, b) => a.depth - b.depth);

    return (
        <svg
            viewBox="0 0 240 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-[0_20px_35px_rgba(2,132,199,0.35)] select-none"
        >
            <defs>
                {/* Glow Filter */}
                <filter id="stem-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Floor Caustic Glow */}
                <radialGradient id="stem-floor-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
                    <stop offset="50%" stopColor="#0284c7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>

                {/* Step 0 Gradients (Cyan Crystal) */}
                <linearGradient id="stem-top-0" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e0f2fe" />
                    <stop offset="45%" stopColor="#7dd3fc" />
                    <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="stem-left-0" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="stem-right-0" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>

                {/* Step 1 Gradients (Sky Blue) */}
                <linearGradient id="stem-top-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="45%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="stem-left-1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="stem-right-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>

                {/* Step 2 Gradients (Azure Blue) */}
                <linearGradient id="stem-top-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#93c5fd" />
                    <stop offset="45%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="stem-left-2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="stem-right-2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>

                {/* Step 3 Gradients (Electric Royal) */}
                <linearGradient id="stem-top-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a5b4fc" />
                    <stop offset="45%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="stem-left-3" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="stem-right-3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#3730a3" />
                </linearGradient>

                {/* Step 4 Gradients (Deep Sapphire) */}
                <linearGradient id="stem-top-4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c7d2fe" />
                    <stop offset="45%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4338ca" />
                </linearGradient>
                <linearGradient id="stem-left-4" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#3730a3" />
                </linearGradient>
                <linearGradient id="stem-right-4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3730a3" />
                    <stop offset="100%" stopColor="#1e1b4b" />
                </linearGradient>
            </defs>

            {/* Glowing Floor Reflection Ellipse */}
            <ellipse cx="120" cy="188" rx="84" ry="22" fill="url(#stem-floor-glow)" filter="url(#stem-glow)" />

            {/* Floor Perspective Grid Lines */}
            <g stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="0.8">
                <line x1="40" y1="170" x2="120" y2="216" />
                <line x1="62" y1="157" x2="142" y2="203" />
                <line x1="84" y1="144" x2="164" y2="190" />
                <line x1="120" y1="216" x2="200" y2="170" />
                <line x1="98" y1="203" x2="178" y2="157" />
                <line x1="76" y1="190" x2="156" y2="144" />
            </g>

            {/* Render 3D Isometric Cubes */}
            {cubes.map((c) => {
                const { cx, cy, topFill, leftFill, rightFill, isTop } = c;
                return (
                    <g key={c.key} className="transition-all duration-300">
                        {/* Left Face */}
                        <path
                            d={`M ${cx - dx} ${cy - h} L ${cx} ${cy - h + dy} L ${cx} ${cy + dy} L ${cx - dx} ${cy} Z`}
                            fill={leftFill}
                            fillOpacity="0.92"
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="0.8"
                            strokeLinejoin="round"
                        />

                        {/* Right Face */}
                        <path
                            d={`M ${cx} ${cy - h + dy} L ${cx + dx} ${cy - h} L ${cx + dx} ${cy} L ${cx} ${cy + dy} Z`}
                            fill={rightFill}
                            fillOpacity="0.94"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="0.8"
                            strokeLinejoin="round"
                        />

                        {/* Top Face */}
                        <path
                            d={`M ${cx} ${cy - h - dy} L ${cx + dx} ${cy - h} L ${cx} ${cy - h + dy} L ${cx - dx} ${cy - h} Z`}
                            fill={topFill}
                            fillOpacity={isTop ? "0.98" : "0.75"}
                            stroke="rgba(255,255,255,0.75)"
                            strokeWidth="0.9"
                            strokeLinejoin="round"
                        />

                        {/* Top Specular Sheen (for top-most cubes) */}
                        {isTop && (
                            <path
                                d={`M ${cx} ${cy - h - dy} L ${cx + dx * 0.6} ${cy - h - dy * 0.4} L ${cx} ${cy - h} L ${cx - dx * 0.6} ${cy - h - dy * 0.4} Z`}
                                fill="white"
                                fillOpacity="0.4"
                            />
                        )}
                    </g>
                );
            })}

            {/* Sparkle Stars on Top Corners */}
            <g fill="white" filter="url(#stem-glow)">
                {/* Star on highest step */}
                <path d="M 173 17 L 175 25 L 183 27 L 175 29 L 173 37 L 171 29 L 163 27 L 171 25 Z" opacity="0.9" />
                {/* Star on front step */}
                <path d="M 53 92 L 54.5 97 L 59.5 98.5 L 54.5 100 L 53 105 L 51.5 100 L 46.5 98.5 L 51.5 97 Z" opacity="0.85" />
                {/* Little floating energy dots */}
                <circle cx="205" cy="65" r="2" fill="#38bdf8" opacity="0.8" />
                <circle cx="35" cy="135" r="1.5" fill="#67e8f9" opacity="0.7" />
                <circle cx="185" cy="115" r="2" fill="#818cf8" opacity="0.75" />
            </g>
        </svg>
    );
}

export default function AboutPage() {
    const seed = 8;
    const animate = false;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-100 font-sans pb-28 selection:bg-[#38bdf8]/30 selection:text-white pt-28 sm:pt-36 relative overflow-hidden transition-colors duration-300">

            {/* ============================================================ */}
            {/* 0. HERO OCEAN WAVE BACKGROUND */}
            {/* ============================================================ */}
            <div className="absolute top-0 right-0 w-full lg:w-[68%] xl:w-[62%] h-[840px] sm:h-[920px] pointer-events-none z-0 overflow-hidden select-none">
                {/* Ocean wave background */}
                <svg
                    viewBox="0 0 1600 660"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        display: "block",
                    }}
                >
                    <defs>
                        {/* Blue and turquoise flowing water */}
                        <filter
                            id="wave-water"
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            colorInterpolationFilters="sRGB"
                        >
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.0022 0.013"
                                numOctaves="4"
                                seed={seed}
                                result="noise"
                            >
                                {animate && (
                                    <animate
                                        attributeName="baseFrequency"
                                        dur="40s"
                                        repeatCount="indefinite"
                                        values="0.0022 0.013; 0.0030 0.015; 0.0022 0.013"
                                    />
                                )}
                            </feTurbulence>

                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.0015 0.004"
                                numOctaves="2"
                                seed={seed + 3}
                                result="warp"
                            />

                            <feDisplacementMap
                                in="noise"
                                in2="warp"
                                scale="260"
                                xChannelSelector="R"
                                yChannelSelector="G"
                                result="bent"
                            />

                            <feColorMatrix
                                in="bent"
                                type="matrix"
                                values="1 0 0 0 0
                      1 0 0 0 0
                      1 0 0 0 0
                      0 0 0 0 1"
                                result="grey"
                            />

                            <feComponentTransfer in="grey" result="contrast">
                                <feFuncR
                                    type="linear"
                                    slope="2.6"
                                    intercept="-0.78"
                                />
                                <feFuncG
                                    type="linear"
                                    slope="2.6"
                                    intercept="-0.78"
                                />
                                <feFuncB
                                    type="linear"
                                    slope="2.6"
                                    intercept="-0.78"
                                />
                            </feComponentTransfer>

                            <feComponentTransfer in="contrast" result="coloured">
                                <feFuncR
                                    type="table"
                                    tableValues="0.03 0.04 0.04 0.16 0.49 0.81 0.96"
                                />
                                <feFuncG
                                    type="table"
                                    tableValues="0.23 0.37 0.53 0.68 0.81 0.92 0.98"
                                />
                                <feFuncB
                                    type="table"
                                    tableValues="0.43 0.61 0.75 0.84 0.89 0.95 0.98"
                                />
                            </feComponentTransfer>

                            <feGaussianBlur
                                in="coloured"
                                stdDeviation="22 2.5"
                            />
                        </filter>

                        {/* Soft white ocean foam */}
                        <filter
                            id="wave-foam"
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            colorInterpolationFilters="sRGB"
                        >
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.0028 0.022"
                                numOctaves="4"
                                seed={seed + 11}
                                result="n"
                            />

                            <feColorMatrix
                                in="n"
                                type="matrix"
                                values="0 0 0 0 1
                      0 0 0 0 1
                      0 0 0 0 1
                      4.2 0 0 0 -1.75"
                            />

                            <feGaussianBlur stdDeviation="26 3" />
                        </filter>

                        {/* Foam positioning gradients */}
                        <radialGradient
                            id="foam-bottom"
                            cx="0.8"
                            cy="1.05"
                            r="0.62"
                            gradientTransform="translate(0.8 1.05) scale(1.25 0.8) translate(-0.8 -1.05)"
                        >
                            <stop offset="0" stopColor="#fff" />
                            <stop
                                offset="0.55"
                                stopColor="#fff"
                                stopOpacity="0.75"
                            />
                            <stop
                                offset="1"
                                stopColor="#fff"
                                stopOpacity="0"
                            />
                        </radialGradient>

                        <radialGradient
                            id="foam-right"
                            cx="1"
                            cy="0.2"
                            r="0.4"
                        >
                            <stop offset="0" stopColor="#fff" />
                            <stop
                                offset="1"
                                stopColor="#fff"
                                stopOpacity="0"
                            />
                        </radialGradient>

                        <radialGradient
                            id="foam-left"
                            cx="0.05"
                            cy="0.82"
                            r="0.3"
                        >
                            <stop
                                offset="0"
                                stopColor="#fff"
                                stopOpacity="0.85"
                            />
                            <stop
                                offset="1"
                                stopColor="#fff"
                                stopOpacity="0"
                            />
                        </radialGradient>

                        <mask id="foam-mask">
                            <rect
                                width="1600"
                                height="660"
                                fill="url(#foam-bottom)"
                            />
                            <rect
                                width="1600"
                                height="660"
                                fill="url(#foam-right)"
                            />
                            <rect
                                width="1600"
                                height="660"
                                fill="url(#foam-left)"
                            />
                        </mask>

                        {/* Deep blue shading */}
                        <linearGradient
                            id="wave-shade"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0"
                                stopColor="#06335f"
                                stopOpacity="0.55"
                            />
                            <stop
                                offset="0.45"
                                stopColor="#06335f"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>

                    {/* Background base */}
                    <rect
                        width="1600"
                        height="660"
                        fill="#0a86bf"
                    />

                    {/* Flowing water streaks */}
                    <g transform="rotate(-9 800 330)">
                        <rect
                            x="-400"
                            y="-400"
                            width="2400"
                            height="1460"
                            filter="url(#wave-water)"
                        />
                    </g>

                    {/* Dark upper-water shading */}
                    <rect
                        width="1600"
                        height="660"
                        fill="url(#wave-shade)"
                    />

                    {/* Diagonal white foam */}
                    <g mask="url(#foam-mask)">
                        <g transform="rotate(-14 800 330)">
                            <rect
                                x="-400"
                                y="-400"
                                width="2400"
                                height="1460"
                                filter="url(#wave-foam)"
                            />
                        </g>
                    </g>
                </svg>

                {/* Soft Organic Fade Masks into the Canvas */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50 dark:from-[#030712] via-slate-50/80 dark:via-[#030712]/85 via-[18%] to-transparent to-[42%] w-full h-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-50 dark:from-[#030712] via-slate-50/60 dark:via-[#030712]/60 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-50 dark:from-[#030712] to-transparent pointer-events-none" />
            </div>

            {/* Ambient liquid background glows */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-100 dark:opacity-35 dark:mix-blend-screen transform-gpu overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-sky-400/35 dark:bg-sky-300/30 blur-[120px] animate-liquid-float" />
                <div className="absolute top-[25%] right-[-10%] w-[45%] h-[45%] rounded-full bg-blue-500/25 dark:bg-blue-400/20 blur-[120px] animate-liquid-float-rev" style={{ animationDelay: "2s" }} />
                <div className="absolute bottom-[-10%] left-[10%] w-[55%] h-[55%] rounded-full bg-indigo-400/25 dark:bg-indigo-300/20 blur-[130px] animate-liquid-float" style={{ animationDelay: "4s" }} />
                <div className="absolute bottom-[15%] right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-400/35 dark:bg-cyan-300/25 blur-[100px] animate-liquid-float-rev" style={{ animationDelay: "1s" }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ============================================================ */}
                {/* 1. HERO SECTION */}
                {/* ============================================================ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[480px] sm:min-h-[560px]">

                    {/* Left: Text & CTA */}
                    <div className="lg:col-span-6 space-y-6 lg:pr-2 z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                            <span className="text-[11px] font-bold tracking-[0.22em] text-blue-600 dark:text-sky-400 uppercase">
                                ABOUT LEnSE
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-normal text-slate-900 dark:text-white leading-[1.05] tracking-tight font-serif">
                            Learning today.<br />
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-sky-300 dark:via-sky-400 dark:to-blue-400 font-serif font-normal">
                                Sustaining tomorrow.
                            </span>
                        </h1>

                        <p className="text-slate-600 dark:text-slate-300 text-[13px] sm:text-[13.5px] leading-[1.74] max-w-[430px] font-normal">
                            The Centre for Learning, Engineering and Sustainability Education (LEnSE) at the University of Kerala was established in 2024 with the vision of promoting innovative, inclusive and sustainable approaches to education. We integrate various STEM domains, technology, engineering and mathematics education. The Centre serves as a platform for academic engagement, capacity building, knowledge sharing, and collaboration at national and international levels, strengthening learning processes through practice.
                        </p>

                        <div className="pt-2">
                            <Link href="/academics" className="inline-flex">
                                <button className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-[0_12px_28px_rgba(2,132,199,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-[1.03] group cursor-pointer border border-sky-400/30">
                                    <span>OUR PROGRAMMES</span>
                                    <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
                                        <ArrowRight size={10} className="text-white group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Transparent Crystal Glass "Established in 2024" Card */}
                    <div className="lg:col-span-6 relative flex items-center justify-start lg:justify-center min-h-[340px] sm:min-h-[420px]">

                        {/* Real Transparent Glass Card */}
                        <div className="relative lg:ml-[-40px] xl:ml-[-80px] bg-gradient-to-br from-white/70 via-white/45 to-white/20 dark:from-[#0a182e]/85 dark:via-[#071325]/80 dark:to-[#030914]/75 backdrop-blur-2xl p-6 sm:p-7 rounded-[2.2rem] border-[1.5px] border-white/95 dark:border-blue-900/40 shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(255,255,255,0.3),inset_2px_0_4px_rgba(255,255,255,0.8),0_25px_50px_-10px_rgba(2,132,199,0.18)] dark:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.6)] w-56 sm:w-64 z-20 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_30px_60px_-10px_rgba(2,132,199,0.25)]">

                            {/* Top-Left Specular Corner Sheen */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/70 via-white/20 to-transparent dark:from-white/10 dark:via-transparent rounded-tl-[2.2rem] pointer-events-none" />

                            {/* 3D Glass Crystal Lens Badge (Unclipped) */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-b from-white/95 via-white/65 to-white/30 dark:from-sky-950/90 dark:to-blue-950/90 backdrop-blur-2xl border-[1.5px] border-white dark:border-sky-500/40 shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06),0_10px_20px_rgba(2,132,199,0.15)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center absolute -top-5 -right-5 text-blue-600 dark:text-sky-400 z-30 transition-transform duration-500 hover:scale-110">
                                <Sparkles size={20} strokeWidth={1.75} />
                            </div>

                            <p className="text-[10px] font-bold text-blue-800 dark:text-sky-400 uppercase tracking-[0.2em] mb-1.5 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                ESTABLISHED IN
                            </p>

                            <h3 className="text-4xl sm:text-5xl font-serif text-slate-900 dark:text-white mb-3 tracking-tight font-normal relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)] dark:drop-shadow-none">
                                2024
                            </h3>

                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium mb-3 relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] dark:drop-shadow-none">
                                Promoting innovative, inclusive and sustainable approaches to education.
                            </p>

                            <div className="w-6 h-[2px] bg-blue-600 dark:bg-sky-400 rounded-full mt-2 relative z-10" />
                        </div>

                        {/* Floating circular document / brochure badge at bottom right */}
                        <div className="absolute right-4 sm:right-14 bottom-4 sm:bottom-6 w-11 h-11 rounded-full bg-white/95 dark:bg-[#0a182e]/90 backdrop-blur-xl border border-white/90 shadow-md flex items-center justify-center text-red-500 hover:scale-110 transition-transform cursor-pointer">
                            <FileText size={18} />
                        </div>

                    </div>
                </div>

                {/* ============================================================ */}
                {/* 2. FOUR FEATURE CARDS DOCK */}
                {/* ============================================================ */}
                <div className="mt-8 sm:mt-12 p-3 sm:p-5 rounded-[2.8rem] bg-white/75 dark:bg-[#0a182e]/85 backdrop-blur-2xl border-[1.5px] border-white/90 dark:border-blue-900/40 shadow-[0_20px_50px_rgba(2,132,199,0.06)] dark:shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5)] relative z-20 transition-all duration-500">

                    {/* Top Specular Edge Highlight Beam */}
                    <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-white dark:via-white/20 to-transparent opacity-95 pointer-events-none" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/70 dark:divide-blue-900/40 relative z-10">
                        {[
                            { icon: Users, title: 'Inclusive by\nPurpose', desc: 'Creating opportunities\nfor all learners.' },
                            { icon: HeartHandshake, title: 'Sustainability\nat Core', desc: 'Advancing systemic and\nfuture-ready minds.' },
                            { icon: GraduationCap, title: 'STEM\nFocused', desc: 'Interdisciplinary\nand industry-relevant.' },
                            { icon: Globe, title: 'Global\nConnections', desc: 'Collaborating across\nborders for knowledge\nand growth.' }
                        ].map((ft, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 sm:p-8 group hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-300 rounded-[2.2rem] relative">

                                {/* Soft Blue Circle Pod */}
                                <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-sky-950/60 border border-blue-100 dark:border-sky-500/30 flex items-center justify-center text-blue-600 dark:text-sky-400 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    <ft.icon size={22} strokeWidth={1.5} />
                                </div>

                                <h4 className="text-[17px] font-serif font-semibold text-slate-900 dark:text-white mb-2 leading-snug whitespace-pre-line drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                                    {ft.title}
                                </h4>

                                <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] dark:drop-shadow-none">
                                    {ft.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 3. ABOUT LEnSE CIRCULAR POD COMPOSITION (FROM MOCKUP) */}
                {/* ============================================================ */}
                <div className="mt-24 sm:mt-32 lg:mt-36 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-20">

                    {/* Left Column: Text & CTA */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                            <span className="text-[11px] font-bold tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase">
                                ABOUT LEnSE
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-serif font-normal text-slate-900 dark:text-white leading-[1.12] tracking-tight">
                            Empowering minds.<br />
                            Building a <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-sky-300 dark:via-sky-400 dark:to-blue-400 font-serif">sustainable future.</span>
                        </h2>

                        <p className="text-slate-600 dark:text-slate-300 text-[13.5px] leading-[1.7] font-normal max-w-md">
                            LEnSE organises seminars, workshops, conferences, training programmes, and academic activities that engage a diverse audience, learning experiences for students, and professionals across STEM.
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 text-[13.5px] leading-[1.7] font-normal max-w-md">
                            Through collaborations with reputed institutions, including SIET (Govt. of Kerala), Child Development Centre Kazhakkoottam, REFORM, and Clarkson University (USA), we create meaningful opportunities for students, teachers, scholars, and communities.
                        </p>

                        <div className="pt-2">
                            <Link href="/projects" className="inline-flex">
                                <button className="px-7 py-3.5 rounded-full bg-white/80 hover:bg-white dark:bg-[#0a182e] dark:hover:bg-[#0f2444] backdrop-blur-xl border-[1.5px] border-slate-200 dark:border-blue-900/50 shadow-sm text-blue-950 dark:text-sky-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-500 hover:scale-[1.03] group cursor-pointer hover:shadow-[0_8px_25px_rgba(2,132,199,0.18)]">
                                    <span>Explore Research & Projects</span>
                                    <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-blue-700/50 flex items-center justify-center">
                                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Circular Campus Portal with 4 Floating Pods */}
                    <div className="lg:col-span-7 relative w-full max-w-[480px] sm:max-w-[520px] h-[460px] sm:h-[500px] mx-auto flex items-center justify-center">

                        {/* Thin Orbital Rings & Satellite Beacons */}
                        <div className="absolute inset-2 sm:inset-4 rounded-full border border-blue-400/25 border-dashed pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
                        <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-sky-300/20 pointer-events-none" />

                        {/* Glowing Satellite Dots on Orbits */}
                        <div className="absolute top-8 left-14 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                        <div className="absolute bottom-16 right-8 w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
                        <div className="absolute top-1/2 -right-3 w-2 h-2 rounded-full bg-indigo-500" />
                        <div className="absolute bottom-8 left-16 w-2 h-2 rounded-full bg-cyan-400" />

                        {/* Central Circular Campus Building Image */}
                        <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-[6px] border-white/95 dark:border-blue-900/60 shadow-[0_25px_60px_rgba(2,132,199,0.16)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] z-10 group">
                            <img
                                src="/campus_building.jpg"
                                alt="LEnSE Campus Building"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* 1. Top Pill: People */}
                        <div className="absolute top-0 sm:top-2 left-6 sm:left-10 z-20">
                            <div className="flex items-center gap-3 bg-white/95 dark:bg-[#0a182e]/90 backdrop-blur-xl border border-white/90 dark:border-blue-800/40 shadow-[0_10px_30px_rgba(2,132,199,0.12)] rounded-full py-2 px-3.5 pr-5 hover:scale-105 transition-all">
                                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <Users size={15} />
                                </div>
                                <div className="text-left">
                                    <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">People</h5>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Learning for a better tomorrow</p>
                                </div>
                            </div>
                        </div>

                        {/* 2. Right Pill: Technology */}
                        <div className="absolute top-[36%] -right-2 sm:-right-6 z-20">
                            <div className="flex items-center gap-3 bg-white/95 dark:bg-[#0a182e]/90 backdrop-blur-xl border border-white/90 dark:border-blue-800/40 shadow-[0_10px_30px_rgba(2,132,199,0.12)] rounded-full py-2 px-3.5 pr-5 hover:scale-105 transition-all">
                                <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <Cpu size={15} />
                                </div>
                                <div className="text-left">
                                    <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Technology</h5>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Innovation with purpose</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Bottom-Left Pill: Collaboration */}
                        <div className="absolute bottom-6 -left-2 sm:-left-4 z-20">
                            <div className="flex items-center gap-3 bg-white/95 dark:bg-[#0a182e]/90 backdrop-blur-xl border border-white/90 dark:border-blue-800/40 shadow-[0_10px_30px_rgba(2,132,199,0.12)] rounded-full py-2 px-3.5 pr-5 hover:scale-105 transition-all">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <HeartHandshake size={15} />
                                </div>
                                <div className="text-left">
                                    <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Collaboration</h5>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Stronger together</p>
                                </div>
                            </div>
                        </div>

                        {/* 4. Bottom-Right Pill: Sustainability */}
                        <div className="absolute -bottom-1 sm:bottom-1 right-2 sm:right-6 z-20">
                            <div className="flex items-center gap-3 bg-white/95 dark:bg-[#0a182e]/90 backdrop-blur-xl border border-white/90 dark:border-blue-800/40 shadow-[0_10px_30px_rgba(2,132,199,0.12)] rounded-full py-2 px-3.5 pr-5 hover:scale-105 transition-all">
                                <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                    <Leaf size={15} />
                                </div>
                                <div className="text-left">
                                    <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Sustainability</h5>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Solutions for a resilient world</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ============================================================ */}
                {/* 4. OUR OBJECTIVES (FROM MOCKUP) */}
                {/* ============================================================ */}
                <div className="mt-24 sm:mt-32 lg:mt-36 relative z-20">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                                <span className="text-[10.5px] font-bold tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase">
                                    OUR OBJECTIVES
                                </span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-serif font-normal text-slate-900 dark:text-white leading-[1.12] tracking-tight">
                                Guiding our vision.<br />
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-sky-300 dark:via-sky-400 dark:to-blue-400 font-serif font-normal">
                                    Driving meaningful change.
                                </span>
                            </h2>
                        </div>

                        <div className="flex flex-col sm:items-end gap-3 max-w-md">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal sm:text-right leading-relaxed">
                                LEnSE is committed to advancing education, research and outreach through a set of core objectives that create long-term impact.
                            </p>
                            <Link href="/projects" className="shrink-0">
                                <button className="px-6 py-3 rounded-full bg-[#0a182e] hover:bg-[#13233c] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-sm hover:scale-[1.03] group cursor-pointer">
                                    <span>VIEW ALL OBJECTIVES</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            {
                                num: '01',
                                icon: BookOpen,
                                title: 'Accessible\nEducation',
                                desc: 'Create inclusive and equitable learning opportunities for diverse communities.'
                            },
                            {
                                num: '02',
                                icon: Monitor,
                                title: 'Innovative\nDigital Tools',
                                desc: 'Develop and promote digital resources for enhanced teaching and learning.'
                            },
                            {
                                num: '03',
                                icon: Brain,
                                title: 'Learning\nEngineering',
                                desc: 'Combine evidence-based practices in education through research and experimentation.'
                            },
                            {
                                num: '04',
                                icon: Leaf,
                                title: 'Sustainability\nEducation',
                                desc: 'Integrate sustainability principles across STEM education.'
                            },
                            {
                                num: '05',
                                icon: Globe,
                                title: 'Equity & Global\nAwareness',
                                desc: 'Foster a globally conscious and socially responsible learning community.'
                            }
                        ].map((obj, i) => (
                            <div
                                key={i}
                                className="bg-white/80 dark:bg-[#0a182e]/85 backdrop-blur-xl border border-white/90 dark:border-blue-900/40 rounded-[2rem] p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_35px_rgba(2,132,199,0.05)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 transition-all duration-300 h-full group"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-2xl font-serif text-blue-500/80 dark:text-sky-400/80 font-normal">
                                        {obj.num}
                                    </span>
                                    <div className="w-11 h-11 rounded-full bg-blue-50 dark:bg-sky-950/60 border border-blue-100 dark:border-sky-500/30 flex items-center justify-center text-blue-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                                        <obj.icon size={19} />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-[17px] font-serif font-semibold text-slate-900 dark:text-white mb-2 leading-snug whitespace-pre-line">
                                        {obj.title}
                                    </h4>
                                    <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-[1.65] font-normal">
                                        {obj.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 5. KEY INITIATIVES (FROM MOCKUP) */}
                {/* ============================================================ */}
                <div className="mt-24 sm:mt-32 lg:mt-36 relative z-20">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                                <span className="text-[10.5px] font-bold tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase">
                                    KEY INITIATIVES
                                </span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-serif font-normal text-slate-900 dark:text-white leading-[1.12] tracking-tight">
                                Initiatives for<br />
                                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-sky-300 dark:via-sky-400 dark:to-blue-400 font-serif font-normal">
                                    a brighter tomorrow.
                                </span>
                            </h2>
                        </div>

                        <div className="flex flex-col sm:items-end gap-3 max-w-md">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal sm:text-right leading-relaxed">
                                Our initiatives bring together education, research and community engagement to address real-world challenges and create lasting impact.
                            </p>
                            <Link href="/projects" className="shrink-0">
                                <button className="px-6 py-3 rounded-full bg-white/80 hover:bg-white dark:bg-[#0a182e] border border-slate-200 dark:border-blue-900/50 text-blue-950 dark:text-sky-300 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-sm hover:scale-[1.03] group cursor-pointer">
                                    <span>EXPLORE INITIATIVES</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                        {/* Left Card: Flagship Initiative (STEM Learning Lab) */}
                        <div className="lg:col-span-5 rounded-[2.2rem] bg-gradient-to-br from-white/90 via-sky-50/50 to-blue-50/40 dark:from-[#0a182e]/95 dark:via-[#071325]/90 dark:to-[#030914]/85 backdrop-blur-2xl border-[1.5px] border-white/95 dark:border-blue-900/40 shadow-[0_20px_45px_rgba(2,132,199,0.08)] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[460px] group transition-all duration-500 hover:-translate-y-1">
                            <div className="relative z-10">
                                <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-blue-700 dark:text-sky-300 bg-blue-100/70 dark:bg-blue-900/50 px-3 py-1 rounded-full mb-4">
                                    FLAGSHIP INITIATIVE
                                </span>
                                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-slate-900 dark:text-white tracking-tight mb-3">
                                    STEM Learning Lab
                                </h3>
                                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-[260px] font-normal mb-4">
                                    An interdisciplinary initiative to provide immersive and hands-on STEM experiences for students, teachers and the wider community.
                                </p>
                                <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:gap-2.5 transition-all">
                                    <span>Learn more</span>
                                    <ArrowRight size={12} />
                                </Link>
                            </div>

                            {/* Round Arrow Button Bottom Left */}
                            <div className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-sky-500 text-white flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer z-10 mt-6 shadow-[0_4px_14px_rgba(2,132,199,0.35)] shrink-0">
                                <ArrowRight size={14} />
                            </div>

                            {/* 3D Glowing Isometric Blue Cubes on Bottom Right (Pure Code) */}
                            <div className="absolute -bottom-4 -right-4 w-[65%] max-w-[240px] pointer-events-none group-hover:scale-105 transition-transform duration-700 z-0">
                                <StemIsometricCubes />
                            </div>
                        </div>

                        {/* Right 4 Grid Cards (2x2 Grid) */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                {
                                    icon: Users,
                                    title: 'Scholar Connect',
                                    desc: 'Bridging schools and higher education through outreach programmes.'
                                },
                                {
                                    icon: Building2,
                                    title: 'Institutional Collaborations',
                                    desc: 'Partnerships with national and international institutions.'
                                },
                                {
                                    icon: Sparkles,
                                    title: 'STEM 4 Girls & Gifted Camps',
                                    desc: 'Focused programmes to encourage young minds in STEM fields.'
                                },
                                {
                                    icon: Globe,
                                    title: 'Global Academic Partnerships',
                                    desc: 'Collaborative research and exchange programmes for a wider impact.'
                                }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="rounded-[2rem] bg-white/80 dark:bg-[#0a182e]/85 backdrop-blur-xl border border-white/90 dark:border-blue-900/40 p-6 flex flex-col justify-between shadow-[0_15px_35px_rgba(2,132,199,0.05)] hover:-translate-y-1 transition-all group min-h-[190px]"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-sky-950/60 border border-blue-100 dark:border-sky-500/30 flex items-center justify-center text-blue-600 dark:text-sky-400 shrink-0 group-hover:scale-110 transition-transform">
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-[16px] font-serif font-semibold text-slate-900 dark:text-white mb-1.5 leading-snug">
                                                {item.title}
                                            </h4>
                                            <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-3">
                                        <div className="w-8 h-8 rounded-full border border-blue-200 dark:border-blue-700/50 flex items-center justify-center text-blue-600 dark:text-sky-400 group-hover:bg-blue-600 group-hover:text-white transition-all cursor-pointer">
                                            <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* ============================================================ */}
                {/* 6. SOCIAL IMPACT BANNER (FROM MOCKUP) */}
                {/* ============================================================ */}
                <div className="mt-16 sm:mt-24 mb-12 rounded-[2.4rem] bg-white/80 dark:bg-[#0a182e]/85 backdrop-blur-2xl border border-white/90 dark:border-blue-900/40 shadow-[0_20px_45px_rgba(2,132,199,0.06)] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">

                    {/* Left 100% Metric Pod */}
                    <div className="lg:col-span-3 rounded-[2rem] bg-gradient-to-br from-blue-50/70 via-sky-50/50 to-white/60 dark:from-[#0d1f3b] dark:to-[#071325] border border-blue-100 dark:border-blue-800/40 p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-sm">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-blue-700 dark:text-sky-300 bg-white/80 dark:bg-white/10 px-3 py-1 rounded-full mb-3 border border-blue-200/50">
                            INVESTED IN PEOPLE
                        </span>
                        <span className="text-5xl sm:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 dark:from-sky-300 dark:to-blue-400 tracking-tight mb-2">
                            100%
                        </span>
                        <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 max-w-[170px] leading-snug">
                            Financial assistance to vulnerable learners under the SIET scheme.
                        </p>
                    </div>

                    {/* Middle Content */}
                    <div className="lg:col-span-5 space-y-3.5 px-1 sm:px-3">
                        <div className="flex items-center gap-1.5">
                            <HeartHandshake size={14} className="text-blue-600 dark:text-sky-400" />
                            <span className="text-[10.5px] font-bold tracking-[0.2em] text-blue-700 dark:text-sky-400 uppercase">
                                SOCIAL IMPACT
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-serif font-normal text-slate-900 dark:text-white leading-tight tracking-tight">
                            Education with<br />social responsibility.
                        </h2>
                        <p className="text-[12.5px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                            Programmes are designed to reach and support socio-economically disadvantaged students in rural schools in Kerala, ensuring that no deserving learner is left behind.
                        </p>
                        <div className="pt-1">
                            <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-sky-400 hover:gap-3 transition-all">
                                <span>Learn more about our outreach</span>
                                <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Card with Wind Turbine Mountain Landscape */}
                    <div className="lg:col-span-4 h-56 sm:h-64 rounded-[2rem] overflow-hidden border border-white/90 shadow-md relative group">
                        <img
                            src="/about/wind_turbine_landscape.jpg"
                            alt="Sustainable Future"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/65 via-slate-900/20 to-transparent flex items-end p-6">
                            <p className="text-white text-xs sm:text-[13px] font-semibold leading-relaxed drop-shadow-md">
                                Empowering learners.<br />
                                Enriching communities.<br />
                                Sustaining the future.
                            </p>
                        </div>
                    </div>

                </div>

                {/* ============================================================ */}
                {/* 7. LEADERSHIP & UNIVERSITY AFFILIATION (FROM MOCKUP) */}
                {/* ============================================================ */}
                <div className="mt-8 mb-8 rounded-[2.4rem] bg-white/80 dark:bg-[#0a182e]/85 backdrop-blur-2xl border border-white/90 dark:border-blue-900/40 shadow-[0_20px_45px_rgba(2,132,199,0.06)] p-8 sm:p-10 relative z-20">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-blue-700 dark:text-sky-400 uppercase">
                            OUR LEADERSHIP
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left Circular Frame */}
                        <div className="lg:col-span-3 flex justify-center lg:justify-start">
                            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 border-[3px] border-blue-500/40 shadow-lg">
                                <img
                                    src="/campus_building.jpg"
                                    alt="LEnSE Campus"
                                    className="w-full h-full object-cover rounded-full"
                                />
                                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center absolute bottom-1 right-1 shadow-md hover:scale-110 transition-transform cursor-pointer">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>

                        {/* Middle Details */}
                        <div className="lg:col-span-5 space-y-2">
                            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 dark:text-white">
                                Dr. Divya C Senan
                            </h3>
                            <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-sky-400">
                                Director, Centre for Learning, Engineering and Sustainability Education (LEnSE)
                            </p>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl pt-1">
                                Leading academic engagement, research initiatives, and collaborative programmes to advance inclusive and sustainable education in STEM.
                            </p>
                        </div>

                        {/* Right Contact Card */}
                        <div className="lg:col-span-4 space-y-3.5 p-5 sm:p-6 rounded-[1.8rem] bg-white/70 dark:bg-[#071325]/85 backdrop-blur-xl border border-white/90 dark:border-blue-900/40 shadow-sm">
                            <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
                                <MapPin size={16} className="text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                                <span>
                                    University of Kerala, Kariavattom Campus,<br />
                                    Thiruvananthapuram - 695581, Kerala, India
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 pt-1">
                                <Mail size={16} className="text-blue-600 dark:text-sky-400 shrink-0" />
                                <a href="mailto:lenseedu24@gmail.com" className="text-blue-600 dark:text-sky-400 font-semibold hover:underline">
                                    lenseedu24@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* 8. CALL TO ACTION BANNER (FROM MOCKUP) */}
                {/* ============================================================ */}
                <div className="mt-12 mb-6 rounded-[2.5rem] bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white p-8 sm:p-12 relative overflow-hidden shadow-[0_25px_60px_rgba(2,132,199,0.35)] z-20">
                    {/* Flowing Wave Lines in Background */}
                    <div className="absolute inset-0 pointer-events-none opacity-25">
                        <svg className="w-full h-full" viewBox="0 0 1200 300" fill="none" preserveAspectRatio="none">
                            <path d="M0,100 C300,200 600,0 900,150 C1050,220 1150,100 1200,80 L1200,300 L0,300 Z" fill="white" fillOpacity="0.15" />
                            <path d="M0,180 C400,80 700,250 1200,140 L1200,300 L0,300 Z" fill="white" fillOpacity="0.2" />
                        </svg>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-3 max-w-xl">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal leading-[1.12] tracking-tight">
                                Be part of<br />a meaningful change.
                            </h2>
                            <p className="text-xs sm:text-sm text-sky-100 font-normal leading-relaxed max-w-lg">
                                Collaborate, contribute, or participate in our programmes to help build a more inclusive, innovative, and sustainable future.
                            </p>
                        </div>

                        <Link href="/contact" className="shrink-0">
                            <button className="px-8 py-4 rounded-full bg-white hover:bg-sky-50 text-blue-900 font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer">
                                <span>Get Involved</span>
                                <ArrowRight size={14} className="text-blue-900" />
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}