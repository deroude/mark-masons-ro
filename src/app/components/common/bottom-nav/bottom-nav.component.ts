import { Component, OnInit } from '@angular/core';
import { User } from '@model/user';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth';
import { Lodge } from '@model/lodge';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }

}
