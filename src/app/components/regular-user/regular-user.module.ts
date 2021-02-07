import { NgModule } from "@angular/core";
import { ArticleEditorComponent } from "./article/article-editor/article-editor.component";
import {ArticleCardComponent } from './article/article-card/article-card.component';
import { BlogComponent } from "./article/blog/blog.component";
import { EventListComponent } from "./event/event-list/event-list.component";
import { RegularUserRoutingModule } from './regular-user-routing.module';
import { MeComponent } from "./me/me.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AppMaterialModule } from "app/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { QuillModule } from 'ngx-quill';
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        RegularUserRoutingModule,
        FullCalendarModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot()
    ],
    declarations:[
        BlogComponent,
        ArticleCardComponent,
        ArticleEditorComponent,
        EventListComponent,
        MeComponent
    ],
    exports:[
        RegularUserRoutingModule
    ]
})
export class RegularUserModule { }