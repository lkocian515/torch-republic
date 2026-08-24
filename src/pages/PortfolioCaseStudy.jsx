import React, { useEffect } from 'react';
import { useSEO } from '@/hooks/useSEO';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import CredibilityStrip from '@/components/portfolio/CredibilityStrip';
import SixFrameworks from '@/components/portfolio/SixFrameworks';
import ProcessDiagram from '@/components/portfolio/ProcessDiagram';
import CaseStudyIntro from '@/components/portfolio/CaseStudyIntro';
import CommerceSystem from '@/components/portfolio/CommerceSystem';
import DevLoop from '@/components/portfolio/DevLoop';
import QaEvidence from '@/components/portfolio/QaEvidence';
import DefectCard from '@/components/portfolio/DefectCard';
import ProjectGallery from '@/components/portfolio/ProjectGallery';
import ToolsPlatforms from '@/components/portfolio/ToolsPlatforms';
import BusinessLens from '@/components/portfolio/BusinessLens';
import CareerDirection from '@/components/portfolio/CareerDirection';
import AboutLisa from '@/components/portfolio/AboutLisa';
import ContactCta from '@/components/portfolio/ContactCta';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import { P, LINKEDIN } from '@/components/portfolio/portfolioTheme';

const TITLE = 'Lisa Marie Kocian | AI QA + E-Commerce Implementation';
const DESC = 'AI quality assurance, AI implementation, e-commerce systems, prompt iteration, output validation and digital experience portfolio by Lisa Marie Kocian.';
const OG_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/64bb41300_generated_image.png';
const CANON = 'https://lisakocian.com';

export default function PortfolioCaseStudy() {
  useSEO({
    title: TITLE,
    description: DESC,
    image: OG_IMAGE,
    imageAlt: 'Lisa Marie Kocian — AI QA + E-Commerce Implementation portfolio',
    url: '/portfolio',
    type: 'website',
    noindex: false,
  });

  // Override coffee-store defaults so the portfolio stands alone as a
  // professional brand (LisaKocian.com), with Person / ProfilePage schema.
  useEffect(() => {
    document.title = TITLE;
    const set = (sel, attr, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    set('meta[name="description"]', 'content', DESC);
    set('meta[name="robots"]', 'content', 'index, follow');
    set('meta[property="og:title"]', 'content', TITLE);
    set('meta[property="og:description"]', 'content', DESC);
    set('meta[property="og:url"]', 'content', CANON);
    set('meta[property="og:site_name"]', 'content', 'Lisa Marie Kocian');
    set('meta[property="og:image"]', 'content', OG_IMAGE);
    set('meta[name="twitter:title"]', 'content', TITLE);
    set('meta[name="twitter:description"]', 'content', DESC);
    set('meta[name="twitter:image"]', 'content', OG_IMAGE);
    set('meta[name="twitter:site"]', 'content', '');
    set('meta[name="twitter:creator"]', 'content', '');
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', CANON);

    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Lisa Marie Kocian',
      jobTitle: 'AI QA + E-Commerce Implementation Specialist',
      url: CANON,
      description: DESC,
      sameAs: [LINKEDIN],
      knowsAbout: [
        'AI quality assurance', 'AI output evaluation', 'Prompt iteration',
        'E-commerce implementation', 'Workflow optimization', 'Digital customer experience', 'Quality testing',
      ],
    };
    const profile = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      url: CANON,
      mainEntity: { '@type': 'Person', name: 'Lisa Marie Kocian', url: CANON },
    };
    const inject = (obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-portfolio-seo', 'true');
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    };
    inject(person);
    inject(profile);

    return () => {
      document.querySelectorAll('script[data-portfolio-seo="true"]').forEach((s) => s.remove());
    };
  }, []);

  return (
    <div style={{ background: P.paper, color: P.ink, minHeight: '100vh' }}>
      <PortfolioNav />
      <main>
        <PortfolioHero />
        <CredibilityStrip />
        <SixFrameworks />
        <ProcessDiagram />
        <CaseStudyIntro />
        <CommerceSystem />
        <DevLoop />
        <QaEvidence />
        <DefectCard />
        <ProjectGallery />
        <ToolsPlatforms />
        <BusinessLens />
        <CareerDirection />
        <AboutLisa />
        <ContactCta />
      </main>
      <PortfolioFooter />
    </div>
  );
}