import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Extract slug from URL path
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(p => p);
    const slug = pathParts[pathParts.length - 1];
    
    if (!slug) {
      return new Response('Not found', { status: 404 });
    }
    
    // Fetch the blog post
    const posts = await base44.entities.BlogPost.filter({ slug });
    if (posts.length === 0 || !posts[0].published) {
      return new Response('Article not found', { status: 404 });
    }
    
    const post = posts[0];
    const ogImage = post.featured_image || 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';
    const fullUrl = `https://torchrepublic.com/journal/${slug}`;
    
    // Return HTML with proper meta tags for social media crawlers
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>${post.title} | Torch Republic</title>
  <meta name="title" content="${post.title} | Torch Republic">
  <meta name="description" content="${post.excerpt || post.title}">
  <meta name="author" content="${post.author || 'Torch Republic'}">
  <link rel="canonical" href="${fullUrl}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${fullUrl}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.excerpt || post.title}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="Torch Republic Coffee Co.">
  <meta property="article:published_time" content="${post.published_date}">
  <meta property="article:author" content="${post.author || 'Torch Republic'}">
  <meta property="article:section" content="${post.category}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${post.title}">
  <meta name="twitter:description" content="${post.excerpt || post.title}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:creator" content="@torchrepublic">
  
  <!-- Redirect to actual page after meta tags are read -->
  <meta http-equiv="refresh" content="0;url=https://torchrepublic.com/journal/${slug}">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${post.title}",
    "description": "${post.excerpt || post.title}",
    "image": "${ogImage}",
    "author": {
      "@type": "Organization",
      "name": "${post.author || 'Torch Republic'}",
      "url": "https://torchrepublic.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Torch Republic Coffee Co.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png"
      }
    },
    "datePublished": "${post.published_date}",
    "dateModified": "${post.published_date}",
    "url": "${fullUrl}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${fullUrl}"
    },
    "inLanguage": "en-US"
  }
  </script>
</head>
<body>
  <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,sans-serif;background:#0A0A0A;color:#F0EBE1;">
    <div style="text-align:center;">
      <p style="font-size:1.2rem;margin-bottom:1rem;">Loading article...</p>
      <p style="font-size:0.9rem;opacity:0.6;">Redirecting to ${post.title}</p>
      <p style="font-size:0.8rem;opacity:0.4;margin-top:2rem;">If not redirected, <a href="https://torchrepublic.com/journal/${slug}" style="color:#E6B7AD;">click here</a></p>
    </div>
  </div>
</body>
</html>
    `.trim();
    
    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error generating social meta tags:', error);
    return new Response('Error loading article', { status: 500 });
  }
});