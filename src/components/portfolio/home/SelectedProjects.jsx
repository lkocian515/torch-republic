import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  P, FONT_SERIF, FONT_SANS, FONT_MONO,
  LIVE_STORE, LUKES_LIGHT_URL, caseStudyUrl, lukesLightCaseStudyUrl,
} from '../portfolioTheme';
import SectionHeading from './SectionHeading';
import ProjectVisual from './ProjectVisual';

const PROJECTS = [
  {
    num: '01',
    variant: 'torch',
    name: 'Torch Republic Coffee Company',
    category: 'Commerce Application & Workflow QA',
    description:
      'AI-assisted commerce development with Shopify integration and end-to-end review of the customer journey, from product discovery through checkout, with documented defects and quality improvements.',
    tags: ['AI-Assisted Development', 'Shopify Integration', 'Customer-Journey Review', 'Commerce QA'],
    caseStudyHref: caseStudyUrl(),
    externalHref: LIVE_STORE,
    externalLabel: 'Live application',
  },
  {
    num: '02',
    variant: 'lukes',
    name: "Luke's Light",
    category: 'Content Quality & Youth Resource Usability',
    description:
      'An educational support resource focused on clear guidance, accessible navigation, and careful review of AI-assisted content.',
    tags: ['Content Quality', 'Usability Review', 'Accessible Navigation', 'AI Content Review'],
    caseStudyHref: lukesLightCaseStudyUrl(),
    externalHref: LUKES_LIGHT_URL,
    externalLabel: 'Visit site',
  },
];

export default function SelectedProjects() {
  return (
    <section
      id="work"
      style={{
        background: P.paper,
        paddingTop: 'clamp(3rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        scrollMarginTop: 72,
        borderTop: `1px solid ${P.rule}`,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected work"
          heading="Projects I have tested end to end"
          intro="A selection of projects where I have contributed to AI quality, content evaluation, and digital product QA, from e-commerce experiences to mission-driven resources."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(3rem, 7vw, 5.5rem)' }}>
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.1rem' }}>
                  <span
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      color: P.accentInk,
                    }}
                  >
                    {project.num}
                  </span>
                  <span style={{ flex: 1, height: 1, background: P.rule }} aria-hidden="true" />
                </div>

                <p
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: '0.66rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    color: P.muted,
                    margin: '0 0 0.7rem',
                  }}
                >
                  {project.category}
                </p>

                <h3
                  style={{
                    fontFamily: FONT_SERIF,
                    fontWeight: 700,
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    lineHeight: 1.15,
                    color: P.ink,
                    margin: '0 0 1rem',
                    letterSpacing: '-0.015em',
                  }}
                >
                  {project.name}
                </h3>

                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    color: P.secondary,
                    margin: '0 0 1.5rem',
                    maxWidth: '52ch',
                  }}
                >
                  {project.description}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.75rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      style={{
                        fontFamily: FONT_SANS,
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: P.secondary,
                        border: `1px solid ${P.rule}`,
                        borderRadius: '999px',
                        padding: '0.4rem 0.85rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    to={project.caseStudyHref}
                    style={{
                      fontFamily: FONT_SANS,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: P.onAccent,
                      background: P.accent,
                      padding: '0.65rem 1.3rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      minHeight: 46,
                      transition: 'background .2s',
                    }}
                  >
                    View case study <ArrowRight size={14} />
                  </Link>
                  <a
                    href={project.externalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: FONT_SANS,
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: P.ink,
                      border: `1px solid ${P.rule}`,
                      padding: '0.65rem 1.3rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      minHeight: 46,
                    }}
                  >
                    <ExternalLink size={14} /> {project.externalLabel}
                  </a>
                </div>
              </div>

              <ProjectVisual variant={project.variant} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}