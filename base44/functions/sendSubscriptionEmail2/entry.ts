import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { email2Preparation, BRAND } from '../../shared/subscriptionEmailTemplates.ts';
import { secrets } from 'base44:runtime';

// ── Email 2: Master Your Morning ────────────────────────────────────────────
// Scheduled daily. Finds customers who received Email 1 and whose order was
// fulfilled 3+ days ago (or delivered), but haven't received Email 2 yet.
//
// Trigger logic:
//   Preferred: 3 days after the order's shipped_date (fulfillment event)
//   Fallback:  If no fulfillment data, 3 days after the order_date
//   Documented: This is a conservative fallback when Shopify delivery
//   webhooks are unavailable.

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
      return Response.json({ success: true, message: 'No pending Email 2 recipients', sent: 0 });
    }

    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    let sentCount = 0;
    let skippedCount = 0;

    for (const event of email1Events) {
      try {
        // ── 2. Check if Email 2 was already sent ─────────────────────────────
        const email2Existing = await base44.asServiceRole.entities.SubscriptionEmailEvent.filter({
          order_id: event.order_id,
          email_number: 2,
        });

        if (email2Existing && email2Existing.length > 0) {
          skippedCount++;
          continue;
        }

        // ── 3. Fetch the Order to check fulfillment status ───────────────────
        const order = await base44.asServiceRole.entities.Order.get(event.order_id);
        if (!order) {
          skippedCount++;
          continue;
        }

        // ── 4. Determine if enough time has passed ───────────────────────────
        // Preferred: 3 days after shipped_date
        // Fallback: 3 days after order_date
        const fulfillmentDate = order.shipped_date
          ? new Date(order.shipped_date)
          : order.fulfillment_status === 'shipped' || order.fulfillment_status === 'delivered'
            ? new Date(order.updated_date)
            : null;

        const referenceDate = fulfillmentDate || new Date(order.order_date);

        if (referenceDate > threeDaysAgo) {
          skippedCount++;
          continue;
        }

        // ── 5. Create the event record (pending) ─────────────────────────────
        const idempotencyKey = `sub_email2_v1_${event.order_id}`;
        const eventRecord = await base44.asServiceRole.entities.SubscriptionEmailEvent.create({
          customer_email: event.customer_email,
          customer_name: event.customer_name,
          customer_id: event.customer_id || '',
          order_id: event.order_id,
          shopify_order_id: event.shopify_order_id || '',
          template_id: 'subscription_prep_v1',
          email_number: 2,
          idempotency_key: idempotencyKey,
          scheduled_time: new Date().toISOString(),
          delivery_status: 'pending',
        });

        // ── 6. Send the email ───────────────────────────────────────────────
        const { subject, previewText, html } = email2Preparation(event.customer_name);

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
            tags: [{ name: 'sequence', value: 'subscription_welcome' }, { name: 'email_number', value: '2' }],
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

        // ── 7. Update event record (sent) ───────────────────────────────────
        await base44.asServiceRole.entities.SubscriptionEmailEvent.update(eventRecord.id, {
          delivery_status: 'sent',
          sent_time: new Date().toISOString(),
          provider_message_id: result.id || '',
        });

        sentCount++;

        // Rate limit
        await new Promise(resolve => setTimeout(resolve, 300));

      } catch (error) {
        console.error(`Failed to send Email 2 for order ${event.order_id}:`, error.message);
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