import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { MatSort, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['email', 'name', 'status', 'rank'];

  constructor(private db: FirestoreService) { }

  ngOnInit() {
    this.db.getUsers().subscribe(ulist => {
      this.dataSource = new MatTableDataSource(ulist);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
