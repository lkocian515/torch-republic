import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, SubHeading, BodyText } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS, LIVE_STORE } from './portfolioTheme';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolioMotion } from './usePortfolioMotion';

const ROLE = [
  'Product strategy', 'Business requirements', 'E-commerce architecture decisions', 'AI-assisted development',
  'Prompt iteration', 'Content architecture', 'Customer-experience design', 'Product taxonomy',
  'QA testing', 'Mobile QA', 'Output validation', 'Troubleshooting', 'Analytics interpretation',
  'Conversion optimization', 'Iterative redesign',
];

const SKILLS_DEMONSTRATED = [
  'AI-assisted development', 'QA testing', 'E-commerce architecture', 'React / application troubleshooting',
  'User journey testing', 'Accessibility review', 'SEO QA', 'Metadata QA', 'Content QA',
  'Analytics implementation', 'Prompt iteration', 'Conversion analysis', 'Documentation',
];

const SECTIONS = [
  { n: '01', label: 'The Challenge', body: 'Build and refine a differentiated digital commerce experience from the ground up using AI-assisted tools \u2014 then turn generated output into an accurate, consistent, conversion-minded storefront. The work was not \u201Cgenerate a site.\u201D It was continuously evaluating output against business requirements, catching defects, validating fixes, and improving the experience across product, content, navigation and mobile. This is a live project under continuous QA and iteration \u2014 not every workflow has been retested as passing, and new issues are documented and resolved as they surface.' },
  { n: '02', label: 'My Role', body: 'I owned the project end-to-end \u2014 strategy, requirements, architecture decisions, AI-assisted build, prompt iteration, QA, and iteration. AI accelerated execution; human judgment directed requirements, testing, validation, iteration and business decisions. Ongoing work includes cart and checkout regression testing, metadata QA, accessibility auditing, and route cleanup.' },
];

export default function CaseStudyIntro() {
  const scope = usePortfolioMotion((gsap) => {
    // Oversized numbers fade in
    gsap.utils.toArray('.case-num').forEach((num) => {
      gsap.from(num, {
        opacity: 0, y: 16, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: num, start: 'top 82%' },
      });
    });

    // Divider lines grow horizontally
    gsap.utils.toArray('.case-divider').forEach((line) => {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: line, start: 'top 82%' },
      });
    });

    // Body text reveal
    gsap.utils.toArray('.case-body').forEach((body) => {
      gsap.from(body, {
        opacity: 0, y: 14, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: body, start: 'top 82%' },
      });
    });

    // Skills pills stagger
    gsap.from('.case-pill', {
      opacity: 0, y: 10, duration: 0.35, stagger: 0.05, ease: 'power3.out',
      scrollTrigger: { trigger: '.case-skills', start: 'top 80%' },
    });

    // Role items stagger
    gsap.from('.case-role', {
      opacity: 0, y: 8, duration: 0.3, stagger: 0.04, ease: 'power3.out',
      scrollTrigger: { trigger: '.case-roles', start: 'top 82%' },
    });
  });

  return (
    <SectionWrap id="case-study">
      <div ref={scope}>
        <Eyebrow>Flagship Case Study</Eyebrow>
        <SectionHeading>Building &amp; Iterating an AI-Assisted E-Commerce System</SectionHeading>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: P.ink, background: P.accentSoft, border: `1px solid ${P.accent}33`, borderRadius: '4px', padding: '0.3rem 0.7rem' }}>
            Project &mdash; Torch Republic Coffee Company
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: P.accent, background: 'rgba(37,99,235,0.06)', border: `1px solid ${P.accent}55`, borderRadius: '4px', padding: '0.3rem 0.7rem' }}>
            Live Project &middot; Continuous QA and Iteration
          </span>
          <a href={LIVE_STORE} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1" style={{ fontFamily: FONT_SANS, fontSize: '0.875rem', fontWeight: 600, color: P.accent, textDecoration: 'none' }}>
            View live site <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {SECTIONS.map((s) => (
          <div key={s.n} className="mt-10">
            <div className="flex items-baseline gap-4">
              <span className="case-num" style={{ fontFamily: FONT_MONO, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: P.rule, lineHeight: 1, letterSpacing: '-0.02em', flexShrink: 0 }}>{s.n}</span>
              <SubHeading>{s.label}</SubHeading>
            </div>
            <div className="case-divider" style={{ height: '1px', background: P.rule, transformOrigin: 'left center', marginTop: '0.85rem', marginBottom: '0.85rem' }} />
            <BodyText className="case-body">{s.body}</BodyText>
          </div>
        ))}

        {/* Role items */}
        <div className="case-roles mt-9 flex flex-wrap gap-x-3 gap-y-1.5" style={{ maxWidth: '70ch' }}>
          {ROLE.map((r, i) => (
            <span key={r} className="case-role" style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', color: P.secondary, display: 'inline-flex', alignItems: 'baseline' }}>
              {r}{i < ROLE.length - 1 && <span style={{ color: P.muted, marginLeft: '0.75rem' }} aria-hidden="true">&middot;</span>}
            </span>
          ))}
        </div>

        {/* Skills */}
        <div className="case-skills mt-9">
          <SubHeading>Skills Demonstrated</SubHeading>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS_DEMONSTRATED.map((s) => (
              <span key={s} className="case-pill" style={{ fontFamily: FONT_SANS, fontSize: '0.8125rem', fontWeight: 500, color: P.ink, background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '4px', padding: '0.4rem 0.85rem' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}