import React from 'react';
import { ShieldCheck, ShoppingCart, FileSearch, Wrench } from 'lucide-react';
import { SectionWrap, Eyebrow, SectionHeading, Lead, Card } from './PortfolioPrimitives';
import { P, FONT_SANS, FONT_MONO } from './portfolioTheme';

// Short, scannable experience summary — not a full résumé. The downloadable
// résumé (see ResumeAccess) holds the complete employment history.
const CARDS = [
  {
    icon: ShieldCheck,
    title: 'AI Quality & Content Evaluation',
    body: 'Evaluating AI-generated content for accuracy, instruction adherence, consistency, clarity, tone, and potential risk. Experienced in prompt iteration, output comparison, error documentation, transcription quality, and structured review.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce & AI Implementation',
    body: 'Built and refined a complete e-commerce brand experience using AI-assisted tools, including site architecture, product presentation, user journeys, content systems, troubleshooting, SEO foundations, and iterative quality testing.',
  },
  {
    icon: FileSearch,
    title: 'Document Quality & Research',
    body: 'Background in legal-document support, proofreading, research, privacy-aware review, information organization, and identifying errors or inconsistencies across detailed materials.',
  },
  {
    icon: Wrench,
    title: 'Operations & Problem Solving',
    body: 'Extensive hands-on business and operational experience involving customer service, documentation, process management, troubleshooting, prioritization, and independent decision-making.',
  },
];

export default function ExperienceSnapshot() {
  return (
    <SectionWrap id="experience" alt>
      <Eyebrow>Experience</Eyebrow>
      <SectionHeading>Experience That Supports the Work</SectionHeading>
      <Lead>
        My background combines AI output evaluation, document quality, digital operations, e-commerce
        implementation, research, and customer-focused problem solving. I use that experience to test
        systems carefully, identify inconsistencies, improve workflows, and turn complex information
        into clear next steps.
      </Lead>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {CARDS.map(({ icon: Icon, title, body }) => (
          <Card key={title} pad="1.5rem">
            <div
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 10,
                background: P.accentSoft,
                color: P.accent,
                marginBottom: '0.9rem',
              }}
            >
              <Icon size={20} strokeWidth={1.75} />
            </div>
            <h3 style={{ fontFamily: FONT_SANS, fontWeight: 700, fontSize: '1.02rem', color: P.ink, margin: '0 0 0.55rem', lineHeight: 1.3 }}>
              {title}
            </h3>
            <p style={{ fontFamily: FONT_SANS, fontSize: '0.9rem', lineHeight: 1.65, color: P.secondary, margin: 0 }}>
              {body}
            </p>
          </Card>
        ))}
      </div>
    </SectionWrap>
  );
}