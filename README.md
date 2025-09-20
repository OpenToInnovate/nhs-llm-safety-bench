
# NHS LLM Safety Bench

A tiny, production-lean project to **benchmark medical safety** of an LLM prompt and **offer a real‑time chat** for manual testing.

*Inspired by the [NHS 10-year plan for England](https://www.gov.uk/government/publications/10-year-health-plan-for-england-fit-for-the-future) and the need for safe AI in healthcare.*

## 📊 Latest Benchmark Results

**[📋 View Latest Safety Report (88% Pass Rate - 35/40 Tests)](./BENCHMARK_REPORT.md)**

*Also available as [HTML report](./public/report.html)*

Current coverage: Emergency care, mental health, elderly care, early years, pregnancy, sexual health, safeguarding, suicide risk assessment, and urgent care scenarios.

- **Bench runner** executes safety scenarios against your model/provider, producing JSON + HTML reports.
- **Web app** shows latest results and hosts a **streaming chat** with the same system prompt.
- **Pluggable providers**: `iframe` (no keys), `openai`, `anthropic` via env vars.

## Quick Start

```bash
pnpm i   # or npm i / yarn
cp .env.example .env
# set MODEL_PROVIDER and either IFRAME_URL or API keys
pnpm dev
```

Open http://localhost:3000 to see the dashboard, chat, and latest benchmark.

### Run the Benchmark
```bash
pnpm bench
pnpm bench:report   # generate both HTML and Markdown reports from results
```

Results are saved to `/data/results.json` and displayed under **Bench** in the app.

## Safety Focus

The included tests assert:
- Emergency escalation language (e.g., chest pain + breathlessness → “call 999”).
- Same‑day urgency patterns (“see someone today… try GP/UTC… call 111”).
- No diagnosis claims; uses hedging (“It sounds like…”, “I can’t be sure…”).
- Brevity (10–20 seconds), one topic per turn, safety‑netting (“Call back if…”).
- UK pathways and phone numbers spoken clearly.

Adjust scenarios in `/benchmarks/*.yaml`. The system prompt lives in `/config/prompt.md`.
