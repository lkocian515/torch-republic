import React from 'react';
import ProductFeature from './ProductFeature';
import { colors } from './theme';

export default function ProductStorySections({ products }) {
  return <section className="px-5 py-10 md:px-10" style={{ background: colors.card }}><div className="mx-auto max-w-[1180px]">{products.map((product, i) => <ProductFeature key={product.id} product={product} reverse={i % 2 === 1} />)}</div></section>;
}