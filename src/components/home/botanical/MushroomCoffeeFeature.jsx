import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from '@/components/home/editorial/theme';

const IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6fc7c6061_mushroom_coffee_category.png';

export default function MushroomCoffeeFeature() {
  return (
    <section className="px-5 py-16 md:px-10" style={{ background: colors.page }}>
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 overflow-hidden rounded-[28px] p-5 md:grid-cols-[1.05fr_0.95fr] md:p-8" style={{ background: '#FFFDF8', border: `1px solid ${colors.border}` }}>
        <div className="overflow-hidden rounded-[22px]" style={{ background: '#E9DFD1' }}>
          <img src={IMAGE} alt="Torch Republic mushroom coffee blends with Lion's Mane and Chaga" className="h-full min-h-[280px] w-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div className="px-1 py-4 md:px-5">
          <p className="font-heading text-sm uppercase tracking-[0.24em]" style={{ color: colors.gold }}>Mushroom Coffee Rituals</p>
          <h2 className="mt-4 font-serif text-[clamp(2.1rem,4vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.045em]" style={{ color: colors.forest }}>Coffee-forward clarity, crafted with Lion's Mane + Chaga.</h2>
          <p className="mt-5 max-w-xl text-base leading-8" style={{ color: colors.secondary }}>Explore SunCap Rise, MoonCap Restore, and GlowMind Clarity — three instant mushroom coffee blends made for focus, rhythm, and a more intentional daily cup.</p>
          <Link to="/shop/instant-mushroom-coffee" className="mt-7 inline-flex items-center justify-center rounded px-7 py-3 font-heading text-sm font-semibold transition-opacity hover:opacity-85" style={{ background: colors.forest, color: colors.page }}>Shop Mushroom Coffee</Link>
        </div>
      </div>
    </section>
  );
}