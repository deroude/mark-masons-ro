import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { AuthService } from './services/auth';
import { UsersComponent } from './components/users/users.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { BlogComponent } from './components/blog/blog.component';
import { TemplateComponent } from './components/template/template.component';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'events', component: EventsComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthService], },
  { path: 'rsvp/:attendance', component: RsvpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
