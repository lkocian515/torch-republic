import React from 'react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { COMING_SOON_COPY } from '@/lib/specialEditions';
import { sortPriorityUpcoming } from '@/lib/seasonalCalendar';
import EditionCard from './EditionCard';

/**
 * Upcoming seasonal releases — previews only.
 *
 * These editions are announced but not produced, so nothing here is
 * purchasable. `variant` matches the visual system of the host page, and
 * `format` keeps them out of a format-filtered view: no grind or format has
 * been confirmed for an unreleased coffee, so it is never implied.
 */
export default function UpcomingReleases({ variant = 'editorial', format = null }) {
  const { upcoming, loading } = useSpecialEditions();

  if (loading || format || upcoming.length === 0) return null;

  // Fireside S'mores and Peppermint Parade lead; remaining previews follow release order.
  const cards = sortPriorityUpcoming(upcoming).map((edition) => (
    <EditionCard key={edition.id} edition={edition} />
  ));

  if (variant === 'shop') {
    return (
      <section className="px-6 pb-16 md:px-10" aria-label="Upcoming releases">
        <div className="mx-auto max-w-[1240px]">
          <header className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: '#A97B32' }}>
              In preparation
            </p>
            <h2
              className="mt-2 font-serif font-semibold"
              style={{ fontSize: 'clamp(1.6rem,3vw,2rem)', color: '#292622' }}
            >
              Upcoming Releases
            </h2>
            <p className="mt-3 max-w-2xl font-heading text-sm" style={{ color: '#5F574F', lineHeight: 1.7 }}>
              {COMING_SOON_COPY}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">{cards}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20 tr-section-divider pt-12" aria-label="Upcoming seasonal releases">
      <p className="eyebrow">In preparation</p>
      <h2 className="h2 mt-3">Coming soon</h2>
      <p className="body mt-4 text-readable-secondary" style={{ maxWidth: '62ch' }}>
        {COMING_SOON_COPY}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">{cards}</div>
    </section>
  );
}