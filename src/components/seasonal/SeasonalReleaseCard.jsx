import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { editionPath } from '@/lib/specialEditions';
import { windowLabel, SEASONAL_PREP_LABEL } from '@/lib/seasonalCalendar';
import SeasonalInterestForm from './SeasonalInterestForm';

const BADGE = {
  available: { text: 'Available now', color: 'hsl(var(--primary))', bg: 'rgba(184,101,67,0.1)' },
  coming_soon: { text: 'Coming soon', color: 'hsl(var(--foreground))', bg: 'rgba(56,43,36,0.06)' },
  past: { text: 'Past release', color: 'hsl(var(--muted-foreground))', bg: 'rgba(56,43,36,0.04)' },
  sold_out: { text: 'Sold out', color: 'hsl(var(--destructive))', bg: 'rgba(180,60,40,0.09)' },
};

/**
 * One release in the calendar. Commerce state, price and buying controls only
 * appear when the release's own edition record is verified and purchasable —
 * a planning date alone never produces a Shop button.
 */
export default function SeasonalReleaseCard({ entry, release, source = 'seasonal-calendar' }) {
  const state = release?.state || 'coming_soon';
  const edition = release?.edition || null;
  const badge = BADGE[state] || BADGE.coming_soon;
  const flavor = entry.flavorPending ? 'Flavor confirmed before release' : entry.flavor;

  return (
    <article
      className="flex h-full flex-col"
      style={{
        background: '#FFFFFF',
        border: '1px solid hsl(var(--border))',
        borderRadius: 4,
        overflow: 'hidden',
      }}
      aria-labelledby={`release-${entry.slug}`}
    >
      {edition?.image_url ? (
        <div style={{ aspectRatio: '4 / 3', background: '#F5F0E8' }}>
          <img
            src={edition.image_url}
            alt={`${entry.name} coffee by Torch Republic`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 id={`release-${entry.slug}`} className="font-heading" style={{ fontSize: '1.25rem', lineHeight: 1.2, margin: 0, color: 'hsl(var(--foreground))' }}>
            {entry.name}
          </h3>
          <span
            className="whitespace-nowrap font-mono uppercase"
            style={{
              fontSize: '0.5625rem',
              letterSpacing: '0.12em',
              padding: '0.3rem 0.5rem',
              borderRadius: 999,
              color: badge.color,
              background: badge.bg,
            }}
          >
            {badge.text}
          </span>
        </div>

        <p className="body" style={{ margin: 0, fontSize: '0.9375rem' }}>{flavor}</p>

        <dl className="grid grid-cols-1 gap-1" style={{ margin: 0 }}>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-mono uppercase" style={{ fontSize: '0.5625rem', letterSpacing: '0.12em', color: 'hsl(var(--muted-foreground))' }}>Window</dt>
            <dd className="body" style={{ margin: 0, fontSize: '0.875rem' }}>{windowLabel(entry)}</dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="font-mono uppercase" style={{ fontSize: '0.5625rem', letterSpacing: '0.12em', color: 'hsl(var(--muted-foreground))' }}>Prep</dt>
            <dd className="body" style={{ margin: 0, fontSize: '0.875rem' }}>
              {SEASONAL_PREP_LABEL.replace('Seasonal Reserve — ', '')}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-1">
          {state === 'available' ? (
            <Link
              to={editionPath(edition)}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 px-4 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderRadius: 999, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Shop now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : state === 'past' ? (
            <SeasonalInterestForm
              kind="return_list"
              productSlug={entry.slug}
              productName={entry.name}
              source={source}
              buttonLabel="Join the return list"
            />
          ) : (
            <div className="flex flex-col gap-2">
              <SeasonalInterestForm
                kind="notify"
                productSlug={entry.slug}
                productName={entry.name}
                source={source}
              />
              {edition ? (
                <Link
                  to={editionPath(edition)}
                  className="body inline-flex items-center gap-1"
                  style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}
                >
                  Preview the release <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}