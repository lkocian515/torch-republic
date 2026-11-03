import React from 'react';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Coffee, Users, Target, Flame } from 'lucide-react';

const RG = '#E6AC45';

const VALUES = [
  { icon: Flame, title: 'Ignition', desc: 'We believe in the inner fire that drives every person forward.' },
  { icon: Target, title: 'Purpose', desc: 'Every ritual should move you closer to who you are becoming.' },
  { icon: Users, title: 'Community', desc: 'A republic of torchbearers who refuse to dim their light.' },
  { icon: Sparkles, title: 'Clarity', desc: 'Clear thinking, clear ingredients, clear intention.' },
  { icon: Shield, title: 'Resilience', desc: 'Built for those who keep going, rebuilding, and rising.' },
  { icon: Coffee, title: 'Ritual', desc: 'Turning daily habits into something that actually means something.' },
];

export default function About() {
  useSEO({
    title: 'About Torch Republic | Empowerment Lifestyle Brand',
    description: 'Torch Republic is a movement for people who refuse to dim their light. Premium coffee, mushroom blends, and matcha for the modern torchbearer.',
    url: '/about',
    type: 'website',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F7F2E9', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center" style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            About Torch Republic
          </p>
          <h1 className="font-serif font-bold mb-5" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFCF7', letterSpacing: '-0.02em' }}>
            A Movement for People Who Refuse to Dim Their Light
          </h1>
          <p className="font-heading" style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.9, fontWeight: 300 }}>
            Torch Republic is more than a brand. It's a republic of torchbearers—people who choose intention over autopilot, purpose over distraction, and progress over stagnation.
          </p>
        </motion.div>
      </section>

      {/* Our Mission */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              Torch Republic was born from a simple truth: the quality of your life is shaped by the choices you make every day. The habits you practice, the thoughts you nurture, the routines you return to—all of it determines who you become.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              We create premium coffee, mushroom coffee, and matcha blends for people who understand that transformation doesn't happen overnight. It happens through the small actions repeated day after day, until they become the foundation of a better life.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
              The torch in our name represents awareness—the inner light that guides you forward, helps you think independently, and reminds you that growth is always possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
              Our Values
            </p>
            <h2 className="font-serif font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              What We Stand For
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center p-8"
                style={{
                  background: '#0F0E0D',
                  border: `1px solid ${RG}25`,
                  borderRadius: '6px'
                }}
              >
                <div className="mb-5 flex justify-center" style={{
                  width: 56,
                  height: 56,
                  margin: '0 auto 20px',
                  borderRadius: '50%',
                  background: `${RG}15`,
                  border: `1px solid ${RG}35`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <value.icon size={26} style={{ color: RG }} />
                </div>
                <h3 className="font-serif font-bold text-white mb-3" style={{ fontSize: '1.4rem' }}>
                  {value.title}
                </h3>
                <p className="font-heading text-sm" style={{
                  color: 'rgba(240,235,225,0.55)',
                  fontWeight: 300,
                  lineHeight: 1.7
                }}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="px-6 md:px-10 py-20" style={{ background: '#0A0908', borderTop: '1px solid rgba(230,183,173,0.06)', borderBottom: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-4" style={{ color: RG }}>
              The Founder
            </p>
            <h2 className="font-serif font-bold text-white mb-6" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
              Lisa Marie Kocian
            </h2>
            <p className="font-heading text-base leading-relaxed mb-6" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300 }}>
              Torch Republic was founded on the belief that everyone has an inner fire worth protecting. As a U.S.-based, independent, founder-led company, we're committed to creating products that support your journey—not just with premium ingredients, but with a message that reminds you who you are becoming.
            </p>
            <p className="font-heading text-base leading-relaxed" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300 }}>
              Every blend is crafted with intention. Every package carries a reminder. Every cup is an invitation to begin again.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto">
          <h2 className="font-serif font-bold mb-6" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F7F2E9', lineHeight: 1.2 }}>
            Ready to Carry the Torch?
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-4 px-8" style={{ background: RG, color: '#080808' }}>
              Shop the Collection →
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70 py-4 px-8" style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)' }}>
              Get in Touch →
            </Link>
          </div>
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