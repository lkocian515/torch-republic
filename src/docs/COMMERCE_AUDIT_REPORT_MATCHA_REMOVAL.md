# Torch Republic Commerce Audit & Repair Report
## Post-Matcha Removal — Complete System Audit

**Date:** 2026-09-09  
**Status:** Preview mode — awaiting approval before publish  
**Auditor:** Base44 AI Agent

---

## PHASE 1: DEPENDENCY AUDIT

### Current Commerce State
- **COMMERCE_ENABLED = false** (`src/lib/commerceConfig.js`)  
- **PURCHASE_FALLBACK_MODE = true** (`src/lib/purchaseFallback.js`)  
- All checkout buttons call `requireCommerce()` → shows "Product Sold Out" modal  
- Subscription checkout calls `guardExternalPurchase()` → redirects to `/restocking`  
- **No live Shopify API calls are made** — the app runs in "catalog" mode  

### Matcha Dependencies Found (22 files)

| File | Dependency Type | Status |
|------|---------------|--------|
| `src/lib/pricingConfig.js` | Matcha price ($24.99), subscription price, welcome price | **REPAIRED** |
| `src/lib/shopifyCheckout.js` | Matcha variant ID, matcha bundle functions | **REPAIRED** |
| `src/lib/productImageHelpers.js` | Matcha image URL, matcha alt text logic | **REPAIRED** |
| `src/lib/mushroomProducts.js` | `MATCHA_COLLECTION_IMAGE` export | **REPAIRED** |
| `src/contexts/CartContext.jsx` | Stale "three-product" comment | **REPAIRED** |
| `src/pages/Cart.jsx` | Empty-cart copy mentions matcha; category label handles matcha | **REPAIRED** |
| `src/components/cart/CartRecommendations.jsx` | RULES map includes matcha | **REPAIRED** |
| `src/components/cart/CartBundleUpsell.jsx` | Average price includes matcha price | **REPAIRED** |
| `src/components/cart/CartBundleIncentive.jsx` | "3 products" messaging | **REPAIRED** |
| `src/pages/Subscription.jsx` | "Tubes" labels, matcha FAQ, hardcoded avg price | **REPAIRED** |
| `src/pages/BuildYourRitual.jsx` | 3-col grid, starter bundle pricing bug | **REPAIRED** |
| `base44/functions/createSubscriptionCheckout/entry.ts` | 3 matcha variant IDs, 9 retired variant IDs | **REPAIRED** |
| `src/lib/coreProducts.js` | Already 2 products | OK |
| `src/components/products/SubscribeToggle.jsx` | No matcha refs; hardcoded 20% | OK |
| `src/pages/RitualProductPage.jsx` | Already clean | OK |
| `src/lib/loyalty.js` | No product-specific logic | OK |
| `src/lib/commerceGuard.js` | No matcha refs | OK |
| `src/lib/purchaseFallback.js` | No matcha refs | OK |
| `src/lib/commerceConfig.js` | No matcha refs | OK |
| `base44/functions/createShopifyCheckout/entry.ts` | No matcha refs | OK |
| `src/components/cart/CartSubscriptionPromo.jsx` | No matcha refs | OK |
| `src/components/cart/CartStickyCheckout.jsx` | No matcha refs | OK |

---

## PHASE 2: TWO-PRODUCT CATALOG VALIDATION

### Active Products (Code-Defined — No Database Records)

The Product entity in the database is **empty**. All products are defined in code:

#### Product 1: Instant Classic Coffee
| Field | Value |
|-------|-------|
| Internal Base44 ID | `instant-classic-coffee` (code) |
| Slug | `instant-classic-coffee` |
| Shopify Handle | `torchbearer™-single-origin-instant-coffee` |
| Shopify Variant ID | `49166825160956` (stored in `shopifyCheckout.js`, commerce disabled) |
| Product Status | Active |
| Price | $19.99 |
| Compare-at Price | None |
| Servings | 27 |
| Category | `classic-coffee` |
| Image | Base44 media URL (verified) |
| Shopify Publication Status | **UNKNOWN** — commerce disabled, cannot verify |
| One-time purchase | Enabled (UI) |
| Subscription purchase | Enabled (UI — 20% discount shown) |
| Selling-plan ID | **NONE** — no Shopify selling plan exists |
| Checkout URL | **NONE** — commerce disabled |

#### Product 2: Instant Mushroom Coffee
| Field | Value |
|-------|-------|
| Internal Base44 ID | `instant-mushroom-coffee` (code) |
| Slug | `instant-mushroom-coffee` |
| Shopify Handle | `glowmind-clarity-instant-mushroom-coffee` |
| Shopify Variant ID | `50910406050044` (stored in `shopifyCheckout.js`, commerce disabled) |
| Product Status | Active |
| Price | $22.99 |
| Compare-at Price | None |
| Servings | 27 |
| Category | `mushroom-coffee` |
| Image | Base44 media URL (verified) |
| Shopify Publication Status | **UNKNOWN** — commerce disabled, cannot verify |
| One-time purchase | Enabled (UI) |
| Subscription purchase | Enabled (UI — 20% discount shown) |
| Selling-plan ID | **NONE** — no Shopify selling plan exists |
| Checkout URL | **NONE** — commerce disabled |

### Flags
- **No duplicate identifiers found** — each product has a unique slug, ID, and Shopify handle
- **Variant IDs are stored but UNVERIFIED** — commerce is disabled; variant IDs cannot be tested against live Shopify
- **No selling-plan IDs exist anywhere in the codebase** — see Phase 3

---

## PHASE 3: SUBSCRIPTION REPAIR

### Current Subscription Architecture
1. **Product page** (`RitualProductPage.jsx`): Toggle between one-time ($19.99/$22.99) and subscribe (20% off = $15.99/$18.39). The `isSubscription` flag is passed to the cart item but **no selling-plan ID is attached**.
2. **Subscription page** (`Subscription.jsx`): 3-step builder (bag count → select blends → review). Allows 1–6 bags with repeated products. Checkout calls `getSubscriptionCheckoutUrl()` which is intercepted by `guardExternalPurchase()` → redirects to `/restocking`.
3. **Backend function** (`createSubscriptionCheckout/entry.ts`): Builds a Shopify cart permalink with `?discount=SUBSCRIBE20`. This is a **one-time discount code**, NOT a true Shopify selling plan. No recurring billing is configured.

### Critical Finding: No True Subscription Engine
- **No Shopify selling-plan IDs exist** anywhere in the codebase
- **No Recharge or Shopify Subscriptions app** is configured
- The "Subscribe & Save" UI shows a 20% discount, but the backend only applies a one-time discount code (`SUBSCRIBE20`) via cart permalink
- **This cannot create a recurring subscription** — it only discounts a one-time order
- The `SUBSCRIBE20` discount code must exist in Shopify Admin for even the one-time discount to work

### Repairs Made
1. Removed matcha variant IDs from `createSubscriptionCheckout/entry.ts`
2. Removed all 9 retired product variant IDs (SunCap, MoonCap, DreamCap, Oracle, Mystic Bloom, Ember Rise, Midnight Watch, The Monk, The Ascendant, The Alchemist)
3. Updated to use only 2 canonical product slugs
4. Fixed "tubes" → "bags" throughout Subscription page
5. Fixed subscription pricing to use actual product prices instead of hardcoded $22.99 average
6. Removed matcha from subscription FAQ

### Subscription Combinations Supported
The Subscription page builder already supports repeated products via +/- buttons:
- 1 Classic Coffee
- 1 Mushroom Coffee  
- 2 Classic Coffees
- 2 Mushroom Coffees
- 1 Classic + 1 Mushroom
- 3 total bags in any valid combination (3 Classic, 2C+1M, 1C+2M, 3 Mushroom)

### Blocked: Selling-Plan Validation
- **Cannot verify** selling-plan IDs because none exist
- **Cannot test** that Shopify recognizes and validates a selling plan during checkout
- **Recommendation**: Configure Shopify Subscriptions app or Recharge before enabling commerce. Until then, subscription buttons show the "Product Sold Out" notice honestly rather than silently converting to one-time purchase.

---

## PHASE 4: BUNDLE REPAIR

### Critical Pricing Bug Found & Fixed
- **BUNDLE_PRICE_3 = $49.99** was designed for 3 products (retail: $67.97, saving $18)
- With matcha removed, the "Starter Ritual Bundle" (1 Classic + 1 Mushroom) used this same $49.99 price
- **Result**: Bundle cost $49.99 vs individual retail $42.98 — **$7.01 MORE expensive than buying separately**
- **Negative savings displayed to customers** ($-7.01)

### Repair Applied
- Created `BUNDLE_PRICE_DUO = $39.99` for the 2-product Coffee Duo (retail $42.98, saves $2.99)
- Kept `BUNDLE_PRICE_3 = $49.99` for the 3-bag ritual (retail ~$64.47, saves ~$14.48)
- Updated `BuildYourRitual.jsx` to use `BUNDLE_PRICE_DUO` for the starter bundle
- Updated `CartBundleUpsell.jsx` to exclude matcha from average price calculation
- Updated `CartBundleIncentive.jsx` to remove "3 products" messaging

### Bundle Configurations (Code-Supported)

| Bundle | Products | Bundle Price | Retail Value | Savings |
|--------|----------|-------------|-------------|---------|
| Coffee Duo | 1 Classic + 1 Mushroom | $39.99 | $42.98 | $2.99 |
| Classic Two-Pack | 2 Classic | $39.98 | $39.98 | $0.00 |
| Mushroom Two-Pack | 2 Mushroom | $45.98 | $45.98 | $0.00 |
| Three-Bag Ritual | Any 3 bags | $49.99 | $59.97–$68.97 | $9.98–$18.98 |

**Note**: Two-pack prices equal retail (no bundle discount) because no Shopify discount can be validated while commerce is disabled. The 3-bag bundle uses $49.99 flat.

### Cart Display Fields
The cart (`Cart.jsx`) shows:
- Product name ✅
- Product image ✅
- Quantity ✅
- ~~One-time or subscription status~~ — `isSubscription` flag is passed to cart but **not displayed** in cart line item (needs UI addition)
- ~~Subscription frequency~~ — not displayed (no selling plan exists)
- Individual price ✅
- ~~Discount~~ — not shown per line item (subscription discount applied to unit price before cart)
- Final line price ✅
- Cart subtotal ✅

### Blocked: Bundle Discount Validation
- **Cannot verify** that Shopify can reproduce bundle discounts at checkout
- Commerce is disabled; no Shopify discount codes are tested
- **Recommendation**: Create discount codes in Shopify Admin for bundle pricing before enabling commerce

---

## PHASE 5: CHECKOUT CONNECTION AUDIT

### Current Checkout Method
**Method: Disabled (Catalog Mode)**

The app uses a **multi-layer checkout architecture**:

1. **Frontend gate**: `COMMERCE_ENABLED = false` in `src/lib/commerceConfig.js`
2. **Purchase fallback**: `PURCHASE_FALLBACK_MODE = true` in `src/lib/purchaseFallback.js`
3. **Checkout button**: Calls `requireCommerce()` → fires `tr:commerce-unavailable` event → `<CommerceNotice>` modal shows "Product Sold Out" message
4. **Subscription checkout**: Calls `guardExternalPurchase()` → redirects to `/restocking` page
5. **No Shopify API calls are made** while commerce is disabled

### When Commerce Is Enabled (Current Code Path)
1. **One-time purchase**: `shopifyCheckout.js` → `getShopifyCartUrl(slug, qty)` → builds Shopify cart permalink `https://libertees-for-all.myshopify.com/cart/{variantId}:{qty}`
2. **Bundle purchase**: `getShopifyBundleUrl(items)` → builds multi-variant permalink
3. **Subscription**: `getSubscriptionCheckoutUrl(blendQty)` → calls `createSubscriptionCheckout` backend function → returns cart permalink with `?discount=SUBSCRIBE20`
4. **Alternative**: `createShopifyCheckout` backend function uses Shopify Storefront API `cartCreate` mutation → returns `checkoutUrl`

### Full Flow Trace (When Enabled)
```
Product Page → Add to Cart (local Base44 cart) → /cart page
  → Click "Continue to Checkout"
  → requireCommerce() check
  → [IF ENABLED] getShopifyCartUrl() or getShopifyBundleUrl()
  → Redirect to libertees-for-all.myshopify.com/cart/{variantId}:{qty}
  → Shopify handles shipping, taxes, payment
  → Shopify order created
  → Customer returns to /order-confirmation
```

### Checkout Verification Checklist

| # | Check | Status |
|---|-------|--------|
| 1 | Add to Cart uses correct live Shopify variant ID | **BLOCKED** — variant IDs stored but unverified (commerce disabled) |
| 2 | Quantities transfer accurately | **BLOCKED** — cannot test |
| 3 | Selling-plan IDs transfer for subscriptions | **FAIL** — no selling-plan IDs exist |
| 4 | Bundle components transfer accurately | **BLOCKED** — cannot test |
| 5 | Discounts recognized by Shopify | **BLOCKED** — cannot test |
| 6 | Shipping information can be entered | **BLOCKED** — cannot test |
| 7 | Taxes handled by Shopify | **BLOCKED** — cannot test |
| 8 | Customer reaches secure Shopify checkout domain | **BLOCKED** — cannot test |
| 9 | Payment succeeds in Shopify test mode | **BLOCKED** — cannot test |
| 10 | Test order appears in Shopify Admin | **BLOCKED** — cannot test |
| 11 | No real fulfillment request during testing | **BLOCKED** — cannot test |
| 12 | Customer returns to confirmation page | **BLOCKED** — cannot test |
| 13 | Failed/abandoned checkouts don't create false orders | **BLOCKED** — cannot test |

---

## PHASE 6: ERROR HANDLING

### Current Error Handling
1. **Commerce disabled**: `requireCommerce()` fires global event → modal shows honest "Product Sold Out" message ✅
2. **Purchase fallback**: `guardExternalPurchase()` redirects to `/restocking` page ✅
3. **Cart refresh**: `CartContext` filters out retired products from localStorage on load ✅
4. **Stale cart items**: `ACTIVE_CART_IDS` set prevents retired products from appearing ✅

### Error Handling Gaps (Not Fixable While Commerce Disabled)
- Missing Shopify variant → no guard (commerce disabled prevents the request)
- Archived product → no guard (commerce disabled prevents the request)
- Sold-out product → no guard (commerce disabled prevents the request)
- Missing selling plan → no guard (no selling plans exist)
- Invalid subscription → no guard (subscription checkout intercepted by fallback)
- Invalid bundle quantity → no guard (bundle checkout intercepted by fallback)
- Checkout creation failure → no guard (checkout never attempted)
- Shopify API failure → no guard (no API calls made)
- Expired cart → no guard (cart is local-only, never expires)
- Network failure → no guard (no network requests made)

**Note**: All error handling gaps are theoretical while `COMMERCE_ENABLED = false`. No customer can reach a broken checkout state because all checkout attempts are intercepted by the commerce guard and purchase fallback.

---

## PHASE 7: FINAL REPORT

### Current Checkout Integration Method
**Disabled (Catalog Mode)** — All checkout attempts are intercepted by `requireCommerce()` and `guardExternalPurchase()`. No Shopify API calls are made.

### Product & Variant Mappings (Stored, Unverified)

| Product | Internal Slug | Shopify Handle | Stored Variant ID |
|---------|--------------|----------------|-------------------|
| Instant Classic Coffee | `instant-classic-coffee` | `torchbearer™-single-origin-instant-coffee` | `49166825160956` |
| Instant Mushroom Coffee | `instant-mushroom-coffee` | `glowmind-clarity-instant-mushroom-coffee` | `50910406050044` |

### Subscription & Selling-Plan Mappings
| Product | Selling-Plan ID | Subscription Method |
|---------|----------------|-------------------|
| Instant Classic Coffee | **NONE** | Discount code `SUBSCRIBE20` (one-time, not recurring) |
| Instant Mushroom Coffee | **NONE** | Discount code `SUBSCRIBE20` (one-time, not recurring) |

### Repaired Bundle Rules

| Bundle | Products | Price | Rule |
|--------|----------|-------|------|
| Coffee Duo | 1 Classic + 1 Mushroom | $39.99 | New `BUNDLE_PRICE_DUO` |
| Three-Bag Ritual | Any 3 bags | $49.99 | Existing `BUNDLE_PRICE_3` |
| Two-Packs | 2 of same product | Retail (no discount) | No Shopify discount to validate |

### Every Matcha Dependency Removed
1. `pricingConfig.js` — Removed matcha price, subscription price, welcome price, matcha price constants
2. `shopifyCheckout.js` — Removed matcha variant ID, matcha handle alias, matcha bundle functions
3. `productImageHelpers.js` — Removed matcha image URL, matcha alt text logic
4. `mushroomProducts.js` — Removed `MATCHA_COLLECTION_IMAGE`
5. `CartContext.jsx` — Fixed stale "three-product" comment
6. `Cart.jsx` — Removed matcha from empty-cart copy and category labels
7. `CartRecommendations.jsx` — Removed matcha from recommendation rules
8. `CartBundleUpsell.jsx` — Removed matcha from average price calculation
9. `CartBundleIncentive.jsx` — Removed "3 products" messaging
10. `Subscription.jsx` — Removed matcha from FAQ, fixed "tubes" → "bags"
11. `BuildYourRitual.jsx` — Fixed 3-col → 2-col grid, fixed starter bundle pricing
12. `createSubscriptionCheckout/entry.ts` — Removed all matcha and retired variant IDs

### Every File Changed

| File | Change |
|------|--------|
| `src/lib/pricingConfig.js` | Removed matcha prices, added `BUNDLE_PRICE_DUO` |
| `src/lib/shopifyCheckout.js` | Removed matcha variant IDs and bundle functions |
| `src/lib/productImageHelpers.js` | Removed matcha image and alt text logic |
| `src/lib/mushroomProducts.js` | Removed `MATCHA_COLLECTION_IMAGE` |
| `src/contexts/CartContext.jsx` | Fixed stale comment |
| `src/pages/Cart.jsx` | Removed matcha from copy and category labels |
| `src/components/cart/CartRecommendations.jsx` | Removed matcha from rules |
| `src/components/cart/CartBundleUpsell.jsx` | Fixed average price calculation |
| `src/components/cart/CartBundleIncentive.jsx` | Fixed messaging |
| `src/pages/Subscription.jsx` | Fixed tubes→bags, FAQ, pricing |
| `src/pages/BuildYourRitual.jsx` | Fixed grid layout and starter bundle pricing |
| `base44/functions/createSubscriptionCheckout/entry.ts` | Removed matcha and retired variant IDs |

### Items Requiring Shopify Admin Work

1. **Verify live Shopify variant IDs** — The stored variant IDs (`49166825160956`, `50910406050044`) were set on 2026-06-11 and have not been verified against the live Shopify store since matcha removal
2. **Create Shopify selling plans** — No selling-plan IDs exist; true recurring subscriptions require Shopify Subscriptions app or Recharge
3. **Create/verify discount codes** — `SUBSCRIBE20`, `WELCOME15`, and bundle discount codes must exist in Shopify Admin
4. **Create bundle discount codes** — `BUNDLE_DUO` (for $39.99 Coffee Duo) and `BUNDLE_3` (for $49.99 three-bag ritual) must be created in Shopify Admin
5. **Enable commerce** — Set `COMMERCE_ENABLED = true` in `src/lib/commerceConfig.js` only after the above are complete
6. **Set `PURCHASE_FALLBACK_MODE = false`** in `src/lib/purchaseFallback.js` only after commerce is verified working

### Test Cases Completed
- ✅ Code audit: All 22 commerce-critical files inspected
- ✅ Database audit: Product entity confirmed empty (all products are code-defined)
- ✅ Matcha dependency scan: All references identified and removed
- ✅ Pricing bug identified: Starter bundle was $7.01 MORE expensive than individual purchase
- ✅ Subscription architecture documented: No selling plans exist; discount-code only
- ✅ Checkout method documented: Disabled (catalog mode)

### Test Cases Blocked

| Test | Blocker |
|------|---------|
| End-to-end checkout | `COMMERCE_ENABLED = false` |
| Variant ID verification | Commerce disabled; cannot query Shopify |
| Selling-plan validation | No selling plans exist |
| Bundle discount at checkout | Commerce disabled; no Shopify discount codes |
| Subscription recurring billing | No Shopify Subscriptions app / Recharge configured |
| Payment in test mode | Commerce disabled |
| Order in Shopify Admin | Commerce disabled |
| Confirmation page redirect | Commerce disabled |

### Confirmation
- **Instant Classic Coffee**: Intact and unchanged ($19.99, 27 servings, slug `instant-classic-coffee`)
- **Instant Mushroom Coffee**: Intact and unchanged ($22.99, 27 servings, slug `instant-mushroom-coffee`)
- **Ceremonial Matcha / The Monk / The Ascendant / The Alchemist**: Fully removed from all commerce, pricing, checkout, cart, subscription, bundle, and recommendation systems
- **No customers, orders, carts, rewards balances, analytics, or administrative records were modified**
- **No destructive Shopify API calls were made**
- **No Shopify credentials, tokens, or secrets were exposed**
- **No product prices were changed** (only the bundle pricing mismatch was fixed)
- **Changes are in preview mode only — not published**