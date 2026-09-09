/* global Deno */

// Only the TWO current canonical products are mapped. Matcha and all retired
// blend slugs (SunCap, MoonCap, DreamCap, Oracle, Mystic Bloom, Ember Rise,
// Midnight Watch, The Monk, The Ascendant, The Alchemist) have been removed
// so they can never be sent to Shopify.
//
// Variant IDs were set on 2026-06-11 and have NOT been re-verified since
// matcha removal. They must be confirmed against the live Shopify catalog
// before COMMERCE_ENABLED is set to true.
const VARIANT_ID_MAP = {
  // Classic Coffee
  'instant-classic-coffee': '49166825160956',
  // Mushroom Coffee
  'instant-mushroom-coffee': '50910406050044',
};

// NOTE: These variant IDs are stored for use when commerce is re-enabled.
// They have not been verified against the live Shopify store since the
// matcha removal. The frontend gate (COMMERCE_ENABLED = false) prevents
// this function from being called until verification is complete.
//
// SUBSCRIPTION WARNING: This function builds a Shopify cart permalink with
// ?discount=SUBSCRIBE20. This applies a ONE-TIME discount code — it does
// NOT create a true recurring subscription. No Shopify selling-plan IDs
// are used. True recurring subscriptions require Shopify Subscriptions app
// or Recharge integration, which is not currently configured.

const SHOP_DOMAIN = 'https://libertees-for-all.myshopify.com';

Deno.serve(async (req) => {
  try {
    const { blendQty } = await req.json();

    if (!blendQty || typeof blendQty !== 'object') {
      return Response.json({ error: 'Missing blendQty' }, { status: 400 });
    }

    // Build cart permalink: /cart/VARIANT_ID:QTY,VARIANT_ID:QTY
    const parts = [];
    for (const [slug, qty] of Object.entries(blendQty)) {
      if (qty > 0) {
        const variantId = VARIANT_ID_MAP[slug];
        if (!variantId) {
          console.log('Variant not found for slug:', slug);
          continue;
        }
        parts.push(`${variantId}:${qty}`);
      }
    }

    if (parts.length === 0) {
      return Response.json({ error: 'No valid products in cart' }, { status: 400 });
    }

    // Use Shopify cart permalink — most reliable, no API auth needed
    // Append discount code as query param so it auto-applies at checkout
    const checkoutUrl = `${SHOP_DOMAIN}/cart/${parts.join(',')}?discount=SUBSCRIBE20`;

    return Response.json({
      checkoutUrl,
      discountCode: 'SUBSCRIBE20',
      message: '20% subscription discount auto-applied (one-time discount code, not a recurring selling plan)',
    });
  } catch (error) {
    console.log('Subscription checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});