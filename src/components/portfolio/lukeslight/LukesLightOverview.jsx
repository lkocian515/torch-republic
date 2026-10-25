import React from 'react';
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO, LUKES_LIGHT_URL, LUKES_LIGHT_MARK, CONTACT_EMAIL, portfolioHomeUrl } from '../portfolioTheme';
import { Link } from 'react-router-dom';

export default function LukesLightOverview() {
  return (
    <section
      id="top"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3.5rem, 7vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 4.5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Link
          to={portfolioHomeUrl()}
          style={{
            fontFamily: FONT_MONO,
            fontSize: '0.72rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: P.secondary,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '2.5rem',
            transition: 'color .2s',
          }}
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>

        <div style={{ maxWidth: '720px' }}>
          <p
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.7rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: P.accentInk,
              margin: '0 0 1rem',
            }}
          >
            Case study
          </p>
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontWeight: 700,
              fontSize: 'clamp(2.25rem, 4.5vw, 3rem)',
              lineHeight: 1.1,
              color: P.ink,
              margin: '0 0 0.6rem',
              letterSpacing: '-0.02em',
            }}
          >
            Luke&rsquo;s Light
          </h1>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              color: P.accentInk,
              margin: '0 0 1.75rem',
            }}
          >
            Content Quality and Usability for a Youth Safety Resource
          </p>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: '1rem',
              lineHeight: 1.75,
              color: P.secondary,
              margin: '0 0 2rem',
              maxWidth: '640px',
            }}
          >
            An educational resource designed to help children, teens, and concerned families recognize
            unsafe situations and find pathways to professional support. The project brings together
            AI-assisted development, careful content review, and a focus on clear, manageable user journeys.
          </p>

          <div
            style={{
              background: P.surface,
              border: `1px solid ${P.rule}`,
              borderRadius: '6px',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.75rem',
            }}
          >
            <p
              style={{
                fontFamily: FONT_MONO,
                fontSize: '0.64rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: P.muted,
                margin: '0 0 0.4rem',
              }}
            >
              Role
            </p>
            <p
              style={{
                fontFamily: FONT_SANS,
                fontSize: '0.9rem',
                color: P.ink,
                margin: 0,
                lineHeight: 1.55,
              }}
            >
              Project creator &middot; AI-assisted product development &middot; Content review &middot; Usability QA
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={LUKES_LIGHT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: '0.875rem',
                color: P.onAccent,
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
              Visit Luke&rsquo;s Light <ExternalLink size={14} />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              style={{
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: '0.875rem',
                color: P.ink,
                border: `1px solid ${P.rule}`,
                padding: '0.65rem 1.4rem',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Mail size={14} /> Contact Lisa
            </a>
          </div>

          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: '0.85rem',
              lineHeight: 1.65,
              color: P.muted,
              margin: '2rem 0 0',
              fontStyle: 'italic',
              maxWidth: '560px',
            }}
          >
            Created in memory of Luke Andrew Rogers, Luke&rsquo;s Light centers on helping young people
            understand that support exists and how to reach it.
          </p>
        </div>

        {/* Luke's Light's own published brand artwork, shown at its natural
            proportion so nothing in the lockup is cropped. */}
        <figure style={{ margin: '3rem 0 0', maxWidth: '720px' }}>
          <div
            style={{
              border: `1px solid ${P.rule}`,
              borderRadius: '6px',
              overflow: 'hidden',
              background: P.surface,
            }}
          >
            <img
              src={LUKES_LIGHT_MARK}
              alt="Luke's Light brand artwork: the site name with an illustrated lighthouse, the line 'Guiding young people toward safety', and the dedication 'In loving memory of Luke Andrew Rogers'."
              loading="lazy"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <figcaption
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.66rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: P.muted,
              marginTop: '0.6rem',
            }}
          >
            lukeslight.org
          </figcaption>
        </figure>
      </div>
    </section>
  );
}