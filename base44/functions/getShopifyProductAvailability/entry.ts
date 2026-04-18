/* global Deno */
/**
 * Returns live availability for a product handle from the Shopify Storefront API.
 * Used by the frontend to show accurate in-stock / sold-out status.
 */
const STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOP_DOMAIN = 'libertees-for-all.myshopify.com';

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const handles = Array.isArray(body.handles) ? body.handles : (body.handle ? [body.handle] : []);

    if (handles.length === 0) {
      return Response.json({ error: 'Missing handle or handles array' }, { status: 400 });
    }

    // Build a query for up to 20 handles at once
    const fragment = `
      fragment ProductAvail on Product {
        handle
        availableForSale
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              priceV2 { amount }
            }
          }
        }
      }
    `;

    const aliases = handles.map((h, i) => `
      p${i}: productByHandle(handle: "${h}") { ...ProductAvail }
    `).join('\n');

    const query = `query { ${aliases} } ${fragment}`;

    const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();
    if (json.errors) {
      console.log('Storefront errors:', JSON.stringify(json.errors));
    }

    // Build result map: handle → { availableForSale, firstAvailableVariantId, variants }
    const result = {};
    handles.forEach((handle, i) => {
      const p = json?.data?.[`p${i}`];
      if (!p) { result[handle] = { availableForSale: null, error: 'not found' }; return; }
      const variants = p.variants?.edges?.map(e => e.node) || [];
      const firstAvailable = variants.find(v => v.availableForSale);
      result[handle] = {
        availableForSale: p.availableForSale,
        firstAvailableVariantId: firstAvailable?.id || null,
        variants: variants.map(v => ({ id: v.id, title: v.title, availableForSale: v.availableForSale, price: v.priceV2?.amount })),
      };
    });

    return Response.json({ products: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});