import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, Lead, Card } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS } from './portfolioTheme';

const FRAMEWORKS = [
  {
    n: '01',
    title: 'AI Output Quality & Evaluation',
    points: ['Evaluating outputs', 'Accuracy review', 'Consistency', 'Guideline adherence', 'Identifying errors', 'Hallucination awareness', 'Edge-case thinking', 'Human review', 'User-impact evaluation'],
    principle: 'AI output is only valuable when someone validates whether it is accurate, useful and appropriate for the user.',
  },
  {
    n: '02',
    title: 'Prompt Iteration & Model Behavior',
    points: ['Prompt refinement', 'Comparison testing', 'Instruction clarity', 'Output evaluation', 'Identifying failure patterns', 'Systematic iteration', 'Feedback loops'],
    principle: 'Prompting is not simply asking better questions. It is testing how changes in instruction affect behavior and output quality.',
  },
  {
    n: '03',
    title: 'E-Commerce UX & Conversion QA',
    points: ['Product discovery', 'Customer journey', 'Navigation', 'Mobile usability', 'Product presentation', 'Cart behavior', 'Checkout friction', 'Conversion thinking', 'Visual QA', 'Information architecture'],
    principle: 'Quality includes whether the customer can understand, trust and successfully use the experience.',
  },
  {
    n: '04',
    title: 'AI Workflow Implementation',
    points: ['Identifying repetitive work', 'AI-assisted workflows', 'Automation opportunities', 'Content workflows', 'Research workflows', 'Operational efficiency', 'Human-in-the-loop review', 'Implementation testing'],
    principle: 'The goal is not to use AI everywhere. The goal is to use it where it meaningfully improves the workflow.',
  },
  {
    n: '05',
    title: 'Systems & Integration Thinking',
    points: ['Storefront systems', 'Customer data', 'Analytics', 'AI tools', 'Marketing workflows', 'Product information', 'User experience', 'Third-party platforms', 'Interconnected business processes'],
    principle: 'A digital experience is a system, not a collection of isolated pages.',
  },
  {
    n: '06',
    title: 'Documentation & Continuous Improvement',
    points: ['Defect identification', 'Reproducible observations', 'QA documentation', 'Testing notes', 'Before/after comparison', 'Prioritization', 'Troubleshooting', 'Iteration', 'Communicating recommended fixes'],
    principle: 'Good QA does more than identify a problem. It makes the problem understandable and actionable.',
  },
];

export default function SixFrameworks() {
  return (
    <SectionWrap id="expertise">
      <Eyebrow>Core Capability Frameworks</Eyebrow>
      <SectionHeading>Where AI Quality Meets Commerce</SectionHeading>
      <Lead>My work combines human judgment, structured testing, business context and iterative implementation across six connected areas.</Lead>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
        {FRAMEWORKS.map((f) => (
          <Card key={f.n} pad="1.5rem">
            <div className="flex items-baseline gap-3">
              <span style={{ fontFamily: FONT_MONO, fontSize: '0.78rem', fontWeight: 700, color: P.accent }}>{f.n}</span>
              <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.05rem', color: P.ink, margin: 0, lineHeight: 1.3 }}>{f.title}</h3>
            </div>
            <ul className="mt-3 m-0 p-0 list-none flex flex-col gap-1.5">
              {f.points.map((pt) => (
                <li key={pt} style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', lineHeight: 1.55, color: P.secondary, display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: P.accent, flexShrink: 0 }} aria-hidden="true">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <p style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: `1px solid ${P.rule}`, fontFamily: FONT_SANS, fontSize: '0.83rem', lineHeight: 1.6, color: P.ink, fontStyle: 'italic', margin: '1rem 0 0' }}>
              {f.principle}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrap>
  );
}