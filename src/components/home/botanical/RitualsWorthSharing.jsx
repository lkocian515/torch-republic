import React from 'react';
import { Link } from 'react-router-dom';

const colors = { page: '#F7F2E9', sage: '#EEF2E8', card: '#FFFCF7', text: '#264A35', body: '#5E4639', border: '#B89A6D', accent: '#9B4E2F' };

export default function RitualsWorthSharing() {
  return <section className="px-5 py-16 md:px-10" style={{ background: colors.sage }}>
    <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border p-8 md:grid-cols-[1fr_auto] md:items-center" style={{ background: colors.card, borderColor: colors.border }}>
      <div><p className="mb-3 font-heading text-sm uppercase tracking-[0.3em]" style={{ color: colors.accent }}>Community</p><h2 className="font-serif text-4xl font-bold" style={{ color: colors.text }}>Rituals Worth Sharing</h2><p className="mt-4 max-w-2xl font-heading leading-8" style={{ color: colors.body }}>Read customer reviews or meet community members who make Torch Republic part of their daily routines.</p></div>
      <div className="flex flex-col gap-3 sm:flex-row md:flex-col"><Link to="/reviews" className="inline-flex min-h-[48px] items-center justify-center rounded-full px-7 py-3 font-heading font-semibold" style={{ background: colors.text, color: colors.page }}>Read Customer Reviews</Link><Link to="/customer-spotlight" className="inline-flex min-h-[48px] items-center justify-center rounded-full border px-7 py-3 font-heading font-semibold" style={{ borderColor: colors.accent, color: colors.accent }}>Meet the Community</Link></div>
    </div>
  </section>;
}