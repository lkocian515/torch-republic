/**
 * PURCHASE_FALLBACK — temporary, reversible front-end guard.
 *
 * While the external Shopify commerce connection is unavailable, this guard
 * intercepts the FIRST broken purchase step (checkout handoff and any CTA that
 * builds a direct Shopify cart/checkout URL) and redirects the visitor to the
 * polished /restocking page instead of sending them to a broken external checkout.
 *
 * The Base44 cart, Add to Cart, quantity controls, and all locally-working
 * ecommerce interactions remain fully functional underneath — only the external
 * handoff is intercepted.
 *
 * TO RESTORE the original flow: set PURCHASE_FALLBACK_MODE = false.
 * No cart / checkout / architecture changes are required to revert.
 */
export const PURCHASE_FALLBACK_MODE = false;
export const RESTOCKING_PATH = '/restocking';

/**
 * Call from any checkout / direct-purchase CTA onClick or handler.
 * Returns true when it intercepted (caller should early-return).
 * Pass the DOM event for <a> CTAs so the original navigation is cancelled.
 */
export function guardExternalPurchase(event) {
  if (!PURCHASE_FALLBACK_MODE) return false;
  try {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
      event.stopPropagation();
    }
  } catch {
    /* noop */
  }
  if (typeof window !== 'undefined') {
    window.location.assign(RESTOCKING_PATH);
  }
  return true;
}