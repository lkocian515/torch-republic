import React from 'react';
import LogoArtwork from '@/components/spinwheel/LogoArtwork';
import { BRAND_COLORS } from '@/lib/brandAssets';

const SIZE = 260;
const CX = SIZE / 2;
const R = 114;
const SLICE_DEG = 90;
const TICKS = 60;

const { navy, navyDeep, navyLight, gold, goldLight, goldAntique, green, cream } = BRAND_COLORS;

/** The gold tick track that runs between the two rim rules. */
const TICK_MARKS = Array.from({ length: TICKS }, (_, i) => {
  const angle = ((i * (360 / TICKS) - 90) * Math.PI) / 180;
  const major = i % 5 === 0;
  const inner = R + (major ? 3.5 : 5);
  const outer = R + (major ? 9 : 7);
  return {
    x1: CX + inner * Math.cos(angle),
    y1: CX + inner * Math.sin(angle),
    x2: CX + outer * Math.cos(angle),
    y2: CX + outer * Math.sin(angle),
    major,
  };
});

/** A delicate leafy sprig with a small flower, drawn centred on the origin. */
const SPRIG = (
  <>
    <path d="M-7 1 C-3 -3 2 -4 7 -2" fill="none" stroke={goldAntique} strokeWidth="0.7" opacity="0.75" />
    <path d="M-4 -0.6 C-3 -3.4 0 -4.8 3 -4.4 C1.8 -1.6 -1 -0.2 -4 -0.6 Z" fill={green} opacity="0.7" />
    <path d="M-1 0.4 C0 -2 2.6 -3.2 5.2 -2.8 C4.2 -0.5 1.8 0.7 -1 0.4 Z" fill={green} opacity="0.55" />
    <circle cx="7.6" cy="-1.9" r="1.6" fill={cream} opacity="0.8" />
    <circle cx="7.6" cy="-1.9" r="0.6" fill={goldAntique} />
  </>
);

/**
 * Prize wheel in the night-sky palette: midnight navy quadrants under fine gold
 * rules, with the coffee cup and flame at the hub.
 *
 * Labels run along the radius and are flipped on the left half, so every prize
 * reads the right way up however the wheel comes to rest. The wheel rotates via
 * the `rotation` prop (degrees); the pointer is fixed at the top (12 o'clock)
 * and does NOT rotate.
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
          borderLeft: '11px solid transparent',
          borderRight: '11px solid transparent',
          borderTop: `19px solid ${gold}`,
          zIndex: 10,
          filter: 'drop-shadow(0 2px 6px rgba(5,10,18,0.7))',
        }}
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          transform: `rotate(${rotation}deg)`,
          filter: 'drop-shadow(0 0 12px rgba(217,160,74,0.16))',
        }}
      >
        <defs>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={gold} stopOpacity="0.20" />
            <stop offset="100%" stopColor={gold} stopOpacity="0" />
          </radialGradient>
          {prizes.map((prize, i) => (
            <linearGradient key={prize.id} id={`slice${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={i % 2 === 0 ? navyLight : navy} />
              <stop offset="100%" stopColor={i % 2 === 0 ? navy : navyDeep} />
            </linearGradient>
          ))}
        </defs>

        {/* Outer glow, then the fine double gold track */}
        <circle cx={CX} cy={CX} r={R + 13} fill="url(#wheelGlow)" />
        <circle cx={CX} cy={CX} r={R + 11} fill="none" stroke={navyDeep} strokeWidth="5" />
        <circle cx={CX} cy={CX} r={R + 10.5} fill="none" stroke={goldAntique} strokeWidth="0.9" opacity="0.75" />
        <circle cx={CX} cy={CX} r={R + 3.5} fill="none" stroke={goldAntique} strokeWidth="0.9" opacity="0.75" />

        {/* Tick marks between the two rules */}
        <g>
          {TICK_MARKS.map((t, i) => (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={t.major ? goldLight : goldAntique}
              strokeWidth={t.major ? 1.2 : 0.7}
              opacity={t.major ? 0.85 : 0.5}
            />
          ))}
        </g>

        {prizes.map((prize, i) => {
          const startAngle = ((i * SLICE_DEG - 90) * Math.PI) / 180;
          const endAngle = (((i + 1) * SLICE_DEG - 90) * Math.PI) / 180;
          const x1 = CX + R * Math.cos(startAngle);
          const y1 = CX + R * Math.sin(startAngle);
          const x2 = CX + R * Math.cos(endAngle);
          const y2 = CX + R * Math.sin(endAngle);

          // The label sits at the middle of its quadrant and runs along the
          // radius. Quadrants on the left half are turned through 180° so the
          // text is never upside down.
          const midDeg = i * SLICE_DEG - 45;
          const midRad = (midDeg * Math.PI) / 180;
          const textR = R * 0.66;
          const tx = CX + textR * Math.cos(midRad);
          const ty = CX + textR * Math.sin(midRad);
          const upsideDown = midDeg > 90 && midDeg < 270;
          const textAngle = upsideDown ? midDeg + 180 : midDeg;

          return (
            <g key={prize.id}>
              <path
                d={`M${CX},${CX} L${x1},${y1} A${R},${R} 0 0,1 ${x2},${y2} Z`}
                fill={`url(#slice${i})`}
                stroke={goldAntique}
                strokeWidth="1"
                strokeOpacity="0.55"
              />
              <text
                x={tx}
                y={ty}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={cream}
                fontSize="18"
                fontWeight="700"
                fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
                letterSpacing="0.8"
                transform={`rotate(${textAngle}, ${tx}, ${ty})`}
              >
                {prize.label}
              </text>
            </g>
          );
        })}

        {/* A leafy sprig and small flower in each quadrant, just inside the rim */}
        {prizes.map((prize, i) => {
          const midDeg = i * SLICE_DEG - 45;
          const midRad = (midDeg * Math.PI) / 180;
          const sr = R * 0.85;
          return (
            <g
              key={`sprig-${prize.id}`}
              transform={`translate(${CX + sr * Math.cos(midRad)}, ${CX + sr * Math.sin(midRad)}) rotate(${midDeg + 90})`}
            >
              {SPRIG}
            </g>
          );
        })}

        {/* Center hub */}
        <circle cx={CX} cy={CX} r={34} fill="#061B31" stroke={goldAntique} strokeWidth="1.2" />
        <circle cx={CX} cy={CX} r={29} fill="none" stroke={goldLight} strokeWidth="0.7" opacity="0.5" />
      </svg>

      {/* The standalone cup-and-flame mark, above the wheel so it stays upright
          while the wheel spins. Sized to sit comfortably inside the hub. */}
      <LogoArtwork
      crop="mark"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '20%',
        height: 'auto',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      />
    </div>
  );
}