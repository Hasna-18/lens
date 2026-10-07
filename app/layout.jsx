'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import '../src/style.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastProvider } from '../components/Toast';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" data-theme={isAdminRoute ? "light" : "dark"} className={isAdminRoute ? "light" : "dark"} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LEnSE • Centre for Learning Engineering & Sustainability Education | University of Kerala</title>
        <meta 
          name="description" 
          content="LEnSE (Centre for Learning Engineering and Sustainability Education) - University of Kerala. Promoting innovative, inclusive, and sustainable approaches to STEM education." 
        />
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                var theme = localStorage.getItem('clese-theme');
                var isDark = theme ? theme === 'dark' : true;
                if (isDark) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch (e) {}
            })()`,
          }}
        />
      </head>
      <body suppressHydrationWarning className={isAdminRoute ? "bg-[#f1f5f9] text-slate-900 min-h-screen antialiased selection:bg-blue-500/20 selection:text-blue-900 transition-colors duration-300" : "bg-[#f8fafc] dark:bg-[#030712] text-slate-900 dark:text-slate-100 min-h-screen antialiased selection:bg-[#38bdf8]/30 selection:text-white transition-colors duration-300"}>
        <ToastProvider>
          <div id="app" className={isAdminRoute ? "relative min-h-screen flex flex-col justify-between bg-[#f1f5f9] text-slate-900" : "relative min-h-screen flex flex-col justify-between bg-[#f8fafc] dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors duration-300"}>
            {/* Top Navigation - Suppressed on admin routes */}
            {!isAdminRoute && <Navbar />}

            {/* Page Content */}
            <main className="main-content-wrapper flex-grow">
              {children}
            </main>

            {/* Global Footer - Suppressed on admin routes */}
            {!isAdminRoute && <Footer />}
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
