'use client';
import React, { useState, useEffect } from 'react';

/**
 * LenseLoader - Clean, Minimalist & Modern Loading Component
 * Replaces the heavy orbital diagram with a sleek, simple, lightweight spinner
 * styled with the brand color #009ab1 and off-white backdrop.
 */
export default function LenseLoader({
  progress: externalProgress = null,
  autoProgress = true,
  duration = 400,
  onComplete = null,
  fullScreen = true,
  message = 'Loading...'
}) {
  const [internalProgress, setInternalProgress] = useState(externalProgress !== null ? externalProgress : 0);

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
      
      // Smooth natural ease-out
      const eased = Math.min(100, Math.round(t * 100));
      setInternalProgress(eased);

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        if (onComplete) {
          setTimeout(onComplete, 100);
        }
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [externalProgress, autoProgress, duration, onComplete]);

  const p = Math.min(100, Math.max(0, internalProgress));

  // Clean formatting for message
  const formattedMessage = message
    ? message.replace(/\s+/g, ' ').trim()
    : 'Loading...';

  const content = (
    <div className="flex flex-col items-center justify-center gap-3.5 select-none animate-in fade-in duration-200">
      {/* Simple, Sleek Spinner */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
        {/* Soft Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-[#009ab1]/15 blur-md animate-pulse" />

        {/* Minimal SVG Spinner Ring */}
        <svg
          className="w-full h-full -rotate-90 transform"
          viewBox="0 0 48 48"
          fill="none"
        >
          {/* Track */}
          <circle
            cx="24"
            cy="24"
            r="19"
            stroke="currentColor"
            strokeWidth="3"
            className="text-[#009ab1]/15 dark:text-[#009ab1]/25"
          />
          {/* Smooth spinning arc */}
          <circle
            cx="24"
            cy="24"
            r="19"
            stroke="#009ab1"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="119.38"
            strokeDashoffset="80"
            className="animate-spin origin-center"
            style={{ animationDuration: '0.85s' }}
          />
        </svg>

        {/* Center Pulse Dot */}
        <div className="absolute w-2 h-2 rounded-full bg-[#009ab1] shadow-[0_0_8px_#009ab1]" />
      </div>

      {/* Brand & Label */}
      <div className="flex flex-col items-center text-center gap-1">
        <span className="text-xs sm:text-[13px] font-bold tracking-[0.22em] text-slate-800 dark:text-slate-100 uppercase">
          LEnSE
        </span>

        {formattedMessage && (
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400">
            {formattedMessage}
          </span>
        )}

        {/* Minimal Progress Bar (when progress is tracked) */}
        {(autoProgress || externalProgress !== null) && p > 0 && (
          <div className="w-20 sm:w-24 h-1 rounded-full bg-[#009ab1]/15 overflow-hidden mt-1">
            <div
              className="h-full bg-[#009ab1] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${p}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );

  if (!fullScreen) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f8faf9]/95 dark:bg-[#030712]/95 backdrop-blur-md flex items-center justify-center transition-opacity duration-200">
      {content}
    </div>
  );
}
