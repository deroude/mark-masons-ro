import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventHandle } from 'src/app/domain/event';
import { FirestoreService } from 'src/app/services/firestore';
import { Attendance } from 'src/app/domain/attendance';
import { combineLatest } from 'rxjs';
import { AttendanceSavedMessageComponent } from './attendance.saved.message.component';

@Component({
  selector: 'mark-attendance-aftermath',
  templateUrl: './attendance.aftermath.component.html',
  styleUrls: ['./attendance.aftermath.component.scss']
})
export class AttendanceAftermathComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Attendance>;
  displayedColumns = ['name', 'status', 'present', 'contribution'];

  constructor(
    public dialogRef: MatDialogRef<AttendanceAftermathComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventHandle,
    private db: FirestoreService,
    private snackBar: MatSnackBar) {
    combineLatest(this.db.getUsers(), this.db.getAttendanceForEvent(this.event)).subscribe(([ulist, attlist]) => {
      this.dataSource = new MatTableDataSource(ulist.map(u => {
        const att: Attendance = attlist.find(atx => atx.email === u.email);
        if (att) {
          return { ...att, user: u };
        } else {
          return { email: u.email, event: this.event.id, status: 'NOT_INVITED', user: u, date: this.event.date, lodge: this.event.lodge };
        }
      }));
      this.dataSource.sort = this.sort;
    });
  }


  ngOnInit(): void { }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const attlist = this.dataSource.data.map(att => {
      return {
        id: att.id || null,
        email: att.email,
        date: this.event.date,
        status: 'PENDING',
        event: att.event,
        contribution: att.contribution || 0,
        present: att.present || false,
        reply: att.reply || null,
        lodge: att.lodge
      };
    });
    this.db.saveAttendance(attlist)
      .subscribe(() => this.snackBar.openFromComponent(AttendanceSavedMessageComponent, { duration: 3000 }));
  }
}
