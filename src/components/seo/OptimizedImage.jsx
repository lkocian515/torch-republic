import React, { useEffect } from 'react';

/**
 * Image optimization component
 * Implements lazy loading, modern formats, and responsive images
 */
export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  width,
  height,
  objectFit = 'cover'
}) {
  // Convert image URLs to WebP where possible
  const webpSrc = src?.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  useEffect(() => {
    // Preload priority images
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }
  }, [src, priority]);

  return (
    <picture>
      {webpSrc && (
        <source
          srcSet={webpSrc}
          type="image/webp"
          media={sizes}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        style={{ objectFit }}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
}

/**
 * Lazy load wrapper for below-fold images
 */
export function LazyImage({ src, alt, className, threshold = 0.1 }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const imgRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={imgRef} className={className} style={{ position: 'relative' }}>
      {isInView ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          loading="lazy"
        />
      ) : (
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ 
            width: '24px', 
            height: '24px', 
            border: '2px solid rgba(230,183,173,0.3)', 
            borderTopColor: '#E6AC45',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      )}
    </div>
  );
}