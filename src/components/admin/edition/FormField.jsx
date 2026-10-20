import React from 'react';

/** Small labelled field used across the special-editions admin forms. */
export default function FormField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  rows = 3,
  options,
  min,
  max,
}) {
  const id = `field-${label.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;

  if (type === 'checkbox') {
    return (
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          style={{ width: 18, height: 18, minHeight: 18, marginTop: 3 }}
        />
        <label htmlFor={id} style={{ fontWeight: 500 }}>
          {label}
          {hint && <span className="mt-1 block text-readable-secondary" style={{ fontSize: '0.75rem', fontWeight: 400 }}>{hint}</span>}
        </label>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {hint && (
        <p className="mt-1 text-readable-secondary" style={{ fontSize: '0.75rem' }}>
          {hint}
        </p>
      )}

      {type === 'textarea' ? (
        <textarea id={id} className="mt-2 w-full" rows={rows} value={value || ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : type === 'select' ? (
        <select id={id} className="mt-2 w-full" value={value || ''} onChange={(e) => onChange(e.target.value)}>
          {(options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className="mt-2 w-full"
          type={type}
          min={min}
          max={max}
          value={value ?? ''}
          placeholder={placeholder}
          onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        />
      )}
    </div>
  );
}