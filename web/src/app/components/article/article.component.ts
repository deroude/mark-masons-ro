import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/domain/article';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;

  expanded = false;

  constructor() { }

  ngOnInit(): void {
  }

}
