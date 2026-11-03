import React from 'react';

// Legacy product pages link to the current, verified coffee plans.
// One-time purchase remains the default.
export default function SubscribeToggle({ accent = '#9B4E2F' }) {
  return (
    <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: `${accent}33`, background: `${accent}08` }}>
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
        Subscriptions
      </p>
      <p className="font-heading text-sm" style={{ color: '#5E4639', lineHeight: 1.7 }}>
        Coffee subscriptions are available. Choose Classic or Mushroom Coffee and review your delivery plan before checkout.
      </p>
      <a
        href="/subscription"
        className="inline-block mt-3 font-mono text-[10px] tracking-[0.15em] uppercase font-bold transition-opacity hover:opacity-80"
        style={{ color: accent }}
      >
        Explore Coffee Subscriptions &rarr;
      </a>
    </div>
  );
}