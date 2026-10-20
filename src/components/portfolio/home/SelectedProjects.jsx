import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { P, FONT_SERIF, FONT_SANS, FONT_MONO, LIVE_STORE, LUKES_LIGHT_URL, caseStudyUrl, lukesLightCaseStudyUrl } from '../portfolioTheme';
import SectionHeading from './SectionHeading';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    name: 'Torch Republic',
    category: 'Commerce Application & Workflow QA',
    description: 'AI-assisted commerce development, Shopify integration, and customer-journey quality review.',
    caseStudyHref: caseStudyUrl(),
    externalHref: LIVE_STORE,
    externalLabel: 'Live application',
  },
  {
    name: "Luke's Light",
    category: 'Content Quality & Youth Resource Usability',
    description: 'An educational support resource focused on clear guidance, accessible navigation, and careful review of AI-assisted content.',
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
        scrollMarginTop: 70,
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected projects"
          heading="Where AI assistance meets human judgment"
          intro="Each project shows how I evaluate AI-generated content, review clarity and accuracy, and improve digital experiences for real users."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="text-center md:text-left"
              style={{
                background: P.surface,
                border: `1px solid ${P.rule}`,
                borderLeft: `3px solid ${P.accent}`,
                borderRadius: '6px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <h3
                style={{
                  fontFamily: FONT_SERIF,
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: P.ink,
                  margin: '0 0 0.4rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {project.name}
              </h3>
              <p
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: '0.64rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: P.accent,
                  margin: '0 0 1rem',
                }}
              >
                {project.category}
              </p>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: '0.925rem',
                  lineHeight: 1.65,
                  color: P.secondary,
                  margin: '0 0 1.5rem',
                  flex: 1,
                }}
              >
                {project.description}
              </p>
              <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center md:justify-start">
                <Link
                  to={project.caseStudyHref}
                  style={{
                    fontFamily: FONT_SANS,
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: P.surface,
                    background: P.accent,
                    padding: '0.55rem 1.15rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    transition: 'background .2s',
                  }}
                >
                  View case study <ArrowRight size={13} />
                </Link>
                <a
                  href={project.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: FONT_SANS,
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: P.ink,
                    border: `1px solid ${P.rule}`,
                    padding: '0.55rem 1.15rem',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <ExternalLink size={13} /> {project.externalLabel}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}