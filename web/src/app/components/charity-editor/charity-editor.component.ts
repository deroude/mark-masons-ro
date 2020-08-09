import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Article } from 'src/app/domain/article';
import { Charity } from 'src/app/domain/charity';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firestore } from 'firebase';

@Component({
  selector: 'mark-charity-editor',
  templateUrl: './charity-editor.component.html',
  styleUrls: ['./charity-editor.component.scss']
})
export class CharityEditorComponent implements OnInit {

  charityForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CharityEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public charity: Charity, private fb: FormBuilder) {
    this.charityForm = this.fb.group({
      title: [this.charity.title, [Validators.required]],
      text: [this.charity.description.text, [Validators.required]],
      endDate: [this.charity.endDate ?
        this.charity.endDate.toDate().toISOString().slice(0, -1) :
        new Date().toISOString().slice(0, -1),
      [Validators.required]],
      audience: [this.charity.description.audience, [Validators.required]],
      targetAmount: [this.charity.targetAmount],
      targetCurrency: [this.charity.targetCurrency]
    });
  }

  ngOnInit(): void {
  }

  hasError(error: string, field: string): boolean {
    return this.charityForm.controls[field].touched
      && (this.charityForm.hasError(error, [field]) || this.charityForm.hasError(error));
  }

  save(): void {
    if (this.charityForm.valid) {
      this.dialogRef.close({
        ...this.charityForm.value,
        publishTimestamp: firestore.Timestamp.fromDate(new Date(this.charityForm.value.date))
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
