# Torch Republic SEO & Admin Cleanup Guide

## Overview
This document outlines recommended SEO improvements and administrative cleanup to ensure the Torch Republic website clearly communicates its focus on **premium instant mushroom coffee** while maintaining search visibility and removing outdated brand confusion.

---

## 1. Navigation Structure (Primary Focus)

### Recommended Main Navigation
The primary navigation should focus exclusively on mushroom coffee:

- **Home** (`/`)
- **Shop** (`/shop`) — All mushroom coffee blends
- **Bundles** (`/bundle`) — Multi-blend savings
- **Subscribe & Save** (`/subscription`) — Subscription benefits
- **Reviews** (`/Reviews`) — Customer testimonials
- **FAQ** (`/faq`) — Product and shipping FAQ
- **About** (`/about`) — Brand story and mission
- **Contact** (`/contact`) — Customer support

### Navigation to Hide or Deprioritize
These collections should be hidden from main navigation or set to noindex if they are not part of the core mushroom coffee focus:

- Apparel collections (Founders Series, Commanders Series, Liberty Icons, etc.)
- Bobbleheads
- Patriotic Pride
- Freedom Isn't Free
- We the People
- Faith Over Fear
- Christ Is King
- God Family Country
- American Heroes

**Recommendation:** Either:
1. Set these collection pages to `noindex, follow` in Shopify
2. Or create 301 redirects from old collection URLs to `/shop` or relevant mushroom coffee pages
3. Or move to a secondary "Merch" footer link if intentionally kept as secondary products

---

## 2. Page Title & Meta Description Updates

### Homepage
**Current (example):** `Torch Republic - Premium Apparel & Coffee`
**Recommended:** `Torch Republic | Premium Instant Mushroom Coffee for Focus & Energy`

**Meta Description:**
```
Premium instant mushroom coffee blends crafted with Lion's Mane and Chaga for focus, energy, and daily ritual. Smooth, coffee-forward taste. Subscribe & save 20%. Free shipping on orders $50+.
```

### Shop Page
**Title:** `Shop Mushroom Coffee Blends | Torch Republic`
**Meta Description:**
```
Explore our collection of premium instant mushroom coffee blends. Each crafted for a specific ritual — focus, energy, calm, or evening restoration. 27 servings per tube.
```

### Product Pages (Template)
**Title:** `[Blend Name] - Instant Mushroom Coffee for [Benefit] | Torch Republic`
**Example:** `GlowMind Clarity - Instant Mushroom Coffee for Focus | Torch Republic`

**Meta Description:**
```
[Blend Name] is a premium instant mushroom coffee blend with Lion's Mane + Chaga. [Roast] roast. Supports [benefit]. 27 servings. Smooth, coffee-forward taste. Subscribe & save 20%.
```

### Subscription Page
**Title:** `Subscribe & Save 20% | Torch Republic Mushroom Coffee`
**Meta Description:**
```
Subscribe to Torch Republic mushroom coffee and save 20% on every order. Pause, skip, or cancel anytime. Free shipping on subscription orders. Your daily ritual, delivered.
```

---

## 3. URL Redirect Recommendations

### High-Priority Redirects
Create 301 redirects from old non-coffee pages to new mushroom coffee pages:

| Old URL Pattern | Redirect To |
|-----------------|-------------|
| `/collections/founders-series` | `/shop` |
| `/collections/commanders-series` | `/shop` |
| `/collections/liberty-icons` | `/shop` |
| `/collections/patriotic-pride` | `/shop` |
| `/collections/bobbleheads` | `/shop` |
| `/collections/apparel` | `/shop` |
| `/collections/t-shirts` | `/shop` |
| `/collections/hoodies` | `/shop` |
| `/collections/hats` | `/shop` |

### Alternative: Noindex Approach
If you prefer to keep old collections accessible but not indexed:

In Shopify Admin → Online Store → Preferences → Add to `robots.txt` or use SEO app:
```
/collections/founders-series: noindex, follow
/collections/commanders-series: noindex, follow
/collections/liberty-icons: noindex, follow
... (repeat for all non-coffee collections)
```

---

## 4. Shopify Collection Cleanup

### Action Steps in Shopify Admin

1. **Go to:** Shopify Admin → Products → Collections
2. **Review each collection** and categorize:
   - **Keep Active:** Mushroom coffee blends, bundles, subscriptions
   - **Hide from Navigation:** Apparel, bobbleheads, patriotic collections
   - **Delete or Archive:** Any discontinued or irrelevant collections

3. **For collections to hide:**
   - Uncheck "Show in online store" or
   - Set collection to "Hidden" in navigation settings
   - Or use SEO app to set `noindex`

4. **Update collection descriptions** for coffee collections to include:
   - "Instant mushroom coffee"
   - Key benefits (supports focus, energy, calm)
   - "27 servings per tube"
   - "Subscribe & save 20%"

---

## 5. Product Page SEO Optimization

### Product Title Format
```
[Blend Name] - Instant Mushroom Coffee for [Benefit] - [Roast] Roast
```
**Example:** `GlowMind Clarity - Instant Mushroom Coffee for Focus - Medium Roast`

### Product Description Key Elements
1. **First paragraph:** Clearly state "instant mushroom coffee" and primary benefit
2. **Ingredients section:** List Lion's Mane, Chaga, caffeine content
3. **Usage instructions:** How to prepare (hot/iced)
4. **FAQ section:** Address common questions
5. **Compliance disclaimer:** FDA statement (already included)

### Avoid These Terms (FDA Compliance)
Do NOT use disease-treatment language:
- ❌ "Treats anxiety"
- ❌ "Cures depression"
- ❌ "Reduces inflammation"
- ❌ "Helps with ADHD"
- ❌ "Boosts immune system" (use "supports immune wellness" instead)
- ❌ "Weight loss"
- ❌ "Detox"
- ❌ "Hormone balancing"

**Use These Instead:**
- ✅ "Supports focus"
- ✅ "Supports calm energy"
- ✅ "Supports daily wellness"
- ✅ "Supports immune wellness"
- ✅ "Supports a balanced routine"
- ✅ "Promotes mental clarity"
- ✅ "Encourages relaxation"

---

## 6. Image Alt Text Optimization

### Product Images
**Format:** `Torch Republic [Blend Name] instant mushroom coffee tube - [Roast] roast - [Size]`

**Example:** `Torch Republic GlowMind Clarity instant mushroom coffee tube - Medium roast - 1.9 oz`

### Lifestyle Images
**Format:** `Person drinking Torch Republic mushroom coffee for [benefit/ritual]`

**Example:** `Person drinking Torch Republic mushroom coffee for morning focus ritual`

---

## 7. Schema Markup Recommendations

Add structured data to product pages for better Google visibility:

### Product Schema (JSON-LD)
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "GlowMind Clarity - Instant Mushroom Coffee",
  "description": "Premium instant mushroom coffee blend for focus and mental clarity",
  "brand": {
    "@type": "Brand",
    "name": "Torch Republic"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "24.99",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

---

## 8. Blog Content Strategy (Optional)

Create blog content to support SEO and educate customers:

### Suggested Topics
1. "What Is Mushroom Coffee? A Beginner's Guide"
2. "Lion's Mane vs. Chaga: What's the Difference?"
3. "How to Make Instant Mushroom Coffee (Hot & Iced)"
4. "5 Benefits of Adding Mushrooms to Your Coffee Routine"
5. "Is Mushroom Coffee Right for You? Everything You Need to Know"
6. "The Science Behind Functional Mushrooms and Focus"
7. "Morning Ritual Ideas for a Balanced Day"

**Note:** Always use compliant wellness language. Avoid disease claims.

---

## 9. Google Search Console Actions

1. **Submit updated sitemap** after making changes
2. **Request indexing** of new/updated mushroom coffee pages
3. **Monitor search queries** to see what terms people use to find the site
4. **Check for crawl errors** on redirected pages
5. **Review mobile usability** reports

---

## 10. Ongoing Maintenance

### Monthly Checks
- Review Google Search Console for new 404 errors
- Monitor organic traffic to mushroom coffee pages
- Check that old apparel/bobblehead pages are properly redirected or noindexed
- Review product reviews for any compliance issues

### Quarterly Actions
- Update meta descriptions based on performance
- Refresh product images with optimized alt text
- Add new blog content if using content marketing
- Review and update FAQ based on customer questions

---

## Summary Checklist

- [ ] Update main navigation to focus on mushroom coffee only
- [ ] Hide or noindex old apparel/bobblehead collections
- [ ] Create 301 redirects from old collection URLs to `/shop`
- [ ] Update homepage title and meta description
- [ ] Update all product page titles and meta descriptions
- [ ] Optimize product image alt text
- [ ] Add FAQ schema to product pages
- [ ] Review all product descriptions for FDA compliance
- [ ] Submit updated sitemap to Google Search Console
- [ ] Set up Google Analytics 4 ecommerce tracking (if not already done)

---

**Questions?** Contact your Base44 developer or SEO specialist for implementation support.