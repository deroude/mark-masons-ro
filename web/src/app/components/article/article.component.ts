import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/domain/article';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { AuthService } from 'src/app/services/auth';
import { MatDialog } from '@angular/material/dialog';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';

@Component({
  selector: 'mark-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article;

  expanded = false;

  user$: Observable<User>;

  constructor(auth: AuthService, public dialog: MatDialog) {
    this.user$ = auth.user$;
  }

  ngOnInit(): void {
  }

  edit(): void {
    const dialogRef = this.dialog.open(ArticleEditorComponent, {
      width: '600px',
      data: this.article
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.article = result;
    });
  }

}
