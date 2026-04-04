import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

const SHOPIFY_STOREFRONT_TOKEN = Deno.env.get('SHOPIFY_STOREFRONT_TOKEN');
const SHOPIFY_ADMIN_TOKEN = Deno.env.get('SHOPIFY_ADMIN_TOKEN');

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    // Fetch all products from Shopify Admin API
    const shopifyRes = await fetch('https://torch-republic.myshopify.com/admin/api/2024-01/products.json?limit=250&status=active', {
      headers: { 'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN }
    });
    const { products: shopifyProducts } = await shopifyRes.json();

    // Filter for hoodies
    const hoodies = shopifyProducts.filter(p => 
      p.product_type?.toLowerCase().includes('hoodie') || 
      p.tags?.includes('hoodies') ||
      p.title?.toLowerCase().includes('hoodie')
    );

    let updated = 0;

    for (const shopifyProduct of hoodies) {
      // Get images - prefer ones showing person wearing
      const images = shopifyProduct.images || [];
      const primaryImage = images[0]?.src || shopifyProduct.featured_image;

      if (!primaryImage) continue;

      // Check if product exists in base44
      const existing = await base44.entities.Product.filter({
        shopify_handle: shopifyProduct.handle
      });

      const updateData = {
        title: shopifyProduct.title,
        shopify_handle: shopifyProduct.handle,
        category: 'hoodies',
        image_url: primaryImage,
        image_url_2: images[1]?.src || null,
        description: shopifyProduct.body_html?.replace(/<[^>]*>/g, '') || '',
        in_stock: shopifyProduct.status === 'active',
      };

      if (existing.length > 0) {
        // Update existing
        await base44.entities.Product.update(existing[0].id, updateData);
        updated++;
      } else {
        // Create new
        await base44.entities.Product.create({
          ...updateData,
          price: shopifyProduct.variants[0]?.price || 0,
        });
        updated++;
      }
    }

    return Response.json({ 
      success: true, 
      hoodiesFound: hoodies.length,
      updated,
      message: `Synced ${updated} hoodies and set primary images`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});