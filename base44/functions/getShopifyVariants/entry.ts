import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const handle = body.handle || 'faith-fish-earrings';
    const shopDomain = body.shop_domain || 'torchrepublic.myshopify.com';

    const token = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
    const query = `{
      product(handle: "${handle}") {
        id
        title
        handle
        variants(first: 5) {
          edges {
            node {
              id
              title
              price { amount }
              availableForSale
            }
          }
        }
      }
    }`;

    const url = `https://${shopDomain}/api/2024-01/graphql.json`;
    console.log('Fetching from:', url);
    console.log('Token (first 8 chars):', token?.substring(0, 8));

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    console.log('Shopify response status:', res.status);
    console.log('Shopify response:', JSON.stringify(data).substring(0, 500));
    return Response.json({ shop_domain: shopDomain, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});