'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Loader2, 
  KeyRound,
  UserPlus,
  CheckCircle2
} from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

export default function AdminLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto check if already logged in quietly
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/check');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.replace('/admin');
          }
        }
      } catch (err) {
        // Not logged in
      }
    }
    checkAuth();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg('Please enter both your username/email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password: password.trim(),
          rememberMe
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      setSuccessMsg('Authentication verified. Entering Command Centre...');

      if (typeof window !== 'undefined' && data.user) {
        localStorage.setItem('lense_admin_user', JSON.stringify(data.user));
      }

      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please verify your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f0f7ff] overflow-hidden flex flex-col justify-between selection:bg-[#1a6dff]/20 selection:text-[#0f1a3a] font-sans">

      {/* ========================================================================= */}
      {/* 1. BACKGROUND CAMPUS PHOTO & FLUID ORGANIC WAVES (Matching Design Mockup) */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Kerala University Campus Photo */}
        <div 
          className="absolute right-0 top-0 h-full w-full lg:w-[62%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/campus-bg.jpg'), url('/image.png'), url('/assets/image.png')` }}
        />

        {/* Mobile & Tablet Soft Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 lg:hidden" />

        {/* Desktop Organic Layered Liquid Wave Mask */}
        <div className="hidden lg:block absolute inset-0 w-full h-full">
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="none"
            className="w-full h-full"
            fill="none"
          >
            {/* Outer Cyan Swirl Accent */}
            <path
              d="M -50 0 L 830 0 C 760 170 890 330 790 490 C 690 650 850 790 730 900 L -50 900 Z"
              fill="rgba(219, 239, 255, 0.75)"
            />
            {/* Middle Soft Sky Curve */}
            <path
              d="M -50 0 L 760 0 C 700 190 820 350 720 510 C 630 670 770 810 670 900 L -50 900 Z"
              fill="rgba(240, 248, 255, 0.92)"
            />
            {/* Front Pure White Organic Body */}
            <path
              d="M -50 0 L 690 0 C 630 200 750 370 650 530 C 570 690 690 820 600 900 L -50 900 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Ambient Top & Bottom Glows */}
        <div className="hidden lg:block absolute -top-24 left-1/4 w-[450px] h-[450px] bg-sky-200/35 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden lg:block absolute -bottom-24 left-10 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. FOREGROUND SPLIT-SCREEN CONTENT CONTAINER */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full min-h-screen flex items-center px-6 sm:px-12 lg:px-20 py-8 lg:py-12">
        <div className="w-full max-w-[440px] sm:max-w-[460px]">

          {/* ==================== Brand Header ==================== */}
          <div className="mb-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-baseline select-none">
                <span style={SERIF} className="text-[38px] sm:text-[44px] font-bold text-[#0f1a3a] tracking-tight leading-none group-hover:text-[#1a6dff] transition-colors">
                  LEn
                </span>
                <span style={SERIF} className="text-[38px] sm:text-[44px] font-bold italic text-[#1a6dff] tracking-tight ml-0.5 leading-none">
                  SE
                </span>
              </div>
              <p className="text-[9.5px] font-extrabold uppercase tracking-[0.22em] text-[#0f1a3a]/80 mt-1.5 leading-tight">
                Centre for Learning Engineering
              </p>
              <p className="text-[9.5px] font-extrabold uppercase tracking-[0.22em] text-[#0f1a3a]/80 leading-tight">
                &amp; Sustainability Education
              </p>
            </Link>
          </div>

          {/* ==================== Access Badge ==================== */}
          <div className="flex items-center gap-3 mb-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 border border-sky-200/90 flex items-center justify-center text-[#1a6dff] shadow-[0_4px_14px_rgba(56,189,248,0.22)] shrink-0">
              <Lock size={18} strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#1a6dff]/40" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1a6dff]">
                Administrative Access
              </span>
            </div>
          </div>

          {/* ==================== Title & Subtitle ==================== */}
          <div className="mb-5">
            <h1 style={SERIF} className="text-3xl sm:text-[34px] font-normal text-[#0f1a3a] leading-tight tracking-tight">
              Sign In to <em style={SERIF} className="italic text-[#1a6dff] font-normal">LEnSE</em>
            </h1>
            <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-normal leading-relaxed">
              Centre for Learning Engineering &amp; Sustainability Education
            </p>
          </div>

          {/* ==================== Error / Success Notifications ==================== */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ==================== Login Form ==================== */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* Username or Email */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1.5">
                Username or Registered Email
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-[#1a6dff] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all bg-white shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-600">
                  <User size={17} />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="admin or name@keralauniversity.ac.in"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700">
                  Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-xs font-semibold text-[#1a6dff] hover:text-blue-800 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-[#1a6dff] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all bg-white shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-600">
                  <KeyRound size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Session */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#1a6dff] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#1a6dff]"
                />
                <span className="text-xs text-slate-600 font-medium">Remember me on this device</span>
              </label>

              <span className="text-xs text-slate-500 font-medium">Session: 30 Days</span>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#1466f6] to-[#0052e0] hover:from-[#0d59e0] hover:to-[#0047c7] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(20,102,246,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Console</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-3.5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Register New Administrator Button */}
          <Link
            href="/admin/register"
            className="w-full py-3 px-5 rounded-xl border border-sky-300 bg-sky-50/50 hover:bg-sky-100/70 text-[#1a6dff] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-2xs"
          >
            <UserPlus size={16} />
            <span>REGISTER NEW ADMINISTRATOR</span>
          </Link>

          {/* Bottom Security Note */}
          <div className="mt-4 text-center">
            <p className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck size={13} className="text-[#1a6dff]" />
              <span>Protected environment with BetterAuth encryption</span>
            </p>
          </div>

        </div>
      </main>

    </div>
  );
}
