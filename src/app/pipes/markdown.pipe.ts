import { AfterViewInit, ElementRef, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  public transform(value: any): SafeHtml {
    const html = this.sanitizer.sanitize(SecurityContext.HTML, marked(value.replace(/\/\//g, '\n\n').replace('\t', '')));
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
