import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@model/user';
import * as moment from 'moment';

@Component({
  selector: 'mark-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditorComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User, private fb: FormBuilder, private changeDetection: ChangeDetectorRef) {
    this.userForm = this.fb.group({
      email: [this.user.email, [Validators.required]],
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      birthdate: [this.user.birthdate, [Validators.required]],
      address: [this.user.address, [Validators.required]],
      correspondenceAddress: [this.user.correspondenceAddress],
      phoneNumber: [this.user.phoneNumber, [Validators.required]],
      secondaryPhoneNumber: [this.user.secondaryPhoneNumber],
      profession: [this.user.profession],
      workplace: [this.user.workplace],
      rank: [this.user.rank, [Validators.required]],
      mmh: [this.user.mmh, [Validators.required]],
      userStatus: [this.user.userStatus, [Validators.required]],
      orderPrivilege: [this.user.orderPrivilege, [Validators.required]],
      nationalId: [this.user.nationalId],
      nationalIdDetails: [this.user.nationalIdDetails],
      markCode: [this.user.markCode],
      markImage: [this.user.markImage]
    });
  }

  userForm: FormGroup;

  codes: string[] = [];

  ngOnInit(): void { }

  updateCodes(): void {
    if (!this.user.id && this.userForm.controls.firstName.value && this.userForm.controls.lastName.value) {
      const initials = this.userForm.controls.firstName.value.substring(0, 1).toUpperCase()
        + this.userForm.controls.lastName.value.substring(0, 1).toUpperCase();
      this.codes = [`${initials}0`];
      while (this.codes.length < 5) {
        const nc = initials + this.generateCode();
        if (!this.codes.includes(nc)) {
          this.codes.push(nc);
        }
      }
      this.changeDetection.markForCheck();
    }
  }

  hasError(error: string, field: string): boolean {
    return this.userForm.controls[field].touched
      && (this.userForm.hasError(error, [field]) || this.userForm.hasError(error));
  }

  save(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(
        { ...this.userForm.value, birthdate: moment(this.userForm.value.birthdate).format('YYYY-MM-DD')}
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  private generateCode(): number {
    const arr = new Uint8Array([0, 0, 0, 0].map(() => Math.floor(Math.random() * 3)));
    const view = new DataView(arr.buffer);
    return view.getUint32(0);
  }

}
