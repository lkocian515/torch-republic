import React from 'react';
import { BRAND_COLORS } from '@/lib/brandAssets';

const { goldAntique, goldLight, navyDeep } = BRAND_COLORS;

/**
 * Illustrated night-forest artwork for the spin wheel popup.
 *
 * The moon, stars, gold botanical flourishes, mushrooms, ferns and pine
 * silhouettes are painted artwork (/brand/popup-night-*.jpg). Two crops are
 * used: a wide plate that fills the wheel side of the landscape panel, and a
 * portrait plate for the stacked mobile layout. Both fade into the panel's own
 * navy ground so the scene reads as one continuous illustration rather than
 * two panels, and so the form column stays calm enough to read.
 *
 * Decorative only: nothing here intercepts a click.
 */

// A wide treeline drawn once, stretched across the whole panel width so the
// woodland edge runs unbroken under both the wheel and the form.
const TREELINE =
  '0,90 0,64 42,64 72,26 102,64 152,64 192,12 232,64 302,64 342,34 382,64 442,64 472,8 502,64 572,64 612,30 652,64 722,64 762,14 802,64 872,64 912,32 952,64 1022,64 1062,10 1102,64 1162,64 1200,64 1200,90';

// Gold starbursts, kept to the calmer right-hand sky.
const BURSTS = [
  { top: '17%', left: '74%', size: 17 },
  { top: '31%', left: '89%', size: 11 },
  { top: '58%', left: '79%', size: 9 },
];

const FADE_RIGHT = 'linear-gradient(to right, #000 0%, #000 66%, rgba(0,0,0,0.55) 84%, transparent 100%)';
const FADE_DOWN = 'linear-gradient(to bottom, #000 0%, #000 58%, rgba(0,0,0,0.5) 82%, transparent 100%)';

export default function NightSkyBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Atmospheric teal lift behind the moon */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 60% at 34% 22%, rgba(35,96,132,0.42) 0%, rgba(9,26,42,0) 68%)',
        }}
      />

      {/* Landscape: the painted plate fills the wheel side and dissolves into
          the navy ground behind the form */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '64%',
          backgroundImage: 'url(/brand/popup-night-desktop.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitMaskImage: FADE_RIGHT,
          maskImage: FADE_RIGHT,
        }}
      />

      {/* Portrait: same scene behind the wheel on the stacked layout */}
      <div
        className="md:hidden"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '54%',
          backgroundImage: 'url(/brand/popup-night-mobile.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          WebkitMaskImage: FADE_DOWN,
          maskImage: FADE_DOWN,
        }}
      />

      {BURSTS.map((b, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          style={{ position: 'absolute', top: b.top, left: b.left, width: b.size, height: b.size, opacity: 0.55 }}
        >
          <path d="M12 0 L13.4 10.6 L24 12 L13.4 13.4 L12 24 L10.6 13.4 L0 12 L10.6 10.6 Z" fill={goldLight} />
        </svg>
      ))}

      {/* Unbroken woodland silhouette along the lower edge */}
      <svg
        viewBox="0 0 1200 90"
        preserveAspectRatio="none"
        className="h-14 md:h-[72px]"
        style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', opacity: 0.92 }}
      >
        <polygon points={TREELINE} fill={navyDeep} />
      </svg>

      {/* Hairline of gold along the very bottom edge, tying the frame to the scene */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          bottom: 0,
          height: 1,
          background: `linear-gradient(to right, transparent, ${goldAntique}, transparent)`,
          opacity: 0.5,
        }}
      />
    </div>
  );
}