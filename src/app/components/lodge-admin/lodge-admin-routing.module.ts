import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { BlogComponent } from './article/blog/blog.component';
import { ContributionListComponent } from './contribution/list/contribution-list.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'events', component: EventListComponent },
  { path: 'contributions', component: ContributionListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LodgeAdminRoutingModule { }
