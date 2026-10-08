import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * PurchaseOptionSelector
 *
 * Fetches Shopify selling plan allocations for a product and renders
 * two accessible radio-card choices: "Buy once" and the Shopify-provided
 * subscription plan.
 *
 * - Defaults to Buy once. Never preselects subscription.
 * - Displays only Shopify-returned allocation prices — never hard-coded.
 * - If selling plans are unavailable, renders nothing (Buy once only).
 * - If the query fails, shows a fallback message and keeps Buy once available.
 *
 * Props:
 *   product  — the coreProducts product object (needs shopifyHandle)
 *   onChange  — callback({ mode, sellingPlanId, price, sellingPlanName })
 *   accent   — theme accent color
 */
export default function PurchaseOptionSelector({ product, onChange, accent = '#B7653E' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState('onetime');

  useEffect(() => {
    let cancelled = false;

    async function fetchPlans() {
      setLoading(true);
      setError(false);
      try {
        const response = await base44.functions.invoke('fetchProductSellingPlans', {
          handle: product.shopifyHandle,
        });
        if (cancelled) return;

        const productData = response.data?.product;
        if (!productData) {
          // Product not found or error — keep Buy once available
          setData(null);
          setLoading(false);
          return;
        }

        setData(productData);
        setLoading(false);

        // Notify parent of initial state (always Buy once by default)
        onChange({
          mode: 'onetime',
          sellingPlanId: null,
          price: productData.oneTimePrice ? parseFloat(productData.oneTimePrice) : product.price,
          sellingPlanName: null,
        });
      } catch (err) {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      }
    }

    fetchPlans();
    return () => { cancelled = true; };
  }, [product.shopifyHandle]);

  const handleSelect = (newMode) => {
    setMode(newMode);

    if (newMode === 'onetime') {
      onChange({
        mode: 'onetime',
        sellingPlanId: null,
        price: data?.oneTimePrice ? parseFloat(data.oneTimePrice) : product.price,
        sellingPlanName: null,
      });
    } else {
      const allocation = data?.sellingPlanAllocations?.[0];
      if (!allocation) return;

      onChange({
        mode: 'subscription',
        sellingPlanId: allocation.sellingPlanId,
        price: parseFloat(allocation.price),
        perDeliveryPrice: parseFloat(allocation.perDeliveryPrice),
        sellingPlanName: allocation.sellingPlanName,
        compareAtPrice: allocation.compareAtPrice ? parseFloat(allocation.compareAtPrice) : null,
      });
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="mb-4 animate-pulse">
        <div className="h-14 rounded-lg" style={{ background: '#f0ebe2' }} />
        <div className="mt-2 h-14 rounded-lg" style={{ background: '#f0ebe2' }} />
      </div>
    );
  }

  // Error or no selling plans — render nothing (Buy once is the only option).
  // The parent component defaults to one-time purchase, so no fallback UI is needed.
  // Do not show misleading "subscription unavailable" messaging — if the API call
  // fails, the product simply has no subscription option available.
  if (!data?.hasSellingPlans) {
    return null;
  }

  const allocation = data.sellingPlanAllocations[0];
  const subPrice = parseFloat(allocation.price);
  const oneTimePrice = data.oneTimePrice ? parseFloat(data.oneTimePrice) : product.price;
  const savings = oneTimePrice - subPrice;
  const savingsPercent = savings > 0 ? Math.round((savings / oneTimePrice) * 100) : 0;

  return (
    <div className="mb-4 flex flex-col gap-2" role="radiogroup" aria-label="Purchase option">
      {/* Buy once */}
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'onetime'}
        onClick={() => handleSelect('onetime')}
        className="flex items-center gap-3 rounded-lg border p-3 text-left transition-all"
        style={{
          borderColor: mode === 'onetime' ? accent : '#E4D8C9',
          borderWidth: mode === 'onetime' ? 2 : 1,
          background: mode === 'onetime' ? `${accent}08` : '#FFFDF8',
        }}
      >
        <span
          className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2"
          style={{ borderColor: mode === 'onetime' ? accent : '#E4D8C9' }}
        >
          {mode === 'onetime' && <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />}
        </span>
        <div className="flex-1">
          <p className="font-heading text-sm font-semibold" style={{ color: '#292622' }}>Buy once</p>
          <p className="font-mono text-xs uppercase tracking-[0.1em]" style={{ color: '#5F574F' }}>
            ${oneTimePrice.toFixed(2)} \u00b7 No recurring charge
          </p>
        </div>
      </button>

      {/* Subscribe */}
      <button
        type="button"
        role="radio"
        aria-checked={mode === 'subscription'}
        onClick={() => handleSelect('subscription')}
        className="flex items-center gap-3 rounded-lg border p-3 text-left transition-all"
        style={{
          borderColor: mode === 'subscription' ? accent : '#E4D8C9',
          borderWidth: mode === 'subscription' ? 2 : 1,
          background: mode === 'subscription' ? `${accent}08` : '#FFFDF8',
        }}
      >
        <span
          className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2"
          style={{ borderColor: mode === 'subscription' ? accent : '#E4D8C9' }}
        >
          {mode === 'subscription' && <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />}
        </span>
        <div className="flex-1">
          <p className="font-heading text-sm font-semibold" style={{ color: '#292622' }}>
            {allocation.sellingPlanName || 'Deliver every month'}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.1em]" style={{ color: '#5F574F' }}>
            ${subPrice.toFixed(2)}/delivery{savingsPercent > 0 ? ` \u00b7 Save ${savingsPercent}%` : ''} \u00b7 Renews automatically \u00b7 Cancel anytime
          </p>
        </div>
      </button>

      {/* Recurring billing terms — always visible so customers know exactly what they are subscribing to */}
      <div className="rounded-md p-3" style={{ background: `${accent}06`, border: `1px solid ${accent}20` }}>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] mb-1.5" style={{ color: accent }}>
          Recurring Billing Terms
        </p>
        <p className="font-heading text-xs" style={{ color: '#5F574F', lineHeight: 1.65 }}>
          You will be charged <strong style={{ color: '#292622' }}>${subPrice.toFixed(2)}</strong> every delivery cycle ({allocation.sellingPlanName || 'monthly'}). Your subscription renews automatically at this price until you cancel. Cancel anytime through your customer account. Taxes and shipping are calculated at checkout.
        </p>
      </div>
    </div>
  );
}