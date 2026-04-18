// Fetches products from a Shopify collection handle using Admin API
const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');
const SHOP_DOMAIN = 'torch-republic.myshopify.com';

async function getCollectionIdByHandle(handle) {
  const url = `https://${SHOP_DOMAIN}/admin/api/2024-01/custom_collections.json?handle=${handle}&limit=1`;
  const res = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.custom_collections?.length > 0) return data.custom_collections[0].id;

  // Try smart collections
  const url2 = `https://${SHOP_DOMAIN}/admin/api/2024-01/smart_collections.json?handle=${handle}&limit=1`;
  const res2 = await fetch(url2, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
      'Content-Type': 'application/json',
    }
  });
  if (!res2.ok) return null;
  const data2 = await res2.json();
  if (data2.smart_collections?.length > 0) return data2.smart_collections[0].id;

  return null;
}

async function getProductsByCollectionId(collectionId) {
  const url = `https://${SHOP_DOMAIN}/admin/api/2024-01/products.json?collection_id=${collectionId}&limit=250`;
  const res = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.products || [];
}

async function getProductsByTag(tag) {
  const url = `https://${SHOP_DOMAIN}/admin/api/2024-01/products.json?tag=${encodeURIComponent(tag)}&limit=250`;
  const res = await fetch(url, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
      'Content-Type': 'application/json',
    }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.products || [];
}

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const handle = body.handle;

    if (!handle) {
      return Response.json({ error: 'handle is required' }, { status: 400 });
    }

    // Try collection by handle first
    const collectionId = await getCollectionIdByHandle(handle);
    let raw = [];
    let source = 'none';

    if (collectionId) {
      raw = await getProductsByCollectionId(collectionId);
      source = `collection:${collectionId}`;
    } else {
      // Fallback: tag-based query
      raw = await getProductsByTag(handle);
      source = `tag:${handle}`;
    }

    const products = raw.map(p => ({
      title: p.title,
      handle: p.handle,
      price: parseFloat(p.variants?.[0]?.price || 0),
      compare_at_price: p.variants?.[0]?.compare_at_price ? parseFloat(p.variants[0].compare_at_price) : null,
      image_url: p.images?.[0]?.src || null,
      image_url_2: p.images?.[1]?.src || null,
      available: p.variants?.some(v => v.available) ?? true,
      product_type: p.product_type,
      tags: Array.isArray(p.tags) ? p.tags : (p.tags || '').split(',').map(t => t.trim()).filter(Boolean),
    }));

    return Response.json({ products, count: products.length, handle, source });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});