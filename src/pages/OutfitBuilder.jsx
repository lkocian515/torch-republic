import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, Loader2, Shirt } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const COLLECTIONS = [
  { value: 'liberty-icons', label: 'Liberty Icons' },
  { value: 'patriotic-pride', label: 'Patriotic Pride' },
  { value: 'we-the-people', label: 'We The People' },
  { value: 'freedom-isnt-free', label: "Freedom Isn't Free" },
  { value: 'faith-over-fear', label: 'Faith Over Fear' },
  { value: 'christ-is-king', label: 'Christ Is King' },
  { value: 'god-family-country', label: 'God Family Country' },
  { value: 'american-heroes', label: 'American Heroes' },
  { value: 'liberty-flame', label: 'Liberty Flame' },
  { value: 'best-sellers', label: 'Best Sellers' },
];

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: 'rgba(201,162,74,0.15)', border: '1px solid rgba(201,162,74,0.3)' }}>
          <span style={{ fontSize: '0.85rem' }}>🔥</span>
        </div>
      )}
      <div className={`max-w-[85%] rounded px-4 py-3 ${isUser ? 'text-right' : ''}`}
        style={{
          background: isUser ? '#D4AE57' : '#161616',
          border: isUser ? 'none' : '1px solid rgba(196,163,90,0.12)',
          color: isUser ? '#080808' : '#F0EBE1',
        }}>
        {isUser ? (
          <p className="text-sm font-medium">{message.content}</p>
        ) : (
          <ReactMarkdown
            className="text-sm prose prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:leading-relaxed [&_p]:mb-2 [&_ul]:ml-4 [&_li]:mb-1 [&_strong]:text-yellow-300 [&_a]:text-yellow-400 [&_a]:underline"
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default function OutfitBuilder() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [starting, setStarting] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!conversation) return;
    const unsub = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
    });
    return unsub;
  }, [conversation?.id]);

  const startConversation = async (collection) => {
    setStarting(true);
    const conv = await base44.agents.createConversation({
      agent_name: 'outfit_builder',
      metadata: { name: `${collection} Outfit` },
    });
    setConversation(conv);
    const firstMsg = await base44.agents.addMessage(conv, {
      role: 'user',
      content: `Build me a complete outfit from the "${collection}" collection.`,
    });
    setMessages(firstMsg.messages || []);
    setStarting(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !conversation) return;
    const text = input.trim();
    setInput('');
    setLoading(true);
    const updated = await base44.agents.addMessage(conversation, { role: 'user', content: text });
    setMessages(updated.messages || []);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const reset = () => {
    setConversation(null);
    setMessages([]);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>
      {/* Header */}
      <div className="px-6 py-8 text-center" style={{ borderBottom: '1px solid rgba(196,163,90,0.12)' }}>
        <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: '#C9A24A' }}>
          AI Styling Tool
        </p>
        <h1 className="font-serif leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#FFFFFF' }}>
          Outfit Builder
        </h1>
        <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.6)', lineHeight: 1.8 }}>
          Pick a collection. Get a complete look.
        </p>
      </div>

      <div className="flex-1 flex flex-col max-w-[760px] w-full mx-auto px-4 py-8">

        {/* Collection picker — shown before conversation starts */}
        {!conversation && (
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6 text-center" style={{ color: 'rgba(196,163,90,0.6)' }}>
              Choose a Collection to Style
            </p>
            {starting ? (
              <div className="flex items-center justify-center gap-3 py-12">
                <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#C9A24A' }} />
                <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Building your outfit…</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {COLLECTIONS.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => startConversation(col.value)}
                    className="py-4 px-4 text-left transition-all hover:opacity-80"
                    style={{
                      background: '#131313',
                      border: '1px solid rgba(196,163,90,0.18)',
                      color: '#F0EBE1',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.5)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.18)'}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Shirt className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#C9A24A' }} />
                      <span className="font-mono text-[9px] tracking-widest uppercase" style={{ color: '#C9A24A' }}>
                        {col.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Chat area */}
        {conversation && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(196,163,90,0.6)' }}>
                Active Session
              </p>
              <button onClick={reset} className="font-mono text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: 'rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '1px' }}>
                Start Over
              </button>
            </div>

            <div className="flex-1 space-y-5 mb-6 min-h-[300px]">
              {messages.filter(m => m.role !== 'system').map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
              {loading && (
                <div className="flex gap-3 items-center">
                  <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,162,74,0.15)', border: '1px solid rgba(201,162,74,0.3)' }}>
                    <span style={{ fontSize: '0.85rem' }}>🔥</span>
                  </div>
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#C9A24A' }} />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-3 items-end" style={{ borderTop: '1px solid rgba(196,163,90,0.12)', paddingTop: '1.25rem' }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for a different style, budget, or size…"
                rows={2}
                className="flex-1 resize-none px-4 py-3 font-heading text-sm outline-none"
                style={{
                  background: '#161616',
                  border: '1px solid rgba(196,163,90,0.2)',
                  color: '#F0EBE1',
                  lineHeight: 1.6,
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="flex items-center justify-center w-12 h-12 flex-shrink-0 transition-all hover:opacity-80 disabled:opacity-30"
                style={{ background: '#D4AE57', color: '#080808' }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}