import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

export default function MushroomCoffeeShowcase() {
  const sections = [
    {
      title: 'Energy Rituals',
      subtitle: 'By Roast Profile',
      description: 'Choose your roast intensity. All infused with Lion\'s Mane + Chaga for sustained energy and cognitive support.',
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9828412ff_dsaasdas.png',
      blends: ['Mooncap Restore (Dark)', 'Glowmind Clarity (Medium)', 'Suncap Rise (Light)'],
      link: '/mushroom-coffee',
      order: 'normal',
    },
    {
      title: 'Intentional Blends',
      subtitle: 'By Purpose',
      description: 'Each blend crafted for a specific ritual. The Oracle for clarity, Dreamcap for calm, Mystic Bloom for transformation.',
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/bd2672a7a_fdsfsdfdsfsd.png',
      blends: ['The Oracle Blend', 'Dreamcap Blend', 'Mystic Bloom Blend'],
      link: '/mushroom-coffee',
      order: 'reverse',
    },
  ];

  return (
    <div>
      {sections.map((section, i) => (
        <section
          key={i}
          className="px-6 md:px-10 py-16 md:py-24"
          style={{ backgroundColor: '#080808', borderBottom: '1px solid rgba(230,183,173,0.08)' }}
        >
          <div className="max-w-[1280px] mx-auto">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                section.order === 'reverse' ? 'md:auto-cols-fr' : ''
              }`}
            >
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: section.order === 'reverse' ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={section.order === 'reverse' ? 'md:order-2' : ''}
              >
                <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase mb-3" style={{ color: RG }}>
                  Mushroom Coffee
                </p>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl mb-2" style={{ color: '#FFFFFF' }}>
                  {section.title}
                </h2>
                <p className="font-mono text-[8px] sm:text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(230,183,173,0.5)' }}>
                  {section.subtitle}
                </p>
                <p
                  className="font-heading text-xs sm:text-base leading-relaxed mb-8"
                  style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}
                >
                  {section.description}
                </p>

                {/* Blend List */}
                <div className="space-y-2 sm:space-y-3 mb-8">
                  {section.blends.map((blend, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-3 p-2 sm:p-3 rounded-sm transition-all hover:bg-white/5"
                      style={{ borderLeft: `2px solid ${RG}` }}
                    >
                      <span className="text-xs sm:text-sm mt-0.5" style={{ color: RG }}>✦</span>
                      <p className="font-heading text-xs sm:text-sm" style={{ color: 'rgba(240,235,225,0.8)' }}>
                        {blend}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  to={section.link}
                  className="inline-flex items-center font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold transition-all hover:opacity-80 py-2.5 sm:py-3 px-5 sm:px-6 rounded-sm"
                  style={{
                    background: `${RG}20`,
                    border: `1px solid ${RG}40`,
                    color: RG,
                  }}
                >
                  Shop Mushroom Coffee →
                </Link>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: section.order === 'reverse' ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative overflow-hidden rounded-sm ${section.order === 'reverse' ? 'md:order-1' : ''}`}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto max-h-64 sm:max-h-80 md:max-h-none object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(230,183,173,0.1) 0%, transparent 100%)',
                  }}
                />
              </motion.div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}