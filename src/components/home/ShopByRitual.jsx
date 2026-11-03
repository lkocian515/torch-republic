import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Brain, Moon, Book, Sparkles, Flame } from 'lucide-react';

const RG = '#E6AC45';

const RITUALS = [
  {
    name: 'Rise',
    desc: 'For energy, momentum, and starting strong.',
    products: 'SunCap Rise · Torchbearer · Ember Reserve',
    icon: Sun,
    color: '#E6AC45',
    link: '/shop'
  },
  {
    name: 'Focus',
    desc: 'For deep work, creativity, and mental clarity.',
    products: 'GlowMind Clarity · The Ascendant',
    icon: Brain,
    color: '#E6AC45',
    link: '/mushroom-coffee'
  },
  {
    name: 'Restore',
    desc: 'For calm, grounding, and slower mornings.',
    products: 'MoonCap Restore · DreamCap',
    icon: Moon,
    color: '#9B4E2F',
    link: '/mushroom-coffee'
  },
  {
    name: 'Discipline',
    desc: 'For steady focus and intentional structure.',
    products: 'The Monk',
    icon: Flame,
    color: '#264A35',
    link: '/matcha'
  },
  {
    name: 'Create',
    desc: 'For imagination, expression, and flow.',
    products: 'The Alchemist · Mystic Bloom',
    icon: Sparkles,
    color: '#C4A85A',
    link: '/matcha'
  },
  {
    name: 'Reflect',
    desc: 'For journaling, intuition, and inner clarity.',
    products: 'MoonCap Restore',
    icon: Book,
    color: '#C4A8A0',
    link: '/shop'
  }
];

export default function ShopByRitual() {
  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
            Choose Your Path
          </p>
          <h2 className="font-serif font-bold mb-4" style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            color: '#FFFCF7'
          }}>
            Choose the Ritual You Need Today
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{
            fontSize: '0.95rem',
            color: 'rgba(240,235,225,0.55)',
            fontWeight: 300,
            lineHeight: 1.8
          }}>
            Each blend serves a different purpose. Match your intention to the right ritual.
          </p>
        </motion.div>

        {/* Ritual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RITUALS.map((ritual, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={ritual.link}
                className="block group p-7 h-full"
                style={{
                  background: '#0F0E0D',
                  border: `1px solid ${ritual.color}25`,
                  borderRadius: '6px',
                  textDecoration: 'none'
                }}
              >
                <div className="mb-5" style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `${ritual.color}15`,
                  border: `1px solid ${ritual.color}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ritual.icon size={24} style={{ color: ritual.color }} />
                </div>
                <h3 className="font-serif font-bold text-white mb-2" style={{ fontSize: '1.4rem' }}>
                  {ritual.name}
                </h3>
                <p className="font-heading text-sm mb-4" style={{
                  color: 'rgba(240,235,225,0.55)',
                  fontWeight: 300,
                  lineHeight: 1.7
                }}>
                  {ritual.desc}
                </p>
                <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-4" style={{
                  color: ritual.color
                }}>
                  {ritual.products}
                </p>
                <span className="font-mono text-[8px] tracking-[0.3em] uppercase font-bold transition-all group-hover:translate-x-2 inline-block" style={{ color: RG }}>
                  Explore This Ritual →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}