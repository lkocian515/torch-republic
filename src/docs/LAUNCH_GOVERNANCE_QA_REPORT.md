# Torch Republic Launch Governance QA Report

Date: 2026-08-04

## Scope
This report documents the controlled consistency, governance, SEO, compliance, security, and QA cleanup performed on the existing Torch Republic website. This was not a redesign, ecommerce rebuild, checkout replacement, or product-data rewrite.

## Active Brand Standard
Torch Republic should present publicly as a premium, nature-conscious coffee and wellness beverage company offering light-roast instant coffee, functional mushroom coffee, and ceremonial matcha for intentional daily rituals.

Official positioning applied to public navigation/footer language:
> Torch Republic creates thoughtfully crafted light-roast instant coffee, functional mushroom coffee, and ceremonial matcha for clearer, more intentional daily rituals.

## Route Cleanup
### Routes protected
- `/profile`
- `/loyalty`
- `/email-campaign`
- `/admin/shopify`
- `/admin/keywords`
- `/admin/traffic`
- `/admin/blog`
- `/admin/blog/:slug`
- `/research`

### Routes noindexed
- Auth/account/utility: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/profile`, `/loyalty`, `/cart`, `/checkout`, `/order-confirmation`
- Internal/admin: `/email-campaign`, `/admin/shopify`, `/admin/keywords`, `/admin/traffic`, `/admin/blog`, `/admin/blog/:slug`, `/research`
- Legal/utility: `/shipping-policy`, `/return-policy`, `/privacy-policy`, `/terms-of-service`
- Discontinued apparel/jewelry/collectible routes return Gone behavior and are not intended for indexing.

### Routes redirected or gone
- Internal aliases redirect to protected admin destinations or home.
- Legacy account aliases redirect to the correct account/auth flow.
- Old brand/story aliases redirect to current story/mission pages where relevant.
- Discontinued apparel, jewelry, political merchandise, collectibles, and unrelated old categories are treated as gone or blocked from discovery instead of being misleadingly redirected to the homepage.

### Routes retained
- Primary commerce: `/shop`, `/shop/instant-coffee`, `/shop/instant-mushroom-coffee`, `/shop/matcha`, `/products/:slug`, `/blends/:slug`, `/build-your-ritual`, `/subscription`
- Public education/content: `/mission`, `/contact`, `/reviews`, `/faq`, `/ingredients`, `/journal`, `/journal/:slug`, `/compare`, `/compare/:slug`, active SEO support pages
- Account/cart routes remain functional but are noindexed where appropriate.

## Public Navigation Cleanup
### Actions taken
- Header navigation was aligned to the active brand architecture:
  - Shop
  - Mushroom Coffee
  - Matcha
  - Build Your Ritual
  - Our Story
  - Learn
- Search, account, and cart controls are present in the header.
- Mobile menu now mirrors the public information architecture and includes account/cart access.
- Mobile bottom navigation now uses the approved warm light visual direction and includes Account.

## Footer Cleanup
### Actions taken
Footer was rebuilt into legitimate public columns:
- Shop
- About
- Help
- Legal

Footer now includes:
- Brand statement
- Legal DBA disclosure
- Social links
- Legal policy links
- Account/subscription links

## Sitemap and Robots
### Actions already in place
- Internal/admin/account/utility routes are excluded from crawl discovery through robots rules.
- Product sitemap remains limited to active product URLs.
- Policy pages are not treated as search landing pages.

## Product Consistency
### Products reviewed in local source of truth
- SunCap Rise
- GlowMind Clarity
- MoonCap Restore
- Torchbearer
- Ember Reserve
- The Alchemist
- The Monk

### Conflicts found
- The Base44 `Product` entity currently returned no production records during this audit.
- The local product source (`src/lib/mushroomProducts.js`) is currently acting as the public product source of truth.
- Shopify product fetch returned a very large catalog including archived legacy apparel items, which confirms that Shopify still contains old products that should not be treated as public Torch Republic beverage catalog content.

### Owner review required
The following product fields could not be safely completed without verified owner/product-label documentation:
- Net weight
- Full ingredient declaration by SKU
- Allergen statement
- Caffeine amount or caffeine range
- Subscription eligibility by SKU
- Bundle eligibility by SKU
- Approved wellness claims
- Prohibited claims
- Official packaging review confirmation

No product prices, variants, checkout behavior, inventory logic, subscription pricing, or bundle mechanics were changed in this cleanup pass.

## Legacy Content Cleanup
### Actions taken previously and preserved
- Legacy apparel, jewelry, political, historical merchandise, pod, and obsolete collection URLs are removed from public navigation and treated as redirect/gone/noindex according to relevance.
- Old dark product image references were replaced with current light-label product images.
- Product image containers were changed to warm light backgrounds.

### Remaining legacy risks
- Archived Shopify products still exist in the connected Shopify catalog. They should remain archived or be filtered out by storefront-facing fetch logic.
- Some old components remain in the codebase for legacy/internal pages. They are not intentionally linked from public navigation.

## Claims and Reviews
### Findings
- Claims review needs owner/legal/product documentation before stronger wellness, sourcing, sustainability, or performance claims can be approved.
- Any visible verified-buyer language should be backed by a review provider before being used.

### Owner review required
Confirm whether the site may claim:
- Organic
- Fair trade
- Sustainable
- Responsibly sourced
- Functional benefits beyond general ritual/wellness language
- Specific cognitive, sleep, immunity, detox, or performance outcomes

## SEO Metadata and Structured Data
### Actions already in place
- Route-based SEO management exists.
- Internal, utility, account, and legal routes are noindexed where appropriate.
- Canonicals are managed from the production domain.

### Remaining issues
- Each indexable article/comparison page still requires editorial review for freshness, factual support, duplicate intent, and citation quality.
- Product schema should only use real prices, availability, and verified review data.
- AggregateRating should not be used unless backed by real review data.

## Accessibility and Mobile QA
### Actions taken
- Header and mobile navigation controls include accessible labels.
- Product image backgrounds were moved away from dark boxes.
- Mobile bottom navigation now uses warm light styling for better brand consistency.

### Remaining QA required
Manual testing still required at:
- 360 px
- 390 px
- 430 px
- Tablet
- Desktop

Critical flows still requiring manual regression testing:
- Homepage → collection
- Collection → product
- Product → add to cart
- Cart → checkout
- Product → subscription
- Product → bundle
- Bundle → cart
- Search
- Account
- Legal pages
- Contact
- Journal
- Ingredient links

## Forms and Integrations
### Preserved
- Checkout
- Cart
- Product fetch functions
- Shopify connection
- Email signup behavior
- Auth pages
- Analytics/search-console connectors
- Existing email-related backend functions

No integrations were disconnected or replaced.

## Remaining Issues
1. Owner must confirm the official product facts listed above before product data fields can be completed.
2. Shopify contains archived apparel/legacy products; storefront code must continue filtering these out.
3. Social links should be owner-verified before launch.
4. Review/testimonial claims need proof before displaying verified-buyer language.
5. Comparison pages need factual/date/citation review before being considered launch-ready.
6. Legal policy text should be reviewed by the owner or legal counsel; no legal terms were invented.
7. Full browser-based regression testing should be run with Base44's Testing Agent before final launch.

## Final Status
High-priority public exposure and navigation/footer consistency cleanup has been performed without changing ecommerce, checkout, prices, variants, integrations, or active product routing. Product truth and compliance-sensitive claims remain partially blocked pending owner confirmation.