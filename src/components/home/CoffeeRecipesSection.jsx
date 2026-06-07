import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, Zap, Sun, Heart } from 'lucide-react';

const RG = '#E6B7AD';

const FEATURED_RECIPES = [
  {
    id: 'classic-morning',
    title: 'The Classic Morning',
    time: '2 min',
    icon: Sun,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/classic_morning_recipe.png',
    description: 'Start your day with intention',
  },
  {
    id: 'creamy-latte',
    title: 'Creamy Focus Latte',
    time: '4 min',
    icon: Coffee,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/creamy_latte_recipe.png',
    description: 'Café-worthy comfort',
  },
  {
    id: 'iced-energy',
    title: 'Iced Energy Boost',
    time: '3 min',
    icon: Zap,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/iced_energy_recipe.png',
    description: 'Refreshing pick-me-up',
  },
  {
    id: 'protein-power',
    title: 'Protein Power Blend',
    time: '3 min',
    icon: Heart,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/protein_blend_recipe.png',
    description: 'Complete morning fuel',
  },
];

export default function CoffeeRecipesSection() {
  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15` }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}70` }}>
            Brewing Guides
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F5EFE6' }}>
            Coffee Recipes {'+'} Rituals
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Transform your daily cup with our favorite brewing methods. From classic preparations to creative blends.
          </p>
        </motion.div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {FEATURED_RECIPES.map((recipe, idx) => {
            const Icon = recipe.icon;
            return (
              <motion.a
                key={recipe.id}
                href="/recipes"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group block"
              >
                <div
                  className="flex flex-col h-full rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'rgba(230,183,173,0.04)',
                    border: `1px solid ${RG}15`,
                  }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden" style={{ background: '#0F0E0D' }}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden w-full h-full items-center justify-center"
                      style={{ background: 'rgba(230,183,173,0.08)' }}
                    >
                      <Icon className="w-12 h-12" style={{ color: RG }} />
                    </div>
                    {/* Time badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded" style={{ background: 'rgba(0,0,0,0.7)' }}>
                      <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: RG }}>
                        {recipe.time}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4" style={{ color: RG }} />
                      <h3 className="font-serif font-bold text-base" style={{ color: '#F5EFE6' }}>
                        {recipe.title}
                      </h3>
                    </div>
                    <p className="font-heading text-xs flex-1" style={{ color: 'rgba(240,235,225,0.5)', lineHeight: 1.6 }}>
                      {recipe.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2" style={{ color: RG }}>
                      <span className="font-mono text-[8px] tracking-[0.25em] uppercase">View Recipe</span>
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/recipes"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8"
            style={{ background: RG, color: '#080808' }}
          >
            View All Recipes
            <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}