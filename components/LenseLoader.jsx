'use client';
import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, Lightbulb, Leaf } from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

/**
 * Fluid Wave Ribbons SVG matching the ethereal blue wave lines from the reference artwork
 */
function FluidWaveRibbons() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full opacity-65 dark:opacity-40"
        fill="none"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="30%" x2="100%" y2="70%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#2563eb" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="waveGrad2" x1="0%" y1="70%" x2="100%" y2="30%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#0284c7" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="meshGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0" />
            <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#2563eb" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Soft flowing broad ribbon 1 */}
        <path
          d="M -100 480 C 250 320, 480 620, 850 430 C 1180 260, 1420 540, 1750 380 L 1750 650 C 1450 780, 1150 490, 820 620 C 490 750, 200 580, -100 680 Z"
          fill="url(#waveGrad1)"
          className="transition-all duration-1000"
        />

        {/* Soft flowing broad ribbon 2 */}
        <path
          d="M -150 350 C 180 520, 520 280, 890 480 C 1220 660, 1480 320, 1780 440 L 1780 560 C 1450 460, 1200 720, 870 560 C 520 390, 220 590, -150 420 Z"
          fill="url(#waveGrad2)"
        />

        {/* Fine fluid linework mesh matching the reference image */}
        {Array.from({ length: 18 }).map((_, i) => {
          const offset = i * 14;
          return (
            <path
              key={i}
              d={`M -80 ${380 + offset} C 280 ${260 + offset * 1.2}, 620 ${560 - offset * 0.8}, 960 ${380 + offset * 0.9} C 1280 ${220 + offset * 1.1}, 1480 ${440 - offset * 0.5}, 1720 ${350 + offset * 0.7}`}
              stroke="url(#meshGrad)"
              strokeWidth={1 + (i % 2) * 0.6}
              opacity={0.22 + (i % 5) * 0.08}
            />
          );
        })}
      </svg>
    </div>
  );
}

/**
 * LEnSE 3-Petal Floral / Lotus Vector Emblem matching the central artwork
 */
function LenseEmblem({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none">
      <defs>
        <radialGradient id="sphereCenterGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="85%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>

        <linearGradient id="petalLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        <linearGradient id="petalRightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="55%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        <linearGradient id="petalCenterGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        <filter id="emblemGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Top Floating Luminous Sphere */}
      <circle
        cx="60"
        cy="32"
        r="11"
        fill="url(#sphereCenterGrad)"
        filter="url(#emblemGlow)"
      />
      {/* Specular highlight on top sphere */}
      <ellipse cx="56.5" cy="28.5" rx="3.5" ry="2" fill="#ffffff" opacity="0.8" />

      {/* Left Petal */}
      <path
        d="M 57 58 C 54 75, 42 86, 26 84 C 20 72, 22 56, 38 48 C 47 43, 56 48, 57 58 Z"
        fill="url(#petalLeftGrad)"
        opacity="0.95"
      />
      <path
        d="M 49 53 C 44 63, 36 71, 28 72 C 26 62, 31 54, 40 50 Z"
        fill="#ffffff"
        opacity="0.18"
      />

      {/* Right Petal */}
      <path
        d="M 63 58 C 66 75, 78 86, 94 84 C 100 72, 98 56, 82 48 C 73 43, 64 48, 63 58 Z"
        fill="url(#petalRightGrad)"
        opacity="0.95"
      />
      <path
        d="M 71 53 C 76 63, 84 71, 92 72 C 94 62, 89 54, 80 50 Z"
        fill="#ffffff"
        opacity="0.22"
      />

      {/* Center Upward Sprout Leaf */}
      <path
        d="M 60 48 C 54 58, 54 78, 60 90 C 66 78, 66 58, 60 48 Z"
        fill="url(#petalCenterGrad)"
        opacity="0.9"
      />
    </svg>
  );
}

/**
 * LenseLoader - State-of-the-art loading screen matching user reference artwork
 * Features:
 * - Concentric delicate orbital paths
 * - Real-time circular progress arc with luminous 3D traveling sphere node at tip
 * - 4 Corner Pillars: LEARN, COLLABORATE, INNOVATE, SUSTAIN
 * - Central LEnSE Emblem & Typography
 * - Real-time 0% to 100% Counter & Glowing Pill Progress Bar
 * - Ethereal ambient fluid wave ribbons and depth spheres
 */
export default function LenseLoader({
  progress: externalProgress = null,
  autoProgress = true,
  duration = 450,
  onComplete = null,
  fullScreen = true,
  message = 'L O A D I N G . . .'
}) {
  const [internalProgress, setInternalProgress] = useState(externalProgress !== null ? externalProgress : 0);

  // Smooth realistic 0% -> 100% simulated progression when autoProgress is active
  useEffect(() => {
    if (externalProgress !== null) {
      setInternalProgress(externalProgress);
      return;
    }

    if (!autoProgress) return;

    let start = performance.now();
    let frameId;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      
      // Easing: starts fast, smooth deceleration, then snappy 100% finish
      let eased;
      if (t < 0.6) {
        // Fast start 0 -> 70%
        eased = (t / 0.6) * 70;
      } else if (t < 0.88) {
        // Gentle crawl 70 -> 92%
        eased = 70 + ((t - 0.6) / 0.28) * 22;
      } else {
        // Quick glide to 100%
        eased = 92 + ((t - 0.88) / 0.12) * 8;
      }

      const current = Math.min(100, Math.round(eased));
      setInternalProgress(current);

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setInternalProgress(100);
        if (onComplete) {
          setTimeout(onComplete, 160);
        }
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [externalProgress, autoProgress, duration, onComplete]);

  const p = Math.min(100, Math.max(0, internalProgress));

  // Circular Orbit Math:
  // Center is (190, 190), Radius R = 145
  const center = 190;
  const radius = 145;
  const circumference = 2 * Math.PI * radius; // ~911.06
  const strokeDashoffset = circumference - (circumference * p) / 100;

  // Calculate tip sphere position (starts at 12 o'clock = -90 deg, sweeps clockwise)
  const angleDeg = -90 + (p / 100) * 360;
  const angleRad = (angleDeg * Math.PI) / 180;
  const tipX = center + radius * Math.cos(angleRad);
  const tipY = center + radius * Math.sin(angleRad);

  const containerContent = (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 select-none overflow-hidden">
      
      {/* Background Ethereal Fluid Waves */}
      <FluidWaveRibbons />

      {/* Out-of-focus Floating Depth Spheres (matching reference artwork) */}
      <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-gradient-to-tr from-sky-400/30 via-blue-600/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-12 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-500/25 via-sky-300/20 to-transparent blur-2xl pointer-events-none" />
      <div className="absolute top-12 right-12 w-48 h-48 rounded-full bg-radial from-blue-400/20 to-transparent blur-2xl pointer-events-none" />

      {/* Top Spacer / Balance */}
      <div className="w-full h-4 sm:h-8" />

      {/* Central Concentric Circle & Quad Nodes Arena */}
      <div className="relative flex items-center justify-center my-auto">
        
        {/* The 4 Quadrant Feature Badges (LEARN, COLLABORATE, INNOVATE, SUSTAIN) */}
        
        {/* Top-Left: LEARN */}
        <div className="absolute -top-12 -left-12 sm:-top-16 sm:-left-20 flex flex-col items-center gap-1.5 z-20 transition-transform duration-300 hover:scale-105">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-[#0c1a36]/95 border border-sky-100 dark:border-white/15 shadow-[0_8px_24px_rgba(2,132,199,0.18)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#0a6cff] dark:text-sky-400">
            <GraduationCap size={18} strokeWidth={1.8} />
          </div>
          <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.22em] text-slate-500 dark:text-slate-400 uppercase">
            LEARN
          </span>
        </div>

        {/* Top-Right: COLLABORATE */}
        <div className="absolute -top-12 -right-16 sm:-top-16 sm:-right-24 flex flex-col items-center gap-1.5 z-20 transition-transform duration-300 hover:scale-105">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-[#0c1a36]/95 border border-sky-100 dark:border-white/15 shadow-[0_8px_24px_rgba(2,132,199,0.18)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#0a6cff] dark:text-sky-400">
            <Users size={18} strokeWidth={1.8} />
          </div>
          <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.22em] text-slate-500 dark:text-slate-400 uppercase">
            COLLABORATE
          </span>
        </div>

        {/* Bottom-Left: INNOVATE */}
        <div className="absolute -bottom-8 -left-14 sm:-bottom-10 sm:-left-20 flex flex-col items-center gap-1.5 z-20 transition-transform duration-300 hover:scale-105">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-[#0c1a36]/95 border border-sky-100 dark:border-white/15 shadow-[0_8px_24px_rgba(2,132,199,0.18)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#0a6cff] dark:text-sky-400">
            <Lightbulb size={18} strokeWidth={1.8} />
          </div>
          <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.22em] text-slate-500 dark:text-slate-400 uppercase">
            INNOVATE
          </span>
        </div>

        {/* Bottom-Right: SUSTAIN */}
        <div className="absolute -bottom-8 -right-12 sm:-bottom-10 sm:-right-16 flex flex-col items-center gap-1.5 z-20 transition-transform duration-300 hover:scale-105">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 dark:bg-[#0c1a36]/95 border border-sky-100 dark:border-white/15 shadow-[0_8px_24px_rgba(2,132,199,0.18)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#0a6cff] dark:text-sky-400">
            <Leaf size={18} strokeWidth={1.8} />
          </div>
          <span className="text-[9.5px] sm:text-[10.5px] font-bold tracking-[0.22em] text-slate-500 dark:text-slate-400 uppercase">
            SUSTAIN
          </span>
        </div>

        {/* Concentric Circular Progress Tracks SVG */}
        <div className="relative w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
          <svg
            viewBox="0 0 380 380"
            className="w-full h-full transform-gpu"
          >
            <defs>
              {/* Progress Arc Glowing Gradient */}
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0a6cff" />
                <stop offset="50%" stopColor="#0091ff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* 3D Blue Sphere Gradient for Moving Head Node */}
              <radialGradient id="tipSphereGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="35%" stopColor="#38bdf8" />
                <stop offset="70%" stopColor="#0a6cff" />
                <stop offset="100%" stopColor="#06328a" />
              </radialGradient>

              {/* White Satellite Sphere Gradient */}
              <radialGradient id="whiteSphereGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#93c5fd" />
              </radialGradient>

              {/* Drop Shadow for the Arc */}
              <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Drop Shadow for tip sphere */}
              <filter id="tipShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0a6cff" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* Outer Concentric Dotted Orbit Guide */}
            <circle
              cx={center}
              cy={center}
              r={166}
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.2"
              strokeDasharray="2.5 7"
              opacity="0.35"
            />

            {/* Inner Concentric Circle Guide */}
            <circle
              cx={center}
              cy={center}
              r={128}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.8"
              opacity="0.25"
            />

            {/* Base Background Track for Main Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="3.5"
              className="dark:stroke-slate-800/60"
              opacity="0.4"
            />

            {/* Active Sweeping Circular Progress Arc */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90 ${center} ${center})`}
              filter="url(#arcGlow)"
              className="transition-all duration-100 ease-out"
            />

            {/* Orbiting Satellite Nodes from reference artwork */}
            {/* 1. White glowing satellite sphere on outer dotted orbit (top-left) */}
            <circle
              cx={center + 166 * Math.cos(-2.4)}
              cy={center + 166 * Math.sin(-2.4)}
              r="6.5"
              fill="url(#whiteSphereGrad)"
              filter="url(#tipShadow)"
            />

            {/* 2. Micro blue satellite on outer orbit (top-right) */}
            <circle
              cx={center + 166 * Math.cos(-0.6)}
              cy={center + 166 * Math.sin(-0.6)}
              r="3.5"
              fill="#0a6cff"
              opacity="0.75"
            />

            {/* 3. Luminous 3D Blue Floating Sphere on inner orbit (bottom-left) */}
            <circle
              cx={center + 145 * Math.cos(2.4)}
              cy={center + 145 * Math.sin(2.4)}
              r="13"
              fill="url(#tipSphereGrad)"
              filter="url(#tipShadow)"
            />
            {/* Specular highlight on bottom-left sphere */}
            <ellipse
              cx={center + 145 * Math.cos(2.4) - 4}
              cy={center + 145 * Math.sin(2.4) - 4}
              rx="4"
              ry="2.5"
              fill="#ffffff"
              opacity="0.75"
            />

            {/* 4. Small orbiting blue dot (mid-right) */}
            <circle
              cx={center + 155 * Math.cos(0.25)}
              cy={center + 155 * Math.sin(0.25)}
              r="5"
              fill="url(#tipSphereGrad)"
            />

            {/* 5. Traveling Luminous Tip Sphere riding the progress arc */}
            {p > 0 && (
              <g filter="url(#tipShadow)">
                <circle
                  cx={tipX}
                  cy={tipY}
                  r="7.5"
                  fill="url(#tipSphereGrad)"
                  className="transition-all duration-75"
                />
                <circle
                  cx={tipX - 2.2}
                  cy={tipY - 2.2}
                  r="2"
                  fill="#ffffff"
                  opacity="0.9"
                />
              </g>
            )}
          </svg>

          {/* Central Emblem & Identification Card */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
            
            {/* LEnSE 3-Petal Blue Emblem */}
            <div className="relative mb-0.5 filter drop-shadow-[0_4px_16px_rgba(10,108,255,0.28)] animate-pulse duration-1000">
              <LenseEmblem className="w-14 h-14 sm:w-16 sm:h-16" />
            </div>

            {/* LEnSE Brand Title */}
            <h1
              style={SERIF}
              className="text-2xl sm:text-[28px] font-normal tracking-[0.06em] text-slate-900 dark:text-white leading-none mt-0.5"
            >
              LEnSE
            </h1>

            {/* Department Full Title */}
            <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mt-1 max-w-[210px] leading-tight">
              Centre for Learning Engineering and Sustainability Education
            </p>

            {/* 0% - 100% Counter */}
            <div className="mt-3 flex flex-col items-center">
              <span className="text-3xl sm:text-[34px] font-extrabold text-[#0a6cff] dark:text-[#38bdf8] leading-none tracking-tight font-sans">
                {p}%
              </span>
              
              <span className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.32em] text-slate-400 dark:text-slate-500 uppercase mt-1">
                {message}
              </span>

              {/* Horizontal Gradient Progress Fill Bar */}
              <div className="w-36 sm:w-44 h-1.5 sm:h-2 rounded-full bg-blue-100/90 dark:bg-blue-950/80 p-0.5 mt-2 overflow-hidden shadow-inner border border-blue-200/50 dark:border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0a6cff] via-[#1fa2ff] to-[#38bdf8] shadow-[0_0_10px_rgba(10,108,255,0.5)] transition-all duration-100 ease-out"
                  style={{ width: `${p}%` }}
                />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Citation Tagline */}
      <div className="text-center pb-3 sm:pb-5">
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] uppercase text-slate-400 dark:text-slate-500">
          LEARNING TODAY <span className="opacity-40 mx-2">|</span> SUSTAINING TOMORROW
        </p>
      </div>

    </div>
  );

  if (!fullScreen) {
    return (
      <div className="w-full min-h-[380px] rounded-3xl bg-white/70 dark:bg-[#060c1d]/70 backdrop-blur-2xl border border-blue-100/80 dark:border-white/10 shadow-[0_20px_50px_rgba(2,132,199,0.08)] flex items-center justify-center p-4">
        {containerContent}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f8fbff]/98 dark:bg-[#030712]/98 backdrop-blur-2xl flex items-center justify-center transition-opacity duration-300 animate-in fade-in">
      {containerContent}
    </div>
  );
}
