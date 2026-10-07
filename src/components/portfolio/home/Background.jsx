import React from 'react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from './SectionHeading';

const EXPERIENCE = [
  { role: 'AI Quality Review Contractor', org: 'Alignerr', period: '2026 to Present', location: 'Remote' },
  { role: 'Published Author & Editorial Project Lead', org: 'The Stop Trying Method / Independent Publishing', period: '2025 to Present', location: 'Remote' },
  { role: 'Founder / AI E-Commerce Product & Quality Lead', org: 'Torch Republic Coffee Company', period: '2025 to Present', location: 'Remote' },
  { role: 'Remote Freelance Paralegal / Legal Document QA', org: 'Self-Employed Contract Support', period: '2020 to 2023', location: 'Remote' },
];

const TOOLS = [
  { area: 'AI & Evaluation', items: 'LLM output evaluation; prompt/instruction testing; AI performance QA; NLP-aware review; hallucination detection.' },
  { area: 'Engineering Stack', items: 'React / Redux / TypeScript; Node.js / Python; GraphQL & API QA; GCP / Kubernetes; MySQL / PostgreSQL.' },
  { area: 'Commerce & Analytics', items: 'Shopify; Base44; Google Analytics; Google Search Console; Klaviyo.' },
  { area: 'QA Methods', items: 'Defect reproduction/docs; regression & revalidation; direct-route testing; access-control review; privacy / PII review.' },
  { area: 'Dev Practices', items: 'GitHub version control; Agile workflows; Jira; UiPath Automation.' },
];

const QA_METHODS = [
  'Requirements-to-test translation',
  'Acceptance criteria',
  'Exploratory and direct-route testing',
  'Expected-vs-actual comparison',
  'Functional and interface testing',
  'API / integration validation',
  'Defect reproduction and documentation',
  'Error categorization',
  'Source verification',
  'Version comparison',
  'Regression and revalidation',
  'Privacy / PII review',
  'Evidence-based corrective feedback',
];

const CERTIFICATIONS = [
  { name: 'Jira Fundamentals Badge', org: 'Atlassian University', year: '2026', status: '' },
  { name: 'Introduction to Automation Diploma', org: 'UiPath Academy', year: '2026', status: '' },
  { name: 'Google Analytics Certification', org: 'Google Skillshop', year: '2026', status: '' },
  { name: 'Intro to Machine Learning', org: 'Kaggle', year: '', status: '' },
  { name: 'Intermediate Machine Learning', org: 'Kaggle', year: '', status: '' },
  { name: 'Responsive Web Design', org: 'freeCodeCamp', year: '', status: '' },
  { name: 'Career Essentials in Generative AI', org: 'Microsoft', year: '', status: '' },
  { name: 'AI Fundamentals', org: 'IBM', year: '', status: '' },
  { name: 'AWS Certified AI Practitioner', org: 'Amazon Web Services', year: '', status: '' },
];

const thStyle = {
  fontFamily: FONT_MONO,
  fontSize: '0.64rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: '#FFFFFF',
  margin: 0,
};

export default function Background() {
  return (
    <section
      id="experience"
      style={{
        background: P.surface,
        borderTop: `1px solid ${P.rule}`,
        borderBottom: `1px solid ${P.rule}`,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        {/* Professional Experience */}
        <SectionHeading eyebrow="Experience" heading="Professional experience" />
        <div style={{ marginBottom: '3rem', border: `1px solid ${P.rule}`, borderRadius: '6px', overflow: 'hidden' }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ background: '#596773', padding: '0.75rem 1.25rem' }}>
            <p style={thStyle}>Role</p>
            <p style={thStyle}>Organization / Period</p>
          </div>
          {EXPERIENCE.map((e, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ padding: '0.85rem 1.25rem', background: i % 2 === 0 ? P.paper : P.surface, borderTop: i > 0 ? `1px solid ${P.rule}` : 'none' }}
            >
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 600, color: P.ink, margin: 0, lineHeight: 1.5 }}>{e.role}</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', color: P.secondary, margin: 0, lineHeight: 1.5 }}>
                {e.org} &middot; {e.period} &middot; {e.location}
              </p>
            </div>
          ))}
        </div>

        {/* Tools & Platforms */}
        <SectionHeading eyebrow="Tools" heading="Tools & platforms" />
        <div style={{ marginBottom: '3rem', border: `1px solid ${P.rule}`, borderRadius: '6px', overflow: 'hidden' }}>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]" style={{ background: '#596773', padding: '0.75rem 1.25rem' }}>
            <p style={thStyle}>Area</p>
            <p style={thStyle}>Tools / Skills</p>
          </div>
          {TOOLS.map((t, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr]"
              style={{ padding: '0.85rem 1.25rem', background: i % 2 === 0 ? P.paper : P.surface, borderTop: i > 0 ? `1px solid ${P.rule}` : 'none' }}
            >
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 600, color: P.ink, margin: 0, lineHeight: 1.5 }}>{t.area}</p>
              <p style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', color: P.secondary, margin: 0, lineHeight: 1.5 }}>{t.items}</p>
            </div>
          ))}
        </div>

        {/* QA Methods */}
        <SectionHeading eyebrow="Methods" heading="Quality assurance methods" />
        <div style={{ marginBottom: '3rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {QA_METHODS.map((m) => (
              <li key={m} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: P.accent, marginTop: '0.55rem', flexShrink: 0 }} aria-hidden="true" />
                <span style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.55, color: P.secondary }}>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <SectionHeading eyebrow="Credentials" heading="Certifications & professional development" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {CERTIFICATIONS.map((c, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.7rem 1rem',
                border: `1px solid ${P.rule}`,
                borderRadius: '4px',
                background: P.paper,
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 600, color: P.ink }}>{c.name}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.825rem', color: P.secondary }}>
                {c.org}{c.year ? `, ${c.year}` : ''}{c.status ? ` (${c.status})` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}