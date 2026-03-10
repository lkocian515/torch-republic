import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import NewsletterSection from '../components/home/NewsletterSection';

const PILLARS = [
  {
    number: '01',
    title: 'Unite Patriots Around Shared Values',
    description: 'We bring together people who believe in the foundations that built this nation — faith, family, and freedom.',
  },
  {
    number: '02',
    title: 'Inspire Resilience, Courage, and Hope',
    description: 'Every product we create is a reminder that truth and conviction are worth standing for, no matter the cost.',
  },
  {
    number: '03',
    title: 'Equip You with Messages You Can Wear and Share',
    description: 'Our apparel is your armor. Wear your values proudly and let the world know where you stand.',
  },
  {
    number: '04',
    title: 'Build a Community That Stands Firm',
    description: 'We are building a movement of Torchbearers — united in faith and liberty, refusing to stay silent.',
  },
];

export default function Mission() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative pt-16 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-6"
          >
            Our Mission
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase leading-[0.9] tracking-tight"
          >
            We believe <span className="text-primary">faith</span> gives life meaning.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mt-8 leading-relaxed"
          >
            We believe freedom allows people to live with dignity and responsibility.
            And we believe truth is something worth protecting — even when it's unpopular.
          </motion.p>
        </div>
      </div>

      {/* Image banner */}
      <div className="px-6">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <img
            src="https://www.torchrepublic.com/cdn/shop/files/people-holding-flag-that-says-united-states-america.jpg?v=1769404143&width=1500"
            alt="United States of America"
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>
      </div>

      {/* Pillars */}
      <div className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-4 text-center">
            Our Mission Is Clear
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {PILLARS.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-border p-8 hover:border-primary/30 transition-colors"
              >
                <span className="text-primary font-mono text-xs tracking-widest">
                  {pillar.number}
                </span>
                <h3 className="text-foreground font-heading font-bold text-xl uppercase mt-4 tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-6 text-center">
        <Link
          to={createPageUrl('Collections')}
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 font-heading font-bold text-sm tracking-widest uppercase hover:bg-primary/90 transition-all"
        >
          Shop the Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <NewsletterSection />
    </div>
  );
}