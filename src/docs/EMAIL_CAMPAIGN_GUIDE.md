# Torch Republic Relaunch Email Campaign

## Campaign Overview

### 1. Relaunch Campaign (NEW CUSTOMERS & RE-ENGAGEMENT)

**Campaign Name:** Torch Republic Relaunch  
**Objective:** Reintroduce the brand and drive previous customers back to torchrepublic.com  
**Discount Code:** WELCOME15 (15% off first order)

### 2. Lifecycle Campaigns (AUTOMATED)

**Win-Back Campaign**
- Targets: Customers inactive for 60+ days
- Offer: WELCOME20 (20% off)
- Sent: Automatically via daily automation

**New Customer Onboarding**
- Targets: New customers (7 days after welcome email)
- Content: Ritual tips, recipes, usage guidance
- Sent: Day 7 automatically

**VIP Rewards Program**
- Targets: Customers with 2+ orders
- Offer: Exclusive 25% discount + VIP perks
- Sent: Automatically when customer reaches 2 orders

---

## What's Been Built

### 1. Backend Functions

#### Relaunch Campaign Functions

**`fetchShopifyCustomers`**
- Imports all customer emails from Shopify
- Segments customers into Previous Purchasers, Email Subscribers, Abandoned Cart
- Returns customer count and segment breakdown

**`sendRelaunchEmail`**
- Sends individual emails using Base44 SendEmail integration
- Logs each send to EmailCampaign entity
- Supports personalization with customer name

**`sendBatchRelaunchEmails`**
- Sends Email #1 to entire customer segments
- Processes customers in batches
- Returns success/failure counts

**`sendEmail2Followup`**
- Automated follow-up sent 3 days after Email #1
- Features best-selling products and reviews

**`sendEmail3LastChance`**
- Final urgency email sent 7 days after Email #1
- Reminds customers WELCOME15 is expiring

#### Lifecycle Campaign Functions

**`segmentCustomerLifecycle`**
- Analyzes all Shopify customers
- Automatically segments into: VIP, Win-Back, New Customer
- Creates EmailCampaign records for each segment

**`sendWinBackEmail`**
- Targets customers inactive for 60+ days
- Sends WELCOME20 (20% off) incentive
- Runs daily via automation

**`sendNewCustomerOnboarding`**
- Sends day 7 onboarding email to new customers
- Includes ritual tips, recipes, and usage guidance
- Runs daily via automation

**`sendVIPEmail`**
- Sends VIP rewards invitation to customers with 2+ orders
- Exclusive 25% discount + VIP perks
- Runs daily via automation

#### Analytics & Tracking

**`getCampaignMetrics`**
- Real-time campaign analytics
- Tracks: open rate, click rate, conversion rate, revenue
- Breaks down by email number and customer segment

**`trackEmail`**
- Tracks email opens via invisible pixel
- Tracks link clicks via redirect
- Updates EmailCampaign records automatically

### 2. Email Templates (lib/emailTemplates.js)

Three professionally designed HTML emails:

**Email #1: Relaunch Announcement**
- Subject: "We're Back — Your Ritual Awaits"
- Founder message
- WELCOME15 discount showcase
- Featured products: Torchbearer, GlowMind, The Monk
- Mobile-optimized version included

**Email #2: Best Sellers (Day 3)**
- Subject: "What Our Customers Love Most"
- Product highlights with reviews
- Social proof elements
- Individual product cards

**Email #3: Last Chance (Day 7)**
- Subject: "Last Chance: Your 15% Off Ends Soon"
- Urgency-focused design
- Discount expiration reminder
- Quick category links

**Brand Colors Used:**
- Black: #080808
- Charcoal: #1A1A1A
- Rose Gold: #E6B7AD

### 3. EmailCampaign Entity

Tracks every email sent with:
- Recipient email & name
- Customer segment
- Email number (1, 2, or 3)
- Sent date
- Open tracking (opened, opened_date)
- Click tracking (clicked, clicked_date)
- Conversion tracking (converted, order_id, revenue)
- Delivery status (sent, delivered, bounced, failed)

### 4. Campaign Dashboard (/email-campaign)

Admin dashboard featuring:
- **Real-time metrics:**
  - Total customers by segment
  - Emails sent
  - Open rate
  - Revenue generated
- **Segment cards** with send buttons
- **Email sequence timeline**
- **Performance table** by segment
- **Quick actions** for refreshing data

### 5. Automated Follow-ups

Two scheduled automations created:

**Automation 1:** "Email Campaign - Send Follow-up #2"
- Runs daily at 10:00 AM (user timezone)
- Sends Email #2 to customers who received Email #1 three days ago
- Automatically excludes those who already received Email #2

**Automation 2:** "Email Campaign - Send Follow-up #3"
- Runs daily at 10:00 AM (user timezone)
- Sends Email #3 to customers who received Email #1 seven days ago
- Creates urgency with expiration messaging

---

## How to Use

### Step 1: Access the Dashboard

Navigate to: `/email-campaign`

This is an admin-only page. You'll see:
- Customer segment counts
- Campaign metrics (once emails are sent)
- Send buttons for each segment

### Step 2: Import Customer Data

Click **"Refresh Customer Data"** to fetch latest customers from Shopify.

This will show you:
- Previous Purchasers: [count]
- Email Subscribers: [count]
- Abandoned Cart: [count]

### Step 3: Send Email #1

Click **"Send Email #1"** on any segment card.

This will:
- Send the Relaunch Announcement email
- Personalize with customer names
- Track all opens and clicks
- Log to EmailCampaign entity

**Recommended order:**
1. Start with "Previous Purchasers" (highest conversion potential)
2. Then "Email Subscribers"
3. Finally "Abandoned Cart"

### Step 4: Monitor Performance

The dashboard automatically refreshes every 30 seconds.

**Key metrics to watch:**
- **Open Rate:** Industry average is 21%. Aim for 25%+
- **Click Rate:** Industry average is 2-3%. Aim for 4%+
- **Conversion Rate:** Track how many use WELCOME15
- **Revenue:** Total attributed sales

### Step 5: Automated Follow-ups

Email #2 and #3 are sent automatically:
- **Email #2:** 3 days after Email #1
- **Email #3:** 7 days after Email #1

No manual action needed. Automations run daily at 10 AM.

---

## Email Tracking

### How Opens Are Tracked

Each email includes an invisible tracking pixel:
```html
<img src="https://your-app.base44.app/functions/trackEmail?email_id={id}&type=open" width="1" height="1" />
```

When the email is opened, the pixel loads and updates the EmailCampaign record.

### How Clicks Are Tracked

All links use tracked redirects:
```
https://your-app.base44.app/functions/trackEmail?email_id={id}&type=click&link={encoded_url}
```

Clicks are logged before redirecting to the actual destination.

### Conversion Tracking

To track purchases from emails:

1. **Manual method:** Update EmailCampaign records when orders come in
   ```javascript
   await base44.entities.EmailCampaign.update(emailId, {
     converted: true,
     order_id: shopifyOrderId,
     revenue: orderTotal,
   });
   ```

2. **Automated method:** Create automation on Order entity
   - Trigger: Order created
   - Match customer_email to EmailCampaign.recipient_email
   - Update campaign record with conversion data

---

## Compliance & Best Practices

### CAN-SPAM Compliance

✅ Physical address included in footer  
✅ Clear unsubscribe mechanism (Shopify handles this)  
✅ No deceptive subject lines  
✅ Accurate sender information  

### Email Marketing Best Practices

✅ **Segmentation:** Different messages for different customer types  
✅ **Personalization:** Customer names in greetings  
✅ **Mobile optimization:** All templates responsive  
✅ **Clear CTA:** Prominent "Shop Now" buttons  
✅ **Value proposition:** WELCOME15 discount prominent  
✅ **Brand consistency:** Torch Republic colors and voice  
✅ **Frequency capping:** Only 3 emails in 7 days  
✅ **Easy opt-out:** Shopify manages unsubscribes  

### Deliverability Tips

1. **Warm up gradually:** Don't send to all segments at once
2. **Monitor bounce rates:** Remove invalid emails
3. **Watch spam complaints:** Keep content relevant
4. **Test before sending:** Send test emails to yourself first
5. **Use consistent sending domain:** Shopify handles SPF/DKIM

---

## Metrics & KPIs

### Success Benchmarks

| Metric | Good | Great | Industry Average |
|--------|------|-------|------------------|
| Open Rate | 25%+ | 35%+ | 21% |
| Click Rate | 4%+ | 7%+ | 2.6% |
| Conversion Rate | 2%+ | 5%+ | 1-2% |
| Revenue per Email | $0.50+ | $1.00+ | $0.30 |

### Calculate ROI

```
Revenue from Campaign
- Email Platform Costs
- Discount Value (15% of orders)
= Net Profit

ROI = (Net Profit / Campaign Cost) × 100
```

---

## Troubleshooting

### Emails Not Sending

1. Check SHOPIFY_ADMIN_TOKEN secret is set
2. Verify SendEmail integration is configured
3. Check function logs for errors
4. Ensure EmailCampaign entity exists

### Tracking Not Working

1. Verify trackEmail function is deployed
2. Check email_id matches EmailCampaign records
3. Ensure automations are active
4. Review function logs for errors

### Low Open Rates

1. Test subject lines (A/B test if possible)
2. Check spam folder placement
3. Verify from-name is recognizable
4. Clean email list of inactive subscribers

### High Bounce Rates

1. Remove invalid emails from Shopify
2. Verify email format validation
3. Check for typos in customer data
4. Consider email verification service

---

## Next Steps

### Immediate Actions

1. ✅ Review email templates in lib/emailTemplates.js
2. ✅ Test send to your own email first
3. ✅ Access dashboard at /email-campaign
4. ✅ Import customer data from Shopify
5. ✅ Send Email #1 to "Previous Purchasers" segment

### Week 1

- Monitor open/click rates daily
- Track WELCOME15 usage in Shopify
- Review campaign metrics dashboard
- Prepare for Email #2 auto-send (Day 3)

### Week 2

- Email #3 sends automatically (Day 7)
- Analyze full campaign performance
- Calculate total revenue generated
- Plan follow-up campaigns for non-converters

### Future Campaigns

Consider creating:
- **Win-back campaign** for non-openers (30 days later)
- **VIP campaign** for high-value customers
- **Product launch campaigns** for new blends
- **Seasonal campaigns** (holidays, summer, etc.)

---

## Files Created

```
/functions/
  ├── fetchShopifyCustomers.js       - Import Shopify customers
  ├── sendRelaunchEmail.js           - Send individual emails
  ├── sendBatchRelaunchEmails.js     - Batch email sending
  ├── sendEmail2Followup.js          - Email #2 automation
  ├── sendEmail3LastChance.js        - Email #3 automation
  ├── getCampaignMetrics.js          - Analytics dashboard
  └── trackEmail.js                  - Open/click tracking

/entities/
  └── EmailCampaign.json             - Campaign tracking entity

/lib/
  └── emailTemplates.js              - HTML email templates

/pages/
  └── EmailCampaignDashboard.jsx     - Admin dashboard

/automations/
  ├── Email Campaign - Send Follow-up #2
  └── Email Campaign - Send Follow-up #3
```

---

## Support

For questions or issues:
1. Check function logs in Dashboard → Code → Functions
2. Review EmailCampaign entity records
3. Verify Shopify customer data import
4. Test with small segment first

**Campaign launched successfully! 🎉**