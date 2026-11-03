import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RotateCcw } from 'lucide-react';
import { D, SERIF, SANS, MONO, TYPE } from './driftTheme';
import { formatPrice } from '@/lib/pricingConfig';
import { FREE_SHIPPING_THRESHOLD_DISPLAY, SHIP_TIME_DISPLAY, GUARANTEE_DISPLAY } from '@/lib/siteConfig';
import TiltContainer from './TiltContainer';

/**
 * The homepage product card, shared by the everyday lineup and the upcoming
 * seasonal releases so both grids are styled identically.
 *
 * `disabled` marks a product that isn't purchasable yet: the cart button is
 * replaced by a non-interactive availability chip, so an unreleased coffee never
 * carries a purchase control or a "Shop" call to action. The card image and its
 * title still open the release preview.
 */
export default function DriftProductCard({
  eyebrow,
  name,
  flavorLabel,
  description,
  flavorNotes = [],
  image,
  alt,
  path,
  ritualSoft,
  formatLabel = null,
  formatNote = null,
  price = null,
  servings = null,
  disabled = false,
  ctaLabel = 'Coming soon',
  onAdd,
  isAdding = false,
}) {
  const perServing = price != null && servings ? (price / servings).toFixed(2) : null;

  // A product that isn't purchasable yet links out to its page instead of adding to the cart.
  const btnStyle = {
    minHeight: 48,
    padding: '0 1.75rem',
    borderRadius: '6px',
    background: D.espresso,
    color: D.cream,
    fontFamily: SANS,
    fontWeight: 600,
    fontSize: '0.875rem',
    border: 'none',
    boxShadow: '0 3px 10px rgba(36,26,22,0.12)',
  };

  return (
    <div className="pd-card flex h-full flex-col" style={{ minWidth: 0, perspective: '1000px' }}>
      <Link to={path} aria-label={`View ${name}`} className="block" style={{ textDecoration: 'none' }}>
        <TiltContainer
          className="pd-img-wrap tr-product-card flex items-center justify-center mb-6"
          style={{
            padding: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#F8F5EF',
            minWidth: 0,
            border: D.borderHairline,
            boxShadow: D.shadowSoft,
          }}
        >
          <img
            className={`pd-img product-art-image${path?.includes('midnight-hex') ? ' product-art-image--midnight' : ''}`}
            src={image}
            alt={alt}
            loading="lazy"
            style={{
              width: 'clamp(220px, 72%, 380px)',
              '--product-art-scale': path?.includes('midnight-hex') ? 1.06 : 1,
              aspectRatio: '3 / 4',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'none',
            }}
          />
        </TiltContainer>
      </Link>

      <div className="pd-info flex flex-1 flex-col min-w-0">
        <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: '0 0 0.75rem' }}>
          {eyebrow}
        </p>

        <h3 style={{ ...TYPE.title, color: D.ink, margin: '0 0 0.5rem' }}>{name}</h3>

        {/* How the coffee is prepared — stated on every card, never implied. */}
        {formatLabel && (
          <p style={{ ...TYPE.meta, fontWeight: 700, color: D.terracottaDeep, margin: '0 0 0.6rem' }}>
            {formatLabel}
            {formatNote ? ` · ${formatNote}` : ''}
          </p>
        )}

        {flavorLabel && (
          <p style={{ ...TYPE.body, fontWeight: 600, color: D.terracotta, margin: '0 0 0.75rem' }}>{flavorLabel}</p>
        )}

        {description && (
          <p style={{ ...TYPE.body, color: D.secondary, margin: '0 0 1.25rem', maxWidth: '42ch' }}>{description}</p>
        )}

        {flavorNotes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {flavorNotes.map((tag) => (
              <span key={tag} style={{ ...TYPE.meta, padding: '0.3rem 0.65rem', borderRadius: '4px', background: D.surface, color: D.ink, border: `1px solid ${D.rule}` }}>{tag}</span>
            ))}
          </div>
        )}

        {price != null && (
          <div className="flex items-baseline gap-3 mb-1">
            <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', color: D.ink }}>{formatPrice(price)}</span>
            {servings ? (
              <>
                <span style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.secondary }}>{servings} servings</span>
                <span style={{ fontFamily: MONO, fontSize: '0.75rem', color: D.terracotta }}>= ${perServing} per cup</span>
              </>
            ) : null}
          </div>
        )}

        <div className="mt-auto flex flex-col sm:flex-row gap-3 sm:items-center mb-3">
          {disabled ? (
            /* Nothing here can be ordered, so the card states that instead of
               offering a button that would only lead somewhere else. */
            <span
              role="status"
              className="inline-flex items-center justify-center gap-2"
              style={{
                ...btnStyle,
                background: D.surface,
                color: D.secondary,
                border: `1px solid ${D.rule}`,
                boxShadow: 'none',
              }}
            >
              {ctaLabel}
            </span>
          ) : (
            <button
              type="button"
              onClick={onAdd}
              disabled={isAdding}
              className="group tr-btn-lift inline-flex items-center justify-center gap-2"
              style={{ ...btnStyle, cursor: isAdding ? 'not-allowed' : 'pointer', opacity: isAdding ? 0.6 : 1 }}
            >
              Add to Cart
            </button>
          )}

          {!disabled && (
            <Link to={path} className="group inline-flex items-center gap-2" style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: D.espresso, textDecoration: 'none' }}>
              View Details <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Shipping, returns and delivery promises only apply to something that can
            actually be ordered, so they stay off an unreleased seasonal coffee. */}
        {!disabled && (
          <div className="flex flex-wrap gap-x-4 gap-y-1" style={{ borderTop: `1px solid ${D.rule}`, paddingTop: '0.75rem' }}>
            <span className="inline-flex items-center gap-1.5" style={{ fontFamily: MONO, fontSize: '0.6875rem', letterSpacing: '0.06em', color: D.secondary }}>
              <Truck size={13} style={{ color: D.terracotta }} /> Free shipping {FREE_SHIPPING_THRESHOLD_DISPLAY}
            </span>
            <span className="inline-flex items-center gap-1.5" style={{ fontFamily: MONO, fontSize: '0.6875rem', letterSpacing: '0.06em', color: D.secondary }}>
              <RotateCcw size={13} style={{ color: D.terracotta }} /> {GUARANTEE_DISPLAY}
            </span>
            <span style={{ fontFamily: MONO, fontSize: '0.6875rem', letterSpacing: '0.06em', color: D.secondary }}>
              {SHIP_TIME_DISPLAY}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}