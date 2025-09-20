import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function GET() {
  try {
    const resultsPath = path.join(process.cwd(), 'data', 'results.json');
    const raw = fs.readFileSync(resultsPath, 'utf8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(null, { status: 404 });
  }
}