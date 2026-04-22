import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { buildCartUrl } from '@/lib/shopifyConfig';

/**
 * AddToCartButton
 * - Fetches live Shopify variants for the given handle
 * - Defaults to the first AVAILABLE variant (never a sold-out one)
 * - Shows Whole Bean / Ground selector when both variants exist
 * - Direct cart URL redirect to Shopify
 */
export default function AddToCartButton({ shopifyHandle, accent, label = 'Get Your Box — Carry the Flame' }) {
  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState([]);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [availabilityLoaded, setAvailabilityLoaded] = useState(false);

  useEffect(() => {
    if (!shopifyHandle) return;
    base44.functions.invoke('getShopifyProductAvailability', { handle: shopifyHandle })
      .then(res => {
        const productData = res.data?.products?.[shopifyHandle];
        if (!productData) return;
        const v = productData.variants || [];
        setVariants(v);
        const firstAvail = v.find(x => x.availableForSale);
        setSelectedVariantId((firstAvail || v[0])?.id || null);
        setAvailabilityLoaded(true);
      })
      .catch(() => {
        setAvailabilityLoaded(true);
      });
  }, [shopifyHandle]);

  const handleClick = () => {
    if (!selectedVariantId) return;
    setLoading(true);
    window.location.href = buildCartUrl(selectedVariantId);
  };

  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const isUnavailable = availabilityLoaded && selectedVariant && !selectedVariant.availableForSale;
  const hasGrindOptions = variants.length > 1;

  return (
    <div className="w-full space-y-3">
      {hasGrindOptions && (
        <div className="flex gap-2">
          {variants.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVariantId(v.id)}
              className="flex-1 py-2.5 font-mono text-[10px] tracking-[0.25em] uppercase transition-all"
              style={{
                background: selectedVariantId === v.id ? accent : 'transparent',
                color: selectedVariantId === v.id ? '#080808' : `${accent}80`,
                border: `1px solid ${selectedVariantId === v.id ? accent : `${accent}30`}`,
                opacity: v.availableForSale ? 1 : 0.4,
              }}
              disabled={!v.availableForSale}
            >
              {v.title}
              {!v.availableForSale && ' (sold out)'}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={handleClick}
        disabled={loading || isUnavailable}
        className="w-full py-4 font-mono font-black text-[11px] tracking-[0.3em] uppercase transition-all disabled:opacity-60 btn-glow"
        style={{ background: isUnavailable ? 'rgba(100,100,100,0.3)' : accent, color: '#080808' }}
      >
        {loading ? 'Redirecting to Cart...' : isUnavailable ? 'Sold Out' : label}
      </button>
    </div>
  );
}