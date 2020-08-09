import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { Charity } from 'src/app/domain/charity';
import { AuthService } from 'src/app/services/auth';
import { generateCharity } from 'src/app/domain/mock';

@Component({
  selector: 'mark-charity-list',
  templateUrl: './charity-list.component.html',
  styleUrls: ['./charity-list.component.scss']
})
export class CharityListComponent implements OnInit {

  user$: Observable<User>;

  constructor(auth: AuthService) {
    this.user$ = auth.user$;
  }

  charities: Charity[] = [];

  ngOnInit(): void {
    this.charities = [];
    for (let i = 0; i < 10; i++) {
      this.charities.push(generateCharity());
    }
  }
}
