import React from 'react';
import { Minus, Plus, Check, ShoppingBag } from 'lucide-react';

/**
 * Desktop-only sticky purchase bar.
 * Stays pinned to the bottom of the product page while scrolling so the
 * add-to-cart action is always one click away. Mirrors the quantity and
 * purchase mode held by the product page, so nothing can drift out of sync.
 */
export default function DesktopStickyCartBar({
  product,
  accent,
  deep,
  card,
  border,
  text,
  qty,
  onDecrease,
  onIncrease,
  total,
  isSubscription,
  justAdded,
  onAdd,
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 hidden lg:flex"
      style={{
        background: card,
        borderTop: `1px solid ${border}`,
        boxShadow: '0 -8px 24px rgba(45,40,36,0.10)',
      }}
    >
      <div className="mx-auto flex w-full max-w-[1100px] items-center gap-6 px-10 py-3">
        <div className="min-w-0">
          <p className="truncate font-serif text-base font-bold" style={{ color: text }}>
            {product.name}
          </p>
          <p className="font-mono text-xs" style={{ color: deep }}>
            ${total.toFixed(2)}
            {isSubscription ? ' · Subscribe & Save' : ''}
          </p>
        </div>

        <div className="ml-auto flex items-center gap-5">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.08em]" style={{ color: deep }}>
              Qty
            </span>
            <div className="flex items-center" style={{ border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
              <button
                onClick={onDecrease}
                style={{ width: 38, height: 42, color: text, background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span className="w-9 text-center font-mono text-sm" style={{ color: text }}>{qty}</span>
              <button
                onClick={onIncrease}
                style={{ width: 38, height: 42, color: text, background: 'none', border: 'none', cursor: 'pointer' }}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          <button
            onClick={onAdd}
            className="btn"
            style={{ background: accent, borderColor: accent, color: '#FFFFFF', flexShrink: 0, padding: '0.7rem 1.75rem', minWidth: 190 }}
            aria-label={justAdded ? 'Added to cart' : `Add ${product.name} to cart`}
          >
            {justAdded ? (<><Check size={16} /> Added to cart</>) : (<><ShoppingBag size={16} /> Add to Cart</>)}
          </button>
        </div>
      </div>
    </div>
  );
}