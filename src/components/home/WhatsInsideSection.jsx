import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

const ITEMS = [
  {
    label: 'Patriot Tees',
    desc: 'Premium heavyweight cotton. Washed finish. Built to wear, not just display.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/aeca6b0ad_ffffd.png',
  },
  {
    label: 'Patriot Gear',
    desc: 'Hats, caps, and accessories that carry the message wherever you go.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/242e7dcdb_Untitledfdsfdsf.png',
  },
  {
    label: 'Faith Collection',
    desc: 'God, family, country — worn with pride and purpose.',
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/502eb0c7a_ChatGPTImageMar19202604_32_50AM.png',
  },
  {
    label: 'Freedom Gear',
    desc: "For the ones who know freedom isn't free. Wear it like you mean it.",
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7a14d80e7_ChatGPTImageMar19202604_32_30AM.png',
  },
];

export default function WhatsInsideSection() {
  return (
    <section id="whats-inside" className="py-20 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'rgba(200,164,77,0.3)' }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#C8A44D' }}>What You Get</span>
            <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'rgba(200,164,77,0.3)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-4">
            Built for Patriots.<br />
            <span style={{ color: '#D4AF5A' }}>Made to Last.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Every piece is handpicked for quality, meaning, and staying power. No filler. No fast fashion. Just gear worth wearing.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="font-heading font-black text-sm uppercase tracking-wide text-white mb-1">{item.label}</p>
                <p className="font-mono text-xs leading-relaxed" style={{ color: 'rgba(232,223,175,0.65)' }}>{item.desc}</p>
              </div>
              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to={createPageUrl('BestSellers')}
            className="inline-flex items-center gap-3 font-heading font-black text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200"
            style={{ backgroundColor: '#C8A44D', color: '#000' }}
          >
            Browse the Full Store <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}