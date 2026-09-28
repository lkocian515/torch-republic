import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';
import ScreenshotSlot from '../ScreenshotSlot';

// CURRENT SCREENSHOT REQUIRED — populate the `src` fields below with verified
// current screenshots from torchrepublic.com. Until src values are provided,
// this entire section stays hidden (no empty spacing on the live page).
//
// Required screenshots and recommended dimensions:
//   1. Desktop homepage hero — 16:9 landscape, 1920×1080 or similar
//   2. Mobile homepage — 9:16 portrait, 390×844 or similar
//   3. Shop / Shop All page — 16:9 landscape
//   4. Product detail — Instant Classic Coffee — 3:2 landscape
//   5. Product detail — Instant Mushroom Coffee — 3:2 landscape
//   6. Cart or cart drawer with one valid item — 3:2 landscape
//   7. Responsive navigation — 16:9 landscape (mobile menu open)
//   8. Content, offer, or feature section — 3:2 landscape
//
// Before adding a screenshot:
//   1. Open the current live page on torchrepublic.com
//   2. Confirm it reflects the current published version
//   3. Confirm product names, prices, packaging, navigation, and layout are current
//   4. Confirm no loading errors, broken images, admin controls, or unfinished states
//   5. Confirm the screenshot is sharp and properly cropped
//   6. Confirm the caption accurately describes what is visible

const LEAD = {
  src: null,
  alt: 'Torch Republic desktop homepage hero section showing the current brand messaging and product imagery',
  caption: 'Desktop homepage hero',
  aspectRatio: '16 / 10',
};

const GALLERY = [
  { src: null, alt: 'Torch Republic mobile homepage on a smartphone viewport', caption: 'Mobile homepage', aspectRatio: '9 / 16' },
  { src: null, alt: 'Torch Republic shop page showing all current products', caption: 'Shop page', aspectRatio: '16 / 10' },
  { src: null, alt: 'Instant Classic Coffee product detail page with current pricing and imagery', caption: 'Product detail — Instant Classic Coffee', aspectRatio: '3 / 2' },
  { src: null, alt: 'Instant Mushroom Coffee product detail page with current pricing and imagery', caption: 'Product detail — Instant Mushroom Coffee', aspectRatio: '3 / 2' },
  { src: null, alt: 'Cart drawer showing one selected item with current pricing', caption: 'Cart with selected item', aspectRatio: '3 / 2' },
  { src: null, alt: 'Responsive navigation menu open on mobile', caption: 'Responsive navigation', aspectRatio: '16 / 10' },
  { src: null, alt: 'Homepage content section demonstrating the customer experience', caption: 'Customer experience section', aspectRatio: '3 / 2' },
];

export default function InterfaceGallery() {
  const [expanded, setExpanded] = useState(null);

  const hasLead = !!LEAD.src;
  const hasGallery = GALLERY.some((s) => s.src);
  const hasAny = hasLead || hasGallery;

  useEffect(() => {
    if (!expanded) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setExpanded(null);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [expanded]);

  // Section stays hidden until at least one screenshot is provided.
  if (!hasAny) return null;

  return (
    <section
      id="gallery"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[820px] px-6 md:px-10">
        <SectionHeading eyebrow="Current interface gallery" heading="Verified screenshots from the live application" />

        {hasLead && (
          <div style={{ marginBottom: '1.5rem' }}>
            <ScreenshotSlot
              src={LEAD.src}
              alt={LEAD.alt}
              caption={LEAD.caption}
              aspectRatio={LEAD.aspectRatio}
              onClick={() => setExpanded(LEAD)}
            />
          </div>
        )}

        {hasGallery && (
          <div className="grid gap-5 md:grid-cols-2">
            {GALLERY.filter((s) => s.src).map((s, i) => (
              <ScreenshotSlot
                key={i}
                src={s.src}
                alt={s.alt}
                caption={s.caption}
                aspectRatio={s.aspectRatio}
                onClick={() => setExpanded(s)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {expanded && (
        <div
          onClick={() => setExpanded(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(17,24,39,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <button
            onClick={() => setExpanded(null)}
            aria-label="Close image"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
          <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '85vh' }}>
            <img
              src={expanded.src}
              alt={expanded.alt}
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block', borderRadius: '4px' }}
            />
            {expanded.caption && (
              <p style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', margin: '0.75rem 0 0', textAlign: 'center' }}>
                {expanded.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}