import React, { useRef, useEffect } from 'react';
import { prefersReducedMotion, isMobile } from './useDriftMotion';

/**
 * Pointer-responsive tilt wrapper (desktop only, 2-3 degrees).
 * Applies a subtle rotateX/rotateY based on pointer position.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 * The parent element should set `perspective: '1000px'` for proper 3D.
 */
export default function TiltContainer({ children, className = '', style = {}, maxTilt = 2.5 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || isMobile()) return;
    const el = ref.current;
    if (!el) return;

    let raf = null;

    const onMove = (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `rotateY(${px * maxTilt * 2}deg) rotateX(${-py * maxTilt * 1.5}deg)`;
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      el.style.transform = '';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={`tr-tilt-inner ${className}`} style={style}>
      {children}
    </div>
  );
}