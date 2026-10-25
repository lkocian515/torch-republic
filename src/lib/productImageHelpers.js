export const PRODUCT_IMAGE_DRAG_PREVENTION_STYLE = {
  WebkitUserDrag: 'none',
  userSelect: 'none',
};

export const PRODUCT_IMAGE_DRAG_PREVENTION_PROPS = {
  draggable: false,
  style: PRODUCT_IMAGE_DRAG_PREVENTION_STYLE,
};

// Only the three current products resolve to a current bag image.
// Retired-only products (SunCap, MoonCap, Ember Reserve, The Monk) are
// intentionally absent so they can NEVER borrow a current bag image — they
// fall back to the logo, since they should not render publicly at all.
const CLASSIC_IMG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f146fdba6_torch-republic-classic-coffee-1600-2.png';
const MUSHROOM_IMG = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f04a19318_torch-republic-mushroom-coffee-1600-1.png';

export const APPROVED_PRODUCT_IMAGES = {
  // Instant Classic Coffee (canonical + active Shopify handle + legacy keys)
  'instant-classic-coffee': CLASSIC_IMG,
  'instant-coffee-1': CLASSIC_IMG,
  'torchbearer': CLASSIC_IMG,
  'torchbearer™-single-origin-instant-coffee': CLASSIC_IMG,
  'torchbearer-instant-coffee': CLASSIC_IMG,
  // Instant Mushroom Coffee (canonical + active Shopify handle + legacy keys)
  'instant-mushroom-coffee': MUSHROOM_IMG,
  'instant-coffee-with-mushroom': MUSHROOM_IMG,
  'glowmind-clarity': MUSHROOM_IMG,
  'glowmind-clarity-blend': MUSHROOM_IMG,
  'glowmind-clarity-instant-mushroom-coffee': MUSHROOM_IMG,
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
export function getProductImage(product, fallbackImage = '/torch-republic-logo-transparent.png') {
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
  const category = product?.category?.includes('mushroom') ? 'mushroom coffee' :
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
      draggable: false,
      style: PRODUCT_IMAGE_DRAG_PREVENTION_STYLE,
    };
  }

  // First 2 images should be eager-loaded (above fold)
  if (index < 2) {
    return {
      loading: 'eager',
      fetchPriority: 'high',
      decoding: 'async',
      draggable: false,
      style: PRODUCT_IMAGE_DRAG_PREVENTION_STYLE,
    };
  }

  // Remaining images lazy-loaded
  return {
    loading: 'lazy',
    fetchPriority: 'low',
    decoding: 'async',
    draggable: false,
    style: PRODUCT_IMAGE_DRAG_PREVENTION_STYLE,
    };
}

/**
 * Get responsive image sizes attribute for better performance
 * Tells browser what image size to load based on viewport
 */
export function getProductImageDragProps(style = {}) {
  return {
    draggable: false,
    style: {
      ...PRODUCT_IMAGE_DRAG_PREVENTION_STYLE,
      ...style,
    },
  };
}

export function getImageSizes(width = '400px') {
  return `(max-width: 640px) ${width}, (max-width: 1024px) ${width}, ${width}`;
}