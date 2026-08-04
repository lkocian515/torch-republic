import React from 'react';
import EditorialButton from './EditorialButton';
import { colors, routes } from './theme';

const HERO_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/fa3d3fe8d_ChatGPTImageAug2202607_23_10AM.png';

export default function EditorialHero() {
  return (
    <section className="relative overflow-hidden px-5 py-12 md:px-10 md:py-20" style={{ background: colors.page }}>
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-full opacity-40" style={{ background: `radial-gradient(circle at 12% 18%, ${colors.sage}33, transparent 24%), radial-gradient(circle at 84% 12%, ${colors.gold}22, transparent 25%)` }} />
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 lg:min-h-[640px] lg:grid-cols-[0.4fr_0.6fr]">
        <div>
          <p className="font-heading text-sm uppercase tracking-[0.24em]" style={{ color: colors.gold }}>Botanical coffee for daily wellness</p>
          <h1 className="mt-5 font-serif text-[clamp(3.2rem,7vw,6.2rem)] font-semibold leading-[0.9] tracking-[-0.055em]" style={{ color: colors.forest }}>Rooted in Nature.<br />Made for Your Ritual.</h1>
          <p className="mt-6 max-w-xl text-[clamp(1.05rem,1.5vw,1.22rem)] leading-8" style={{ color: colors.secondary }}>Small-batch light roast coffee, ceremonial matcha, and functional mushroom blends thoughtfully crafted for clarity, balanced energy, calm, and everyday wellness.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><EditorialButton to={routes.shop}>Explore the Collection</EditorialButton><EditorialButton to={routes.ritual} variant="secondary">Find Your Ritual</EditorialButton></div>
          <div className="mt-7 grid gap-3 text-sm sm:grid-cols-3" style={{ color: colors.moss }}>{['Small-Batch Crafted', 'Thoughtfully Sourced', 'Botanical Ingredients'].map(item => <span key={item} className="border-l pl-3" style={{ borderColor: colors.gold }}>{item}</span>)}</div>
        </div>
        <div className="overflow-hidden rounded-[28px] shadow-2xl" style={{ background: '#E9DFD1', border: `1px solid ${colors.border}` }}>
          <img src={HERO_IMAGE} alt="Torch Republic coffee, matcha, and mushroom blends in a warm botanical setting" className="h-full min-h-[360px] w-full object-cover" loading="eager" decoding="async" />
        </div>
      </div>
    </section>
  );
}