import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Shield, Scale, Users } from 'lucide-react';

const TorchDivider = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex justify-center my-16"
  >
    <Flame className="w-8 h-8" style={{ color: '#C9A24A' }} />
  </motion.div>
);

const PRINCIPLES = [
  {
    icon: Flame,
    title: 'Faith Gives Life Meaning',
    description: 'Faith grounds us in something greater than ourselves. It reminds us that character, courage, and conviction matter.'
  },
  {
    icon: Shield,
    title: 'Freedom Requires Responsibility',
    description: 'Freedom is not just a right — it is a responsibility. A republic survives when citizens think independently and stand with courage.'
  },
  {
    icon: Scale,
    title: 'Truth Must Be Protected',
    description: 'Truth is the foundation that allows freedom and faith to endure. When truth is protected, a nation remains strong.'
  }
];

const MISSION_CARDS = [
  {
    icon: Users,
    title: 'Unite Patriots Around Shared Values',
    description: 'We bring together people who believe in faith, family, and freedom.'
  },
  {
    icon: Flame,
    title: 'Inspire Courage and Resilience',
    description: 'Our designs remind people that conviction matters.'
  },
  {
    icon: Shield,
    title: 'Wear the Message',
    description: 'Our apparel allows people to express their values openly.'
  },
  {
    icon: Scale,
    title: 'Build a Community That Stands Firm',
    description: 'We are building a movement of Torchbearers who refuse to stay silent.'
  }
];

export default function Mission() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0B0B' }}>
      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            opacity: [0.05, 0.08, 0.05],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(circle, #0F2B46, transparent)' }}
        />
        <motion.div
          animate={{ 
            opacity: [0.04, 0.07, 0.04],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(circle, #0C3B2E, transparent)' }}
        />
      </div>

      <div className="relative z-10">
        {/* SECTION 1 — Hero Philosophy */}
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs tracking-[0.4em] uppercase mb-8"
              style={{ color: '#C9A24A' }}
            >
              Torch Republic Philosophy
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-12 tracking-tight"
              style={{ color: '#FFFFFF' }}
            >
              CARRY THE FLAME
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 text-base md:text-lg leading-relaxed"
              style={{ color: '#CCCCCC' }}
            >
              <p className="text-xl md:text-2xl font-light">
                Torch Republic stands for the power of people who refuse to live without truth.
              </p>
              
              <div className="space-y-3 pt-4">
                <p>We believe faith gives life meaning.</p>
                <p>We believe freedom allows people to live with dignity and responsibility.</p>
                <p>And we believe truth is something worth protecting — even when it is unpopular.</p>
              </div>

              <p className="text-xl md:text-2xl font-light pt-6" style={{ color: '#C9A24A' }}>
                A free society survives when its citizens carry the flame of truth forward.
              </p>
            </motion.div>

            <TorchDivider />
          </div>
        </section>

        {/* Hero Image */}
        <section className="px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto"
          >
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/c53d23798_IMG_20260213_173838.png"
              alt="Carry the Flame"
              className="w-full h-auto"
            />
          </motion.div>
        </section>

        {/* SECTION 2 — Core Principles */}
        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, #0F2B46, transparent)' }} />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-center mb-24"
              style={{ color: '#FFFFFF' }}
            >
              THE PRINCIPLES WE STAND FOR
            </motion.h2>

            <div className="space-y-20">
              {PRINCIPLES.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <motion.div
                    key={principle.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex flex-col md:flex-row items-start gap-8"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex-shrink-0"
                    >
                      <Icon className="w-12 h-12" style={{ color: '#C9A24A' }} />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4" style={{ color: '#FFFFFF' }}>
                        {principle.title}
                      </h3>
                      <p className="text-lg leading-relaxed" style={{ color: '#CCCCCC' }}>
                        {principle.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3 — Our Mission Is Clear */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold text-center mb-20"
              style={{ color: '#FFFFFF' }}
            >
              OUR MISSION IS CLEAR
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MISSION_CARDS.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="p-8 rounded-sm transition-all duration-300"
                    style={{ 
                      backgroundColor: '#111111',
                      border: '1px solid #C9A24A'
                    }}
                  >
                    <Icon className="w-10 h-10 mb-6" style={{ color: '#C9A24A' }} />
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed" style={{ color: '#CCCCCC' }}>
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4 — Torchbearer Movement */}
        <section className="py-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif font-bold mb-8"
              style={{ color: '#FFFFFF' }}
            >
              JOIN THE TORCHBEARERS
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed mb-12"
              style={{ color: '#CCCCCC' }}
            >
              Torch Republic is more than apparel.<br />
              It is a community of people who believe truth, courage, and responsibility matter.
            </motion.p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 px-6 rounded-sm"
                style={{ backgroundColor: '#111111', border: '1px solid #C9A24A' }}
              >
                <p className="text-lg" style={{ color: '#C9A24A' }}>
                  Welcome to the movement, Torchbearer.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-sm text-base focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{
                    backgroundColor: '#111111',
                    border: '1px solid #C9A24A33',
                    color: '#FFFFFF'
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(201, 162, 74, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-8 py-4 rounded-sm font-bold text-sm tracking-widest uppercase transition-all duration-300"
                  style={{ backgroundColor: '#C9A24A', color: '#0B0B0B' }}
                >
                  Join the Movement
                </motion.button>
              </motion.form>
            )}
          </div>
        </section>

        {/* SECTION 5 — Final Identity */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight" style={{ color: '#C9A24A' }}>
                  FAITH<br />
                  FREEDOM<br />
                  TRUTH
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-lg leading-relaxed"
                style={{ color: '#CCCCCC' }}
              >
                <p>
                  Torch Republic exists to represent those who live by faith, value freedom, and refuse to blend in.
                </p>
                <p>
                  Every design.<br />
                  Every product.<br />
                  Every collection.
                </p>
                <p className="text-xl" style={{ color: '#C9A24A' }}>
                  Built to reflect these principles.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-24"
            >
              <h3 className="text-4xl md:text-5xl font-serif font-bold" style={{ color: '#C9A24A' }}>
                CARRY THE FLAME
              </h3>
              <TorchDivider />
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}