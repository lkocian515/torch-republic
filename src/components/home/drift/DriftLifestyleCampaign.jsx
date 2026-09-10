import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { D, SERIF, SANS, MONO } from './driftTheme';

const CAMPAIGN_IMAGE = 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/bf107e79c_generated_image.png';

export default function DriftLifestyleCampaign() {
  return (
    <section className="relative w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img src={CAMPAIGN_IMAGE} alt="Early morning coffee scene with warm sunlight" className="w-full h-[55vh] md:h-[65vh] object-cover" />
      </motion.div>
      <div className="absolute inset-0 flex items-end" style={{ background: 'linear-gradient(to top, rgba(56,43,36,0.55) 0%, transparent 55%)' }}>
        <div className="p-6 md:p-12 lg:p-16 max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 style={{ fontFamily: SERIF, fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', lineHeight: 1.1, color: '#FAF7F1', margin: '0 0 0.75rem', textWrap: 'balance' }}>
              Made for real mornings.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: '1rem', lineHeight: 1.6, color: 'rgba(250,247,241,0.85)', margin: '0 0 1.5rem', maxWidth: '38ch' }}>
              From the desk to the trail and everywhere between.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2"
              style={{ fontFamily: SANS, fontWeight: 600, fontSize: '0.875rem', color: '#FAF7F1', textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              Shop Coffee <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}