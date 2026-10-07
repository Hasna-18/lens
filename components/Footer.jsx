'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Mail, Phone, Facebook, Linkedin, Youtube, Instagram, Twitter } from 'lucide-react';

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
    <footer className="w-full bg-slate-50 dark:bg-[#030712] border-t border-slate-200/80 dark:border-blue-950/60 text-slate-600 dark:text-slate-400 font-['Plus_Jakarta_Sans',sans-serif] relative z-20 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-slate-200 dark:border-white/5">
          
          {/* Column 1: Brand & Socials (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="CLESE Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.3)] transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { name: 'Facebook', href: '#', icon: Facebook },
                { name: 'LinkedIn', href: '#', icon: Linkedin },
                { name: 'YouTube', href: '#', icon: Youtube },
                { name: 'Instagram', href: '#', icon: Instagram }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#080f1e] border border-blue-100 dark:border-blue-900/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-white hover:bg-blue-600 dark:hover:border-sky-400 dark:hover:bg-sky-600 transition-all duration-300 shadow-xs"
                >
                  <item.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Outfit'] font-bold text-xs text-slate-900 dark:text-white uppercase tracking-[0.15em]">Explore</h4>
            <ul className="space-y-2.5 text-xs list-none p-0">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Initiatives', href: '/initiatives' },
                { name: 'Events & Programmes', href: '/events' },
                { name: 'News & Media', href: '/news' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-300 hover:translate-x-1 inline-block transition-all duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Outfit'] font-bold text-xs text-slate-900 dark:text-white uppercase tracking-[0.15em]">Resources</h4>
            <ul className="space-y-2.5 text-xs list-none p-0">
              {[
                { name: 'Publications', href: '/publications' },
                { name: 'Resources Hub', href: '/resources' },
                { name: 'Academic Team', href: '/team' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-sky-300 hover:translate-x-1 inline-block transition-all duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-['Outfit'] font-bold text-xs text-slate-900 dark:text-white uppercase tracking-[0.15em]">Connect</h4>
            <ul className="space-y-3 text-xs list-none p-0 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-blue-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-snug">University of Kerala, Kariavattom Campus, Thiruvananthapuram - 695581, Kerala, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-blue-600 dark:text-sky-400 shrink-0" />
                <a href="mailto:lenseedu24@gmail.com" className="hover:text-blue-600 dark:hover:text-sky-300 transition-colors">lenseedu24@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
          <p>© 2024 LEnSE • Centre for Learning Engineering and Sustainability Education, University of Kerala. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
