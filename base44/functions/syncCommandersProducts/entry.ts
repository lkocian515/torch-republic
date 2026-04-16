import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'torch-republic.com';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const user = await base44.auth.me();
  if (user?.role !== 'admin') {
    return Response.json({ error: 'Admin only' }, { status: 403 });
  }

  // Fetch from Shopify
  const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query: `{
        collection(handle: "commanders-series-1") {
          title
          handle
          products(first: 20) {
            edges {
              node {
                title
                handle
                description
                images(first: 2) { edges { node { url } } }
                variants(first: 1) {
                  edges {
                    node {
                      price { amount }
                      compareAtPrice { amount }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      }`
    }),
  });

  const { data } = await res.json();
  const products = data?.collection?.products?.edges || [];

  if (products.length === 0) {
    return Response.json({ error: 'No products found in commanders-series-1 collection' }, { status: 404 });
  }

  // Delete existing commanders products first to avoid duplicates
  const existing = await base44.asServiceRole.entities.Product.filter({ category: 'coffee' }, '', 100);
  const commanderIds = existing
    .filter(p => p.title && p.title.toLowerCase().includes("commander's series"))
    .map(p => p.id);

  for (const id of commanderIds) {
    await base44.asServiceRole.entities.Product.delete(id);
  }

  // Insert fresh from Shopify
  const inserted = [];
  for (const { node } of products) {
    const variant = node.variants?.edges?.[0]?.node;
    const images = node.images?.edges || [];
    const imageUrl = images[0]?.node?.url || '';
    const imageUrl2 = images[1]?.node?.url || '';

    const record = await base44.asServiceRole.entities.Product.create({
      title: node.title,
      shopify_handle: node.handle,
      description: node.description || '',
      price: parseFloat(variant?.price?.amount || '20'),
      compare_at_price: variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null,
      image_url: imageUrl,
      image_url_2: imageUrl2,
      category: 'coffee',
      collection: 'founders', // closest existing enum — commanders not in enum yet
      in_stock: variant?.availableForSale !== false,
      featured: false,
      on_sale: false,
    });
    inserted.push({ title: node.title, handle: node.handle, image: imageUrl });
  }

  return Response.json({ synced: inserted.length, products: inserted });
});