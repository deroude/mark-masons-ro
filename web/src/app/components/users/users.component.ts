import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { generateUser } from 'src/app/domain/mock';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['email', 'name', 'status', 'rank'];

  constructor(private db: FirestoreService) { }

  ngOnInit(): void {
    const ulist: User[] = [];
    for (let i = 0; i < 50; i++) {
      ulist.push(generateUser());
    }
    this.dataSource = new MatTableDataSource(ulist);
    this.dataSource.sort = this.sort;
    // this.db.getUsers().subscribe(ulist => {
    //   this.dataSource = new MatTableDataSource(ulist);
    //   this.dataSource.sort = this.sort;
    // });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
