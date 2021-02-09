import { Component, OnInit, ViewChild } from '@angular/core';
import { Contribution } from '@model/contribution'; // TODO specify your model source
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContributionService } from '@api/contribution.service'; // TODO specify your service source
import { MatDialog } from '@angular/material/dialog';
import { ContributionEditorComponent } from '../form/contribution-form.component';
import * as moment from 'moment';
import { UserContributionListComponent } from '../user-contribution/list/user-contribution-list.component';

@Component({
  selector: 'mark-contribution-list',
  templateUrl: './contribution-list.component.html',
  styleUrls: ['./contribution-list.component.scss']
})
export class ContributionListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Contribution>;
  displayedColumns = ['description', 'value', 'issueDate', 'dueDate', 'actions'];

  constructor(private contributionService: ContributionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.contributionService.oAlistContributions().subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowSelect(row: Contribution): void {
    const dialogRef = this.dialog.open(ContributionEditorComponent, {
      width: '800px',
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contributionService.oAupdateContribution(row.id, result).subscribe(() => this.refresh());
      }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(ContributionEditorComponent, {
      width: '800px',
      data: { issueDate: moment().format('YYYY-MM-DD'), category: 'ORDER', status: 'ACTIVE', currency: 'RON' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contributionService.oAaddContribution({
          ...result,
          dueDate: (result.dueDate as moment.Moment).format('YYYY-MM-DD'),

        }).subscribe(() => this.refresh());
      }
    });
  }

  deleteRow(row: Contribution): void {
    this.contributionService.oAremoveContribution(row.id).subscribe(() => this.refresh());
  }

  selectUsers(row: Contribution): void {
    const dialogRef = this.dialog.open(UserContributionListComponent, {
      width: '800px',
      data: row.id
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
