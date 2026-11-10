import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { RevealDirective } from '../../directives/reveal.directive';
import { PROFILE } from '../../data/portfolio.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, IconComponent, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly profile = PROFILE;
  readonly sent = signal(false);

  model = { name: '', email: '', message: '' };

  /** No backend: opens the visitor's mail client with the message pre-filled. */
  submit(): void {
    const subject = encodeURIComponent(`Portfolio enquiry from ${this.model.name}`);
    const body = encodeURIComponent(`${this.model.message}\n\n— ${this.model.name} (${this.model.email})`);
    window.location.href = `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
    this.sent.set(true);
  }
}
