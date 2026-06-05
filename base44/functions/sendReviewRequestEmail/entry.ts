import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Verify admin access
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Calculate date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoStr = sevenDaysAgo.toISOString();

    // Fetch orders from 7 days ago that haven't been sent review emails
    const orders = await base44.entities.Order.filter({
      review_email_sent: false
    });

    const eligibleOrders = orders.filter(order => {
      const orderDate = new Date(order.order_date);
      return orderDate <= sevenDaysAgo;
    });

    const results = [];

    for (const order of eligibleOrders) {
      try {
        // Send review request email
        await base44.integrations.Core.SendEmail({
          to: order.customer_email,
          subject: `How's Your ${order.product_title}? We'd Love Your Review!`,
          body: `Hi ${order.customer_name || 'there'},

It's been a week since you ordered ${order.product_title} from Torch Republic. We hope you're loving it! ☕

Your feedback helps us improve and helps others discover the perfect mushroom coffee blend. Would you mind taking 2 minutes to share your experience?

👉 Leave Your Review Here: ${req.headers.get('origin') || 'https://torchrepublic.com'}/Reviews

As a thank you, use code REVIEW15 for 15% off your next order.

Thank you for being part of the Torch Republic community!

Stay lit,
The Torch Republic Team

---
P.S. If you have any questions or concerns, just reply to this email - we're here to help!`
        });

        // Mark email as sent
        await base44.entities.Order.update(order.id, {
          review_email_sent: true,
          review_email_sent_date: new Date().toISOString()
        });

        results.push({
          order_id: order.order_id,
          customer_email: order.customer_email,
          status: 'sent'
        });
      } catch (emailError) {
        results.push({
          order_id: order.order_id,
          customer_email: order.customer_email,
          status: 'failed',
          error: emailError.message
        });
      }
    }

    return Response.json({
      total_orders: orders.length,
      eligible_orders: eligibleOrders.length,
      emails_sent: results.filter(r => r.status === 'sent').length,
      emails_failed: results.filter(r => r.status === 'failed').length,
      results
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});