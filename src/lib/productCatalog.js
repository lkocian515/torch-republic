import { ALL_PRODUCTS } from '@/lib/mushroomProducts';

/**
 * Active public product catalog.
 * Legacy apparel, patriotic merchandise, accessories, pods, and inactive founder-series products are intentionally excluded.
 */
export const PRODUCT_CATALOG = ALL_PRODUCTS.map((product) => ({
  code: product.id,
  series: product.category,
  seriesNum: product.category,
  rarity: 'ACTIVE',
  name: product.name,
  title: product.name,
  roast: product.roast,
  notes: product.flavorNotes?.join(' · ') || product.bestFor || '',
  price: product.price,
  accent: product.accent,
  color: product.accent,
  format: product.category === 'matcha' ? 'MATCHA' : 'INSTANT COFFEE',
  shopifyHandle: product.shopifyHandle,
  internalRoute: `/products/${product.slug}`,
  productsRoute: `/products/${product.slug}`,
  image: product.image,
  category: product.category,
}));

export const getProductByHandle = (handle) =>
  PRODUCT_CATALOG.find((product) => product.shopifyHandle === handle);

export const getProductByRoute = (route) =>
  PRODUCT_CATALOG.find((product) => product.internalRoute === route || product.productsRoute === route);

export const FOUNDERS_PRODUCTS = [];
export const LIBERTY_ICONS_PRODUCTS = [];