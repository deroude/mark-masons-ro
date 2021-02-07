import { NgModule } from "@angular/core";
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ProgressComponent } from './progress/progress.component';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { AppMaterialModule } from "app/app-material.module";
import { MarkdownPipe } from "app/pipes/markdown.pipe";

const components = [
    BottomNavComponent,
    MainNavComponent,
    ProgressComponent,
    TopNavComponent,
    MarkdownPipe
]

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        RouterModule.forChild([])
    ],
    declarations: components,
    exports: components
})
export class CommonMarkModule {}