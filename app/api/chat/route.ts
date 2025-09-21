import { NextRequest } from 'next/server';
import { getSystemPrompt } from '../../../lib/providers/index';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, apiKey } = body;
    
    if (!apiKey) {
      return new Response('API key is required', { status: 400 });
    }
    
    // Get system prompt
    const systemPrompt = getSystemPrompt();
    
    // Prepare messages for Claude API
    const claudeMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.content
    }));
    
    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        system: systemPrompt,
        max_tokens: 4096,
        stream: true,
        messages: claudeMessages
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      return new Response(JSON.stringify({ error: errorData.error?.message || 'Request failed' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!response.body) {
      return new Response(JSON.stringify({ error: 'No response body received' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create a readable stream that processes the response
    const encoder = new TextEncoder();
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    
    // Process the stream in the background
    (async () => {
      try {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        
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
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      } catch (error) {
        console.error('Stream processing error:', error);
        await writer.write(encoder.encode('Error processing stream'));
      } finally {
        await writer.close();
      }
    })();
    
    return new Response(readable, {
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
    
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
