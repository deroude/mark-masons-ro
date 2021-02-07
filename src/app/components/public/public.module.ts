import { NgModule } from "@angular/core";
import { PublicRoutingModule } from "./public-routing.module";
import { HomeComponent } from './home/home.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { CommonMarkModule } from "../common/common.module";
import { AppMaterialModule } from "app/app-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        PublicRoutingModule,
        CommonMarkModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule
    ],
    declarations:[
        HomeComponent,
        RsvpComponent
    ],
    exports:[
        PublicRoutingModule
    ]
})
export class PublicModule { }