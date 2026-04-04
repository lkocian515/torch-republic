import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    // Products to move to hoodies-sweatshirts
    const hoodiesTitles = [
      'USA Flag Full-Zip Hoodie',
      'Patriotic Camouflage Cropped Hoodie',
      'Unapologetic Patriot Hoodie',
      'Classic Black & White Letterman Jacket',
      'Patriot Crewneck Sweatshirt',
      '1776 Party Sweatshirt',
    ];

    // Fetch all products
    const allProducts = await base44.entities.Product.list('', 500);

    let updated = 0;
    const results = [];

    for (const title of hoodiesTitles) {
      // Find products matching title (partial match for flexibility)
      const matching = allProducts.filter(p => 
        p.title.toLowerCase().includes(title.toLowerCase())
      );

      if (matching.length === 0) {
        results.push({ title, status: 'NOT_FOUND' });
        continue;
      }

      for (const product of matching) {
        if (product.category !== 'hoodies-sweatshirts') {
          await base44.entities.Product.update(product.id, {
            category: 'hoodies-sweatshirts'
          });
          updated++;
          results.push({ 
            title: product.title, 
            status: 'MOVED_TO_HOODIES',
            oldCategory: product.category 
          });
        } else {
          results.push({ 
            title: product.title, 
            status: 'ALREADY_CORRECT' 
          });
        }
      }
    }

    return Response.json({ 
      success: true, 
      updated,
      results,
      message: `Moved ${updated} products to hoodies-sweatshirts category`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});