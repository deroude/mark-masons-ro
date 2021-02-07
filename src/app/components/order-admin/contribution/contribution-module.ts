import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'app/app-material.module';
import { ContributionEditorComponent } from './form/contribution-form.component';
import { ContributionListComponent } from './list/contribution-list.component';
import { UserContributionListComponent } from './user-contribution/list/user-contribution-list.component';

const components = [
    ContributionListComponent,
    ContributionEditorComponent,
    UserContributionListComponent
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule
    ],
    declarations: components,
    exports: components
})
export class ContributionModule { }
