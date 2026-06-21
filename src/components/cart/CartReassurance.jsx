import React from 'react';

const RG = '#E6B7AD';

const BULLETS = [
  'No pods or machines required',
  'Premium instant coffee convenience',
  'Functional mushroom blends',
  'Ceremonial grade matcha options',
  'Easy travel-friendly rituals',
];

export default function CartReassurance() {
  return (
    <div className="mt-6 p-5" style={{ background: '#0F0E0E', border: '1px solid rgba(230,183,173,0.1)' }}>
      <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
        Why Customers Choose Torch Republic
      </p>
      <ul className="space-y-2.5">
        {BULLETS.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2.5">
            <span className="font-mono text-[10px] flex-shrink-0" style={{ color: '#10B981', marginTop: '1px' }}>✓</span>
            <span className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.7)', fontWeight: 300, lineHeight: 1.5 }}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}