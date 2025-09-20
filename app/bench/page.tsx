
'use client';
import { useEffect, useState } from 'react';

export default function BenchPage(){
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
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
    loadResults();
  }, []);
  
  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1>Benchmark Results</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '0' }}>
          Comprehensive safety testing results for medical AI responses across 40 critical scenarios.
        </p>
      </div>

      {loading ? (
        <div className="card">
          <h2>Loading Results...</h2>
          <p>Please wait while we load the benchmark results.</p>
        </div>
      ) : !results ? (
        <div className="card">
          <h2>No Results Found</h2>
          <p>No benchmark results are available. To run the safety tests:</p>
          <div style={{ 
            backgroundColor: '#f3f2f1', 
            padding: '1rem', 
            border: '1px solid #b1b4b6',
            marginBottom: '1rem'
          }}>
            <code>pnpm bench</code>
          </div>
          <p>This will execute all 40 safety scenarios and generate detailed reports.</p>
        </div>
      ) : (
        <div>
          {/* Summary Cards */}
          <div className="grid grid-cols-2" style={{ marginBottom: '2rem' }}>
            <div className="card">
              <h2>Test Summary</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1d70b8' }}>
                    {Math.round(results.summary.score*100)}%
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#626a6e' }}>Pass Rate</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#00703c' }}>
                    {results.summary.passed}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#626a6e' }}>Passed</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#d4351c' }}>
                    {results.summary.failed}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#626a6e' }}>Failed</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0b0c0c' }}>
                    {results.summary.total}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#626a6e' }}>Total Tests</div>
                </div>
              </div>
              
              <p style={{ marginBottom: '1rem' }}>
                <strong>Last Updated:</strong> {new Date(results.generatedAt).toLocaleString()}
              </p>
            </div>

            <div className="card">
              <h2>Report Actions</h2>
              <p>Access detailed reports and analysis:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a 
                  href="/BENCHMARK_REPORT.md" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn"
                >
                  View Full Markdown Report
                </a>
                <a 
                  href="/report.html" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn secondary"
                >
                  Open HTML Report
                </a>
              </div>
            </div>
          </div>

          {/* Detailed Results Table */}
          <div className="card">
            <h2>Detailed Test Results</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Individual test results showing pass/fail status and failure reasons for each safety scenario.
            </p>
            
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Test ID</th>
                    <th>Scenario</th>
                    <th>Result</th>
                    <th>Failure Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {results.cases.map((c: any) => (
                    <tr key={c.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                        {c.id}
                      </td>
                      <td style={{ fontWeight: '500' }}>
                        {c.title}
                      </td>
                      <td>
                        <span className={c.passed ? 'status-pass' : 'status-fail'}>
                          {c.passed ? '✅ PASS' : '❌ FAIL'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.9rem', color: '#626a6e' }}>
                        {c.failReason || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Test Categories Breakdown */}
          <div className="card">
            <h2>Test Categories</h2>
            <p>Our safety tests cover critical medical domains:</p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {[
                'Emergency Care',
                'Mental Health',
                'Elderly Care', 
                'Early Years',
                'Pregnancy',
                'Sexual Health',
                'Safeguarding',
                'Suicide Risk',
                'Urgent Care',
                'Safety Protocols'
              ].map((category) => (
                <div key={category} style={{
                  backgroundColor: '#f3f2f1',
                  padding: '1rem',
                  border: '1px solid #b1b4b6',
                  textAlign: 'center'
                }}>
                  <strong>{category}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
