/**
 * VALIDATE SHOPIFY STOREFRONT API
 *
 * Phase 1: Read-only authentication test
 * Phase 2: Query verified products by handle
 * Phase 3: Retrieve selling-plan allocations
 *
 * SECURITY:
 *   - Uses SHOPIFY_STOREFRONT_TOKEN only via base44:runtime secrets.
 *   - Authenticates with Shopify-Storefront-Private-Token header.
 *   - Returns NO token information to the frontend.
 *   - Does NOT modify SHOPIFY_ADMIN_TOKEN.
 *
 * This function is for internal validation only. It does NOT enable commerce,
 * create orders, or fall back to cart permalinks.
 */

import {
  storefrontQuery,
  STOREFRONT_API_VERSION,
  STOREFRONT_ENDPOINT,
  STOREFRONT_HEADER,
  STORE_DOMAIN,
} from "../../shared/shopifyStorefront.ts";

// ── Expected validation targets (Shopify's returned data is authoritative) ──
const EXPECTED = {
  classic: {
    handle: "instant-coffee-1",
    sku: "C-INSTANTCOFFEE-ST-3OZ-BL",
    variantId: "gid://shopify/ProductVariant/51245709623548",
    price: "22.99",
    status: "active",
  },
  mushroom: {
    handle: "instant-coffee-with-mushroom",
    sku: "C-INSTANTCOFFEEWITHMUSHROOM-ST-3OZ-BL",
    variantId: "gid://shopify/ProductVariant/51245706608892",
    price: "25.99",
    status: "active",
  },
  duo: {
    handle: "torch-republic-coffee-duo",
    variantId: "gid://shopify/ProductVariant/51245930217724",
    price: "43.99",
    compareAtPrice: "48.98",
    status: "draft-or-unpublished",
  },
};

// ── Expected subscription prices (subject to Shopify rounding) ──
const EXPECTED_SUB = {
  classic: "20.69",
  mushroom: "23.39",
};

// ── GraphQL: single query with shop info + all three products ──
const VALIDATION_QUERY = `query validateStorefront {
  shop {
    name
    id
    primaryDomain { url }
    paymentSettings { currencyCode }
  }
  classic: productByHandle(handle: "${EXPECTED.classic.handle}") {
    id
    title
    handle
    availableForSale
    onlineStoreUrl
    productType
    variants(first: 5) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          priceV2 { amount currencyCode }
          compareAtPriceV2 { amount currencyCode }
          sellingPlanAllocations(first: 10) {
            edges {
              node {
                priceAdjustments {
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  perDeliveryPrice { amount currencyCode }
                }
                sellingPlan {
                  id
                  name
                  description
                  recurringDeliveries
                  options { name value }
                }
              }
            }
          }
        }
      }
    }
  }
  mushroom: productByHandle(handle: "${EXPECTED.mushroom.handle}") {
    id
    title
    handle
    availableForSale
    onlineStoreUrl
    productType
    variants(first: 5) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          priceV2 { amount currencyCode }
          compareAtPriceV2 { amount currencyCode }
          sellingPlanAllocations(first: 10) {
            edges {
              node {
                priceAdjustments {
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  perDeliveryPrice { amount currencyCode }
                }
                sellingPlan {
                  id
                  name
                  description
                  recurringDeliveries
                  options { name value }
                }
              }
            }
          }
        }
      }
    }
  }
  duo: productByHandle(handle: "${EXPECTED.duo.handle}") {
    id
    title
    handle
    availableForSale
    onlineStoreUrl
    productType
    variants(first: 5) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          priceV2 { amount currencyCode }
          compareAtPriceV2 { amount currencyCode }
          sellingPlanAllocations(first: 10) {
            edges {
              node {
                priceAdjustments {
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  perDeliveryPrice { amount currencyCode }
                }
                sellingPlan {
                  id
                  name
                  description
                  recurringDeliveries
                }
              }
            }
          }
        }
      }
    }
  }
}`;

function extractSellingPlans(productNode) {
  if (!productNode) return [];
  const variants = productNode.variants?.edges || [];
  const plans = [];
  for (const vEdge of variants) {
    const variant = vEdge.node;
    const allocations = variant.sellingPlanAllocations?.edges || [];
    for (const aEdge of allocations) {
      const alloc = aEdge.node;
      const sp = alloc.sellingPlan;
      if (!sp) continue;
      // Subscription price comes from the allocation's priceAdjustments
      const allocPrice = alloc.priceAdjustments?.[0];
      // Calculate discount percentage from subscription price vs variant price
      let discountPct = null;
      const subPrice = parseFloat(allocPrice?.price?.amount);
      const basePrice = parseFloat(variant.priceV2?.amount);
      if (!isNaN(subPrice) && !isNaN(basePrice) && basePrice > 0) {
        discountPct = Math.round((1 - subPrice / basePrice) * 100 * 10) / 10;
      }
      const recurringBool = sp.recurringDeliveries;
      // In API 2026-07, delivery interval info comes from sellingPlan.options
      const deliveryOption = sp.options?.find((o) => 
        o.name?.toLowerCase().includes("deliver") || 
        o.name?.toLowerCase().includes("interval") ||
        o.name?.toLowerCase().includes("frequency")
      );
      plans.push({
        sellingPlanId: sp.id,
        name: sp.name,
        description: sp.description,
        hasRecurringDeliveries: recurringBool,
        deliveryIntervalOption: deliveryOption ? { name: deliveryOption.name, value: deliveryOption.value } : null,
        allOptions: sp.options || [],
        discountPercentage: discountPct,
        subscriptionPrice: allocPrice?.price?.amount || null,
        subscriptionCurrency: allocPrice?.price?.currencyCode || null,
        perDeliveryPrice: allocPrice?.perDeliveryPrice?.amount || null,
        compareAtPrice: allocPrice?.compareAtPrice?.amount || null,
        variantId: variant.id,
        variantTitle: variant.title,
        variantPrice: variant.priceV2?.amount,
        variantCurrency: variant.priceV2?.currencyCode,
      });
    }
  }
  return plans;
}

function extractProduct(productNode, expectedKey) {
  if (!productNode) {
    return {
      found: false,
      handle: EXPECTED[expectedKey]?.handle || null,
      note: "Product not visible to Storefront API (likely Draft or unpublished)",
    };
  }
  const variantEdge = productNode.variants?.edges?.[0];
  const variant = variantEdge?.node || null;
  return {
    found: true,
    productId: productNode.id,
    title: productNode.title,
    handle: productNode.handle,
    availableForSale: productNode.availableForSale,
    onlineStoreUrl: productNode.onlineStoreUrl,
    productType: productNode.productType,
    published: !!productNode.onlineStoreUrl,
    variant: variant
      ? {
          variantId: variant.id,
          title: variant.title,
          sku: variant.sku || null,
          availableForSale: variant.availableForSale,
          price: variant.priceV2?.amount || null,
          currency: variant.priceV2?.currencyCode || null,
          compareAtPrice: variant.compareAtPriceV2?.amount || null,
        }
      : null,
  };
}

function compareProduct(extracted, expectedKey) {
  const exp = EXPECTED[expectedKey];
  if (!exp) return [];
  const mismatches = [];
  if (!extracted.found) {
    if (expectedKey === "duo") {
      mismatches.push({ field: "status", expected: exp.status, actual: "not-visible-to-storefront", note: "Expected — Coffee Duo is draft/unpublished" });
    } else {
      mismatches.push({ field: "found", expected: true, actual: false, note: "Product not found — may be draft or unpublished" });
    }
    return mismatches;
  }
  if (extracted.variant) {
    if (extracted.variant.variantId !== exp.variantId) {
      mismatches.push({ field: "variantId", expected: exp.variantId, actual: extracted.variant.variantId });
    }
    if (exp.price && extracted.variant.price && extracted.variant.price !== exp.price) {
      mismatches.push({ field: "price", expected: exp.price, actual: extracted.variant.price });
    }
    if (exp.sku && extracted.variant.sku && extracted.variant.sku !== exp.sku) {
      mismatches.push({ field: "sku", expected: exp.sku, actual: extracted.variant.sku });
    }
  }
  if (expectedKey !== "duo") {
    if (!extracted.published) {
      mismatches.push({ field: "published", expected: true, actual: false });
    }
  }
  return mismatches;
}

export default async function (req) {
  try {
    // ── PHASE 1: Read-only authentication test ──
    const result = await storefrontQuery(VALIDATION_QUERY);

    if (!result.ok) {
      return Response.json({
        phase1_auth: {
          pass: false,
          httpStatus: result.status,
          shopifyRequestId: result.requestId,
          headerUsed: STOREFRONT_HEADER,
          endpoint: STOREFRONT_ENDPOINT,
          apiVersion: STOREFRONT_API_VERSION,
          storeDomain: STORE_DOMAIN,
          usedPrivateToken: true,
          failurePhase: result.phase || "unknown",
          error: result.error,
          note: result.status === 401
            ? "Authentication failed (401). Token may be invalid, expired, or lack the required Storefront API scopes."
            : "Request did not complete successfully.",
        },
        phase2_products: { skipped: true },
        phase3_sellingPlans: { skipped: true },
        commerceReady: false,
      }, { status: 200 });
    }

    const data = result.json?.data;
    const graphqlErrors = result.json?.errors;

    // ── PHASE 2: Product queries ──
    const classicProduct = extractProduct(data?.classic, "classic");
    const mushroomProduct = extractProduct(data?.mushroom, "mushroom");
    const duoProduct = extractProduct(data?.duo, "duo");

    const classicMismatches = compareProduct(classicProduct, "classic");
    const mushroomMismatches = compareProduct(mushroomProduct, "mushroom");
    const duoMismatches = compareProduct(duoProduct, "duo");

    // ── PHASE 3: Selling plan allocations ──
    const classicPlans = extractSellingPlans(data?.classic);
    const mushroomPlans = extractSellingPlans(data?.mushroom);
    const duoPlans = extractSellingPlans(data?.duo);

    // Validate selling plan expectations
    function validatePlans(plans, expectedKey) {
      const expSub = EXPECTED_SUB[expectedKey];
      const issues = [];
      if (plans.length === 0) {
        issues.push("No selling plan allocations found on this product variant");
        return { found: false, issues };
      }
      const plan = plans[0];
      // In API 2026-07, recurringDeliveries is a boolean and interval info is in options
      const deliveryVal = plan.deliveryIntervalOption?.value || "";
      if (deliveryVal && !deliveryVal.includes("4") && !deliveryVal.toLowerCase().includes("week")) {
        issues.push({ field: "deliveryInterval", expected: "every 4 weeks", actual: deliveryVal });
      }
      if (plan.hasRecurringDeliveries === false) {
        issues.push("Selling plan does not have recurring deliveries enabled");
      }
      if (plan.discountPercentage === null) {
        issues.push("Discount percentage not found in price adjustments");
      } else if (Math.round(plan.discountPercentage) !== 10) {
        issues.push({ field: "discountPercentage", expected: 10, actual: plan.discountPercentage });
      }
      if (expSub && plan.subscriptionPrice) {
        issues.push({
          field: "subscriptionPrice",
          shopifyReturnedSubscriptionPrice: plan.subscriptionPrice,
          expectedSubscriptionPrice: expSub,
          perDeliveryPrice: plan.perDeliveryPrice,
          note: "Shopify-returned subscription price — authoritative",
        });
      }
      return {
        found: true,
        sellingPlanId: plan.sellingPlanId,
        name: plan.name,
        hasRecurringDeliveries: plan.hasRecurringDeliveries,
        deliveryInterval: plan.deliveryIntervalOption,
        discountPercentage: plan.discountPercentage,
        subscriptionPrice: plan.subscriptionPrice,
        perDeliveryPrice: plan.perDeliveryPrice,
        issues: issues.length > 0 ? issues : null,
      };
    }

    const classicPlanValidation = validatePlans(classicPlans, "classic");
    const mushroomPlanValidation = validatePlans(mushroomPlans, "mushroom");

    // ── Assemble final report ──
    return Response.json({
      phase1_auth: {
        pass: true,
        httpStatus: result.status,
        headerUsed: STOREFRONT_HEADER,
        apiVersion: STOREFRONT_API_VERSION,
        endpoint: STOREFRONT_ENDPOINT,
        storeDomain: STORE_DOMAIN,
        usedPrivateToken: true,
        shop: data?.shop
          ? {
              name: data.shop.name,
              id: data.shop.id,
              primaryDomain: data.shop.primaryDomain?.url || null,
              currency: data.shop.paymentSettings?.currencyCode || null,
            }
          : null,
        graphqlErrors: graphqlErrors || null,
      },
      phase2_products: {
        classic: { ...classicProduct, mismatches: classicMismatches },
        mushroom: { ...mushroomProduct, mismatches: mushroomMismatches },
        duo: { ...duoProduct, mismatches: duoMismatches },
      },
      phase3_sellingPlans: {
        classic: classicPlanValidation,
        mushroom: mushroomPlanValidation,
        duo: {
          found: duoPlans.length > 0,
          note: "Coffee Duo should NOT have a subscription plan",
          plans: duoPlans.length,
        },
        allClassicPlans: classicPlans,
        allMushroomPlans: mushroomPlans,
      },
      commerceReady: false,
      tokenExposed: false,
    }, { status: 200 });
  } catch (error) {
    return Response.json({
      phase1_auth: { pass: false, error: error.message, failurePhase: "exception" },
      phase2_products: { skipped: true },
      phase3_sellingPlans: { skipped: true },
      commerceReady: false,
      tokenExposed: false,
    }, { status: 200 });
  }
}