'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, 
  Mail, 
  KeyRound, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  UserPlus, 
  LogIn, 
  Check,
  Shield,
  ShieldAlert
} from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

export default function AdminRegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    superAdminKey: ''
  });

  const [isSuperAdminSession, setIsSuperAdminSession] = useState(false);
  const [currentSuperAdmin, setCurrentSuperAdmin] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAdminKey, setShowAdminKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Check auth state
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/check');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user?.role === 'superadmin') {
            setIsSuperAdminSession(true);
            setCurrentSuperAdmin(data.user);
          }
        }
      } catch (err) {
        // Not logged in as superadmin
      }
    }
    checkAuth();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrorMsg('');
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 25;
    if (pass.length >= 10) score += 25;
    if (/[A-Z]/.test(pass)) score += 25;
    if (/[0-9!@#$%^&*]/.test(pass)) score += 25;
    return score;
  };

  const strength = getPasswordStrength(formData.password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.username.trim() || !formData.password) {
      setErrorMsg('Please fill in all required registration fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Please enter a valid academic/official email address.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify both password fields.');
      return;
    }

    if (!isSuperAdminSession && !formData.superAdminKey.trim()) {
      setErrorMsg('Super Admin Authorization Key is required. Only a Super Administrator can provision new accounts.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          username: formData.username.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          superAdminKey: formData.superAdminKey.trim()
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed.');
      }

      setSuccessMsg(data.message || 'Administrator account registered successfully!');

      setTimeout(() => {
        if (isSuperAdminSession) {
          router.push('/admin');
        } else {
          router.push('/admin/login');
        }
      }, 1000);

    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Check Super Admin key or details.');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f0f7ff] overflow-hidden flex flex-col justify-between selection:bg-[#009ab1]/20 selection:text-[#0f1a3a] font-sans">

      {/* ========================================================================= */}
      {/* 1. BACKGROUND CAMPUS PHOTO & FLUID ORGANIC WAVES */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute right-0 top-0 h-full w-full lg:w-[62%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/campus-bg.jpg'), url('/image.png'), url('/assets/image.png')` }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 lg:hidden" />

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
      <main className="relative z-10 w-full min-h-screen flex items-center px-6 sm:px-12 lg:px-20 py-8 lg:py-10">
        <div className="w-full max-w-[460px] sm:max-w-[480px]">

          {/* Brand Header */}
          <div className="mb-4">
            <Link href="/" className="inline-block group">
              <div className="flex items-baseline select-none">
                <span style={SERIF} className="text-[36px] sm:text-[42px] font-bold text-[#0f1a3a] tracking-tight leading-none group-hover:text-[#009ab1] transition-colors">
                  LEn
                </span>
                <span style={SERIF} className="text-[36px] sm:text-[42px] font-bold italic text-[#009ab1] tracking-tight ml-0.5 leading-none">
                  SE
                </span>
              </div>
              <p className="text-[9.5px] font-extrabold uppercase tracking-[0.22em] text-[#0f1a3a]/80 mt-1 leading-tight">
                Centre for Learning Engineering &amp; Sustainability Education
              </p>
            </Link>
          </div>

          {/* Access Badge */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-100 to-blue-50 border border-purple-200/90 flex items-center justify-center text-purple-700 shadow-xs shrink-0">
              <Shield size={16} strokeWidth={2.2} />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-[1.5px] bg-[#009ab1]/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#009ab1]">
                Super Admin Provisioning
              </span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="mb-3">
            <h1 style={SERIF} className="text-2xl sm:text-[28px] font-normal text-[#0f1a3a] leading-tight tracking-tight">
              Generate <em style={SERIF} className="italic text-[#009ab1] font-normal">Administrator</em>
            </h1>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              New administrator accounts can only be provisioned by a verified Super Administrator.
            </p>
          </div>

          {/* Super Admin Status Banner */}
          {isSuperAdminSession ? (
            <div className="mb-3 p-2.5 rounded-xl bg-purple-50/90 border border-purple-200 text-purple-900 text-xs font-semibold flex items-center gap-2">
              <ShieldCheck size={16} className="text-purple-700 shrink-0" />
              <span>Authorized session active as Super Admin (@{currentSuperAdmin?.username})</span>
            </div>
          ) : (
            <div className="mb-3 p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-[11px] font-medium flex items-center gap-2">
              <ShieldAlert size={16} className="text-amber-600 shrink-0" />
              <span>Public registration is locked. Enter Super Admin Authorization Key below.</span>
            </div>
          )}

          {/* Notifications */}
          {errorMsg && (
            <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={15} className="text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-2.5">

            {/* Super Admin Key (if not in a logged in superadmin session) */}
            {!isSuperAdminSession && (
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                  Super Admin Security Key <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl border border-amber-300 focus-within:border-[#009ab1] focus-within:ring-3 focus-within:ring-blue-100 transition-all bg-amber-50/20 shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-600">
                    <KeyRound size={15} />
                  </div>
                  <input
                    type={showAdminKey ? 'text' : 'password'}
                    name="superAdminKey"
                    required
                    value={formData.superAdminKey}
                    onChange={handleChange}
                    placeholder="Enter Super Admin Security Key"
                    className="w-full pl-9 pr-10 py-2 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminKey(!showAdminKey)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showAdminKey ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-[#009ab1] focus-within:ring-3 focus-within:ring-blue-100 transition-all bg-white shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-600">
                  <User size={15} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Jane Cooper"
                  className="w-full pl-9 pr-3 py-2 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Email & Username in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                  Official Email
                </label>
                <div className="relative rounded-xl border border-slate-200 focus-within:border-[#009ab1] focus-within:ring-3 focus-within:ring-blue-100 transition-all bg-white shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-600">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@keralauniv.ac.in"
                    className="w-full pl-9 pr-2 py-2 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                  Admin Username
                </label>
                <div className="relative rounded-xl border border-slate-200 focus-within:border-[#009ab1] focus-within:ring-3 focus-within:ring-blue-100 transition-all bg-white shadow-2xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-600 font-bold text-xs">
                    @
                  </div>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="jane_cooper"
                    className="w-full pl-7 pr-2 py-2 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                Password
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-[#009ab1] focus-within:ring-3 focus-within:ring-blue-100 transition-all bg-white shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-600">
                  <KeyRound size={15} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-9 pr-10 py-2 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {formData.password && (
                <div className="mt-1 space-y-0.5">
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength <= 25 ? 'bg-rose-500 w-1/4' :
                        strength <= 50 ? 'bg-amber-500 w-2/4' :
                        strength <= 75 ? 'bg-sky-500 w-3/4' : 'bg-emerald-500 w-full'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-700 mb-1">
                Confirm Password
              </label>
              <div className="relative rounded-xl border border-slate-200 focus-within:border-[#009ab1] focus-within:ring-3 focus-within:ring-blue-100 transition-all bg-white shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sky-600">
                  <KeyRound size={15} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className="w-full pl-9 pr-10 py-2 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>

              {formData.confirmPassword && (
                <div className="mt-1 text-[10px] flex items-center gap-1 font-medium">
                  {formData.password === formData.confirmPassword ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <Check size={11} strokeWidth={3} /> Passwords match
                    </span>
                  ) : (
                    <span className="text-rose-500">Passwords do not match</span>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#009ab1] to-[#008296] hover:from-[#008296] hover:to-[#006f80] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(20,102,246,0.35)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={17} />
                    <span>Provisioning Account in DB...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Administrator</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-3 my-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">OR</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <Link
            href="/admin/login"
            className="w-full py-2.5 px-5 rounded-xl border border-sky-300 bg-sky-50/50 hover:bg-sky-100/70 text-[#009ab1] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-2xs"
          >
            <LogIn size={15} />
            <span>RETURN TO SIGN IN</span>
          </Link>

          {/* Security Note */}
          <div className="mt-3 text-center">
            <p className="text-[10px] text-slate-500 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck size={13} className="text-[#009ab1]" />
              <span>Super Admin Managed • Neon PostgreSQL Encryption</span>
            </p>
          </div>

        </div>
      </main>

    </div>
  );
}
