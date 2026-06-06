import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const token = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
    const shop = 'torch-republic.myshopify.com';

    // Search subscriptions by email via Shopify Admin REST (subscriptions are via Shopify's customer search)
    const customerRes = await fetch(
      `https://${shop}/admin/api/2024-01/customers/search.json?query=email:${encodeURIComponent(user.email)}&fields=id,email,first_name,last_name`,
      { headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' } }
    );
    const customerData = await customerRes.json();
    const customer = customerData.customers?.[0];

    if (!customer) {
      return Response.json({ subscription: null, message: 'No account found for this email.' });
    }

    // Fetch subscriptions via Shopify Subscription Contracts (GraphQL)
    const gqlRes = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          subscriptionContracts(first: 5, query: "customer_id:${customer.id}") {
            nodes {
              id
              status
              nextBillingDate
              deliveryPolicy { interval intervalCount }
              lines(first: 5) {
                nodes { title quantity variantImage { url } currentPrice { amount currencyCode } }
              }
              originOrder { id name createdAt }
            }
          }
        }`
      })
    });

    const gqlData = await gqlRes.json();
    const contracts = gqlData?.data?.subscriptionContracts?.nodes || [];

    if (contracts.length === 0) {
      return Response.json({ subscription: null, message: 'No active subscription found.' });
    }

    const c = contracts[0];
    const line = c.lines?.nodes?.[0];

    return Response.json({
      subscription: {
        id: c.id,
        status: c.status?.toLowerCase() || 'active', // ACTIVE | PAUSED | CANCELLED
        nextDelivery: c.nextBillingDate ? new Date(c.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null,
        interval: c.deliveryPolicy?.interval?.toLowerCase() || 'month',
        intervalCount: c.deliveryPolicy?.intervalCount || 1,
        productTitle: line?.title || 'Mushroom Coffee Subscription',
        price: line?.currentPrice ? `$${parseFloat(line.currentPrice.amount).toFixed(2)} / ${c.deliveryPolicy?.interval?.toLowerCase() || 'month'}` : null,
        image: line?.variantImage?.url || null,
        orderId: c.originOrder?.name || null,
        orderDate: c.originOrder?.createdAt ? new Date(c.originOrder.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : null,
        rawId: c.id.replace('gid://shopify/SubscriptionContract/', ''),
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});