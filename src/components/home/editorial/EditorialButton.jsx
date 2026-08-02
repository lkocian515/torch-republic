import React from 'react';
import { Link } from 'react-router-dom';
import { colors } from './theme';

export default function EditorialButton({ to, children, variant = 'primary', disabled = false }) {
  const style = variant === 'primary'
    ? { background: colors.coffee, color: colors.card, border: `1px solid ${colors.coffee}` }
    : { background: colors.card, color: colors.text, border: `1px solid ${colors.border}` };
  const className = 'inline-flex min-h-[48px] items-center justify-center px-6 py-3 font-heading text-sm font-semibold transition-opacity duration-200 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  if (disabled) return <span className={className} style={{ ...style, opacity: 0.55 }}>{children}</span>;
  return <Link to={to} className={className} style={style}>{children}</Link>;
}