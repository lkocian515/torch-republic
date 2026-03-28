import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const COLLECTIONS = [
  {
    name: 'Patriot Pride Collection',
    slug: 'patriotic-pride',
    description: 'Wear your love for this country front and center.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/american-heart-collection-9399768.png?v=1772927307&width=1500',
  },
  {
    name: 'Freedom Collection',
    slug: 'freedom-isnt-free',
    description: 'Honor those who paid the price for liberty.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/freedom-isnt-free-collection-9247105.png?v=1772308430&width=1500',
  },
  {
    name: 'God, Family, Country Collection',
    slug: 'god-family-country',
    description: 'The foundation of everything we stand for.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/god-family-country-collection-1224586.png?v=1772308435&width=1500',
  },
  {
    name: 'We The People Collection',
    slug: 'we-the-people',
    description: 'Inspired by the Constitution and our founding principles.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/we-the-people-collection-4279634.png?v=1772927373&width=1500',
  },
  {
    name: 'Founders Collection',
    slug: 'founders',
    description: 'Premium, original, and built for those here from the beginning.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/founders-collection-2446309.png?v=1772308439&width=1500',
  },
  {
    name: 'American Heroes Collection',
    slug: 'american-heroes',
    description: 'Honor the brave men and women who served.',
    image: 'https://www.torchrepublic.com/cdn/shop/collections/american-heroes-collection-3537113.png?v=1772308437&width=1500',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="pt-10 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-widest" style={{ color: '#E8DFAF' }}>
              Shop Collections
            </h2>
          </div>
          <Link
            to={createPageUrl('Collections')}
            className="hidden md:flex items-center gap-2 text-primary font-mono text-sm tracking-wider hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-flex items-center gap-1 font-heading font-bold text-sm uppercase tracking-wide text-white group-hover:gap-2 transition-all">
                    {col.name} <ArrowRight className="w-3 h-3" />
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