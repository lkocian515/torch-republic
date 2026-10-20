import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import AgentMessageBubble from '@/components/agents/AgentMessageBubble';
import AgentChatInput from '@/components/agents/AgentChatInput';
import { Sparkles, AlertCircle } from 'lucide-react';

const AGENT_NAME = 'blend_advisor';

const SUGGESTED_PROMPTS = [
  'I want more focus without a big caffeine hit',
  'Which coffee is smoother and less bitter?',
  "What's the difference between the two coffees?",
  'I like bold, classic coffee flavor',
];

export default function BlendAdvisor() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const conversationRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    document.title = 'Blend Advisor | Torch Republic';
  }, []);

  useEffect(() => {
    let isActive = true;
    let unsub = () => {};

    (async () => {
      try {
        const conv = await base44.agents.createConversation({
          agent_name: AGENT_NAME,
          metadata: { name: 'Blend Advisor', description: 'Find your blend' },
        });
        if (!isActive) return;
        conversationRef.current = conv;
        setMessages(conv.messages || []);
        setLoading(false);
        unsub = base44.agents.subscribeToConversation(conv.id, (data) => {
          if (!isActive) return;
          setMessages(data.messages || []);
          setSending(false);
        });
      } catch (err) {
        if (!isActive) return;
        setError('Unable to start the Blend Advisor. Please try again later.');
        setLoading(false);
      }
    })();

    return () => {
      isActive = false;
      unsub();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const handleSend = (text) => {
    if (!conversationRef.current) return;
    setSending(true);
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    base44.agents.addMessage(conversationRef.current, { role: 'user', content: text });
  };

  return (
    <main className="flex min-h-screen flex-col" style={{ background: 'hsl(var(--background))' }}>
      <section className="border-b border-border px-5 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 flex justify-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full"
              style={{ background: 'hsl(var(--primary) / 0.1)' }}
            >
              <Sparkles className="h-7 w-7" style={{ color: 'hsl(var(--primary))' }} />
            </div>
          </div>
          <h1 className="font-serif text-3xl font-bold md:text-4xl" style={{ color: 'hsl(var(--foreground))' }}>
            Blend Advisor
          </h1>
          <p
            className="mx-auto mt-3 max-w-xl text-sm md:text-base"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Tell us what you want from your coffee and what you like in the cup. We will compare the lineup and point
            you to the right one.
          </p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <p className="mt-3 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{error}</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Try asking:
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="rounded-lg border border-border bg-card px-4 py-2.5 text-left text-sm transition-colors hover:border-primary/40"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => <AgentMessageBubble key={idx} message={msg} />)
          )}
          {sending && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-border bg-card px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary/60" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <AgentChatInput
          onSend={handleSend}
          disabled={sending || loading || !!error}
          placeholder="Tell me your goal or the flavor you like..."
        />

        <p
          className="px-4 pb-5 pt-3 text-center font-mono text-[11px] tracking-[0.08em]"
          style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.75 }}
        >
          Statements on this site have not been evaluated by the FDA. This product is not intended to diagnose, treat,
          cure, or prevent any disease.
        </p>
      </div>
    </main>
  );
}