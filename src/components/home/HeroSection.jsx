import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RG = '#E6B7AD';

const trustPills = [
  'No machine needed',
  '27 servings per tube',
  'Mix any 3 blends & save',
  '30-day guarantee',
];

export default function HeroSection() {
  return (
    <div style={{ background: '#080808' }}>
      {/* Hero Banner Image — full width, natural height, no cropping */}
      <img
        src="https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/42734023d_825b7542-f15b-40dc-9460-fde30e083274.png"
        alt="Fuel Your Ritual. Elevate Your Life. — Torch Republic Coffee Co. Premium instant coffee, mushroom coffee and matcha."
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {/* CTAs + Trust pills below image */}
      <section
        className="px-6 md:px-10 py-10 md:py-14 text-center"
        style={{ background: 'linear-gradient(180deg, #0A0807 0%, #080808 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link
            to="/build-your-ritual"
            className="font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{ background: RG, color: '#080808', padding: '16px 40px', display: 'inline-block' }}
          >
            Build Your Ritual Bundle →
          </Link>
          <Link
            to="/shop"
            className="font-mono text-[10px] tracking-[0.3em] uppercase font-bold transition-all hover:opacity-75"
            style={{ border: '1px solid rgba(230,183,173,0.4)', color: RG, padding: '16px 32px', display: 'inline-block' }}
          >
            Shop All Blends
          </Link>
        </motion.div>

        {/* Trust pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {trustPills.map((pill, i) => (
            <span
              key={i}
              className="font-mono text-[7.5px] tracking-[0.2em] uppercase"
              style={{ color: 'rgba(230,183,173,0.4)' }}
            >
              ✦ {pill}
            </span>
          ))}
        </motion.div>
      </section>
    </div>
  );
}