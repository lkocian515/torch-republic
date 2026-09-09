import React from 'react';
import { Download } from 'lucide-react';
import { SectionWrap } from './PortfolioPrimitives';
import { P, FONT_SANS, FONT_MONO, RESUME_URL } from './portfolioTheme';

// Résumé access — the résumé file is connected and available for download.
export default function ResumeAccess() {
  return (
    <SectionWrap id="resume">
      <div
        className="flex flex-col items-center text-center gap-3"
        style={{
          background: P.surface,
          border: `1px solid ${P.rule}`,
          borderRadius: '10px',
          padding: 'clamp(1.5rem, 4vw, 2.25rem)',
        }}
      >
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2"
          style={{
            minHeight: 44,
            padding: '0.6rem 1.4rem',
            borderRadius: '6px',
            background: P.accent,
            color: '#FFFFFF',
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          <Download size={15} /> View Full R&eacute;sum&eacute;
        </a>
        <p style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', letterSpacing: '0.08em', color: P.muted, margin: 0, maxWidth: '52ch' }}>
          Complete employment history, education, credentials, and references available in the full r&eacute;sum&eacute;.
        </p>
      </div>
    </SectionWrap>
  );
}