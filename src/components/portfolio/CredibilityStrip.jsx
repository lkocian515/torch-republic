import React from 'react';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

const CAPS = ['AI Quality', 'Prompt Evaluation', 'E-Commerce', 'Workflow Design', 'UX / QA', 'Business Operations'];

export default function CredibilityStrip() {
  return (
    <section style={{ background: P.surface, borderBottom: `1px solid ${P.rule}` }}>
      <div className="mx-auto max-w-[1140px] px-6 md:px-10 py-6 md:py-8">
        <ul
          className="m-0 p-0 list-none flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-10"
          aria-label="Core capabilities"
        >
          {CAPS.map((c) => (
            <li
              key={c}
              style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600, color: P.secondary, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: P.accent, display: 'inline-block' }} aria-hidden="true" />
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', letterSpacing: '0.02em', textTransform: 'none', fontWeight: 600, color: P.ink }}>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}