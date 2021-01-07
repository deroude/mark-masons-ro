import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '@api/user.service';
import { User } from '@model/user';
import { BASE_PATH } from 'app/generated/variables';

@Component({
  selector: 'mark-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  @ViewChild('downloadLink') private downloadLink: ElementRef;

  me: User;

  constructor(
    private userService: UserService,
    @Inject(BASE_PATH) private path: string) { }

  ngOnInit(): void {
    this.userService.myProfile().subscribe(re => this.me = re);
  }

  public downloadResource(): void {
    this.userService.downloadGoodStanding().subscribe(file => {
      const url = window.URL.createObjectURL(file);

      const link = this.downloadLink.nativeElement;
      link.href = url;
      link.download = 'GoodStanding.pdf';
      link.click();

      window.URL.revokeObjectURL(url);
    });
  }
}
