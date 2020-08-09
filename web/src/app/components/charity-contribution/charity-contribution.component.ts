import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contribution } from 'src/app/domain/charity';
import { firestore } from 'firebase';

@Component({
  selector: 'mark-charity-contribution',
  templateUrl: './charity-contribution.component.html',
  styleUrls: ['./charity-contribution.component.scss']
})
export class CharityContributionComponent implements OnInit {

  contributionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CharityContributionComponent>,
    @Inject(MAT_DIALOG_DATA) public contribution: Contribution, private fb: FormBuilder) {
    this.contributionForm = this.fb.group({
      anonymous: [this.contribution.anonymous, [Validators.required]],
      paidAmount: [this.contribution.amount, [Validators.required]],
      paidCurrency: [this.contribution.currency, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  hasError(error: string, field: string): boolean {
    return this.contributionForm.controls[field].touched
      && (this.contributionForm.hasError(error, [field]) || this.contributionForm.hasError(error));
  }

  save(): void {
    if (this.contributionForm.valid) {
      this.dialogRef.close({
        ...this.contributionForm.value,
        payDate: firestore.Timestamp.fromDate(new Date())
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
