import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO =
  'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/bfb0f8f0f_generated_image.png';

export default function NatureRitualBanner() {
  return (
    <section style={{ background: '#FBF8F1' }}>
      {/* Full-bleed crave lifestyle: cup in nature before the trail */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full">
        <img
          src={HERO}
          alt="A hiker savors a steaming cup of Torch Republic coffee on a sunlit mountain rock before hitting the trail."
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="block h-[44vh] w-full select-none object-cover sm:h-[52vh]"
        />
      </motion.div>

      <div className="mx-auto max-w-[860px] px-6 py-12 text-center md:py-16">
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em]" style={{ color: '#B7653E' }}>For the active, the curious, the on-the-move</p>
          <h2 className="mx-auto mt-4 font-serif font-bold" style={{ fontSize: 'clamp(1.7rem, 4.4vw, 2.5rem)', color: '#292622', lineHeight: 1.12, textWrap: 'balance' }}>
            Your cup in nature, before the trail begins
          </h2>
          <p className="mx-auto mt-4 max-w-[40rem] font-heading" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', color: '#5F574F', lineHeight: 1.7 }}>
            Sunlit mornings, packed bags, a quiet moment before you go. Torch Republic was built for hikers, students, travelers — anyone whose day starts in motion. Just add hot water, anywhere, and take a minute for yourself before the adventure.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/shop" className="btn btn-primary" style={{ minWidth: '220px' }}>Shop the Rituals</Link>
            <a href="/camping-coffee" className="btn btn-ghost" style={{ minWidth: '220px' }}>Coffee for the trail</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}