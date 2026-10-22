import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { colors, routes } from './theme';
import { MUSHROOM_COLLECTION_IMAGE, CLASSIC_COLLECTION_IMAGE, MATCHA_COLLECTION_IMAGE, FINAL_PRODUCT_IMAGE_URLS } from '@/lib/mushroomProducts';

const cards = [
  {
    title: 'Mushroom Coffee',
    copy: 'Instant coffee blended with Lion’s Mane, Cordyceps and Reishi for focused daily rituals.',
    to: routes.mushroom,
    image: MUSHROOM_COLLECTION_IMAGE,
    alt: 'Torch Republic mushroom coffee featuring Lion’s Mane, Cordyceps and Reishi',
  },
  {
    title: 'Classic Coffee',
    copy: 'Single-origin instant coffee — no machine, no pods, just add hot water.',
    to: routes.classic,
    image: CLASSIC_COLLECTION_IMAGE,
    alt: 'Torch Republic classic single-origin instant coffee',
  },
  {
    title: 'Ceremonial Matcha',
    copy: 'Ceremonial-grade matcha for calm, intentional rituals and lattes.',
    to: routes.matcha,
    image: MATCHA_COLLECTION_IMAGE,
    alt: 'Torch Republic ceremonial-grade matcha',
  },
  {
    title: 'The Blends',
    copy: 'Compare every Torch Republic blend in one place.',
    to: '/blends',
    image: FINAL_PRODUCT_IMAGE_URLS['glowmind-clarity-blend'],
    alt: 'Torch Republic blend collection overview',
  },
];

export default function RitualCategories() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.cream }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <p className="font-heading text-sm tracking-[0.22em] uppercase" style={{ color: colors.gold }}>Shop by ritual</p>
          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: colors.forest }}>Find your ritual</h2>
          <p className="mt-4 text-lg leading-8" style={{ color: colors.secondary }}>Choose the feeling, flavor, or moment that fits your day.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, copy, to, image, alt }) => (
            <Link
              key={title}
              to={to}
              className="group flex h-full flex-col overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: colors.card, border: `1px solid ${colors.border}`, boxShadow: '0 12px 36px rgba(53,38,29,0.06)' }}
            >
              <div className="aspect-[4/5] overflow-hidden" style={{ background: colors.parchment }}>
                <img src={image} alt={alt} loading="lazy" decoding="async" width={400} height={500} className="h-full w-full object-contain p-5" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-2xl font-semibold leading-tight" style={{ color: colors.espresso }}>{title}</h3>
                <p className="mt-2 flex-1 text-base leading-7" style={{ color: colors.secondary }}>{copy}</p>
                <span className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 font-heading text-sm font-semibold" style={{ color: colors.forest }}>
                  Shop {title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}