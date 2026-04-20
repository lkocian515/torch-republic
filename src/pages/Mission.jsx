import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

// Thin gold divider — used only between major sections
const TorchDivider = () => (
  <motion.div 
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="flex justify-center items-center my-8 gap-3"
  >
    <div className="flex-1 h-px" style={{ background: 'rgba(201,162,74,0.2)' }} />
    <Flame className="w-4 h-4" style={{ color: '#C9A24A' }} />
    <div className="flex-1 h-px" style={{ background: 'rgba(201,162,74,0.2)' }} />
  </motion.div>
);

// Mission pillar card
const MissionCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -4 }}
    className="p-6 transition-all duration-300"
    style={{
      backgroundColor: '#0A0A0A',
      border: '1px solid rgba(201,162,74,0.12)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(201,162,74,0.3)';
      e.currentTarget.style.boxShadow = '0 12px 30px rgba(201,162,74,0.05)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(201,162,74,0.12)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    <Icon className="w-7 h-7 mb-4" style={{ color: '#C9A24A' }} />
    <h3 className="font-serif text-base font-bold mb-3 leading-tight" style={{ color: '#F0EBE1' }}>
      {title}
    </h3>
    <p className="font-heading text-xs leading-relaxed" style={{ color: '#999999' }}>
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
      
      {/* ════ HERO SECTION ════ */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5d69f9920_Untitleddesign12.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/80" />
        
        <div className="relative z-10 max-w-4xl w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center"
          >
            {/* Main headline */}
            <h1 
              className="font-serif leading-tight mb-6"
              style={{
                fontSize: 'clamp(3rem, 9vw, 6rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#C9A24A'
              }}
            >
              CARRY<br />THE FLAME
            </h1>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-px w-16 mx-auto mb-8"
              style={{ background: 'rgba(201,162,74,0.3)' }}
            />

            {/* Primary copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-serif text-lg md:text-xl mb-4 leading-relaxed max-w-2xl mx-auto"
              style={{ color: '#F0EBE1', fontWeight: 300 }}
            >
              Torch Republic exists for those who believe <span className="font-bold">freedom is not merely inherited</span>—it is <span className="font-bold">carried</span>.
            </motion.p>

            {/* Secondary copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-heading text-sm max-w-xl mx-auto mb-10"
              style={{ color: 'rgba(240,235,225,0.6)' }}
            >
              A premium small-batch coffee brand — rooted in history, built on conviction, and brewed for those who carry the flame forward.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row justify-center gap-3"
            >
              <Link
                to="#mission"
                className="px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all"
                style={{
                  backgroundColor: '#C9A24A',
                  color: '#000000',
                  border: '1px solid #C9A24A'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E4C46A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C9A24A'}
              >
                Our Mission
              </Link>
              <Link
                to="/CoffeeCollection"
                className="px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all"
                style={{
                  backgroundColor: 'transparent',
                  color: '#C9A24A',
                  border: '1px solid #C9A24A'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(201,162,74,0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Explore Coffee
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="text-xs font-mono tracking-widest" style={{ color: 'rgba(201,162,74,0.3)' }}>
            SCROLL
          </div>
        </motion.div>
      </section>

      {/* ════ BELIEF STATEMENT ════ */}
      <section className="py-20 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="font-serif leading-tight mb-4"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                color: '#F0EBE1'
              }}
            >
              Every great movement begins over a cup of coffee.
            </h2>

            <p
              className="font-heading text-sm leading-relaxed"
              style={{ color: 'rgba(240,235,225,0.6)' }}
            >
              Where ideas are shared, courage is stirred, and purpose is poured into every sip.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════ SIGNATURE QUOTE ════ */}
      <section 
        className="py-20 px-6 relative overflow-hidden"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <motion.div
          animate={{ opacity: [0.04, 0.06, 0.04] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <Flame className="w-56 h-56" style={{ color: '#C9A24A' }} />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif italic leading-tight"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              fontWeight: 700,
              color: '#F0EBE1'
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
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono text-xs tracking-widest mt-6"
            style={{ color: 'rgba(201,162,74,0.5)' }}
          >
            A RITUAL. A REMINDER. A RESPONSIBILITY.
          </motion.p>
        </div>
      </section>

      {/* ════ WHAT WE STAND ON ════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto">
          <TorchDivider />

          <h2 className="font-serif text-3xl font-bold text-center mb-16" style={{ color: '#C9A24A' }}>
            What We Stand On
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Flame, title: 'The Torch', text: 'Truth, responsibility, and the duty to carry light forward.' },
              { icon: Flame, title: 'The Cup', text: 'Ritual, gathering, warmth, and the spark that starts meaningful conversation.' },
              { icon: Flame, title: 'The Republic', text: 'Citizens who remember, who think, who speak, who stand firm.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-12 h-12 mx-auto mb-5" style={{ color: '#C9A24A' }} />
                <h3 className="font-serif text-lg font-bold mb-3" style={{ color: '#F0EBE1' }}>
                  {item.title}
                </h3>
                <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(240,235,225,0.55)' }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ OUR MISSION PILLARS ════ */}
      <section id="mission" className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-6xl mx-auto">
          <TorchDivider />

          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold mb-2" style={{ color: '#C9A24A' }}>
              OUR MISSION
            </h2>
            <p className="font-heading text-xs max-w-xl mx-auto" style={{ color: 'rgba(240,235,225,0.5)' }}>
              Torch Republic is a premium small-batch coffee brand built around American history, collectible blends, and the belief that every cup is a chance to carry the flame.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MissionCard
              index={0}
              icon={Flame}
              title="Unite Patriots"
              description="We believe coffee still has the power to gather people and create space for conviction."
            />
            <MissionCard
              index={1}
              icon={Flame}
              title="Inspire Resilience"
              description="Through every design and roast, we honor the spirit of those who have served and stood firm."
            />
            <MissionCard
              index={2}
              icon={Flame}
              title="Equip with Meaning"
              description="Our products carry meaning—bold enough to spark conversation, strong enough to represent."
            />
            <MissionCard
              index={3}
              icon={Flame}
              title="Build Community"
              description="We are building a table—a place where coffee, remembrance, and fellowship still matter."
            />
          </div>
        </div>
      </section>

      {/* ════ WHERE THE FLAME BEGAN ════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-5xl mx-auto">
          <TorchDivider />

          <h2 className="font-serif text-3xl font-bold text-center mb-12" style={{ color: '#C9A24A' }}>
            Where the Flame Began
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.7)' }}>
                Torch Republic wasn't built in a boardroom. It was built in Corpus Christi, Texas—over coffee, conversation, and deep respect for the people who carry this country forward.
              </p>

              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)' }}>
                Our founder grew up where stories mattered. She learned that the strongest people in this country are often the ones who quietly serve, endure, sacrifice, and keep going.
              </p>

              <p className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)' }}>
                After more than two decades working alongside veterans and military families, one truth became clear: the strongest bonds form not in grand moments, but in ordinary ones—shared meals, hard conversations, late nights, and a good cup of coffee.
              </p>

              <div className="pt-4 border-t" style={{ borderColor: 'rgba(201,162,74,0.15)' }}>
                <p className="font-heading text-sm font-bold" style={{ color: '#C9A24A' }}>
                  What began as small-batch roasting became a symbol. A way to honor resilience. A way to carry the flame forward.
                </p>
              </div>
            </motion.div>

            {/* Story image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
              style={{
                aspectRatio: '4/5',
                backgroundColor: '#0A0A0A',
                border: '1px solid rgba(201,162,74,0.12)',
                overflow: 'hidden'
              }}
            >
              <div 
                className="w-full h-full"
                style={{
                  backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69afc77e4c80e5e88ca6e3ec/5d69f9920_Untitleddesign12.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.6
                }}
              />
              <div 
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(201,162,74,0.08) 100%)' }}
              />
              <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Flame className="w-28 h-28" style={{ color: 'rgba(201,162,74,0.15)' }} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ MANIFESTO ════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-2xl mx-auto">
          <TorchDivider />

          <h2 className="font-serif text-3xl font-bold text-center mb-10" style={{ color: '#C9A24A' }}>
            The Torch Republic Manifesto
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="border-l-2 pl-6 space-y-4"
            style={{ borderColor: 'rgba(201,162,74,0.2)' }}
          >
            {[
              'We believe courage is contagious.',
              'We believe truth still matters.',
              'We believe faith, freedom, and memory must be actively carried—or they disappear.',
              'We believe the table still matters.',
              'What you drink can remind you. What you collect can honor them. What you build can either fade into noise—or become a signal.',
              'Torch Republic is that signal.',
              'A reminder that liberty is not passive. That remembrance is not optional. That identity is shaped by what we honor.',
              'So we roast with intention. We source with care. And we build for those who still believe this country is worth carrying forward — one cup at a time.'
            ].map((text, i) => (
              <p key={i} className="font-heading text-sm leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)' }}>
                <span style={{ color: text.includes('We believe') || text === 'Torch Republic is that signal.' ? '#C9A24A' : 'inherit' }} className={text.includes('We believe') || text === 'Torch Republic is that signal.' ? 'font-bold' : ''}>
                  {text}
                </span>
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ GATHER AROUND THE FLAME ════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-4xl mx-auto">
          <TorchDivider />

          <h2 className="font-serif text-3xl font-bold text-center mb-8" style={{ color: '#C9A24A' }}>
            Gather Around the Flame
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-sm leading-relaxed text-center mb-10"
            style={{ color: 'rgba(240,235,225,0.6)' }}
          >
            Torch Republic is for those who still believe in gathering with purpose. For those who know the strongest communities are built through shared rituals, meaningful conversation, and the courage to stand for something bigger than themselves.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { emoji: '☕', text: 'Small-Batch Coffee' },
              { emoji: '📖', text: 'Historical Storytelling' },
              { emoji: '🔥', text: 'A Brand for Torchbearers' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-5"
                style={{ backgroundColor: '#111', border: '1px solid rgba(201,162,74,0.1)' }}
              >
                <div style={{ fontSize: '2rem' }} className="mb-3">{item.emoji}</div>
                <p className="font-serif text-sm font-bold" style={{ color: '#C9A24A' }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ CLOSING CREED ════ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-3xl mx-auto text-center">
          <TorchDivider />

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl font-bold mb-10"
            style={{ color: '#F0EBE1' }}
          >
            Stand firm. Brew boldly. <span style={{ color: '#C9A24A' }}>Carry the flame.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <Link
              to="/CoffeeCollection"
              className="px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all"
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
              to="/CoffeeCollection"
              className="px-7 py-3 font-mono text-xs tracking-widest uppercase transition-all"
              style={{
                backgroundColor: 'transparent',
                color: '#C9A24A',
                border: '1px solid #C9A24A'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(201,162,74,0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Explore Collections
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-mono text-xs tracking-widest mt-8"
            style={{ color: 'rgba(201,162,74,0.3)' }}
          >
            WELCOME TO THE MOVEMENT
          </motion.p>
        </div>
      </section>
    </div>
  );
}