import React from 'react';
import { ShieldCheck, ShoppingCart, FileSearch, BookOpen } from 'lucide-react';
import { SectionWrap, Eyebrow, SectionHeading, Lead, Card } from './PortfolioPrimitives';
import { P, FONT_SANS, FONT_MONO } from './portfolioTheme';

// Short, scannable experience summary — not a full résumé. The downloadable
// résumé (see ResumeAccess) holds the complete employment history.
const CARDS = [
  {
    icon: ShieldCheck,
    title: 'AI Quality Review & Content Evaluation',
    body: 'Prompt evaluation, instruction adherence, content review, output validation, and QA documentation. Experienced in identifying hallucinations, unsupported claims, factual errors, and consistency issues across AI-generated content. Currently part of the Alignerr network by Labelbox, a global network of experts who actively research and shape the future of AI.',
  },
  {
    icon: ShoppingCart,
    title: 'AI & E-Commerce Product Development',
    body: 'Built and tested Torch Republic\u2019s e-commerce application end-to-end: a custom Base44/React storefront integrated with Shopify for live product data, cart behavior, and secure checkout \u2014 with AI-assisted development validated by manual QA across customer journeys, responsive behavior, analytics, and content systems.',
  },
  {
    icon: FileSearch,
    title: 'Document Quality & Legal Support',
    body: 'Professional experience in document review, legal research, consistency checking, structured documentation, and detail-sensitive work requiring accuracy and careful source verification.',
  },
  {
    icon: BookOpen,
    title: 'Published Author',
    body: 'Long-form research, editing, structural consistency, audience analysis, publishing workflows, and content quality. Experience translating complex topics into clear, accessible material.',
  },
];

export default function ExperienceSnapshot() {
  return (
    <SectionWrap id="experience" alt>
      <Eyebrow>Professional Background</Eyebrow>
      <SectionHeading>Experience That Supports the Work</SectionHeading>
      <Lead>
        My background combines AI output evaluation, document quality, e-commerce
        implementation, legal support, and published authorship. I use that experience
        to test systems carefully, identify inconsistencies, improve workflows, and
        turn complex information into clear next steps.
      </Lead>

      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {CARDS.map(({ icon: Icon, title, body }) => (
          <Card key={title} pad="1.5rem" className="text-center">
            <div
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 8,
                background: P.accentSoft,
                color: P.accentInk,
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