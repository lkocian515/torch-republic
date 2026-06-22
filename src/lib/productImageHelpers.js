/**
 * Extract image URL from product object with comprehensive fallback chain
 * Checks all likely Shopify/Base44 image fields in priority order
 * Never returns undefined/null - always provides a valid image URL
 */
export function getProductImage(product, fallbackImage = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-product-placeholder.png?v=1781102333') {
  if (!product) return fallbackImage;

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