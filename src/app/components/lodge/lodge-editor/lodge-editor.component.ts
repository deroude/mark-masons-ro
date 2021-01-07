import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lodge } from '@model/lodge';

@Component({
  selector: 'mark-lodge-editor',
  templateUrl: './lodge-editor.component.html',
  styleUrls: ['./lodge-editor.component.scss']
})
export class LodgeEditorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LodgeEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public lodge: Lodge, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [this.lodge.name, [Validators.required]],
      number: [this.lodge.number, [Validators.required]],
      orient: [this.lodge.orient, [Validators.required]],
      location: [this.lodge.location],
      status: [this.lodge.status, [Validators.required]]
    });
  }

  form: FormGroup;

  ngOnInit(): void {
  }


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
