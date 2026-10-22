import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Leaf, Sprout, Trees } from 'lucide-react';
import BotanicalSectionHeader from './BotanicalSectionHeader';
import { colors } from '@/components/home/editorial/theme';

const ingredients = [
  ['Lion’s Mane', 'A distinctive functional mushroom traditionally used in wellness-focused routines.', Sprout],
  ['Reishi', 'An earthy mushroom ingredient valued for its deep character and place in traditional preparations.', Trees],
  ['Ceremonial Matcha', 'Vibrant finely ground tea crafted for a mindful, full-bodied ritual.', Leaf],
  ['Light-Roast Coffee', 'Bright, aromatic coffee selected to preserve nuance, character, and a lighter flavor experience.', Coffee],
];

export default function NatureMeetsFunction() {
  return <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.parchment }}><div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center"><div><BotanicalSectionHeader align="left" eyebrow="Ingredient field guide" title="Nature Meets Function"><p>Familiar daily rituals meet thoughtfully selected ingredients. Discover what makes each cup distinctly Torch Republic.</p></BotanicalSectionHeader><Link to="/ingredients" className="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-md px-6 font-heading font-semibold" style={{ background: colors.clay, color: colors.cream }}>Explore Our Ingredients</Link></div><div className="grid gap-4 sm:grid-cols-2">{ingredients.map(([name, copy, Icon]) => <article key={name} className="rounded-lg p-6" style={{ background: colors.card, border: `1px solid ${colors.border}` }}><Icon className="h-9 w-9" style={{ color: colors.sage }} /><h3 className="mt-5 font-serif text-2xl font-semibold" style={{ color: colors.espresso }}>{name}</h3><p className="mt-3 text-base leading-7" style={{ color: colors.secondary }}>{copy}</p></article>)}</div></div></section>;
}