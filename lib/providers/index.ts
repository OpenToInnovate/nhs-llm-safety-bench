
export type ChatMessage = { role: 'system'|'user'|'assistant', content: string };

export function getSystemPrompt(): string {
  const fs = require('node:fs');
  const path = require('node:path');
  try {
    const p = path.join(process.cwd(), 'config', 'prompt.md');
    return fs.readFileSync(p, 'utf8');
  } catch {
    return 'You are a helpful assistant.';
  }
}
