import { Component, OnInit } from '@angular/core';
import { Article } from '@model/article';
import { generateArticle } from '../../domain/mock';
import { AuthService } from '../../services/auth';
import { User } from '@model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'mark-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {


  constructor(private auth: AuthService) {
  }

  articles: Article[] = [];

  ngOnInit(): void {
    this.articles = [];
    for (let i = 0; i < 10; i++) {
      this.articles.push(generateArticle());
    }
  }

}
