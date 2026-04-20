import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Flame, BookOpen, Gift } from 'lucide-react';

const AC = '#C9A24A';

export default function WhatsInTheBox() {
  const items = [
    {
      icon: Coffee,
      title: '1–2 Premium Coffee Products',
      detail: 'Whole bean or pods depending on tier. Small-batch roasted, shipped fresh.',
    },
    {
      icon: BookOpen,
      title: 'Historical Collector Card + Story',
      detail: 'Scan the QR code to unlock founder stories, historical facts, and member-exclusive content.',
    },
    {
      icon: Flame,
      title: 'Brew Guide & Tips',
      detail: 'Curated instructions for your coffee, roast profile details, and tasting notes.',
    },
    {
      icon: Gift,
      title: 'Occasional Bonus Items',
      detail: 'Member-exclusive stickers, surprise gifts, and collectible tokens throughout the year.',
    },
  ];

  return (
    <section style={{ backgroundColor: '#0C0C0C', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>
            Every Delivery Includes
          </p>
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
            What's Inside Your Torch Box
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
            A curated experience designed to deepen your connection to Torch Republic coffee and American history.
          </p>
        </motion.div>

        {/* Icons row */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12 px-4 flex-wrap">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-lg"
                  style={{ background: 'rgba(201,162,74,0.1)', border: `1px solid ${AC}40` }}
                >
                  <Icon className="w-6 h-6" style={{ color: AC }} />
                </div>
                <p className="font-mono text-[8px] tracking-widest uppercase text-center max-w-[80px]" style={{ color: AC }}>
                  {item.title.split(' ')[0]}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 flex gap-4"
                style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.1)' }}
              >
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: AC }} />
                <div>
                  <h3 className="font-heading font-bold text-sm mb-1.5" style={{ color: '#F0EBE1' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 300 }}>
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Small note */}
        <div className="text-center mt-10">
          <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Contents may vary slightly to keep each box unique and collectible
          </p>
        </div>
      </div>
    </section>
  );
}