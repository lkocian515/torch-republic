import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Truck, RotateCcw } from 'lucide-react';

const TRUST_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    bullets: ['256-bit SSL encryption', 'Card details never stored', 'Bank-level security'],
  },
  {
    icon: Truck,
    title: 'Fast U.S. Shipping',
    bullets: ['Ships in 1–3 business days', 'Tracking number by email', 'U.S.-based fulfillment'],
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    bullets: ['Full refund or exchange', 'No questions asked', 'Just reach out & we handle it'],
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    bullets: ['Every item inspected before ship', 'Premium heavyweight materials', 'We make it right, period'],
  },
];

export default function TrustSection() {
  return (
    <section className="py-14 px-6 bg-card/40 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-2">Our Promise to You</p>
          <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight">
            Shop With Total Confidence
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">
            We're not just another store. We're patriots serving patriots — and we take that seriously.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {TRUST_CARDS.map(({ icon: Icon, title, bullets }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 flex flex-col gap-4"
              style={{ border: '1px solid rgba(200,164,77,0.15)', backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(200,164,77,0.1)', border: '1px solid rgba(200,164,77,0.3)' }}>
                  <Icon className="w-5 h-5" style={{ color: '#C8A44D' }} />
                </div>
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-white">{title}</h3>
              </div>
              <ul className="space-y-1.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-xs mt-0.5" style={{ color: '#C8A44D' }}>✓</span>
                    <span className="text-gray-400 text-xs">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Payment badges row */}
        <div className="text-center">
          <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase mb-4">Accepted Payment Methods</p>
          <div className="flex items-center justify-center flex-wrap gap-3">
            {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL', 'APPLE PAY', 'GOOGLE PAY'].map((method) => (
              <div key={method} className="px-4 py-2 border border-border bg-card text-xs font-mono font-bold tracking-wider text-muted-foreground">
                {method}
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-xs mt-4 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" style={{ color: '#C8A44D' }} />
            All transactions are secured and encrypted. We never store your card details.
          </p>
        </div>
      </div>
    </section>
  );
}