import { NgModule } from '@angular/core';
import { ArticleEditorComponent } from './article/article-editor/article-editor.component';
import { ArticleCardComponent } from './article/article-card/article-card.component';
import { BlogComponent } from './article/blog/blog.component';
import { OrderAdminRoutingModule } from './order-admin-routing.module';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventEditorComponent } from './event/event-editor/event-editor.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceAftermathComponent } from './attendance/attendance.aftermath.component';
import { ContributionModule } from './contribution/contribution-module';
import { LodgeListComponent } from './lodge/lodge-list/lodge-list.component';
import { LodgeEditorComponent } from './lodge/lodge-editor/lodge-editor.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEditorComponent } from './user/user-editor/user-editor.component';
import { UserHistoryListComponent } from './user/user-history-list/user-history-list.component';
import { UserHistoryEditorComponent } from './user/user-history-editor/user-history-editor.component';
import { UserMarkComponent } from './user/user-mark/user-mark.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppMaterialModule } from 'app/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        ContributionModule,
        AppMaterialModule,
        FullCalendarModule,
        OrderAdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
    ],
    declarations: [
        BlogComponent,
        ArticleCardComponent,
        ArticleEditorComponent,
        EventListComponent,
        EventEditorComponent,
        AttendanceComponent,
        AttendanceAftermathComponent,
        LodgeListComponent,
        LodgeEditorComponent,
        UserListComponent,
        UserEditorComponent,
        UserHistoryListComponent,
        UserHistoryEditorComponent,
        UserMarkComponent
    ],
    exports: [
        OrderAdminRoutingModule
    ]
})
export class OrderAdminModule { }
