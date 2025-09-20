'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Page() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadResults = async () => {
    setLoading(true);
    try {
      const res = await fetch('/results.json');
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
    <div>
      {/* Hero Section */}
      <div style={{ 
        backgroundColor: '#1d70b8', 
        color: '#ffffff', 
        padding: '3rem 0',
        marginBottom: '3rem',
        borderRadius: '0'
      }}>
        <div className="container">
          <h1 style={{ 
            margin: '0 0 1rem 0', 
            fontSize: '3rem', 
            fontWeight: '700',
            color: '#ffffff'
          }}>
            NHS LLM Safety Bench
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            margin: '0 0 2rem 0',
            color: '#f3f2f1',
            maxWidth: '600px'
          }}>
            A production-ready platform for benchmarking medical safety of LLM responses and offering real-time chat for manual testing.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link className="btn" href="/chat" style={{ 
              backgroundColor: '#ffffff', 
              color: '#1d70b8',
              borderColor: '#ffffff'
            }}>
              Open Chat
            </Link>
            <Link className="btn secondary" href="/bench" style={{ 
              backgroundColor: 'transparent', 
              color: '#ffffff',
              borderColor: '#ffffff'
            }}>
              View Bench
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2" style={{ marginBottom: '3rem' }}>
        <section className="card">
          <h2>Latest Benchmark Results</h2>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Safety Test Results</h3>
            <button className="btn secondary" onClick={loadResults} disabled={loading}>
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
          
          {loading ? (
            <p>Loading results...</p>
          ) : !results ? (
            <div>
              <p>No results yet. Run the benchmark to get started:</p>
              <code>pnpm bench</code>
            </div>
          ) : (
            <div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1d70b8' }}>
                    {Math.round(results.summary.score*100)}%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#626a6e' }}>Pass Rate</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#00703c' }}>
                    {results.summary.passed}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#626a6e' }}>Passed</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d4351c' }}>
                    {results.summary.failed}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#626a6e' }}>Failed</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#0b0c0c' }}>
                    {results.summary.total}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#626a6e' }}>Total Tests</div>
                </div>
              </div>
              
              <p style={{ marginBottom: '1rem' }}>
                <strong>Last Updated:</strong> {new Date(results.generatedAt).toLocaleString()}
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="/BENCHMARK_REPORT.md" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn secondary"
                >
                  View Full Report
                </a>
                <a 
                  href="/report.html" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn secondary"
                >
                  HTML Report
                </a>
              </div>
            </div>
          )}
        </section>

        <section className="card">
          <h2>Why Claude?</h2>
          <p>
            We focus exclusively on <strong>Anthropic's Claude</strong> because it's the best foundation model 
            for medical safety by a significant margin.
          </p>
          
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Superior medical reasoning</strong> and safety guardrails</li>
            <li><strong>Consistent adherence</strong> to medical guidelines and protocols</li>
            <li><strong>Reliable emergency escalation</strong> patterns</li>
            <li><strong>88% pass rate</strong> on our comprehensive safety benchmarks</li>
            <li><strong>Built-in safety features</strong> specifically designed for healthcare</li>
          </ul>

          <div style={{ 
            backgroundColor: '#f3f2f1', 
            padding: '1rem', 
            border: '1px solid #b1b4b6',
            marginBottom: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Quick Start</h4>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              1. Go to the <strong>Chat</strong> page<br/>
              2. Enter your Claude API key from Anthropic Console<br/>
              3. Start testing medical scenarios immediately
            </p>
          </div>
        </section>
      </div>

      {/* System Prompt Section */}
      <section className="card">
        <h2>System Prompt Under Test</h2>
        <p style={{ marginBottom: '1rem' }}>
          This is the NHS-style medical triage prompt that powers our safety testing. 
          It's designed to provide appropriate medical guidance while maintaining safety boundaries.
        </p>
        <PromptViewer/>
      </section>
    </div>
  );
}

function PromptViewer() {
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    fetch('/prompt.md').then(res => res.text()).then(setPrompt).catch(() => setPrompt('Prompt not found.'));
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#f3f2f1', 
      border: '1px solid #b1b4b6',
      padding: '1rem',
      borderRadius: '0',
      maxHeight: '400px',
      overflowY: 'auto'
    }}>
      <pre style={{ 
        margin: 0, 
        whiteSpace: 'pre-wrap', 
        wordWrap: 'break-word',
        fontSize: '0.9rem',
        lineHeight: '1.4'
      }}>
        {prompt}
      </pre>
    </div>
  );
}
