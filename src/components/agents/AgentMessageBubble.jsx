import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChevronDown, ChevronRight, Loader2, CheckCircle2, XCircle } from 'lucide-react';

function FunctionDisplay({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const status = toolCall.status || '';
  const isRunning = ['pending', 'running', 'in_progress'].includes(status);
  const isFailed = ['failed', 'error'].includes(status);

  let parsedResults = toolCall.results;
  try {
    if (typeof toolCall.results === 'string') parsedResults = JSON.parse(toolCall.results);
  } catch (_) { /* keep raw */ }

  const failed = isFailed || (typeof parsedResults === 'object' && parsedResults?.success === false);
  const hide = toolCall.display_projection?.hide_details && toolCall.display_projection?.details_redacted;

  let parsedArgs = toolCall.arguments_string;
  try {
    if (typeof toolCall.arguments_string === 'string') parsedArgs = JSON.parse(toolCall.arguments_string);
  } catch (_) { /* keep raw */ }

  const statusIcon = failed
    ? <XCircle className="h-3.5 w-3.5 text-red-500" />
    : isRunning
      ? <Loader2 className="h-3.5 w-3.5 animate-spin text-amber-600" />
      : <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />;

  const label = failed
    ? (toolCall.display_projection?.error_label || 'Failed')
    : isRunning
      ? (toolCall.display_projection?.active_label || 'Working...')
      : (toolCall.display_projection?.label || 'Done');

  return (
    <div className="mt-2 text-xs">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
      >
        {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {statusIcon}
        <span className="font-mono">{toolCall.name}</span>
        <span className="text-muted-foreground/70">{label}</span>
      </button>
      {expanded && !hide && (
        <div className="ml-6 mt-1 space-y-1">
          {parsedArgs != null && (
            <div>
              <span className="font-semibold">Parameters:</span>
              <pre className="mt-0.5 rounded bg-muted p-2 text-[11px] overflow-x-auto">{JSON.stringify(parsedArgs, null, 2)}</pre>
            </div>
          )}
          {parsedResults != null && (
            <div>
              <span className="font-semibold">Result:</span>
              <pre className="mt-0.5 rounded bg-muted p-2 text-[11px] overflow-x-auto">{JSON.stringify(parsedResults, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AgentMessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-primary text-primary-foreground' : 'bg-card border border-border'
        }`}
      >
        {message.content && (
          isUser
            ? <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            : <ReactMarkdown className="text-sm prose prose-sm max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">{message.content}</ReactMarkdown>
        )}
        {message.tool_calls?.map((toolCall, idx) => (
          <FunctionDisplay key={idx} toolCall={toolCall} />
        ))}
      </div>
    </div>
  );
}