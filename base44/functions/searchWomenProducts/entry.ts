import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.com';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Get all products to find women series by any naming
    const query = `
      {
        products(first: 250) {
          edges { node { title handle productType images(first:1) { edges { node { url } } } } }
        }
      }
    `;

    const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    const products = data?.data?.products?.edges?.map(e => ({
      title: e.node.title,
      handle: e.node.handle,
      type: e.node.productType,
      image: e.node.images?.edges?.[0]?.node?.url,
    })).filter(p => 
      p.title.toLowerCase().includes('abigail') ||
      p.title.toLowerCase().includes('harriet') ||
      p.title.toLowerCase().includes('tubman') ||
      p.title.toLowerCase().includes('women') ||
      p.title.toLowerCase().includes('blend')
    ) || [];

    return Response.json({ products, count: products.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});