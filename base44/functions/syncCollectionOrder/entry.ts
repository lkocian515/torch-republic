import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Fetch all products and all collections
    const [products, collections] = await Promise.all([
      base44.asServiceRole.entities.Product.list('', 1000),
      base44.asServiceRole.entities.Collection.list('', 100),
    ]);

    // Count in-stock products per collection slug
    const inStockCount = {};
    for (const product of products) {
      if (product.collection && product.in_stock !== false) {
        inStockCount[product.collection] = (inStockCount[product.collection] || 0) + 1;
      }
    }

    console.log('In-stock counts per collection:', JSON.stringify(inStockCount));

    // Sort collections: most in-stock products first; ties keep existing sort_order
    const sorted = [...collections].sort((a, b) => {
      const aCount = inStockCount[a.slug] || 0;
      const bCount = inStockCount[b.slug] || 0;
      if (bCount !== aCount) return bCount - aCount;
      return (a.sort_order || 0) - (b.sort_order || 0);
    });

    // Update sort_order for each collection
    const updates = sorted.map((col, i) =>
      base44.asServiceRole.entities.Collection.update(col.id, { sort_order: i + 1 })
    );
    await Promise.all(updates);

    console.log(`Updated sort_order for ${sorted.length} collections`);
    return Response.json({ success: true, updated: sorted.length, inStockCount });
  } catch (error) {
    console.error('syncCollectionOrder error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});