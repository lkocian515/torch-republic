/**
 * Homepage Featured Products - Shopify CANONICAL image source
 * 
 * CRITICAL: Shopify product media is the CANONICAL source for all imagery.
 * - No product images are stored in Base44
 * - All images update automatically when changed in Shopify
 * - This file provides fallback metadata only - images come from Shopify
 */

import { base44 } from '@/api/base44Client';

// Fallback placeholder - ONLY used if Shopify is unreachable
export const FALLBACK_PRODUCT_IMAGE = 'https://cdn.shopify.com/s/files/1/0620/7140/6844/files/torch-republic-product-placeholder.png?v=1781102333';

/**
 * Helper to safely extract image URL from product data (Shopify-first)
 * Checks all Shopify image fields in priority order
 */
export function getProductImage(product) {
  const imageUrl =
    // Shopify Storefront API format (featuredImage object)
    product?.featuredImage?.url ||
    // Shopify Admin API format (featured_image object)
    product?.featured_image?.src ||
    // Direct image field variations
    product?.image?.src ||
    product?.image?.url ||
    // Direct string fields
    (typeof product?.image === 'string' ? product.image : null) ||
    // CamelCase/underscore variations
    product?.imageUrl ||
    product?.image_url ||
    // First image from gallery array
    product?.images?.[0]?.src ||
    product?.images?.[0]?.url ||
    // Shopify media edges format
    product?.media?.edges?.[0]?.node?.image?.url ||
    product?.images?.edges?.[0]?.node?.url ||
    // Custom fallback fields
    product?.fallbackImage ||
    product?.shopifyImage ||
    // Last resort - static placeholder
    FALLBACK_PRODUCT_IMAGE;
  
  // Never return undefined/null/empty
  return imageUrl || FALLBACK_PRODUCT_IMAGE;
}

/**
 * Fetches featured products with LIVE Shopify images
 * Returns products with canonical Shopify media data
 */
export async function getFeaturedProductsWithShopifyImages() {
  try {
    // Fetch all products with Shopify media
    const response = await base44.functions.invoke('fetchShopifyProductMedia', {});
    const shopifyProducts = response.data?.products || [];
    
    // Map local product slugs to Shopify handles
    const handleMapping = {
      'glowmind-clarity-blend': 'glowmind-clarity-blend',
      'mooncap-restore': 'mooncap-restore',
      'torchbearer': 'torchbearer',
      'the-monk-matcha-blend': 'the-monk-matcha-blend',
    };
    
    // Get featured products from Shopify
    const featured = shopifyProducts.filter(p => 
      Object.values(handleMapping).includes(p.handle)
    );
    
    // Map to frontend format with Shopify images as canonical
    return featured.map(shopify => ({
      slug: shopify.handle,
      title: shopify.title,
      label: shopify.title,
      category: getCategoryFromHandle(shopify.handle),
      bestFor: getBestFor(shopify.handle),
      accent: getAccentColor(shopify.handle),
      price: shopify.price || 29.99,
      cta: 'Add to Cart',
      // CANONICAL: Shopify featured image
      imageUrl: shopify.featuredImage?.url || FALLBACK_PRODUCT_IMAGE,
      imageAlt: shopify.featuredImage?.alt || `${shopify.title} by Torch Republic`,
      // Full gallery from Shopify
      galleryImages: shopify.images?.map(img => img.url) || [],
      // Shopify availability
      availableForSale: shopify.availableForSale,
      shopifyData: shopify,
    }));
  } catch (error) {
    console.error('❌ Failed to fetch Shopify images:', error);
    // Return static fallback (without images)
    return getStaticFallbackProducts();
  }
}

function getCategoryFromHandle(handle) {
  if (handle.includes('matcha')) return 'matcha';
  if (handle.includes('mushroom')) return 'mushroom-coffee';
  return 'classic-coffee';
}

function getBestFor(handle) {
  const mapping = {
    'glowmind-clarity-blend': 'Deep work & daily focus',
    'mooncap-restore': 'Calm evenings & restoration',
    'torchbearer': 'Bold mornings & deep work',
    'the-monk-matcha-blend': 'Focus, calm & presence',
  };
  return mapping[handle] || 'Daily ritual';
}

function getAccentColor(handle) {
  const mapping = {
    'glowmind-clarity-blend': '#10B981',
    'mooncap-restore': '#8B9ED4',
    'torchbearer': '#D6B27A',
    'the-monk-matcha-blend': '#6EE7B7',
  };
  return mapping[handle] || '#E6B7AD';
}

function getStaticFallbackProducts() {
  return [
    {
      slug: 'glowmind-clarity-blend',
      label: 'GlowMind Clarity Blend',
      category: 'mushroom-coffee',
      bestFor: 'Deep work & daily focus',
      accent: '#10B981',
      price: 29.99,
      imageUrl: FALLBACK_PRODUCT_IMAGE,
      availableForSale: true,
    },
    {
      slug: 'mooncap-restore',
      label: 'MoonCap Restore',
      category: 'mushroom-coffee',
      bestFor: 'Calm evenings & restoration',
      accent: '#8B9ED4',
      price: 29.99,
      imageUrl: FALLBACK_PRODUCT_IMAGE,
      availableForSale: true,
    },
    {
      slug: 'torchbearer',
      label: 'Torchbearer',
      category: 'classic-coffee',
      bestFor: 'Bold mornings & deep work',
      accent: '#D6B27A',
      price: 29.99,
      imageUrl: FALLBACK_PRODUCT_IMAGE,
      availableForSale: true,
    },
    {
      slug: 'the-monk-matcha-blend',
      label: 'The Monk Matcha',
      category: 'matcha',
      bestFor: 'Focus, calm & presence',
      accent: '#6EE7B7',
      price: 29.99,
      imageUrl: FALLBACK_PRODUCT_IMAGE,
      availableForSale: true,
    },
  ];
}

// Legacy static products - DEPRECATED, use getFeaturedProductsWithShopifyImages() instead
export const HOMEPAGE_FEATURED_PRODUCTS = getStaticFallbackProducts();