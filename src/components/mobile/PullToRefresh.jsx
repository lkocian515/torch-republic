import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PullToRefresh({ children, onRefresh }) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startYRef = useRef(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      startYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && startYRef.current) {
      const currentY = e.touches[0].clientY;
      const distance = Math.max(0, currentY - startYRef.current);
      setPullDistance(Math.min(distance, 80));
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance > 60 && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
      setPullDistance(0);
    } else {
      setPullDistance(0);
    }
    startYRef.current = 0;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pullDistance, isRefreshing]);

  return (
    <div ref={containerRef} className="relative">
      {pullDistance > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 right-0 bg-background z-30 flex items-center justify-center h-16"
          style={{ paddingTop: 'env(safe-area-inset-top)' }}
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : (pullDistance / 80) * 180 }}
            transition={{ duration: 0.1 }}
          >
            <RefreshCw className="w-5 h-5 text-primary" />
          </motion.div>
          {!isRefreshing && (
            <span className="ml-2 text-xs font-mono tracking-widest text-muted-foreground">
              {pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          )}
        </motion.div>
      )}
      {children}
    </div>
  );
}