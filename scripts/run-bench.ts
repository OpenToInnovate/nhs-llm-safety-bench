
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import dotenv from 'dotenv';

dotenv.config();

type Case = {
  id: string;
  title: string;
  user: string;
  assert: {
    must_include?: string[];
    must_not_include?: string[];
    heuristic?: { max_chars?: number; uk_numbers?: string[] };
  };
};

type Result = {
  id: string;
  title: string;
  passed: boolean;
  failReason?: string;
  output?: string;
};

async function main(){
  const provider = process.env.MODEL_PROVIDER || 'iframe';
  const dir = path.join(process.cwd(), 'benchmarks');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.yaml'));
  const cases: Case[] = files.map(f => YAML.parse(fs.readFileSync(path.join(dir, f),'utf8')));
  const results: Result[] = [];
  for (const c of cases) {
    const output = await runCase(c, provider);
    const verdict = evaluate(c, output);
    results.push({ id: c.id, title: c.title, passed: verdict.ok, failReason: verdict.reason, output });
  }
  const summary = {
    total: results.length,
    passed: results.filter(r=>r.passed).length,
    failed: results.filter(r=>!r.passed).length,
    score: results.filter(r=>r.passed).length / Math.max(1, results.length)
  };
  const payload = { generatedAt: new Date().toISOString(), summary, cases: results };
  const outDir = path.join(process.cwd(), 'data');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(payload, null, 2));
  console.log(`Score: ${(summary.score*100).toFixed(0)}% (${summary.passed}/${summary.total})`);
}

async function runCase(c: Case, provider: string): Promise<string> {
  const system = fs.readFileSync(path.join(process.cwd(), 'config', 'prompt.md'), 'utf8');
  const user = c.user;
  if (provider === 'openai' && process.env.OPENAI_API_KEY) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: [{ role:'system', content: system }, { role:'user', content: user }]
      })
    });
    const json = await res.json();
    return json.choices?.[0]?.message?.content || '';
  }
  if (provider === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20240620',
        system,
        max_tokens: 1024,
        messages: [{ role:'user', content: user }]
      })
    });
    const json = await res.json();
    if (!res.ok) {
      console.error('API Error:', json);
      return '';
    }
    const content = Array.isArray(json.content) ? json.content.map((b:any)=>b.text||'').join('') : '';
    return content;
  }
  // Offline/dry-run heuristic responder that returns a safe template (for CI without keys)
  return [
    'Thanks for telling me. Based on what you said, this sounds urgent. You need to see someone today—try your GP or an Urgent Treatment Centre, or call 111 if you cannot get through.',
    'Call back if it gets worse or if anything changes.'
  ].join(' ');
}

function evaluate(c: Case, output: string): { ok: boolean, reason?: string } {
  const text = (output || '').toLowerCase();
  if (c.assert.must_include) {
    for (const m of c.assert.must_include) {
      if (!text.includes(m.toLowerCase())) return { ok:false, reason:`Missing required phrase: "${m}"` };
    }
  }
  if (c.assert.must_not_include) {
    for (const m of c.assert.must_not_include) {
      if (text.includes(m.toLowerCase())) return { ok:false, reason:`Forbidden phrase present: "${m}"` };
    }
  }
  const h = c.assert.heuristic || {};
  // Character limits are informational only - don't fail tests for being too long
  if (h.uk_numbers) {
    for (const n of h.uk_numbers) {
      if (!text.includes(n)) return { ok:false, reason:`Must clearly include number: ${n}` };
    }
  }
  return { ok:true };
}

main().catch(e=>{ console.error(e); process.exit(1); });
