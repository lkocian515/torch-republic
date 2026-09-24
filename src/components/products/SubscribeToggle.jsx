import React from 'react';

/**
 * SubscribeToggle
 * Subscriptions are not yet live. This component renders a waitlist notice
 * instead of subscription purchase controls. When a Shopify selling plan is
 * verified, replace this with a real subscribe-and-save toggle using the
 * verified savings rate (initially intended as 10%).
 *
 * Never make subscription the preselected/default purchase type.
 */
export default function SubscribeToggle({ accent = '#B86543' }) {
  return (
    <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: `${accent}33`, background: `${accent}08` }}>
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>
        Subscriptions
      </p>
      <p className="font-heading text-sm" style={{ color: '#5F5145', lineHeight: 1.7 }}>
        Subscriptions are coming soon. Join the waitlist to be notified when
        monthly delivery is available.
      </p>
      <a
        href="/#newsletter"
        className="inline-block mt-3 font-mono text-[10px] tracking-[0.15em] uppercase font-bold transition-opacity hover:opacity-80"
        style={{ color: accent }}
      >
        Join the Waitlist &rarr;
      </a>
    </div>
  );
}