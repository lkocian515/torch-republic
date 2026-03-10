import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    name: 'God · Family · Country',
    slug: 'god-family-country',
    description: 'The foundation of everything we stand for.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/god-family-country-collection-1224586.png?v=1772308435&width=1500',
    icon: '🏡'
  },
  {
    name: 'Christ Is King',
    slug: 'christ-is-king',
    description: 'Unapologetically bold and rooted in truth.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/christ-is-king-collection-1952634.webp?v=1773006011&width=1500',
    icon: '👑'
  },
  {
    name: 'Faith Over Fear',
    slug: 'faith-over-fear',
    description: 'Stand firm in your faith no matter the storm.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/faith-over-fear-collection-4849812.webp?v=1772308432&width=1500',
    icon: '✝️'
  },
  {
    name: "Freedom Isn't Free",
    slug: 'freedom-isnt-free',
    description: 'Honor those who paid the price for liberty.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/freedom-isnt-free-collection-9247105.png?v=1772308430&width=1500',
    icon: '💥'
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-3">
              Collections
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight">
              Shop by Conviction
            </h2>
          </div>
          <Link
            to={createPageUrl('Collections')}
            className="hidden md:flex items-center gap-2 text-primary font-mono text-sm tracking-wider hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLLECTIONS.map((col, index) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={createPageUrl('Collections') + `?filter=${col.slug}`}
                className="group block relative overflow-hidden aspect-[3/4] bg-card"
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-foreground font-heading font-bold text-lg uppercase tracking-wide">
                    {col.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-mono tracking-wider mt-3 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to={createPageUrl('Collections')}
          className="md:hidden flex items-center justify-center gap-2 text-primary font-mono text-sm tracking-wider mt-8 hover:gap-3 transition-all"
        >
          View All Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}