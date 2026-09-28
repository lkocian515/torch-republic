import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Minus, ChevronDown } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { formatPrice } from '@/lib/pricingConfig';
import { useCart } from '@/contexts/CartContext';

// Expandable detail row — keyboard accessible
function DetailRow({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: `1px solid ${D.rule}` }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left transition-opacity hover:opacity-70"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <span style={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: D.ink }}>
          {label}
        </span>
        <ChevronDown
          size={16}
          style={{ color: D.terracotta, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', strokeWidth: 1.75 }}
        />
      </button>
      {open && (
        <div style={{ paddingBottom: '1.25rem' }}>
          <p style={{ fontFamily: SANS, fontSize: '0.9rem', lineHeight: 1.65, color: D.secondary, margin: 0 }}>
            {children}
          </p>
        </div>
      )}
    </div>
  );
}

export default function DriftFeaturedProduct() {
  const { addItem, isAdding } = useCart();
  const product = CORE_PRODUCTS[1]; // Instant Mushroom Coffee
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addItem(product, qty);
  };

  return (
    <section id="featured-product" style={{ background: D.cream, scrollMarginTop: '80px' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-14 lg:gap-20 items-center">
          {/* ── Product image ── */}
          <div className="relative flex items-center justify-center" style={{ minHeight: '320px' }}>
            {/* Atmospheric backdrop */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '85%',
                height: '85%',
                background: `radial-gradient(circle, ${D.terracottaSoft}50 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            />
            <img
              src={product.image}
              alt={product.alt}
              loading="lazy"
              style={{
                width: 'clamp(240px, 80%, 400px)',
                aspectRatio: '3 / 4',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                filter: `drop-shadow(0 24px 50px rgba(46,34,24,0.15))`,
              }}
            />
          </div>

          {/* ── Product info ── */}
          <div>
            <p style={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 0.75rem' }}>
              Featured
            </p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', lineHeight: 1.12, color: D.ink, margin: '0 0 0.5rem' }}>
              {product.name}
            </h2>
            <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.terracotta, margin: '0 0 1.25rem' }}>
              {product.flavorLabel}
            </p>
            <p style={{ fontFamily: SANS, fontSize: '0.975rem', lineHeight: 1.7, color: D.secondary, margin: '0 0 1.5rem', maxWidth: '42ch' }}>
              {product.description}
            </p>

            {/* Price + servings */}
            <div className="flex items-baseline gap-3 mb-6">
              <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.75rem', color: D.ink }}>{formatPrice(product.price)}</span>
              <span style={{ fontFamily: SANS, fontSize: '0.875rem', color: D.secondary }}>{product.servings} servings per bag</span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {/* Quantity selector */}
              <div className="flex items-center" style={{ border: `1px solid ${D.rule}`, borderRadius: '6px', overflow: 'hidden', background: D.surface }}>
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-[48px] w-[48px] items-center justify-center transition-opacity hover:opacity-70"
                  style={{ background: 'none', border: 'none', cursor: qty <= 1 ? 'not-allowed' : 'pointer', opacity: qty <= 1 ? 0.4 : 1 }}
                >
                  <Minus size={16} style={{ color: D.ink, strokeWidth: 1.75 }} />
                </button>
                <span
                  aria-live="polite"
                  aria-label={`Quantity: ${qty}`}
                  style={{ minWidth: '40px', textAlign: 'center', fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.ink }}
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(9, qty + 1))}
                  disabled={qty >= 9}
                  aria-label="Increase quantity"
                  className="flex h-[48px] w-[48px] items-center justify-center transition-opacity hover:opacity-70"
                  style={{ background: 'none', border: 'none', cursor: qty >= 9 ? 'not-allowed' : 'pointer', opacity: qty >= 9 ? 0.4 : 1 }}
                >
                  <Plus size={16} style={{ color: D.ink, strokeWidth: 1.75 }} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAdd}
                disabled={isAdding}
                aria-label={`Add ${qty} ${product.name} to cart`}
                className="group inline-flex flex-1 items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985] sm:flex-none"
                style={{
                  minHeight: 48, padding: '0 2rem', borderRadius: '6px',
                  background: D.espresso, color: D.cream,
                  fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem',
                  border: 'none', cursor: isAdding ? 'not-allowed' : 'pointer',
                  opacity: isAdding ? 0.6 : 1, whiteSpace: 'nowrap',
                }}
              >
                {isAdding ? 'Adding...' : `Add to Cart \u00b7 ${formatPrice(product.price * qty)}`}
              </button>
            </div>

            {/* View full details */}
            <Link
              to={product.path}
              className="group inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: D.terracotta, textDecoration: 'none', marginBottom: '2rem' }}
            >
              View full details <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            {/* Expandable details */}
            <div style={{ borderTop: `1px solid ${D.rule}`, marginTop: '0.5rem' }}>
              <DetailRow label="Flavor & Profile">
                {product.flavorNotes.join(' \u00b7 ')}. Caffeine level: {product.caffeineLabel}.
              </DetailRow>
              <DetailRow label="Preparation">
                {product.prep}. Add one scoop to hot or cold water, stir, and enjoy. No machine or equipment required.
              </DetailRow>
              <DetailRow label="What's Inside">
                {product.functionalLabel || 'Premium instant coffee with clearly listed ingredients.'} Single-origin Arabica coffee base.
              </DetailRow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}