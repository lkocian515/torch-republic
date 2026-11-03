import { useLocation, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// 410 Gone — branded discontinued page, noindexed
function GonePage() {
  useEffect(() => {
    document.title = '410 Gone — Torch Republic';
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'robots'; document.head.appendChild(meta); }
    meta.content = 'noindex, follow';
    return () => { if (meta) meta.content = 'index, follow'; };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center" style={{ background: '#F7F2E9' }}>
      <p className="mb-4 font-mono text-[11px] tracking-[0.25em] uppercase" style={{ color: '#9B4E2F' }}>410 · No Longer Available</p>
      <h1 className="mb-3 font-serif text-3xl font-bold" style={{ color: '#292626' }}>This page is no longer available</h1>
      <p className="mb-8 font-heading text-sm" style={{ color: '#5E4639', maxWidth: '420px', lineHeight: 1.7 }}>
        Torch Republic now focuses entirely on premium instant coffee and mushroom coffee. The page you're looking for no longer exists.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to="/shop" className="inline-flex min-h-[48px] items-center justify-center font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90" style={{ background: '#9B4E2F', color: '#F7F2E9' }}>Shop All Products →</Link>
        <Link to="/" className="inline-flex min-h-[48px] items-center justify-center font-mono text-[11px] tracking-[0.2em] uppercase py-4 px-8 transition-all hover:opacity-75" style={{ border: '1px solid #9B4E2F', color: '#9B4E2F' }}>Return Home</Link>
      </div>
    </div>
  );
}

// OLD URL REDIRECTS — 301-equivalent client-side redirects for legacy routes
const OLD_URL_REDIRECTS = {
  // ── Legacy Shopify collection routes ──
  '/collections/t-shirts': null,
  '/collections/hoodies-sweatshirts': null,
  '/collections/tanks': null,
  '/collections/hats': null,
  '/collections/magnets': null,
  '/collections/stickers': null,
  '/collections/jewelry': null,
  '/collections/jewelry-all': null,
  '/collections/mugs-tumblers': null,
  '/collections/candles': null,
  '/collections/flags': null,
  '/collections/bobbleheads': null,
  '/collections/hollywood-bobbles': null,
  '/collections/accessories': null,
  '/collections/home-decor': null,
  '/collections/men': null,
  '/collections/women': null,
  '/collections/liberty-icons': null,
  '/collections/commanders-series': null,
  '/collections/women-of-the-republic': null,
  '/collections/liberty-flame': null,
  '/collections/patriotic-pride': null,
  '/collections/freedom-isnt-free': null,
  '/collections/we-the-people': null,
  '/collections/faith-over-fear': null,
  '/collections/christ-is-king': null,
  '/collections/god-family-country': null,
  '/collections/american-heroes': null,
  '/collections/founders-series': '/shop/instant-coffee',
  '/collections/founders': '/shop/instant-coffee',
  '/collections/best-sellers': '/shop',
  '/collections/on-sale': '/shop',
  '/collections/all': '/shop',
  '/collections/coffee': '/shop/instant-coffee',
  '/collections/mushroom-coffee': '/shop/instant-mushroom-coffee',
  '/collections/matcha': '/shop/matcha',
  '/collections/bundles': '/build-your-ritual',
  '/collections/gifts': '/gifts',

  // ── Legacy product URLs (apparel/jewelry/collectibles) → 410 ──
  '/products/4th-of-july': null,
  '/products/jesus-saves': null,
  '/products/american-flag': null,
  '/products/liberty-necklace': null,
  '/products/freedom-ring': null,
  '/products/patriot-hoodie': null,
  '/products/lincoln-bobblehead': null,
  '/products/washington-bobblehead': null,
  '/products/liberty': '/shop/instant-coffee',
  '/products/commanders': '/shop/instant-coffee',
  '/products/washington': '/shop/instant-coffee',
  '/products/founders': '/shop/instant-coffee',

  // ── Legacy Shopify pages ──
  '/pages/about-us': '/our-story',
  '/pages/about': '/our-story',
  '/pages/contact': '/contact',
  '/pages/contact-us': '/contact',
  '/pages/faq': '/faq',
  '/pages/shipping': '/shipping-policy',
  '/pages/shipping-policy': '/shipping-policy',
  '/pages/returns': '/return-policy',
  '/pages/return-policy': '/return-policy',
  '/pages/privacy': '/privacy-policy',
  '/pages/privacy-policy': '/privacy-policy',
  '/pages/terms': '/terms-of-service',
  '/pages/terms-of-service': '/terms-of-service',
  '/pages/rewards': '/torchbearers-rewards',
  '/pages/loyalty': '/torchbearers-rewards',
  '/pages/journal': '/journal',
  '/pages/blog': '/journal',
  '/pages/recipes': '/recipes',

  // ── Legacy blog/news routes ──
  '/blogs/news': '/journal',
  '/blogs/journal': '/journal',
  '/blog': '/journal',

  // ── Alternate-domain path aliases ──
  '/shop-all': '/shop',
  '/shop-coffee': '/shop/instant-coffee',
  '/shop-matcha': '/shop/matcha',
  '/shop-mushroom-coffee': '/shop/instant-mushroom-coffee',
  '/account': '/profile',
  '/account/login': '/login',
  '/account/register': '/register',
  '/account/orders': '/profile',
  '/rewards': '/torchbearers-rewards',
  '/loyalty-program': '/torchbearers-rewards',
  '/about-us': '/our-story',
  '/our-mission': '/our-story',
};

export default function PageNotFound() {
  const location = useLocation();

  // Ensure 404 pages are never indexed
  useEffect(() => {
    document.title = '404 Not Found — Torch Republic';
    let el = document.querySelector('meta[name="robots"]');
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', 'robots');
      document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex, follow');
    return () => { if (el) el.setAttribute('content', 'index, follow'); };
  }, []);

  // Check if this is an old URL that should redirect
  const pathname = location.pathname.toLowerCase();
  for (const [oldPath, newPath] of Object.entries(OLD_URL_REDIRECTS)) {
    if (pathname === oldPath || pathname.startsWith(oldPath + '/') || pathname.startsWith(oldPath + '?')) {
      try {
        base44.analytics.track({
          eventName: 'old_url_redirect',
          properties: { old_url: pathname, new_url: newPath || '410-gone' }
        });
      } catch (e) {}
      if (newPath === null) return <GonePage />;
      return <Navigate to={newPath} replace />;
    }
  }

  // Handle old Shopify product URLs — apparel/jewelry/collectibles → 410 Gone
  if (pathname.startsWith('/products/')) {
    const slug = pathname.replace('/products/', '');
    const coffeeKeywords = ['coffee', 'matcha', 'blend', 'torch', 'glow', 'moon', 'sun', 'dream', 'oracle', 'mystic', 'monk', 'ascendant', 'alchemist', 'ember', 'midnight'];
    const isCoffee = coffeeKeywords.some(k => slug.includes(k));
    if (isCoffee) return <Navigate to="/shop" replace />;
    return <GonePage />;
  }

  // Handle old collection URLs not already mapped above
  if (pathname.startsWith('/collections/')) {
    return <GonePage />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6" style={{ background: '#F7F2E9' }}>
      <div className="w-full max-w-lg text-center">
        <p className="mb-4 font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: '#9B4E2F' }}>404</p>
        <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: '#32190F', letterSpacing: '-0.02em' }}>
          We couldn&rsquo;t find that page.
        </h1>
        <div className="mx-auto my-6 h-px w-24" style={{ background: 'linear-gradient(90deg, transparent, #B89A6D, transparent)' }} />
        <p className="mx-auto mb-10 font-heading text-base" style={{ color: '#5E4639', lineHeight: 1.7, maxWidth: '440px' }}>
          The page may have moved, but your next cup is still close.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="inline-flex min-h-[48px] items-center justify-center font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90" style={{ background: '#9B4E2F', color: '#F7F2E9', borderRadius: '6px' }}>Shop Coffee</Link>
          <Link to="/" className="inline-flex min-h-[48px] items-center justify-center font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-75" style={{ border: '1px solid #9B4E2F', color: '#9B4E2F', borderRadius: '6px' }}>Return Home</Link>
        </div>
        <div className="mt-8 flex justify-center gap-6">
          <Link to="/faq" className="font-heading text-sm" style={{ color: '#9B4E2F', textDecoration: 'underline' }}>FAQ</Link>
          <Link to="/contact" className="font-heading text-sm" style={{ color: '#9B4E2F', textDecoration: 'underline' }}>Contact</Link>
        </div>
      </div>
    </div>
  );
}