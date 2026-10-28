import React from 'react';
import LogoArtwork from '@/components/spinwheel/LogoArtwork';
import { BRAND_COLORS } from '@/lib/brandAssets';

const SIZE = 340;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 138;
const SLICE_DEG = 90;
const DOTS = 72;

const { gold, goldLight, goldAntique, green, cream, navy, navyDeep } = BRAND_COLORS;

/** The dotted gold track between the two rim rules. */
const RIM_DOTS = Array.from({ length: DOTS }, (_, i) => {
  const a = ((i * (360 / DOTS) - 90) * Math.PI) / 180;
  const r = R + 11.5;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a), major: i % 6 === 0 };
});

/** A delicate leafy sprig with a small cream flower, centred on the origin. */
const SPRIG = (
  <>
    <path d="M-9 1 C-4 -4 3 -5 9 -2.5" fill="none" stroke={goldAntique} strokeWidth="0.8" opacity="0.7" />
    <path d="M-5 -0.8 C-4 -4.4 0 -6.2 4 -5.6 C2.4 -2 0.6 -0.4 -5 -0.8 Z" fill={green} opacity="0.72" />
    <path d="M-1.5 0.6 C-0.6 -2.6 3 -4.4 6.8 -4 C5.6 -1 2.6 0.9 -1.5 0.6 Z" fill={green} opacity="0.55" />
    <path d="M5.5 1.4 C8 0.4 10.6 1 12 3 C9.4 3.8 7 3.2 5.5 1.4 Z" fill={green} opacity="0.45" />
    <circle cx="9.6" cy="-2.6" r="2.1" fill={cream} opacity="0.85" />
    <circle cx="9.6" cy="-2.6" r="0.8" fill={goldAntique} />
    <circle cx="12.6" cy="1.6" r="1.3" fill={cream} opacity="0.6" />
  </>
);

/**
 * The prize wheel in the illustrated night-sky palette: four equal quadrants on
 * alternating navy and teal surfaces, fine gold rules between them, an ornate
 * dotted gold rim, a botanically decorated face and a navy medallion at the hub.
 *
 * Only the wheel turns. The pointer at 12 o'clock is fixed, and each prize
 * label is counter-rotated so it stays upright and readable however the wheel
 * comes to rest.
 */
export default function SpinWheel({ prizes, rotation }) {
  return (
    <div style={{ position: 'relative', width: '100%', margin: '0 auto' }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <radialGradient id="wheelHalo" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor={gold} stopOpacity="0.16" />
            <stop offset="100%" stopColor={gold} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wheelTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15455F" />
            <stop offset="100%" stopColor="#0B2839" />
          </linearGradient>
          <linearGradient id="wheelNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D2436" />
            <stop offset="100%" stopColor="#061420" />
          </linearGradient>
          <linearGradient id="pointerGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={goldLight} />
            <stop offset="100%" stopColor={gold} />
          </linearGradient>
        </defs>

        <circle cx={CX} cy={CY} r={R + 26} fill="url(#wheelHalo)" />

        {/* Wheel face — rotates */}
        <g transform={`rotate(${rotation} ${CX} ${CY})`}>
          {prizes.map((prize, i) => {
            const a0 = ((i * SLICE_DEG - 90) * Math.PI) / 180;
            const a1 = (((i + 1) * SLICE_DEG - 90) * Math.PI) / 180;
            const x1 = CX + R * Math.cos(a0);
            const y1 = CY + R * Math.sin(a0);
            const x2 = CX + R * Math.cos(a1);
            const y2 = CY + R * Math.sin(a1);

            // Mid-point of the quadrant, where the prize label sits.
            const midDeg = i * SLICE_DEG - 45;
            const midRad = (midDeg * Math.PI) / 180;
            const labelR = R * 0.7;
            const lx = CX + labelR * Math.cos(midRad);
            const ly = CY + labelR * Math.sin(midRad);
            // Two sprigs per quadrant, set off the label's diagonal and out
            // toward the rim, so the botanicals never crowd the prize text.
            const sprigR = R * 0.8;
            const sprigAngles = [midDeg - 26, midDeg + 26];

            return (
              <g key={prize.id}>
                <path
                  d={`M${CX},${CY} L${x1},${y1} A${R},${R} 0 0,1 ${x2},${y2} Z`}
                  fill={i % 2 === 0 ? 'url(#wheelTeal)' : 'url(#wheelNavy)'}
                />
                {sprigAngles.map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <g
                      key={deg}
                      transform={`translate(${CX + sprigR * Math.cos(rad)}, ${CY + sprigR * Math.sin(rad)}) rotate(${deg + 90}) scale(0.92)`}
                    >
                      {SPRIG}
                    </g>
                  );
                })}
                {/* Upright label: counter-rotated against the wheel so it never
                    ends up on its side, at rest or mid-spin. */}
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={cream}
                  fontSize="29"
                  fontWeight="600"
                  fontFamily="'Cormorant Garamond', 'Playfair Display', Georgia, serif"
                  letterSpacing="0.4"
                  transform={`rotate(${-rotation} ${lx} ${ly})`}
                >
                  {prize.label}
                </text>
              </g>
            );
          })}

          {/* Fine gold rules between quadrants */}
          {prizes.map((prize, i) => {
            const a = ((i * SLICE_DEG - 90) * Math.PI) / 180;
            return (
              <line
                key={`rule-${prize.id}`}
                x1={CX}
                y1={CY}
                x2={CX + R * Math.cos(a)}
                y2={CY + R * Math.sin(a)}
                stroke={goldAntique}
                strokeWidth="1.1"
                opacity="0.62"
              />
            );
          })}

          {/* Ornate rim: outer rule, dotted track, inner rule */}
          <circle cx={CX} cy={CY} r={R + 7.5} fill="none" stroke={gold} strokeWidth="3.2" opacity="0.92" />
          <circle cx={CX} cy={CY} r={R + 1.5} fill="none" stroke={goldAntique} strokeWidth="1" opacity="0.8" />
          <circle cx={CX} cy={CY} r={R + 15} fill="none" stroke={goldAntique} strokeWidth="0.9" opacity="0.55" />
          {RIM_DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.major ? 1.5 : 0.9}
              fill={d.major ? goldLight : goldAntique}
              opacity={d.major ? 0.9 : 0.55}
            />
          ))}

          {/* Navy medallion at the hub */}
          <circle cx={CX} cy={CY} r={44} fill={navyDeep} stroke={gold} strokeWidth="1.6" />
          <circle cx={CX} cy={CY} r={38.5} fill={navy} stroke={goldLight} strokeWidth="0.7" opacity="0.5" />
        </g>
      </svg>

      {/* The cup and flame, above the wheel so it stays upright while it spins */}
      <LogoArtwork
        crop="mark"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '19%',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Fixed gold pointer at 12 o'clock */}
      <svg
        viewBox="0 0 44 52"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-1.5%',
          left: '50%',
          width: '12.5%',
          transform: 'translateX(-50%)',
          filter: 'drop-shadow(0 3px 7px rgba(4,9,16,0.75))',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <path d="M22 50 L34.5 14 A13 13 0 0 0 9.5 14 Z" fill="url(#pointerGold)" stroke={goldAntique} strokeWidth="0.9" />
        <circle cx="22" cy="14" r="4.4" fill={navyDeep} stroke={goldLight} strokeWidth="1.1" />
      </svg>
    </div>
  );
}