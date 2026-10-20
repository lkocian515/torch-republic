import React from 'react';
import { optionState } from '@/lib/specialEditions';
import EditionStatusChip from './EditionStatusChip';

/**
 * Grind / format selector.
 *
 * Every option stays selectable so a customer can preview the product, but the
 * availability label and the add-to-cart control follow the selected option's
 * real state (approved + mapped + available in Shopify).
 */
export default function GrindSelector({ options = [], value, onChange, legend = 'Choose your grind' }) {
  if (options.length < 2) return null;

  return (
    <fieldset>
      <legend className="eyebrow">{legend}</legend>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const state = optionState(option);
          const selected = value === option.key;
          return (
            <button
              key={option.key}
              type="button"
              onClick={() => onChange?.(option.key)}
              aria-pressed={selected}
              className="flex items-center justify-between gap-3 text-left"
              style={{
                background: selected ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
                border: `1px solid ${selected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                minHeight: 56,
                cursor: 'pointer',
              }}
            >
              <span>
                <span className="block font-heading font-semibold" style={{ fontSize: '0.9375rem' }}>
                  {option.label}
                </span>
                {option.format_label && (
                  <span className="mt-0.5 block font-mono uppercase" style={{ fontSize: '9px', letterSpacing: '0.16em', color: 'hsl(var(--muted-foreground))' }}>
                    {option.format_label}
                  </span>
                )}
              </span>
              <EditionStatusChip state={state.state} label={state.label} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}