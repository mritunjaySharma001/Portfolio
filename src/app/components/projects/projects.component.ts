import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { PROJECTS } from '../../data/portfolio.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="projects" class="section alt">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">04. Projects</span>
          <h2>Featured <span class="gradient-text">work</span></h2>
        </div>

        <div class="grid">
          @for (p of projects; track p.name; let i = $index) {
            <article class="card project" appReveal [revealDelay]="i * 100">
              <div class="bar" aria-hidden="true"></div>
              <header>
                <span class="period">{{ p.period }}</span>
                <h3>{{ p.name }}</h3>
                @if (p.client) {
                  <span class="client">Client: {{ p.client }}</span>
                }
              </header>
              <p class="summary">{{ p.summary }}</p>
              <ul class="highlights">
                @for (h of p.highlights; track $index) {
                  <li><app-icon name="check" [size]="16" /><span>{{ h }}</span></li>
                }
              </ul>
              <ul class="chips stack">
                @for (t of p.stack; track t) {
                  <li class="chip">{{ t }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid {
      display: grid; gap: 22px;
      @media (min-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    }
    .project {
      position: relative; overflow: hidden;
      display: flex; flex-direction: column;
      padding: 26px 22px 22px;
      transition: transform 0.25s ease, border-color 0.25s ease;
      @media (min-width: 600px) { padding: 32px 28px 28px; }
      &:hover { transform: translateY(-6px); border-color: var(--accent); }
    }
    .bar { position: absolute; inset: 0 0 auto 0; height: 4px; background: var(--gradient); }
    header { display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px; }
    .period { font-family: var(--mono); font-size: 0.82rem; color: var(--accent-2); }
    h3 { font-size: 1.35rem; font-weight: 700; }
    .client { font-size: 0.88rem; color: var(--text-muted); }
    .summary { color: var(--text-muted); margin-bottom: 18px; }
    .highlights {
      list-style: none; display: grid; gap: 10px; margin-bottom: 22px; flex: 1;
      li { display: flex; gap: 10px; font-size: 0.95rem; }
      app-icon { color: var(--accent); margin-top: 4px; flex-shrink: 0; }
    }
    .stack { list-style: none; }
  `,
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
