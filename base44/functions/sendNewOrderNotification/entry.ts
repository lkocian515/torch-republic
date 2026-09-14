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

    const subject = `🛒 New Order — ${order.customer_name || order.customer_email}`;

    const html = `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0f0f0f; color: #f0ebe1; padding: 32px; border-radius: 8px;">
        <h2 style="color: #E6B7AD; margin: 0 0 20px;">New Order Received</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #999; width: 40%;">Order ID</td>
            <td style="padding: 8px 0;">${order.order_id || '—'}</td>
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
            <td style="padding: 8px 0; color: #999;">Product</td>
            <td style="padding: 8px 0;">${order.product_title || order.product_handle || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #999;">Date</td>
            <td style="padding: 8px 0;">${orderDate}</td>
          </tr>
        </table>
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