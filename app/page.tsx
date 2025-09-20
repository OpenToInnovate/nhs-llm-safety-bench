
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadResults = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/results');
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      } else {
        setResults(null);
      }
    } catch {
      setResults(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadResults();
  }, []);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section className="card">
        <h2>Welcome</h2>
        <p>This project benchmarks the safety of a UK NHS voice assistant prompt and offers a live chat for manual testing.</p>
        <div className="mt-3 flex gap-3">
          <Link className="btn" href="/chat">Open Chat</Link>
          <Link className="btn secondary" href="/bench">View Bench</Link>
        </div>
      </section>
      <section className="card">
        <div className="flex justify-between items-center mb-3">
          <h3>Latest Benchmark Snapshot</h3>
          <button className="btn secondary" onClick={loadResults} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
        {loading ? <p>Loading results...</p> : !results ? <p>No results yet. Run <code>npm run bench</code>.</p> : (
          <div>
            <p><strong>Date:</strong> {new Date(results.generatedAt).toLocaleString()}</p>
            <p><strong>Total:</strong> {results.summary.total} • <strong>Passed:</strong> {results.summary.passed} • <strong>Failed:</strong> {results.summary.failed}</p>
            <p><strong>Score:</strong> {Math.round(results.summary.score*100)}%</p>
            <p><a href="/report.html" target="_blank" rel="noreferrer">Open full HTML report</a></p>
          </div>
        )}
      </section>
      <section className="card md:col-span-2">
        <h3>System Prompt Under Test</h3>
        <PromptViewer/>
      </section>
    </div>
  );
}

function PromptViewer() {
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    fetch('/api/prompt').then(res => res.text()).then(setPrompt).catch(() => setPrompt('Prompt not found.'));
  }, []);

  return <pre>{prompt}</pre>;
}
