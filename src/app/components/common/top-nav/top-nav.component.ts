import { Component, OnInit } from '@angular/core';
import { User } from '@model/user';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth';
import { Lodge } from '@model/lodge';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }

}
