import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '@api/payment.service';
import { UserService } from '@api/user.service';
import { Contribution } from '@model/models';
import { User } from '@model/user';
import { BASE_PATH } from 'app/generated/variables';

@Component({
  selector: 'mark-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  @ViewChild('downloadLink') private downloadLink: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Contribution>;
  displayedColumns = ['description', 'value', 'category', 'issueDate', 'dueDate'];

  me: User;
  hasContributions = false;
  constructor(
    private userService: UserService, private paymentService: PaymentService,
    @Inject(BASE_PATH) private path: string) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.hasContributions = false;
    this.userService.rAmyProfile().subscribe(re => this.me = re);
    this.userService.rAmyContributions().subscribe(re => {
      if (re && re.length > 0) {
        this.hasContributions = true;
        this.dataSource = new MatTableDataSource(re);
        this.dataSource.sort = this.sort;
      }
    });
  }

  public downloadResource(): void {
    this.userService.rAdownloadGoodStanding().subscribe(file => {
      const url = window.URL.createObjectURL(file);

      const link = this.downloadLink.nativeElement;
      link.href = url;
      link.download = 'GoodStanding.pdf';
      link.click();

      window.URL.revokeObjectURL(url);
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
