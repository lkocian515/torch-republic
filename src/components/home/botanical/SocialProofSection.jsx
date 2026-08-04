import React from 'react';
import { Link } from 'react-router-dom';
import BotanicalSectionHeader from './BotanicalSectionHeader';
import { colors } from '@/components/home/editorial/theme';

export default function SocialProofSection() {
  return <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.cream }}><div className="mx-auto max-w-4xl rounded-2xl px-6 py-12 text-center md:px-12" style={{ background: colors.card, border: `1px solid ${colors.border}` }}><BotanicalSectionHeader eyebrow="Rituals worth returning to" title="Quality, flavor, and intention in every cup"><p>Everyday rituals become meaningful when ingredients, preparation, and a sense of care come together.</p></BotanicalSectionHeader><Link to="/reviews" className="mt-8 inline-flex min-h-[46px] items-center justify-center rounded-md px-6 font-heading font-semibold" style={{ border: `1px solid ${colors.forest}`, color: colors.forest }}>Read Reviews</Link></div></section>;
}