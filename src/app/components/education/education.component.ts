import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { EDUCATION, TRAININGS } from '../../data/portfolio.data';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="education" class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">06. Education</span>
          <h2>Learning & <span class="gradient-text">training</span></h2>
        </div>

        <div class="cols">
          <div>
            <h3 class="col-title"><app-icon name="graduation" /> Education</h3>
            @for (e of education; track e.degree; let i = $index) {
              <article class="card entry" appReveal [revealDelay]="i * 90">
                <span class="period">{{ e.period }}</span>
                <h4>{{ e.degree }}</h4>
                <p class="org">{{ e.institution }}</p>
                @if (e.detail) {
                  <span class="chip">{{ e.detail }}</span>
                }
              </article>
            }
          </div>

          <div>
            <h3 class="col-title"><app-icon name="award" /> Training</h3>
            @for (t of trainings; track t.title; let i = $index) {
              <article class="card entry" appReveal [revealDelay]="i * 90">
                <span class="period">{{ t.period }}</span>
                <h4>{{ t.title }}</h4>
                <p class="org">{{ t.org }}</p>
                <p class="detail">{{ t.detail }}</p>
              </article>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cols {
      display: grid; gap: 36px;
      @media (min-width: 900px) { grid-template-columns: 1fr 1fr; gap: 32px; }
    }
    .col-title {
      display: flex; align-items: center; gap: 10px;
      font-size: 1.15rem; margin-bottom: 18px; color: var(--accent);
    }
    .entry {
      padding: 22px;
      display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
      transition: border-color 0.25s ease;
      &:hover { border-color: var(--accent); }
      & + .entry { margin-top: 16px; }
    }
    .period { font-family: var(--mono); font-size: 0.82rem; color: var(--accent-2); }
    h4 { font-size: 1.08rem; font-weight: 700; }
    .org { color: var(--text-muted); font-size: 0.95rem; }
    .detail { color: var(--text-muted); font-size: 0.92rem; margin-top: 6px; }
    .chip { margin-top: 10px; }
  `,
})
export class EducationComponent {
  readonly education = EDUCATION;
  readonly trainings = TRAININGS;
}
