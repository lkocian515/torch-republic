import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';
import { Mail, Check, Gift } from 'lucide-react';
import { trackEvent } from '@/lib/analyticsEvents';

const RG = '#E6B7AD';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await base44.entities.EmailSubscriber.create({
        email,
        source: 'research_recipe_pages',
        discount_code: 'WELCOME10',
      });
      
      setIsSubscribed(true);
      trackEvent(
        'generate_lead',
        { source: 'research_recipe_pages', discount_code: 'WELCOME10' },
        `generate_lead::${Date.now()}`
      );
      toast.success('Welcome! Check your email for your 10% off code.');
      setEmail('');
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #0D0D0D 0%, #0A0A0A 100%)',
        borderTop: '1px solid rgba(230,183,173,0.08)',
        borderBottom: '1px solid rgba(230,183,173,0.08)',
        padding: 'clamp(48px, 6vw, 72px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(230,183,173,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-[700px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Gift icon */}
          <div className="flex items-center justify-center mb-4">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(230,183,173,0.1)',
                border: '1px solid rgba(230,183,173,0.25)',
              }}
            >
              <Gift className="w-6 h-6" style={{ color: RG }} />
            </div>
          </div>

          {/* Headline */}
          <h2
            className="font-serif font-bold mb-3"
            style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#F5EFE6',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Get 10% Off Your First Order
          </h2>

          {/* Subheadline */}
          <p
            className="font-heading mb-8"
            style={{
              fontSize: '0.95rem',
              color: 'rgba(210,195,175,0.7)',
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Join the Torch Republic community. Receive science-backed brewing tips, exclusive offers, and your discount code via email.
          </p>

          {/* Form */}
          {isSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 p-4"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.25)',
                borderRadius: '2px',
              }}
            >
              <Check className="w-5 h-5" style={{ color: '#10B981' }} />
              <span className="font-heading" style={{ color: '#10B981', fontSize: '0.95rem' }}>
                You're in! Check your email for the code.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: 'rgba(230,183,173,0.4)' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-3.5 font-heading text-sm transition-all focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(230,183,173,0.2)',
                    color: '#F5EFE6',
                    borderRadius: '2px',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all py-3.5 px-8"
                style={{
                  background: isSubmitting ? 'rgba(230,183,173,0.5)' : RG,
                  color: '#080808',
                  borderRadius: '2px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Sending...' : 'Get My Code →'}
              </button>
            </form>
          )}

          {/* Microcopy */}
          <p
            className="font-mono text-[7px] tracking-[0.2em] uppercase mt-5"
            style={{ color: 'rgba(230,183,173,0.35)' }}
          >
            Free shipping on orders $45+ · Unsubscribe anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}