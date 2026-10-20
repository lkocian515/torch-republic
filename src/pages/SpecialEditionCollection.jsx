import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { useSEO } from '@/hooks/useSEO';
import { useCart } from '@/contexts/CartContext';
import { editionsInCollection, toCartProduct } from '@/lib/specialEditions';
import EditionCard from '@/components/specialeditions/EditionCard';
import BuyBothBar from '@/components/specialeditions/BuyBothBar';

/**
 * A campaign collection, e.g. /special-editions/collections/halloween.
 * Editorial copy comes from the campaign record; purchasing availability comes
 * from Shopify, so a scheduled campaign can never bypass the approval checks.
 */
export default function SpecialEditionCollection() {
  const { collectionSlug } = useParams();
  const { editions, campaigns, loading } = useSpecialEditions();
  const { addItem } = useCart();
  const [selections, setSelections] = useState({});

  const items = useMemo(() => editionsInCollection(editions, collectionSlug), [editions, collectionSlug]);
  const campaign = campaigns.find((c) => c.collection_slug === collectionSlug && !c.archived) || null;

  const title = campaign?.headline || `${collectionSlug?.replace(/-/g, ' ') || 'Collection'}`;

  useSEO({
    title: `${campaign?.name || collectionSlug} | Torch Republic Special Editions`,
    description:
      campaign?.supporting_text ||
      'A limited Torch Republic special edition collection. Availability changes with each drop.',
    url: `/special-editions/collections/${collectionSlug}`,
  });

  const setSelection = (slug, optionKey) => setSelections((prev) => ({ ...prev, [slug]: optionKey }));

  const handleBuyBoth = (entries) => {
    entries.forEach(({ edition, option }) => addItem(toCartProduct(edition, option), 1));
  };

  if (loading) {
    return (
      <div className="section-torch mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="body text-readable-secondary">Loading collection...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-torch mx-auto max-w-[1200px] px-6 md:px-10">
        <h1 className="h1">Collection not found</h1>
        <p className="body-lg mt-4">This collection has no active products right now.</p>
        <Link to="/special-editions" className="btn btn-ghost mt-6">
          Back to Special Editions
        </Link>
      </div>
    );
  }

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <header className="max-w-[720px]">
          {campaign?.eyebrow && <p className="eyebrow">{campaign.eyebrow}</p>}
          <h1 className="h1 mt-3">{title}</h1>
          {campaign?.supporting_text && <p className="body-lg mt-4">{campaign.supporting_text}</p>}
        </header>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((edition) => (
            <EditionCard
              key={edition.id}
              edition={edition}
              selectedOptionKey={selections[edition.slug]}
              onSelectOption={(key) => setSelection(edition.slug, key)}
            />
          ))}
        </div>

        {items.length > 1 && (
          <div className="mt-10">
            <BuyBothBar editions={items} selections={selections} onAdd={handleBuyBoth} />
          </div>
        )}

        <p className="body mt-10 text-readable-secondary" style={{ fontSize: '0.9375rem' }}>
          Pumpkin Spice is offered as Ground or Whole Bean, subject to availability. Both coffees are brewed, not
          instant: ground needs brewing, whole bean needs grinding first.
        </p>

        <Link to="/special-editions" className="btn btn-ghost mt-8">
          All special editions
        </Link>
      </div>
    </div>
  );
}