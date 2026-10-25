import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { P, FONT_MONO, TORCH_SHOTS } from '../portfolioTheme';
import SectionHeading from '../home/SectionHeading';
import ScreenshotSlot from '../ScreenshotSlot';

// Real captures of the live application — every image is a mobile viewport of
// torchrepublic.com. Replace a src only with a newer verified capture of the
// same view, and keep the caption accurate to what is visible.

const LEAD = {
  src: TORCH_SHOTS.ritual,
  alt: 'Torch Republic mobile storefront: the lifestyle section, showing a hiker resting at sunrise beside a pouch of coffee under the heading "Your cup in nature, before the trail begins".',
  caption: 'Lifestyle section',
  aspectRatio: '9 / 16',
  objectPosition: 'top center',
};

const GALLERY = [
  {
    src: TORCH_SHOTS.ingredients,
    alt: 'Feature grid titled "Real ingredients. No machine. No plastic." with four cards: natural ingredients, no plastic waste, no machine needed, and made for on the go.',
    caption: 'Ingredients and convenience',
    aspectRatio: '9 / 16',
    objectPosition: 'top center',
  },
];

export default function InterfaceGallery() {
  const [expanded, setExpanded] = useState(null);

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

  return (
    <section
      id="gallery"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 72,
      }}
    >
      <div className="mx-auto max-w-[980px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Interface gallery"
          heading="Captures from the live application"
          intro="Mobile views of the published storefront. Select any image to open it full size."
        />

        <div style={{ marginBottom: '1.75rem', maxWidth: '420px' }}>
          <ScreenshotSlot
            src={LEAD.src}
            alt={LEAD.alt}
            caption={LEAD.caption}
            aspectRatio={LEAD.aspectRatio}
            objectPosition={LEAD.objectPosition}
            onClick={() => setExpanded(LEAD)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {GALLERY.map((s) => (
            <ScreenshotSlot
              key={s.src}
              src={s.src}
              alt={s.alt}
              caption={s.caption}
              aspectRatio={s.aspectRatio}
              objectPosition={s.objectPosition}
              onClick={() => setExpanded(s)}
            />
          ))}
        </div>
      </div>

      {expanded && (
        <div
          onClick={() => setExpanded(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(10,10,12,0.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <button
            type="button"
            onClick={() => setExpanded(null)}
            aria-label="Close image"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
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
              style={{
                maxWidth: '100%',
                maxHeight: '78vh',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto',
                borderRadius: '6px',
              }}
            />
            {expanded.caption && (
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                  margin: '0.9rem 0 0',
                  textAlign: 'center',
                }}
              >
                {expanded.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}