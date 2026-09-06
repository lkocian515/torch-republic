import React, { useState, useCallback, useEffect } from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';
import { ArrowUpRight, X } from 'lucide-react';

// Real screenshots of the live project — interface evidence, not glamour shots.
const SHOTS = [
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6661578c5_Screenshot_2026-08-24-13-03-47-00_40deb401b9ffe8e1df2f1cc5ba480b12.jpg', title: 'Homepage — editorial hero & navigation', alt: 'Torch Republic homepage hero with three 3oz black-bag products.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6abb4bbaf_Screenshot_2026-08-24-13-03-56-27_40deb401b9ffe8e1df2f1cc5ba480b12.jpg', title: 'Product card — mushroom coffee', alt: 'Product card showing 3oz black-bag instant mushroom coffee.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/42e51d0dc_Screenshot_2026-08-24-13-03-53-03_40deb401b9ffe8e1df2f1cc5ba480b12.jpg', title: 'Product card — ceremonial matcha', alt: 'Product card showing 3oz black-bag ceremonial matcha.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/543afa947_Screenshot_2026-08-24-13-04-02-57_40deb401b9ffe8e1df2f1cc5ba480b12.jpg', title: 'Powered by Nature — benefit grid', alt: 'Powered by Nature benefits section with clean ingredients messaging.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/740aecdfd_Screenshot_2026-08-24-13-04-06-42_40deb401b9ffe8e1df2f1cc5ba480b12.jpg', title: 'Lifestyle hero — ritual in nature', alt: 'Lifestyle hero showing the daily ritual in an outdoor setting.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/82a403301_Screenshot_2026-08-24-13-03-43-32_40deb401b9ffe8e1df2f1cc5ba480b12.jpg', title: 'Storefront hero — the lineup', alt: 'Storefront hero featuring the three 3oz black-bag products.' },
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
                borderRadius: '12px',
                overflow: 'hidden',
                background: P.surface,
                cursor: 'zoom-in',
                // Fixed ratio container — guarantees a uniform, undistorted grid
                // on mobile (1 col) and desktop (2 col).
                aspectRatio: '16 / 10',
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
                  objectFit: 'cover',
                  // Center-crop so the browser/status bar at the top of each
                  // full-page screenshot (and any other identifiable info) is
                  // cropped out of the visible area.
                  objectPosition: 'center',
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
          <figure style={{ margin: 0, maxWidth: 720, width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              background: P.surface,
              aspectRatio: '16 / 10',
            }}>
              <img
                src={active.src}
                alt={active.alt}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
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