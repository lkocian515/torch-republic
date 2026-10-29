import React, { useId } from 'react';
import { optionState } from '@/lib/specialEditions';
import EditionStatusChip from './EditionStatusChip';

/**
 * Grind / format selector.
 *
 * A native radio group: the choices are mutually exclusive, so a screen reader
 * and a keyboard user get the real control rather than a row of buttons.
 * Every option stays selectable so a customer can preview the product, and the
 * availability label follows the selected option's real state.
 */
export default function GrindSelector({ options = [], value, onChange, legend = 'Choose your grind', name }) {
  const groupName = useId();
  if (options.length < 2) return null;

  return (
    <fieldset>
      <legend className="eyebrow">{legend}</legend>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const state = optionState(option);
          const selected = value === option.key;
          return (
            <label
              key={option.key}
              className="flex cursor-pointer items-center justify-between gap-3 text-left focus-within:ring-2 focus-within:ring-offset-2"
              style={{
                background: selected ? 'hsl(var(--secondary))' : 'hsl(var(--card))',
                border: `1px solid ${selected ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                minHeight: 56,
              }}
            >
              <input
                type="radio"
                className="sr-only"
                name={name || `grind-${groupName}`}
                value={option.key}
                checked={selected}
                onChange={() => onChange?.(option.key)}
              />
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
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}