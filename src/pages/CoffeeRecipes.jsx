import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Coffee, Zap, Sun, Clock, Heart, TrendingUp } from 'lucide-react';
import NewsletterSignup from '../components/mushroom/NewsletterSignup';

const RG = '#E6B7AD';

const RECIPES = [
  {
    id: 'classic-morning',
    title: 'The Classic Morning',
    time: '2 minutes',
    difficulty: 'Easy',
    icon: Sun,
    description: 'Start your day with intention. Mix one scoop of your favorite blend with hot water and sip mindfully.',
    ingredients: ['1 scoop SunCap Rise or GlowMind Clarity', '8oz hot water (175°F)', 'Optional: dash of cinnamon'],
    steps: [
      'Heat water to 175°F (just below boiling)',
      'Add one scoop to your favorite mug',
      'Pour hot water over powder',
      'Stir gently for 10 seconds',
      'Take 3 deep breaths before your first sip',
    ],
    bestWith: ['SunCap Rise', 'GlowMind Clarity'],
    benefits: ['Quick energy', 'Mental clarity', 'Easy ritual'],
  },
  {
    id: 'creamy-latte',
    title: 'Creamy Focus Latte',
    time: '4 minutes',
    difficulty: 'Easy',
    icon: Coffee,
    description: 'Transform your mushroom coffee into a café-worthy latte. Creamy, comforting, and perfect for slow mornings.',
    ingredients: ['1 scoop MoonCap Restore or DreamCap', '6oz hot water', '4oz steamed oat milk or almond milk', '1 tsp maple syrup (optional)', 'Pinch of vanilla'],
    steps: [
      'Mix scoop with hot water in mug',
      'Steam or heat your milk of choice',
      'Pour milk over coffee mixture',
      'Add maple syrup and vanilla if desired',
      'Top with foam if you\'re feeling fancy',
    ],
    bestWith: ['MoonCap Restore', 'DreamCap Blend'],
    benefits: ['Comforting ritual', 'Sustained energy', 'Satisfying treat'],
  },
  {
    id: 'iced-energy',
    title: 'Iced Energy Boost',
    time: '3 minutes',
    difficulty: 'Easy',
    icon: Zap,
    description: 'Perfect for warm mornings or when you need a refreshing pick-me-up. Cold brew style without the wait.',
    ingredients: ['1 scoop SunCap Rise', '2oz hot water', '6oz cold water or coconut water', 'Ice cubes', 'Lemon slice (optional)'],
    steps: [
      'Dissolve scoop in 2oz hot water first',
      'Fill glass with ice',
      'Add cold water or coconut water',
      'Pour coffee mixture over ice',
      'Add lemon slice for extra freshness',
    ],
    bestWith: ['SunCap Rise', 'The Monk Matcha'],
    benefits: ['Refreshing', 'Quick cooling', 'Hydrating'],
  },
  {
    id: 'protein-power',
    title: 'Protein Power Blend',
    time: '3 minutes',
    difficulty: 'Easy',
    icon: Heart,
    description: 'Turn your mushroom coffee into a complete morning fuel. Perfect for busy days when you need lasting energy.',
    ingredients: ['1 scoop GlowMind Clarity or The Oracle', '8oz hot water', '1 scoop collagen peptides or protein powder', '1 tbsp MCT oil or coconut oil (optional)'],
    steps: [
      'Mix mushroom coffee with hot water',
      'Add collagen or protein powder',
      'Blend in blender for 20 seconds (or whisk vigorously)',
      'Add MCT oil if using',
      'Pour and enjoy immediately',
    ],
    bestWith: ['GlowMind Clarity', 'The Oracle Blend'],
    benefits: ['Sustained energy', 'Protein boost', 'Keeps you full'],
  },
  {
    id: 'golden-mushroom',
    title: 'Golden Mushroom Milk',
    time: '5 minutes',
    difficulty: 'Medium',
    icon: TrendingUp,
    description: 'An anti-inflammatory powerhouse combining mushroom coffee with golden milk spices. Warming and nourishing.',
    ingredients: ['1 scoop MoonCap Restore', '8oz oat milk or almond milk', '1/2 tsp turmeric', 'Pinch of black pepper', 'Dash of ginger', '1 tsp honey'],
    steps: [
      'Heat milk gently in small saucepan',
      'Add turmeric, ginger, and black pepper',
      'Whisk in mushroom coffee scoop',
      'Simmer for 2 minutes (don\'t boil)',
      'Strain if desired, add honey',
    ],
    bestWith: ['MoonCap Restore', 'DreamCap Blend'],
    benefits: ['Anti-inflammatory', 'Calming', 'Immune support'],
  },
  {
    id: 'smoothie-boost',
    title: 'Morning Smoothie Boost',
    time: '5 minutes',
    difficulty: 'Easy',
    icon: Zap,
    description: 'Hide your mushroom coffee in a delicious smoothie. All the benefits, none of the coffee taste.',
    ingredients: ['1 scoop The Oracle or Mystic Bloom', '1 frozen banana', '1 cup spinach', '1 cup almond milk', '1 tbsp almond butter', 'Ice cubes'],
    steps: [
      'Add all ingredients to blender',
      'Blend on high for 45 seconds',
      'Add more ice for thickness if desired',
      'Pour into glass',
      'Enjoy your hidden superfood boost',
    ],
    bestWith: ['The Oracle Blend', 'Mystic Bloom'],
    benefits: ['Nutrient-dense', 'Great taste', 'Full breakfast'],
  },
];

const ROUTINE_TIPS = [
  {
    icon: Clock,
    title: 'Timing Matters',
    text: 'Drink your mushroom coffee 30-60 minutes after waking for optimal cortisol alignment.',
  },
  {
    icon: Heart,
    title: 'Consistency is Key',
    text: 'Adaptogens work best with daily use. Make it a non-negotiable part of your morning.',
  },
  {
    icon: Zap,
    title: 'Stack Your Habits',
    text: 'Pair your mushroom coffee with meditation, journaling, or movement for amplified benefits.',
  },
];

export default function CoffeeRecipes() {
  useSEO({
    title: 'Mushroom Coffee Recipes | Morning Ritual Ideas',
    description: 'Simple recipes to incorporate mushroom coffee into your daily routine. From classic brews to protein lattes, discover new ways to enjoy your morning ritual.',
    url: '/recipes',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-14 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Morning Rituals
          </p>
          <h1 className="font-serif font-bold mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            How to Enjoy Your Mushroom Coffee
          </h1>
          <p className="font-heading max-w-2xl mx-auto"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            Six simple recipes to transform your daily cup into something extraordinary. From quick classics to creative blends.
          </p>
        </motion.div>
      </section>

      {/* Routine Tips */}
      <section className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROUTINE_TIPS.map((tip, i) => {
              const Icon = tip.icon;
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex items-center justify-center mb-4"
                    style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(230,183,173,0.08)' }}>
                    <Icon className="w-5 h-5" style={{ color: RG }} />
                  </div>
                  <h3 className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
                    {tip.title}
                  </h3>
                  <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.7 }}>
                    {tip.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 md:px-10 py-12" style={{ borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="font-serif font-bold mb-2" style={{ fontSize: '1.8rem', color: '#FFFFFF' }}>
              Table of Contents
            </h2>
            <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.45)' }}>
              Jump to your favorite recipe
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {RECIPES.map((recipe, idx) => (
              <motion.a
                key={recipe.id}
                href={`#${recipe.id}`}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-lg transition-all hover:bg-white/5 group"
                style={{ border: '1px solid rgba(230,183,173,0.08)' }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(230,183,173,0.08)' }}>
                  <recipe.icon className="w-3.5 h-3.5" style={{ color: RG }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-sm font-medium group-hover:text-rose-gold transition-colors"
                    style={{ color: 'rgba(240,235,225,0.7)' }}>
                    {recipe.title}
                  </h3>
                  <p className="font-mono text-[7px] tracking-[0.2em] uppercase"
                    style={{ color: 'rgba(230,183,173,0.4)' }}>
                    {recipe.time} • {recipe.difficulty}
                  </p>
                </div>
                <span className="font-mono text-[8px] tracking-[0.2em]" style={{ color: RG }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {RECIPES.map((recipe, i) => {
              const Icon = recipe.icon;
              return (
                <motion.div
                  id={recipe.id}
                  key={recipe.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-white/5 rounded-lg p-6 md:p-8 hover:border-rose-gold/20 transition-all scroll-mt-24"
                  style={{ backgroundColor: 'rgba(255,255,255,0.01)' }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center justify-center"
                          style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(230,183,173,0.08)' }}>
                          <Icon className="w-4 h-4" style={{ color: RG }} />
                        </div>
                        <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: 'rgba(230,183,173,0.5)' }}>
                          {recipe.time} • {recipe.difficulty}
                        </span>
                      </div>
                      <h2 className="font-serif font-bold text-2xl md:text-3xl mb-2" style={{ color: '#FFFFFF' }}>
                        {recipe.title}
                      </h2>
                      <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.45)', lineHeight: 1.7 }}>
                        {recipe.description}
                      </p>
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-6">
                    <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
                      What You Need
                    </h3>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="font-heading text-sm flex items-start gap-2"
                          style={{ color: 'rgba(240,235,225,0.6)' }}>
                          <span style={{ color: RG }}>•</span>
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div className="mb-6">
                    <h3 className="font-mono text-[8px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
                      How to Make It
                    </h3>
                    <ol className="space-y-3">
                      {recipe.steps.map((step, idx) => (
                        <li key={idx} className="font-heading text-sm flex items-start gap-3"
                          style={{ color: 'rgba(240,235,225,0.6)' }}>
                          <span className="font-mono text-[7px] tracking-[0.2em] flex-shrink-0"
                            style={{ color: RG, minWidth: '20px' }}>
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Best With & Benefits */}
                  <div className="pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {recipe.bestWith.map((blend) => (
                        <span key={blend} className="font-mono text-[7px] tracking-[0.25em] uppercase px-3 py-1.5 rounded"
                          style={{ background: 'rgba(230,183,173,0.08)', color: RG }}>
                          {blend}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recipe.benefits.map((benefit) => (
                        <span key={benefit} className="font-heading text-xs"
                          style={{ color: 'rgba(240,235,225,0.35)' }}>
                          ✦ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-16 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Ready to Start Your Ritual?
          </p>
          <h2 className="font-serif font-bold mb-6 text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}>
            Shop All Blends
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop"
              className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
              style={{ background: RG, color: '#080808' }}>
              Shop Now →
            </Link>
            <Link to="/build-your-ritual"
              className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-3.5 px-8"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
              Get the Bundle →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />

      {/* Legal */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}