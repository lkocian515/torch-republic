import React from 'react';

const ITEMS = [
  { icon: '⚡', label: '100% Instant Coffee' },
  { icon: '🍄', label: "Lion's Mane + Chaga" },
  { icon: '☕', label: '27 Servings' },
  { icon: '✦', label: 'No Coffee Maker Needed' },
  { icon: '🦅', label: 'Made in USA' },
  { icon: '☕', label: 'Premium Arabica' },
  { icon: '🛡️', label: 'Small-Batch Quality' },
];

export default function MushroomTrustBar() {
  return (
    <div className="w-full py-3 px-4 md:py-4 md:px-6"
      style={{ background: 'rgba(10,8,8,0.96)', borderBottom: '1px solid rgba(230,183,173,0.12)' }}>
      <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-6">
        {ITEMS.map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 md:gap-2">
            <span className="text-sm md:text-base">{icon}</span>
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.22em] md:tracking-[0.28em] uppercase whitespace-nowrap"
              style={{ color: 'rgba(230,183,173,0.72)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}