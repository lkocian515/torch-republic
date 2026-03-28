import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Truck, RotateCcw } from 'lucide-react';

const TRUST_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Secure & Encrypted Checkout',
    body: 'Every transaction is protected with 256-bit SSL encryption. Your payment info is never stored — period. We use the same security standards as major banks.',
  },
  {
    icon: Truck,
    title: 'Fast U.S. Shipping',
    body: 'Orders ship within 1–3 business days from our U.S. facility. You\'ll get a tracking number the moment your order is on its way — no guessing.',
  },
  {
    icon: RotateCcw,
    title: 'Hassle-Free 30-Day Returns',
    body: 'Not 100% satisfied? Return it within 30 days for a full refund or exchange. No hoops, no fine print, no questions asked. Just reach out and we\'ll handle it.',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    body: 'Every item is inspected before it ships. We stand behind the craftsmanship of every tee, hat, and accessory. If something\'s not right, we make it right.',
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
          {TRUST_CARDS.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background border border-border p-6 text-center flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C8A44D15', border: '1px solid #C8A44D55' }}>
                <Icon className="w-6 h-6" style={{ color: '#C8A44D' }} />
              </div>
              <h3 className="font-heading font-bold text-sm uppercase tracking-wide text-foreground">{title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{body}</p>
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