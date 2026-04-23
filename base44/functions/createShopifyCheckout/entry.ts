/* global Deno */
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
// The Storefront API token is scoped to this myshopify domain (custom domain: torch-republic.com)
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
    const { handle, quantity = 1, variantId } = await req.json();

    if (!handle && !variantId) {
      return Response.json({ error: 'Missing handle or variantId' }, { status: 400 });
    }

    let selectedVariantId = variantId;

    if (!selectedVariantId) {
      // Fetch ALL variants and pick the first available one
      const productData = await storefrontQuery(`
        query getProduct($handle: String!) {
          productByHandle(handle: $handle) {
            title
            availableForSale
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  priceV2 { amount currencyCode }
                }
              }
            }
          }
        }
      `, { handle });

      const product = productData?.data?.productByHandle;
      if (!product) {
        console.log('Product not found for handle:', handle, JSON.stringify(productData?.errors));
        return Response.json({ error: 'Product not found', handle, details: productData?.errors }, { status: 404 });
      }

      const allVariants = product.variants?.edges?.map(e => e.node) || [];

      // Always prefer first AVAILABLE variant; fall back to first variant if none available
      const availableVariant = allVariants.find(v => v.availableForSale);
      const chosenVariant = availableVariant || allVariants[0];

      if (!chosenVariant) {
        return Response.json({ error: 'No variants found', handle }, { status: 404 });
      }

      console.log(`Product: ${product.title} | Available: ${product.availableForSale} | Chosen variant: ${chosenVariant.title} | Available: ${chosenVariant.availableForSale}`);
      selectedVariantId = chosenVariant.id;
    }

    // Create cart with the chosen variant
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
      lines: [{ merchandiseId: selectedVariantId, quantity }]
    });

    const cart = cartData?.data?.cartCreate?.cart;
    const userErrors = cartData?.data?.cartCreate?.userErrors;
    if (!cart) {
      console.log('Cart creation failed:', JSON.stringify(userErrors));
      return Response.json({ error: 'Cart creation failed', details: userErrors }, { status: 500 });
    }

    return Response.json({ checkoutUrl: cart.checkoutUrl, cartId: cart.id });
  } catch (error) {
    console.log('Checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});