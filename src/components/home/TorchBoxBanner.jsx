import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Crown } from 'lucide-react';

const TIERS = [
  {
    name: 'Ember',
    Icon: Flame,
    price: '$29',
    color: '#e05a2b',
    borderColor: 'rgba(224,90,43,0.4)',
    badge: 'Starter',
    featured: false,
    items: ['1 Exclusive Tee', 'Patriot Sticker Pack', 'Monthly Newsletter'],
  },
  {
    name: 'Beacon',
    Icon: Star,
    price: '$49',
    color: '#C8A44D',
    borderColor: 'rgba(200,164,77,0.6)',
    badge: 'Most Popular',
    featured: true,
    items: ['2 Exclusive Items', 'Limited Hat or Accessory', 'Early Access Drops', 'Discount Code'],
  },
  {
    name: 'Blaze',
    Icon: Crown,
    price: '$79',
    color: '#E4C46A',
    borderColor: 'rgba(228,196,106,0.5)',
    badge: 'Elite',
    featured: false,
    items: ['3–4 Premium Items', 'Exclusive Collectible', 'VIP Early Access', 'Free Shipping Always', 'Member-Only Gear'],
  },
];

export default function TorchBoxBanner() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E2A2F] via-black to-[#1a0a00]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #C8A44D 0%, transparent 50%), radial-gradient(circle at 80% 50%, #8B1A00 0%, transparent 50%)' }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 border border-primary/40 px-4 py-1.5 mb-6 bg-primary/5">
            <Flame className="w-3 h-3 text-primary" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">Premium Subscription Box</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight leading-none mb-4">
            The <span style={{ color: '#C8A44D' }}>Torch Box</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Hand-curated patriotic gear delivered monthly. Limited quantities. Exclusive drops. Pick your flame.
          </p>
        </motion.div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {TIERS.map((tier, i) => {
            const Icon = tier.Icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 border"
                style={{
                  borderColor: tier.borderColor,
                  background: tier.featured ? 'rgba(200,164,77,0.05)' : 'rgba(255,255,255,0.02)',
                  boxShadow: tier.featured ? `0 0 30px rgba(200,164,77,0.1)` : 'none',
                }}
              >
                {/* Badge */}
                <div
                  className="absolute -top-3 left-4 px-3 py-0.5 font-mono text-[10px] tracking-widest uppercase font-black"
                  style={tier.featured
                    ? { backgroundColor: '#C8A44D', color: '#000' }
                    : { border: `1px solid ${tier.borderColor}`, color: tier.color, background: '#000' }
                  }
                >
                  {tier.badge}
                </div>

                <div className="flex items-center gap-3 mb-4 mt-2">
                  <Icon className="w-5 h-5" style={{ color: tier.color }} />
                  <span className="font-heading font-black text-xl uppercase tracking-wider" style={{ color: tier.color }}>
                    {tier.name}
                  </span>
                </div>

                <div className="mb-5">
                  <span className="font-mono font-bold text-3xl text-foreground">{tier.price}</span>
                  <span className="font-mono text-xs text-muted-foreground">/mo</span>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-mono text-xs text-muted-foreground">
                      <span style={{ color: tier.color }}>✓</span> {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://torchbearer-nation.sintra.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 font-mono text-xs tracking-widest uppercase font-bold transition-all hover:opacity-90 border"
                  style={tier.featured
                    ? { backgroundColor: '#C8A44D', color: '#000', borderColor: '#C8A44D' }
                    : { borderColor: tier.borderColor, color: tier.color }
                  }
                >
                  Join {tier.name} →
                </a>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center font-mono text-xs text-muted-foreground tracking-wider">
          Cancel anytime · Ships to all 50 states · Torchbearers only
        </p>
      </div>
    </section>
  );
}