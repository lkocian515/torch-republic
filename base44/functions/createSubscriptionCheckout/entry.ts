/* global Deno */

// All products keyed by the slug used in the Subscription page blendQty object
// Variant IDs verified from live Shopify catalog (2026-06-11)
const VARIANT_ID_MAP = {
  // Mushroom Coffee
  'suncap-rise': '49148263465212',
  'glowmind-clarity-blend': '49148263596284',
  'mooncap-restore': '49148263760124',
  'dreamcap-blend': '49148263006460',
  'the-oracle': '49148263170300',
  'mystic-bloom': '49148261597436',
  // Classic Coffee
  'torchbearer': '49171204276476',
  'ember-rise': '49171202375932',
  'midnight-watch': '49148262809852',
  // Matcha
  'the-monk-matcha-blend': '49170574115068',
  'the-ascendant-matcha-blend': '49170644402428',
  'the-alchemist-matcha-blend': '49170572148988',
};

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
      message: '20% subscription discount auto-applied',
    });
  } catch (error) {
    console.log('Subscription checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});