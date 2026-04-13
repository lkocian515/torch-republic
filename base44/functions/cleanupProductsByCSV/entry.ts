import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { csv_url } = await req.json();
    if (!csv_url) {
      return Response.json({ error: 'csv_url required' }, { status: 400 });
    }

    // Fetch CSV
    const csvRes = await fetch(csv_url);
    const csvText = await csvRes.text();

    // Parse CSV to extract unique handles
    const lines = csvText.split('\n');
    const headerLine = lines[0];
    const handleIndex = headerLine.split(',').findIndex(h => h.trim() === 'Handle');
    
    const activeHandles = new Set();
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      
      // Simple CSV parsing - split by comma
      const cells = lines[i].split(',');
      const handle = cells[handleIndex]?.trim().replace(/^"|"$/g, '').trim();
      
      if (handle && handle.length > 0) {
        activeHandles.add(handle);
      }
    }

    console.log(`Active handles from CSV: ${activeHandles.size}`);

    // Fetch all products
    const allProducts = await base44.entities.Product.list('', 1000);
    
    // Find products to delete
    const toDelete = allProducts.filter(p => 
      p.shopify_handle && !activeHandles.has(p.shopify_handle)
    );

    console.log(`Deleting ${toDelete.length} products not in CSV`);

    // Delete them
    const deletePromises = toDelete.map(p => base44.entities.Product.delete(p.id));
    await Promise.all(deletePromises);

    return Response.json({
      success: true,
      activeHandlesInCSV: activeHandles.size,
      deletedCount: toDelete.length,
      deletedProducts: toDelete.map(p => ({ 
        id: p.id, 
        title: p.title, 
        handle: p.shopify_handle 
      })).slice(0, 20) // Return first 20 for preview
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});