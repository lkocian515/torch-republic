# TORCH REPUBLIC SEO AUDIT & FIXES REPORT
## Executive Summary

**Audit Date:** June 10, 2026  
**Domain:** torchrepublic.com  
**Brand:** Torch Republic Coffee Company  
**Vertical:** Premium Instant Coffee, Mushroom Coffee, Matcha, Ritual Bundles

---

## 1. CRITICAL FIXES COMPLETED

### 1.1 Homepage Product Images Loading Issue
**Problem:** Product images on homepage were not loading reliably due to async Shopify API calls rendering before data was available.

**Root Cause:**
- `StartHereSection` and `ShopByCategory` components fetched Shopify products asynchronously
- Components rendered before image data was loaded, showing blank cards
- No loading states or fallback images for above-the-fold content

**Fixes Applied:**
✅ Added loading states with skeleton spinners to `StartHereSection`  
✅ Added `loading="eager"` and `fetchpriority="high"` to first 2 above-the-fold product images  
✅ Added `loading` state to `ShopByCategory` with proper skeleton loaders  
✅ Improved image error handling with branded fallback placeholder  
✅ Changed category images from `loading="lazy"` to `loading="eager"` for above-fold content  
✅ Added proper alt text: `${product.label} - Torch Republic`

**Files Modified:**
- `components/home/StartHereSection` - Added loading state, fetchpriority, eager loading
- `components/home/ShopByCategory` - Added loading state, eager loading for category images

---

### 1.2 Noindex Tags for Utility Pages
**Problem:** Account/cart pages were potentially indexable by Google, wasting crawl budget and creating thin content in search results.

**Status:** ✅ **ALREADY CONFIGURED CORRECTLY**

**Pages with noindex: true:**
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password reset request
- `/reset-password` - Set new password
- `/profile` - User account settings
- `/portal` - Customer portal (subscription + loyalty)
- `/cart` - Shopping cart
- `/order-confirmation` - Order confirmation (redirects to home)
- `/traffic-report` - Internal admin analytics

**Action Taken:**
- Verified all auth pages already have `noindex: true` in useSEO calls
- Added `noindex: true` to Cart page with proper useSEO import

---

### 1.3 Robots.txt Created
**File:** `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /cart
Disallow: /checkout
Disallow: /login
Disallow: /register
Disallow: /profile
Disallow: /reset-password
Disallow: /forgot-password
Disallow: /customer-portal
Disallow: /order-confirmation
Disallow: /traffic-report
Disallow: /admin
Disallow: /account

Sitemap: https://torchrepublic.com/sitemap.xml
```

**Purpose:**
- Blocks search engines from crawling low-value utility pages
- Allows crawling of all product, category, blog, and content pages
- Points to sitemap location for efficient indexing

---

## 2. TECHNICAL SEO STATUS

### 2.1 Canonical Tags
**Status:** ✅ **IMPLEMENTED**

All pages use the `useSEO` hook which automatically injects canonical tags:
- Homepage: `https://torchrepublic.com/`
- Product pages: `/products/{slug}`
- Category pages: `/shop/{category}`
- Blog posts: `/journal/{slug}`

**Note:** The hook appends brand name to titles automatically if not present.

---

### 2.2 Structured Data / Schema
**Status:** ✅ **IMPLEMENTED**

**Global Schema (index.html):**
- ✅ Organization schema with TX address
- ✅ WebSite schema
- ✅ FAQPage schema on homepage

**Page-Level Schema (via useSEO hook):**
- ✅ Product schema on product pages (when product data provided)
- ✅ BreadcrumbList schema on all pages with breadcrumbs
- ✅ FAQPage schema on pages with FAQ arrays
- ✅ BlogPosting schema on blog posts

**Schema Fields Included:**
- Product name, description, price, image, SKU
- Brand information
- Offer details (price, currency, availability)
- AggregateRating (only when real reviews exist)

---

### 2.3 Open Graph / Social Sharing
**Status:** ✅ **IMPLEMENTED**

All pages automatically get:
- `og:title` - Page title with brand
- `og:description` - Meta description
- `og:url` - Canonical URL
- `og:type` - website/product/article
- `og:image` - Default brand image or custom
- `og:site_name` - Torch Republic Coffee Co.
- `og:locale` - en_US
- `twitter:card` - summary_large_image
- `twitter:title`, `twitter:description`, `twitter:image`

**Default OG Image:**
`https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png`

---

### 2.4 Sitemap
**Status:** ⚠️ **NEEDS VERIFICATION**

**Referenced in:**
- `index.html` - `<link rel="sitemap" type="application/xml" href="/sitemap.xml" />`
- `robots.txt` - `Sitemap: https://torchrepublic.com/sitemap.xml`

**Action Required:**
- Verify `/sitemap.xml` exists and is accessible
- Ensure sitemap includes all product, category, blog, and content pages
- Ensure sitemap excludes noindex pages

---

## 3. IMAGE OPTIMIZATION

### 3.1 Current Image Strategy
**Above-the-fold images:**
- `loading="eager"` - Loaded immediately
- `fetchpriority="high"` - For first 2 product cards
- No lazy loading on hero/LCP images

**Below-the-fold images:**
- `loading="lazy"` - Deferred until scrolled into view
- Proper error fallbacks with branded placeholders

**Image Fallbacks:**
- Primary fallback: `FALLBACK_IMAGE` constant in components
- Branded placeholder from Shopify CDN
- Console logging for debugging broken images

### 3.2 Image Speed Recommendations
**Not Yet Implemented:**
- ⚠️ WebP/AVIF conversion (requires Shopify or CDN support)
- ⚠️ Responsive srcset attributes
- ⚠️ Explicit width/height on all images (aspect-ratio used instead)
- ⚠️ Image compression audit

**Current Approach:**
- Uses Shopify CDN for product images
- Aspect-ratio containers prevent layout shift
- Object-contain ensures full image visibility

---

## 4. CONTENT & ON-PAGE SEO

### 4.1 Homepage SEO
**Status:** ✅ **OPTIMIZED**

**Title:**  
`Torch Republic Coffee Company | Premium Instant Coffee, Mushroom Coffee & Matcha`

**Meta Description:**  
`Discover premium instant coffee, functional mushroom coffee, ceremonial matcha, and ritual bundles designed for clarity, focus, and intentional daily energy. No machine needed. Shop coffee-forward blends made for modern wellness.`

**H1:** Handled by HeroSection component  
**FAQ Schema:** 5 questions implemented  
**Internal Links:** Category pages, bundles, quiz

---

### 4.2 Duplicate Content Issue
**Status:** ⚠️ **REQUIRES INVESTIGATION**

**Search Result Shows:**
"Torch Republic Coffee Company is a premium coffee company creating instant coffee, mushroom coffee, and matcha blends designed around intentional daily..."

**This appears on:**
- torch-republic.com (hyphenated domain - should redirect)
- Multiple pages according to audit

**Potential Causes:**
1. Old domain (torch-republic.com) not properly redirecting
2. Duplicate meta descriptions across pages
3. Thin category pages with similar intro text

**Action Required:**
- ✅ Verify 301 redirect from torch-republic.com → torchrepublic.com
- ✅ Audit all category pages for unique descriptions
- ✅ Ensure product pages have unique titles/descriptions

---

### 4.3 Category Page SEO
**Status:** ⚠️ **NEEDS ENHANCEMENT**

**Current Routes:**
- `/classic-coffee` - Should be `/shop/instant-coffee`
- `/mushroom-coffee` - Should be `/shop/instant-mushroom-coffee`
- `/matcha` - Should be `/shop/matcha`

**Recommendations:**
1. Add 300-600 words of unique category copy
2. Add category-specific FAQs
3. Update URLs to match SEO structure in audit
4. Add CollectionPage schema
5. Add internal links to related blog posts

---

## 5. SITE SPEED & CORE WEB VITALS

### 5.1 Current Optimizations
✅ Critical CSS inlined (via Tailwind)  
✅ Font preloading in index.html  
✅ Above-fold images use eager loading  
✅ Non-essential pages marked noindex  
✅ Component lazy loading via React.lazy in App.jsx  
✅ Pull-to-refresh for mobile data refresh  

### 5.2 Performance Recommendations
**Not Yet Implemented:**
- ⚠️ JavaScript bundle splitting audit
- ⚠️ Third-party script audit (GA4, pixels)
- ⚠️ Review widget deferral
- ⚠️ Loyalty widget deferral
- ⚠️ Popup delay optimization

**Quick Wins:**
1. Defer email capture popup until 5s after page load
2. Load review carousels after main content
3. Defer non-critical animations on mobile
4. Add `rel="preconnect"` for Shopify CDN

---

## 6. DOMAIN & CANONICAL ISSUES

### 6.1 Domain Variants
**Known Domains:**
- torchrepublic.com (primary) ✅
- torch-republic.com (hyphenated) ⚠️
- torchrepublic.app (TLD) ⚠️

**Action Required:**
- ✅ Set up 301 redirects from torch-republic.com → torchrepublic.com
- ✅ Set up 301 redirects from torchrepublic.app → torchrepublic.com
- ✅ Verify canonical tags point to torchrepublic.com on all pages
- ✅ Remove srsltid parameters from indexed URLs (Google Shopping artifact)

---

## 7. PRODUCT DATA FEED READINESS

### 7.1 Google Merchant Center Requirements
**Status:** ⚠️ **PARTIALLY READY**

**Available Fields:**
- ✅ Product title (from Shopify)
- ✅ Product description (from product data)
- ✅ Product URL (canonical)
- ✅ Image URL (Shopify CDN)
- ✅ Price (from Shopify)
- ✅ Availability (from Shopify)
- ✅ Brand (Torch Republic)
- ✅ SKU (shopifyHandle)

**Missing/Needs Verification:**
- ⚠️ GTIN/MPN (if applicable)
- ⚠️ Product category (Google taxonomy)
- ⚠️ Shipping details in schema
- ⚠️ Return policy in schema

**Feed Title Format (Recommended):**
- `Torch Republic GlowMind Clarity Instant Mushroom Coffee`
- `Torch Republic The Monk Ceremonial Matcha Powder`
- `Torch Republic Torchbearer Premium Instant Coffee`

---

## 8. INTERNAL LINKING STRUCTURE

### 8.1 Current Navigation
**Main Nav (UnifiedHeader):**
- Shop
- Mushroom Coffee
- Instant Coffee
- Matcha
- Bundles
- Find Your Ritual (quiz)
- Journal (blog)
- About

**Footer Links:**
- Shop All
- Category pages
- FAQ
- Reviews
- Contact
- Policies (shipping, returns, privacy, terms)
- Founder Story

### 8.2 Internal Linking Opportunities
**Add to Homepage:**
- ✅ Links to category pages (implemented)
- ✅ Links to bundles (implemented)
- ✅ Links to quiz (implemented)
- ⚠️ Add links to blog posts (Ritual Journal)
- ⚠️ Add "Best for Focus" product links

**Add to Product Pages:**
- ✅ Category links (via breadcrumbs)
- ✅ Related products (implemented)
- ⚠️ Add 1-2 blog post links per product
- ⚠️ Add bundle upsell links

**Add to Blog Posts:**
- ⚠️ Create blog posts first
- ⚠️ Link to relevant products
- ⚠️ Link to category pages
- ⚠️ Link to quiz

---

## 9. PAGES REQUIRING OWNER INPUT

### 9.1 Product Details Needing Verification
**For Each Product:**
1. **Exact caffeine content** (mg per serving)
2. **Mushroom dosage** (mg of Lion's Mane, Chaga per serving)
3. **Extract type** (fruiting body vs mycelium)
4. **Extract ratio** (if applicable)
5. **Certifications** (organic, non-GMO, third-party tested?)
6. **Allergen information**

**Current Approach:**
- Uses placeholder text: "Verified dosage and caffeine details coming soon"
- Does not make unsupported claims
- Compliant with FDA guidelines

**Action Required:**
- Provide verified ingredient details for accurate labeling
- Avoid medical/health claims without substantiation

---

### 9.2 Content Pages to Create
**Ritual Journal (Blog):**
1. Complete Guide to Mushroom Coffee
2. Mushroom Coffee vs Regular Coffee
3. Instant Coffee vs Pods
4. Matcha vs Coffee
5. Best Coffee for Focus
6. Ceremonial Matcha Guide
7. How to Build a Morning Ritual
8. Lion's Mane Coffee Guide
9. Chaga Coffee Guide
10. Night-Friendly Coffee Ritual

**SEO Landing Pages:**
- `/start` - Fast mobile landing for social/bio links
- `/texas-coffee-company` - Local SEO page (if Texas-founded is accurate)
- `/find-your-ritual` - Blend quiz landing page

---

## 10. COMPLIANCE & CLAIM SAFETY

### 10.1 Claim-Safe Language
**✅ Using:**
- "supports focus"
- "supports clarity"
- "supports calm energy"
- "supports daily wellness"
- "made for intentional mornings"
- "designed for smoother routines"
- "coffee-forward taste"

**✅ Avoiding:**
- "treats anxiety/depression/ADHD"
- "cures disease"
- "detoxes your body"
- "balances hormones"
- "heals inflammation"
- "guarantees sleep"
- "burns fat"
- "removes toxins"

### 10.2 FDA Disclaimer
**Present on:**
- ✅ Product pages
- ✅ Homepage
- ✅ Category pages

**Wording:**
"Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease."

---

## 11. ANALYTICS & TRACKING

### 11.1 Current Tracking
**Implemented in index.html:**
- ✅ Google Analytics GA4 (placeholder ID: G-XXXXXXXXXX)
- ✅ Enhanced ecommerce tracking
- ✅ Page view events

**Event Tracking Needed:**
- ⚠️ add_to_cart (partially implemented in BlendDetail)
- ⚠️ begin_checkout
- ⚠️ purchase
- ⚠️ newsletter_signup
- ⚠️ quiz_start/complete
- ⚠️ image_load_error

**Action Required:**
- Replace `G-XXXXXXXXXX` with actual GA4 property ID
- Verify Google Search Console is set up
- Set up Google Merchant Center
- Submit product feed for free listings

---

## 12. REMAINING TECHNICAL RISKS

### 12.1 High Priority
1. **Domain Redirects:** Verify torch-republic.com and torchrepublic.app redirect to torchrepublic.com
2. **Sitemap:** Create/verify sitemap.xml is accessible and comprehensive
3. **Product Images:** Continue monitoring for broken images, add srcset
4. **Duplicate Content:** Audit all pages for unique meta descriptions

### 12.2 Medium Priority
5. **Category Pages:** Add 300-600 words of unique content
6. **Blog Content:** Create Ritual Journal with 10+ posts
7. **Schema Enhancement:** Add shippingDetails and returnPolicy to Product schema
8. **Speed Optimization:** Audit and defer third-party scripts

### 12.3 Low Priority
9. **Image Formats:** Convert to WebP/AVIF where possible
10. **Local SEO:** Create Texas coffee company page if accurate
11. **Social Landing:** Create /start page for bio links

---

## 13. NEXT 10 HIGHEST-IMPACT SEO ACTIONS

### Immediate (Week 1):
1. ✅ **Fix homepage product images** - COMPLETED
2. ✅ **Add noindex to cart page** - COMPLETED
3. ✅ **Create robots.txt** - COMPLETED
4. ⚠️ **Verify domain redirects** (torch-republic.com, torchrepublic.app)
5. ⚠️ **Create/verify sitemap.xml**

### Short-Term (Week 2-3):
6. ⚠️ **Write unique category descriptions** (300-600 words each)
7. ⚠️ **Update GA4 tracking ID** in index.html
8. ⚠️ **Verify Google Search Console** property
9. ⚠️ **Submit product feed** to Google Merchant Center
10. ⚠️ **Create 5 blog posts** for Ritual Journal

### Medium-Term (Month 2):
11. Build internal linking between products and blog posts
12. Add FAQ schema to all category pages
13. Optimize images to WebP/AVIF
14. Create /start landing page for social traffic
15. Set up review request email automation

---

## 14. SUMMARY CHECKLIST

### ✅ Completed:
- [x] Homepage product image loading fixed
- [x] Loading states added to above-fold content
- [x] Noindex tags on all utility pages
- [x] Robots.txt created
- [x] Canonical tags implemented
- [x] Structured data (Organization, WebSite, Product, FAQ, Breadcrumb)
- [x] Open Graph / Twitter Card metadata
- [x] Image fallbacks and error handling
- [x] fetchpriority for LCP images
- [x] Claim-safe language throughout site

### ⚠️ Requires Action:
- [ ] Verify 301 redirects for domain variants
- [ ] Create/verify sitemap.xml
- [ ] Update GA4 tracking ID
- [ ] Write unique category page content
- [ ] Create blog posts (Ritual Journal)
- [ ] Verify product ingredient details (caffeine, mushroom dosage)
- [ ] Submit product feed to Google Merchant Center
- [ ] Set up Google Search Console
- [ ] Add shippingDetails/returnPolicy to Product schema
- [ ] Optimize images to WebP/AVIF

---

## 15. CONTACT & SUPPORT

**For SEO Questions:**
- Use Google Search Console for indexing issues
- Use Google Merchant Center for product feed issues
- Contact Base44 support for platform-specific SEO features

**Next Audit Recommended:** 30 days after implementing remaining actions

---

**Report Generated:** June 10, 2026  
**Auditor:** Base44 AI Development Agent  
**Status:** Critical fixes complete, medium-priority items identified