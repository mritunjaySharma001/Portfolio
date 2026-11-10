import { Injectable } from '@angular/core';
import { ASSISTANT_KB, PROFILE } from '../data/portfolio.data';
import { AssistantEntry } from '../models/portfolio.models';

/**
 * Scripted portfolio assistant: scores each knowledge-base entry by keyword overlap
 * with the question. No LLM and no network calls; everything runs in the browser.
 */
@Injectable({ providedIn: 'root' })
export class AssistantService {
  readonly fallback: AssistantEntry = {
    intents: [],
    answer:
      "I don't have an answer for that one. Try asking about his .NET, Angular, SQL Server, Azure or AI-assisted work, his projects or education. Or reach him directly:",
    actions: [
      { label: 'Send a message', href: '#contact' },
      { label: 'LinkedIn', href: PROFILE.linkedin },
    ],
  };

  answer(question: string): AssistantEntry {
    const text = ` ${question.toLowerCase()} `;
    const words = new Set<string>();
    for (const raw of text.match(/[a-z0-9#+./]+/g) ?? []) {
      const w = raw.replace(/^[./]+(?!net)|[./]+$/g, '');
      if (!w) continue;
      words.add(w);
      if (w.length > 3 && w.endsWith('s')) words.add(w.slice(0, -1));
    }

    let best: AssistantEntry | null = null;
    let bestScore = 0;
    for (const entry of ASSISTANT_KB) {
      let score = 0;
      for (const intent of entry.intents) {
        const isPhrase = /[^a-z0-9]/.test(intent);
        if (isPhrase ? text.includes(intent) : words.has(intent)) score++;
      }
      if (score > bestScore) {
        best = entry;
        bestScore = score;
      }
    }
    return best ?? this.fallback;
  }
}
