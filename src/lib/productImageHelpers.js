export const APPROVED_PRODUCT_IMAGES = {
  'glowmind-clarity': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsadasdas_fdecaa67-f286-4373-a98a-55b775a6a2c9.png?v=1785668747',
  'glowmind-clarity-blend': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsadasdas_fdecaa67-f286-4373-a98a-55b775a6a2c9.png?v=1785668747',
  'glowmind-clarity-instant-mushroom-coffee': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsadasdas_fdecaa67-f286-4373-a98a-55b775a6a2c9.png?v=1785668747',
  'glowmind clarity': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/dsadasdas_fdecaa67-f286-4373-a98a-55b775a6a2c9.png?v=1785668747',
  'suncap-rise': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988',
  'suncap-rise-instant-mushroom-coffee': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988',
  'suncap rise': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988',
  'suncaprise': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/g6tg67.png?v=1785663988',
  'torchbearer': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/15_9efec3d4-7d73-4fd6-a4df-aba0f6cad920.png?v=1781102331',
  'torchbearer-instant-coffee': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/15_9efec3d4-7d73-4fd6-a4df-aba0f6cad920.png?v=1781102331',
  'ember-rise': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/17_a9cde60d-d323-42f1-9eb5-1ca1cce8678e.png?v=1781102333',
  'ember reserve': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/17_a9cde60d-d323-42f1-9eb5-1ca1cce8678e.png?v=1781102333',
  'ember-rise-instant-coffee': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/17_a9cde60d-d323-42f1-9eb5-1ca1cce8678e.png?v=1781102333',
  'midnight-watch': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/14_3a9ab2f8-627d-4d27-a636-29a0900700bb.png?v=1781102333',
  'midnight-watch-instant-coffee': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/14_3a9ab2f8-627d-4d27-a636-29a0900700bb.png?v=1781102333',
  'mooncap-restore': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/12_8e7ecdb4-a0bc-459a-bea5-96fea5263fa2.png?v=1781102333',
  'mooncap-restore-instant-mushroom-coffee': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/12_8e7ecdb4-a0bc-459a-bea5-96fea5263fa2.png?v=1781102333',
  'dreamcap-blend': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/6_8c807391-10cd-46e4-9a59-151cae236e29.png?v=1781102333',
  'dreamcap-instant-mushroom-coffee': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/6_8c807391-10cd-46e4-9a59-151cae236e29.png?v=1781102333',
  'the-oracle': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/10_43ce9b58-361d-4539-9624-443920a03747.png?v=1781102333',
  'the-oracle-instant-mushroom-coffee': 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/10_43ce9b58-361d-4539-9624-443920a03747.png?v=1781102333',
  'mystic-bloom': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a8ad9afd0_2.png',
  'mystic-bloom-blend': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a8ad9afd0_2.png',
  'mystic-bloom-instant-mushroom-coffee': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a8ad9afd0_2.png',
  'the-monk': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/28dd949f5_12.png',
  'the-monk-matcha-blend': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/28dd949f5_12.png',
  'the-ascendant': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/18eb6d3c7_14.png',
  'the-ascendant-matcha-blend': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/18eb6d3c7_14.png',
  'the-alchemist': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ffc347224_17.png',
  'the-alchemist-matcha-blend': 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ffc347224_17.png',
};

export function getApprovedProductImage(product) {
  if (!product) return null;
  const keys = [product.id, product.slug, product.shopifyHandle, product.shopify_handle, product.handle, product.name, product.title]
    .filter(Boolean)
    .map(value => String(value).toLowerCase());
  return keys.map(key => APPROVED_PRODUCT_IMAGES[key]).find(Boolean) || null;
}

export function withApprovedProductImage(product) {
  const approvedImage = getApprovedProductImage(product);
  if (!approvedImage) return product;
  return {
    ...product,
    image: approvedImage,
    imageUrl: approvedImage,
    image_url: approvedImage,
    thumbnail: approvedImage,
    featuredImage: approvedImage,
    heroImage: approvedImage,
    productImage: approvedImage,
    shopifyImage: approvedImage,
    gallery: [approvedImage],
    galleryImages: [approvedImage],
    images: [approvedImage],
  };
}

/**
 * Extract image URL from product object with comprehensive fallback chain
 * Checks all likely Shopify/Base44 image fields in priority order
 * Never returns undefined/null - always provides a valid image URL
 */
export function getProductImage(product, fallbackImage = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ea7e0190c_torch_republic_primary_refined_gradient_4000px.png') {
  if (!product) return fallbackImage;

  const approvedImage = getApprovedProductImage(product);
  if (approvedImage) return approvedImage;

  const imageUrl =
    // DIRECT STRING FIELD - Most important for local catalog
    (typeof product?.image === 'string' ? product.image : null) ||
    // Shopify GraphQL Storefront API format
    product?.featuredImage?.url ||
    product?.featured_image?.src ||
    // Direct image field variations (object form)
    product?.image?.src ||
    product?.image?.url ||
    // Direct camelCase/underscore fields
    product?.imageUrl ||
    product?.image_url ||
    // First image from array
    product?.images?.[0]?.src ||
    product?.images?.[0]?.url ||
    // Shopify media edges format
    product?.media?.edges?.[0]?.node?.image?.url ||
    product?.images?.edges?.[0]?.node?.url ||
    // Custom fallback fields
    product?.fallbackImage ||
    product?.shopifyImage ||
    // Last resort - static placeholder
    fallbackImage;

  // Ensure we never return undefined/null/empty string
  return imageUrl || fallbackImage;
}

/**
 * Generate SEO-friendly alt text for product images
 * Format: "{Product Name} {category} by Torch Republic"
 */
export function getProductAltText(product, defaultAlt = 'Torch Republic premium coffee product') {
  if (!product) return defaultAlt;
  
  const name = product?.title || product?.name || product?.label || 'Product';
  const category = product?.category === 'matcha' ? 'ceremonial matcha' : 
                   product?.category?.includes('mushroom') ? 'mushroom coffee' :
                   product?.category === 'classic-coffee' ? 'instant coffee' : 'product';
  
  return `${name} ${category} by Torch Republic`;
}

/**
 * Determine image loading strategy based on position
 * Above-fold images: eager loading with high priority
 * Below-fold images: lazy loading
 */
export function getImageLoadingProps(index, isHero = false) {
  if (isHero) {
    return {
      loading: 'eager',
      fetchPriority: 'high',
      decoding: 'sync',
    };
  }

  // First 2 images should be eager-loaded (above fold)
  if (index < 2) {
    return {
      loading: 'eager',
      fetchPriority: 'high',
      decoding: 'async',
    };
  }

  // Remaining images lazy-loaded
  return {
    loading: 'lazy',
    fetchPriority: 'low',
    decoding: 'async',
  };
}

/**
 * Get responsive image sizes attribute for better performance
 * Tells browser what image size to load based on viewport
 */
export function getImageSizes(width = '400px') {
  return `(max-width: 640px) ${width}, (max-width: 1024px) ${width}, ${width}`;
}