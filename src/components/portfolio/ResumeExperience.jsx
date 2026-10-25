import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS, LIVE_STORE, RESUME_URL, LINKEDIN, CONTACT_EMAIL } from './portfolioTheme';

// ── Contact bar ────────────────────────────────────────────────────────────
const CONTACT = [
  { icon: MapPin, label: 'Corpus Christi, TX · Remote' },
  { icon: Phone, label: '361-960-6850' },
  { icon: Mail, label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
];

// ── Primary experience ─────────────────────────────────────────────────────
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
      'Managed structural editing, copyediting, proofreading, terminology standardization, version control, and final-format QA across long-form content.',
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
      'Compared records and supporting materials against drafted documents to identify missing information, contradictory details, incorrect names or dates, signature issues, version errors, and required corrections before submission.',
    ],
  },
];

// ── Additional experience ──────────────────────────────────────────────────
const ADDITIONAL = [
  { title: 'Owner, Mobile Notary & Loan Signing Agent', company: 'South Texas Mobile Notary', period: '2017 – 2023', note: 'Detailed QA of legal and financial packages for accuracy, completeness, and Texas notary compliance.' },
  { title: 'Office Manager & Notary Public', company: 'The Postal Place', period: '2013 – 2024', note: 'Records, transactions, notarizations, and document quality in a fast-paced service environment.' },
  { title: 'Office Manager', company: 'Access Storage', period: '2009 – 2024', note: 'Operations and documentation for a 400-unit facility; agreements, financial records, and account files.' },
  { title: 'Administrative Assistant / Estimator', company: 'ServiceMaster', period: '2006 – 2009', note: 'Estimates, reports, invoices, customer records, and internal documents using Microsoft Office and QuickBooks.' },
];

// ── Tech stack ─────────────────────────────────────────────────────────────
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

// ── Certifications ─────────────────────────────────────────────────────────
const CERTS = [
  'Jira Fundamentals Badge · Atlassian University, 2026',
  'Introduction to Automation Diploma · UiPath Academy, 2026',
  'Google Analytics Certification · Google Skillshop, 2026',
  'Intro to Machine Learning · Kaggle (In Progress)',
  'Intermediate Machine Learning · Kaggle (In Progress)',
  'Responsive Web Design · freeCodeCamp (In Progress)',
];

// ── QA Methods ─────────────────────────────────────────────────────────────
const QA_METHODS = [
  'Requirements-to-test translation',
  'Acceptance criteria',
  'Exploratory & direct-route testing',
  'Expected-vs-actual comparison',
  'Functional & interface testing',
  'API / integration validation',
  'Defect reproduction & documentation',
  'Error categorization',
  'Source verification',
  'Version comparison',
  'Regression & revalidation',
  'Privacy / PII review',
  'Evidence-based corrective feedback',
];

// ── Education ──────────────────────────────────────────────────────────────
const EDUCATION = [
  { degree: 'Bachelor of Arts in Psychology, Minor in Business Administration', school: 'Texas A&M University-Corpus Christi', year: '2012' },
  { degree: 'Paralegal Certificate, ABA-Approved Paralegal Program', school: 'Center for Advanced Legal Studies', year: '2017' },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function ExperienceCard({ job }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: 10, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left"
        style={{ padding: '1.15rem 1.35rem', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-0.5">
              <span style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '0.95rem', color: P.ink }}>{job.title}</span>
              {job.link && (
                <a href={job.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: P.accentInk, display: 'inline-flex', alignItems: 'center' }}>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span style={{ fontFamily: FONT_SANS, fontSize: '0.82rem', color: P.accentInk, fontWeight: 600 }}>{job.company}</span>
              <span style={{ fontFamily: FONT_MONO, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: P.muted }}>{job.period} · {job.type}</span>
            </div>
          </div>
          <span style={{ color: P.accentInk, flexShrink: 0, marginTop: 2 }}>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </div>
      </button>
      {open && (
        <ul style={{ margin: 0, padding: '1rem 1.35rem 1.25rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: `1px solid ${P.rule}` }}>
          {job.bullets.map((b, i) => (
            <li key={i} style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.7, color: P.secondary, display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
              <span style={{ color: P.accentInk, fontSize: '0.7rem', marginTop: '0.35rem', flexShrink: 0 }} aria-hidden="true">▸</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SubHeading({ children }) {
  return (
    <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk, marginBottom: '1rem', marginTop: '2.5rem' }}>
      {children}
    </p>
  );
}

export default function ResumeExperience() {
  const [showStack, setShowStack] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  return (
    <SectionWrap id="experience">
      {/* ── Header ── */}
      <Eyebrow>Full Résumé</Eyebrow>
      <SectionHeading>Lisa M. Kocian</SectionHeading>

      {/* ── LinkedIn — prominent ── */}
      <a
        href={LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-1 mb-5"
        style={{
          minHeight: 44,
          padding: '0.55rem 1.25rem',
          borderRadius: '999px',
          background: '#0A66C2',
          color: '#FFFFFF',
          fontFamily: FONT_SANS,
          fontWeight: 600,
          fontSize: '0.875rem',
          textDecoration: 'none',
        }}
      >
        <Linkedin size={15} /> linkedin.com/in/lisamariekocian
      </a>

      {/* ── Contact info ── */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6" style={{ borderBottom: `1px solid ${P.rule}`, paddingBottom: '1.25rem' }}>
        {CONTACT.map(({ icon: Icon, label, href }) =>
          href ? (
            <a key={label} href={href} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: FONT_SANS, fontSize: '0.82rem', color: P.accentInk, textDecoration: 'none' }}>
              <Icon size={13} style={{ flexShrink: 0 }} /> {label}
            </a>
          ) : (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: FONT_SANS, fontSize: '0.82rem', color: P.secondary }}>
              <Icon size={13} style={{ flexShrink: 0, color: P.muted }} /> {label}
            </span>
          )
        )}
      </div>

      {/* ── Professional Summary ── */}
      <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.75, color: P.secondary, maxWidth: '72ch' }}>
        AI quality assurance, AI implementation, and content-evaluation specialist with more than 15 years of experience reviewing high-stakes written content, legal and business documentation, digital products, and AI-assisted output. Skilled in LLM evaluation, prompt and instruction testing, source-to-output validation, hallucination and unsupported-claim detection, defect reproduction, NLP-aware review, and evidence-based corrective feedback. Hands-on technical experience spans modern full-stack web technologies, APIs, cloud infrastructure, databases, and AI-assisted e-commerce workflows.
      </p>

      {/* ── Core expertise tags ── */}
      <div className="flex flex-wrap gap-2 mt-5">
        {['AI Output & LLM Evaluation', 'AI Application QA', 'NLP', 'Rubric-Based Scoring', 'Prompt Testing', 'Source-to-Output Verification', 'Hallucination Detection', 'Defect Reproduction', 'Regression & Revalidation', 'API / GraphQL QA', 'Full-Stack Web QA', 'Privacy / PII Review'].map((tag) => (
          <span key={tag} style={{ fontFamily: FONT_MONO, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600, color: P.accentInk, background: P.accentSoft, border: `1px solid ${P.accent}25`, borderRadius: '999px', padding: '0.3rem 0.75rem' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* ── Primary Experience ── */}
      <SubHeading>Professional Experience</SubHeading>
      <div className="flex flex-col gap-3">
        {EXPERIENCE.map((job) => (
          <ExperienceCard key={job.title + job.company} job={job} />
        ))}
      </div>

      {/* ── Additional Experience (collapsible) ── */}
      <div style={{ marginTop: '1.5rem' }}>
        <button
          onClick={() => setShowAdditional((v) => !v)}
          className="flex items-center gap-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk }}>
            Additional Experience
          </span>
          {showAdditional ? <ChevronUp size={14} style={{ color: P.accentInk }} /> : <ChevronDown size={14} style={{ color: P.accentInk }} />}
        </button>
        {showAdditional && (
          <div className="mt-4 flex flex-col gap-3">
            {ADDITIONAL.map((job) => (
              <div key={job.title} style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: 10, padding: '1rem 1.35rem' }}>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                  <span style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '0.88rem', color: P.ink }}>{job.title}</span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: '0.8rem', color: P.accentInk, fontWeight: 600 }}>· {job.company}</span>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '0.63rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: P.muted }}>{job.period}</span>
                </div>
                <p style={{ fontFamily: FONT_SANS, fontSize: '0.83rem', color: P.secondary, lineHeight: 1.6, margin: 0 }}>{job.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Tech Stack ── */}
      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={() => setShowStack((v) => !v)}
          className="flex items-center gap-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk }}>
            Technical &amp; Engineering Stack
          </span>
          {showStack ? <ChevronUp size={14} style={{ color: P.accentInk }} /> : <ChevronDown size={14} style={{ color: P.accentInk }} />}
        </button>
        {showStack && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {TECH_STACK.map((row) => (
              <div key={row.area} className="flex gap-3" style={{ borderBottom: `1px solid ${P.rule}`, paddingBottom: '0.65rem' }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.63rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk, minWidth: 90, paddingTop: '0.1rem', flexShrink: 0 }}>{row.area}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: '0.83rem', color: P.secondary, lineHeight: 1.55 }}>{row.items}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── QA Methods ── */}
      <SubHeading>Quality Assurance Methods</SubHeading>
      <div className="flex flex-wrap gap-2">
        {QA_METHODS.map((m) => (
          <span key={m} style={{ fontFamily: FONT_SANS, fontSize: '0.8rem', color: P.secondary, background: P.surface, border: `1px solid ${P.rule}`, borderRadius: 6, padding: '0.3rem 0.65rem' }}>
            {m}
          </span>
        ))}
      </div>

      {/* ── Certifications ── */}
      <SubHeading>Certifications &amp; Professional Development</SubHeading>
      <div className="flex flex-col gap-2">
        {CERTS.map((c) => (
          <div key={c} className="flex items-start gap-2">
            <span style={{ color: P.accentInk, fontSize: '0.7rem', marginTop: '0.3rem', flexShrink: 0 }} aria-hidden="true">▸</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', color: P.secondary, lineHeight: 1.65 }}>{c}</span>
          </div>
        ))}
      </div>

      {/* ── Education ── */}
      <SubHeading>Education &amp; Credentials</SubHeading>
      <div className="flex flex-col gap-4">
        {EDUCATION.map((e) => (
          <div key={e.degree} style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: 10, padding: '1rem 1.35rem' }}>
            <p style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '0.9rem', color: P.ink, margin: '0 0 0.2rem' }}>{e.degree}</p>
            <p style={{ fontFamily: FONT_SANS, fontSize: '0.82rem', color: P.accentInk, fontWeight: 600, margin: 0 }}>{e.school}</p>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.63rem', letterSpacing: '0.12em', color: P.muted, textTransform: 'uppercase', margin: '0.2rem 0 0' }}>{e.year}</p>
          </div>
        ))}
        <p style={{ fontFamily: FONT_SANS, fontSize: '0.83rem', color: P.secondary }}>
          <strong style={{ color: P.ink }}>Additional Credentials:</strong> Texas Notary Public · Remote Online Notary · NNA Loan Signing Agent
        </p>
      </div>

      {/* ── CTAs ── */}
      <div className="mt-9 flex flex-wrap gap-3" style={{ borderTop: `1px solid ${P.rule}`, paddingTop: '2rem' }}>
        <a
          href={RESUME_URL}
          className="inline-flex items-center gap-2"
          style={{ minHeight: 44, padding: '0.6rem 1.4rem', borderRadius: '999px', background: P.accent, color: '#FFFFFF', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}
        >
          <Mail size={14} /> Request Full Résumé by Email
        </a>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2"
          style={{ minHeight: 44, padding: '0.6rem 1.25rem', borderRadius: '999px', background: '#0A66C2', color: '#FFFFFF', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}
        >
          <Linkedin size={14} /> Connect on LinkedIn
        </a>
      </div>
    </SectionWrap>
  );
}