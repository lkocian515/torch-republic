import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ALL_COLLECTIONS = [
  {
    name: 'Best Sellers',
    slug: 'best-sellers',
    description: 'Discover our best-selling patriotic apparel, accessories, and lifestyle goods.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/best-sellers-collection.jpg?v=1772308387&width=1500',
    page: 'BestSellers',
  },
  {
    name: 'Liberty Flame Collection',
    slug: 'liberty-flame',
    description: 'The Liberty Flame Collection represents the fire of freedom that never goes out.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/liberty-flame-collection.jpg?v=1772308427&width=1500',
    icon: '🔥',
    page: 'BestSellers',
  },
  {
    name: 'Patriotic Pride Collection',
    slug: 'patriotic-pride',
    description: 'Wear your love for this country where it belongs — front and center.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/patriotic-pride-collection.jpg?v=1772927307&width=1500',
    icon: '🦅',
    page: 'BestSellers',
  },
  {
    name: "Freedom Isn't Free",
    slug: 'freedom-isnt-free',
    description: 'Freedom comes at a cost, and this collection honors those who paid the price.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/freedom-collection.jpg?v=1772308430&width=1500',
    icon: '💥',
    page: 'BestSellers',
  },
  {
    name: 'We The People',
    slug: 'we-the-people',
    description: 'Inspired by the Constitution and the founding principles of this nation.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/we-the-people-collection.jpg?v=1772927373&width=1500',
    icon: '📜',
    page: 'BestSellers',
  },
  {
    name: 'Faith Over Fear',
    slug: 'faith-over-fear',
    description: 'Stand firm in your faith no matter the storm.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/faith-over-fear-collection.jpg?v=1772308432&width=1500',
    icon: '✝️',
    page: 'BestSellers',
  },
  {
    name: 'Christ Is King',
    slug: 'christ-is-king',
    description: 'Unapologetically bold and rooted in truth.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/christ-is-king-collection.jpg?v=1773006011&width=1500',
    icon: '👑',
    page: 'BestSellers',
  },
  {
    name: 'God · Family · Country',
    slug: 'god-family-country',
    description: 'The foundation of everything we stand for.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/god-family-country-collection.jpg?v=1772308435&width=1500',
    icon: '🏡',
    page: 'BestSellers',
  },
  {
    name: 'American Heroes',
    slug: 'american-heroes',
    description: 'Honor the brave men and women who served.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/american-heroes-collection.jpg?v=1772308437&width=1500',
    icon: '🎖',
    page: 'BestSellers',
  },
  {
    name: 'Founders Collection',
    slug: 'founders',
    description: 'Premium, original, and built for those who were here from the beginning.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/founders-collection.jpg?v=1772308439&width=1500',
    icon: '🏛',
    page: 'BestSellers',
  },
  {
    name: 'Torchbearer Collection',
    slug: 'torchbearer',
    description: 'Carry the flame forward — exclusive designs for those committed to the mission.',
    image: 'https://cdn.shopify.com/s/files/1/0620/7140/6844/collections/torchbearer-collection.jpg?v=1772308439&width=1500',
    icon: '🔥',
    page: 'BestSellers',
  },
];

export default function Collections() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="pt-12 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-primary font-mono text-xs tracking-[0.4em] uppercase mb-3">
            Torch Republic
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight">
            Collections
          </h1>
          <p className="text-muted-foreground mt-4 max-w-lg">
            Browse our signature collections — each one built around a conviction worth wearing.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_COLLECTIONS.map((col, index) => (
            <motion.div
              key={col.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={createPageUrl(col.page) + `?collection=${col.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden bg-card"
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {col.icon && <span className="text-2xl mb-2 block">{col.icon}</span>}
                  <h3 className="text-foreground font-heading font-bold text-lg uppercase tracking-wide">
                    {col.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {col.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-xs font-mono tracking-wider mt-3 group-hover:gap-2 transition-all">
                    Shop Now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}