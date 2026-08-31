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