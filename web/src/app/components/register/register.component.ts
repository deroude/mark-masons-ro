import { Component, OnInit } from '@angular/core';
import { MatDialogRef, ErrorStateMatcher } from '@angular/material';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';


export class PasswordMatchStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordMatcher = new PasswordMatchStateMatcher();
  error: string;

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private router: Router,
    private fb: FormBuilder) {
  }

  registrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required, Validators.minLength(6)]],
    passwordRetype: ['', [Validators.required]],
    rank: ['', [Validators.required]],
    lodge: ['', [Validators.required]]
  }, { validator: this.checkPasswords });

  register(): void {
    if (!this.registrationForm.invalid) {
      this.auth.register({
        name: this.registrationForm.value.name,
        rank: this.registrationForm.value.rank,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        privilege: 'USER',
        status: 'INACTIVE',
        lodge: this.registrationForm.value.lodge
      }).subscribe(() => this.router.navigate(['']), err => this.error = err);
    }
  }

  ngOnInit(): void {

  }

  hasError(error: string, field: string): boolean {
    return this.registrationForm.controls[field].touched
      && (this.registrationForm.hasError(error, [field]) || this.registrationForm.hasError(error));
  }

  private checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const passwordRetype = group.controls.passwordRetype.value;
    return pass === passwordRetype ? null : { notSame: true };
  }
}
