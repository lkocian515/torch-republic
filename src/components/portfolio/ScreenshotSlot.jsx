import React from 'react';
import { P, FONT_MONO } from './portfolioTheme';

// CURRENT SCREENSHOT REQUIRED.
// Renders a framed image when `src` is supplied; renders nothing when empty.
// See InterfaceGallery.jsx for the full list of screenshots to upload.
// When uploading, set the `src` prop on each ScreenshotSlot and the gallery
// will automatically appear. Until then, the gallery section stays hidden
// so no empty spacing appears on the live page.
export default function ScreenshotSlot({ src, alt, caption, aspectRatio = '16 / 10', objectPosition = 'center', onClick }) {
  if (!src) return null;

  const interactive = !!onClick;

  return (
    <figure style={{ margin: 0 }}>
      <div
        onClick={onClick}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={interactive ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }
        } : undefined}
        style={{
          display: 'block',
          width: '100%',
          aspectRatio,
          border: `1px solid ${P.rule}`,
          borderRadius: '6px',
          overflow: 'hidden',
          background: P.surface,
          cursor: interactive ? 'zoom-in' : 'default',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition, display: 'block' }}
        />
      </div>
      {caption && (
        <figcaption style={{
          fontFamily: FONT_MONO,
          fontSize: '0.66rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: P.muted,
          marginTop: '0.6rem',
          lineHeight: 1.4,
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}