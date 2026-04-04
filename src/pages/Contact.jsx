import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Check, Mail, Package, RotateCcw, Loader } from 'lucide-react';

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
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tight">
            Get In Touch
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto">
            Questions about your order, our products, or just want to say hello? 
            We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-8">
            <div className="border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-primary" />
                <h3 className="font-mono text-xs tracking-widest uppercase text-foreground">Email</h3>
              </div>
              <p className="text-muted-foreground text-sm font-mono">
                support@torchrepublic.com
              </p>
            </div>
            <div className="border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <Package className="w-5 h-5 text-primary" />
                <h3 className="font-mono text-xs tracking-widest uppercase text-foreground">Shipping</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Free shipping on all orders over $100. Standard delivery takes 5-7 business days.
              </p>
            </div>
            <div className="border border-border p-6">
              <div className="flex items-center gap-3 mb-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                <h3 className="font-mono text-xs tracking-widest uppercase text-foreground">Returns</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Easy returns within 30 days of purchase. Items must be unworn and in original condition.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {optimisticSubmit ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-primary/30 p-12 text-center"
              >
                <Check className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-heading font-bold uppercase">Message Sent</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-foreground font-mono text-xs tracking-wider uppercase block mb-2">
                    Name
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="Your name"
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground font-mono text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-foreground font-mono text-xs tracking-wider uppercase block mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="your@email.com"
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground font-mono text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-foreground font-mono text-xs tracking-wider uppercase block mb-2">
                    Message
                  </label>
                  <Textarea
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    placeholder="How can we help?"
                    rows={5}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground font-mono text-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 font-mono text-sm tracking-widest uppercase min-h-[44px]"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}