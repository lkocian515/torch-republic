/**
 * Homepage Featured Products - Static data with verified Shopify CDN image URLs
 * This ensures homepage loads instantly with real product images even if Shopify API is slow
 * 
 * CACHE-BUSTING: All image URLs include version parameter to force refresh when Shopify images are updated
 * To refresh all images after Shopify updates, increment the IMAGE_CACHE_VERSION below
 */

// Image cache version - increment this when Shopify product images are updated to force browser refresh
const IMAGE_CACHE_VERSION = 'v=1781102333';

// Fallback placeholder image - Torch Republic branded with cache-busting
export const FALLBACK_PRODUCT_IMAGE = `https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-product-placeholder.png?${IMAGE_CACHE_VERSION}`;

// Helper function to safely extract image URL from product data
export function getProductImage(product) {
  // Check all likely Shopify/Base44 image fields in priority order
  const imageUrl =
    product?.featuredImage?.url ||
    product?.featured_image?.src ||
    product?.image?.src ||
    product?.image?.url ||
    product?.imageUrl ||
    product?.image_url ||
    product?.images?.[0]?.src ||
    product?.images?.[0]?.url ||
    product?.media?.edges?.[0]?.node?.image?.url ||
    product?.images?.edges?.[0]?.node?.url ||
    product?.fallbackImage ||
    product?.image ||
    FALLBACK_PRODUCT_IMAGE;
  
  // Never render empty/null/undefined
  return imageUrl || FALLBACK_PRODUCT_IMAGE;
}

// All verified homepage featured products with real lifestyle images
// IMPORTANT: These images should match what's in Shopify - update URLs when Shopify images change
export const HOMEPAGE_FEATURED_PRODUCTS = [
  // Mushroom Coffee - Top Sellers
  {
    slug: 'glowmind-clarity-blend',
    title: 'GlowMind Clarity Blend',
    label: 'GlowMind Clarity Blend',
    category: 'mushroom-coffee',
    bestFor: 'Deep work & daily focus',
    accent: '#10B981',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/glowmind-clarity-mushroom-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'GlowMind Clarity instant mushroom coffee by Torch Republic',
  },
  {
    slug: 'mooncap-restore',
    title: 'MoonCap Restore',
    label: 'MoonCap Restore',
    category: 'mushroom-coffee',
    bestFor: 'Calm evenings & restoration',
    accent: '#8B9ED4',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/mooncap-restore-mushroom-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'MoonCap Restore dark roast mushroom coffee by Torch Republic',
  },
  // Classic Coffee
  {
    slug: 'torchbearer',
    title: 'Torchbearer',
    label: 'Torchbearer',
    category: 'classic-coffee',
    bestFor: 'Bold mornings & deep work',
    accent: '#D6B27A',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/torchbearer-classic-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'Torchbearer premium instant coffee by Torch Republic',
  },
  // Matcha
  {
    slug: 'the-monk-matcha-blend',
    title: 'The Monk Matcha',
    label: 'The Monk Matcha',
    category: 'matcha',
    bestFor: 'Focus, calm & presence',
    accent: '#6EE7B7',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/the-monk-ceremonial-matcha.png?${IMAGE_CACHE_VERSION}`,
    alt: 'The Monk ceremonial matcha by Torch Republic',
  },
];

// Extended product list for collection pages with all active products
export const ALL_HOMEPAGE_PRODUCTS = [
  ...HOMEPAGE_FEATURED_PRODUCTS,
  // Additional Mushroom Coffee
  {
    slug: 'suncap-rise',
    title: 'SunCap Rise',
    label: 'SunCap Rise',
    category: 'mushroom-coffee',
    bestFor: 'Morning energy & fresh starts',
    accent: '#D6B27A',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/suncap-rise-mushroom-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'SunCap Rise instant mushroom coffee by Torch Republic',
  },
  {
    slug: 'dreamcap-blend',
    title: 'DreamCap Blend',
    label: 'DreamCap Blend',
    category: 'mushroom-coffee',
    bestFor: 'Evening ritual & nighttime creativity',
    accent: '#4A6DB8',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/dreamcap-blend-mushroom-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'DreamCap Blend instant mushroom coffee by Torch Republic',
  },
  {
    slug: 'the-oracle-blend',
    title: 'The Oracle Blend',
    label: 'The Oracle Blend',
    category: 'mushroom-coffee',
    bestFor: 'Creative flow & intuition',
    accent: '#B88FA8',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/the-oracle-blend-mushroom-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'The Oracle Blend instant mushroom coffee by Torch Republic',
  },
  {
    slug: 'mystic-bloom-blend',
    title: 'Mystic Bloom Blend',
    label: 'Mystic Bloom Blend',
    category: 'mushroom-coffee',
    bestFor: 'Balance & gentle mornings',
    accent: '#E6B7C8',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/mystic-bloom-blend-mushroom-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'Mystic Bloom Blend instant mushroom coffee by Torch Republic',
  },
  // Additional Classic Coffee
  {
    slug: 'ember-rise',
    title: 'Ember Rise',
    label: 'Ember Rise',
    category: 'classic-coffee',
    bestFor: 'Morning energy & momentum',
    accent: '#D67A5A',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/ember-rise-classic-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'Ember Rise premium instant coffee by Torch Republic',
  },
  {
    slug: 'midnight-watch',
    title: 'Midnight Watch',
    label: 'Midnight Watch',
    category: 'classic-coffee',
    bestFor: 'Late nights & quiet focus',
    accent: '#5A6B7C',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/midnight-watch-classic-coffee.png?${IMAGE_CACHE_VERSION}`,
    alt: 'Midnight Watch premium instant coffee by Torch Republic',
  },
  // Additional Matcha
  {
    slug: 'the-ascendant-matcha-blend',
    title: 'The Ascendant Matcha',
    label: 'The Ascendant Matcha',
    category: 'matcha',
    bestFor: 'Growth & elevated energy',
    accent: '#8BC45A',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/the-ascendant-matcha-blend.png?${IMAGE_CACHE_VERSION}`,
    alt: 'The Ascendant ceremonial matcha by Torch Republic',
  },
  {
    slug: 'the-alchemist-matcha-blend',
    title: 'The Alchemist Matcha',
    label: 'The Alchemist Matcha',
    category: 'matcha',
    bestFor: 'Creativity & inspired focus',
    accent: '#C4A85A',
    price: 29.99,
    cta: 'Add to Cart',
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/products/the-alchemist-matcha-blend.png?${IMAGE_CACHE_VERSION}`,
    alt: 'The Alchemist ceremonial matcha by Torch Republic',
  },
];

// Category collection images for ThreeCategories section
export const CATEGORY_IMAGES = {
  'classic-coffee': {
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/classic-instant-coffee-collection.png?${IMAGE_CACHE_VERSION}`,
    alt: 'Classic Instant Coffee collection by Torch Republic',
  },
  'mushroom-coffee': {
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/mushroom-coffee-collection.png?${IMAGE_CACHE_VERSION}`,
    alt: 'Mushroom Coffee collection by Torch Republic',
  },
  'matcha': {
    imageUrl: `https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/ceremonial-matcha-collection.png?${IMAGE_CACHE_VERSION}`,
    alt: 'Ceremonial Matcha collection by Torch Republic',
  },
};