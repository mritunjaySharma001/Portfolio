import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { EXPERIENCE } from '../../data/portfolio.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="experience" class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">03. Experience</span>
          <h2>Where I've <span class="gradient-text">worked</span></h2>
        </div>

        <ol class="timeline">
          @for (job of jobs; track job.company) {
            <li class="item" appReveal>
              <span class="node" [class.current]="job.current" aria-hidden="true">
                <app-icon name="briefcase" [size]="16" />
              </span>

              <article class="card job">
                <header>
                  <div>
                    <h3>{{ job.company }}</h3>
                    @if (job.note) {
                      <p class="note">{{ job.note }}</p>
                    }
                  </div>
                  <div class="when">
                    <span class="period">{{ job.period }}</span>
                    <span class="loc">{{ job.location }}</span>
                  </div>
                </header>

                <ul class="roles">
                  @for (role of job.roles; track role.title; let first = $first) {
                    <li [class.latest]="first">
                      <span class="role-title">{{ role.title }}</span>
                      <span class="role-period">{{ role.period }}</span>
                    </li>
                  }
                </ul>

                <ul class="highlights">
                  @for (h of job.highlights; track $index) {
                    <li>{{ h }}</li>
                  }
                </ul>
              </article>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .timeline {
      list-style: none;
      padding: 0;
      margin: 0;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 17px; top: 8px; bottom: 8px;
        width: 2px;
        background: linear-gradient(var(--accent), var(--accent-2), transparent);
        opacity: 0.5;
      }
    }
    .item {
      position: relative;
      padding-left: 52px;
      & + .item { margin-top: 28px; }
    }
    .node {
      position: absolute;
      left: 0; top: 22px;
      width: 36px; height: 36px;
      display: grid; place-items: center;
      border-radius: 50%;
      background: var(--surface);
      border: 2px solid var(--accent);
      color: var(--accent);
      &.current { background: var(--gradient); color: #fff; border-color: transparent; box-shadow: 0 0 0 6px var(--chip-bg); }
    }
    .job { padding: 22px; @media (min-width: 600px) { padding: 28px; } }
    header {
      display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px;
      margin-bottom: 16px;
    }
    h3 { font-size: 1.25rem; font-weight: 700; }
    .note { color: var(--accent-2); font-size: 0.9rem; margin-top: 2px; }
    .when { display: flex; flex-direction: column; font-size: 0.88rem; @media (min-width: 600px) { text-align: right; } }
    .period { font-family: var(--mono); color: var(--text); }
    .loc { color: var(--text-muted); }
    .roles {
      list-style: none;
      display: grid; gap: 6px;
      padding: 14px 16px;
      border-radius: var(--radius-sm);
      background: var(--surface-2);
      margin-bottom: 18px;
      li {
        display: flex; flex-wrap: wrap; justify-content: space-between; gap: 2px 16px;
        font-size: 0.92rem; color: var(--text-muted);
      }
      .latest .role-title { color: var(--text); font-weight: 600; }
      .role-period { font-family: var(--mono); font-size: 0.82rem; }
    }
    .highlights {
      list-style: none;
      display: grid; gap: 10px;
      li {
        position: relative; padding-left: 22px; color: var(--text-muted);
        &::before {
          content: '▹'; position: absolute; left: 0; top: 0; color: var(--accent-2);
        }
      }
    }
  `,
})
export class ExperienceComponent {
  readonly jobs = EXPERIENCE;
}
