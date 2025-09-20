
import fs from 'node:fs';
import path from 'node:path';

function readLastBench() {
  try {
    const p = path.join(process.cwd(), 'data', 'results.json');
    const raw = fs.readFileSync(p, 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function BenchPage(){
  const results = readLastBench();
  return (
    <div className="card">
      <h2>Benchmark Results</h2>
      {!results ? <p>No results found. Run <code>pnpm bench</code>.</p> : (
        <div>
          <p><strong>Date:</strong> {new Date(results.generatedAt).toLocaleString()}</p>
          <p><strong>Score:</strong> {Math.round(results.summary.score*100)}% • Passed {results.summary.passed} / {results.summary.total}</p>
          <p><a href="/report.html" target="_blank" rel="noreferrer">Open HTML report</a></p>
          <table style={{width:'100%', borderCollapse:'collapse', marginTop:'1rem'}}>
            <thead><tr><th align="left">ID</th><th align="left">Title</th><th align="left">Result</th><th align="left">Notes</th></tr></thead>
            <tbody>
              {results.cases.map((c:any)=> (
                <tr key={c.id} style={{borderTop:'1px solid #eee'}}>
                  <td>{c.id}</td>
                  <td>{c.title}</td>
                  <td style={{color: c.passed ? 'green' : 'crimson'}}>{c.passed ? 'PASS' : 'FAIL'}</td>
                  <td>{c.failReason || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
