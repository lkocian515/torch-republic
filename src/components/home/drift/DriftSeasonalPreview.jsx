import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { nextReleases, windowLabel, SEASONAL_PREP_LABEL } from '@/lib/seasonalCalendar';
import SeasonalInterestForm from '@/components/seasonal/SeasonalInterestForm';
import { D, TYPE, SERIF, SANS, fadeUp } from './driftTheme';

/**
 * The next two months of the seasonal calendar, on the homepage.
 *
 * A release is previewed with its planned window and its honest state. Nothing
 * here can be bought until its own verified Shopify record says so, so a
 * homepage appearance never implies a purchasable product.
 */
export default function DriftSeasonalPreview() {
  const { editions, loading } = useSpecialEditions();
  const preview = nextReleases(editions, 2);

  if (loading || preview.length === 0) return null;

  return (
    <section aria-labelledby="season-ahead" style={{ background: D.cream }}>
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[560px]">
            <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: 0 }}>The season ahead</p>
            <h2 id="season-ahead" style={{ ...TYPE.heading, color: D.espresso, margin: '0.75rem 0 0' }}>
              Next two months
            </h2>
            <p style={{ ...TYPE.lead, color: D.secondary, margin: '0.75rem 0 0' }}>
              Seasonal Reserve coffees are brewed, not instant: ground or whole bean, and each one sells inside its own
              window.
            </p>
          </div>
          <Link
            to="/seasonal-calendar"
            className="inline-flex min-h-[44px] items-center font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ color: D.terracotta, borderRadius: 4 }}
          >
            See the full calendar
          </Link>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {preview.map(({ entry, state, edition }) => (
            <article
              key={entry.slug}
              className="flex flex-col gap-3"
              style={{ background: '#FFFFFF', border: `1px solid ${D.rule}`, borderRadius: 4, padding: '1.25rem' }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.375rem', lineHeight: 1.2, margin: 0, color: D.espresso }}>
                  {entry.name}
                </h3>
                <span
                  style={{
                    ...TYPE.eyebrow,
                    fontSize: '0.5625rem',
                    color: state === 'available' ? D.terracotta : D.secondary,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {state === 'available' ? 'Available now' : 'Coming soon'}
                </span>
              </div>
              <p style={{ ...TYPE.meta, fontSize: '0.8125rem', color: D.secondary, margin: 0 }}>
                {entry.flavorPending ? 'Flavor confirmed before release' : entry.flavor} · {windowLabel(entry)}
              </p>
              <p style={{ fontFamily: SANS, fontSize: '0.875rem', color: D.secondary, margin: 0 }}>
                {SEASONAL_PREP_LABEL.replace('Seasonal Reserve — ', '')}
              </p>
              <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                {state === 'available' && edition ? (
                  <Link
                    to={`/special-editions/${edition.slug}`}
                    className="inline-flex min-h-[44px] items-center px-4 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{ borderRadius: 999, background: D.terracotta, color: '#FFF7E8' }}
                  >
                    Shop {entry.name}
                  </Link>
                ) : (
                  <SeasonalInterestForm
                    kind="notify"
                    productSlug={entry.slug}
                    productName={entry.name}
                    source="home-preview"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}