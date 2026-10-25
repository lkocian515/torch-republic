import React from 'react';
import { BRAND_COLORS } from '@/lib/brandAssets';

const { goldLight, goldAntique, green, navyDeep } = BRAND_COLORS;

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
 * moon, a pine treeline, and a delicate botanical accent in each lower corner.
 *
 * Decorative only — it sits behind the content and never intercepts clicks.
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

      {/* Crescent moon — bright gold edge over a faint earthshine orb. It sits
          in the open sky at the top left, clear of the close button and logo. */}
      <svg
        viewBox="0 0 64 64"
        className="w-9 h-9 sm:w-14 sm:h-14"
        style={{
          position: 'absolute',
          top: 10,
          left: 12,
          filter: 'drop-shadow(0 0 18px rgba(251,192,93,0.45))',
        }}
      >
        <defs>
          <clipPath id="moonCrescent">
            <path d="M32 6 A26 26 0 0 1 32 58 A28.4 28.4 0 0 1 32 6 Z" />
          </clipPath>
          <radialGradient id="moonEarthshine" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1B3A5A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1B3A5A" stopOpacity="0.22" />
          </radialGradient>
          <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8D99E" />
            <stop offset="100%" stopColor="#FBC05D" />
          </linearGradient>
        </defs>

        {/* Earthshine — the faint, dark remainder of the orb */}
        <circle cx="32" cy="32" r="26" fill="url(#moonEarthshine)" />

        {/* The lit crescent */}
        <path d="M32 6 A26 26 0 0 1 32 58 A28.4 28.4 0 0 1 32 6 Z" fill="url(#moonGlow)" />

        {/* Mottled surface texture, clipped to the crescent */}
        <g clipPath="url(#moonCrescent)" opacity="0.35">
          <ellipse cx="52" cy="22" rx="6" ry="4.5" fill="#D89A4A" />
          <ellipse cx="50" cy="42" rx="5" ry="6" fill="#D89A4A" />
          <ellipse cx="56" cy="33" rx="4" ry="3" fill="#E8B76E" />
        </g>
      </svg>

      <svg
        viewBox="0 0 400 70"
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 70, opacity: 0.75 }}
      >
        <polygon points={PINES} fill={navyDeep} />
      </svg>

      {/* Delicate botanical accents in the lower corners — kept faint so they
          never compete with the headline or the form. */}
      <svg
        viewBox="0 0 60 60"
        className="w-11 h-11 sm:w-14 sm:h-14"
        style={{ position: 'absolute', bottom: 4, left: 8, opacity: 0.34 }}
      >
        <path d="M18 44 C18 36 22 30 30 30 C38 30 42 36 42 44 Z" fill={green} />
        <rect x="27" y="43" width="6" height="13" rx="3" fill={goldAntique} />
        <circle cx="24" cy="37" r="1.4" fill={goldLight} />
        <circle cx="34" cy="35" r="1.1" fill={goldLight} />
        <path d="M46 47 C48 41 52 37 57 36 C55 42 51 46 46 47 Z" fill={green} opacity="0.8" />
      </svg>

      <svg
        viewBox="0 0 60 60"
        className="w-10 h-10 sm:w-12 sm:h-12"
        style={{ position: 'absolute', bottom: 4, right: 8, opacity: 0.3 }}
      >
        <path d="M12 52 C22 44 34 36 48 30" fill="none" stroke={goldAntique} strokeWidth="0.9" />
        <circle cx="48" cy="30" r="3" fill={goldAntique} />
        <circle cx="38" cy="35" r="2.2" fill={green} />
        <circle cx="27" cy="42" r="1.9" fill={green} />
        <circle cx="17" cy="48" r="1.6" fill={green} />
      </svg>

      {/* A single quiet sprig in the upper right, inside the frame */}
      <svg
        viewBox="0 0 40 40"
        className="w-8 h-8 sm:w-10 sm:h-10"
        style={{ position: 'absolute', top: 14, right: 62, opacity: 0.26 }}
      >
        <path d="M6 34 C14 28 22 20 32 10" fill="none" stroke={goldAntique} strokeWidth="0.9" />
        <path d="M20 22 C24 22 27 19 28 15 C23 15 20 18 20 22 Z" fill={green} />
        <path d="M13 29 C17 29 20 26 21 22 C16 22 13 25 13 29 Z" fill={green} opacity="0.85" />
        <circle cx="32" cy="10" r="2.4" fill={goldAntique} />
      </svg>
    </div>
  );
}