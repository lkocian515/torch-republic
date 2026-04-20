import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Lock, Gift, Zap } from 'lucide-react';

const AC = '#C9A24A';

export default function OnlyForTorchbearers() {
  const benefits = [
    {
      icon: Zap,
      label: 'Early Access to New Releases',
      detail: 'Get first dibs on limited-edition blends before they hit the public store.',
    },
    {
      icon: Lock,
      label: 'Exclusive Blends Not Sold Publicly',
      detail: 'Member-only roasts you cannot buy anywhere else. Subscriber-exclusive coffee available nowhere else.',
    },
    {
      icon: Star,
      label: 'Member-Only Discounts',
      detail: 'Special pricing on additional purchases, bundles, and seasonal offerings.',
    },
    {
      icon: Gift,
      label: 'Collectible Inserts & Torchbearer Card',
      detail: 'Limited-edition cards, inserts, and tokens that build your collector experience.',
    },
    {
      icon: Flame,
      label: 'Priority Shipping',
      detail: 'Boxes prioritized for faster delivery. The Blaze tier includes free shipping every month.',
    },
    {
      icon: Gift,
      label: 'Surprise Gifts & Bonuses',
      detail: 'Random rewards, early previews, and exclusive member events throughout the year.',
    },
  ];

  return (
    <section style={{ backgroundColor: '#080808', borderTop: '1px solid rgba(201,162,74,0.07)', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-5 h-5" style={{ color: AC }} />
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: AC }}>Premium Membership</p>
            <Flame className="w-5 h-5" style={{ color: AC }} />
          </div>
          <h2 className="font-serif mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Only for Torchbearers
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.7, maxWidth: '520px', margin: '0 auto' }}>
            Being a Torchbearer isn't just subscribing to coffee. It's gaining access to an exclusive membership experience with benefits designed for collectors.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 flex gap-5 group"
                style={{
                  background: `linear-gradient(135deg, rgba(201,162,74,0.04) 0%, rgba(201,162,74,0.01) 100%)`,
                  border: `1px solid ${AC}20`,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${AC}40`;
                  e.currentTarget.style.background = `linear-gradient(135deg, rgba(201,162,74,0.08) 0%, rgba(201,162,74,0.03) 100%)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${AC}20`;
                  e.currentTarget.style.background = `linear-gradient(135deg, rgba(201,162,74,0.04) 0%, rgba(201,162,74,0.01) 100%)`;
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-lg"
                  style={{ background: `${AC}15`, border: `1px solid ${AC}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: AC }} />
                </div>
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: AC }}>
                    {benefit.label}
                  </h3>
                  <p style={{ color: 'rgba(240,235,225,0.6)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300 }}>
                    {benefit.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}