import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { SKILL_GROUPS } from '../../data/portfolio.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [IconComponent, RevealDirective],
  template: `
    <section id="skills" class="section alt">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="eyebrow">02. Skills</span>
          <h2>My technical <span class="gradient-text">toolkit</span></h2>
        </div>

        <div class="grid">
          @for (group of groups; track group.title; let i = $index) {
            <article class="card skill-card" appReveal [revealDelay]="(i % 3) * 90">
              <header>
                <span class="icon"><app-icon [name]="group.icon" [size]="22" /></span>
                <h3>{{ group.title }}</h3>
              </header>
              <ul class="chips">
                @for (skill of group.skills; track skill) {
                  <li class="chip">{{ skill }}</li>
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
      display: grid;
      gap: 18px;
      @media (min-width: 600px) { grid-template-columns: repeat(2, 1fr); }
      @media (min-width: 1000px) { grid-template-columns: repeat(3, 1fr); }
    }
    .skill-card {
      padding: 24px;
      transition: transform 0.25s ease, border-color 0.25s ease;
      &:hover { transform: translateY(-4px); border-color: var(--accent); }
    }
    header { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
    h3 { font-size: 1.1rem; font-weight: 700; }
    .icon {
      display: grid; place-items: center;
      width: 44px; height: 44px; border-radius: 12px;
      background: var(--chip-bg); color: var(--accent);
    }
    .chips { list-style: none; }
  `,
})
export class SkillsComponent {
  readonly groups = SKILL_GROUPS;
}
