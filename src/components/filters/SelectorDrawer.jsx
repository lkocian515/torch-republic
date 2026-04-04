import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SelectorDrawer({
  open,
  onOpenChange,
  title,
  options,
  value,
  onValueChange,
}) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-card border-border">
        <DrawerHeader className="border-b border-border">
          <DrawerTitle className="text-foreground font-heading">{title}</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-72 w-full">
          <div className="p-4 space-y-2">
            {options.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  onValueChange(key);
                  onOpenChange(false);
                }}
                className="w-full text-left px-4 py-3 rounded font-mono text-sm tracking-wide transition-colors min-h-[44px] flex items-center"
                style={{
                  background:
                    value === key
                      ? 'linear-gradient(135deg, #0E2A2F 0%, #1B5060 50%, #C8A44D 100%)'
                      : 'transparent',
                  color: value === key ? '#fff' : '#C8A44D',
                  border: value === key ? '1px solid rgba(212,175,90,0.4)' : '1px solid rgba(212,175,90,0.2)',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}