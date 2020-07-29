import { Component, OnInit } from '@angular/core';
import { Article } from '../../domain/article';
import { generateArticle } from '../../domain/mock';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor() { }

  articles: Article[] = [];

  ngOnInit(): void {
    this.articles = [];
    for (let i = 0; i < 10; i++) {
      this.articles.push(generateArticle());
    }
  }

}
