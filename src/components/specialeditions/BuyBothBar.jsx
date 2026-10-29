import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { optionState, defaultOption, findOption, formatMoney } from '@/lib/specialEditions';
import { FREE_SHIPPING_THRESHOLD, FREE_SHIPPING_THRESHOLD_DISPLAY } from '@/lib/siteConfig';

/**
 * "Buy both" for a campaign collection.
 *
 * Adds the exact selected, available Shopify variants to the existing cart.
 * The combined price is the real sum of the selected options' Shopify prices,
 * and the control is disabled whenever either selection is not purchasable.
 */
export default function BuyBothBar({ editions = [], selections = {}, onAdd }) {
  const resolved = editions.map((edition) => {
    const option = findOption(edition, selections[edition.slug]) || defaultOption(edition);
    return { edition, option, state: optionState(option) };
  });

  const ready = editions.length > 1 && resolved.every((entry) => entry.state.purchasable);
  const currency = resolved.find((entry) => entry.state.currency)?.state.currency || 'USD';
  const combinedValue = ready
    ? resolved.reduce((sum, entry) => sum + Number(entry.state.price || 0), 0)
    : null;
  const combined = combinedValue === null ? null : formatMoney(combinedValue, currency);

  // The store's configured policy, stated plainly. No "just short" nudge and no
  // shipping promise: the exact amount needs an address, so checkout decides it.
  const shippingNote =
    combinedValue === null
      ? null
      : combinedValue >= FREE_SHIPPING_THRESHOLD
      ? `This total qualifies for free standard shipping (${FREE_SHIPPING_THRESHOLD_DISPLAY}).`
      : `Free standard shipping is available on orders of ${FREE_SHIPPING_THRESHOLD_DISPLAY}. Shipping for this order is calculated at checkout.`;

  return (
    <div
      className="flex flex-col items-center justify-between gap-4 md:flex-row"
      style={{
        background: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
      }}
    >
      <div className="text-center md:text-left">
        <p className="eyebrow">The Halloween Duo</p>
        <p className="mt-1 body" style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))' }}>
          {ready
            ? `Both selections, added together: ${combined}`
            : 'Buying both unlocks once both selections are available.'}
        </p>
        {shippingNote && (
          <p className="mt-1 body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>
            {shippingNote}
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!ready}
        onClick={() => ready && onAdd?.(resolved.map((entry) => ({ edition: entry.edition, option: entry.option })))}
        className="btn btn-primary w-full md:w-auto"
        style={{ minWidth: 220 }}
      >
        <ShoppingBag size={16} strokeWidth={2} />
        {ready ? `Buy both - ${combined}` : 'Buy both'}
      </button>
    </div>
  );
}