import { Component, OnInit, ViewChild } from '@angular/core';
import { UserContribution } from '@model/userContribution'; // TODO specify your model source
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '@api/payment.service'; // TODO specify your service source
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'mark-user-contribution-list ',
  templateUrl: './user-contribution-list.component.html',
  styleUrls: ['./user-contribution-list.component.scss']
})
export class UserContributionListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<UserContribution>;
  displayedColumns = ['user', 'status', 'actions'];

  constructor(
    public dialogRef: MatDialogRef<UserContributionListComponent>,
    @Inject(MAT_DIALOG_DATA) public contribution: number,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.paymentService.oAlistUserContributions(this.contribution).subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleExempt(row: UserContribution): void {
    this.paymentService.oAupdateSingleUserContribution(
      row.contribution as number, row.id, { status: row.status === 'ASSIGNED' ? 'CANCELLED' : 'ASSIGNED' })
      .subscribe(() => this.refresh());
  }

  togglePaid(row: UserContribution): void {
    this.paymentService.oAupdateSingleUserContribution(
      row.contribution as number, row.id, { status: row.status === 'ASSIGNED' ? 'PAID' : 'ASSIGNED' })
      .subscribe(() => this.refresh());
  }

}
