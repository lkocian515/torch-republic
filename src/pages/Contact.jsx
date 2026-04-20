import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Check, Mail, Package, RotateCcw, Loader, Flame } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [optimisticSubmit, setOptimisticSubmit] = useState(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return { success: true };
    },
    onMutate: () => {
      setOptimisticSubmit(true);
    },
    onSuccess: () => {
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setOptimisticSubmit(false), 2000);
    },
    onError: () => {
      setOptimisticSubmit(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen py-16 px-6" style={{ backgroundColor: '#080808' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="w-5 h-5" style={{ color: '#C9A24A' }} />
            <p className="font-mono text-xs tracking-[0.5em] uppercase" style={{ color: '#C9A24A' }}>
              Torch Republic
            </p>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4" style={{ color: '#FFFFFF' }}>
            Get In Touch
          </h1>
          <p className="mt-4 max-w-md mx-auto" style={{ color: 'rgba(240,235,225,0.65)', fontSize: '1rem', lineHeight: 1.6 }}>
            Questions about your order, our products, or partnership inquiries? We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-8">
            <div style={{ border: '1px solid rgba(201,162,74,0.15)', padding: '24px' }}>
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5" style={{ color: '#C9A24A' }} />
                <h3 className="font-mono text-xs tracking-widest uppercase" style={{ color: '#C9A24A' }}>Primary Email</h3>
              </div>
              <a href="mailto:admin@torchrepublic.com" className="text-sm font-mono transition-colors" style={{ color: '#F0EBE1' }} onMouseEnter={e => e.currentTarget.style.color = '#C9A24A'} onMouseLeave={e => e.currentTarget.style.color = '#F0EBE1'}>
                admin@torchrepublic.com
              </a>
            </div>
            <div style={{ border: '1px solid rgba(201,162,74,0.15)', padding: '24px' }}>
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5" style={{ color: '#C9A24A' }} />
                <h3 className="font-mono text-xs tracking-widest uppercase" style={{ color: '#C9A24A' }}>Support</h3>
              </div>
              <a href="mailto:support@torchrepublic.com" className="text-sm font-mono transition-colors" style={{ color: 'rgba(240,235,225,0.65)' }} onMouseEnter={e => e.currentTarget.style.color = '#C9A24A'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,235,225,0.65)'}>
                support@torchrepublic.com
              </a>
            </div>
            <div style={{ border: '1px solid rgba(201,162,74,0.15)', padding: '24px' }}>
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5" style={{ color: '#C9A24A' }} />
                <h3 className="font-mono text-xs tracking-widest uppercase" style={{ color: '#C9A24A' }}>Shipping</h3>
              </div>
              <p className="text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>
                Free shipping on orders over $100. Standard delivery is 5–7 business days.
              </p>
            </div>
            <div style={{ border: '1px solid rgba(201,162,74,0.15)', padding: '24px' }}>
              <div className="flex items-center gap-3 mb-3">
                <RotateCcw className="w-5 h-5" style={{ color: '#C9A24A' }} />
                <h3 className="font-mono text-xs tracking-widest uppercase" style={{ color: '#C9A24A' }}>Returns</h3>
              </div>
              <p className="text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>
                30-day satisfaction guarantee. Items must be unworn and in original packaging.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {optimisticSubmit ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ border: '1px solid rgba(201,162,74,0.2)', padding: '48px', textAlign: 'center', backgroundColor: '#0A0A0A' }}
              >
                <Check className="w-12 h-12 mx-auto mb-4" style={{ color: '#C9A24A' }} />
                <h3 className="font-serif font-bold uppercase text-xl mb-2" style={{ color: '#FFFFFF' }}>Message Sent</h3>
                <p className="mt-2 text-sm" style={{ color: 'rgba(240,235,225,0.65)' }}>
                  Thank you for reaching out. We'll respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="font-mono text-xs tracking-wider uppercase block mb-2" style={{ color: '#C9A24A' }}>
                    Name
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="Your name"
                    style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(201,162,74,0.15)', color: '#F0EBE1' }}
                    className="font-mono text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-wider uppercase block mb-2" style={{ color: '#C9A24A' }}>
                    Email
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="your@email.com"
                    style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(201,162,74,0.15)', color: '#F0EBE1' }}
                    className="font-mono text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-wider uppercase block mb-2" style={{ color: '#C9A24A' }}>
                    Message
                  </label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="How can we help?"
                    rows={5}
                    style={{ backgroundColor: '#0A0A0A', borderColor: 'rgba(201,162,74,0.15)', color: '#F0EBE1' }}
                    className="font-mono text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-4 font-mono text-sm tracking-widest uppercase min-h-[44px] transition-all hover:opacity-90"
                  style={{ backgroundColor: '#C9A24A', color: '#080808', fontWeight: 800 }}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 inline animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2 inline" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}