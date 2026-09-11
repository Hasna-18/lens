'use client';

// In-memory persistent cache across client-side SPA navigations
const memoryCache = new Map();
const activeFlights = new Map();

/**
 * Get cached data synchronously from memory or storage
 */
export function getFromCache(key) {
  if (memoryCache.has(key)) {
    return memoryCache.get(key);
  }
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(key) || sessionStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          memoryCache.set(key, parsed);
          return parsed;
        }
      }
    } catch (e) {
      // Ignore storage read errors
    }
  }
  return null;
}

/**
 * Save data to memory and storage
 */
export function setInCache(key, data) {
  memoryCache.set(key, data);
  if (typeof window !== 'undefined') {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      sessionStorage.setItem(key, serialized);
    } catch (e) {
      // Ignore storage quota errors
    }
  }
}

/**
 * Fetch with request deduplication & automatic caching
 */
export async function fetchWithCache(url, cacheKey, formatter) {
  // Check if a request for this url is already in-flight
  if (activeFlights.has(url)) {
    return activeFlights.get(url);
  }

  const promise = (async () => {
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const rawData = await res.json();
      const finalData = typeof formatter === 'function' ? formatter(rawData) : rawData;
      if (cacheKey && finalData) {
        setInCache(cacheKey, finalData);
      }
      return finalData;
    } finally {
      activeFlights.delete(url);
    }
  })();

  activeFlights.set(url, promise);
  return promise;
}

/**
 * Prefetch an API endpoint into cache in idle background time
 */
export function prefetchEndpoint(url, cacheKey, formatter) {
  if (typeof window === 'undefined') return;
  
  // If already in memory, no need to aggressively prefetch
  if (memoryCache.has(cacheKey)) return;

  const run = () => {
    fetchWithCache(url, cacheKey, formatter).catch(() => {});
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 150);
  }
}
