import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './components/events/events.component';
import { AuthService } from './services/auth';
import { UsersComponent } from './components/users/users.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { ReportComponent } from './components/report/report.component';

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
    canActivate: [AuthService],
    children: [
      { path: '', redirectTo: '/events', pathMatch: 'full' },
      { path: 'events', component: EventsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'report', component: ReportComponent }
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
