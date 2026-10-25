import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { useSEO } from '@/hooks/useSEO';
import { editionState, COMING_SOON_COPY } from '@/lib/specialEditions';
import { WINTER_DUO, winterDuoEditions } from '@/lib/winterDuo';
import EditionCard from '@/components/specialeditions/EditionCard';

/**
 * The Winter Duo landing page.
 *
 * Both coffees are listed together with their own package image and their own
 * availability state. Price, format, size and stock are never written here —
 * each card reads them from that coffee's own edition record, which is fed by
 * Shopify — so the page cannot promise something the store cannot sell.
 */
export default function WinterDuo() {
  const { editions, upcoming, loading } = useSpecialEditions();
  const duo = winterDuoEditions(editions, upcoming);

  // The pair is only fully orderable once both releases are live. Until then
  // each coffee keeps its own state and the set is never presented as buyable.
  const bothLive = duo.length === 2 && duo.every((edition) => editionState(edition).state === 'available');

  useSEO({
    title: 'The Winter Duo | Torch Republic Coffee Company',
    description:
      'Fireside S\u2019mores and Harvest Moon Pecan, two cozy flavored coffees for fireside evenings and cold-weather mornings.',
    url: WINTER_DUO.path,
    image: WINTER_DUO.image,
    imageAlt: WINTER_DUO.imageAlt,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Special Editions', url: '/special-editions' },
      { name: 'The Winter Duo', url: WINTER_DUO.path },
    ],
  });

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <nav
          className="font-mono uppercase"
          style={{ fontSize: '10px', letterSpacing: '0.16em' }}
          aria-label="Breadcrumb"
        >
          <Link to="/special-editions" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Special Editions
          </Link>
        </nav>

        <header className="mt-6 max-w-[720px]">
          <p className="eyebrow">{WINTER_DUO.eyebrow}</p>
          <h1 className="h1 mt-3">{WINTER_DUO.name}</h1>
          <p
            className="mt-3 font-mono"
            style={{ fontSize: '12px', letterSpacing: '0.06em', fontWeight: 600, color: 'hsl(var(--primary))' }}
          >
            {WINTER_DUO.flavorLine}
          </p>
          <p className="body-lg mt-4">{WINTER_DUO.supporting}</p>
        </header>

        {/* Artwork and copy stay separate elements so the headline remains
            readable and editable. */}
        <div
          className="mt-10 overflow-hidden rounded-lg"
          style={{ aspectRatio: WINTER_DUO.imageRatio, background: '#FFFFFF', border: '1px solid hsl(var(--border))' }}
        >
          <img src={WINTER_DUO.image} alt={WINTER_DUO.imageAlt} className="block h-full w-full object-cover" />
        </div>

        <section className="mt-12" aria-label="Winter Duo coffees">
          {loading ? (
            <p className="body text-readable-secondary">Loading the Winter Duo...</p>
          ) : duo.length === 0 ? (
            <p className="body text-readable-secondary">
              The Winter Duo is not listed right now. Check back soon.
            </p>
          ) : (
            <>
              <ul className="mb-8 flex flex-wrap gap-3" style={{ listStyle: 'none', padding: 0 }}>
                {duo.map((edition) => (
                  <li key={edition.id} className="badge-torch">
                    {edition.name} &middot; {editionState(edition).label}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {duo.map((edition) => (
                  <EditionCard key={edition.id} edition={edition} />
                ))}
              </div>
            </>
          )}
        </section>

        <p className="body mt-12 text-readable-secondary" style={{ fontSize: '0.9375rem', maxWidth: '70ch' }}>
          {bothLive ? 'Both Winter Duo coffees are available now. ' : `${COMING_SOON_COPY} `}
          Each coffee is listed on its own page, and ordering opens for a release only once it is confirmed in
          Shopify.
        </p>

        <Link to="/special-editions" className="btn btn-ghost mt-8">
          <ArrowLeft size={15} strokeWidth={2} />
          Back to Special Editions
        </Link>
      </div>
    </div>
  );
}