import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { BlogComponent } from './article/blog/blog.component';
import {MeComponent } from './me/me.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'events', component: EventListComponent },
  { path: 'me', component: MeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegularUserRoutingModule { }
