import React from 'react';
import { Lock } from 'lucide-react';
import { guardExternalPurchase } from '@/lib/purchaseFallback';
import { COMMERCE_ENABLED } from '@/lib/commerceConfig';
import { requireCommerce } from '@/lib/commerceGuard';

const ACCENT = '#B86543';
const BTN_TEXT = '#FBF8F1';
const INK = '#2D2824';
const MUTED = '#9A8A7A';
const BORDER = '#E4D8C9';

export default function CartStickyCheckout({ subtotal, checkoutUrl, totalItems }) {
  // Mobile sticky bar. When commerce is disabled, show a "Check Availability"
  // action instead of routing to a broken checkout. Hide entirely when there
  // is nothing actionable (no items, or commerce on but no URL yet).
  if (!totalItems) return null;
  if (COMMERCE_ENABLED && !checkoutUrl) return null;

  const barStyle = {
    background: 'rgba(251,248,242,0.97)',
    backdropFilter: 'blur(12px)',
    borderTop: `1px solid ${BORDER}`,
    paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3" style={barStyle}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[8px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
          <p className="font-serif font-bold text-lg" style={{ color: INK }}>${subtotal.toFixed(2)}</p>
        </div>
        {!COMMERCE_ENABLED ? (
          <button
            onClick={() => requireCommerce()}
            className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90 flex-1 max-w-[220px]"
            style={{ background: ACCENT, color: BTN_TEXT, minHeight: '52px', border: 'none', cursor: 'pointer' }}
          >
            Check Availability
          </button>
        ) : (
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => guardExternalPurchase(e)}
            className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90 flex-1 max-w-[220px]"
            style={{ background: ACCENT, color: BTN_TEXT, textDecoration: 'none', minHeight: '52px' }}
          >
            <Lock className="w-3.5 h-3.5" />
            Checkout →
          </a>
        )}
      </div>
    </div>
  );
}