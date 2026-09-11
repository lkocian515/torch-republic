import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function AgentChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border bg-card p-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about your order status..."
        disabled={disabled}
        className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 transition-opacity"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}