'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar,
  Layers,
  Settings,
  Plus,
  ExternalLink,
  ShieldCheck,
  Database,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  FileText,
  Loader2,
  Globe,
  Upload,
  BookOpen,
  Award,
  Users,
  Building,
  Mail,
  UserCheck,
  ShieldAlert,
  Clock,
  Check,
  UserPlus,
  Key,
  X,
  Eye,
  EyeOff,
  AlertCircle
} from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Administrator',
    username: 'admin',
    email: 'admin@lense.org',
    role: 'superadmin'
  });

  const [eventsCount, setEventsCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [resourcesCount, setResourcesCount] = useState(0);
  const [initiativesCount, setInitiativesCount] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [adminUsers, setAdminUsers] = useState([]);

  // Super Admin Reset Password Modal State
  const [resetModalUser, setResetModalUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Super Admin Create User Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    role: 'admin'
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');

  const isSuperAdmin = currentUser?.role === 'superadmin';

  const fetchUsers = async () => {
    try {
      const usersRes = await fetch('/api/admin/users');
      if (usersRes.ok) {
        const uData = await usersRes.json();
        if (Array.isArray(uData.users)) setAdminUsers(uData.users);
      }
    } catch (e) {
      console.error('Failed to refresh users:', e);
    }
  };

  useEffect(() => {
    async function verifyAuthAndFetch() {
      try {
        // 1. Verify Authentication against Database
        const checkRes = await fetch('/api/admin/check');
        if (!checkRes.ok) {
          router.replace('/admin/login');
          return;
        }

        const authData = await checkRes.json();
        if (authData.user) {
          setCurrentUser(authData.user);
        }

        // 2. Fetch live metrics and database admins concurrently
        const [eventsRes, newsRes, resourcesRes, initiativesRes, enquiriesRes, usersRes] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/news'),
          fetch('/api/resources'),
          fetch('/api/initiatives'),
          fetch('/api/enquiries'),
          fetch('/api/admin/users')
        ]);

        if (eventsRes.ok) {
          const eventsData = await eventsRes.json();
          if (Array.isArray(eventsData)) setEventsCount(eventsData.length);
        }
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          if (Array.isArray(newsData)) setNewsCount(newsData.length);
        }
        if (resourcesRes.ok) {
          const resData = await resourcesRes.json();
          if (Array.isArray(resData)) setResourcesCount(resData.length);
        }
        if (initiativesRes.ok) {
          const initsData = await initiativesRes.json();
          if (Array.isArray(initsData)) setInitiativesCount(initsData.length);
        }
        if (enquiriesRes.ok) {
          const enqData = await enquiriesRes.json();
          if (Array.isArray(enqData)) setEnquiriesCount(enqData.length);
        }
        if (usersRes.ok) {
          const uData = await usersRes.json();
          if (Array.isArray(uData.users)) setAdminUsers(uData.users);
        }

      } catch (err) {
        console.error("Dashboard data load failed", err);
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    verifyAuthAndFetch();
  }, [router]);

  // Handle Super Admin Password Reset Submission
  const handleSuperAdminResetSubmit = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    if (!newPassword || newPassword.length < 6) {
      setResetError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match. Please verify both fields.');
      return;
    }

    setResetLoading(true);

    try {
      const res = await fetch('/api/admin/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: resetModalUser.id,
          newPassword,
          confirmPassword
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update password.');
      }

      setResetSuccess(data.message || 'Password successfully updated in database!');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setResetModalUser(null);
        setResetSuccess('');
      }, 1800);

    } catch (err) {
      setResetError(err.message || 'Failed to reset password.');
    } finally {
      setResetLoading(false);
    }
  };

  // Handle Super Admin Create User Submission
  const handleCreateAdminSubmit = async (e) => {
    e.preventDefault();
    setCreateError('');
    setCreateSuccess('');

    if (!newAdminData.name || !newAdminData.email || !newAdminData.username || !newAdminData.password) {
      setCreateError('Please complete all required fields.');
      return;
    }

    if (newAdminData.password.length < 6) {
      setCreateError('Password must be at least 6 characters long.');
      return;
    }

    setCreateLoading(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdminData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate administrator account.');
      }

      setCreateSuccess(`Administrator @${newAdminData.username} registered successfully in the database!`);
      setNewAdminData({ name: '', email: '', username: '', password: '', role: 'admin' });
      await fetchUsers();

      setTimeout(() => {
        setShowCreateModal(false);
        setCreateSuccess('');
      }, 1800);

    } catch (err) {
      setCreateError(err.message || 'Failed to create administrator.');
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-28 flex items-center justify-center">
        <div className="text-center space-y-4 bg-white p-9 rounded-[2rem] shadow-[0_12px_40px_rgba(26,109,255,0.08)] border border-slate-200/80 max-w-sm w-full mx-4">
          <Loader2 className="animate-spin text-[#1a6dff] mx-auto" size={36} />
          <div>
            <h3 style={SERIF} className="text-xl font-normal text-[#0f1a3a]">
              Loading Workspace
            </h3>
            <p className="text-slate-500 text-xs font-medium tracking-wide mt-1">
              Synchronizing with Neon PostgreSQL...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const displayName = currentUser.name || currentUser.username || 'Administrator';

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-9">

      {/* ========================================================================= */}
      {/* 1. EXECUTIVE WELCOME HERO BANNER */}
      {/* ========================================================================= */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#071329] via-[#0d2757] to-[#123b7b] text-white p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(15,35,70,0.25)] border border-white/10 overflow-hidden">

        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.22),transparent_70%)] pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,_rgba(26,109,255,0.35),transparent_70%)] pointer-events-none" />

        <svg className="hidden lg:block absolute right-10 top-0 w-[420px] h-[260px] pointer-events-none opacity-25" viewBox="0 0 420 260" fill="none">
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M0 ${250 - i * 8} C 150 ${215 - i * 12}, 300 ${130 - i * 15}, 420 ${i * 12}`} stroke="#38bdf8" strokeWidth="1" />
          ))}
        </svg>

        <div className="relative z-10 max-w-3xl space-y-4">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sky-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} className="text-[#38bdf8]" />
            <span>LEnSE Administrative Command Centre</span>
          </div>

          <h1 style={SERIF} className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
            Welcome back, <em style={SERIF} className="italic text-[#38bdf8] font-normal">{displayName}</em>.
          </h1>

          <p className="text-sky-100/90 text-sm sm:text-[15px] leading-relaxed font-normal max-w-2xl pt-1">
            Manage live STEM conferences, publish research tools, update academic resources, review enquiries, and oversee administrators with real-time PostgreSQL database persistence.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/admin/events"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-white to-sky-50 hover:bg-white text-[#0f244a] text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Create / Manage Events</span>
              <ArrowRight size={13} />
            </Link>

            <Link
              href="/admin/news"
              className="px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <FileText size={14} />
              <span>Publish News</span>
            </Link>

            {isSuperAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-5 py-3 rounded-full bg-[#1a6dff]/40 hover:bg-[#1a6dff]/60 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-sky-400/50 backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                <UserPlus size={14} className="text-sky-300" />
                <span>Generate Administrator</span>
              </button>
            )}

            <Link
              href="/"
              target="_blank"
              className="px-4 py-3 rounded-full bg-white/5 hover:bg-white/15 text-white/90 text-xs font-medium flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Public Portal</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LIVE METRICS ROW */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        <Link
          href="/admin/events"
          className="p-5 rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(26,109,255,0.03)] flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[#1a6dff]/40 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a6dff] shrink-0 group-hover:scale-105 transition-transform">
            <Calendar size={22} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Live Events</span>
            <span style={SERIF} className="text-2xl font-normal text-[#0f1a3a] leading-tight block mt-0.5">
              {eventsCount} <span className="text-xs font-sans font-medium text-slate-400">Items</span>
            </span>
          </div>
        </Link>

        <Link
          href="/admin/news"
          className="p-5 rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(26,109,255,0.03)] flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[#1a6dff]/40 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284c7] shrink-0 group-hover:scale-105 transition-transform">
            <FileText size={22} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">News &amp; Media</span>
            <span style={SERIF} className="text-2xl font-normal text-[#0f1a3a] leading-tight block mt-0.5">
              {newsCount} <span className="text-xs font-sans font-medium text-slate-400">Articles</span>
            </span>
          </div>
        </Link>

        <Link
          href="/admin/resources"
          className="p-5 rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(26,109,255,0.03)] flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[#1a6dff]/40 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4f46e5] shrink-0 group-hover:scale-105 transition-transform">
            <BookOpen size={22} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Resources</span>
            <span style={SERIF} className="text-2xl font-normal text-[#0f1a3a] leading-tight block mt-0.5">
              {resourcesCount} <span className="text-xs font-sans font-medium text-slate-400">Files</span>
            </span>
          </div>
        </Link>

        <Link
          href="/admin/initiatives"
          className="p-5 rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(26,109,255,0.03)] flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[#1a6dff]/40 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0d9488] shrink-0 group-hover:scale-105 transition-transform">
            <Sparkles size={22} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Initiatives</span>
            <span style={SERIF} className="text-2xl font-normal text-[#0f1a3a] leading-tight block mt-0.5">
              {initiativesCount} <span className="text-xs font-sans font-medium text-slate-400">Active</span>
            </span>
          </div>
        </Link>

        <Link
          href="/admin/enquiries"
          className="p-5 rounded-[2rem] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(26,109,255,0.03)] flex items-center gap-3.5 group hover:-translate-y-1 hover:border-[#1a6dff]/40 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform">
            <Mail size={22} strokeWidth={1.75} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Enquiries</span>
            <span style={SERIF} className="text-2xl font-normal text-[#0f1a3a] leading-tight block mt-0.5">
              {enquiriesCount} <span className="text-xs font-sans font-medium text-slate-400">Total</span>
            </span>
          </div>
        </Link>

      </div>

      {/* ========================================================================= */}
      {/* 3. REGISTERED ADMINISTRATORS SECTION (Super Admin Management) */}
      {/* ========================================================================= */}
      <div className="rounded-[2.2rem] bg-white border border-slate-200/80 p-6 sm:p-8 shadow-[0_4px_25px_rgba(26,109,255,0.03)] space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1a6dff] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#1a6dff]">
                Security &amp; User Directory
              </span>
              {isSuperAdmin && (
                <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[9px] font-bold uppercase tracking-wider border border-purple-200">
                  Super Admin Mode
                </span>
              )}
            </div>
            <h2 style={SERIF} className="text-2xl sm:text-3xl font-normal text-[#0f1a3a]">
              Registered <em style={SERIF} className="italic text-[#1a6dff] font-normal">Administrators</em>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {isSuperAdmin 
                ? 'Super Administrators have authority to generate new administrators and reset passwords directly.'
                : 'Account generation and credentials modification are restricted to Super Administrators.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <Database size={13} className="text-emerald-600" />
              <span>Neon DB Active</span>
            </div>

            {isSuperAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 rounded-xl bg-[#1a6dff] hover:bg-[#1255cc] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all hover:scale-[1.01] cursor-pointer"
              >
                <UserPlus size={14} />
                <span>Generate Administrator</span>
              </button>
            )}
          </div>
        </div>

        {/* Admin Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pl-2">Administrator</th>
                <th className="pb-3">Username</th>
                <th className="pb-3">Email Address</th>
                <th className="pb-3">Security Role</th>
                <th className="pb-3">Registered On</th>
                <th className="pb-3 text-center">Status</th>
                {isSuperAdmin && <th className="pb-3 text-right pr-2">Super Admin Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {adminUsers.length > 0 ? (
                adminUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#1a6dff] to-[#38bdf8] text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {(user.name || user.username || 'A').charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-[#0f1a3a] text-xs">
                          {user.name || 'Admin'}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 font-mono text-slate-600">
                      @{user.username}
                    </td>
                    <td className="py-3.5 text-slate-500">
                      {user.email}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        user.role === 'superadmin'
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-blue-50 text-[#1a6dff] border-blue-200'
                      }`}>
                        {user.role || 'admin'}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-400 text-[11px]">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Initial Seed'}
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <Check size={12} strokeWidth={3} /> Active in DB
                      </span>
                    </td>
                    {isSuperAdmin && (
                      <td className="py-3.5 text-right pr-2">
                        <button
                          onClick={() => {
                            setResetModalUser(user);
                            setNewPassword('');
                            setConfirmPassword('');
                            setResetError('');
                            setResetSuccess('');
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-200 bg-sky-50/60 hover:bg-sky-100 text-[#1a6dff] hover:text-[#0052e0] text-[11px] font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                          title={`Reset password for @${user.username}`}
                        >
                          <Key size={12} />
                          <span>Reset Password</span>
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={isSuperAdmin ? 7 : 6} className="py-6 text-center text-slate-400">
                    Loading registered administrators from PostgreSQL database...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4. MANAGEMENT MODULE CARDS */}
      {/* ========================================================================= */}
      <div className="space-y-6">

        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-[#1a6dff]" />
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#0f1a3a] uppercase">
              Management Modules
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: Events & Conferences */}
          <div className="rounded-[2.2rem] bg-white border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-[#1a6dff]/60 shadow-[0_4px_20px_rgba(26,109,255,0.03)] hover:shadow-[0_12px_32px_rgba(26,109,255,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a6dff] group-hover:scale-105 transition-transform">
                  <Calendar size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1a6dff] border border-blue-100">
                  Schedule
                </span>
              </div>

              <h3 style={SERIF} className="text-2xl font-normal text-[#0f1a3a] group-hover:text-[#1a6dff] transition-colors leading-tight">
                Events &amp; Conferences
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Publish international conferences, workshops, faculty development programmes, and STEM camps with poster images and schedules.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-5 flex items-center gap-2">
              <Link
                href="/admin/events"
                className="flex-1 py-2.5 rounded-xl bg-[#1a6dff] hover:bg-[#1255cc] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
              >
                <span>Manage</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                href="/events"
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                title="View Public Events Page"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Card 2: Academic Resources */}
          <div className="rounded-[2.2rem] bg-white border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-[#1a6dff]/60 shadow-[0_4px_20px_rgba(26,109,255,0.03)] hover:shadow-[0_12px_32px_rgba(26,109,255,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#4f46e5] group-hover:scale-105 transition-transform">
                  <BookOpen size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#4f46e5] border border-indigo-100">
                  Downloads
                </span>
              </div>

              <h3 style={SERIF} className="text-2xl font-normal text-[#0f1a3a] group-hover:text-[#1a6dff] transition-colors leading-tight">
                Academic Resources
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Edit and upload conference brochures, laboratory toolkits, FYUGP courseware, prompt engineering handbooks, and policy reports.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-5 flex items-center gap-2">
              <Link
                href="/admin/resources"
                className="flex-1 py-2.5 rounded-xl bg-[#1a6dff] hover:bg-[#1255cc] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
              >
                <span>Edit Files</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                href="/resources"
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                title="View Public Academic Resources Page"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Card 3: News & Media */}
          <div className="rounded-[2.2rem] bg-white border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-[#1a6dff]/60 shadow-[0_4px_20px_rgba(26,109,255,0.03)] hover:shadow-[0_12px_32px_rgba(26,109,255,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284c7] group-hover:scale-105 transition-transform">
                  <FileText size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0284c7] border border-sky-100">
                  Media
                </span>
              </div>

              <h3 style={SERIF} className="text-2xl font-normal text-[#0f1a3a] group-hover:text-[#1a6dff] transition-colors leading-tight">
                News &amp; Media
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Post press announcements, institutional MoU updates, media highlights, and academic achievements with photo coverage.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-5 flex items-center gap-2">
              <Link
                href="/admin/news"
                className="flex-1 py-2.5 rounded-xl bg-[#1a6dff] hover:bg-[#1255cc] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
              >
                <span>Manage</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                href="/news"
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                title="View Public News Page"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Card 4: Key STEM Initiatives */}
          <div className="rounded-[2.2rem] bg-white border border-slate-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-[#1a6dff]/60 shadow-[0_4px_20px_rgba(26,109,255,0.03)] hover:shadow-[0_12px_32px_rgba(26,109,255,0.08)] hover:-translate-y-1.5 transition-all duration-300 group">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#0d9488] group-hover:scale-105 transition-transform">
                  <Sparkles size={22} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0d9488] border border-teal-100">
                  Projects
                </span>
              </div>

              <h3 style={SERIF} className="text-2xl font-normal text-[#0f1a3a] group-hover:text-[#1a6dff] transition-colors leading-tight">
                Key Initiatives
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Manage flagship programmes like STEM 4 Girls, collaborative university partnerships, and community learning labs.
              </p>
            </div>

            <div className="pt-5 border-t border-slate-100 mt-5 flex items-center gap-2">
              <Link
                href="/admin/initiatives"
                className="flex-1 py-2.5 rounded-xl bg-[#1a6dff] hover:bg-[#1255cc] text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-98"
              >
                <span>Edit Initiatives</span>
                <ArrowRight size={13} />
              </Link>

              <Link
                href="/initiatives"
                target="_blank"
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                title="View Public Initiatives Page"
              >
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL: SUPER ADMIN RESET PASSWORD */}
      {/* ========================================================================= */}
      {resetModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-slate-200/90 overflow-hidden relative">

            {/* Top Bar Accent */}
            <div className="h-1.5 bg-gradient-to-r from-[#1466f6] via-[#38bdf8] to-[#0052e0]" />

            <div className="p-6 sm:p-7 space-y-5">

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#1a6dff]">
                    <Key size={18} />
                  </div>
                  <div>
                    <h3 style={SERIF} className="text-xl font-normal text-[#0f1a3a]">
                      Super Admin Reset Password
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Reset credentials for <span className="font-bold text-slate-800">@{resetModalUser.username}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setResetModalUser(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Target User Info Card */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Administrator:</span>
                  <span className="font-bold text-slate-800">{resetModalUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-mono text-slate-700">{resetModalUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Role:</span>
                  <span className="uppercase text-[10px] font-bold text-[#1a6dff]">{resetModalUser.role}</span>
                </div>
              </div>

              {resetError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle size={15} className="text-rose-600 shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}

              {resetSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>{resetSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSuperAdminResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    New Secure Password
                  </label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-[#1a6dff] focus-within:ring-3 focus-within:ring-blue-100 transition-all bg-white">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-3.5 pr-10 py-2.5 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative rounded-xl border border-slate-200 focus-within:border-[#1a6dff] focus-within:ring-3 focus-within:ring-blue-100 transition-all bg-white">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-3.5 pr-10 py-2.5 bg-transparent rounded-xl text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setResetModalUser(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="px-5 py-2.5 rounded-xl bg-[#1a6dff] hover:bg-[#1255cc] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    {resetLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        <span>Updating DB...</span>
                      </>
                    ) : (
                      <>
                        <Key size={14} />
                        <span>Update Password in Database</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL: SUPER ADMIN GENERATE NEW ADMINISTRATOR */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl border border-slate-200/90 overflow-hidden relative">

            <div className="h-1.5 bg-gradient-to-r from-[#1466f6] via-[#38bdf8] to-[#0052e0]" />

            <div className="p-6 sm:p-7 space-y-4">

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1a6dff]">
                    <UserPlus size={18} />
                  </div>
                  <div>
                    <h3 style={SERIF} className="text-xl font-normal text-[#0f1a3a]">
                      Generate New Administrator
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Super Admin Authorized Account Provisioning
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {createError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle size={15} className="text-rose-600 shrink-0" />
                  <span>{createError}</span>
                </div>
              )}

              {createSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>{createSuccess}</span>
                </div>
              )}

              <form onSubmit={handleCreateAdminSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminData.name}
                    onChange={(e) => setNewAdminData({ ...newAdminData, name: e.target.value })}
                    placeholder="e.g. Dr. Jane Cooper"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a6dff] focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      required
                      value={newAdminData.email}
                      onChange={(e) => setNewAdminData({ ...newAdminData, email: e.target.value })}
                      placeholder="name@keralauniv.ac.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a6dff] focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      required
                      value={newAdminData.username}
                      onChange={(e) => setNewAdminData({ ...newAdminData, username: e.target.value })}
                      placeholder="jane_cooper"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a6dff] focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Initial Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newAdminData.password}
                      onChange={(e) => setNewAdminData({ ...newAdminData, password: e.target.value })}
                      placeholder="Min 6 characters"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a6dff] focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 placeholder-slate-400 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                      Security Role
                    </label>
                    <select
                      value={newAdminData.role}
                      onChange={(e) => setNewAdminData({ ...newAdminData, role: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#1a6dff] focus:ring-3 focus:ring-blue-100 text-xs sm:text-sm font-semibold text-slate-900 outline-none bg-white"
                    >
                      <option value="admin">Standard Administrator</option>
                      <option value="superadmin">Super Administrator</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={createLoading}
                    className="px-5 py-2.5 rounded-xl bg-[#1a6dff] hover:bg-[#1255cc] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    {createLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={14} />
                        <span>Saving to DB...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        <span>Generate &amp; Save Admin</span>
                      </>
                    )}
                  </button>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
