import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

/**
 * Admin function to update Women of the Republic product images in the DB.
 * Pass the correct image URLs for each product by exact handle.
 * 
 * Example payload:
 * {
 *   "abigail-adams-blend": {
 *     "image_url": "https://cdn.shopify.com/...",
 *     "image_url_2": "https://cdn.shopify.com/..."
 *   },
 *   "harriet-tubman-blend": {
 *     "image_url": "https://cdn.shopify.com/...",
 *     "image_url_2": "https://cdn.shopify.com/..."
 *   }
 * }
 */
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const results = {};

    const handles = ['abigail-adams-blend', 'harriet-tubman-blend'];

    for (const handle of handles) {
      // Find the DB record by exact handle
      const products = await base44.asServiceRole.entities.Product.filter({ shopify_handle: handle }, '', 1);
      const product = products[0];

      if (!product) {
        results[handle] = { error: 'Not found in DB' };
        continue;
      }

      // If caller provided new image URLs, update them
      if (body[handle]) {
        const update = {};
        if (body[handle].image_url) update.image_url = body[handle].image_url;
        if (body[handle].image_url_2 !== undefined) update.image_url_2 = body[handle].image_url_2;
        await base44.asServiceRole.entities.Product.update(product.id, update);
        results[handle] = { updated: true, id: product.id, ...update };
      } else {
        // Just read back current state
        results[handle] = {
          id: product.id,
          title: product.title,
          shopify_handle: product.shopify_handle,
          image_url: product.image_url,
          image_url_2: product.image_url_2,
        };
      }
    }

    return Response.json(results);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});