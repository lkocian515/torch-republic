import React from 'react';

const RG = '#E6B7AD';

const ITEMS = [
  { icon: '⚡', text: 'Premium instant blends' },
  { icon: '🚫', text: 'No pods or machine needed' },
  { icon: '🌿', text: 'Clear, honest ingredients' },
  { icon: '🔒', text: 'Secure checkout' },
  { icon: '⭐', text: 'Real customer reviews' },
  { icon: '🇺🇸', text: 'U.S.-based small business' },
];

export default function HomeTrustRow() {
  return (
    <div
      className="px-6 md:px-10 py-4"
      style={{
        background: '#0D0C0B',
        borderTop: '1px solid rgba(230,183,173,0.07)',
        borderBottom: '1px solid rgba(230,183,173,0.07)',
      }}
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span style={{ fontSize: '0.75rem' }}>{item.icon}</span>
              <span
                className="font-mono text-[8px] tracking-[0.18em] uppercase"
                style={{ color: 'rgba(230,183,173,0.5)' }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}