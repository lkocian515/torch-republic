import React from 'react';
import { colors } from './theme';

const points = [
  { title: 'Instant format', body: 'No machine, no pods, no cleanup. Just add hot water and stir.' },
  { title: 'Single-origin Arabica', body: 'Highland-grown Papua New Guinea coffee, freeze-dried to preserve flavor.' },
  { title: 'Functional mushroom blends', body: 'Lion’s Mane, Cordyceps and Reishi paired with premium instant coffee.' },
  { title: 'Ceremonial-grade matcha', body: 'Whisked-quality matcha in a convenient instant format.' },
  { title: 'Thoughtful sourcing', body: 'Small-batch crafted with no artificial flavors, fillers, or added sugar.' },
  { title: 'Ships fast from Texas', body: 'Free shipping $50+ and a 30-day satisfaction guarantee.' },
];

export default function WhyTorchRepublic() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.page }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-2xl">
          <p className="font-heading text-sm tracking-[0.22em] uppercase" style={{ color: colors.gold }}>Why Torch Republic</p>
          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: colors.forest }}>A simpler, better daily cup</h2>
          <p className="mt-4 text-lg leading-8" style={{ color: colors.secondary }}>Built for people who want specialty-coffee taste and intentional ingredients without the equipment or the clutter.</p>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {points.map(({ title, body }) => (
            <div key={title} className="border-l pl-5" style={{ borderColor: colors.gold }}>
              <h3 className="font-serif text-xl font-semibold" style={{ color: colors.espresso }}>{title}</h3>
              <p className="mt-2 text-base leading-7" style={{ color: colors.secondary }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}