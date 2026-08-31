import React from 'react';
import { requireCommerce } from '@/lib/commerceGuard';

const ACCENT = '#B86543';
const BTN_TEXT = '#FBF8F1';
const INK = '#2D2824';
const MUTED = '#9A8A7A';
const BORDER = '#E4D8C9';

/**
 * Mobile sticky checkout bar. Positioned above the fixed bottom navigation
 * (see .cart-sticky-checkout in index.css) so the button is never covered.
 * The single checkout action opens the global "Product Sold Out" modal via
 * requireCommerce() — it never contacts Shopify or launches an external
 * checkout. Hidden on desktop (lg:hidden) and when the cart is empty.
 */
export default function CartStickyCheckout({ subtotal, totalItems }) {
  if (!totalItems) return null;

  return (
    <div
      className="cart-sticky-checkout lg:hidden fixed left-0 right-0 z-[60] px-4 py-3"
      style={{
        background: 'rgba(251,248,242,0.97)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0">
          <p className="font-mono text-[8px] tracking-[0.15em] uppercase" style={{ color: MUTED }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
          <p className="font-serif font-bold text-lg" style={{ color: INK }}>${subtotal.toFixed(2)}</p>
        </div>
        <button
          onClick={() => requireCommerce()}
          aria-label="Continue to checkout"
          className="flex-1 flex items-center justify-center whitespace-nowrap font-mono text-[10px] tracking-[0.15em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: ACCENT, color: BTN_TEXT, minHeight: '52px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}