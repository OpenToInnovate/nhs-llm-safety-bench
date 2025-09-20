
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'NHS LLM Safety Bench',
  description: 'Benchmark & chat for a UK NHS voice assistant prompt'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex gap-6">
            <Link href="/" className="font-semibold">Dashboard</Link>
            <Link href="/chat">Chat</Link>
            <Link href="/bench">Bench</Link>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
          Built for prompt safety in medical contexts.
        </footer>
      </body>
    </html>
  );
}
