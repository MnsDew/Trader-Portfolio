import { useEffect, useState } from 'react';

export const PerformanceMonitor = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    loadTime: number;
    domContentLoaded: number;
    firstContentfulPaint: number;
  } | null>(null);

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;

      setPerformanceMetrics({
        loadTime: Math.round(loadTime),
        domContentLoaded: Math.round(domContentLoaded),
        firstContentfulPaint: Math.round(firstContentfulPaint)
      });
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    return () => {
      window.removeEventListener('load', measurePerformance);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development' || !performanceMetrics) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white text-xs p-2 rounded z-50 font-mono">
      <div>Load: {performanceMetrics.loadTime}ms</div>
      <div>DOM: {performanceMetrics.domContentLoaded}ms</div>
      <div>FCP: {performanceMetrics.firstContentfulPaint}ms</div>
    </div>
  );
};