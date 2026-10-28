'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Key, 
  LogIn, 
  Lock 
} from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

export default function AdminForgotPasswordPage() {
  const router = useRouter();

  // Step 1: Request Code | Step 2: Enter Code & New Password | Step 3: Success
  const [step, setStep] = useState(1);

  const [identifier, setIdentifier] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState(null);

  // Step 1: Submit identifier to generate reset code
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg('Please enter your administrator username or registered email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: identifier.trim() })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to initiate password reset.');
      }

      setSuccessInfo({
        email: data.email,
        code: data.code,
        token: data.token
      });

      setResetCode(data.code || '');
      setResetToken(data.token || '');
      setStep(2);

    } catch (err) {
      setErrorMsg(err.message || 'Unable to find an administrator account with those details.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit code and new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!resetCode.trim()) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please ensure both passwords match.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenOrCode: resetCode.trim() || resetToken,
          newPassword,
          confirmPassword
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Password reset failed.');
      }

      setStep(3);

    } catch (err) {
      setErrorMsg(err.message || 'Failed to update password. Code may have expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f0f7ff] overflow-hidden flex flex-col justify-between selection:bg-[#1a6dff]/20 selection:text-[#0f1a3a] font-sans">

      {/* ========================================================================= */}
      {/* 1. BACKGROUND CAMPUS PHOTO & FLUID ORGANIC WAVES */}
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
            <path
              d="M -50 0 L 830 0 C 760 170 890 330 790 490 C 690 650 850 790 730 900 L -50 900 Z"
              fill="rgba(219, 239, 255, 0.75)"
            />
            <path
              d="M -50 0 L 760 0 C 700 190 820 350 720 510 C 630 670 770 810 670 900 L -50 900 Z"
              fill="rgba(240, 248, 255, 0.92)"
            />
            <path
              d="M -50 0 L 690 0 C 630 200 750 370 650 530 C 570 690 690 820 600 900 L -50 900 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

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

          {/* ==================== Step 1: Request Code ==================== */}
          {step === 1 && (
            <>
              {/* Access Badge */}
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 border border-sky-200/90 flex items-center justify-center text-[#1a6dff] shadow-[0_4px_14px_rgba(56,189,248,0.22)] shrink-0">
                  <Key size={18} strokeWidth={2.2} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[1.5px] bg-[#1a6dff]/40" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1a6dff]">
                    Self-Service Recovery
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-5">
                <h1 style={SERIF} className="text-3xl sm:text-[34px] font-normal text-[#0f1a3a] leading-tight tracking-tight">
                  Reset <em style={SERIF} className="italic text-[#1a6dff] font-normal">Password</em>
                </h1>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1 font-normal leading-relaxed">
                  Enter your registered administrator email or username to generate a secure recovery code.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle size={16} className="text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleRequestCode} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1.5">
                    Username or Registered Email
                  </label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-[#1a6dff] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all bg-white shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-600">
                      <Mail size={17} />
                    </div>
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="admin or name@keralauniversity.ac.in"
                      className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#1466f6] to-[#0052e0] hover:from-[#0d59e0] hover:to-[#0047c7] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(20,102,246,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={17} />
                        <span>Generating Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Reset Code</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ==================== Step 2: Enter Code & New Password ==================== */}
          {step === 2 && (
            <>
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 border border-emerald-200/90 flex items-center justify-center text-emerald-600 shadow-[0_4px_14px_rgba(16,185,129,0.22)] shrink-0">
                  <ShieldCheck size={18} strokeWidth={2.2} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[1.5px] bg-emerald-500/40" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
                    Code Verified
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h1 style={SERIF} className="text-2xl sm:text-[30px] font-normal text-[#0f1a3a] leading-tight tracking-tight">
                  Enter <em style={SERIF} className="italic text-[#1a6dff] font-normal">New Password</em>
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verification code generated for {successInfo?.email}
                </p>
              </div>

              {/* Code Display Banner */}
              {successInfo?.code && (
                <div className="mb-4 p-3 rounded-xl bg-blue-50/90 border border-blue-200/80 text-center space-y-0.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#1a6dff] block">
                    Your One-Time Verification Code
                  </span>
                  <div className="text-2xl font-mono font-black tracking-widest text-[#0f1a3a]">
                    {successInfo.code}
                  </div>
                  <span className="text-[9.5px] text-slate-400 block">
                    Valid for 60 minutes
                  </span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-3.5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5">
                  <AlertCircle size={16} className="text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                    6-Digit Verification Code
                  </label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-[#1a6dff] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all bg-white shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-600">
                      <KeyRound size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      placeholder="e.g. 762004"
                      className="w-full pl-10 pr-4 py-2.5 bg-transparent rounded-xl text-xs sm:text-sm font-mono font-bold text-slate-900 tracking-wider outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                    New Password
                  </label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-[#1a6dff] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all bg-white shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-600">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-10 py-2.5 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-[#1a6dff] focus-within:ring-4 focus-within:ring-blue-500/10 transition-all bg-white shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sky-600">
                      <Lock size={16} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-type new password"
                      className="w-full pl-10 pr-4 py-2.5 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-1.5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#1466f6] to-[#0052e0] hover:from-[#0d59e0] hover:to-[#0047c7] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(20,102,246,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={17} />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <span>Save New Password &amp; Update</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ==================== Step 3: Success ==================== */}
          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm mx-auto">
                <CheckCircle2 size={30} />
              </div>

              <div className="space-y-1">
                <h2 style={SERIF} className="text-2xl sm:text-3xl font-normal text-[#0f1a3a]">
                  Password Successfully Reset!
                </h2>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Your administrator password has been updated in the database. You can now log in securely with your new password.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/login"
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#1466f6] to-[#0052e0] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(20,102,246,0.35)] transition-all hover:scale-[1.01]"
                >
                  <span>Proceed to Admin Sign In</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          )}

          {/* OR Divider & Return Link */}
          <div className="flex items-center gap-3 my-3.5">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <Link
            href="/admin/login"
            className="w-full py-2.5 px-5 rounded-xl border border-sky-300 bg-sky-50/50 hover:bg-sky-100/70 text-[#1a6dff] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-2xs"
          >
            <LogIn size={15} />
            <span>RETURN TO SIGN IN</span>
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
