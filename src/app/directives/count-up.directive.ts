import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Renders a stat like "35%" or "20+" and counts the number up from 0 the first time
 * it scrolls into view. Shows the final value immediately under reduced motion.
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
})
export class CountUpDirective implements OnInit, OnDestroy {
  @Input({ required: true, alias: 'appCountUp' }) value!: string;
  @Input() countDuration = 1400;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private raf = 0;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const match = /^(\D*)(\d+)(.*)$/.exec(this.value);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!match || reduce || !('IntersectionObserver' in window)) {
      node.textContent = this.value;
      return;
    }

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    node.textContent = `${prefix}0${suffix}`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        this.observer?.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / this.countDuration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          node.textContent = `${prefix}${Math.round(target * eased)}${suffix}`;
          if (p < 1) this.raf = requestAnimationFrame(step);
        };
        this.raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.raf);
  }
}
