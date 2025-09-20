# NHS LLM Safety Bench

A production-ready platform for **benchmarking medical safety** of LLM responses and **offering real-time chat** for manual testing.

*Inspired by the [NHS 10-year plan for England](https://www.gov.uk/government/publications/10-year-health-plan-for-england-fit-for-the-future) and the need for safe AI in healthcare.*

## 🎯 Why Claude?

**We focus exclusively on Anthropic's Claude** because it's the best foundation model for medical safety by a significant margin:

- **Superior medical reasoning** and safety guardrails
- **Consistent adherence** to medical guidelines and protocols  
- **Reliable emergency escalation** patterns
- **88% pass rate** on our comprehensive safety benchmarks
- **Built-in safety features** specifically designed for healthcare applications

## 📊 Latest Benchmark Results

**[📋 View Latest Safety Report (88% Pass Rate - 35/40 Tests)](./BENCHMARK_REPORT.md)**

*Also available as [HTML report](./public/report.html)*

Current coverage: Emergency care, mental health, elderly care, early years, pregnancy, sexual health, safeguarding, suicide risk assessment, and urgent care scenarios.

## 🚀 Quick Start (Static Hosting Ready)

### Option 1: Use the Live Demo
1. Visit the [Live Chat Testing](/chat) page
2. Enter your Claude API key from [Anthropic Console](https://console.anthropic.com/)
3. Start testing medical scenarios immediately

### Option 2: Run Locally
```bash
# Install dependencies
npm install
# or: pnpm install / yarn install

# Start development server
npm run dev
# or: pnpm dev / yarn dev
```

Open http://localhost:3000 to see the dashboard, chat, and latest benchmark.

## 🧪 Run Safety Benchmarks (Secure)

Test Claude's medical safety performance with your API key:

```bash
# Run all 40 safety scenarios with your API key
npm run bench <your-claude-api-key>
# or: pnpm bench <your-claude-api-key> / yarn bench <your-claude-api-key>

# Example:
npm run bench sk-ant-api03-...

# Generate detailed reports (HTML + Markdown)
npm run bench:report
# or: pnpm bench:report / yarn bench:report
```

**🔒 Security Note**: Your API key is passed as a runtime parameter and never stored in files or environment variables. It's only used for the API call and then discarded.

Results are saved to `/data/results.json` and displayed in the web app under **Bench**.

## 🌐 Static Hosting (GitHub Pages Ready)

This site is designed to be completely static and hostable on GitHub Pages:

- **No server-side environment variables** required
- **API key input** directly in the chat interface
- **Client-side only** configuration
- **GitHub Pages compatible** out of the box

### Deploy to GitHub Pages

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Set source to "Deploy from a branch" → "main"
4. The site will be available at `https://yourusername.github.io/nhs-llm-safety-bench`

## 🛡️ Safety Focus

Our comprehensive test suite validates:

- **Emergency escalation** language (e.g., chest pain + breathlessness → "call 999")
- **Same-day urgency** patterns ("see someone today… try GP/UTC… call 111")  
- **No diagnosis claims**; uses appropriate hedging ("It sounds like…", "I can't be sure…")
- **Brevity** (10–20 seconds), one topic per turn, safety‑netting ("Call back if…")
- **UK pathways** and phone numbers spoken clearly
- **Safeguarding** protocols for vulnerable populations
- **Mental health** crisis intervention patterns

## 🔧 Project Structure

- **`/benchmarks/*.yaml`** - 40 safety test scenarios across medical domains
- **`/config/prompt.md`** - NHS-style system prompt for medical triage
- **`/scripts/run-bench.ts`** - Benchmark execution engine
- **`/scripts/generate-report.ts`** - Report generation (HTML + Markdown)
- **`/app/`** - Next.js web interface with chat and results dashboard
- **`/data/results.json`** - Latest benchmark results (auto-generated)

## 🎯 Why This Matters

Medical AI safety is critical. This tool helps ensure LLMs provide:
- **Consistent safety guidance** across diverse medical scenarios
- **Appropriate escalation** for emergency situations  
- **UK-specific pathways** and contact information
- **Safeguarding awareness** for vulnerable patients
- **Clear communication** that doesn't overstep medical boundaries

## 🔒 Privacy & Security

- **API keys passed as runtime parameters** - never stored in files
- **No server-side storage** of personal data
- **Direct API communication** with Anthropic
- **Open source** and fully auditable
- **Local storage only** for chat interface convenience
