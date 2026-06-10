# Torch Republic Customer Lifecycle Email Campaigns

## Overview

In addition to the main Relaunch Campaign, Torch Republic now has automated lifecycle email campaigns that run continuously to engage customers at every stage of their journey.

---

## Lifecycle Campaigns

### 1. Win-Back Campaign

**Target:** Customers inactive for 60+ days  
**Goal:** Re-engage lapsed customers  
**Offer:** WELCOME20 (20% off)

**Email Content:**
- Subject: "We Miss You — Come Back to Your Ritual"
- Personalized greeting
- 20% discount incentive
- Clear CTA back to shop

**Automation:**
- Runs daily at 11:00 AM
- Automatically identifies customers 60+ days since last order
- Excludes customers who already received win-back email

**Function:** `sendWinBackEmail`

---

### 2. New Customer Onboarding

**Target:** New customers (7 days after first purchase)  
**Goal:** Help customers maximize their ritual experience  
**Content:** Educational, no discount

**Email Content:**
- Subject: "Getting the Most from Your Ritual?"
- Morning ritual tips (GlowMind, Lion's Mane)
- Evening wind-down suggestions (DreamCap)
- Pro tips for preparation
- Link to recipes page

**Automation:**
- Runs daily at 11:00 AM
- Triggers 7 days after "New Customer Welcome" email
- Excludes those who already received onboarding

**Function:** `sendNewCustomerOnboarding`

---

### 3. VIP Rewards Program

**Target:** Customers with 2+ orders OR $300+ lifetime spend  
**Goal:** Reward loyalty, increase lifetime value  
**Offer:** Exclusive VIP status with 25% discount

**VIP Benefits:**
- 25% discount on all orders (higher than standard 20%)
- Early access to new blends & limited editions
- Free shipping on every order (no minimum)
- Birthday gift: Free limited-edition product
- Priority customer support

**Email Content:**
- Subject: "You're Invited: Exclusive VIP Rewards Program"
- VIP tier announcement
- Complete benefits list
- Exclusive activation link

**Automation:**
- Runs daily at 11:00 AM
- Identifies customers with 2+ converted orders
- Excludes those who already received VIP invitation

**Function:** `sendVIPEmail`

---

## Automated Segmentation

### `segmentCustomerLifecycle` Function

This function analyzes ALL Shopify customers and automatically segments them:

**VIP Segment:**
- 3+ orders OR $300+ lifetime spend
- Campaign: "VIP Rewards"

**Win-Back Segment:**
- Last order 30-90 days ago
- Campaign: "Win-Back Campaign"

**New Customer Segment:**
- First order within 30 days
- Campaign: "New Customer Welcome"

**How to Run:**
1. Manual: Call function from Dashboard → Code → Functions
2. Recommended: Run weekly to keep segments updated

---

## Campaign Flow Diagram

```
New Customer
    ↓
[Day 0] Welcome Email (WELCOME15)
    ↓
[Day 7] Onboarding Email (tips & recipes)
    ↓
[Ongoing] Regular product emails

↓ (if 2+ orders)

VIP Rewards Invitation
    ↓
VIP Exclusive Emails (monthly)

↓ (if inactive 60+ days)

Win-Back Campaign
    ↓
[Day 0] We Miss You (WELCOME20)
    ↓
[Day 7] Last Chance Reminder
```

---

## Email Campaign Entity Tracking

All lifecycle emails are tracked in the `EmailCampaign` entity with these campaign names:

- `Win-Back Campaign`
- `Win-Back Email`
- `New Customer Welcome`
- `New Customer Onboarding`
- `VIP Rewards`
- `VIP Rewards Program`
- `VIP Rewards Email`

**Fields Tracked:**
- recipient_email
- customer_name
- segment (vip, winback, new_customer)
- campaign_name
- email_number
- sent_date
- opened, opened_date
- clicked, clicked_date
- converted, order_id, revenue
- status

---

## How to Use

### Step 1: Segment Customers

Run `segmentCustomerLifecycle` to categorize all customers:

```
Dashboard → Code → Functions → segmentCustomerLifecycle → Test
```

This will:
- Analyze order history
- Assign segments (VIP, Win-Back, New Customer)
- Create EmailCampaign records

### Step 2: Monitor Automations

Three automations run daily at 11:00 AM:

1. **Lifecycle - Win-Back Campaign**
2. **Lifecycle - New Customer Onboarding**
3. **Lifecycle - VIP Rewards Invitation**

Check status:
```
Dashboard → Automations
```

### Step 3: Track Performance

Monitor campaign performance in the Email Campaign Dashboard:

```
/email-campaign
```

Metrics to watch:
- Win-back conversion rate
- VIP activation rate
- New customer retention (day 30, day 60)

---

## Performance Benchmarks

### Win-Back Campaign
- **Open Rate:** 18-25% (lower than regular, list is cold)
- **Click Rate:** 2-4%
- **Conversion Rate:** 1-3%
- **Revenue per Email:** $0.20-$0.50

### New Customer Onboarding
- **Open Rate:** 35-45% (high engagement early)
- **Click Rate:** 5-8%
- **Conversion Rate:** 3-6%
- **Goal:** Increase day 30 retention by 20%

### VIP Rewards
- **Open Rate:** 40-50% (highly engaged)
- **Click Rate:** 8-12%
- **Activation Rate:** 25-40%
- **Goal:** Increase VIP AOV by 30%

---

## Best Practices

### Win-Back Campaign
✅ Send only ONE win-back email (don't spam)  
✅ Use strong incentive (20% off)  
✅ Keep message simple and emotional  
✅ Exclude recent purchasers  

### New Customer Onboarding
✅ Focus on education, not sales  
✅ Provide genuine value (tips, recipes)  
✅ Build habit formation  
✅ Encourage daily ritual usage  

### VIP Rewards
✅ Make VIP feel exclusive  
✅ Clearly communicate benefits  
✅ Use premium design/tone  
✅ Follow up with VIP-only product launches  

---

## Integration with Relaunch Campaign

The lifecycle campaigns work alongside the main Relaunch Campaign:

**Relaunch Campaign:**
- One-time blast to all customers
- 3 emails over 7 days
- WELCOME15 discount

**Lifecycle Campaigns:**
- Ongoing, automated
- Triggered by customer behavior
- Personalized by segment

**Example Customer Journey:**
1. Customer receives Relaunch Email #1
2. Purchases with WELCOME15
3. 7 days later: Receives New Customer Onboarding
4. 60 days later (if no reorder): Receives Win-Back Email
5. 2nd purchase: Receives VIP Rewards invitation

---

## Files Created

### Backend Functions
- `segmentCustomerLifecycle.js` - Customer segmentation
- `sendWinBackEmail.js` - Win-back campaign
- `sendNewCustomerOnboarding.js` - New customer education
- `sendVIPEmail.js` - VIP rewards invitation

### Automations
- `Lifecycle - Win-Back Campaign` (daily at 11 AM)
- `Lifecycle - New Customer Onboarding` (daily at 11 AM)
- `Lifecycle - VIP Rewards Invitation` (daily at 11 AM)

---

## Next Steps

### Immediate
1. ✅ Run `segmentCustomerLifecycle` to categorize existing customers
2. ✅ Verify automations are active
3. ✅ Monitor first week of sends

### Week 2-4
- Review win-back conversion rates
- Adjust VIP threshold if needed (currently 2 orders)
- A/B test win-back subject lines

### Month 2+
- Create VIP-only product launches
- Build advanced segmentation (by product preference)
- Add post-purchase review request flow
- Implement abandoned cart recovery emails

---

## Troubleshooting

### Customers Not Receiving Lifecycle Emails

**Check:**
1. EmailCampaign records exist for customer
2. Customer meets segment criteria (2+ orders, 60+ days inactive, etc.)
3. Automation is active (Dashboard → Automations)
4. SendEmail integration is configured

### High Unsubscribe Rate

**Solutions:**
1. Reduce frequency (currently 1 email/week max per customer)
2. Improve email relevance (better segmentation)
3. Add preference center (Shopify handles this)

### Low Win-Back Conversion

**Optimize:**
1. Increase discount (try 25% instead of 20%)
2. Add urgency ("Offer expires in 7 days")
3. Personalize product recommendations
4. Test different send times

---

## Summary

Torch Republic now has a complete email marketing system:

✅ **Relaunch Campaign** - Reintroduce brand (3 emails, 7 days)  
✅ **Win-Back Campaign** - Re-engage lapsed customers (60+ days)  
✅ **New Customer Onboarding** - Educate & retain (day 7)  
✅ **VIP Rewards** - Reward loyalty (2+ orders)  

**Total Automations:** 6 (3 relaunch + 3 lifecycle)  
**Total Functions:** 11  
**Tracking:** Full open/click/conversion tracking  

All campaigns run automatically, track performance in `/email-campaign` dashboard.