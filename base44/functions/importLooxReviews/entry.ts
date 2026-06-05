import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import { parse } from 'npm:csv-parse@5.5.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Unauthorized - Admin access required' }, { status: 403 });
    }

    // Read the CSV file from the uploaded file URL
    const fileUrl = 'https://media.base44.com/files/public/69afc77e4c80e5e88ca6e3ec/b8aa57ddb_torch_republic_loox_mushroom_coffee_reviews.csv';
    
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();

    // Parse CSV
    const records = await new Promise((resolve, reject) => {
      const records = [];
      const parser = parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });
      
      parser.on('readable', () => {
        let record;
        while ((record = parser.read()) !== null) {
          records.push(record);
        }
      });
      
      parser.on('error', reject);
      parser.on('end', () => resolve(records));
    });

    // Transform and import reviews
    const reviewsToCreate = records.map(record => ({
      reviewer_name: record.author || record.reviewer_name || 'Anonymous',
      body: record.body || record.review_body || '',
      rating: parseInt(record.rating) || 5,
      review_date: record.created_at ? new Date(record.created_at).toISOString() : new Date().toISOString(),
      product_handle: record.product_handle || '',
      product_id: record.product_id || '',
      location: record.location || '',
    }));

    // Bulk create reviews
    const created = await base44.entities.Review.bulkCreate(reviewsToCreate);

    return Response.json({
      success: true,
      imported: reviewsToCreate.length,
      message: `Successfully imported ${reviewsToCreate.length} reviews`
    });
  } catch (error) {
    console.error('Import error:', error);
    return Response.json({ 
      error: error.message,
      success: false 
    }, { status: 500 });
  }
});