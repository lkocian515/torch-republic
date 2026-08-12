/**
 * TORCH REPUBLIC — SEO CONTENT DATA LAYER
 * Single source of truth for all blog topics, FAQ pages, ingredient pages,
 * comparison pages, and topic cluster organization.
 * 
 * Used by: JournalHub, FAQ pages, Ingredient pages, Comparison pages,
 *          GEO optimization, sitemaps, and internal linking logic.
 */

// ─── TOPIC CLUSTERS ─────────────────────────────────────────────────────────

export const TOPIC_CLUSTERS = {
  'mushroom-coffee': {
    label: 'Mushroom Coffee',
    color: '#6CBD5A',
    pillarUrl: '/shop/instant-mushroom-coffee',
    products: [
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'SunCap Rise', path: '/products/suncap-rise' },
      { name: 'MoonCap Restore', path: '/products/mooncap-restore' },
      { name: 'Shop All Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    ],
  },
  'instant-coffee': {
    label: 'Instant Coffee',
    color: '#C4A35A',
    pillarUrl: '/shop/instant-coffee',
    products: [
      { name: 'Torchbearer', path: '/products/torchbearer' },
      { name: 'Ember Reserve', path: '/products/ember-reserve' },
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
    ],
  },
  'matcha': {
    label: 'Ceremonial Matcha',
    color: '#10B981',
    pillarUrl: '/shop/matcha',
    products: [
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
      { name: 'The Alchemist Matcha', path: '/products/the-alchemist-matcha-blend' },
      { name: 'Shop All Matcha', path: '/shop/matcha' },
    ],
  },
  'wellness-rituals': {
    label: 'Wellness Rituals',
    color: '#E6B7AD',
    pillarUrl: '/how-it-works',
    products: [
      { name: 'Build Your Ritual Bundle', path: '/build-your-ritual' },
      { name: 'Take the Blend Quiz', path: '/quiz' },
      { name: 'Subscribe & Save 20%', path: '/subscription' },
    ],
  },
  'focus-productivity': {
    label: 'Focus & Productivity',
    color: '#B88FA8',
    pillarUrl: '/why-mushroom-coffee',
    products: [
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
      { name: 'Ingredients Page', path: '/ingredients' },
    ],
  },
  'ingredients': {
    label: 'Ingredients & Science',
    color: '#7BA5D4',
    pillarUrl: '/ingredients',
    products: [
      { name: 'Mushroom Coffee Collection', path: '/shop/instant-mushroom-coffee' },
      { name: 'Ingredients Page', path: '/ingredients' },
      { name: 'Ingredients Page', path: '/ingredients' },
    ],
  },
  'morning-routines': {
    label: 'Morning Routines',
    color: '#D4A576',
    pillarUrl: '/how-it-works',
    products: [
      { name: 'SunCap Rise', path: '/products/suncap-rise' },
      { name: 'Torchbearer', path: '/products/torchbearer' },
      { name: 'Build Your Ritual', path: '/build-your-ritual' },
    ],
  },
  'recipes': {
    label: 'Recipes',
    color: '#C98F86',
    pillarUrl: '/recipes',
    products: [
      { name: 'All Recipes', path: '/recipes' },
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
    ],
  },
};

// ─── 100 BLOG TOPICS ────────────────────────────────────────────────────────

export const ALL_BLOG_TOPICS = [
  // ── MUSHROOM COFFEE (20) ──
  { slug: 'mushroom-coffee-vs-regular-coffee', title: 'Mushroom Coffee vs. Regular Coffee: An Honest Comparison', cluster: 'mushroom-coffee', exists: true },
  { slug: 'what-does-mushroom-coffee-taste-like', title: 'What Does Mushroom Coffee Actually Taste Like?', cluster: 'mushroom-coffee', exists: false },
  { slug: 'does-mushroom-coffee-make-you-less-jittery', title: 'Does Mushroom Coffee Make You Less Jittery?', cluster: 'mushroom-coffee', exists: false },
  { slug: 'lions-mane-mushroom-coffee', title: "Lion's Mane Mushroom Coffee: Benefits, Taste & How It Works", cluster: 'mushroom-coffee', exists: true },
  { slug: 'chaga-mushroom-coffee', title: 'Chaga Mushroom Coffee: What Is It and Why Drink It?', cluster: 'mushroom-coffee', exists: true },
  { slug: 'history-of-mushroom-coffee', title: 'The History of Mushroom Coffee: From Finland to Your Cup', cluster: 'mushroom-coffee', exists: true },
  { slug: 'mushroom-coffee-benefits', title: 'Mushroom Coffee Benefits: What the Research Actually Says', cluster: 'mushroom-coffee', exists: true },
  { slug: 'science-of-lions-mane', title: "Lion’s Mane: Tradition, Research and Modern Coffee Blends", cluster: 'mushroom-coffee', exists: true },
  { slug: 'chaga-mushroom-antioxidant-king', title: 'Understanding Chaga in Functional Coffee', cluster: 'mushroom-coffee', exists: true },
  { slug: 'how-to-make-mushroom-coffee', title: 'How to Make Mushroom Coffee: Instant vs. Brewed Methods', cluster: 'mushroom-coffee', exists: false },
  { slug: 'mushroom-coffee-side-effects', title: 'Mushroom Coffee Side Effects: What to Know Before You Drink', cluster: 'mushroom-coffee', exists: false },
  { slug: 'best-mushroom-coffee-for-focus', title: 'Best Mushroom Coffee for Focus in 2025', cluster: 'mushroom-coffee', exists: false },
  { slug: 'lions-mane-vs-chaga-coffee', title: "Lion's Mane vs. Chaga Coffee: Which Mushroom Is Right for You?", cluster: 'mushroom-coffee', exists: false },
  { slug: 'mushroom-coffee-keto-friendly', title: 'Is Mushroom Coffee Keto-Friendly? Carbs, Ingredients & More', cluster: 'mushroom-coffee', exists: false },
  { slug: 'mushroom-coffee-for-anxiety', title: 'Mushroom Coffee and Anxiety: A Balanced Look at the Evidence', cluster: 'mushroom-coffee', exists: false },
  { slug: 'cordyceps-mushroom-coffee', title: 'Cordyceps Mushroom Coffee: Energy, Endurance & Research', cluster: 'mushroom-coffee', exists: false },
  { slug: 'reishi-mushroom-coffee', title: 'Reishi Mushroom Coffee: Calm Energy and Stress Support', cluster: 'mushroom-coffee', exists: false },
  { slug: 'mushroom-coffee-pregnancy-safe', title: 'Is Mushroom Coffee Safe During Pregnancy?', cluster: 'mushroom-coffee', exists: false },
  { slug: 'instant-mushroom-coffee-guide', title: 'The Complete Guide to Instant Mushroom Coffee', cluster: 'mushroom-coffee', exists: false },
  { slug: 'mushroom-coffee-beginner-guide', title: 'Mushroom Coffee for Beginners: Everything You Need to Know', cluster: 'mushroom-coffee', exists: false },

  // ── INSTANT COFFEE (15) ──
  { slug: 'best-instant-coffee', title: 'Best Instant Coffee: How to Choose Quality in a Jar or Tube', cluster: 'instant-coffee', exists: true },
  { slug: 'coffee-pods-plastic-waste-microplastics', title: 'Coffee Pods, Plastic Waste, and Microplastics: What the Research Actually Says', cluster: 'instant-coffee', exists: true, featured: true },
  { slug: 'what-makes-premium-instant-coffee-different', title: 'What Makes Premium Instant Coffee Different from Regular?', cluster: 'instant-coffee', exists: true },
  { slug: 'freeze-dried-vs-spray-dried-coffee', title: 'Freeze-Dried vs. Spray-Dried Instant Coffee: What\'s the Difference?', cluster: 'instant-coffee', exists: false },
  { slug: 'instant-coffee-hot-vs-iced', title: 'Instant Coffee Hot vs. Iced: The Best Ways to Brew Both', cluster: 'instant-coffee', exists: false },
  { slug: 'instant-coffee-caffeine-guide', title: 'How Much Caffeine Is in Instant Coffee? A Complete Guide', cluster: 'instant-coffee', exists: false },
  { slug: 'no-machine-coffee-guide', title: 'The Best No-Machine Coffee Options in 2025', cluster: 'instant-coffee', exists: false },
  { slug: 'instant-coffee-vs-k-cups', title: 'Instant Coffee vs. K-Cups: Cost, Waste, and Quality Compared', cluster: 'instant-coffee', exists: false },
  { slug: 'arabica-vs-robusta-instant', title: 'Arabica vs. Robusta Instant Coffee: Flavor & Quality Differences', cluster: 'instant-coffee', exists: false },
  { slug: 'instant-coffee-for-camping', title: 'Best Instant Coffee for Camping, Travel & On the Go', cluster: 'instant-coffee', exists: false },
  { slug: 'cold-brew-vs-instant-coffee', title: 'Cold Brew vs. Instant Coffee: Taste, Caffeine & Convenience', cluster: 'instant-coffee', exists: false },
  { slug: 'instant-coffee-recipes', title: '10 Easy Instant Coffee Recipes Worth Making at Home', cluster: 'instant-coffee', exists: false },
  { slug: 'best-instant-coffee-for-latte', title: 'Best Instant Coffee for Homemade Lattes and Cappuccinos', cluster: 'instant-coffee', exists: false },
  { slug: 'instant-coffee-vs-espresso', title: 'Instant Coffee vs. Espresso: Taste, Cost & Convenience', cluster: 'instant-coffee', exists: false },
  { slug: 'is-instant-coffee-real-coffee', title: 'Is Instant Coffee Real Coffee? The Truth About How It\'s Made', cluster: 'instant-coffee', exists: false },
  { slug: 'single-serve-coffee-alternatives', title: 'Pod-Free Single-Serve Coffee: The Best Alternatives to K-Cups', cluster: 'instant-coffee', exists: false },

  // ── MATCHA (15) ──
  { slug: 'instant-ceremonial-matcha', title: 'Instant Ceremonial Matcha: What It Is and How to Choose It', cluster: 'matcha', exists: true },
  { slug: 'matcha-benefits', title: 'A Practical Guide to Ceremonial Matcha', cluster: 'matcha', exists: true },
  { slug: 'history-of-matcha', title: 'The History of Matcha: From Tang Dynasty to Modern Wellness', cluster: 'matcha', exists: true },
  { slug: 'ceremonial-matcha-vs-culinary', title: 'Ceremonial Matcha vs. Culinary Grade: What\'s the Difference?', cluster: 'matcha', exists: true },
  { slug: 'matcha-vs-coffee', title: 'Matcha vs. Coffee: Caffeine, Focus, Taste & Energy Compared', cluster: 'matcha', exists: false },
  { slug: 'matcha-latte-recipe', title: 'How to Make a Matcha Latte: Easy Hot and Iced Recipes', cluster: 'matcha', exists: false },
  { slug: 'matcha-caffeine-guide', title: 'How Much Caffeine Is in Matcha? Complete Comparison Guide', cluster: 'matcha', exists: false },
  { slug: 'l-theanine-and-caffeine', title: 'L-Theanine and Caffeine: Why This Combination Works', cluster: 'matcha', exists: false },
  { slug: 'best-matcha-for-beginners', title: 'Best Matcha Powder for Beginners: A Simple Buyer\'s Guide', cluster: 'matcha', exists: false },
  { slug: 'matcha-for-anxiety', title: 'Matcha for Anxiety: L-Theanine Research and What to Expect', cluster: 'matcha', exists: false },
  { slug: 'matcha-weight-loss', title: 'Matcha and Weight Loss: What the Research Actually Shows', cluster: 'matcha', exists: false },
  { slug: 'matcha-vs-green-tea', title: 'Matcha vs. Green Tea: Key Differences Explained', cluster: 'matcha', exists: false },
  { slug: 'instant-matcha-latte-guide', title: 'The Complete Guide to Making Instant Matcha Lattes at Home', cluster: 'matcha', exists: false },
  { slug: 'matcha-morning-routine', title: 'Why Matcha Makes a Better Morning Ritual Than Coffee', cluster: 'matcha', exists: false },
  { slug: 'japanese-matcha-ceremony-guide', title: 'The Japanese Matcha Tea Ceremony: Traditions and Modern Rituals', cluster: 'matcha', exists: false },

  // ── WELLNESS RITUALS (15) ──
  { slug: 'morning-ritual-for-focus', title: 'Morning Ritual for Focus: A Structured Routine That Works', cluster: 'wellness-rituals', exists: true },
  { slug: 'adaptogens-guide', title: 'Adaptogens Guide: What They Are, What They Do, What They\'re Not', cluster: 'wellness-rituals', exists: true },
  { slug: 'coffee-and-focus', title: 'Coffee, Attention and the Morning Ritual', cluster: 'wellness-rituals', exists: true },
  { slug: 'building-better-morning-habits', title: 'Building Better Morning Habits: A Science-Backed Framework', cluster: 'wellness-rituals', exists: false },
  { slug: 'coffee-ritual-for-productivity', title: 'How to Turn Your Morning Coffee Into a Productivity Ritual', cluster: 'wellness-rituals', exists: false },
  { slug: 'wellness-drinks-for-focus', title: 'Best Wellness Drinks for Focus: Coffee, Matcha & Mushroom Coffee', cluster: 'wellness-rituals', exists: false },
  { slug: 'morning-routine-no-phone', title: 'The No-Phone Morning Routine: Intentional Starts and Better Focus', cluster: 'wellness-rituals', exists: false },
  { slug: 'caffeine-timing-guide', title: 'The Best Time to Drink Coffee for Maximum Focus', cluster: 'wellness-rituals', exists: false },
  { slug: 'deep-work-coffee-ritual', title: 'The Deep Work Coffee Ritual: How to Set Up Your Focus Sessions', cluster: 'wellness-rituals', exists: false },
  { slug: 'sleep-and-coffee-timing', title: 'Coffee and Sleep: How Caffeine Affects Your Rest', cluster: 'wellness-rituals', exists: false },
  { slug: 'afternoon-slump-fix', title: 'How to Beat the Afternoon Slump Without a Crash', cluster: 'wellness-rituals', exists: false },
  { slug: 'digital-detox-morning', title: 'Digital Detox Mornings: Coffee, Stillness & Intentional Time', cluster: 'wellness-rituals', exists: false },
  { slug: 'journaling-and-coffee', title: 'Journaling with Coffee: Creating a Mindful Morning Practice', cluster: 'wellness-rituals', exists: false },
  { slug: 'hydration-and-coffee', title: 'Hydration and Coffee: How Much Water Should You Drink?', cluster: 'wellness-rituals', exists: false },
  { slug: 'plant-based-morning-routine', title: 'Plant-Based Morning Routine: Coffee, Mushrooms & Adaptogens', cluster: 'wellness-rituals', exists: false },

  // ── FOCUS & PRODUCTIVITY (15) ──
  { slug: 'nootropic-coffee-guide', title: 'Nootropic Coffee: What It Is and Whether It Actually Works', cluster: 'focus-productivity', exists: false },
  { slug: 'focus-supplements-vs-coffee', title: 'Focus Supplements vs. Functional Coffee: A Practical Comparison', cluster: 'focus-productivity', exists: false },
  { slug: 'lions-mane-for-studying', title: "Lion's Mane for Studying: Research on Cognitive Function", cluster: 'focus-productivity', exists: false },
  { slug: 'best-drink-for-focus', title: 'Best Drinks for Focus and Mental Clarity in 2025', cluster: 'focus-productivity', exists: false },
  { slug: 'caffeine-productivity-guide', title: 'Caffeine and Productivity: Finding Your Optimal Dose', cluster: 'focus-productivity', exists: false },
  { slug: 'brain-fog-causes-fixes', title: 'Brain Fog Causes and Fixes: Lifestyle, Diet & Coffee Rituals', cluster: 'focus-productivity', exists: false },
  { slug: 'remote-work-coffee-ritual', title: 'The Remote Worker\'s Coffee Ritual for Better Focus at Home', cluster: 'focus-productivity', exists: false },
  { slug: 'student-study-drinks', title: 'Best Drinks for Studying: Mushroom Coffee, Matcha & More', cluster: 'focus-productivity', exists: false },
  { slug: 'entrepreneur-morning-routine', title: 'The Entrepreneur\'s Morning Routine: Coffee, Focus & Clarity', cluster: 'focus-productivity', exists: false },
  { slug: 'creativity-and-caffeine', title: 'Caffeine and Creativity: How Coffee Affects Creative Thinking', cluster: 'focus-productivity', exists: false },
  { slug: 'work-from-home-routine', title: 'Work From Home Morning Routine: Structure, Coffee & Focus', cluster: 'focus-productivity', exists: false },
  { slug: 'flow-state-guide', title: 'How to Enter Flow State: Environment, Caffeine & Ritual', cluster: 'focus-productivity', exists: false },
  { slug: 'mindful-work-breaks', title: 'Mindful Work Breaks: When and How to Rest for Better Focus', cluster: 'focus-productivity', exists: false },
  { slug: 'best-coffee-for-work', title: 'Best Coffee for Work: Smooth, Sustained Energy Without Crashes', cluster: 'focus-productivity', exists: false },
  { slug: 'pre-workout-mushroom-coffee', title: 'Mushroom Coffee as a Pre-Workout: What the Research Shows', cluster: 'focus-productivity', exists: false },

  // ── MORNING ROUTINES (10) ──
  { slug: 'morning-ritual-guide', title: 'MorningRitual Guide: Building a Ritual That Sticks', cluster: 'morning-routines', exists: true },
  { slug: 'best-morning-drinks', title: 'Best Morning Drinks for Energy: Coffee, Matcha & More', cluster: 'morning-routines', exists: false },
  { slug: '5am-morning-routine', title: 'The 5AM Morning Routine: Coffee, Clarity & Intention', cluster: 'morning-routines', exists: false },
  { slug: 'morning-routine-for-entrepreneurs', title: 'Morning Routine for Entrepreneurs: What Actually Works', cluster: 'morning-routines', exists: false },
  { slug: 'slow-morning-ritual', title: 'The Slow Morning Ritual: Taking Time Before the World Starts', cluster: 'morning-routines', exists: false },
  { slug: 'morning-coffee-vs-breakfast', title: 'Should You Drink Coffee Before or After Breakfast?', cluster: 'morning-routines', exists: false },
  { slug: 'wake-up-ritual-science', title: 'The Science of Waking Up: Cortisol, Light & Your Morning Coffee', cluster: 'morning-routines', exists: false },
  { slug: 'stoic-morning-routine', title: 'The Stoic Morning Routine: Philosophy, Coffee & Intentional Living', cluster: 'morning-routines', exists: false },
  { slug: 'morning-hydration-guide', title: 'Hydration Before Coffee: Why and How Much Water to Drink', cluster: 'morning-routines', exists: false },
  { slug: 'coffee-meditation-morning', title: 'Meditating with Your Morning Coffee: A Simple Daily Practice', cluster: 'morning-routines', exists: false },

  // ── INGREDIENTS (10) ──
  { slug: 'lions-mane-complete-guide', title: "Lion's Mane Mushroom: A Complete Ingredient Guide", cluster: 'ingredients', exists: false },
  { slug: 'chaga-mushroom-guide', title: 'Chaga Mushroom: Benefits, Research & How to Use It', cluster: 'ingredients', exists: false },
  { slug: 'cordyceps-guide', title: 'Cordyceps Mushroom: Energy, Endurance & Research Overview', cluster: 'ingredients', exists: false },
  { slug: 'reishi-guide', title: 'Reishi Mushroom: The Relaxation Adaptogen Guide', cluster: 'ingredients', exists: false },
  { slug: 'turkey-tail-guide', title: 'Turkey Tail Mushroom: Immunity Research and Benefits', cluster: 'ingredients', exists: false },
  { slug: 'l-theanine-guide', title: 'L-Theanine: The Focus Amino Acid in Matcha Explained', cluster: 'ingredients', exists: false },
  { slug: 'arabica-coffee-guide', title: 'Arabica Coffee: Why Bean Quality Matters in Instant Coffee', cluster: 'ingredients', exists: false },
  { slug: 'beta-glucans-guide', title: 'Beta-Glucans in Mushrooms: What They Are and Why They Matter', cluster: 'ingredients', exists: false },
  { slug: 'egcg-matcha-guide', title: 'EGCG in Matcha: The Antioxidant That Sets Matcha Apart', cluster: 'ingredients', exists: false },
  { slug: 'freeze-drying-process', title: 'How Freeze-Drying Works: Preserving Coffee Flavor and Quality', cluster: 'ingredients', exists: false },

  // ── RECIPES (6) ──
  { slug: 'classic-morning-recipe', title: 'The Classic Morning: A 2-Minute Mushroom Coffee Ritual', cluster: 'recipes', exists: true },
  { slug: 'creamy-focus-latte-recipe', title: 'Creamy Focus Latte: Café-Worthy Mushroom Coffee at Home', cluster: 'recipes', exists: true },
  { slug: 'iced-energy-boost-recipe', title: 'Iced Energy Boost: A Refreshing Cold Mushroom Coffee', cluster: 'recipes', exists: true },
  { slug: 'protein-power-blend-recipe', title: 'Protein Power Blend: Mushroom Coffee as Morning Fuel', cluster: 'recipes', exists: true },
  { slug: 'golden-mushroom-milk-recipe', title: 'Golden Mushroom Milk: Anti-Inflammatory Turmeric Latte', cluster: 'recipes', exists: true },
  { slug: 'morning-smoothie-boost-recipe', title: 'Morning Smoothie Boost: Hide Your Mushroom Coffee in a Smoothie', cluster: 'recipes', exists: true },
];

// ─── INGREDIENT PAGES ────────────────────────────────────────────────────────

export const INGREDIENT_PAGES = [
  {
    slug: 'lions-mane',
    name: "Lion's Mane",
    scientificName: 'Hericium erinaceus',
    category: 'Functional Mushroom',
    color: '#E6B7AD',
    tagline: 'The cognitive mushroom — traditionally paired with focus rituals.',
    description: "Lion's Mane (Hericium erinaceus) is a white, globe-shaped mushroom used in traditional East Asian medicine for centuries. Modern research has focused on its bioactive compounds — hericenones and erinacines — which may stimulate Nerve Growth Factor (NGF) production. It appears in Torch Republic's GlowMind Clarity, SunCap Rise, and MoonCap Restore — all three mushroom coffee blends.",
    benefits: [
      { title: 'Nerve Growth Factor Support', detail: "Contains hericenones and erinacines that may stimulate NGF production — critical for neuron maintenance and neuroplasticity." },
      { title: 'Cognitive Function Research', detail: "Several human trials show modest improvements in mild cognitive impairment. More research is needed for healthy adults." },
      { title: 'Focus & Clarity', detail: "Traditionally chosen by practitioners who want sustained mental clarity without stimulants." },
      { title: 'Neuroprotective Properties', detail: "Animal studies suggest antioxidant properties that may support brain health over time." },
    ],
    activeCompounds: ["Hericenones", "Erinacines", "Beta-glucans", "Polysaccharides"],
    researchSummary: "The most studied functional mushroom for cognitive outcomes. Key trials include Mori et al. (2009) and Saitsu et al. (2019). Results are promising but most human studies have small sample sizes.",
    products: [
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'SunCap Rise', path: '/products/suncap-rise' },
      { name: 'MoonCap Restore', path: '/products/mooncap-restore' },
      { name: 'Shop All Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    ],
    relatedSlugs: ['science-of-lions-mane', 'lions-mane-mushroom-coffee', 'mushroom-coffee-benefits', 'best-mushroom-coffee-for-focus'],
    metaTitle: "Lion's Mane Mushroom: Ingredient Guide & Research | Torch Republic",
    metaDescription: "Everything about Lion's Mane mushroom — hericenones, erinacines, NGF research, and how it works in Torch Republic's instant mushroom coffee blends.",
  },
  {
    slug: 'chaga',
    name: 'Chaga',
    scientificName: 'Inonotus obliquus',
    category: 'Functional Mushroom',
    color: '#C4A35A',
    tagline: 'The antioxidant mushroom — traditionally used for resilience and balance.',
    description: "Chaga (Inonotus obliquus) grows on birch trees in cold climates and has been used in Russian and Eastern European folk medicine for centuries. It has one of the highest ORAC (antioxidant) scores of any natural food. Torch Republic uses Chaga extract in all three mushroom coffee blends for its antioxidant richness.",
    benefits: [
      { title: 'Antioxidant Richness', detail: "Among the highest ORAC values of any food, driven by melanin complexes, phenols, and beta-glucans." },
      { title: 'Immune Balance Support', detail: "Beta-glucans in Chaga may help modulate immune activity. Used in traditional wellness for resilience." },
      { title: 'Anti-Inflammatory Properties', detail: "Animal studies show reduced inflammatory markers. Human clinical data is still limited." },
      { title: 'Adaptogenic Properties', detail: "Traditionally used as an adaptogen to help the body maintain balance under physical and mental stress." },
    ],
    activeCompounds: ["Beta-glucans", "Melanin", "Betulinic acid", "Polyphenols", "Triterpenoids"],
    researchSummary: "Well-documented for antioxidant content. Most human research focuses on immune modulation. Fewer cognitive studies than Lion's Mane. More controlled trials needed.",
    products: [
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'MoonCap Restore', path: '/products/mooncap-restore' },
      { name: 'Shop All Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    ],
    relatedSlugs: ['chaga-mushroom-coffee', 'chaga-mushroom-antioxidant-king', 'mushroom-coffee-benefits', 'adaptogens-guide'],
    metaTitle: 'Chaga Mushroom: Ingredient Guide & Antioxidant Research | Torch Republic',
    metaDescription: "Chaga mushroom deep dive — beta-glucans, antioxidants, adaptogenic properties, and how it's used in Torch Republic's functional mushroom coffee blends.",
  },
  {
    slug: 'cordyceps',
    name: 'Cordyceps',
    scientificName: 'Cordyceps militaris',
    category: 'Functional Mushroom',
    color: '#D4A576',
    tagline: 'The energy mushroom — traditionally used for stamina and endurance.',
    description: "Cordyceps is a genus of fungi with a long history in Tibetan and Chinese medicine, traditionally used by high-altitude herders for stamina. Modern research focuses on its potential to support ATP production, oxygen utilization, and endurance performance. Torch Republic uses Cordyceps extract in select blends.",
    benefits: [
      { title: 'Energy & Stamina', detail: "May support ATP synthesis and oxygen uptake, leading to better physical endurance in some research." },
      { title: 'Exercise Performance', detail: "Several studies show improved VO2 max and time-to-exhaustion in trained and untrained adults." },
      { title: 'Respiratory Support', detail: "Traditionally used for high-altitude performance. May support lung capacity over time." },
      { title: 'Adaptogenic Stress Buffer', detail: "Used in traditional medicine to help the body adapt to physical and environmental stress." },
    ],
    activeCompounds: ["Cordycepin", "Adenosine", "Beta-glucans", "Polysaccharides"],
    researchSummary: "Best human evidence for exercise performance improvement. Chen et al. (2010) and Hirsch et al. (2017) show modest but real VO2 max improvements.",
    products: [
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'Build Your Ritual', path: '/build-your-ritual' },
    ],
    relatedSlugs: ['adaptogens-guide', 'mushroom-coffee-benefits', 'pre-workout-mushroom-coffee', 'best-mushroom-coffee-for-focus'],
    metaTitle: 'Cordyceps Mushroom: Ingredient Guide & Energy Research | Torch Republic',
    metaDescription: 'Cordyceps deep dive — cordycepin, ATP production, endurance research, and how it supports energy in functional mushroom coffee blends.',
  },
  {
    slug: 'reishi',
    name: 'Reishi',
    scientificName: 'Ganoderma lucidum',
    category: 'Functional Mushroom',
    color: '#B88FA8',
    tagline: 'The calm mushroom — traditionally used for evening restoration and stress balance.',
    description: "Reishi (Ganoderma lucidum) is one of the oldest-used mushrooms in traditional Chinese medicine, valued for thousands of years as a longevity tonic. Modern research focuses on immune modulation, stress response, and sleep quality. Torch Republic uses Reishi extract in its evening-ritual mushroom coffee blend, MoonCap Restore.",
    benefits: [
      { title: 'Stress Adaptation', detail: "Triterpenes in Reishi may reduce cortisol response and support the body's stress-adaptation pathways." },
      { title: 'Sleep Quality', detail: "Some research suggests improved sleep quality and duration with consistent Reishi use over 4–8 weeks." },
      { title: 'Immune Modulation', detail: "One of the most well-researched mushrooms for immune function. Beta-glucans activate macrophage and NK cell activity." },
      { title: 'Antioxidant Protection', detail: "Rich in polysaccharides and triterpenes with documented antioxidant activity." },
    ],
    activeCompounds: ["Triterpenes", "Beta-glucans", "Polysaccharides", "Ganoderic acids"],
    researchSummary: "Strongest evidence for immune support and stress modulation. Smaller but credible evidence base for sleep quality. Long safety record in traditional use.",
    products: [
      { name: 'MoonCap Restore', path: '/products/mooncap-restore' },
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    ],
    relatedSlugs: ['adaptogens-guide', 'mushroom-coffee-benefits', 'reishi-guide', 'sleep-and-coffee-timing'],
    metaTitle: 'Reishi Mushroom: Ingredient Guide & Sleep Research | Torch Republic',
    metaDescription: 'Reishi mushroom deep dive — triterpenes, immune modulation, sleep research, and how it powers Torch Republic evening mushroom coffee blends.',
  },
  {
    slug: 'l-theanine',
    name: 'L-Theanine',
    scientificName: 'γ-Glutamylethylamide',
    category: 'Amino Acid',
    color: '#10B981',
    tagline: 'The calm-focus amino acid found naturally in matcha green tea.',
    description: "L-Theanine is a naturally occurring amino acid found almost exclusively in green tea leaves (Camellia sinensis). It is responsible for the calming, focused energy state that distinguishes matcha from coffee. Unlike caffeine alone, L-theanine is traditionally associated with calm-focus tea rituals and has been studied for relaxed alertness in some research contexts.",
    benefits: [
      { title: 'Calm Ritual Appeal', detail: "L-Theanine is naturally found in matcha and is traditionally associated with calm, mindful tea rituals." },
      { title: 'Caffeine Synergy', detail: "When combined with caffeine (as naturally occurs in matcha), L-theanine sharpens focus while reducing caffeine jitter and anxiety." },
      { title: 'Stress Reduction', detail: "Clinical evidence for reduced salivary cortisol and perceived stress in multiple double-blind trials." },
      { title: 'Working Memory', detail: "Combined L-theanine + caffeine shows improved working memory and attention in several well-designed RCTs." },
    ],
    activeCompounds: ["L-Theanine", "GABA precursor activity", "Glutamate modulation"],
    researchSummary: "One of the most well-studied functional compounds. Over 30 human trials across cognitive performance, anxiety, and sleep. Combination with caffeine is strongly supported.",
    products: [
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
      { name: 'The Alchemist Matcha', path: '/products/the-alchemist-matcha-blend' },
      { name: 'Shop All Matcha', path: '/shop/matcha' },
    ],
    relatedSlugs: ['matcha-benefits', 'l-theanine-and-caffeine', 'matcha-for-anxiety', 'ceremonial-matcha-vs-culinary'],
    metaTitle: 'L-Theanine: Ingredient Guide & Focus Research | Torch Republic',
    metaDescription: 'L-Theanine deep dive — naturally occurring matcha compounds, caffeine pairing, research context, and why ceremonial matcha feels different for some drinkers.',
  },
  {
    slug: 'arabica-coffee',
    name: 'Arabica Coffee',
    scientificName: 'Coffea arabica',
    category: 'Coffee',
    color: '#C98F86',
    tagline: 'The gold standard coffee bean — smoother, less bitter, higher quality.',
    description: "Coffea arabica is the world's premium coffee species, accounting for ~60% of global coffee production. It grows at high altitudes (600–2000m) and has lower caffeine content but significantly more complex flavor compounds than Robusta. Torch Republic uses 100% freeze-dried Arabica instant coffee as the base for all classic and mushroom coffee blends.",
    benefits: [
      { title: 'Superior Flavor Complexity', detail: "Arabica contains over 800 aromatic compounds vs ~300 in Robusta, producing the smooth, nuanced flavor profile." },
      { title: 'Lower Bitterness', detail: "Contains less chlorogenic acid than Robusta, meaning less bitterness and a cleaner finish in the cup." },
      { title: 'Consistent Caffeine Level', detail: "~60-80mg per serving for predictable, manageable energy — less than Robusta's aggressive caffeine punch." },
      { title: 'Freeze-Dried Flavor Retention', detail: "Torch Republic's freeze-drying process preserves Arabica's delicate aromatics better than spray-drying." },
    ],
    activeCompounds: ["Caffeine", "Chlorogenic acids", "Diterpenes (cafestol, kahweol)", "Trigonelline"],
    researchSummary: "Arabica's flavor superiority is well-documented in sensory science. The freeze-drying process better preserves aromatic volatile compounds versus spray-drying.",
    products: [
      { name: 'Torchbearer', path: '/products/torchbearer' },
      { name: 'Ember Reserve', path: '/products/ember-reserve' },
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
    ],
    relatedSlugs: ['what-makes-premium-instant-coffee-different', 'freeze-dried-vs-spray-dried-coffee', 'best-instant-coffee', 'arabica-vs-robusta-instant'],
    metaTitle: '100% Arabica Instant Coffee: Why Bean Quality Matters | Torch Republic',
    metaDescription: "Arabica coffee deep dive — flavor compounds, freeze-drying vs spray-drying, and why Torch Republic uses 100% Arabica for all instant coffee blends.",
  },
];

// ─── COMPARISON PAGES ─────────────────────────────────────────────────────────

export const COMPARISON_PAGES = [
  {
    slug: 'torch-republic-vs-four-sigmatic',
    title: 'Torch Republic vs. Four Sigmatic: Honest Mushroom Coffee Comparison',
    competitor: 'Four Sigmatic',
    metaTitle: 'Torch Republic vs. Four Sigmatic Mushroom Coffee: Full Comparison',
    metaDescription: 'Torch Republic vs. Four Sigmatic side-by-side — ingredients, price per serving, taste, mushroom dose, and blend variety. An honest comparison.',
    winner: null,
    categories: ['Price per serving', 'Mushroom variety', 'Blend options', 'Instant format', 'Servings per package'],
    summary: "Both brands make functional mushroom coffee with instant powder format. Key differences come down to price per serving, number of blend options, and specific mushroom ingredient focus.",
    ourEdge: ["A broader coffee, mushroom coffee, and matcha ritual collection", "Lower price per serving", "Dedicated ritual-matching (quiz + bundle builder)", "Transparent ingredient sourcing"],
    theirEdge: ["Longer market presence", "Wider retail distribution", "More third-party certifications"],
    cluster: 'mushroom-coffee',
  },
  {
    slug: 'mushroom-coffee-vs-regular-coffee-comparison',
    title: 'Mushroom Coffee vs. Regular Coffee: Complete Comparison Guide',
    competitor: 'Regular Coffee',
    metaTitle: 'Mushroom Coffee vs. Regular Coffee: Caffeine, Taste & Benefits Compared',
    metaDescription: 'Mushroom coffee vs regular coffee — caffeine content, taste differences, functional benefits, price comparison, and which is better for your daily ritual.',
    winner: null,
    categories: ['Caffeine content', 'Functional ingredients', 'Price per cup', 'Taste', 'Preparation'],
    summary: "Mushroom coffee is coffee — it just has functional mushroom extracts added. The choice depends on whether functional wellness ingredients are important to your daily ritual.",
    ourEdge: ["Functional mushroom extracts (Lion's Mane, Chaga)", "Lower jitter potential", "Added antioxidants from mushrooms", "Wellness ritual framework"],
    theirEdge: ["Familiar taste profile", "Lower cost", "More universally available", "Simpler ingredient list"],
    cluster: 'mushroom-coffee',
  },
  {
    slug: 'instant-coffee-vs-pods-comparison',
    title: 'Instant Coffee vs. Coffee Pods: Which Is Better in 2025?',
    competitor: 'Coffee Pods (K-Cups)',
    metaTitle: 'Instant Coffee vs. Coffee Pods (K-Cups): Cost, Waste & Quality',
    metaDescription: 'Instant coffee vs. K-Cups and coffee pods — cost per cup, environmental waste, flavor quality, convenience, and which is the smarter daily choice.',
    winner: 'instant',
    categories: ['Cost per cup', 'Environmental impact', 'Portability', 'Flavor quality', 'Machine required'],
    summary: "Premium instant coffee beats pods on almost every metric — lower cost, zero plastic waste, no machine needed, and more portable. Pod convenience is overstated for most users.",
    ourEdge: ["No machine required", "Zero pod waste", "Lower cost per serving", "Portable anywhere", "100% Arabica quality"],
    theirEdge: ["Marginally faster prep", "Consistent results for non-coffee drinkers", "Available in every grocery store"],
    cluster: 'instant-coffee',
  },
  {
    slug: 'matcha-vs-coffee-detailed',
    title: 'Matcha vs. Coffee: Energy, Caffeine, Taste & Focus Compared',
    competitor: 'Coffee',
    metaTitle: 'Matcha vs. Coffee: Complete 2025 Comparison (Caffeine, Focus, Taste)',
    metaDescription: 'Matcha vs. coffee — caffeine levels, L-theanine, energy duration, taste, antioxidants, and which is better for your morning ritual. An honest comparison.',
    winner: null,
    categories: ['Caffeine content', 'Energy duration', 'Focus quality', 'Taste profile', 'Antioxidants'],
    summary: "Coffee and matcha serve different ritual needs. Coffee provides higher, faster energy. Matcha provides calmer, more sustained focus. Neither is objectively better — it depends on your ritual.",
    ourEdge: ["Naturally occurring L-theanine", "Traditionally associated with mindful tea rituals", "Distinct ceremonial flavor profile", "May feel different from traditional coffee for some drinkers"],
    theirEdge: ["Higher caffeine for bigger energy kick", "More familiar taste", "Widely available", "Lower cost"],
    cluster: 'matcha',
  },
  {
    slug: 'ceremonial-vs-culinary-matcha',
    title: 'Ceremonial Grade vs. Culinary Grade Matcha: The Real Difference',
    competitor: 'Culinary Matcha',
    metaTitle: 'Ceremonial Matcha vs. Culinary Grade: Which Should You Buy?',
    metaDescription: "Ceremonial vs. culinary matcha — processing differences, taste quality, L-theanine levels, color, and when each grade makes sense to buy.",
    winner: 'ceremonial',
    categories: ['Taste quality', 'L-theanine content', 'Color vibrancy', 'Price', 'Intended use'],
    summary: "For drinking as a tea or latte, ceremonial grade is clearly better — smoother flavor, higher L-theanine, brighter color. Culinary is only appropriate for baking or masking with strong flavors.",
    ourEdge: ["Smoother, sweeter flavor", "Higher L-theanine and antioxidant density", "Better color and visual appeal", "Meant for drinking"],
    theirEdge: ["Lower price", "Better for baking"],
    cluster: 'matcha',
  },
  {
    slug: 'ryze-vs-torch-republic',
    title: 'Ryze Mushroom Coffee vs. Torch Republic: Full Comparison',
    competitor: 'Ryze Mushroom Coffee',
    metaTitle: 'Ryze vs. Torch Republic Mushroom Coffee: Which Is Better?',
    metaDescription: 'Ryze vs. Torch Republic mushroom coffee — ingredients, price per serving, blend variety, taste, and which brand is right for your daily ritual.',
    winner: null,
    categories: ['Price per serving', 'Blend variety', 'Mushroom diversity', 'Caffeine options', 'Servings per package'],
    summary: "Both Ryze and Torch Republic make instant mushroom coffee. Key differences: Torch Republic offers more blend options and dedicated ritual-matching tools. Ryze has established brand recognition and wider distribution. The right choice depends on whether you want one core blend or a customized multi-blend ritual.",
    ourEdge: ["A growing collection of classic instant coffee, functional mushroom blends, and ceremonial matcha", "Dedicated blend quiz for personalized matching", "Custom bundle builder (any 3 for $49.99)", "Classic coffee + mushroom + matcha all in one brand", "Ritual-first philosophy"],
    theirEdge: ["Widely recognized brand name", "Broader retail availability", "Well-established repeat customer base"],
    cluster: 'mushroom-coffee',
  },
  {
    slug: 'mushroom-coffee-vs-energy-drinks',
    title: 'Mushroom Coffee vs. Energy Drinks: Which Is Better for Focus?',
    competitor: 'Energy Drinks',
    metaTitle: 'Mushroom Coffee vs. Energy Drinks: Ingredients, Crash & Focus Quality',
    metaDescription: 'Mushroom coffee vs. energy drinks — ingredients, caffeine crash, sugar content, functional benefits, and which is better for sustainable daily energy.',
    winner: 'mushroom-coffee',
    categories: ['Sugar content', 'Caffeine crash', 'Functional ingredients', 'Cost per serving', 'Clean label'],
    summary: "Mushroom coffee can be a smoother, coffee-forward alternative to sugary energy drinks for people building an intentional daily routine.",
    ourEdge: ["Zero sugar", "Coffee ritual format", "Functional mushroom ingredients", "Simple preparation", "Clean ingredient label"],
    theirEdge: ["Higher caffeine dose", "More widely available", "Multiple flavors"],
    cluster: 'mushroom-coffee',
  },
];

// ─── 50 FAQ PAGES ────────────────────────────────────────────────────────────

export const FAQ_PAGES = [
  // ── MUSHROOM COFFEE FAQs ──
  {
    slug: 'what-is-mushroom-coffee',
    question: 'What Is Mushroom Coffee?',
    cluster: 'mushroom-coffee',
    metaTitle: 'What Is Mushroom Coffee? | Complete Answer | Torch Republic',
    metaDescription: "What is mushroom coffee? Full explanation of ingredients, taste, benefits, and how Torch Republic's instant mushroom coffee works.",
    answer: "Mushroom coffee is a blend of premium instant coffee and functional mushroom extracts — typically Lion's Mane, Chaga, Cordyceps, or Reishi. It tastes like coffee, not mushrooms. The mushroom extracts are dried and concentrated, then blended with the coffee powder. You prepare it exactly like instant coffee — just add hot water and stir.",
    relatedFaqs: ['does-mushroom-coffee-taste-like-mushrooms', 'is-mushroom-coffee-safe', 'how-much-caffeine-mushroom-coffee'],
    products: [
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
    ],
  },
  {
    slug: 'does-mushroom-coffee-taste-like-mushrooms',
    question: 'Does Mushroom Coffee Taste Like Mushrooms?',
    cluster: 'mushroom-coffee',
    metaTitle: 'Does Mushroom Coffee Taste Like Mushrooms? | Torch Republic',
    metaDescription: 'Does mushroom coffee taste like mushrooms? Find out what it actually tastes like, which flavors you notice, and why the coffee flavor dominates.',
    answer: "No. Mushroom coffee tastes primarily like coffee. The mushroom extracts are concentrated and used in small amounts — their flavor contribution is a subtle earthiness and mild umami that rounds out the coffee's natural flavor. Most people who try it say it tastes like a slightly earthier, smoother cup of coffee.",
    relatedFaqs: ['what-is-mushroom-coffee', 'how-to-make-mushroom-coffee', 'best-mushroom-blend-for-beginners'],
    products: [
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
      { name: 'Take the Blend Quiz', path: '/quiz' },
    ],
  },
  {
    slug: 'how-much-caffeine-mushroom-coffee',
    question: 'How Much Caffeine Is in Mushroom Coffee?',
    cluster: 'mushroom-coffee',
    metaTitle: 'How Much Caffeine Is in Mushroom Coffee? | Torch Republic FAQ',
    metaDescription: 'How much caffeine does mushroom coffee have? Exact amounts per serving, comparison to regular coffee, and how mushroom ingredients affect caffeine levels.',
    answer: "Torch Republic mushroom coffee contains approximately 60-80mg of caffeine per serving — similar to a moderate cup of regular coffee. Mushroom extracts don't add caffeine; they're blended with the coffee base. This is lower than most energy drinks and espresso drinks but in the normal range for a daily coffee ritual.",
    relatedFaqs: ['what-is-mushroom-coffee', 'mushroom-coffee-vs-regular-coffee-faq', 'is-mushroom-coffee-safe'],
    products: [
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    ],
  },
  {
    slug: 'is-mushroom-coffee-safe',
    question: 'Is Mushroom Coffee Safe?',
    cluster: 'mushroom-coffee',
    metaTitle: 'Is Mushroom Coffee Safe? | Side Effects & Research | Torch Republic',
    metaDescription: "Is mushroom coffee safe to drink daily? Ingredient safety overview, known side effects, who should avoid it, and what the research says.",
    answer: "Mushroom coffee is generally considered safe for healthy adults when consumed in normal serving amounts. The mushroom extracts used — Lion's Mane, Chaga, Cordyceps — have long histories of use in traditional medicine and growing safety data from modern research. People with mushroom allergies, those on blood-thinning medications, or pregnant/nursing individuals should consult a doctor before use. As with all dietary supplements, individual responses vary.",
    relatedFaqs: ['mushroom-coffee-pregnancy-faq', 'mushroom-coffee-side-effects-faq', 'how-much-caffeine-mushroom-coffee'],
    products: [
      { name: 'Ingredients Page', path: '/ingredients' },
      { name: 'Ingredients Page', path: '/ingredients' },
    ],
  },
  {
    slug: 'how-to-make-mushroom-coffee',
    question: 'How Do You Make Mushroom Coffee?',
    cluster: 'mushroom-coffee',
    metaTitle: 'How to Make Mushroom Coffee | Instant Prep Guide | Torch Republic',
    metaDescription: 'How to make mushroom coffee — step-by-step instant preparation, hot and iced variations, milk and creamer options, and serving tips.',
    answer: "Torch Republic mushroom coffee is instant — just add hot water. Steps: 1) Add one serving (roughly one packet or measured scoop) to your cup. 2) Pour 8-10 oz of hot water (just below boiling, about 85-90°C). 3) Stir thoroughly for 20-30 seconds until fully dissolved. 4) Add milk, creamer, or sweetener as desired. For iced: dissolve in 2 oz of hot water first, then pour over ice and top with cold milk.",
    relatedFaqs: ['what-is-mushroom-coffee', 'does-mushroom-coffee-taste-like-mushrooms', 'best-milk-for-mushroom-coffee'],
    products: [
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
      { name: 'How It Works', path: '/how-it-works' },
    ],
  },
  {
    slug: 'mushroom-coffee-vs-regular-coffee-faq',
    question: 'What Is the Difference Between Mushroom Coffee and Regular Coffee?',
    cluster: 'mushroom-coffee',
    metaTitle: 'Mushroom Coffee vs. Regular Coffee: Key Differences | Torch Republic',
    metaDescription: 'Mushroom coffee vs. regular coffee — ingredient differences, caffeine levels, taste comparison, functional benefits, and which is right for your ritual.',
    answer: "The primary difference is functional mushroom extracts. Mushroom coffee starts with a premium instant coffee base (real coffee) and adds concentrated mushroom extract powder — Lion's Mane, Chaga, Cordyceps, or Reishi depending on the blend. Regular instant coffee has no added functional ingredients. Both taste like coffee, but mushroom coffee has a slightly earthier profile and the potential for mushroom-specific functional benefits.",
    relatedFaqs: ['what-is-mushroom-coffee', 'how-much-caffeine-mushroom-coffee', 'does-mushroom-coffee-taste-like-mushrooms'],
    products: [
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
    ],
  },
  {
    slug: 'best-mushroom-blend-for-beginners',
    question: 'What Is the Best Mushroom Coffee Blend for Beginners?',
    cluster: 'mushroom-coffee',
    metaTitle: 'Best Mushroom Coffee for Beginners | Starter Guide | Torch Republic',
    metaDescription: "Best mushroom coffee blend for beginners — which Torch Republic blend to start with, what to expect, and how to build your mushroom coffee ritual.",
    answer: "For beginners, we recommend SunCap Rise or GlowMind Clarity as your first mushroom coffee. SunCap Rise is blended for morning energy — it has the most approachable coffee-forward flavor and familiar morning energy feel. GlowMind Clarity is the most popular, designed for focus-oriented mornings. Start with one tube, drink it daily for 2 weeks to let the functional ingredients build up in your system, then decide if you want to try other blends.",
    relatedFaqs: ['what-is-mushroom-coffee', 'does-mushroom-coffee-taste-like-mushrooms', 'how-to-make-mushroom-coffee'],
    products: [
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'SunCap Rise', path: '/products/suncap-rise' },
      { name: 'Take the Blend Quiz', path: '/quiz' },
    ],
  },
  {
    slug: 'can-you-drink-mushroom-coffee-every-day',
    question: 'Can You Drink Mushroom Coffee Every Day?',
    cluster: 'mushroom-coffee',
    metaTitle: 'Can You Drink Mushroom Coffee Every Day? | Torch Republic FAQ',
    metaDescription: "Is it safe to drink mushroom coffee daily? Research on daily use, recommended frequency, and how to build a consistent mushroom coffee ritual.",
    answer: "Yes — mushroom coffee is designed for daily ritual use. The functional mushroom extracts (Lion's Mane, Chaga, Cordyceps) are most beneficial when consumed consistently over time rather than occasionally. Traditional users in Japan, China, and Russia used these mushrooms daily for years without notable adverse effects. For best results, drink your mushroom coffee at the same time each day to establish a consistent routine.",
    relatedFaqs: ['is-mushroom-coffee-safe', 'how-much-caffeine-mushroom-coffee', 'best-mushroom-blend-for-beginners'],
    products: [
      { name: 'Subscribe & Save 20%', path: '/subscription' },
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    ],
  },
  {
    slug: 'lions-mane-benefits-faq',
    question: "What Are the Benefits of Lion's Mane Mushroom?",
    cluster: 'mushroom-coffee',
    metaTitle: "Lion's Mane Mushroom Benefits | Research FAQ | Torch Republic",
    metaDescription: "Lion's Mane mushroom benefits explained — NGF stimulation, cognitive function research, focus support, and honest limitations of current science.",
    answer: "Lion's Mane (Hericium erinaceus) contains unique compounds called hericenones and erinacines that may stimulate Nerve Growth Factor (NGF) production. NGF is essential for the growth and maintenance of neurons. Human research suggests modest improvements in mild cognitive impairment and memory in older adults. For healthy adults, evidence is less established but promising. It is not a drug and cannot treat disease — it is a functional food ingredient.",
    relatedFaqs: ['what-is-mushroom-coffee', 'chaga-benefits-faq', 'is-mushroom-coffee-safe'],
    products: [
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'Ingredient Guide: Lion\'s Mane', path: '/ingredients/lions-mane' },
    ],
  },
  {
    slug: 'chaga-benefits-faq',
    question: 'What Are the Benefits of Chaga Mushroom?',
    cluster: 'mushroom-coffee',
    metaTitle: 'Chaga Mushroom Benefits | Research FAQ | Torch Republic',
    metaDescription: "Chaga mushroom benefits explained — antioxidant content, beta-glucans, immune support research, and what the science actually shows.",
    answer: "Chaga is one of the most antioxidant-rich foods measured on the ORAC scale, driven by its melanin complexes, phenols, and beta-glucans. Research suggests immune-modulating properties — Chaga beta-glucans may activate macrophages and NK cells. It also has documented anti-inflammatory properties in animal models. Human clinical evidence for cognitive or energy effects is limited, but its antioxidant profile is well-established.",
    relatedFaqs: ['lions-mane-benefits-faq', 'what-is-mushroom-coffee', 'adaptogens-explained-faq'],
    products: [
      { name: 'Ingredient Guide: Chaga', path: '/ingredients/chaga' },
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    ],
  },

  // ── INSTANT COFFEE FAQs ──
  {
    slug: 'what-is-instant-coffee',
    question: 'What Is Instant Coffee and How Is It Made?',
    cluster: 'instant-coffee',
    metaTitle: 'What Is Instant Coffee? How It\'s Made | Torch Republic FAQ',
    metaDescription: 'What is instant coffee? How it\'s made — freeze-drying vs. spray-drying, Arabica vs. Robusta, quality differences, and why premium instant coffee tastes different.',
    answer: "Instant coffee is made by brewing real coffee to full concentration, then removing the water through freeze-drying or spray-drying to create soluble powder. When you add hot water, the coffee dissolves instantly. Premium instant coffee uses freeze-drying, which preserves delicate aromatic compounds better than spray-drying. Torch Republic uses 100% Arabica freeze-dried instant coffee for smooth, rich flavor without bitterness.",
    relatedFaqs: ['is-instant-coffee-real-coffee-faq', 'freeze-dried-vs-spray-dried-faq', 'how-much-caffeine-instant-coffee'],
    products: [
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
      { name: 'Torchbearer', path: '/products/torchbearer' },
    ],
  },
  {
    slug: 'is-instant-coffee-real-coffee-faq',
    question: 'Is Instant Coffee Real Coffee?',
    cluster: 'instant-coffee',
    metaTitle: 'Is Instant Coffee Real Coffee? | Torch Republic FAQ',
    metaDescription: 'Is instant coffee made from real coffee beans? The truth about how premium instant coffee is made and why quality matters.',
    answer: "Yes. Premium instant coffee like Torch Republic starts with 100% Arabica coffee beans — the same quality beans used by specialty coffee roasters. The beans are roasted, brewed to concentration, then freeze-dried to create soluble powder. The process is different from traditional brewing, but the raw material is real, high-quality coffee. The quality difference between generic and premium instant coffee is real and noticeable in taste.",
    relatedFaqs: ['what-is-instant-coffee', 'freeze-dried-vs-spray-dried-faq', 'arabica-vs-robusta-faq'],
    products: [
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
      { name: 'What Makes Premium Instant Coffee Different', path: '/journal/what-makes-premium-instant-coffee-different' },
    ],
  },
  {
    slug: 'freeze-dried-vs-spray-dried-faq',
    question: 'What Is the Difference Between Freeze-Dried and Spray-Dried Instant Coffee?',
    cluster: 'instant-coffee',
    metaTitle: 'Freeze-Dried vs. Spray-Dried Instant Coffee | Quality FAQ | Torch Republic',
    metaDescription: 'Freeze-dried vs. spray-dried instant coffee — process differences, flavor preservation, quality outcomes, and which method produces better coffee.',
    answer: "Freeze-drying (lyophilization) removes water by freezing the brewed coffee concentrate and then converting ice directly to vapor in a vacuum — preserving volatile aromatic compounds. Spray-drying uses high heat to evaporate water quickly, which destroys more of the delicate flavor molecules. Freeze-dried instant coffee tastes significantly better and retains more of the original roast character. It's also more expensive to produce, which is why premium brands use it.",
    relatedFaqs: ['what-is-instant-coffee', 'is-instant-coffee-real-coffee-faq', 'arabica-vs-robusta-faq'],
    products: [
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
      { name: 'Ingredient Guide: Arabica', path: '/ingredients/arabica-coffee' },
    ],
  },
  {
    slug: 'how-much-caffeine-instant-coffee',
    question: 'How Much Caffeine Is in Instant Coffee?',
    cluster: 'instant-coffee',
    metaTitle: 'How Much Caffeine Is in Instant Coffee? | Torch Republic FAQ',
    metaDescription: 'Exact caffeine content in instant coffee per serving — comparison to regular coffee, espresso, and energy drinks. How to manage your daily caffeine intake.',
    answer: "A typical serving of premium instant coffee contains 60-80mg of caffeine — similar to a standard 8oz cup of brewed coffee. Espresso has ~63mg per shot. Energy drinks often contain 80-300mg. Instant coffee's caffeine level is reliably in the moderate range, making it a good option for people who want consistent, manageable daily caffeine without the variability of cold brew or espresso drinks.",
    relatedFaqs: ['what-is-instant-coffee', 'can-i-drink-coffee-in-afternoon', 'instant-coffee-before-workout'],
    products: [
      { name: 'Torchbearer', path: '/products/torchbearer' },
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
    ],
  },
  {
    slug: 'instant-coffee-vs-pods-faq',
    question: 'Is Instant Coffee Better Than Coffee Pods?',
    cluster: 'instant-coffee',
    metaTitle: 'Instant Coffee vs. Coffee Pods: Which Is Better? | Torch Republic',
    metaDescription: 'Instant coffee vs. K-Cups and coffee pods — cost, environmental impact, quality, convenience, and the honest verdict on which is better.',
    answer: "For most daily coffee drinkers, premium instant coffee is better than pods on almost every dimension: lower cost per cup ($0.50-0.90 vs. $0.50-1.50+), zero plastic waste, no machine required, fully portable, and with premium freeze-dried Arabica quality that rivals most pod machines. The only advantage pods have is slightly more variety in branded flavors and minimal prep time savings — but instant coffee takes under 60 seconds to prepare.",
    relatedFaqs: ['what-is-instant-coffee', 'how-much-caffeine-instant-coffee', 'no-machine-coffee-options-faq'],
    products: [
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
      { name: 'Build Your Ritual', path: '/build-your-ritual' },
    ],
  },

  // ── MATCHA FAQs ──
  {
    slug: 'what-is-ceremonial-matcha',
    question: 'What Is Ceremonial Grade Matcha?',
    cluster: 'matcha',
    metaTitle: 'What Is Ceremonial Grade Matcha? | Torch Republic FAQ',
    metaDescription: 'What is ceremonial grade matcha? How it differs from culinary matcha, why grade matters, L-theanine content, and how to choose the right matcha.',
    answer: "Ceremonial grade matcha is the highest quality matcha powder, made from young tea leaves (tencha) shade-grown to concentrate chlorophyll and L-theanine. It is stone-ground to preserve delicate flavor compounds. Ceremonial matcha has a smooth, naturally sweet flavor with umami depth — suitable for drinking as tea or in lattes without milk. Culinary grade is made from older leaves with a more bitter, astringent flavor — suitable for baking but not ideal for drinking.",
    relatedFaqs: ['ceremonial-vs-culinary-matcha-faq', 'how-much-caffeine-matcha', 'matcha-vs-coffee-faq'],
    products: [
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
      { name: 'Shop All Matcha', path: '/shop/matcha' },
    ],
  },
  {
    slug: 'ceremonial-vs-culinary-matcha-faq',
    question: 'What Is the Difference Between Ceremonial and Culinary Matcha?',
    cluster: 'matcha',
    metaTitle: 'Ceremonial Matcha vs. Culinary Matcha: Key Differences | Torch Republic',
    metaDescription: "Ceremonial vs culinary matcha — harvest differences, taste quality, L-theanine content, color, and which grade is right for drinking vs. baking.",
    answer: "Ceremonial matcha uses the youngest spring harvest tea leaves, shade-grown for 3-4 weeks to boost chlorophyll and L-theanine. It's smooth, sweet, and vivid green. Culinary matcha uses mature leaves from multiple harvests — it's more bitter, duller green, and contains less L-theanine. For lattes, morning rituals, and any application where you're drinking the matcha, ceremonial grade is worth the premium. Culinary is only practical for baking where stronger flavors mask bitterness.",
    relatedFaqs: ['what-is-ceremonial-matcha', 'how-much-caffeine-matcha', 'does-matcha-have-health-benefits'],
    products: [
      { name: 'Shop Matcha', path: '/shop/matcha' },
      { name: 'The Alchemist Matcha', path: '/products/the-alchemist-matcha-blend' },
    ],
  },
  {
    slug: 'how-much-caffeine-matcha',
    question: 'How Much Caffeine Is in Matcha?',
    cluster: 'matcha',
    metaTitle: 'How Much Caffeine Is in Matcha? | Comparison Guide | Torch Republic',
    metaDescription: 'Exact caffeine content in matcha vs. coffee vs. green tea. Why matcha caffeine feels different, L-theanine synergy, and energy duration.',
    answer: "A standard serving of ceremonial matcha contains approximately 25-70mg of caffeine, depending on serving size and grade. This is less than a cup of brewed coffee (80-120mg) but more than green tea (25-40mg). The key difference is L-theanine — matcha contains 5x more L-theanine than green tea, which modulates caffeine's stimulant effect to create calmer, more focused alertness without the jitter or crash typical of coffee.",
    relatedFaqs: ['what-is-ceremonial-matcha', 'matcha-vs-coffee-faq', 'does-matcha-have-health-benefits'],
    products: [
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
      { name: 'Shop All Matcha', path: '/shop/matcha' },
    ],
  },
  {
    slug: 'matcha-vs-coffee-faq',
    question: 'Should I Drink Matcha or Coffee in the Morning?',
    cluster: 'matcha',
    metaTitle: 'Matcha or Coffee in the Morning? Which Is Better? | Torch Republic',
    metaDescription: 'Matcha vs. coffee for morning energy — caffeine comparison, energy quality, crash risk, focus benefits, and how to choose what\'s right for you.',
    answer: "Coffee gives you faster, stronger energy but more jitter risk and sharper crash potential. Matcha gives you calmer, more sustained focus energy via L-theanine, but less total caffeine kick. For early-morning physical energy and work requiring fast activation, coffee often wins. For sustained creative work, focus sessions, or if you're caffeine-sensitive, matcha's L-theanine synergy makes it superior. Many people alternate: coffee for high-output mornings, matcha for focused creative work.",
    relatedFaqs: ['what-is-ceremonial-matcha', 'how-much-caffeine-matcha', 'does-matcha-have-health-benefits'],
    products: [
      { name: 'Shop Matcha', path: '/shop/matcha' },
      { name: 'Take the Blend Quiz', path: '/quiz' },
    ],
  },
  {
    slug: 'does-matcha-have-health-benefits',
    question: 'Does Matcha Have Health Benefits?',
    cluster: 'matcha',
    metaTitle: 'Does Matcha Have Health Benefits? | Research FAQ | Torch Republic',
    metaDescription: "Matcha health benefits — L-theanine for focus, EGCG antioxidants, research evidence, and honest limitations. What matcha can and can't do.",
    answer: "Matcha contains several well-researched bioactive compounds. L-theanine is strongly supported for calm focus and stress reduction. EGCG (epigallocatechin gallate) is one of the most studied antioxidants in green tea research, with evidence for metabolic support. Matcha also contains chlorophyll and vitamin K. Note: matcha is a food/beverage — it is not a medicine and cannot treat, cure, or prevent disease. The evidence for taste and focus benefits is real; more dramatic claims require more research.",
    relatedFaqs: ['what-is-ceremonial-matcha', 'how-much-caffeine-matcha', 'matcha-vs-coffee-faq'],
    products: [
      { name: 'Ingredients Page', path: '/ingredients' },
      { name: 'Ingredient Guide: L-Theanine', path: '/ingredients/l-theanine' },
    ],
  },

  // ── GENERAL / PRODUCT FAQs ──
  {
    slug: 'no-machine-coffee-options-faq',
    question: 'What Are the Best Coffee Options That Don\'t Need a Machine?',
    cluster: 'instant-coffee',
    metaTitle: 'Best Coffee Without a Machine | No-Maker Options | Torch Republic',
    metaDescription: 'Best coffee that needs no machine — premium instant coffee, pour-over, French press comparison, and why instant is the best no-machine daily option.',
    answer: "No-machine coffee options include: 1) Premium instant coffee (best for daily ritual — just add hot water), 2) Pour-over (manual, requires kettle + filter + grinder), 3) French press (requires grinder, patience, cleanup), 4) AeroPress (portable, no electric machine, but requires equipment). For pure simplicity, premium instant coffee like Torch Republic wins — it delivers excellent flavor with literally zero equipment beyond a kettle.",
    relatedFaqs: ['what-is-instant-coffee', 'instant-coffee-vs-pods-faq', 'is-instant-coffee-real-coffee-faq'],
    products: [
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
      { name: 'Build Your Ritual', path: '/build-your-ritual' },
    ],
  },
  {
    slug: 'adaptogens-explained-faq',
    question: 'What Are Adaptogens?',
    cluster: 'mushroom-coffee',
    metaTitle: 'What Are Adaptogens? | Simple Explanation | Torch Republic',
    metaDescription: 'What are adaptogens? Simple explanation of how adaptogens work, which mushrooms are adaptogens, and what the science actually shows.',
    answer: "Adaptogens are plant or fungal compounds that — according to traditional use and emerging research — help the body respond to and recover from physical and mental stress. To qualify as an adaptogen, a compound must: 1) be non-toxic at normal doses, 2) produce a nonspecific resistance to stress, and 3) normalize physiological function regardless of the direction of stress. Functional mushrooms like Reishi, Chaga, and Cordyceps are classified as adaptogens. Lion's Mane doesn't fit the classic adaptogen definition — it's more accurately a nootropic mushroom.",
    relatedFaqs: ['what-is-mushroom-coffee', 'lions-mane-benefits-faq', 'chaga-benefits-faq'],
    products: [
      { name: 'Ingredients Page', path: '/ingredients' },
      { name: 'Shop Mushroom Coffee', path: '/shop/instant-mushroom-coffee' },
    ],
  },
  {
    slug: 'subscription-faq',
    question: 'How Does the Torch Republic Subscription Work?',
    cluster: 'wellness-rituals',
    metaTitle: 'How Does the Torch Republic Coffee Subscription Work? | FAQ',
    metaDescription: 'How the Torch Republic subscribe and save works — discount, delivery frequency, how to pause, skip, or cancel, and how to change your blend selection.',
    answer: "Torch Republic's subscribe and save gives you 20% off every delivery. You choose 1-6 tubes per delivery, set your frequency (monthly by default), and select which blends you want. You can change your blend selection, skip a month, pause, or cancel anytime directly from your account — no calls, no forms. Subscription orders also earn Torchbearers Rewards points on every delivery.",
    relatedFaqs: ['torchbearers-rewards-faq', 'can-you-drink-mushroom-coffee-every-day', 'best-mushroom-blend-for-beginners'],
    products: [
      { name: 'Subscribe & Save', path: '/subscription' },
      { name: 'Torchbearers Rewards', path: '/torchbearers-rewards' },
    ],
  },
  {
    slug: 'torchbearers-rewards-faq',
    question: 'What Is the Torchbearers Rewards Program?',
    cluster: 'wellness-rituals',
    metaTitle: 'Torchbearers Rewards Program FAQ | Torch Republic',
    metaDescription: "How Torch Republic's Torchbearers Rewards loyalty program works — earning points, redeeming discounts, and how subscriptions earn extra rewards.",
    answer: "Torchbearers Rewards is Torch Republic's loyalty program. You earn points for purchases (including subscription orders), reviews, referrals, and social shares. Points can be redeemed for discount codes on future orders. Subscription members earn points on every delivery automatically. There's no signup required — if you have an account, you're earning points.",
    relatedFaqs: ['subscription-faq', 'bundle-deal-faq', 'best-mushroom-blend-for-beginners'],
    products: [
      { name: 'Torchbearers Rewards', path: '/torchbearers-rewards' },
      { name: 'Subscribe & Save', path: '/subscription' },
    ],
  },
  {
    slug: 'bundle-deal-faq',
    question: 'How Does the Ritual Bundle Deal Work?',
    cluster: 'wellness-rituals',
    metaTitle: 'How Does the Torch Republic Bundle Deal Work? | FAQ',
    metaDescription: 'How the Torch Republic ritual bundle works — any 3 blends for $49.99, savings calculation, how to customize, and bundle checkout process.',
    answer: "The Build Your Ritual bundle lets you choose any 3 products from Torch Republic's full catalog (mushroom coffee, classic coffee, or matcha) for a flat $49.99 — regardless of which blends you select. Individual prices vary by selection, and the builder shows the final bundle value before checkout. Use the Bundle Builder to mix and match, then proceed directly to checkout.",
    relatedFaqs: ['subscription-faq', 'best-mushroom-blend-for-beginners', 'how-to-make-mushroom-coffee'],
    products: [
      { name: 'Build Your Ritual Bundle', path: '/build-your-ritual' },
      { name: 'Shop All', path: '/shop' },
    ],
  },
  {
    slug: 'mushroom-coffee-pregnancy-faq',
    question: 'Is Mushroom Coffee Safe During Pregnancy?',
    cluster: 'mushroom-coffee',
    metaTitle: 'Is Mushroom Coffee Safe During Pregnancy? | Torch Republic FAQ',
    metaDescription: "Is mushroom coffee safe while pregnant or breastfeeding? What the research shows, which ingredients to be cautious about, and when to consult a doctor.",
    answer: "We recommend consulting your doctor before consuming mushroom coffee during pregnancy or breastfeeding. While the functional mushroom extracts have long safety histories in traditional use, clinical data for pregnant women is limited. The caffeine content (~60-80mg per serving) is within generally accepted limits for pregnancy (under 200mg/day), but mushroom extract safety during pregnancy specifically hasn't been studied extensively. When in doubt, consult a healthcare provider.",
    relatedFaqs: ['is-mushroom-coffee-safe', 'how-much-caffeine-mushroom-coffee', 'can-you-drink-mushroom-coffee-every-day'],
    products: [
      { name: 'Ingredients Page', path: '/ingredients' },
      { name: 'Ingredients Page', path: '/ingredients' },
    ],
  },
  {
    slug: 'mushroom-coffee-side-effects-faq',
    question: 'Are There Side Effects to Mushroom Coffee?',
    cluster: 'mushroom-coffee',
    metaTitle: 'Mushroom Coffee Side Effects | What to Know | Torch Republic',
    metaDescription: 'Known side effects of mushroom coffee — digestive sensitivity, mushroom allergies, caffeine considerations, and who should consult a doctor before drinking.',
    answer: "Most people tolerate mushroom coffee without side effects. Potential reactions include: 1) Digestive sensitivity — some people experience mild GI discomfort when starting, especially with Chaga or Lion's Mane. Start with a half-serving to assess tolerance. 2) Mushroom allergies — rare but possible. If you have known mushroom allergies, consult a doctor. 3) Blood-thinning interaction — Chaga may affect blood coagulation. People on blood thinners should consult a doctor. 4) Caffeine effects — standard caffeine sensitivities apply.",
    relatedFaqs: ['is-mushroom-coffee-safe', 'mushroom-coffee-pregnancy-faq', 'how-much-caffeine-mushroom-coffee'],
    products: [
      { name: 'Ingredients Page', path: '/ingredients' },
      { name: 'Ingredients Page', path: '/ingredients' },
    ],
  },
  {
    slug: 'what-is-l-theanine-faq',
    question: 'What Is L-Theanine and Why Is It in Matcha?',
    cluster: 'matcha',
    metaTitle: 'What Is L-Theanine? How It Works in Matcha | Torch Republic',
    metaDescription: "What is L-theanine? How it creates calm focus, why it's uniquely concentrated in matcha, caffeine synergy research, and brain wave effects.",
    answer: "L-theanine is an amino acid found almost exclusively in green tea (Camellia sinensis) — and matcha has 5x more than regular green tea because the shade-growing process concentrates it. L-theanine is naturally found in tea and traditionally associated with mindful tea rituals. It has been studied alongside caffeine, but individual experiences can vary.",
    relatedFaqs: ['what-is-ceremonial-matcha', 'does-matcha-have-health-benefits', 'matcha-vs-coffee-faq'],
    products: [
      { name: 'Shop Matcha', path: '/shop/matcha' },
      { name: 'Ingredient Guide: L-Theanine', path: '/ingredients/l-theanine' },
    ],
  },
  {
    slug: 'can-i-drink-coffee-in-afternoon',
    question: 'Is It Okay to Drink Coffee in the Afternoon?',
    cluster: 'wellness-rituals',
    metaTitle: 'Can You Drink Coffee in the Afternoon? | Sleep Science FAQ',
    metaDescription: "Is afternoon coffee okay? Caffeine half-life explained, best time to stop drinking coffee, and how to minimize sleep disruption from afternoon caffeine.",
    answer: "Caffeine has a half-life of approximately 5-6 hours — meaning half the caffeine from a 3pm cup is still in your system at 9pm. For most people, cutting off caffeine by 2pm is a reasonable guideline. If you're sensitive to caffeine, noon is safer. Matcha is often better for afternoon energy than coffee due to lower caffeine content and L-theanine's calming effect. If you need afternoon energy, consider half-serving instant coffee or switching to matcha for the second-half of your day.",
    relatedFaqs: ['how-much-caffeine-instant-coffee', 'matcha-vs-coffee-faq', 'how-much-caffeine-matcha'],
    products: [
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
      { name: 'Shop Matcha', path: '/shop/matcha' },
    ],
  },
  {
    slug: 'instant-coffee-before-workout',
    question: 'Is Instant Coffee Good Before a Workout?',
    cluster: 'focus-productivity',
    metaTitle: 'Instant Coffee Before a Workout | Pre-Workout Caffeine FAQ | Torch Republic',
    metaDescription: "Is instant coffee a good pre-workout? Caffeine timing, dose, performance research, and why mushroom coffee may be better than energy drinks before exercise.",
    answer: "Yes — 60-80mg of caffeine 30-60 minutes before exercise is well-supported by sports science for improved endurance, strength, and focus. Premium instant coffee delivers this efficiently with zero sugar, no jittery pre-workout ingredients, and a clean energy source. Mushroom coffee also adds Cordyceps, which has its own research support for oxygen utilization and endurance. It's a clean, natural pre-workout alternative to sugary energy drinks or supplement-heavy pre-workouts.",
    relatedFaqs: ['how-much-caffeine-instant-coffee', 'how-much-caffeine-mushroom-coffee', 'best-mushroom-blend-for-beginners'],
    products: [
      { name: 'SunCap Rise', path: '/products/suncap-rise' },
      { name: 'Torchbearer', path: '/products/torchbearer' },
    ],
  },
  {
    slug: 'arabica-vs-robusta-faq',
    question: 'What Is the Difference Between Arabica and Robusta Coffee?',
    cluster: 'instant-coffee',
    metaTitle: 'Arabica vs. Robusta Coffee: Key Differences | Torch Republic FAQ',
    metaDescription: "Arabica vs. Robusta coffee — flavor differences, caffeine levels, quality considerations, and why Torch Republic uses 100% Arabica for all blends.",
    answer: "Arabica (Coffea arabica) and Robusta (Coffea canephora) are the two main coffee species. Arabica grows at high altitude, has more complex flavor (fruity, nuanced, sweet), lower caffeine (~1.2%), and more delicate aromatics. Robusta grows at lower altitude, has higher caffeine (~2.7%), more bitterness, rubbery flavor notes, and is used mostly in blends or cheap instant coffee. Torch Republic uses 100% Arabica for all blends — the result is noticeably smoother, richer coffee flavor.",
    relatedFaqs: ['what-is-instant-coffee', 'is-instant-coffee-real-coffee-faq', 'freeze-dried-vs-spray-dried-faq'],
    products: [
      { name: 'Shop Classic Coffee', path: '/shop/instant-coffee' },
      { name: 'Ingredient Guide: Arabica', path: '/ingredients/arabica-coffee' },
    ],
  },
  {
    slug: 'how-to-make-matcha-latte',
    question: 'How Do You Make a Matcha Latte at Home?',
    cluster: 'matcha',
    metaTitle: 'How to Make a Matcha Latte at Home | Easy Recipe FAQ | Torch Republic',
    metaDescription: 'How to make a matcha latte at home — hot and iced recipes, milk options, sweetener recommendations, and no-whisk instant matcha method.',
    answer: "Hot matcha latte: 1) Add 1 serving of ceremonial matcha powder to a cup. 2) Add 2 oz of hot water (not boiling — 75-80°C). 3) Stir vigorously or use a small whisk for 30 seconds until dissolved and slightly frothy. 4) Steam or heat 6-8 oz of your preferred milk (oat, almond, or whole milk work best). 5) Pour milk over matcha. Sweeten with honey or maple syrup to taste. Iced version: dissolve matcha in 2 oz hot water, let cool briefly, then pour over ice and add cold milk.",
    relatedFaqs: ['what-is-ceremonial-matcha', 'ceremonial-vs-culinary-matcha-faq', 'how-much-caffeine-matcha'],
    products: [
      { name: 'The Monk Matcha', path: '/products/the-monk-matcha-blend' },
      { name: 'Shop All Matcha', path: '/shop/matcha' },
    ],
  },
  {
    slug: 'whats-in-each-torch-republic-blend',
    question: "What's in Each Torch Republic Blend?",
    cluster: 'mushroom-coffee',
    metaTitle: "What's in Each Torch Republic Blend? | Ingredient Guide | FAQ",
    metaDescription: "Full ingredient overview for each Torch Republic coffee and matcha blend — mushroom extracts, coffee type, functional purpose, and which blend is right for you.",
    answer: "GlowMind Clarity: premium Arabica instant coffee + Lion's Mane + Chaga — for morning focus. SunCap Rise: premium Arabica instant coffee + Lion's Mane + Cordyceps — for morning energy and vitality. MoonCap Restore: premium Arabica instant coffee + Reishi + Chaga — for evening calm and recovery. Torchbearer/Ember Reserve: pure 100% Arabica classic coffee — no mushrooms.",
    relatedFaqs: ['what-is-mushroom-coffee', 'best-mushroom-blend-for-beginners', 'does-mushroom-coffee-taste-like-mushrooms'],
    products: [
      { name: 'GlowMind Clarity', path: '/products/glowmind-clarity-blend' },
      { name: 'Shop All Blends', path: '/shop' },
      { name: 'Take the Blend Quiz', path: '/quiz' },
    ],
  },
  {
    slug: 'shipping-faq',
    question: 'How Long Does Torch Republic Shipping Take?',
    cluster: 'wellness-rituals',
    metaTitle: 'Torch Republic Shipping Times & Policy | FAQ',
    metaDescription: "How long does Torch Republic shipping take? Order processing time, delivery estimates, tracking, and what to do if your order hasn't arrived.",
    answer: "Torch Republic processes orders within 1-3 business days. Domestic US shipping typically arrives in 3-7 business days after processing. Subscription orders are scheduled and processed on your chosen delivery date. You'll receive a tracking notification when your order ships. For specific shipping inquiries, contact hello@torchrepublic.com.",
    relatedFaqs: ['subscription-faq', 'bundle-deal-faq', 'torchbearers-rewards-faq'],
    products: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Shop Now', path: '/shop' },
    ],
  },
  {
    slug: 'return-policy-faq',
    question: 'What Is Torch Republic\'s Return Policy?',
    cluster: 'wellness-rituals',
    metaTitle: "Torch Republic Return Policy & Satisfaction Guarantee | FAQ",
    metaDescription: "Torch Republic's return policy — 30-day satisfaction guarantee, how to initiate a return, and what's covered for first-time purchases.",
    answer: "Torch Republic offers a 30-day satisfaction guarantee on first-time orders. If you're not satisfied with your purchase, contact hello@torchrepublic.com within 30 days. We'll work to make it right — whether that's an exchange, credit, or refund. Opened products are handled on a case-by-case basis. Subscription orders can be paused or canceled anytime before the next shipment processes.",
    relatedFaqs: ['subscription-faq', 'shipping-faq', 'bundle-deal-faq'],
    products: [
      { name: 'Contact Us', path: '/contact' },
    ],
  },
];

// ─── INGREDIENT LONG-FORM CONTENT ────────────────────────────────────────────
// Extended content for ingredient deep-dive pages (1500+ words)

export const INGREDIENT_LONG_FORM = {
  'lions-mane': {
    intro: "Lion's Mane (Hericium erinaceus) is one of the most visually distinctive fungi in the natural world — a cascading white mushroom that resembles a lion's mane or a globe of icicles. But its appearance is less remarkable than what's inside it. Lion's Mane is the only mushroom known to contain two families of compounds — hericenones and erinacines — that have been studied for their ability to stimulate Nerve Growth Factor (NGF) production in the brain.",
    sections: [
      {
        heading: "What Is Lion's Mane Mushroom?",
        body: "Hericium erinaceus is a medicinal mushroom native to North America, Europe, and Asia. It grows primarily on dead or dying hardwood trees, particularly American beech and maple. In East Asia, it has been used in traditional Chinese and Japanese medicine for centuries, referred to as 'yamabushitake' in Japan — named after the yamabushi mountain monks who wore straw capes that resembled the mushroom's structure.\n\nUnlike most functional mushrooms, Lion's Mane is also prized as a culinary ingredient — it has a seafood-like texture and mild flavor when cooked. In functional wellness contexts, however, it is used in concentrated extract form, not as a fresh or dried food ingredient."
      },
      {
        heading: "The Compounds That Matter: Hericenones and Erinacines",
        body: "Most functional mushrooms are valued for their beta-glucan content — polysaccharides that support immune function. Lion's Mane has beta-glucans too, but its most distinctive compounds are unique to this species.\n\nHericenones are found in the fruiting body (the visible mushroom). Erinacines are found in the mycelium (the root network). Both compound families have been shown in laboratory and animal studies to stimulate the synthesis of Nerve Growth Factor (NGF) — a protein that is critical for the growth, maintenance, and survival of neurons.\n\nNGF was discovered in the 1950s by Rita Levi-Montalcini, who won the Nobel Prize for the finding. It is essential for the development and ongoing maintenance of the peripheral and central nervous systems. The hericenones in Lion's Mane are small enough to cross the blood-brain barrier, which may allow them to stimulate NGF production directly in brain tissue."
      },
      {
        heading: "Human Research: What the Trials Show",
        body: "The most frequently cited human trial on Lion's Mane is Mori et al. (2009), published in Phytotherapy Research. Fifty adults aged 50-80 with mild cognitive impairment were randomly assigned to receive 750mg of H. erinaceus powder or placebo daily for 16 weeks. The Lion's Mane group showed significantly higher scores on cognitive function scales, with improvements that reversed four weeks after discontinuation — suggesting the effect was real and dependent on continued consumption.\n\nSaitsu et al. (2019), published in the same journal, examined 31 healthy older adults over 12 weeks. Those taking Lion's Mane showed improvements in mini-mental state examination (MMSE) scores compared to placebo.\n\nIt's important to be honest about the limitations: most human studies are small, use older populations with mild cognitive impairment, and study durations are short. The evidence for healthy younger adults is less established. Lion's Mane is not a drug, cannot treat cognitive disease, and should not be marketed as a cure for anything.\n\nFor daily ritual use in healthy adults, the evidence suggests modest but real cognitive and neuroprotective benefits with consistent consumption over time."
      },
      {
        heading: "How Torch Republic Uses Lion's Mane",
        body: "Torch Republic uses dual-extracted Lion's Mane extract in all three of its mushroom coffee blends. Dual extraction uses both hot water (for polysaccharides and beta-glucans) and alcohol (for hericenones and other fat-soluble compounds) to capture the full spectrum of bioactive compounds.\n\nThis matters because a simple hot water extract — the most common and cheapest form — only captures the water-soluble fraction. The hericenones that drive most of the cognitive research are not fully water-soluble. A quality extract needs alcohol extraction to capture them.\n\nThe ratio of Lion's Mane to coffee is carefully balanced so the functional ingredient is present at a meaningful amount without compromising the coffee-forward flavor profile. Our mushroom coffee tastes like premium coffee, not a supplement."
      },
      {
        heading: "Daily Use: Building a Consistent Lion's Mane Ritual",
        body: "Like most functional mushrooms, Lion's Mane is most beneficial with consistent daily use rather than occasional consumption. The cognitive benefits observed in research trials required 12-16 weeks of daily intake before measurable effects were noted.\n\nThis means integrating Lion's Mane into an existing daily ritual — like morning coffee — is the most practical and effective delivery method. If you have to think about whether to take it each day, adherence drops. If it's already in your coffee, you never have to decide.\n\nFor people starting a mushroom coffee ritual, we recommend beginning with a half-serving for the first week to assess tolerance, then moving to a full serving daily. Most people notice increased alertness and focus after 2-4 weeks, with more substantial effects appearing at the 6-8 week mark with consistent daily use."
      }
    ],
  },
  'chaga': {
    intro: "Chaga (Inonotus obliquus) is not technically a mushroom — it is a parasitic fungal growth that develops primarily on birch trees in cold northern climates. It looks like a dark, cracked piece of charcoal on the outside and has a rich orange interior. This unusual appearance reflects its extraordinary biochemical composition: Chaga has one of the highest Oxygen Radical Absorbance Capacity (ORAC) values of any natural food — a measure of antioxidant density.",
    sections: [
      {
        heading: "The Antioxidant King: Understanding Chaga's ORAC Value",
        body: "ORAC (Oxygen Radical Absorbance Capacity) is a standardized measurement of how effectively a substance neutralizes free radicals. Chaga's ORAC value is estimated at approximately 146,700 μmol TE/100g — vastly higher than most other foods. For comparison, blueberries (often considered an antioxidant-rich food) have an ORAC value of approximately 6,552 μmol TE/100g.\n\nChaga's antioxidant capacity comes from several sources: melanin complexes (the dark outer pigments), polyphenols, betulinic acid (derived from birch tree compounds), and beta-glucan polysaccharides. This combination creates a broad-spectrum antioxidant profile unlike most single-source foods."
      },
      {
        heading: "Beta-Glucans and Immune Function",
        body: "Chaga is rich in beta-1,3/1,6-glucans — polysaccharide compounds that have been extensively studied for their immunomodulatory effects. Unlike compounds that simply stimulate the immune system (which can be problematic), beta-glucans from Chaga appear to modulate immune activity — supporting appropriate immune response without causing over-activation.\n\nResearch suggests Chaga beta-glucans activate macrophages and Natural Killer (NK) cells — white blood cells that are critical for identifying and destroying pathogens and abnormal cells. This immunomodulatory mechanism is distinct from caffeine or adaptogen effects, making Chaga a genuinely unique addition to a functional coffee blend."
      },
      {
        heading: "Betulinic Acid: The Birch Tree Connection",
        body: "One of Chaga's most distinctive compounds is betulinic acid, which Chaga derives from its birch tree host. Betulinic acid has been studied extensively for anti-cancer properties in laboratory settings, and also shows anti-inflammatory and antiviral activity in research.\n\nImportant caveat: laboratory studies on isolated compounds do not automatically translate to clinical human benefits. Betulinic acid research is promising but largely preclinical. The practical benefit of betulinic acid in daily Chaga consumption is not definitively established for humans. It is, however, part of what makes Chaga biochemically unique compared to other functional mushrooms."
      },
      {
        heading: "Traditional Use and Modern Research",
        body: "Chaga has been used in Russian and Siberian folk medicine for centuries, most commonly as a tea made from ground Chaga in hot water. It was documented in 17th-century Russian herbalism for digestive complaints and general wellness. Alexander Solzhenitsyn's 1968 novel 'Cancer Ward' included references to Chaga as a folk remedy, bringing it to wider Western awareness.\n\nModern research has focused primarily on immunomodulation, antioxidant activity, and anti-inflammatory properties. Human clinical trials specifically for Chaga are limited — most of the strongest evidence comes from in vitro and animal studies. This is an honest limitation to acknowledge: we know a lot about what Chaga's compounds can do in laboratory settings, less about the exact mechanisms and dose-response in humans."
      },
      {
        heading: "Chaga in Torch Republic Blends",
        body: "Torch Republic uses Chaga extract in its mushroom coffee blends as a complementary ingredient to Lion's Mane. Where Lion's Mane is the cognitive-focused ingredient, Chaga brings antioxidant richness and immune-supportive beta-glucans.\n\nThe combination matters: the oxidative stress that caffeine creates in the body is partially offset by Chaga's antioxidant properties, creating a more balanced functional profile than coffee alone. This is one reason mushroom coffee can feel different from standard coffee for some people — it's not just caffeine, it's caffeine in a biochemically richer context.\n\nWho should be cautious: people on blood-thinning medications (Chaga may have anticoagulant properties), people with autoimmune conditions (immune modulation may be inappropriate), and anyone scheduled for surgery. Always consult a healthcare provider if you have existing medical conditions."
      },
    ],
  },
  'matcha': {
    intro: "Ceremonial grade matcha is the highest quality form of green tea powder, made exclusively from tencha — young, shade-grown tea leaves from the first spring harvest. It is stone-ground into an ultra-fine powder that dissolves in water rather than steeping. The result is a drink that delivers the entire leaf's nutritional profile, not just a water extraction. Matcha contains up to 137 times more EGCG antioxidants than regular green tea and 5x more L-theanine.",
    sections: [
      {
        heading: "What Makes Ceremonial Grade Different",
        body: "The grade distinction in matcha is real and significant — unlike many food 'grades' that are primarily marketing. Ceremonial grade matcha comes specifically from:\n\n1. First harvest (ichibancha) — the spring flush before May, when leaves are smallest and most nutrient-dense.\n2. Shade growing — the tea plants are covered with tarps or straw for 3-4 weeks before harvest. Shade reduces photosynthesis, causing the plant to produce more chlorophyll and L-theanine as metabolic compensation.\n3. Stem and vein removal — only the leaf blade (tencha) is used, removing fiber and reducing bitterness.\n4. Stone grinding — the slow, cold-grinding process preserves volatile aromatic compounds that industrial grinding destroys with heat.\n\nCulinary grade uses older leaves from later harvests, with less shade treatment, and processed without the same care. The taste difference is substantial: culinary grade is bitter and dull green; ceremonial grade is smooth, sweet, and vivid emerald."
      },
      {
        heading: "L-Theanine: The Science of Calm Focus",
        body: "L-theanine (gamma-glutamylethylamide) is an amino acid found almost exclusively in green tea — specifically in the Camellia sinensis plant. Matcha has approximately 5x more L-theanine than regular green tea because of the shade-growing process that concentrates it.\n\nL-theanine is a naturally occurring amino acid in tea that is traditionally associated with relaxed alertness and mindful tea rituals. Unlike benzodiazepines or alcohol, which promote delta and theta waves (drowsiness), L-theanine increases alpha without sedation.\n\nWhen combined with caffeine (as naturally occurs in matcha), L-theanine has a specific interaction that has been studied in over 30 human trials: it reduces caffeine-induced anxiety and jitteriness while maintaining or enhancing caffeine's focus and attention benefits. The combination improves reaction time, working memory, and sustained attention in well-controlled trials.\n\nKey research: Owen et al. (2008), Journal of Nutritional Neuroscience — participants receiving L-theanine + caffeine showed significantly better accuracy on demanding cognitive tasks than those on caffeine alone."
      },
      {
        heading: "EGCG and Antioxidant Density",
        body: "EGCG (epigallocatechin gallate) is the most abundant catechin antioxidant in green tea and one of the most studied polyphenols in nutritional research. Matcha provides dramatically more EGCG than brewed green tea because you consume the whole leaf, not just a water extraction.\n\nEGCG research spans hundreds of studies covering metabolic support, cardiovascular health, anti-inflammatory effects, and neuroprotection. It is important to note that most impressive EGCG research involves high doses or in vitro conditions. The practical benefits of daily matcha consumption are more modest — but there is genuine research support for sustained consumption reducing markers of oxidative stress and inflammation.\n\nOne key limitation: EGCG from matcha is significantly more bioavailable than from green tea bags because you're consuming the full leaf material, not just what diffuses into hot water."
      },
      {
        heading: "How to Prepare Ceremonial Matcha Properly",
        body: "Preparation significantly affects quality. The common mistake is using boiling water, which denatures L-theanine and EGCG and creates bitterness. Proper preparation:\n\n1. Water temperature: 70-80°C (158-176°F) — not boiling. A thermometer or 'off-boil' approach (let boiling water sit 2-3 minutes) works.\n2. Sift the powder: Matcha clumps. Sifting prevents lumps and creates a smoother preparation.\n3. Chasen (bamboo whisk): Traditional tool. Creates uniform suspension and fine froth. A small wire whisk works too — vigorous M-motion, not stirring.\n4. Ratio: 1-2g powder per 80ml water for usucha (thin tea). 3-4g for koicha (thick tea).\n5. For lattes: dissolve matcha in 30ml hot water first, then add steamed/heated milk.\n\nTorch Republic's instant matcha format is designed for simpler preparation — pre-sifted, optimized for stir-only preparation — while maintaining ceremonial grade quality."
      },
      {
        heading: "Matcha vs. Coffee: An Honest Comparison",
        body: "Matcha and coffee serve different ritual needs, and neither is objectively superior.\n\nCoffee provides higher total caffeine (80-120mg per cup vs 25-70mg for matcha), faster onset, and a more familiar flavor profile. For high-energy mornings or work requiring immediate activation, coffee often wins.\n\nMatcha contains naturally occurring caffeine and L-theanine, and may feel different from traditional coffee for some drinkers. For sustained creative work, afternoon sessions, or anyone who experiences caffeine anxiety from coffee, matcha's profile is genuinely better.\n\nMany experienced coffee drinkers alternate based on work type: coffee for high-output physical mornings, matcha for focused creative or analytical work. The Torch Republic ritual system was designed to support this — we have both premium instant coffee and ceremonial matcha, with a quiz that helps people find the right blend for their specific ritual needs."
      },
    ],
  },
};

// ─── AUTHOR/FOUNDER DATA ─────────────────────────────────────────────────────

export const TORCH_AUTHOR = {
  name: 'The Torch Republic Team',
  handle: 'torch-republic-team',
  role: 'Torch Republic Coffee Company',
  bio: "The Torch Republic team is a collective of coffee enthusiasts, functional wellness researchers, and ritual-focused product developers based in Corpus Christi, TX. Every article we publish is grounded in actual research, honest caveats, and the belief that a better morning starts with better ingredients — not just better marketing.",
  credentials: [
    'Research-backed content policy — no unsubstantiated health claims',
    'Every article reviewed against current PubMed literature',
    'Ingredient transparency as a core brand value',
    'Product formulations based on functional wellness research',
  ],
  articles: ALL_BLOG_TOPICS.filter(t => t.exists).map(t => ({ title: t.title, slug: t.slug })),
};

// ─── INTERNAL LINKING MAP ────────────────────────────────────────────────────
// Maps each URL to its most important outbound internal links

export const INTERNAL_LINK_MAP = {
  '/shop/instant-mushroom-coffee': [
    '/journal/lions-mane-mushroom-coffee',
    '/journal/mushroom-coffee-benefits',
    '/journal/science-of-lions-mane',
    '/journal/chaga-mushroom-antioxidant-king',
    '/ingredients/lions-mane',
    '/ingredients/chaga',
    '/build-your-ritual',
    '/faq/what-is-mushroom-coffee',
  ],
  '/shop/matcha': [
    '/journal/instant-ceremonial-matcha',
    '/journal/matcha-benefits',
    '/journal/history-of-matcha',
    '/ingredients/l-theanine',
    '/faq/what-is-ceremonial-matcha',
    '/faq/how-much-caffeine-matcha',
    '/build-your-ritual',
  ],
  '/shop/instant-coffee': [
    '/journal/best-instant-coffee',
    '/journal/what-makes-premium-instant-coffee-different',
    '/journal/coffee-pods-plastic-waste-microplastics',
    '/faq/what-is-instant-coffee',
    '/faq/freeze-dried-vs-spray-dried-faq',
    '/ingredients/arabica-coffee',
    '/build-your-ritual',
  ],
  '/journal/coffee-pods-plastic-waste-microplastics': [
    '/switch-from-pods',
    '/knowledge/coffee-pods-vs-instant-coffee',
    '/compare/instant-coffee-vs-k-cups',
    '/journal/what-makes-premium-instant-coffee-different',
    '/knowledge/best-coffee-without-coffee-maker',
    '/ingredients/freeze-dried-instant-coffee',
    '/shop/instant-coffee',
    '/shop/instant-mushroom-coffee',
    '/founder-story',
  ],
  '/journal': [
    '/shop/instant-mushroom-coffee',
    '/shop/matcha',
    '/shop/instant-coffee',
    '/quiz',
    '/ingredients',
  ],
};

// ─── GEO / AI ENGINE ENTITIES ────────────────────────────────────────────────
// Structured for LLM/AI answer engine comprehension

export const GEO_ENTITIES = {
  brand: {
    name: 'Torch Republic Coffee Company',
    type: 'CoffeeCompany',
    url: 'https://torchrepublic.com',
    location: 'Corpus Christi, TX, USA',
    foundedYear: 2023,
    products: ['mushroom coffee', 'instant coffee', 'ceremonial matcha'],
    keyIngredients: ["Lion's Mane", 'Chaga', 'Cordyceps', 'Reishi', 'L-Theanine', 'Arabica Coffee'],
    uniqueSellingPoints: [
      'Instant format — no coffee maker needed',
      'A growing collection of classic instant coffee, functional mushroom blends, and ceremonial matcha',
      'Functional mushroom extracts in all mushroom blends',
      '27 servings per tube',
      'Subscribe and save 20%',
      'Custom ritual bundle builder (any 3 for $49.99)',
    ],
    contact: 'hello@torchrepublic.com',
  },
  products: {
    mushroomCoffee: {
      description: "Premium instant coffee with Lion's Mane and Chaga mushroom extracts",
      servingsPerTube: 27,
      price: '$22.99',
      caffeinePerServing: '60-80mg',
      mainIngredients: ["Lion's Mane extract", 'Chaga extract', '100% Arabica instant coffee'],
    },
    matcha: {
      description: 'Ceremonial grade matcha powder with L-theanine for calm focus',
      servingsPerTin: 25,
      price: '$24.99',
      caffeinePerServing: '25-70mg',
      mainIngredients: ['Ceremonial grade tencha', 'L-Theanine (naturally occurring)'],
    },
    classicCoffee: {
      description: '100% Arabica freeze-dried premium instant coffee',
      servingsPerTube: 27,
      price: '$19.99',
      caffeinePerServing: '60-80mg',
      mainIngredients: ['100% Arabica freeze-dried instant coffee'],
    },
  },
};