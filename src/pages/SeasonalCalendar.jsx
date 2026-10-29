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
    title: 'Seasonal Calendar | Torch Republic Coffee Company',
    description:
      'The Torch Republic seasonal coffee calendar: which flavored coffees arrive each month, when their selling windows open and close, and what is available now.',
    url: '/seasonal-calendar',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Seasonal Calendar', url: '/seasonal-calendar' },
    ],
  });

  const availableNow = useMemo(
    () => (editions || []).filter((edition) => editionState(edition).state === 'available'),
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
          <p className="eyebrow">Brewed seasonal coffee</p>
          <h1 className="h1 mt-3">Seasonal Reserve Calendar</h1>
          <p className="body-lg mt-4">
            Seasonal coffees are brewed, not instant. Each one has its own selling window, and windows overlap as the
            year turns — so the shelf changes month by month while the two instant Originals stay available year round.
          </p>
        </header>

        <div className="mt-8">
          <PreparationLegend />
        </div>

        {/* ── What Shopify confirms is buyable today ── */}
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
              No seasonal coffee is on sale at this moment. The instant Originals are available year round in the{' '}
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
            to="/duos"
            className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderRadius: 999, border: '1px solid hsl(var(--primary))', color: 'hsl(var(--primary))' }}
          >
            See the seasonal pairings
          </Link>
          <Link
            to="/torchbearer-club"
            className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ borderRadius: 999, border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
          >
            About the Torchbearer Club
          </Link>
        </section>
      </div>
    </div>
  );
}