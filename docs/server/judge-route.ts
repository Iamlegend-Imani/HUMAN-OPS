// Production server reference for Vercel/Next.js runtime.
// GitHub Pages is static, so the live demo currently runs judgeSignal in-browser.
// When HUMAN//OPS returns to a server-capable host, move this file back to app/api/judge/route.ts.

import { NextResponse } from 'next/server';
import { judgeSignal } from '@/lib/judge';
import type { Signal } from '@/lib/types';

export async function POST(request: Request) {
  const signal = (await request.json()) as Signal;

  if (!signal?.id || !signal?.summary) {
    return NextResponse.json({ error: 'Invalid signal payload' }, { status: 400 });
  }

  const decision = judgeSignal(signal);
  return NextResponse.json({ signal, decision });
}
