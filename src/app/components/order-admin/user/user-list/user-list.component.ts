import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@model/user';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '@api/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserEditorComponent } from '../user-editor/user-editor.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-users',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['lastName', 'firstName', 'email', 'userStatus', 'rank', 'orderPrivilege'];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.userService.oAgetUsers().subscribe(ulist => {
      this.dataSource = new MatTableDataSource(ulist);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onUserSelect(user: User): void {
    const dialogRef = this.dialog.open(UserEditorComponent, {
      width: '800px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.oAupdateUser(user.id, result).subscribe(() => this.refresh());
      }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(UserEditorComponent, {
      width: '800px',
      data: { rank: 'BROTHER', orderPrivilege: 'REGULAR', userStatus: 'INACTIVE' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.oAaddUser(result).subscribe(() => this.refresh());
      }
    });
  }

  import(event: any): void {
    this.userService.oAuploadUsers(event.target.files[0]).subscribe(re => this.refresh());
  }
}
