import React from 'react';

const SIZE = 260;
const CX = SIZE / 2;
const R = SIZE / 2 - 10;
const SLICE_DEG = 90;

const GOLD = '#D4AF5A';
const GOLD_LIGHT = '#F0D080';
const TORCH_MARK = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/45bacf9c2_2.png';

/**
 * Prize wheel in the previous Torch Republic wheel's styling: deep navy slices
 * under gold rules, gold lettering, and the torch mark at the hub.
 *
 * The wheel rotates via the `rotation` prop (degrees). The pointer is fixed at
 * the top (12 o'clock) and does NOT rotate.
 */
export default function SpinWheel({ prizes, rotation }) {
  return (
    <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
      {/* Fixed gold pointer at top */}
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
          borderTop: `18px solid ${GOLD_LIGHT}`,
          zIndex: 10,
          filter: `drop-shadow(0 2px 6px ${GOLD})`,
        }}
      />

      <svg
        width="100%"
        height="auto"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          transform: `rotate(${rotation}deg)`,
          display: 'block',
          filter: 'drop-shadow(0 0 18px rgba(212,175,90,0.25))',
        }}
      >
        <defs>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1B5060" stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <clipPath id="hubClip">
            <circle cx={CX} cy={CX} r={22} />
          </clipPath>
          {prizes.map((prize, i) => (
            <linearGradient key={prize.id} id={`slice${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={i % 2 === 0 ? '#0d2a35' : '#071828'} />
              <stop offset="100%" stopColor={i % 2 === 0 ? '#0a1e28' : '#061220'} />
            </linearGradient>
          ))}
        </defs>

        {/* Outer glow + gold rings */}
        <circle cx={CX} cy={CX} r={R + 10} fill="url(#wheelGlow)" />
        <circle cx={CX} cy={CX} r={R + 9} fill="none" stroke="#0E2A2F" strokeWidth="6" />
        <circle cx={CX} cy={CX} r={R + 6} fill="none" stroke={GOLD} strokeWidth="1.5" opacity="0.4" />
        <circle cx={CX} cy={CX} r={R + 3} fill="none" stroke={GOLD_LIGHT} strokeWidth="2" opacity="0.7" />

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
                stroke={GOLD}
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={GOLD_LIGHT}
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

        {/* Center hub with the torch mark */}
        <circle cx={CX} cy={CX} r={28} fill="#071520" stroke={GOLD} strokeWidth="2" />
        <circle cx={CX} cy={CX} r={24} fill="none" stroke={GOLD_LIGHT} strokeWidth="0.8" opacity="0.5" />
        <image
          href={TORCH_MARK}
          x={CX - 20}
          y={CX - 20}
          width="40"
          height="40"
          clipPath="url(#hubClip)"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
}