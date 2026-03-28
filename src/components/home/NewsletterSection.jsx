import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Check } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#000', borderTop: '1px solid rgba(200,164,77,0.12)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'rgba(200,164,77,0.3)' }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#C8A44D' }}>Join the Torchbearers</span>
            <div className="h-px flex-1 max-w-16" style={{ backgroundColor: 'rgba(200,164,77,0.3)' }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-3">
            Get 10% Off Your First Order
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Join 50,000+ patriots. Get early drops, exclusive discounts, and zero spam.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 font-mono text-sm" style={{ color: '#C8A44D' }}>
              <Check className="w-5 h-5" />
              Welcome to the movement. Check your inbox.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 font-mono text-sm"
                style={{ backgroundColor: '#111', border: '1px solid rgba(200,164,77,0.25)', color: '#fff' }}
              />
              <button
                type="submit"
                className="px-6 py-3 font-heading font-black text-xs tracking-widest uppercase whitespace-nowrap"
                style={{ backgroundColor: '#C8A44D', color: '#000' }}
              >
                Claim 10% Off
              </button>
            </form>
          )}
          <p className="text-gray-600 text-xs font-mono mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}