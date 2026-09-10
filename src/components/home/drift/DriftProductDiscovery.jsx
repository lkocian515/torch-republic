import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { formatPrice } from '@/lib/pricingConfig';
import { useCart } from '@/contexts/CartContext';
import { useDriftMotion, isMobile } from './useDriftMotion';

function ProductInfo({ product, index, addItem, isAdding }) {
  return (
    <div className="pd-info">
      <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 0.75rem' }}>
        0{index} / {product.ritualKey}
      </p>
      <h3 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: D.ink, margin: '0 0 0.5rem' }}>{product.name}</h3>
      <p style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', color: D.terracotta, margin: '0 0 1.25rem' }}>{product.flavorLabel}</p>
      <p style={{ fontFamily: SANS, fontSize: '0.9375rem', lineHeight: 1.65, color: D.secondary, margin: '0 0 1.25rem', maxWidth: '42ch' }}>{product.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {product.flavorNotes.map((tag) => (
          <span key={tag} style={{ fontFamily: MONO, fontSize: '0.625rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, padding: '0.3rem 0.65rem', borderRadius: '4px', background: D.surface, color: D.ink, border: `1px solid ${D.rule}` }}>{tag}</span>
        ))}
      </div>
      <div className="flex items-baseline gap-3 mb-1">
        <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.6rem', color: D.ink }}>{formatPrice(product.price)}</span>
        <span style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.secondary }}>{product.servings} servings</span>
      </div>
      <p style={{ fontFamily: SANS, fontSize: '0.8125rem', color: D.secondary, margin: '0 0 1.25rem' }}>Subscription available &middot; Save 10%</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <button onClick={() => addItem(product)} disabled={isAdding} className="group inline-flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.012] active:scale-[0.985]" style={{ minHeight: 48, padding: '0 1.75rem', borderRadius: '6px', background: D.espresso, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: isAdding ? 'not-allowed' : 'pointer', opacity: isAdding ? 0.6 : 1 }}>
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
  const scope = useDriftMotion((gsap, ScrollTrigger) => {
    if (isMobile()) {
      // Mobile: stacked entrance animations
      ['.pd-classic', '.pd-mushroom'].forEach((sel) => {
        gsap.from(`${sel} .pd-img`, { scale: 1.08, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: `${sel} .pd-img-wrap`, start: 'top 75%' } });
        gsap.from(`${sel} .pd-info > *`, { opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: `${sel} .pd-info`, start: 'top 70%' } });
      });
      return;
    }
    // Desktop: pinned scroll-driven crossfade
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.pd-pin', start: 'top top', end: '+=180%', pin: true, scrub: 1 },
    });
    tl.to('.pd-classic-visual', { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.inOut' }, 0.35)
      .to('.pd-classic-info', { opacity: 0, y: -30, duration: 0.25, ease: 'power2.inOut' }, 0.3)
      .fromTo('.pd-mushroom-visual', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, 0.5)
      .fromTo('.pd-mushroom-info', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, 0.55);
  });

  return (
    <section ref={scope} style={{ background: D.paper }}>
      {/* Heading */}
      <div className="text-center px-6 pt-16 md:pt-20 pb-10 md:pb-12">
        <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>Find Your Morning</p>
        <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.ink, margin: 0, textWrap: 'balance' }}>Two rituals. One easy morning.</h2>
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden px-6 pb-16">
        <div className="pd-classic mb-12">
          <div className="pd-img-wrap flex items-center justify-center mb-6" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${classic.ritual.soft}40 0%, ${D.cream} 70%)`, borderRadius: '8px', padding: '2rem' }}>
            <img className="pd-img w-[70%] max-w-[260px]" src={classic.image} alt={classic.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} />
          </div>
          <ProductInfo product={classic} index={1} addItem={addItem} isAdding={isAdding} />
        </div>
        <div className="pd-mushroom">
          <div className="pd-img-wrap flex items-center justify-center mb-6" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${mushroom.ritual.soft}40 0%, ${D.cream} 70%)`, borderRadius: '8px', padding: '2rem' }}>
            <img className="pd-img w-[70%] max-w-[260px]" src={mushroom.image} alt={mushroom.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} />
          </div>
          <ProductInfo product={mushroom} index={2} addItem={addItem} isAdding={isAdding} />
        </div>
      </div>

      {/* Desktop: pinned */}
      <div className="hidden md:block pd-pin h-screen grid grid-cols-[55fr_45fr] items-center">
        <div className="relative h-full flex items-center justify-center">
          <div className="pd-classic-visual absolute inset-0 flex items-center justify-center">
            <img src={classic.image} alt={classic.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} className="w-[50%] max-w-[300px] transition-transform duration-500 hover:scale-[1.025]" />
          </div>
          <div className="pd-mushroom-visual absolute inset-0 flex items-center justify-center" style={{ opacity: 0 }}>
            <img src={mushroom.image} alt={mushroom.alt} style={{ mixBlendMode: 'multiply', objectFit: 'contain' }} className="w-[50%] max-w-[300px] transition-transform duration-500 hover:scale-[1.025]" />
          </div>
        </div>
        <div className="relative px-12 h-full flex items-center">
          <div className="pd-classic-info absolute inset-0 px-12 flex flex-col justify-center">
            <ProductInfo product={classic} index={1} addItem={addItem} isAdding={isAdding} />
          </div>
          <div className="pd-mushroom-info absolute inset-0 px-12 flex flex-col justify-center" style={{ opacity: 0 }}>
            <ProductInfo product={mushroom} index={2} addItem={addItem} isAdding={isAdding} />
          </div>
        </div>
      </div>
    </section>
  );
}