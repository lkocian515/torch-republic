/**
 * Centralized commerce-state configuration.
 *
 * COMMERCE_ENABLED gates ALL live Shopify commerce: Storefront API requests,
 * collection fetches, variant-ID lookups, and checkout creation.
 *
 * PREVIEW STATUS: Commerce is enabled for preview testing. The published
 * production version is unaffected — this flag only controls the Base44
 * preview environment. No payment is charged and no order is created until
 * the user completes checkout on Shopify's hosted checkout page.
 */
export const COMMERCE_ENABLED = true;

export const STOREFRONT_MODE = COMMERCE_ENABLED ? 'live' : 'catalog';

export const COMMERCE_DISABLED_TITLE = 'Checkout Temporarily Unavailable';
export const COMMERCE_DISABLED_REASON =
  'Online checkout is temporarily unavailable while we complete final store testing. Please check back soon.';

export const PRODUCT_SOLD_OUT_TITLE = 'Product Sold Out';
export const PRODUCT_SOLD_OUT_REASON =
  'This product is currently unavailable for purchase. Please check back soon.';