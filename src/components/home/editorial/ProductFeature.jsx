import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from './theme';
import EditorialProductImage from './EditorialProductImage';

export default function ProductFeature({ product, reverse = false }) {
  return <article className={`grid grid-cols-1 gap-8 py-12 md:grid-cols-2 md:items-center ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`} style={{ borderTop: `1px solid ${colors.border}` }}><EditorialProductImage product={product} alt={`${product.displayTitle} product tube with visible front label`} /><div><p className="font-heading text-sm" style={{ color: product.accent || colors.coffee }}>{product.categoryLabel}</p><h3 className="mt-3 font-serif text-4xl font-bold tracking-[-0.03em]" style={{ color: colors.text }}>{product.heading}</h3><p className="mt-5 text-lg leading-8" style={{ color: colors.secondary }}>{product.body}</p><p className="mt-5 text-sm" style={{ color: colors.text }}>{product.details}</p><Link to={`/products/${product.slug}`} className="mt-7 inline-flex min-h-[44px] items-center border-b pb-1 font-heading text-base font-semibold transition-opacity duration-200 hover:opacity-70" style={{ borderColor: product.accent || colors.coffee, color: colors.text }}>{product.button}</Link></div></article>;
}