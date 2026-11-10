import { Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { AssistantService } from '../../services/assistant.service';
import { AssistantAction } from '../../models/portfolio.models';

interface Message {
  from: 'bot' | 'user';
  text: string;
  actions?: AssistantAction[];
}

const SUGGESTIONS = [
  "What's your .NET experience?",
  'How do you use AI?',
  'Show me projects',
  'Are you open to roles?',
  'Download resume',
];

@Component({
  selector: 'app-assistant',
  standalone: true,
  imports: [IconComponent],
  template: `
    <button
      #fab
      type="button"
      class="fab"
      [class.open]="open()"
      [attr.aria-expanded]="open()"
      aria-controls="assistant-panel"
      [attr.aria-label]="open() ? 'Close assistant' : 'Ask about me'"
      (click)="toggle()"
    >
      <app-icon [name]="open() ? 'close' : 'sparkles'" [size]="20" />
      <span class="fab-label">{{ open() ? 'Close' : 'Ask about me' }}</span>
    </button>

    @if (open()) {
      <div
        #panel
        id="assistant-panel"
        class="panel card"
        role="dialog"
        aria-modal="false"
        aria-labelledby="assistant-title"
        (keydown)="onKeydown($event)"
      >
        <header>
          <span class="avatar"><app-icon name="sparkles" [size]="18" /></span>
          <div>
            <strong id="assistant-title">Portfolio assistant</strong>
            <small>Answers from this site's content. Not a live AI model.</small>
          </div>
          <button type="button" class="close" aria-label="Close assistant" (click)="close()">
            <app-icon name="close" [size]="18" />
          </button>
        </header>

        <div #log class="log" role="log" aria-live="polite">
          @for (m of messages(); track $index) {
            <div class="msg" [class.user]="m.from === 'user'">
              <p>{{ m.text }}</p>
              @if (m.actions?.length) {
                <div class="actions">
                  @for (a of m.actions; track a.label) {
                    <button type="button" class="action" (click)="runAction(a)">
                      {{ copied() === a.href ? 'Copied ✔' : a.label }}
                    </button>
                  }
                </div>
              }
            </div>
          }
          @if (thinking()) {
            <div class="msg typing" aria-label="Assistant is typing"><i></i><i></i><i></i></div>
          }
        </div>

        <div class="suggestions" aria-label="Suggested questions">
          @for (s of suggestions; track s) {
            <button type="button" class="chip" (click)="ask(s)">{{ s }}</button>
          }
        </div>

        <form (submit)="submit($event, input)">
          <input
            #input
            type="text"
            placeholder="Ask about skills, projects, AI…"
            aria-label="Your question"
            maxlength="200"
            autocomplete="off"
          />
          <button type="submit" class="send" aria-label="Send"><app-icon name="send" [size]="18" /></button>
        </form>
      </div>
    }
  `,
  styles: `
    .fab {
      position: fixed; right: 16px; bottom: 16px; z-index: 60;
      display: inline-flex; align-items: center; gap: 8px; height: 52px; padding: 0 18px;
      border: 0; border-radius: 999px; cursor: pointer; color: #fff; background: var(--gradient);
      font: 600 0.92rem var(--font); box-shadow: 0 10px 30px rgba(124, 92, 255, 0.45);
      transition: transform 0.2s ease;
      &:hover { transform: translateY(-2px); }
      &:not(.open)::after {
        content: ''; position: absolute; inset: -4px; border-radius: inherit;
        border: 2px solid var(--accent-2); opacity: 0; animation: ping 2.8s ease-out infinite;
      }
    }
    @keyframes ping { 0% { opacity: 0.7; transform: scale(0.95); } 70%, 100% { opacity: 0; transform: scale(1.15); } }
    .fab-label { @media (max-width: 420px) { display: none; } }
    .panel {
      position: fixed; z-index: 60; right: 16px; bottom: 80px;
      width: min(380px, calc(100vw - 32px)); height: min(540px, calc(100svh - 120px));
      display: flex; flex-direction: column; overflow: hidden;
      animation: rise 0.2s ease-out;
    }
    @keyframes rise { from { opacity: 0; transform: translateY(12px); } }
    header {
      display: flex; align-items: center; gap: 10px; padding: 14px 14px 12px;
      border-bottom: 1px solid var(--border);
      div { display: flex; flex-direction: column; min-width: 0; flex: 1; }
      strong { font-size: 0.95rem; }
      small { font-size: 0.72rem; color: var(--text-muted); }
    }
    .avatar {
      display: grid; place-items: center; width: 36px; height: 36px; flex-shrink: 0;
      border-radius: 50%; background: var(--gradient); color: #fff;
    }
    .close {
      display: grid; place-items: center; width: 34px; height: 34px; border-radius: 8px;
      border: 1px solid var(--border); background: transparent; color: var(--text); cursor: pointer;
    }
    .log { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
    .msg {
      align-self: flex-start; max-width: 88%; padding: 10px 12px; font-size: 0.88rem; line-height: 1.5;
      border-radius: 14px 14px 14px 4px; background: var(--surface-2); border: 1px solid var(--border);
      animation: rise 0.2s ease-out;
      &.user {
        align-self: flex-end; color: #fff; background: var(--gradient); border-color: transparent;
        border-radius: 14px 14px 4px 14px;
      }
    }
    .actions { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
    .action {
      padding: 4px 10px; border-radius: 999px; cursor: pointer; font: 600 0.76rem var(--font);
      color: var(--accent); background: var(--surface); border: 1px solid var(--accent);
      &:hover { background: var(--chip-bg); }
    }
    .typing { display: flex; gap: 4px; i {
      width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted);
      animation: bounce 1s infinite ease-in-out;
      &:nth-child(2) { animation-delay: 0.15s; } &:nth-child(3) { animation-delay: 0.3s; }
    } }
    @keyframes bounce { 40% { transform: translateY(-4px); opacity: 1; } 0%, 80%, 100% { opacity: 0.4; } }
    .suggestions {
      display: flex; gap: 6px; padding: 8px 14px; overflow-x: auto; scrollbar-width: none;
      border-top: 1px solid var(--border);
      .chip { flex-shrink: 0; cursor: pointer; font-family: var(--font); white-space: nowrap; }
      .chip:hover { border-color: var(--accent); }
    }
    form { display: flex; gap: 8px; padding: 10px 14px 14px; }
    input {
      flex: 1; min-width: 0; padding: 10px 14px; border-radius: 999px; font: 0.9rem var(--font);
      color: var(--text); background: var(--surface-2); border: 1px solid var(--border);
      &:focus { outline: none; border-color: var(--accent); }
    }
    .send {
      display: grid; place-items: center; width: 42px; height: 42px; flex-shrink: 0;
      border: 0; border-radius: 50%; cursor: pointer; color: #fff; background: var(--gradient);
    }
  `,
})
export class AssistantComponent implements OnDestroy {
  @ViewChild('fab') private fab?: ElementRef<HTMLButtonElement>;
  @ViewChild('panel') private panel?: ElementRef<HTMLElement>;
  @ViewChild('log') private log?: ElementRef<HTMLElement>;
  @ViewChild('input') private input?: ElementRef<HTMLInputElement>;

  private readonly assistant = inject(AssistantService);

  readonly suggestions = SUGGESTIONS;
  readonly open = signal(false);
  readonly thinking = signal(false);
  readonly copied = signal<string | null>(null);
  readonly messages = signal<Message[]>([
    {
      from: 'bot',
      text: "Hi! I'm a scripted assistant for this portfolio. Ask me about Mritunjay's .NET, Angular, Azure or AI-assisted engineering work.",
    },
  ]);

  private timers: ReturnType<typeof setTimeout>[] = [];

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
  }

  toggle(): void {
    this.open() ? this.close() : this.show();
  }

  show(): void {
    this.open.set(true);
    this.later(() => this.input?.nativeElement.focus(), 0);
  }

  close(): void {
    this.open.set(false);
    this.fab?.nativeElement.focus();
  }

  submit(event: Event, input: HTMLInputElement): void {
    event.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    this.ask(q);
  }

  ask(question: string): void {
    if (this.thinking()) return;
    this.push({ from: 'user', text: question });
    this.thinking.set(true);
    const reply = this.assistant.answer(question);
    this.later(() => {
      this.thinking.set(false);
      this.push({ from: 'bot', text: reply.answer, actions: reply.actions });
    }, 450 + Math.min(reply.answer.length * 2, 500));
  }

  runAction(a: AssistantAction): void {
    if (a.href.startsWith('copy:')) {
      const text = a.href.slice(5);
      navigator.clipboard?.writeText(text).then(
        () => {
          this.copied.set(a.href);
          this.later(() => this.copied.set(null), 1800);
        },
        () => window.prompt('Copy this:', text),
      );
    } else if (a.href.startsWith('#')) {
      document.querySelector(a.href)?.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth < 600) this.close();
    } else {
      const link = document.createElement('a');
      link.href = a.href;
      if (a.download) link.download = '';
      else {
        link.target = '_blank';
        link.rel = 'noopener';
      }
      link.click();
    }
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.close();
      return;
    }
    if (e.key !== 'Tab' || !this.panel) return;
    // Keep keyboard focus inside the open panel.
    const focusable = Array.from(
      this.panel.nativeElement.querySelectorAll<HTMLElement>('button, input'),
    ).filter((el) => !el.hasAttribute('disabled'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  private push(m: Message): void {
    this.messages.update((list) => [...list, m]);
    this.later(() => {
      const el = this.log?.nativeElement;
      el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, 0);
  }

  private later(fn: () => void, ms: number): void {
    this.timers.push(setTimeout(fn, ms));
  }
}
