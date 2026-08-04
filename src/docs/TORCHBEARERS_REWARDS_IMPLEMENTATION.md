# TORCHBEARERS REWARDS - Implementation Summary

## Overview
A premium loyalty and rewards program for Torch Republic Coffee Company that feels aspirational, community-driven, and aligned with luxury wellness brands.

---

## Program Name
**Torchbearers Rewards**

**Tagline:** Carry the Flame. Earn the Rewards.

---

## Pages Created

### 1. `/torchbearers-rewards` (Main Loyalty Page)
**File:** `pages/TorchbearersRewards.jsx`

**Sections:**
- **Hero Section** - Premium branding with tagline and CTAs
- **Ways to Earn** - 8 earning methods with icons (purchases, reviews, referrals, social, etc.)
- **Reward Tiers** - Three premium tiers (Ember, Beacon, Flamekeeper)
- **Referral Program** - "Share the Flame" section
- **Subscription Integration** - Subscribe & Save 20% + rewards
- **Final CTA** - Sign in / Create account prompts

---

## Components Created

### 1. `TorchbearersBanner` (Site-wide Integration)
**File:** `components/loyalty/TorchbearersBanner.jsx`

**Variants:**
- `default` - Full banner for pages
- `compact` - Small banner for cart/product pages
- `sidebar` - Vertical sidebar variant

**Usage:**
```jsx
<TorchbearersBanner variant="default" />
<TorchbearersBanner variant="compact" />
<TorchbearersBanner variant="sidebar" />
```

### 2. `LoyaltyDashboard` (User Account Dashboard)
**File:** `components/loyalty/LoyaltyDashboard.jsx`

**Features:**
- Current tier display with icon and color
- Points display (available + lifetime)
- Progress bar to next tier
- Quick action buttons
- Recent activity feed
- Referral status

**Usage:**
```jsx
<LoyaltyDashboard user={user} loyaltyData={loyaltyData} />
```

### 3. `TorchbearersRewardsSection` (Homepage Section)
**File:** `components/home/TorchbearersRewardsSection.jsx`

Premium section showcasing the three tiers with icons and colors.

---

## Integration Points

### 1. Homepage
- Added `TorchbearersRewardsSection` between Reviews and FAQ
- Positioned after social proof, before FAQ for maximum visibility

### 2. Cart Page
- Added compact banner at top
- Added rewards nudge in order summary showing points to be earned
- Displays "~{subtotal} points" based on cart value

### 3. Profile Page
- Added "Torchbearers Rewards" card with link to learn more
- Positioned after Customer Portal link

### 4. Footer
- Added "Community" section with Torchbearers Rewards link
- Links to `/torchbearers-rewards`, `/portal`, `/reviews`, `/journal`

---

## Reward Tiers

### TIER 1: EMBER (Entry)
- **Color:** Rose Gold (#C98F86)
- **Multiplier:** 1x points
- **Benefits:**
  - Earn points on every purchase
  - Birthday reward
  - Early access to promotions
  - Exclusive member content

### TIER 2: BEACON (Mid)
- **Color:** Rose Gold (#E6B7AD)
- **Multiplier:** 1.25x points
- **Benefits:**
  - 1.25x points multiplier
  - Exclusive member offers
  - Early product launches
  - Priority customer support
  - Free shipping on orders $50+

### TIER 3: FLAMEKEEPER (VIP)
- **Color:** Gold (#D4AF37)
- **Multiplier:** 1.5x points
- **Benefits:**
  - 1.5x points multiplier
  - Exclusive VIP launches
  - Private promotions
  - Quarterly VIP gifts
  - Founder updates & previews
  - First access to new products
  - Free shipping on all orders

---

## Ways to Earn

1. **Make a Purchase** - 1 point per $1 spent
2. **Create Account** - 50 points
3. **Leave a Review** - 25 points
4. **Photo Review** - 50 points
5. **Refer Friends** - 100 points
6. **Birthday Reward** - Special gift
7. **Subscribe** - 2x points on recurring orders
8. **Follow Social** - 25 points

---

## Tier Thresholds

- **Ember:** 0-499 points
- **Beacon:** 500-1,499 points
- **Flamekeeper:** 1,500+ points

---

## Design Principles

### Visual Identity
- **Background:** Dark luxury (#0D0C0B, #0F0E0D)
- **Primary Color:** Rose Gold (#E6B7AD)
- **Accent Colors:**
  - Ember: #C98F86 (deep rose)
  - Beacon: #E6B7AD (rose gold)
  - Flamekeeper: #D4AF37 (gold)

### Typography
- **Headings:** Cormorant Garamond (serif, premium)
- **Body:** Inter (heading font, clean)
- **Accents:** JetBrains Mono (tracking, technical)

### Tone & Voice
- Luxury wellness
- Premium coffee culture
- Intentional living
- Confident and inspiring
- NOT childish, gimmicky, or overly spiritual

---

## Success Metrics

The program is designed to increase:
- ✅ Repeat purchases
- ✅ Subscription enrollment
- ✅ Review generation
- ✅ Referral sales
- ✅ Customer lifetime value (LTV)
- ✅ Community engagement
- ✅ Average order value (AOV)

---

## Next Steps (Backend Integration)

To fully activate the loyalty program, the following backend work is needed:

1. **LoyaltyPoints Entity** - Already exists, needs automation
2. **Points Tracking Automation** - Award points on purchases
3. **Tier Advancement Logic** - Auto-promote users based on lifetime points
4. **Referral System** - Generate unique referral codes
5. **Redemption System** - Allow users to redeem points for discounts
6. **Email Notifications** - Welcome, tier advancement, points earned

---

## Files Modified

1. `App.jsx` - Added route for `/torchbearers-rewards`
2. `pages/Home.jsx` - Added TorchbearersRewardsSection
3. `pages/Cart.jsx` - Added banner and rewards nudge
4. `pages/Profile.jsx` - Added Torchbearers Rewards card
5. `components/navigation/Footer.jsx` - Added Community section

---

## Files Created

1. `pages/TorchbearersRewards.jsx` - Main loyalty page
2. `components/loyalty/TorchbearersBanner.jsx` - Site-wide banner
3. `components/loyalty/LoyaltyDashboard.jsx` - User dashboard
4. `components/home/TorchbearersRewardsSection.jsx` - Homepage section
5. `docs/TORCHBEARERS_REWARDS_IMPLEMENTATION.md` - This document

---

## Brand Alignment

The Torchbearers Rewards program reinforces:
- **Torch Republic is more than coffee** - It's a daily ritual
- **Torchbearers are the community** - They carry the ritual forward
- **Premium positioning** - Feels like luxury wellness membership
- **Intentional living** - Rewards mindful daily practices

---

**Implementation Date:** June 10, 2026
**Status:** Frontend Complete - Backend Integration Pending