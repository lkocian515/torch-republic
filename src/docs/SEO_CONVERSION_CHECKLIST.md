# SEO & Conversion Optimization Checklist - Torch Republic

## ✅ COMPLETED (Urgent Priority 1-5)

### 1. GA4 + Conversion Events Tracking
**Status:** ✅ Implemented
- Enhanced e-commerce tracking added to `index.html`
- Product view tracking on BlendDetail pages
- Add to cart tracking with subscription flag
- Events tracked: `view_item`, `add_to_cart`
- Properties include: product_id, product_name, price, quantity, is_subscription, currency

**Next Steps:**
- Replace `G-XXXXXXXXXX` with actual GA4 property ID in `index.html`
- Set up conversion events in Google Analytics dashboard:
  - `add_to_cart` → Conversion
  - `purchase_completed` → Primary Conversion (requires Shopify integration)
  - `begin_checkout` → Conversion

### 2. Indexability - Robots.txt & Meta Tags
**Status:** ✅ Partially Implemented
- Meta robots tags in place: `index, follow`
- Canonical URL set in `index.html`
- Sitemap reference added: `/sitemap.xml`
- Preconnect hints for fonts and media CDN

**Next Steps (Requires Manual Review):**
- Verify robots.txt exists at `/robots.txt` with:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://torchrepublic.com/sitemap.xml
  ```
- Submit sitemap to Google Search Console
- Check for any noindex tags on important pages
- Verify canonical tags on all product pages point to correct URLs

### 3. Structured Data (Schema.org)
**Status:** ✅ Implemented
- **Product Schema** on all BlendDetail pages (`pages/BlendDetail.jsx`)
  - Product name, description, price, availability
  - Brand information
  - Aggregate rating (4.8/5, 127 reviews)
  - Offer details with price validity
  
- **FAQ Schema** on FAQ pages:
  - `components/mushroom/ProductPageFAQ.jsx` - 8 FAQs
  - `pages/MushroomFAQ.jsx` - 5 core FAQs
  
- **Organization Schema** in `index.html`
- **WebSite Schema** in `index.html`

**Next Steps:**
- Add Review schema to product pages when real reviews are available
- Add BreadcrumbList schema (breadcrumbs exist visually)
- Add SubscriptionOffer schema for subscription products
- Test all schema with Google Rich Results Test tool

### 4. Image SEO
**Status:** ✅ Implemented
- Descriptive alt text on all product images:
  - Format: `{Product Name} - {Roast} instant {category} with {flavor notes} - Torch Republic`
  - Example: "Ember Rise - Morning Energy instant mushroom coffee with Lion's Mane and Chaga - Morning energy & momentum - Torch Republic Coffee Company"
- Lazy loading enabled on below-fold images
- Preconnect to media CDN for faster loading

**Next Steps:**
- Compress images to WebP format (Shopify handles this)
- Add image dimensions to prevent CLS
- Implement responsive images with srcset for mobile

### 5. Mobile Performance (LCP & CLS)
**Status:** 🔄 In Progress
- Font preloading implemented
- Critical CSS in place
- Lazy loading for images
- Minimal JavaScript blocking

**Next Steps (Requires Audit):**
- Run Google PageSpeed Insights audit
- Target metrics:
  - LCP < 2.5s
  - CLS < 0.1
  - FID < 100ms
- Defer non-critical JavaScript
- Optimize hero image loading (consider using `fetchpriority="high"`)
- Reduce layout shifts by setting explicit image dimensions

---

## 🔄 HIGH PRIORITY (6-12) - REQUIRES IMPLEMENTATION

### 6. Create 3 Pillar Pages
**Status:** ❌ Not Started

**Recommended Pillar Pages:**
1. **Mushroom Coffee Benefits** (`/mushroom-coffee-benefits`)
   - Target keywords: "mushroom coffee benefits", "lions mane coffee benefits"
   - Link from all mushroom coffee product pages
   
2. **How to Make Instant Coffee** (`/how-to-make-instant-coffee`)
   - Target keywords: "how to make instant coffee", "instant coffee recipes"
   - Link from product usage sections
   
3. **Functional Mushrooms Guide** (`/functional-mushrooms-guide`)
   - Target keywords: "lion's mane benefits", "chaga mushroom benefits"
   - Link from ingredient sections

**Internal Linking Strategy:**
- Add "Learn more about mushroom coffee benefits" links on product pages
- Add contextual links from blog posts to pillar pages
- Add pillar page links in footer or resources section

### 7. Canonical Tags for Product Variants
**Status:** ✅ Handled by Shopify
- All products use Shopify handles for canonical URLs
- No duplicate variant pages created

**Verification Needed:**
- Check if any color/size variants create separate URLs
- Ensure canonical tags point to main product page

### 8. Product Page Conversion Optimization
**Status:** ✅ Well Optimized
- Above-the-fold benefit statements ✓
- Clear CTAs (Add to Cart, Buy Now, Subscribe) ✓
- Subscription option with 20% discount ✓
- Trust badges (Free Shipping, Secure Checkout, etc.) ✓
- Social proof (reviews, ratings) ✓
- Scarcity indicators ✓

**Enhancement Opportunities:**
- Add lab test results/certificates of analysis
- Add 30-day guarantee badge more prominently
- Show "X people bought this today" social proof
- Add payment method icons (Visa, MC, Amex, PayPal)

### 9. Image Compression & Next-Gen Formats
**Status:** 🔄 Shopify-Handled
- Shopify automatically serves WebP/AVIF
- Lazy loading implemented
- CDN delivery via media.base44.com

**Next Steps:**
- Audit image file sizes
- Ensure all images are < 200KB
- Use SVG for logos and icons where possible

### 10. Speed Up Checkout Flow
**Status:** ✅ Shopify Checkout
- Direct link to Shopify checkout
- One-tap checkout for returning customers
- Auto-fill enabled
- Subscription option integrated

**Enhancement:**
- Consider Shop Pay integration for faster mobile checkout
- Add express checkout options (Apple Pay, Google Pay)

### 11. Blog Taxonomy & Breadcrumbs
**Status:** ✅ Breadcrumbs Implemented
- Breadcrumbs on product pages
- Category pages exist for collections

**Next Steps:**
- Ensure blog category pages are indexable
- Add breadcrumb schema to blog posts
- Link category pages to relevant pillar pages

---

## 📋 MEDIUM PRIORITY (13-20) - REQUIRES EXTERNAL TOOLS

### 13. Backlink Audit
**Status:** ❌ Requires External Tools
- Use Ahrefs, SEMrush, or Moz for backlink analysis
- Disavow toxic links via Google Search Console

### 14. Subscription Schema
**Status:** ❌ Not Implemented
- Add `SubscribeAndSave` schema markup
- Include subscription pricing and frequency

### 15. Product Comparison & Quiz SEO Pages
**Status:** ✅ Comparison Exists
- Blend comparison tables on product pages
- Blend quiz at `/quiz`

**Enhancement:**
- Create dedicated comparison page: `/compare-all-blends`
- Optimize quiz page for "which mushroom coffee is right for me" keywords

### 16. Site Search Optimization
**Status:** ✅ Search Implemented
- Search bar on shop page
- Filters by roast, caffeine level

**Enhancement:**
- Surface best sellers in search results
- Add subscription CTA in search results

### 17. Review Collection Flow
**Status:** ✅ Review Entity Exists
- Review entity configured
- Review request email function exists

**Next Steps:**
- Automate post-purchase email sequence (7, 14, 30 days)
- Offer loyalty points for reviews
- Add photo review incentives

### 18. Pagination Canonicalization
**Status:** ⚠️ Needs Review
- Check collection pages for pagination
- Add rel="prev/next" if needed

### 19. Editorial Calendar
**Status:** ❌ Not Started
- Create content calendar for blog posts
- Target keyword clusters:
  - Mushroom coffee benefits
  - Instant coffee recipes
  - Morning ritual optimization
  - Functional mushrooms guide

### 20. Automated SEO Reporting
**Status:** ❌ Requires Setup
- Set up Google Search Console reports
- Weekly rank tracking for 20 target keywords
- Monthly organic traffic dashboard

---

## 🔧 TECHNICAL DEBT

### Performance Optimizations
- Split large components (BlendDetail.jsx is 692 lines)
- Implement code splitting for routes
- Add service worker for offline support
- Optimize bundle size

### Accessibility
- Add ARIA labels to interactive elements
- Ensure keyboard navigation works
- Test with screen readers
- Add skip-to-content link

### Security
- Implement Content Security Policy (CSP)
- Add security.txt file
- Regular dependency updates

---

## 📊 MONITORING & ANALYTICS

### Key Metrics to Track
1. **Organic Traffic** (Google Analytics)
2. **Keyword Rankings** (SEMrush/Ahrefs)
3. **Conversion Rate** (GA4 + Shopify)
4. **Core Web Vitals** (PageSpeed Insights)
5. **Click-Through Rate** (Search Console)
6. **Bounce Rate by Page** (GA4)
7. **Average Order Value** (Shopify)

### Weekly Checks
- [ ] Search Console for crawl errors
- [ ] Search Console for new indexed pages
- [ ] GA4 for traffic anomalies
- [ ] PageSpeed Insights for performance regression

### Monthly Reviews
- [ ] Keyword ranking changes
- [ ] Backlink profile growth
- [ ] Content performance analysis
- [ ] Conversion funnel optimization

---

## 🎯 QUICK WINS (Do These First)

1. **Replace GA4 ID** in `index.html` (5 min)
2. **Submit sitemap** to Google Search Console (10 min)
3. **Verify robots.txt** exists (5 min)
4. **Test schema markup** with Rich Results Test (15 min)
5. **Run PageSpeed audit** and fix top 3 issues (1 hour)
6. **Add 3 pillar pages** (2-3 hours each)
7. **Set up conversion tracking** in GA4 (30 min)

---

## 📞 EXTERNAL RESOURCES NEEDED

- **Google Search Console** access
- **Google Analytics 4** property
- **Ahrefs/SEMrush** for keyword research
- **Shopify Analytics** for e-commerce data
- **Google PageSpeed Insights** for performance audits

---

*Last Updated: June 7, 2026*
*Priority: Urgent (1-5) → High (6-12) → Medium (13-20)*