import React from 'react';
import { Link } from 'react-router-dom';
import BotanicalSectionHeader from './BotanicalSectionHeader';
import BotanicalProductCard from './BotanicalProductCard';
import { colors, routes } from '@/components/home/editorial/theme';

export default function BotanicalFavorites({ products }) {
  const featured = products.slice(0, 6);
  return <section className="px-5 py-16 md:px-10 md:py-24" style={{ background: colors.page }}><div className="mx-auto max-w-[1280px]"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><BotanicalSectionHeader align="left" eyebrow="Featured collection" title="Botanical Favorites"><p>Light-roast coffee, functional mushroom blends, and ceremonial matcha for the rhythms of real life.</p></BotanicalSectionHeader><Link to={routes.shop} className="inline-flex min-h-[46px] items-center justify-center rounded-md px-5 font-heading font-semibold" style={{ border: `1px solid ${colors.forest}`, color: colors.forest }}>Explore All Products</Link></div><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((product, index) => <BotanicalProductCard key={product.id || product.slug} product={product} index={index} />)}</div></div></section>;
}