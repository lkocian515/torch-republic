import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const RG = '#E6B7AD';

export default function PremiumBrandHero() {
  return (
    <section className="relative px-6 md:px-10 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden" style={{ background: '#080808' }}>
      {/* Ambient torchlight glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(230,183,173,0.15) 0%, rgba(230,183,173,0.05) 40%, transparent 70%)'
      }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-5" style={{ color: RG }}>
              Torch Republic Coffee Company
            </p>
            
            <h1 className="font-serif font-bold mb-6" style={{
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}>
              Who Are You Becoming?
            </h1>
            
            <p className="font-heading mb-10 max-w-xl mx-auto lg:mx-0" style={{
              fontSize: '1.05rem',
              color: 'rgba(240,235,225,0.65)',
              fontWeight: 300,
              lineHeight: 1.8
            }}>
              Functional blends for the person you're becoming. Choose your ritual.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 px-10"
                style={{
                  background: RG,
                  color: '#080808',
                  borderRadius: '4px'
                }}
              >
                Shop the Collection
              </Link>
              <Link
                to="/quiz"
                className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-4 px-10"
                style={{
                  border: `1px solid ${RG}`,
                  color: RG,
                  borderRadius: '4px'
                }}
              >
                Discover Your Ritual
              </Link>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start" style={{
              padding: '16px 20px',
              background: 'rgba(230,183,173,0.05)',
              border: `1px solid ${RG}15`,
              borderRadius: '6px'
            }}>
              {[
                'Premium Instant Format',
                'Functional Mushroom Blends',
                'Matcha Rituals',
                'No Coffee Maker Needed',
                'Crafted for Daily Intention'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={14} style={{ color: RG }} />
                  <span className="font-heading text-[9px] tracking-[0.15em] uppercase" style={{ color: 'rgba(240,235,225,0.6)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Premium Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] md:aspect-square relative rounded-lg overflow-hidden" style={{
              background: 'linear-gradient(135deg, #141312 0%, #0F0E0D 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}>
              <img
                src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/7f4efdbaa_LIVEFREESTAYREADY15x5in.png"
                alt="Torch Republic Premium Coffee Collection"
                className="w-full h-full object-cover"
              />
              {/* Warm overlay glow */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(230,183,173,0.1) 0%, transparent 70%)'
              }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}