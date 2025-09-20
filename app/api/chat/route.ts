
import { NextRequest } from 'next/server';
import { createStream } from '../../../lib/providers/stream';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;
  const stream = await createStream(messages);
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
