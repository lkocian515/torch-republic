import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const adminToken = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
    const shopDomain = 'torch-republic.myshopify.com';

    const storefrontToken = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
    const shopDomain2 = 'torch-republic.myshopify.com';

    // Use Storefront API to search for women collection products
    const query = `{
      collection(handle: "women-of-the-republic") {
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              featuredImage { url }
              images(first: 3) { edges { node { url } } }
            }
          }
        }
      }
    }`;

    const res = await fetch(`https://${shopDomain2}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    return Response.json({ status: res.status, data });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});