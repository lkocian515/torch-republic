import React from 'react';
import { Link } from 'react-router-dom';
import { colors, routes } from './theme';

export default function SubscriptionSection() {
  return (
    <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.forest, color: colors.cream }}>
      <div className="mx-auto max-w-[1100px] grid gap-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-heading text-sm tracking-[0.22em] uppercase" style={{ color: colors.sage }}>Subscribe &amp; Save</p>
          <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: colors.cream }}>Build a ritual that shows up for you</h2>
          <p className="mt-4 max-w-xl text-lg leading-8" style={{ color: 'rgba(251,248,241,0.82)' }}>
            Subscribe to your favorite blend and save 20% on every order. Pause, skip, or cancel anytime in two clicks — your ritual, your pace.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
          <Link to={routes.ritual} className="inline-flex min-h-[48px] items-center justify-center rounded-md px-6 font-heading text-sm font-semibold transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ background: colors.cream, color: colors.forest }}>
            Build Your Ritual
          </Link>
          <Link to="/subscription" className="inline-flex min-h-[48px] items-center justify-center rounded-md px-6 font-heading text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: colors.cream, borderRadius: '4px' }}>
            How subscription works
          </Link>
        </div>
      </div>
    </section>
  );
}