import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EventHandle } from 'src/app/domain/event';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { firestore } from 'firebase';

@Component({
    selector: 'app-events-editor',
    templateUrl: './events.editor.component.html',
    styleUrls: ['./events.editor.component.scss']
})
export class EventsEditorComponent implements OnInit {

    eventForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EventsEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public event: EventHandle,
        private fb: FormBuilder) {
        this.eventForm = this.fb.group({
            title: [this.event.title, [Validators.required]],
            invitation: [this.event.invitation, [Validators.required]],
            location: [this.event.location, [Validators.required]],
            date: [this.event.date ?
                this.event.date.toDate().toISOString().slice(0, -1) :
                new Date().toISOString().slice(0, -1),
            [Validators.required]],
            type: [this.event.type, [Validators.required]]
        });
    }


    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }

    save() {
        if (this.eventForm.valid) {
            this.dialogRef.close({
                ...this.eventForm.value,
                date: firestore.Timestamp.fromDate(new Date(this.eventForm.value.date))
            });
        }
    }

    hasError(error: string, field: string): boolean {
        return this.eventForm.controls[field].touched
            && (this.eventForm.hasError(error, [field]) || this.eventForm.hasError(error));
    }

}
