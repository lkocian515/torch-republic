import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { useSEO } from '@/hooks/useSEO';
import { editionState } from '@/lib/specialEditions';
import {
  CALENDAR_NOTE,
  CALENDAR_YEAR,
  MONTH_NAMES,
  entriesForMonth,
  releaseState,
  sensoryNote,
  upcomingMonthIndexes,
} from '@/lib/seasonalCalendar';
import EditionCard from '@/components/specialeditions/EditionCard';
import SeasonalReleaseCard from '@/components/seasonal/SeasonalReleaseCard';
import PreparationLegend from '@/components/seasonal/PreparationLegend';
import { duoBySlug, duoContents, duoArtworkFor, duoPath } from '@/lib/duos';

/**
 * The full seasonal calendar. The year plan and the coffees on sale are shown
 * separately: the plan is a schedule, the sale list is what Shopify confirms
 * can actually be bought today.
 */
export default function SeasonalCalendar() {
  const { editions, loading } = useSpecialEditions();
  const [view, setView] = useState('short');

  useSEO({
    title: 'Monthly Edition | Torch Republic Coffee Company',
    description:
      'Torch Republic’s Monthly Edition follows a monthly release cycle. Check verified availability and product details before ordering.',
    url: '/seasonal-calendar',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Monthly Edition', url: '/seasonal-calendar' },
    ],
  });

  const availableNow = useMemo(
    () => (editions || []).filter((edition) => editionState(edition).state === 'available' && edition.slug !== 'pumpkin-spice'),
    [editions],
  );

  const monthIndexes = view === 'short' ? upcomingMonthIndexes(3) : MONTH_NAMES.map((_, index) => index);
  const christmasDuo = duoBySlug('christmas');
  const christmasComponents = duoContents(christmasDuo).map((item) => ({
    ...item,
    artwork: duoArtworkFor(item.slug, null),
  }));

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <header className="max-w-[760px]">
          <p className="eyebrow">Monthly release cycle</p>
          <h1 className="h1 mt-3">Monthly Edition</h1>
          <p className="body-lg mt-4">
            The Monthly Edition is a separate brewed coffee release that changes through the year. We update its product details and availability only after the catalog and supplier information are confirmed.
          </p>
        </header>

        <div className="mt-8">
          <PreparationLegend />
        </div>

        <section className="mt-10" aria-labelledby="this-month-feature">
          <article
            className="grid grid-cols-1 items-center gap-6 rounded-lg border p-5 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8 md:p-8"
            style={{ background: '#F7F1E8', borderColor: 'hsl(var(--border))' }}
          >
            <img
              src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e5cdd5116_fireside-smores-product-1600.png"
              alt="Fireside S’mores seasonal coffee pouch"
              className="mx-auto max-h-[360px] w-full max-w-[360px] object-contain"
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="eyebrow" style={{ margin: 0 }}>Planned November 2027 · Details unconfirmed</p>
              <h2 id="this-month-feature" className="h2 mt-2">Monthly Edition preview</h2>
              <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Fireside S’mores is listed in the project as a planned November 2027 release. Shopify availability, price, package size and supplier readiness still need confirmation, so this preview is not an order offer.
              </p>
              <Link to="/special-editions/fireside-smores" className="mt-4 inline-flex min-h-[44px] items-center font-heading text-sm font-semibold" style={{ color: 'hsl(var(--primary))' }}>
                View Fireside S’mores <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </article>
        </section>

        {/* ── Products currently marked available by the connected catalog ── */}
        <section className="mt-12" aria-labelledby="available-now">
          <div className="flex flex-wrap items-center gap-3">
            <h2 id="available-now" className="h2">Available now</h2>
            <span
              className="font-mono uppercase"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.625rem',
                letterSpacing: '0.16em',
                fontWeight: 700,
                padding: '0.375rem 0.75rem',
                borderRadius: 999,
                background: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
              }}
            >
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} />
              On sale today
            </span>
          </div>

          {loading ? (
            <p className="body mt-6" style={{ color: 'hsl(var(--muted-foreground))' }}>Checking Shopify…</p>
          ) : availableNow.length === 0 ? (
            <p className="body mt-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
              No brewed seasonal coffee is currently marked available. The instant Originals are available year round in the{' '}
              <Link to="/shop" style={{ color: 'hsl(var(--primary))' }}>shop</Link>.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {availableNow.map((edition) => (
                <EditionCard key={edition.id} edition={edition} note={sensoryNote(edition.slug)} />
              ))}
            </div>
          )}
        </section>

        {/* ── The 2027 schedule ── */}
        <section className="mt-14" aria-labelledby="year-plan">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="year-plan" className="h2">The {CALENDAR_YEAR} plan</h2>
              <p className="body mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Planned selling windows. Each coffee is verified before its window opens.
              </p>
            </div>
            <div className="flex gap-2" role="group" aria-label="Calendar view">
              {[
                { key: 'short', label: 'Next 3 months' },
                { key: 'full', label: 'Full year' },
              ].map((option) => {
                const active = view === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setView(option.key)}
                    className="min-h-[44px] px-4 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      borderRadius: 999,
                      border: '1px solid hsl(var(--border))',
                      background: active ? 'hsl(var(--primary))' : 'transparent',
                      color: active ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-10">
            {monthIndexes.map((monthIndex) => {
              const entries = entriesForMonth(monthIndex);
              if (entries.length === 0) return null;
              return (
                <div key={MONTH_NAMES[monthIndex]}>
                  <h3
                    className="font-mono uppercase"
                    style={{ fontSize: '0.6875rem', letterSpacing: '0.16em', color: 'hsl(var(--muted-foreground))', marginBottom: '0.75rem' }}
                  >
                    {MONTH_NAMES[monthIndex]} {CALENDAR_YEAR}
                  </h3>
                  <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {entries.map((entry) => (
                      <SeasonalReleaseCard
                        key={`${monthIndex}-${entry.slug}`}
                        entry={entry}
                        release={releaseState(entry, editions)}
                      />
                    ))}
                  </div>
                  {monthIndex === 11 && christmasDuo ? (
                    <article
                      className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                      style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 8, padding: '1.25rem' }}
                      aria-labelledby="christmas-duo-calendar"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          {christmasComponents.map((item) => item.artwork ? (
                            <figure key={item.slug} className="flex items-center gap-2" style={{ margin: 0 }}>
                              <img
                                src={item.artwork.src}
                                alt={item.artwork.alt}
                                loading="lazy"
                                decoding="async"
                                className="h-14 w-14 object-contain"
                                style={{ background: '#F5F0E8', borderRadius: 4 }}
                              />
                              <figcaption className="font-heading" style={{ fontSize: '0.75rem', lineHeight: 1.2 }}>
                                {item.name}
                              </figcaption>
                            </figure>
                          ) : null)}
                        </div>
                        <div>
                          <p className="eyebrow" style={{ margin: 0 }}>December · Christmas</p>
                          <h4 id="christmas-duo-calendar" className="font-heading mt-1" style={{ fontSize: '1.25rem' }}>
                            Christmas Duo
                          </h4>
                          <p className="body mt-1" style={{ marginBottom: 0, color: 'hsl(var(--muted-foreground))' }}>
                            Peppermint Parade + Fireside S’mores
                          </p>
                        </div>
                      </div>
                      <Link
                        to={duoPath(christmasDuo)}
                        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{ borderRadius: 999, border: '1px solid hsl(var(--primary))', color: 'hsl(var(--primary))' }}
                      >
                        View Christmas Duo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </article>
                  ) : null}
                </div>
              );
            })}
          </div>

          <p className="body mt-10" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
            {CALENDAR_NOTE}
          </p>
        </section>

        <section className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/duos/holidays"
            className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderRadius: 999, border: '1px solid hsl(var(--primary))', color: 'hsl(var(--primary))' }}
          >
            Browse Holiday Duos
          </Link>
          <Link
            to="/torchbearer-club"
            className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderRadius: 999, border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
          >
            Torchbearer Club waitlist
          </Link>
        </section>
      </div>
    </div>
  );
}