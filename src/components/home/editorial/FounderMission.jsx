import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from './theme';

export default function FounderMission() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.cream }}>
      <div className="mx-auto max-w-[1100px] grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-heading text-sm tracking-[0.22em] uppercase" style={{ color: colors.gold }}>Our story</p>
          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: colors.forest }}>Built for a better morning</h2>
          <p className="mt-4 text-lg leading-8" style={{ color: colors.secondary }}>
            Torch Republic began with a simple question: why does a good daily cup need a machine, pods, or compromise? We set out to make thoughtful coffee, mushroom blends, and matcha for people who care about what’s in their ritual.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/founder-story" className="inline-flex min-h-[48px] items-center justify-center rounded-md px-6 font-heading text-sm font-semibold transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ background: colors.forest, color: colors.cream }}>
              Read the founder story
            </Link>
            <Link to="/our-story" className="inline-flex min-h-[48px] items-center font-heading text-sm font-semibold underline underline-offset-4 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: colors.forest, borderRadius: '4px' }}>
              Our mission
            </Link>
          </div>
        </div>
        <div className="rounded-lg p-8" style={{ background: colors.parchment, border: `1px solid ${colors.border}` }}>
          <p className="font-serif text-2xl italic leading-8" style={{ color: colors.espresso }}>
            “A daily ritual should lower barriers, not add them.”
          </p>
          <p className="mt-5 font-heading text-sm" style={{ color: colors.secondary }}>— The Torch Republic founding principle</p>
        </div>
      </div>
    </section>
  );
}