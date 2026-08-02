import React from 'react';
import EditorialButton from './EditorialButton';
import { colors, comparisons, routes } from './theme';

export default function ComparisonSection() {
  return <section className="px-5 py-16 md:px-10" style={{ background: colors.page }}><div className="mx-auto max-w-[980px]"><h2 className="font-serif text-5xl font-bold tracking-[-0.03em]" style={{ color: colors.text }}>Find your place in the collection</h2><div className="mt-8" style={{ border: `1px solid ${colors.border}` }}>{comparisons.map(([need, product]) => <div key={product} className="grid grid-cols-1 gap-2 border-b p-5 last:border-b-0 md:grid-cols-[1fr_240px]" style={{ borderColor: colors.border, background: colors.card }}><p className="text-base" style={{ color: colors.secondary }}>{need}</p><p className="font-heading font-semibold" style={{ color: colors.text }}>{product}</p></div>)}</div><div className="mt-8"><EditorialButton to={routes.ritual}>Take the Ritual Finder</EditorialButton></div></div></section>;
}