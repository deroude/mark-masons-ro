import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort } from '@angular/material';
import { EventHandle } from 'src/app/domain/event';
import { SelectionModel } from '@angular/cdk/collections';
import { FirestoreService } from 'src/app/services/firestore';
import { Attendance } from 'src/app/domain/attendance';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Attendance>;
  displayedColumns = ['select', 'email', 'name', 'rank', 'status'];
  selection = new SelectionModel<Attendance>(true, []);

  constructor(
    public dialogRef: MatDialogRef<AttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public event: EventHandle,
    private db: FirestoreService) {
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


  ngOnInit() {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Attendance): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.email}`;
  }

  close() {
    this.dialogRef.close();
  }

  send() {
    const attlist = this.selection.selected.map(att => {
      return {
        id: att.id || null,
        email: att.email,
        status: 'PENDING',
        date: this.event.date,
        event: att.event,
        contribution: att.contribution || 0,
        present: att.present || false,
        reply: att.reply || null,
        lodge: att.lodge
      };
    });
    this.db.saveAttendance(attlist)
      .subscribe(() => this.dialogRef.close());
  }
}
