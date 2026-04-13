import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Fetch all apparel products
    const apparelCategories = ['t-shirts', 'hoodies-sweatshirts', 'tanks', 'hats', 'mugs-tumblers'];
    const allProducts = await base44.entities.Product.list('', 500);

    // Filter apparel with missing images
    const brokenProducts = allProducts.filter(p => 
      apparelCategories.includes(p.category) && 
      (!p.image_url || p.image_url.trim() === '')
    );

    console.log(`Found ${brokenProducts.length} apparel products with missing images`);

    // Delete them
    const deletePromises = brokenProducts.map(p => 
      base44.entities.Product.delete(p.id)
    );
    await Promise.all(deletePromises);

    return Response.json({
      success: true,
      deletedCount: brokenProducts.length,
      deletedProducts: brokenProducts.map(p => ({ id: p.id, title: p.title, category: p.category }))
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});