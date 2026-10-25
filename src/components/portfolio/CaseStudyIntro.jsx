import React from 'react';
import { SectionWrap, Eyebrow, SectionHeading, SubHeading, BodyText } from './PortfolioPrimitives';
import { P, FONT_MONO, FONT_SANS, LIVE_STORE } from './portfolioTheme';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { usePortfolioMotion } from './usePortfolioMotion';

const ROLE = [
  'Product strategy', 'Business requirements', 'E-commerce architecture decisions',
  'AI-assisted development', 'Prompt iteration', 'Content architecture',
  'Customer-experience design', 'Application configuration', 'API integration',
  'Content systems', 'Responsive QA', 'Commerce testing', 'Troubleshooting',
  'Iterative optimization',
];

const SKILLS_DEMONSTRATED = [
  'AI-assisted development', 'QA testing', 'E-commerce architecture',
  'React / application troubleshooting', 'User journey testing', 'Accessibility review',
  'SEO QA', 'Metadata QA', 'Content QA', 'Analytics implementation',
  'Prompt iteration', 'Conversion analysis', 'Documentation',
];

const TAGS = ['Base44', 'React', 'Shopify Storefront API', 'E-commerce QA', 'Responsive UX', 'GA4', 'Google Search Console', 'SEO'];

const SUMMARY = [
  { label: 'Role', value: 'Founder, Product Builder, E-commerce QA' },
  { label: 'Application', value: 'Custom DTC storefront and commerce experience' },
  { label: 'Core stack', value: 'Base44, React, Shopify Storefront API, GA4, Google Search Console' },
  { label: 'Responsibilities', value: 'Product strategy, UX design, application configuration, API integration, content systems, responsive QA, commerce testing, troubleshooting, and iterative optimization' },
];

export default function CaseStudyIntro() {
  const scope = usePortfolioMotion((gsap) => {
    gsap.utils.toArray('.case-num').forEach((num) => {
      gsap.from(num, { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: num, start: 'top 82%' } });
    });
    gsap.utils.toArray('.case-divider').forEach((line) => {
      gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: line, start: 'top 82%' } });
    });
    gsap.utils.toArray('.case-body').forEach((body) => {
      gsap.from(body, { opacity: 0, y: 14, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: body, start: 'top 82%' } });
    });
    gsap.from('.case-pill', { opacity: 0, y: 10, duration: 0.35, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: '.case-skills', start: 'top 80%' } });
    gsap.from('.case-role', { opacity: 0, y: 8, duration: 0.3, stagger: 0.04, ease: 'power3.out', scrollTrigger: { trigger: '.case-roles', start: 'top 82%' } });
    gsap.from('.case-tag', { opacity: 0, y: 8, duration: 0.3, stagger: 0.04, ease: 'power3.out', scrollTrigger: { trigger: '.case-tags', start: 'top 82%' } });
  });

  return (
    <SectionWrap id="case-study">
      <div ref={scope}>
        <Eyebrow>Functional E-Commerce Application</Eyebrow>
        <SectionHeading>Building Torch Republic from brand concept to working commerce application</SectionHeading>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: P.ink, background: P.accentSoft, border: `1px solid ${P.accent}33`, borderRadius: '4px', padding: '0.3rem 0.7rem' }}>
            E-commerce Application &middot; Product Design &middot; QA
          </span>
          <span style={{ fontFamily: FONT_MONO, fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, color: P.accentInk, background: 'rgba(37,99,235,0.06)', border: `1px solid ${P.accent}55`, borderRadius: '4px', padding: '0.3rem 0.7rem' }}>
            Live Project &middot; Continuous QA and Iteration
          </span>
        </div>

        <BodyText className="case-body mt-5">
          I built Torch Republic as a functional direct-to-consumer coffee application &mdash; not
          simply a marketing website. The project combines a custom Base44/React customer experience
          with Shopify&rsquo;s commerce infrastructure, supporting live product information, persistent
          cart behavior, secure checkout, responsive interactions, analytics, and ongoing quality
          assurance.
        </BodyText>

        {/* Project summary */}
        <div className="mt-7" style={{ background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '8px', padding: '1.5rem' }}>
          <dl className="m-0 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {SUMMARY.map((s) => (
              <div key={s.label}>
                <dt style={{ fontFamily: FONT_MONO, fontSize: '0.64rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: P.accentInk, margin: '0 0 0.3rem' }}>{s.label}</dt>
                <dd style={{ margin: 0, fontFamily: FONT_SANS, fontSize: '0.88rem', lineHeight: 1.55, color: P.ink }}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center sm:items-center">
          <a href={LIVE_STORE} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.01]" style={{ minHeight: 48, padding: '0.7rem 1.6rem', borderRadius: '6px', background: P.accent, color: '#FFFFFF', fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
            Visit Live Application <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a href="#architecture" className="group inline-flex items-center justify-center gap-2 transition-colors duration-200" style={{ minHeight: 48, padding: '0.7rem 1.6rem', borderRadius: '6px', background: 'transparent', color: P.ink, border: `1px solid ${P.rule}`, fontFamily: FONT_SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}>
            Explore the Build <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Role items */}
        <div className="case-roles mt-9 flex flex-wrap justify-center gap-x-3 gap-y-1.5" style={{ maxWidth: '70ch' }}>
          {ROLE.map((r, i) => (
            <span key={r} className="case-role" style={{ fontFamily: FONT_SANS, fontSize: '0.85rem', color: P.secondary, display: 'inline-flex', alignItems: 'baseline' }}>
              {r}{i < ROLE.length - 1 && <span style={{ color: P.muted, marginLeft: '0.75rem' }} aria-hidden="true">&middot;</span>}
            </span>
          ))}
        </div>

        {/* Technology tags */}
        <div className="case-tags mt-7">
          <SubHeading>Technology &amp; Capabilities</SubHeading>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {TAGS.map((t) => (
              <span key={t} className="case-tag" style={{ fontFamily: FONT_SANS, fontSize: '0.8125rem', fontWeight: 500, color: P.ink, background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '4px', padding: '0.4rem 0.85rem' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="case-skills mt-7">
          <SubHeading>Skills Demonstrated</SubHeading>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SKILLS_DEMONSTRATED.map((s) => (
              <span key={s} className="case-pill" style={{ fontFamily: FONT_SANS, fontSize: '0.8125rem', fontWeight: 500, color: P.ink, background: P.surface, border: `1px solid ${P.rule}`, borderRadius: '4px', padding: '0.4rem 0.85rem' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </SectionWrap>
  );
}