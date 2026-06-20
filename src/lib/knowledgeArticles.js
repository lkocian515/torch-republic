/**
 * Coffee Knowledge Center — Article Metadata
 * Used by the CoffeeKnowledgeCenter landing page to list all articles.
 * Full article content lives in each page file under pages/knowledge/.
 */

export const KNOWLEDGE_CATEGORIES = [
  {
    name: 'Coffee Origins',
    slug: 'coffee-origins',
    description: 'Explore the terroir, history, and flavor profiles of the world\'s finest coffee growing regions.',
    icon: '🌍',
  },
  {
    name: 'Mushroom Coffee Education',
    slug: 'mushroom-coffee-education',
    description: 'Understand what mushroom coffee is, how it compares to regular coffee, and what people report.',
    icon: '🍄',
  },
  {
    name: 'Instant Coffee Education',
    slug: 'instant-coffee-education',
    description: 'Learn about freeze-dried coffee, premium instant coffee, and why the format is evolving.',
    icon: '⚡',
  },
  {
    name: 'Travel Coffee',
    slug: 'travel-coffee',
    description: 'Guides for enjoying quality coffee on the go — flights, camping, road trips, and more.',
    icon: '✈️',
  },
  {
    name: 'Brewing Alternatives',
    slug: 'brewing-alternatives',
    description: 'No machine? No problem. Explore every way to make great coffee without a traditional brewer.',
    icon: '🔧',
  },
  {
    name: 'Coffee Comparisons',
    slug: 'coffee-comparisons',
    description: 'Side-by-side comparisons of coffee formats, brands, and brewing methods.',
    icon: '⚖️',
  },
];

export const KNOWLEDGE_ARTICLES = [
  // Coffee Origins
  {
    title: 'What Makes Papua New Guinea Coffee Different?',
    slug: 'what-makes-papua-new-guinea-coffee-different',
    category: 'Coffee Origins',
    excerpt: 'From volcanic highlands to your cup — discover why Papua New Guinea coffee is one of the most sought-after single-origin coffees in the world.',
    keywords: ['Papua New Guinea Coffee', 'Single-Origin Coffee', 'Specialty Coffee Origins', 'Volcanic Soil Coffee'],
    readTime: 9,
  },
  {
    title: 'The History of Papua New Guinea Coffee',
    slug: 'history-of-papua-new-guinea-coffee',
    category: 'Coffee Origins',
    excerpt: 'A timeline of how coffee went from colonial introduction to a globally recognized specialty origin in the highlands of Papua New Guinea.',
    keywords: ['History Of Papua New Guinea Coffee', 'Papua New Guinea Coffee Industry', 'Coffee Origins'],
    readTime: 8,
  },
  // Mushroom Coffee Education
  {
    title: 'Mushroom Coffee vs Regular Coffee: What Actually Changes?',
    slug: 'mushroom-coffee-vs-regular-coffee',
    category: 'Mushroom Coffee Education',
    excerpt: 'What is mushroom coffee, how does it taste, and why are people switching? A clear, honest comparison without the hype.',
    keywords: ['Mushroom Coffee vs Coffee', 'Mushroom Coffee Explained', 'Coffee Alternatives'],
    readTime: 8,
  },
  {
    title: 'How Much Caffeine Is In Mushroom Coffee?',
    slug: 'how-much-caffeine-in-mushroom-coffee',
    category: 'Mushroom Coffee Education',
    excerpt: 'A detailed caffeine comparison between mushroom coffee, regular coffee, matcha, decaf, and energy drinks — with a visual chart.',
    keywords: ['Mushroom Coffee Caffeine', 'Mushroom Coffee vs Coffee Caffeine', 'Coffee Caffeine Levels'],
    readTime: 7,
  },
  // Instant Coffee Education
  {
    title: 'Why Freeze-Dried Coffee Is Making a Comeback',
    slug: 'why-freeze-dried-coffee-making-comeback',
    category: 'Instant Coffee Education',
    excerpt: 'Once dismissed as inferior, freeze-dried coffee is now the fastest-growing premium coffee format. Here\'s why.',
    keywords: ['Freeze-Dried Coffee', 'Premium Instant Coffee', 'Specialty Instant Coffee', 'Freeze-Dried Coffee Benefits'],
    readTime: 8,
  },
  {
    title: 'Why Some Coffee Drinkers Are Ditching Pods',
    slug: 'why-coffee-drinkers-ditching-pods',
    category: 'Instant Coffee Education',
    excerpt: 'From waste to cost to flavor — why a growing number of coffee drinkers are switching from pods to premium instant coffee.',
    keywords: ['Coffee Pod Alternatives', 'Alternative To K-Cups', 'Coffee Without Pods'],
    readTime: 7,
  },
  // Travel Coffee
  {
    title: 'Best Coffee for Travel in 2026',
    slug: 'best-coffee-for-travel-2026',
    category: 'Travel Coffee',
    excerpt: 'The complete guide to great coffee on the go — airports, hotels, camping, RVs, cruises, road trips, and international travel.',
    keywords: ['Best Coffee for Travel', 'Travel Coffee', 'Vacation Coffee', 'Portable Coffee'],
    readTime: 9,
  },
  {
    title: 'Can You Take Mushroom Coffee on a Plane?',
    slug: 'can-you-take-mushroom-coffee-on-plane',
    category: 'Travel Coffee',
    excerpt: 'TSA rules, powder guidelines, carry-on tips, and international travel considerations for flying with mushroom coffee.',
    keywords: ['Mushroom Coffee Plane Travel', 'Travel With Mushroom Coffee', 'Airport Coffee Options'],
    readTime: 6,
  },
  // Brewing Alternatives
  {
    title: 'Best Coffee Without a Coffee Maker',
    slug: 'best-coffee-without-coffee-maker',
    category: 'Brewing Alternatives',
    excerpt: 'Six ways to make great coffee with no machine — instant, French press, pour over, AeroPress, cowboy coffee, and pods compared.',
    keywords: ['Coffee Without A Coffee Maker', 'No Coffee Machine Needed', 'Easy Coffee Methods'],
    readTime: 8,
  },
  // Coffee Comparisons
  {
    title: 'Coffee Pods vs Instant Coffee: Which Is Better?',
    slug: 'coffee-pods-vs-instant-coffee',
    category: 'Coffee Comparisons',
    excerpt: 'Cost, convenience, waste, flavor, and travel — the definitive comparison between coffee pods and premium instant coffee.',
    keywords: ['Coffee Pods vs Instant Coffee', 'Pod Coffee Alternative', 'Best Coffee Without A Machine', 'Convenient Coffee Options'],
    readTime: 8,
  },
];

// Helper: get articles by category
export const getArticlesByCategory = (categoryName) =>
  KNOWLEDGE_ARTICLES.filter(a => a.category === categoryName);

// Helper: get related articles (same category, excluding current)
export const getRelatedArticles = (slug, category, limit = 3) =>
  KNOWLEDGE_ARTICLES.filter(a => a.category === category && a.slug !== slug).slice(0, limit);