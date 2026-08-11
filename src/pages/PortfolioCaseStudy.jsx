import React from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import useNoIndex from '@/hooks/useNoIndex';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

const ACCENT = '#B86543';
const INK = '#2D2824';
const SECONDARY = '#5C544C';
const RULE = '#E4D8C9';
const CREAM = '#FBF8F2';
const CARD = '#FFFFFF';

function Eyebrow({ children }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT, fontWeight: 600 }}>
      {children}
    </p>
  );
}

function Section({ id, n, title, children, alt = false }) {
  return (
    <section id={id} style={{ background: alt ? CARD : 'transparent', borderTop: alt ? `1px solid ${RULE}` : 'none' }}>
      <div className="mx-auto max-w-[760px] px-5 py-12 md:px-8 md:py-16">
        <div className="flex items-baseline gap-3">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: ACCENT, fontWeight: 600 }}>0{n}</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 2rem)', color: INK, lineHeight: 1.15, letterSpacing: '-0.01em' }}>
            {title}
          </h2>
        </div>
        <div className="mt-5 space-y-4" style={{ color: SECONDARY, fontSize: '1.0625rem', lineHeight: 1.75, fontFamily: 'var(--font-heading)' }}>
          {children}
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex gap-3" style={{ color: SECONDARY, fontSize: '1.0625rem', lineHeight: 1.7 }}>
      <span style={{ color: ACCENT, fontWeight: 700, marginTop: '0.1rem' }} aria-hidden="true">—</span>
      <span>{children}</span>
    </li>
  );
}

export default function PortfolioCaseStudy() {
  useNoIndex();
  useSEO({
    title: 'Torch Republic: AI-Assisted E-Commerce Build and UX Optimization — Case Study',
    description: 'A portfolio case study on building and optimizing the Torch Republic Coffee Company storefront using AI and Base44, written for prospective employers.',
    url: '/portfolio/torch-republic-ecommerce-build',
    type: 'article',
    noindex: true,
  });

  return (
    <div style={{ background: CREAM, color: INK, minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${RULE}` }}>
        <div className="mx-auto max-w-[760px] px-5 md:px-8 py-4 flex items-center justify-between">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: SECONDARY, fontWeight: 600 }}>
            Portfolio · Case Study
          </span>
          <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.875rem', color: INK, display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', minHeight: 40 }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back to site
          </Link>
        </div>
      </div>

      {/* Hero */}
      <header className="mx-auto max-w-[760px] px-5 md:px-8 pt-16 pb-12 md:pt-24 md:pb-16">
        <Eyebrow>AI-Assisted Build · UX &amp; Conversion · Content Strategy</Eyebrow>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(2.1rem, 1.5rem + 2.6vw, 3.4rem)', color: INK, lineHeight: 1.08, letterSpacing: '-0.02em', marginTop: '1rem' }}>
          Torch Republic: AI-Assisted E-Commerce Build and UX Optimization
        </h1>
        <p style={{ marginTop: '1.25rem', fontSize: '1.15rem', lineHeight: 1.7, color: SECONDARY, fontFamily: 'var(--font-heading)' }}>
          A first-person account of planning, building, and refining a live coffee storefront using AI tooling and the Base44 platform — including how I reviewed output, protected working store functionality, and kept the customer experience trustworthy.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: SECONDARY, letterSpacing: '0.04em' }}>
          <span><strong style={{ color: INK }}>Role:</strong> Founder · Builder · Editor</span>
          <span><strong style={{ color: INK }}>Stack:</strong> Base44 · Shopify · Stripe</span>
          <span><strong style={{ color: INK }}>Status:</strong> Live storefront</span>
        </div>
      </header>

      <div style={{ borderTop: `1px solid ${RULE}` }} />

      <Section id="overview" n={1} title="Project overview">
        <p>
          Torch Republic Coffee Company is a live, direct-to-consumer coffee brand selling instant coffee, functional mushroom blends, and ceremonial matcha. The storefront is content-driven: product pages, collection pages, subscription and bundle flows, educational articles, and SEO landing pages all live within a single React application built and hosted on Base44, with Shopify powering the product catalog and checkout and Stripe handling payments.
        </p>
        <p>
          This case study documents how I built and maintained that storefront as a founder working alongside AI tooling — not as a trained software engineer, but as someone responsible for the decisions, the review, and the final experience customers see.
        </p>
      </Section>

      <Section id="role" n={2} title="My role" alt>
        <p>I led the work end-to-end as:</p>
        <ul className="space-y-2 list-none p-0 m-0">
          <Bullet>Founder of the brand and accountable owner of the storefront.</Bullet>
          <Bullet>AI-assisted website builder — writing prompts, directing builds, and assembling sections in Base44.</Bullet>
          <Bullet>UX and conversion optimizer — shaping layouts, calls to action, and purchase flows for clarity.</Bullet>
          <Bullet>Content strategist and product-page editor — organizing and refining copy across the catalog.</Bullet>
          <Bullet>Quality reviewer — the final human check before anything reached customers.</Bullet>
        </ul>
      </Section>

      <Section id="challenge" n={3} title="Challenge">
        <p>
          The work was to create a credible, conversion-focused storefront that a visitor would trust enough to buy from, while simultaneously managing a lot of moving parts: product discovery across mushroom coffee, classic instant coffee, and matcha; subscription and bundle purchase paths; a checkout flow that had to stay intact; a growing library of educational and SEO content; and an expanding set of customer entry points from search, ads, and organic links.
        </p>
        <p>
          The harder constraint was doing this with AI assistance: AI can generate pages and copy quickly, but it also fabricates, omits context, breaks working integrations, and produces confident-sounding claims that aren&apos;t true. The real challenge was getting the speed of AI while keeping the judgment, accuracy, and reliability a live store requires.
        </p>
      </Section>

      <Section id="approach" n={4} title="Approach" alt>
        <p>
          My process stayed consistent across every feature: plan in plain language, prompt the AI to build, review the generated output against what the page was supposed to do, identify issues, refine, and only then release — always checking that nothing working had been broken in the process.
        </p>
        <ul className="space-y-2 list-none p-0 m-0">
          <Bullet><strong style={{ color: INK }}>Plan first.</strong> Define the goal, the customer path, and the constraints before any code is generated.</Bullet>
          <Bullet><strong style={{ color: INK }}>Direct the build.</strong> Write specific prompts in Base44, keeping scope tight so output stays reviewable.</Bullet>
          <Bullet><strong style={{ color: INK }}>Review the output.</strong> Read what was actually generated — copy, layout, links, data calls — instead of trusting that it worked.</Bullet>
          <Bullet><strong style={{ color: INK }}>Find and fix issues.</strong> Flag fabricated numbers, unsupported claims, broken links, duplicate scripts, and layout problems; correct or remove them.</Bullet>
          <Bullet><strong style={{ color: INK }}>Protect live functionality.</strong> Verify that checkout, cart, subscriptions, and analytics still behave correctly after each change.</Bullet>
        </ul>
      </Section>

      <Section id="workstreams" n={5} title="Key workstreams">
        <ul className="space-y-2 list-none p-0 m-0">
          <Bullet><strong style={{ color: INK }}>Information architecture.</strong> Consolidated legacy routes, retired discontinued categories, and redirected old URLs to current pages so the site stays crawlable and navigable.</Bullet>
          <Bullet><strong style={{ color: INK }}>Homepage and collection UX.</strong> Built a modular homepage and standardized collection grids so browsing is consistent and fast.</Bullet>
          <Bullet><strong style={{ color: INK }}>Product-page clarity.</strong> Edited product detail layouts for honest, readable descriptions and clear purchase actions.</Bullet>
          <Bullet><strong style={{ color: INK }}>Subscription flow.</strong> Kept subscription pricing and checkout redirects intact while refreshing the surrounding layout.</Bullet>
          <Bullet><strong style={{ color: INK }}>Mobile optimization.</strong> Worked at narrow viewports to keep touch targets, stacking, and readability correct.</Bullet>
          <Bullet><strong style={{ color: INK }}>SEO content organization.</strong> Organized articles and landing pages around canonical topics to reduce duplication.</Bullet>
          <Bullet><strong style={{ color: INK }}>QA and testing.</strong> Walked through navigation paths, CTAs, and responsive layouts before releasing.</Bullet>
        </ul>
      </Section>

      <Section id="qc" n={6} title="Quality-control process" alt>
        <p>Specific checks I applied before releasing changes:</p>
        <ul className="space-y-2 list-none p-0 m-0">
          <Bullet>Confirming checkout behavior — cart, add-to-cart, and Shopify/Stripe redirects — still worked.</Bullet>
          <Bullet>Checking responsive layouts at narrow mobile widths for overflow, touch-target size, and stacking.</Bullet>
          <Bullet>Verifying every call to action leads somewhere real and relevant.</Bullet>
          <Bullet>Reviewing generated copy for factual accuracy and removing anything that couldn&apos;t be substantiated.</Bullet>
          <Bullet>Avoiding unsupported product or health claims, especially around functional mushroom and matcha benefits.</Bullet>
          <Bullet>Testing navigation paths — header, footer, links, and redirects — to catch broken or orphaned routes.</Bullet>
          <Bullet>Confirming analytics and tracking still fire and aren&apos;t duplicated.</Bullet>
        </ul>
      </Section>

      <Section id="tools" n={7} title="Tools used">
        <p>The tools actually used in this build:</p>
        <ul className="space-y-2 list-none p-0 m-0">
          <Bullet><strong style={{ color: INK }}>Base44</strong> — the platform the app is built and hosted on (entities, pages, routing, functions).</Bullet>
          <Bullet><strong style={{ color: INK }}>Shopify</strong> — product catalog, collections, and checkout.</Bullet>
          <Bullet><strong style={{ color: INK }}>Stripe</strong> — payment handling.</Bullet>
          <Bullet><strong style={{ color: INK }}>AI assistance within Base44</strong> — for generating pages, components, and copy under my review.</Bullet>
        </ul>
        <p style={{ fontSize: '0.9375rem', color: SECONDARY, fontStyle: 'italic' }}>I have intentionally not listed tools I did not use.</p>
      </Section>

      <Section id="outcomes" n={8} title="Outcomes" alt>
        <p>
          The storefront is live and operating, with a consolidated catalog, consistent collection and product-page UX, intact subscription and checkout flows, and an organized content structure. I am not reporting performance metrics here because I do not want to present numbers I cannot verify.
        </p>
        <div style={{ marginTop: '1.5rem', border: `1px dashed ${RULE}`, borderRadius: '12px', background: CREAM, padding: '1.25rem 1.5rem' }}>
          <Eyebrow>Results to be added</Eyebrow>
          <p style={{ marginTop: '0.5rem', color: SECONDARY, fontSize: '1rem', lineHeight: 1.7 }}>
            Metrics will be added once measured and verified, including: conversion rate, email sign-ups, page-speed scores, order volume, and engagement. No figures are provided here by design.
          </p>
        </div>
      </Section>

      <Section id="skills" n={9} title="Skills demonstrated">
        <ul className="space-y-2 list-none p-0 m-0">
          <Bullet>AI prompt iteration and scoping.</Bullet>
          <Bullet>Evaluation of AI-generated output for accuracy and appropriateness.</Bullet>
          <Bullet>E-commerce operations across catalog, checkout, and subscriptions.</Bullet>
          <Bullet>UX writing and conversion-focused copy.</Bullet>
          <Bullet>Responsive web design at mobile widths.</Bullet>
          <Bullet>Manual QA and navigation-path testing.</Bullet>
          <Bullet>Content architecture and topic organization.</Bullet>
          <Bullet>SEO implementation (canonical pages, redirects, noindex, metadata).</Bullet>
        </ul>
      </Section>

      <Section id="reflection" n={10} title="Reflection" alt>
        <p>
          AI made this build dramatically faster, but speed without judgment creates its own problems — fabricated claims, broken integrations, and confident-looking mistakes. My role was to slow down at the points that mattered: reading what was generated, checking the live store still worked, refusing to publish claims I couldn&apos;t support, and keeping the brand consistent and trustworthy. The balance wasn&apos;t AI <em>or</em> human review; it was AI for the volume of work and human judgment for the decisions customers would actually feel.
        </p>
      </Section>

      {/* Contact CTA */}
      <section style={{ borderTop: `1px solid ${RULE}`, background: INK, color: CREAM }}>
        <div className="mx-auto max-w-[760px] px-5 md:px-8 py-16 md:py-20 text-center">
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: 'clamp(1.6rem, 1.3rem + 1.2vw, 2.2rem)', marginTop: '0.75rem', lineHeight: 1.15 }}>
            Want to discuss this build or my process?
          </h2>
          <p style={{ marginTop: '0.75rem', color: 'rgba(251,248,242,0.78)', fontSize: '1.0625rem', lineHeight: 1.7, fontFamily: 'var(--font-heading)' }}>
            I&apos;m happy to walk through the decisions, the AI workflow, and the trade-offs in more detail.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://torchrepublic.com/pages/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-opacity hover:opacity-90"
              style={{ background: ACCENT, color: CREAM, minHeight: 48, fontFamily: 'var(--font-heading)', fontSize: '0.9375rem', textDecoration: 'none' }}
            >
              Contact me <ArrowUpRight style={{ width: 16, height: 16 }} />
            </a>
            <a
              href="mailto:admin@torchrepublic.com?subject=Portfolio%20%E2%80%94%20Torch%20Republic%20case%20study"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'transparent', color: CREAM, border: `1px solid ${CREAM}`, minHeight: 48, fontFamily: 'var(--font-heading)', fontSize: '0.9375rem', textDecoration: 'none' }}
            >
              Email directly
            </a>
          </div>
          <p style={{ marginTop: '1.5rem', color: 'rgba(251,248,242,0.55)', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
            Replace the contact link above with your primary professional portfolio or preferred contact method.
          </p>
        </div>
      </section>
    </div>
  );
}