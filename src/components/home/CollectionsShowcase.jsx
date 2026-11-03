import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6AC45';
const EMERALD = '#264A35';

export default function CollectionsShowcase() {
  const collections = [
    {
      title: 'Classic Coffees',
      description: 'Premium instant arabica with distinct roast profiles — from smooth and balanced to bold and intense.',
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/35f19912f_ChatGPTImageJun7202612_09_33PM.png',
      link: '/classic-coffee',
      color: RG,
      accent: 'Torchbearer, Ember Reserve',
    },
    {
      title: 'Ceremonial Matcha',
      description: 'Highest grade ceremonial matcha blends infused with intention — for focus, energy, and transformation.',
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8aff3f559_ChatGPTImageJun7202612_09_46PM.png',
      link: '/matcha',
      color: EMERALD,
      accent: 'The Monk, The Ascendant, The Alchemist',
    },
  ];

  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ backgroundColor: '#080808', borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {collections.map((collection, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link to={collection.link} className="group cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="relative mb-6 overflow-hidden rounded-sm h-64 sm:h-80 md:h-[500px]">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, rgba(${
                        collection.color === RG ? '230,183,173' : '16,185,129'
                      },0.1) 0%, transparent 100%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p
                    className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase mb-3"
                    style={{ color: collection.color }}
                  >
                    Collection
                  </p>
                  <h3
                    className="font-serif font-bold text-xl sm:text-2xl md:text-3xl mb-3 transition-colors duration-300 group-hover:opacity-80"
                    style={{ color: '#FFFCF7' }}
                  >
                    {collection.title}
                  </h3>
                  <p
                    className="font-heading text-xs sm:text-sm md:text-base mb-6 leading-relaxed"
                    style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.7 }}
                  >
                    {collection.description}
                  </p>
                  <p
                    className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase mb-6"
                    style={{ color: 'rgba(230,183,173,0.5)' }}
                  >
                    {collection.accent}
                  </p>
                  <div
                    className="inline-flex items-center font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-bold transition-all group-hover:opacity-80 py-2 px-4 rounded-sm"
                    style={{
                      background: `${collection.color}15`,
                      border: `1px solid ${collection.color}30`,
                      color: collection.color,
                    }}
                  >
                    Explore →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}