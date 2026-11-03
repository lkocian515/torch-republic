import React from 'react';

const ACCENT = '#9B4E2F';
const BTN_TEXT = '#F7F2E9';
const INK = '#32190F';
const MUTED = '#9A8A7A';
const BORDER = '#B89A6D';

/**
 * Mobile sticky checkout bar. Positioned above the fixed bottom navigation
 * (see .cart-sticky-checkout in index.css) so the button is never covered.
 * Calls onCheckout (from CartContext.handleCheckout) to redirect to the
 * Shopify-hosted checkout page. Hidden on desktop (lg:hidden) and when the
 * cart is empty.
 */
export default function CartStickyCheckout({ subtotal, totalItems, onCheckout, isCheckingOut }) {
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
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase" style={{ color: MUTED }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
          <p className="font-serif font-bold text-lg" style={{ color: INK }}>${subtotal.toFixed(2)}</p>
        </div>
        <button
          onClick={onCheckout}
          disabled={isCheckingOut}
          aria-label="Continue to checkout"
          className="flex-1 flex items-center justify-center whitespace-nowrap font-mono text-xs tracking-[0.1em] uppercase font-bold transition-all hover:opacity-90"
          style={{ background: ACCENT, color: BTN_TEXT, minHeight: '52px', border: 'none', cursor: isCheckingOut ? 'wait' : 'pointer', borderRadius: '4px', opacity: isCheckingOut ? 0.7 : 1 }}
        >
          {isCheckingOut ? 'Preparing...' : 'Continue to Checkout'}
        </button>
      </div>
    </div>
  );
}