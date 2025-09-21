import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

type Case = {
  id: string;
  title: string;
  user: string;
  assert: {
    must_include?: string[];
    must_not_include?: string[];
    heuristic?: { max_chars?: number; uk_numbers?: string[] };
  };
  category?: string;
};

type Result = {
  id: string;
  title: string;
  passed: boolean;
  failReason?: string;
  output?: string;
};

async function main(){
  // Get API key from command line argument
  const apiKey = process.argv[2];
  
  if (!apiKey) {
    console.error('❌ Error: API key is required');
    console.log('Usage: npm run bench <your-claude-api-key>');
    console.log('Example: npm run bench sk-ant-...');
    console.log('');
    console.log('Get your API key from: https://console.anthropic.com/');
    process.exit(1);
  }

  if (!apiKey.startsWith('sk-ant-')) {
    console.error('❌ Error: Invalid API key format');
    console.log('API key should start with "sk-ant-"');
    process.exit(1);
  }

  console.log('🚀 Starting MY GP LLM Safety Benchmark...');
  console.log('');

  const suitePath = path.join(process.cwd(), 'benchmarks.yaml');
  if (!fs.existsSync(suitePath)) {
    console.error('❌ Error: benchmarks.yaml not found');
    console.log('Expected a consolidated benchmark suite at the repository root.');
    process.exit(1);
  }

  const rawSuite = fs.readFileSync(suitePath, 'utf8');
  const parsed = YAML.parse(rawSuite) as { version?: number; cases?: Case[] } | null;
  const cases: Case[] = Array.isArray(parsed?.cases)
    ? parsed!.cases.map(c => ({
        ...c,
        category: c.category || (typeof c.id === 'string' ? c.id.replace(/-\d+$/, '') : undefined)
      }))
    : [];

  if (!cases.length) {
    console.error('❌ Error: No benchmark cases found in benchmarks.yaml');
    process.exit(1);
  }
  const results: Result[] = [];
  
  console.log(`📊 Testing Claude with ${cases.length} medical safety scenarios`);
  console.log(`📋 Running ${cases.length} test cases...`);
  console.log('');

  for (let i = 0; i < cases.length; i++) {
    const c = cases[i];
    process.stdout.write(`[${i + 1}/${cases.length}] ${c.id}... `);
    
    try {
      const output = await runCase(c, apiKey);
      const verdict = evaluate(c, output);
      results.push({ id: c.id, title: c.title, passed: verdict.ok, failReason: verdict.reason, output });
      
      if (verdict.ok) {
        console.log('✅ PASS');
      } else {
        console.log(`❌ FAIL (${verdict.reason})`);
      }
    } catch (error) {
      console.log(`❌ ERROR (${error instanceof Error ? error.message : 'Unknown error'})`);
      results.push({ id: c.id, title: c.title, passed: false, failReason: 'API Error', output: '' });
    }
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
  
  console.log('');
  console.log('📊 BENCHMARK RESULTS');
  console.log('==================');
  console.log(`Score: ${(summary.score*100).toFixed(0)}% (${summary.passed}/${summary.total})`);
  console.log(`Passed: ${summary.passed}`);
  console.log(`Failed: ${summary.failed}`);
  console.log('');
  console.log('📁 Results saved to: data/results.json');
  console.log('📄 Run "npm run bench:report" to generate HTML and Markdown reports');
}

async function runCase(c: Case, apiKey: string): Promise<string> {
  const system = fs.readFileSync(path.join(process.cwd(), 'config', 'prompt.md'), 'utf8');
  const user = c.user;
  
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      system,
      max_tokens: 1024,
      messages: [{ role:'user', content: user }]
    })
  });
  
  const json = await res.json();
  if (!res.ok) {
    throw new Error(`API Error: ${json.error?.message || 'Unknown error'}`);
  }
  
  const content = Array.isArray(json.content) ? json.content.map((b:any)=>b.text||'').join('') : '';
  return content;
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
  if (h.uk_numbers) {
    for (const n of h.uk_numbers) {
      if (!text.includes(n)) return { ok:false, reason:`Must clearly include number: ${n}` };
    }
  }
  return { ok:true };
}

main().catch(e=>{ 
  console.error('❌ Fatal Error:', e.message || e); 
  process.exit(1); 
});
