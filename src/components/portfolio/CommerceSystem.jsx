import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

// Conceptual commerce ecosystem. Only layers genuinely represented in the
// project are shown; AI-assisted layers are tagged honestly.
const LAYERS = [
  { label: 'Customer', ai: false },
  { label: 'Storefront / UX', ai: true },
  { label: 'Product & Content System', ai: true },
  { label: 'Commerce Workflows — cart, checkout (Shopify)', ai: true },
  { label: 'Customer / Loyalty / Subscription Experience', ai: true },
  { label: 'Analytics & Feedback', ai: false },
  { label: 'QA + Iteration', ai: true },
];

export default function CommerceSystem() {
  return (
    <SectionWrap id="system" alt>
      <Eyebrow>3. The System</Eyebrow>
      <SectionHeading>The commerce ecosystem, as a system</SectionHeading>
      <Lead>A digital experience is a system, not a collection of isolated pages. This is how the pieces connect — and where AI-assisted work supported each layer.</Lead>

      <div className="mt-9 flex flex-col gap-2.5">
        {LAYERS.map((l, i) => (
          <div key={l.label} style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: P.surface,
                border: `1px solid ${P.rule}`,
                borderRadius: '8px',
                padding: '0.85rem 1.1rem',
              }}
            >
              <div className="flex items-center gap-3" style={{ minWidth: 0 }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', fontWeight: 700, color: P.muted, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.95rem', color: P.ink }}>{l.label}</span>
              </div>
              {l.ai && (
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, background: P.accentSoft, borderRadius: '4px', padding: '0.3rem 0.6rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  AI-assisted
                </span>
              )}
            </div>
            {i < LAYERS.length - 1 && (
              <div style={{ display: 'flex', justifyContent: 'center' }} aria-hidden="true">
                <span style={{ color: P.accent, fontSize: '0.85rem', lineHeight: 1 }}>↓</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p style={{ marginTop: '1.5rem', fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, maxWidth: '65ch' }}>
        AI-assisted development and review supported these layers; every layer was validated by human QA before it
        shipped. No integrations are implied beyond those actually present in the project.
      </p>
    </SectionWrap>
  );
}