import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';

export default function TorchBoxBanner() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E2A2F] via-black to-[#1a0a00]" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #C8A44D 0%, transparent 50%), radial-gradient(circle at 80% 50%, #8B1A00 0%, transparent 50%)',
        }}
      />
      {/* Animated flame glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C8A44D33 0%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-primary/40 px-4 py-1.5 mb-6 bg-primary/5">
            <Flame className="w-3 h-3 text-primary" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-primary">Coming Soon</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight leading-none mb-4">
            The{' '}
            <span style={{ color: '#C8A44D' }}>Torch Box</span>
            <br />
            <span className="text-2xl md:text-3xl font-mono font-normal tracking-widest text-muted-foreground mt-2 block">
              Is Coming
            </span>
          </h2>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6 mb-8">
            A curated box of patriotic gear hand-picked for true Torchbearers. 
            Limited quantities. Exclusive items. Three tiers of fire.
          </p>

          {/* Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-3xl mx-auto">
            {[
              { name: 'Ember', price: '$49/mo', desc: '3–4 curated items, apparel + accessories', color: '#9B7B2F' },
              { name: 'Beacon', price: '$79/mo', desc: '5–7 items, premium gear + exclusives', color: '#C8A44D', featured: true },
              { name: 'Blaze', price: '$129/mo', desc: '8–10 items, limited drops + signed gear', color: '#E4C46A' },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`relative border p-5 text-left transition-all ${tier.featured ? 'border-primary bg-primary/5 scale-105' : 'border-border/50 bg-black/30'}`}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase" style={{ backgroundColor: '#C8A44D', color: '#000' }}>Most Popular</span>
                )}
                <p className="font-heading font-black text-lg uppercase tracking-wider" style={{ color: tier.color }}>{tier.name}</p>
                <p className="font-mono font-bold text-2xl text-white mt-1">{tier.price}</p>
                <p className="text-muted-foreground text-xs mt-2 leading-relaxed">{tier.desc}</p>
              </div>
            ))}
          </div>

          <a
            href="https://torchbearer-nation.sintra.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 font-mono text-sm tracking-widest uppercase font-bold transition-all hover:scale-105"
            style={{ backgroundColor: '#C8A44D', color: '#000' }}
          >
            <Flame className="w-4 h-4" />
            Join the Waitlist
            <ArrowRight className="w-4 h-4" />
          </a>

          <p className="font-mono text-xs text-muted-foreground mt-4 tracking-wider">
            Strictly for Torch Box updates — no spam, no ads, ever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}