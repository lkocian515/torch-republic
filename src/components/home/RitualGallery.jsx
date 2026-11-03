import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Sun, Book, Laptop, Music, Mountain } from 'lucide-react';

const RG = '#E6AC45';

const RITUAL_PHOTOS = [
  {
    id: 1,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/8815056a9_8.png',
    name: 'Sarah M.',
    location: 'Chicago, IL',
    ritual: 'Morning Pages and Reflection',
    blend: 'GlowMind Clarity',
    description: 'I start every morning with journaling and my GlowMind coffee. It helps me set intentions for the day.',
    icon: Book,
    likes: 234,
  },
  {
    id: 2,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/1cde802f2_9.png',
    name: 'Marcus T.',
    location: 'Austin, TX',
    ritual: 'Pre-Work Focus Session',
    blend: 'SunCap Rise',
    description: 'Before my deep work blocks, I brew SunCap Rise as part of an intentional morning ritual.',
    icon: Laptop,
    likes: 189,
  },
  {
    id: 3,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/55f9e1350_10.png',
    name: 'James R.',
    location: 'Denver, CO',
    ritual: 'Sunrise Meditation',
    blend: 'The Oracle',
    description: 'Watching the sunrise with The Oracle blend has become my sacred morning practice.',
    icon: Sun,
    likes: 312,
  },
  {
    id: 4,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/0a615b4db_11.png',
    name: 'Emma L.',
    location: 'Portland, OR',
    ritual: 'Creative Studio Time',
    blend: 'Mystic Bloom',
    description: 'Mystic Bloom fuels my morning art sessions. The ritual inspires creativity.',
    icon: Coffee,
    likes: 267,
  },
  {
    id: 5,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/2bcbd60ef_12.png',
    name: 'David K.',
    location: 'Brooklyn, NY',
    ritual: 'Evening Wind-Down',
    blend: 'DreamCap Blend',
    description: 'DreamCap helps me transition from work mode to rest. Perfect evening ritual.',
    icon: Music,
    likes: 198,
  },
  {
    id: 6,
    image: 'https://media.base44.com/images/public/69afc77e4c80e5e88ca6e3ec/9d0e4d06a_13.png',
    name: 'Jessica H.',
    location: 'San Francisco, CA',
    ritual: 'Mountain Morning Hikes',
    blend: 'MoonCap Restore',
    description: 'I take MoonCap on my weekend hikes. Nature plus intentional coffee equals perfect morning.',
    icon: Mountain,
    likes: 421,
  },
];

export default function RitualGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}70` }}>
            Community Rituals
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F7F2E9' }}>
            The Ritual Gallery
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            See how our community incorporates Torch Republic into their personal morning routines
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RITUAL_PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedPhoto(photo)}
              className="cursor-pointer group"
            >
              <div
                className="relative overflow-hidden"
                style={{
                  background: 'rgba(230,183,173,0.04)',
                  border: `1px solid ${RG}15`,
                  borderRadius: '6px',
                  aspectRatio: '4/5',
                }}
              >
                <img
                  src={photo.image}
                  alt={photo.ritual}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 40%, transparent 100%)' }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <photo.icon size={14} style={{ color: RG }} />
                      <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: RG }}>
                        {photo.blend}
                      </p>
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2" style={{ color: '#F7F2E9' }}>
                      {photo.ritual}
                    </h3>
                    <p className="font-heading text-xs mb-3" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.6 }}>
                      {photo.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.5)' }}>
                        {photo.name} - {photo.location}
                      </p>
                      <div className="flex items-center gap-1">
                        <Heart size={14} style={{ color: RG }} />
                        <span className="font-mono text-[9px]" style={{ color: RG }}>{photo.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}