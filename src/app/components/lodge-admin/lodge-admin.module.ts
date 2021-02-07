import { NgModule } from "@angular/core";
import { ArticleEditorComponent } from "./article/article-editor/article-editor.component";
import {ArticleCardComponent } from './article/article-card/article-card.component';
import { BlogComponent } from "./article/blog/blog.component";
import { LodgeAdminRoutingModule } from "./lodge-admin-routing.module";
import { EventListComponent } from "./event/event-list/event-list.component";
import { EventEditorComponent } from "./event/event-editor/event-editor.component";
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceAftermathComponent } from './attendance/attendance.aftermath.component';
import { ContributionModule } from './contribution/contribution-module';
import { FullCalendarModule } from "@fullcalendar/angular";
import { AppMaterialModule } from "app/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from 'ngx-quill';
import { CommonModule } from "@angular/common";
import { CommonMarkModule } from "../common/common.module";

@NgModule({
    imports: [
        CommonModule,
        CommonMarkModule,
        ContributionModule,
        LodgeAdminRoutingModule,
        FullCalendarModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
    ],
    declarations:[
        BlogComponent,
        ArticleCardComponent,
        ArticleEditorComponent,
        EventListComponent,
        EventEditorComponent,
        AttendanceComponent,
        AttendanceAftermathComponent    
    ],
    exports:[
        LodgeAdminRoutingModule
    ]
})
export class LodgeAdminModule { }