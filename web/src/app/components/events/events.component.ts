import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore';
import { Observable } from 'rxjs';
import { EventHandle } from 'src/app/domain/event';
import { MatDialog } from '@angular/material';
import { EventsInfoComponent } from './events.info.component';
import { map, withLatestFrom } from 'rxjs/operators';
import { EventsEditorComponent } from './events.editor.component';
import { AuthService } from 'src/app/services/auth';
import { User } from 'src/app/domain/user';
import { AttendanceComponent } from '../attendance/attendance.component';
import { AttendanceAftermathComponent } from '../attendance/attendance.aftermath.component';
import { EventsPastEditorComponent } from './events.past.editor.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  past$: Observable<{ year: number, events: EventHandle[] }[]>;
  upcoming$: Observable<EventHandle[]>;

  constructor(private db: FirestoreService, public auth: AuthService, public dialog: MatDialog) {
    this.upcoming$ = this.db.getMyUpcomingEvents();
    this.past$ = this.db.getMyPastEvents().pipe(map(re =>
      re.map(ev => ({ year: ev.date.toDate().getFullYear(), events: [ev] }))
        .reduce((arr, item) => {
          const yr = arr.find(it => it.year === item.year);
          if (yr) {
            yr.events = [...yr.events, ...item.events];
          } else {
            arr.push(item);
          }
          return arr;
        }, [])
    ));

  }

  ngOnInit() {
  }

  info(event: EventHandle): void {
    this.dialog.open(EventsInfoComponent, {
      data: event
    });
  }

  edit(event: EventHandle): void {
    this.dialog.open(EventsEditorComponent, {
      data: event
    }).afterClosed().pipe(withLatestFrom(this.auth.user$))
      .subscribe(([ev, u]) => {
        if (ev) {
          this.db.saveEvent({ ...ev, lodge: u.lodge, id: event.id });
        }
      });
  }

  editPast(event: EventHandle): void {
    this.dialog.open(EventsPastEditorComponent, {
      data: event
    }).afterClosed().pipe(withLatestFrom(this.auth.user$))
      .subscribe(([ev, u]) => {
        if (ev) {
          this.db.saveEvent({ ...ev, lodge: u.lodge, id: event.id });
        }
      });
  }

  add() {
    this.edit(new EventHandle());
  }

  delete(event: EventHandle): void {
    this.db.deleteEvent(event);
  }

  attendance(event: EventHandle, active: boolean = true): void {
    if (active) {
      this.dialog.open(AttendanceComponent, {
        data: event,
        width: '90%'
      });
    } else {
      this.dialog.open(AttendanceAftermathComponent, {
        data: event
      });
    }
  }

}


