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

  @ViewChild('downloadLink') private downloadLink: ElementRef;

  constructor(
    public auth: AuthService,
    private http: HttpClient,
    @Inject(BASE_PATH) private path: string) {

  }

  ngOnInit(): void {
  }

  public downloadResource(): void {
    this.http.get<Blob>(`${this.path}/user/me/clearance/pdf`,
      { responseType: 'blob' as 'json' }).subscribe(file => {
        const url = window.URL.createObjectURL(file);

        const link = this.downloadLink.nativeElement;
        link.href = url;
        link.download = 'Clearance.pdf';
        link.click();

        window.URL.revokeObjectURL(url);
      });
  }


}
