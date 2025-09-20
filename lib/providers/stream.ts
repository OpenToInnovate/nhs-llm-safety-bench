
import { ChatMessage, getSystemPrompt } from './index';

export async function createStream(history: ChatMessage[]) {
  const provider = process.env.MODEL_PROVIDER || 'iframe';
  if (provider === 'openai') return openAIStream(history);
  if (provider === 'anthropic') return anthropicStream(history);
  // fallback: echo-only stream for demo purposes
  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  queueMicrotask(async () => {
    await writer.write(encoder.encode('Provider is iframe; use the embedded chat.'));
    writer.close();
  });
  return readable;
}

async function openAIStream(history: ChatMessage[]) {
  const key = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const sys = getSystemPrompt();
  const messages = [{ role: 'system', content: sys }, ...history];
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ model, messages, stream: true })
  });
  if (!res.ok || !res.body) {
    writer.write(encoder.encode('Error creating stream.'));
    writer.close();
    return readable;
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  (async () => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value);
      const parts = buffer.split('\n\n');
      buffer = parts.pop() || '';
      for (const part of parts) {
        if (!part.startsWith('data:')) continue;
        const json = part.replace('data: ', '');
        if (json === '[DONE]') continue;
        try {
          const obj = JSON.parse(json);
          const delta = obj.choices?.[0]?.delta?.content;
          if (delta) await writer.write(encoder.encode(delta));
        } catch {}
      }
    }
    writer.close();
  })();
  return readable;
}

async function anthropicStream(history: ChatMessage[]) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620';
  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const sys = getSystemPrompt();
  const messages = history.map(m => ({ role: m.role, content: m.content }));
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model,
      system: sys,
      max_tokens: 4096,
      stream: true,
      messages
    })
  });
  if (!res.ok || !res.body) {
    writer.write(encoder.encode('Error creating stream.'));
    writer.close();
    return readable;
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  (async () => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(Boolean);
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (payload === '[DONE]') continue;
        try {
          const evt = JSON.parse(payload);
          if (evt.type === 'content_block_delta' && evt.delta?.text) {
            await writer.write(encoder.encode(evt.delta.text));
          }
        } catch {}
      }
    }
    writer.close();
  })();
  return readable;
}
