import React from 'react';
import { BRAND_COLORS } from '@/lib/brandAssets';

const { gold, goldLight, navyDeep } = BRAND_COLORS;

/** Deterministic star field — built once, so it never re-shuffles on render. */
const STARS = (() => {
  let seed = 17;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  return Array.from({ length: 36 }, () => ({
    top: rand() * 78,
    left: rand() * 100,
    size: 1 + rand() * 1.8,
    opacity: 0.2 + rand() * 0.55,
  }));
})();

const BURSTS = [
  { top: '13%', left: '16%', size: 16 },
  { top: '31%', left: '80%', size: 12 },
  { top: '58%', left: '7%', size: 10 },
];

// Pine treeline silhouette along the bottom edge.
const PINES =
  '0,70 0,52 14,52 26,20 38,52 52,52 66,10 80,52 96,52 110,26 124,52 140,52 154,6 168,52 184,52 198,30 212,52 228,52 242,14 256,52 272,52 286,34 300,52 316,52 330,18 344,52 360,52 374,32 388,52 400,52 400,70';

/**
 * Night-sky artwork for the spin wheel popup: stars, star bursts, a glowing
 * moon, and a pine treeline. Decorative only — never intercepts clicks.
 */
export default function NightSkyBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: goldLight,
            opacity: s.opacity,
          }}
        />
      ))}

      {BURSTS.map((b, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          style={{ position: 'absolute', top: b.top, left: b.left, width: b.size, height: b.size, opacity: 0.7 }}
        >
          <path
            d="M12 0 L13.4 10.6 L24 12 L13.4 13.4 L12 24 L10.6 13.4 L0 12 L10.6 10.6 Z"
            fill={goldLight}
          />
        </svg>
      ))}

      <div
        style={{
          position: 'absolute',
          top: '7%',
          right: '7%',
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: `radial-gradient(circle at 38% 35%, ${goldLight} 0%, ${gold} 62%, rgba(217,160,74,0.18) 100%)`,
          boxShadow: '0 0 40px rgba(244,196,120,0.35)',
        }}
      />

      <svg
        viewBox="0 0 400 70"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 70, opacity: 0.92 }}
      >
        <polygon points={PINES} fill={navyDeep} />
      </svg>
    </div>
  );
}