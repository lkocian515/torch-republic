import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Coffee, Leaf, Moon } from 'lucide-react';
import BotanicalSectionHeader from './BotanicalSectionHeader';
import { colors, routes } from '@/components/home/editorial/theme';

const cards = [
  { title: 'Clear Focus', copy: 'Thoughtful blends for focused mornings and intentional work.', to: routes.mushroom, icon: Brain, tone: colors.sage },
  { title: 'Calm & Restore', copy: 'Grounding blends for slower moments and balanced routines.', to: '/products/mooncap-restore', icon: Moon, tone: '#7F8A72' },
  { title: 'Balanced Energy', copy: 'Light-roast coffee created for bright flavor and a smoother daily ritual.', to: routes.classic, icon: Coffee, tone: colors.clay },
  { title: 'Ceremonial Matcha', copy: 'Vibrant matcha made for mindful preparation and everyday intention.', to: routes.matcha, icon: Leaf, tone: '#6E7A4D' },
];

export default function ShopByRitual() {
  return <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.cream }}><div className="mx-auto max-w-[1280px]"><BotanicalSectionHeader eyebrow="Shop by ritual" title="Find Your Ritual"><p>Choose the feeling, flavor, or moment that fits your day.</p></BotanicalSectionHeader><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{cards.map(({ title, copy, to, icon: Icon, tone }) => <Link key={title} to={to} className="group min-h-[260px] overflow-hidden rounded-lg p-6 transition-transform duration-300 hover:-translate-y-1" style={{ background: colors.card, border: `1px solid ${colors.border}`, boxShadow: '0 18px 50px rgba(53,38,29,0.07)' }}><div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full" style={{ background: `${tone}20`, color: tone }}><Icon className="h-9 w-9" /></div><h3 className="font-serif text-3xl font-semibold" style={{ color: colors.espresso }}>{title}</h3><p className="mt-3 text-base leading-7" style={{ color: colors.secondary }}>{copy}</p><span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold" style={{ color: colors.forest }}>Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>;
}