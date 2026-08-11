import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import useNoIndex from '@/hooks/useNoIndex';
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  ShoppingBag,
  FlaskConical,
  BookOpen,
  ShieldCheck,
  Search,
  Compass,
  Layers,
  MonitorSmartphone,
  Route,
  PenLine,
  ListChecks,
} from 'lucide-react';

const ACCENT = '#B86543';
const INK = '#2D2824';
const SECONDARY = '#5C544C';
const RULE = '#E4D8C9';
const CREAM = '#FBF8F2';
const CARD = '#FFFFFF';

const LIVE_STORE = 'https://torchrepublic.com';
const CONTACT_EMAIL = 'admin@torchrepublic.com';

/* ── Small presentation primitives ────────────────────────────── */

function Eyebrow({ children, tone = ACCENT }) {
  return (
    <p
      className="eyebrow"
      style={{ color: tone }}
    >
      {children}
    </p>
  );
}

function SectionShell({ id, children, alt = false }) {
  return (
    <section
      id={id}
      style={{
        background: alt ? CARD : 'transparent',
        borderTop: alt ? `1px solid ${RULE}` : '1px solid transparent',
      }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-10 py-12 md:py-20">{children}</div>
    </section>
  );
}

function SectionTitle({ n, children }) {
  return (
    <div className="flex items-baseline gap-3 mb-7">
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: ACCENT,
          fontWeight: 600,
          letterSpacing: '0.06em',
        }}
      >
        0{n}
      </span>
      <h2 className="h2" style={{ margin: 0 }}>
        {children}
      </h2>
    </div>
  );
}

function Lead({ children }) {
  return (
    <p className="body-lg" style={{ margin: 0 }}>
      {children}
    </p>
  );
}

function Bullet({ children, title }) {
  return (
    <li className="flex gap-3" style={{ color: SECONDARY, fontSize: '1rem', lineHeight: 1.7 }}>
      <span
        aria-hidden="true"
        style={{ color: ACCENT, fontWeight: 700, marginTop: '0.1rem', flexShrink: 0 }}
      >
        —
      </span>
      <span>
        {title && <strong style={{ color: INK }}>{title} </strong>}
        {children}
      </span>
    </li>
  );
}

/* ── Data: "What I built" cards ─────────────────────────────────── */

const BUILT_CARDS = [
  {
    icon: Route,
    title: 'Navigation & information architecture',
    body: 'Consolidated legacy routes, retired discontinued categories with 410 responses, and redirected old URLs to current pages so the site stays crawlable and navigable for both shoppers and search engines.',
  },
  {
    icon: Layers,
    title: 'Homepage & collections',
    body: 'Built a modular editorial homepage and standardized collection grids so browsing is consistent, fast, and visually coherent across coffee, mushroom, and matcha categories.',
  },
  {
    icon: PenLine,
    title: 'Product-page experience',
    body: 'Edited product detail layouts for honest, readable descriptions, clear purchase actions, and consistent imagery treatment — never inventing claims around functional benefits.',
  },
  {
    icon: FlaskConical,
    title: 'Subscription & quiz customer paths',
    body: 'Kept subscription pricing and Shopify checkout redirects intact while refreshing the surrounding layout and adding a blend-recommendation quiz for first-time visitors.',
  },
  {
    icon: BookOpen,
    title: 'Research & content ecosystem',
    body: 'Organized educational articles, ingredient deep dives, and SEO landing pages around canonical topics to reduce duplication and build topical authority.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive design',
    body: 'Worked at narrow mobile viewports to keep touch targets at 44px+, stacking correct, padding generous, and readability intact across every screen size.',
  },
];

/* ── Data: six-step AI workflow ────────────────────────────────── */

const WORKFLOW = [
  {
    step: 'Plan',
    body: 'Define the goal, the customer path, and the constraints in plain language before any code is generated.',
  },
  {
    step: 'Scope the prompt',
    body: 'Write specific, bounded prompts so output stays reviewable and nothing incidental gets touched.',
  },
  {
    step: 'Read the output',
    body: 'Review what was actually generated — copy, layout, links, data calls — instead of trusting that it worked.',
  },
  {
    step: 'Flag & guard',
    body: 'Catch fabricated numbers, unsupported claims, broken links, duplicate scripts, and layout problems; correct or remove them.',
  },
  {
    step: 'Refine iteratively',
    body: 'Re-prompt in tight loops to fix the specific issue without rewriting working sections.',
  },
  {
    step: 'Verify live',
    body: 'Confirm checkout, cart, subscriptions, and analytics still behave correctly before releasing.',
  },
];

/* ── Data: release checks ──────────────────────────────────────── */

const QA_CHECKS = [
  'Checkout behavior — cart, add-to-cart, and Shopify/Stripe redirects — still works.',
  'Responsive layouts at narrow mobile widths check for overflow, touch-target size, and stacking.',
  'Every call to action leads somewhere real and relevant.',
  'Generated copy reviewed for factual accuracy; unsupported claims removed.',
  'No unsupported product or health claims, especially around functional mushroom and matcha benefits.',
  'Navigation paths — header, footer, links, redirects — tested to catch broken or orphaned routes.',
  'Analytics and tracking still fire and are not duplicated.',
];

/* ── Data: five customer pathways ─────────────────────────────── */

const PATHWAYS = [
  {
    icon: ShoppingBag,
    name: 'Shop',
    body: 'All products, classic coffee, mushroom coffee, and matcha collections.',
  },
  {
    icon: Compass,
    name: 'Build Your Ritual',
    body: 'Bundle builder, blend quiz, subscription, and how-it-works guidance.',
  },
  {
    icon: BookOpen,
    name: 'Learn',
    body: 'Journal, recipes, ingredients, FAQ, research hub, and reviews.',
  },
  {
    icon: ShieldCheck,
    name: 'Trust & Retention',
    body: 'Our story, founder story, team, customer spotlight, and contact.',
  },
  {
    icon: Search,
    name: 'Search Discovery',
    body: 'SEO landing pages, ingredient deep dives, and comparison content.',
  },
];

/* ── Data: screenshot placeholders ────────────────────────────── */

const SCREENSHOTS = [
  {
    label: 'Homepage — editorial hero & section flow',
    caption: 'Full-width background hero with left-aligned editorial copy, followed by a modular nine-section layout.',
  },
  {
    label: 'Collection page — standardized product grid',
    caption: 'Light-themed grid with consistent product cards, category intro, and a factual selection aid.',
  },
  {
    label: 'Product detail — editorial layout',
    caption: 'Local catalog data, honest descriptions, clear purchase actions, and related-product recommendations.',
  },
  {
    label: 'Build Your Ritual — bundle builder',
    caption: 'Mobile-first conversion flow guiding first-time visitors through coffee, mushroom, and matcha selection.',
  },
  {
    label: 'Blend Quiz — recommendation flow',
    caption: 'Weighted multi-step quiz that recommends a product ritual and captures a lead for follow-up.',
  },
];

/* ── Data: metrics being tracked (no numbers) ──────────────────── */

const METRICS_TRACKED = [
  'Conversion rate',
  'Email sign-ups',
  'Page-speed scores (LCP, CLS, INP)',
  'Order volume',
  'Quiz completion rate',
  'Subscription take-rate',
];

/* ── Page ──────────────────────────────────────────────────────── */

export default function PortfolioCaseStudy() {
  useNoIndex();
  useSEO({
    title: 'Torch Republic: AI-Assisted E-Commerce Build & UX Optimization — Case Study',
    description:
      'A portfolio case study on building and optimizing the Torch Republic Coffee Company storefront using AI assistance and Base44, written for prospective employers.',
    url: '/portfolio/torch-republic-ecommerce-build',
    type: 'article',
    noindex: true,
  });

  return (
    <div style={{ background: CREAM, color: INK, minHeight: '100vh' }}>
      {/* Brand header */}
      <header style={{ background: CREAM, borderBottom: `1px solid ${RULE}` }}>
        <div className="mx-auto max-w-[760px] px-6 md:px-10 py-8 md:py-12 flex flex-col items-center gap-6">
          <img
            src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/93b387998_back.png"
            alt="Torch Republic Coffee Company"
            width={900}
            height={300}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ width: 'min(94vw, 460px)', height: 'auto', display: 'block', maxWidth: '100%' }}
          />
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

      {/* 1 — Hero */}
      <header className="mx-auto max-w-[760px] px-6 md:px-10 pt-14 pb-14 md:pt-20 md:pb-20">
        <Eyebrow>AI-Assisted Build · UX & Conversion · Content Strategy</Eyebrow>
        <h1
          className="h1"
          style={{ marginTop: '0.75rem' }}
        >
          Torch Republic: an AI-assisted e-commerce build
        </h1>
        <p
          className="body-lg"
          style={{ marginTop: '1.25rem' }}
        >
          A first-person account of planning, building, and refining a live coffee storefront using AI tooling and Base44 — including how I reviewed output, guarded against fabricated claims, and protected the working checkout customers rely on.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={LIVE_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visit the live store <ArrowUpRight style={{ width: 16, height: 16 }} />
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20%E2%80%94%20Torch%20Republic%20case%20study`}
            className="btn btn-ghost"
          >
            Contact me
          </a>
        </div>

        {/* Facts row */}
        <dl
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-8"
          style={{ borderTop: `1px solid ${RULE}`, paddingTop: '1.5rem' }}
        >
          <div>
            <dt className="eyebrow" style={{ color: SECONDARY }}>Role</dt>
            <dd className="body" style={{ marginTop: '0.35rem', color: INK }}>
              Founder · Builder · Editor
            </dd>
          </div>
          <div>
            <dt className="eyebrow" style={{ color: SECONDARY }}>Tools</dt>
            <dd className="body" style={{ marginTop: '0.35rem', color: INK }}>
              Base44 · Shopify · Stripe
            </dd>
          </div>
          <div>
            <dt className="eyebrow" style={{ color: SECONDARY }}>Scope</dt>
            <dd className="body" style={{ marginTop: '0.35rem', color: INK }}>
              Storefront, content, UX & QA
            </dd>
          </div>
        </dl>
      </header>

      {/* 2 — Challenge */}
      <SectionShell id="challenge" alt>
        <SectionTitle n={1}>The challenge</SectionTitle>
        <Lead>
          Torch Republic sells instant coffee, functional mushroom blends, and ceremonial matcha from a single content-driven storefront. The work was to make those categories, plus subscriptions, educational articles, and SEO landing pages, feel like one coherent store — not a confusing catalog a first-time visitor has to decode.
        </Lead>
        <p className="body" style={{ marginTop: '1.25rem' }}>
          The harder constraint was doing it with AI assistance. AI generates pages and copy quickly, but it also fabricates, omits context, breaks working integrations, and produces confident claims that aren’t true. The job was to capture the speed without letting those failures reach a live store.
        </p>
      </SectionShell>

      {/* 3 — Role */}
      <SectionShell id="role">
        <SectionTitle n={2}>My role</SectionTitle>
        <Lead>I led the work end-to-end, as a founder working alongside AI tooling — not as a trained engineer, but as the person accountable for every decision and the final experience.</Lead>
        <ul className="mt-6 space-y-3 list-none p-0 m-0">
          <Bullet title="Founder —">accountable owner of the brand and the storefront.</Bullet>
          <Bullet title="AI-assisted e-commerce builder —">writing prompts, directing builds, and assembling sections in Base44.</Bullet>
          <Bullet title="UX & content strategist —">shaping layouts, calls to action, and copy across the catalog.</Bullet>
          <Bullet title="QA reviewer —">the final human check before anything reached customers.</Bullet>
        </ul>
      </SectionShell>

      {/* 4 — What I built */}
      <SectionShell id="built" alt>
        <SectionTitle n={3}>What I built</SectionTitle>
        <Lead>Six workstreams, each with a specific responsibility.</Lead>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {BUILT_CARDS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card-torch p-5" style={{ borderRadius: '12px' }}>
              <div className="flex items-center gap-2.5">
                <Icon style={{ width: 18, height: 18, color: ACCENT }} aria-hidden="true" />
                <h3 className="h4" style={{ margin: 0, fontSize: '0.9375rem' }}>{title}</h3>
              </div>
              <p className="body" style={{ marginTop: '0.6rem', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 5 — AI-assisted workflow */}
      <SectionShell id="workflow">
        <SectionTitle n={4}>AI-assisted workflow</SectionTitle>
        <Lead>A repeatable six-step loop, applied to every feature — emphasizing scoped prompts, guardrails, and human judgment over raw output.</Lead>
        <ol className="mt-8 space-y-4 list-none p-0 m-0">
          {WORKFLOW.map(({ step, body }, i) => (
            <li key={step} className="flex gap-4">
              <span
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: ACCENT,
                  flexShrink: 0,
                  width: '1.75rem',
                  paddingTop: '0.15rem',
                }}
              >
                0{i + 1}
              </span>
              <div>
                <strong style={{ fontFamily: 'var(--font-heading)', color: INK, fontSize: '0.9375rem' }}>{step}.</strong>{' '}
                <span className="body" style={{ fontSize: '0.9375rem' }}>{body}</span>
              </div>
            </li>
          ))}
        </ol>
      </SectionShell>

      {/* 6 — Quality assurance */}
      <SectionShell id="qa" alt>
        <SectionTitle n={5}>Quality assurance</SectionTitle>
        <Lead>Every change passed through these release checks before it reached customers.</Lead>
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 m-0">
          {QA_CHECKS.map((c) => (
            <li key={c} className="flex gap-3 items-start" style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: SECONDARY }}>
              <Check style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0, marginTop: '0.2rem' }} aria-hidden="true" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* 7 — Content architecture */}
      <SectionShell id="architecture">
        <SectionTitle n={6}>Content architecture</SectionTitle>
        <Lead>Five customer pathways organize the storefront so a visitor can always answer “where do I go next.”</Lead>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {PATHWAYS.map(({ icon: Icon, name, body }) => (
            <div
              key={name}
              style={{
                background: CARD,
                border: `1px solid ${RULE}`,
                borderRadius: '12px',
                padding: '1.25rem',
              }}
            >
              <Icon style={{ width: 20, height: 20, color: ACCENT }} aria-hidden="true" />
              <h3 className="h4" style={{ margin: '0.6rem 0 0.35rem', fontSize: '0.9375rem' }}>{name}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: SECONDARY, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 8 — Screenshots */}
      <SectionShell id="screenshots" alt>
        <SectionTitle n={7}>Screenshots</SectionTitle>
        <Lead>Real screenshots to be added. Placeholders are labeled — no mockups used.</Lead>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {SCREENSHOTS.map(({ label, caption }) => (
            <figure key={label} style={{ margin: 0 }}>
              <div
                aria-hidden="true"
                style={{
                  width: '100%',
                  aspectRatio: '16 / 10',
                  background: CREAM,
                  border: `1px dashed ${RULE}`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: SECONDARY,
                  }}
                >
                  Screenshot — to be added
                </span>
              </div>
              <figcaption style={{ marginTop: '0.6rem' }}>
                <strong style={{ fontFamily: 'var(--font-heading)', color: INK, fontSize: '0.875rem' }}>{label}</strong>
                <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: SECONDARY, marginTop: '0.25rem' }}>
                  {caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionShell>

      {/* 9 — Operational outcomes */}
      <SectionShell id="outcomes">
        <SectionTitle n={8}>Operational outcomes</SectionTitle>
        <Lead>
          The storefront is live and operating — a consolidated catalog, consistent collection and product-page UX, intact subscription and checkout flows, and an organized content structure. I’m not reporting performance metrics here because I won’t present numbers I can’t verify.
        </Lead>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          {METRICS_TRACKED.map((m) => (
            <div
              key={m}
              className="flex items-center gap-2.5"
              style={{ fontSize: '0.9375rem', color: SECONDARY }}
            >
              <ListChecks style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0 }} aria-hidden="true" />
              <span>{m} <span style={{ color: SECONDARY, opacity: 0.7 }}>(being tracked)</span></span>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* 10 — Closing CTA */}
      <section style={{ borderTop: `1px solid ${RULE}` }}>
        <div className="mx-auto max-w-[760px] px-6 md:px-10 py-14 md:py-20 text-center">
          <Eyebrow>Let’s talk</Eyebrow>
          <h2 className="h2" style={{ marginTop: '0.75rem' }}>
            Discuss this build or my process
          </h2>
          <p className="body-lg" style={{ marginTop: '0.75rem' }}>
            I’m happy to walk through the decisions, the AI workflow, and the trade-offs in more detail.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={LIVE_STORE} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Live store <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20%E2%80%94%20Torch%20Republic%20case%20study`} className="btn btn-ghost">
              Email me
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}