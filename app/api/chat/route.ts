import { NextRequest } from 'next/server';
import { createStreamWithApiKey } from '../../../lib/providers/stream';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages, apiKey } = body;
  
  if (!apiKey) {
    return new Response('API key is required', { status: 400 });
  }
  
  const stream = await createStreamWithApiKey(messages, apiKey);
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
