import React from 'react';
import { BadgeCheck, ExternalLink, Brain, ShieldCheck, Sparkles, Globe2 } from 'lucide-react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_SANS, FONT_MONO } from './portfolioTheme';
import { usePortfolioMotion } from './usePortfolioMotion';

const HIGHLIGHTS = [
  {
    icon: Brain,
    title: 'Human-in-the-Loop Evaluation',
    body: 'Evaluating, rating, and refining AI model outputs to improve accuracy, coherence, and alignment with human intent.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality & Safety',
    body: 'Identifying hallucinations, unsupported claims, and inconsistencies before AI output reaches end users.',
  },
  {
    icon: Sparkles,
    title: 'Shaping AI Training',
    body: 'Providing expert feedback that directly informs model training, fine-tuning, and reinforcement learning.',
  },
  {
    icon: Globe2,
    title: 'Global Expert Network',
    body: 'Part of a vetted worldwide community of domain specialists selected to research and shape the future of AI.',
  },
];

export default function AlignerrCredential() {
  const scope = usePortfolioMotion((gsap, ScrollTrigger, el) => {
    gsap.from('.alignerr-credential-head > *', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
    gsap.from('.alignerr-card', {
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.alignerr-grid', start: 'top 85%' },
    });
  });

  return (
    <SectionWrap id="alignerr" alt>
      <div ref={scope}>
        {/* Credential badge */}
        <div className="text-center md:text-left" style={{ marginBottom: '1rem' }}>
          <a
            href="https://labelbox.com/alignerr"
            target="_blank"
            rel="noopener noreferrer"
            className="alignerr-badge inline-flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: P.accentSoft,
              border: `1px solid ${P.accent}30`,
              textDecoration: 'none',
            }}
          >
            <BadgeCheck size={18} style={{ color: P.accentInk, flexShrink: 0 }} strokeWidth={2} />
            <span style={{ fontFamily: FONT_SANS, fontSize: '0.8125rem', fontWeight: 600, color: P.accentInk }}>
              Alignerr Network
            </span>
            <span style={{ fontFamily: FONT_MONO, fontSize: '0.6rem', color: P.muted, letterSpacing: '0.08em' }}>
              &middot;
            </span>
            <span style={{ fontFamily: FONT_SANS, fontSize: '0.8125rem', fontWeight: 500, color: P.secondary }}>
              Labelbox
            </span>
          </a>
        </div>

        <div className="alignerr-credential-head">
          <Eyebrow>Professional Credential</Eyebrow>
          <SectionHeading>Shaping the Future of AI</SectionHeading>
          <Lead>
            I am part of the Alignerr network by Labelbox &mdash; a global community of vetted domain
            experts who actively research, evaluate, and refine AI model output. Through expert-in-the-loop
            evaluation, Alignerr members provide the human feedback that directly improves AI accuracy,
            safety, and alignment. This credential reflects hands-on work evaluating AI-generated content,
            identifying defects, and supplying structured corrective feedback that shapes how models learn.
          </Lead>
        </div>

        {/* Highlight grid */}
        <div
          className="alignerr-grid mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          style={{ maxWidth: 760 }}
        >
          {HIGHLIGHTS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="alignerr-card"
              style={{
                background: P.surface,
                border: `1px solid ${P.rule}`,
                borderRadius: '8px',
                padding: '1.25rem 1.35rem',
              }}
            >
              <Icon size={20} style={{ color: P.accentInk, marginBottom: '0.6rem' }} strokeWidth={1.75} />
              <h3
                style={{
                  fontFamily: FONT_SANS,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  color: P.ink,
                  margin: '0 0 0.4rem',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: P.secondary,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center md:text-left">
          <a
            href="https://labelbox.com/alignerr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors duration-200"
            style={{
              minHeight: 44,
              padding: '0.6rem 1.25rem',
              borderRadius: '999px',
              background: P.accent,
              color: '#FFFFFF',
              fontFamily: FONT_SANS,
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            Learn About Alignerr <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </SectionWrap>
  );
}