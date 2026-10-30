'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Calendar, FileText, LayoutDashboard, LogOut, BookOpen, Mail, User, Settings,
  SunMoon, ChevronDown, MapPin, Facebook, Linkedin, Youtube,
  Instagram, Network
} from 'lucide-react';

const SERIF = { fontFamily: "'Newsreader', 'Playfair Display', Georgia, serif" };

/* Global look: glass surfaces, fonts, focus ring, page entrance, reduced motion */
const GLOBAL_CSS = `
.lense-admin { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif; }

/* ================= ULTRA GLASSMORPHISM SYSTEM ================= */
.glass {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.30) 42%, rgba(214, 245, 251, 0.45) 100%);
  border: 1px solid rgba(255, 255, 255, 0.88);
  box-shadow: 
    0 20px 48px -10px rgba(0, 154, 177, 0.16),
    0 6px 18px -4px rgba(15, 26, 58, 0.05),
    inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.98),
    inset 0 -1.5px 2px 0 rgba(0, 154, 177, 0.08),
    inset 0 0 25px 0 rgba(255, 255, 255, 0.35);
  -webkit-backdrop-filter: blur(28px) saturate(190%);
  backdrop-filter: blur(28px) saturate(190%);
}

.glass-panel {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.68) 0%, rgba(240, 253, 255, 0.32) 45%, rgba(200, 242, 250, 0.50) 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.92);
  box-shadow: 
    0 28px 70px -15px rgba(0, 154, 177, 0.22),
    0 10px 28px -6px rgba(15, 26, 58, 0.06),
    inset 0 2px 1.5px 0 rgba(255, 255, 255, 1),
    inset 0 -2px 3px 0 rgba(0, 154, 177, 0.12),
    inset 0 0 35px 0 rgba(255, 255, 255, 0.45);
  -webkit-backdrop-filter: blur(32px) saturate(200%);
  backdrop-filter: blur(32px) saturate(200%);
}

.glass-ultra {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0.26) 40%, rgba(210, 245, 252, 0.44) 100%);
  border: 1px solid rgba(255, 255, 255, 0.88);
  box-shadow: 
    0 22px 50px -10px rgba(0, 154, 177, 0.18),
    0 8px 24px -5px rgba(15, 26, 58, 0.05),
    inset 0 1.5px 1.2px 0 rgba(255, 255, 255, 1),
    inset 0 -1.5px 2px 0 rgba(0, 154, 177, 0.10),
    inset 0 0 28px 0 rgba(255, 255, 255, 0.38);
  -webkit-backdrop-filter: blur(28px) saturate(195%);
  backdrop-filter: blur(28px) saturate(195%);
  position: relative;
}

.glass-ultra-hover {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-ultra-hover:hover {
  transform: translateY(-5px) scale(1.008);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.36) 45%, rgba(195, 242, 251, 0.58) 100%);
  -webkit-backdrop-filter: blur(34px) saturate(215%);
  backdrop-filter: blur(34px) saturate(215%);
  border-color: rgba(255, 255, 255, 1);
  box-shadow: 
    0 32px 70px -10px rgba(0, 154, 177, 0.28),
    0 14px 30px -4px rgba(15, 26, 58, 0.08),
    inset 0 2px 1.5px 0 rgba(255, 255, 255, 1),
    inset 0 -2px 3px 0 rgba(0, 154, 177, 0.18),
    inset 0 0 40px 0 rgba(255, 255, 255, 0.55);
}

.glass-lift {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.glass-lift:hover {
  transform: translateY(-5px) scale(1.008);
  border-color: rgba(255, 255, 255, 1);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.76) 0%, rgba(255, 255, 255, 0.36) 45%, rgba(200, 244, 252, 0.58) 100%);
  box-shadow: 
    0 30px 65px -10px rgba(0, 154, 177, 0.28),
    inset 0 2px 1.5px 0 rgba(255, 255, 255, 1),
    inset 0 -2px 3px 0 rgba(0, 154, 177, 0.18),
    inset 0 0 35px 0 rgba(255, 255, 255, 0.5);
}

/* Glass specular top sheen on cards */
.glass-shine {
  position: relative;
  overflow: hidden;
}
.glass-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 48%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.08) 65%, rgba(255, 255, 255, 0) 100%);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  pointer-events: none;
  z-index: 1;
}

/* Glass diagonal sheen line */
.glass-sheen {
  position: relative;
  overflow: hidden;
}
.glass-sheen::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 42%,
    rgba(255, 255, 255, 0.28) 48%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0.28) 52%,
    transparent 58%
  );
  transform: rotate(25deg) translateY(-100%);
  transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  z-index: 2;
  opacity: 0.65;
}
.glass-sheen:hover::after {
  transform: rotate(25deg) translateY(100%);
}

.glass-pill {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.38) 100%);
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 14px rgba(0, 154, 177, 0.10), inset 0 1px 0 #fff;
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

.btn-teal {
  background: linear-gradient(180deg, #14b4cb 0%, #009ab1 55%, #00869c 100%);
  box-shadow: 0 10px 24px rgba(0,154,177,.32), inset 0 1px 0 rgba(255,255,255,.35);
}
.btn-teal:hover { filter: brightness(1.05); }

.lense-admin :focus-visible { outline: 2px solid #009ab1; outline-offset: 2px; border-radius: 12px; }

@keyframes lense-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.admin-page-transition { animation: lense-rise .45s ease both; }
@keyframes lense-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
.lense-float { animation: lense-float 7s ease-in-out infinite; }

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }

@media (prefers-reduced-motion: reduce) {
  .admin-page-transition, .lense-float { animation: none; }
  .glass-lift { transition: none; }
}
`;

function BrandMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 3 C21.5 13 27 18.5 37 20 C27 21.5 21.5 27 20 37 C18.5 27 13 21.5 3 20 C13 18.5 18.5 13 20 3 Z"
        fill="url(#brandGrad)" />
      <defs>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#009ab1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname === '/admin/login';

  const [adminUser, setAdminUser] = useState({ name: 'Primary Administrator', username: 'admin', role: 'superadmin' });
  const [loggingOut, setLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  /* Close menu on outside click / Escape / route change */
  useEffect(() => {
    const onDown = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);
  useEffect(() => setMenuOpen(false), [pathname]);

  /* Cached profile for instant paint */
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lense_admin_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') setAdminUser(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  /* Verify session (single source of truth for auth redirects) */
  useEffect(() => {
    if (isAuthPage) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/check');
        if (!alive) return;
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setAdminUser(data.user);
            try { localStorage.setItem('lense_admin_user', JSON.stringify(data.user)); } catch { }
          }
        } else if (res.status === 401 || res.status === 403) {
          if (process.env.NODE_ENV === 'production') {
            router.replace('/admin/login');
          }
        }
      } catch (err) {
        console.error('Session verify failed:', err);
      }
    })();
    return () => { alive = false; };
  }, [isAuthPage, router, pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await fetch('/api/admin/logout', { method: 'POST' }); }
    catch (err) { console.error('Logout error:', err); }
    finally {
      try { localStorage.removeItem('lense_admin_user'); } catch { }
      setLoggingOut(false);
      router.push('/admin/login');
    }
  };

  if (isAuthPage) {
    return (
      <div className="lense-admin min-h-screen bg-[#f2fafc] text-slate-900 selection:bg-[#009ab1]/20">
        <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
        {children}
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, active: pathname === '/admin' },
    { label: 'Events & Conferences', href: '/admin/events', icon: Calendar, active: pathname.startsWith('/admin/events') },
    { label: 'Academic Resources', href: '/admin/resources', icon: BookOpen, active: pathname.startsWith('/admin/resources') },
    { label: 'Key Initiatives', href: '/admin/initiatives', icon: Network, active: pathname.startsWith('/admin/initiatives') },
    { label: 'News & Media', href: '/admin/news', icon: FileText, active: pathname.startsWith('/admin/news') },
    { label: 'Enquiries', href: '/admin/enquiries', icon: Mail, active: pathname.startsWith('/admin/enquiries') }
  ];

  const displayName = adminUser.name || 'Primary Administrator';
  const roleName = (adminUser.role || 'superadmin').toUpperCase();
  const initial = displayName.charAt(0).toUpperCase();

  const menuItems = [
    { label: 'Profile', icon: User, href: '/admin/profile' },
    { label: 'Account Settings', icon: Settings, href: '/admin/settings' },
    { label: 'Appearance', icon: SunMoon, href: '/admin/appearance' }
  ];

  return (
    <div className="lense-admin relative min-h-screen flex flex-col text-slate-900 selection:bg-[#009ab1]/25 selection:text-[#007486]
      bg-gradient-to-b from-[#e3f5f9] via-[#eef9fc] to-[#dcf0f6]">
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      {/* Ambient background: soft blobs + sweeping wave */}
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[620px] h-[620px] rounded-full bg-[#009ab1]/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[520px] h-[420px] rounded-full bg-cyan-200/30 blur-3xl" />
        <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-40" fill="none">
          <defs>
            <linearGradient id="bgWave" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#009ab1" stopOpacity=".03" />
              <stop offset=".5" stopColor="#009ab1" stopOpacity=".14" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity=".05" />
            </linearGradient>
          </defs>
          <path d="M-100 520 C300 300 600 720 1000 470 C1300 280 1500 560 1750 400 L1750 900 L-100 900Z" fill="url(#bgWave)" />
        </svg>
      </div>

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/80 shadow-[0_6px_30px_rgba(0,154,177,0.08)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          <Link href="/admin" className="flex items-center gap-3 shrink-0 group" aria-label="LEnSE admin home">
            <span className="transition-transform duration-300 group-hover:rotate-90"><BrandMark /></span>
            <span style={SERIF} className="text-[28px] font-medium text-[#0f1a3a] tracking-tight leading-none">LEnSE</span>
            <span className="hidden sm:flex flex-col border-l border-slate-200 pl-3 ml-1 leading-tight">
              <span className="text-[11px] font-bold tracking-wider text-[#009ab1]">COMMAND</span>
              <span className="text-[10px] text-slate-500 font-medium">Administrative Workspace</span>
            </span>
          </Link>

          {/* User menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full bg-white/85 hover:bg-white border border-white shadow-[0_4px_16px_rgba(0,154,177,0.12)] transition cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14b4cb] to-[#009ab1] text-white flex items-center justify-center text-xs font-bold shadow-inner">
                {initial}
              </span>
              <span className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-[#0f1a3a] truncate max-w-[150px]">{displayName}</span>
                <span className="text-[9.5px] font-semibold tracking-wider text-slate-400">{roleName}</span>
              </span>
              <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <div role="menu" className="absolute right-0 mt-3 w-60 rounded-2xl bg-white/95 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(0,154,177,0.22)] p-2 animate-[lense-rise_.18s_ease_both]">
                {menuItems.map(({ label, icon: Icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    role="menuitem"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-slate-700 hover:bg-sky-50 hover:text-[#009ab1] transition-colors"
                  >
                    <Icon size={16} className="text-[#009ab1]" />
                    {label}
                  </Link>
                ))}
                <div className="h-px bg-slate-100 my-1.5 mx-2" />
                <button
                  role="menuitem"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left disabled:opacity-60 cursor-pointer"
                >
                  <LogOut size={16} />
                  {loggingOut ? 'Signing out…' : 'Logout'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pill navigation */}
        <nav aria-label="Admin sections" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 border-t border-white/70">
          {navItems.map(({ label, href, icon: Icon, active }) => (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${active
                  ? 'bg-[#009ab1]/15 text-[#007f93] border border-[#009ab1]/30 shadow-[inset_0_1px_0_rgba(255,255,255,.7)]'
                  : 'text-slate-600 hover:text-[#009ab1] hover:bg-white/80 border border-transparent'
                }`}
            >
              <Icon size={15} className={active ? 'text-[#009ab1]' : 'text-slate-400'} />
              {label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 w-full relative z-10 admin-page-transition">{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8 mt-10">
        <div className="max-w-[1360px] mx-auto glass rounded-[2rem] px-6 sm:px-10 py-9">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <BrandMark size={30} />
                <span style={SERIF} className="text-[26px] font-medium text-[#0f1a3a] leading-none">LEnSE</span>
                <span className="text-[10px] font-medium text-slate-500 pl-1">Administrative Workspace</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                Centre for Learning Engineering and Sustainability Education, University of Kerala.
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Linkedin, label: 'LinkedIn' },
                  { icon: Youtube, label: 'YouTube' },
                  { icon: Instagram, label: 'Instagram' }
                ].map(({ icon: Icon, label }) => (
                  <a key={label} href="#" aria-label={label} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#009ab1] hover:text-white text-[#0f1a3a] border border-slate-100 flex items-center justify-center transition-all shadow-[0_4px_12px_rgba(0,154,177,0.12)] hover:-translate-y-0.5">
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            <FooterCol className="lg:col-span-2" title="Quick Links" links={[
              ['About Us', '/about'], ['Initiatives', '/initiatives'],
              ['Events & Programmes', '/events'], ['News & Media', '/news']
            ]} />
            <FooterCol className="lg:col-span-2" title="Resources" links={[
              ['Publications', '/resources'], ['Resources Hub', '/resources'],
              ['Academic Team', '/about'], ['Help & Support', '/contact']
            ]} />

            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-[13px] font-bold text-[#0f1a3a]">Contact</h4>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-[#009ab1] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">University of Kerala, Kariavattom Campus,<br />Thiruvananthapuram – 695581, Kerala, India</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#009ab1] shrink-0" />
                  <a href="mailto:lenseadmin24@gmail.com" className="hover:text-[#009ab1] transition-colors">lenseadmin24@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <p>© 2024 LEnSE – Centre for Learning Engineering and Sustainability Education, University of Kerala. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-[#009ab1] transition-colors">Privacy Policy</Link>
              <span aria-hidden="true" className="text-slate-300">|</span>
              <Link href="/terms" className="hover:text-[#009ab1] transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-[13px] font-bold text-[#0f1a3a]">{title}</h4>
      <ul className="space-y-2.5 text-xs text-slate-600">
        {links.map(([label, href]) => (
          <li key={label}><Link href={href} className="hover:text-[#009ab1] transition-colors">{label}</Link></li>
        ))}
      </ul>
    </div>
  );
}