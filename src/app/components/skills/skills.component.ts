import { Component, computed, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { SKILL_GROUPS, SKILL_LEVELS, SKILL_PROJECTS } from '../../data/portfolio.data';
import { SkillCategory, SkillLevel } from '../../models/portfolio.models';

type Filter = 'all' | SkillCategory;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'data', label: 'Data' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'ai', label: 'AI' },
  { id: 'practices', label: 'Architecture' },
];

const LEVEL_BARS: Record<SkillLevel, number> = { Expert: 3, Advanced: 2, Proficient: 1 };

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

        <div class="toolbar" appReveal>
          <div class="filters" role="group" aria-label="Filter skills">
            @for (f of filters; track f.id) {
              <button
                type="button"
                class="filter"
                [class.active]="filter() === f.id"
                [attr.aria-pressed]="filter() === f.id"
                (click)="setFilter(f.id)"
              >
                @if (f.id === 'ai') {
                  <app-icon name="sparkles" [size]="14" />
                }
                {{ f.label }}
              </button>
            }
          </div>
          <p class="legend">
            <span class="meter" aria-hidden="true"><i class="on"></i><i class="on"></i><i class="on"></i></span> Expert
            <span class="meter" aria-hidden="true"><i class="on"></i><i class="on"></i><i></i></span> Advanced
            <span class="meter" aria-hidden="true"><i class="on"></i><i></i><i></i></span> Proficient
            <span class="hint">· Hover or tap a skill to see where I've used it</span>
          </p>
        </div>

        <div class="grid">
          @for (group of visibleGroups(); track group.title; let i = $index) {
            <article class="card skill-card" [class.ai]="group.category === 'ai'" appReveal [revealDelay]="(i % 3) * 70">
              <header>
                <span class="icon"><app-icon [name]="group.icon" [size]="22" /></span>
                <h3>{{ group.title }}</h3>
              </header>
              <ul class="chips">
                @for (skill of group.skills; track skill) {
                  <li class="skill">
                    @if (projects[skill]; as used) {
                      <button
                        type="button"
                        class="chip"
                        [attr.aria-expanded]="open() === skill"
                        [attr.aria-label]="label(skill)"
                        (mouseenter)="open.set(skill)"
                        (mouseleave)="open.set(null)"
                        (focus)="open.set(skill)"
                        (blur)="open.set(null)"
                        (click)="open.set(skill)"
                      >
                        {{ skill }}
                        @if (bars(skill); as n) {
                          <span class="meter" aria-hidden="true">
                            <i [class.on]="n >= 1"></i><i [class.on]="n >= 2"></i><i [class.on]="n >= 3"></i>
                          </span>
                        }
                      </button>
                      @if (open() === skill) {
                        <div class="pop card" role="tooltip">
                          <strong>Used in</strong>
                          <ul>
                            @for (p of used; track p) {
                              <li>{{ p }}</li>
                            }
                          </ul>
                        </div>
                      }
                    } @else {
                      <span class="chip" [attr.aria-label]="label(skill)">
                        {{ skill }}
                        @if (bars(skill); as n) {
                          <span class="meter" aria-hidden="true">
                            <i [class.on]="n >= 1"></i><i [class.on]="n >= 2"></i><i [class.on]="n >= 3"></i>
                          </span>
                        }
                      </span>
                    }
                  </li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .toolbar { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
    .filters { display: flex; flex-wrap: wrap; gap: 8px; }
    .filter {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 999px; cursor: pointer;
      font: 600 0.85rem var(--font); color: var(--text-muted);
      background: var(--surface); border: 1px solid var(--border);
      transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
      &:hover { color: var(--text); border-color: var(--accent); }
      &.active { color: #fff; background: var(--gradient); border-color: transparent; }
    }
    .legend {
      display: flex; flex-wrap: wrap; align-items: center; gap: 6px 10px;
      font-size: 0.8rem; color: var(--text-muted);
    }
    .hint { opacity: 0.85; }
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
      &.ai { border-color: color-mix(in srgb, var(--accent-2) 45%, transparent); }
    }
    header { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
    h3 { font-size: 1.1rem; font-weight: 700; }
    .icon {
      display: grid; place-items: center;
      width: 44px; height: 44px; border-radius: 12px;
      background: var(--chip-bg); color: var(--accent);
    }
    .chips { list-style: none; }
    .skill { position: relative; }
    .chip { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font); line-height: 1.5; }
    button.chip {
      cursor: pointer;
      border: 1px dashed color-mix(in srgb, var(--accent) 45%, transparent);
      &:hover, &[aria-expanded='true'] { border-style: solid; border-color: var(--accent); }
    }
    .meter { display: inline-flex; gap: 2px; }
    .meter i { width: 4px; height: 10px; border-radius: 2px; background: var(--border); }
    .meter i.on { background: var(--accent-2); }
    .pop {
      position: absolute; z-index: 5; left: 0; bottom: calc(100% + 8px);
      min-width: 180px; max-width: 240px; padding: 10px 12px;
      font-size: 0.8rem; animation: pop 0.15s ease-out;
      strong { display: block; margin-bottom: 4px; color: var(--accent-2); font-size: 0.72rem;
        text-transform: uppercase; letter-spacing: 0.06em; }
      ul { list-style: none; display: grid; gap: 2px; }
      li::before { content: '▸ '; color: var(--accent); }
    }
    @keyframes pop { from { opacity: 0; transform: translateY(4px); } }
  `,
})
export class SkillsComponent {
  readonly filters = FILTERS;
  readonly projects = SKILL_PROJECTS;
  readonly filter = signal<Filter>('all');
  readonly open = signal<string | null>(null);

  readonly visibleGroups = computed(() => {
    const f = this.filter();
    return f === 'all' ? SKILL_GROUPS : SKILL_GROUPS.filter((g) => g.category === f);
  });

  setFilter(f: Filter): void {
    this.filter.set(f);
    this.open.set(null);
  }

  bars(skill: string): number {
    const level = SKILL_LEVELS[skill];
    return level ? LEVEL_BARS[level] : 0;
  }

  label(skill: string): string {
    const level = SKILL_LEVELS[skill];
    return level ? `${skill}: ${level}` : skill;
  }
}
