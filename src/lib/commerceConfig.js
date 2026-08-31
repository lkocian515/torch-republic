/**
 * Centralized commerce-state configuration.
 *
 * COMMERCE_ENABLED gates ALL live Shopify commerce: Storefront API requests,
 * collection fetches, variant-ID lookups, and checkout creation. While false,
 * the app runs in "catalog" mode — products are browsable, but Add-to-cart still
 * works locally and the Checkout action shows an availability notice instead of
 * routing to Shopify (which currently returns HTTP 402).
 *
 * Flip COMMERCE_ENABLED to true once Shopify Storefront access and the Base44
 * backend functions (createShopifyCheckout / createSubscriptionCheckout) are
 * restored on a Builder+ plan. No other code needs to change — the gate is
 * read by lib/shopifyCheckout.js and the checkout UI.
 */
export const COMMERCE_ENABLED = false;

export const STOREFRONT_MODE = COMMERCE_ENABLED ? 'live' : 'catalog';

export const COMMERCE_DISABLED_REASON =
  'The products in your cart are currently sold out. Orders are not being accepted at this time. Please check back soon.';