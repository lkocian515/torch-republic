import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, RotateCcw } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { formatPrice } from '@/lib/pricingConfig';
import { FREE_SHIPPING_THRESHOLD_DISPLAY, SHIP_TIME_DISPLAY, GUARANTEE_DISPLAY } from '@/lib/siteConfig';
import TiltContainer from './TiltContainer';

/**
 * The homepage product card, shared by the everyday lineup and the upcoming
 * seasonal releases so both grids are styled identically.
 *
 * A product with no confirmed price renders "Price confirmed at launch" in the
 * price slot, and `disabled` turns the cart button into a non-purchasable
 * "Coming Soon" state.
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
  price = null,
  servings = null,
  disabled = false,
  onAdd,
  isAdding = false,
}) {
  const perServing = price != null && servings ? (price / servings).toFixed(2) : null;
  const blocked = disabled || isAdding;

  return (
    <div className="pd-card flex flex-col" style={{ minWidth: 0, perspective: '1000px' }}>
      <Link to={path} aria-label={`View ${name}`} className="block" style={{ textDecoration: 'none' }}>
        <TiltContainer
          className="pd-img-wrap tr-product-card flex items-center justify-center mb-6"
          style={{
            padding: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            borderRadius: '10px',
            overflow: 'hidden',
            background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${ritualSoft}40 0%, ${D.cream} 70%)`,
            minWidth: 0,
            border: D.borderHairline,
            boxShadow: D.shadowSoft,
          }}
        >
          <img
            className="pd-img"
            src={image}
            alt={alt}
            loading="lazy"
            style={{
              width: 'clamp(220px, 72%, 380px)',
              aspectRatio: '3 / 4',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 8px 20px rgba(36,26,22,0.12))',
            }}
          />
        </TiltContainer>
      </Link>

      <div className="pd-info min-w-0">
        <p style={{ fontFamily: MONO, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 0.75rem' }}>
          {eyebrow}
        </p>

        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', color: D.ink, margin: '0 0 0.5rem' }}>{name}</h3>

        {flavorLabel && (
          <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.terracotta, margin: '0 0 0.75rem' }}>{flavorLabel}</p>
        )}

        {description && (
          <p style={{ fontFamily: SANS, fontSize: '0.9375rem', lineHeight: 1.65, color: D.secondary, margin: '0 0 1.25rem', maxWidth: '42ch' }}>{description}</p>
        )}

        {flavorNotes.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {flavorNotes.map((tag) => (
              <span key={tag} style={{ fontFamily: MONO, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, padding: '0.3rem 0.65rem', borderRadius: '4px', background: D.surface, color: D.ink, border: `1px solid ${D.rule}` }}>{tag}</span>
            ))}
          </div>
        )}

        <div className="flex items-baseline gap-3 mb-1">
          {price != null ? (
            <>
              <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', color: D.ink }}>{formatPrice(price)}</span>
              <span style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.secondary }}>{servings} servings</span>
              <span style={{ fontFamily: MONO, fontSize: '0.75rem', color: D.terracotta }}>= ${perServing} per cup</span>
            </>
          ) : (
            <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: '1rem', color: D.secondary }}>Price confirmed at launch</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-3">
          <button
            type="button"
            onClick={disabled ? undefined : onAdd}
            disabled={blocked}
            className="group tr-btn-lift inline-flex items-center justify-center gap-2"
            style={{
              minHeight: 48,
              padding: '0 1.75rem',
              borderRadius: '6px',
              background: D.espresso,
              color: D.cream,
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: '0.875rem',
              border: 'none',
              cursor: blocked ? 'not-allowed' : 'pointer',
              opacity: blocked ? 0.6 : 1,
              boxShadow: '0 3px 10px rgba(36,26,22,0.12)',
            }}
          >
            {disabled ? 'Coming Soon' : 'Add to Cart'}
          </button>

          <Link to={path} className="group inline-flex items-center gap-2" style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: D.espresso, textDecoration: 'none' }}>
            View Details <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

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
      </div>
    </div>
  );
}