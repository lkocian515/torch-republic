import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { duoCalendar, duoPath, duoArtworkFor, pairAvailability } from '@/lib/duos';
import { windowLabel, seasonalEntry } from '@/lib/seasonalCalendar';
import OriginalsDuoPanel from '@/components/duos/OriginalsDuoPanel';
import PreparationLegend from '@/components/seasonal/PreparationLegend';

const SEASONS = [
  { name: 'Winter', months: [0, 1, 11] },
  { name: 'Spring', months: [2, 3, 4] },
  { name: 'Summer', months: [5, 6, 7] },
  { name: 'Fall', months: [8, 9, 10] },
];

/**
 * Coffee duos, at a glance.
 *
 * Each confirmed pairing is one card that links to its own page; nothing is
 * expanded inline. A pairing only appears here when both of its coffees exist
 * as products in the store, so a card can never lead to a coffee with no page.
 */
export default function Duos() {
  useSEO({
    title: 'Coffee Duos | Torch Republic Coffee Company',
    description:
      'Explore the year-round Originals Duo and Torch Republic’s seasonal and holiday coffee pairings for 2027.',
    url: '/duos',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Duos', url: '/duos' },
    ],
  });

  const { editions, upcoming, loading } = useSpecialEditions();
  const catalog = [...(editions || []), ...(upcoming || [])];
  const bySlug = new Map(catalog.map((edition) => [edition.slug, edition]));

  const duos = loading
    ? []
    : duoCalendar()
        // A confirmed pairing is listed once its coffees are known — either as a
        // catalog record or on the approved release calendar. A pairing whose
        // coffees are not yet confirmed anywhere is still left out.
        .filter((pairing) => pairing.components.every((slug) => bySlug.has(slug) || seasonalEntry(slug)))
        .map((pairing) => ({
          ...pairing,
          state: pairAvailability(pairing, catalog).state,
          art: pairing.contents.map((item) => ({ ...item, art: duoArtworkFor(item.slug, bySlug.get(item.slug)) })),
        }));

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="max-w-[760px]">
          <p className="eyebrow">Made to enjoy together</p>
          <h1 className="h1 mt-3">Coffee Duos</h1>
          <p className="body-lg mt-4">
            Find the year-round Originals Duo and the seasonal pairings, organized by season from winter through the
            holidays.
          </p>
        </header>

        <div className="mt-8">
          <PreparationLegend />
        </div>

        <section className="mx-auto mt-10 max-w-[760px]" aria-label="Year-round coffee duo">
          <OriginalsDuoPanel />
        </section>

        <section className="mt-14" aria-labelledby="seasonal-pairings">
          <div className="max-w-[760px]">
            <p className="eyebrow">2027 seasonal calendar</p>
            <h2 id="seasonal-pairings" className="h2 mt-2">
              Seasonal &amp; Holiday Duos
            </h2>
            <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Browse the confirmed pairings by season. Open a duo to see both coffees, its availability window, and how
              to order them.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-10">
            {SEASONS.map((season) => {
              const pairings = duos.filter((pairing) => season.months.includes(pairing.month));
              if (pairings.length === 0) return null;
              return (
                <section key={season.name} aria-labelledby={`season-${season.name.toLowerCase()}`}>
                  <div
                    className="mb-4 flex items-center gap-4"
                    style={{ borderBottom: '1px solid hsl(var(--border))', paddingBottom: '0.75rem' }}
                  >
                    <h3
                      id={`season-${season.name.toLowerCase()}`}
                      className="font-heading"
                      style={{ fontSize: '1.4rem', margin: 0 }}
                    >
                      {season.name}
                    </h3>
                    <span
                      className="font-mono uppercase"
                      style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'hsl(var(--muted-foreground))' }}
                    >
                      {pairings.length} {pairings.length === 1 ? 'duo' : 'duos'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {pairings.map((pairing) => (
                      <Link
                        key={pairing.slug}
                        to={duoPath(pairing)}
                        className="flex min-h-[170px] flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: 8,
                          padding: '1.25rem',
                        }}
                        aria-label={`${pairing.label} — view this duo`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p
                            className="font-mono uppercase"
                            style={{
                              fontSize: '0.625rem',
                              letterSpacing: '0.12em',
                              color: 'hsl(var(--muted-foreground))',
                              margin: 0,
                            }}
                          >
                            {pairing.seasonLabel}
                          </p>
                          {pairing.window ? (
                            <span className="font-mono" style={{ fontSize: '0.6875rem', color: 'hsl(var(--muted-foreground))' }}>
                              {windowLabel(pairing.window)}
                            </span>
                          ) : null}
                          {pairing.state !== 'available' ? (
                            <span className="badge-torch">Coming soon</span>
                          ) : null}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
                          {pairing.art.map((item) => (
                            <figure key={item.slug} className="flex min-w-0 items-center gap-2.5" style={{ margin: 0 }}>
                              {item.art ? (
                                <img
                                  src={item.art.src}
                                  alt={item.art.alt}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-14 w-14 shrink-0 object-contain"
                                  style={{ background: '#F5F0E8', borderRadius: 4 }}
                                />
                              ) : null}
                              <figcaption
                                className="font-heading"
                                style={{ fontSize: '0.8125rem', lineHeight: 1.25, color: 'hsl(var(--foreground))' }}
                              >
                                {item.name}
                                {item.qty > 1 ? (
                                  <span
                                    style={{ display: 'block', fontSize: '0.75rem', color: 'hsl(var(--muted-foreground))' }}
                                  >
                                    Two bags
                                  </span>
                                ) : null}
                              </figcaption>
                            </figure>
                          ))}
                        </div>

                        <h4 className="font-heading mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.3 }}>
                          {pairing.label}
                        </h4>

                        <p
                          className="body mt-auto flex items-center gap-1.5 pt-4"
                          style={{ fontSize: '0.8125rem', color: 'hsl(var(--primary))' }}
                        >
                          View duo <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            {loading ? (
              <p className="body" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Loading the duo calendar…
              </p>
            ) : null}
          </div>

          <p
            className="body mt-8"
            style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))', maxWidth: '70ch' }}
          >
            Seasonal pairings are two individual coffees, not a separate bundle listing. Each duo page links to both
            product pages, where the current price and ordering options are shown.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/special-editions"
              className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderRadius: 999, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              Shop seasonal coffees
            </Link>
            <Link
              to="/seasonal-calendar"
              className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderRadius: 999, border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            >
              See the release calendar
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}