/* global Deno */
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

async function storefrontQuery(query, variables = {}) {
  const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

Deno.serve(async () => {
  // Fetch all products via Storefront API (paginated)
  let allProducts = [];
  let cursor = null;
  let hasNext = true;

  while (hasNext) {
    const afterClause = cursor ? `, after: "${cursor}"` : '';
    const data = await storefrontQuery(`{
      products(first: 250${afterClause}) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            title
            handle
            productType
            images(first: 1) {
              edges { node { url } }
            }
          }
        }
      }
    }`);

    const edges = data?.data?.products?.edges || [];
    allProducts = allProducts.concat(edges.map(e => ({
      title: e.node.title,
      handle: e.node.handle,
      productType: e.node.productType,
      firstImage: e.node.images?.edges?.[0]?.node?.url || null,
    })));

    hasNext = data?.data?.products?.pageInfo?.hasNextPage || false;
    cursor = data?.data?.products?.pageInfo?.endCursor || null;
  }

  const podProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes('pod') ||
    p.handle.toLowerCase().includes('pod') ||
    p.productType.toLowerCase().includes('pod')
  );

  const washingtonProducts = allProducts.filter(p =>
    p.title.toLowerCase().includes('washington') ||
    p.handle.toLowerCase().includes('washington')
  );

  return Response.json({
    totalProducts: allProducts.length,
    podProducts,
    washingtonProducts,
  });
});