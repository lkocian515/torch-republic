import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Truck, X, CheckCircle } from 'lucide-react';

const AC = '#C9A24A';

export default function SubscriptionTerms() {
  const terms = [
    {
      icon: Calendar,
      label: 'Billing Frequency',
      detail: 'Charged monthly on the same day you subscribe. Cancel or adjust anytime before your next billing date.',
    },
    {
      icon: Truck,
      label: 'Shipping Timing',
      detail: 'Boxes ship within 3–5 business days of billing. You'll receive tracking info via email.',
    },
    {
      icon: X,
      label: 'Cancel Anytime',
      detail: 'No contracts. No commitments. Manage or cancel from your account dashboard in seconds.',
    },
    {
      icon: CheckCircle,
      label: 'Satisfaction Guaranteed',
      detail: 'Don't love it? Let us know, and we'll make it right. Your membership is risk-free.',
    },
  ];

  return (
    <section style={{ backgroundColor: '#0A0A0A', borderBottom: '1px solid rgba(201,162,74,0.07)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(201,162,74,0.5)' }}>
            Complete Transparency
          </p>
          <h2 className="font-serif mb-3" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#F0EBE1', fontWeight: 800, letterSpacing: '-0.02em' }}>
            How Your Subscription Works
          </h2>
          <p style={{ color: 'rgba(240,235,225,0.5)', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6, maxWidth: '500px', margin: '0 auto' }}>
            No surprises. No hidden fees. Just premium coffee, delivered monthly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {terms.map((term, i) => {
            const Icon = term.icon;
            return (
              <motion.div
                key={term.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 flex gap-4"
                style={{ background: '#0F0F0F', border: '1px solid rgba(201,162,74,0.12)' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg"
                  style={{ background: 'rgba(201,162,74,0.12)', border: `1px solid ${AC}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: AC }} />
                </div>
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold mb-2" style={{ color: AC }}>
                    {term.label}
                  </h3>
                  <p style={{ color: 'rgba(240,235,225,0.55)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300 }}>
                    {term.detail}
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