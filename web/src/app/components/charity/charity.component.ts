import { Component, OnInit, Input } from '@angular/core';
import { Charity, Contribution } from 'src/app/domain/charity';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { AuthService } from 'src/app/services/auth';
import { MatDialog } from '@angular/material/dialog';
import { CharityEditorComponent } from '../charity-editor/charity-editor.component';
import { CharityContributionComponent } from '../charity-contribution/charity-contribution.component';

@Component({
  selector: 'mark-charity',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.scss']
})
export class CharityComponent implements OnInit {

  @Input() charity: Charity;

  expanded = false;

  user$: Observable<User>;

  constructor(auth: AuthService, public dialog: MatDialog) {
    this.user$ = auth.user$;
  }

  ngOnInit(): void {
  }

  edit(): void {
    const dialogRef = this.dialog.open(CharityEditorComponent, {
      width: '600px',
      data: this.charity
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.article = result;
    });
  }

  contribute(): void {
    const dialogRef = this.dialog.open(CharityContributionComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.charity.contributions.push(result);
    });
  }

}
