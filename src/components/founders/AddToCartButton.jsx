import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';

export default function AddToCartButton({ shopifyHandle, accent, label = 'Add to Cart — Carry the Flame' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await base44.functions.invoke('createShopifyCheckout', { handle: shopifyHandle, quantity: 1 });
      if (res.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      setError('Could not start checkout. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full py-4 font-mono font-black text-[11px] tracking-[0.3em] uppercase transition-all disabled:opacity-60 btn-glow"
        style={{ background: accent, color: '#080808' }}
      >
        {loading ? 'Opening Checkout...' : label}
      </button>
      {error && <p className="font-mono text-xs mt-2" style={{ color: '#ff6b6b' }}>{error}</p>}
    </div>
  );
}