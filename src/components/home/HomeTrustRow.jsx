import React from 'react';

const RG = '#E6B7AD';

const ITEMS = [
  { icon: '⚡', text: 'Ready in Seconds' },
  { icon: '☕', text: 'No Machine Required' },
  { icon: '🔒', text: 'Secure Shopify Checkout' },
  { icon: '✦', text: '27 Servings Per Tube' },
  { icon: '✦', text: '30-Day Guarantee' },
  { icon: '✦', text: 'Free Shipping $75+' },
  { icon: '✦', text: '100% Arabica Coffee' },
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
                className="font-mono text-[11px] tracking-[0.12em] uppercase"
                style={{ color: 'rgba(230,183,173,0.85)' }}
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