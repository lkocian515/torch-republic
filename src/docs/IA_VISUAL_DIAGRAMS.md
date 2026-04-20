# Information Architecture — Visual Diagrams
## Torch Republic Site Structure (Post-Cleanup)
**April 2026**

---

## 1. NAVIGATION HIERARCHY (DESKTOP)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  🔥 Torch Republic      [Shop Coffee]  [About]      →      │
│     (Logo)             (Primary)                            │
│                                                        [Journal]
│                                      [Contact] [Torch Box] │
│
└─────────────────────────────────────────────────────────────┘
```

---

## 2. NAVIGATION HIERARCHY (MOBILE MENU — FULL SCREEN)

```
┌─────────────────────────────────────────┐
│  🔥 Torch Republic              [✕]     │
├─────────────────────────────────────────┤
│ [SHOP ALL COLLECTIONS]                  │
├─────────────────────────────────────────┤
│                                         │
│ SHOP COFFEE                             │
│   • All Collections                     │
│   • Founders Series                     │
│   • Liberty Icons                       │
│   • Commanders Series                   │
│   🔥 Torch Box Subscription             │
│                                         │
│ BRAND                                   │
│   • Home                                │
│   • Our Story                           │
│   • Journal                             │
│   • Best Sellers                        │
│   • Reviews                             │
│   • Contact                             │
│                                         │
├─────────────────────────────────────────┤
│ [Become a Torchbearer →]                │
│ [Account] [Legal]                       │
└─────────────────────────────────────────┘
```

**Key Changes:**
- ✅ NO "Shirts & Gear" category
- ✅ "Torch Box" highlighted with 🔥 emoji
- ✅ "Best Sellers" moved to Brand section
- ✅ Shop CTA at top (full-width)

---

## 3. FOOTER STRUCTURE (3 COLUMNS)

```
┌─────────────────────────────────────────────────────────────┐
│  🔥 Torch Republic                                          │
│  Torch Republic Coffee Company                              │
│  "Carry the Flame"                                          │
│                                                             │
│  Premium small-batch coffee rooted in American history —    │
│  four collectible series, one unbroken flame.               │
│                                                             │
│  hello@torchrepublic.com                                    │
│  U.S.-Based · Corpus Christi, TX                            │
├─────────────────┬──────────────────┬──────────────────────┤
│ COFFEE          │ COMPANY          │ LEGAL                │
│ COLLECTIONS     │                  │                      │
│                 │                  │                      │
│ • Shop All      │ • Our Story      │ • Shipping Policy    │
│ • Founders      │ • Journal        │ • Return Policy      │
│ • Liberty Icons │ • Best Sellers   │ • Privacy Policy     │
│ • Commanders    │ • Reviews        │ • Terms of Service   │
│ • Torch Box     │ • Contact        │                      │
│                 │                  │                      │
└─────────────────┴──────────────────┴──────────────────────┘
```

**Key Changes:**
- ✅ "Shop" column → "Coffee Collections" (specific)
- ✅ "Torch Apparel" link REMOVED
- ✅ "Policies" → "Legal" (clearer)
- ✅ 3 columns instead of 4 (cleaner)

---

## 4. COLLECTION PAGE STRUCTURE (FOUNDERS SERIES)

```
┌────────────────────────────────────────────────────────┐
│ PREMIUM COFFEE COLLECTIONS                             │
│                                                        │
│ FOUNDERS SERIES                                        │
│ Six Premium Small-Batch Roasts. Each Retires Forever.  │
│                                                        │
│ The Founders Series is our flagship collection...      │
│ [150-300 word description]                             │
│                                                        │
│ [Liberty Icons] [Commanders] [All Coffee]             │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ TORCH BOX BANNER                                       │
│ Limited monthly availability — Exclusive blends        │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ ☕ COFFEE PRODUCTS (PRIMARY)                           │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │Washington│  │Jefferson │  │Franklin  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Adams   │  │ Lincoln  │  │Roosevelt │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                        │
│  (6 full-height coffee product cards)                 │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ EXTEND YOUR COLLECTION (SECONDARY)                     │
│                                                        │
│ Founders Series Apparel                                │
│ Historical apparel inspired by the Founders.           │
│ Wear the legacy.                                       │
│                                                        │
│ [Explore Founders Apparel →]                           │
└────────────────────────────────────────────────────────┘
                         ↓
┌────────────────────────────────────────────────────────┐
│ PREMIUM EXPERIENCE CTA                                 │
│                                                        │
│ Build Your Collection with Torch Box                   │
│                                                        │
│ [Join Torch Box Subscription →]                        │
└────────────────────────────────────────────────────────┘
```

**Key Structure:**
1. ✅ Coffee products first (primary grid)
2. ✅ Apparel section below (secondary, optional)
3. ✅ Torch Box CTA at bottom (conversion goal)
4. ✅ Clear visual separation (background color on apparel section)

---

## 5. USER JOURNEY: COFFEE-FIRST PATH (PRIMARY)

```
┌──────────────┐
│ Land on Home │ (Coffee hero, pods, best sellers)
└──────┬───────┘
       │
       ↓
┌─────────────────────────┐
│ Click "Shop Coffee"     │ (Nav or CTA)
│ (Founders Series page)  │
└──────┬──────────────────┘
       │
       ├─────────────────────────────────────┐
       │                                     │
       ↓                                     ↓
┌──────────────────┐            ┌────────────────────┐
│ Browse Blends    │            │ See Best Sellers   │
│ (6 Founders)     │            │ (All collections)  │
└──────┬───────────┘            └────────┬───────────┘
       │                                  │
       └──────────────┬───────────────────┘
                      │
                      ↓
              ┌──────────────────┐
              │ Click Blend      │
              │ (e.g. Washington)│
              └──────┬───────────┘
                     │
                     ├──────────────────────┐
                     │                      │
                     ↓                      ↓
            ┌────────────────┐     ┌─────────────────┐
            │ Read Details   │     │ Scroll Down     │
            │ Tasting Notes  │     │ "Matching       │
            │ Brew Guide     │     │  Apparel"       │
            └────────┬───────┘     │ Section         │
                     │             └────────┬────────┘
                     │                      │
                     ├──────────────────────┤
                     │                      │
                     ↓                      ↓
         ┌─────────────────────┐ ┌──────────────────┐
         │ Add to Cart         │ │ Click to Shop    │
         │ (on Shopify)        │ │ Matching Apparel │
         │                     │ │ (→ /Shop)        │
         └────────┬────────────┘ └──────────────────┘
                  │
                  ↓
         ┌──────────────────────┐
         │ See "Next Step"      │
         │ Bridge Section       │
         │ "Join Torch Box"     │
         └────────┬─────────────┘
                  │
                  ↓
         ┌──────────────────────┐
         │ Torch Box Page       │
         │ (Subscription CTAs)  │
         └──────────────────────┘
```

---

## 6. USER JOURNEY: APPAREL SECONDARY PATH

```
┌──────────────┐
│ Land on Home │
└──────┬───────┘
       │
       ↓
┌──────────────────────────┐    ┌─ NO direct apparel link
│ User wants to browse     │    │ (Not in nav)
│ apparel (but sees coffee)│    └
└──────┬───────────────────┘
       │
       ↓
┌──────────────────────────┐
│ Clicks "Shop Coffee"     │
│ (Sees Founders Series)   │
└──────┬───────────────────┘
       │
       ↓
┌──────────────────────────┐
│ Scrolls down to bottom   │
│ of collection page       │
└──────┬───────────────────┘
       │
       ↓
┌──────────────────────────┐
│ Finds "Extend Your       │
│ Collection" section      │
│ (NEW SECTION)            │
└──────┬───────────────────┘
       │
       ↓
┌──────────────────────────┐
│ Clicks "Explore          │
│ Founders Apparel"        │
└──────┬───────────────────┘
       │
       ↓
┌──────────────────────────┐
│ Arrives at /Shop         │
│ (Apparel page)           │
└──────┬───────────────────┘
       │
       ↓
┌──────────────────────────┐
│ Browses apparel by       │
│ series (organized)       │
└──────────────────────────┘
```

**Key Difference:** No direct nav link to apparel. Users must discover it through coffee journey.

---

## 7. INFORMATION HIERARCHY (VISUAL WEIGHT)

```
┌─────────────────────────────────────────────┐
│          TORCH REPUBLIC WEBSITE             │
├─────────────────────────────────────────────┤
│                                             │
│  TIER 1: PRIMARY FOCUS (70% of traffic)    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  • Homepage (coffee hero)                  │
│  • Coffee collections (4 series)           │
│  • Individual coffee product pages         │
│  • Torch Box subscription                  │
│  • Best Sellers (coffee-focused)           │
│                                             │
│  TIER 2: SECONDARY DISCOVERY (20% traffic) │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  • Apparel (via collection links)          │
│  • Bundles                                 │
│  • On Sale items                           │
│                                             │
│  TIER 3: SUPPORTING (10% traffic)          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  • Journal / Blog                          │
│  • Mission / About                         │
│  • Reviews                                 │
│  • Contact                                 │
│                                             │
└─────────────────────────────────────────────┘
```

**Visual Weight Distribution:**
- Coffee: 70% of homepage, nav, footer
- Apparel: 20% (secondary, accessed via coffee)
- Brand/Support: 10% (minimal but present)

---

## 8. PRODUCT PAGE LINK STRUCTURE

```
┌───────────────────────────────────────────────┐
│  Washington Blend (Coffee Product Page)       │
├───────────────────────────────────────────────┤
│                                               │
│  Breadcrumb:                                  │
│  Home → Founders Series → Washington Blend    │
│                                               │
│  [Product Details]                            │
│  [Tasting Notes]                              │
│  [Brew Guide]                                 │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │ PART OF A COLLECTIBLE SERIES             │ │
│  │ [Collect All 6 Founders]                 │ │
│  │ [Jefferson][Franklin][Adams][Lincoln]... │ │
│  └──────────────────────────────────────────┘ │
│           (Links to same series only)         │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │ MATCHING APPAREL                         │ │
│  │ Wear the legacy                          │ │
│  │ [Explore Founders Apparel →] (/Shop)     │ │
│  └──────────────────────────────────────────┘ │
│           (Optional, if apparel exists)       │
│                                               │
│  ┌──────────────────────────────────────────┐ │
│  │ NEXT STEP: TORCH BOX                     │ │
│  │ Join to get exclusive member blends      │ │
│  │ [Join Torch Box →] (/TheTorchBox)        │ │
│  └──────────────────────────────────────────┘ │
│                                               │
│  [Reviews]                                    │
│  [Related Blends] (same series)               │
│                                               │
└───────────────────────────────────────────────┘
```

**Link Types:**
- 🔄 **Series Links:** Coffee → Coffee (same series only)
- 🛍️ **Apparel Links:** Coffee → Apparel (secondary path)
- 🔥 **Conversion Links:** Coffee → Torch Box (primary CTA)
- ➡️ **Navigation Links:** Breadcrumb, footer, related products

---

## 9. BEFORE vs. AFTER — VISUAL COMPARISON

### BEFORE (Generic Store Feel)
```
┌──────────────────────────┐
│ [Shop] [Collections]     │
│ [Shirts & Gear]  ← Apparel priority
│ [About]                  │
└──────────────────────────┘
           ↓
   ┌─────────────────┐
   │ The Torch Index │
   │ (confusing)     │
   └─────────────────┘
           ↓
   ┌──────────────────────┐
   │ [All 4 Collections]  │
   │ Mixed coffee/apparel │
   └──────────────────────┘

FEEL: "Patriotic apparel store that also sells coffee"
```

### AFTER (Premium Coffee Brand)
```
┌──────────────────────────┐
│ [Shop Coffee]            │
│ [About]                  │
│            [Journal]     │
│            [Contact]     │
└──────────────────────────┘
           ↓
   ┌──────────────────┐
   │ Founders Series  │
   │ (clear, specific)│
   └──────────────────┘
           ↓
   ┌──────────────────────┐
   │ [Coffee Grid First]  │
   │ [Apparel Below]      │
   │ [Torch Box CTA]      │
   └──────────────────────┘

FEEL: "Premium coffee company with historical heritage and apparel"
```

---

## 10. SITE MAP (COMPLETE STRUCTURE)

```
torch-republic.com/
│
├── / (Home) ← Entry point
│
├── /CoffeeCollection (Founders Series)
│   ├── /WashingtonBlend
│   ├── /JeffersonBlend
│   ├── /FranklinBlend
│   ├── /AdamsBlend
│   ├── /LincolnBlend
│   └── /RooseveltBlend
│
├── /LibertyIcons
│   ├── /EaglesFlightBlend
│   ├── /LibertyTorchBlend
│   ├── /OldGloryHouseBlend
│   ├── /RosiesGrind
│   ├── /UncleSamsBoldBrew
│   └── /LadyLibertyBlend
│
├── /CommandersSeries (Coming Soon)
│   └── [Products TBD]
│
├── /WomenOfTheRepublic (Conditional)
│   ├── /AbigailAdamsBlend
│   └── /HarrietTubmanBlend
│
├── /TheTorchBox (Subscription)
│   └── [Tiers & Info]
│
├── /Shop (Apparel - Secondary Path)
│   └── [Organized by series]
│
├── /BestSellers (Discovery)
│   └── [Coffee focused]
│
├── /OnSale (Seasonal)
│   └── [Coffee + apparel]
│
├── /Bundles (Cross-sell)
│   └── [Multi-blend sets]
│
├── /Mission (Brand Story)
│
├── /Journal (Content)
│
├── /Reviews (Social Proof)
│
└── /Contact (Support)

DEPRECATED (URL still works, not linked):
├── /Visionaries → /CoffeeCollection
├── /Patriots → /CoffeeCollection
└── [Category pages] → /Shop
```

---

## 11. CONVERSION FUNNEL

```
                    100% - Homepage Visitors
                           │
                           ├─ 40% Click "Shop Coffee"
                           │       │
                           │       ├─ 60% Browse Coffee
                           │       │       │
                           │       │       └─ 30% Add to Cart
                           │       │
                           │       └─ 40% Scroll to "Extend Collection"
                           │               └─ 5% View Apparel
                           │
                           ├─ 30% Click "Torch Box"
                           │       └─ 20% Subscribe
                           │
                           └─ 30% Bounce (no interest)

PRIMARY CONVERSION: Coffee purchase + Torch Box subscription
SECONDARY: Apparel purchase
GOAL: Coffee first, subscription as upsell
```

---

**Document Owner:** Torch Republic Architecture Team  
**Last Updated:** April 2026  
**Status:** REFERENCE ✅