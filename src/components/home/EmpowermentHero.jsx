import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Target } from 'lucide-react';

const RG = '#E6B7AD';

const PILLARS = [
  { icon: Flame, label: 'Ignite Your Power', desc: 'Rewrite your story' },
  { icon: Sparkles, label: 'Refuse to Dim', desc: 'Your light matters' },
  { icon: Target, label: 'Join the Republic', desc: 'Carry the torch' },
];

export default function EmpowermentHero() {
  return (
    <section className="relative px-6 md:px-10 py-24 md:py-32" style={{ backgroundColor: '#080808' }}>
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(230,183,173,0.08) 0%, transparent 70%)' }} />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-6" style={{ color: RG }}>
            A Movement for the Unbroken
          </p>
          
          <h1 className="font-serif font-bold text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
            Ignite Your Power.<br />Rewrite Your Story.
          </h1>
          
          <p className="font-heading max-w-2xl mx-auto mb-10" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', color: 'rgba(240,235,225,0.65)', lineHeight: 1.9, fontWeight: 300 }}>
            Torch Republic is a movement for people who refuse to dim their light. Premium instant coffee, mushroom coffee, and matcha blends crafted for clarity, resilience, and intentional daily ritual.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 px-10"
              style={{ background: RG, color: '#080808', borderRadius: '4px', boxShadow: '0 8px 24px rgba(230,183,173,0.2)' }}
            >
              Join the Republic →
            </Link>
            <Link
              to="/mission"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-4 px-10"
              style={{ border: `1px solid ${RG}`, color: RG, borderRadius: '4px' }}
            >
              Our Story
            </Link>
          </div>
        </motion.div>

        {/* Three Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {PILLARS.map((pillar, i) => (
            <div key={i} className="text-center p-6" style={{ background: 'rgba(15,14,13,0.6)', border: `1px solid ${RG}15`, borderRadius: '6px' }}>
              <div className="mb-4 flex justify-center">
                <pillar.icon size={28} style={{ color: RG }} />
              </div>
              <p className="font-serif font-bold text-white text-sm mb-1">{pillar.label}</p>
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase" style={{ color: `${RG}60` }}>{pillar.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}