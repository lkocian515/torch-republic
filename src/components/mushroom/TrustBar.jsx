import React from 'react';

const ITEMS = [
  { label: "Lion's Mane + Chaga" },
  { label: 'Premium Arabica' },
  { label: '27 Servings Per Tube' },
  { label: 'No Brewer Needed' },
  { label: 'Small-Batch Crafted' },
  { label: 'Made in the USA' },
];

export default function MushroomTrustBar() {
  return (
    <div className="w-full overflow-hidden"
      style={{ background: '#050505', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <div className="flex items-center justify-center flex-wrap gap-0">
        {ITEMS.map(({ label }, i) => (
          <div key={label} className="flex items-center">
            <span className="font-mono text-[8px] tracking-[0.32em] uppercase whitespace-nowrap py-3 px-5 md:py-3.5 md:px-7"
              style={{ color: 'rgba(230,183,173,0.5)' }}>
              {label}
            </span>
            {i < ITEMS.length - 1 && (
              <span style={{ color: 'rgba(230,183,173,0.15)', fontSize: '10px' }}>·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}