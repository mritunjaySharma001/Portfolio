import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly profile = PROFILE;
  readonly typed = signal('');
  readonly photoFailed = signal(false);

  private timer?: ReturnType<typeof setTimeout>;
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;

  ngOnInit(): void {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.typed.set(this.profile.roles[0]);
      return;
    }
    this.tick();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  private tick(): void {
    const role = this.profile.roles[this.roleIndex];
    this.charIndex += this.deleting ? -1 : 1;
    this.typed.set(role.slice(0, this.charIndex));

    let delay = this.deleting ? 40 : 85;
    if (!this.deleting && this.charIndex === role.length) {
      delay = 1800;
      this.deleting = true;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.profile.roles.length;
      delay = 350;
    }
    this.timer = setTimeout(() => this.tick(), delay);
  }
}
