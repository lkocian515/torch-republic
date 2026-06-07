import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, Leaf, Sparkles, ArrowRight, Check } from 'lucide-react';
import { MUSHROOM_PRODUCTS, MATCHA_PRODUCTS, CLASSIC_COFFEE_PRODUCTS } from '../../lib/mushroomProducts';

const RG = '#E6B7AD';
const EMERALD = '#10B981';

const PREFERENCES = [
  { id: 'bold', label: 'Bold & Rich', icon: Coffee, category: 'intensity' },
  { id: 'smooth', label: 'Smooth & Balanced', icon: Coffee, category: 'intensity' },
  { id: 'light', label: 'Light & Bright', icon: Coffee, category: 'intensity' },
  { id: 'focus', label: 'Focus & Clarity', icon: Sparkles, category: 'benefit' },
  { id: 'calm', label: 'Calm & Grounded', icon: Leaf, category: 'benefit' },
  { id: 'energy', label: 'Energy & Momentum', icon: Sparkles, category: 'benefit' },
  { id: 'creative', label: 'Creativity & Flow', icon: Sparkles, category: 'benefit' },
  { id: 'pure-coffee', label: 'Pure Coffee', icon: Coffee, category: 'type' },
  { id: 'functional', label: 'Functional Mushrooms', icon: Leaf, category: 'type' },
  { id: 'matcha', label: 'Matcha', icon: Leaf, category: 'type' },
];

const BLEND_MATCHES = {
  'bold': ['midnight-watch', 'torchbearer'],
  'smooth': ['glowmind-clarity', 'the-oracle', 'mystic-bloom', 'ember-rise'],
  'light': ['suncap-rise', 'the-monk'],
  'focus': ['glowmind-clarity', 'the-monk', 'the-alchemist'],
  'calm': ['mooncap-restore', 'dreamcap-blend', 'the-monk'],
  'energy': ['suncap-rise', 'ember-rise', 'the-ascendant'],
  'creative': ['dreamcap-blend', 'the-oracle', 'the-alchemist'],
  'pure-coffee': ['torchbearer', 'ember-rise', 'midnight-watch'],
  'functional': ['suncap-rise', 'glowmind-clarity', 'mooncap-restore', 'dreamcap-blend', 'the-oracle', 'mystic-bloom'],
  'matcha': ['the-monk', 'the-ascendant', 'the-alchemist'],
};

export default function FlavorDiscovery() {
  const [selectedPrefs, setSelectedPrefs] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const togglePreference = (prefId) => {
    setSelectedPrefs(prev => {
      if (prev.includes(prefId)) {
        return prev.filter(p => p !== prefId);
      }
      // Limit to 3 selections per category
      const category = PREFERENCES.find(p => p.id === prefId)?.category;
      const sameCategory = prev.filter(p => {
        const pCat = PREFERENCES.find(pref => pref.id === p)?.category;
        return pCat === category;
      });
      if (sameCategory.length >= 2) {
        return prev; // Already at max for this category
      }
      return [...prev, prefId];
    });
  };

  const getRecommendations = () => {
    if (selectedPrefs.length === 0) return [];
    
    const scores = {};
    const allBlends = [...MUSHROOM_PRODUCTS, ...MATCHA_PRODUCTS, ...CLASSIC_COFFEE_PRODUCTS];
    
    allBlends.forEach(blend => {
      scores[blend.id] = 0;
    });

    selectedPrefs.forEach(prefId => {
      const matches = BLEND_MATCHES[prefId] || [];
      matches.forEach(blendId => {
        scores[blendId] = (scores[blendId] || 0) + 1;
      });
    });

    return Object.entries(scores)
      .filter(([_, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => allBlends.find(b => b.id === id));
  };

  const recommendations = getRecommendations();

  const handleFindMyBlends = () => {
    if (selectedPrefs.length > 0) {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedPrefs([]);
    setShowResults(false);
  };

  return (
    <section
      className="px-6 md:px-10 py-20"
      style={{
        background: 'radial-gradient(ellipse at bottom, rgba(230,183,173,0.06) 0%, transparent 70%)',
        borderTop: '1px solid rgba(230,183,173,0.08)',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}80` }}>
            Flavor Discovery
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F5EFE6' }}>
            Find Your Perfect Blend
          </h2>
          <p
            className="font-heading max-w-2xl mx-auto"
            style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8, fontSize: '1.05rem' }}
          >
            Select your taste preferences and we'll match you with the perfect mushroom coffee or matcha blend for your ritual.
          </p>
        </motion.div>

        {!showResults ? (
          <>
            {/* Preference Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
                {PREFERENCES.map((pref, i) => {
                  const Icon = pref.icon;
                  const isSelected = selectedPrefs.includes(pref.id);
                  return (
                    <motion.button
                      key={pref.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => togglePreference(pref.id)}
                      className={`p-4 rounded-sm transition-all flex flex-col items-center gap-2 ${
                        isSelected ? 'scale-105' : 'hover:scale-105'
                      }`}
                      style={{
                        background: isSelected ? `${RG}15` : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${isSelected ? RG : `${RG}20`}`,
                        cursor: 'pointer',
                      }}
                    >
                      <Icon size={20} style={{ color: isSelected ? RG : `${RG}50` }} />
                      <span
                        className="font-mono text-[8px] tracking-[0.2em] uppercase"
                        style={{ color: isSelected ? RG : `${RG}50` }}
                      >
                        {pref.label}
                      </span>
                      {isSelected && (
                        <Check size={14} style={{ color: RG, position: 'absolute', top: '8px', right: '8px' }} />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="text-center">
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={handleFindMyBlends}
                  disabled={selectedPrefs.length === 0}
                  className={`inline-flex items-center gap-3 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all py-4 px-10 rounded-sm ${
                    selectedPrefs.length > 0
                      ? 'hover:opacity-90 cursor-pointer'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                  style={{
                    background: selectedPrefs.length > 0 ? RG : `${RG}30`,
                    color: selectedPrefs.length > 0 ? '#050505' : 'rgba(255,255,255,0.3)',
                  }}
                >
                  Find My Blends <ArrowRight size={14} />
                </motion.button>
                {selectedPrefs.length > 0 && (
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase mt-4" style={{ color: `${RG}50` }}>
                    {selectedPrefs.length} preference{selectedPrefs.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="text-center mb-8">
                <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: `${RG}70` }}>
                  Your Perfect Matches
                </p>
                <h3 className="font-serif font-bold" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#F5EFE6' }}>
                  Based on your preferences
                </h3>
              </div>

              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {recommendations.map((blend, i) => (
                    <motion.div
                      key={blend.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <Link to={`/products/${blend.slug}`} className="block h-full">
                        <div
                          className="h-full rounded-sm overflow-hidden transition-all"
                          style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: `1px solid ${blend.accent}30`,
                          }}
                        >
                          {/* Image */}
                          <div className="relative overflow-hidden" style={{ height: '280px', background: '#0F0E0E' }}>
                            <img
                              src={blend.image}
                              alt={blend.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div
                              className="absolute top-4 left-4 px-3 py-1.5 rounded-sm font-mono text-[8px] tracking-[0.25em] uppercase font-bold"
                              style={{
                                background: `${blend.accent}20`,
                                border: `1px solid ${blend.accent}40`,
                                color: blend.accent,
                              }}
                            >
                              {blend.category === 'matcha' ? 'Matcha' : blend.category === 'classic-coffee' ? 'Classic Coffee' : 'Mushroom Coffee'}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5">
                            <h4 className="font-serif font-bold text-lg mb-2" style={{ color: '#F5EFE6' }}>
                              {blend.name}
                            </h4>
                            <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-3" style={{ color: `${RG}60` }}>
                              {blend.tagline}
                            </p>
                            <p
                              className="font-heading text-sm mb-4 line-clamp-2"
                              style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}
                            >
                              {blend.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="font-serif font-bold" style={{ fontSize: '1.25rem', color: blend.accent }}>
                                ${blend.price}
                              </span>
                              <span
                                className="font-mono text-[8px] tracking-[0.25em] uppercase flex items-center gap-1"
                                style={{ color: RG }}
                              >
                                Shop <ArrowRight size={12} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="font-heading mb-4" style={{ color: 'rgba(240,235,225,0.5)' }}>
                    We couldn't find a perfect match. Try selecting different preferences.
                  </p>
                </div>
              )}

              {/* Reset & Shop All */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleReset}
                  className="font-mono text-[9px] tracking-[0.3em] uppercase transition-all hover:opacity-80 py-3 px-6 rounded-sm"
                  style={{
                    border: `1px solid ${RG}30`,
                    color: `${RG}70`,
                  }}
                >
                  Start Over
                </motion.button>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8 rounded-sm"
                  style={{ background: RG, color: '#050505' }}
                >
                  Shop All Blends <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8"
          style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}
        >
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
            ✦ 27+ Servings Per Tube
          </span>
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
            ✦ No Coffee Maker Needed
          </span>
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
            ✦ Functional Ingredients
          </span>
          <span className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: `${RG}50` }}>
            ✦ Subscribe & Save 20%
          </span>
        </motion.div>
      </div>
    </section>
  );
}