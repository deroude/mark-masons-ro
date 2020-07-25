import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatNativeDateModule
} from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';

const material = [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule,
    ScrollingModule,
    MatSnackBarModule,
    MatTooltipModule
];

@NgModule({
    exports: material,
    imports: material
})
export class AppMaterialModule { }
