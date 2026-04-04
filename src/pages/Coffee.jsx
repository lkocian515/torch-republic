import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Coffee as CoffeeIcon } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Coffee() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    try {
      await base44.integrations.Core.SendEmail({
        to: email,
        subject: 'You\'re on the list — Torch Republic Coffee',
        body: `Welcome to the Founders Series waitlist.\n\nYou'll be among the first to access the Torch Republic Coffee collection when it launches.\n\nStay vigilant.\n\nTorch Republic`
      });
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error('Email signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1200&q=80"
            alt="Coffee"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5) contrast(1.2)', objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <CoffeeIcon className="w-6 h-6" style={{ color: '#C8A44D' }} />
              <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: '#C8A44D' }}>
                Coming Soon
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-heading font-black uppercase tracking-tight text-white mb-4">
              History in<br />Every Cup
            </h1>

            <p className="text-xl text-gray-300 font-serif mb-2">
              The Founders Series is coming.
            </p>

            <p className="text-gray-400 font-mono text-sm max-w-xl leading-relaxed">
              Premium coffee sourced and roasted with the same uncompromising standards as our apparel. 
              Built for those who demand authenticity in every detail.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Email Capture */}
      <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #060D1A 0%, #071E1A 30%, #0B3D35 60%, #070F1E 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(14,42,47,0.6) 0%, transparent 70%)' }} />

        <div className="max-w-[500px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #C8A44D)' }} />
              <Flame className="w-5 h-5" style={{ color: '#C8A44D' }} />
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #C8A44D, transparent)' }} />
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-white mb-4">
              Be First to Access
            </h2>

            <p className="text-gray-400 font-mono text-sm mb-8 tracking-wider">
              Join the waitlist and get exclusive early access to the Founders Series.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 bg-card border border-border rounded text-foreground placeholder-muted-foreground font-mono text-sm"
              />
              <button
                type="submit"
                disabled={loading || submitted}
                className="px-6 py-3 font-mono font-bold text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-50"
                style={{
                  background: submitted 
                    ? 'rgba(72, 187, 120, 0.2)' 
                    : 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C8A44D 100%)',
                  color: submitted ? '#48BB78' : '#fff'
                }}
              >
                {loading ? 'Signing up...' : submitted ? '✓ Confirmed' : 'Join Waitlist'}
              </button>
            </form>

            <p className="text-muted-foreground font-mono text-xs">
              No spam. Just founders, coffee, and the occasional manifesto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Sourcing', desc: 'Direct from small-batch roasters who share our values' },
              { label: 'Quality', desc: 'Single-origin, specialty-grade beans only' },
              { label: 'Identity', desc: 'Founders Series: Every bag tells a story' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="font-heading font-bold text-sm uppercase tracking-wide text-primary mb-2">
                  {item.label}
                </p>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}