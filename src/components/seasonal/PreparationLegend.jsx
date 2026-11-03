import React from 'react';
import { INSTANT_PREP_LABEL, SEASONAL_PREP_LABEL } from '@/lib/seasonalCalendar';

/**
 * The two prep truths, stated side by side wherever a customer chooses a
 * coffee. Not every Torch Republic product is instant, and this is the plainest
 * place to say so.
 */
export default function PreparationLegend({ tone = 'light' }) {
  const items = [
    { label: 'Instant Originals', text: INSTANT_PREP_LABEL.replace('Instant Originals — ', '') },
    { label: 'Seasonal Reserve', text: SEASONAL_PREP_LABEL.replace('Seasonal Reserve — ', '') },
  ];

  const border = tone === 'dark' ? 'rgba(244,239,231,0.22)' : 'hsl(var(--border))';
  const label = tone === 'dark' ? 'rgba(244,239,231,0.62)' : 'hsl(var(--muted-foreground))';
  const text = tone === 'dark' ? '#F4EFE7' : 'hsl(var(--foreground))';

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((item) => (
        <li
          key={item.label}
          style={{
            border: `1px solid ${border}`,
            borderRadius: 4,
            padding: '0.75rem 0.875rem',
            background: tone === 'dark' ? 'rgba(255,255,255,0.03)' : '#FFFCF7',
          }}
        >
          <p
            className="font-mono uppercase"
            style={{ fontSize: '0.625rem', letterSpacing: '0.14em', margin: 0, color: label }}
          >
            {item.label}
          </p>
          <p className="body" style={{ margin: '0.35rem 0 0', fontSize: '0.9375rem', color: text }}>
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}