import { Component, computed, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { ARCH_NODES } from '../../data/portfolio.data';
import { ArchNode } from '../../models/portfolio.models';

const byId = (id: string) => ARCH_NODES.find((n) => n.id === id)!;

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [IconComponent, RevealDirective, NgTemplateOutlet],
  template: `
    <section id="architecture" class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">03. How I build</span>
          <h2>From <span class="gradient-text">UI to database</span>, shipped on Azure</h2>
          <p class="sub">The stack I work across every day. Select a layer to see what I do there.</p>
        </div>

        <div class="diagram" appReveal>
          <div class="azure" [class.selected]="selected().id === 'cloud'">
            <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: cloud, extra: 'cloud-node' }" />
            <div class="flow">
              @for (n of flow; track n.id; let last = $last) {
                <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: n }" />
                @if (!last) {
                  <span class="wire" aria-hidden="true"></span>
                }
              }
            </div>
          </div>

          <div class="lane">
            <span class="wire up" aria-hidden="true"></span>
            <span class="lane-label mono">builds &amp; ships ↑</span>
          </div>
          <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: ai, extra: 'ai-node' }" />
        </div>

        <div class="detail card" aria-live="polite">
          <span class="icon"><app-icon [name]="selected().icon" [size]="24" /></span>
          <div>
            <h3>{{ selected().title }}</h3>
            <span class="mono subtitle">{{ selected().subtitle }}</span>
            <p>{{ selected().detail }}</p>
            <ul>
              @for (p of selected().points; track p) {
                <li><app-icon name="check" [size]="16" /><span>{{ p }}</span></li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>

    <ng-template #nodeTpl let-n let-extra="extra">
      <button
        type="button"
        class="node {{ extra || '' }}"
        [class.selected]="selected().id === n.id"
        [attr.aria-pressed]="selected().id === n.id"
        (click)="selectedId.set(n.id)"
        (mouseenter)="selectedId.set(n.id)"
        (focus)="selectedId.set(n.id)"
      >
        <span class="n-icon"><app-icon [name]="n.icon" [size]="20" /></span>
        <span class="n-text">
          <strong>{{ n.title }}</strong>
          <small>{{ n.subtitle }}</small>
        </span>
      </button>
    </ng-template>
  `,
  styles: `
    .sub { margin-top: 10px; color: var(--text-muted); }
    .diagram { display: flex; flex-direction: column; align-items: stretch; }
    .azure {
      position: relative; padding: 16px; border-radius: var(--radius);
      border: 1.5px dashed color-mix(in srgb, var(--accent-2) 55%, transparent);
      background: color-mix(in srgb, var(--accent-2) 4%, transparent);
      transition: border-color 0.2s ease, background 0.2s ease;
      &.selected { border-style: solid; border-color: var(--accent-2); }
      @media (min-width: 900px) { padding: 20px 24px 24px; }
    }
    .flow {
      display: flex; flex-direction: column; align-items: stretch; margin-top: 14px;
      @media (min-width: 900px) { flex-direction: row; align-items: center; }
    }
    .node {
      display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0;
      padding: 14px 16px; text-align: left; cursor: pointer;
      color: var(--text); background: var(--surface); font-family: var(--font);
      border: 1px solid var(--border); border-radius: var(--radius-sm); box-shadow: var(--shadow);
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      &:hover { transform: translateY(-3px); }
      &.selected {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 25%, transparent), var(--shadow);
      }
    }
    .cloud-node { width: fit-content; padding: 8px 14px; box-shadow: none; }
    .ai-node { border-style: dashed; border-color: color-mix(in srgb, var(--accent) 50%, transparent); }
    .n-icon {
      display: grid; place-items: center; flex-shrink: 0; width: 38px; height: 38px;
      border-radius: 10px; background: var(--chip-bg); color: var(--accent);
    }
    .n-text { display: flex; flex-direction: column; min-width: 0; }
    strong { font-size: 0.95rem; }
    small { font-size: 0.75rem; color: var(--text-muted); font-family: var(--mono); }
    .wire {
      --dash: repeating-linear-gradient(180deg, var(--accent-2) 0 6px, transparent 6px 12px);
      align-self: center; width: 2px; height: 26px; background: var(--dash); background-size: 2px 12px;
      animation: flow-v 0.6s linear infinite;
      @media (min-width: 900px) {
        width: 36px; height: 2px; flex-shrink: 0;
        background: repeating-linear-gradient(90deg, var(--accent-2) 0 6px, transparent 6px 12px);
        background-size: 12px 2px; animation-name: flow-h;
      }
    }
    .wire.up { width: 2px; height: 34px; background: var(--dash); background-size: 2px 12px; animation: flow-up 0.6s linear infinite; }
    @keyframes flow-v { to { background-position: 0 12px; } }
    @keyframes flow-up { to { background-position: 0 -12px; } }
    @keyframes flow-h { to { background-position: 12px 0; } }
    .lane { display: flex; align-items: center; justify-content: center; gap: 10px; }
    .lane-label { font-size: 0.75rem; color: var(--text-muted); }
    .detail {
      display: flex; gap: 16px; margin-top: 24px; padding: 22px;
      @media (min-width: 600px) { padding: 26px 28px; }
      h3 { font-size: 1.2rem; }
      .subtitle { font-size: 0.8rem; color: var(--accent-2); }
      p { margin: 10px 0 12px; color: var(--text-muted); }
      ul { list-style: none; display: grid; gap: 8px; }
      li { display: flex; gap: 10px; font-size: 0.95rem; }
      li app-icon { color: var(--accent); margin-top: 4px; flex-shrink: 0; }
    }
    .icon {
      display: none; place-items: center; flex-shrink: 0; width: 48px; height: 48px;
      border-radius: 12px; background: var(--gradient); color: #fff;
      @media (min-width: 600px) { display: grid; }
    }
  `,
})
export class ArchitectureComponent {
  readonly flow: ArchNode[] = ['ui', 'api', 'domain', 'db'].map(byId);
  readonly cloud = byId('cloud');
  readonly ai = byId('ai');

  readonly selectedId = signal('api');
  readonly selected = computed(() => byId(this.selectedId()));
}
