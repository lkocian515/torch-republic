import React from 'react';
import { STATUS_LABEL } from '@/lib/duos';

const STYLE = {
  available: { color: 'hsl(var(--primary-foreground))', background: 'hsl(var(--primary))' },
  upcoming: { color: 'hsl(var(--foreground))', background: 'hsl(var(--secondary))' },
  closed: { color: 'hsl(var(--muted-foreground))', background: 'hsl(var(--muted))' },
};

export default function DuoStatusBadge({ status }) {
  return (
    <span
      className="whitespace-nowrap font-mono uppercase"
      style={{ fontSize: '0.5625rem', letterSpacing: '0.12em', padding: '0.3rem 0.55rem', borderRadius: 999, ...(STYLE[status] || STYLE.upcoming) }}
    >
      {STATUS_LABEL[status] || STATUS_LABEL.upcoming}
    </span>
  );
}