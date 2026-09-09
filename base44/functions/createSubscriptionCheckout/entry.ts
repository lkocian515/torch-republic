/* global Deno */
/**
 * SHOPIFY SUBSCRIPTION CHECKOUT
 *
 * Verified variant IDs from Shopify Admin API (2026-09-09):
 *   - Instant Classic Coffee: variant 51245709623548
 *   - Instant Coffee with Mushrooms: variant 51245706608892
 *
 * BLOCKER: No Shopify selling plan groups exist. This function currently
 * builds a cart permalink with a 10% discount code (SUBSCRIBE10) as a
 * one-time discount fallback. This is NOT a true recurring subscription.
 *
 * True recurring subscriptions require:
 *   1. Shopify Subscriptions app installed and configured
 *   2. Selling plan groups created for each product
 *   3. Selling plan IDs queried and stored in SELLING_PLAN_MAP below
 *   4. The createShopifyCheckout function updated to pass sellingPlanId
 *
 * Subscription terms: 10% off, delivered every 4 weeks.
 */

const VARIANT_ID_MAP = {
  'instant-classic-coffee': '51245709623548',
  'instant-mushroom-coffee': '51245706608892',
};

// Will be populated when Shopify selling plans are configured.
const SELLING_PLAN_MAP = {};

const SHOP_DOMAIN = 'https://libertees-for-all.myshopify.com';
const SUBSCRIPTION_DISCOUNT_CODE = 'SUBSCRIBE10';

Deno.serve(async (req) => {
  try {
    const { blendQty } = await req.json();

    if (!blendQty || typeof blendQty !== 'object') {
      return Response.json({ error: 'Missing blendQty' }, { status: 400 });
    }

    const parts = [];
    for (const [slug, qty] of Object.entries(blendQty)) {
      if (qty > 0) {
        const variantId = VARIANT_ID_MAP[slug];
        if (!variantId) {
          continue;
        }
        parts.push(`${variantId}:${qty}`);
      }
    }

    if (parts.length === 0) {
      return Response.json({ error: 'No valid products in cart' }, { status: 400 });
    }

    const checkoutUrl = `${SHOP_DOMAIN}/cart/${parts.join(',')}?discount=${SUBSCRIPTION_DISCOUNT_CODE}`;

    return Response.json({
      checkoutUrl,
      discountCode: SUBSCRIPTION_DISCOUNT_CODE,
      message: '10% subscription discount applied (one-time discount code, not a recurring selling plan). True recurring subscriptions require Shopify Subscriptions app configuration.',
      sellingPlansConfigured: Object.keys(SELLING_PLAN_MAP).length > 0,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});