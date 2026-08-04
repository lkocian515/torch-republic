# PRODUCT INFORMATION STILL NEEDED
### Internal Report — Lisa, please request the following from your supplier(s)

Generated: 2026-06-23  
Purpose: This document tracks every product fact that could not be verified from existing descriptions, Shopify data, or supplier documentation currently in the system. Do not display any of these values on customer-facing pages until confirmed.

---

## MUSHROOM COFFEE PRODUCTS
Applies to: GlowMind Clarity Blend, MoonCap Restore, SunCap Rise, DreamCap Blend, The Oracle Blend, Mystic Bloom Blend

| Field | Status | Action Required |
|---|---|---|
| Mushroom species (full list) | ❌ Unverified | Confirm species per blend (Lion's Mane, Chaga, Reishi, Cordyceps, etc.) |
| Mushroom quantity per serving (mg) | ❌ Unverified | Request exact mg per mushroom per serving |
| Extract ratio or whole mushroom powder | ❌ Unverified | Confirm: e.g. "10:1 extract" or "whole powder" |
| Fruiting body or mycelium | ❌ Unverified | Confirm which part of the mushroom is used per product |
| Caffeine per serving (mg) | ❌ Unverified | Request lab-verified caffeine content per blend |
| Full ingredient list (in order by weight) | ❌ Unverified | Request complete INCI/supplement fact panel per product |
| Allergen information | ❌ Unverified | Confirm: gluten, dairy, soy, tree nuts, etc. |
| Place of manufacture or roasting | ❌ Unverified | City, state/country of manufacture |
| Third-party testing or certification | ❌ Unverified | COA, NSF, Informed Sport, USDA Organic, etc. |
| Serving size (grams or teaspoons) | ⚠️ Partial | "1 scoop" shown — confirm exact weight in grams |
| Number of servings per tube | ⚠️ Partial | Currently displayed as 27 — confirm this is accurate for ALL mushroom blends |

---

## CLASSIC INSTANT COFFEE PRODUCTS
Applies to: Torchbearer, Ember Rise, Midnight Watch, Republic Reserve

| Field | Status | Action Required |
|---|---|---|
| Coffee origin (country/region) | ⚠️ Partial | Papua New Guinea referenced for some products — confirm per product |
| Roast level | ⚠️ Partial | "Dark roast" referenced for some — confirm for all SKUs |
| Processing method (washed, natural, honey) | ❌ Unverified | Request from roaster/supplier |
| Freeze-dried or spray-dried | ⚠️ Partial | Freeze-dried referenced in marketing — confirm officially |
| Caffeine per serving (mg) | ❌ Unverified | Request lab-verified figure. Do not use "60-80mg" estimate without confirmation |
| Serving size (grams or teaspoons) | ⚠️ Partial | "1 scoop" — confirm exact weight |
| Number of servings per tube | ⚠️ Partial | Currently displayed as 27 — confirm for all classic coffee SKUs |
| Full ingredient list | ❌ Unverified | Even single-ingredient products should have allergen statement |
| Arabica vs. Robusta blend ratio | ❌ Unverified | "Premium Arabica" in marketing — confirm from supplier |

---

## MATCHA PRODUCTS
Applies to: The Monk Matcha, The Ascendant Matcha, The Alchemist Matcha

| Field | Status | Action Required |
|---|---|---|
| Origin (prefecture/region in Japan) | ❌ Unverified | Confirm: Uji, Nishio, Kagoshima, or other |
| Grade (ceremonial vs. culinary) | ⚠️ Partial | "Ceremonial grade" stated in marketing — request official documentation |
| Full ingredient list | ❌ Unverified | Especially if blended with other ingredients |
| Serving size (grams) | ❌ Unverified | Request exact gram weight per serving |
| Caffeine per serving (mg) | ❌ Unverified | Request lab-verified figure |
| L-Theanine content | ❌ Unverified | Do not claim unless lab-verified |
| Preparation directions (official) | ⚠️ Partial | "Hot water, stir" shown — confirm temperature and timing |
| Number of servings per tube | ⚠️ Partial | Confirm exact count |

---

## DREAMCAP BLEND — SPECIAL NOTE
DreamCap is positioned as an "evening ritual." Before making any caffeine-related claims:
- Confirm exact caffeine content per serving from lab results
- If lower caffeine than other blends, this can be stated accurately (e.g., "X mg per serving")
- Do NOT use language implying it aids sleep or prevents insomnia without clinical backing

---

## REVIEW AND SOCIAL PROOF

| Item | Status | Action Required |
|---|---|---|
| "4.9 average" store-wide rating | ❌ Unverified source | Import Loox/Judge.me reviews into the Review entity and use that aggregate |
| Fabricated testimonials in ReviewsSection | ⚠️ In use as fallback | Replace with real verified reviews from Loox, Judge.me, or Shopify Reviews app |
| "Verified Customer" badge | Not yet used | Only apply once review app confirms purchase verification |
| Per-product review counts | Not displayed | When real reviews are imported, show per-product counts only on that product's page |

---

## SHOPIFY SETTINGS LISA MUST CHANGE

1. **Loox / Judge.me / Review app**: Confirm which app is installed and configure the API key so the `importLooxReviews` backend function can sync real reviews into the Review entity.
2. **Metafields for product specs**: Add Shopify metafields for caffeine, mushroom species, serving size, and ingredient list per product. These can then be pulled via the Storefront API.
3. **Subscription app (Recharge or Bold)**: Confirm subscription pricing matches the 20% discount shown on the site. Verify DreamCap is included in subscription options.
4. **WELCOME15 discount code**: Confirm it is active in Shopify Admin > Discounts and not expired.
5. **Free shipping threshold**: Confirm in Shopify Shipping settings that free shipping triggers at $50 — not $50 or another value.

---

## CLAIMS REMOVED OR MODIFIED (unable to verify)

| Original Claim | Action Taken | Reason |
|---|---|---|
| "60-80mg caffeine per serving" | Replaced with "varies by blend, see product page" | No lab documentation in system |
| "200+ reviews" | Replaced with "4.9 average · store-wide reviews" | Source not verifiable from current data |
| Hardcoded "(127)" review count per product | Removed | Fabricated — same number on every product |
| "Zero waste" / "guaranteed savings" | Not added | Unsupported absolute claims |
| "Verified Customer" badge on fallback reviews | Changed to "Customer Review" | Reviews are sample/fallback, not confirmed purchases |
| "$0.20–$0.30 per serving" comparison | Not used | Inaccurate — actual per-serving cost is $0.74–$0.93 |
| "Free Shipping $50+" in meta description | Corrected to $50+ | siteConfig is source of truth at $50 |