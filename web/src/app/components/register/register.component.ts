import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { firestore } from 'firebase';


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
        joinedDate: new firestore.Timestamp(new Date().getTime() / 1000, 0),
        privilege: 'USER',
        status: 'INACTIVE'
      }).subscribe(() => this.router.navigate(['']), err => this.error = err);
    }
  }

  ngOnInit(): void {

  }

  hasError(error: string, field: string): boolean {
    return this.registrationForm.controls[field].touched
      && (this.registrationForm.hasError(error, [field]) || this.registrationForm.hasError(error));
  }

  private checkPasswords(group: FormGroup): { notSame: boolean } {
    const pass = group.controls.password.value;
    const passwordRetype = group.controls.passwordRetype.value;
    return pass === passwordRetype ? null : { notSame: true };
  }
}
