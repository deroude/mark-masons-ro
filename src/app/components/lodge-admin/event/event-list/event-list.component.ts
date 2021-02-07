import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import { Event } from '@model/event';
import { MatDialog } from '@angular/material/dialog';
import { EventEditorComponent } from '../event-editor/event-editor.component';

@Component({
  selector: 'mark-events',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: Event[];

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

    this.calendarOptions.events = this.events.map(ev => ({ title: ev.title, date: ev.startDate, id: String(ev.id) }));
  }

  onEventSelect(ev: EventClickArg): void {
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '600px',
      data: this.events.find(e => String(e.id) === ev.event.id)
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.article = result;
    });
  }

}
