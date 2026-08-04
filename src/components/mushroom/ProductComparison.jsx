import React from 'react';
import { motion } from 'framer-motion';

export default function ProductComparison() {
  const showcases = [
    {
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/106074bc1_ChatGPTImageJun6202609_40_24PM.png',
      alt: 'Torchbearer Premium Coffee',
    },
    {
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2ff2e1875_ChatGPTImageJun6202609_40_38PM.png',
      alt: 'Mushroom Coffee Collection - Ember Reserve',
    },
    {
      image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/e3ce414ad_ChatGPTImageJun6202609_41_50PM.png',
      alt: 'Matcha Collection - The Monk, The Ascendant, The Alchemist',
    },
  ];

  return (
    <section className="px-6 md:px-10 py-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {showcases.map((showcase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded"
              style={{ 
                background: '#0A0A0A',
                border: '1px solid rgba(230,183,173,0.15)',
              }}
            >
              <img
                src={showcase.image}
                alt={showcase.alt}
                className="w-full h-auto block"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}