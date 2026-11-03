import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FOUNDER_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6a42aa9c8_generated_image.png';

// Founder trust section — photo-and-copy split layout.
// Attributes the brand vision to Lisa Kocian, Founder.
export default function RitualFounderTrust() {
  return (
    <section style={{ background: '#F7F2E9' }}>
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1"
          >
            <div className="overflow-hidden" style={{ borderRadius: '12px', aspectRatio: '4 / 5' }}>
              <img
                src={FOUNDER_IMAGE}
                alt="A quiet morning coffee ritual on a wooden desk"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: '#9B4E2F' }}>
              Why Torch Republic Exists
            </p>
            <blockquote
              className="mt-5 font-serif"
              style={{ fontSize: 'clamp(1.3rem,2.5vw,1.7rem)', color: '#32190F', lineHeight: 1.4, textWrap: 'balance' }}
            >
              &ldquo;I wanted a morning ritual that removed friction, not added it.
              No machine, no pods &mdash; just a better cup, made intentionally.&rdquo;
            </blockquote>

            <Link
              to="/founder-story"
              className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold transition-opacity hover:opacity-75"
              style={{ color: '#9B4E2F' }}
            >
              Read the Founder Story <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}