import React from 'react';
import { P, FONT_SANS, FONT_MONO } from './portfolioTheme';

// Subtle "quality-validation pathway" — a restrained system diagram, not
// decorative noise. Represents the evaluate → iterate → validate loop.
const NODES = [
  { x: 70, label: 'Input' },
  { x: 200, label: 'Evaluate' },
  { x: 330, label: 'Iterate' },
  { x: 460, label: 'Validate' },
];

export default function SystemNodes() {
  const y = 90;
  return (
    <svg
      viewBox="0 0 540 200"
      role="img"
      aria-label="Quality validation pathway: input, evaluate, iterate, validate, with a feedback loop"
      style={{ width: '100%', height: 'auto', maxWidth: 520, display: 'block' }}
    >
      {NODES.slice(0, -1).map((n, i) => (
        <line key={`l-${i}`} x1={n.x + 16} y1={y} x2={NODES[i + 1].x - 16} y2={y} stroke={P.accent} strokeWidth="1.25" />
      ))}
      <path
        d={`M ${NODES[3].x} ${y - 14} C ${NODES[3].x} 18, ${NODES[1].x} 18, ${NODES[1].x} ${y - 14}`}
        fill="none"
        stroke={P.accent}
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.7"
      />
      <text x={(NODES[1].x + NODES[3].x) / 2} y="24" textAnchor="middle" fontSize="7" letterSpacing="2" fill={P.muted} style={{ fontFamily: FONT_MONO }}>
        FEEDBACK
      </text>
      {NODES.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.x} cy={y} r="15" fill={P.surface} stroke={P.accent} strokeWidth="1.5" />
          <text x={n.x} y={y + 3.5} textAnchor="middle" fontSize="9" fontWeight="700" fill={P.accentInk} style={{ fontFamily: FONT_MONO }}>
            {i + 1}
          </text>
          <text x={n.x} y={y + 38} textAnchor="middle" fontSize="12" fill={P.secondary} style={{ fontFamily: FONT_SANS }}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}