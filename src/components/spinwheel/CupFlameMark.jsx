import React from 'react';
import { BRAND_COLORS } from '@/lib/brandAssets';

const { gold, goldLight } = BRAND_COLORS;

/**
 * The Torch Republic mark — a coffee cup with a flame rising from it, in gold.
 * Renders as a standalone SVG, or nests inside another SVG when x/y are given.
 */
export default function CupFlameMark({ size = 48, x, y }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 72 72" aria-hidden="true">
      {/* Flame — brighter gold, behind */}
      <path
        d="M30 6 C 20 18, 14 25, 14 34 C 14 42, 20 47, 28 47 C 35 47, 39 42, 39 35 C 39 25, 35 15, 30 6 Z"
        fill={goldLight}
      />
      {/* Flame — deeper gold, in front */}
      <path
        d="M45 19 C 38 26, 34 31, 34 36 C 34 41, 38 45, 43 45 C 48 45, 51 41, 51 36 C 51 30, 48 24, 45 19 Z"
        fill={gold}
      />
      {/* Cup */}
      <path d="M16 45 L52 45 L48 63 Q 47 68 34 68 Q 21 68 20 63 Z" fill={gold} />
      <path
        d="M52 50 q 9 1 8 7 q -1 6 -8 7"
        fill="none"
        stroke={gold}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <rect x="14" y="43" width="40" height="3.4" rx="1.7" fill={goldLight} />
    </svg>
  );
}