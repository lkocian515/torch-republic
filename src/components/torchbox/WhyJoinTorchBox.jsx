import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Lock, Zap, Sparkles, Gift } from 'lucide-react';

const AC = '#E6AC45';

export default function WhyJoinTorchBox() {
  const reasons = [
    {
      icon: TrendingDown,
      title: 'Save Up to 15%',
      detail: 'Member pricing beats one-time purchases every single time.',
    },
    {
      icon: Lock,
      title: 'Exclusive Blends',
      detail: 'Access roasts never sold publicly. Member-only editions.',
    },
    {
      icon: Zap,
      title: 'Early Access',
      detail: 'First to know about new releases and limited drops.',
    },
    {
      icon: Sparkles,
      title: 'Collectible Series',
      detail: 'Build your historical collection one month at a time.',
    },
    {
      icon: Gift,
      title: 'Surprise Bonuses',
      detail: 'Exclusive items and rewards in every box.',
    },
  ];

  return (
    <section style={{ backgroundColor: '#0C0C0C', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(201,162,74,0.5)' }}>
            Why Choose Torch Box
          </p>
          <h2 className="font-serif mb-4" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F7F2E9', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Why Join the Torchbearers
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6, maxWidth: '520px', margin: '0 auto' }}>
            More than a subscription. A membership system built around collecting premium coffee and American history.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 flex flex-col items-center text-center"
                style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.1)' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-lg mb-4"
                  style={{ background: `${AC}18`, border: `1px solid ${AC}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: AC }} />
                </div>
                <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: AC }}>
                  {reason.title}
                </h3>
                <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.8rem', lineHeight: 1.6, fontWeight: 300 }}>
                  {reason.detail}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}