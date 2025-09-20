
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'NHS LLM Safety Bench',
  description: 'Benchmark medical safety of LLM responses and offer real-time chat for manual testing'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        
        <header style={{ 
          backgroundColor: '#0b0c0c', 
          color: '#ffffff',
          padding: '0.5rem 0',
          borderBottom: '2px solid #ffdd00'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h1 style={{ 
                  margin: 0, 
                  fontSize: '1.5rem', 
                  fontWeight: '700',
                  color: '#ffffff'
                }}>
                  NHS LLM Safety Bench
                </h1>
                <p style={{ 
                  margin: '0.25rem 0 0 0', 
                  fontSize: '0.9rem', 
                  color: '#f3f2f1',
                  fontWeight: '400'
                }}>
                  Medical AI Safety Testing Platform
                </p>
              </div>
              <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link href="/" style={{ 
                  color: '#ffffff', 
                  textDecoration: 'none',
                  fontWeight: '600',
                  padding: '0.5rem 0',
                  borderBottom: '2px solid transparent',
                  transition: 'border-color 0.2s ease'
                }}>
                  Dashboard
                </Link>
                <Link href="/chat" style={{ 
                  color: '#ffffff', 
                  textDecoration: 'none',
                  fontWeight: '400',
                  padding: '0.5rem 0',
                  borderBottom: '2px solid transparent',
                  transition: 'border-color 0.2s ease'
                }}>
                  Chat
                </Link>
                <Link href="/bench" style={{ 
                  color: '#ffffff', 
                  textDecoration: 'none',
                  fontWeight: '400',
                  padding: '0.5rem 0',
                  borderBottom: '2px solid transparent',
                  transition: 'border-color 0.2s ease'
                }}>
                  Bench
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main id="main-content" className="container" style={{ 
          paddingTop: '2rem', 
          paddingBottom: '2rem',
          minHeight: 'calc(100vh - 200px)'
        }}>
          {children}
        </main>

        <footer style={{ 
          backgroundColor: '#f3f2f1', 
          borderTop: '1px solid #b1b4b6',
          padding: '2rem 0',
          marginTop: '3rem'
        }}>
          <div className="container">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <h3 style={{ 
                  margin: '0 0 1rem 0', 
                  fontSize: '1.1rem',
                  color: '#0b0c0c'
                }}>
                  About This Project
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.9rem', 
                  lineHeight: '1.5',
                  color: '#0b0c0c'
                }}>
                  A production-ready platform for benchmarking medical safety of LLM responses, 
                  inspired by the NHS 10-year health plan for England.
                </p>
              </div>
              <div>
                <h3 style={{ 
                  margin: '0 0 1rem 0', 
                  fontSize: '1.1rem',
                  color: '#0b0c0c'
                }}>
                  Safety Focus
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.9rem', 
                  lineHeight: '1.5',
                  color: '#0b0c0c'
                }}>
                  Testing emergency escalation, safeguarding protocols, mental health crisis intervention, 
                  and UK-specific medical pathways.
                </p>
              </div>
            </div>
            <div style={{ 
              borderTop: '1px solid #b1b4b6', 
              paddingTop: '1rem',
              textAlign: 'center'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '0.8rem', 
                color: '#626a6e'
              }}>
                Built for medical AI safety testing • Inspired by the{' '}
                <a 
                  href="https://www.gov.uk/government/publications/10-year-health-plan-for-england-fit-for-the-future" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#1d70b8' }}
                >
                  NHS 10-year health plan
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
