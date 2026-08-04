import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import BotanicalSectionHeader from './BotanicalSectionHeader';
import { colors } from '@/components/home/editorial/theme';

const standards = [
  ['Thoughtfully Selected', 'Ingredients chosen to support flavor, function, and an intentional daily experience.'],
  ['Small-Batch Approach', 'Crafted with close attention to consistency, character, and quality.'],
  ['Light-Roast Character', 'Bright, nuanced coffee made for drinkers who want flavor without an overly dark profile.'],
  ['Botanical Formulations', 'Plant ingredients brought together in approachable everyday blends.'],
  ['Packaging With Intention', 'Designed to balance visual beauty, product protection, and responsible choices.'],
];

export default function CraftStandards() {
  return <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.page }}><div className="mx-auto max-w-[1180px]"><BotanicalSectionHeader eyebrow="Our standards" title="Thoughtful From Source to Sip" /><div className="mt-12 grid gap-4 md:grid-cols-5">{standards.map(([title, copy]) => <article key={title} className="rounded-lg p-5" style={{ background: colors.card, border: `1px solid ${colors.border}` }}><CheckCircle2 className="h-6 w-6" style={{ color: colors.sage }} /><h3 className="mt-4 font-serif text-xl font-semibold" style={{ color: colors.espresso }}>{title}</h3><p className="mt-3 text-sm leading-6" style={{ color: colors.secondary }}>{copy}</p></article>)}</div></div></section>;
}