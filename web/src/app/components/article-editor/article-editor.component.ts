import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/domain/article';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firestore } from 'firebase';

@Component({
  selector: 'mark-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

  articleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ArticleEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public article: Article, private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: [this.article.title, [Validators.required]],
      text: [this.article.text, [Validators.required]],
      date: [this.article.publishTimestamp ?
        this.article.publishTimestamp.toDate().toISOString().slice(0, -1) :
        new Date().toISOString().slice(0, -1),
      [Validators.required]],
      audience: [this.article.audience, [Validators.required]],
      imageUrl: [this.article.imageUrl]
    });
  }

  ngOnInit(): void {
  }

  hasError(error: string, field: string): boolean {
    return this.articleForm.controls[field].touched
      && (this.articleForm.hasError(error, [field]) || this.articleForm.hasError(error));
  }

  save(): void {
    if (this.articleForm.valid) {
      this.dialogRef.close({
        ...this.articleForm.value,
        publishTimestamp: firestore.Timestamp.fromDate(new Date(this.articleForm.value.date))
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
