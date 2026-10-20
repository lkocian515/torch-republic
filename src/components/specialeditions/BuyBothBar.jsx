import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { optionState, defaultOption, findOption, formatMoney } from '@/lib/specialEditions';

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
  const combined = ready
    ? formatMoney(resolved.reduce((sum, entry) => sum + Number(entry.state.price || 0), 0), currency)
    : null;

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
            : 'Both coffees are coming soon. Buying both unlocks once each selection is approved and available.'}
        </p>
      </div>

      <button
        type="button"
        disabled={!ready}
        onClick={() => ready && onAdd?.(resolved.map((entry) => ({ edition: entry.edition, option: entry.option })))}
        className="btn btn-primary w-full md:w-auto"
        style={{ minWidth: 220 }}
      >
        <ShoppingBag size={16} strokeWidth={2} />
        {ready ? `Buy both - ${combined}` : 'Coming soon'}
      </button>
    </div>
  );
}