import React from 'react';

/**
 * Image SEO Helper
 * Generates optimized alt text, filenames, and structured data for images
 */
export function generateImageSEO(product, imageType = 'product') {
  const baseAlt = {
    product: `${product.name} - ${product.category === 'matcha' ? 'Ceremonial Matcha' : product.category === 'classic-coffee' ? 'Premium Instant Coffee' : 'Instant Mushroom Coffee'} - Torch Republic Coffee Company`,
    lifestyle: `${product.name} lifestyle image - Daily ritual with Torch Republic ${product.category === 'matcha' ? 'matcha' : 'coffee'}`,
    ingredient: `${product.name} ingredients - ${product.mushrooms || product.category === 'matcha' ? 'Ceremonial Matcha' : 'Premium Arabica Coffee'}`,
    gallery: `${product.name} gallery image - Torch Republic ${product.name} product photography`,
  };

  const filename = {
    product: `${product.slug.replace(/-/g, '-')}-${product.category}-torch-republic.jpg`,
    lifestyle: `${product.slug}-lifestyle-ritual.jpg`,
    ingredient: `${product.slug}-ingredients.jpg`,
    gallery: `${product.slug}-gallery-${imageType}.jpg`,
  };

  return {
    alt: baseAlt[imageType] || baseAlt.product,
    filename: filename[imageType] || filename.product,
    title: `${product.name} | Torch Republic Coffee Company`,
    caption: `Torch Republic ${product.name} - ${product.tasteDescription}`,
  };
}

/**
 * Lazy Image Component with SEO optimization
 */
export function SEOImage({ src, alt, product, imageType, className, loading = 'lazy', width, height }) {
  const seoData = product ? generateImageSEO(product, imageType) : null;
  
  return (
    <img
      src={src}
      alt={alt || seoData?.alt || 'Torch Republic product'}
      title={seoData?.title}
      loading={loading}
      decoding="async"
      width={width}
      height={height}
      className={className}
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: width ? `${width}px ${height || width}px` : 'auto 300px',
      }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%23111" width="400" height="400"/%3E%3Ctext fill="%23333" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="16"%3EImage not available%3C/text%3E%3C/svg%3E';
      }}
    />
  );
}