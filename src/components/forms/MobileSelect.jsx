import React from 'react';
import { Drawer } from 'vaul';
import { Check, ChevronDown } from 'lucide-react';

export default function MobileSelect({
  value,
  onChange,
  options,
  placeholder = 'Select',
  title = 'Choose an option',
  ariaLabel,
  className = '',
  style = {},
}) {
  const selected = options.find((option) => String(option.value) === String(value));
  const label = selected?.label || placeholder;

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button
          type="button"
          aria-label={ariaLabel || title}
          aria-haspopup="dialog"
          className={`flex min-h-[44px] w-full items-center justify-between text-left ${className}`}
          style={style}
        >
          <span className="truncate">{label}</span>
          <ChevronDown className="ml-3 h-4 w-4 flex-shrink-0 opacity-70" aria-hidden="true" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[80] bg-black/45" />
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-[81] rounded-t-[24px] border-t bg-background p-4 shadow-2xl outline-none"
          style={{ borderColor: 'hsl(var(--border))' }}
        >
          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" aria-hidden="true" />
          <Drawer.Title className="px-2 pb-2 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </Drawer.Title>
          <Drawer.Description className="sr-only">
            Select one option from the list below.
          </Drawer.Description>
          <div className="max-h-[60vh] overflow-y-auto pb-[env(safe-area-inset-bottom)]">
            {options.map((option) => {
              const active = String(option.value) === String(value);
              return (
                <Drawer.Close asChild key={option.value}>
                  <button
                    type="button"
                    onClick={() => onChange(option.value)}
                    className="flex min-h-[52px] w-full items-center justify-between rounded-xl px-3 py-3 text-left font-heading text-base"
                    style={{
                      color: active ? 'hsl(var(--primary))' : 'hsl(var(--foreground))',
                      background: active ? 'hsl(var(--secondary))' : 'transparent',
                    }}
                  >
                    <span>{option.label}</span>
                    {active && <Check className="h-5 w-5" aria-hidden="true" />}
                  </button>
                </Drawer.Close>
              );
            })}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}