import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from '@model/event';
import { Attendance } from '@model/attendance';
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
    @Inject(MAT_DIALOG_DATA) public event: Event,
    private snackBar: MatSnackBar) {

  }


  ngOnInit(): void { }

  close(): void {
    this.dialogRef.close();
  }

}
