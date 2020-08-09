import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { AuthService } from './services/auth';
import { UsersComponent } from './components/users/users.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { ReportComponent } from './components/report/report.component';
import { BlogComponent } from './components/blog/blog.component';
import { CharityListComponent } from './components/charity-list/charity-list.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: '/blog', pathMatch: 'full' },
      { path: 'blog', component: BlogComponent },
      { path: 'events', component: EventsComponent },
      { path: 'charity', component: CharityListComponent },
      { path: 'users', component: UsersComponent },
      { path: 'report', component: ReportComponent, canActivate: [AuthService], }
    ]
  },
  {
    path: 'rsvp/:attendance',
    component: RsvpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
