import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

// Honest skills inventory. Technologies listed reflect practical working
// knowledge gained through the Torch Republic build — not expert engineering
// experience in every tool. Distinguishes hands-on QA/evaluation work from
// working knowledge of development tools.
const GROUPS = [
  {
    heading: 'AI Quality',
    items: ['Prompt testing', 'Output validation', 'Instruction adherence', 'Hallucination detection', 'Content evaluation', 'Consistency QA', 'Research verification'],
  },
  {
    heading: 'Product & E-Commerce',
    items: ['Customer journey testing', 'Conversion QA', 'E-commerce prototyping', 'SEO', 'Analytics', 'Accessibility', 'Checkout-flow testing', 'Content systems'],
  },
  {
    heading: 'Development / Technical',
    items: ['React', 'JavaScript', 'APIs', 'Base44', 'Shopify', 'GA4', 'Google Search Console'],
  },
  {
    heading: 'QA & Documentation',
    items: ['Defect documentation', 'Regression testing', 'Reproducible observations', 'Before/after comparison', 'Prioritization', 'Troubleshooting'],
  },
];

const AI_TRAINING = [
  {
    provider: 'Microsoft & LinkedIn',
    program: 'Career Essentials in Generative AI',
    status: 'In progress',
    focus: 'Generative AI foundations, responsible use, and practical workplace applications',
  },
  {
    provider: 'IBM SkillsBuild',
    program: 'AI Fundamentals',
    status: 'In progress',
    focus: 'Core AI concepts, machine learning foundations, ethics, and applied AI',
  },
  {
    provider: 'Google',
    program: 'AI Essentials',
    status: 'In progress',
    focus: 'Prompting, responsible AI, productivity workflows, and practical AI use',
  },
  {
    provider: 'Amazon Web Services',
    program: 'AWS Certified AI Practitioner',
    status: 'Exam preparation',
    focus: 'AI/ML concepts, generative AI, foundation models, responsible AI, and AWS AI services',
  },
  {
    provider: 'DeepLearning.AI',
    program: 'Agentic AI with Andrew Ng',
    status: 'In progress',
    focus: 'Agentic workflows, reflection, tool use, planning, and multi-agent patterns',
  },
];

export default function ToolsPlatforms() {
  return (
    <SectionWrap id="tools" alt>
      <Eyebrow>Skills &amp; Tools</Eyebrow>
      <SectionHeading>What I work with</SectionHeading>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GROUPS.map((g) => (
          <div key={g.heading}>
            <p style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: P.accent, margin: '0 0 0.85rem', paddingBottom: '0.5rem', borderBottom: `1px solid ${P.rule}` }}>
              {g.heading}
            </p>
            <ul className="m-0 p-0 list-none flex flex-col gap-2">
              {g.items.map((it) => (
                <li key={it} style={{ fontFamily: FONT_SANS, fontSize: '0.86rem', color: P.ink, display: 'flex', gap: '0.5rem', alignItems: 'baseline', lineHeight: 1.4 }}>
                  <span style={{ color: P.accent, fontSize: '0.7rem', flexShrink: 0 }} aria-hidden="true">&bull;</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ marginTop: '1.75rem', fontFamily: FONT_SANS, fontSize: '0.82rem', lineHeight: 1.6, color: P.muted, maxWidth: '65ch' }}>
        Technologies listed reflect practical working knowledge gained through hands-on project work.
        I distinguish between QA and evaluation expertise (where I am strongest) and working knowledge
        of development tools (which I use effectively for testing and implementation, not as a senior engineer).
      </p>

      <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: `1px solid ${P.rule}` }}>
        <Eyebrow>Current Learning</Eyebrow>
        <SectionHeading>AI Training &amp; Professional Development</SectionHeading>
        <p style={{ marginTop: '0.75rem', fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.7, color: P.secondary, maxWidth: '72ch' }}>
          Structured training supporting my hands-on work in AI quality, generative AI, responsible evaluation,
          agentic workflows, and AI-enabled product implementation. Status is shown clearly to distinguish
          active coursework and exam preparation from completed credentials.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {AI_TRAINING.map((item) => (
            <article key={item.provider + item.program} style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: 10, padding: '1.15rem 1.25rem' }}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: P.accent }}>
                  {item.provider}
                </span>
                <span style={{ fontFamily: FONT_MONO, fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk, background: P.accentSoft, borderRadius: 999, padding: '0.22rem 0.55rem' }}>
                  {item.status}
                </span>
              </div>
              <h3 style={{ margin: 0, fontFamily: FONT_SANS, fontSize: '0.96rem', lineHeight: 1.4, fontWeight: 700, color: P.ink }}>
                {item.program}
              </h3>
              <p style={{ margin: '0.5rem 0 0', fontFamily: FONT_SANS, fontSize: '0.82rem', lineHeight: 1.6, color: P.secondary }}>
                {item.focus}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}