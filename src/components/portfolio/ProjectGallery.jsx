import React, { useState, useCallback, useEffect } from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';
import { ArrowUpRight, X } from 'lucide-react';

// Real screenshots of the live project — interface evidence, not glamour shots.
const SHOTS = [
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7d7a32fce_IMG_20260905_225433.jpg', title: 'Homepage — two-product hero and navigation', alt: 'Torch Republic homepage hero with two-product lineup and daily ritual messaging.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/c1f338aac_IMG_20260905_225446.jpg', title: 'Product card — classic coffee', alt: 'Product card showing Instant Classic Coffee with pricing and subscription option.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a0007b22b_IMG_20260905_225510.jpg', title: 'Product card — mushroom coffee', alt: 'Product card showing Instant Mushroom Coffee with functional benefits.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e85725ddd_IMG_20260905_225523.jpg', title: 'Powered by Nature — benefit grid', alt: 'Feature grid highlighting clean ingredients, no plastic, no machine, and on-the-go convenience.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/b07e1fa30_IMG_20260905_225532.jpg', title: 'Lifestyle hero — ritual in nature', alt: 'Lifestyle hero showing the daily ritual in an outdoor mountain setting.' },
];

export default function ProjectGallery() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);
  const onKey = useCallback((e) => { if (e.key === 'Escape') close(); }, [close]);
  useEffect(() => {
    if (!active) return;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, onKey]);

  return (
    <SectionWrap id="gallery" alt>
      <Eyebrow>Selected Interface / Project Gallery</Eyebrow>
      <SectionHeading>The finished storefront</SectionHeading>
      <Lead>Real screenshots of the live project. Select any image to open it full-size.</Lead>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SHOTS.map((s) => (
          <figure key={s.src} style={{ margin: 0 }}>
            <button
              type="button"
              onClick={() => setActive(s)}
              aria-label={`Expand image: ${s.title}`}
              style={{
                display: 'block',
                width: '100%',
                padding: 0,
                border: `1px solid ${P.rule}`,
                borderRadius: '10px',
                overflow: 'hidden',
                background: P.surface,
                cursor: 'zoom-in',
                // Portrait ratio — fits pre-cropped mobile screenshots without
                // further cropping or large empty borders.
                aspectRatio: '3 / 4',
              }}
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </button>
            <figcaption style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.875rem', color: P.ink }}>{s.title}</span>
              <ArrowUpRight size={13} style={{ color: P.accent }} aria-hidden="true" />
            </figcaption>
          </figure>
        ))}
      </div>

      {active && (
        <div
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded view: ${active.title}`}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(15, 15, 15, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close expanded view"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
          <figure style={{ margin: 0, maxWidth: 480, width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              background: P.surface,
              aspectRatio: '3 / 4',
            }}>
              <img
                src={active.src}
                alt={active.alt}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
            <figcaption style={{
              marginTop: '0.75rem',
              textAlign: 'center',
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.9rem',
              color: '#fff',
            }}>
              {active.title}
            </figcaption>
          </figure>
        </div>
      )}
    </SectionWrap>
  );
}