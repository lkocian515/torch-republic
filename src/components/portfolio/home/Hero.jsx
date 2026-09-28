import React from 'react';
import { ArrowRight, Mail, Linkedin } from 'lucide-react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO, LINKEDIN } from '../portfolioTheme';

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        background: P.paper,
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div style={{ maxWidth: '720px' }}>
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: P.accent,
              margin: '0 0 1.5rem',
            }}
          >
            AI quality assurance &middot; Content evaluation &middot; Digital product QA
          </p>
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 700,
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.05,
              color: P.ink,
              margin: '0 0 0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Lisa Marie Kocian
          </h1>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: P.accentInk,
              margin: '0 0 1.75rem',
            }}
          >
            AI Quality Assurance &amp; Content Evaluation Specialist
          </p>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: P.secondary,
              margin: '0 0 2.25rem',
              maxWidth: '620px',
            }}
          >
            I evaluate AI-generated content, test digital workflows, and document defects with clear,
            actionable evidence. My background combines AI output review, document-intensive legal work,
            published authorship, and hands-on QA of a Shopify-integrated commerce application.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: '0.9rem',
                color: P.surface,
                background: P.accent,
                padding: '0.65rem 1.4rem',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'background .2s',
              }}
            >
              View selected work <ArrowRight size={15} />
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: '0.9rem',
                color: P.ink,
                background: 'transparent',
                border: `1px solid ${P.rule}`,
                padding: '0.65rem 1.4rem',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'border-color .2s',
              }}
            >
              <Mail size={15} /> Contact me
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: '0.9rem',
                color: P.accent,
                padding: '0.65rem 0.5rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>
        </div>
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.66rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: P.muted,
            margin: '2.5rem 0 0',
            paddingTop: '1.5rem',
            borderTop: `1px solid ${P.rule}`,
            maxWidth: '620px',
          }}
        >
          AI evaluation &middot; Content QA &middot; Workflow testing &middot; Defect documentation
        </p>
      </div>
    </section>
  );
}