import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';
import { colors, routes } from './theme';

export default function FeaturedProducts({ products }) {
  const { addItem } = useCart();
  const featured = (products || []).slice(0, 4);

  const handleAdd = (product) => {
    const title = product.displayTitle || product.name || product.title;
    addItem({
      id: product.id || product.slug,
      name: title,
      price: product.price,
      image: getProductImage(product),
      category: product.category,
      servings: product.servings,
      shopifyHandle: product.shopifyHandle,
    });
  };

  return (
    <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.cream }}>
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-heading text-sm tracking-[0.22em] uppercase" style={{ color: colors.gold }}>Featured collection</p>
            <h2 className="mt-3 font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.04] tracking-[-0.03em]" style={{ color: colors.forest }}>Customer favorites</h2>
            <p className="mt-4 text-lg leading-8" style={{ color: colors.secondary }}>A short list of the blends our community reaches for most.</p>
          </div>
          <Link to={routes.shop} className="inline-flex min-h-[44px] items-center font-heading text-sm font-semibold underline underline-offset-4 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: colors.forest, borderRadius: '4px' }}>
            Explore all products
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => {
            const title = product.displayTitle || product.name || product.title;
            const image = getProductImage(product);
            const price = Number(product.price || 0);
            return (
              <article key={product.id || product.slug} className="flex h-full flex-col overflow-hidden rounded-lg" style={{ background: colors.card, border: `1px solid ${colors.border}`, boxShadow: '0 12px 36px rgba(53,38,29,0.06)' }}>
                <Link to={`/products/${product.slug}`} className="block aspect-square overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ background: colors.parchment, borderRadius: '4px' }} aria-label={`View ${title}`}>
                  <img src={image} alt={getProductAltText(product)} loading="lazy" decoding="async" width={400} height={400} className="h-full w-full object-contain p-5" />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-heading text-sm" style={{ color: colors.clay }}>{product.categoryLabel || product.category}</p>
                  <h3 className="mt-1 font-serif text-xl font-semibold leading-tight" style={{ color: colors.espresso }}>{title}</h3>
                  {product.details && <p className="mt-2 text-sm leading-6" style={{ color: colors.secondary }}>{product.details}</p>}
                  <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: colors.border }}>
                    <span className="font-heading text-lg font-semibold" style={{ color: colors.espresso }}>{price ? `$${price.toFixed(2)}` : 'Price unavailable'}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-4 font-heading text-sm font-semibold transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{ background: colors.forest, color: colors.cream }}
                    >
                      <ShoppingBag className="h-4 w-4" aria-hidden="true" /> Add to Cart
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}