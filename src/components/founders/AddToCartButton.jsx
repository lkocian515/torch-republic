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
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-8 py-3.5 font-heading font-black text-sm tracking-[0.15em] uppercase transition-all disabled:opacity-60"
        style={{ background: `linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, ${accent} 100%)`, color: '#fff' }}
      >
        {loading ? 'Adding to Cart...' : label}
      </button>
      {error && <p className="font-mono text-xs mt-2" style={{ color: '#ff6b6b' }}>{error}</p>}
    </div>
  );
}