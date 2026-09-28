import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { formatPrice } from '@/lib/pricingConfig';
import { useCart } from '@/contexts/CartContext';
import { useDriftMotion, isMobile } from './useDriftMotion';
import TiltContainer from './TiltContainer';

function ProductInfo({ product, index, addItem, isAdding }) {
  return (
    <div className="pd-info min-w-0">
      <p style={{ fontFamily: MONO, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 0.75rem' }}>
        0{index} / {product.ritualKey}
      </p>
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', color: D.ink, margin: '0 0 0.5rem' }}>{product.name}</h3>
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.terracotta, margin: '0 0 1rem' }}>{product.flavorLabel}</p>
      <p style={{ fontFamily: SANS, fontSize: '0.9375rem', lineHeight: 1.65, color: D.secondary, margin: '0 0 1.25rem', maxWidth: '42ch' }}>{product.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {product.flavorNotes.map((tag) => (
          <span key={tag} style={{ fontFamily: MONO, fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, padding: '0.3rem 0.65rem', borderRadius: '4px', background: D.surface, color: D.ink, border: `1px solid ${D.rule}` }}>{tag}</span>
        ))}
      </div>
      <div className="flex items-baseline gap-3 mb-1">
        <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', color: D.ink }}>{formatPrice(product.price)}</span>
        <span style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.secondary }}>{product.servings} servings</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <button type="button" onClick={() => addItem(product)} disabled={isAdding} className="group tr-btn-lift inline-flex items-center justify-center gap-2" style={{ minHeight: 48, padding: '0 1.75rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: isAdding ? 'not-allowed' : 'pointer', opacity: isAdding ? 0.6 : 1, boxShadow: '0 3px 10px rgba(36,26,22,0.12)' }}>
          Add to Cart
        </button>
        <Link to={product.path} className="group inline-flex items-center gap-2" style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: D.espresso, textDecoration: 'none' }}>
          View Details <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default function DriftProductDiscovery() {
  const { addItem, isAdding } = useCart();
  const [classic, mushroom] = CORE_PRODUCTS;
  const scope = useDriftMotion((gsap, ScrollTrigger, el) => {
    // Commerce content (product info, prices, buttons) must be visible by
    // default on mobile. Reveal animations are desktop-only progressive
    // enhancement — they never gate critical shopping content on small screens.
    const mobileLayout = isMobile();

    gsap.utils.toArray('.pd-card').forEach((card) => {
      const img = card.querySelector('.pd-img');
      const info = card.querySelector('.pd-info');

      // Image: fromTo for fail-safety — if ScrollTrigger misses, image
      // settles at its final (visible) state rather than staying hidden.
      if (img) {
        gsap.fromTo(img,
          { scale: 1.06 },
          { scale: 1, duration: 1.1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 82%' },
          }
        );
      }

      // Info: desktop-only staggered reveal. On mobile, content is always
      // visible — no opacity:0, no transform, no IntersectionObserver dependency.
      if (!mobileLayout && info && info.children.length) {
        gsap.from(info.children, {
          opacity: 0, y: 18, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: info, start: 'top 78%' },
        });
      }
    });
  });

  return (
    <section ref={scope} style={{ background: D.paper, scrollMarginTop: '96px' }}>
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-14 md:py-20">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <p style={{ fontFamily: MONO, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>Find Your Morning</p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>Two rituals. One easy morning.</h2>
        </div>

        {/* Balanced two-column grid — one structure for all breakpoints */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {[classic, mushroom].map((product, i) => (
            <div key={product.id} className="pd-card flex flex-col" style={{ minWidth: 0, perspective: '1000px' }}>
              {/* Image — responsive width, reserved aspect ratio to prevent CLS */}
              <TiltContainer className="pd-img-wrap tr-product-card flex items-center justify-center mb-6" style={{ padding: 'clamp(1.25rem, 2.5vw, 2.25rem)', borderRadius: '10px', overflow: 'hidden', background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${product.ritual.soft}40 0%, ${D.cream} 70%)`, minWidth: 0, border: D.borderHairline, boxShadow: D.shadowSoft }}>
                <img
                  className="pd-img"
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  style={{ width: 'clamp(220px, 72%, 380px)', aspectRatio: '3 / 4', height: 'auto', objectFit: 'contain', display: 'block', filter: 'drop-shadow(0 8px 20px rgba(36,26,22,0.12))' }}
                />
              </TiltContainer>
              {/* Info */}
              <ProductInfo product={product} index={i + 1} addItem={addItem} isAdding={isAdding} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}