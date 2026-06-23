/**
 * sendSpinWheelEmail — Idempotent delivery of the WELCOME15 welcome email to a
 * visitor who unlocked the spin-wheel discount.
 *
 * Idempotency: the caller passes `source: 'welcome_spin_wheel'` and an optional
 * `session_id`. We record the delivery against the EmailSubscriber row's
 * `description` field so repeated clicks or page refreshes do not re-send.
 *
 * - If the email has already been sent for this session/source, returns
 *   { sent: false, reason: 'already_sent' } and does NOT re-send.
 * - If the EmailSubscriber row does not yet exist (e.g. race), creates it.
 * - Reuses the welcome email template (kept consistent with sendWelcomeEmail).
 *
 * Consent: the caller asserts the visitor explicitly submitted their email and
 * the marketing-consent language was displayed. We do not subscribe visitors
 * who declined required consent; that guard lives in the frontend.
 */
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SOURCE_TAG = 'welcome_spin_wheel';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const email = (body.email || '').toString().trim().toLowerCase();
    const discount_code = (body.discount_code || 'WELCOME15').toString();
    const session_id = (body.session_id || '').toString();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ sent: false, reason: 'invalid_email' }, { status: 200 });
    }

    // ── 1) Find existing subscriber (idempotency relies on this) ─────────────────
    const existing = await base44.asServiceRole.entities.EmailSubscriber.filter({ email });

    const idempotencyMarker = `email_sent:${SOURCE_TAG}${session_id ? ':' + session_id : ''}`;

    if (existing && existing.length) {
      const row = existing[0];
      const desc = row.description || '';

      // Already sent the wheel email for this session/source? Skip.
      if (desc.includes(idempotencyMarker)) {
        return Response.json({ sent: false, reason: 'already_sent' }, { status: 200 });
      }

      // Update source if it's still an older popup source, and stamp the marker.
      const newDescription = [desc, idempotencyMarker].filter(Boolean).join(' | ');
      const updatePatch = { description: newDescription };
      if (row.source !== SOURCE_TAG) {
        // Keep the original source for attribution history; note the wheel in description.
        updatePatch.description = `${desc ? desc + ' | ' : ''}spin_wheel_unlock`;
      }
      updatePatch.description = `${updatePatch.description} | ${idempotencyMarker}`;
      try {
        await base44.asServiceRole.entities.EmailSubscriber.update(row.id, updatePatch);
      } catch (_) { /* non-fatal — email still sends */ }
    } else {
      // Create a new subscriber row with source + idempotency marker.
      await base44.asServiceRole.entities.EmailSubscriber.create({
        email,
        source: SOURCE_TAG,
        discount_code,
        description: idempotencyMarker,
      });
    }

    // ── 2) Send the branded welcome email ───────────────────────────────────────
    // Resilient: the code is also revealed in-UI, so an email delivery failure
    // must not break the unlock flow. We record the subscriber regardless, and
    // report the email send status separately. Idempotency (already_sent above)
    // prevents repeated sends across clicks/refreshes within the same session.
    const body_html = buildEmail({ code: discount_code });
    let email_ok = false;
    let email_error = null;
    try {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: email,
        subject: 'Your 15% Torch Republic Welcome Offer',
        body: body_html,
        from_name: 'Torch Republic Coffee Co.',
      });
      email_ok = true;
    } catch (err) {
      email_error = err.message || 'send_failed';
    }

    return Response.json({ sent: email_ok, email_error }, { status: 200 });
  } catch (error) {
    return Response.json({ sent: false, reason: error.message || 'unknown_error' }, { status: 200 });
  }
});

/**
 * Branded welcome email body.
 * Truthful terms: 15% off first eligible order, no fake deadline, real
 * unsubscribe path via the platform's standard SendEmail footer, real links.
 */
function buildEmail({ code }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#080808;font-family:'Inter',Arial,sans-serif;color:#F5EFE6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td align="center" style="padding-bottom:32px;">
          <p style="margin:0;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:rgba(230,183,173,0.5);font-family:monospace;">
            Torch Republic Coffee Co.
          </p>
        </td></tr>
        <tr><td style="background:#141210;border:1px solid rgba(230,183,173,0.15);padding:40px 36px;">
          <p style="margin:0 0 12px;font-size:13px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(230,183,173,0.6);font-family:monospace;">
            Your first ritual is waiting.
          </p>
          <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;color:#F5EFE6;line-height:1.2;">
            Welcome to the Ritual. 🔥
          </h1>
          <p style="margin:0 0 20px;font-size:15px;color:rgba(210,195,175,0.75);line-height:1.75;">
            Thank you for joining Torch Republic. As a welcome gift, here is <strong style="color:#E6B7AD;">15% off your first eligible order</strong>.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td align="center" style="background:#0A0807;border:1px dashed rgba(230,183,173,0.4);padding:18px;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(230,183,173,0.5);font-family:monospace;">Your welcome code</p>
              <p style="margin:0;font-size:26px;font-weight:700;letter-spacing:0.15em;color:#E6B7AD;font-family:monospace;">${code}</p>
            </td></tr>
          </table>
          <p style="margin:0 0 24px;font-size:13px;color:rgba(210,195,175,0.6);line-height:1.7;">
            Enter this code during Shopify checkout. The offer applies to your first eligible order and cannot be combined with other discounts. Subscription and bundle eligibility depends on the product.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr><td align="center">
              <a href="https://torchrepublic.com/shop" style="display:inline-block;background:#E6B7AD;color:#080808;font-size:11px;font-family:monospace;letter-spacing:0.25em;text-transform:uppercase;font-weight:700;padding:16px 44px;text-decoration:none;">Shop Best Sellers →</a>
            </td></tr>
          </table>
          <p style="margin:0 0 8px;font-size:13px;color:rgba(210,195,175,0.5);line-height:1.7;">
            Not sure where to start? Try our <a href="https://torchrepublic.com/quiz" style="color:#E6B7AD;text-decoration:none;">Blend Quiz</a> or explore the <a href="https://torchrepublic.com/build-your-ritual" style="color:#E6B7AD;text-decoration:none;">Build Your Ritual</a> builder.
          </p>
        </td></tr>
        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:rgba(230,183,173,0.3);font-family:monospace;letter-spacing:0.1em;">
            © 2026 Torch Republic Coffee Co. ·
            <a href="https://torchrepublic.com/privacy-policy" style="color:rgba(230,183,173,0.3);text-decoration:none;">Privacy</a>
            &nbsp;·&nbsp;
            <a href="https://torchrepublic.com/contact" style="color:rgba(230,183,173,0.3);text-decoration:none;">Contact</a>
          </p>
          <p style="margin:8px 0 0;font-size:10px;color:rgba(230,183,173,0.2);font-family:monospace;">
            You joined the Torch Republic list from the spin-wheel welcome offer. Reply to any email to unsubscribe.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();
}