import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
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


  constructor(private auth: AuthService, @Inject(LOCALE_ID) public locale: string) {
  }

  articles: Article[] = [];


  ngOnInit(): void {

  }



}
