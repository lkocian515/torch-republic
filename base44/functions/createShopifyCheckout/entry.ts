/* global Deno */
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.myshopify.com';

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
  console.log('Storefront response:', JSON.stringify(json));
  return json;
}

Deno.serve(async (req) => {
  try {
    const { handle, quantity = 1 } = await req.json();

    console.log('Token (first 8 chars):', STOREFRONT_TOKEN ? STOREFRONT_TOKEN.substring(0, 8) : 'NOT SET');

    // Step 1: get first variant ID for this product handle
    const productData = await storefrontQuery(`
      query getProduct($handle: String!) {
        productByHandle(handle: $handle) {
          title
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                priceV2 { amount currencyCode }
              }
            }
          }
        }
      }
    `, { handle });

    const variant = productData?.data?.productByHandle?.variants?.edges?.[0]?.node;
    if (!variant) {
      return Response.json({ error: 'Product not found', details: productData?.errors }, { status: 404 });
    }

    // Step 2: create cart with that variant
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
    `, {
      lines: [{ merchandiseId: variant.id, quantity }]
    });

    const cart = cartData?.data?.cartCreate?.cart;
    if (!cart) {
      const errors = cartData?.data?.cartCreate?.userErrors;
      return Response.json({ error: 'Cart creation failed', details: errors }, { status: 500 });
    }

    return Response.json({ checkoutUrl: cart.checkoutUrl, cartId: cart.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});