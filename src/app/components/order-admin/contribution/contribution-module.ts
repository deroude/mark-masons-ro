import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'app/app-material.module';
import { ContributionEditorComponent } from './form/contribution-form.component';
import { ContributionListComponent } from './list/contribution-list.component';

const components = [
    ContributionListComponent,
    ContributionEditorComponent
];

@NgModule({
    imports:[
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule
    ],
    declarations: components,
    exports: components
})
export class ContributionModule { }