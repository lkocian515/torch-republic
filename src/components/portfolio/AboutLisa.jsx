import React from 'react';
import { ExternalLink, Download, Linkedin } from 'lucide-react';
import { SectionWrap, Eyebrow, SectionHeading, Lead } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS, LINKEDIN, RESUME_URL } from './portfolioTheme';

const CREDENTIALS = [
  'BA Psychology · Texas A&M-Corpus Christi',
  'Paralegal Certificate · ABA-Approved',
  'Jira Fundamentals · Atlassian 2026',
  'Google Analytics Certified · 2026',
  'UiPath Automation Diploma · 2026',
  'Remote Professional · Corpus Christi, TX',
];

const SUMMARY = `AI quality assurance, AI implementation, and content-evaluation specialist with more than 15 years of experience reviewing high-stakes written content, legal and business documentation, digital products, and AI-assisted output. Skilled in LLM evaluation, prompt and instruction testing, source-to-output validation, hallucination and unsupported-claim detection, defect reproduction, NLP-aware review, and evidence-based corrective feedback.`;

export default function AboutLisa() {
  return (
    <SectionWrap id="about">
      <Eyebrow>About</Eyebrow>
      <SectionHeading>Lisa Marie Kocian</SectionHeading>
      <Lead>{SUMMARY}</Lead>

      <p style={{ fontFamily: FONT_SANS, fontSize: '0.95rem', lineHeight: 1.75, color: P.secondary, marginTop: '0.85rem', maxWidth: '68ch' }}>
        I build and test functional AI-assisted digital experiences, including a Shopify-integrated
        e-commerce application developed with Base44 and React. Hands-on technical experience spans
        modern full-stack web technologies, APIs, cloud infrastructure, databases, and AI-assisted
        commerce workflows. A psychology background informs qualitative evaluation, language nuance,
        and human-centered technology &mdash; paired with business judgment and direct implementation
        experience.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {CREDENTIALS.map((f) => (
          <span
            key={f}
            style={{
              fontFamily: FONT_MONO,
              fontSize: '0.64rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: P.ink,
              background: P.surface,
              border: `1px solid ${P.rule}`,
              borderRadius: '999px',
              padding: '0.4rem 0.85rem',
            }}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
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
          <Download size={14} /> View Full Résumé
        </a>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
          style={{
            minHeight: 44,
            padding: '0.6rem 1.25rem',
            borderRadius: '999px',
            background: 'transparent',
            color: P.accentInk,
            border: `1px solid ${P.accent}50`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          <Linkedin size={14} /> lisamariekocian
        </a>
      </div>
    </SectionWrap>
  );
}