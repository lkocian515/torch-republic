import { createClientFromRequest } from 'npm:@base44/sdk@0.8.53';

// ── Weekly Best Sellers Digest (scheduled / service-role) ──────────────────
// Sends a weekly best-sellers email to all EmailSubscriber records plus
// Customer records that opted into email marketing. Uses asServiceRole
// throughout so it works when invoked from a scheduled workflow (no user
// session). Sends via Resend directly since recipients are not necessarily
// registered app users.

const SHOP_URL = 'https://torchrepublic.com';
const FROM_EMAIL = 'Torch Republic <info@torchrepublic.com>';

const PRODUCTS = [
  {
    name: 'Instant Classic Coffee',
    price: '$22.99',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/5e731e05f_file_00000000219c822f89492705850fcb90.png',
    link: `${SHOP_URL}/products/instant-classic-coffee`,
    blurb: 'Bold, smooth premium Arabica instant coffee. No pods, no machine, no bitterness.',
    accent: '#C06A38',
  },
  {
    name: 'Instant Mushroom Coffee',
    price: '$25.99',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/193fcf090_file_00000000d614822fbac1ab269ae9f60a.png',
    link: `${SHOP_URL}/products/instant-mushroom-coffee`,
    blurb: 'Smooth coffee blended with functional mushroom extracts for focused, balanced daily clarity.',
    accent: '#566047',
  },
];

function buildEmail(name: string): string {
  const greeting = name ? `Good morning ${name},` : 'Good morning,';
  const productCards = PRODUCTS.map((p) => `
    <tr><td align="center" style="padding: 0 20px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background: #141312; border: 1px solid rgba(230,183,173,0.12); border-radius: 8px;">
        <tr>
          <td width="40%" style="padding: 20px; vertical-align: middle;">
            <img src="${p.image}" alt="${p.name}" width="180" style="max-width: 100%; border-radius: 4px; display: block;">
          </td>
          <td width="60%" style="padding: 20px; vertical-align: middle;">
            <p style="font-family: Georgia, serif; font-size: 20px; color: ${p.accent}; margin: 0 0 8px;">${p.name}</p>
            <p style="font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(245,239,230,0.45); margin: 0 0 12px;">${p.price} &middot; 27 servings</p>
            <p style="font-family: Inter, -apple-system, sans-serif; font-size: 14px; line-height: 1.6; color: rgba(245,239,230,0.7); margin: 0 0 16px;">${p.blurb}</p>
            <a href="${p.link}" style="display: inline-block; background-color: ${p.accent}; color: #080808; font-family: 'Courier New', monospace; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; text-decoration: none; padding: 12px 24px; border-radius: 4px;">Shop Now</a>
          </td>
        </tr>
      </table>
    </td></tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Torch Republic — This Week's Best Sellers</title></head>
<body style="margin: 0; padding: 0; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #080808; color: #F5EFE6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080808;">
    <tr><td align="center" style="padding: 40px 20px 20px;">
      <p style="font-family: 'Courier New', monospace; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(230,183,173,0.5); margin: 0 0 10px;">Torch Republic Coffee Company</p>
      <p style="font-family: Georgia, serif; font-size: 28px; font-weight: 700; color: #F5EFE6; margin: 0;">This Week's Best Sellers</p>
    </td></tr>
    <tr><td align="center" style="padding: 10px 40px 30px; max-width: 560px;">
      <p style="font-family: Georgia, serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.8); margin: 0 0 10px;">${greeting}</p>
      <p style="font-family: Georgia, serif; font-size: 16px; line-height: 1.8; color: rgba(245,239,230,0.7); margin: 0;">Your weekly ritual picks are here. Premium instant coffee and mushroom coffee, ready in seconds with no machine required.</p>
    </td></tr>
    ${productCards}
    <tr><td align="center" style="padding: 10px 20px 40px;">
      <a href="${SHOP_URL}/shop" style="display: inline-block; background-color: #E6B7AD; color: #080808; font-family: 'Courier New', monospace; font-size: 11px; font-weight: bold; letter-spacing: 0.25em; text-transform: uppercase; text-decoration: none; padding: 16px 44px; border-radius: 4px;">Shop All Coffee</a>
    </td></tr>
    <tr><td align="center" style="padding: 30px 20px 40px; border-top: 1px solid rgba(230,183,173,0.08);">
      <p style="font-family: Inter, sans-serif; font-size: 12px; color: rgba(245,239,230,0.35); line-height: 1.6; margin: 0 0 8px;">Torch Republic Coffee Company &middot; Corpus Christi, Texas</p>
      <p style="font-family: 'Courier New', monospace; font-size: 8px; letter-spacing: 0.1em; color: rgba(245,239,230,0.2); margin: 0;">You're receiving this because you joined the Torch Republic list. Reply STOP to unsubscribe.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const apiKey = Deno.env.get('RESEND_API_KEY');

    if (!apiKey) {
      return Response.json({ success: false, error: 'RESEND_API_KEY not configured' }, { status: 500 });
    }

    // ── Collect recipients: EmailSubscriber + marketing-opted Customers ──
    const subscribers = await base44.asServiceRole.entities.EmailSubscriber.list();
    const customers = await base44.asServiceRole.entities.Customer.list();

    // Deduplicate by email; prefer Customer first_name for personalization
    const recipientMap = new Map();

    for (const sub of subscribers) {
      if (sub.email && !recipientMap.has(sub.email.toLowerCase())) {
        recipientMap.set(sub.email.toLowerCase(), { email: sub.email, name: '' });
      }
    }

    for (const cust of customers) {
      if (cust.email && cust.accepts_email_marketing) {
        const key = cust.email.toLowerCase();
        if (!recipientMap.has(key)) {
          recipientMap.set(key, { email: cust.email, name: cust.first_name || '' });
        } else if (!recipientMap.get(key).name && cust.first_name) {
          recipientMap.get(key).name = cust.first_name;
        }
      }
    }

    const recipients = Array.from(recipientMap.values());

    if (recipients.length === 0) {
      return Response.json({ success: true, sent: 0, message: 'No subscribers or marketing-opted customers found.' });
    }

    const results = { total: recipients.length, sent: 0, failed: 0, errors: [] as string[] };
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const subject = "This Week's Best Sellers from Torch Republic";
    const html = buildEmail('');

    for (const recipient of recipients) {
      try {
        const emailHtml = recipient.name ? buildEmail(recipient.name) : html;

        const resp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [recipient.email],
            subject,
            html: emailHtml,
          }),
        });

        if (!resp.ok) {
          const errText = await resp.text();
          throw new Error(`Resend ${resp.status}: ${errText}`);
        }

        // Log to EmailCampaign
        try {
          await base44.asServiceRole.entities.EmailCampaign.create({
            recipient_email: recipient.email,
            customer_name: recipient.name || '',
            segment: 'emailSubscribers',
            campaign_name: 'Weekly Best Sellers Digest',
            email_number: 1,
            sent_date: new Date().toISOString(),
            status: 'sent',
          });
        } catch (_) {}

        results.sent++;
        await delay(300); // rate limit
      } catch (error) {
        results.failed++;
        results.errors.push(`${recipient.email}: ${error.message}`);
        await delay(200);
      }
    }

    return Response.json({
      success: true,
      ...results,
      message: `Weekly digest: sent ${results.sent}/${results.total} emails`,
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});