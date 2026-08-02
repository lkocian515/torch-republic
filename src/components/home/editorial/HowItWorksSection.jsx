import React from 'react';
import { colors } from './theme';

const steps = [['01', 'Choose the moment', 'Start with what your day calls for: classic coffee, mushroom coffee, or matcha.'], ['02', 'Prepare your cup', 'Follow the preparation instructions for your product and make it hot, iced, or your own.'], ['03', 'Carry the ritual', 'Return to the cup that fits—or keep more than one ritual ready for the changing pace of the day.']];
export default function HowItWorksSection() {
  return <section className="px-5 py-16 md:px-10" style={{ background: colors.page }}><div className="mx-auto max-w-[900px]"><h2 className="font-serif text-5xl font-bold tracking-[-0.03em]" style={{ color: colors.text }}>How it works</h2><div className="mt-8">{steps.map(([n, title, body]) => <div key={n} className="grid grid-cols-[64px_1fr] gap-5 border-t py-7" style={{ borderColor: colors.border }}><p className="font-heading text-sm" style={{ color: colors.coffee }}>{n}</p><div><h3 className="font-serif text-3xl font-bold" style={{ color: colors.text }}>{title}</h3><p className="mt-3 text-lg leading-8" style={{ color: colors.secondary }}>{body}</p></div></div>)}</div></div></section>;
}