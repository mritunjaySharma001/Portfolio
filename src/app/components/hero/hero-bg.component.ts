import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';

const SPACING = 34;
const RADIUS = 170;

/**
 * Faint dot grid behind the hero that lights up and links nodes near the cursor.
 * Runs outside Angular's zone; pauses off-screen; static under reduced motion.
 */
@Component({
  selector: 'app-hero-bg',
  standalone: true,
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: `
    :host { position: absolute; inset: 0; pointer-events: none; }
    canvas {
      width: 100%; height: 100%; display: block;
      mask-image: radial-gradient(ellipse at center, #000 40%, transparent 85%);
      -webkit-mask-image: radial-gradient(ellipse at center, #000 40%, transparent 85%);
    }
  `,
})
export class HeroBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private canvasRef!: ElementRef<HTMLCanvasElement>;

  private readonly zone = inject(NgZone);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private ctx: CanvasRenderingContext2D | null = null;
  private width = 0;
  private height = 0;
  private target = { x: -9999, y: -9999 };
  private pos = { x: -9999, y: -9999 };
  private raf = 0;
  private visible = true;
  private interactive = true;
  private colors = { dot: '#7c5cff', line: '#22d3ee' };

  private resizeObs?: ResizeObserver;
  private intersectObs?: IntersectionObserver;
  private themeObs?: MutationObserver;
  private readonly onMove = (e: PointerEvent) => this.handleMove(e);
  private readonly onLeave = () => this.handleLeave();

  ngAfterViewInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!this.ctx) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia?.('(pointer: fine)').matches;
    this.interactive = !reduce && finePointer !== false;

    this.zone.runOutsideAngular(() => {
      this.readColors();
      this.resizeObs = new ResizeObserver(() => this.resize());
      this.resizeObs.observe(this.host.nativeElement);

      this.themeObs = new MutationObserver(() => {
        this.readColors();
        this.draw();
      });
      this.themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

      if (this.interactive) {
        this.intersectObs = new IntersectionObserver(([entry]) => {
          this.visible = entry.isIntersecting;
        });
        this.intersectObs.observe(this.host.nativeElement);
        window.addEventListener('pointermove', this.onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', this.onLeave);
      }
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.resizeObs?.disconnect();
    this.intersectObs?.disconnect();
    this.themeObs?.disconnect();
    window.removeEventListener('pointermove', this.onMove);
    document.documentElement.removeEventListener('pointerleave', this.onLeave);
  }

  private readColors(): void {
    const css = getComputedStyle(document.documentElement);
    this.colors.dot = css.getPropertyValue('--accent').trim() || this.colors.dot;
    this.colors.line = css.getPropertyValue('--accent-2').trim() || this.colors.line;
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = this.host.nativeElement.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    this.ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.draw();
  }

  private handleMove(e: PointerEvent): void {
    if (!this.visible) return;
    const rect = this.host.nativeElement.getBoundingClientRect();
    this.target = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (this.pos.x < -1000) this.pos = { ...this.target };
    this.schedule();
  }

  private handleLeave(): void {
    this.target = { x: -9999, y: -9999 };
    this.pos = { ...this.target };
    this.schedule();
  }

  private schedule(): void {
    if (!this.raf) this.raf = requestAnimationFrame(() => this.frame());
  }

  private frame(): void {
    this.raf = 0;
    const dx = this.target.x - this.pos.x;
    const dy = this.target.y - this.pos.y;
    this.pos.x += dx * 0.18;
    this.pos.y += dy * 0.18;
    this.draw();
    if (Math.abs(dx) + Math.abs(dy) > 0.5) this.schedule();
  }

  private draw(): void {
    const ctx = this.ctx;
    if (!ctx || !this.width) return;
    ctx.clearRect(0, 0, this.width, this.height);

    const cols = Math.ceil(this.width / SPACING) + 1;
    const rows = Math.ceil(this.height / SPACING) + 1;
    const { x: mx, y: my } = this.pos;

    // Links between neighbouring dots close to the cursor.
    ctx.strokeStyle = this.colors.line;
    ctx.lineWidth = 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * SPACING;
        const y = r * SPACING;
        const t = this.intensity(x, y, mx, my);
        if (t <= 0.05) continue;
        ctx.globalAlpha = t * 0.35;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + SPACING, y);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + SPACING);
        ctx.stroke();
      }
    }

    ctx.fillStyle = this.colors.dot;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * SPACING;
        const y = r * SPACING;
        const t = this.intensity(x, y, mx, my);
        ctx.globalAlpha = 0.18 + t * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, 1.1 + t * 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  private intensity(x: number, y: number, mx: number, my: number): number {
    const d = Math.hypot(x - mx, y - my);
    return d >= RADIUS ? 0 : 1 - d / RADIUS;
  }
}
