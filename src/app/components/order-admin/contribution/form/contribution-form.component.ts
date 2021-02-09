import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contribution } from '@model/contribution'; // TODO specify your model source

@Component({
  selector: 'mark-contribution-form',
  templateUrl: './contribution-form.component.html',
  styleUrls: ['./contribution-form.component.scss']
})
export class ContributionEditorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ContributionEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public item: Contribution, private fb: FormBuilder, private changeDetection: ChangeDetectorRef) {
    this.form = this.fb.group({
      id: [this.item.id],
      description: [this.item.description, Validators.required],
      value: [this.item.value, Validators.required],
      currency: [this.item.currency, Validators.required],
      dueDate: [this.item.dueDate, Validators.required]
    });
  }

  form: FormGroup;

  codes: string[] = [];

  ngOnInit(): void { }


  hasError(error: string, field: string): boolean {
    return this.form.controls[field].touched
      && (this.form.hasError(error, [field]) || this.form.hasError(error));
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(
        this.form.value
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
