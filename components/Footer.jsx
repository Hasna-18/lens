'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#f4f7f1] dark:bg-[#020b06] border-t border-[#d8e5d9] dark:border-[#122419] text-[#556758] dark:text-slate-400 font-['Plus_Jakarta_Sans',sans-serif] relative z-20 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#d8e5d9] dark:border-white/5">
          
          {/* Column 1: Brand & Socials (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="CLESE Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(162,212,94,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { name: 'Facebook', href: '#', icon: 'f' },
                { name: 'LinkedIn', href: '#', icon: 'in' },
                { name: 'YouTube', href: '#', icon: '▶' },
                { name: 'Instagram', href: '#', icon: '📷' }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.name}
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#0b1c14] border border-[#d5e2d6] dark:border-[#1e3d2b] flex items-center justify-center text-xs font-semibold text-[#14261a] dark:text-slate-300 hover:text-white hover:bg-[#1b3726] dark:hover:border-[#a2d45e] dark:hover:bg-[#122b1e] transition-all duration-300 shadow-xs"
                >
                  <span>{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Outfit'] font-bold text-xs text-[#122016] dark:text-white uppercase tracking-[0.15em]">Explore</h4>
            <ul className="space-y-2.5 text-xs list-none p-0">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Programs', href: '/programs' },
                { name: 'Research', href: '/projects' },
                { name: 'Events', href: '/events' },
                { name: 'News', href: '/news' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-[#556758] dark:text-slate-400 hover:text-[#1b3726] dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Outfit'] font-bold text-xs text-[#122016] dark:text-white uppercase tracking-[0.15em]">Resources</h4>
            <ul className="space-y-2.5 text-xs list-none p-0">
              {['Gallery', 'Publications', 'Downloads', 'FAQ'].map((link, idx) => (
                <li key={idx}>
                  <Link href={`/${link.toLowerCase()}`} className="text-[#556758] dark:text-slate-400 hover:text-[#1b3726] dark:hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Outfit'] font-bold text-xs text-[#122016] dark:text-white uppercase tracking-[0.15em]">Connect</h4>
            <ul className="space-y-3 text-xs list-none p-0 text-[#556758] dark:text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0 mt-0.5" />
                <span className="leading-snug">University of Kerala, Kariavattom Campus, Thiruvananthapuram - 695581, Kerala, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                <a href="mailto:lenseedu24@gmail.com" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">lenseedu24@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#2d5a3c] dark:text-[#a2d45e] shrink-0" />
                <a href="tel:+911234567890" className="hover:text-[#1b3726] dark:hover:text-white transition-colors">+91 1234 567 890</a>
              </li>
            </ul>
          </div>

          {/* Column 5: Stay Connected (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <div className="p-6 rounded-3xl border border-[#d5e2d6] dark:border-[#1b3d2b] bg-white dark:bg-gradient-to-br dark:from-[#0c1e15] dark:to-[#06110b] shadow-sm dark:shadow-xl">
              <h4 className="font-['Outfit'] font-semibold text-sm text-[#122016] dark:text-white mb-1.5">Stay Connected</h4>
              <p className="text-[11px] text-[#556758] dark:text-slate-400 leading-relaxed mb-4">
                Subscribe to our newsletter for updates and insights.
              </p>
              
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-[#f4f7f2] dark:bg-[#05110a] border border-[#d5e2d6] dark:border-[#1f422e] rounded-full px-4 py-2.5 pr-12 text-xs text-[#14261a] dark:text-white placeholder-[#879b8c] dark:placeholder-slate-500 focus:outline-none focus:border-[#2d5a3c] dark:focus:border-[#a2d45e] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 w-8 h-8 rounded-full bg-[#1b3726] dark:bg-[#a2d45e] text-white dark:text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-md cursor-pointer"
                >
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b7e70] dark:text-slate-500">
          <p>© 2024 LEnSE • Centre for Learning Engineering and Sustainability Education, University of Kerala. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[#556758] dark:text-slate-400">
            <Link href="/privacy" className="hover:text-[#122016] dark:hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-[#122016] dark:hover:text-white transition-colors">Terms of Use</Link>
            <span>|</span>
            <Link href="/sitemap" className="hover:text-[#122016] dark:hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
