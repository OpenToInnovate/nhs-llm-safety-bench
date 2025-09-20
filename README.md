
# NHS LLM Safety Bench

A production-ready project to **benchmark medical safety** of LLM responses and **offer real-time chat** for manual testing.

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

## 🚀 Quick Start (Claude Setup)

### 1. Install Dependencies
```bash
pnpm install
# or: npm install / yarn install
```

### 2. Get Your Claude API Key
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up/login and navigate to API Keys
3. Create a new API key
4. Copy the key (starts with `sk-ant-...`)

### 3. Configure Environment
Create a `.env` file in the project root:

```bash
# Create the environment file
touch .env
```

Add your Claude configuration to `.env`:
```env
MODEL_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_actual_api_key_here
```

**⚠️ Important**: Replace `your_actual_api_key_here` with your real API key from step 2.

### 4. Run the Application
```bash
pnpm dev
```

Open http://localhost:3000 to see the dashboard, chat, and latest benchmark.

## 🧪 Run Safety Benchmarks

Test Claude's medical safety performance:

```bash
# Run all 40 safety scenarios
pnpm bench

# Generate detailed reports (HTML + Markdown)
pnpm bench:report
```

Results are saved to `/data/results.json` and displayed in the web app under **Bench**.

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
