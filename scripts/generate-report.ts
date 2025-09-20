
import fs from 'node:fs';
import path from 'node:path';

const dataPath = path.join(process.cwd(), 'data', 'results.json');
const outPathMd = path.join(process.cwd(), 'BENCHMARK_REPORT.md');
const outPathHtml = path.join(process.cwd(), 'public', 'report.html');
const title = process.env.REPORT_TITLE || 'NHS LLM Safety Bench';

function esc(s:string){ return s.replace(/[&<>]/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;' } as any)[c]); }

function main(){
  const raw = fs.readFileSync(dataPath,'utf8');
  const data = JSON.parse(raw);

  // Generate HTML report
  const htmlRows = data.cases.map((c:any)=>`<tr><td>${esc(c.id)}</td><td>${esc(c.title)}</td><td style="color:${c.passed?'green':'crimson'}">${c.passed?'PASS':'FAIL'}</td><td>${esc(c.failReason||'')}</td></tr>`).join('');
  const html = `<!doctype html>
  <meta charset="utf-8">
  <title>${esc(title)}</title>
  <style>
    body{font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;margin:2rem;color:#111}
    table{border-collapse:collapse;width:100%}
    th,td{border-top:1px solid #eee;padding:.5rem .4rem;text-align:left}
    .muted{color:#6b7280}
  </style>
  <h1>${esc(title)}</h1>
  <p class="muted">Generated: ${esc(new Date(data.generatedAt).toLocaleString())}</p>
  <p><b>Score:</b> ${Math.round(data.summary.score*100)}% • Passed ${data.summary.passed} / ${data.summary.total}</p>
  <table><thead><tr><th>ID</th><th>Title</th><th>Result</th><th>Notes</th></tr></thead><tbody>${htmlRows}</tbody></table>
  `;

  // Generate Markdown report
  const mdRows = data.cases.map((c:any)=>`| ${c.id} | ${c.title} | ${c.passed ? '✅ PASS' : '❌ FAIL'} | ${c.failReason || ''} |`).join('\n');
  const markdown = `# ${title}

*Generated: ${new Date(data.generatedAt).toLocaleString()}*

## 📊 Results Summary

**Score: ${Math.round(data.summary.score*100)}%** • Passed ${data.summary.passed} / ${data.summary.total} tests

## 📋 Detailed Results

| ID | Title | Result | Notes |
|---|---|---|---|
${mdRows}

## 📈 Score Breakdown

- **Total Tests:** ${data.summary.total}
- **Passed:** ${data.summary.passed} (${Math.round(data.summary.score*100)}%)
- **Failed:** ${data.summary.failed} (${Math.round((1-data.summary.score)*100)}%)

## 🎯 Test Categories

Coverage includes: Emergency care, mental health, elderly care, early years, pregnancy, sexual health, safeguarding, suicide risk assessment, urgent care, and safety protocols.
`;

  fs.mkdirSync(path.dirname(outPathHtml), { recursive: true });
  fs.writeFileSync(outPathHtml, html);
  fs.writeFileSync(outPathMd, markdown);
  console.log('HTML report written to public/report.html');
  console.log('Markdown report written to BENCHMARK_REPORT.md');
}
main();
