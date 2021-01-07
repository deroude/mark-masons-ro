import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '@api/user.service';
import { History } from '@model/history';
import { UserHistoryEditorComponent } from '../user-history-editor/user-history-editor.component';

@Component({
  selector: 'mark-user-history',
  templateUrl: './user-history-list.component.html',
  styleUrls: ['./user-history-list.component.scss']
})
export class UserHistoryListComponent implements OnInit {

  constructor(private userService: UserService, public dialog: MatDialog) { }

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<History>;
  displayedColumns = ['startDate', 'eventType', 'event', 'lodge', 'comment'];

  @Input()
  userId: number;

  history: History[];

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.userService.getUserHistory(this.userId).subscribe(ulist => {
      this.dataSource = new MatTableDataSource(ulist);
      this.dataSource.sort = this.sort;
    });
  }

  update(item: History): void {
    const dialogRef = this.dialog.open(UserHistoryEditorComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUserHistory(this.userId, item.id, result).subscribe(() => this.refresh());
      }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(UserHistoryEditorComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addUserHistory(this.userId, { ...result, user: { id: this.userId } }).subscribe(() => this.refresh());
      }
    });
  }
}
