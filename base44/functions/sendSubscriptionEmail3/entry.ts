import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { email3Manage, BRAND } from '../../shared/subscriptionEmailTemplates.ts';
import { secrets } from 'base44:runtime';

// ── Email 3: Your Subscription, Your Routine ────────────────────────────────
// Scheduled daily. Finds customers who received Email 1 and whose next renewal
// is approximately 7 days away.
//
// Trigger logic:
//   Preferred: 7 days before the customer's actual next renewal charge
//   Calculation: next_renewal = order_date + 28 days (verified 4-week selling plan)
//                send_date = next_renewal - 7 days = order_date + 21 days
//   Documented: The Shopify subscription provider does not expose a next_billing_date
//   field in the Order entity. The send date is calculated from the verified
//   selling-plan interval of 4 weeks (28 days). If the selling plan interval
//   changes, update SELLING_PLAN_INTERVAL_DAYS accordingly.

const SELLING_PLAN_INTERVAL_DAYS = 28; // Verified: "Every 4 weeks" selling plan
const DAYS_BEFORE_RENEWAL_TO_SEND = 7;

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);

    // Verify admin access (scheduled task)
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // ── 1. Find all Email 1 events that are sent ────────────────────────────
    const email1Events = await base44.asServiceRole.entities.SubscriptionEmailEvent.filter({
      template_id: 'subscription_welcome_v1',
      email_number: 1,
      delivery_status: 'sent',
    });

    if (!email1Events || email1Events.length === 0) {
      return Response.json({ success: true, message: 'No pending Email 3 recipients', sent: 0 });
    }

    const now = new Date();
    // The target send window: 21 days after order_date (order_date + 28 - 7)
    // We send when we're within 1 day of the target (to catch daily runs)
    const sendWindowStart = new Date(0);
    const sendWindowEnd = new Date(0);

    let sentCount = 0;
    let skippedCount = 0;

    for (const event of email1Events) {
      try {
        // ── 2. Check if Email 3 was already sent ─────────────────────────────
        const email3Existing = await base44.asServiceRole.entities.SubscriptionEmailEvent.filter({
          order_id: event.order_id,
          email_number: 3,
        });

        if (email3Existing && email3Existing.length > 0) {
          skippedCount++;
          continue;
        }

        // ── 3. Fetch the Order to get the order date ────────────────────────
        const order = await base44.asServiceRole.entities.Order.get(event.order_id);
        if (!order) {
          skippedCount++;
          continue;
        }

        // ── 4. Calculate the target send date ────────────────────────────────
        // next_renewal_date = order_date + SELLING_PLAN_INTERVAL_DAYS
        // target_send_date = next_renewal_date - DAYS_BEFORE_RENEWAL_TO_SEND
        // We send when: now >= target_send_date
        const orderDate = new Date(order.order_date || event.sent_time);
        const nextRenewalDate = new Date(orderDate.getTime() + SELLING_PLAN_INTERVAL_DAYS * 24 * 60 * 60 * 1000);
        const targetSendDate = new Date(nextRenewalDate.getTime() - DAYS_BEFORE_RENEWAL_TO_SEND * 24 * 60 * 60 * 1000);

        // Only send if we're at or past the target send date
        if (now < targetSendDate) {
          skippedCount++;
          continue;
        }

        // Don't send if the renewal has already passed (too late)
        if (now > nextRenewalDate) {
          skippedCount++;
          continue;
        }

        // ── 5. Create the event record (pending) ─────────────────────────────
        const idempotencyKey = `sub_email3_v1_${event.order_id}`;
        const eventRecord = await base44.asServiceRole.entities.SubscriptionEmailEvent.create({
          customer_email: event.customer_email,
          customer_name: event.customer_name,
          customer_id: event.customer_id || '',
          order_id: event.order_id,
          shopify_order_id: event.shopify_order_id || '',
          template_id: 'subscription_manage_v1',
          email_number: 3,
          idempotency_key: idempotencyKey,
          subscription_contract_id: order.roastify_order_id || '', // repurposed if subscription contract ID becomes available
          selling_plan_id: SELLING_PLAN_INTERVAL_DAYS.toString(),
          scheduled_time: targetSendDate.toISOString(),
          delivery_status: 'pending',
        });

        // ── 6. Send the email ───────────────────────────────────────────────
        const { subject, previewText, html } = email3Manage(event.customer_name);

        const resendResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${secrets.get('RESEND_API_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `Torch Republic <${BRAND.supportEmail}>`,
            to: [event.customer_email],
            subject: subject,
            html: html,
            reply_to: BRAND.supportEmail,
            tags: [{ name: 'sequence', value: 'subscription_welcome' }, { name: 'email_number', value: '3' }],
          }),
        });

        const result = await resendResp.json();

        if (!resendResp.ok) {
          await base44.asServiceRole.entities.SubscriptionEmailEvent.update(eventRecord.id, {
            delivery_status: 'failed',
            failure_reason: `Resend API ${resendResp.status}: ${JSON.stringify(result)}`,
            sent_time: new Date().toISOString(),
          });
          continue;
        }

        // ── 7. Update event record (sent) and mark sequence complete ────────
        await base44.asServiceRole.entities.SubscriptionEmailEvent.update(eventRecord.id, {
          delivery_status: 'sent',
          sent_time: new Date().toISOString(),
          provider_message_id: result.id || '',
          sequence_complete: true,
        });

        // Mark the Email 1 event as sequence complete too
        await base44.asServiceRole.entities.SubscriptionEmailEvent.update(event.id, {
          sequence_complete: true,
        });

        sentCount++;

        // Rate limit
        await new Promise(resolve => setTimeout(resolve, 300));

      } catch (error) {
        console.error(`Failed to send Email 3 for order ${event.order_id}:`, error.message);
        skippedCount++;
      }
    }

    return Response.json({
      success: true,
      sent: sentCount,
      skipped: skippedCount,
      total_eligible: email1Events.length,
    });

  } catch (error) {
    return Response.json({ error: error.message, success: false }, { status: 500 });
  }
}