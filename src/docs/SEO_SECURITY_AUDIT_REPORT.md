# Torch Republic - Complete SEO & Security Audit Report
## Generated: 2026-06-12

---

## EXECUTIVE SUMMARY

This audit classifies all routes on Torch Republic into indexable (public) and noindex (private/internal) categories, implements technical safeguards, and ensures only customer-facing pages are visible to search engines.

---

## 1. ROUTE CLASSIFICATION

### 1.1 PUBLIC SEO PAGES (INDEX) ✅
These pages should be indexed by search engines:

| Route | Page | Status |
|-------|------|--------|
| `/` | Home | INDEX |
| `/shop` | Mushroom Shop | INDEX |
| `/shop/instant-mushroom-coffee` | Mushroom Coffee Collection | INDEX |
| `/shop/instant-coffee` | Classic Coffee Collection | INDEX |
| `/shop/matcha` | Matcha Collection | INDEX |
| `/classic-coffee` | Classic Coffee (legacy) | INDEX |
| `/mushroom-coffee` | Mushroom Coffee (legacy) | INDEX |
| `/matcha` | Matcha (legacy) | INDEX |
| `/blends` | Blends Collection | INDEX |
| `/blends/:slug` | Blend Detail | INDEX |
| `/products/:slug` | Product Detail | INDEX |
| `/bundle` | Mushroom Bundle | INDEX |
| `/how-it-works` | How It Works | INDEX |
| `/reviews` | Reviews | INDEX |
| `/mission` | Our Mission | INDEX |
| `/contact` | Contact | INDEX |
| `/torchbearer` | Torchbearer | INDEX |
| `/faq` | FAQ | INDEX |
| `/recipes` | Coffee Recipes | INDEX |
| `/quiz` | Blend Quiz | INDEX |
| `/spotlight` | Customer Spotlight | INDEX |
| `/gifts` | Gifts | INDEX |
| `/journal` | Journal (Blog Index) | INDEX |
| `/journal/:slug` | Blog Post (dynamic) | INDEX |
| `/build-your-ritual` | Build Your Ritual | INDEX |
| `/shipping-policy` | Shipping Policy | INDEX |
| `/return-policy` | Return Policy | INDEX |
| `/privacy-policy` | Privacy Policy | INDEX |
| `/terms-of-service` | Terms of Service | INDEX |
| `/mushroom-coffee-benefits` | Mushroom Coffee Benefits | INDEX |
| `/lions-mane-coffee` | Lion's Mane Coffee | INDEX |
| `/instant-coffee-for-energy` | Instant Coffee for Energy | INDEX |
| `/ingredients` | Ingredients | INDEX |
| `/why-mushroom-coffee` | Why Mushroom Coffee | INDEX |
| `/why-matcha` | Why Matcha | INDEX |
| `/journal/lions-mane-mushroom-coffee` | Blog Post | INDEX |
| `/journal/chaga-mushroom-coffee` | Blog Post | INDEX |
| `/journal/instant-ceremonial-matcha` | Blog Post | INDEX |
| `/journal/mushroom-coffee-benefits` | Blog Post | INDEX |
| `/journal/best-instant-coffee` | Blog Post | INDEX |
| `/journal/matcha-benefits` | Blog Post | INDEX |
| `/journal/coffee-and-focus` | Blog Post | INDEX |
| `/journal/morning-ritual-for-focus` | Blog Post | INDEX |
| `/journal/adaptogens-guide` | Blog Post | INDEX |
| `/journal/history-of-mushroom-coffee` | Blog Post | INDEX |
| `/journal/history-of-matcha` | Blog Post | INDEX |
| `/journal/science-of-lions-mane` | Blog Post | INDEX |
| `/journal/chaga-mushroom-antioxidant-king` | Blog Post | INDEX |

**Total Public Pages: 52**

---

### 1.2 CUSTOMER ACCOUNT PAGES (NOINDEX) 🔒
These pages should NOT be indexed (user-facing but private):

| Route | Page | Action Required |
|-------|------|----------------|
| `/login` | Login | NOINDEX + NOFOLLOW |
| `/register` | Register | NOINDEX + NOFOLLOW |
| `/forgot-password` | Forgot Password | NOINDEX + NOFOLLOW |
| `/reset-password` | Reset Password | NOINDEX + NOFOLLOW |
| `/profile` | Profile | NOINDEX + NOFOLLOW |
| `/portal` | Customer Portal | NOINDEX + NOFOLLOW |
| `/loyalty` | Loyalty Portal | NOINDEX + NOFOLLOW |
| `/torchbearers-rewards` | Torchbearers Rewards | NOINDEX + NOFOLLOW |
| `/cart` | Cart | NOINDEX + NOFOLLOW |
| `/checkout` | Checkout | NOINDEX + NOFOLLOW |
| `/order-confirmation` | Order Confirmation | NOINDEX + NOFOLLOW |
| `/subscription` | Subscription Management | NOINDEX + NOFOLLOW |

**Total Customer Account Pages: 12**

---

### 1.3 ADMIN & INTERNAL PAGES (NOINDEX + AUTH REQUIRED) 🚫
These pages are already redirected to homepage but should be secured:

| Route | Page | Current Status | Required Action |
|-------|------|----------------|-----------------|
| `/traffic-report` | Traffic Report | Redirects to / | KEEP BLOCKED |
| `/email-campaign` | Email Campaign Dashboard | Redirects to / | KEEP BLOCKED |
| `/admin/shopify` | Admin Shopify | Redirects to / | KEEP BLOCKED |
| `/admin/keywords` | Keyword Analysis | Redirects to / | KEEP BLOCKED |
| `/local` | Local SEO | Redirects to / | KEEP BLOCKED |
| `/research` | Research Hub | Currently PUBLIC | ⚠️ NOINDEX + AUTH |
| `/command` | Torch Command Home | Redirects to / | KEEP BLOCKED |
| `/command/quiz` | Cognitive Quiz | Redirects to / | KEEP BLOCKED |
| `/command/timer` | Flow Timer | Redirects to / | KEEP BLOCKED |
| `/command/protocols` | Protocols Directory | Redirects to / | KEEP BLOCKED |
| `/command/protocols/:slug` | Protocol Detail | Redirects to / | KEEP BLOCKED |
| `/command/admin` | Admin Command | Redirects to / | KEEP BLOCKED |

**Total Admin/Internal Pages: 12**

**⚠️ CRITICAL ISSUE:** `/research` (Research Hub) is currently PUBLIC but should be NOINDEX + AUTH REQUIRED.

---

## 2. TECHNICAL IMPLEMENTATION CHECKLIST

### 2.1 Meta Robots Tags
- [ ] Add `noindex, nofollow` to all Customer Account Pages
- [ ] Add `noindex, nofollow` to all Admin/Internal Pages
- [ ] Verify Public SEO Pages have NO robots meta tag (allow indexing)

### 2.2 Sitemap.xml
- [ ] Remove all Customer Account Pages from sitemap
- [ ] Remove all Admin/Internal Pages from sitemap
- [ ] Include only Public SEO Pages in sitemap

### 2.3 Robots.txt
- [ ] Create robots.txt file
- [ ] Disallow crawling of /login, /register, /profile, /portal, /loyalty, /cart, /checkout, /order-confirmation, /subscription
- [ ] Disallow crawling of /admin/*, /email-campaign, /traffic-report, /command/*
- [ ] Allow crawling of all public pages

### 2.4 Authentication
- [ ] Verify /profile requires authentication
- [ ] Verify /portal requires authentication
- [ ] Verify /loyalty requires authentication
- [ ] Verify /subscription requires authentication
- [ ] Verify /research requires authentication (CURRENTLY MISSING)

### 2.5 Navigation Links
- [ ] Verify no public navigation links to Customer Account Pages
- [ ] Verify no public navigation links to Admin/Internal Pages
- [ ] Check footer links (should only link to public pages)

---

## 3. CRITICAL FIXES REQUIRED

### HIGH PRIORITY

1. **Research Hub (`/research`)** - Currently PUBLIC, should be NOINDEX + AUTH REQUIRED
   - This is an internal dashboard that should not be publicly accessible
   
2. **Local SEO (`/local`)** - Route exists but redirects - verify no direct access

3. **Robots.txt Missing** - No robots.txt file exists in /public

4. **Sitemap.xml** - Need to verify it only contains public pages

### MEDIUM PRIORITY

5. **Meta Robots Tags** - Need to add noindex tags to customer account pages

6. **Authentication Enforcement** - Ensure all customer account pages redirect to login if not authenticated

---

## 4. GOOGLE SEARCH CONSOLE VERIFICATION

After implementing fixes, verify:

1. Search `site:torchrepublic.com` on Google
2. Only public pages should appear in results
3. No /login, /profile, /portal, /admin, /dashboard URLs visible
4. Submit updated sitemap.xml

---

## 5. URL REPORTS

### 5.1 Currently Indexable URLs (Should be indexed)
```
https://torchrepublic.com/
https://torchrepublic.com/shop
https://torchrepublic.com/shop/instant-mushroom-coffee
https://torchrepublic.com/shop/instant-coffee
https://torchrepublic.com/shop/matcha
https://torchrepublic.com/classic-coffee
https://torchrepublic.com/mushroom-coffee
https://torchrepublic.com/matcha
https://torchrepublic.com/blends
https://torchrepublic.com/bundle
https://torchrepublic.com/how-it-works
https://torchrepublic.com/reviews
https://torchrepublic.com/mission
https://torchrepublic.com/contact
https://torchrepublic.com/torchbearer
https://torchrepublic.com/faq
https://torchrepublic.com/recipes
https://torchrepublic.com/quiz
https://torchrepublic.com/spotlight
https://torchrepublic.com/gifts
https://torchrepublic.com/journal
https://torchrepublic.com/journal/* (all blog posts)
https://torchrepublic.com/build-your-ritual
https://torchrepublic.com/shipping-policy
https://torchrepublic.com/return-policy
https://torchrepublic.com/privacy-policy
https://torchrepublic.com/terms-of-service
https://torchrepublic.com/mushroom-coffee-benefits
https://torchrepublic.com/lions-mane-coffee
https://torchrepublic.com/instant-coffee-for-energy
https://torchrepublic.com/ingredients
https://torchrepublic.com/why-mushroom-coffee
https://torchrepublic.com/why-matcha
```

### 5.2 URLs to Remove from Indexing
```
https://torchrepublic.com/login
https://torchrepublic.com/register
https://torchrepublic.com/forgot-password
https://torchrepublic.com/reset-password
https://torchrepublic.com/profile
https://torchrepublic.com/portal
https://torchrepublic.com/customerportal
https://torchrepublic.com/loyalty
https://torchrepublic.com/loyaltyportal
https://torchrepublic.com/torchbearers-rewards
https://torchrepublic.com/cart
https://torchrepublic.com/checkout
https://torchrepublic.com/order-confirmation
https://torchrepublic.com/subscription
https://torchrepublic.com/research
https://torchrepublic.com/traffic-report
https://torchrepublic.com/email-campaign
https://torchrepublic.com/admin/shopify
https://torchrepublic.com/admin/keywords
https://torchrepublic.com/local
https://torchrepublic.com/command/*
```

---

## 6. NEXT STEPS

1. Create robots.txt file
2. Update sitemap.xml to include only public pages
3. Add noindex meta tags to customer account pages
4. Fix /research route to require authentication
5. Verify all customer account pages redirect to login when not authenticated
6. Submit updated sitemap to Google Search Console
7. Monitor Google search results for 2-4 weeks

---

**Audit Status: IN PROGRESS**
**Next Action: Implement technical fixes**