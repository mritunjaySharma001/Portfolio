import { Component, HostListener, inject, signal } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../services/theme.service';
import { PROFILE } from '../../data/portfolio.data';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly theme = inject(ThemeService);
  readonly profile = PROFILE;

  readonly links: NavLink[] = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'architecture', label: 'Stack' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly active = signal('');

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 10);

    // Highlight the section whose top has passed ~40% of the viewport.
    const marker = window.scrollY + window.innerHeight * 0.4;
    let current = '';
    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (el && el.offsetTop <= marker) current = link.id;
    }
    this.active.set(current);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 900) this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
