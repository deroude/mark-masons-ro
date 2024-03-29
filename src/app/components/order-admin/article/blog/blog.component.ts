import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Article } from '@model/article';
import { AuthService } from '@services/auth';
import { ArticleService } from '@api/article.service';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'mark-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {


  constructor(
    public auth: AuthService,
    @Inject(LOCALE_ID) public locale: string,
    private dialog: MatDialog,
    private articleService: ArticleService) {
  }

  articles: Article[] = [];

  searchTermInternal: string = null;

  get searchTerm(): string {
    return this.searchTermInternal;
  }

  set searchTerm(s: string) {
    this.searchTermInternal = s.trim().length > 0 ? s.trim() : null;
  }

  ngOnInit(): void {
    this.search();
  }

  search(): void {
    this.articleService.rAgetArticles('BLOG', this.searchTerm, this.locale).subscribe(arts => this.articles = arts);
  }

  deleteArticle(event: Article): void {
    this.articleService.rAdeleteArticle(event.id).subscribe(() => this.search());
  }

  editArticle(event: Article): void {
    const dialogRef = this.dialog.open(ArticleEditorComponent, {
      width: '600px',
      data: event || {}
    });

    dialogRef.afterClosed().subscribe((result: Article) => {
      if (result) {
        result.language = this.locale;
        result.category = 'BLOG';
        result.publishDate = new Date().toISOString();
        if (result.id) {
          this.articleService.rAupdateArticle(result.id, result).subscribe(() => this.search());
        } else {
          this.articleService.rAaddArticle(result).subscribe(() => this.search());
        }
      }
    });
  }

}
