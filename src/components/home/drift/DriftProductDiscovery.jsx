import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { formatPrice } from '@/lib/pricingConfig';
import { useCart } from '@/contexts/CartContext';
import { useDriftMotion, isMobile } from './useDriftMotion';

// Per-product atmospheric themes
const THEMES = {
  classic: {
    bg: `linear-gradient(160deg, ${D.cream} 0%, ${D.accentSoft} 100%)`,
    glow: D.terracottaSoft,
    accent: D.terracotta,
  },
  mushroom: {
    bg: `linear-gradient(160deg, ${D.espresso} 0%, ${D.charcoal} 100%)`,
    glow: 'rgba(180,140,90,0.15)',
    accent: D.copper,
  },
};

function ProductCard({ product, index, addItem, isAdding, isActive, onHover }) {
  const theme = THEMES[product.ritualKey];
  const isMushroom = product.ritualKey === 'mushroom';
  const textColor = isMushroom ? D.cream : D.ink;
  const secondaryColor = isMushroom ? 'rgba(250,247,241,0.72)' : D.secondary;

  return (
    <div
      className="pd-card relative flex flex-col transition-all duration-500 ease-out"
      style={{
        minWidth: 0,
        borderRadius: '12px',
        overflow: 'hidden',
        background: theme.bg,
        border: `1px solid ${isMushroom ? 'rgba(255,255,255,0.08)' : D.rule}`,
      }}
      onMouseEnter={() => onHover(product.ritualKey)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Atmospheric glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Image */}
      <div className="pd-img-wrap relative flex items-center justify-center" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', minHeight: '260px' }}>
        <img
          className="pd-img"
          src={product.image}
          alt={product.alt}
          loading="lazy"
          style={{ width: 'clamp(200px, 75%, 360px)', aspectRatio: '3 / 4', height: 'auto', objectFit: 'contain', display: 'block', position: 'relative', zIndex: 1 }}
        />
      </div>
      {/* Info */}
      <div className="pd-info relative z-10 px-5 pb-5 md:px-6 md:pb-6" style={{ minWidth: 0 }}>
        <p style={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600, color: theme.accent, margin: '0 0 0.6rem' }}>
          0{index} / {product.ritualKey}
        </p>
        <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.35rem, 2.4vw, 1.85rem)', color: textColor, margin: '0 0 0.4rem', lineHeight: 1.15 }}>{product.name}</h3>
        <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9rem', color: theme.accent, margin: '0 0 0.85rem' }}>{product.flavorLabel}</p>
        <p style={{ fontFamily: SANS, fontSize: '0.9rem', lineHeight: 1.6, color: secondaryColor, margin: '0 0 1.1rem', maxWidth: '40ch' }}>{product.description}</p>
        {/* Flavor tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.flavorNotes.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
                padding: '0.3rem 0.65rem', borderRadius: '4px',
                background: isMushroom ? 'rgba(255,255,255,0.08)' : D.surface,
                color: textColor,
                border: `1px solid ${isMushroom ? 'rgba(255,255,255,0.12)' : D.rule}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Price */}
        <div className="flex items-baseline gap-3 mb-4">
          <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', color: textColor }}>{formatPrice(product.price)}</span>
          <span style={{ fontFamily: SANS, fontSize: '0.8125rem', color: secondaryColor }}>{product.servings} servings</span>
        </div>
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={isAdding}
            aria-label={`Add ${product.name} to cart`}
            className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]"
            style={{
              minHeight: 48, padding: '0 1.75rem', borderRadius: '6px',
              background: isMushroom ? D.terracotta : D.espresso,
              color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem',
              border: 'none', cursor: isAdding ? 'not-allowed' : 'pointer', opacity: isAdding ? 0.6 : 1,
            }}
          >
            Add to Cart
          </button>
          <Link
            to={product.path}
            className="group inline-flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: theme.accent, textDecoration: 'none' }}
          >
            View Details <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DriftProductDiscovery() {
  const { addItem, isAdding } = useCart();
  const [classic, mushroom] = CORE_PRODUCTS;
  const [hovered, setHovered] = useState(null);

  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    const mobileLayout = isMobile();

    gsap.utils.toArray('.pd-card').forEach((card) => {
      const img = card.querySelector('.pd-img');
      const info = card.querySelector('.pd-info');

      if (img) {
        gsap.fromTo(img,
          { scale: 1.06 },
          { scale: 1, duration: 1.1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 82%' },
          }
        );
      }

      if (!mobileLayout && info && info.children.length) {
        gsap.from(info.children, {
          opacity: 0, y: 18, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: info, start: 'top 78%' },
        });
      }
    });
  });

  return (
    <section ref={scope} id="discovery" style={{ background: D.paper, scrollMarginTop: '96px' }}>
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-14 md:py-20">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>Find Your Morning</p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>Two rituals. One easy morning.</h2>
        </div>

        {/* Interactive two-product grid */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          <ProductCard product={classic} index={1} addItem={addItem} isAdding={isAdding} isActive={hovered === 'classic'} onHover={setHovered} />
          <ProductCard product={mushroom} index={2} addItem={addItem} isAdding={isAdding} isActive={hovered === 'mushroom'} onHover={setHovered} />
        </div>
      </div>
    </section>
  );
}