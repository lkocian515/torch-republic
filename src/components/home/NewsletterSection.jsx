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
    <section className="py-24 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4">
            Join The Torchbearers
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight mb-4">
            Join the Movement
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Get early access to exclusive drops, insider updates, and special Torchbearer discounts.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-primary font-mono text-sm">
              <Check className="w-5 h-5" />
              Welcome to the movement, Torchbearer.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground font-mono text-sm flex-1"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs tracking-wider px-6"
              >
                Get 10% Off <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}