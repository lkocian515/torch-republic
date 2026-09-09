/* global Deno */
/**
 * SHOPIFY STOREFRONT CART CREATE
 *
 * Verified variant IDs from Shopify Admin API (2026-09-09):
 *   - Instant Classic Coffee: variant 51245709623548 (handle: instant-coffee-1)
 *   - Instant Coffee with Mushrooms: variant 51245706608892 (handle: instant-coffee-with-mushroom)
 *
 * BLOCKER: The SHOPIFY_STOREFRONT_TOKEN currently returns 401 UNAUTHORIZED.
 * This function will fail until the Storefront API access is restored.
 * Cart permalinks (/cart/variant:qty) work as a fallback and do not require
 * the Storefront API.
 *
 * When the token is fixed, this function supports:
 *   - Multi-line carts (array of { handle/slug, quantity, sellingPlanId? })
 *   - Subscription lines via sellingPlanId (when Shopify selling plans are configured)
 */
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';
const API_VERSION = '2024-10';

// Verified variant IDs — the ACTIVE, PUBLISHED products only.
const VARIANT_ID_MAP = {
  'instant-classic-coffee': '51245709623548',
  'instant-mushroom-coffee': '51245706608892',
  // Active Shopify handles (for lookups by handle)
  'instant-coffee-1': '51245709623548',
  'instant-coffee-with-mushroom': '51245706608892',
};

// Selling plan IDs will be populated when Shopify Subscriptions is configured.
// Currently EMPTY — no selling plan groups exist in Shopify.
const SELLING_PLAN_MAP = {};

async function storefrontQuery(query, variables = {}) {
  const res = await fetch(`https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`, {
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
    // Accept either a single product or an array of lines.
    const body = await req.json();
    const lines = Array.isArray(body.lines) ? body.lines : [body];

    if (lines.length === 0 || (!lines[0].handle && !lines[0].slug && !lines[0].variantId)) {
      return Response.json({ error: 'Missing handle, slug, or variantId' }, { status: 400 });
    }

    // Resolve each line to a variant ID + optional selling plan
    const cartLines = [];
    for (const line of lines) {
      let variantId = line.variantId;

      if (!variantId) {
        const key = line.slug || line.handle;
        variantId = VARIANT_ID_MAP[key];
      }

      if (!variantId) {
        // Fallback: query Shopify by handle
        const handle = line.handle || line.slug;
        const productData = await storefrontQuery(`
          query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
              title
              availableForSale
              variants(first: 10) {
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
          return Response.json({ error: 'Product not found', handle }, { status: 404 });
        }
        const availableVariant = product.variants?.edges?.find(e => e.node.availableForSale)?.node
          || product.variants?.edges?.[0]?.node;
        if (!availableVariant) {
          return Response.json({ error: 'No variants found', handle }, { status: 404 });
        }
        variantId = availableVariant.id;
      }

      const cartLine = {
        merchandiseId: variantId,
        quantity: line.quantity || 1,
      };

      // Include selling plan only when explicitly provided and verified
      if (line.sellingPlanId) {
        cartLine.sellingPlanId = line.sellingPlanId;
      } else if (line.slug && SELLING_PLAN_MAP[line.slug] && line.isSubscription) {
        cartLine.sellingPlanId = SELLING_PLAN_MAP[line.slug];
      }

      cartLines.push(cartLine);
    }

    // Create cart with all lines
    const cartData = await storefrontQuery(`
      mutation cartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            id
            checkoutUrl
            totalQuantity
            lines(first: 50) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      priceV2 { amount currencyCode }
                    }
                  }
                }
              }
            }
            cost {
              subtotalAmount { amount currencyCode }
              totalAmount { amount currencyCode }
            }
          }
          userErrors { field message code }
        }
      }
    `, { lines: cartLines });

    const cart = cartData?.data?.cartCreate?.cart;
    const userErrors = cartData?.data?.cartCreate?.userErrors;
    if (!cart) {
      return Response.json({ error: 'Cart creation failed', details: userErrors }, { status: 500 });
    }

    return Response.json({
      checkoutUrl: cart.checkoutUrl,
      cartId: cart.id,
      totalQuantity: cart.totalQuantity,
      subtotal: cart.cost?.subtotalAmount,
      total: cart.cost?.totalAmount,
      lines: cart.lines?.edges?.map(e => e.node),
      userErrors: userErrors || [],
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});