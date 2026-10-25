import React from 'react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { editionPath } from '@/lib/specialEditions';
import { D } from './driftTheme';
import useProductCardMotion from './useProductCardMotion';
import DriftProductCard from './DriftProductCard';

/**
 * Upcoming seasonal releases, shown in the same product card as the everyday
 * lineup above the classic and mushroom coffee.
 *
 * These are announced but not produced, so nothing here is confirmed: no price,
 * no format, and no shipping, returns or delivery promise is shown. The card
 * image and title open the release preview, while the button sends the visitor
 * to the shop so the section still leads to coffee they can buy today.
 */
export default function DriftUpcomingReleases() {
  const { upcoming, loading } = useSpecialEditions();
  const scope = useProductCardMotion();

  if (loading || upcoming.length === 0) return null;

  return (
    <section ref={scope} style={{ background: D.paper }} aria-label="Upcoming seasonal releases">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-14 md:py-20">
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
              ctaPath="/shop"
            />
          ))}
        </div>
      </div>
    </section>
  );
}