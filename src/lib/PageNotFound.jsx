import { useLocation, Navigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

// OLD URL REDIRECTS - Redirect old apparel/patriotic URLs to new coffee pages
const OLD_URL_REDIRECTS = {
  // Apparel collections → /shop
  '/collections/t-shirts': '/shop',
  '/collections/hoodies-sweatshirts': '/shop',
  '/collections/tanks': '/shop',
  '/collections/hats': '/shop',
  '/collections/magnets': '/shop',
  '/collections/stickers': '/shop',
  '/collections/jewelry': '/shop',
  '/collections/mugs-tumblers': '/shop',
  '/collections/candles': '/shop',
  '/collections/flags': '/shop',
  '/collections/bobbleheads': '/shop',
  '/collections/accessories': '/shop',
  '/collections/home-decor': '/shop',
  
  // Old patriotic collections → /shop
  '/collections/liberty-icons': '/shop',
  '/collections/commanders-series': '/shop',
  '/collections/women-of-the-republic': '/shop',
  '/collections/liberty-flame': '/shop',
  '/collections/patriotic-pride': '/shop',
  '/collections/freedom-isnt-free': '/shop',
  '/collections/we-the-people': '/shop',
  '/collections/faith-over-fear': '/shop',
  '/collections/christ-is-king': '/shop',
  '/collections/god-family-country': '/shop',
  '/collections/american-heroes': '/shop',
  '/collections/founders': '/shop',
  
  // Old patriotic product URLs → specific coffee products
  '/products/4th-of-july': '/shop',
  '/products/jesus-saves': '/shop',
  '/products/american-flag': '/shop',
  '/freedom': '/shop',
  '/products/liberty': '/classic-coffee',
  '/products/commanders': '/classic-coffee',
  '/products/washington': '/classic-coffee',
  '/products/founders': '/classic-coffee',
  
  // Old product pages → /shop
  '/products/': '/shop',
  
  // Old pages → appropriate new pages
  '/pages/about-us': '/mission',
  '/pages/contact': '/contact',
  '/pages/faq': '/faq',
  '/pages/shipping': '/shipping-policy',
  '/pages/returns': '/return-policy',
  '/pages/privacy': '/privacy-policy',
  '/pages/terms': '/terms-of-service',
  
  // Legacy blog → /journal
  '/blogs/news': '/journal',
  '/blogs/': '/journal',
};

export default function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);
    
    // React Hooks must be called unconditionally - call before any early returns
    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });
    
    // Check if this is an old URL that should redirect
    const pathname = location.pathname.toLowerCase();
    for (const [oldPath, newPath] of Object.entries(OLD_URL_REDIRECTS)) {
        if (pathname.startsWith(oldPath)) {
            // Track redirect for analytics
            try {
                base44.analytics.track({
                    eventName: 'old_url_redirect',
                    properties: {
                        old_url: pathname,
                        new_url: newPath,
                    }
                });
            } catch (e) {}
            return <Navigate to={newPath} replace />;
        }
    }
    
    // Handle old Shopify product URLs
    if (pathname.startsWith('/products/')) {
        return <Navigate to="/shop" replace />;
    }
    
    // Handle old collection URLs
    if (pathname.startsWith('/collections/')) {
        return <Navigate to="/shop" replace />;
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#080808' }}>
            <div className="max-w-lg w-full">
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-8xl font-black font-serif" style={{ color: 'rgba(230,183,173,0.2)' }}>404</h1>
                        <div className="h-px w-24 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(230,183,173,0.3), transparent)' }}></div>
                    </div>
                    
                    <div className="space-y-4">
                        <h2 className="text-2xl font-serif font-bold" style={{ color: '#F7F1E8', letterSpacing: '-0.02em' }}>
                            That Ritual Has Moved
                        </h2>
                        <p className="font-heading text-sm" style={{ color: 'rgba(247,241,232,0.5)', lineHeight: 1.7, maxWidth: '480px', margin: '0 auto' }}>
                            You've discovered a page from our past. Torch Republic has evolved into premium instant coffee, mushroom coffee, and ceremonial matcha for intentional daily rituals.
                        </p>
                    </div>
                    
                    {/* Shop CTAs */}
                    <div className="pt-6 pb-4">
                        <p className="font-mono text-[9px] tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.4)' }}>
                            Shop Your Ritual
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                            <a href="/mushroom-coffee" className="p-5 text-center transition-all hover:opacity-90" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '4px' }}>
                                <p className="font-serif font-bold text-white text-base mb-1">Mushroom Coffee</p>
                                <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Lion's Mane + Chaga</p>
                            </a>
                            <a href="/matcha" className="p-5 text-center transition-all hover:opacity-90" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '4px' }}>
                                <p className="font-serif font-bold text-white text-base mb-1">Ceremonial Matcha</p>
                                <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Premium Japanese</p>
                            </a>
                            <a href="/classic-coffee" className="p-5 text-center transition-all hover:opacity-90" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '4px' }}>
                                <p className="font-serif font-bold text-white text-base mb-1">Instant Coffee</p>
                                <p className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Premium Classic</p>
                            </a>
                        </div>
                    </div>
                    
                    {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
                        <div className="mt-8 p-4" style={{ background: 'rgba(230,183,173,0.05)', border: '1px solid rgba(230,183,173,0.15)', borderRadius: '4px' }}>
                            <p className="font-mono text-[8px] tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                                Admin Notice
                            </p>
                            <p className="font-heading text-xs" style={{ color: 'rgba(247,241,232,0.5)' }}>
                                Requested path: <span style={{ color: '#E6B7AD' }}>{pathname}</span>
                            </p>
                            <p className="font-mono text-[7px] tracking-[0.15em] mt-2" style={{ color: 'rgba(255,255,255,0.25)' }}>
                                This page hasn't been implemented yet.
                            </p>
                        </div>
                    )}
                    
                    <div className="pt-6">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="inline-flex items-center px-8 py-3.5 text-sm font-mono tracking-[0.25em] uppercase font-bold transition-all hover:opacity-90"
                            style={{ background: '#E6B7AD', color: '#080808', borderRadius: '2px' }}
                        >
                            Return Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}