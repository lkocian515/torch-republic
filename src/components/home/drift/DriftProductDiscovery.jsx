import React from 'react';
import { D, SERIF, MONO } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { useCart } from '@/contexts/CartContext';
import useProductCardMotion from './useProductCardMotion';
import DriftProductCard from './DriftProductCard';

export default function DriftProductDiscovery() {
  const { addItem, isAdding } = useCart();
  const [classic, mushroom] = CORE_PRODUCTS;
  const scope = useProductCardMotion();

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
          {[mushroom, classic].map((product, i) => (
            <DriftProductCard
              key={product.id}
              eyebrow={`0${i + 1} / ${product.ritualKey}`}
              name={product.name}
              flavorLabel={product.flavorLabel}
              description={product.description}
              flavorNotes={product.flavorNotes}
              image={product.image}
              alt={product.alt}
              path={product.path}
              ritualSoft={product.ritual.soft}
              price={product.price}
              servings={product.servings}
              onAdd={() => addItem(product)}
              isAdding={isAdding}
            />
          ))}
        </div>
      </div>
    </section>
  );
}