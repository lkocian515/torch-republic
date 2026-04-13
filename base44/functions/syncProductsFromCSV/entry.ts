import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { csv_data } = await req.json();
    if (!csv_data) {
      return Response.json({ error: 'csv_data required' }, { status: 400 });
    }

    // Parse CSV to get unique handles
    const lines = csv_data.trim().split('\n');
    const headers = lines[0].split(',');
    const handleIndex = headers.indexOf('Handle');
    
    const activeHandles = new Set();
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      const handle = parts[handleIndex]?.trim().replace(/^"|"$/g, '');
      if (handle) activeHandles.add(handle);
    }

    console.log(`Found ${activeHandles.size} unique handles in CSV`);

    // Fetch all products and delete those not in CSV
    const allProducts = await base44.entities.Product.list('', 1000);
    const toDelete = allProducts.filter(p => !activeHandles.has(p.shopify_handle));

    console.log(`Deleting ${toDelete.length} products not in CSV`);

    const deletePromises = toDelete.map(p => base44.entities.Product.delete(p.id));
    await Promise.all(deletePromises);

    return Response.json({
      success: true,
      activeHandles: activeHandles.size,
      deletedCount: toDelete.length,
      deletedProducts: toDelete.map(p => ({ id: p.id, title: p.title, handle: p.shopify_handle }))
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});