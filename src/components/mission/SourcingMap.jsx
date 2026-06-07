import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Leaf, Coffee, Globe, X, ChevronRight } from 'lucide-react';

const RG = '#E6B7AD';

const SOURCING_LOCATIONS = [
  {
    id: 'lions-mane',
    name: "Lion's Mane Mushroom",
    type: 'mushroom',
    region: 'Pacific Northwest, USA',
    coordinates: { x: 28, y: 38 },
    icon: Leaf,
    color: '#E6B7AD',
    description: 'Our Lion\'s Mane is wild-harvested from the pristine forests of the Pacific Northwest, where cool, moist climates create ideal growing conditions.',
    practices: [
      'Sustainably wild-harvested',
      'Supports local foraging communities',
      'Third-party tested for purity',
      'No fillers or mycelium',
    ],
    altitude: '1,000-2,500 ft',
    season: 'Late summer to early fall',
  },
  {
    id: 'chaga',
    name: 'Chaga Mushroom',
    type: 'mushroom',
    region: 'Alaska, USA',
    coordinates: { x: 15, y: 25 },
    icon: Leaf,
    color: '#D6B27A',
    description: 'Wild-harvested from birch trees in the remote wilderness of Alaska, where extreme cold creates potent antioxidant profiles.',
    practices: [
      'Wild-harvested from birch trees',
      'Ethical harvesting practices',
      'Preserves forest ecosystems',
      'Rich in superoxide dismutase',
    ],
    altitude: 'Sea level to 3,000 ft',
    season: 'Year-round (winter harvested)',
  },
  {
    id: 'coffee-colombia',
    name: 'Premium Coffee Beans',
    type: 'coffee',
    region: 'Huila, Colombia',
    coordinates: { x: 42, y: 58 },
    icon: Coffee,
    color: '#C98F86',
    description: 'Sourced from small family farms in the Huila region, known for producing some of the world\'s finest specialty coffee at high altitudes.',
    practices: [
      'Direct trade with farmers',
      'Fair wages above market price',
      'Shade-grown methods',
      'Water-conscious processing',
    ],
    altitude: '1,800-2,200 meters',
    season: 'Harvest: October-February',
  },
  {
    id: 'coffee-ethiopia',
    name: 'Heirloom Coffee Varietals',
    type: 'coffee',
    region: 'Yirgacheffe, Ethiopia',
    coordinates: { x: 62, y: 52 },
    icon: Coffee,
    color: '#C4A8A0',
    description: 'From the birthplace of coffee itself, these heirloom varietals are grown using traditional methods passed down through generations.',
    practices: [
      'Heirloom coffee varietals',
      'Organic farming methods',
      'Supports rural communities',
      'Preserves coffee heritage',
    ],
    altitude: '1,700-2,200 meters',
    season: 'Harvest: October-January',
  },
  {
    id: 'matcha-japan',
    name: 'Ceremonial Matcha',
    type: 'matcha',
    region: 'Uji, Japan',
    coordinates: { x: 78, y: 38 },
    icon: Leaf,
    color: '#10B981',
    description: 'Grown in the historic tea region of Uji, where traditional cultivation methods have been perfected over 800 years.',
    practices: [
      'Shade-grown for 30 days',
      'Stone-ground to fine powder',
      'Ceremonial grade quality',
      'Rich in L-theanine',
    ],
    altitude: 'Sea level to 500 meters',
    season: 'First harvest: April-May',
  },
];

export default function SourcingMap() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <section className="px-6 md:px-10 py-20" style={{ background: '#080808', borderTop: `1px solid ${RG}15`, borderBottom: `1px solid ${RG}15` }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}70` }}>
            Ethical Sourcing
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: '#F5EFE6' }}>
            Where Quality Begins
          </h2>
          <p className="font-heading max-w-2xl mx-auto" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.8 }}>
            Every ingredient is ethically sourced from regions renowned for their ideal growing conditions and sustainable farming traditions
          </p>
        </motion.div>

        {/* Interactive Map */}
        <div className="relative mb-12">
          {/* World Map Container */}
          <div
            className="relative w-full overflow-hidden rounded-lg"
            style={{
              background: 'linear-gradient(135deg, #0F0E0D 0%, #1A1816 100%)',
              border: `1px solid ${RG}20`,
              aspectRatio: '16/9',
            }}
          >
            {/* Simplified World Map SVG */}
            <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {/* Continents - Simplified */}
              <path
                d="M15,12 Q20,10 25,12 T35,15 T40,20 T35,25 T25,22 T20,18 Z"
                fill="rgba(230,183,173,0.08)"
                stroke={RG}
                strokeWidth="0.3"
                opacity="0.4"
              />
              <path
                d="M55,15 Q65,12 75,15 T85,20 T80,28 T70,25 T60,22 Z"
                fill="rgba(230,183,173,0.08)"
                stroke={RG}
                strokeWidth="0.3"
                opacity="0.4"
              />
              <path
                d="M40,45 Q45,42 50,45 T55,50 T50,52 T45,50 Z"
                fill="rgba(230,183,173,0.08)"
                stroke={RG}
                strokeWidth="0.3"
                opacity="0.4"
              />
              <path
                d="M75,35 Q80,32 85,35 T90,40 T85,45 T80,42 Z"
                fill="rgba(230,183,173,0.08)"
                stroke={RG}
                strokeWidth="0.3"
                opacity="0.4"
              />

              {/* Location Markers */}
              {SOURCING_LOCATIONS.map((location) => (
                <g
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className="cursor-pointer"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                >
                  <circle
                    cx={location.coordinates.x}
                    cy={location.coordinates.y}
                    r="2.5"
                    fill={selectedLocation?.id === location.id ? location.color : `${location.color}40`}
                    stroke={location.color}
                    strokeWidth="0.5"
                    className="transition-all duration-300"
                  />
                  {selectedLocation?.id === location.id && (
                    <circle
                      cx={location.coordinates.x}
                      cy={location.coordinates.y}
                      r="4"
                      fill="none"
                      stroke={location.color}
                      strokeWidth="0.3"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="r"
                        values="2.5;4"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.8;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              ))}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 flex gap-4">
              <div className="flex items-center gap-2">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#E6B7AD' }} />
                <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.6)' }}>Mushrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C98F86' }} />
                <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.6)' }}>Coffee</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                <span className="font-mono text-[7px] tracking-[0.2em] uppercase" style={{ color: 'rgba(240,235,225,0.6)' }}>Matcha</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SOURCING_LOCATIONS.map((location, idx) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedLocation(location)}
              className="cursor-pointer"
            >
              <div
                className="p-6 h-full transition-all hover:scale-[1.02]"
                style={{
                  background: selectedLocation?.id === location.id ? `${location.color}08` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${selectedLocation?.id === location.id ? location.color : 'rgba(230,183,173,0.1)'}${selectedLocation?.id === location.id ? '' : '15'}`,
                  borderRadius: '6px',
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `${location.color}15`,
                      border: `1px solid ${location.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <location.icon size={18} style={{ color: location.color }} />
                  </div>
                  <ChevronRight size={16} style={{ color: location.color, opacity: 0.6 }} />
                </div>

                <h3 className="font-serif font-bold text-lg mb-2" style={{ color: '#F5EFE6' }}>
                  {location.name}
                </h3>

                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={12} style={{ color: location.color }} />
                  <p className="font-mono text-[8px] tracking-[0.25em] uppercase" style={{ color: location.color }}>
                    {location.region}
                  </p>
                </div>

                <p className="font-heading text-xs mb-4" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7 }}>
                  {location.description}
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(240,235,225,0.4)' }}>Altitude</p>
                    <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.7)' }}>{location.altitude}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[7px] tracking-[0.2em] uppercase mb-1" style={{ color: 'rgba(240,235,225,0.4)' }}>Season</p>
                    <p className="font-heading text-xs" style={{ color: 'rgba(240,235,225,0.7)' }}>{location.season}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sourcing Standards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div
            className="inline-flex flex-col items-center gap-4 px-8 py-6"
            style={{
              background: 'rgba(230,183,173,0.05)',
              border: `1px solid ${RG}20`,
              borderRadius: '6px',
            }}
          >
            <Globe size={24} style={{ color: RG }} />
            <div>
              <p className="font-serif font-bold text-lg mb-2" style={{ color: '#F5EFE6' }}>
                Our Sourcing Standards
              </p>
              <p className="font-heading text-sm max-w-xl" style={{ color: 'rgba(240,235,225,0.6)', fontWeight: 300, lineHeight: 1.8 }}>
                We partner directly with farmers and harvesters who share our commitment to quality, sustainability, and fair compensation. Every ingredient is third-party tested for purity and potency.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLocation(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(8,8,8,0.95)' }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: '#0F0E0D',
                border: `1px solid ${selectedLocation.color}30`,
                borderRadius: '8px',
                padding: 'clamp(24px, 5vw, 40px)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLocation(null)}
                className="absolute top-4 right-4 p-2 rounded-full transition-all hover:opacity-70"
                style={{ background: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} style={{ color: '#F5EFE6' }} />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div
                  className="mb-6 mx-auto"
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: `${selectedLocation.color}15`,
                    border: `1px solid ${selectedLocation.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <selectedLocation.icon size={32} style={{ color: selectedLocation.color }} />
                </div>

                <h3 className="font-serif font-bold text-2xl mb-2" style={{ color: '#F5EFE6' }}>
                  {selectedLocation.name}
                </h3>

                <div className="flex items-center justify-center gap-2">
                  <MapPin size={14} style={{ color: selectedLocation.color }} />
                  <p className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: selectedLocation.color }}>
                    {selectedLocation.region}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <p className="font-heading text-sm leading-relaxed text-center" style={{ color: 'rgba(240,235,225,0.65)', fontWeight: 300, lineHeight: 1.9 }}>
                  {selectedLocation.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                  style={{
                    background: `${selectedLocation.color}08`,
                    border: `1px solid ${selectedLocation.color}20`,
                    borderRadius: '4px',
                    padding: '16px',
                  }}
                >
                  <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: `${selectedLocation.color}80` }}>
                    Altitude
                  </p>
                  <p className="font-heading text-sm" style={{ color: '#F5EFE6', fontWeight: 400 }}>
                    {selectedLocation.altitude}
                  </p>
                </div>
                <div
                  style={{
                    background: `${selectedLocation.color}08`,
                    border: `1px solid ${selectedLocation.color}20`,
                    borderRadius: '4px',
                    padding: '16px',
                  }}
                >
                  <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-2" style={{ color: `${selectedLocation.color}80` }}>
                    Harvest Season
                  </p>
                  <p className="font-heading text-sm" style={{ color: '#F5EFE6', fontWeight: 400 }}>
                    {selectedLocation.season}
                  </p>
                </div>
              </div>

              {/* Practices */}
              <div>
                <p className="font-mono text-[8px] tracking-[0.35em] uppercase mb-4" style={{ color: `${selectedLocation.color}80` }}>
                  Sourcing Practices
                </p>
                <ul className="space-y-3">
                  {selectedLocation.practices.map((practice, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: selectedLocation.color,
                          marginTop: '8px',
                          flexShrink: 0,
                        }}
                      />
                      <span className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.7)', fontWeight: 300 }}>
                        {practice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}