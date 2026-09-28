import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { P, FONT_SERIF, FONT_MONO, FONT_SANS, LINKEDIN, CONTACT_EMAIL } from './portfolioTheme';

export default function PortfolioFooter() {
  return (
    <footer style={{ background: P.paper, borderTop: `1px solid ${P.rule}` }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 py-10">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between text-center md:text-left">
          <div>
            <p style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: '1.05rem', color: P.ink, margin: 0 }}>
              Lisa Marie Kocian
            </p>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: P.muted, margin: '0.35rem 0 0' }}>
              AI quality assurance &amp; content evaluation
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:items-end">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: P.accent,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: P.accent,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Mail size={14} /> Email
            </a>
          </div>
        </div>
        <div
          className="mt-8 pt-5 flex flex-col items-center gap-2 md:flex-row md:items-center md:justify-between text-center md:text-left"
          style={{ borderTop: `1px solid ${P.rule}` }}
        >
          <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: P.muted, margin: 0 }}>
            &copy; 2026 Lisa Marie Kocian
          </p>
          <p style={{ fontFamily: FONT_SANS, fontSize: '0.76rem', color: P.muted, margin: 0 }}>
            Torch Republic is presented as an independent case study in applied e-commerce development and QA.
          </p>
        </div>
      </div>
    </footer>
  );
}