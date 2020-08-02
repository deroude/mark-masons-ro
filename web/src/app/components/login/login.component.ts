import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth';
import { Router } from '@angular/router';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
  }

  hidePassword = true;
  passwordReset = false;

  username: string;
  password: string;
  error: string;


  onLogin(): void {
    this.auth.login(this.username, this.password).subscribe(
      () => this.router.navigate(['/']), err => this.error = 'Login error'
    );
  }

  onReset(): void {
    if (this.username && this.username.length > 0) {
      this.auth.resetPassword(this.username).subscribe(() => this.passwordReset = true);
    }
  }

  ngOnInit(): void {
    this.passwordReset = false;
  }
}
