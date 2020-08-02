import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { AttendanceReport } from 'src/app/domain/report';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<AttendanceReport>;
  displayedColumns = ['name', 'rank', 'attendance', 'contribution'];

  dstart: Date;
  dend: Date;

  constructor(private db: FirestoreService) { }

  ngOnInit(): void {
  }

  applyFilter(): void {
    this.db.getAttendanceReport(this.dstart, this.dend).subscribe(ulist => {
      this.dataSource = new MatTableDataSource(ulist);
      this.dataSource.sort = this.sort;
    });
  }
}
