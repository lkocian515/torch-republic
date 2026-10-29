import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo } from '@/lib/routeSeo';

const SITE_URL = 'https://torchrepublic.com';
const DEFAULT_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9db0758e5_file_00000000a44881fba5d3d3bed2575d44.png';

function upsertMeta(selector, attr, value) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const match = selector.match(/\[([^=]+)="([^"]+)"\]/);
    if (match) element.setAttribute(match[1], match[2]);
    document.head.appendChild(element);
  }
  element.setAttribute(attr, value);
}

function upsertCanonical(href) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export default function RouteSeoManager() {
  const location = useLocation();

  useEffect(() => {
    const seo = getRouteSeo(location.pathname, location.search);
    const canonicalUrl = `${SITE_URL}${seo.canonicalPath}`;
    const robots = seo.noindex ? 'noindex, follow' : 'index, follow';

    // If the page component already set its own SEO via useSEO, do not
    // overwrite the title/description/OG/Twitter values with route-level
    // fallbacks. Only manage canonical URL and robots directives.
    // A sentinel left behind by the route we are leaving does not count as this
    // page's own SEO, so navigation always lands on the right title.
    const seoRoute = document.documentElement.getAttribute('data-seo-path');
    const pageHasOwnSeo =
      document.documentElement.getAttribute('data-seo-set') === 'true' && seoRoute === location.pathname;

    if (!pageHasOwnSeo) {
      document.title = seo.title;
      upsertMeta('meta[name="description"]', 'content', seo.description);
      upsertMeta('meta[property="og:title"]', 'content', seo.title);
      upsertMeta('meta[property="og:description"]', 'content', seo.description);
      upsertMeta('meta[property="og:image"]', 'content', DEFAULT_IMAGE);
      upsertMeta('meta[name="twitter:title"]', 'content', seo.title);
      upsertMeta('meta[name="twitter:description"]', 'content', seo.description);
      upsertMeta('meta[name="twitter:image"]', 'content', DEFAULT_IMAGE);
    }

    upsertMeta('meta[name="robots"]', 'content', robots);
    upsertMeta('meta[name="googlebot"]', 'content', robots);
    upsertMeta('meta[name="bingbot"]', 'content', robots);
    upsertCanonical(canonicalUrl);
    upsertMeta('meta[property="og:url"]', 'content', canonicalUrl);
  }, [location.pathname, location.search]);

  return null;
}