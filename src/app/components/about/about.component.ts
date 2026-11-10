import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { CountUpDirective } from '../../directives/count-up.directive';
import { PROFILE, STATS } from '../../data/portfolio.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective, CountUpDirective],
  template: `
    <section id="about" class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">01. About me</span>
          <h2>Engineering software that creates <span class="gradient-text">real business value</span></h2>
        </div>

        <div class="about-grid">
          <div class="text" appReveal>
            @for (para of profile.summary; track $index) {
              <p>{{ para }}</p>
            }
          </div>

          <div class="stats">
            @for (stat of stats; track stat.label; let i = $index) {
              <div class="stat card" appReveal [revealDelay]="i * 90">
                <span class="value gradient-text" [appCountUp]="stat.value"></span>
                <span class="label">{{ stat.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about-grid {
      display: grid;
      gap: 40px;
      @media (min-width: 900px) {
        grid-template-columns: 1.4fr 1fr;
        gap: 56px;
      }
    }
    .text p {
      color: var(--text-muted);
      font-size: 1.05rem;
      & + p { margin-top: 16px; }
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      align-content: start;
    }
    .stat {
      padding: 22px 18px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: transform 0.25s ease, border-color 0.25s ease;
      &:hover { transform: translateY(-4px); border-color: var(--accent); }
    }
    .value { font-size: clamp(1.8rem, 5vw, 2.4rem); font-weight: 800; line-height: 1.1; }
    .label { font-size: 0.88rem; color: var(--text-muted); }
  `,
})
export class AboutComponent {
  readonly profile = PROFILE;
  readonly stats = STATS;
}
