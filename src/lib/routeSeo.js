import { ALL_BLOG_TOPICS, FAQ_PAGES, INGREDIENT_PAGES, COMPARISON_PAGES } from '@/lib/seoContent';

const cleanTitle = (value) => value.replace(/[-_]+/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase()).replace(/\s+/g, ' ').trim();
const stripParams = (search = '') => {
  const params = new URLSearchParams(search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'srsltid', 'msclkid', 'ref'].forEach((key) => params.delete(key));
  return params.toString() ? `?${params.toString()}` : '';
};

const SEO_BY_PATH = {
  '/': ['Torch Republic | Coffee, Mushroom Coffee & Matcha', 'Shop premium instant coffee, mushroom coffee, and ceremonial matcha blends made for focused mornings and intentional daily rituals.'],
  '/shop': ['Shop Instant Coffee, Mushroom Coffee & Matcha | Torch Republic', 'Explore light-roast instant coffee, functional mushroom blends, and ceremonial matcha created for simple, intentional daily rituals.'],
  '/shop/instant-mushroom-coffee': ['Instant Mushroom Coffee Blends', 'Shop instant mushroom coffee with Lion’s Mane, Chaga, Cordyceps, and Reishi for focus, energy, and restorative daily rituals.'],
  '/shop/instant-coffee': ['Premium Instant Coffee Collection', 'Shop 100% Arabica freeze-dried instant coffee for smooth, bold coffee rituals without pods, machines, or bitter shortcuts.'],
  '/shop/matcha': ['Ceremonial Matcha Collection', 'Shop ceremonial matcha blends crafted for calm focus, steady energy, and simple latte rituals at home or on the go.'],
  '/classic-coffee': ['Premium Instant Coffee Collection', 'Explore Torch Republic classic instant coffee with smooth Arabica flavor, quick preparation, and no coffee maker required.'],
  '/mushroom-coffee': ['Instant Mushroom Coffee Blends', 'Explore Torch Republic mushroom coffee blends for focus, energy, calm, and daily wellness rituals with premium Arabica coffee.'],
  '/matcha': ['Ceremonial Matcha Collection', 'Explore Torch Republic ceremonial matcha for smooth lattes and intentional morning or afternoon rituals.'],
  '/blends': ['All Torch Republic Blends', 'Compare every Torch Republic coffee, mushroom coffee, and matcha blend to find the ritual that fits your morning or afternoon.'],
  '/bundle': ['Build Your Ritual | Coffee, Mushroom Coffee & Matcha Bundle', 'Choose your favorite coffee, mushroom blends, and matcha to create a ritual that fits your routine.'],
  '/build-your-ritual': ['Build Your Ritual | Coffee, Mushroom Coffee & Matcha Bundle', 'Choose your favorite coffee, mushroom blends, and matcha to create a ritual that fits your routine.'],
  '/how-it-works': ['How Torch Republic Works', 'Learn how Torch Republic instant coffee, mushroom coffee, and matcha prepare quickly while supporting practical daily routines.'],
  '/reviews': ['Torch Republic Customer Reviews | Coffee, Mushroom Coffee & Matcha', 'Read customer experiences with Torch Republic instant coffee, mushroom blends, matcha, and everyday beverage rituals.'],
  '/torchbearers-rewards': ['Torchbearers Rewards Program', 'Learn how Torchbearers Rewards helps customers earn points, redeem discounts, and get more value from daily coffee rituals.'],
  '/subscription': ['Coffee Subscription', 'Subscribe to Torch Republic coffee, mushroom coffee, and matcha for recurring deliveries, savings, and flexible ritual planning.'],
  '/our-story': ['Our Story | Torch Republic Coffee Company', 'Learn why Torch Republic creates light-roast instant coffee, functional mushroom blends, and ceremonial matcha for more intentional daily rituals.'],
  '/mission': ['Our Story | Torch Republic Coffee Company', 'Learn why Torch Republic creates light-roast instant coffee, functional mushroom blends, and ceremonial matcha for more intentional daily rituals.'],
  '/contact': ['Contact Torch Republic', 'Contact Torch Republic Coffee Company for support, product questions, partnerships, wholesale, shipping, and order help.'],
  '/torchbearer': ['Torchbearer Instant Coffee', 'Meet Torchbearer, the classic Torch Republic instant coffee ritual made with smooth Arabica coffee and fast preparation.'],
  '/faq': ['Torch Republic FAQ', 'Find answers about Torch Republic coffee, mushroom coffee, matcha, subscriptions, shipping, rewards, ingredients, and preparation.'],
  '/recipes': ['Coffee & Matcha Recipes', 'Explore easy Torch Republic recipes for mushroom coffee, instant coffee, matcha lattes, iced drinks, smoothies, and morning rituals.'],
  '/quiz': ['Find Your Coffee Ritual Quiz', 'Take the Torch Republic quiz to match your energy, focus, flavor, and schedule with the right coffee or matcha blend.'],
  '/customer-spotlight': ['Customer Spotlight | Torch Republic Rituals', 'Meet members of the Torch Republic community and discover how coffee, mushroom blends, and matcha fit into their daily rituals.'],
  '/spotlight': ['Customer Spotlight | Torch Republic Rituals', 'Meet members of the Torch Republic community and discover how coffee, mushroom blends, and matcha fit into their daily rituals.'],
  '/gifts': ['Coffee Gifts & Ritual Kits', 'Shop thoughtful coffee, mushroom coffee, and matcha gifts for wellness routines, workdays, travel, and morning rituals.'],
  '/journal': ['Torch Republic Journal', 'Read research-backed guides on mushroom coffee, instant coffee, matcha, ingredients, wellness routines, and better daily rituals.'],
  '/shipping-policy': ['Shipping Policy', 'Review Torch Republic shipping timelines, order processing, delivery estimates, tracking details, and domestic fulfillment information.'],
  '/return-policy': ['Return Policy', 'Read the Torch Republic return policy, satisfaction guarantee, exchange options, and steps for resolving product or order concerns.'],
  '/privacy-policy': ['Privacy Policy', 'Learn how Torch Republic collects, uses, protects, and manages customer information, analytics data, and communication preferences.'],
  '/terms-of-service': ['Terms of Service', 'Review the Torch Republic terms of service covering site use, purchases, subscriptions, account access, and customer responsibilities.'],
  '/mushroom-coffee-benefits': ['Mushroom Coffee Benefits', 'Learn what mushroom coffee may support, how functional mushrooms work, and what the current research does and does not show.'],
  '/lions-mane-coffee': ['Lion’s Mane Coffee Guide', 'Explore Lion’s Mane coffee benefits, taste, caffeine, research, and how it fits into a focused morning coffee ritual.'],
  '/instant-coffee-for-energy': ['Instant Coffee for Energy', 'Learn how premium instant coffee supports quick morning energy, work sessions, travel, and no-machine coffee routines.'],
  '/ingredients': ['Ingredients & Research', 'Explore Torch Republic ingredients including Lion’s Mane, Chaga, Cordyceps, Reishi, Arabica coffee, and ceremonial matcha.'],
  '/why-mushroom-coffee': ['Why Mushroom Coffee', 'Learn why people choose mushroom coffee for coffee-forward taste, functional ingredients, steady routines, and focused daily rituals.'],
  '/why-matcha': ['Why Matcha', 'Learn how ceremonial matcha supports calm focus, L-theanine synergy, smoother energy, and mindful morning or afternoon rituals.'],
  '/switch-from-pods': ['Switch From Coffee Pods', 'Compare coffee pods with premium instant coffee and see the cost, waste, convenience, and flavor benefits of a no-machine ritual.'],
  '/coffee-pod-alternatives': ['Coffee Pod Alternatives', 'Discover better alternatives to coffee pods, including premium instant coffee, mushroom coffee, and no-machine daily coffee options.'],
  '/coffee-without-a-machine': ['Coffee Without a Machine', 'Find the best ways to make coffee without a machine, from premium instant coffee to travel-friendly and pod-free options.'],
  '/camping-coffee': ['Camping Coffee Guide', 'Explore simple camping coffee options that pack light, taste smooth, and prepare quickly without bulky machines or wasteful pods.'],
  '/healthy-coffee-alternatives': ['Healthy Coffee Alternatives', 'Compare healthy coffee alternatives including mushroom coffee, ceremonial matcha, premium instant coffee, and lower-jitter rituals.'],
  '/coffee-rituals': ['Coffee Rituals Guide', 'Build better coffee rituals with simple preparation, better ingredients, mindful timing, and routines that support focused days.'],
  '/matcha-vs-coffee': ['Matcha vs Coffee', 'Compare matcha and coffee by caffeine, L-theanine, taste, energy curve, focus quality, and daily ritual fit.'],
  '/papua-new-guinea-coffee': ['Papua New Guinea Coffee', 'Learn about Papua New Guinea coffee origins, flavor notes, growing regions, and what makes PNG coffee distinctive.'],
  '/compare': ['Coffee & Matcha Comparison Center', 'Compare Torch Republic with other mushroom coffee, instant coffee, matcha, pod, and wellness drink options side by side.'],
  '/compare/ryze-vs-torch-republic': ['Ryze vs Torch Republic', 'Compare Ryze and Torch Republic mushroom coffee by ingredients, price per serving, blend variety, taste, and ritual fit.'],
  '/compare/four-sigmatic-vs-torch-republic': ['Four Sigmatic vs Torch Republic', 'Compare Four Sigmatic and Torch Republic mushroom coffee by ingredients, serving cost, format, taste, and daily use.'],
  '/compare/mudwtr-vs-torch-republic': ['MUD\\WTR vs Torch Republic', 'Compare MUD\\WTR and Torch Republic by caffeine, flavor, ingredients, coffee content, preparation, and daily ritual fit.'],
  '/compare/everyday-dose-vs-torch-republic': ['Everyday Dose vs Torch Republic', 'Compare Everyday Dose and Torch Republic by functional ingredients, coffee base, price, taste, and wellness positioning.'],
  '/compare/mushroom-coffee-vs-coffee-pods': ['Mushroom Coffee vs Coffee Pods', 'Compare mushroom coffee and coffee pods by cost, waste, convenience, ingredients, taste, and long-term daily ritual value.'],
  '/compare/instant-coffee-vs-k-cups': ['Instant Coffee vs K-Cups', 'Compare premium instant coffee and K-Cups by price per cup, waste, machine requirements, flavor, convenience, and travel use.'],
  '/about/torch-republic-team': ['Torch Republic Team', 'Meet the Torch Republic team behind our coffee, mushroom coffee, matcha, ingredient research, and ritual-focused education.'],
  '/founder-story': ['Founder Story', 'Read the Torch Republic founder story and the reason behind building a better coffee ritual without pods, shortcuts, or clutter.'],
  '/shop/morning-ritual': ['Morning Ritual Coffee', 'Shop Torch Republic blends selected for morning energy, focused starts, smooth flavor, and simple daily preparation.'],
  '/shop/focus-coffee': ['Focus Coffee Collection', 'Shop coffee, mushroom coffee, and matcha blends selected for concentration, calm energy, and productive work sessions.'],
  '/shop/travel-coffee': ['Travel Coffee Collection', 'Shop travel-friendly instant coffee, mushroom coffee, and matcha that prepare quickly without machines, pods, or bulky gear.'],
};

const CANONICAL_OVERRIDES = {
  '/bundle': '/build-your-ritual',
  '/classic-coffee': '/shop/instant-coffee',
  '/mushroom-coffee': '/shop/instant-mushroom-coffee',
  '/matcha': '/shop/matcha',
};

const NOINDEX_EXACT_PATHS = new Set([
  '/login', '/register', '/forgot-password', '/reset-password',
  '/profile', '/loyalty', '/cart', '/checkout', '/order-confirmation', '/account', '/account/login', '/account/register', '/account/orders',
  '/email-campaign', '/email-campaign-dashboard', '/emailcampaigndashboard',
  '/traffic-report', '/trafficreport', '/adminshopify', '/productsync', '/product-sync', '/keywordanalysis', '/searchqueryanalysis', '/search-query-analysis',
  '/dashboard', '/seo', '/localseo', '/local', '/customerportal', '/portal', '/loyaltyportal',
  '/torchcommandhome', '/cognitivequiz', '/flowtimer', '/protocolsdirectory', '/protocoldetail', '/admincommand', '/adminblogeditor',
  '/shipping-policy', '/return-policy', '/privacy-policy', '/terms-of-service',
  '/bundle', '/classic-coffee', '/mushroom-coffee', '/matcha', '/about', '/products', '/blog', '/blogs/news',
  '/research', '/compare', '/about/torch-republic-team', '/faq', '/shop/morning-ritual', '/shop/focus-coffee', '/shop/travel-coffee',
  '/coffee-pod-alternatives', '/coffee-without-a-machine', '/camping-coffee', '/healthy-coffee-alternatives', '/coffee-rituals', '/matcha-vs-coffee', '/papua-new-guinea-coffee',
  '/mushroom-coffee-benefits', '/lions-mane-coffee', '/instant-coffee-for-energy', '/why-mushroom-coffee',
  '/coffee-pods', '/pods', '/pod', '/patriotic-coffee', '/founders-series', '/founders',
  '/libertees', '/apparel', '/collectibles', '/patriotic', '/lincoln', '/washington', '/jefferson', '/reagan', '/historical', '/liberty', '/freedom',
  '/american-heroes', '/christ-is-king', '/god-family-country', '/faith-over-fear', '/we-the-people', '/freedom-isnt-free',
  '/t-shirts', '/hoodies', '/hats', '/mugs', '/stickers', '/flags', '/bobbleheads', '/jewelry', '/necklaces', '/bracelets', '/rings',
]);
const NOINDEX_PREFIXES = ['/admin', '/research', '/command', '/collections', '/pages'];
const SEARCH_PARAMS = ['q', 'query', 'search', 's'];

function isNoIndex(pathname, search) {
  if (pathname !== pathname.toLowerCase()) return true;
  const normalized = pathname.toLowerCase();
  if (NOINDEX_EXACT_PATHS.has(normalized)) return true;
  if (NOINDEX_PREFIXES.some((prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`))) return true;
  const params = new URLSearchParams(search || '');
  return SEARCH_PARAMS.some((param) => params.has(param));
}

function dynamicSeo(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'journal' && parts[1]) {
    const topic = ALL_BLOG_TOPICS.find((item) => item.slug === parts[1]);
    const title = topic?.title || cleanTitle(parts[1]);
    return [title, `Read Torch Republic’s guide to ${title.toLowerCase()} with practical context for coffee, matcha, ingredients, and daily rituals.`];
  }
  if (parts[0] === 'faq' && parts[1]) {
    const item = FAQ_PAGES.find((faq) => faq.slug === parts[1]);
    return [item?.metaTitle || cleanTitle(parts[1]), item?.metaDescription || `Get a clear Torch Republic answer about ${cleanTitle(parts[1]).toLowerCase()}, preparation, ingredients, and daily ritual use.`];
  }
  if (parts[0] === 'ingredients' && parts[1]) {
    const item = INGREDIENT_PAGES.find((ingredient) => ingredient.slug === parts[1]);
    return [item?.metaTitle || cleanTitle(parts[1]), item?.metaDescription || `Explore ${cleanTitle(parts[1])} with research context, ingredient details, benefits, and Torch Republic blend pairings.`];
  }
  if (parts[0] === 'compare' && parts[1]) {
    const item = COMPARISON_PAGES.find((comparison) => comparison.slug === parts[1]);
    return [item?.metaTitle || cleanTitle(parts[1]), item?.metaDescription || `Compare ${cleanTitle(parts[1]).toLowerCase()} by ingredients, price, preparation, flavor, and fit for your daily coffee ritual.`];
  }
  if (parts[0] === 'products' && parts[1]) {
    const name = cleanTitle(parts[1].replace(/instant|mushroom|coffee|blend/g, '').replace(/\s+/g, ' '));
    return [`${name} Product Page`, `Shop ${name} from Torch Republic with product details, ingredients, serving guidance, pricing, and options for your daily ritual.`];
  }
  return [cleanTitle(parts.join(' ') || 'Torch Republic'), `Explore Torch Republic’s ${cleanTitle(parts.join(' ')).toLowerCase()} page for coffee, mushroom coffee, matcha, ingredients, and daily ritual guidance.`];
}

export function getRouteSeo(pathname, search = '') {
  const exact = SEO_BY_PATH[pathname] || dynamicSeo(pathname);
  const noindex = isNoIndex(pathname, search);
  const canonicalPath = CANONICAL_OVERRIDES[pathname] || pathname;
  return {
    title: exact[0].includes('Torch Republic') ? exact[0] : `${exact[0]} | Torch Republic`,
    description: exact[1],
    canonicalPath: `${canonicalPath}${noindex ? '' : stripParams(search)}`,
    noindex,
  };
}