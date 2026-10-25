import React from 'react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { editionPath } from '@/lib/specialEditions';
import { D, SERIF, MONO } from './driftTheme';
import useProductCardMotion from './useProductCardMotion';
import DriftProductCard from './DriftProductCard';

/**
 * Upcoming seasonal releases.
 *
 * These are announced but not produced and do not exist in the connected store,
 * so nothing here is orderable and nothing is confirmed: no price, no format, no
 * shipping, no release date. Every card states the same thing — "Coming soon" —
 * and carries no purchase control and no "Shop" call to action. The card image
 * and title open the release preview so a visitor can still read what's planned.
 */
export default function DriftUpcomingReleases() {
  const { upcoming, loading } = useSpecialEditions();
  const scope = useProductCardMotion();

  if (loading || upcoming.length === 0) return null;

  return (
    <section ref={scope} style={{ background: D.paper }} aria-labelledby="upcoming-heading">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-14 md:py-20">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p
            style={{
              fontFamily: MONO,
              fontSize: '0.7rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: D.terracotta,
              margin: '0 0 1rem',
            }}
          >
            Seasonal releases
          </p>
          <h2
            id="upcoming-heading"
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
              lineHeight: 1.1,
              color: D.ink,
              margin: 0,
              textWrap: 'balance',
            }}
          >
            What&rsquo;s coming next
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {upcoming.map((edition, i) => (
            <DriftProductCard
              key={edition.id}
              eyebrow={`0${i + 1} / Seasonal Release`}
              name={edition.name}
              flavorLabel={edition.short_description}
              image={edition.image_url}
              alt={`Torch Republic ${edition.name} seasonal coffee pouch`}
              path={editionPath(edition)}
              ritualSoft={D.accentSoft}
              disabled
            />
          ))}
        </div>
      </div>
    </section>
  );
}