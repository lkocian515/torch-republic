import { useRef, useLayoutEffect, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useIsoLayout = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

/**
 * GSAP context hook with auto-cleanup and reduced-motion guard.
 * Selector text inside setup() is scoped to the returned ref's element.
 * Pass the returned ref to your root element via ref={scope}.
 */
export function useDriftMotion(setup, deps = []) {
  const scope = useRef(null);
  useIsoLayout(() => {
    if (prefersReducedMotion() || !scope.current) return;
    const el = scope.current;
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger, el), scope);
    // Recalculate ScrollTrigger positions after images/layout settle —
    // prevents elements stuck at opacity:0 when triggers were calculated
    // before lazy images shifted the page height (common on mobile).
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => { clearTimeout(refreshTimer); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}