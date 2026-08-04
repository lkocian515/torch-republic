import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import BotanicalSectionHeader from './BotanicalSectionHeader';
import { colors } from '@/components/home/editorial/theme';

const cards = [
  ['Understanding Mushroom Coffee', 'A clear guide to functional mushroom coffee and daily rituals.', '/why-mushroom-coffee'],
  ['Matcha for Mindful Moments', 'Explore ceremonial matcha as part of an intentional routine.', '/why-matcha'],
  ['Brew Better Anywhere', 'Learn why instant coffee can still feel thoughtful and premium.', '/instant-coffee-for-energy'],
];

export default function JournalEducationSection() {
  return <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.page }}><div className="mx-auto max-w-[1180px]"><BotanicalSectionHeader eyebrow="The Torch Journal" title="Brewing guidance and ingredient stories"><p>Brewing guidance, ingredient stories, and ideas for building a more intentional ritual.</p></BotanicalSectionHeader><div className="mt-10 grid gap-5 md:grid-cols-3">{cards.map(([title, copy, to]) => <Link key={title} to={to} className="group rounded-lg p-6" style={{ background: colors.card, border: `1px solid ${colors.border}` }}><BookOpen className="h-7 w-7" style={{ color: colors.gold }} /><h3 className="mt-8 font-serif text-2xl font-semibold" style={{ color: colors.espresso }}>{title}</h3><p className="mt-3 text-base leading-7" style={{ color: colors.secondary }}>{copy}</p><span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold" style={{ color: colors.forest }}>Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>;
}