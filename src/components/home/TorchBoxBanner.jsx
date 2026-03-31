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
            Limited quantities. Exclusive items. Get on the waitlist before it's gone.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Exclusive Gear', 'Limited Quantities', 'Patriot Curated', 'Ships Soon'].map((tag) => (
              <span key={tag} className="font-mono text-xs tracking-wider uppercase px-3 py-1.5 border border-border text-muted-foreground">
                {tag}
              </span>
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