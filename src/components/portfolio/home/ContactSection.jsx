import React from 'react';
import { Mail, Linkedin } from 'lucide-react';
import { P, FONT_SERIF, FONT_SANS, LINKEDIN, CONTACT_EMAIL } from '../portfolioTheme';

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3.5rem, 7vw, 5.5rem)',
        paddingBottom: 'clamp(3.5rem, 7vw, 5.5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 text-center">
        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            lineHeight: 1.25,
            color: P.ink,
            margin: '0 auto 1.25rem',
            maxWidth: '640px',
            letterSpacing: '-0.01em',
          }}
        >
          Looking for someone who catches issues before they reach users?
        </h2>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.975rem',
            lineHeight: 1.7,
            color: P.secondary,
            margin: '0 auto 2rem',
            maxWidth: '560px',
          }}
        >
          I am interested in opportunities involving AI quality assurance, content evaluation, prompt
          testing, document quality, e-commerce QA, and digital product review.
        </p>
        <div className="flex flex-col items-center gap-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.925rem',
              color: P.surface,
              background: P.accent,
              padding: '0.75rem 1.75rem',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background .2s',
            }}
          >
            <Mail size={16} /> Contact Lisa
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.9rem',
              color: P.accent,
              textDecoration: 'none',
            }}
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.875rem',
              color: P.secondary,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Linkedin size={14} /> Connect on LinkedIn
          </a>
        </div>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: '0.8rem',
            color: P.muted,
            margin: '2rem auto 0',
            maxWidth: '480px',
            lineHeight: 1.6,
            fontStyle: 'italic',
          }}
        >
          Complete employment history, education, credentials, and references are available to verified
          employers and recruiters upon request.
        </p>
      </div>
    </section>
  );
}