import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LodgeService } from '@api/lodge.service';
import { Lodge } from '@model/lodge';
import { LodgeEditorComponent } from '../lodge-editor/lodge-editor.component';

@Component({
  selector: 'mark-lodge-list',
  templateUrl: './lodge-list.component.html',
  styleUrls: ['./lodge-list.component.scss']
})
export class LodgeListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Lodge>;
  displayedColumns = ['name', 'status', 'number', 'orient', 'location', 'actions'];

  constructor(private lodgeService: LodgeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.lodgeService.oAgetLodges().subscribe(ulist => {
      this.dataSource = new MatTableDataSource(ulist);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect(lodge: Lodge): void {
    const dialogRef = this.dialog.open(LodgeEditorComponent, {
      width: '800px',
      data: lodge
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lodgeService.oAupdateLodge(lodge.id, result).subscribe(() => this.refresh());
      }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(LodgeEditorComponent, {
      width: '800px',
      data: { status: 'NEW' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lodgeService.oAaddLodge(result).subscribe(() => this.refresh());
      }
    });
  }

  deleteLodge(id: number): void {
    this.lodgeService.oAdeleteLodge(id).subscribe(() => this.refresh());
  }


}
