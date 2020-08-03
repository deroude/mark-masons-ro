import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import { generateEvent } from 'src/app/domain/mock';
import { EventInstance } from 'src/app/domain/event';
import { MatDialog } from '@angular/material/dialog';
import { EventEditorComponent } from '../event-editor/event-editor.component';

@Component({
  selector: 'mark-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: EventInstance[];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listMonth'
    },
    eventClick: this.onEventSelect.bind(this)
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.events = [];
    for (let i = 0; i < 100; i++) {
      this.events.push(generateEvent(true));
    }
    for (let i = 0; i < 100; i++) {
      this.events.push(generateEvent(false));
    }
    this.calendarOptions.events = this.events.map(ev => ({ title: ev.title, date: ev.date.toDate(), id: ev.id }));
  }

  onEventSelect(ev: EventClickArg): void {
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '600px',
      data: this.events.find(e => e.id === ev.event.id)
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.article = result;
    });
  }

}
