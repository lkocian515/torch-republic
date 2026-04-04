import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    // Fetch all products
    const allProducts = await base44.entities.Product.list('', 500);
    
    // Category mappings based on product title/description
    const categoryMappings = {
      't-shirts': [
        /t-shirt/i,
        /tee\b/i,
      ],
      'hoodies-sweatshirts': [
        /hoodie/i,
        /sweatshirt/i,
        /crewneck/i,
        /letterman/i,
      ],
      'hats': [
        /hat\b/i,
        /cap\b/i,
        /beanie/i,
        /trucker/i,
      ],
      'mugs-tumblers': [
        /mug\b/i,
        /tumbler/i,
        /cup\b/i,
      ],
      'flags': [
        /flag\b/i,
      ],
      'magnets': [
        /magnet/i,
      ],
      'stickers': [
        /sticker/i,
      ],
      'jewelry': [
        /ring\b/i,
        /necklace/i,
        /bracelet/i,
        /pendant/i,
      ],
      'candles': [
        /candle/i,
      ],
      'tanks': [
        /tank\b/i,
        /sleeveless/i,
      ],
      'coffee': [
        /coffee\b/i,
      ],
    };

    const report = {};
    let totalUpdated = 0;
    const updateLog = [];

    // Initialize report structure
    Object.keys(categoryMappings).forEach(cat => {
      report[cat] = {
        matched: [],
        unmatched: [],
        imageIssues: [],
        mockupsNeeded: [],
      };
    });
    report.uncategorized = {
      matched: [],
      unmatched: [],
      imageIssues: [],
      mockupsNeeded: [],
    };

    // Process each product
    for (const product of allProducts) {
      const title = product.title || '';
      let determinedCategory = null;

      // Match product to category
      for (const [category, patterns] of Object.entries(categoryMappings)) {
        if (patterns.some(pattern => pattern.test(title))) {
          determinedCategory = category;
          break;
        }
      }

      // If no category determined, default to 't-shirts' or leave uncategorized
      const targetCategory = determinedCategory || 'uncategorized';
      const currentCategory = product.category;

      // Update if category changed
      if (determinedCategory && currentCategory !== determinedCategory) {
        await base44.entities.Product.update(product.id, {
          category: determinedCategory
        });
        totalUpdated++;
        updateLog.push({
          title: product.title,
          from: currentCategory,
          to: determinedCategory
        });
      }

      // Add to report
      const reportEntry = {
        id: product.id,
        title: product.title,
        price: product.price,
      };

      // Check for image issues
      if (!product.image_url) {
        report[targetCategory].imageIssues.push({
          ...reportEntry,
          issue: 'Missing primary image'
        });
      } else if (product.image_url.includes('unsplash') || product.image_url.includes('placeholder')) {
        report[targetCategory].imageIssues.push({
          ...reportEntry,
          issue: 'Using placeholder/generic image'
        });
      }

      // Check if image looks like a mockup (if it contains common mockup keywords)
      if (product.image_url && (
        product.image_url.includes('mockup') ||
        product.image_url.includes('flat') ||
        product.image_url.includes('white-bg')
      )) {
        report[targetCategory].mockupsNeeded.push({
          ...reportEntry,
          issue: 'Current image is mockup/flat lay'
        });
      }

      // Track matched vs unmatched
      if (determinedCategory) {
        report[targetCategory].matched.push(reportEntry);
      } else {
        report.uncategorized.unmatched.push(reportEntry);
      }
    }

    // Clean up uncategorized if empty
    if (report.uncategorized.matched.length === 0 && 
        report.uncategorized.unmatched.length === 0) {
      delete report.uncategorized;
    }

    // Build formatted report
    const formattedReport = {};
    for (const [category, data] of Object.entries(report)) {
      formattedReport[category] = {
        total_matched: data.matched.length,
        total_unmatched: data.unmatched.length,
        total_image_issues: data.imageIssues.length,
        total_mockups_needed: data.mockupsNeeded.length,
        matched_products: data.matched.map(p => p.title),
        unmatched_products: data.unmatched.map(p => p.title),
        image_issues: data.imageIssues.map(p => ({
          title: p.title,
          issue: p.issue
        })),
        mockups_needed: data.mockupsNeeded.map(p => ({
          title: p.title,
          issue: p.issue
        }))
      };
    }

    return Response.json({
      success: true,
      total_products: allProducts.length,
      total_updated: totalUpdated,
      updates: updateLog,
      report: formattedReport
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});