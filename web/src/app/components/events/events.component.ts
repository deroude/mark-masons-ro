import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import { generateEvent } from 'src/app/domain/mock';
import { EventInstance } from 'src/app/domain/event';

@Component({
  selector: 'mark-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.onEventSelect.bind(this)
  };

  constructor() { }

  ngOnInit(): void {
    const events: EventInstance[] = [];
    for (let i = 0; i < 100; i++) {
      events.push(generateEvent(true));
    }
    for (let i = 0; i < 100; i++) {
      events.push(generateEvent(false));
    }
    this.calendarOptions.events = events.map(ev => ({ title: ev.title, date: ev.date.toDate() }));
  }

  onEventSelect(ev: EventClickArg): void {
    alert(ev.event.title);
  }

}
