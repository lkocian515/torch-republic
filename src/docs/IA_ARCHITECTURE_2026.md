# Torch Republic Information Architecture v2.0
## Coffee-First, Collection-Based Brand Strategy
**Last Updated:** April 2026 | **Status:** ACTIVE

---

## 1. BRAND POSITIONING

**Core Identity:** Premium small-batch coffee rooted in American history.
**Secondary:** Historical apparel inspired by coffee collections.
**NOT:** Generic patriotic apparel store.

**Messaging:** "Carry the Flame" — collectible coffee series, permanent historical legacy.

---

## 2. NAVIGATION HIERARCHY

### Desktop Top Nav (NavBar.jsx)
```
← Logo →
[Shop Coffee] [About] → [Journal] [Contact]
                         [Join Torch Box]
```

**Mobile Dropdown (Full-Screen Menu):**
```
SHOP COFFEE
  - All Collections
  - Founders Series
  - Liberty Icons
  - Commanders Series
  - 🔥 Torch Box Subscription

BRAND
  - Home
  - Our Story
  - Journal
  - Best Sellers
  - Reviews
  - Contact
```

**Status:** ✅ Updated — Removed "Shirts & Gear" / "Torch Apparel" from primary nav

---

## 3. FOOTER HIERARCHY (Footer.jsx)

**Column 1: Coffee Collections**
- Shop All Coffee
- Founders Series
- Liberty Icons
- Commanders Series
- Torch Box Subscription

**Column 2: Company**
- Our Story
- Journal
- Best Sellers
- Reviews
- Contact

**Column 3: Legal**
- Shipping Policy
- Return Policy
- Privacy Policy
- Terms of Service

**Status:** ✅ Updated — Consolidated to 3 columns, coffee-first

---

## 4. COLLECTION STRUCTURE

### Primary Collections (Curated for Homepage)

#### **Founders Series** — `pages/CoffeeCollection.jsx`
- **Title:** Founders Series
- **Tagline:** Six Premium Small-Batch Roasts. Each Retires Forever.
- **Description:** The flagship collection — six named roasts inspired by American patriots. Small-batch roasted, collectible, permanent.
- **Products First:** 6 coffee blends (Washington, Jefferson, Franklin, Adams, Lincoln, Roosevelt)
- **Apparel Second:** Matching Founders apparel below coffee grid
- **CTA:** "Explore Founders Apparel" → `/Shop` (with context)
- **Status:** ✅ Restructured — Coffee first, apparel below

#### **Liberty Icons** — `pages/LibertyIcons.jsx`
- **Title:** Liberty Icons Series
- **Tagline:** Symbols that Outlive Time
- **Description:** Bold, identity-driven blends named for icons of American freedom
- **Products:** 5+ coffee blends (Eagle's Flight, Liberty Torch, Old Glory, Rosie's Grind, Uncle Sam's Bold Brew, Lady Liberty)
- **Apparel:** Secondary section (to be added)
- **Status:** ✅ Already coffee-first, apparel section coming

#### **Commanders Series** — `pages/CommandersSeries.jsx`
- **Title:** Commanders Series
- **Tagline:** Leadership Under Pressure
- **Description:** Honors leaders who acted with conviction and preparation
- **Products:** TBD (coming soon placeholder)
- **Apparel:** Secondary section (to be added)
- **Status:** ⏳ Products in development

#### **Women of the Republic** — `pages/WomenOfTheRepublic.jsx`
- **Title:** Women of the Republic
- **Status:** ⏳ Only show if products are ready; otherwise hide from nav

---

## 5. PRODUCT PAGES

### Coffee Product Pages (e.g., `/WashingtonBlend.jsx`)
**Structure:**
1. Breadcrumb: Home → Collection → Product Name
2. Hero image + code/rarity badge
3. Product details: Title, price, roast level, tasting notes
4. Brew guides
5. "Why This Coffee" value prop
6. **"Part of a Collectible Series"** section
7. Reviews
8. Bundles (cross-sell)
9. **"Next Step: Torch Box"** bridge section
10. "Matching Apparel" (optional, if exists)

**Internal Linking:** Links to other blends in same series, not scattered collections

---

## 6. HOMEPAGE STRUCTURE (pages/Home.jsx)

**Current Flow (Already Coffee-First):**
1. Hero + Trust Bar
2. **WashingtonPodsSpotlight** — Entry product (pods)
3. FirstTimeGuidance
4. **BestSellersStrip** — Founders Series (6 blends)
5. **FeaturedProductSpotlight** — Washington Blend detail
6. **TorchBoxSection** — Subscription CTAs
7. HomeReviewStrip — Social proof
8. FinalCTA
9. ExitIntentPopup

**Removed:**
- Liberty Icons spotlight (confuses primary offering)
- Apparel sections (secondary, not homepage focus)
- Generic patriotic content

**Status:** ✅ Already correct

---

## 7. SECONDARY PAGES

### `/Shop` → Renamed conceptually to "Apparel" (Apparel.jsx)
- **NOT** a primary nav link
- **Accessible via:** Product pages (matching apparel sections) or footer
- **Content:** Historical apparel inspired by collections
- **Header:** "Torch Republic Apparel — Historical apparel inspired by the Founders, Liberty Icons, and Commanders Series"
- **Organization:** By series (Founders Apparel, Liberty Icons Apparel, etc.)

**Status:** ✅ Updated heading, removed from primary nav

### `/BestSellers`
- Shows current best-selling products (coffee + limited apparel)
- Filters to show coffee first

### `/OnSale`
- Discounted coffee + apparel
- Coffee featured first

### `/Bundles`
- Coffee bundles (multi-blend sets)
- Torch Box CTAs

### `/TheTorchBox`
- Premium subscription page (NOT a collection, a service)
- Should be in primary nav
- **Status:** ✅ Correct

### `/Mission`
- Brand story (correct, secondary nav)

### `/Journal`
- Blog / content (correct, secondary nav)

### `/Reviews`
- Customer testimonials (correct, secondary nav)

---

## 8. REMOVED / HIDDEN FROM PRIMARY DISCOVERY

**These exist but are NOT linked from main nav:**
- `/Visionaries` (outdated collection index)
- `/Patriots` (outdated collection index)
- Generic apparel categories (merged into `/Shop`)
- `Stickers, Magnets, Jewelry, Candles, Flags` (legacy product categories)

**How to Handle:**
- URL still works (no 404) for existing links
- Redirect chains set up if needed
- Not actively promoted in nav/footer

---

## 9. INTERNAL LINKING RULES

✅ **DO:**
- Link coffee products to other blends in same series
- Link collection pages to each other (Liberty Icons ← → Founders ← → Commanders)
- Link product pages to "Part of a Collection" section
- Link product pages to Torch Box
- Link coffee pages to matching apparel (via "Extend Your Collection" section)

❌ **DO NOT:**
- Link coffee to unrelated apparel
- Link to deprecated collection pages (Visionaries, Patriots)
- Create cross-series product links (Founders → Liberty Icons on product page)
- Suggest generic patriotic categories

---

## 10. URL PRESERVATION

**All existing product URLs remain valid:**
- `/WashingtonBlend` ✅
- `/JeffersonBlend` ✅
- `/EaglesFlightBlend` ✅
- etc.

**Redirect Map for Deprecated Routes:**
- `/Visionaries` → `/CoffeeCollection` (all collections)
- `/Patriots` → `/CoffeeCollection`
- Generic apparel categories → `/Shop` (Apparel)

---

## 11. HOMEPAGE FLOW VISUAL

```
┌─────────────────────────────────────────┐
│ TORCH REPUBLIC (Logo)                   │
│ [Shop Coffee] [About] [Journal][Contact]│
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ HERO + TRUST BAR                        │
│ "Premium Coffee · American History"     │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ PODS SPOTLIGHT                          │
│ "Washington Blend Pods" + Quick Buy     │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ FIRST-TIME GUIDANCE                     │
│ "Start with Washington Blend"           │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ FOUNDERS SERIES (6 Blends)              │
│ "The Foundation" + Collection CTA       │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ FEATURED PRODUCT SPOTLIGHT              │
│ Washington Blend detail + Add to Cart   │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ TORCH BOX SECTION                       │
│ "Step 2: Build Your Legacy"             │
│ Subscription tiers + Join CTA           │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ REVIEWS + FINAL CTA                     │
│ Social proof → Subscribe button         │
└─────────────────────────────────────────┘
```

---

## 12. MOBILE NAVIGATION

**Top:** Logo + Menu Icon + Cart
**Menu (Full-Screen):**
- Shop All Collections
- Founders Series
- Liberty Icons
- Commanders Series
- Torch Box
- Our Story
- Journal
- Reviews
- Contact

---

## 13. COLLECTION PAGE TEMPLATE

**Every collection page should follow:**

```
┌─────────────────────────────────────────┐
│ HERO SECTION                            │
│ [Accent Line] COLLECTION #             │
│ [H1 Title]                              │
│ [Description: 150-300 words]            │
│ [Accent Color Visual]                   │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ COLLECTION BANNER (Torch Box Promo)     │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ COFFEE PRODUCTS GRID                    │
│ [3-col grid, responsive]                │
│ Coffee first, full height               │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ MATCHING APPAREL SECTION                │
│ "Extend Your Collection"                │
│ Smaller grid, optional                  │
│ [CTA: "Explore Apparel"]                │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ PREMIUM EXPERIENCE CTA                  │
│ "Join Torch Box" subscription           │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│ FOOTER                                  │
└─────────────────────────────────────────┘
```

---

## 14. VISUAL CONSISTENCY

**Brand Tokens:**
- **Primary Accent:** `#C9A24A` (Torch gold)
- **Dark BG:** `#000000` / `#0B0B0B`
- **Secondary Accent:** Unique per series (Liberty `#9BB8CC`, Commanders `#A8893A`, etc.)
- **Typography:** Serif (headings), Mono (labels), Inter (body)

**Collection Colors:** Each series has unique accent to distinguish at a glance

---

## 15. SEO + CONTENT NOTES

**Each collection page should include:**
- Strong H1 (collection name)
- Meta description (coffee-first positioning)
- 150-300 word description below grid (SEO text)
- Alt text on all product images
- Schema markup: Product + Organization

---

## 16. IMPLEMENTATION STATUS

| Component | Status | Notes |
|-----------|--------|-------|
| NavBar | ✅ Updated | Removed Apparel top-level |
| Footer | ✅ Updated | Coffee-first, 3 columns |
| Homepage | ✅ Correct | Already coffee-focused |
| CoffeeCollection (Founders) | ✅ Updated | Added apparel section |
| LibertyIcons | ✅ Maintained | Coffee-first, apparel section to come |
| CommandersSeries | ✅ Maintained | Coming soon placeholder |
| Shop (Apparel) | ✅ Updated | Renamed heading, removed from main nav |
| Product Pages | ✅ Correct | Internal linking to series only |

---

## 17. NEXT STEPS

1. **Test Navigation:** Verify all links work, no dead ends
2. **Add Apparel Sections:** Below coffee grids on collection pages
3. **Create Women of the Republic:** Only if products are ready
4. **Set up Redirects:** For deprecated collection pages
5. **Audit All Product Links:** Ensure coffee → coffee, apparel → apparel
6. **Mobile Testing:** Verify responsive nav hierarchy
7. **Analytics:** Track which collections get most traffic
8. **SEO Review:** Ensure all collection pages have meta, schema, descriptions

---

**Brand Direction Preserved:** ✅ Coffee-first, historical legacy, premium aesthetic, "Carry the Flame"
**Generic Apparel Feel Removed:** ✅ Apparel is secondary, tied to collections
**Clear Information Architecture:** ✅ Collections are primary, apparel is extension
**Mobile-Friendly:** ✅ Stack works on all devices