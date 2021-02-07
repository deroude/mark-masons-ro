import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event/event-list/event-list.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { BlogComponent } from './article/blog/blog.component';
import { TemplateComponent } from './template/template.component';
import { LodgeListComponent } from './lodge/lodge-list/lodge-list.component';
import { ContributionListComponent } from './contribution/list/contribution-list.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'events', component: EventListComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'users', component: UserListComponent},
  { path: 'lodges', component: LodgeListComponent },
  { path: 'contributions', component: ContributionListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderAdminRoutingModule { }
