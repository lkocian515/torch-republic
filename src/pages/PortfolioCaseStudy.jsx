import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import useNoIndex from '@/hooks/useNoIndex';
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  Search,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  MonitorSmartphone,
  Layers,
  Route,
  Cpu,
  FileCheck,
  Eye,
  Wrench,
  BadgeCheck,
  Lightbulb,
  ClipboardCheck,
  Target,
  UserCheck,
} from 'lucide-react';

/* ── Tokens (kept consistent with the site's light editorial theme) ── */
const ACCENT = '#B86543';
const INK = '#2D2824';
const SECONDARY = '#5C544C';
const RULE = '#E4D8C9';
const CREAM = '#FBF8F2';
const CARD = '#FFFFFF';

const LIVE_STORE = 'https://torchrepublic.com';
const AUTHOR = 'Lisa Kocian';

/* ── Presentation primitives ────────────────────────────────────── */

function Shell({ id, children, alt = false }) {
  return (
    <section
      id={id}
      style={{
        background: alt ? CARD : 'transparent',
        borderTop: alt ? `1px solid ${RULE}` : '1px solid transparent',
      }}
    >
      <div className="mx-auto max-w-[860px] px-6 md:px-10 py-14 md:py-20">{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return <p className="eyebrow" style={{ color: ACCENT }}>{children}</p>;
}

function SectionTitle({ children }) {
  return <h2 className="h2" style={{ margin: '0 0 1rem' }}>{children}</h2>;
}

function Lead({ children }) {
  return <p className="body-lg" style={{ margin: 0, color: SECONDARY }}>{children}</p>;
}

function Card({ children, pad = '1.5rem' }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${RULE}`,
        borderRadius: '12px',
        padding: pad,
        height: '100%',
      }}
    >
      {children}
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────────── */

const SUMMARY_CARDS = [
  { label: 'Project', value: 'AI-Assisted Ecommerce Experience' },
  { label: 'Primary Focus', value: 'Quality Assurance & Iteration' },
  { label: 'Environment', value: 'Web · Desktop · Mobile' },
  { label: 'Responsibilities', value: 'Testing · Validation · Prompt Iteration · Content QA · UX Review' },
];

const ROLE_POINTS = [
  'Translating business requirements into clear AI instructions and implementation tasks',
  'Reviewing AI-generated content and interface changes',
  'Identifying inconsistencies, broken states, inaccurate information, and UX problems',
  'Testing navigation, product pages, responsive behavior, links, forms, and user flows',
  'Verifying factual claims rather than relying solely on AI-generated information',
  'Iterating prompts when outputs failed to meet requirements',
  'Documenting issues and validating fixes',
  'Reviewing the final experience from the perspective of an end user',
];

const WORKFLOW_FLOW = [
  'Requirements',
  'Prompt / Build',
  'Evaluate',
  'Identify Defects',
  'Research / Verify',
  'Correct',
  'Retest',
  'Validate',
];

const WORKFLOW = [
  { icon: Target, title: 'Define Requirements', body: 'Determine expected behavior, content, visual standards, and user experience before evaluating any output.' },
  { icon: Cpu, title: 'Generate & Implement', body: 'Use AI-assisted development tools to translate requirements into working interface changes and content.' },
  { icon: Eye, title: 'Evaluate Output', body: 'Compare the generated result against the original instructions and expected behavior.' },
  { icon: AlertTriangle, title: 'Identify Defects', body: 'Look for factual errors, inconsistencies, broken functionality, visual problems, instruction-following failures, and unexpected behavior.' },
  { icon: Search, title: 'Research & Verify', body: 'Investigate and verify facts, claims, and expected behavior against authoritative sources and project requirements before changing anything.' },
  { icon: Wrench, title: 'Correct & Iterate', body: 'Refine prompts, content, configuration, or implementation based on the identified problem.' },
  { icon: RefreshCw, title: 'Retest', body: 'Repeat affected workflows across relevant pages, states, and screen sizes.' },
  { icon: BadgeCheck, title: 'Validate', body: 'Confirm the fix solved the original issue without introducing regressions elsewhere.' },
];

const SCOPE_AREAS = [
  'AI output review',
  'Prompt iteration',
  'Content & claim validation',
  'UI/UX quality assurance',
  'Functional testing',
  'Troubleshooting',
  'Information architecture',
  'SEO & content optimization',
  'Cross-page consistency',
  'Human review of AI output',
];

const DEFECTS = [
  {
    icon: FileCheck,
    category: 'Content Accuracy',
    issue: 'AI-generated copy sometimes contained benefit claims that could not be verified.',
    evaluation: 'Reviewed product and ingredient copy against the source requirements rather than accepting it.',
    correction: 'Removed unsupported health and functional claims, keeping language honest and factual.',
    validation: 'Re-read affected pages to confirm no unsupported claims remained.',
  },
  {
    icon: Layers,
    category: 'Catalog Consistency',
    issue: 'Product naming, pricing, servings, and discontinued items needed to stay consistent across the store.',
    evaluation: 'Checked product information across collection, product, and bundle pages for drift.',
    correction: 'Standardized product data and retired discontinued categories with explicit redirects and 410 responses.',
    validation: 'Cross-referenced the same product on multiple pages to confirm matching details.',
  },
  {
    icon: MonitorSmartphone,
    category: 'Responsive UI',
    issue: 'Layouts and interface elements needed to hold up on desktop and narrow mobile widths.',
    evaluation: 'Tested at mobile viewports for overflow, touch-target size, stacking, and readability.',
    correction: 'Adjusted spacing, kept touch targets at 44px+, and fixed stacking where elements collided.',
    validation: 'Re-checked the affected layouts at narrow widths after each change.',
  },
  {
    icon: Eye,
    category: 'Visual Consistency',
    issue: 'Legacy dark-theme elements and newer light-theme components created an inconsistent experience.',
    evaluation: 'Audited sections for mismatched backgrounds, text colors, and component styling.',
    correction: 'Converted remaining dark surfaces to the light editorial theme so the experience felt unified.',
    validation: 'Reviewed pages end-to-end to confirm a single, coherent visual treatment.',
  },
  {
    icon: Route,
    category: 'Navigation & User Flow',
    issue: 'Links, menus, product paths, and calls to action required functional validation.',
    evaluation: 'Followed each navigation path to catch broken, duplicate, or orphaned routes.',
    correction: 'Consolidated duplicate URLs with redirects and pointed every call to action at a real destination.',
    validation: 'Retested header, footer, and in-page links to confirm each resolves correctly.',
  },
  {
    icon: Cpu,
    category: 'AI Instruction Following',
    issue: 'Generated changes occasionally drifted from the original requirements.',
    evaluation: 'Compared the output to the specific instruction it was meant to satisfy.',
    correction: 'Refined the prompt to be more specific and bounded, then regenerated the affected section.',
    validation: 'Confirmed the new output matched the requirement without altering unrelated sections.',
  },
];

const EVAL_CHECKLIST = [
  'Instruction following',
  'Factual accuracy',
  'Internal consistency',
  'Completeness',
  'Relevance',
  'User experience',
  'Tone and brand consistency',
  'Functional behavior',
  'Edge cases',
  'Regression risk',
  'Privacy / sensitive-information awareness',
  'Final human verification',
];

const TOOLS = [
  'Base44',
  'AI-assisted development',
  'Prompt engineering / prompt iteration',
  'Shopify',
  'Ecommerce workflows',
  'Responsive testing',
  'Content QA',
  'Functional QA',
  'Manual validation',
  'SEO review',
  'Analytics',
  'UX evaluation',
  'Documentation',
  'Cross-page consistency testing',
];

const DEMONSTRATES = [
  { icon: Eye, title: 'AI Output Evaluation', body: 'Critically reviewing generated output instead of accepting it at face value.' },
  { icon: ShieldCheck, title: 'Quality Assurance', body: 'Systematic identification, correction, retesting, and validation of defects.' },
  { icon: ClipboardCheck, title: 'Instruction Following', body: 'Translating requirements into clear tasks and checking whether the output satisfies them.' },
  { icon: Search, title: 'Attention to Detail', body: 'Finding inconsistencies across content, products, interfaces, and user flows.' },
  { icon: Lightbulb, title: 'Independent Problem Solving', body: 'Diagnosing issues and iterating toward solutions without constant supervision.' },
  { icon: UserCheck, title: 'User-Centered Thinking', body: 'Evaluating technical output from the perspective of the person ultimately using it.' },
];

const SCREENSHOTS = [
  {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e97bb3911_portfolio-homepage.png',
    title: 'Homepage — editorial hero and navigation',
    caption: 'A cohesive light-theme storefront with clear paths to shopping, rewards, educational content, and guided product selection.',
    alt: 'Torch Republic homepage showing the navigation and editorial product hero.',
  },
  {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/abd9bea94_portfolio-collection.png',
    title: 'Collection page — standardized product grid',
    caption: 'Consistent product imagery, category labels, pricing, and action hierarchy across the collection.',
    alt: 'Torch Republic collection showing standardized product cards.',
  },
  {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9e1ef6959_portfolio-product.png',
    title: 'Product detail — purchase decision flow',
    caption: 'A focused product view organizing imagery, serving count, pricing, quantity, and add-to-cart controls.',
    alt: 'Torchbearer product page showing product imagery, pricing, and purchase options.',
  },
  {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/4efd7698f_portfolio-bundle.png',
    title: 'Build Your Ritual — bundle logic',
    caption: 'A fixed-price starter bundle with verified serving math, comparison value, savings, and a clear path into custom selection.',
    alt: 'Torch Republic Starter Ritual Bundle showing included products, price, and savings.',
  },
  {
    src: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2068c679d_portfolio-quiz.png',
    title: 'Blend Quiz — guided recommendation flow',
    caption: 'A short, no-account-required experience that reduces choice friction and guides visitors toward an appropriate product.',
    alt: 'Torch Republic Find Your Ritual quiz introduction and start button.',
  },
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function PortfolioCaseStudy() {
  useNoIndex();
  useSEO({
    title: 'Lisa Kocian | AI Quality & E-Commerce Portfolio',
    description:
      'AI-assisted e-commerce case study by Lisa Kocian demonstrating quality assurance, output validation, content evaluation, troubleshooting, prompt iteration, SEO, and end-to-end digital project execution.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e97bb3911_portfolio-homepage.png',
    imageAlt: 'Torch Republic storefront homepage — AI-assisted e-commerce case study by Lisa Kocian',
    url: '/portfolio/torch-republic-ecommerce-build',
    type: 'article',
    noindex: true,
  });

  // Enforce the exact portfolio title and social description. The global SEO hook
  // appends the Torch Republic brand to the title; for this professional portfolio
  // the title should stand alone, so we override title + social tags after it runs.
  useEffect(() => {
    const PORTFOLIO_TITLE = 'Lisa Kocian | AI Quality & E-Commerce Portfolio';
    const SOCIAL_DESC =
      'AI-assisted e-commerce case study demonstrating QA, output validation, content evaluation, troubleshooting, prompt iteration, and end-to-end project execution.';
    document.title = PORTFOLIO_TITLE;
    const apply = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', value);
    };
    apply('meta[property="og:title"]', PORTFOLIO_TITLE);
    apply('meta[name="twitter:title"]', PORTFOLIO_TITLE);
    apply('meta[property="og:description"]', SOCIAL_DESC);
    apply('meta[name="twitter:description"]', SOCIAL_DESC);
  }, []);

  return (
    <div style={{ background: CREAM, color: INK, minHeight: '100vh' }}>
      {/* Slim portfolio header */}
      <header style={{ borderBottom: `1px solid ${RULE}` }}>
        <div className="mx-auto max-w-[860px] px-6 md:px-10 py-4 flex items-center justify-between gap-4">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: SECONDARY,
            }}
          >
            {AUTHOR} — Portfolio
          </span>
          <Link
            to="/"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8125rem',
              color: INK,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              textDecoration: 'none',
              minHeight: 40,
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              border: `1px solid ${RULE}`,
            }}
          >
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back to site
          </Link>
        </div>
      </header>

      {/* Hero — designed banner replaces the title block */}
      <header>
        <img
          src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/cc58d834a_gfdgd.png"
          alt="Lisa Kocian — AI Quality, Content Evaluation, and E-Commerce Systems portfolio hero."
          loading="eager"
          decoding="async"
          fetchpriority="high"
          style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '16 / 10' }}
        />

        <div className="mx-auto max-w-[860px] px-6 md:px-10 pt-10 md:pt-12 pb-16 md:pb-20">
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: INK }}>
            Torch Republic is an end-to-end e-commerce build demonstrating prompt iteration, content validation,
            troubleshooting, UX review, SEO, and final output verification.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#overview" className="btn btn-primary">
              View Case Study <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
            <a href={LIVE_STORE} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View Live Site <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
          </div>
        </div>
      </header>

      {/* Project Overview */}
      <Shell id="overview" alt>
        <Eyebrow>Project Overview</Eyebrow>
        <SectionTitle>An AI-assisted build, owned end-to-end</SectionTitle>
        <Lead>
          I independently developed and refined the Torch Republic ecommerce experience using AI-assisted / no-code tools
          alongside traditional ecommerce platforms. The work required more than generating a website: it meant repeatedly
          evaluating AI-generated output against requirements, identifying defects and inconsistencies, correcting content
          and functionality, testing user flows, validating changes, and improving the final experience.
        </Lead>
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SUMMARY_CARDS.map((c) => (
            <Card key={c.label} pad="1.25rem">
              <p className="eyebrow" style={{ color: ACCENT }}>{c.label}</p>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: INK,
                  lineHeight: 1.4,
                }}
              >
                {c.value}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <p className="eyebrow" style={{ color: ACCENT }}>Scope of Work</p>
          <p className="body" style={{ marginTop: '0.5rem', color: SECONDARY, fontSize: '0.9375rem' }}>
            The project spanned the full lifecycle of AI-assisted work — from generation through human review, verification, and validation.
          </p>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {SCOPE_AREAS.map((a) => (
              <span
                key={a}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: INK,
                  background: CARD,
                  border: `1px solid ${RULE}`,
                  borderRadius: '999px',
                  padding: '0.4rem 0.8rem',
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </Shell>

      {/* My Role */}
      <Shell id="role">
        <Eyebrow>My Role</Eyebrow>
        <SectionTitle>Clear ownership of the full process</SectionTitle>
        <Lead>
          I managed the project from concept through implementation and QA, using AI-assisted tools to accelerate
          development while manually reviewing the resulting output for accuracy, consistency, usability, and alignment
          with project requirements.
        </Lead>
        <ul className="mt-6 space-y-2.5 list-none p-0 m-0">
          {ROLE_POINTS.map((p) => (
            <li key={p} className="flex gap-3 items-start" style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: SECONDARY }}>
              <Check style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0, marginTop: '0.25rem' }} aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Shell>

      {/* AI Quality Workflow */}
      <Shell id="workflow" alt>
        <Eyebrow>AI Quality Workflow</Eyebrow>
        <SectionTitle>A systematic, repeatable QA loop</SectionTitle>
        <Lead>
          Every feature moved through the same loop — emphasizing evaluation and human judgment over raw output.
        </Lead>

        {/* Visual flow */}
        <div
          className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.04em' }}
        >
          {WORKFLOW_FLOW.map((s, i) => (
            <React.Fragment key={s}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.4rem 0.7rem',
                  borderRadius: '999px',
                  border: `1px solid ${RULE}`,
                  background: CARD,
                  color: INK,
                  fontWeight: 600,
                }}
              >
                {s}
              </span>
              {i < WORKFLOW_FLOW.length - 1 && (
                <span style={{ color: ACCENT, fontWeight: 700 }}>→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WORKFLOW.map(({ icon: Icon, title, body }, i) => (
            <Card key={title} pad="1.25rem">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: ACCENT,
                  }}
                >
                  0{i + 1}
                </span>
                <Icon style={{ width: 18, height: 18, color: ACCENT }} aria-hidden="true" />
                <h3 className="h4" style={{ margin: 0, fontSize: '0.95rem' }}>{title}</h3>
              </div>
              <p style={{ margin: '0.6rem 0 0', fontSize: '0.9rem', lineHeight: 1.6, color: SECONDARY }}>
                {body}
              </p>
            </Card>
          ))}
        </div>
      </Shell>

      {/* Examples of Issues Identified */}
      <Shell id="issues">
        <Eyebrow>Examples of Issues Identified</Eyebrow>
        <SectionTitle>Defects found, evaluated, and resolved</SectionTitle>
        <Lead>
          Representative issues from the project — each handled with the same evaluate → correct → validate discipline.
        </Lead>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {DEFECTS.map(({ icon: Icon, category, issue, evaluation, correction, validation }) => (
            <Card key={category} pad="1.4rem">
              <div className="flex items-center gap-2.5">
                <Icon style={{ width: 18, height: 18, color: ACCENT }} aria-hidden="true" />
                <h3 className="h4" style={{ margin: 0, fontSize: '0.95rem' }}>{category}</h3>
              </div>
              <dl className="mt-3 space-y-2.5" style={{ fontSize: '0.875rem', lineHeight: 1.55 }}>
                {[
                  ['Issue', issue],
                  ['Evaluation', evaluation],
                  ['Correction', correction],
                  ['Validation', validation],
                ].map(([label, text]) => (
                  <div key={label} className="flex gap-3">
                    <dt
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: ACCENT,
                        fontWeight: 700,
                        flexShrink: 0,
                        paddingTop: '0.1rem',
                        width: '4.5rem',
                      }}
                    >
                      {label}
                    </dt>
                    <dd style={{ margin: 0, color: SECONDARY }}>{text}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          ))}
        </div>
      </Shell>

      {/* How I Evaluate AI Output */}
      <Shell id="evaluate" alt>
        <Eyebrow>How I Evaluate AI Output</Eyebrow>
        <SectionTitle>A transferable evaluation checklist</SectionTitle>
        <Lead>
          The same criteria apply whether I’m reviewing generated copy, a UI change, or a configured workflow.
        </Lead>
        <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 list-none p-0 m-0">
          {EVAL_CHECKLIST.map((c) => (
            <li key={c} className="flex gap-2.5 items-start" style={{ fontSize: '0.9rem', color: INK, lineHeight: 1.5 }}>
              <Check style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0, marginTop: '0.2rem' }} aria-hidden="true" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p
          className="body-lg"
          style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: `1px solid ${RULE}`, fontStyle: 'italic' }}
        >
          AI accelerates the workflow; human judgment determines whether the output is actually correct.
        </p>
      </Shell>

      {/* Tools & Methods */}
      <Shell id="tools">
        <Eyebrow>Tools &amp; Methods</Eyebrow>
        <SectionTitle>What I worked with</SectionTitle>
        <Lead>Methods and tools actually used across this project.</Lead>
        <div className="mt-7 flex flex-wrap gap-2.5">
          {TOOLS.map((t) => (
            <span
              key={t}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: INK,
                background: CARD,
                border: `1px solid ${RULE}`,
                borderRadius: '999px',
                padding: '0.45rem 0.9rem',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </Shell>

      {/* Screenshots */}
      <Shell id="screenshots" alt>
        <Eyebrow>The Finished Product</Eyebrow>
        <SectionTitle>Screenshots of the live storefront</SectionTitle>
        <Lead>Real screenshots of the live project, captured at desktop width. Select any image to open it at full size.</Lead>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {SCREENSHOTS.map(({ src, title, caption, alt }) => (
            <figure key={title} style={{ margin: 0 }}>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open full-size image: ${title}`}
                style={{ display: 'block', border: `1px solid ${RULE}`, borderRadius: '12px', overflow: 'hidden', background: CARD }}
              >
                <img
                  src={src}
                  alt={alt}
                  width={1400}
                  height={875}
                  loading="lazy"
                  decoding="async"
                  style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: '1400 / 875' }}
                />
              </a>
              <figcaption style={{ marginTop: '0.6rem' }}>
                <strong style={{ fontFamily: 'var(--font-heading)', color: INK, fontSize: '0.875rem' }}>{title}</strong>
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: SECONDARY, marginTop: '0.25rem' }}>{caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Shell>

      {/* What This Project Demonstrates */}
      <Shell id="demonstrates">
        <Eyebrow>What This Project Demonstrates</Eyebrow>
        <SectionTitle>Transferable capabilities</SectionTitle>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMONSTRATES.map(({ icon: Icon, title, body }) => (
            <Card key={title} pad="1.4rem">
              <Icon style={{ width: 20, height: 20, color: ACCENT }} aria-hidden="true" />
              <h3 className="h4" style={{ margin: '0.75rem 0 0.4rem', fontSize: '0.95rem' }}>{title}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: SECONDARY, margin: 0 }}>{body}</p>
            </Card>
          ))}
        </div>
      </Shell>

      {/* Recruiter CTA */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: CARD }}>
        <div className="mx-auto max-w-[860px] px-6 md:px-10 py-16 md:py-24 text-center">
          <Eyebrow>Connect</Eyebrow>
          <h2 className="h2" style={{ marginTop: '0.75rem', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
            Interested in working together?
          </h2>
          <p className="body-lg" style={{ marginTop: '0.75rem', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
            I'm currently exploring opportunities in AI quality, content evaluation, AI operations, and related roles.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:admin@torchrepublic.com" className="btn btn-primary">
              Get in touch <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
            <a href={LIVE_STORE} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              View Live Site <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}