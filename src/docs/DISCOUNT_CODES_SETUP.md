# Discount Codes Setup Guide

## Overview
Three discount offers are now integrated throughout the Torch Republic mushroom coffee checkout experience:

1. **WELCOME10** - 10% off first order
2. **SUBSCRIBE20** - 20% off subscriptions  
3. **FREE SHIPPING** - Automatic on orders over $75

## Shopify Admin Setup Required

### 1. WELCOME10 Discount (10% off first order)
**Location**: Shopify Admin → Discounts → Create discount → Amount off order

**Settings**:
- **Discount type**: Percentage
- **Value**: 10%
- **Applies to**: Entire order
- **Customer eligibility**: New customers only (first-time purchasers)
- **Usage limits**: One use per customer
- **Active**: Yes

**Code**: `WELCOME10`

---

### 2. SUBSCRIBE20 Discount (20% off subscriptions)
**Location**: Shopify Admin → Discounts → Create discount → Amount off order

**Settings**:
- **Discount type**: Percentage
- **Value**: 20%
- **Applies to**: Subscription orders only
- **Customer eligibility**: All customers
- **Usage limits**: Unlimited (recurring)
- **Active**: Yes

**Code**: `SUBSCRIBE20`

---

### 3. Free Shipping (Automatic on orders $75+)
**Location**: Shopify Admin → Discounts → Create discount → Free shipping

**Settings**:
- **Discount type**: Free shipping
- **Applies to**: Orders over $75
- **Minimum purchase amount**: $75 USD
- **Customer eligibility**: All customers
- **Active**: Yes
- **Automatic**: Yes (no code needed)

---

## Where Discounts Appear in the App

### Homepage (`/`)
- Rotating carousel in hero section (3 messages)
- Dedicated discount section before final CTA
- All three discounts displayed with visual cards

### Product Pages (`/blends/:slug`)
- Compact rotating discount banner near Add to Cart button
- Shows progress toward free shipping threshold

### Bundle Page (`/bundle`)
- All three discounts displayed prominently
- Shows subscription savings opportunity

### Subscription Builder (`/subscription`)
- All discounts shown in review step
- Subscription discount badge with savings amount
- Progress indicators for each offer

### Checkout Flow
- Customers enter discount codes at Shopify checkout
- Free shipping applies automatically when threshold is met

---

## Technical Implementation

### Frontend Components
- **`components/discounts/DiscountReminders.jsx`**: Reusable component with three modes:
  - `compact`: Rotating banner (product pages)
  - `showAll`: Display all discounts (checkout pages)
  - Default: Single rotating card (general use)

### Features
- Auto-rotation every 5 seconds (when not showing all)
- Interactive dots for manual navigation
- Free shipping progress bar with real-time calculation
- Color-coded by discount type:
  - Welcome: Rose gold (#E6B7AD)
  - Subscription: Green (#6EBD8E)
  - Shipping: Champagne (#D6B27A)

### Cart Subtotal Tracking
- Component accepts `cartSubtotal` prop
- Calculates distance to $75 free shipping threshold
- Shows dynamic progress bar and unlock message

---

## Testing Checklist

### Before Launch
- [ ] Create all three discount codes in Shopify Admin
- [ ] Test WELCOME10 with new customer account
- [ ] Test SUBSCRIBE20 on subscription checkout
- [ ] Test free shipping auto-applies at $75+
- [ ] Verify discount codes work on mobile
- [ ] Check progress bars show correct values

### Customer Journey Tests
1. **First-time buyer**: 
   - Lands on homepage → sees all 3 discounts
   - Views product page → sees rotating banner
   - Adds to cart ($24.99) → sees "$50.01 more for free shipping"
   - Adds second product ($49.98) → sees "$25.02 more for free shipping"
   - Adds third product ($74.97) → sees "Add $0.03 more to unlock"
   - Checkout → enters WELCOME10 → gets 10% off

2. **Subscription buyer**:
   - Goes to /subscription
   - Builds 3-tube subscription ($74.97)
   - Sees "20% OFF — Code SUBSCRIBE20" badge
   - Sees savings amount ($14.99)
   - Checkout → SUBSCRIBE20 auto-applied or entered manually
   - Gets 20% off recurring orders

3. **Bundle buyer**:
   - Goes to /bundle
   - Sees all discounts on bundle page
   - 6-tube bundle ($149.94) → unlocks free shipping
   - Checkout → free shipping auto-applied
   - Can also use WELCOME10 for additional 10% off

---

## Marketing Recommendations

### Email Campaigns
- Welcome series: Highlight WELCOME10 code
- Abandoned cart: Remind about applicable discounts
- Post-purchase: Introduce subscription with SUBSCRIBE20

### On-Site Messaging
- Exit-intent popup: "Wait! Use WELCOME10 for 10% off"
- Cart drawer: Show free shipping progress
- Product pages: "Add $X more for free shipping"

### Social Media
- Feature each discount in rotation
- Subscription savings calculator graphics
- Free shipping threshold reminders

---

## Maintenance

### Monthly Checks
- Verify all discount codes are still active
- Check usage statistics in Shopify Admin
- Monitor discount code effectiveness (conversion rates)
- Update promotional messaging if needed

### Seasonal Adjustments
- Consider temporary additional discounts
- Black Friday / Cyber Monday specials
- Holiday shipping deadline promotions

---

## Support

If discount codes don't work:
1. Check Shopify Admin → Discounts → ensure codes are active
2. Verify customer eligibility settings
3. Check if minimum order requirements are met
4. Ensure codes aren't expired or usage-limited
5. Test in incognito mode to rule out caching issues

For technical issues with the DiscountReminders component:
- Check browser console for errors
- Verify component is receiving correct cartSubtotal prop
- Ensure framer-motion and lucide-react are installed