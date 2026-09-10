import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';
import { SUBSCRIBE_SAVE_PERCENT, SUBSCRIBE_FREQUENCY } from '@/lib/siteConfig';

export default function DriftSubscription() {
  return (
    <section style={{ background: D.espresso }}>
      <div className="mx-auto max-w-[900px] px-6 py-16 md:py-20 text-center">
        <motion.div {...fadeUp}>
          <p style={{ fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: D.terracotta, margin: '0 0 1rem' }}>
            Make It a Routine
          </p>
          <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, color: D.cream, margin: '0 0 1.25rem', textWrap: 'balance' }}>
            Tomorrow&rsquo;s coffee, handled.
          </h2>
          <p style={{ fontFamily: SANS, fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(250,247,241,0.75)', margin: '0 0 2rem', maxWidth: '46ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Choose your coffee and have it delivered {SUBSCRIBE_FREQUENCY.toLowerCase()}. Save {SUBSCRIBE_SAVE_PERCENT}%, pause when needed, or cancel anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center">
            <Link
              to="/subscription"
              className="inline-flex items-center justify-center gap-2"
              style={{ minHeight: 52, padding: '0 2rem', borderRadius: '6px', background: D.terracotta, color: D.cream, fontFamily: SANS, fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none' }}
            >
              Subscribe &amp; Save <ArrowRight size={16} />
            </Link>
            <Link
              to="/subscription"
              style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: 'rgba(250,247,241,0.7)', textDecoration: 'none' }}
            >
              How Subscriptions Work &rarr;
            </Link>
          </div>
          <p style={{ fontFamily: SANS, fontSize: '0.8125rem', color: 'rgba(250,247,241,0.5)', margin: '2rem 0 0' }}>
            Subscribers continue earning Torch Republic rewards.
          </p>
        </motion.div>
      </div>
    </section>
  );
}