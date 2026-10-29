import React, { useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { findOption, defaultOption, optionState, formatMoney } from '@/lib/specialEditions';
import {
  FREE_SHIPPING_THRESHOLD,
  FREE_SHIPPING_THRESHOLD_DISPLAY,
  SHIP_TIME_DISPLAY,
} from '@/lib/siteConfig';
import GrindSelector from './GrindSelector';

/**
 * The purchase panel for a two-coffee set.
 *
 * Everything in the panel comes from the editions themselves: the exact
 * contents, the package sizes, the variants each coffee actually offers, and
 * their live prices. A coffee that only exists ground never shows a whole-bean
 * choice, and the combined purchase is disabled — with the reason named — as
 * soon as one half cannot be ordered.
 */
export default function DuoPurchasePanel({ editions = [], selections = {}, onSelect, onAdd, name, description }) {
  const [qty, setQty] = useState(1);

  const resolved = editions.map((edition) => {
    const option = findOption(edition, selections[edition.slug]) || defaultOption(edition);
    return { edition, option, state: optionState(option) };
  });

  const unavailable = resolved.filter((entry) => !entry.state.purchasable).map((entry) => entry.edition.name);
  const ready = resolved.length > 1 && unavailable.length === 0;
  const currency = resolved.find((entry) => entry.state.currency)?.state.currency || 'USD';
  const combinedValue = ready ? resolved.reduce((sum, entry) => sum + Number(entry.state.price || 0), 0) : null;
  const combined = combinedValue === null ? null : formatMoney(combinedValue, currency);
  const total = combinedValue === null ? null : formatMoney(combinedValue * qty, currency);

  return (
    <div
      style={{
        background: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.25rem, 3vw, 1.75rem)',
      }}
    >
      <p className="eyebrow">The set</p>
      <h2 className="h2 mt-2" style={{ marginBottom: 0 }}>{name || 'Two coffees, one order'}</h2>
      {description && (
        <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {description}
        </p>
      )}

      {/* Exact contents */}
      <div className="mt-6">
        <p className="eyebrow">What&rsquo;s included</p>
        <ul className="mt-3 flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {resolved.map(({ edition, option, state }) => (
            <li
              key={edition.id}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '0.625rem' }}
            >
              <span className="font-heading font-semibold" style={{ fontSize: '0.9375rem' }}>
                {edition.name}
              </span>
              <span className="body" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                {[option?.label, edition.size].filter(Boolean).join(' · ') || 'Package size confirmed at launch'}
                {state.purchasable ? '' : ' — unavailable'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Variant choices — only the formats each coffee actually offers */}
      {resolved.some(({ edition }) => (edition.options || []).length > 1) && (
        <div className="mt-6 flex flex-col gap-5">
          {resolved.map(({ edition }) =>
            (edition.options || []).length > 1 ? (
              <GrindSelector
                key={edition.id}
                options={edition.options}
                value={findOption(edition, selections[edition.slug])?.key || defaultOption(edition)?.key}
                onChange={(key) => onSelect?.(edition.slug, key)}
                legend={edition.name}
                name={`grind-${edition.slug}`}
              />
            ) : null,
          )}
        </div>
      )}

      {/* Combined price */}
      <div className="mt-6" aria-live="polite">
        <p className="font-heading font-semibold" style={{ fontSize: '1.5rem', margin: 0 }}>
          {combined || (
            <span className="body" style={{ fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))' }}>
              Combined price shown once both coffees are available
            </span>
          )}
        </p>
        {combined && (
          <p className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', margin: '0.25rem 0 0' }}>
            Both bags, one price. Each bag is added to your cart as its own line.
          </p>
        )}
      </div>

      {/* Shipping — the configured policy, stated plainly */}
      <div
        className="mt-4"
        style={{ borderTop: '1px solid hsl(var(--border))', paddingTop: '0.875rem' }}
      >
        <p className="body" style={{ fontSize: '0.875rem', margin: 0 }}>
          {SHIP_TIME_DISPLAY}. Free standard shipping on orders of {FREE_SHIPPING_THRESHOLD_DISPLAY}.
        </p>
        <p className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', margin: '0.35rem 0 0' }}>
          Orders under {formatMoney(FREE_SHIPPING_THRESHOLD)} have shipping calculated at checkout — the exact amount
          depends on your address.
        </p>
      </div>

      {/* Quantity */}
      <div className="mt-5 flex items-center gap-4">
        <span className="font-mono uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'hsl(var(--muted-foreground))' }}>
          Quantity
        </span>
        <div className="flex items-center" style={{ border: '1px solid hsl(var(--border))', borderRadius: 8, overflow: 'hidden' }}>
          <button
            type="button"
            onClick={() => setQty((value) => Math.max(1, value - 1))}
            style={{ width: 44, height: 44, background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--foreground))' }}
            aria-label="Decrease quantity"
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          <span className="w-10 text-center font-mono" style={{ fontSize: '0.9375rem' }} aria-live="polite">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((value) => Math.min(10, value + 1))}
            style={{ width: 44, height: 44, background: 'none', border: 'none', cursor: 'pointer', color: 'hsl(var(--foreground))' }}
            aria-label="Increase quantity"
          >
            <Plus size={14} aria-hidden="true" />
          </button>
        </div>
        {total && (
          <span className="body" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
            {total} total
          </span>
        )}
      </div>

      <button
        type="button"
        disabled={!ready}
        onClick={() => ready && onAdd?.(resolved.map(({ edition, option }) => ({ edition, option })), qty)}
        className="btn btn-primary mt-5 w-full"
      >
        <ShoppingBag size={16} strokeWidth={2} aria-hidden="true" />
        Add Both to Cart{combined ? ` · ${combined}` : ''}
      </button>

      {!ready && (
        <p className="body mt-3" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
          {unavailable.length === 1
            ? `${unavailable[0]} can’t be ordered right now, so the pair can’t be added together.`
            : `${unavailable.join(' and ')} can’t be ordered right now, so the pair can’t be added together.`}
        </p>
      )}
    </div>
  );
}