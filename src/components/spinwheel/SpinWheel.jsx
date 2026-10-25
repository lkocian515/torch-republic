import React from 'react';
import CupFlameMark from '@/components/spinwheel/CupFlameMark';
import { BRAND_COLORS } from '@/lib/brandAssets';

const SIZE = 260;
const CX = SIZE / 2;
const R = SIZE / 2 - 10;
const SLICE_DEG = 90;

const { navy, navyDeep, navyLight, gold, goldLight, cream } = BRAND_COLORS;

/**
 * Prize wheel in the night-sky palette: midnight navy slices under gold rules,
 * with the coffee cup and flame at the hub.
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
          borderTop: `18px solid ${gold}`,
          zIndex: 10,
          filter: 'drop-shadow(0 2px 6px rgba(5,10,18,0.6))',
        }}
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          transform: `rotate(${rotation}deg)`,
          filter: 'drop-shadow(0 0 20px rgba(217,160,74,0.22))',
        }}
      >
        <defs>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={gold} stopOpacity="0.22" />
            <stop offset="100%" stopColor={gold} stopOpacity="0" />
          </radialGradient>
          {prizes.map((prize, i) => (
            <linearGradient key={prize.id} id={`slice${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={i % 2 === 0 ? navyLight : navy} />
              <stop offset="100%" stopColor={i % 2 === 0 ? navy : navyDeep} />
            </linearGradient>
          ))}
        </defs>

        {/* Outer glow + gold rules */}
        <circle cx={CX} cy={CX} r={R + 10} fill="url(#wheelGlow)" />
        <circle cx={CX} cy={CX} r={R + 9} fill="none" stroke={navyDeep} strokeWidth="6" />
        <circle cx={CX} cy={CX} r={R + 6} fill="none" stroke={gold} strokeWidth="1.5" opacity="0.5" />
        <circle cx={CX} cy={CX} r={R + 3} fill="none" stroke={goldLight} strokeWidth="2" opacity="0.8" />

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
                stroke={gold}
                strokeWidth="1"
                strokeOpacity="0.45"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={cream}
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
        <circle cx={CX} cy={CX} r={34} fill={navyDeep} stroke={gold} strokeWidth="2" />
        <circle cx={CX} cy={CX} r={29} fill="none" stroke={goldLight} strokeWidth="0.8" opacity="0.5" />
        <CupFlameMark x={CX - 24} y={CX - 24} size={48} />
      </svg>
    </div>
  );
}