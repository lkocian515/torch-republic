import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { getProductImage, getProductAltText } from '@/lib/productImageHelpers';
import { colors } from '@/components/home/editorial/theme';

export default function BotanicalProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const price = Number(product.price || 0);
  const title = product.displayTitle || product.name || product.title;
  const image = getProductImage(product);
  const available = product.availableForSale !== false;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg" style={{ background: colors.card, border: `1px solid ${colors.border}`, boxShadow: '0 18px 50px rgba(53,38,29,0.08)' }}>
      <Link to={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden" aria-label={`View ${title}`} style={{ background: colors.parchment }}>
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-40" style={{ background: colors.sage }} />
        <img src={image} alt={getProductAltText(product)} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" className="relative h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-heading text-sm" style={{ color: product.accent || colors.clay }}>{product.categoryLabel || product.category}</p>
        <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight" style={{ color: colors.espresso }}>{title}</h3>
        <p className="mt-2 flex-1 text-base leading-7" style={{ color: colors.secondary }}>{product.details || product.description}</p>
        <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: colors.border }}>
          <span className="font-heading text-lg font-semibold" style={{ color: colors.espresso }}>{price ? `$${price.toFixed(2)}` : 'Price unavailable'}</span>
          <Link to={`/products/${product.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: colors.forest }}>Details <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <button disabled={!available} onClick={() => addItem({ ...product, name: title, image }, 1)} className="mt-4 inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md px-4 font-heading text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-50" style={{ background: colors.forest, color: colors.cream }}><ShoppingBag className="h-4 w-4" />Add to Cart</button>
      </div>
    </article>
  );
}