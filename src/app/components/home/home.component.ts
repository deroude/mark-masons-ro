import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ArticleService } from '@api/article.service';

@Component({
  selector: 'mark-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  text = '';

  constructor(private articleService: ArticleService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
    this.articleService.getArticles('HOME', null, this.locale).subscribe(re => {
      if (re && re[0]) {
        this.text = re[0].text;
      }
    });
  }

}
