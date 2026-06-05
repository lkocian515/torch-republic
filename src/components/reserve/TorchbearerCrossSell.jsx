import React from 'react';
import { Link } from 'react-router-dom';
import { getShopifyCartUrl } from '@/lib/shopifyCheckout';

const GOLD = '#C4A35A';

/**
 * TorchbearerCrossSell
 * Drop into any mushroom product page to upsell Torchbearer.
 * Usage: <TorchbearerCrossSell />
 */
export default function TorchbearerCrossSell() {
  const cartUrl = getShopifyCartUrl('torchbearer-premium-instant-coffee', 1);

  return (
    <div
      className="mt-8 p-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #100d07 0%, #0d0a05 100%)',
        border: `1px solid ${GOLD}25`,
        borderRadius: '2px',
      }}
    >
      {/* Top gold accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent 0%, ${GOLD}60 50%, transparent 100%)` }} />

      <p className="font-mono text-[7px] tracking-[0.45em] uppercase mb-3" style={{ color: `${GOLD}70` }}>
        Complete Your Ritual
      </p>

      <div className="flex items-center gap-4">
        {/* Thumbnail */}
        <div
          className="flex-shrink-0 w-16 h-16 flex items-center justify-center overflow-hidden"
          style={{ background: '#0c0907', border: `1px solid ${GOLD}15`, borderRadius: '2px' }}
        >
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6cbd6bb7b_fsdgfrtre.png"
            alt="Torchbearer™"
            className="w-full h-full object-contain p-1"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-sm leading-tight" style={{ color: '#F5EDE0' }}>
            Torchbearer™
          </p>
          <p className="font-mono text-[7px] tracking-[0.2em] uppercase mt-0.5" style={{ color: `${GOLD}80` }}>
            Premium Instant Coffee
          </p>
          <p className="font-mono text-[7px] tracking-[0.15em] uppercase mt-1" style={{ color: 'rgba(240,230,210,0.4)' }}>
            Single-Origin Papua New Guinea · Medium Roast
          </p>
        </div>

        {/* CTA */}
        <a
          href={cartUrl}
          className="flex-shrink-0 font-mono text-[8px] tracking-[0.25em] uppercase px-4 py-2.5 transition-all hover:opacity-90 whitespace-nowrap"
          style={{
            background: GOLD,
            color: '#0A0806',
            fontWeight: 700,
            borderRadius: '2px',
          }}
        >
          Add Torchbearer
        </a>
      </div>

      <Link
        to="/torchbearer"
        className="mt-3 inline-block font-mono text-[7px] tracking-[0.2em] uppercase transition-opacity hover:opacity-60"
        style={{ color: `${GOLD}55`, textDecoration: 'underline', textUnderlineOffset: '3px' }}
      >
        Republic Reserve Collection →
      </Link>
    </div>
  );
}