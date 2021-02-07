import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Event } from '@model/event';
import { MatDialog } from '@angular/material/dialog';

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
    }
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.events = [];
    
    this.calendarOptions.events = this.events.map(ev => ({ title: ev.title, date: ev.startDate, id: String(ev.id) }));
  }


}
