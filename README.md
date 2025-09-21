# MY GP LLM Safety Bench

A research platform for **benchmarking medical safety** of LLM responses and **offering real-time chat** for manual testing.

*Inspired by the [NHS 10-year plan for England](https://www.gov.uk/government/publications/10-year-health-plan-for-england-fit-for-the-future) and the need for safe AI in healthcare.*

## 🌐 Live Demo

**[🚀 Try the Live Demo](https://opentoinnovate.github.io/nhs-llm-safety-bench/)**

The site is fully functional and hosted on GitHub Pages. No installation required - just enter your Claude API key and start testing!

## 🎯 Why Claude?

**We focus exclusively on Anthropic's Claude** because it's the best foundation model for medical safety by a significant margin:

- **Superior medical reasoning** and safety guardrails
- **Consistent adherence** to medical guidelines and protocols  
- **Reliable emergency escalation** patterns
- **83% pass rate** on our comprehensive safety benchmarks
- **Built-in safety features** specifically designed for healthcare applications

## 📊 Latest Benchmark Results

**[📋 View Latest Safety Report (83% Pass Rate - 33/40 Tests)](./BENCHMARK_REPORT.md)**

*Also available as [HTML report](./report.html)*

Current coverage: Emergency care, mental health, elderly care, early years, pregnancy, sexual health, safeguarding, suicide risk assessment, and urgent care scenarios.

## 🚀 Quick Start

### Option 1: Use the Live Demo (Recommended)
1. Visit the [Live Demo](https://opentoinnovate.github.io/nhs-llm-safety-bench/)
2. Go to the **Chat** page
3. Enter your Claude API key from [Anthropic Console](https://console.anthropic.com/)
4. Start testing medical scenarios immediately

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/OpenToInnovate/nhs-llm-safety-bench.git
cd nhs-llm-safety-bench

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 to see the dashboard, chat, and latest benchmark.

## 🧪 Run Safety Benchmarks (Secure)

Test Claude's medical safety performance with your API key:

```bash
# Run all 40 safety scenarios with your API key
npm run bench <your-claude-api-key>

# Example:
npm run bench sk-ant-api03-...

# Generate detailed reports (HTML + Markdown)
npm run bench:report
```

**🔒 Security Note**: Your API key is passed as a runtime parameter and never stored in files or environment variables. It's only used for the API call and then discarded.

Results are saved to `/data/results.json` and displayed in the web app under **Bench**.

## 🌐 GitHub Pages Deployment

This site is deployed to GitHub Pages using a simple, reliable method:

- **Live URL**: https://opentoinnovate.github.io/nhs-llm-safety-bench/
- **Manual deployment** - no GitHub Actions dependency
- **Static hosting** - no server required
- **Client-side API key input** - completely secure

### Deploy Your Own Copy

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings (Source: Deploy from a branch → main → / (root))
3. **Run deployment**: `npm run deploy`
4. **Your site** will be available at `https://yourusername.github.io/nhs-llm-safety-bench`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

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

- **`benchmarks.yaml`** - Consolidated safety scenarios (40 cases) across medical domains
- **`/config/prompt.md`** - NHS-style system prompt for medical triage
- **`/scripts/run-bench.ts`** - Benchmark execution engine (secure API key handling)
- **`/scripts/generate-report.ts`** - Report generation (HTML + Markdown)
- **`/scripts/simple-deploy.sh`** - GitHub Pages deployment script
- **`/app/`** - Next.js web interface with chat and results dashboard
- **`/data/results.json`** - Latest benchmark results (auto-generated)
- **Static files** - Deployed to GitHub Pages root for hosting

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
- **Local storage only** for chat interface convenience
- **Open source** and fully auditable
- **GitHub Pages hosting** - no server-side processing

## 📈 Recent Updates

- ✅ **GitHub Pages deployment** - Live and accessible
- ✅ **Secure API key handling** - Runtime parameters only
- ✅ **Static site generation** - No server dependencies
- ✅ **GOV.UK inspired design** - Professional medical interface
- ✅ **Real-time chat testing** - Direct Claude integration
- ✅ **Comprehensive benchmarks** - 40 medical safety scenarios
- ✅ **Simple deployment** - No GitHub Actions dependency

## 🤝 Contributing

This project is open source and welcomes contributions:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Submit a pull request**

## 📄 License

This project is open source and available under the MIT License.

---

**Built for medical AI safety testing • Inspired by the [NHS 10-year health plan](https://www.gov.uk/government/publications/10-year-health-plan-for-england-fit-for-the-future)**
