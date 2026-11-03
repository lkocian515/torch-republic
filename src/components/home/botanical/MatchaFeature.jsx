import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '@/components/home/editorial/theme';

const IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/bd822ced2_matcha_category.png';

export default function MatchaFeature() {
  return (
    <section className="px-5 pb-16 md:px-10" style={{ background: colors.page }}>
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 overflow-hidden rounded-[28px] p-5 md:grid-cols-[1.05fr_0.95fr] md:p-8" style={{ background: '#FFFCF7', border: `1px solid ${colors.border}` }}>
        <div className="overflow-hidden rounded-[22px]" style={{ background: '#E9DFD1' }}>
          <img src={IMAGE} alt="Torch Republic ceremonial matcha blends with matcha powder and whisk" className="h-full min-h-[280px] w-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div className="px-1 py-4 md:px-5">
          <p className="font-heading text-sm uppercase tracking-[0.24em]" style={{ color: colors.gold }}>Ceremonial Matcha</p>
          <h2 className="mt-4 font-serif text-[clamp(2.1rem,4vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]" style={{ color: colors.forest }}>Calm energy, smooth focus, no whisk required.</h2>
          <p className="mt-5 max-w-xl text-base leading-8" style={{ color: colors.secondary }}>Meet The Monk and The Alchemist — instant ceremonial matcha blends for steady focus, mindful mornings, and clean afternoon rituals.</p>
          <Link to="/shop/matcha" className="mt-7 inline-flex items-center justify-center rounded px-7 py-3 font-heading text-sm font-semibold transition-opacity hover:opacity-85" style={{ background: colors.forest, color: colors.page }}>Shop Matcha</Link>
        </div>
      </div>
    </section>
  );
}