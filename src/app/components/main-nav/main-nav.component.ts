import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth';
import { BASE_PATH } from 'app/generated/variables';
import { HttpClient } from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mark-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
  }
}
