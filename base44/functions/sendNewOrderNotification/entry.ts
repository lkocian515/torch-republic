import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

// Get the admin email from the app's users
async function getAdminEmail(base44) {
  const users = await base44.asServiceRole.entities.User.filter({ role: 'admin' });
  return users?.[0]?.email || null;
}

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const order = body.data;

    const base44 = createClientFromRequest(req);
    const adminEmail = await getAdminEmail(base44);
    if (!adminEmail) {
      return Response.json({ error: 'No admin email found' }, { status: 400 });
    }

    const orderDate = order.order_date
      ? new Date(order.order_date).toLocaleString('en-US', { timeZone: 'America/Chicago' })
      : new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' });

    // Fetch line items for this order (multi-item orders use the OrderItem entity)
    let items: any[] = [];
    try {
      items = await base44.asServiceRole.entities.OrderItem.filter({ order_id: order.id });
    } catch (_) {
      // Legacy single-product orders may not have OrderItem records
    }

    const money = (n) =>
      typeof n === 'number' ? `$${n.toFixed(2)}` : '—';

    let itemsHtml: string;
    if (items && items.length > 0) {
      const rows = items
        .map(
          (it) => `
          <tr>
            <td style="padding: 8px 0; border-top: 1px solid #222;">${it.product_title || '—'}</td>
            <td style="padding: 8px 0; border-top: 1px solid #222; text-align: center;">${it.quantity || 1}</td>
            <td style="padding: 8px 0; border-top: 1px solid #222; text-align: right;">${money(it.unit_price)}</td>
            <td style="padding: 8px 0; border-top: 1px solid #222; text-align: right;">${money(it.line_total)}</td>
          </tr>`
        )
        .join('');
      itemsHtml = `
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 8px;">
          <tr style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
            <td style="padding: 4px 0;">Item</td>
            <td style="padding: 4px 0; text-align: center;">Qty</td>
            <td style="padding: 4px 0; text-align: right;">Price</td>
            <td style="padding: 4px 0; text-align: right;">Total</td>
          </tr>
          ${rows}
          <tr style="font-weight: bold; color: #E6B7AD;">
            <td colspan="3" style="padding: 12px 0 0; border-top: 1px solid #333; text-align: right;">Order Total</td>
            <td style="padding: 12px 0 0; border-top: 1px solid #333; text-align: right;">${money(order.total)}</td>
          </tr>
        </table>`;
    } else {
      itemsHtml = `
        <p style="margin: 8px 0 0; font-size: 14px;">${order.product_title || order.product_handle || '—'}</p>
        <p style="margin: 4px 0 0; font-size: 14px; color: #999;">Total: ${money(order.total)}</p>`;
    }

    const subject = `🛒 New Order — ${order.customer_name || order.customer_email}`;

    const html = `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0f0f0f; color: #f0ebe1; padding: 32px; border-radius: 8px;">
        <h2 style="color: #E6B7AD; margin: 0 0 20px;">New Order Received</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #999; width: 40%;">Order #</td>
            <td style="padding: 8px 0;">${order.internal_order_number || order.order_id || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #999;">Customer</td>
            <td style="padding: 8px 0;">${order.customer_name || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #999;">Email</td>
            <td style="padding: 8px 0;">${order.customer_email || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #999;">Date</td>
            <td style="padding: 8px 0;">${orderDate}</td>
          </tr>
        </table>
        <p style="margin: 24px 0 0; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Items Purchased</p>
        ${itemsHtml}
        <p style="margin-top: 24px; font-size: 12px; color: #555;">Torch Republic · Real-time order alert</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Torch Republic Orders <info@torchrepublic.com>',
        to: [adminEmail],
        subject,
        html,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      return Response.json({ error: result }, { status: 500 });
    }

    return Response.json({ success: true, email_id: result.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});