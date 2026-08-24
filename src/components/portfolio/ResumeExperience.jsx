import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS, LIVE_STORE, RESUME_URL } from './portfolioTheme';

const EXPERIENCE = [
  {
    title: 'AI Quality Review Contractor',
    company: 'Alignerr',
    period: '2026 – Present',
    type: 'Remote',
    bullets: [
      'Selected for contract-based quality review of AI-generated English content using detailed task instructions, evaluation rubrics, and evidence-based written rationales.',
      'Evaluate accuracy, completeness, relevance, logic, tone, style, safety, and instruction adherence; identify unsupported claims and inconsistencies; document clear corrections and revalidation findings.',
    ],
  },
  {
    title: 'Published Author & Editorial Project Lead',
    company: 'The Stop Trying Method / Independent Publishing',
    period: '2025 – Present',
    type: 'Remote',
    bullets: [
      'Authored, edited, proofread, and independently published the full-length nonfiction book You Can\'t Fix Them, So Stop Trying and a companion workbook across print and digital formats.',
      'Tested AI-assisted outputs against prompts and requirements; identified invented details, omissions, unsupported claims, tone drift, privacy concerns, and unintended changes before approval.',
    ],
  },
  {
    title: 'Founder / AI E-Commerce Product & Quality Lead',
    company: 'Torch Republic Coffee Company',
    period: '2025 – Present',
    type: 'Remote',
    link: LIVE_STORE,
    bullets: [
      'Direct AI-assisted e-commerce implementation and QA across product content, customer journeys, navigation, forms, responsive interfaces, account behavior, research content, and conversion-oriented workflows.',
      'Translate business requirements into prompts, acceptance criteria, test cases, defect reports, regression checks, and iterative revision instructions; validate corrected behavior after changes.',
      'Maintain version-controlled site code in GitHub and review AI-assisted changes for functional accuracy, usability, brand consistency, data integrity, privacy, and customer impact.',
    ],
  },
  {
    title: 'Remote Freelance Paralegal / Legal Document QA',
    company: 'Self-Employed Contract Support',
    period: '2020 – 2023',
    type: 'Remote',
    bullets: [
      'Reviewed, edited, organized, and prepared legal and client documents for accuracy, completeness, wording, formatting, procedural requirements, and confidentiality.',
      'Compared records and supporting materials against drafted documents to identify missing information, contradictory details, incorrect names or dates, signature issues, version errors, and required corrections.',
    ],
  },
];

const TECH_STACK = [
  { area: 'Frontend', items: 'React.js, Redux, TypeScript, HTML/CSS, Responsive UI' },
  { area: 'Backend', items: 'Node.js, TypeScript, Python; familiarity with Java & Kotlin' },
  { area: 'APIs', items: 'GraphQL; API behavior, request/response, integration & functional QA' },
  { area: 'Cloud', items: 'Google Cloud Platform (GCP), Kubernetes, Google Cloud Storage' },
  { area: 'Databases', items: 'MySQL, PostgreSQL, Google Cloud Spanner' },
  { area: 'Streaming', items: 'Kafka, Google Cloud Pub/Sub' },
  { area: 'AI / NLP', items: 'LLM evaluation, AI application QA, AI performance monitoring, prompt/instruction testing' },
  { area: 'Dev Practices', items: 'GitHub, Agile workflows, rapid iteration, responsive web validation' },
];

function ExperienceCard({ job }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: P.surface,
        border: `1px solid ${P.rule}`,
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left"
        style={{ padding: '1.15rem 1.35rem', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-0.5">
              <span style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '0.95rem', color: P.ink }}>
                {job.title}
              </span>
              {job.link && (
                <a href={job.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: P.accent, display: 'inline-flex', alignItems: 'center' }}>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.82rem', color: P.accent, fontWeight: 600 }}>
                {job.company}
              </span>
              <span style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: P.muted }}>
                {job.period} · {job.type}
              </span>
            </div>
          </div>
          <span style={{ color: P.accent, flexShrink: 0, marginTop: 2 }}>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </button>
      {open && (
        <ul
          style={{ margin: 0, padding: '0 1.35rem 1.25rem 1.35rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: `1px solid ${P.rule}`, paddingTop: '1rem' }}
        >
          {job.bullets.map((b, i) => (
            <li key={i} style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.7, color: P.secondary, display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
              <span style={{ color: P.accent, fontSize: '0.7rem', marginTop: '0.35rem', flexShrink: 0 }} aria-hidden="true">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ResumeExperience() {
  const [showStack, setShowStack] = useState(false);

  return (
    <SectionWrap id="experience">
      <Eyebrow>Professional Experience</Eyebrow>
      <SectionHeading>Work History</SectionHeading>

      <div className="mt-8 flex flex-col gap-3">
        {EXPERIENCE.map((job) => (
          <ExperienceCard key={job.title + job.company} job={job} />
        ))}
      </div>

      {/* Tech Stack accordion */}
      <div style={{ marginTop: '2.5rem', borderTop: `1px solid ${P.rule}`, paddingTop: '2rem' }}>
        <button
          onClick={() => setShowStack((v) => !v)}
          className="flex items-center gap-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, color: P.accent }}>
            Technical &amp; Engineering Stack
          </span>
          {showStack ? <ChevronUp size={14} style={{ color: P.accent }} /> : <ChevronDown size={14} style={{ color: P.accent }} />}
        </button>

        {showStack && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {TECH_STACK.map((row) => (
              <div key={row.area} className="flex gap-3" style={{ borderBottom: `1px solid ${P.rule}`, paddingBottom: '0.65rem' }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk, minWidth: 90, paddingTop: '0.1rem', flexShrink: 0 }}>
                  {row.area}
                </span>
                <span style={{ fontFamily: FONT_SANS, fontSize: '0.83rem', color: P.secondary, lineHeight: 1.55 }}>
                  {row.items}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
          style={{
            minHeight: 44,
            padding: '0.6rem 1.4rem',
            borderRadius: '999px',
            background: P.accent,
            color: '#FFFFFF',
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: '0.875rem',
            textDecoration: 'none',
          }}
        >
          <ExternalLink size={14} /> Download Full Résumé (PDF)
        </a>
      </div>
    </SectionWrap>
  );
}