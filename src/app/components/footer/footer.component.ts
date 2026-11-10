import { Component, HostListener, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  template: `
    <footer>
      <div class="container inner">
        <p>© {{ year }} {{ profile.name }}. Built with Angular.</p>
        <div class="social">
          <a [href]="'mailto:' + profile.email" aria-label="Email"><app-icon name="mail" /></a>
          <a [href]="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn"><app-icon name="linkedin" /></a>
        </div>
      </div>
    </footer>

    <a href="#home" class="to-top" [class.show]="showTop()" aria-label="Back to top">
      <app-icon name="arrow-up" />
    </a>
  `,
  styles: `
    footer { border-top: 1px solid var(--border); padding: 28px 0; }
    .inner {
      display: flex; flex-direction: column; align-items: center; gap: 14px;
      text-align: center; font-size: 0.9rem; color: var(--text-muted);
      @media (min-width: 600px) { flex-direction: row; justify-content: space-between; }
    }
    .social { display: flex; gap: 10px; }
    .social a, .to-top {
      display: grid; place-items: center;
      width: 40px; height: 40px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--surface); color: var(--text);
      transition: color 0.2s ease, border-color 0.2s ease, opacity 0.3s ease, transform 0.3s ease;
      &:hover { color: var(--accent); border-color: var(--accent); }
    }
    .to-top {
      position: fixed; right: 22px; bottom: 84px; z-index: 50;
      box-shadow: var(--shadow);
      opacity: 0; pointer-events: none; transform: translateY(12px);
      &.show { opacity: 1; pointer-events: auto; transform: none; }
    }
  `,
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly year = new Date().getFullYear();
  readonly showTop = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showTop.set(window.scrollY > 600);
  }
}
