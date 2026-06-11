const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (_req) => {
  try {
    // Fetch products using GraphQL Admin API
    const query = `query {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            productType
            status
            vendor
            tags
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                  }
                  sku
                  available
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                }
              }
            }
          }
        }
      }
    }`;

    const res = await fetch(
      `https://${SHOP_DOMAIN}/admin/api/2024-10/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Admin GraphQL error:', res.status, errorText);
      return Response.json({
        error: `Admin API returned ${res.status}`,
        details: errorText.substring(0, 500),
      }, { status: 500 });
    }

    const data = await res.json();
    const products = data.data?.products?.edges?.map(e => ({
      id: e.node.id,
      title: e.node.title,
      handle: e.node.handle,
      productType: e.node.product_type,
      status: e.node.status,
      vendor: e.node.vendor,
      tags: e.node.tags,
      variant: e.node.variants?.edges?.[0]?.node ? {
        id: e.node.variants.edges[0].node.id,
        title: e.node.variants.edges[0].node.title,
        price: parseFloat(e.node.variants.edges[0].node.price.amount),
        currency: e.node.variants.edges[0].node.price.currency_code,
        compareAtPrice: e.node.variants.edges[0].node.compare_at_price?.amount ? parseFloat(e.node.variants.edges[0].node.compare_at_price.amount) : null,
        sku: e.node.variants.edges[0].node.sku,
        available: e.node.variants.edges[0].node.available,
      } : null,
      image: e.node.images?.edges?.[0]?.node?.src,
    })) || [];

    // Filter beverage products
    const beverageProducts = products.filter(p => 
      p.title.toLowerCase().includes('blend') ||
      p.title.toLowerCase().includes('coffee') ||
      p.title.toLowerCase().includes('matcha') ||
      p.title.toLowerCase().includes('rise') ||
      p.title.toLowerCase().includes('cap') ||
      p.title.toLowerCase().includes('mind') ||
      p.title.toLowerCase().includes('monk') ||
      p.title.toLowerCase().includes('oracle') ||
      p.title.toLowerCase().includes('bloom') ||
      p.handle.toLowerCase().includes('blend') ||
      p.handle.toLowerCase().includes('coffee') ||
      p.handle.toLowerCase().includes('matcha') ||
      p.handle.toLowerCase().includes('rise') ||
      p.handle.toLowerCase().includes('cap') ||
      p.handle.toLowerCase().includes('mind') ||
      p.handle.toLowerCase().includes('monk') ||
      p.handle.toLowerCase().includes('oracle') ||
      p.handle.toLowerCase().includes('bloom')
    );

    // Check for the variant IDs from shopifyCheckout.js
    const expectedVariantIds = [
      '49171204276476', // torchbearer
      '49171202375932', // ember-rise
      '49148262809852', // midnight-watch
      '49148263465212', // suncap-rise
      '49148263596284', // glowmind-clarity-blend
      '49148263760124', // mooncap-restore
      '49148261597436', // dreamcap-blend
      '49148263170300', // the-oracle-blend
      '49148263006460', // mystic-bloom-blend
      '49170574115068', // the-monk-matcha-blend
      '49170644402428', // the-ascendant-matcha-blend
      '49170572148988', // the-alchemist-matcha-blend
    ];

    const variantIdMap = new Map();
    beverageProducts.forEach(p => {
      if (p.variant?.id) {
        variantIdMap.set(p.handle, p.variant.id.toString());
      }
    });

    const foundIds = [];
    const missingIds = [];

    expectedVariantIds.forEach(id => {
      const found = Array.from(variantIdMap.values()).includes(id);
      if (found) {
        foundIds.push(id);
      } else {
        missingIds.push(id);
      }
    });

    return Response.json({
      totalProducts: products.length,
      beverageProducts: beverageProducts.length,
      beverageProducts: beverageProducts,
      variantIdMap: Object.fromEntries(variantIdMap),
      foundVariantIds: foundIds,
      missingVariantIds: missingIds,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});