import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePortfolioMotion } from './usePortfolioMotion';

const SHOTS = [
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7d7a32fce_IMG_20260905_225433.jpg', title: 'Homepage \u2014 two-product hero and navigation', alt: 'Torch Republic homepage hero with two-product lineup and daily ritual messaging.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/c1f338aac_IMG_20260905_225446.jpg', title: 'Product card \u2014 classic coffee', alt: 'Product card showing Instant Classic Coffee at $22.99 with add-to-cart and view-details actions.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/a0007b22b_IMG_20260905_225510.jpg', title: 'Product card \u2014 mushroom coffee', alt: 'Product card showing Instant Mushroom Coffee at $25.99 with add-to-cart and view-details actions.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e85725ddd_IMG_20260905_225523.jpg', title: 'Powered by Nature \u2014 benefit grid', alt: 'Feature grid highlighting clean ingredients, no plastic, no machine, and on-the-go convenience.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/b07e1fa30_IMG_20260905_225532.jpg', title: 'Lifestyle hero \u2014 ritual in nature', alt: 'Lifestyle hero showing the daily ritual in an outdoor mountain setting.' },
];

export default function ProjectGallery() {
  const [activeIdx, setActiveIdx] = useState(null);
  const triggerRef = useRef(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  const open = useCallback((idx) => {
    triggerRef.current = document.activeElement;
    setActiveIdx(idx);
  }, []);

  const close = useCallback(() => {
    setActiveIdx(null);
    // Restore focus to triggering element
    if (triggerRef.current) triggerRef.current.focus();
  }, []);

  const next = useCallback(() => {
    setActiveIdx((v) => (v === null ? v : (v + 1) % SHOTS.length));
  }, []);

  const prev = useCallback(() => {
    setActiveIdx((v) => (v === null ? v : (v - 1 + SHOTS.length) % SHOTS.length));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Focus the close button
    if (closeBtnRef.current) closeBtnRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeIdx, close, next, prev]);

  const scope = usePortfolioMotion((gsap) => {
    gsap.from('.gallery-item', {
      opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '.gallery-grid', start: 'top 80%' },
    });
  });

  const active = activeIdx !== null ? SHOTS[activeIdx] : null;

  return (
    <SectionWrap id="gallery" alt>
      <div ref={scope}>
        <Eyebrow>Selected Interface / Project Gallery</Eyebrow>
        <SectionHeading>The finished application</SectionHeading>
        <Lead>Real screenshots of the live project. Select any image to open it full-size.</Lead>

        {/* Asymmetric grid */}
        <div className="gallery-grid mt-9 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {SHOTS.map((s, i) => (
            <figure
              key={s.src}
              className="gallery-item group"
              style={{
                margin: 0,
                cursor: 'zoom-in',
                // First item spans 2 cols + 2 rows on desktop for asymmetry
                ...(i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2' } : {}),
              }}
            >
              <button
                type="button"
                onClick={() => open(i)}
                aria-label={`Expand image: ${s.title}`}
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  padding: 0,
                  border: `1px solid ${P.rule}`,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: P.surface,
                  cursor: 'zoom-in',
                  aspectRatio: '3 / 4',
                }}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  width={1440}
                  height={2970}
                  loading="lazy"
                  decoding="async"
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
              <figcaption className="mt-2 flex items-center gap-1" style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.85rem', color: P.ink }}>
                {s.title}
                <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" style={{ color: P.accentInk }} aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          ref={modalRef}
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
          {/* Close button */}
          <button
            ref={closeBtnRef}
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
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <ChevronRight size={24} />
          </button>

          <figure
            className="gallery-modal-img"
            style={{ margin: 0, maxWidth: 480, width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ borderRadius: '12px', overflow: 'hidden', background: P.surface, aspectRatio: '3 / 4' }}>
              <img
                src={active.src}
                alt={active.alt}
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <figcaption style={{ marginTop: '0.75rem', textAlign: 'center', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9rem', color: '#fff' }}>
              {active.title} <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, marginLeft: '0.5rem' }}>{activeIdx + 1} / {SHOTS.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </SectionWrap>
  );
}