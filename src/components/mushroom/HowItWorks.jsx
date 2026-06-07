import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Coffee, Droplet, RotateCcw, Flame } from 'lucide-react';

const RG = '#E6B7AD';

const STEPS = [
  { icon: Coffee, title: 'Scoop', desc: 'Add one serving to your mug.' },
  { icon: Droplet, title: 'Pour', desc: 'Use hot water, cold water, milk, or creamer.' },
  { icon: RotateCcw, title: 'Stir', desc: 'No machine, no pods, no complicated setup.' },
  { icon: Flame, title: 'Carry the Flame', desc: 'Start your day with purpose.' },
];

export default function HowItWorks() {
  return (
    <section style={{ background: '#080808', padding: 'clamp(60px,8vw,100px) 24px', borderTop: '1px solid rgba(230,183,173,0.08)' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-3" style={{ color: RG }}>
            Simple Ritual
          </p>
          <h2 className="font-serif font-bold mb-3" style={{ fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Your Ritual in Seconds
          </h2>
          <p className="font-heading text-sm max-w-xl mx-auto" style={{ color: 'rgba(210,195,175,0.55)', fontWeight: 300, lineHeight: 1.75 }}>
            Scoop. Pour. Stir. Carry the Flame.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="mx-auto mb-4 flex items-center justify-center"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: `rgba(230,183,173,0.08)`,
                  border: `1px solid ${RG}25`,
                }}
              >
                <step.icon size={24} style={{ color: RG }} />
              </div>
              <h3 className="font-serif font-bold mb-2" style={{ color: '#F5EFE6', fontSize: '1.1rem' }}>{step.title}</h3>
              <p className="font-heading text-sm" style={{ color: 'rgba(245,239,230,0.6)', lineHeight: 1.7 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/shop"
            className="inline-flex items-center font-mono text-[10px] tracking-[0.28em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: RG, color: '#050505', padding: '14px 36px', borderRadius: '999px' }}
          >
            Shop All Blends
          </Link>
        </div>
      </div>
    </section>
  );
}