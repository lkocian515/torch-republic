import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { formatPrice } from '@/lib/pricingConfig';
import { useCart } from '@/contexts/CartContext';
import { useDriftMotion } from './useDriftMotion';

function ProductInfo({ product, index, addItem, isAdding }) {
  return (
    <div className="pd-info min-w-0">
      <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 0.75rem' }}>
        0{index} / {product.ritualKey}
      </p>
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', color: D.ink, margin: '0 0 0.5rem' }}>{product.name}</h3>
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.terracotta, margin: '0 0 1rem' }}>{product.flavorLabel}</p>
      <p style={{ fontFamily: SANS, fontSize: '0.9375rem', lineHeight: 1.65, color: D.secondary, margin: '0 0 1.25rem', maxWidth: '42ch' }}>{product.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {product.flavorNotes.map((tag) => (
          <span key={tag} style={{ fontFamily: MONO, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, padding: '0.3rem 0.65rem', borderRadius: '4px', background: D.surface, color: D.ink, border: `1px solid ${D.rule}` }}>{tag}</span>
        ))}
      </div>
      <div className="flex items-baseline gap-3 mb-1">
        <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.5rem', color: D.ink }}>{formatPrice(product.price)}</span>
        <span style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.secondary }}>{product.servings} servings</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <button type="button" onClick={() => addItem(product)} disabled={isAdding} className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]" style={{ minHeight: 48, padding: '0 1.75rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: isAdding ? 'not-allowed' : 'pointer', opacity: isAdding ? 0.6 : 1 }}>
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
    // Single responsive structure — no pin, no 100vh, no duplicate layouts.
    // Scoped per-card reveals; triggers use element refs, not root-matching strings.
    gsap.utils.toArray('.pd-card').forEach((card) => {
      const img = card.querySelector('.pd-img');
      const info = card.querySelector('.pd-info');
      if (img) {
        gsap.from(img, {
          scale: 1.06, duration: 1.1, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 82%' },
        });
      }
      if (info && info.children.length) {
        gsap.from(info.children, {
          opacity: 0, y: 18, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: info, start: 'top 78%' },
        });
      }
    });
  });

  return (
    <section ref={scope} style={{ background: D.paper }}>
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14 max-w-2xl mx-auto">
          <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>Find Your Morning</p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>Two rituals. One easy morning.</h2>
        </div>

        {/* Balanced two-column grid — one structure for all breakpoints */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-14">
          {[classic, mushroom].map((product, i) => (
            <div key={product.id} className="pd-card flex flex-col" style={{ minWidth: 0 }}>
              {/* Image — responsive width, reserved aspect ratio to prevent CLS */}
              <div className="pd-img-wrap flex items-center justify-center mb-6" style={{ padding: 'clamp(1.25rem, 2.5vw, 2.25rem)', borderRadius: '10px', overflow: 'hidden', background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${product.ritual.soft}40 0%, ${D.cream} 70%)`, minWidth: 0 }}>
                <img
                  className="pd-img"
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  style={{ width: 'clamp(220px, 72%, 380px)', aspectRatio: '3 / 4', height: 'auto', objectFit: 'contain', display: 'block' }}
                />
              </div>
              {/* Info */}
              <ProductInfo product={product} index={i + 1} addItem={addItem} isAdding={isAdding} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}