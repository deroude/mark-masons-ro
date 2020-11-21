import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@model/user';

@Component({
  selector: 'mark-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      birthdate: [this.user.birthdate],
      address: [this.user.address],
      phoneNumber: [this.user.phoneNumber],
      profession: [this.user.profession],
      rank: [this.user.rank, [Validators.required]],
      userStatus: [this.user.userStatus, [Validators.required]],
      orderPrivilege: [this.user.orderPrivilege, [Validators.required]],
    });
  }

  userForm: FormGroup;

  ngOnInit(): void {
  }


  hasError(error: string, field: string): boolean {
    return this.userForm.controls[field].touched
      && (this.userForm.hasError(error, [field]) || this.userForm.hasError(error));
  }

  save(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(
        this.userForm.value
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
