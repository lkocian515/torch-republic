import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSEO } from '@/hooks/useSEO';
import { Clock, Zap, ChevronDown, Coffee, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const RECIPES = [
  {
    id: 'iced-lion-latte',
    title: "Iced Lion's Mane Latte",
    blend: 'Focus Blend',
    blendSlug: 'focus-blend',
    time: '3 min',
    difficulty: 'Easy',
    tag: 'Iced',
    tagColor: '#5B9BD5',
    description: "Silky, cold, and focused. This 3-minute latte uses your Focus Blend over ice with your choice of oat or almond milk for a clean morning ritual.",
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    ingredients: [
      '1 serving Torch Republic Focus Blend',
      '2 oz hot water',
      '8 oz oat milk (or almond milk)',
      'Ice cubes',
      '1 tsp maple syrup (optional)',
    ],
    steps: [
      'Dissolve 1 serving of Focus Blend in 2 oz of hot water. Stir until fully dissolved.',
      'Fill a tall glass with ice cubes.',
      'Pour the dissolved coffee over ice.',
      'Top with chilled oat milk and stir gently.',
      'Add maple syrup if you want a touch of sweetness. Enjoy.',
    ],
    tip: 'Shake your milk with ice in a jar for a frothy finish.',
  },
  {
    id: 'mushroom-protein-shake',
    title: 'Mushroom Coffee Protein Shake',
    blend: 'Energy Blend',
    blendSlug: 'energy-blend',
    time: '5 min',
    difficulty: 'Easy',
    tag: 'High Protein',
    tagColor: '#C9A24A',
    description: "Fuel your workout and your morning. This shake blends mushroom coffee with chocolate protein powder for a drink that tastes like dessert and performs like a pre-workout.",
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=600&q=80',
    ingredients: [
      '1 serving Torch Republic Energy Blend',
      '1 scoop chocolate protein powder',
      '1 cup cold almond milk',
      '1 frozen banana',
      '1 tbsp almond butter',
      '3–4 ice cubes',
    ],
    steps: [
      'Add all ingredients to a blender.',
      'Blend on high for 30–45 seconds until smooth.',
      'Pour into a glass and drink immediately.',
    ],
    tip: "Add a handful of spinach — you won't taste it, but you'll feel it.",
  },
  {
    id: 'chaga-chai-blend',
    title: 'Chaga Chai Spice Blend',
    blend: 'Calm Blend',
    blendSlug: 'calm-blend',
    time: '5 min',
    difficulty: 'Easy',
    tag: 'Warm',
    tagColor: '#A0796B',
    description: "Earthy, warming, and spiced. The Calm Blend pairs beautifully with cinnamon and cardamom for an afternoon ritual that slows you down in the best way.",
    image: 'https://images.unsplash.com/photo-1571658910820-b94a7de4cfda?w=600&q=80',
    ingredients: [
      '1 serving Torch Republic Calm Blend',
      '8 oz hot water or warm oat milk',
      '¼ tsp cinnamon',
      '¼ tsp cardamom',
      'Pinch of black pepper',
      '1 tsp honey or maple syrup',
    ],
    steps: [
      'Bring oat milk to a gentle simmer — don\'t boil.',
      'Dissolve Calm Blend in 2 oz of hot water in your mug.',
      'Stir in the spices and sweetener.',
      'Pour in the warm oat milk and stir.',
      'Top with a dusting of cinnamon and serve.',
    ],
    tip: 'Try this as a bedtime ritual in place of chamomile tea.',
  },
  {
    id: 'double-shot-espresso-style',
    title: 'Instant Double Shot (Espresso Style)',
    blend: 'Torchbearer Dark Roast',
    blendSlug: 'torchbearer',
    time: '2 min',
    difficulty: 'Easy',
    tag: 'Strong',
    tagColor: '#333',
    description: "No espresso machine needed. Use 2 servings of the Torchbearer Dark Roast dissolved in just 2 oz of water for a concentrate that hits like a real double shot.",
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80',
    ingredients: [
      '2 servings Torchbearer Dark Roast',
      '2 oz near-boiling water',
    ],
    steps: [
      'Heat water to just below boiling (about 195°F).',
      'Add 2 servings of Torchbearer to your cup.',
      'Pour 2 oz of hot water over the grounds.',
      'Stir vigorously for 20 seconds until fully dissolved.',
      'Use as a base for lattes, cortados, or drink as-is.',
    ],
    tip: 'Add a splash of cold milk and 1 oz of sparkling water for a makeshift cortado.',
  },
  {
    id: 'collagen-glow-latte',
    title: 'Collagen Glow Latte',
    blend: 'Balance Blend',
    blendSlug: 'balance-blend',
    time: '5 min',
    difficulty: 'Easy',
    tag: 'Wellness',
    tagColor: '#C98F86',
    description: "Your skin's new morning routine. The Balance Blend with collagen peptides and coconut cream is a ritual that works from the inside out.",
    image: 'https://images.unsplash.com/photo-1521302200778-33500795e128?w=600&q=80',
    ingredients: [
      '1 serving Torch Republic Balance Blend',
      '1 scoop unflavored collagen peptides',
      '8 oz hot water or oat milk',
      '2 tbsp coconut cream',
      '½ tsp vanilla extract',
    ],
    steps: [
      'Heat your liquid of choice to just below boiling.',
      'Dissolve Balance Blend and collagen in 2 oz hot water first, stir until smooth.',
      'Add vanilla and coconut cream.',
      'Pour in the remaining hot liquid and stir well.',
      'Serve in your favorite mug.',
    ],
    tip: 'Froth the coconut cream separately for a creamy foam topping.',
  },
  {
    id: 'cold-brew-style',
    title: 'Overnight Cold Brew Style',
    blend: 'Focus Blend',
    blendSlug: 'focus-blend',
    time: '5 min + overnight',
    difficulty: 'Easy',
    tag: 'Meal Prep',
    tagColor: '#4A8C6F',
    description: "Batch prep your mornings. Mix a larger serving in cold water the night before and wake up to a smooth, ready-to-drink mushroom cold brew concentrate.",
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    ingredients: [
      '3 servings Torch Republic Focus Blend',
      '12 oz cold filtered water',
      'Ice and milk to serve',
    ],
    steps: [
      'Add 3 servings of Focus Blend to a jar or pitcher.',
      'Pour 12 oz of cold filtered water over it.',
      'Stir well, seal, and refrigerate overnight (8–12 hours).',
      'In the morning, stir again, pour over ice.',
      'Top with milk or enjoy straight.',
    ],
    tip: 'Make a big batch on Sunday and keep it in the fridge all week.',
  },
];

const TAGS = ['All', 'Iced', 'High Protein', 'Warm', 'Strong', 'Wellness', 'Meal Prep'];

function RecipeCard({ recipe, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onClick={() => onClick(recipe)}
      className="cursor-pointer group"
      style={{ background: '#0D0D0D', border: '1px solid rgba(230,183,173,0.1)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,13,13,0.7) 0%, transparent 60%)' }} />
        <span className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-1"
          style={{ background: recipe.tagColor + '22', border: `1px solid ${recipe.tagColor}40`, color: recipe.tagColor }}>
          {recipe.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: RG + '80' }}>
            {recipe.blend}
          </span>
        </div>
        <h3 className="font-heading font-black uppercase tracking-tight text-base mb-2" style={{ color: '#F0EBE1' }}>
          {recipe.title}
        </h3>
        <p className="font-mono text-[10px] leading-relaxed mb-4" style={{ color: 'rgba(240,235,225,0.45)' }}>
          {recipe.description}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" style={{ color: RG + '60' }} />
            <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.4)' }}>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3" style={{ color: RG + '60' }} />
            <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.4)' }}>{recipe.difficulty}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ background: '#0D0D0D', border: '1px solid rgba(230,183,173,0.15)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0D0D0D 0%, transparent 60%)' }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center font-mono text-xs"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)' }}
          >
            ✕
          </button>
          <span className="absolute bottom-3 left-4 font-mono text-[9px] tracking-[0.3em] uppercase px-2 py-1"
            style={{ background: recipe.tagColor + '22', border: `1px solid ${recipe.tagColor}40`, color: recipe.tagColor }}>
            {recipe.tag}
          </span>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: RG + '70' }}>{recipe.blend}</p>
            <h2 className="font-heading font-black uppercase tracking-tight text-2xl mb-2" style={{ color: '#F0EBE1' }}>{recipe.title}</h2>
            <p className="font-mono text-[11px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)' }}>{recipe.description}</p>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" style={{ color: RG + '60' }} />
                <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.4)' }}>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3" style={{ color: RG + '60' }} />
                <span className="font-mono text-[10px]" style={{ color: 'rgba(240,235,225,0.4)' }}>{recipe.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: RG + '80' }}>Ingredients</p>
            <ul className="space-y-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: RG + '60' }} />
                  <span className="font-mono text-[11px]" style={{ color: 'rgba(240,235,225,0.65)' }}>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: RG + '80' }}>How to Make It</p>
            <ol className="space-y-3">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[10px] font-bold w-5 flex-shrink-0 mt-0.5" style={{ color: RG }}>{i + 1}.</span>
                  <span className="font-mono text-[11px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)' }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tip */}
          {recipe.tip && (
            <div className="px-4 py-3" style={{ background: RG + '08', border: `1px solid ${RG}20` }}>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: RG + '80' }}>Pro Tip</p>
              <p className="font-mono text-[11px] leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)' }}>{recipe.tip}</p>
            </div>
          )}

          {/* CTA */}
          <Link
            to={`/blends/${recipe.blendSlug}`}
            className="flex items-center justify-center gap-2 py-3 font-mono text-[10px] tracking-[0.3em] uppercase transition-opacity hover:opacity-80"
            style={{ background: RG + '15', border: `1px solid ${RG}35`, color: RG }}
            onClick={onClose}
          >
            <Coffee className="w-3.5 h-3.5" />
            Shop {recipe.blend}
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CoffeeRecipes() {
  const [activeTag, setActiveTag] = useState('All');
  const [activeRecipe, setActiveRecipe] = useState(null);

  useSEO({
    title: 'Coffee Recipes — Creative Ways to Brew Your Mushroom Blends | Torch Republic',
    description: "Discover creative mushroom coffee recipes — iced lattes, protein shakes, chai blends, and more. New ways to enjoy your Torch Republic ritual every day.",
    url: '/recipes',
    type: 'website',
  });

  const filtered = activeTag === 'All' ? RECIPES : RECIPES.filter(r => r.tag === activeTag);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111111' }}>
      {/* Hero */}
      <section className="pt-20 pb-12 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <Flame className="w-4 h-4" style={{ color: RG }} />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={{ color: RG + '80' }}>
              Torch Republic Kitchen
            </span>
          </div>
          <h1 className="font-heading font-black uppercase tracking-tight text-4xl md:text-5xl mb-4" style={{ color: '#F0EBE1' }}>
            Coffee Recipes
          </h1>
          <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)' }}>
            Your blends work harder than a standard cup. Here are 6 ways to make them even better — from a 2-minute iced latte to an overnight cold brew you prep on Sunday.
          </p>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="divider-gradient mx-auto max-w-4xl mb-10" />

      {/* Filter tags */}
      <section className="px-6 mb-10">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="font-mono text-[10px] tracking-[0.3em] uppercase px-4 py-2 transition-all"
              style={{
                background: activeTag === tag ? RG + '15' : 'transparent',
                border: activeTag === tag ? `1px solid ${RG}40` : '1px solid rgba(230,183,173,0.12)',
                color: activeTag === tag ? RG : 'rgba(240,235,225,0.4)',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Recipe grid */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} onClick={setActiveRecipe} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Recipe modal */}
      <AnimatePresence>
        {activeRecipe && <RecipeModal recipe={activeRecipe} onClose={() => setActiveRecipe(null)} />}
      </AnimatePresence>
    </div>
  );
}