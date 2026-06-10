// Static featured products for homepage - uses verified Shopify CDN image URLs
// This ensures homepage loads fast with real product images even if Shopify API is slow

export const HOMEPAGE_FEATURED_PRODUCTS = [
  {
    slug: 'glowmind-clarity-blend',
    label: 'GlowMind Clarity Blend',
    bestFor: 'Deep work & daily focus',
    accent: '#10B981',
    category: 'mushroom-coffee',
    // Verified Shopify CDN image URL
    imageUrl: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/glowmind-clarity-instant-mushroom-coffee-torch-republic.png?v=1781102333',
    alt: 'GlowMind Clarity instant mushroom coffee tube by Torch Republic',
  },
  {
    slug: 'mooncap-restore',
    label: 'MoonCap Restore',
    bestFor: 'Calm evenings & restoration',
    accent: '#8B9ED4',
    category: 'mushroom-coffee',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/mooncap-restore-dark-roast-mushroom-coffee-torch-republic.png?v=1781103576',
    alt: 'MoonCap Restore dark roast mushroom coffee by Torch Republic',
  },
  {
    slug: 'torchbearer',
    label: 'Torchbearer',
    bestFor: 'Bold mornings & deep work',
    accent: '#D6B27A',
    category: 'classic-coffee',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torchbearer-premium-instant-coffee-torch-republic.png?v=1781102333',
    alt: 'Torchbearer premium instant coffee tube by Torch Republic',
  },
  {
    slug: 'the-monk-matcha-blend',
    label: 'The Monk Matcha',
    bestFor: 'Focus, calm & presence',
    accent: '#6EE7B7',
    category: 'matcha',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/the-monk-ceremonial-matcha-torch-republic.png?v=1781102333',
    alt: 'The Monk ceremonial matcha tin by Torch Republic',
  },
];

// Fallback placeholder image
export const FALLBACK_PRODUCT_IMAGE = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-product-placeholder.png?v=1781102333';