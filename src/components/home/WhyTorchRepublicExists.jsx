import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Zap, Trash2, Settings2 } from 'lucide-react';

const RG = '#E6AC45';

const PILLARS = [
  { icon: Settings2, title: 'No Machine', detail: 'No counter-hogging brewer. No descaling. No proprietary hardware to buy or maintain.' },
  { icon: Trash2, title: 'No Pods', detail: 'No single-use pods. No machine to buy, descale, or replace.' },
  { icon: Zap, title: 'No Complexity', detail: 'No grind, no tamp, no cleanup. Just hot water and a spoon.' },
  { icon: Coffee, title: 'No Compromise', detail: 'Premium single-origin coffee that actually tastes like coffee.' },
];

export default function WhyTorchRepublicExists() {
  return (
    <section className="px-6 md:px-10 py-16 md:py-24" style={{ background: '#080808' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
            Why Torch Republic Exists
          </p>
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#F7F2E9', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            The Convenience of a Pod.<br />Without the Pod.
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ fontSize: '1rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.9 }}>
            Our founder started Torch Republic with a simple frustration: pod coffee was convenient, but everything around it wasn't. The machines cluttered the counter. The pods piled up in landfills. The proprietary formats locked you in. And the coffee itself was rarely great.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {PILLARS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 flex items-start gap-4"
              style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.1)' }}
            >
              <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: `${RG}12`, border: `1px solid ${RG}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <item.icon size={20} style={{ color: RG }} />
              </div>
              <div>
                <h3 className="font-serif font-bold mb-2" style={{ fontSize: '1.1rem', color: '#F7F2E9' }}>{item.title}</h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-7 text-center"
          style={{ background: `${RG}06`, border: `1px solid ${RG}18` }}
        >
          <p className="font-heading" style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.8)', fontWeight: 300, lineHeight: 1.9 }}>
            One tube. 27 servings. Hot water. That's the whole ritual.
          </p>
        </motion.div>
      </div>
    </section>
  );
}