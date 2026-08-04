import React from 'react';
import { Sun, CupSoda, Moon } from 'lucide-react';
import BotanicalSectionHeader from './BotanicalSectionHeader';
import { colors } from '@/components/home/editorial/theme';

const panels = [
  ['Begin with Intention', 'Start the day with a bright light roast or functional coffee prepared for a clear, grounded morning.', Sun],
  ['Reset the Pace', 'Create a quiet pause with vibrant matcha or a smooth botanical blend.', CupSoda],
  ['Return to Yourself', 'Make room for a slower, more intentional moment with an earthy, comforting blend.', Moon],
];

export default function DailyRitualStory() {
  return <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.cream }}><div className="mx-auto max-w-[1180px]"><BotanicalSectionHeader eyebrow="Your daily ritual" title="Made for the Rhythm of Your Day" /><div className="mt-12 grid gap-5 lg:grid-cols-3">{panels.map(([title, copy, Icon], i) => <article key={title} className="min-h-[300px] rounded-lg p-7" style={{ background: i === 1 ? colors.parchment : colors.card, border: `1px solid ${colors.border}` }}><div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: `${colors.gold}20`, color: colors.gold }}><Icon className="h-7 w-7" /></div><h3 className="mt-10 font-serif text-3xl font-semibold" style={{ color: colors.espresso }}>{title}</h3><p className="mt-4 text-lg leading-8" style={{ color: colors.secondary }}>{copy}</p></article>)}</div></div></section>;
}