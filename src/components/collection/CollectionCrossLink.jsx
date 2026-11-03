import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * A single, restrained cross-link to a relevant ritual / quiz / ingredient / subscription page.
 */
export default function CollectionCrossLink({ to, label, sub, accent = '#9B4E2F' }) {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <Link
        to={to}
        className="card-torch flex items-center justify-between gap-4 p-5 group"
        style={{ textDecoration: 'none', minHeight: 'auto' }}
      >
        <div>
          <p className="font-serif font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{label}</p>
          {sub && <p className="body text-sm mt-0.5">{sub}</p>}
        </div>
        <ArrowRight className="w-5 h-5 flex-shrink-0 opacity-60 group-hover:translate-x-1 transition-transform" style={{ color: accent }} />
      </Link>
    </div>
  );
}