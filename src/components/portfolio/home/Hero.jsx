import React from 'react';
import { ArrowRight, Mail, Linkedin } from 'lucide-react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO, LINKEDIN } from '../portfolioTheme';
import OrbitalField from '../OrbitalField';

export default function Hero() {
  return (
    <section
      id="top"
      className="pf-hero"
      style={{
        background: P.paper,
        paddingTop: 'clamp(2.75rem, 7vw, 6rem)',
        paddingBottom: 'clamp(2.75rem, 6vw, 5rem)',
        scrollMarginTop: 72,
      }}
    >
      <OrbitalField className="pf-hero-bg" opacity={0.3} />

      <div className="pf-hero-grid mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-center lg:gap-14">
          <div>
            <p
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: P.accentInk,
                margin: '0 0 1.5rem',
              }}
            >
              AI quality assurance &middot; Content evaluation &middot; Digital product QA
            </p>

            <h1
              style={{
                fontFamily: FONT_SERIF,
                fontWeight: 700,
                fontSize: 'clamp(2.15rem, 6.6vw, 3.6rem)',
                lineHeight: 1.04,
                color: P.ink,
                margin: 0,
                letterSpacing: '-0.02em',
                overflowWrap: 'break-word',
              }}
            >
              AI Quality Portfolio
            </h1>

            <p
              style={{
                fontFamily: FONT_SERIF,
                fontWeight: 700,
                fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                lineHeight: 1.2,
                color: P.ink,
                margin: '0.9rem 0 0.35rem',
              }}
            >
              Lisa Marie Kocian
            </p>

            <p
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: 'clamp(0.98rem, 2.2vw, 1.15rem)',
                lineHeight: 1.45,
                color: P.accentInk,
                margin: '0 0 1.5rem',
              }}
            >
              AI Quality Assurance &amp; Content Evaluation Specialist
            </p>

            <p
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 500,
                fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
                lineHeight: 1.55,
                color: P.ink,
                margin: '0 0 1.25rem',
              }}
            >
              Evaluating AI output. Improving content quality. Building better digital experiences.
            </p>

            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: '1rem',
                lineHeight: 1.7,
                color: P.secondary,
                margin: '0 0 2.25rem',
                maxWidth: '620px',
              }}
            >
              I work at the intersection of AI quality and content evaluation &mdash; combining AI output
              evaluation, prompt iteration, content review, and human judgment to identify problems, improve
              clarity, and build more reliable digital experiences.
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#work"
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  color: P.onAccent,
                  background: P.accent,
                  padding: '0.7rem 1.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  minHeight: 46,
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
                  padding: '0.7rem 1.5rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  minHeight: 46,
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
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  color: P.muted,
                  padding: '0.7rem 0.4rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.35rem',
                  minHeight: 46,
                }}
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="pf-hero-side">
            <OrbitalField className="pf-hero-arc" opacity={0.85} />
            <p
              className="pf-hero-phrase"
              style={{
                fontFamily: FONT_SERIF,
                fontWeight: 700,
                color: P.ink,
                letterSpacing: '-0.01em',
                maxWidth: '16ch',
              }}
            >
              Better AI products for real people.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}