import React, { useState, useEffect } from 'react';
import { Flame, Users } from 'lucide-react';

const RG = '#E6B7AD';

/**
 * Shows rotating urgency/social proof signals on product pages.
 * Uses deterministic-but-realistic fake numbers seeded by productSlug.
 */
export default function ScarcityBadge({ productSlug }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Seed a realistic number from the slug string
  const seed = productSlug ? productSlug.split('').reduce((a, c) => a + c.charCodeAt(0), 0) : 42;
  const viewing = 3 + (seed % 9);       // 3–11
  const stock   = 4 + (seed % 7);       // 4–10

  const messages = [
    { icon: Users, text: `${viewing} people viewing this right now` },
    { icon: Flame, text: `Only ${stock} tubes left at this price` },
    { icon: Flame, text: 'Ships within 1–2 business days' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMessageIndex(i => (i + 1) % messages.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const { icon: Icon, text } = messages[messageIndex];

  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 transition-opacity"
      style={{
        background: 'rgba(230,183,173,0.06)',
        border: `1px solid ${RG}20`,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <Icon size={12} style={{ color: RG, flexShrink: 0 }} />
      <span className="font-mono text-[9px] tracking-[0.15em]" style={{ color: `${RG}80` }}>
        {text}
      </span>
    </div>
  );
}