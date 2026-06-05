/* global Deno */
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

async function storefrontQuery(query, variables = {}) {
  const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  return json;
}

Deno.serve(async (req) => {
  try {
    const { blendQty } = await req.json();

    if (!blendQty || typeof blendQty !== 'object') {
      return Response.json({ error: 'Missing blendQty' }, { status: 400 });
    }

    // Build cart lines from blend selection
    const lines = [];
    for (const [slug, qty] of Object.entries(blendQty)) {
      if (qty > 0) {
        // Get variant ID from the known mapping
        const variantIdMap = {
          'mooncap-restore': '49148263760124',
          'glowmind-clarity': '49148263596284',
          'suncap-rise': '49148263465212',
          'the-oracle': '49148263170300',
          'mystic-bloom': '49148263006460',
          'dreamcap-blend': '49148261597436',
        };

        const variantId = variantIdMap[slug];
        if (!variantId) {
          console.log('Variant not found for slug:', slug);
          continue;
        }

        lines.push({
          merchandiseId: variantId,
          quantity: qty,
        });
      }
    }

    if (lines.length === 0) {
      return Response.json({ error: 'No valid products in cart' }, { status: 400 });
    }

    // Create cart with subscription items
    const cartData = await storefrontQuery(`
      mutation cartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
          }
          userErrors { field message }
        }
      }
    `, { lines });

    const cart = cartData?.data?.cartCreate?.cart;
    const userErrors = cartData?.data?.cartCreate?.userErrors;
    
    if (!cart) {
      console.log('Cart creation failed:', JSON.stringify(userErrors));
      return Response.json({ error: 'Cart creation failed', details: userErrors }, { status: 500 });
    }

    // Return checkout URL - discount code SUBSCRIBE20 will be shown to user
    // The discount code must be pre-created in Shopify Admin with 20% off for subscriptions
    return Response.json({ 
      checkoutUrl: cart.checkoutUrl, 
      cartId: cart.id,
      discountCode: 'SUBSCRIBE20',
      message: '20% subscription discount will be applied',
    });
  } catch (error) {
    console.log('Subscription checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});