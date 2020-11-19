import { AfterViewInit, Directive, ElementRef } from '@angular/core';

import * as marked from 'marked';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[markdown]'
})
export class MarkdownDirective implements AfterViewInit {

  constructor(private el: ElementRef) {

  }
  ngAfterViewInit(): void {
    const html = marked(this.el.nativeElement.innerText.replace(/\/\//g, '\n\n'));
    this.el.nativeElement.innerHTML = html;
  }

}
