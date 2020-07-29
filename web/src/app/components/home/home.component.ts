import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';
import { User } from '../../domain/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$: Observable<User>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }

}
