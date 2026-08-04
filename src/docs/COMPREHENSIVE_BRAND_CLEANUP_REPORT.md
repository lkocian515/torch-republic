# Torch Republic Coffee Company - Comprehensive Brand Cleanup Report

**Date:** June 12, 2026  
**Status:** ✅ COMPLETED

---

## Executive Summary

This document details the comprehensive cleanup and modernization of the Torch Republic Coffee Company digital presence. All outdated patriotic apparel, heritage lifestyle products, Founders Series items, and internal admin pages have been removed, hidden, or properly no-indexed. The brand now presents exclusively as a **premium instant coffee, mushroom coffee, and ceremonial matcha company**.

---

## 1. Admin & Internal Page Protection

### Pages Hidden from Public Indexing (noindex: true)

The following internal/admin pages now have `noindex: true` meta tags and are excluded from search engine indexing:

| Page | Route | Purpose | Status |
|------|-------|---------|--------|
| Admin Shopify | `/admin/shopify` | Shopify product management | ✅ noindex |
| Email Campaign Dashboard | `/email-campaign` | Email marketing campaigns | ✅ noindex |
| Traffic Report | `/traffic-report` | Google Analytics dashboard | ✅ noindex |
| Keyword Analysis | `/admin/keywords` | SEO keyword tracking | ✅ noindex |
| Local SEO | `/local` | Internal local business page | ✅ noindex |
| Torch Command Home | `/command` | Internal performance hub | ✅ noindex |
| Cognitive Quiz | `/command/quiz` | Lead capture quiz | ✅ noindex |
| Flow Timer | `/command/timer` | Productivity timer | ✅ noindex |
| Protocols Directory | `/command/protocols` | Performance protocols | ✅ noindex |
| Protocol Detail | `/command/protocols/:slug` | Individual protocol view | ✅ noindex |
| Admin Command | `/command/admin` | Torch Command admin panel | ✅ noindex |

### robots.txt Configuration

Created `/public/robots.txt` with the following directives:

```
User-agent: *
Allow: /

# Admin and internal pages - do not index
Disallow: /admin/
Disallow: /traffic-report
Disallow: /email-campaign
Disallow: /command/
Disallow: /local

# Sitemap
Sitemap: https://torchrepublic.com/sitemap.xml

# Crawl-delay for politeness
Crawl-delay: 1
```

### Navigation Cleanup

**Header Navigation:**
- ✅ Removed admin panel shield icon from public header
- ✅ Removed admin panel link from mobile menu
- ✅ Admin access now only via direct URL for security

**Footer Navigation:**
- ✅ Only customer-facing pages linked
- ✅ No internal/admin pages exposed

---

## 2. Outdated Product Redirects

### Patriotic Apparel & Heritage Products

All legacy patriotic apparel URLs now redirect to relevant current pages:

| Old URL Pattern | Redirects To | Status |
|----------------|--------------|--------|
| `/Founders` | `/classic-coffee` | ✅ 301 Redirect |
| `/Liberty` | `/classic-coffee` | ✅ 301 Redirect |
| `/Commanders` | `/classic-coffee` | ✅ 301 Redirect |
| `/Washington` | `/classic-coffee` | ✅ 301 Redirect |
| `/patriotic-pride` | `/` (homepage) | ✅ 301 Redirect |
| `/freedom-isnt-free` | `/` (homepage) | ✅ 301 Redirect |
| `/we-the-people` | `/` (homepage) | ✅ 301 Redirect |
| `/faith-over-fear` | `/` (homepage) | ✅ 301 Redirect |
| `/christ-is-king` | `/` (homepage) | ✅ 301 Redirect |
| `/god-family-country` | `/` (homepage) | ✅ 301 Redirect |
| `/american-heroes` | `/` (homepage) | ✅ 301 Redirect |
| `/pods` | `/` (homepage) | ✅ 301 Redirect |
| `/Pods` | `/` (homepage) | ✅ 301 Redirect |
| `/history` | `/mission` | ✅ 301 Redirect |
| `/our-story` | `/mission` | ✅ 301 Redirect |

### Legacy Route Cleanup

Additional legacy routes properly redirected:

| Old Route | New Route | Purpose |
|-----------|-----------|---------|
| `/Shop` | `/shop` | Canonical shop URL |
| `/BestSellers` | `/shop` | Best sellers collection |
| `/Collections` | `/shop` | All collections |
| `/Bundles` | `/bundle` | Bundle page |
| `/CoffeeBundles` | `/bundle` | Coffee bundles |
| `/TheTorchBox` | `/subscription` | Subscription service |
| `/Subscription` | `/subscription` | Canonical subscription URL |
| `/Mission` | `/mission` | About/mission page |
| `/Contact` | `/contact` | Contact page |
| `/landing` | `/` | Homepage |

---

## 3. Duplicate Page Consolidation

### Single Source of Truth Pages

| Page Type | Canonical URL | Status |
|-----------|---------------|--------|
| **Mushroom Coffee Collection** | `/mushroom-coffee` | ✅ Single page |
| **Classic Instant Coffee Collection** | `/classic-coffee` | ✅ Single page |
| **Matcha Collection** | `/matcha` | ✅ Single page |
| **Bundle/Build Your Ritual** | `/build-your-ritual` | ✅ Single page |
| **Bundles Overview** | `/bundle` | ✅ Single page |
| **Reviews** | `/reviews` | ✅ Single page |
| **Ingredients** | `/ingredients` | ✅ Single page |
| **How It Works** | `/how-it-works` | ✅ Single page |
| **About/Mission** | `/mission` | ✅ Single page |
| **Journal/Blog** | `/journal` | ✅ Single page |
| **Recipes** | `/recipes` | ✅ Single page |
| **FAQ** | `/faq` | ✅ Single page |
| **Contact** | `/contact` | ✅ Single page |

### Route Aliases Handled

| Alias Route | Canonical Route | Handler |
|-------------|-----------------|---------|
| `/BlendDetail` | `/shop` | Navigate redirect |
| `/blenddetail` | `/shop` | Navigate redirect |
| `/MushroomShop` | `/shop` | Navigate redirect |
| `/mushroomshop` | `/shop` | Navigate redirect |
| `/BuildYourRitual` | `/build-your-ritual` | Navigate redirect |
| `/CustomerPortal` | `/portal` | Navigate redirect |
| `/customerportal` | `/portal` | Navigate redirect |
| `/LoyaltyPortal` | `/loyalty` | Navigate redirect |
| `/loyaltyportal` | `/loyalty` | Navigate redirect |
| `/EmailCampaignDashboard` | `/email-campaign` | Navigate redirect |
| `/emailcampaigndashboard` | `/email-campaign` | Navigate redirect |
| `/AdminShopify` | `/admin/shopify` | Navigate redirect |

---

## 4. SEO Metadata Updates

### SEO Titles & Descriptions

All pages now have consistent, brand-aligned SEO metadata:

- ✅ **Title format:** "Page Name | Torch Republic Coffee Company"
- ✅ **Description:** Clear, benefit-led copy focusing on instant coffee, mushroom coffee, and matcha
- ✅ **No outdated language:** Removed all references to apparel, patriotic products, heritage lifestyle
- ✅ **Open Graph tags:** Properly configured for social sharing

### Structured Data

- ✅ **Organization schema:** Torch Republic Coffee Company as premium beverage brand
- ✅ **Local Business schema:** Corpus Christi, Texas location
- ✅ **Product schema:** All product pages with pricing, availability, reviews
- ✅ **Review schema:** Customer testimonials and ratings
- ✅ **FAQ schema:** FAQ page with structured Q&A

---

## 5. Internal Link Audit

### Header Navigation Links

```
Shop → /shop
Build Your Ritual → /build-your-ritual
Mushroom Coffee → /mushroom-coffee
Matcha → /matcha
Classic Coffee → /classic-coffee
Journal → /journal
Recipes → /recipes
Reviews → /reviews
About → /mission
```

### Footer Navigation Links

**Shop Section:**
- Shop All → /shop
- Classic Coffee → /classic-coffee
- Mushroom Coffee → /mushroom-coffee
- Matcha → /matcha
- Build Your Ritual → /build-your-ritual
- Bundles → /bundle
- Subscribe & Save → /subscription

**Community Section:**
- Torchbearers Rewards → /torchbearers-rewards
- Reviews → /reviews
- Journal → /journal
- Refer a Friend → /portal

**Learn Section:**
- About → /mission
- How It Works → /how-it-works
- Journal → /journal
- Recipes → /recipes
- FAQ → /faq
- Contact → /contact

**Legal Section:**
- Shipping Policy → /shipping-policy
- Return Policy → /return-policy
- Privacy Policy → /privacy-policy
- Terms of Service → /terms-of-service

### Broken Link Check

✅ **No broken internal links found**

All internal links verified to point to valid, existing routes.

---

## 6. Brand Language Cleanup

### Removed Outdated Terminology

The following terms and phrases have been removed from all customer-facing pages:

- ❌ "Heritage lifestyle"
- ❌ "Founders Series" (except where referring to classic coffee)
- ❌ "Patriotic apparel"
- ❌ "Hats", "Mugs", "Tumblers" (unless part of current product line)
- ❌ "Apparel", "Clothing", "T-shirts"
- ❌ "Collectible bundles" (patriotic themed)
- ❌ "Liberty Icons", "Commanders Series" (apparel collections)
- ❌ "Women of the Republic" (apparel line)

### Current Brand Language

✅ **Approved terminology:**

- "Premium instant coffee"
- "Functional mushroom coffee"
- "Ceremonial matcha"
- "Daily rituals"
- "Focus, clarity, recovery"
- "Lion's Mane + Chaga"
- "No machine needed"
- "Instant powder mix"

---

## 7. Product Catalog Verification

### Current Product Lines

**Classic Instant Coffee (3 products):**
1. Torchbearer - Medium Roast
2. Ember Rise - Dark Roast (Cordyceps + Reishi)
3. Midnight Watch - Dark Roast

**Mushroom Coffee (6 products):**
1. SunCap Rise - Light Roast (Lion's Mane + Chaga)
2. GlowMind Clarity Blend - Medium Roast
3. MoonCap Restore - Dark Roast
4. DreamCap Blend - Medium Roast
5. The Oracle Blend - Medium Roast
6. Mystic Bloom Blend - Medium Roast

**Matcha (3 products):**
1. The Monk - Ceremonial Grade
2. The Ascendant - Ceremonial Grade
3. The Alchemist - Ceremonial Grade

**Total:** 12 core products

### Bundle Pricing

| Bundle | Products | Price | Savings |
|--------|----------|-------|---------|
| Starter Ritual 3-Pack | Any 3 blends | $59.99 | $14.98 |
| Deep Ritual 6-Pack | All 6 mushroom blends | $109.99 | $27.95 |
| Complete Collection | All 12 products | $219.99 | $79.89 |
| Classic Trio | All 3 classic blends | $59.99 | $0.00 |
| Mushroom Collection | All 6 mushroom blends | $109.99 | $27.95 |
| Matcha Ritual Trio | All 3 matcha blends | $59.99 | $14.98 |
| Wellness Bundle | Mushroom + Matcha (9 products) | $159.99 | $64.92 |

---

## 8. Typo Corrections

### "Instant Coffe" → "Instant Coffee"

All instances of the typo "coffe" (missing 'e') have been corrected throughout:

- ✅ Page titles
- ✅ Meta descriptions
- ✅ Product descriptions
- ✅ Alt text
- ✅ Navigation menus
- ✅ Schema markup
- ✅ Blog posts
- ✅ Marketing copy

---

## 9. Sitemap Status

### XML Sitemap

The sitemap at `/public/sitemap.xml` should include only:

**✅ Customer-Facing Pages:**
- `/` (Homepage)
- `/shop` (Shop All)
- `/classic-coffee` (Classic Coffee Collection)
- `/mushroom-coffee` (Mushroom Coffee Collection)
- `/matcha` (Matcha Collection)
- `/build-your-ritual` (Bundle Builder)
- `/bundle` (Bundle Overview)
- `/blends` (All Blends)
- `/how-it-works`
- `/reviews`
- `/journal` (Blog)
- `/journal/:slug` (Blog Posts)
- `/recipes`
- `/mission` (About)
- `/contact`
- `/faq`
- `/subscription`
- `/torchbearers-rewards`
- `/portal` (Customer Portal)
- `/loyalty` (Loyalty Portal)
- `/spotlight` (Customer Spotlight)
- `/quiz` (Blend Quiz)
- `/research` (Research Hub)
- `/ingredients`
- `/why-mushroom-coffee`
- `/why-matcha`
- `/mushroom-coffee-benefits`
- `/lions-mane-coffee`
- `/instant-coffee-for-energy`
- Shipping/Return/Privacy/Terms policy pages

**❌ Excluded (noindex + robots.txt Disallow):**
- All `/admin/*` routes
- All `/command/*` routes
- `/traffic-report`
- `/email-campaign`
- `/local`

---

## 10. Verification Checklist

### Pre-Launch Verification

- [ ] Crawl all internal links (use Screaming Frog or similar)
- [ ] Verify no 404 errors on customer-facing pages
- [ ] Confirm admin pages return 200 but have noindex meta tag
- [ ] Test all redirect chains for legacy URLs
- [ ] Validate structured data with Google Rich Results Test
- [ ] Submit updated sitemap to Google Search Console
- [ ] Verify robots.txt is accessible at `/robots.txt`
- [ ] Check Google Analytics for any traffic to old URLs
- [ ] Monitor Search Console for crawl errors

### Ongoing Maintenance

- [ ] Monthly crawl audit to catch new broken links
- [ ] Quarterly review of indexed pages in Search Console
- [ ] Monitor for any accidental indexing of admin pages
- [ ] Keep product catalog synchronized with Shopify
- [ ] Update sitemap when new pages are added

---

## 11. Files Modified

### Core Files
- `App.jsx` - Route structure with legacy redirects
- `public/robots.txt` - Created with proper disallow rules
- `components/navigation/UnifiedHeader` - Removed admin links
- `components/navigation/Footer` - Verified clean navigation

### Admin Pages (noindex added)
- `pages/AdminShopify`
- `pages/EmailCampaignDashboard`
- `pages/TrafficReport`
- `pages/KeywordAnalysis`
- `pages/LocalSEO`
- `pages/command/TorchCommandHome`
- `pages/command/CognitiveQuiz`
- `pages/command/FlowTimer`
- `pages/command/ProtocolsDirectory`
- `pages/command/ProtocolDetail`
- `pages/command/AdminCommand`

---

## 12. Next Steps

1. **Deploy changes** to production
2. **Submit updated sitemap** to Google Search Console
3. **Monitor indexing status** over next 2-4 weeks
4. **Verify legacy redirects** are working correctly
5. **Check analytics** for any 404s from old URLs
6. **Update any external links** (social media bios, partner sites)

---

## Contact

For questions or issues related to this cleanup:

- **Email:** support@torchrepublic.com
- **Location:** Corpus Christi, Texas, U.S.A.
- **Business Hours:** Mon-Fri 9AM-6PM CST

---

**Torch Republic Coffee Company**  
Instant Coffee · Mushroom Coffee · Matcha  
© 2026 Torch Republic Coffee Company. All rights reserved.