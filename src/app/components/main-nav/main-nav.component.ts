import { Component, OnInit } from '@angular/core';
import { User } from '@model/user';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth';
import { Lodge } from '@model/lodge';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

}
