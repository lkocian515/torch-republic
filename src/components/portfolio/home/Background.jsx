import React from 'react';
import { P, FONT_SANS, FONT_MONO } from '../portfolioTheme';
import SectionHeading from './SectionHeading';
import Disclosure from './Disclosure';

const EXPERIENCE = [
  { role: 'AI Quality Review Contractor', org: 'Alignerr', period: '2026 to Present', location: 'Remote' },
  { role: 'Published Author & Editorial Project Lead', org: 'The Stop Trying Method / Independent Publishing', period: '2025 to Present', location: 'Remote' },
  { role: 'Founder / AI E-Commerce Product & Quality Lead', org: 'Torch Republic Coffee Company', period: '2025 to Present', location: 'Remote' },
  { role: 'Remote Freelance Paralegal / Legal Document QA', org: 'Self-Employed Contract Support', period: '2020 to 2023', location: 'Remote' },
];

const TOOLS = [
  { area: 'AI & Evaluation', items: 'LLM output evaluation; prompt/instruction testing; AI performance QA; NLP-aware review; hallucination detection.' },
  { area: 'Product & Commerce', items: 'Shopify; Base44; GA4; Google Search Console; customer-journey, cart, and checkout QA.' },
  { area: 'Working Technical Knowledge', items: 'React / JavaScript; APIs and GraphQL; Node.js / Python; GCP / Kubernetes; MySQL / PostgreSQL.' },
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

// Status follows the project's own résumé record. Only the three 2026
// credentials are completed; coursework and exam preparation are labelled as
// such and never presented as awarded certifications.
const CERTIFICATIONS = [
  { name: 'Jira Fundamentals Badge', org: 'Atlassian University', year: '2026', status: 'Completed' },
  { name: 'Introduction to Automation Diploma', org: 'UiPath Academy', year: '2026', status: 'Completed' },
  { name: 'Google Analytics Certification', org: 'Google Skillshop', year: '2026', status: 'Completed' },
  { name: 'Intro to Machine Learning', org: 'Kaggle', year: '', status: 'In progress' },
  { name: 'Intermediate Machine Learning', org: 'Kaggle', year: '', status: 'In progress' },
  { name: 'Responsive Web Design', org: 'freeCodeCamp', year: '', status: 'In progress' },
  { name: 'Career Essentials in Generative AI', org: 'Microsoft & LinkedIn', year: '', status: 'In progress' },
  { name: 'AI Fundamentals', org: 'IBM SkillsBuild', year: '', status: 'In progress' },
  { name: 'AI Essentials', org: 'Google', year: '', status: 'In progress' },
  { name: 'Agentic AI', org: 'DeepLearning.AI', year: '', status: 'In progress' },
  { name: 'AWS Certified AI Practitioner', org: 'Amazon Web Services', year: '', status: 'Exam preparation' },
];

const rowLabel = {
  fontFamily: FONT_SANS,
  fontSize: '0.9rem',
  fontWeight: 600,
  color: P.ink,
  margin: 0,
  lineHeight: 1.5,
};

const rowValue = {
  fontFamily: FONT_SANS,
  fontSize: '0.9rem',
  color: P.secondary,
  margin: 0,
  lineHeight: 1.55,
};

export default function Background() {
  return (
    <section
      id="experience"
      style={{
        background: P.paper,
        borderTop: `1px solid ${P.rule}`,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 72,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        {/* ── Professional experience ── */}
        <SectionHeading eyebrow="Experience" heading="Professional experience" />
        <div
          style={{
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            border: `1px solid ${P.rule}`,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {EXPERIENCE.map((e, i) => (
            <div
              key={e.role}
              className="grid gap-1 md:grid-cols-2 md:gap-6"
              style={{
                padding: '1rem 1.25rem',
                background: i % 2 === 0 ? P.surface : P.surfaceAlt,
                borderTop: i > 0 ? `1px solid ${P.rule}` : 'none',
              }}
            >
              <p style={rowLabel}>{e.role}</p>
              <p style={rowValue}>
                {e.org} &middot; {e.period} &middot; {e.location}
              </p>
            </div>
          ))}
        </div>

        {/* ── Tools & platforms ── */}
        <SectionHeading
          eyebrow="Tools"
          heading="Tools & platforms"
          intro="Technologies listed reflect practical working knowledge gained through applied projects, not expert engineering experience in every tool."
        />
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <Disclosure title="Tools & platforms" meta="Five areas" count={`${TOOLS.length}`} defaultOpen>
            <div style={{ border: `1px solid ${P.rule}`, borderRadius: '8px', overflow: 'hidden' }}>
              {TOOLS.map((t, i) => (
                <div
                  key={t.area}
                  className="grid gap-1 md:grid-cols-[190px_1fr] md:gap-6"
                  style={{
                    padding: '0.95rem 1.1rem',
                    background: i % 2 === 0 ? P.surfaceAlt : P.surface,
                    borderTop: i > 0 ? `1px solid ${P.rule}` : 'none',
                  }}
                >
                  <p style={rowLabel}>{t.area}</p>
                  <p style={rowValue}>{t.items}</p>
                </div>
              ))}
            </div>
          </Disclosure>
        </div>

        {/* ── QA methods ── */}
        <SectionHeading eyebrow="Methods" heading="Quality assurance methods" />
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <Disclosure title="Quality assurance methods" meta="Applied on every project" count={`${QA_METHODS.length}`}>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gap: '0.55rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              }}
            >
              {QA_METHODS.map((m) => (
                <li key={m} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: P.accentInk,
                      marginTop: '0.6rem',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.55, color: P.secondary }}>
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </Disclosure>
        </div>

        {/* ── Certifications ── */}
        <SectionHeading eyebrow="Credentials" heading="Certifications & professional development" />
        <Disclosure
          title="Certifications & professional development"
          meta={`${CERTIFICATIONS.length} programs`}
          count={`${CERTIFICATIONS.length}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.name}
                className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1"
                style={{
                  padding: '0.7rem 1rem',
                  border: `1px solid ${P.rule}`,
                  borderRadius: '4px',
                  background: P.surfaceAlt,
                }}
              >
                <span style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', fontWeight: 600, color: P.ink }}>
                  {c.name}
                </span>
                <span className="flex flex-wrap items-center gap-2">
                  <span style={{ fontFamily: FONT_SANS, fontSize: '0.82rem', color: P.secondary }}>
                    {c.org}
                    {c.year ? `, ${c.year}` : ''}
                  </span>
                  <span
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: c.status === 'Completed' ? P.accentInk : P.muted,
                      border: `1px solid ${P.rule}`,
                      borderRadius: '999px',
                      padding: '0.2rem 0.6rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {c.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Disclosure>
      </div>
    </section>
  );
}