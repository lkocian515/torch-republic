import React from 'react';
import { Coffee } from 'lucide-react';

const SIZE = 260;
const CX = SIZE / 2;
const R = SIZE / 2 - 6;
const SLICE_DEG = 90;

/**
 * Premium prize wheel — four equal sections in earthy Torch Republic tones.
 * The wheel rotates via the `rotation` prop (degrees). The pointer is fixed
 * at the top (12 o'clock) and does NOT rotate.
 */
export default function SpinWheel({ prizes, rotation }) {
  return (
    <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
      {/* Fixed pointer at top */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '9px solid transparent',
          borderRight: '9px solid transparent',
          borderTop: '16px solid #B86543',
          zIndex: 10,
          filter: 'drop-shadow(0 1px 2px rgba(45,40,36,0.2))',
        }}
      />

      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          display: 'block',
          filter: 'drop-shadow(0 4px 12px rgba(45,40,36,0.12))',
        }}
      >
        <defs>
          <radialGradient id="wheelTexture" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBF8F2" stopOpacity="0.06" />
            <stop offset="80%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer rings */}
        <circle cx={CX} cy={CX} r={R + 3} fill="none" stroke="#D6B27A" strokeWidth="1" opacity="0.4" />
        <circle cx={CX} cy={CX} r={R + 1} fill="none" stroke="#E4D8C9" strokeWidth="0.5" />

        {prizes.map((prize, i) => {
          const startAngle = ((i * SLICE_DEG - 90) * Math.PI) / 180;
          const endAngle = (((i + 1) * SLICE_DEG - 90) * Math.PI) / 180;
          const x1 = CX + R * Math.cos(startAngle);
          const y1 = CX + R * Math.sin(startAngle);
          const x2 = CX + R * Math.cos(endAngle);
          const y2 = CX + R * Math.sin(endAngle);
          const midAngle = (((i + 0.5) * SLICE_DEG - 90) * Math.PI) / 180;
          const textR = R * 0.6;
          const tx = CX + textR * Math.cos(midAngle);
          const ty = CX + textR * Math.sin(midAngle);
          const textAngle = (i + 0.5) * SLICE_DEG;

          return (
            <g key={prize.id}>
              <path
                d={`M${CX},${CX} L${x1},${y1} A${R},${R} 0 0,1 ${x2},${y2} Z`}
                fill={prize.sliceColor}
                stroke="#D6B27A"
                strokeWidth="0.5"
                strokeOpacity="0.35"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={prize.sliceTextColor}
                fontSize="12"
                fontWeight="700"
                fontFamily="'Inter', sans-serif"
                letterSpacing="0.4"
                transform={`rotate(${textAngle}, ${tx}, ${ty})`}
              >
                {prize.label}
              </text>
            </g>
          );
        })}

        {/* Texture overlay */}
        <circle cx={CX} cy={CX} r={R} fill="url(#wheelTexture)" pointerEvents="none" />

        {/* Center hub */}
        <circle cx={CX} cy={CX} r={20} fill="#2D2824" stroke="#D6B27A" strokeWidth="1.5" />
      </svg>

      {/* Center coffee icon (fixed, not rotating) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        <Coffee size={16} style={{ color: '#D6B27A' }} strokeWidth={1.5} />
      </div>
    </div>
  );
}