import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventHandle } from 'src/app/domain/event';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { firestore } from 'firebase';

@Component({
    selector: 'app-events-past-editor',
    templateUrl: './events.past.editor.component.html',
    styleUrls: ['./events.past.editor.component.scss']
})
export class EventsPastEditorComponent implements OnInit {

    eventForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<EventsPastEditorComponent>,
        @Inject(MAT_DIALOG_DATA) public event: EventHandle,
        private fb: FormBuilder) {
        this.eventForm = this.fb.group({
            notes: [this.event.notes],
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
                ...this.event,
                notes: this.eventForm.value.notes,
            });
        }
    }

    hasError(error: string, field: string): boolean {
        return this.eventForm.controls[field].touched
            && (this.eventForm.hasError(error, [field]) || this.eventForm.hasError(error));
    }

}
