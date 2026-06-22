import { useLocation, Navigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { base44 } from '@/api/base44Client';

// 410 Gone — branded discontinued page, noindexed
function GonePage() {
  useEffect(() => {
    document.title = '410 Gone — Torch Republic';
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'robots'; document.head.appendChild(meta); }
    meta.content = 'noindex, nofollow';
    return () => { if (meta) meta.content = 'index, follow'; };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: '#080808' }}>
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase mb-4" style={{ color: '#E6B7AD' }}>410 · No Longer Available</p>
      <h1 className="font-serif font-bold text-3xl text-white mb-3">This page has been discontinued</h1>
      <p className="font-heading text-sm mb-8" style={{ color: 'rgba(245,239,230,0.7)', maxWidth: '420px', lineHeight: 1.7 }}>
        Torch Republic now focuses entirely on premium instant coffee, mushroom coffee, and ceremonial matcha. The page you're looking for no longer exists.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/shop" className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90" style={{ background: '#E6B7AD', color: '#080808' }}>
          Shop Best Sellers →
        </Link>
        <Link to="/quiz" className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-75" style={{ border: '1px solid rgba(230,183,173,0.35)', color: '#E6B7AD' }}>
          Take the 30-Second Quiz
        </Link>
        <Link to="/" className="font-mono text-[11px] tracking-[0.2em] uppercase py-4 px-8 transition-all hover:opacity-75" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
          Return Home
        </Link>
      </div>
    </div>
  );
}

// OLD URL REDIRECTS — 301-equivalent client-side redirects for legacy routes
const OLD_URL_REDIRECTS = {
  // ── Legacy Shopify collection routes ──
  '/collections/t-shirts': null, // 410 Gone
  '/collections/hoodies-sweatshirts': null, // 410 Gone
  '/collections/tanks': null, // 410 Gone
  '/collections/hats': null, // 410 Gone
  '/collections/magnets': null, // 410 Gone
  '/collections/stickers': null, // 410 Gone
  '/collections/jewelry': null, // 410 Gone
  '/collections/jewelry-all': null, // 410 Gone
  '/collections/mugs-tumblers': null, // 410 Gone
  '/collections/candles': null, // 410 Gone
  '/collections/flags': null, // 410 Gone
  '/collections/bobbleheads': null, // 410 Gone
  '/collections/hollywood-bobbles': null, // 410 Gone
  '/collections/accessories': null, // 410 Gone
  '/collections/home-decor': null, // 410 Gone
  '/collections/men': null, // 410 Gone
  '/collections/women': null, // 410 Gone
  '/collections/liberty-icons': null, // 410 Gone
  '/collections/commanders-series': null, // 410 Gone
  '/collections/women-of-the-republic': null, // 410 Gone
  '/collections/liberty-flame': null, // 410 Gone
  '/collections/patriotic-pride': null, // 410 Gone
  '/collections/freedom-isnt-free': null, // 410 Gone
  '/collections/we-the-people': null, // 410 Gone
  '/collections/faith-over-fear': null, // 410 Gone
  '/collections/christ-is-king': null, // 410 Gone
  '/collections/god-family-country': null, // 410 Gone
  '/collections/american-heroes': null, // 410 Gone
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
  // Old coffee-adjacent product aliases → shop
  '/products/liberty': '/shop/instant-coffee',
  '/products/commanders': '/shop/instant-coffee',
  '/products/washington': '/shop/instant-coffee',
  '/products/founders': '/shop/instant-coffee',

  // ── Legacy Shopify pages ──
  '/pages/about-us': '/mission',
  '/pages/about': '/mission',
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

  // ── Alternate-domain path aliases (if served from same app) ──
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
  '/about-us': '/mission',
  '/our-story': '/mission',
  '/our-mission': '/mission',
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
        el.setAttribute('content', 'noindex, nofollow');
        return () => { if (el) el.setAttribute('content', 'index, follow'); };
    }, []);

    // Check if this is an old URL that should redirect
    const pathname = location.pathname.toLowerCase();
    for (const [oldPath, newPath] of Object.entries(OLD_URL_REDIRECTS)) {
        if (pathname === oldPath || pathname.startsWith(oldPath + '/') || pathname.startsWith(oldPath + '?')) {
            // Track redirect for analytics
            try {
                base44.analytics.track({
                    eventName: 'old_url_redirect',
                    properties: { old_url: pathname, new_url: newPath || '410-gone' }
                });
            } catch (e) {}
            // null means 410 Gone — show a branded discontinued page, not a redirect
            if (newPath === null) {
                return <GonePage />;
            }
            return <Navigate to={newPath} replace />;
        }
    }
    
    // Handle old Shopify product URLs — apparel/jewelry/collectibles → 410 Gone
    // Coffee-related product slugs → /shop (already handled by app routes /products/:slug)
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
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#080808' }}>
            <div className="max-w-2xl w-full">
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <p className="font-mono text-[11px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>404 · Page Not Found</p>
                        <h1 className="font-serif font-bold" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', color: '#F7F1E8', letterSpacing: '-0.02em' }}>
                            That Ritual Has Moved
                        </h1>
                        <div className="h-px w-24 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(230,183,173,0.3), transparent)' }}></div>
                        <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.55)', lineHeight: 1.7, maxWidth: '460px', margin: '0 auto' }}>
                            You've discovered a page from our past. Torch Republic now focuses on premium instant coffee, mushroom coffee, and ceremonial matcha.
                        </p>
                    </div>
                    
                    {/* Primary CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/shop" className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-90" style={{ background: '#E6B7AD', color: '#080808', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Shop Best Sellers →
                        </Link>
                        <Link to="/quiz" className="font-mono text-[11px] tracking-[0.2em] uppercase font-bold py-4 px-8 transition-all hover:opacity-75" style={{ border: '1px solid rgba(230,183,173,0.35)', color: '#E6B7AD', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Take the 30-Second Quiz
                        </Link>
                        <Link to="/" className="font-mono text-[11px] tracking-[0.2em] uppercase py-4 px-8 transition-all hover:opacity-75" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.45)', minHeight: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            Return Home
                        </Link>
                    </div>

                    {/* Category tiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
                        <Link to="/shop/instant-mushroom-coffee" className="p-5 text-center transition-all hover:opacity-90" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '4px' }}>
                            <p className="font-serif font-bold text-white text-base mb-1">Mushroom Coffee</p>
                            <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Lion's Mane + Chaga</p>
                        </Link>
                        <Link to="/shop/matcha" className="p-5 text-center transition-all hover:opacity-90" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '4px' }}>
                            <p className="font-serif font-bold text-white text-base mb-1">Ceremonial Matcha</p>
                            <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Ceremonial Grade</p>
                        </Link>
                        <Link to="/shop/instant-coffee" className="p-5 text-center transition-all hover:opacity-90" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '4px' }}>
                            <p className="font-serif font-bold text-white text-base mb-1">Instant Coffee</p>
                            <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>100% Arabica</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}