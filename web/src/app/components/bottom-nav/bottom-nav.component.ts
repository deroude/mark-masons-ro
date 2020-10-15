import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth';
import { FirestoreService } from 'src/app/services/firestore';
import { Lodge } from 'src/app/domain/lodge';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  constructor(public auth: AuthService, private firestore: FirestoreService) {
  }

  user$: Observable<User> = this.auth.user$;
  lodge$: Observable<Lodge> = this.auth.lodge$;

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }

}
