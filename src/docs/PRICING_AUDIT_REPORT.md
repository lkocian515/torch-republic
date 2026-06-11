# Build Your Ritual - Pricing Audit Report

**Date:** 2026-06-11  
**Audited By:** Base44 Platform  
**Status:** ⚠️ CRITICAL ISSUES FOUND

---

## Executive Summary

**ROOT CAUSE:** The `BuildYourRitual` page and `shopifyCheckout.js` are using INCORRECT product handles that don't match what exists in Shopify. This causes:
1. Products not loading from Shopify (404 errors)
2. Pricing displayed on the page ($24.99 each = $74.97 total) differs from Shopify checkout
3. Customers seeing unexpected prices at checkout

---

## Product Handle Mismatch

### Expected Handles (in code) vs Actual Handles (in Shopify)

| Product Name | Expected Handle (Code) | Actual Handle (Shopify) | Status |
|--------------|------------------------|-------------------------|---------|
| Torchbearer | `torchbearer` | ❌ NOT FOUND | Missing |
| Ember Rise | `ember-rise` | `ember-rise-instant-coffee` | ⚠️ Mismatch |
| Midnight Watch | `midnight-watch` | `midnight-watch-instant-coffee` | ⚠️ Mismatch |
| SunCap Rise | `suncap-rise` | ❌ NOT FOUND | Missing |
| GlowMind Clarity | `glowmind-clarity-blend` | `glowmind-clarity-instant-mushroom-coffee` | ⚠️ Mismatch |
| MoonCap Restore | `mooncap-restore` | `mooncap-restore-instant-mushroom-coffee` | ⚠️ Mismatch |
| DreamCap Blend | `dreamcap-blend` | `dreamcap-instant-mushroom-coffee` | ⚠️ Mismatch |
| The Oracle Blend | `the-oracle-blend` | ❌ NOT FOUND | Missing |
| Mystic Bloom Blend | `mystic-bloom-blend` | `mystic-bloom-instant-mushroom-coffee` | ⚠️ Mismatch |
| The Monk Matcha | `the-monk-matcha-blend` | ❌ NOT FOUND | Missing |
| The Ascendant Matcha | `the-ascendant-matcha-blend` | ❌ NOT FOUND | Missing |
| The Alchemist Matcha | `the-alchemist-matcha-blend` | ❌ NOT FOUND | Missing |

**Products Found in Shopify:** 40 beverage products  
**Products in Code:** 12 specific blends  
**Matching Handles:** 0 out of 12

---

## Variant ID Verification

The following variant IDs are hardcoded in `shopifyCheckout.js`:

```javascript
export const SHOPIFY_VARIANT_IDS = {
  'torchbearer': '49171204276476',
  'ember-rise': '49171202375932',
  'midnight-watch': '49148262809852',
  'suncap-rise': '49148263465212',
  'glowmind-clarity-blend': '49148263596284',
  'mooncap-restore': '49148263760124',
  'dreamcap-blend': '49148261597436',
  'the-oracle-blend': '49148263170300',
  'mystic-bloom-blend': '49148263006460',
  'the-monk-matcha-blend': '49170574115068',
  'the-ascendant-matcha-blend': '49170644402428',
  'the-alchemist-matcha-blend': '49170572148988',
};
```

**Status:** These variant IDs need to be verified against actual Shopify products. If the products were deleted/modified, these IDs may be invalid.

---

## Discount Configuration

### WELCOME15 Discount Code
- **Status:** ⚠️ INACTIVE
- **Type:** Percentage discount (-15%)
- **Usage Limit:** 1 per customer
- **Usage Count:** 1 (already used)
- **Active:** FALSE

**Impact:** The `welcome15` discount appended to all bundle URLs is NOT ACTIVE, which may cause confusion at checkout.

### Automatic Discounts
- **Active Automatic Discounts:** 0
- **Bundle Discounts:** None configured

---

## Pricing Flow Analysis

### Current Flow:
1. **BuildYourRitual Page:** Shows $24.99 per product (from local `mushroomProducts.js`)
2. **Cart Page:** Shows $24.99 per product (from local state)
3. **Checkout (Shopify):** Shows ACTUAL Shopify pricing (unknown - API failing)

### Why Prices Don't Match:
1. **Local catalog** (`mushroomProducts.js`) has hardcoded $24.99 prices
2. **Shopify** may have different prices for the actual products
3. **No sync** between local prices and Shopify prices
4. **Discount code** `welcome15` is inactive, so no 15% discount is applied

### Example from User Report:
```
Cart Display:
- GlowMind: $24.99
- The Monk: $24.99
- Ember Rise: $24.99
Subtotal: $74.97

Checkout (Shopify):
- GlowMind: $18.88
- The Monk: $23.75
- Ember Rise: $19.25
Subtotal: $61.88
```

**This suggests Shopify has DIFFERENT pricing than the local catalog.**

---

## Shopify Markets Pricing

**Markets Configured:** 0  
**International Pricing:** Not configured  
**Currency Conversions:** Not applicable

---

## Recommendations

### Immediate Actions Required:

1. **Update `shopifyCheckout.js` with CORRECT handles:**
   ```javascript
   export const SHOPIFY_VARIANT_IDS = {
     // Need to get ACTUAL variant IDs from Shopify Admin
     'ember-rise-instant-coffee': 'REPLACE_WITH_ACTUAL_ID',
     'midnight-watch-instant-coffee': 'REPLACE_WITH_ACTUAL_ID',
     'glowmind-clarity-instant-mushroom-coffee': 'REPLACE_WITH_ACTUAL_ID',
     // etc...
   };
   ```

2. **Sync local prices with Shopify:**
   - Either remove local prices and ALWAYS fetch from Shopify
   - Or update `mushroomProducts.js` to match Shopify pricing

3. **Activate or remove WELCOME15 discount:**
   - Go to Shopify Admin → Discounts
   - Either activate the WELCOME15 discount code
   - Or remove it from the checkout URLs

4. **Verify all 12 products exist in Shopify:**
   - Some products (Torchbearer, SunCap Rise, The Oracle, Matchas) are MISSING from Shopify
   - Either create these products in Shopify
   - Or remove them from the BuildYourRitual selection

5. **Add price validation:**
   - Before redirecting to checkout, fetch actual prices from Shopify
   - Show customer the REAL total before they leave the site

### Long-term Fixes:

1. **Implement real-time price sync:**
   - Fetch prices from Shopify on page load
   - Display "Prices verified at checkout" message
   - Update cart total if Shopify prices differ

2. **Add error handling:**
   - If product not found in Shopify, show error
   - Don't allow checkout with invalid products

3. **Create product mapping:**
   - Maintain a mapping between internal IDs and Shopify handles/variants
   - Update this mapping when products change in Shopify

---

## Next Steps

1. **Run `listAllShopifyProducts` function** to get complete product list with variant IDs
2. **Update `SHOPIFY_VARIANT_IDS`** in `shopifyCheckout.js` with correct IDs
3. **Test checkout flow** with actual products
4. **Verify pricing matches** between cart and checkout
5. **Activate WELCOME15 discount** in Shopify or remove from URLs

---

## Files Requiring Updates

- ✅ `lib/shopifyCheckout.js` - Update variant IDs and handles
- ⚠️ `lib/mushroomProducts.js` - Sync prices with Shopify OR remove hardcoded prices
- ⚠️ `pages/BuildYourRitual.jsx` - Add price validation before checkout
- ⚠️ `pages/Cart.jsx` - Add price validation before checkout
- ⚠️ Shopify Admin - Activate WELCOME15 discount or create new one

---

**Audit Complete:** 2026-06-11  
**Severity:** HIGH - Customer-facing pricing issue  
**Estimated Fix Time:** 2-4 hours