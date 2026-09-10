'use client';
import React from 'react';
import { Leaf } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading...', fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col justify-between select-none">
        {/* Soothing Top Shimmer Progress Bar */}
        <div className="w-full h-[3.5px] bg-[#e2ede4] dark:bg-[#0a2014] overflow-hidden relative shadow-[0_0_12px_rgba(162,212,94,0.4)]">
          <div className="h-full bg-gradient-to-r from-[#2d5a3c] via-[#a2d45e] to-[#4ade80] animate-pulse w-full origin-left transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
        </div>

        {/* Floating Gentle Soothing Indicator Pill */}
        <div className="flex justify-center pb-8 opacity-90 transition-opacity duration-300">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 dark:bg-[#0b1c14]/85 backdrop-blur-xl border border-white/90 dark:border-[#183a27] shadow-[0_12px_32px_rgba(0,30,15,0.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
            <div className="relative flex items-center justify-center w-5 h-5">
              <div className="w-4 h-4 rounded-full border-[2px] border-[#2d5a3c]/30 dark:border-[#a2d45e]/30 border-t-[#2d5a3c] dark:border-t-[#a2d45e] animate-spin" />
              <Leaf size={9} className="absolute text-[#2d5a3c] dark:text-[#a2d45e]" />
            </div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#19241c] dark:text-slate-200">
              {message}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 flex flex-col items-center justify-center gap-3 select-none">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-[2.5px] border-[#2d5a3c]/20 dark:border-[#a2d45e]/20 border-t-[#2d5a3c] dark:border-t-[#a2d45e] animate-spin" />
        <Leaf size={14} className="absolute text-[#2d5a3c] dark:text-[#a2d45e]" />
      </div>
      <span className="text-xs font-semibold text-[#485b4d] dark:text-slate-400 tracking-wide">
        {message}
      </span>
    </div>
  );
}
