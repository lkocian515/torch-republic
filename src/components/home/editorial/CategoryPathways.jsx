import React from 'react';
import EditorialButton from './EditorialButton';
import EditorialProductCard from './EditorialProductCard';
import { colors, routes } from './theme';

const cats = [
  ['classic', 'Classic coffee', 'Pure, convenient coffee for the moments when you want to keep it simple.', 'Torchbearer · Ember Reserve', 'Explore Classic Coffee', routes.classic, colors.coffee],
  ['mushroom', 'Mushroom coffee', 'Light-roast instant coffee blended with Lion’s Mane, Cordyceps and Reishi.', 'Suncap Rise · GlowMind Clarity · Mooncap Restore', 'Explore Mushroom Coffee', routes.mushroom, colors.sage],
  ['matcha', 'Ceremonial matcha', 'Japanese matcha powder for traditional preparation, iced drinks, and everyday lattes.', 'The Monk · The Alchemist', 'Explore Matcha', routes.matcha, colors.matcha],
];

export default function CategoryPathways({ products }) {
  return <section className="px-5 py-16 md:px-10" style={{ background: colors.page }}><div className="mx-auto max-w-[1280px]"><div className="max-w-3xl"><h2 className="font-serif text-5xl font-bold tracking-[-0.03em]" style={{ color: colors.text }}>Choose your ritual</h2><p className="mt-5 text-lg leading-8" style={{ color: colors.secondary }}>Some mornings call for a straightforward cup. Others ask for something more considered. Explore classic instant coffee, mushroom coffee blended with Lion’s Mane, Cordyceps and Reishi, and ceremonial matcha for a different kind of daily ritual.</p></div><div className="mt-12 space-y-12">{cats.map(([key, title, body, line, cta, route, accent], i) => <div key={key} className="grid grid-cols-1 gap-6 lg:grid-cols-[0.32fr_0.68fr] lg:items-start"><div className="p-6" style={{ background: colors.card, border: `1px solid ${colors.border}` }}><div className="mb-5 h-px w-20" style={{ background: accent }} /><h3 className="font-serif text-3xl font-bold" style={{ color: colors.text }}>{title}</h3><p className="mt-3 text-base leading-7" style={{ color: colors.secondary }}>{body}</p><p className="mt-4 text-sm" style={{ color: colors.text }}>{line}</p><div className="mt-6"><EditorialButton to={route} variant={i === 0 ? 'primary' : 'secondary'}>{cta}</EditorialButton></div></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{products.filter(p => p.group === key).map((p, idx) => <EditorialProductCard key={p.id} product={p} index={idx} />)}</div></div>)}</div></div></section>;
}