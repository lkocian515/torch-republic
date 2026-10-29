import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import useDuoCatalog from '@/hooks/useDuoCatalog';
import { duoBags, duoName, duoStatus, duoSeasonLabel, duoFlavorLine, occasionsFor, pairWindow } from '@/lib/duos';
import { windowLabel } from '@/lib/seasonalCalendar';
import PreparationLegend from '@/components/seasonal/PreparationLegend';
import DuoBagGallery from './DuoBagGallery';
import DuoProductCards from './DuoProductCards';
import DuoShopPanel from './DuoShopPanel';
import DuoStatusBadge from './DuoStatusBadge';

/** One canonical duo, on its own page. */
export default function DuoDetailView({ pairing }) {
  const { catalog, bySlug, loading } = useDuoCatalog();
  const bags = duoBags(pairing, bySlug);
  const status = duoStatus(pairing, catalog);
  const window = pairWindow(pairing);
  const { seasons, holidays } = occasionsFor(pairing);
  const name = duoName(pairing);
  const missingArt = bags.filter((bag) => !bag.art).map((bag) => bag.name);

  useSEO({
    title: `${name} | Torch Republic Coffee Company`,
    description: `${name}: ${bags.map((b) => b.name).join(' + ')}. ${pairing.intro}`,
    url: `/duos/${pairing.slug}`,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Duos', url: '/duos' },
      { name, url: `/duos/${pairing.slug}` },
    ],
  });

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Link to="/duos" className="body inline-flex items-center gap-1.5" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All coffee duos
        </Link>

        <header className="mt-5 max-w-[720px]">
          <p className="eyebrow">{duoSeasonLabel(pairing)}</p>
          <h1 className="h1 mt-3">{name}</h1>
          {pairing.monthlyName && pairing.monthlyName !== name ? (
            <p className="body mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>Also called the {pairing.monthlyName}</p>
          ) : null}
          <p className="body-lg mt-4">{pairing.intro}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {loading ? null : <DuoStatusBadge status={status} />}
            {window ? (
              <span className="font-mono" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>
                Checkout window: {windowLabel(window)}, 2027
              </span>
            ) : null}
          </div>
          <p className="body mt-3" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>
            Contents: one bag of each named coffee{pairing.twoPack ? ' (two bags of the same coffee)' : ''}. Checkout dates are not delivery or arrival dates.
          </p>
          {pairing.extension ? (
            <p className="body mt-2" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))' }}>{pairing.extension.note}</p>
          ) : null}
        </header>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
          <DuoBagGallery bags={bags} scene={pairing.scene || null} />
          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="body" style={{ color: 'hsl(var(--muted-foreground))' }}>Checking current availability…</p>
            ) : (
              <DuoShopPanel pairing={pairing} bags={bags} status={missingArt.length ? 'upcoming' : status} />
            )}
            <PreparationLegend />
          </div>
        </div>

        <section className="mt-12" aria-labelledby="duo-coffees">
          <h2 id="duo-coffees" className="h2">The {bags.length === 1 ? 'coffee' : 'two coffees'}</h2>
          {duoFlavorLine(pairing) ? <p className="body mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>{duoFlavorLine(pairing)}</p> : null}
          <div className="mt-6"><DuoProductCards bags={bags} /></div>
        </section>

        {seasons.length + holidays.length > 0 ? (
          <section className="mt-12" aria-labelledby="duo-occasions">
            <h2 id="duo-occasions" className="h3">Also featured for</h2>
            <ul className="mt-3 flex flex-wrap gap-2" style={{ listStyle: 'none', padding: 0 }}>
              {[...seasons, ...holidays].map((entry) => (
                <li key={entry.key}>
                  <Link to={entry.key && holidays.includes(entry) ? '/duos/holidays' : '/duos/seasonal'} className="badge-torch">
                    {entry.kicker}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <Link to="/duo-calendar/2027" className="body" style={{ color: 'hsl(var(--primary))', fontSize: '0.9375rem' }}>See the 2027 duo calendar</Link>
            </p>
          </section>
        ) : null}

        {import.meta.env.DEV && missingArt.length > 0 ? (
          <aside className="mt-10 p-4" style={{ border: '1px dashed hsl(var(--destructive))', borderRadius: 8 }}>
            <p className="body" style={{ margin: 0, fontSize: '0.875rem' }}>
              Internal preview note (not shown to customers): {name} is missing an approved image for {missingArt.join(', ')}. Ordering is held until it is supplied.
            </p>
          </aside>
        ) : null}
      </div>
    </div>
  );
}