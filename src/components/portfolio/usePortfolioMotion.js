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
 */
export function usePortfolioMotion(setup, deps = []) {
  const scope = useRef(null);
  useIsoLayout(() => {
    if (prefersReducedMotion() || !scope.current) return;
    const el = scope.current;
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger, el), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}