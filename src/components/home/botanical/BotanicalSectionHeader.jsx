import React from 'react';
import { colors } from '@/components/home/editorial/theme';

export default function BotanicalSectionHeader({ eyebrow, title, children, align = 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="font-heading text-sm tracking-[0.22em] uppercase" style={{ color: colors.gold }}>{eyebrow}</p>}
      <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.7rem)] font-semibold leading-[1.02] tracking-[-0.035em]" style={{ color: colors.forest }}>{title}</h2>
      {children && <div className="mt-4 text-lg leading-8" style={{ color: colors.secondary }}>{children}</div>}
    </div>
  );
}