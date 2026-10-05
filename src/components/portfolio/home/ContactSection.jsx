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
          Let&rsquo;s talk about AI quality and content evaluation.
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
          For opportunities in AI evaluation, content review, and digital product QA, contact me by email.
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
            <Mail size={16} /> {CONTACT_EMAIL}
          </a>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.85rem',
              color: P.secondary,
              margin: '0.5rem 0 0',
              lineHeight: 1.6,
            }}
          >
            R&eacute;sum&eacute; available by email.
          </p>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 500,
              fontSize: '0.875rem',
              color: P.muted,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginTop: '0.25rem',
            }}
          >
            <Linkedin size={14} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}