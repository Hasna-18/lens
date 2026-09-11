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
      </head>
      <body suppressHydrationWarning className={isAdminRoute ? "bg-[#edf4e8] text-slate-900 min-h-screen antialiased selection:bg-[#2d5a3c]/20 selection:text-[#1b3726] transition-colors duration-300" : "bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 min-h-screen antialiased selection:bg-[#a2d45e]/30 selection:text-white transition-colors duration-300"}>
        <ToastProvider>
          <div id="app" className={isAdminRoute ? "relative min-h-screen flex flex-col justify-between bg-[#edf4e8] text-slate-900" : "relative min-h-screen flex flex-col justify-between bg-[#fcfdfa] dark:bg-[#031008] text-[#19241c] dark:text-slate-100 transition-colors duration-300"}>
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
