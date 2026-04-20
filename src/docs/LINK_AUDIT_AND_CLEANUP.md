# Link Audit & Cleanup | Torch Republic
## Navigation & Internal Linking Restructure
**Status:** April 2026

---

## PRIMARY NAVIGATION CLEANUP

### NavBar.jsx Changes ✅

**BEFORE:**
```
[Shop] [Collections] [About]  ←  [Journal] [Contact]
                                  [Torch Box]
```

**AFTER:**
```
[Shop Coffee] [About]  ←  [Journal] [Contact]
                           [Join Torch Box]
```

**Dropdown Menu (BEFORE):**
- Shop Coffee / All Coffee / Founders / Liberty Icons / Commanders / Women of the Republic / 🔥 Torch Box
- **Shirts & Gear** / All Shirts / On Sale
- Brand / Home / About / Journal / Contact

**Dropdown Menu (AFTER):**
- **Shop Coffee** (removed secondary duplicate)
  - All Collections
  - Founders Series
  - Liberty Icons
  - Commanders Series
  - 🔥 Torch Box Subscription
- **Brand**
  - Home
  - Our Story
  - Journal
  - Best Sellers
  - Reviews
  - Contact

**Key Removal:** "Shirts & Gear" category — no longer a top-level grouping

---

## FOOTER CLEANUP

### Footer.jsx Changes ✅

**BEFORE:**
```
Coffee:
  - Founders Series
  - Liberty Icons
  - Commanders Series
  - Women of the Republic
  - Torch Box

Shop:
  - Best Sellers
  - Torch Apparel  ← REMOVED
  - Bundles
  - On Sale

Company:
  - Our Story
  - Journal
  - Reviews
  - Contact

Policies:
  - Shipping / Return / Privacy / Terms
```

**AFTER:**
```
Coffee Collections:
  - Shop All Coffee
  - Founders Series
  - Liberty Icons
  - Commanders Series
  - Torch Box Subscription

Company:
  - Our Story
  - Journal
  - Best Sellers
  - Reviews
  - Contact

Legal:
  - Shipping Policy
  - Return Policy
  - Privacy Policy
  - Terms of Service
```

**Changes:**
- ❌ Removed "Torch Apparel" link (it's now accessed via collection pages only)
- ✅ Renamed "Shop" column to "Coffee Collections"
- ✅ Renamed "Policies" to "Legal" (shorter, clearer)
- ✅ Moved "Best Sellers" to "Company" section (emphasizes browsing, not apparel store)

---

## COLLECTION PAGE CLEANUP

### CoffeeCollection.jsx (Founders Series) ✅

**CHANGES:**
- Renamed header from "The Torch Index" (confusing) → "Founders Series"
- Changed breadcrumb from all 4 collections to just other collections (Liberty, Commanders)
- Added "Extend Your Collection" apparel section below coffee grid
- Changed CTA from "See All Bundles" to "Join Torch Box Subscription" (higher intent)
- Clarified description to position as flagship collection

**New Section Added:**
```
┌────────────────────────────────────────┐
│ MATCHING APPAREL (NEW)                 │
│ ─────────────────────────────────────  │
│ "Extend Your Collection"               │
│ "Founders Series Apparel"              │
│ "Historical apparel inspired by the    │
│  Founders. Wear the legacy."           │
│                                        │
│ [CTA: Explore Founders Apparel →]      │
└────────────────────────────────────────┘
```

---

### LibertyIcons.jsx ✅

**No major changes needed** — already coffee-first

**To Add (when ready):**
- Matching apparel section below coffee grid
- Text: "Extend Your Collection — Liberty Icons Apparel"
- Link to `/Shop` (with filter hint in UI)

---

### CommandersSeries.jsx ✅

**No changes needed** — already correct (coming soon)

**To Add (when ready):**
- Matching apparel section
- Link to `/Shop`

---

## SECONDARY PAGES CLEANUP

### Shop.jsx → Apparel Positioning ✅

**NOT renamed in URL** (still `/Shop`)
**BUT conceptually repositioned:**

**BEFORE:**
```
Header: "Shop Torch Republic"
Subhead: "Premium small-batch coffee and collectible blends"
```

**AFTER:**
```
Header: "Torch Republic Apparel"
Subhead: "Historical apparel inspired by the Founders, Liberty Icons, 
          and Commanders Series — extensions of our coffee collections"
```

**Key Point:** This page is accessed ONLY via:
- Collection pages ("Extend Your Collection" link)
- Footer (not there anymore, removed "Torch Apparel" link)
- Direct URL (users who know about it)

**NOT from:** Primary nav, top-level discovery

---

### BestSellers.jsx ✅

**Current:** Shows mix of coffee + apparel
**Ideal:** Prioritizes coffee, shows current best-selling blends first
**No changes needed** — just ensure it filters coffee-first

---

### OnSale.jsx ✅

**Current:** Shows discounted items
**Ideal:** Coffee sales displayed first, apparel after
**Recommendation:** Add product type sort (coffee → apparel)

---

## PAGE VISIBILITY MATRIX

| Page | Visible in Nav? | Visible in Footer? | Accessible Direct? | Purpose |
|------|-----------------|--------------------|--------------------|---------|
| `/` (Home) | ✅ Logo | N/A | ✅ | Entrypoint |
| `/CoffeeCollection` (Founders) | ✅ "Shop Coffee" | ✅ "Shop All Coffee" | ✅ | Primary collection |
| `/LibertyIcons` | ✅ "Liberty Icons" | ✅ "Liberty Icons" | ✅ | Secondary collection |
| `/CommandersSeries` | ✅ "Commanders" | ✅ "Commanders" | ✅ | Secondary collection |
| `/WomenOfTheRepublic` | ⏳ Only if ready | ⏳ Only if ready | ✅ | Tertiary collection |
| `/TheTorchBox` | ✅ "Torch Box" | ✅ "Torch Box" | ✅ | Membership service |
| `/Shop` (Apparel) | ❌ NO | ❌ NO | ✅ | Via collection links |
| `/BestSellers` | ❌ NO | ✅ "Best Sellers" | ✅ | Discovery page |
| `/Bundles` | ❌ NO | ❌ NO | ✅ | Cross-sell (via product) |
| `/OnSale` | ❌ NO | ❌ NO | ✅ | Seasonal / discount |
| `/Mission` | ❌ NO | ✅ "Our Story" | ✅ | Brand story |
| `/Journal` | ✅ "Journal" | ✅ "Journal" | ✅ | Content |
| `/Reviews` | ❌ NO | ✅ "Reviews" | ✅ | Social proof |
| `/Contact` | ✅ "Contact" | ✅ "Contact" | ✅ | Support |

---

## DEPRECATED PAGES (Archive)

**These pages still exist but are NOT linked from primary discovery:**

| Page | Old Purpose | New Handling | Link Destination |
|------|-------------|--------------|-------------------|
| `/Visionaries` | Collection index | Not in nav | → `/CoffeeCollection` |
| `/Patriots` | Collection index | Not in nav | → `/CoffeeCollection` |
| `/Categories/*` | Apparel categories | Not in nav | → `/Shop` |
| `/Jewelry` | Legacy category | Hidden | → `/Shop` |
| `/Magnets` | Legacy category | Hidden | → `/Shop` |
| `/Stickers` | Legacy category | Hidden | → `/Shop` |
| `/Candles` | Legacy category | Hidden | → `/Shop` |
| `/Flags` | Legacy category | Hidden | → `/Shop` |

**How to Handle:**
- Keep URLs live (no 404s) for existing bookmarks
- Don't link to them from nav/footer
- If user visits, they see appropriate content
- Consider 301 redirects if traffic is high

---

## INTERNAL PRODUCT LINKING RULES

### ✅ Coffee → Coffee Links

**Use on Product Pages:**
```
[Washington Blend Product Page]
  → "Collect All Founders" section
  → Links to: Jefferson, Franklin, Adams, Lincoln, Roosevelt
  → "Related Products" = same series only
```

**Use on Collection Pages:**
```
[Founders Series Collection]
  → All 6 blends shown
  → Each blend links to individual product page
  → NO links to Liberty Icons / Commanders on this page
```

---

### ✅ Coffee → Apparel Links

**Use on Product Pages:**
```
[Washington Blend Product Page]
  → Bottom section: "Matching Apparel"
  → Links to: Founders Apparel collection (on `/Shop`)
  → Text: "Wear the legacy"
```

**Use on Collection Pages:**
```
[Founders Series Collection]
  → After coffee grid: "Extend Your Collection"
  → Section heading: "Founders Series Apparel"
  → CTA: "Explore Founders Apparel →"
  → Links to: `/Shop` (with visual context)
```

---

### ❌ Avoid These Links

**DON'T create:**
- Coffee → Unrelated apparel (Founders Coffee → random Commanders shirt)
- Coffee → Deprecated pages (Visionaries, Patriots)
- Apparel → Other apparel collections (Liberty Apparel → Commanders Apparel on same page)
- Cross-series recommendations (except in related products within same collection)

---

## SEARCH & BROWSING JOURNEY

### User Path 1: Coffee-First (PRIMARY)
```
Home
  → Shop Coffee (nav)
  → All Collections page (CoffeeCollection)
  → Pick a Series (Founders / Liberty Icons / Commanders)
  → Browse coffee blends
  → Click product → Detail page
  → "Part of a Collection" → Back to series
  → "Matching Apparel" → `/Shop` apparel
  → "Join Torch Box" → subscription
```

### User Path 2: Looking for Apparel (SECONDARY)
```
Home
  → [No direct apparel nav]
  → Goes to coffee collection
  → Scrolls to "Extend Your Collection"
  → Clicks "Explore Apparel"
  → `/Shop` with apparel grid
  → Browses by series (Founders Apparel, etc.)
```

### User Path 3: Direct (POWER USER)
```
torch-republic.com/Shop
  → Sees apparel only
  → Can still navigate to coffee via footer
```

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Navigation ✅ DONE
- [x] Update NavBar.jsx (remove Shirts & Gear category)
- [x] Update Footer.jsx (rename columns, remove "Torch Apparel")
- [x] Verify all links work

### Phase 2: Collection Pages
- [ ] Add apparel sections to LibertyIcons.jsx
- [ ] Add apparel sections to CommandersSeries.jsx
- [ ] Audit product card internal links
- [ ] Test breadcrumb navigation

### Phase 3: Product Pages
- [ ] Verify "Part of a Collection" links to correct series
- [ ] Add "Matching Apparel" CTA to all coffee product pages
- [ ] Ensure no cross-series links on product pages
- [ ] Test "Collect All [Series]" related products section

### Phase 4: Testing
- [ ] Mobile nav flows
- [ ] Desktop nav flows
- [ ] 404 checks on all links
- [ ] Analytics on traffic to each collection
- [ ] User testing: Can users find apparel? (Secondary path)

### Phase 5: Analytics & Optimization
- [ ] Track clicks from coffee → apparel section
- [ ] Monitor search behavior in nav
- [ ] Adjust collection page copy based on user behavior
- [ ] A/B test apparel CTA placement (if needed)

---

## CONTENT MESSAGING UPDATES

### Before
> "Torch Republic — Premium patriotic apparel and coffee"

### After
> "Torch Republic — Premium small-batch coffee rooted in American history. Collectible series. Wear the legacy."

**Key Shift:** Coffee is the product. Apparel is the extension.

---

## FINAL LINK STRUCTURE DIAGRAM

```
┌──────────────────────────────────────────────────────────┐
│                        HOME                              │
│           (Coffee-first hero + collections)              │
└────────────┬─────────────────────────┬──────────────────┘
             │                         │
        ┌────▼─────┐        ┌─────────▼────┐
        │Shop Coffee│        │Other Pages   │
        └────┬─────┘        │(Journal,     │
             │              │About, etc.)  │
     ┌───────┼───────┐      └──────────────┘
     │       │       │
┌────▼──┐ ┌──▼────┐ ┌────▼─────┐
│Founders│ │Liberty│ │Commanders│
│Series  │ │ Icons │ │ Series   │
└────┬──┘ └──┬────┘ └────┬─────┘
     │       │           │
 [6 Blends]  [5 Blends]  [TBD]
     │       │           │
     ├───────┴───────────┤
     │                   │
  ┌──▼────────────────────▼──┐
  │  Product Detail Pages    │
  │  (Links to Series only)  │
  └──┬───────────────────────┘
     │
  ┌──▼─────────────────┐
  │Matching Apparel    │
  │(Extend Collection) │
  └────────┬───────────┘
           │
        ┌──▼──────┐
        │ /Shop   │
        │(Apparel)│
        └─────────┘
```

---

## SUCCESS METRICS

After implementation, the site should:
- ✅ **Coffee-first**: Visitors see coffee products first on every page
- ✅ **Clear hierarchy**: Primary (coffee) vs. secondary (apparel) is obvious
- ✅ **No dead ends**: Every page has next-step navigation
- ✅ **Mobile-friendly**: All links work on mobile, no nav confusion
- ✅ **Low bounce**: Users can find coffee OR apparel easily
- ✅ **Premium feel**: Apparel doesn't overshadow coffee brand positioning
- ✅ **Convertible**: Each collection page has clear "Join Torch Box" CTA

---

**Document Owner:** Torch Republic Brand Team  
**Last Reviewed:** April 2026  
**Next Review:** Q3 2026 (post-launch)