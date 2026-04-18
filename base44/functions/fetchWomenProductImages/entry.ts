import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

// Fetches women-of-the-republic products from Shopify using the same method
// that syncShopify uses (collections endpoint on torchrepublic.com).
// Also tries individual product pages by handle.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const results = {};

    // Method 1: Try women-of-the-republic collection
    try {
      const colRes = await fetch('https://torchrepublic.com/collections/women-of-the-republic/products.json?limit=50');
      console.log(`Collection status: ${colRes.status}`);
      if (colRes.ok) {
        const colData = await colRes.json();
        results.collection_method = {
          count: colData.products?.length || 0,
          products: (colData.products || []).map(p => ({
            handle: p.handle,
            title: p.title,
            first_image: p.images?.[0]?.src,
            second_image: p.images?.[1]?.src,
            all_images: p.images?.map(i => i.src),
          }))
        };
      } else {
        results.collection_method = { error: `HTTP ${colRes.status}` };
      }
    } catch (e) {
      results.collection_method = { error: e.message };
    }

    // Method 2: Try all-products listing (paginated)
    const handles = ['abigail-adams-blend', 'harriet-tubman-blend'];
    results.handle_lookup = {};
    
    for (let page = 1; page <= 3; page++) {
      try {
        const allRes = await fetch(`https://torchrepublic.com/products.json?limit=250&page=${page}`);
        if (!allRes.ok) break;
        const allData = await allRes.json();
        const products = allData.products || [];
        if (products.length === 0) break;
        
        for (const p of products) {
          if (handles.includes(p.handle)) {
            results.handle_lookup[p.handle] = {
              title: p.title,
              first_image: p.images?.[0]?.src,
              second_image: p.images?.[1]?.src,
              all_images: p.images?.map(i => i.src),
            };
          }
        }
      } catch (e) {
        break;
      }
    }

    // Method 3: Current DB state
    const dbProducts = await base44.asServiceRole.entities.Product.filter({ collection: 'women-of-the-republic' });
    results.db_current = dbProducts.map(p => ({
      title: p.title,
      handle: p.shopify_handle,
      image_url: p.image_url,
      image_url_2: p.image_url_2,
    }));

    return Response.json(results);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});