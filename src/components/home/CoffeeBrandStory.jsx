import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, BookOpen, Award } from 'lucide-react';

const PILLARS = [
  {
    icon: Coffee,
    title: 'Crafted Profiles',
    body: 'Every Founders Series blend is meticulously developed to match the archetype of its namesake — bold, balanced, or bright. No generic blends. Each roast tells a story.',
  },
  {
    icon: BookOpen,
    title: 'Founder Storytelling',
    body: 'Each coffee honors an American whose ideas, courage, and character shaped the republic. Their story lives in the bag, the card, and every cup you pour.',
  },
  {
    icon: Award,
    title: 'Premium Small-Batch',
    body: 'We source premium Arabica beans and roast in small batches. This isn\'t mass-market coffee — it\'s a curated, collectible series for those who demand quality.',
  },
];

export default function CoffeeBrandStory() {
  return (
    <section className="py-24 px-6 md:px-10" style={{ backgroundColor: '#030303', borderTop: '1px solid rgba(200,164,77,0.06)', borderBottom: '1px solid rgba(200,164,77,0.06)' }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase" style={{ color: '#C8A44D' }}>Why Torch Republic Coffee</span>
          </div>
          <h2 className="font-serif text-white leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 700 }}>
            Coffee is the medium.<br />
            <span style={{ color: '#C8A44D' }}>History is the message.</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Torch Republic exists to preserve, teach, and pass down the ideas that built civilization — through everyday ritual. The flame is yours to carry.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-7"
              style={{ background: 'rgba(14,42,47,0.15)', border: '1px solid rgba(200,164,77,0.1)' }}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-5" style={{ background: 'rgba(200,164,77,0.08)', border: '1px solid rgba(200,164,77,0.2)' }}>
                <p.icon className="w-5 h-5" style={{ color: '#C8A44D' }} />
              </div>
              <h3 className="font-serif text-white mb-3" style={{ fontSize: '1.25rem', fontWeight: 600 }}>{p.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}