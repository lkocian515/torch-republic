import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { colors } from './theme';
import EditorialProductImage from './EditorialProductImage';

export default function EditorialProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const available = product.availableForSale !== false;
  const price = Number(product.price || 0);
  return (
    <article className="flex h-full flex-col" style={{ background: colors.card, border: `1px solid ${colors.border}` }}>
      <Link to={`/products/${product.slug}`} aria-label={`View Product: ${product.displayTitle}`}>
        <EditorialProductImage product={product} eager={index < 2} alt={`${product.displayTitle} tube shown upright with label visible`} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 font-heading text-sm" style={{ color: product.accent || colors.coffee }}>{product.categoryLabel}</p>
        <h3 className="font-serif text-2xl font-bold leading-tight" style={{ color: colors.text }}>{product.displayTitle}</h3>
        <p className="mt-2 text-base leading-relaxed" style={{ color: colors.secondary }}>{product.details}</p>
        <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: colors.border }}>
          <p className="font-heading text-lg font-semibold" style={{ color: colors.text }}>{price ? `$${price.toFixed(2)}` : 'Price unavailable'}</p>
          <p className="text-sm" style={{ color: available ? colors.sage : colors.secondary }}>{available ? 'Available' : 'Unavailable'}</p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button disabled={!available} onClick={() => addItem({ ...product, name: product.displayTitle })} className="min-h-[44px] px-4 py-2 font-heading text-sm font-semibold transition-opacity duration-200 hover:opacity-85 disabled:opacity-50" style={{ background: colors.text, color: colors.card }}>Add to Cart</button>
          <Link to={`/products/${product.slug}`} className="flex min-h-[44px] items-center justify-center px-4 py-2 font-heading text-sm font-semibold transition-opacity duration-200 hover:opacity-80" style={{ border: `1px solid ${colors.border}`, color: colors.text }}>View Product</Link>
        </div>
      </div>
    </article>
  );
}