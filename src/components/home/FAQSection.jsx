import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const FAQS = [
  {
    q: 'What materials do you use?',
    a: 'We use premium heavyweight cotton (6.0–6.5 oz) for our tees — significantly thicker and more durable than fast-fashion alternatives. Hats are structured 6-panel with quality stitching. Every item is inspected before it ships.',
  },
  {
    q: 'Where do you ship from?',
    a: 'All orders are fulfilled from our U.S.-based facility. Most orders ship within 1–3 business days. You\'ll receive a tracking number by email as soon as your order is on its way.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day hassle-free return or exchange policy. If you\'re not satisfied for any reason, reach out to us and we\'ll make it right — no runaround, no fine print.',
  },
  {
    q: 'Can I gift a Torch Republic order?',
    a: 'Absolutely. Our gear makes a powerful gift for veterans, believers, patriots, and anyone who lives by these values. Add a note at checkout and we\'ll include it in the package.',
  },
  {
    q: 'Do you offer bulk or group orders?',
    a: 'Yes — contact us directly for church groups, veteran organizations, or large orders. We can accommodate custom quantities and discuss special pricing.',
  },
  {
    q: 'How do I know which size to choose?',
    a: 'Each product page includes a size guide. Our tees run true to size. When in doubt, size up for a relaxed fit or stay true to size for a fitted look.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(200,164,77,0.12)' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'rgba(200,164,77,0.3)' }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#C8A44D' }}>Got Questions?</span>
            <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'rgba(200,164,77,0.3)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ items */}
        <div className="space-y-2 mb-12">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              style={{ border: '1px solid rgba(200,164,77,0.15)', backgroundColor: open === i ? 'rgba(200,164,77,0.04)' : 'transparent' }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-heading font-bold text-sm uppercase tracking-wide text-white">{faq.q}</span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: '#C8A44D' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="text-center p-8" style={{ border: '1px solid rgba(200,164,77,0.15)', backgroundColor: 'rgba(200,164,77,0.04)' }}>
          <p className="font-heading font-bold text-white text-sm uppercase tracking-wide mb-2">Still have questions?</p>
          <p className="text-gray-400 text-sm mb-5">We respond to every message. Real people, real answers.</p>
          <Link
            to={createPageUrl('Contact')}
            className="inline-flex items-center justify-center font-mono font-bold text-xs tracking-widest uppercase px-8 py-3 transition-all"
            style={{ border: '1px solid rgba(200,164,77,0.4)', color: '#C8A44D' }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}