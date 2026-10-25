import React from 'react';
import { BRAND_COLORS } from '@/lib/brandAssets';

const SIZE = 260;
const CX = SIZE / 2;
const R = SIZE / 2 - 10;
const SLICE_DEG = 90;

const { brown, brownDeep, terracotta, tan } = BRAND_COLORS;

/** The Torch Republic coffee-cup-and-flame mark, drawn in the wordmark's colours. */
function CupMark() {
  return (
    <svg x={CX - 24} y={CX - 24} width="48" height="48" viewBox="0 0 72 72">
      {/* Flame — terracotta, larger, behind */}
      <path
        d="M30 6 C 20 18, 14 25, 14 34 C 14 42, 20 47, 28 47 C 35 47, 39 42, 39 35 C 39 25, 35 15, 30 6 Z"
        fill={terracotta}
      />
      {/* Flame — golden tan, smaller, in front */}
      <path
        d="M45 19 C 38 26, 34 31, 34 36 C 34 41, 38 45, 43 45 C 48 45, 51 41, 51 36 C 51 30, 48 24, 45 19 Z"
        fill={tan}
      />
      {/* Cup */}
      <path d="M16 45 L52 45 L48 63 Q 47 68 34 68 Q 21 68 20 63 Z" fill={brown} />
      <path d="M52 50 q 9 1 8 7 q -1 6 -8 7" fill="none" stroke={brown} strokeWidth="3.4" strokeLinecap="round" />
      <rect x="14" y="43" width="40" height="3.4" rx="1.7" fill={brown} />
    </svg>
  );
}

/**
 * Prize wheel in the Torch Republic wordmark's palette: deep coffee-brown
 * slices under terracotta rules, with the coffee cup and flame at the hub.
 *
 * The wheel rotates via the `rotation` prop (degrees). The pointer is fixed at
 * the top (12 o'clock) and does NOT rotate.
 */
export default function SpinWheel({ prizes, rotation }) {
  return (
    <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
      {/* Fixed pointer at top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `18px solid ${terracotta}`,
          zIndex: 10,
          filter: 'drop-shadow(0 2px 6px rgba(42,24,19,0.5))',
        }}
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          transform: `rotate(${rotation}deg)`,
          filter: 'drop-shadow(0 0 18px rgba(194,103,58,0.25))',
        }}
      >
        <defs>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={terracotta} stopOpacity="0.28" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {prizes.map((prize, i) => (
            <linearGradient key={prize.id} id={`slice${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={i % 2 === 0 ? brown : '#33201A'} />
              <stop offset="100%" stopColor={i % 2 === 0 ? '#3A2118' : brownDeep} />
            </linearGradient>
          ))}
        </defs>

        {/* Outer glow + terracotta rules */}
        <circle cx={CX} cy={CX} r={R + 10} fill="url(#wheelGlow)" />
        <circle cx={CX} cy={CX} r={R + 9} fill="none" stroke={brownDeep} strokeWidth="6" />
        <circle cx={CX} cy={CX} r={R + 6} fill="none" stroke={terracotta} strokeWidth="1.5" opacity="0.45" />
        <circle cx={CX} cy={CX} r={R + 3} fill="none" stroke={tan} strokeWidth="2" opacity="0.7" />

        {prizes.map((prize, i) => {
          const startAngle = ((i * SLICE_DEG - 90) * Math.PI) / 180;
          const endAngle = (((i + 1) * SLICE_DEG - 90) * Math.PI) / 180;
          const x1 = CX + R * Math.cos(startAngle);
          const y1 = CX + R * Math.sin(startAngle);
          const x2 = CX + R * Math.cos(endAngle);
          const y2 = CX + R * Math.sin(endAngle);
          const midAngle = (((i + 0.5) * SLICE_DEG - 90) * Math.PI) / 180;
          const textR = R * 0.62;
          const tx = CX + textR * Math.cos(midAngle);
          const ty = CX + textR * Math.sin(midAngle);
          const textAngle = (i + 0.5) * SLICE_DEG;

          return (
            <g key={prize.id}>
              <path
                d={`M${CX},${CX} L${x1},${y1} A${R},${R} 0 0,1 ${x2},${y2} Z`}
                fill={`url(#slice${i})`}
                stroke={terracotta}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={tan}
                fontSize="11"
                fontWeight="900"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.8"
                transform={`rotate(${textAngle}, ${tx}, ${ty})`}
              >
                {prize.label}
              </text>
            </g>
          );
        })}

        {/* Center hub with the coffee cup */}
        <circle cx={CX} cy={CX} r={34} fill={brownDeep} stroke={terracotta} strokeWidth="2" />
        <circle cx={CX} cy={CX} r={29} fill="none" stroke={tan} strokeWidth="0.8" opacity="0.5" />
        <CupMark />
      </svg>
    </div>
  );
}