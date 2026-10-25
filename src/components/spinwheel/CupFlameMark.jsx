import React from 'react';
import { BRAND_COLORS } from '@/lib/brandAssets';

const { gold, goldLight, goldDeep } = BRAND_COLORS;

/**
 * The Torch Republic mark — a coffee cup with three jagged flame tongues
 * rising from it, in warm gold with bronze shading.
 * Renders as a standalone SVG, or nests inside another SVG when x/y are given.
 */
export default function CupFlameMark({ size = 48, x, y }) {
  return (
    <svg x={x} y={y} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {/* Flame — three jagged, upward-pointing tongues */}
      <path d="M22 31 L17 13 L23 18 L32 2 L41 18 L47 13 L42 31 Z" fill={gold} />

      {/* Cup bowl */}
      <path d="M14 32 L50 32 L46 50 Q45 54 32 54 Q19 54 18 50 Z" fill={gold} />

      {/* Interior shading */}
      <path
        d="M20 38 Q32 44 44 38 L46 50 Q45 54 32 54 Q19 54 18 50 Z"
        fill={goldDeep}
        opacity="0.6"
      />

      {/* Handle */}
      <path
        d="M50 36 q 9 1 8 8 q -1 7 -9 8"
        fill="none"
        stroke={gold}
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Rim */}
      <rect x="13" y="30" width="38" height="3" rx="1.5" fill={goldLight} />

      {/* Base, with a darker bottom edge */}
      <path d="M23 54 L41 54 L43 59 L21 59 Z" fill={gold} />
      <rect x="21" y="57.4" width="22" height="1.8" fill={goldDeep} />
    </svg>
  );
}