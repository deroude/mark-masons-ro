import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import { Event } from '@model/event';
import { MatDialog } from '@angular/material/dialog';
import { EventEditorComponent } from '../event-editor/event-editor.component';
import { EventService } from '@api/event.service';

@Component({
  selector: 'mark-order-events',
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

  constructor(public dialog: MatDialog, private eventService: EventService) { }

  ngOnInit(): void {
    this.events = [];
    this.refresh();
  }

  refresh():void {
    this.eventService.oAgetEvents().subscribe(events => {
      this.events = events;
      this.calendarOptions.events = this.events.map(ev => ({ title: ev.title, date: ev.startDate, id: String(ev.id) }))
    });
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.eventService.oAaddEvent(result).subscribe(()=>this.refresh());
    });
  }

  onEventSelect(ev: EventClickArg): void {
    const dialogRef = this.dialog.open(EventEditorComponent, {
      width: '600px',
      data: this.events.find(e => String(e.id) === ev.event.id)
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === false) {
        this.eventService.oAdeleteEvent(Number(ev.event.id)).subscribe(()=>this.refresh());
      }
      this.eventService.oAupdateEvent(result.id, result).subscribe(()=>this.refresh());
    });
  }

}
