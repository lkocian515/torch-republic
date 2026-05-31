import React from 'react';

const ITEMS = [
  { icon: '⚡', label: '100% Instant Coffee' },
  { icon: '🍄', label: "Lion's Mane + Chaga" },
  { icon: '☕', label: '27 Servings Per Tube' },
  { icon: '✦', label: 'No Coffee Maker Needed' },
];

export default function MushroomTrustBar() {
  return (
    <div className="w-full py-4 px-6"
      style={{ background: 'rgba(10,8,8,0.96)', borderBottom: '1px solid rgba(230,183,173,0.12)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {ITEMS.map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span style={{ fontSize: '0.85rem' }}>{icon}</span>
            <span className="font-mono text-[9px] tracking-[0.28em] uppercase whitespace-nowrap"
              style={{ color: 'rgba(230,183,173,0.72)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}