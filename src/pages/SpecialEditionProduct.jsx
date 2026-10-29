import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import useSpecialEditions from '@/hooks/useSpecialEditions';
import { useSEO } from '@/hooks/useSEO';
import { useCart } from '@/contexts/CartContext';
import {
  optionState,
  defaultOption,
  findOption,
  editionFormatLabel,
  formatMoney,
  editionsInCollection,
  toCartProduct,
  purchasableOptions,
  isUpcomingEdition,
  COMING_SOON_COPY,
} from '@/lib/specialEditions';
import { seasonalArtwork } from '@/lib/seasonalCalendar';
import EditionStatusChip from '@/components/specialeditions/EditionStatusChip';
import GrindSelector from '@/components/specialeditions/GrindSelector';
import EditionCard from '@/components/specialeditions/EditionCard';
import WinterDuoCrossLink from '@/components/specialeditions/WinterDuoCrossLink';

const STOCK_NOTE = {
  pending: 'This option is coming soon.',
  soldout: 'This option is coming soon.',
  error: 'We cannot confirm this option right now. Please try again shortly.',
};

/**
 * Reusable special-edition product template.
 *
 * Selecting a grind updates the image, format text, price, availability and
 * the cart variant together. Shopify is the only source of price, stock and
 * purchasing availability; supplier approval is tracked separately.
 */
export default function SpecialEditionProduct() {
  const { slug } = useParams();
  const { editions, upcoming, loading } = useSpecialEditions();
  const { addItem } = useCart();

  const [optionKey, setOptionKey] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('format') || params.get('grind') || null;
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFailed, setImageFailed] = useState(false);

  const edition = editions.find((e) => e.slug === slug) || upcoming.find((e) => e.slug === slug) || null;
  const isUpcoming = isUpcomingEdition(edition);
  const option = edition ? findOption(edition, optionKey) || defaultOption(edition) : null;
  // An upcoming release has no purchasable option, no confirmed price and no
  // confirmed format, so it never renders a purchase control.
  const state = isUpcoming
    ? { state: 'pending', purchasable: false, label: 'Coming Soon' }
    : optionState(option);
  const formatLabel = editionFormatLabel(edition);

  // The edition's own photo first, then the approved label shot kept for this
  // seasonal coffee, so a release never opens on a blank frame.
  const primaryImage =
    option?.image_url || edition?.image_url || seasonalArtwork(edition?.slug)?.src || null;
  // The main image is derived, so it is never blank on a direct visit or refresh.
  const shownImage = selectedImage || primaryImage;

  // A newly selected grind or edition starts from its own main image again.
  useEffect(() => {
    setSelectedImage(null);
  }, [option?.key, primaryImage]);

  useEffect(() => {
    setImageFailed(false);
  }, [shownImage]);

  const gallery = useMemo(
    () => [primaryImage, ...(edition?.additional_images || []), edition?.lifestyle_image].filter(Boolean),
    [primaryImage, edition?.additional_images, edition?.lifestyle_image],
  );

  const related = useMemo(() => {
    // An upcoming release belongs to no collection yet, so it has no siblings
    // to link to.
    if (!edition || isUpcomingEdition(edition)) return [];
    const primary = (edition.collections || [])[0];
    return editionsInCollection(editions, primary).filter((e) => e.slug !== edition.slug);
  }, [editions, edition]);

  // Structured data only when Shopify confirms a real price and availability.
  const buyable = edition ? purchasableOptions(edition)[0] : null;
  const productSchema = buyable
    ? {
        name: edition.name,
        description: edition.short_description || edition.description || '',
        image: buyable.image_url || edition.social_image || undefined,
        price: buyable.shopify.price,
        sku: buyable.shopify_variant_id,
      }
    : undefined;

  useSEO({
    title: edition?.seo_title || (edition ? `${edition.name} | Torch Republic` : 'Special Editions | Torch Republic'),
    description:
      edition?.seo_description ||
      edition?.short_description ||
      'A limited Torch Republic special edition coffee release.',
    image: edition?.social_image || primaryImage || undefined,
    url: `/special-editions/${slug}`,
    type: 'product',
    product: productSchema,
    breadcrumbs: [
      { name: 'Home', url: '/' },
      { name: 'Special Editions', url: '/special-editions' },
      { name: edition?.name || 'Product', url: `/special-editions/${slug}` },
    ],
  });

  if (loading) {
    return (
      <div className="section-torch mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="body text-readable-secondary">Loading product...</p>
      </div>
    );
  }

  if (!edition) {
    return (
      <div className="section-torch mx-auto max-w-[1200px] px-6 md:px-10">
        <h1 className="h1">Product not found</h1>
        <p className="body-lg mt-4">This special edition is no longer listed.</p>
        <Link to="/special-editions" className="btn btn-ghost mt-6">
          Back to Special Editions
        </Link>
      </div>
    );
  }

  const price =
    option?.shopify?.price && !option.shopify.error
      ? formatMoney(option.shopify.price, option.shopify.currency)
      : null;

  return (
    <div className="section-torch">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <nav className="font-mono uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em' }} aria-label="Breadcrumb">
          <Link to="/special-editions" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Special Editions
          </Link>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {/* Gallery */}
          <div>
            <div className="product-image-wrap" style={{ background: '#FFFFFF' }}>
              {shownImage && !imageFailed ? (
                <img
                  src={shownImage}
                  alt={
                    option?.label
                      ? `Torch Republic ${edition.name} ${option.label} coffee pouch`
                      : `Torch Republic ${edition.name} seasonal coffee pouch`
                  }
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-center" style={{ padding: '2rem' }}>
                  <span className="font-heading font-semibold">{edition.name}</span>
                  <span className="font-mono uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'hsl(var(--muted-foreground))' }}>
                    Image unavailable
                  </span>
                </div>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {gallery.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedImage(src)}
                    aria-label={`View image ${gallery.indexOf(src) + 1} of ${gallery.length}`}
                    aria-pressed={shownImage === src}
                    style={{
                      width: 72,
                      height: 72,
                      border: `1px solid ${shownImage === src ? 'hsl(var(--primary))' : 'hsl(var(--border))'}`,
                      borderRadius: 10,
                      overflow: 'hidden',
                      background: '#FFFFFF',
                    }}
                  >
                    <img
                      src={src}
                      alt={`Torch Republic ${edition.name} alternate view`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Buy box */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {edition.badge && <span className="badge-torch">{edition.badge}</span>}
              <EditionStatusChip state={state.state} label={state.label} />
            </div>

            <h1 className="h1 mt-4">{edition.name}</h1>

            {/* The format is read from the edition's own options, so it always
                matches the grind selector below it. */}
            {formatLabel && (
              <p className="mt-2 font-mono uppercase" style={{ fontSize: '11px', letterSpacing: '0.16em', fontWeight: 700, color: 'hsl(var(--primary))' }}>
                {formatLabel} &middot; brewed, not instant
              </p>
            )}

            {edition.short_description && <p className="body-lg mt-3">{edition.short_description}</p>}

            <dl
              className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono uppercase"
              style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'hsl(var(--muted-foreground))' }}
            >
              {option?.format_label && (
                <div className="flex gap-2">
                  <dt>Format</dt>
                  <dd style={{ color: 'hsl(var(--foreground))' }}>{option.format_label}</dd>
                </div>
              )}
              {edition.size && (
                <div className="flex gap-2">
                  <dt>Size</dt>
                  <dd style={{ color: 'hsl(var(--foreground))' }}>{edition.size}</dd>
                </div>
              )}
              {/* No "planned" release month is published: the month on the
                  release record is an internal planning value, not a confirmed
                  date, so the page never promises a release window. */}
            </dl>

            <p className="mt-6 font-heading font-semibold" style={{ fontSize: '1.5rem' }}>
              {price || (
                <span className="text-readable-secondary" style={{ fontSize: '1rem', fontWeight: 500 }}>
                  Price confirmed at launch
                </span>
              )}
            </p>

            {edition.options?.length > 1 && (
              <div className="mt-6">
                <GrindSelector options={edition.options} value={option?.key} onChange={setOptionKey} />
              </div>
            )}

            {state.purchasable ? (
              <button
                type="button"
                className="btn btn-primary mt-6 w-full"
                onClick={() => addItem(toCartProduct(edition, option), 1)}
              >
                <ShoppingBag size={16} strokeWidth={2} />
                Add to Cart
              </button>
            ) : (
              <>
                {isUpcoming && (
                  <button type="button" className="btn btn-primary mt-6 w-full" disabled>
                    <ShoppingBag size={16} strokeWidth={2} />
                    Coming Soon
                  </button>
                )}
                {(isUpcoming || STOCK_NOTE[state.state]) && (
                  <p className="body mt-4 text-readable-secondary" style={{ fontSize: '0.875rem' }}>
                    {isUpcoming ? COMING_SOON_COPY : STOCK_NOTE[state.state]}
                  </p>
                )}
              </>
            )}

            {/* Cross-link to the duo, only on the two Winter Duo coffees. */}
            <WinterDuoCrossLink edition={edition} />

            {edition.promo_copy && (
              <p className="body mt-4" style={{ fontSize: '0.9375rem', color: 'hsl(var(--primary))' }}>
                {edition.promo_copy}
              </p>
            )}

            {edition.description && (
              <div className="mt-8 tr-section-divider pt-6">
                <h2 className="h3">About this release</h2>
                <p className="body mt-3" style={{ whiteSpace: 'pre-line' }}>
                  {edition.description}
                </p>
              </div>
            )}

            {edition.brew_guidance && (
              <div className="mt-6">
                <h2 className="h3">How to brew</h2>
                <p className="body mt-3" style={{ whiteSpace: 'pre-line' }}>
                  {edition.brew_guidance}
                </p>
              </div>
            )}

            {!isUpcoming && edition.requires_brewing && !edition.is_instant && (
              <p className="body mt-4 text-readable-secondary" style={{ fontSize: '0.875rem' }}>
                Brewed coffee, not instant.
              </p>
            )}

            {edition.ingredients && (
              <div className="mt-6">
                <h2 className="h3">Ingredients</h2>
                <p className="body mt-3" style={{ whiteSpace: 'pre-line' }}>
                  {edition.ingredients}
                </p>
              </div>
            )}
          </div>
        </div>

        {edition.lifestyle_image && (
          <section className="mt-16 tr-section-divider pt-10">
            <h2 className="h2">The Ritual</h2>
            <div className="mt-6 overflow-hidden" style={{ borderRadius: 12 }}>
              <img
                src={edition.lifestyle_image}
                alt={`Torch Republic ${edition.name} coffee lifestyle photo`}
                className="w-full"
                style={{ display: 'block', height: 'auto' }}
                loading="lazy"
                data-parallax="24"
              />
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="h2">More from this collection</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <EditionCard key={item.id} edition={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}