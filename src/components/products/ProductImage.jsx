import React, { useState } from 'react';

/**
 * ProductImage — standardized image renderer
 *
 * variant:
 *   "clean"     — warm light bg, soft top light, centered, no clutter
 *   "lifestyle" — slightly warmer, slight vignette, natural feel
 *   "cinematic" — grain overlay + dark edge fade + reduced opacity
 */
export default function ProductImage({
  src,
  alt = '',
  variant = 'clean',
  className = '',
  aspectRatio = '4/5',
  hoverScale = true,
}) {
  const [loaded, setLoaded] = useState(false);

  const wrapperBase = {
    backgroundColor: '#F7F2E9',
    position: 'relative',
    overflow: 'hidden',
    aspectRatio,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // ── Variant-specific overlay styles ──────────────────────────────────────

  const overlays = {
    clean: (
      <>
        {/* Soft top light */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.06) 0%, transparent 70%)',
          zIndex: 1,
        }} />
        {/* Subtle bottom shadow */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
          height: '30%',
          background: 'linear-gradient(to top, rgba(111,74,50,0.08) 0%, transparent 100%)',
          zIndex: 1,
        }} />
      </>
    ),

    lifestyle: (
      <>
        {/* Warm vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(111,74,50,0.08) 100%)',
          zIndex: 1,
        }} />
        {/* Soft top warmth */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(196,163,90,0.04) 0%, transparent 40%)',
          zIndex: 1,
        }} />
      </>
    ),

    cinematic: (
      <>
        {/* Dark edge fade */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to right, rgba(111,74,50,0.06) 0%, transparent 25%, transparent 75%, rgba(111,74,50,0.06) 100%)',
          zIndex: 1,
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(111,74,50,0.04) 0%, transparent 30%, transparent 65%, rgba(111,74,50,0.10) 100%)',
          zIndex: 1,
        }} />
        {/* Film grain via SVG */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.4,
          zIndex: 2,
        }} />
      </>
    ),
  };

  // ── Image filter per variant ──────────────────────────────────────────────
  const imgFilter = {
    clean: 'none',
    lifestyle: 'none',
    cinematic: 'grayscale(15%) contrast(1.05)',
  };

  const imgOpacity = {
    clean: loaded ? 1 : 0,
    lifestyle: loaded ? 0.9 : 0,
    cinematic: loaded ? 0.78 : 0,
  };

  return (
    <div style={wrapperBase} className={className}>
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0" style={{ backgroundColor: '#F7F2E9' }} />
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-contain transition-all duration-700${hoverScale ? ' group-hover:scale-[1.04]' : ''}`}
        style={{
          opacity: imgOpacity[variant],
          filter: imgFilter[variant],
          transition: 'opacity 0.5s ease, transform 0.6s ease',
          // Ensure consistent centering
          objectPosition: 'center center',
          padding: '8%',
        }}
      />

      {/* Variant overlays */}
      {overlays[variant] || overlays.clean}
    </div>
  );
}