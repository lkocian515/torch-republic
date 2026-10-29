import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * TechLayer — the site-wide interaction layer.
 *
 * Mounted once in App.jsx, it gives EVERY page the same high-tech feel without
 * touching individual pages:
 *   1. a scroll progress bar
 *   2. scroll reveal + staggered grid children, for below-the-fold sections
 *   3. a pointer-follow highlight on cards
 *
 * Safety rules (this site has been burned by reveal animations before):
 *   - Nothing above the fold is ever hidden, so the hero copy and LCP image
 *     paint immediately.
 *   - The hidden state is applied by JS only, never by CSS, so if scripting
 *     fails nothing is hidden at all.
 *   - A failsafe timer reveals everything even if IntersectionObserver never
 *     fires, so content can never get stuck invisible.
 *   - prefers-reduced-motion turns all of it off.
 */

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const CARD_SELECTOR = '.card-torch, article, .tech-card';

export default function TechLayer() {
  const { pathname } = useLocation();
  const barRef = useRef(null);

  // ── 1. Scroll progress bar ──
  useEffect(() => {
    if (reduced()) return;
    let raf = null;
    const paint = () => {
      raf = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${pct})`;
    };
    const schedule = () => { if (raf === null) raf = requestAnimationFrame(paint); };
    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname]);

  // ── 2. Scroll reveal + stagger ──
  useEffect(() => {
    if (reduced() || typeof IntersectionObserver === 'undefined') return;

    const fold = window.innerHeight * 0.85;
    const targets = Array.from(document.querySelectorAll('section, article'))
      .filter((el) => !el.closest('header') && !el.closest('footer') && !el.closest('nav'))
      .filter((el) => el.getBoundingClientRect().top > fold);

    if (targets.length === 0) return;

    targets.forEach((el) => el.classList.add('tech-hidden'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('tech-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
    );
    targets.forEach((el) => io.observe(el));

    // Failsafe — content must never stay hidden.
    const failsafe = setTimeout(() => {
      targets.forEach((el) => el.classList.add('tech-in'));
    }, 3000);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
      targets.forEach((el) => el.classList.remove('tech-hidden', 'tech-in'));
    };
  }, [pathname]);

  // ── 3. Pointer-follow highlight on cards ──
  useEffect(() => {
    if (reduced()) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let active = null;
    let raf = null;
    let px = 0;
    let py = 0;

    const onMove = (e) => {
      const card = e.target && e.target.closest ? e.target.closest(CARD_SELECTOR) : null;
      if (card !== active) {
        if (active) active.classList.remove('tech-cursor');
        active = card;
        if (active) active.classList.add('tech-cursor');
      }
      if (!active) return;
      px = e.clientX;
      py = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (!active) return;
        const rect = active.getBoundingClientRect();
        active.style.setProperty('--tech-x', `${px - rect.left}px`);
        active.style.setProperty('--tech-y', `${py - rect.top}px`);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
      if (active) active.classList.remove('tech-cursor');
    };
  }, [pathname]);

  // ── 4. Parallax on marked lifestyle imagery ──
  // Only elements that opt in with `data-parallax` (value = travel in px) move,
  // and only on a fine pointer with motion allowed. The travel is a fraction of
  // the scroll delta, so a full-page scroll never drags an image more than its
  // own strength — the crop stays inside the scale that [data-parallax] sets.
  useEffect(() => {
    if (reduced()) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const items = Array.from(document.querySelectorAll('[data-parallax]'));
    if (items.length === 0) return;

    const live = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) live.add(entry.target);
          else live.delete(entry.target);
        });
      },
      { rootMargin: '15% 0px 15% 0px' }
    );
    items.forEach((el) => io.observe(el));

    let raf = null;
    const paint = () => {
      raf = null;
      const vh = window.innerHeight;
      live.forEach((el) => {
        const strength = Number(el.dataset.parallax) || 30;
        const rect = el.getBoundingClientRect();
        // -1 when the element's middle is at the top of the viewport, +1 at the bottom.
        const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
        const offset = Math.max(-1, Math.min(1, progress)) * strength;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.06)`;
      });
    };
    const schedule = () => { if (raf === null) raf = requestAnimationFrame(paint); };

    paint();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      items.forEach((el) => { el.style.transform = ''; });
    };
  }, [pathname]);

  return (
    <div ref={barRef} aria-hidden="true" className="tech-progress" />
  );
}