import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { useSEO } from '@/hooks/useSEO';
import { useCart } from '@/contexts/CartContext';
import { editionsInCollection, toCartProduct, findOption, defaultOption, optionState } from '@/lib/specialEditions';
import EditionCard from '@/components/specialeditions/EditionCard';
import { sortByReleaseDate } from '@/lib/seasonalCalendar';
import DuoPurchasePanel from '@/components/specialeditions/DuoPurchasePanel';

/**
 * A campaign collection, e.g. /special-editions/collections/halloween.
 *
 * A two-coffee set is shown as one purchase: both packages together on the
 * left, one panel on the right holding the contents, the variants each coffee
 * really offers, the combined price, shipping and a single button. On a phone
 * the compact image pair comes first and the panel follows immediately.
 * Editorial copy comes from the campaign record; availability comes from
 * Shopify, so a scheduled campaign can never bypass the approval checks.
 */
export default function SpecialEditionCollection() {
  const { collectionSlug } = useParams();
  const { editions, campaigns, loading } = useSpecialEditions();
  const { addItems } = useCart();
  const [selections, setSelections] = useState({});

  const items = useMemo(
    () => sortByReleaseDate(editionsInCollection(editions, collectionSlug)),
    [editions, collectionSlug],
  );
  const campaign = campaigns.find((c) => c.collection_slug === collectionSlug && !c.archived) || null;

  const title = campaign?.headline || `${collectionSlug?.replace(/-/g, ' ') || 'Collection'}`;
  const isSet = items.length > 1;

  useSEO({
    title: `${campaign?.name || collectionSlug} | Torch Republic Special Editions`,
    description:
      campaign?.supporting_text ||
      'A limited Torch Republic special edition collection. Availability changes with each drop.',
    url: `/special-editions/collections/${collectionSlug}`,
  });

  const setSelection = (slug, optionKey) => setSelections((prev) => ({ ...prev, [slug]: optionKey }));

  // Both bags are added as one set so the confirmation can show the pair and
  // the combined subtotal instead of only the last bag added.
  const addSelection = (entries, qty) => {
    addItems(entries.map(({ edition, option }) => ({ product: toCartProduct(edition, option), qty })));
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
      <div className="section-torch mx-auto max-w-[1200px] px-6 text-center md:px-10">
        <h1 className="h1">Collection not found</h1>
        <p className="body-lg mt-4">This collection has no active products right now.</p>
        <Link to="/special-editions" className="btn btn-ghost mt-6">
          Back to Special Editions
        </Link>
      </div>
    );
  }

  if (isSet) {
    return (
      <div className="section-torch">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <nav className="font-mono uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em' }} aria-label="Breadcrumb">
            <Link to="/special-editions" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Special Editions
            </Link>
          </nav>

          <header className="mt-6 max-w-[720px]">
            {campaign?.eyebrow && <p className="eyebrow">{campaign.eyebrow}</p>}
            <h1 className="h1 mt-3">{title}</h1>
            {campaign?.supporting_text && <p className="body-lg mt-4">{campaign.supporting_text}</p>}
          </header>

          <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:mt-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            {/* Both packages together, each at its own proportions */}
            <div>
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {items.map((edition) => {
                  const option = findOption(edition, selections[edition.slug]) || defaultOption(edition);
                  const state = optionState(option);
                  const image = option?.image_url || edition.image_url;
                  return (
                    <figure key={edition.id} style={{ margin: 0, minWidth: 0 }}>
                      <div className="product-image-wrap" style={{ background: '#F8F5EF' }}>
                        {image ? (
                          <img
                            src={image}
                            alt={`Torch Republic ${edition.name}${option?.label ? ` ${option.label}` : ''} coffee bag`}
                            loading="lazy"
                            className="product-art-image"
                            style={{ '--product-art-scale': edition.slug === 'midnight-hex' ? 1.18 : 1 }}
                          />
                        ) : (
                          <span className="font-heading" style={{ fontSize: '0.875rem', padding: '1rem', textAlign: 'center' }}>
                            {edition.name}
                          </span>
                        )}
                      </div>
                      <figcaption className="mt-3">
                        <p className="font-heading font-semibold" style={{ fontSize: '0.9375rem', margin: 0 }}>
                          {edition.name}
                        </p>
                        <p className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', margin: '0.2rem 0 0' }}>
                          {[option?.label, edition.size].filter(Boolean).join(' · ')}
                        </p>
                        {!state.purchasable && (
                          <p className="body" style={{ fontSize: '0.8125rem', color: 'hsl(var(--muted-foreground))', margin: '0.2rem 0 0' }}>
                            Unavailable right now
                          </p>
                        )}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>

              <p className="body mt-6" style={{ fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>
                Both coffees are brewed, not instant. Each bag is its own package and its own cart line, in the format
                you choose above.
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <DuoPurchasePanel
                editions={items}
                selections={selections}
                onSelect={setSelection}
                onAdd={addSelection}
                name={campaign?.name || 'The set'}
                description={campaign?.supporting_text || 'Two seasonal coffees, ordered together.'}
              />
            </div>
          </div>

          <Link to="/special-editions" className="btn btn-ghost mt-10">
            All special editions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <header className="mx-auto max-w-[720px] text-center">
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

        <Link to="/special-editions" className="btn btn-ghost mt-8">
          All special editions
        </Link>
      </div>
    </div>
  );
}