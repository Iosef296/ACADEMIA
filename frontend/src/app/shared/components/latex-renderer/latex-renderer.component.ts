import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import katex from 'katex';

@Component({
  selector: 'app-latex-renderer',
  template: '<span></span>',
  standalone: false,
})
export class LatexRendererComponent implements OnChanges {
  @Input() latex = '';
  @Input() displayMode = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnChanges(_changes: SimpleChanges): void {
    this.render();
  }

  private render(): void {
    if (!this.latex?.trim()) {
      this.el.nativeElement.innerHTML = '';
      return;
    }
    try {
      katex.render(this.latex, this.el.nativeElement, {
        displayMode: this.displayMode,
        throwOnError: false,
        output: 'html',
      });
    } catch {
      this.el.nativeElement.textContent = this.latex;
    }
  }
}
