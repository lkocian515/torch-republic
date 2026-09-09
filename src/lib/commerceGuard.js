import { COMMERCE_ENABLED } from './commerceConfig';

/**
 * Returns true when live commerce is available and the caller may proceed
 * with a Shopify request / checkout. Returns false (and fires a global
 * 'tr:commerce-unavailable' event that <CommerceNotice /> listens for) when
 * commerce is disabled — so the caller must NOT make any Shopify request.
 */
export function isCommerceEnabled() {
  return COMMERCE_ENABLED;
}

export function requireCommerce() {
  if (COMMERCE_ENABLED) return true;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tr:commerce-unavailable'));
  }
  return false;
}

/**
 * Report that a specific product is sold out (Shopify reports the variant
 * as unavailable for sale). Dispatches 'tr:product-sold-out' which
 * <CommerceNotice /> listens for to show a "Product Sold Out" message.
 */
export function reportProductSoldOut(productTitle) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('tr:product-sold-out', { detail: { productTitle } }));
  }
}