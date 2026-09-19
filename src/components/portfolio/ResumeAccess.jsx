import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import { SectionWrap } from './PortfolioPrimitives';
import { P, FONT_SANS, FONT_MONO, CONTACT_EMAIL } from './portfolioTheme';

// Résumé access — résumé is available on request, not as a public download.
// This protects privacy while still providing access to serious employers.
export default function ResumeAccess() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    setSubject('Résumé Request — Lisa Marie Kocian');
    setBody('Hello Lisa,%0D%0A%0D%0AI reviewed your portfolio and would like to request your full résumé.%0D%0A%0D%0AThank you.');
  }, []);

  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Résumé Request — Lisa Marie Kocian')}&body=${encodeURIComponent('Hello Lisa,\n\nI reviewed your portfolio and would like to request your full résumé.\n\nThank you.')}`;

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
          href={mailtoLink}
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
          <Mail size={15} /> Request My R&eacute;sum&eacute;
        </a>
        <p style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', letterSpacing: '0.08em', color: P.muted, margin: 0, maxWidth: '52ch' }}>
          Complete employment history, education, credentials, and references are available upon request to verified employers and recruiters.
        </p>
      </div>
    </SectionWrap>
  );
}