import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './components/event/event-list/event-list.component';
import { AuthService } from './services/auth';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { BlogComponent } from './components/article/blog/blog.component';
import { TemplateComponent } from './components/template/template.component';
import { HomeComponent } from './components/home/home.component';
import { MeComponent } from './components/me/me.component';
import { LodgeListComponent } from './components/lodge/lodge-list/lodge-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'me', component: MeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'events', component: EventListComponent },
  { path: 'template', component: TemplateComponent, canActivate: [AuthService] },
  { path: 'users', component: UserListComponent, canActivate: [AuthService], },
  { path: 'lodges', component: LodgeListComponent, canActivate: [AuthService], },
  { path: 'rsvp/:attendance', component: RsvpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
