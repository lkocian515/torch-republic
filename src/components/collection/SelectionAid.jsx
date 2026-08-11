import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Concise "Choose this if…" selection aid.
 * items: [{ if: 'you want steady morning energy', pick: 'SunCap Rise', to: '/products/suncap-rise' }]
 * Uses only factual product attributes — no invented claims.
 */
export default function SelectionAid({ title = 'Choose this if…', items, accent = '#B7653E' }) {
  if (!items?.length) return null;
  return (
    <div className="max-w-4xl mx-auto px-6">
      <p className="eyebrow mb-4 text-center" style={{ color: accent }}>{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <Link
            key={i}
            to={it.to}
            className="card-torch flex items-center gap-3 p-4 group"
            style={{ textDecoration: 'none', minHeight: 'auto' }}
          >
            <div className="flex-1">
              <p className="font-heading text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>If {it.if}</p>
              <p className="font-serif font-semibold mt-1" style={{ color: 'hsl(var(--foreground))' }}>{it.pick}</p>
            </div>
            <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: accent }} />
          </Link>
        ))}
      </div>
    </div>
  );
}