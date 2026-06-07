import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Leaf, Sparkles } from 'lucide-react';

const RG = '#E6B7AD';

const CATEGORIES = [
  {
    icon: Coffee,
    label: 'Instant Coffee',
    type: 'INSTANT COFFEE',
    desc: 'Torchbearer · Ember Rise · Midnight Watch — 100% Arabica instant coffee with functional adaptogens. Medium & dark roast. Bold, smooth, and ready in seconds.',
    cta: 'Shop Coffee',
    href: '/torchbearer',
    accent: '#C4A35A',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/55c37c676_dgdfgdr.png',
  },
  {
    icon: Leaf,
    label: 'Mushroom Coffee',
    type: 'MUSHROOM COFFEE',
    desc: 'SunCap Rise · GlowMind · MoonCap · The Oracle · DreamCap · Mystic Bloom — six blends with Lion\'s Mane + Chaga for focus, energy, calm, and restoration.',
    cta: 'Shop Mushroom Coffee',
    href: '/blends',
    accent: RG,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/cdb889116_9.png',
  },
  {
    icon: Sparkles,
    label: 'Instant Matcha',
    type: 'INSTANT MATCHA',
    desc: 'The Monk · The Ascendant · The Alchemist — ceremonial grade instant matcha blends for focus, calm, energy, and daily transformation.',
    cta: 'Shop Matcha',
    href: '/shop',
    accent: '#10B981',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9c00cda6c_8.png',
  },
];

export default function CategoryCards() {
  return (
    <section style={{ background: '#080808', padding: 'clamp(56px,7vw,96px) 24px', borderTop: '1px solid rgba(230,183,173,0.06)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            The Collection
          </p>
          <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Three Categories. One Daily Ritual.
          </h2>
          <p className="font-heading text-sm max-w-md mx-auto" style={{ color: 'rgba(210,195,175,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
            All products are instant powders. No machine. No pods. Scoop, stir, and sip.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group overflow-hidden"
              style={{ border: `1px solid ${cat.accent}20`, background: 'rgba(255,255,255,0.015)' }}
            >
              {/* Image */}
              <div style={{ height: 220, overflow: 'hidden' }}>
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${cat.accent}15`, border: `1px solid ${cat.accent}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <cat.icon size={14} style={{ color: cat.accent }} />
                  </div>
                  <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: cat.accent }}>
                    {cat.type}
                  </span>
                </div>

                <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.25rem', color: '#F5EFE6', lineHeight: 1.2 }}>
                  {cat.label}
                </h3>
                <p className="font-heading text-xs mb-5" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.75 }}>
                  {cat.desc}
                </p>

                <Link
                  to={cat.href}
                  className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-opacity hover:opacity-75"
                  style={{ color: cat.accent }}
                >
                  {cat.cta} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}