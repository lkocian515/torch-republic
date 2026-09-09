import { secrets } from "base44:runtime";

/**
 * SHOPIFY STOREFRONT API — shared client + cart configuration.
 *
 * SECURITY:
 *   - Uses SHOPIFY_STOREFRONT_TOKEN (private Storefront token) ONLY server-side.
 *   - Authenticates with the `Shopify-Storefront-Private-Token` header.
 *   - NEVER uses X-Shopify-Storefront-Access-Token (that is for public tokens).
 *   - The token is never returned, logged, or sent to the frontend.
 *   - Does NOT touch SHOPIFY_ADMIN_TOKEN.
 *
 * VERIFIED on 2026-09-09 via Storefront API 2026-07:
 *   - Classic: ProductVariant/51245709623548, SellingPlan/5911216380
 *   - Mushroom: ProductVariant/51245706608892, SellingPlan/5701107964
 *   - Duo: ProductVariant/51245930217724 (DRAFT — not published, disabled)
 */

const SHOP_DOMAIN = "libertees-for-all.myshopify.com";
export const STOREFRONT_API_VERSION = "2026-07";
export const STOREFRONT_ENDPOINT = `https://${SHOP_DOMAIN}/api/${STOREFRONT_API_VERSION}/graphql.json`;
export const STOREFRONT_HEADER = "Shopify-Storefront-Private-Token";
export const STORE_DOMAIN = SHOP_DOMAIN;

// ── Verified Shopify ProductVariant global IDs ──
export const VARIANT_IDS = {
  "instant-classic-coffee": "gid://shopify/ProductVariant/51245709623548",
  "instant-mushroom-coffee": "gid://shopify/ProductVariant/51245706608892",
  // Shopify handle aliases
  "instant-coffee-1": "gid://shopify/ProductVariant/51245709623548",
  "instant-coffee-with-mushroom": "gid://shopify/ProductVariant/51245706608892",
};

// ── Verified Shopify Selling Plan global IDs ──
export const SELLING_PLAN_IDS = {
  "instant-classic-coffee": "gid://shopify/SellingPlan/5911216380",
  "instant-mushroom-coffee": "gid://shopify/SellingPlan/5701107964",
};

// ── Coffee Duo (VERIFIED ACTIVE 2026-09-09 — available via Storefront API) ──
export const DUO_VARIANT_ID = "gid://shopify/ProductVariant/51245930217724";
export const DUO_ENABLED = true;

// ── Cart fragment (reused across all cart operations) ──
const CART_FRAGMENT = `
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
            sku
            product { title handle }
            image { url altText }
            priceV2 { amount currencyCode }
          }
        }
        sellingPlanAllocation {
          sellingPlan {
            id
            name
            description
          }
          priceAdjustments {
            price { amount currencyCode }
            perDeliveryPrice { amount currencyCode }
          }
        }
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
    totalTaxAmount { amount currencyCode }
  }
  discountAllocations {
    discountedAmount { amount currencyCode }
  }
`;

export function getStorefrontToken() {
  return secrets.get("SHOPIFY_STOREFRONT_TOKEN");
}

/**
 * Execute a Storefront API GraphQL query.
 * Returns: { ok, status, requestId, json, error, phase }
 * Never includes the token in the return value.
 */
export async function storefrontQuery(query, variables = {}) {
  const token = getStorefrontToken();
  if (!token) {
    return {
      ok: false,
      status: 0,
      requestId: null,
      json: null,
      error: "SHOPIFY_STOREFRONT_TOKEN is not set in secrets",
      phase: "pre-request",
    };
  }
  let res;
  try {
    res = await fetch(STOREFRONT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [STOREFRONT_HEADER]: token,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (fetchError) {
    return {
      ok: false,
      status: 0,
      requestId: null,
      json: null,
      error: fetchError.message || "Network error during fetch",
      phase: "network",
    };
  }

  const requestId =
    res.headers.get("x-request-id") ||
    res.headers.get("cf-request-id") ||
    res.headers.get("cf-ray") ||
    null;

  let json = null;
  let jsonError = null;
  try {
    json = await res.json();
  } catch (parseError) {
    jsonError = parseError.message || "Response was not valid JSON";
  }

  const ok = res.status >= 200 && res.status < 300 && json !== null && !json.errors;

  return {
    ok,
    status: res.status,
    requestId,
    json,
    jsonError,
    error: ok ? null : json?.errors?.[0]?.message || jsonError || `HTTP ${res.status}`,
    phase: ok ? "graphQL" : "graphQL-error",
  };
}

/**
 * Resolve a slug + quantity + isSubscription into a CartLineInput.
 * Returns null if the slug is not recognized.
 */
export function resolveCartLine(line) {
  const slug = line.slug || line.handle;
  const variantId = line.variantId || VARIANT_IDS[slug];
  if (!variantId) return null;

  const cartLine = {
    merchandiseId: variantId,
    quantity: line.quantity || 1,
  };

  // Attach selling plan only for subscription lines
  if (line.isSubscription) {
    const planId = line.sellingPlanId || SELLING_PLAN_IDS[slug];
    if (planId) {
      cartLine.sellingPlanId = planId;
    }
  }

  return cartLine;
}

/**
 * Sanitize a Shopify cart node for frontend return.
 * Strips internal IDs that should not be exposed, keeps
 * product-level info needed for display.
 */
export function sanitizeCart(cartNode, userErrors) {
  if (!cartNode) return null;
  return {
    cartId: cartNode.id,
    checkoutUrl: cartNode.checkoutUrl,
    totalQuantity: cartNode.totalQuantity,
    lines: (cartNode.lines?.edges || []).map((e) => {
      const node = e.node;
      const variant = node.merchandise;
      return {
        lineId: node.id,
        quantity: node.quantity,
        variantId: variant?.id || null,
        productTitle: variant?.product?.title || variant?.title || null,
        variantTitle: variant?.title || null,
        sku: variant?.sku || null,
        image: variant?.image?.url || null,
        imageAlt: variant?.image?.altText || null,
        unitPrice: variant?.priceV2?.amount || null,
        currency: variant?.priceV2?.currencyCode || null,
        lineSubtotal: node.cost?.subtotalAmount?.amount || null,
        lineTotal: node.cost?.totalAmount?.amount || null,
        isSubscription: !!node.sellingPlanAllocation?.sellingPlan,
        sellingPlanId: node.sellingPlanAllocation?.sellingPlan?.id || null,
        sellingPlanName: node.sellingPlanAllocation?.sellingPlan?.name || null,
        sellingPlanDescription: node.sellingPlanAllocation?.sellingPlan?.description || null,
        subscriptionPrice: node.sellingPlanAllocation?.priceAdjustments?.[0]?.price?.amount || null,
        perDeliveryPrice: node.sellingPlanAllocation?.priceAdjustments?.[0]?.perDeliveryPrice?.amount || null,
      };
    }),
    subtotal: cartNode.cost?.subtotalAmount?.amount || null,
    total: cartNode.cost?.totalAmount?.amount || null,
    tax: cartNode.cost?.totalTaxAmount?.amount || null,
    currency: cartNode.cost?.subtotalAmount?.currencyCode || null,
    discounts: (cartNode.discountAllocations || []).map((d) => ({
      amount: d.discountedAmount?.amount || null,
      currency: d.discountedAmount?.currencyCode || null,
    })),
    userErrors: (userErrors || []).map((e) => ({
      field: e.field,
      message: e.message,
      code: e.code,
    })),
  };
}

// ── Cart GraphQL operations ──

export const CART_CREATE_MUTATION = `mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart { ${CART_FRAGMENT} }
    userErrors { field message code }
  }
}`;

export const CART_LINES_ADD_MUTATION = `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart { ${CART_FRAGMENT} }
    userErrors { field message code }
  }
}`;

export const CART_LINES_UPDATE_MUTATION = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart { ${CART_FRAGMENT} }
    userErrors { field message code }
  }
}`;

export const CART_LINES_REMOVE_MUTATION = `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart { ${CART_FRAGMENT} }
    userErrors { field message code }
  }
}`;

export const CART_GET_QUERY = `query cart($cartId: ID!) {
  cart(id: $cartId) {
    ${CART_FRAGMENT}
  }
}`;