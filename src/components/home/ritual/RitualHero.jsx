import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RitualSocialProof from './RitualSocialProof';

// Hero image — note: this image has "Ignite Your Daily Ritual" baked into the
// artwork. It should eventually be replaced with a clean product photograph.
// For now it remains the strongest available visual asset.
const HERO_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/ffa76f790_ChatGPTImageSep9202602_36_24AM.png';

export default function RitualHero() {
  return (
    <section id="top" style={{ background: '#F7F2E9' }}>
      {/* Visible H1 for SEO and accessibility */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <img
          src={HERO_IMAGE}
          alt="Torch Republic premium instant coffee and mushroom coffee bags."
          width={1600}
          height={1000}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          draggable={false}
          className="block h-auto w-full select-none"
          onError={(e) => {
            e.currentTarget.style.visibility = 'hidden';
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-[1240px] px-6 py-8 md:px-10 md:py-10">
        {/* Visually hidden H1 — the hero image has marketing text baked in.
            A clean hero image without baked-in text is still needed; until then
            the visible headline is suppressed to avoid duplication. */}
        <h1 className="sr-only">Better mornings, in an instant. Premium instant coffee and mushroom coffee.</h1>

        {/* Genuine review proof (live data from stored reviews) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-5"
        >
          <RitualSocialProof />
        </motion.div>

        {/* Primary + secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link to="/shop" className="btn btn-primary" style={{ minWidth: '220px' }}>
            Shop Coffee
          </Link>
          <a href="#choose-ritual" className="btn btn-ghost" style={{ minWidth: '220px' }}>
            Compare the Two
          </a>
        </motion.div>
      </div>
    </section>
  );
}