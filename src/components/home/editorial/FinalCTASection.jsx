import React from 'react';
import EditorialButton from './EditorialButton';
import { colors, routes } from './theme';

export default function FinalCTASection() {
  return <section className="px-5 py-16 text-center md:px-10" style={{ background: colors.card, borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}><div className="mx-auto max-w-3xl"><h2 className="font-serif text-5xl font-bold tracking-[-0.03em]" style={{ color: colors.text }}>Coffee With Purpose</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8" style={{ color: colors.secondary }}>Coffee, matcha, and botanical blends designed around the moments that make up your day.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><EditorialButton to={routes.ritual}>Find Your Ritual</EditorialButton><EditorialButton to={routes.shop} variant="secondary">Explore the Collection</EditorialButton></div></div></section>;
}