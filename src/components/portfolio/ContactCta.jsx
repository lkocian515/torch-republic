import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { P, FONT_MONO, FONT_SANS, LINKEDIN, CONTACT_EMAIL } from './portfolioTheme';

export default function ContactCta() {
  return (
    <section
      id="contact"
      style={{ background: P.ink, color: '#FFFFFF', scrollMarginTop: '72px' }}
    >
      <div className="mx-auto max-w-[860px] px-6 md:px-10 py-16 md:py-24 text-center">
        <p style={{ fontFamily: FONT_MONO, fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#9FE7D6', margin: 0 }}>
          Contact
        </p>
        <h2 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: 'clamp(1.7rem, 3.4vw, 2.5rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: '#FFFFFF', margin: '0.85rem 0 0' }}>
          Building Better AI-Enabled Experiences
        </h2>
        <p style={{ fontFamily: FONT_SANS, fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.82)', margin: '1rem auto 0', maxWidth: '56ch' }}>
          I’m interested in opportunities involving AI quality, AI implementation, e-commerce systems and the human
          judgment required to make emerging technology actually useful.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2"
            style={{ minHeight: 48, padding: '0.7rem 1.5rem', borderRadius: '999px', background: '#FFFFFF', color: P.ink, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
          >
            <Linkedin size={16} /> Connect on LinkedIn
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center gap-2"
            style={{ minHeight: 48, padding: '0.7rem 1.5rem', borderRadius: '999px', background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.4)', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
          >
            <Mail size={16} /> Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}