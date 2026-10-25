import { useEffect } from 'react';
import { PORTFOLIO_OG_IMAGE } from './portfolioTheme';

// index.html is shared by every domain connected to this app, so the Torch
// Republic title, canonical, Open Graph tags, keywords, and Organization /
// WebSite JSON-LD are served on the portfolio host as well. This hook applies
// the portfolio's own metadata for the current route and takes the storefront's
// brand data out of the page for as long as a portfolio route is mounted.
//
// Everything changed here is reversed on unmount, so client-side navigation
// back into the storefront is never affected.

const BRAND_SCHEMA_ATTR = 'data-torch-brand-schema';
const OFF_TYPE = 'application/x-torch-disabled';
const OG_ALT = 'Lisa Marie Kocian, AI quality assurance and content evaluation portfolio.';

// Storefront-only head values that must never describe the portfolio.
const BRAND_ONLY_META = [
  ['name', 'keywords'],
  ['name', 'twitter:site'],
  ['name', 'twitter:creator'],
];

function metaEl(attr, key) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  return el;
}

export default function usePortfolioMetadata({
  title,
  description,
  canonical,
  ogType = 'website',
  robots = 'index, follow',
  schemas = [],
}) {
  useEffect(() => {
    const undo = [];

    // 1 — Disable the storefront's brand JSON-LD, reversibly.
    document.querySelectorAll(`script[${BRAND_SCHEMA_ATTR}]`).forEach((el) => {
      const original = el.getAttribute('type') || 'application/ld+json';
      el.setAttribute('type', OFF_TYPE);
      undo.push(() => el.setAttribute('type', original));
    });

    // 2 — Blank storefront-only meta values.
    BRAND_ONLY_META.forEach(([attr, key]) => {
      const el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) return;
      const original = el.getAttribute('content');
      el.setAttribute('content', '');
      undo.push(() => el.setAttribute('content', original || ''));
    });

    // 3 — Portfolio metadata.
    document.title = title;
    document.documentElement.setAttribute('data-seo-set', 'true');
    undo.push(() => document.documentElement.removeAttribute('data-seo-set'));

    const setMeta = (attr, key, value) => {
      const el = metaEl(attr, key);
      const original = el.getAttribute('content');
      el.setAttribute('content', value);
      undo.push(() => (original === null ? el.removeAttribute('content') : el.setAttribute('content', original)));
    };

    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('name', 'googlebot', robots);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', 'Lisa Marie Kocian');
    setMeta('property', 'og:locale', 'en_US');
    setMeta('property', 'og:image', PORTFOLIO_OG_IMAGE);
    setMeta('property', 'og:image:secure_url', PORTFOLIO_OG_IMAGE);
    setMeta('property', 'og:image:alt', OG_ALT);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', PORTFOLIO_OG_IMAGE);
    setMeta('name', 'twitter:image:alt', OG_ALT);

    // 4 — Canonical.
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.setAttribute('rel', 'canonical');
      document.head.appendChild(canon);
    }
    const originalCanonical = canon.getAttribute('href');
    canon.setAttribute('href', canonical);
    undo.push(() =>
      originalCanonical === null ? canon.removeAttribute('href') : canon.setAttribute('href', originalCanonical)
    );

    // 5 — Route-specific structured data.
    schemas.forEach((obj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-portfolio-schema', 'true');
      script.textContent = JSON.stringify(obj);
      document.head.appendChild(script);
      undo.push(() => script.remove());
    });

    return () => undo.forEach((fn) => fn());
  }, [title, description, canonical, ogType, robots, schemas]);
}