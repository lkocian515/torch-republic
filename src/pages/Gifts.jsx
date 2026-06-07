import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gift, Heart, Star, Sparkles, Check, ChevronRight } from 'lucide-react';

const RG = '#E6B7AD';

const RITUAL_KITS = [
  {
    id: 'morning-clarity',
    name: 'Morning Clarity Kit',
    description: 'Start each day with intention. Features Lion\'s Mane-infused blends for focus and mental clarity.',
    price: 89.99,
    compareAtPrice: 110.00,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800',
    blends: ['Suncap Rise', 'Glowmind Clarity', 'The Oracle'],
    icon: '🌅',
    accent: '#D4A574',
  },
  {
    id: 'evening-restore',
    name: 'Evening Restore Kit',
    description: 'Unwind and restore. Chaga-rich blends for relaxation and evening ritual.',
    price: 89.99,
    compareAtPrice: 110.00,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800',
    blends: ['Mooncap Restore', 'Dreamcap Blend', 'Mystic Bloom'],
    icon: '🌙',
    accent: '#A87F74',
  },
  {
    id: 'complete-ritual',
    name: 'Complete Ritual Kit',
    description: 'The full experience. All six signature blends for morning, day, and evening rituals.',
    price: 159.99,
    compareAtPrice: 220.00,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800',
    blends: ['All 6 Signature Blends'],
    icon: '✨',
    accent: '#C9A24A',
    featured: true,
  },
  {
    id: 'matcha-serenity',
    name: 'Matcha Serenity Kit',
    description: 'Ceremonial grade matcha blends for calm energy and inspired focus.',
    price: 79.99,
    compareAtPrice: 95.00,
    image: 'https://images.unsplash.com/photo-1582793988755-02472969ee3c?q=80&w=800',
    blends: ['The Monk', 'The Ascendant', 'The Alchemist'],
    icon: '🍵',
    accent: '#8FB996',
  },
];

const GIFT_MESSAGE_TEMPLATE = {
  recipient_name: '',
  recipient_email: '',
  message: '',
  sender_name: '',
  send_date: '',
};

function GiftKitCard({ kit, onSelect, selected }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(kit)}
      className={`cursor-pointer transition-all duration-300 ${selected?.id === kit.id ? 'scale-[1.02]' : ''}`}
      style={{
        background: selected?.id === kit.id ? `rgba(230,183,173,0.08)` : 'rgba(255,255,255,0.02)',
        border: `1px solid ${selected?.id === kit.id ? RG : 'rgba(230,183,173,0.15)'}`,
        borderRadius: '3px',
        overflow: 'hidden',
      }}
    >
      {kit.featured && (
        <div
          className="px-4 py-2 font-mono text-[8px] tracking-[0.3em] uppercase font-bold"
          style={{ background: RG, color: '#050505', textAlign: 'center' }}
        >
          Most Popular Gift
        </div>
      )}
      
      <div className="p-6">
        {/* Image */}
        <div className="relative mb-4 overflow-hidden rounded-sm" style={{ height: '240px' }}>
          <img
            src={kit.image}
            alt={kit.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, rgba(${kit.accent === RG ? '230,183,173' : '168,127,116'},0.15) 0%, transparent 100%)`,
            }}
          />
        </div>

        {/* Icon & Name */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{kit.icon}</span>
          <h3 className="font-serif font-bold text-xl" style={{ color: '#F5EFE6' }}>
            {kit.name}
          </h3>
        </div>

        {/* Description */}
        <p className="font-heading text-sm mb-4" style={{ color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.7 }}>
          {kit.description}
        </p>

        {/* Blends */}
        <div className="mb-4">
          <p className="font-mono text-[8px] tracking-[0.25em] uppercase mb-2" style={{ color: `${RG}60` }}>
            Includes
          </p>
          <div className="flex flex-wrap gap-2">
            {kit.blends.map((blend, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-sm font-mono text-[8px] tracking-[0.2em] uppercase"
                style={{
                  background: `${kit.accent}15`,
                  border: `1px solid ${kit.accent}30`,
                  color: kit.accent,
                }}
              >
                {blend}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-serif font-bold text-2xl" style={{ color: RG }}>
            ${kit.price}
          </span>
          <span className="font-mono text-xs line-through" style={{ color: 'rgba(230,183,173,0.4)' }}>
            ${kit.compareAtPrice}
          </span>
          <span
            className="px-2 py-0.5 rounded-sm font-mono text-[8px] tracking-[0.2em] uppercase font-bold"
            style={{ background: 'rgba(110,189,142,0.15)', color: '#6EBD8E' }}
          >
            Save {Math.round((1 - kit.price / kit.compareAtPrice) * 100)}%
          </span>
        </div>

        {/* Select Button */}
        <button
          className={`w-full py-3 px-4 font-mono text-[9px] tracking-[0.3em] uppercase font-bold transition-all rounded-sm ${
            selected?.id === kit.id ? 'opacity-90' : 'hover:opacity-90'
          }`}
          style={{
            background: selected?.id === kit.id ? RG : `${RG}15`,
            color: selected?.id === kit.id ? '#050505' : RG,
            border: `1px solid ${selected?.id === kit.id ? RG : `${RG}30`}`,
          }}
        >
          {selected?.id === kit.id ? '✓ Selected' : 'Select This Kit'}
        </button>
      </div>
    </motion.div>
  );
}

function GiftMessageForm({ message, onChange, onSubmit, isSubmitting }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(230,183,173,0.05)',
        border: `1px solid ${RG}20`,
        borderRadius: '3px',
        padding: 'clamp(24px, 4vw, 32px)',
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Heart size={20} style={{ color: RG }} />
        <h3 className="font-serif font-bold text-2xl" style={{ color: '#F5EFE6' }}>
          Personalize Your Gift
        </h3>
      </div>

      <div className="space-y-5 mb-6">
        <div>
          <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: `${RG}70` }}>
            Recipient Name *
          </label>
          <input
            type="text"
            value={message.recipient_name}
            onChange={(e) => onChange('recipient_name', e.target.value)}
            className="w-full px-4 py-3 font-heading text-sm bg-transparent border rounded-sm focus:outline-none transition-colors"
            style={{ borderColor: `${RG}30`, color: '#F5EFE6' }}
            placeholder="Enter recipient's name"
          />
        </div>

        <div>
          <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: `${RG}70` }}>
            Recipient Email (optional)
          </label>
          <input
            type="email"
            value={message.recipient_email}
            onChange={(e) => onChange('recipient_email', e.target.value)}
            className="w-full px-4 py-3 font-heading text-sm bg-transparent border rounded-sm focus:outline-none transition-colors"
            style={{ borderColor: `${RG}30`, color: '#F5EFE6' }}
            placeholder="For digital gift card delivery"
          />
        </div>

        <div>
          <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: `${RG}70` }}>
            Your Message *
          </label>
          <textarea
            value={message.message}
            onChange={(e) => onChange('message', e.target.value)}
            rows={5}
            className="w-full px-4 py-3 font-heading text-sm bg-transparent border rounded-sm focus:outline-none transition-colors resize-none"
            style={{ borderColor: `${RG}30`, color: '#F5EFE6' }}
            placeholder="Write a personal message for their special day..."
            maxLength={500}
          />
          <p className="font-mono text-[8px] tracking-[0.2em] mt-2 text-right" style={{ color: 'rgba(230,183,173,0.4)' }}>
            {message.message.length}/500 characters
          </p>
        </div>

        <div>
          <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: `${RG}70` }}>
            Your Name *
          </label>
          <input
            type="text"
            value={message.sender_name}
            onChange={(e) => onChange('sender_name', e.target.value)}
            className="w-full px-4 py-3 font-heading text-sm bg-transparent border rounded-sm focus:outline-none transition-colors"
            style={{ borderColor: `${RG}30`, color: '#F5EFE6' }}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block font-mono text-[9px] tracking-[0.25em] uppercase mb-2" style={{ color: `${RG}70` }}>
            Send Date (optional)
          </label>
          <input
            type="date"
            value={message.send_date}
            onChange={(e) => onChange('send_date', e.target.value)}
            className="w-full px-4 py-3 font-heading text-sm bg-transparent border rounded-sm focus:outline-none transition-colors"
            style={{ borderColor: `${RG}30`, color: '#F5EFE6' }}
          />
          <p className="font-mono text-[8px] tracking-[0.2em] mt-2" style={{ color: 'rgba(230,183,173,0.4)' }}>
            Leave empty to send immediately
          </p>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isSubmitting || !message.recipient_name || !message.message || !message.sender_name}
        className="w-full py-4 px-6 font-mono text-[10px] tracking-[0.35em] uppercase font-bold transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed btn-glow"
        style={{
          background: RG,
          color: '#050505',
        }}
      >
        {isSubmitting ? 'Processing...' : 'Continue to Checkout →'}
      </button>

      <p className="font-mono text-[8px] tracking-[0.2em] text-center mt-4" style={{ color: 'rgba(230,183,173,0.4)' }}>
        Free gift wrapping & personalized card included
      </p>
    </motion.div>
  );
}

export default function Gifts() {
  const [selectedKit, setSelectedKit] = useState(null);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [giftMessage, setGiftMessage] = useState(GIFT_MESSAGE_TEMPLATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleKitSelect = (kit) => {
    setSelectedKit(kit);
    setShowMessageForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMessageChange = (field, value) => {
    setGiftMessage((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: Implement checkout with gift message
    // For now, redirect to subscription page as placeholder
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Gift checkout integration coming soon! This would connect to Shopify with the gift message.');
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Hero */}
      <section
        className="px-6 md:px-10 pt-20 pb-16 text-center"
        style={{
          borderBottom: '1px solid rgba(230,183,173,0.08)',
          background: 'radial-gradient(ellipse at top, rgba(230,183,173,0.08) 0%, transparent 70%)',
        }}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-mono text-[9px] tracking-[0.55em] uppercase mb-4" style={{ color: `${RG}60` }}>
            Torch Republic Coffee Company
          </p>
          <h1 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#F5EFE6', letterSpacing: '-0.02em' }}>
            Gift a Ritual
          </h1>
          <p
            className="font-heading max-w-2xl mx-auto mb-8"
            style={{ fontSize: '1.05rem', color: 'rgba(240,235,225,0.55)', fontWeight: 300, lineHeight: 1.85 }}
          >
            Share the gift of intentional daily rituals. Curated mushroom coffee and matcha kits, beautifully packaged with your personal message.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Gift size={16} style={{ color: RG }} />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
                Free Gift Wrapping
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={16} style={{ color: RG }} />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
                Personalized Card
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} style={{ color: RG }} />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: 'rgba(230,183,173,0.6)' }}>
                Premium Packaging
              </span>
            </div>
          </div>
          <Link
            to="#ritual-kits"
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8 rounded-sm"
            style={{ background: RG, color: '#050505' }}
          >
            Explore Gift Kits <ChevronRight size={14} />
          </Link>
        </motion.div>
      </section>

      {/* Ritual Kits Grid */}
      <section id="ritual-kits" className="px-6 md:px-10 py-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}80` }}>
              Curated Collections
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: '#F5EFE6' }}>
              Choose Their Ritual
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {RITUAL_KITS.map((kit, i) => (
              <GiftKitCard
                key={kit.id}
                kit={kit}
                selected={selectedKit}
                onSelect={handleKitSelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gift Message Form */}
      {showMessageForm && selectedKit && (
        <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.08)' }}>
          <div className="max-w-[700px] mx-auto">
            <GiftMessageForm
              message={giftMessage}
              onChange={handleMessageChange}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </section>
      )}

      {/* How It Works */}
      <section
        className="px-6 md:px-10 py-16"
        style={{
          background: 'rgba(255,255,255,0.01)',
          borderTop: '1px solid rgba(230,183,173,0.06)',
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-mono text-[9px] tracking-[0.5em] uppercase mb-3" style={{ color: `${RG}80` }}>
              Simple Process
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#F5EFE6' }}>
              How Gifting Works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose Their Kit',
                description: 'Select from our curated ritual collections based on their preferences and lifestyle.',
                icon: Sparkles,
              },
              {
                step: '02',
                title: 'Add Personal Touch',
                description: 'Write a heartfelt message that will be printed on a premium gift card.',
                icon: Heart,
              },
              {
                step: '03',
                title: 'We Handle the Rest',
                description: 'Beautifully wrapped and delivered with your message. Ready to gift.',
                icon: Gift,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${RG}10`, border: `1px solid ${RG}25` }}
                >
                  <item.icon size={28} style={{ color: RG }} />
                </div>
                <p className="font-mono text-[8px] tracking-[0.3em] uppercase mb-2" style={{ color: `${RG}50` }}>
                  Step {item.step}
                </p>
                <h3 className="font-serif font-bold text-lg mb-3" style={{ color: '#F5EFE6' }}>
                  {item.title}
                </h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-16" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(230,183,173,0.45)' }}>
              Questions
            </p>
            <h2 className="font-serif font-bold" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6' }}>
              Gift FAQ
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: 'Can I schedule the gift to be sent on a specific date?',
                a: 'Yes! During checkout, you can select a future delivery date. We\'ll ensure it arrives on time for birthdays, holidays, or special occasions.',
              },
              {
                q: 'Is the gift message printed on a card?',
                a: 'Absolutely. Your personalized message is printed on a premium cardstock gift card and included in the package.',
              },
              {
                q: 'What if the recipient wants to exchange blends?',
                a: 'Gift recipients can exchange their kit for any other blend within 30 days. We include a prepaid return label for easy exchanges.',
              },
              {
                q: 'Do you offer bulk corporate gifting?',
                a: 'Yes! For orders of 10+ kits, contact us at gifts@torchrepublic.com for custom pricing and branding options.',
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="p-5"
                style={{
                  background: 'rgba(255,255,255,0.015)',
                  border: `1px solid ${RG}10`,
                  borderRadius: '2px',
                }}
              >
                <h3 className="font-heading font-medium mb-2" style={{ color: '#F5EFE6', fontSize: '0.95rem' }}>
                  {faq.q}
                </h3>
                <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 md:px-10 py-16 text-center" style={{ borderTop: '1px solid rgba(230,183,173,0.06)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <p className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: `${RG}60` }}>
            Need Help?
          </p>
          <h2 className="font-serif font-bold mb-4" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#F5EFE6' }}>
            Can't Decide?
          </h2>
          <p className="font-heading mb-6" style={{ color: 'rgba(240,235,225,0.5)', fontWeight: 300, lineHeight: 1.8 }}>
            Our Complete Ritual Kit is the perfect choice — all six signature blends for the full experience.
          </p>
          <Link
            to="/gifts"
            onClick={(e) => {
              e.preventDefault();
              handleKitSelect(RITUAL_KITS.find(k => k.id === 'complete-ritual'));
            }}
            className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.35em] uppercase font-bold transition-all hover:opacity-90 py-3.5 px-8 rounded-sm"
            style={{ background: RG, color: '#050505' }}
          >
            Choose Complete Kit <ChevronRight size={14} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}