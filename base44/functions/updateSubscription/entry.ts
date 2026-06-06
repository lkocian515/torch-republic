import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { action, contractId, intervalCount, interval } = await req.json();
    // action: 'pause' | 'resume' | 'skip' | 'frequency'

    const token = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
    const shop = 'torch-republic.myshopify.com';
    const gid = contractId.startsWith('gid://') ? contractId : `gid://shopify/SubscriptionContract/${contractId}`;

    let mutation = '';
    let variables = {};

    if (action === 'pause') {
      mutation = `mutation { subscriptionContractPause(subscriptionContractId: "${gid}") { contract { id status } userErrors { field message } } }`;
    } else if (action === 'resume') {
      mutation = `mutation { subscriptionContractActivate(subscriptionContractId: "${gid}") { contract { id status } userErrors { field message } } }`;
    } else if (action === 'skip') {
      // Skip next billing cycle by updating the next billing date
      mutation = `mutation subscriptionContractSetNextBillingDate($contractId: ID!, $date: DateTime!) {
        subscriptionContractSetNextBillingDate(contractId: $contractId, date: $date) {
          contract { id nextBillingDate }
          userErrors { field message }
        }
      }`;
      // Add one interval to next billing date
      const nextDate = new Date();
      if (interval === 'week') nextDate.setDate(nextDate.getDate() + 7 * (intervalCount || 1));
      else if (interval === 'month') nextDate.setMonth(nextDate.getMonth() + (intervalCount || 1));
      else nextDate.setDate(nextDate.getDate() + 30);
      variables = { contractId: gid, date: nextDate.toISOString() };
    } else if (action === 'frequency') {
      // Update delivery policy
      mutation = `mutation subscriptionContractUpdate($contractId: ID!) {
        subscriptionContractUpdate(contractId: $contractId) {
          draft { id }
          userErrors { field message }
        }
      }`;
      variables = { contractId: gid };
      // For frequency changes, we use subscriptionDraftUpdate after getting the draft
      const draftRes = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `mutation { subscriptionContractUpdate(contractId: "${gid}") { draft { id } userErrors { field message } } }`
        })
      });
      const draftData = await draftRes.json();
      const draftId = draftData?.data?.subscriptionContractUpdate?.draft?.id;
      if (!draftId) return Response.json({ error: 'Could not get draft for update', details: draftData }, { status: 500 });

      const updateRes = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `mutation subscriptionDraftUpdate($draftId: ID!, $input: SubscriptionDraftInput!) {
            subscriptionDraftUpdate(draftId: $draftId, input: $input) {
              draft { id }
              userErrors { field message }
            }
          }`,
          variables: {
            draftId,
            input: { deliveryPolicy: { interval: interval.toUpperCase(), intervalCount: parseInt(intervalCount) } }
          }
        })
      });
      const updateData = await updateRes.json();

      // Commit the draft
      await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
        method: 'POST',
        headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `mutation { subscriptionDraftCommit(draftId: "${draftId}") { contract { id } userErrors { field message } } }` })
      });

      return Response.json({ success: true });
    }

    const res = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables })
    });
    const data = await res.json();

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});