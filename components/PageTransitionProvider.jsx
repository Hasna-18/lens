'use client';
import React, { createContext, useContext, useState, useEffect, useRef, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import LenseLoader from './LenseLoader';

const PageTransitionContext = createContext({
  isNavigating: false,
  startTransition: () => {},
});

export const usePageTransition = () => useContext(PageTransitionContext);

function PageTransitionInternal({ children }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const activeNavigationRef = useRef(false);
  const prevPathnameRef = useRef(pathname);

  // Initial site load smooth 0 -> 100% animation
  useEffect(() => {
    setIsNavigating(true);
    setProgress(0);
    let start = performance.now();
    let frameId;
    const duration = 450;

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      
      // Fast ease-out 0 -> 100%
      let val;
      if (t < 0.6) {
        val = (t / 0.6) * 72;
      } else if (t < 0.9) {
        val = 72 + ((t - 0.6) / 0.3) * 20;
      } else {
        val = 92 + ((t - 0.9) / 0.1) * 8;
      }

      setProgress(Math.min(100, Math.round(val)));

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsNavigating(false);
        }, 140);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // When pathname changes, smoothly jump progress to 100% and fade out
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      
      if (activeNavigationRef.current) {
        setProgress(100);
        const timer = setTimeout(() => {
          setIsNavigating(false);
          activeNavigationRef.current = false;
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  // Global click listener to intercept internal link navigations
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore hash anchors, mailto, tel, blank targets, downloads, javascript
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Only transition if navigating to a different internal path
        if (
          targetUrl.origin === currentUrl.origin &&
          targetUrl.pathname !== currentUrl.pathname
        ) {
          startTransition();
        }
      } catch (err) {
        // Safe ignore
      }
    };

    const handlePopState = () => {
      startTransition();
    };

    window.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const startTransition = () => {
    if (activeNavigationRef.current) return;
    activeNavigationRef.current = true;
    setIsNavigating(true);
    setProgress(0);

    const start = performance.now();
    const duration = 380;

    const animateCrawl = (now) => {
      if (!activeNavigationRef.current) return;
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // Crawl quickly to 88% while route loads
      const current = Math.min(88, Math.round(t * 88));
      setProgress(current);

      if (t < 1 && activeNavigationRef.current) {
        requestAnimationFrame(animateCrawl);
      }
    };

    requestAnimationFrame(animateCrawl);

    // Safety timeout in case route transition is instantaneous or delayed
    setTimeout(() => {
      if (activeNavigationRef.current) {
        setProgress(100);
        setTimeout(() => {
          setIsNavigating(false);
          activeNavigationRef.current = false;
        }, 120);
      }
    }, 2000);
  };

  return (
    <PageTransitionContext.Provider value={{ isNavigating, startTransition }}>
      {/* Full-screen LEnSE Loader overlay */}
      {isNavigating && (
        <LenseLoader
          fullScreen={true}
          progress={progress}
          autoProgress={false}
          message="L O A D I N G . . ."
        />
      )}

      {/* Page Content */}
      <div className={`transition-opacity duration-200 ${isNavigating ? 'opacity-90' : 'opacity-100'}`}>
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}

export default function PageTransitionProvider({ children }) {
  return (
    <Suspense fallback={null}>
      <PageTransitionInternal>
        {children}
      </PageTransitionInternal>
    </Suspense>
  );
}
