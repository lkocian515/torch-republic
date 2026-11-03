import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Check, Loader } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [optimisticSubmit, setOptimisticSubmit] = useState(false);

  const mutation = useMutation({
    mutationFn: async (emailValue) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return { success: true };
    },
    onMutate: () => {
      setOptimisticSubmit(true);
    },
    onSuccess: () => {
      setEmail('');
      setTimeout(() => setOptimisticSubmit(false), 2000);
    },
    onError: () => {
      setOptimisticSubmit(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      mutation.mutate(email);
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
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, transparent, #09243A)' }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#E6AC45' }}>Become a Torchbearer</span>
            <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #E6AC45, transparent)' }} />
          </div>
          <h2 className="font-serif text-white mb-3" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700 }}>
            Carry the Flame First.
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Access exclusive blends, early drops, and members-only releases. Built for those who stand firm — not the general public.
          </p>

          {optimisticSubmit ? (
            <div className="flex items-center justify-center gap-2 font-mono text-sm" style={{ color: '#E6AC45' }}>
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
                disabled={mutation.isPending}
                required
                className="flex-1 font-mono text-sm"
                style={{ backgroundColor: '#111', border: '1px solid rgba(200,164,77,0.25)', color: '#fff' }}
              />
              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-6 py-3 font-heading font-black text-xs tracking-widest uppercase whitespace-nowrap min-h-[44px] flex items-center justify-center disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #09243A 0%, #09243A 50%, #E6AC45 100%)', color: '#fff', boxShadow: '0 4px 20px rgba(14,42,47,0.4)' }}
              >
                {mutation.isPending ? <Loader className="w-4 h-4 animate-spin" /> : 'Join Now'}
              </button>
            </form>
          )}
          <p className="text-gray-600 text-xs font-mono mt-4">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}