import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { MatSort, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { AttendanceReport } from 'src/app/domain/report';

@Component({
  selector: 'app-report',
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

  ngOnInit() {
  }

  applyFilter() {
    this.db.getAttendanceReport(this.dstart, this.dend).subscribe(ulist => {
      this.dataSource = new MatTableDataSource(ulist);
      this.dataSource.sort = this.sort;
    });
  }
}
