import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';

const CLAY = '#B86543';
const BG = '#FBF8F1';
const TEXT = '#3F3027';
const BODY = '#6A5A4A';

export default function TorchbearersRewards() {
  useSEO({
    title: 'Torchbearer Rewards | Torch Republic',
    description: 'Torchbearer Rewards program details are being finalized. Join the waitlist to be notified when the program launches.',
    url: '/torchbearers-rewards',
  });

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `${CLAY}15`, border: `1px solid ${CLAY}30` }}>
            <Mail className="w-6 h-6" style={{ color: CLAY }} />
          </div>

          <p className="font-mono text-[10px] tracking-[0.28em] uppercase mb-4" style={{ color: CLAY }}>
            Torchbearer Rewards
          </p>

          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: TEXT, lineHeight: 1.15 }}>
            Program Details Are Being Finalized
          </h1>

          <p className="font-heading mb-8" style={{ fontSize: '1rem', color: BODY, lineHeight: 1.8 }}>
            We are building a rewards program that is straightforward and
            transparent. Full details &mdash; points per dollar, redemption
            value, tier thresholds, and expiration rules &mdash; will be
            published here once finalized.
          </p>

          <a
            href="/#newsletter"
            className="inline-flex items-center font-mono text-[11px] tracking-[0.2em] uppercase font-bold px-8 py-3.5 transition-opacity hover:opacity-90"
            style={{ background: CLAY, color: '#FBF8F1', borderRadius: '999px' }}
          >
            Join the Waitlist
          </a>

          <div className="mt-8">
            <Link
              to="/shop"
              className="font-heading text-sm transition-opacity hover:opacity-70"
              style={{ color: CLAY }}
            >
              Shop Coffee &rarr;
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}