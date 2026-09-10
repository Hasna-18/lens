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
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto check if already logged in
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/check');
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            router.replace('/admin/events');
            return;
          }
        }
      } catch (err) {
        // Not logged in, stay on login page
      } finally {
        setCheckingSession(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid credentials');
      }

      // Store local indicator for instant UI responsiveness
      if (typeof window !== 'undefined') {
        localStorage.setItem('lense_admin_user', username.trim());
      }

      // Redirect smoothly to the admin events page
      router.push('/admin/events');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMsg('');
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-outfit">
        <div className="text-center space-y-3 bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80">
          <Loader2 className="animate-spin text-[#2d5a3c] mx-auto" size={32} />
          <p className="text-slate-600 text-xs font-semibold tracking-wide">Checking administrative access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-outfit flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-100/60 via-emerald-50/40 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Bar */}
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between z-20">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#2d5a3c] transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return to University Site</span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-[#2d5a3c]">
          <ShieldCheck size={14} className="text-[#2d5a3c]" />
          <span>Restricted Admin Portal</span>
        </div>
      </header>

      {/* Central Login Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 z-20">
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-7 sm:p-10 shadow-xl shadow-slate-200/60 relative">
          
          {/* Subtle Accent Glow on Card */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-40 h-[2px] bg-gradient-to-r from-transparent via-[#2d5a3c] to-transparent" />

          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#2d5a3c] shadow-sm mb-4 ring-4 ring-emerald-50">
              <Lock size={24} strokeWidth={2.2} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Admin Login
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
              LEnSE • Centre for Learning Engineering & Sustainability Education
            </p>
          </div>

          {/* Quick Demo Pill Helper */}
          <div className="mb-6 p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-emerald-950">
              <Sparkles size={14} className="text-[#2d5a3c] shrink-0" />
              <span>Default credentials: <strong>admin</strong> / <strong>admin123</strong></span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#2d5a3c] hover:bg-[#23462f] text-white transition-colors shrink-0 shadow-xs"
            >
              Fill Demo
            </button>
          </div>

          {/* Error Message Box */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle size={17} className="text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={17} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 focus:bg-white focus:border-[#2d5a3c] focus:ring-2 focus:ring-[#2d5a3c]/10 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 bg-slate-50/80 border border-slate-200 focus:bg-white focus:border-[#2d5a3c] focus:ring-2 focus:ring-[#2d5a3c]/10 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#2d5a3c] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#2d5a3c]"
                />
                <span className="text-xs text-slate-600 font-medium">Remember on this device</span>
              </label>

              <span className="text-[11px] text-slate-400 font-medium">Session: 7 Days</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#2d5a3c] hover:bg-[#23462f] text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-900/15 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
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

          {/* Footer note */}
          <div className="mt-8 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Protected administrative environment. Unauthorized access attempts are monitored and logged.
            </p>
          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full max-w-6xl mx-auto px-6 py-6 text-center text-xs text-slate-400 z-20">
        © 2024-2025 LEnSE • University of Kerala • All Rights Reserved
      </footer>

    </div>
  );
}
