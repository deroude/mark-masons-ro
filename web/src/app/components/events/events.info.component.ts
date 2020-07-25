import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventHandle } from 'src/app/domain/event';

@Component({
    selector: 'app-events-info',
    templateUrl: './events.info.component.html',
    styleUrls: ['./events.info.component.scss']
})
export class EventsInfoComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<EventsInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public event: EventHandle) { }

    ngOnInit() {
    }
}
