# TORCH REPUBLIC — OWNER INPUT CHECKLIST (DROPSHIPPER-FOCUSED)

Torch Republic uses a dropshipping supplier for instant coffee. The following
facts must be confirmed against the dropshipper's spec sheet before they appear
on the public site. Until confirmed, affected claims are hidden.

## HOW TO USE THIS CHECKLIST

1. Request the spec sheet / COA / product label from your dropshipper.
2. For each item below, fill in the verified value in `src/lib/productSpecsConfig.js`.
3. Change `verified: false` to `verified: true` for that product.
4. The verified value will now appear on the public site automatically.

Do not guess. Do not copy values from other products or websites. Only fill in
what the dropshipper has confirmed in writing.

---

## CHECKOUT-BLOCKING (resolve before enabling commerce)

These items block live checkout or will cause customer-visible errors:

- [ ] **WELCOME10** — Is the discount code active in Shopify? What does it exclude?
      Fill in: `COMMERCE_SPECS.welcome10_active`, `welcome10_exclusions`

- [ ] **MORNINGDUO** — Is there a discount code or automatic discount that
      produces exactly $45.00 for 1 Classic + 1 Mushroom? What type?
      Fill in: `COMMERCE_SPECS.morningduo_active`, `morningduo_type`, `morningduo_price`

- [ ] **Free shipping rule** — Is the $45 free-shipping rule active in Shopify
      shipping settings?
      Fill in: `COMMERCE_SPECS.free_shipping_active`

- [ ] **Pumpkin Spice** — Is this product active in Shopify? What is the variant
      ID and inventory count? If not active, the product page should say
      "Coming Soon."
      Fill in: `COMMERCE_SPECS.pumpkin_spice_active`, `pumpkin_spice_variant_id`,
      `pumpkin_spice_inventory`

---

## CLAIM-BLOCKING (resolve before publishing product/health claims)

These items block factual product claims. Until confirmed, the site shows
generic copy ("functional mushroom extracts," "premium Arabica coffee") with no
specific species, origin, caffeine, or health claims.

### Mushroom Coffee formula
- [ ] What are the current physical ingredients? (full ingredient list)
      Fill in: `PRODUCT_SPECS['instant-mushroom-coffee'].ingredients`
- [ ] What are the exact mushroom species in the formula?
      Fill in: `.mushroom_species`
- [ ] What is the amount per serving of each mushroom?
      Fill in: `.mushroom_amount_per_serving`
- [ ] Is it fruiting body, mycelium, powder, or extract?
      Fill in: `.mushroom_extract_type`
- [ ] What is the extract ratio or standardization, if applicable?
      Fill in: `.mushroom_extract_ratio`

### Caffeine
- [ ] Exact caffeine milligrams per serving — Classic
      Fill in: `PRODUCT_SPECS['instant-classic-coffee'].caffeine_mg`
- [ ] Exact caffeine milligrams per serving — Mushroom
      Fill in: `PRODUCT_SPECS['instant-mushroom-coffee'].caffeine_mg`

### Coffee origin
- [ ] What is the coffee origin? Is "single-origin" accurate?
      Fill in: `.coffee_origin`, `.is_single_origin`
      (Currently hidden — site says "premium Arabica coffee" with no origin claim.)

### Processing method
- [ ] Is "freeze-dried" accurate for each SKU?
      Fill in: `.is_freeze_dried`

### Net weight and servings
- [ ] Current net weight for each SKU
      Fill in: `.net_weight`
- [ ] Verified serving count for each SKU (27 claimed — is this accurate?)
      Fill in: `.servings`

### Allergens
- [ ] Allergen and cross-contact statements for each SKU
      Fill in: `.allergen_statement`

### Testing and certifications
- [ ] What testing is performed? (heavy metals, microbial, potency, etc.)
      Fill in: `.testing_performed`
- [ ] Which laboratory performs the testing?
      Fill in: `.testing_lab`
- [ ] What is the testing frequency? (every batch, quarterly, etc.)
      Fill in: `.testing_frequency`
- [ ] Is there a customer-facing certificate of analysis URL?
      Fill in: `.certificate_url`
- [ ] What active certifications does the product carry?
      Fill in: `.certifications`

### Supplier language
- [ ] What supplier/roaster language is permitted publicly?
      Fill in: `.supplier_name`

---

## FULFILLMENT (dropshipper-specific)

- [ ] What is the actual processing time? (dropshipper's handling time)
      Fill in: `COMMERCE_SPECS.processing_time`
      (Currently says "1-3 business days" — verify against dropshipper SLA)
- [ ] What is the actual delivery window? (transit time after processing)
      Fill in: `COMMERCE_SPECS.delivery_window`
- [ ] What markets are served? Is international available?
      Fill in: `COMMERCE_SPECS.markets_served`, `international_available`

---

## OPTIONAL (resolve when ready)

- [ ] Rewards economics and terms (points per dollar, redemption value, tiers,
      expiration). Currently hidden — rewards page says "Program details are
      being finalized."
      Fill in: `COMMERCE_SPECS.rewards_economics`
- [ ] Subscription selling-plan status, cadence, and verified discount rate.
      Currently hidden — all surfaces say "coming soon."
      Fill in: `COMMERCE_SPECS.subscription_active`, `subscription_cadence`,
      `subscription_discount`
- [ ] Actual return/refund method under the First Cup Guarantee.
      Fill in: `COMMERCE_SPECS.return_method`
- [ ] Whether any verified-purchase reviews currently exist.
      Fill in: `COMMERCE_SPECS.verified_reviews_exist`

---

## SUMMARY

| Priority | Items | Action |
|----------|-------|--------|
| Checkout-blocking | 4 | Resolve before enabling commerce; currently hidden or disabled |
| Claim-blocking | 15+ | Hidden from public site; generic copy in place |
| Optional | 4 | Hidden; placeholder copy in place |