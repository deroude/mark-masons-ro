import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LodgeService } from '@api/lodge.service';
import { Lodge } from '@model/lodge';
import { History } from '@model/history';

@Component({
  selector: 'mark-user-history-editor',
  templateUrl: './user-history-editor.component.html',
  styleUrls: ['./user-history-editor.component.scss']
})
export class UserHistoryEditorComponent implements OnInit {

  lodges: Lodge[];
  historyForm: FormGroup;

  constructor(
    private lodgeService: LodgeService,
    public dialogRef: MatDialogRef<UserHistoryEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public history: History,
    private fb: FormBuilder) {
    this.historyForm = this.fb.group({
      startDate: [this.history.startDate, [Validators.required]],
      endDate: [this.history.endDate],
      eventType: [this.history.eventType, [Validators.required]],
      event: [this.history.event, [Validators.required]],
      commrny: [this.history.comment],
      lodge: [this.history.lodge, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.lodgeService.getLodges().subscribe(re => this.lodges = re);
  }


  hasError(error: string, field: string): boolean {
    return this.historyForm.controls[field].touched
      && (this.historyForm.hasError(error, [field]) || this.historyForm.hasError(error));
  }

  save(): void {
    if (this.historyForm.valid) {
      this.dialogRef.close(
        this.historyForm.value
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }


}
