import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { D, SERIF, SANS, MONO, fadeUp } from './driftTheme';

/**
 * Customer feedback.
 *
 * Torch Republic has not yet collected enough verified, permissioned customer
 * reviews to publish quotes, reviewer names or an aggregate rating, so this
 * section invents none of them. It invites feedback instead and links to the
 * review page, where every entry is submitted by a customer through the site's
 * own form.
 */
export default function DriftReviews() {
  return (
    <section style={{ background: D.paper }} aria-labelledby="feedback-heading">
      <div className="mx-auto max-w-[720px] px-6 py-16 md:py-20">
        <motion.div {...fadeUp} className="text-center">
          <p
            style={{
              fontFamily: MONO,
              fontSize: '0.7rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: D.terracotta,
              margin: '0 0 1rem',
            }}
          >
            Customer Feedback
          </p>

          <h2
            id="feedback-heading"
            style={{
              fontFamily: SERIF,
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)',
              lineHeight: 1.1,
              color: D.ink,
              margin: 0,
              textWrap: 'balance',
            }}
          >
            Real reviews only.
          </h2>

          <p
            style={{
              fontFamily: SANS,
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: D.secondary,
              margin: '1.25rem auto 0',
              maxWidth: '52ch',
            }}
          >
            We are still collecting feedback from our first customers. A review only appears here once
            someone has actually written one, so nothing on this page is invented.
          </p>

          <Link
            to="/reviews"
            className="group tr-btn-lift mt-8 inline-flex items-center justify-center gap-2"
            style={{
              minHeight: 48,
              padding: '0 2rem',
              borderRadius: 6,
              background: D.espresso,
              color: D.cream,
              fontFamily: SANS,
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 3px 10px rgba(36,26,22,0.12)',
            }}
          >
            Share your feedback
            <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}