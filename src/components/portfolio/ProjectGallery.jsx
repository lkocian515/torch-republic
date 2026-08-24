import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS } from './portfolioTheme';
import { ArrowUpRight } from 'lucide-react';

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