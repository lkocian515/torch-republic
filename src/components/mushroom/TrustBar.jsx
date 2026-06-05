import React from 'react';

const ITEMS = [
  { label: 'Instant Powder Mix' },
  { label: 'Functional Mushrooms' },
  { label: 'Coffee-Forward Taste' },
  { label: 'No Brewing Machine Needed' },
  { label: "Lion's Mane + Chaga" },
  { label: 'Ships from the USA' },
];

export default function MushroomTrustBar() {
  return (
    <div className="w-full overflow-hidden"
      style={{ background: '#161616', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
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