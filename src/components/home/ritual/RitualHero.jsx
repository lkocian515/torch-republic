import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Full-bleed lifestyle hero. The image itself carries the brand logo,
// "Ignite Your Daily Ritual" headline, subheadline, and benefit icons, so no
// text is rendered on top of it — only the conversion buttons sit below.
const HERO_IMAGE =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/6a3e5f1c3_file_00000000150481fda5e169b000a0c121.png';

export default function RitualHero() {
  return (
    <section id="top" style={{ background: '#F7F1E7' }}>
      <h1 className="sr-only">Premium Coffee, Mushroom Coffee &amp; Matcha—Ready in Seconds</h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="w-full">
        <img
          src={HERO_IMAGE}
          alt="Torch Republic — premium instant coffee, ceremonial matcha, and instant mushroom coffee. Ignite your daily ritual."
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
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link to="/shop" className="btn btn-primary" style={{ minWidth: '220px' }}>
            Shop All Three
          </Link>
          <a href="#choose-ritual" className="btn btn-ghost" style={{ minWidth: '220px' }}>
            Find Your Ritual
          </a>
        </motion.div>
      </div>
    </section>
  );
}