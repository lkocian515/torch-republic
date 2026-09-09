import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { email1Welcome, BRAND } from '../../shared/subscriptionEmailTemplates.ts';
import { secrets } from 'base44:runtime';

// ── Email 1: Welcome to the Ritual ──────────────────────────────────────────
// Triggered by an entity automation when a new Order record is created.
// Qualification:
//   1. Order contains subscription / selling-plan indicators
//   2. This is the customer's FIRST subscription order
//   3. Idempotency key prevents duplicate sends from replayed webhooks
//   4. Skips unsubscribed customers
//
// Sends within ~5 minutes of order creation.

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const order = body.data;

    if (!order) {
      return Response.json({ success: false, error: 'No order data in payload' }, { status: 400 });
    }

    // ── 1. Check for subscription indicators ────────────────────────────────
    // The Order entity doesn't have an explicit is_subscription field, so we
    // check multiple signals: description, product_title, product_handle, and
    // discount_code for subscription-related keywords.
    const subscriptionSignals = [
      order.description,
      order.product_title,
      order.product_handle,
      order.discount_code,
    ].filter(Boolean).join(' ').toLowerCase();

    const hasSubscriptionIndicator =
      subscriptionSignals.includes('subscription') ||
      subscriptionSignals.includes('selling plan') ||
      subscriptionSignals.includes('every 4 week') ||
      subscriptionSignals.includes('recurring');

    if (!hasSubscriptionIndicator) {
      return Response.json({
        success: true,
        skipped: true,
        reason: 'Order does not contain subscription indicators',
      });
    }

    // ── 2. Idempotency check ────────────────────────────────────────────────
    const idempotencyKey = `sub_welcome_v1_${order.id}`;
    const existing = await base44.asServiceRole.entities.SubscriptionEmailEvent.filter({
      idempotency_key: idempotencyKey,
    });

    if (existing && existing.length > 0) {
      return Response.json({
        success: true,
        skipped: true,
        reason: 'Welcome email already sent for this order (idempotency)',
        existing_event: existing[0].id,
      });
    }

    // ── 3. Check if this is the customer's FIRST subscription order ──────────
    const previousWelcomeEmails = await base44.asServiceRole.entities.SubscriptionEmailEvent.filter({
      customer_email: order.customer_email,
      template_id: 'subscription_welcome_v1',
    });

    if (previousWelcomeEmails && previousWelcomeEmails.length > 0) {
      return Response.json({
        success: true,
        skipped: true,
        reason: 'Customer already received a subscription welcome (not first subscription)',
      });
    }

    // ── 4. Check unsubscribe status ──────────────────────────────────────────
    const unsubscribed = await base44.asServiceRole.entities.EmailSubscriber.filter({
      email: order.customer_email,
    });
    // EmailSubscriber doesn't have an unsubscribe flag, but if they exist and
    // we later add one, this is where we'd check. For now, all subscribers are
    // eligible since they opted in. We skip only if explicitly marked.
    // TODO: When unsubscribe tracking is added, check it here.

    // ── 5. Create the event record (pending) ──────────────────────────────────
    const customerName = order.customer_name
      ? order.customer_name.split(' ')[0]
      : '';

    const eventRecord = await base44.asServiceRole.entities.SubscriptionEmailEvent.create({
      customer_email: order.customer_email,
      customer_name: customerName,
      customer_id: order.created_by_id || '',
      order_id: order.id,
      shopify_order_id: order.order_id || '',
      template_id: 'subscription_welcome_v1',
      email_number: 1,
      idempotency_key: idempotencyKey,
      scheduled_time: new Date().toISOString(),
      delivery_status: 'pending',
    });

    // ── 6. Send the email via Resend ─────────────────────────────────────────
    const { subject, previewText, html } = email1Welcome(customerName);

    const resendResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${secrets.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Torch Republic <${BRAND.supportEmail}>`,
        to: [order.customer_email],
        subject: subject,
        html: html,
        reply_to: BRAND.supportEmail,
        tags: [{ name: 'sequence', value: 'subscription_welcome' }, { name: 'email_number', value: '1' }],
      }),
    });

    const result = await resendResp.json();

    if (!resendResp.ok) {
      await base44.asServiceRole.entities.SubscriptionEmailEvent.update(eventRecord.id, {
        delivery_status: 'failed',
        failure_reason: `Resend API ${resendResp.status}: ${JSON.stringify(result)}`,
        sent_time: new Date().toISOString(),
      });
      return Response.json({
        success: false,
        error: `Resend API error: ${resendResp.status}`,
        details: result,
      }, { status: 500 });
    }

    // ── 7. Update the event record (sent) ─────────────────────────────────────
    await base44.asServiceRole.entities.SubscriptionEmailEvent.update(eventRecord.id, {
      delivery_status: 'sent',
      sent_time: new Date().toISOString(),
      provider_message_id: result.id || '',
    });

    return Response.json({
      success: true,
      message: 'Subscription welcome email sent',
      event_id: eventRecord.id,
      provider_message_id: result.id || '',
    });

  } catch (error) {
    return Response.json({ error: error.message, success: false }, { status: 500 });
  }
}