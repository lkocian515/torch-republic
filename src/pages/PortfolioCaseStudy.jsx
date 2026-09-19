import React, { useEffect } from 'react';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import ScrollProgressBar from '@/components/portfolio/ScrollProgressBar';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import CredibilityStrip from '@/components/portfolio/CredibilityStrip';
import QaMethodology from '@/components/portfolio/QaMethodology';
import CaseStudyIntro from '@/components/portfolio/CaseStudyIntro';
import MoreThanStorefront from '@/components/portfolio/MoreThanStorefront';
import ApplicationArchitecture from '@/components/portfolio/ApplicationArchitecture';
import WhatItDoes from '@/components/portfolio/WhatItDoes';
import EngineeringQA from '@/components/portfolio/EngineeringQA';
import ProblemsResolved from '@/components/portfolio/ProblemsResolved';
import ProjectOutcome from '@/components/portfolio/ProjectOutcome';
import DevLoop from '@/components/portfolio/DevLoop';
import QaEvidence from '@/components/portfolio/QaEvidence';
import DefectCard from '@/components/portfolio/DefectCard';
import AiOutputValidation from '@/components/portfolio/AiOutputValidation';
import ProjectGallery from '@/components/portfolio/ProjectGallery';
import SixFrameworks from '@/components/portfolio/SixFrameworks';
import ProcessDiagram from '@/components/portfolio/ProcessDiagram';
import ExperienceSnapshot from '@/components/portfolio/ExperienceSnapshot';
import ToolsPlatforms from '@/components/portfolio/ToolsPlatforms';
import ResumeAccess from '@/components/portfolio/ResumeAccess';
import ContactCta from '@/components/portfolio/ContactCta';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import { P, LINKEDIN, PORTFOLIO_TITLE, PORTFOLIO_DESC, PORTFOLIO_CANON, PORTFOLIO_OG_IMAGE } from '@/components/portfolio/portfolioTheme';

const TITLE = PORTFOLIO_TITLE;
const DESC = PORTFOLIO_DESC;
const OG_IMAGE = PORTFOLIO_OG_IMAGE;
const CANON = PORTFOLIO_CANON;

export default function PortfolioCaseStudy() {
  useEffect(() => {
    document.title = TITLE;

    const set = (sel, attr, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    const setOrCreate = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const match = selector.match(/\[([^=]+)="([^"]+)"\]/);
        if (match) el.setAttribute(match[1], match[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setOrCreate('meta[name="description"]', 'content', DESC);
    setOrCreate('meta[name="robots"]', 'content', 'index, follow');
    setOrCreate('meta[name="keywords"]', 'content', 'AI quality assurance, AI QA specialist, AI content evaluation, AI output validation, prompt testing, prompt iteration, e-commerce QA, AI commerce, content quality, document quality assurance, AI implementation, workflow testing, user journey testing, digital product QA');

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    canon.setAttribute('href', CANON);

    setOrCreate('meta[property="og:title"]', 'content', TITLE);
    setOrCreate('meta[property="og:description"]', 'content', DESC);
    setOrCreate('meta[property="og:url"]', 'content', CANON);
    setOrCreate('meta[property="og:type"]', 'content', 'website');
    setOrCreate('meta[property="og:site_name"]', 'content', 'Lisa Marie Kocian');
    setOrCreate('meta[property="og:image"]', 'content', OG_IMAGE);
    setOrCreate('meta[property="og:image:secure_url"]', 'content', OG_IMAGE);
    setOrCreate('meta[property="og:image:type"]', 'content', 'image/png');
    setOrCreate('meta[property="og:image:width"]', 'content', '1200');
    setOrCreate('meta[property="og:image:height"]', 'content', '630');
    setOrCreate('meta[property="og:image:alt"]', 'content', 'Lisa Kocian \u2014 AI QA & E-Commerce Portfolio');
    setOrCreate('meta[property="og:locale"]', 'content', 'en_US');

    setOrCreate('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setOrCreate('meta[name="twitter:title"]', 'content', TITLE);
    setOrCreate('meta[name="twitter:description"]', 'content', DESC);
    setOrCreate('meta[name="twitter:image"]', 'content', OG_IMAGE);
    setOrCreate('meta[name="twitter:image:alt"]', 'content', 'Lisa Kocian \u2014 AI QA & E-Commerce Portfolio');
    setOrCreate('meta[name="twitter:site"]', 'content', '');
    setOrCreate('meta[name="twitter:creator"]', 'content', '');

    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Lisa Marie Kocian',
      jobTitle: 'AI QA & E-Commerce Implementation Specialist',
      url: CANON,
      description: DESC,
      sameAs: [LINKEDIN],
      knowsAbout: [
        'AI quality assurance', 'AI content evaluation', 'AI output validation',
        'prompt testing', 'prompt iteration', 'e-commerce QA', 'AI commerce',
        'content quality', 'document quality assurance', 'AI implementation',
        'workflow testing', 'user journey testing', 'digital product QA',
        'e-commerce application development', 'Shopify Storefront API integration',
        'AI-assisted product development', 'functional QA', 'customer journey testing',
      ],
    };
    const webSite = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Lisa Marie Kocian \u2014 AI QA & E-Commerce Portfolio',
      url: CANON,
    };
    const webPage = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: TITLE,
      description: DESC,
      url: CANON,
      primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    };
    const inject = (obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-portfolio-seo', 'true');
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    };
    inject(person);
    inject(webSite);
    inject(webPage);

    return () => {
      document.querySelectorAll('script[data-portfolio-seo="true"]').forEach((s) => s.remove());
    };
  }, []);

  return (
    <div style={{ background: P.paper, color: P.ink, minHeight: '100vh' }}>
      <ScrollProgressBar />
      <PortfolioNav />
      <main>
        <PortfolioHero />
        <CredibilityStrip />
        <QaMethodology />
        <CaseStudyIntro />
        <MoreThanStorefront />
        <ApplicationArchitecture />
        <WhatItDoes />
        <DevLoop />
        <EngineeringQA />
        <QaEvidence />
        <DefectCard />
        <ProblemsResolved />
        <AiOutputValidation />
        <ProjectGallery />
        <ProjectOutcome />
        <SixFrameworks />
        <ProcessDiagram />
        <ExperienceSnapshot />
        <ToolsPlatforms />
        <ResumeAccess />
        <ContactCta />
      </main>
      <PortfolioFooter />
    </div>
  );
}