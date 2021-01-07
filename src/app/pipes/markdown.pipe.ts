import { AfterViewInit, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import * as marked from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  public transform(value: any, type: string): SafeHtml {
    const html = marked(value.replace(/\/\//g, '\n\n'));
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
