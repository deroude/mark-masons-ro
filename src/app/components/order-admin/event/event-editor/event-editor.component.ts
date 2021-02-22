import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Event } from '@model/event';

@Component({
  selector: 'mark-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  eventForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EventEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public event: Event, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: [this.event.title, [Validators.required]],
      text: [this.event.text, [Validators.required]],
      startDate: [this.event.startDate,[Validators.required]],
      eventType: [this.event.eventType, [Validators.required]],
      location: [this.event.location, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  hasError(error: string, field: string): boolean {
    return this.eventForm.controls[field].touched
      && (this.eventForm.hasError(error, [field]) || this.eventForm.hasError(error));
  }

  save(): void {
    if (this.eventForm.valid) {
      this.dialogRef.close(
        this.eventForm.value);
    }
  }

  delete(): void {
    this.dialogRef.close(false);
  }

  close(): void {
    this.dialogRef.close();
  }

}
