import { Component, OnInit } from '@angular/core';
import { Article } from '../../domain/article';
import { generateArticle } from '../../domain/mock';
import { AuthService } from 'src/app/services/auth';
import { User } from 'src/app/domain/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'mark-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  user$: Observable<User>;

  constructor(auth: AuthService) {
    this.user$ = auth.user$;
  }

  articles: Article[] = [];

  ngOnInit(): void {
    this.articles = [];
    for (let i = 0; i < 10; i++) {
      this.articles.push(generateArticle());
    }
  }

}
