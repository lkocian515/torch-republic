import React from 'react';

const ACCENT = '#B86543';
const MUTED = '#6A5A4A';
const BORDER = '#E4D8C9';

const BULLETS = [
  'No pods or machines required',
  'Premium instant coffee convenience',
  'Functional mushroom blends',
  'Ceremonial grade matcha options',
  'Easy travel-friendly rituals',
];

export default function CartReassurance() {
  return (
    <div className="mt-6 p-5" style={{ background: '#FFFFFF', border: `1px solid ${BORDER}` }}>
      <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>
        Why Customers Choose Torch Republic
      </p>
      <ul className="space-y-2.5">
        {BULLETS.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] flex-shrink-0" style={{ color: '#10B981', marginTop: '1px' }}>✓</span>
            <span className="font-heading text-sm" style={{ color: MUTED, fontWeight: 300, lineHeight: 1.5 }}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}