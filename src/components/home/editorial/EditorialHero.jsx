import React from 'react';
import EditorialButton from './EditorialButton';
import EditorialProductImage from './EditorialProductImage';
import { colors, routes } from './theme';

export default function EditorialHero({ products }) {
  return (
    <section className="px-5 py-12 md:px-10 md:py-16" style={{ background: colors.page }}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.42fr_0.58fr]">
        <div>
          <h1 className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.055em]" style={{ color: colors.text }}>Seven rituals. One steady flame.</h1>
          <p className="mt-6 max-w-xl text-[clamp(1rem,1.5vw,1.18rem)] leading-8" style={{ color: colors.secondary }}>Instant coffee, mushroom coffee, and ceremonial matcha for the way your day unfolds—from the first spark to the slower moments in between.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><EditorialButton to={routes.ritual}>Find Your Ritual</EditorialButton><EditorialButton to={routes.shop} variant="secondary">Shop All Seven</EditorialButton></div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Complete seven-product Torch Republic collection">
          {products.map((product, index) => <EditorialProductImage key={product.id} product={product} eager={index < 3} alt={`${product.displayTitle} tube in the seven-product Torch Republic collection`} />)}
        </div>
      </div>
    </section>
  );
}