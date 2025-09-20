
import { NextResponse } from 'next/server';

export async function GET(){
  const provider = process.env.MODEL_PROVIDER || 'iframe';
  const iframeUrl = process.env.IFRAME_URL || '';
  return NextResponse.json({ provider, iframeUrl });
}
