'use client';

import React from 'react';
import { Sparkles, BookOpen, Layers } from 'lucide-react';

// ============================================================================
// THEME PRESETS
// ============================================================================
export const THEME_PRESETS = {
  emerald: {
    id: 'emerald',
    name: 'LEnSE Emerald',
    primary: '#1b3726',
    accent: '#2d5a3c',
    secondary: '#8ca890',
    lightBg: '#faf6ef',
    darkBg: '#0a2016',
    borderLight: '#d6e6d8',
    borderDark: 'rgba(16, 185, 129, 0.25)',
    textColor: '#14261a',
    textDark: '#d1fae5',
    subText: '#435948',
    subTextDark: '#6ee7b7',
    badgeBg: '#122b1b',
    badgeText: '#ffffff',
    badgeDarkText: '#a7f3d0',
    badgeStyle: 'bg-[#e8f5e9] text-[#1e6e34] dark:bg-emerald-950/60 dark:text-emerald-300 border border-[#c8e6c9] dark:border-emerald-400/30',
    hex: '#2d5a3c'
  },
  cyan: {
    id: 'cyan',
    name: 'Ocean Cyan',
    primary: '#004d40',
    accent: '#00796b',
    secondary: '#80deea',
    lightBg: '#f0f8f9',
    darkBg: '#061e20',
    borderLight: '#b2ebf2',
    borderDark: 'rgba(6, 182, 212, 0.25)',
    textColor: '#0a2b30',
    textDark: '#cffafe',
    subText: '#00695c',
    subTextDark: '#67e8f9',
    badgeBg: '#004d40',
    badgeText: '#ffffff',
    badgeDarkText: '#a5f3fc',
    badgeStyle: 'bg-[#e0f7fa] text-[#00796b] dark:bg-cyan-950/60 dark:text-cyan-300 border border-[#b2ebf2] dark:border-cyan-400/30',
    hex: '#00796b'
  },
  amber: {
    id: 'amber',
    name: 'Warm Amber',
    primary: '#452600',
    accent: '#b76e00',
    secondary: '#fcd34d',
    lightBg: '#fcf8ed',
    darkBg: '#201503',
    borderLight: '#ffecb3',
    borderDark: 'rgba(245, 158, 11, 0.25)',
    textColor: '#3d2703',
    textDark: '#fef3c7',
    subText: '#92400e',
    subTextDark: '#fde68a',
    badgeBg: '#452600',
    badgeText: '#ffffff',
    badgeDarkText: '#fde68a',
    badgeStyle: 'bg-[#fff8e1] text-[#b76e00] dark:bg-amber-950/60 dark:text-amber-300 border border-[#ffecb3] dark:border-amber-400/30',
    hex: '#d97706'
  },
  indigo: {
    id: 'indigo',
    name: 'Royal Blue',
    primary: '#1e293b',
    accent: '#2563eb',
    secondary: '#93c5fd',
    lightBg: '#f3f5fa',
    darkBg: '#0c1322',
    borderLight: '#cbd5e1',
    borderDark: 'rgba(59, 130, 246, 0.25)',
    textColor: '#0f172a',
    textDark: '#dbeafe',
    subText: '#1d4ed8',
    subTextDark: '#93c5fd',
    badgeBg: '#1e293b',
    badgeText: '#ffffff',
    badgeDarkText: '#bfdbfe',
    badgeStyle: 'bg-[#eff6ff] text-[#1d4ed8] dark:bg-blue-950/60 dark:text-blue-300 border border-[#bfdbfe] dark:border-blue-400/30',
    hex: '#3b82f6'
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson Berry',
    primary: '#4c0519',
    accent: '#be123c',
    secondary: '#fda4af',
    lightBg: '#fdf2f2',
    darkBg: '#200808',
    borderLight: '#fecdd3',
    borderDark: 'rgba(244, 63, 94, 0.25)',
    textColor: '#3b0808',
    textDark: '#ffe4e6',
    subText: '#9f1239',
    subTextDark: '#fecdd3',
    badgeBg: '#4c0519',
    badgeText: '#ffffff',
    badgeDarkText: '#fecdd3',
    badgeStyle: 'bg-[#fff1f2] text-[#be123c] dark:bg-rose-950/60 dark:text-rose-300 border border-[#fecdd3] dark:border-rose-400/30',
    hex: '#e11d48'
  },
  lime: {
    id: 'lime',
    name: 'Fresh Lime',
    primary: '#1a2e05',
    accent: '#4d7c0f',
    secondary: '#bef264',
    lightBg: '#f6f9f0',
    darkBg: '#0e1d08',
    borderLight: '#dcedc8',
    borderDark: 'rgba(132, 204, 22, 0.25)',
    textColor: '#1c2e0e',
    textDark: '#ecfccb',
    subText: '#3f6212',
    subTextDark: '#d9f99d',
    badgeBg: '#1a2e05',
    badgeText: '#ffffff',
    badgeDarkText: '#d9f99d',
    badgeStyle: 'bg-[#f7fee7] text-[#4d7c0f] dark:bg-lime-950/60 dark:text-lime-300 border border-[#dcedc8] dark:border-lime-400/30',
    hex: '#84cc16'
  },
  violet: {
    id: 'violet',
    name: 'Midnight Violet',
    primary: '#3b0764',
    accent: '#7e22ce',
    secondary: '#d8b4fe',
    lightBg: '#f7f4fc',
    darkBg: '#150926',
    borderLight: '#e9d5ff',
    borderDark: 'rgba(168, 85, 247, 0.25)',
    textColor: '#2e1065',
    textDark: '#f3e8ff',
    subText: '#6b21a8',
    subTextDark: '#e9d5ff',
    badgeBg: '#3b0764',
    badgeText: '#ffffff',
    badgeDarkText: '#e9d5ff',
    badgeStyle: 'bg-[#faf5ff] text-[#7e22ce] dark:bg-purple-950/60 dark:text-purple-300 border border-[#e9d5ff] dark:border-purple-400/30',
    hex: '#a855f7'
  }
};

// ============================================================================
// TEMPLATE METADATA
// ============================================================================
export const COVER_TEMPLATES = [
  {
    id: 'report',
    name: 'Annual Report',
    desc: 'Layered contour topography with institution year badge',
    defaultBadge: 'LEnSE',
    defaultTheme: 'emerald'
  },
  {
    id: 'guide',
    name: 'Practical Guide',
    desc: 'Concentric acoustic ripple waves & bold serif title',
    defaultBadge: 'LEnSE',
    defaultTheme: 'cyan'
  },
  {
    id: 'toolkit',
    name: 'Activity Toolkit',
    desc: 'Interactive floating triple spheres with STEM icons',
    defaultBadge: 'LEnSE',
    defaultTheme: 'amber'
  },
  {
    id: 'courseware',
    name: 'Learning Module',
    desc: 'Flowing natural landscape hills with curriculum badge',
    defaultBadge: 'FYUGP',
    defaultTheme: 'lime'
  },
  {
    id: 'submission',
    name: 'Call for Papers',
    desc: 'Abstract rising energy wave with academic dividing rule',
    defaultBadge: 'SIET',
    defaultTheme: 'indigo'
  },
  {
    id: 'brochure',
    name: 'Conference Brochure',
    desc: 'Classical arched architectural window with cover photo',
    defaultBadge: 'BROCHURE',
    defaultTheme: 'crimson'
  },
  {
    id: 'photo',
    name: 'Full Photo Cover',
    desc: 'Full-bleed photography cover with modern overlay typography',
    defaultBadge: 'PUBLICATION',
    defaultTheme: 'emerald'
  }
];

// Helper to format title lines
function formatTitleLines(title, defaultLine1, defaultLine2) {
  if (!title || !title.trim()) {
    return { line1: defaultLine1, line2: defaultLine2 };
  }
  const clean = title.trim().replace(/^LEnSE\s*[-:]?\s*/i, '');
  const words = clean.split(' ');
  if (words.length <= 2) {
    return { line1: words[0] || defaultLine1, line2: words[1] || '' };
  }
  const mid = Math.ceil(words.length / 2);
  const l1 = words.slice(0, mid).join(' ');
  const l2 = words.slice(mid).join(' ');
  return { line1: l1, line2: l2 };
}

// ============================================================================
// PUBLICATION COVER COMPONENT
// ============================================================================
export default function PublicationCover({
  type = 'report',
  coverType,
  theme = 'emerald',
  themeColor,
  title = '',
  coverTitle = '',
  coverSubtitle = '',
  date = '',
  coverDate = '',
  badge = '',
  customBadge = '',
  coverImage = '/campus_building.jpg',
  className = ''
}) {
  const activeType = (coverType || type || 'report').toLowerCase();
  const activeThemeKey = (themeColor || theme || 'emerald').toLowerCase();
  const t = THEME_PRESETS[activeThemeKey] || THEME_PRESETS.emerald;

  const displayBadge = customBadge || badge || (
    activeType === 'courseware' ? 'FYUGP' :
    activeType === 'submission' ? 'SIET' :
    activeType === 'brochure' ? 'BROCHURE' : 'LEnSE'
  );

  const displayDate = coverDate || date || '2024 - 2025';

  const getLines = (defaultL1, defaultL2) => {
    if (coverTitle || (coverSubtitle !== undefined && coverSubtitle !== '')) {
      return {
        line1: coverTitle || (title ? formatTitleLines(title, defaultL1, defaultL2).line1 : defaultL1),
        line2: coverSubtitle !== undefined && coverSubtitle !== '' ? coverSubtitle : (title ? formatTitleLines(title, defaultL1, defaultL2).line2 : defaultL2)
      };
    }
    return formatTitleLines(title, defaultL1, defaultL2);
  };

  switch (activeType) {
    case 'report': {
      const { line1, line2 } = getLines('Annual', 'Report');
      return (
        <div
          className={`relative w-full h-full rounded-xl overflow-hidden p-3 flex flex-col justify-between shadow-sm select-none group-hover:shadow-md transition-all duration-300 border ${className}`}
          style={{
            backgroundColor: t.lightBg,
            borderColor: t.borderLight
          }}
        >
          {/* Spine gradient effect */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />

          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span
              className="text-[13px] font-serif font-bold leading-tight block truncate"
              style={{ color: t.textColor }}
            >
              {line1}
            </span>
            {line2 && (
              <span
                className="text-[13px] font-serif font-bold leading-tight block truncate"
                style={{ color: t.textColor }}
              >
                {line2}
              </span>
            )}
            <span
              className="text-[8px] font-sans tracking-wider block pt-0.5 font-medium truncate"
              style={{ color: t.subText }}
            >
              {displayDate}
            </span>
          </div>

          {/* Layered Topo Contours */}
          <div className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none overflow-hidden">
            <svg viewBox="0 0 100 80" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,32 Q25,12 52,28 T100,18 L100,80 L0,80 Z" fill={t.secondary} opacity="0.45" />
              <path d="M0,44 Q30,24 60,38 T100,28 L100,80 L0,80 Z" fill={t.accent} opacity="0.65" />
              <path d="M0,54 Q35,38 72,50 T100,42 L100,80 L0,80 Z" fill={t.accent} opacity="0.85" />
              <path d="M0,66 Q40,52 75,62 T100,56 L100,80 L0,80 Z" fill={t.primary} />
            </svg>
          </div>

          {/* Bottom Badge */}
          <div className="relative z-10 self-center">
            <span
              className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold tracking-widest uppercase border border-white/10 shadow-xs"
              style={{
                backgroundColor: `${t.badgeBg}dd`,
                color: t.badgeText
              }}
            >
              {displayBadge}
            </span>
          </div>
        </div>
      );
    }

    case 'guide': {
      const { line1, line2 } = getLines('AI', 'in Education');
      return (
        <div
          className={`relative w-full h-full rounded-xl overflow-hidden p-3 flex flex-col justify-between shadow-sm select-none group-hover:shadow-md transition-all duration-300 border ${className}`}
          style={{
            backgroundColor: t.lightBg,
            borderColor: t.borderLight
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />

          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span
              className="text-xl font-bold font-serif block leading-none truncate"
              style={{ color: t.textColor }}
            >
              {line1}
            </span>
            <span
              className="text-[10.5px] font-sans font-semibold leading-tight block truncate"
              style={{ color: t.accent }}
            >
              {line2 || 'A Practical Guide'}
            </span>
            <span
              className="text-[7.5px] font-sans block pt-0.5 font-medium truncate"
              style={{ color: t.subText }}
            >
              Instructional Guide
            </span>
          </div>

          {/* Concentric Wave Ripples */}
          <div className="absolute inset-x-0 bottom-0 h-[62%] pointer-events-none overflow-hidden flex items-end justify-center">
            <div
              className="w-[140%] aspect-square rounded-full translate-y-[45%] flex items-center justify-center p-3"
              style={{
                background: `linear-gradient(to top, ${t.primary}, ${t.accent}, ${t.secondary})`
              }}
            >
              <div className="w-[75%] h-[75%] rounded-full border border-white/25" />
            </div>
          </div>

          <div className="relative z-10 self-center">
            <span
              className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold tracking-widest uppercase border border-white/10 shadow-xs"
              style={{
                backgroundColor: `${t.badgeBg}dd`,
                color: t.badgeText
              }}
            >
              {displayBadge}
            </span>
          </div>
        </div>
      );
    }

    case 'toolkit': {
      const { line1, line2 } = getLines('STEM', 'Activity Toolkit');
      return (
        <div
          className={`relative w-full h-full rounded-xl overflow-hidden p-3 flex flex-col justify-between shadow-sm select-none group-hover:shadow-md transition-all duration-300 border ${className}`}
          style={{
            backgroundColor: t.lightBg,
            borderColor: t.borderLight
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />

          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span
              className="text-[13px] font-sans font-extrabold tracking-wide block leading-tight truncate"
              style={{ color: t.textColor }}
            >
              {line1}
            </span>
            <span
              className="text-[9.5px] font-sans font-semibold block truncate"
              style={{ color: t.subText }}
            >
              {line2 || 'Activity Toolkit'}
            </span>
          </div>

          {/* 3 Intersecting Floating Bubbles */}
          <div className="relative z-10 flex flex-col items-center gap-1.5 my-auto py-1">
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full backdrop-blur-xs flex items-center justify-center text-white shadow-xs border border-white/10"
                style={{ backgroundColor: `${t.primary}cc` }}
              >
                <Sparkles size={11} />
              </div>
              <div
                className="w-6 h-6 rounded-full backdrop-blur-xs flex items-center justify-center text-white shadow-xs border border-white/10"
                style={{ backgroundColor: `${t.accent}cc` }}
              >
                <BookOpen size={11} />
              </div>
            </div>
            <div
              className="w-6 h-6 rounded-full backdrop-blur-xs flex items-center justify-center text-white shadow-xs border border-white/10"
              style={{ backgroundColor: `${t.primary}cc` }}
            >
              <Layers size={11} />
            </div>
          </div>

          <div className="relative z-10 self-center">
            <span
              className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold tracking-widest uppercase border border-white/10 shadow-xs"
              style={{
                backgroundColor: `${t.badgeBg}dd`,
                color: t.badgeText
              }}
            >
              {displayBadge}
            </span>
          </div>
        </div>
      );
    }

    case 'courseware': {
      const { line1, line2 } = getLines('Learning', 'Module');
      return (
        <div
          className={`relative w-full h-full rounded-xl overflow-hidden p-3 flex flex-col justify-between shadow-sm select-none group-hover:shadow-md transition-all duration-300 border ${className}`}
          style={{
            backgroundColor: t.lightBg,
            borderColor: t.borderLight
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />

          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span
              className="text-[13px] font-serif font-bold leading-tight block truncate"
              style={{ color: t.textColor }}
            >
              {line1}
            </span>
            <span
              className="text-[13px] font-serif font-bold leading-tight block truncate"
              style={{ color: t.textColor }}
            >
              {line2 || 'Curriculum Module'}
            </span>
            <span
              className="text-[8px] font-sans font-semibold block pt-0.5 truncate"
              style={{ color: t.subText }}
            >
              {displayDate}
            </span>
          </div>

          {/* Flowing Landscape Hills */}
          <div className="absolute inset-0 pointer-events-none flex items-end">
            <svg viewBox="0 0 100 80" className="w-full h-1/2" preserveAspectRatio="none" fill="none">
              <path d="M0,40 Q30,10 65,35 T100,20 L100,80 L0,80 Z" fill={t.secondary} opacity="0.45" />
              <path d="M0,50 Q45,25 75,55 T100,45 L100,80 L0,80 Z" fill={t.accent} opacity="0.65" />
              <path d="M0,62 Q35,45 70,60 T100,52 L100,80 L0,80 Z" fill={t.primary} opacity="0.9" />
            </svg>
          </div>

          <div className="relative z-10 self-center">
            <span
              className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold tracking-widest uppercase border border-white/10 shadow-xs"
              style={{
                backgroundColor: `${t.badgeBg}dd`,
                color: t.badgeText
              }}
            >
              {displayBadge}
            </span>
          </div>
        </div>
      );
    }

    case 'submission': {
      const { line1, line2 } = getLines('Call', 'for Papers');
      return (
        <div
          className={`relative w-full h-full rounded-xl overflow-hidden p-3 flex flex-col justify-between shadow-sm select-none group-hover:shadow-md transition-all duration-300 border ${className}`}
          style={{
            backgroundColor: t.lightBg,
            borderColor: t.borderLight
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/20 dark:via-white/5 to-transparent pointer-events-none z-20" />

          {/* Top Title with Accent Line */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-1">
            <span
              className="text-[13px] font-serif font-bold leading-tight block truncate"
              style={{ color: t.textColor }}
            >
              {line1}
            </span>
            <span
              className="text-[13px] font-serif font-bold leading-tight block truncate"
              style={{ color: t.textColor }}
            >
              {line2 || 'Conference Track'}
            </span>
            <div
              className="w-7 h-[2px] rounded-full mt-1.5 opacity-80"
              style={{ backgroundColor: t.accent }}
            />
          </div>

          {/* Abstract Rising Wave */}
          <div className="absolute inset-0 pointer-events-none flex items-end">
            <svg viewBox="0 0 100 80" className="w-full h-1/2" preserveAspectRatio="none" fill="none">
              <path d="M0,42 C30,18 65,58 100,32 L100,80 L0,80 Z" fill={t.accent} opacity="0.5" />
              <path d="M0,55 C40,35 75,65 100,48 L100,80 L0,80 Z" fill={t.primary} opacity="0.95" />
            </svg>
          </div>

          <div className="relative z-10 self-center">
            <span
              className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold tracking-widest uppercase border border-white/10 shadow-xs"
              style={{
                backgroundColor: `${t.badgeBg}dd`,
                color: t.badgeText
              }}
            >
              {displayBadge}
            </span>
          </div>
        </div>
      );
    }

    case 'photo':
    case 'image': {
      const { line1, line2 } = getLines('Featured', 'Publication');
      return (
        <div
          className={`relative w-full h-full rounded-xl overflow-hidden p-2.5 flex flex-col justify-between shadow-sm select-none group-hover:shadow-md transition-all duration-300 border ${className}`}
          style={{
            borderColor: t.borderLight
          }}
        >
          {/* Background Full-Bleed Photograph */}
          <div className="absolute inset-0 z-0">
            <img
              src={coverImage || '/campus_building.jpg'}
              alt={title || 'Cover'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = '/home/bg.png';
              }}
            />
            {/* Scrim Overlay Gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85"
            />
          </div>

          {/* Spine effect */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/50 via-white/10 to-transparent pointer-events-none z-20" />

          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1 pt-0.5">
            <span className="text-[12px] font-serif font-bold leading-tight block truncate text-white drop-shadow-md">
              {line1}
            </span>
            <span className="text-[9.5px] font-sans font-medium leading-tight block truncate text-white/80 drop-shadow-sm">
              {line2 || ''}
            </span>
            <span
              className="text-[8px] font-mono block tracking-wider mt-1 opacity-90"
              style={{ color: t.secondary }}
            >
              {displayDate}
            </span>
          </div>

          {/* Bottom Badge */}
          <div className="relative z-10 self-center">
            <span
              className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold tracking-widest uppercase border border-white/20 shadow-xs backdrop-blur-xs"
              style={{
                backgroundColor: `${t.badgeBg}ee`,
                color: t.badgeText
              }}
            >
              {displayBadge}
            </span>
          </div>
        </div>
      );
    }

    case 'brochure':
    default: {
      const { line1, line2 } = getLines('SIET 2025', 'Conference');
      return (
        <div
          className={`relative w-full h-full rounded-xl overflow-hidden p-2.5 flex flex-col justify-between shadow-sm select-none group-hover:shadow-md transition-all duration-300 border ${className}`}
          style={{
            backgroundColor: t.lightBg,
            borderColor: t.borderLight
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/10 dark:from-black/30 via-white/15 dark:via-white/5 to-transparent pointer-events-none z-20" />

          {/* Top Title */}
          <div className="relative z-10 space-y-0.5 pl-1">
            <span
              className="text-[11.5px] font-sans font-extrabold leading-tight block truncate"
              style={{ color: t.textColor }}
            >
              {line1}
            </span>
            <span
              className="text-[9.5px] font-sans font-medium leading-tight block truncate"
              style={{ color: t.subText }}
            >
              {line2 || 'Conference'}
            </span>
          </div>

          {/* Arched Architectural Window */}
          <div
            className="relative w-full h-[85px] rounded-t-full overflow-hidden shadow-xs my-auto border"
            style={{ borderColor: 'rgba(255, 255, 255, 0.8)' }}
          >
            <img
              src={coverImage || '/campus_building.jpg'}
              alt={title || 'Resource Brochure'}
              className="w-full h-full object-cover object-bottom group-hover:scale-110 transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.src = '/home/bg.png';
              }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
              style={{
                backgroundImage: `linear-gradient(to top, ${t.primary}88, transparent)`
              }}
            />
          </div>

          {/* Bottom Badge */}
          <div className="relative z-10 self-center">
            <span
              className="px-2.5 py-0.5 rounded-full text-[7.5px] font-bold tracking-widest uppercase border border-white/10 shadow-xs"
              style={{
                backgroundColor: `${t.badgeBg}dd`,
                color: t.badgeText
              }}
            >
              {displayBadge}
            </span>
          </div>
        </div>
      );
    }
  }
}
