import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  try {
    const promptPath = path.join(process.cwd(), 'config', 'prompt.md');
    const content = fs.readFileSync(promptPath, 'utf8');
    return new Response(content, {
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch {
    return new Response('Prompt not found.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}