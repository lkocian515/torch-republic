import React from 'react';
import { Link } from 'react-router-dom';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { useSEO } from '@/hooks/useSEO';
import { collectionPath } from '@/lib/specialEditions';
import EditionCard from '@/components/specialeditions/EditionCard';
import UpcomingReleases from '@/components/specialeditions/UpcomingReleases';

/**
 * Permanent Special Editions destination. Every active special edition lives
 * here, grouped by the collections it is assigned to.
 */
export default function SpecialEditions() {
  const { editions, campaigns, loading } = useSpecialEditions();

  useSEO({
    title: 'Special Editions | Torch Republic Coffee Company',
    description:
      'Limited Torch Republic coffee releases, including the Halloween Duo: Pumpkin Spice and Midnight Hex Mexican Chocolate.',
    url: '/special-editions',
  });

  const collectionSlugs = [...new Set(editions.flatMap((edition) => edition.collections || []))].filter(
    (slug) => slug && slug !== 'special-editions',
  );

  const collectionLabel = (slug) =>
    campaigns.find((c) => c.collection_slug === slug)?.name || slug.replace(/-/g, ' ');

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <header className="max-w-[720px]">
          <p className="eyebrow">Limited releases</p>
          <h1 className="h1 mt-3">Special Editions</h1>
          <p className="body-lg mt-4">
            Small-batch and seasonal coffees from Torch Republic. Each release is limited, and availability changes
            with every drop.
          </p>
        </header>

        {collectionSlugs.length > 0 && (
          <nav className="mt-8 flex flex-wrap gap-3" aria-label="Special edition collections">
            {collectionSlugs.map((slug) => (
              <Link key={slug} to={collectionPath(slug)} className="badge-torch" style={{ padding: '0.5rem 0.875rem' }}>
                {collectionLabel(slug)}
              </Link>
            ))}
          </nav>
        )}

        {loading ? (
          <p className="body mt-12 text-readable-secondary">Loading special editions...</p>
        ) : editions.length === 0 ? (
          <p className="body mt-12 text-readable-secondary">
            No special editions are available right now. Check back soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {editions.map((edition) => (
              <EditionCard key={edition.id} edition={edition} />
            ))}
          </div>
        )}

        <p className="body mt-12 text-readable-secondary" style={{ fontSize: '0.9375rem' }}>
          Special editions are brewed coffee, not instant. Available formats vary by release: Pumpkin Spice is offered Ground or Whole Bean, while Midnight Hex is Ground. Our everyday Instant Classic and Instant Mushroom coffees are instant only, just add water.
        </p>

        <UpcomingReleases />
      </div>
    </div>
  );
}