import React from 'react';
import { Lock } from 'lucide-react';
import { guardExternalPurchase } from '@/lib/purchaseFallback';

const RG = '#E6B7AD';

export default function CartStickyCheckout({ subtotal, checkoutUrl, totalItems }) {
  if (!checkoutUrl) return null;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3"
      style={{
        background: 'rgba(8,8,8,0.97)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(230,183,173,0.2)',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[8px] tracking-[0.15em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
          <p className="font-serif font-bold text-lg" style={{ color: '#F5EFE6' }}>
            ${subtotal.toFixed(2)}
          </p>
        </div>
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => guardExternalPurchase(e)}
          className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90 flex-1 max-w-[220px]"
          style={{ background: RG, color: '#080808', textDecoration: 'none', minHeight: '52px' }}
        >
          <Lock className="w-3.5 h-3.5" />
          Checkout →
        </a>
      </div>
    </div>
  );
}