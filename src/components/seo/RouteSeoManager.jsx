import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getRouteSeo } from '@/lib/routeSeo';

const SITE_URL = 'https://torchrepublic.com';
const DEFAULT_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/134aeb9a2_LIVEFREESTAYREADY_20260606_001446_0000.png';

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
    const robots = seo.noindex ? 'noindex, nofollow' : 'index, follow';

    document.title = seo.title;
    upsertMeta('meta[name="description"]', 'content', seo.description);
    upsertMeta('meta[name="robots"]', 'content', robots);
    upsertMeta('meta[name="googlebot"]', 'content', robots);
    upsertMeta('meta[name="bingbot"]', 'content', robots);
    upsertCanonical(canonicalUrl);
    upsertMeta('meta[property="og:title"]', 'content', seo.title);
    upsertMeta('meta[property="og:description"]', 'content', seo.description);
    upsertMeta('meta[property="og:url"]', 'content', canonicalUrl);
    upsertMeta('meta[property="og:image"]', 'content', DEFAULT_IMAGE);
    upsertMeta('meta[name="twitter:title"]', 'content', seo.title);
    upsertMeta('meta[name="twitter:description"]', 'content', seo.description);
    upsertMeta('meta[name="twitter:image"]', 'content', DEFAULT_IMAGE);
  }, [location.pathname, location.search]);

  return null;
}