import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { duoCalendar } from '@/lib/duos';
import { windowLabel } from '@/lib/seasonalCalendar';
import OriginalsDuoPanel from '@/components/duos/OriginalsDuoPanel';
import PreparationLegend from '@/components/seasonal/PreparationLegend';

const SEASONS = [
  { name: 'Winter', months: [0, 1, 11] },
  { name: 'Spring', months: [2, 3, 4] },
  { name: 'Summer', months: [5, 6, 7] },
  { name: 'Fall', months: [8, 9, 10] },
];

const HOLIDAYS = {
  9: 'Halloween',
  11: 'Christmas',
};

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

  const calendar = duoCalendar();

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="max-w-[760px]">
          <p className="eyebrow">Made to enjoy together</p>
          <h1 className="h1 mt-3">Coffee Duos</h1>
          <p className="body-lg mt-4">
            Find the year-round Originals Duo and seasonal pairings organized by season, including
            our Halloween and Christmas duos.
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
              Browse the confirmed pairings by season. Each seasonal coffee is ordered on its own
              product page; check that page for current price and availability.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-10">
            {SEASONS.map((season) => {
              const pairings = calendar.filter((pairing) => season.months.includes(pairing.month));
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
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.12em',
                        color: 'hsl(var(--muted-foreground))',
                      }}
                    >
                      {pairings.length} pairings
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {pairings.map((pairing) => (
                      <article
                        key={pairing.month}
                        className="flex min-h-[170px] flex-col"
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: 8,
                          padding: '1.25rem',
                        }}
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
                            {pairing.monthLabel} {HOLIDAYS[pairing.month] ? '· ' + HOLIDAYS[pairing.month] : ''}
                          </p>
                          {pairing.window ? (
                            <span
                              className="font-mono"
                              style={{ fontSize: '0.6875rem', color: 'hsl(var(--muted-foreground))' }}
                            >
                              {windowLabel(pairing.window)}
                            </span>
                          ) : null}
                        </div>

                        <h4 className="font-heading mt-4" style={{ fontSize: '1.125rem', lineHeight: 1.3 }}>
                          {pairing.label}
                        </h4>

                        <p
                          className="body mt-auto pt-4"
                          style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}
                        >
                          {pairing.twoPack ? 'Two bags of the same coffee' : 'One bag of each coffee'}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <p
            className="body mt-8"
            style={{
              fontSize: '0.875rem',
              color: 'hsl(var(--muted-foreground))',
              maxWidth: '70ch',
            }}
          >
            Seasonal pairings are combinations of individual coffees, not a separate bundle listing.
            Product pages show current details and ordering options.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/special-editions"
              className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderRadius: 999,
                background: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
              }}
            >
              Shop seasonal coffees
            </Link>
            <Link
              to="/winter-duo"
              className="inline-flex min-h-[44px] items-center justify-center px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderRadius: 999,
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              }}
            >
              Explore the Winter Duo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
