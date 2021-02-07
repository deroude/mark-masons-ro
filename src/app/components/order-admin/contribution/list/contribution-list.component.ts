import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Contribution } from '@model/contribution'; // TODO specify your model source
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { ContributionService } from '@api/contribution.service'; // TODO specify your service source
import { MatDialog } from '@angular/material/dialog';
import { ContributionEditorComponent } from '../form/contribution-form.component';

@Component({
  selector: 'app-contribution-list ',
  templateUrl: './contribution-list.component.html',
  styleUrls: ['./contribution-list.component.scss']
})
export class ContributionListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Contribution>;
  displayedColumns = ["id","description","category","value","issueDate","dueDate"];

  constructor(private ContributionService: ContributionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.ContributionService.oAlistContributions().subscribe(list => {
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
        this.ContributionService.oAupdateContribution(row.id, result).subscribe(() => this.refresh());
      }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(ContributionEditorComponent, {
      width: '800px',
      data: {issueDate: new Date(), category:'ORDER'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ContributionService.oAaddContribution(result).subscribe(() => this.refresh());
      }
    });
  }
}
