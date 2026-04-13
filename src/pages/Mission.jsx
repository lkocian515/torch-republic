import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Reusable torch divider
const TorchDivider = ({ animate = true }) => (
  <motion.div 
    initial={animate ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
    whileInView={animate ? { opacity: 1, scaleX: 1 } : {}}
    viewport={animate ? { once: true } : {}}
    transition={{ duration: 0.8 }}
    className="flex justify-center items-center my-16 gap-4"
  >
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #C9A24A, transparent)' }} />
    <motion.div
      animate={animate ? { opacity: [0.5, 1, 0.5] } : {}}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Flame className="w-5 h-5" style={{ color: '#C9A24A' }} />
    </motion.div>
    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #C9A24A, transparent)' }} />
  </motion.div>
);

// Mission pillar card
const MissionCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.12 }}
    whileHover={{ y: -8 }}
    className="group relative p-8 transition-all duration-300"
    style={{
      backgroundColor: '#0A0A0A',
      border: '1px solid rgba(201,162,74,0.15)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(201,162,74,0.08)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(201,162,74,0.15)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="mb-6 inline-block"
    >
      <Icon className="w-8 h-8" style={{ color: '#C9A24A' }} />
    </motion.div>
    <h3 className="font-serif text-lg font-bold mb-4 leading-tight" style={{ color: '#F0EBE1' }}>
      {title}
    </h3>
    <p className="font-heading text-sm leading-relaxed" style={{ color: '#AAAAAA' }}>
      {description}
    </p>
  </motion.div>
);

export default function Mission() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setEmail(''), 2000);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000', color: '#F0EBE1' }}>
      
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION — "CARRY THE FLAME" */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section 
        className="relative min-h-[100vh] flex items-center justify-center px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5d69f9920_Untitleddesign12.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay with gradient depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />
        
        {/* Subtle smoke texture */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(201,162,74,0.1) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-5xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            {/* Main headline */}
            <h1 
              className="font-serif leading-tight mb-8"
              style={{
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#C9A24A'
              }}
            >
              CARRY<br />THE FLAME
            </h1>

            {/* Divider under headline */}
            <div className="flex justify-center mb-12">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-px w-20"
                style={{ background: 'linear-gradient(90deg, transparent, #C9A24A, transparent)' }}
              />
            </div>

            {/* Primary copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-serif text-xl md:text-2xl mb-6 leading-relaxed max-w-3xl mx-auto"
              style={{ color: '#F0EBE1', fontWeight: 300 }}
            >
              Torch Republic exists for those who believe <span className="font-bold">freedom is not merely inherited</span>—it is <span className="font-bold">carried</span>.
            </motion.p>

            {/* Secondary copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="font-heading text-sm md:text-base mb-12 max-w-2xl mx-auto"
              style={{ color: 'rgba(240,235,225,0.65)' }}
            >
              Born from coffee, conviction, and the quiet responsibility of remembrance, our brand stands at the intersection of faith, freedom, and truth.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto"
            >
              <Link
                to="#mission"
                className="px-8 py-4 font-mono text-xs tracking-widest uppercase transition-all"
                style={{
                  backgroundColor: '#C9A24A',
                  color: '#000000',
                  border: '1px solid #C9A24A'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E4C46A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#C9A24A';
                }}
              >
                Our Mission
              </Link>
              <Link
                to="/CoffeeCollection"
                className="px-8 py-4 font-mono text-xs tracking-widest uppercase transition-all"
                style={{
                  backgroundColor: 'transparent',
                  color: '#C9A24A',
                  border: '1px solid #C9A24A'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(201,162,74,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Explore Coffee
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="text-xs font-mono tracking-widest" style={{ color: 'rgba(201,162,74,0.4)' }}>
            SCROLL
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* BELIEF STATEMENT — THE FOUNDATION */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Top divider */}
            <div className="flex justify-center mb-12">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A, transparent)' }} />
            </div>

            {/* Main statement */}
            <h2 
              className="font-serif leading-tight mb-8"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                color: '#F0EBE1'
              }}
            >
              Every great movement begins over a cup of coffee.
            </h2>

            <p
              className="font-heading text-base md:text-lg leading-relaxed mb-8"
              style={{ color: 'rgba(240,235,225,0.65)' }}
            >
              Where ideas are shared, courage is stirred, and purpose is poured into every sip.
            </p>

            <p
              className="font-heading text-sm leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'rgba(240,235,225,0.5)' }}
            >
              Torch Republic exists to champion faith, freedom, and truth—fueling those values with the same passion that drives a master roaster to draw out the richest notes from every bean.
            </p>

            {/* Bottom divider */}
            <div className="flex justify-center mt-12">
              <div className="h-px w-16" style={{ background: 'linear-gradient(90deg, transparent, #C9A24A, transparent)' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* FOUNDER STORY SECTION */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <TorchDivider animate />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ color: '#C9A24A' }}
          >
            Where the Flame Began
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.7)' }}>
                Torch Republic wasn't built in a boardroom. It was built in Bishop, Texas—over coffee, conversation, and a deep respect for the people who carry this country forward.
              </p>

              <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)' }}>
                Our founder grew up where stories mattered. Around the table, over a fresh pot of coffee, she learned that some of the strongest people in this country are not always the loudest—they are the ones who quietly serve, endure, sacrifice, and keep going.
              </p>

              <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)' }}>
                Years later, near Naval Air Station Corpus Christi, those lessons deepened. After more than two decades working alongside veterans, active-duty service members, and military families, one truth became impossible to ignore: the strongest bonds are formed not in grand moments, but in ordinary ones—shared meals, hard conversations, new beginnings, late nights, and a good cup of coffee.
              </p>

              <div className="pt-4 border-t" style={{ borderColor: 'rgba(201,162,74,0.15)' }}>
                <p className="font-heading text-base leading-relaxed font-bold" style={{ color: '#C9A24A' }}>
                  What began as small-batch roasting became something more. Not just coffee. Not just apparel.
                </p>
                <p className="font-heading text-base leading-relaxed mt-4" style={{ color: '#C9A24A' }}>
                  A symbol. A way to honor resilience. A way to tell stories. A way to carry the flame forward.
                </p>
              </div>
            </motion.div>

            {/* Story image area */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
              style={{
                aspectRatio: '4/5',
                backgroundColor: '#0A0A0A',
                border: '1px solid rgba(201,162,74,0.2)',
                overflow: 'hidden'
              }}
            >
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5d69f9920_Untitleddesign12.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.7
                }}
              />
              
              {/* Gradient overlay */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(201,162,74,0.1) 100%)'
                }}
              />

              {/* Torch glow in center */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Flame className="w-32 h-32" style={{ color: 'rgba(201,162,74,0.2)' }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* SIGNATURE QUOTE BREAK */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section 
        className="py-24 px-6 relative overflow-hidden"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        {/* Faint torch watermark */}
        <motion.div
          animate={{ opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Flame className="w-64 h-64" style={{ color: '#C9A24A' }} />
        </motion.div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <TorchDivider animate={false} />

          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif italic leading-tight"
            style={{
              fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 700,
              color: '#F0EBE1',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}
          >
            You don't just <span style={{ color: '#C9A24A' }}>inherit</span> freedom.
            <br />
            You <span style={{ color: '#C9A24A' }}>carry</span> it.
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-xs tracking-widest mt-8"
            style={{ color: 'rgba(201,162,74,0.6)' }}
          >
            A RITUAL. A REMINDER. A RESPONSIBILITY.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* OUR MISSION PILLARS */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section id="mission" className="py-32 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto">
          <TorchDivider animate />

          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4" style={{ color: '#C9A24A' }}>
              OUR MISSION
            </h2>
            <p className="font-heading text-base max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.6)' }}>
              Torch Republic was built to do more than sell products. It was built to gather people around something meaningful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MissionCard
              index={0}
              icon={Flame}
              title="Unite Patriots"
              description="We believe coffee still has the power to gather people—to slow the noise, open conversation, and create space for conviction, memory, and common ground."
            />
            <MissionCard
              index={1}
              icon={Flame}
              title="Inspire Resilience"
              description="Through every design and every roast, we aim to honor the spirit of those who have served, sacrificed, and stood firm when it mattered most."
            />
            <MissionCard
              index={2}
              icon={Flame}
              title="Equip with Meaning"
              description="Our products carry meaning—bold enough to spark conversation, strong enough to represent what you stand for."
            />
            <MissionCard
              index={3}
              icon={Flame}
              title="Build Community"
              description="We are building more than a customer base. We are building a table—a place where coffee, remembrance, and fellowship still matter."
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* SYMBOLISM SECTION — TORCH / COFFEE / REPUBLIC */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-6xl mx-auto">
          <TorchDivider animate />

          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: '#C9A24A' }}>
            What We Stand On
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Torch */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex justify-center mb-6"
              >
                <Flame className="w-16 h-16" style={{ color: '#C9A24A' }} />
              </motion.div>
              <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: '#F0EBE1' }}>
                The Torch
              </h3>
              <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.6)' }}>
                The torch represents truth, responsibility, and the duty to carry light forward—especially when the world grows dim.
              </p>
            </motion.div>

            {/* Coffee */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-center"
            >
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="flex justify-center mb-6"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(201,162,74,0.2)' }}>
                  <span style={{ fontSize: '2rem' }}>☕</span>
                </div>
              </motion.div>
              <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: '#F0EBE1' }}>
                The Cup
              </h3>
              <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.6)' }}>
                Coffee is ritual, gathering, warmth, reflection, and the spark that starts conversations that change everything.
              </p>
            </motion.div>

            {/* Republic */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="flex justify-center mb-6"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(201,162,74,0.2)' }}>
                  <span style={{ fontSize: '2rem' }}>🇺🇸</span>
                </div>
              </motion.div>
              <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: '#F0EBE1' }}>
                The Republic
              </h3>
              <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.6)' }}>
                A republic depends on its people—citizens who remember, who think, who speak, who stand, and who refuse to let the flame go out.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* MANIFESTO SECTION */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-3xl mx-auto">
          <TorchDivider animate />

          <h2 className="font-serif text-4xl font-bold text-center mb-16" style={{ color: '#C9A24A' }}>
            The Torch Republic Manifesto
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="prose prose-invert max-w-none border-l-2 pl-8"
            style={{ borderColor: 'rgba(201,162,74,0.3)' }}
          >
            <div className="space-y-6 font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.7)' }}>
              <p>We believe <span style={{ color: '#C9A24A' }} className="font-bold">courage is contagious.</span></p>
              <p>We believe <span style={{ color: '#C9A24A' }} className="font-bold">truth still matters.</span></p>
              <p>We believe faith, freedom, and memory must be actively carried—or they disappear.</p>
              <p>We believe <span style={{ color: '#C9A24A' }} className="font-bold">the table still matters.</span></p>

              <div className="h-px" style={{ background: 'rgba(201,162,74,0.1)' }} />

              <p>What you wear can say something. What you drink can remind you. And what you build can either fade into noise—or become a signal.</p>

              <p><span style={{ color: '#C9A24A' }} className="font-bold">Torch Republic is that signal.</span></p>

              <p>A reminder that liberty is not passive. That remembrance is not optional. That identity is shaped by what we honor, what we repeat, and what we refuse to forget.</p>

              <p>So we roast with intention. We design with meaning. And we build for those who still believe this country, its people, and its values are worth carrying forward.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* COMMUNITY SECTION */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto">
          <TorchDivider animate />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl font-bold text-center mb-12"
            style={{ color: '#C9A24A' }}
          >
            Gather Around the Flame
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-heading text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto"
            style={{ color: 'rgba(240,235,225,0.65)' }}
          >
            Torch Republic is for the ones who still believe in gathering with purpose. For those who know the strongest communities are built through shared rituals, meaningful conversation, and the courage to stand for something bigger than themselves.
          </motion.p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '☕', text: 'Coffee with Conviction' },
              { emoji: '👕', text: 'Apparel with Meaning' },
              { emoji: '🔥', text: 'A Brand for Torchbearers' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
                style={{ backgroundColor: '#111', border: '1px solid rgba(201,162,74,0.1)' }}
              >
                <div style={{ fontSize: '2.5rem' }} className="mb-4">{item.emoji}</div>
                <p className="font-serif text-lg font-bold" style={{ color: '#C9A24A' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* CLOSING CREED */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-32 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-4xl mx-auto text-center">
          <TorchDivider animate={false} />

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-bold mb-12"
            style={{ color: '#F0EBE1' }}
          >
            Stand firm. Brew boldly. <span style={{ color: '#C9A24A' }}>Carry the flame.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/CoffeeCollection"
              className="px-8 py-4 font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                backgroundColor: '#C9A24A',
                color: '#000000',
                border: '1px solid #C9A24A'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4C46A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C9A24A'}
            >
              Shop Coffee
            </Link>
            <Link
              to="/Shop"
              className="px-8 py-4 font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                backgroundColor: 'transparent',
                color: '#C9A24A',
                border: '1px solid #C9A24A'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(201,162,74,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Shop Apparel
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="font-mono text-xs tracking-widest mt-12"
            style={{ color: 'rgba(201,162,74,0.4)' }}
          >
            WELCOME TO THE MOVEMENT
          </motion.p>
        </div>
      </section>
    </div>
  );
}