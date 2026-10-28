import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const SHOP = 'torch-republic.myshopify.com';
const ADMIN_API = `https://${SHOP}/admin/api/2024-01`;

const adminGraphQL = async (token, query) => {
  const res = await fetch(`${ADMIN_API}/graphql.json`, {
    method: 'POST',
    headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(15000),
  });
  return res.json().catch(() => ({}));
};

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
    const cancelErrors = [];
    let cancelledCount = 0;

    // 1. Stop billing first. Every active subscription contract for this
    //    customer is cancelled before anything is deleted, so nobody is left
    //    with a live subscription attached to a deleted account.
    if (token && user.email) {
      const searchRes = await fetch(
        `${ADMIN_API}/customers/search.json?query=${encodeURIComponent(`email:${user.email}`)}&fields=id,email`,
        { headers: { 'X-Shopify-Access-Token': token }, signal: AbortSignal.timeout(15000) }
      );
      const searchJson = await searchRes.json().catch(() => ({}));
      const customer = (searchJson.customers || []).find(
        (c) => (c.email || '').toLowerCase() === user.email.toLowerCase()
      );

      if (customer) {
        const contractsJson = await adminGraphQL(
          token,
          `{ subscriptionContracts(first: 20, query: "customer_id:${customer.id}") { nodes { id status } } }`
        );
        const contracts = contractsJson?.data?.subscriptionContracts?.nodes || [];
        const live = contracts.filter((c) => c.status === 'ACTIVE' || c.status === 'PAUSED');

        for (const contract of live) {
          const cancelJson = await adminGraphQL(
            token,
            `mutation { subscriptionContractCancel(subscriptionContractId: "${contract.id}") { contract { id status } userErrors { field message } } }`
          );
          const userErrors = cancelJson?.data?.subscriptionContractCancel?.userErrors || [];
          const graphErrors = cancelJson?.errors || [];
          if (userErrors.length) cancelErrors.push(...userErrors.map((e) => e.message));
          else if (graphErrors.length) cancelErrors.push(...graphErrors.map((e) => e.message));
          else cancelledCount += 1;
        }
      }
    }

    if (cancelErrors.length) {
      // Nothing has been deleted yet: the customer keeps their data and their
      // rewards until billing is actually stopped.
      return Response.json(
        {
          error:
            'We could not cancel an active subscription, so nothing was deleted. Please contact support so we can cancel it and close your account safely.',
          subscription_errors: cancelErrors,
        },
        { status: 409 }
      );
    }

    // 2. Loyalty rewards, redeemed codes and points history
    await base44.asServiceRole.entities.LoyaltyPoints.deleteMany({ user_id: user.id });
    await base44.asServiceRole.entities.PointsActivity.deleteMany({ user_id: user.id });

    // 3. The account record itself
    await base44.asServiceRole.entities.User.delete(user.id);

    return Response.json({ success: true, subscriptions_cancelled: cancelledCount });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});