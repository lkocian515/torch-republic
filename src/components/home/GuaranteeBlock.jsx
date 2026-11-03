import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, RefreshCw } from 'lucide-react';

const ITEMS = [
  { icon: RefreshCw, title: '30-Day Guarantee', desc: 'Not happy? Return it. No questions.' },
  { icon: Lock, title: 'Secure Checkout', desc: 'Powered by Shopify — bank-level encryption.' },
  { icon: ShieldCheck, title: 'No-Risk Purchase', desc: 'Every order is protected and backed.' },
];

export default function GuaranteeBlock() {
  return (
    <section className="py-14 px-6" style={{ backgroundColor: '#060D18', borderTop: '1px solid rgba(212,175,90,0.1)', borderBottom: '1px solid rgba(212,175,90,0.1)' }}>
      <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #070F1E, #0B3D35)', border: '1px solid rgba(212,175,90,0.3)' }}>
                <Icon className="w-4 h-4" style={{ color: '#E6AC45' }} />
              </div>
              <div>
                <p className="font-heading font-bold text-sm uppercase tracking-wide text-white">{item.title}</p>
                <p className="font-mono text-[11px] tracking-wide mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}