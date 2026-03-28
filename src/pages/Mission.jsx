import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Shield, Heart, Users } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import FounderSection from '../components/mission/FounderSection';

const TorchDivider = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex justify-center my-12"
  >
    <Flame className="w-10 h-10" style={{ color: '#C9A24A' }} />
  </motion.div>
);

const MISSION_CARDS = [
  {
    icon: Flame,
    title: 'UNITE PATRIOTS AROUND SHARED VALUES',
    description: 'Faith. Family. Freedom.'
  },
  {
    icon: Shield,
    title: 'INSPIRE COURAGE AND RESILIENCE',
    description: 'Stand for what matters.'
  },
  {
    icon: Heart,
    title: 'WEAR THE MESSAGE',
    description: 'Let the world know where you stand.'
  },
  {
    icon: Users,
    title: 'BUILD A COMMUNITY THAT STANDS FIRM',
    description: 'Together, we carry it forward.'
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
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-6"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5d69f9920_Untitleddesign12.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent" />
        
        <div className="relative z-10 max-w-7xl w-full">
          <div className="max-w-2xl">

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight"
              style={{ color: '#C9A24A' }}
            >
              CARRY THE<br />FLAME
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-lg mb-16 leading-relaxed"
              style={{ color: '#FFFFFF' }}
            >
              Torch Republic stands for the power of people who <span className="font-bold">REFUSE TO LIVE</span> without <span className="font-bold">TRUTH.</span>
            </motion.p>

            {/* Three Principles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            >
              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#C9A24A' }} />
                <div>
                  <p className="text-xs tracking-wider uppercase font-bold mb-1" style={{ color: '#C9A24A' }}>
                    FAITH GIVES
                  </p>
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>
                    LIFE MEANING.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#C9A24A' }} />
                <div>
                  <p className="text-xs tracking-wider uppercase font-bold mb-1" style={{ color: '#C9A24A' }}>
                    FREEDOM REQUIRES
                  </p>
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>
                    RESPONSIBILITY.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Flame className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#C9A24A' }} />
                <div>
                  <p className="text-xs tracking-wider uppercase font-bold mb-1" style={{ color: '#C9A24A' }}>
                    TRUTH IS
                  </p>
                  <p className="text-sm" style={{ color: '#FFFFFF' }}>
                    WORTH PROTECTING.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: '#C9A24A' }}>
              OUR MISSION IS CLEAR
            </h2>
            <TorchDivider />
          </motion.div>

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
                  className="p-8 text-center"
                  style={{ 
                    backgroundColor: '#0A0A0A',
                    border: '1px solid #C9A24A33'
                  }}
                >
                  <Icon className="w-12 h-12 mx-auto mb-6" style={{ color: '#C9A24A' }} />
                  <h3 className="text-sm font-bold mb-4 tracking-wider" style={{ color: '#FFFFFF' }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#AAAAAA' }}>
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Flame Survives Section */}
      <section className="py-16 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center border-t border-b py-8"
            style={{ borderColor: '#C9A24A33' }}
          >
            <p className="text-lg md:text-xl font-light" style={{ color: '#FFFFFF' }}>
              THE FLAME SURVIVES BECAUSE <span className="font-bold" style={{ color: '#C9A24A' }}>PEOPLE CHOOSE TO CARRY IT FORWARD.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final Section - Faith Freedom Truth */}
      <section className="py-32 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                <span style={{ color: '#FFFFFF' }}>FAITH.</span><br />
                <span style={{ color: '#FFFFFF' }}>FREEDOM.</span><br />
                <span style={{ color: '#C9A24A' }}>TRUTH.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-base leading-relaxed" style={{ color: '#CCCCCC' }}>
                Torch Republic exists to represent those who live by faith, value freedom, and refuse to blend in. Every design, every product, every collection is built to reflect these principles.
              </p>
              
              {submitted ? (
                <div
                  className="py-4 px-6 text-center"
                  style={{ backgroundColor: '#0A0A0A', border: '1px solid #C9A24A' }}
                >
                  <p className="text-base" style={{ color: '#C9A24A' }}>
                    Welcome to the movement, Torchbearer.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-6 py-4 text-sm focus:outline-none"
                    style={{
                      backgroundColor: '#0A0A0A',
                      border: '1px solid #C9A24A33',
                      color: '#FFFFFF'
                    }}
                  />
                  <motion.button
                    whileHover={{ backgroundColor: '#E4C46A' }}
                    type="submit"
                    className="px-8 py-4 font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors"
                    style={{ backgroundColor: '#C9A24A', color: '#000000' }}
                  >
                    JOIN THE TORCHBEARERS <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>

          <TorchDivider />
        </div>
      </section>

      <FounderSection />
    </div>
  );
}