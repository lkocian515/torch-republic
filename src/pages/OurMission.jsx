import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MUSHROOM_PRODUCTS } from '../lib/mushroomProducts';
import SourcingMap from '../components/mission/SourcingMap';

const RG = '#E6B7AD';

const SECTIONS = [
  {
    label: '01 — Three Categories, One Standard',
    title: 'Classic Coffee. Mushroom Coffee. Matcha.',
    body: "Whether you want pure classic instant coffee with no mushrooms, functional mushroom coffee with Lion's Mane + Chaga for focus and clarity, or ceremonial grade matcha for calm energy — each category is designed for consistency, quality, and ease. When coffee is this easy to prepare, you show up for your ritual every single day.",
  },
  {
    label: '02 — Our Promise',
    title: 'Clear product information. Simple experience.',
    body: 'We believe in transparent ingredients, honest product descriptions, responsive support, and a premium customer experience from first sip to monthly subscription. No hype, no overclaiming, no complicated fine print.',
  },
];

const TRUST = [
  { label: 'Three Categories', desc: "Classic Instant Coffee (no mushrooms), Mushroom Coffee (Lion's Mane + Chaga), and Ceremonial Matcha — clearly labeled." },
  { label: 'Clear Product Details', desc: '27 servings for coffee blends, 25 for matcha. Premium ingredients, no hidden additives.' },
  { label: 'Secure Checkout', desc: 'Trusted payment options and a clean, simple checkout flow.' },
  { label: 'Easy Support', desc: 'Questions about your order or subscription? Reach out and we\'ll help.' },
];

export default function OurMission() {
  useSEO({
    title: 'About Torch Republic | Founder Story & Brand Mission',
    description: 'Learn the story behind Torch Republic Coffee Company — a founder-led U.S. small business creating premium instant coffee, mushroom coffee, and matcha for intentional daily rituals.',
    url: '/mission',
    type: 'website',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            About Torch Republic
          </p>
          <h1 className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            From the Founder
          </h1>
          <p className="font-heading"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.9, fontWeight: 300 }}>
            Torch Republic was created to make daily coffee feel more intentional, grounded, and supportive — a simple ritual you can return to each morning.
          </p>
        </motion.div>
      </section>

      {/* Our Mission */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              To help people cultivate greater clarity, awareness, and well-being through intentional daily rituals.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              We create premium coffee, mushroom coffee, and matcha blends inspired by the qualities that support a meaningful life.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Our mission is not simply to provide energy.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Our mission is to help people begin each day with greater purpose, greater presence, and a deeper connection to the person they are becoming.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Because transformation doesn't happen overnight. It happens through the choices we make every day.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              We believe wellness is not about perfection. It is not about chasing every trend or finding a quick fix. True wellness is built through consistency. It grows through the small actions repeated day after day, often unnoticed, until they become the foundation of a better life.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              The torch in our name represents awareness—the inner light that guides us forward, helps us think independently, and reminds us that growth is always possible. It symbolizes the courage to choose intention over autopilot, purpose over distraction, and progress over stagnation.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Everything we create is rooted in a simple idea: You are a torchbearer.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Transformation doesn't happen overnight.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              It happens through the choices we make every day.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              One cup.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              One ritual.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              One intentional step forward at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story — Inspiration & Mission */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#060606', borderTop: '1px solid rgba(230,183,173,0.06)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3 text-center" style={{ color: 'rgba(230,183,173,0.5)' }}>Our Story</p>
            <h2 className="font-serif font-bold text-white text-center" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', lineHeight: 1.2 }}>
              Why Torch Republic Was Born
            </h2>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Life feels better when we begin each day with intention.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              In a world that moves faster every year, it's easy to rush through our mornings on autopilot. We wanted to create something that encouraged people to slow down, take a breath, and start the day feeling focused, energized, and ready for what lies ahead.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              That's why we created Torch Republic Coffee Company.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              We craft premium coffee, mushroom coffee, and matcha blends designed to support clarity, focus, balance, and well-being. But beyond what's in the cup, we're inspired by something even more important: the qualities that help people live meaningful and fulfilling lives.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Discipline. Resilience. Creativity. Growth. Wisdom. Purpose.
            </p>

            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Torch Republic is for people who are building healthy habits, pursuing their goals, caring for their families, growing their businesses, strengthening their minds, and creating lives they're proud of.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              We believe wellness isn't about perfection. It's about showing up each day, making small positive choices, and continuing to move forward.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Our mission is to create products that support those daily rituals and bring together a community of people committed to living with greater intention, optimism, and purpose.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Because every day is a new opportunity to learn, grow, and become a little better than we were yesterday.
            </p>
            <p className="font-heading text-base leading-relaxed font-serif font-bold" style={{ color: 'rgba(230,183,173,0.8)', fontWeight: 600 }}>
              Fuel the Person You're Becoming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Sourcing Map */}
      <SourcingMap />

      {/* Founder Signature Section */}
      <section className="px-6 md:px-10 py-16" style={{ background: '#080808', borderTop: '1px solid rgba(230,183,173,0.08)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.4rem' }}>
              Lisa Marie Kocian
            </p>
            <p className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: RG }}>
              Founder, Torch Republic Coffee Company
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story sections */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[860px] mx-auto flex flex-col gap-20">
          {SECTIONS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 items-start"
            >
              <div>
                <p className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: RG }}>{s.label}</p>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', lineHeight: 1.2 }}>
                  {s.title}
                </h2>
                <p className="font-heading" style={{ color: 'rgba(247,241,232,0.5)', fontWeight: 300, lineHeight: 1.9, fontSize: '0.95rem' }}>
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>



      {/* Trust section */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>Our Commitment</p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}>
              Built for a Better Coffee Ritual
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST.map((t, i) => (
              <motion.div key={t.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="p-6" style={{ background: '#0F0E0D', border: '1px solid rgba(230,183,173,0.08)' }}>
                <p className="font-serif font-bold text-white mb-2 text-sm">{t.label}</p>
                <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(247,241,232,0.45)', fontWeight: 300 }}>{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-10 py-20 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.5)' }}>
            Our Commitment
          </p>
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6', lineHeight: 1.2 }}>
            Built for a Better Coffee Ritual
          </h2>
          <p className="font-heading mb-8" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
            Torch Republic is coffee for people who are rebuilding their energy, reclaiming their focus, and choosing to rise with intention every day. The torch represents the part of you that refuses to go out.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
            style={{
              background: RG,
              color: '#080808',
              padding: '14px 36px',
              borderRadius: '4px',
            }}
          >
            Find Your Ritual →
          </Link>
        </motion.div>
      </section>

      {/* FDA */}
      <div className="px-6 py-8 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <p className="font-mono text-[8px] tracking-[0.15em] max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.2)', lineHeight: 1.75 }}>
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>
    </div>
  );
}