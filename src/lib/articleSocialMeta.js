/**
 * Centralized social-share + Open Graph metadata for Torch Republic Journal
 * and editorial article pages.
 *
 * WHY THIS EXISTS:
 *  Torch Republic runs as a client-rendered SPA. Base44 prerenders the React
 *  tree for social crawlers (Facebook, X, LinkedIn, etc.), so the <head> must
 *  contain article-specific OG/Twitter tags on the FIRST synchronous render —
 *  before any async DB fetch resolves. If the first render emits generic
 *  "Loading…" / Journal-home tags, that is what gets snapshotted.
 *
 *  This module is the single source of truth for, per article slug:
 *    - canonical live URL          (https://torchrepublic.com/journal/<slug>)
 *    - 1200×630 social image        (article-specific → Journal fallback → logo)
 *    - social image alt text
 *    - og:type / og:site_name
 *
 *  It is consumed by:
 *    - hooks/useSEO.js
 *    - components/social/ArticleShareBar.jsx
 *    - pages/BlogPost.jsx (synchronous Helmet on first paint)
 *
 *  Shared helpers ensure every share surface (Facebook, X, LinkedIn,
 *  Pinterest, WhatsApp, Email, Copy Link, native Share) and every meta tag
 *  reference the SAME article URL and image. No hardcoded /journal URL.
 */

const LIVE_BASE = 'https://torchrepublic.com';
const SITE_NAME = 'Torch Republic Coffee Company';
const OG_TYPE_ARTICLE = 'article';

// ── Fallback images (1200×630) ───────────────────────────────────────────────
// Priority 3: Journal cover (proper 1200×630, not a cropped logo).
const JOURNAL_COVER_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/f081b50f3_generated_image.png';

// Priority 4: site logo — emergency last resort only.
const LOGO_FALLBACK =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';

/**
 * Per-article override map for articles with a dedicated social image and
 * curated og:description / image alt. Used for synchronous-first-render meta
 * so crawlers see the correct tags immediately, and as the authoritative
 * fallback if a DB article lacks a featured image.
 *
 * `featured_image` from the DB (if present) still wins for the og:image;
 * the `ogImage` here is the article-specific social image used when no
 * featured image exists, and the `imageAlt` is always used for og:image:alt
 * when present.
 */
export const ARTICLE_SOCIAL_OVERRIDES = {
  'coffee-pods-plastic-waste-microplastics': {
    title:
      'Coffee Pods, Plastic Waste, and Microplastics: What the Research Actually Says',
    description:
      'Coffee pods offer undeniable convenience, but their waste, recyclability, and contact with hot liquids raise reasonable questions. Here is what current research can—and cannot—tell us.',
    ogImage:
      'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e184d7b47_generated_image.png',
    imageAlt:
      'Used single-use coffee pods beside a reusable mug and instant coffee, illustrating questions about coffee waste and convenience.',
  },
};

/**
 * Resolve the live canonical URL for an article slug.
 * Never returns a preview/staging/host domain, the homepage, or /journal.
 * @param {string} slug  e.g. 'coffee-pods-plastic-waste-microplastics'
 * @returns {string}     e.g. 'https://torchrepublic.com/journal/coffee-pods-plastic-waste-microplastics'
 */
export function articleUrl(slug) {
  if (!slug) return LIVE_BASE;
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return `${LIVE_BASE}/journal/${clean}`;
}

/**
 * Resolve the canonical URL from a path. Accepts '/journal/<slug>' or a full
 * live URL. Normalizes any preview/base44/localhost host to torchrepublic.com.
 */
export function resolveLiveUrl(path) {
  if (!path) return typeof window !== 'undefined' ? window.location.href : LIVE_BASE;
  if (path.startsWith('http')) {
    try {
      const u = new URL(path);
      if (
        u.hostname.includes('base44') ||
        u.hostname.includes('preview') ||
        u.hostname.includes('localhost')
      ) {
        return `${LIVE_BASE}${u.pathname}${u.search}`;
      }
      return path;
    } catch {
      return path;
    }
  }
  return `${LIVE_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Resolve the absolute image URL for a relative path (Pinterest media param).
 */
export function resolveImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${LIVE_BASE}${url.startsWith('/') ? url : `/${url}`}`;
}

/**
 * Pick the best og:image for an article, in priority order:
 *   1. Article-specific social image (ARTICLE_SOCIAL_OVERRIDES)
 *   2. Article featured_image (DB)
 *   3. Journal cover (proper 1200×630)
 *   4. Site logo (emergency only)
 *
 * @param {string} slug
 * @param {string} [featuredImage]  absolute URL from DB, if any
 * @returns {{ image: string, alt: string, isArticleSpecific: boolean }}
 */
export function resolveArticleImage(slug, featuredImage) {
  const override = ARTICLE_SOCIAL_OVERRIDES[slug];

  // 1. Article-specific social image
  if (override?.ogImage) {
    return {
      image: override.ogImage,
      alt: override.imageAlt || `${override.title} — ${SITE_NAME}`,
      isArticleSpecific: true,
    };
  }
  // 2. DB featured image
  if (featuredImage) {
    return {
      image: featuredImage,
      alt: override?.imageAlt || `${override?.title || 'Torch Republic Journal article'} — ${SITE_NAME}`,
      isArticleSpecific: !!override, // has curated alt even if no dedicated social image
    };
  }
  // 3. Journal cover fallback
  return {
    image: JOURNAL_COVER_IMAGE,
    alt: 'Torch Republic Journal — research-backed coffee, mushroom coffee, and matcha guides.',
    isArticleSpecific: false,
  };
}

export const SOCIAL_CONSTANTS = {
  LIVE_BASE,
  SITE_NAME,
  OG_TYPE_ARTICLE,
  JOURNAL_COVER_IMAGE,
  LOGO_FALLBACK,
};

export const JOURNAL_HOMEPAGE_META = {
  title: 'Journal | Torch Republic Coffee Company',
  description:
    'Explore research, coffee education, mushroom ingredients, matcha guides, sustainability, and better daily rituals from Torch Republic.',
  image: JOURNAL_COVER_IMAGE,
  url: `${LIVE_BASE}/journal`,
  imageAlt: 'Torch Republic Journal cover — coffee, mushroom coffee, and matcha education.',
};