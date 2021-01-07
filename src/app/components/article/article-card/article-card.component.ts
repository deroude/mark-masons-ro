import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '@model/article';
import { Observable } from 'rxjs';
import { User } from '@model/user';
import { AuthService } from '../../../services/auth';
import { MatDialog } from '@angular/material/dialog';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';

@Component({
  selector: 'mark-article',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {

  @Input() article: Article;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  expanded = false;

  constructor(public auth: AuthService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onEdit(): void {
    this.edit.emit(this.article);
  }

  onDelete(): void {
    this.delete.emit(this.article);
  }

}
