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
        // Build detailed prompt based on product category/title
        const prompt = buildProductImagePrompt(product);
        
        // Generate primary lifestyle image
        const primaryImage = await base44.integrations.Core.GenerateImage({
          prompt: prompt.primary,
          model: 'automatic'
        });
        
        // Generate secondary/alternate angle image
        const secondaryImage = await base44.integrations.Core.GenerateImage({
          prompt: prompt.secondary,
          model: 'automatic'
        });
        
        if (primaryImage?.url && secondaryImage?.url) {
          // Update product with new images
          await base44.entities.Product.update(product.id, {
            image_url: primaryImage.url,
            image_url_2: secondaryImage.url
          });
          
          updated++;
          results.push({
            title: product.title,
            status: 'GENERATED',
            primary: primaryImage.url,
            secondary: secondaryImage.url
          });
        } else {
          results.push({
            title: product.title,
            status: 'GENERATION_FAILED',
            error: 'Could not generate images'
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

function buildProductImagePrompt(product) {
  const category = product.category || 'apparel';
  const title = product.title || 'product';
  
  const baseStyle = `Professional premium product photography. Dark cinematic background (black, charcoal, deep navy). Rugged, high-contrast lighting with subtle gold accents. Realistic masculine aesthetic. No white backgrounds, no mockups, no flat lay. Premium apparel brand quality.`;
  
  const categoryDetails = getCategoryPromptDetails(category, title);
  
  return {
    primary: `${baseStyle}. Realistic male model wearing ${title}. Confident natural stance, looking away or down slightly. Full body or waist-up shot showing the product clearly. Dark moody environment. Strong backlighting with gold highlights. Professional photography. Patriotic but sophisticated, not cheesy. ${categoryDetails.primary}`,
    
    secondary: `${baseStyle}. Realistic male model from different angle wearing ${title}. Side angle or 3/4 view. Product detail clearly visible. Same dark cinematic lighting. Movement or dynamic posture. Professional brand photography. ${categoryDetails.secondary}`
  };
}

function getCategoryPromptDetails(category, title) {
  if (category.includes('hoodie') || category.includes('sweatshirt')) {
    return {
      primary: 'Close-up on logo/graphic on chest. Hoodie fully visible with strings showing.',
      secondary: 'Back angle showing back graphic or design. Arms visible showing fit.'
    };
  } else if (category.includes('t-shirt') || category.includes('shirt')) {
    return {
      primary: 'Close-up of graphic/logo on chest. Shirt fit on torso clearly visible.',
      secondary: 'Front-facing angle showing full shirt design. Arms at sides showing sleeve fit.'
    };
  } else if (category.includes('hat') || category.includes('cap')) {
    return {
      primary: 'Model wearing hat, profile view showing logo/design on front. Face partially visible.',
      secondary: 'Front-facing view with model wearing hat. Logo/emblem clearly visible.'
    };
  } else if (category.includes('flag') || category.includes('magnet')) {
    return {
      primary: 'Product displayed on surface showing full design. Dark background with subtle lighting.',
      secondary: 'Angle view of product showing depth and texture.'
    };
  } else {
    return {
      primary: 'Product clearly centered and visible. Professional lifestyle presentation.',
      secondary: 'Alternate angle of product showing detail and quality.'
    };
  }
}