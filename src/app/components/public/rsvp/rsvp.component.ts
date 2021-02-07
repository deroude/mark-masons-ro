import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RsvpMessageComponent } from './rsvp.message.component';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {

  comment: string;
  eventId: string;
  attendanceId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.attendanceId = params.get('attendance');
    });
  }

  rsvp(re: boolean): void {
    if (this.attendanceId) {

    }
  }
  goHome(): void {
    this.router.navigate(['/']);
  }
}
