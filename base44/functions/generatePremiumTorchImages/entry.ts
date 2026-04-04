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
    
    let updated = 0;
    const results = [];
    
    // Process each product
    for (const product of allProducts) {
      try {
        const title = product.title || 'product';
        const category = product.category || 'apparel';
        
        // Generate three images per product
        const images = [];
        
        // PRIMARY IMAGE: Full lifestyle shot with model
        const primaryPrompt = buildPrimaryImagePrompt(title, category);
        const primaryImage = await base44.integrations.Core.GenerateImage({
          prompt: primaryPrompt,
          model: 'automatic'
        });
        
        if (primaryImage?.url) {
          images.push(primaryImage.url);
        }
        
        // ALTERNATE IMAGE: Different angle/pose
        const alternatePrompt = buildAlternateImagePrompt(title, category);
        const alternateImage = await base44.integrations.Core.GenerateImage({
          prompt: alternatePrompt,
          model: 'automatic'
        });
        
        if (alternateImage?.url) {
          images.push(alternateImage.url);
        }
        
        // DETAIL IMAGE: Close-up of product/graphic
        const detailPrompt = buildDetailImagePrompt(title, category);
        const detailImage = await base44.integrations.Core.GenerateImage({
          prompt: detailPrompt,
          model: 'automatic'
        });
        
        if (detailImage?.url) {
          images.push(detailImage.url);
        }
        
        // Update product if we got images
        if (images.length >= 2) {
          await base44.entities.Product.update(product.id, {
            image_url: images[0],
            image_url_2: images[1],
          });
          
          updated++;
          results.push({
            title: product.title,
            status: 'GENERATED',
            primary: images[0],
            alternate: images[1],
            detail: images[2] || null
          });
        } else {
          results.push({
            title: product.title,
            status: 'GENERATION_FAILED',
            error: 'Could not generate enough images'
          });
        }
      } catch (err) {
        results.push({
          title: product.title,
          status: 'ERROR',
          error: err.message
        });
      }
    }
    
    return Response.json({
      success: true,
      updated,
      total: allProducts.length,
      results
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});

function buildPrimaryImagePrompt(productTitle, category) {
  return `Premium professional lifestyle photography. Realistic masculine model (30-40s, confident, natural) wearing ${productTitle}. Dark cinematic background (true black, charcoal, deep navy). Dramatic backlighting with subtle gold/amber rim highlights. High contrast, moody atmosphere. Full body or waist-up shot, product clearly visible. Model looking slightly away or down, strong natural posture. No white backgrounds, no flat lay, no mockups. Premium apparel brand quality (think high-end heritage brand). Rugged, bold, modern American aesthetic. Studio-grade lighting with shadows for depth and dimension. Patriotic but sophisticated, not cheesy. Professional photography, 8k quality.`;
}

function buildAlternateImagePrompt(productTitle, category) {
  return `Premium professional lifestyle photography. Realistic masculine model (30-40s) from different angle wearing ${productTitle}. Dark cinematic background (black, charcoal, deep blue-navy). Side profile or 3/4 view showcasing product fit and silhouette. Same dramatic backlighting with gold accents. High contrast moody lighting. Dynamic natural posture, subtle movement implied. Product detail clearly visible. Studio lighting, professional brand photography. No flat backgrounds, no mockups. Rugged premium aesthetic. 8k quality.`;
}

function buildDetailImagePrompt(productTitle, category) {
  return `Professional product detail photography. Close-up/macro shot of ${productTitle} focusing on graphic, logo, texture, or design quality. Dark moody background (black, charcoal). Professional lighting highlighting craftsmanship and quality. Subtle gold rim lighting for premium feel. High contrast, dramatic shadows. Shows fabric quality, stitching, embroidery detail, or graphic clarity. Clean sharp focus on product detail. No mockups, no flat lay. Premium brand photography. 8k quality.`;
}