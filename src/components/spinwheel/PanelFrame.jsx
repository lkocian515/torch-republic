import React from 'react';
import { BRAND_COLORS } from '@/lib/brandAssets';

const { goldAntique, green } = BRAND_COLORS;

// One ornate corner, drawn in the top-left orientation and rotated per corner.
const CORNERS = [
  { top: 7, left: 7, rotate: 0 },
  { top: 7, right: 7, rotate: 90 },
  { bottom: 7, right: 7, rotate: 180 },
  { bottom: 7, left: 7, rotate: 270 },
];

/**
 * The panel's fine double gold frame: an inner hairline rule with an ornate
 * flourish at each corner.
 *
 * Decorative only — it never intercepts a click, and the close button sits
 * above it so the top-right flourish never covers the control.
 */
export default function PanelFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      <div
        style={{
          position: 'absolute',
          inset: 6,
          border: `1px solid ${goldAntique}`,
          borderRadius: 14,
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 12,
          border: `1px solid ${goldAntique}`,
          borderRadius: 10,
          opacity: 0.32,
        }}
      />
      {CORNERS.map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width="22"
          height="22"
          style={{
            position: 'absolute',
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            transform: `rotate(${c.rotate}deg)`,
          }}
        >
          <path d="M2 22 C2 10 10 2 22 2" fill="none" stroke={goldAntique} strokeWidth="1" opacity="0.85" />
          <path d="M2 14.5 C2 7.5 7.5 2 14.5 2" fill="none" stroke={goldAntique} strokeWidth="0.55" opacity="0.6" />
          <circle cx="2.8" cy="2.8" r="1.1" fill={goldAntique} />
          <path
            d="M10.5 3.6 C13.4 3.8 15.2 5.6 15.6 8.5 C12.7 8.3 10.9 6.5 10.5 3.6 Z"
            fill={green}
            opacity="0.75"
          />
        </svg>
      ))}
    </div>
  );
}