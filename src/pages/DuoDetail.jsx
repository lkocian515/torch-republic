import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { duoBySlug, duoName, duoPairingNote, duoSeasonLabel, duoFlavorLine, duoArtworkFor, pairAvailability } from '@/lib/duos';
import { windowLabel, seasonalEntry } from '@/lib/seasonalCalendar';
import { editionPath, formatMoney, optionState } from '@/lib/specialEditions';
import PreparationLegend from '@/components/seasonal/PreparationLegend';

/**
 * One confirmed duo, on its own page.
 *
 * Every fact shown here comes from the confirmed pairing (`duos.js`), the
 * seasonal calendar, or the coffee's own edition record. Nothing is a bundle
 * price: a seasonal pairing is ordered as two individual product pages, so the
 * page never invents a combined figure. Where a detail is not confirmed yet it
 * is left out rather than replaced with a placeholder.
 */
export default function DuoDetail() {
  const { slug } = useParams();
  const pairing = duoBySlug(slug);
  const { editions, upcoming, loading } = useSpecialEditions();

  const catalog = [...(editions || []), ...(upcoming || [])];
  const bySlug = new Map(catalog.map((e) => [e.slug, e]));
  // Both coffees must be purchasable before the duo is orderable — until then
  // the page reads as coming soon and no price is shown.
  const availability = pairAvailability(pairing, catalog);
  const contents = (pairing?.components || [])
    .filter((value, index, list) => list.indexOf(value) === index)
    .map((value) => {
      const edition = bySlug.get(value) || null;
      const entry = seasonalEntry(value);
      const purchasableOption = (edition?.options || []).find((option) => optionState(option).purchasable) || null;
      const price = purchasableOption ? Number(purchasableOption.price) : null;
      return {
        slug: value,
        name: edition?.name || entry?.name || value,
        flavor: entry?.flavor || null,
        edition,
        purchasable: Boolean(purchasableOption),
        art: duoArtworkFor(value, edition),
        price: Number.isFinite(price) ? formatMoney(price) : null,
      };
    });

  const title = pairing ? `${duoName(pairing)} | Torch Republic Coffee Company` : 'Coffee Duo';

  useSEO(
    pairing
      ? {
          title,
          description: `${duoName(pairing)}: ${duoPairingNote(pairing)}`,
          url: `/duos/${slug}`,
          breadcrumbs: [
            { name: 'Home', url: '/' },
            { name: 'Duos', url: '/duos' },
            { name: duoName(pairing), url: `/duos/${slug}` },
          ],
        }
      : { title, description: 'Torch Republic coffee duos.', noindex: true }
  );

  // A duo that does not exist is a real 404, not a silent redirect home.
  useEffect(() => {
    if (pairing) return undefined;
    const meta = document.createElement('meta');
    meta.name = 'prerender-status-code';
    meta.content = '404';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, [pairing]);

  if (!pairing) {
    return (
      <div className="section-torch">
        <div className="mx-auto max-w-[760px] px-6 md:px-10">
          <p className="eyebrow">404</p>
          <h1 className="h1 mt-3">Duo not found</h1>
          <p className="body mt-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
            This pairing is not part of the confirmed duo calendar.
          </p>
          <Link
            to="/duos"
            className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 px-6 font-heading text-sm font-semibold"
            style={{ borderRadius: 999, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All coffee duos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Link
          to="/duos"
          className="body inline-flex items-center gap-1.5"
          style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> All coffee duos
        </Link>

        <header className="mt-5 max-w-[720px]">
          <p className="eyebrow">{duoSeasonLabel(pairing)}</p>
          <h1 className="h1 mt-3">{duoName(pairing)}</h1>
          <p className="body-lg mt-4">{duoPairingNote(pairing)}</p>
          {!loading && availability.state !== 'available' ? (
            <p className="body mt-3 flex flex-wrap items-center gap-2" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
              <span className="badge-torch">Coming soon</span>
              Price, grind options and ordering for both coffees are added once they are confirmed.
            </p>
          ) : null}
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <dt className="font-mono uppercase" style={{ fontSize: '0.5625rem', letterSpacing: '0.14em', color: 'hsl(var(--muted-foreground))' }}>
                Season
              </dt>
              <dd className="body" style={{ margin: 0, fontSize: '0.9375rem' }}>{duoSeasonLabel(pairing)}</dd>
            </div>
            {pairing.window ? (
              <div>
                <dt className="font-mono uppercase" style={{ fontSize: '0.5625rem', letterSpacing: '0.14em', color: 'hsl(var(--muted-foreground))' }}>
                  Availability
                </dt>
                <dd className="body" style={{ margin: 0, fontSize: '0.9375rem' }}>{windowLabel(pairing.window)}, 2027</dd>
              </div>
            ) : null}
            {duoFlavorLine(pairing) ? (
              <div>
                <dt className="font-mono uppercase" style={{ fontSize: '0.5625rem', letterSpacing: '0.14em', color: 'hsl(var(--muted-foreground))' }}>
                  Flavors
                </dt>
                <dd className="body" style={{ margin: 0, fontSize: '0.9375rem' }}>{duoFlavorLine(pairing)}</dd>
              </div>
            ) : null}
          </dl>
        </header>

        <div className="mt-6">
          <PreparationLegend />
        </div>

        {/* The two coffees, each with its own approved artwork and product page. */}
        <section className="mt-10" aria-labelledby="duo-coffees">
          <h2 id="duo-coffees" className="h2">The two coffees</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contents.map((item) => (
              <article
                key={item.slug}
                className="flex flex-col"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}
              >
                {item.art ? (
                  <div style={{ aspectRatio: '4 / 3', background: '#F5F0E8' }}>
                    <img
                      src={item.art.src}
                      alt={item.art.alt}
                      loading="lazy"
                      className="h-full w-full object-contain p-3"
                    />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-heading" style={{ fontSize: '1.125rem', margin: 0 }}>
                    {item.name}
                  </h3>
                  {item.flavor ? (
                    <p className="body" style={{ margin: 0, fontSize: '0.9375rem', color: 'hsl(var(--muted-foreground))' }}>
                      {item.flavor}
                    </p>
                  ) : null}
                  {item.edition?.size ? (
                    <p className="body" style={{ margin: 0, fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                      {[item.edition.format_summary, item.edition.size].filter(Boolean).join(' · ')}
                    </p>
                  ) : null}
                  {item.price ? (
                    <p className="font-heading" style={{ margin: 0, fontSize: '1.125rem', fontVariantNumeric: 'tabular-nums' }}>
                      {item.price}
                    </p>
                  ) : null}

                  <div className="mt-auto pt-3">
                    {item.edition ? (
                      <Link
                        to={editionPath(item.edition)}
                        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                        style={{ borderRadius: 999, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                      >
                        {item.purchasable ? 'Shop' : 'View'} {item.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* How it is actually bought: two individual coffees, no bundle listing. */}
        <section
          className="mt-10"
          aria-labelledby="duo-purchase"
          style={{ background: '#FFFFFF', border: '1px solid hsl(var(--border))', borderRadius: 8, padding: 'clamp(1.25rem, 3vw, 1.75rem)' }}
        >
          <h2 id="duo-purchase" className="h3">How to order this duo</h2>
          <p className="body mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {duoName(pairing)} is two individual seasonal coffees, not a separate bundle listing. Add each coffee on its
            own product page; both bags go into one cart and check out together.
          </p>
          <p className="body mt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {loading
              ? 'Checking the current price and availability of both coffees…'
              : 'Each product page shows the current price, the grind options available for that coffee, and whether it can be ordered today. Shipping and tax are calculated at checkout.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {contents.map((item) =>
              item.edition ? (
                <Link
                  key={item.slug}
                  to={editionPath(item.edition)}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 px-5 font-heading text-sm font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{ borderRadius: 999, background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                >
                  {item.purchasable ? 'Shop' : 'View'} {item.name} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null
            )}
            <Link
              to="/duos"
              className="inline-flex min-h-[48px] items-center justify-center px-5 font-heading text-sm font-semibold"
              style={{ borderRadius: 999, border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
            >
              Back to all duos
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}