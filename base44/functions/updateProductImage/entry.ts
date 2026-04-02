import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { product_handle, image_url } = body;

    if (!product_handle || !image_url) {
      return Response.json({ error: 'Missing product_handle or image_url' }, { status: 400 });
    }

    // Find product by handle
    const products = await base44.asServiceRole.entities.Product.filter({ shopify_handle: product_handle });
    
    if (products.length === 0) {
      return Response.json({ error: `Product with handle "${product_handle}" not found` }, { status: 404 });
    }

    const product = products[0];
    
    // Update the product image
    await base44.asServiceRole.entities.Product.update(product.id, {
      image_url: image_url
    });

    return Response.json({ 
      success: true,
      product_id: product.id,
      product_title: product.title,
      new_image_url: image_url
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});