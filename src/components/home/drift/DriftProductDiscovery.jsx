import React from 'react';
import { D, TYPE } from './driftTheme';
import { CORE_PRODUCTS } from '@/lib/coreProducts';
import { INSTANT_LINEUP } from '@/lib/coffeeFormats';
import { useCart } from '@/contexts/CartContext';
import useProductCardMotion from './useProductCardMotion';
import DriftProductCard from './DriftProductCard';

export default function DriftProductDiscovery() {
  const { addItem, isAdding } = useCart();
  const [classic, mushroom] = CORE_PRODUCTS;
  const scope = useProductCardMotion();

  return (
    <section ref={scope} style={{ background: D.paper, scrollMarginTop: '96px' }}>
      <div className="mx-auto max-w-[1200px] px-6 pt-10 pb-12 md:py-16">
        {/* Heading — trimmed so the Classic buy buttons sit higher on a phone */}
        <div className="mb-7 max-w-2xl md:mb-10">
          <p style={{ ...TYPE.eyebrow, color: D.terracotta, margin: '0 0 1rem' }}>The Lineup</p>
          <h2 style={{ ...TYPE.heading, color: D.ink, margin: 0 }}>Coffee. In an Instant.</h2>
        </div>

        {/* Balanced two-column grid — one structure for all breakpoints */}
        <div className="grid gap-7 md:grid-cols-2 md:gap-10 lg:gap-12">
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
              formatLabel={INSTANT_LINEUP.label}
              formatNote={INSTANT_LINEUP.note}
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