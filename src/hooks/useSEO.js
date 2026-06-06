import { useEffect } from 'react';

const BASE_URL = 'https://torchrepublic.com';
const SITE_NAME = 'Torch Republic Coffee Company';
const DEFAULT_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';

/**
 * Full SEO hook — sets title, meta description, Open Graph, Twitter Card,
 * canonical URL, and injects JSON-LD structured data.
 *
 * @param {object} opts
 * @param {string} opts.title          - Page <title>
 * @param {string} opts.description    - Meta description (max ~160 chars)
 * @param {string} [opts.image]        - OG image URL (absolute)
 * @param {string} [opts.url]          - Canonical path, e.g. '/blends/glowmind-clarity'
 * @param {'website'|'product'|'article'} [opts.type] - OG type
 * @param {object} [opts.product]      - Product schema data { name, description, price, image, sku }
 * @param {object[]} [opts.breadcrumbs] - Array of { name, url } for BreadcrumbList schema
 */
export function useSEO({ title, description, image, url, type = 'website', product, breadcrumbs }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Premium Instant Mushroom Coffee`;
    const canonicalUrl = url ? `${BASE_URL}${url}` : BASE_URL;
    const ogImage = image || DEFAULT_IMAGE;

    // ── title ──
    const prevTitle = document.title;
    document.title = fullTitle;

    // ── helper: set/create meta ──
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.match(/\[([^=]+)="([^"]+)"\]/)?.slice(1) || [];
        if (attrName) el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
      return el;
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
      el.setAttribute('href', href);
      return el;
    };

    // ── description ──
    const descEl = description ? setMeta('meta[name="description"]', 'content', description) : null;

    // ── canonical ──
    const canonEl = setLink('canonical', canonicalUrl);

    // ── Open Graph ──
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description || '');
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:type"]', 'content', type === 'product' ? 'product' : type);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);

    // ── Twitter Card ──
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description || '');
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // ── JSON-LD structured data ──
    const schemas = [];

    if (product) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image || ogImage,
        sku: product.sku || product.name.toLowerCase().replace(/\s+/g, '-'),
        brand: { '@type': 'Brand', name: SITE_NAME },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: product.price,
          availability: 'https://schema.org/InStock',
          url: canonicalUrl,
          seller: { '@type': 'Organization', name: SITE_NAME },
        },
        ...(product.rating ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount || 1,
          }
        } : {}),
      });
    }

    if (breadcrumbs?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${BASE_URL}${b.url}`,
        })),
      });
    }

    const scriptEls = schemas.map(schema => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.setAttribute('data-seo-hook', 'true');
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });

    return () => {
      document.title = prevTitle;
      if (descEl) descEl.setAttribute('content', '');
      canonEl.setAttribute('href', BASE_URL);
      scriptEls.forEach(el => el.remove());
    };
  }, [title, description, image, url, type, product, breadcrumbs]);
}