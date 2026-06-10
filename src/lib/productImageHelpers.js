/**
 * Product Image Helper Functions
 * 
 * Extracts image URLs from product objects with comprehensive fallback chain.
 * Includes cache-busting to ensure fresh images are loaded when Shopify images are updated.
 * 
 * CACHE-BUSTING: All Shopify CDN URLs include version parameter.
 * To refresh all images after Shopify updates, increment the IMAGE_CACHE_VERSION below.
 */

// Image cache version - increment this when Shopify product images are updated (format: v=YYYYMMDDNN)
const IMAGE_CACHE_VERSION = 'v=1781102333';

// Add cache-busting parameter to Shopify CDN URLs
function addCacheBuster(url) {
  if (!url || typeof url !== 'string') return url;
  // Don't add cache buster to non-Shopify URLs
  if (!url.includes('cdn.shopify.com')) return url;
  // Add cache version if not already present
  if (url.includes('?')) {
    return url.includes('v=') ? url : `${url}&${IMAGE_CACHE_VERSION}`;
  }
  return `${url}?${IMAGE_CACHE_VERSION}`;
}

/**
 * Extract image URL from product object with comprehensive fallback chain
 * Checks all likely Shopify/Base44 image fields in priority order
 * Never returns undefined/null - always provides a valid image URL
 * 
 * @param {Object} product - Product object from Shopify or local catalog
 * @param {string} fallbackImage - Fallback image URL (optional)
 * @returns {string} Image URL with cache-busting
 */
export function getProductImage(product, fallbackImage = `https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-product-placeholder.png?${IMAGE_CACHE_VERSION}`) {
  if (!product) return fallbackImage;

  // DEBUG: Log product image data to console (remove in production)
  console.log("🔍 SHOP PRODUCT IMAGE DEBUG", {
    title: product?.title || product?.name,
    handle: product?.shopifyHandle || product?.handle,
    image_direct: product?.image,
    image_src: product?.image?.src,
    image_url: product?.image?.url,
    imageUrl: product?.imageUrl,
    image_url_underscore: product?.image_url,
    featuredImage: product?.featuredImage,
    featured_image: product?.featured_image,
    images_array: product?.images,
    media: product?.media,
  });

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

  // Add cache-busting and ensure we never return undefined/null/empty string
  const finalUrl = addCacheBuster(imageUrl) || fallbackImage;
  
  console.log("✅ FINAL IMAGE URL:", finalUrl);
  
  return finalUrl;
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
      fetchpriority: 'high',
      decoding: 'async',
    };
  }
  
  // First 2-4 images should be eager-loaded (above fold)
  if (index < 2) {
    return {
      loading: 'eager',
      fetchpriority: 'high',
      decoding: 'async',
    };
  }
  
  // Remaining images can be lazy-loaded
  return {
    loading: 'lazy',
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