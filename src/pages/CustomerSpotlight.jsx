import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSEO } from '@/hooks/useSEO';
import { Quote, Briefcase, Palette, Code, Book, Dumbbell, Lightbulb } from 'lucide-react';

const RG = '#E6B7AD';

const INTERVIEWS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Software Engineer',
    company: 'Tech Startup',
    icon: Code,
    blend: 'GlowMind — Clarity & Flow',
    routine: 'Morning Deep Work Block',
    quote: "I used to rely on three cups of regular coffee just to get through my morning standup. With GlowMind, I get one cup and I'm locked in for 4-5 hours of deep coding work. The difference is mental clarity without the crash.",
    ritual: "I mix my GlowMind at 7am while reviewing my task list. By the time I start coding at 8, I'm in flow state. No jitters, no 10am crash.",
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Marcus Williams',
    role: 'Creative Director',
    company: 'Design Agency',
    icon: Palette,
    blend: 'SunCap — Rise & Focus',
    routine: 'Client Pitch Preparation',
    quote: 'When I'm preparing for a big pitch, I need creative energy that doesn't make me anxious. SunCap gives me that calm confidence. It's become part of my pre-pitch ritual.',
    ritual: 'Big presentation day? I wake up early, make my SunCap, and sketch out my deck ideas while the coffee kicks in. Best creative work happens in that first hour.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Dr. Elena Rodriguez',
    role: 'Clinical Psychologist',
    company: 'Private Practice',
    icon: Book,
    blend: 'GlowMind — Clarity & Flow',
    routine: 'Between-Session Reset',
    quote: "I see 8-10 patients a day, and I need to be fully present for each one. GlowMind helps me reset between sessions without the overstimulation of espresso. It's about sustained focus, not stimulation.",
    ritual: 'I keep a thermos at my desk. Between sessions, I'll have a small cup to reset my focus. It helps me stay empathetic and sharp throughout the day.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'James Park',
    role: 'Founder & CEO',
    company: 'E-commerce Brand',
    icon: Briefcase,
    blend: 'SunCap + MoonCap',
    routine: 'Full-Day Energy Management',
    quote: 'Running a company means 14-hour days. I used to burn out by 3pm. Now I use SunCap in the morning for strategy work and MoonCap in the evening to wind down. It's about managing energy, not just consuming caffeine.',
    ritual: 'SunCap at 6am for morning strategy. MoonCap at 9pm to decompress. This routine helped me build a sustainable pace as a founder.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Aisha Thompson',
    role: 'Freelance Writer',
    company: 'Self-Employed',
    icon: Lightbulb,
    blend: 'Classic Coffee',
    routine: 'Morning Pages & Deadlines',
    quote: "As a freelancer, discipline is everything. My morning coffee ritual signals to my brain: it's work time. Classic Coffee gives me the traditional caffeine kick I need for deadline sprints.",
    ritual: '6am: Make coffee, write 3 pages of stream-of-consciousness journaling. By 7am, I'm ready for client work. The ritual matters as much as the caffeine.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Personal Trainer',
    company: 'Fitness Studio',
    icon: Dumbbell,
    blend: 'Classic Coffee',
    routine: 'Pre-Workout Energy',
    quote: 'I train clients from 5am to 8pm. Classic Coffee before my first session gives me clean energy without stomach issues. I can train hard all day without feeling wired or crashed.',
    ritual: 'Pre-workout at 4:30am: one scoop of Classic Coffee + water. Clean energy for my own training, then I'm ready to coach others.',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&crop=face',
  },
];

export default function CustomerSpotlight() {
  useSEO({
    title: 'Customer Spotlight | Real Routines from Torch Republic Users',
    description: 'See how professionals, creators, and entrepreneurs incorporate Torch Republic mushroom coffee into their daily routines for focus, energy, and sustainable performance.',
    url: '/spotlight',
  });

  return (
    <div style={{ backgroundColor: '#080808', color: '#F0EBE1', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{ borderBottom: '1px solid rgba(230,183,173,0.08)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: 'rgba(230,183,173,0.6)' }}>
            Customer Spotlight
          </p>
          <h1 className="font-serif font-bold mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
            Real People. Real Routines.
          </h1>
          <p className="font-heading"
            style={{ fontSize: '0.95rem', color: 'rgba(240,235,225,0.5)', lineHeight: 1.85, fontWeight: 300 }}>
            See how professionals, creators, and entrepreneurs incorporate Torch Republic into their daily rituals for focus, energy, and sustainable performance.
          </p>
        </motion.div>
      </section>

      {/* Interviews Grid */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {INTERVIEWS.map((person, i) => {
              const Icon = person.icon;
              return (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-6 md:p-8"
                  style={{ 
                    background: '#0F0E0D', 
                    border: '1px solid rgba(230,183,173,0.08)',
                    borderRadius: '4px'
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6">
                    {/* Photo & Role */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4" style={{ border: `2px solid ${RG}30` }}>
                        <img 
                          src={person.photo} 
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: `rgba(230,183,173,0.12)` }}>
                        <Icon className="w-5 h-5" style={{ color: RG }} strokeWidth={1.5} />
                      </div>
                      <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.45)', fontWeight: 300 }}>{person.role}</p>
                      <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.35)', fontWeight: 300 }}>{person.company}</p>
                    </div>

                    {/* Content */}
                    <div>
                      <div className="mb-4">
                        <h3 className="font-serif font-bold text-white text-lg mb-1">{person.name}</h3>
                        <p className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: `${RG}80` }}>
                          {person.blend} · {person.routine}
                        </p>
                      </div>

                      <div className="mb-5">
                        <div className="flex items-start gap-3 mb-2">
                          <Quote className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: RG }} />
                          <p className="font-heading text-sm leading-relaxed italic" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300 }}>
                            {person.quote}
                          </p>
                        </div>
                      </div>

                      <div className="p-4" style={{ background: '#0A0908', border: '1px solid rgba(230,183,173,0.06)', borderRadius: '3px' }}>
                        <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: 'rgba(230,183,173,0.5)' }}>
                          Their Ritual
                        </p>
                        <p className="font-heading text-xs leading-relaxed" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
                          {person.ritual}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-20 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-heading text-sm mb-6" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300 }}>
            Ready to build your ritual?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90"
              style={{ background: RG, color: '#080808', padding: '14px 36px', borderRadius: '4px' }}
            >
              Shop All Blends →
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center font-mono text-[10px] tracking-[0.3em] uppercase transition-all hover:opacity-70"
              style={{ border: '1px solid rgba(230,183,173,0.3)', color: 'rgba(230,183,173,0.7)', padding: '14px 36px', borderRadius: '4px' }}
            >
              How It Works →
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