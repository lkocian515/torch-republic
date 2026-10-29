import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import useDuoCatalog from '@/hooks/useDuoCatalog';
import { duoCalendar, duoBags, duoStatus, featuredPairing } from '@/lib/duos';
import { windowLabel } from '@/lib/seasonalCalendar';
import DuoCard from '@/components/duos/DuoCard';
import OriginalsDuoPanel from '@/components/duos/OriginalsDuoPanel';
import PreparationLegend from '@/components/seasonal/PreparationLegend';

const BROWSE = [
  { to: '/duos/seasonal', title: 'Browse by season', text: 'Winter, Spring, Summer and Fall.' },
  { to: '/duos/holidays', title: 'Browse by holiday', text: 'Every 2027 holiday, in date order.' },
  { to: '/duo-calendar/2027', title: 'Duo Calendar', text: 'The full 2027 calendar with images.' },
];

/**
 * All Duos: the one featured duo first, then the next two as previews, then
 * paths into the season, holiday and calendar pages.
 */
export default function Duos() {
  useSEO({
    title: 'Coffee Duos | Torch Republic Coffee Company',
    description: 'Explore the year-round Originals Duo and Torch Republic’s seasonal and holiday coffee pairings for 2027.',
    url: '/duos',
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Duos', url: '/duos' },
    ],
  });

  const { catalog, bySlug, loading } = useDuoCatalog();
  const all = duoCalendar().filter((p) => p.window);
  const withStatus = all.map((p) => ({ ...p, status: duoStatus(p, catalog) }));
  const featured = featuredPairing();
  const current = withStatus.find((p) => p.slug === featured?.slug && p.status === 'available') || null;
  // The Christmas Duo always leads the upcoming list; everything else follows in
  // calendar order.
  const CHRISTMAS_DUO = 'peppermint-fireside';
  const previews = withStatus
    .filter((p) => p.status === 'upcoming' && p.slug !== current?.slug)
    .sort((a, b) => {
      if (a.slug === CHRISTMAS_DUO) return -1;
      if (b.slug === CHRISTMAS_DUO) return 1;
      return a.window.start.localeCompare(b.window.start);
    });
  const closed = withStatus.filter((p) => p.status === 'closed');

  const card = (p) => (
    <DuoCard
      key={p.slug}
      pairing={p}
      bags={duoBags(p, bySlug)}
      kicker={p.seasonLabel}
      windowText={`Checkout window: ${windowLabel(p.window)}, 2027`}
      status={p.status}
    />
  );

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="max-w-[760px]">
          <p className="eyebrow">Made to enjoy together</p>
          <h1 className="h1 mt-3">Coffee Duos</h1>
          <p className="body-lg mt-4">One bag of each of two coffees, paired for the season or the holiday.</p>
        </header>

        <div className="mt-8"><PreparationLegend /></div>

        <section className="mt-12" aria-labelledby="duos-now">
          <h2 id="duos-now" className="h2">Available now</h2>
          {loading ? (
            <p className="body mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>Checking current availability…</p>
          ) : current ? (
            <div className="mt-6 max-w-[520px]">{card(current)}</div>
          ) : (
            <p className="body mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
              No seasonal duo is open for orders right now. The Originals Duo below is always available.
            </p>
          )}
        </section>

        {previews.length > 0 ? (
          <section className="mt-12" aria-labelledby="duos-soon">
            <h2 id="duos-soon" className="h2">What’s coming next</h2>
            <p className="body mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Previews only. Nothing here can be ordered until its own checkout window opens.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{previews.map(card)}</div>
            <p className="mt-4">
              <Link to="/duo-calendar/2027" className="body" style={{ color: 'hsl(var(--primary))', fontSize: '0.9375rem' }}>
                See the full 2027 duo calendar
              </Link>
            </p>
          </section>
        ) : null}

        <section className="mt-12" aria-label="Browse duos">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {BROWSE.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="card-torch block h-full" style={{ padding: '1.25rem' }}>
                  <span className="font-heading block" style={{ fontSize: '1.0625rem', fontWeight: 600 }}>{item.title}</span>
                  <span className="body block" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {closed.length > 0 ? (
          <section className="mt-12" aria-labelledby="duos-closed">
            <h2 id="duos-closed" className="h2">Closed</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">{closed.map(card)}</div>
          </section>
        ) : null}

        <section className="mx-auto mt-14 max-w-[760px]" aria-label="Year-round coffee duo">
          <OriginalsDuoPanel />
        </section>
      </div>
    </div>
  );
}