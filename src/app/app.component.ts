import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@model/user';
import { AuthService } from './services/auth';

@Component({
  selector: 'mark-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }
}
