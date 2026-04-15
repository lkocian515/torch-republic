import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const QUICK_STARTS = [
  { label: '🇺🇸 American Heritage', prompt: 'I love American founding history and want products that reflect that legacy.' },
  { label: '✝️ Faith & Country', prompt: 'Faith is central to my life. I want products that reflect my Christian values and love of country.' },
  { label: '🎖️ Military / First Responder', prompt: 'I\'m a veteran / first responder and want gear that honors that service.' },
  { label: '🔥 Bold & Graphic', prompt: 'I like bold, graphic designs that make a statement. Show me your most striking items.' },
  { label: '☕ Coffee Lover', prompt: 'I\'m a coffee person first. Recommend your best blends and coffee-related products.' },
  { label: '🎁 Looking for a Gift', prompt: 'I\'m shopping for a gift for a patriotic friend. Help me find something meaningful.' },
];

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: 'rgba(201,162,74,0.15)', border: '1px solid rgba(201,162,74,0.3)' }}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: '#C9A24A' }} />
        </div>
      )}
      <div
        className="max-w-[85%] rounded px-4 py-3"
        style={{
          background: isUser ? '#D4AE57' : '#161616',
          border: isUser ? 'none' : '1px solid rgba(196,163,90,0.12)',
          color: isUser ? '#080808' : '#F0EBE1',
        }}
      >
        {isUser ? (
          <p className="text-sm font-medium leading-relaxed">{message.content}</p>
        ) : (
          <ReactMarkdown
            className="text-sm prose prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:leading-relaxed [&_p]:mb-2 [&_ul]:ml-4 [&_li]:mb-1.5 [&_strong]:text-yellow-300 [&_a]:text-yellow-400 [&_a]:underline [&_h3]:text-white [&_h3]:font-bold [&_h3]:mt-3"
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default function StyleAdvisor() {
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

  const startConversation = async (prompt) => {
    setStarting(true);
    const conv = await base44.agents.createConversation({
      agent_name: 'style_advisor',
      metadata: { name: 'Style Session' },
    });
    setConversation(conv);
    const result = await base44.agents.addMessage(conv, { role: 'user', content: prompt });
    setMessages(result.messages || []);
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

  const visibleMessages = messages.filter(m => m.role !== 'system');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0B0B0B', color: '#F0EBE1' }}>

      {/* Header */}
      <div className="px-6 py-8 text-center" style={{ borderBottom: '1px solid rgba(196,163,90,0.12)' }}>
        <p className="font-mono text-[10px] tracking-[0.55em] uppercase mb-3" style={{ color: '#C9A24A' }}>
          AI Styling
        </p>
        <h1 className="font-serif leading-none mb-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, color: '#FFFFFF' }}>
          Style Advisor
        </h1>
        <p className="font-heading text-sm" style={{ color: 'rgba(240,235,225,0.65)', lineHeight: 1.8 }}>
          Tell us what you stand for. We'll find what fits.
        </p>
      </div>

      <div className="flex-1 flex flex-col max-w-[760px] w-full mx-auto px-4 py-8">

        {/* Quick-start tiles — shown before conversation */}
        {!conversation && (
          <div>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-6 text-center" style={{ color: 'rgba(196,163,90,0.6)' }}>
              What Describes You?
            </p>
            {starting ? (
              <div className="flex items-center justify-center gap-3 py-16">
                <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#C9A24A' }} />
                <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Finding your fit…</span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {QUICK_STARTS.map((qs) => (
                    <button
                      key={qs.label}
                      onClick={() => startConversation(qs.prompt)}
                      className="text-left px-5 py-4 transition-all"
                      style={{ background: '#131313', border: '1px solid rgba(196,163,90,0.18)' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,162,74,0.5)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,163,90,0.18)'}
                    >
                      <span className="font-heading text-sm font-medium" style={{ color: '#F0EBE1' }}>{qs.label}</span>
                    </button>
                  ))}
                </div>

                {/* Or type your own */}
                <div className="flex gap-3 items-end" style={{ borderTop: '1px solid rgba(196,163,90,0.1)', paddingTop: '1.25rem' }}>
                  <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (input.trim()) startConversation(input.trim());
                      }
                    }}
                    placeholder="Or describe your style in your own words…"
                    rows={2}
                    className="flex-1 resize-none px-4 py-3 font-heading text-sm outline-none"
                    style={{ background: '#161616', border: '1px solid rgba(196,163,90,0.2)', color: '#F0EBE1', lineHeight: 1.6 }}
                  />
                  <button
                    onClick={() => { if (input.trim()) startConversation(input.trim()); }}
                    disabled={!input.trim()}
                    className="flex items-center justify-center w-12 h-12 flex-shrink-0 transition-all hover:opacity-80 disabled:opacity-30"
                    style={{ background: '#D4AE57', color: '#080808' }}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Active chat */}
        {conversation && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(196,163,90,0.6)' }}>
                Your Style Session
              </p>
              <button onClick={reset}
                className="font-mono text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60"
                style={{ color: 'rgba(255,255,255,0.35)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '1px' }}>
                Start Over
              </button>
            </div>

            <div className="flex-1 space-y-5 mb-6 min-h-[300px]">
              {visibleMessages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
              {loading && (
                <div className="flex gap-3 items-center">
                  <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,162,74,0.15)', border: '1px solid rgba(201,162,74,0.3)' }}>
                    <Sparkles className="w-3.5 h-3.5" style={{ color: '#C9A24A' }} />
                  </div>
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#C9A24A' }} />
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="flex gap-3 items-end" style={{ borderTop: '1px solid rgba(196,163,90,0.12)', paddingTop: '1.25rem' }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Refine your picks, ask for alternatives, or change your budget…"
                rows={2}
                className="flex-1 resize-none px-4 py-3 font-heading text-sm outline-none"
                style={{ background: '#161616', border: '1px solid rgba(196,163,90,0.2)', color: '#F0EBE1', lineHeight: 1.6 }}
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