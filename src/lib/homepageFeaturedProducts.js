import { PRICES } from './pricingConfig';
import { ALL_PRODUCTS, MUSHROOM_PRODUCTS, CLASSIC_COFFEE_PRODUCTS, MATCHA_PRODUCTS } from './mushroomProducts';
import { getProductImage as getAuthoritativeProductImage } from './productImageHelpers';

export const FALLBACK_PRODUCT_IMAGE = null;

export function getProductImage(product) {
  return getAuthoritativeProductImage(product);
}

function toHomepageProduct(product) {
  return {
    slug: product.slug,
    title: product.name,
    label: product.name,
    category: product.category,
    bestFor: product.bestFor,
    accent: product.accent,
    price: PRICES[product.category] || product.price,
    cta: 'Add to Cart',
    imageUrl: getAuthoritativeProductImage(product),
    alt: product.alt,
  };
}

export const HOMEPAGE_FEATURED_PRODUCTS = ALL_PRODUCTS.map(toHomepageProduct);
export const ALL_HOMEPAGE_PRODUCTS = HOMEPAGE_FEATURED_PRODUCTS;

export const CATEGORY_IMAGES = {
  'mushroom-coffee': {
    imageUrl: getAuthoritativeProductImage(MUSHROOM_PRODUCTS[0]),
    alt: 'Mushroom Coffee collection by Torch Republic',
  },
  'classic-coffee': {
    imageUrl: getAuthoritativeProductImage(CLASSIC_COFFEE_PRODUCTS[0]),
    alt: 'Classic Instant Coffee collection by Torch Republic',
  },
  'matcha': {
    imageUrl: getAuthoritativeProductImage(MATCHA_PRODUCTS[0]),
    alt: 'Ceremonial Matcha collection by Torch Republic',
  },
};