import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';
import { ArrowUpRight } from 'lucide-react';

// Real screenshots of the live project — interface evidence, not glamour shots.
const SHOTS = [
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e97bb3911_portfolio-homepage.png', title: 'Homepage — editorial hero & navigation', alt: 'Torch Republic homepage showing navigation and editorial product hero.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/abd9bea94_portfolio-collection.png', title: 'Collection — standardized product grid', alt: 'Torch Republic collection page with standardized product cards.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9e1ef6959_portfolio-product.png', title: 'Product detail — purchase decision flow', alt: 'Product page showing imagery, pricing and add-to-cart controls.' },
  { src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4efd7698f_portfolio-bundle.png', title: 'Build Your Ritual — bundle logic', alt: 'Starter ritual bundle showing included products and savings.' },
];

export default function ProjectGallery() {
  return (
    <SectionWrap id="gallery" alt>
      <Eyebrow>Selected Interface / Project Gallery</Eyebrow>
      <SectionHeading>The finished storefront</SectionHeading>
      <Lead>Real screenshots of the live project. Select any image to open it full-size.</Lead>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SHOTS.map((s) => (
          <figure key={s.src} style={{ margin: 0 }}>
            <a
              href={s.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open full-size image: ${s.title}`}
              style={{ display: 'block', border: `1px solid ${P.rule}`, borderRadius: '12px', overflow: 'hidden', background: P.surface }}
            >
              <img
                src={s.src}
                alt={s.alt}
                width={1400}
                height={875}
                loading="lazy"
                decoding="async"
                style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1400 / 875' }}
              />
            </a>
            <figcaption style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.875rem', color: P.ink }}>{s.title}</span>
              <ArrowUpRight size={13} style={{ color: P.accent }} aria-hidden="true" />
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionWrap>
  );
}