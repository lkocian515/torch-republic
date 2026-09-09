import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO, FONT_SANS, LINKEDIN, CONTACT_EMAIL } from './portfolioTheme';

export default function PortfolioFooter() {
  return (
    <footer style={{ background: P.paper, borderTop: `1px solid ${P.rule}` }}>
      <div className="mx-auto max-w-[1140px] px-6 md:px-10 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: '1.05rem', color: P.ink, margin: 0 }}>Lisa Marie Kocian</p>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: P.muted, margin: '0.4rem 0 0' }}>
              AI QA + E-Commerce Implementation
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 600, color: P.accent, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 600, color: P.accent, textDecoration: 'none' }}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
        <div className="mt-8 pt-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between" style={{ borderTop: `1px solid ${P.rule}` }}>
          <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: P.muted, margin: 0 }}>
            &copy; 2026 Lisa Marie Kocian
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: '0.78rem', color: P.muted, margin: 0 }}>
            Torch Republic is referenced as a case study demonstrating this work.
          </p>
        </div>
      </div>
    </footer>
  );
}