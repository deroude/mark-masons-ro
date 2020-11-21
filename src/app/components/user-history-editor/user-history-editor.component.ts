import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LodgeService } from '@api/lodge.service';
import { Lodge } from '@model/lodge';

@Component({
  selector: 'mark-user-history-editor',
  templateUrl: './user-history-editor.component.html',
  styleUrls: ['./user-history-editor.component.scss']
})
export class UserHistoryEditorComponent implements OnInit {

  lodges: Lodge[];

  constructor(private lodgeService: LodgeService, public dialogRef: MatDialogRef<UserHistoryEditorComponent>,
              @Inject(MAT_DIALOG_DATA) public history: History, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.lodgeService.get;
  }

}
