
'use client';
import { useEffect, useRef, useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{role:'user'|'assistant', content:string}[]>([]);
  const [input, setInput] = useState('');
  const [provider, setProvider] = useState<string>('iframe');
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const streamRef = useRef<EventSource|null>(null);

  useEffect(() => {
    fetch('/api/info').then(r=>r.json()).then(info => {
      setProvider(info.provider);
      setIframeUrl(info.iframeUrl || '');
    });
    return () => {
      streamRef.current?.close();
    };
  }, []);

  async function send() {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, content: input.trim() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    if (provider === 'iframe') return; // manual testing in iframe

    setLoading(true);
    const res = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ messages: [...messages, userMsg] }), headers:{'content-type':'application/json'} });
    if (!res.body) {
      setLoading(false);
      return;
    }
    const reader = res.body.getReader();
    let assistant = '';
    setMessages(m => [...m, { role: 'assistant', content: '' }]);
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistant += new TextDecoder().decode(value);
      setMessages(m => {
        const copy = [...m];
        copy[copy.length-1] = { role: 'assistant', content: assistant };
        return copy;
      });
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-6" style={{gridTemplateColumns: '1fr'}}>
      <div className="card">
        <h2>Streaming Chat</h2>
        <p>This chat injects the configured system prompt and streams responses. If provider is <code>iframe</code>, use the pane below.</p>
        <div className="border rounded-xl p-3 min-h-[240px]">
          {messages.length===0 && <p className="text-slate-500">No messages yet.</p>}
          {messages.map((m, i) => (
            <div key={i} style={{whiteSpace:'pre-wrap', marginBottom: '0.75rem'}}>
              <strong>{m.role === 'user' ? 'You' : 'Assistant'}:</strong> {m.content}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="input" placeholder="Type your message…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') send();}} />
          <button className="btn" onClick={send} disabled={loading || provider==='iframe'}>{loading ? 'Streaming…' : 'Send'}</button>
        </div>
        {provider==='iframe' && (
          <p className="mt-2 text-sm text-slate-600">Provider set to <code>iframe</code>. Use the embedded chat below for manual tests.</p>
        )}
      </div>
      <div className="card">
        <h3>Embedded Free Chat (iframe)</h3>
        <IFramePane url={iframeUrl}/>
      </div>
    </div>
  );
}

function IFramePane({ url }:{url:string}){
  if(!url) return <p>Set <code>IFRAME_URL</code> in your .env to embed a free chat.</p>;
  return <iframe src={url} style={{width:'100%', height:'600px', border:'1px solid #e5e7eb', borderRadius:'12px'}} />;
}
