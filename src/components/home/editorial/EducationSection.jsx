import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { colors } from './theme';

const cards = [
  {
    title: 'The Journal',
    copy: 'Research-backed guides on mushroom coffee, instant coffee, matcha, ingredients, and daily rituals.',
    to: '/journal',
    cta: 'Read the Journal',
  },
  {
    title: 'Ingredients & Research',
    copy: 'Explore the ingredients behind Torch Republic blends — Lion’s Mane, Cordyceps, Reishi, Arabica coffee, and matcha.',
    to: '/ingredients',
    cta: 'Explore Ingredients',
  },
];

export default function EducationSection() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.parchment }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <p className="font-heading text-sm tracking-[0.22em] uppercase" style={{ color: colors.gold }}>Learn with us</p>
          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: colors.forest }}>Understand what’s in your cup</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {cards.map(({ title, copy, to, cta }) => (
            <Link key={title} to={to} className="group flex h-full flex-col rounded-lg p-7 transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ background: colors.card, border: `1px solid ${colors.border}` }}>
              <h3 className="font-serif text-2xl font-semibold" style={{ color: colors.espresso }}>{title}</h3>
              <p className="mt-3 flex-1 text-base leading-7" style={{ color: colors.secondary }}>{copy}</p>
              <span className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-heading text-sm font-semibold" style={{ color: colors.forest }}>
                {cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}