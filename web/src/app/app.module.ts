import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ProgressService } from './services/progress';
import { FirestoreService } from './services/firestore';
import { AuthService } from './services/auth';
import { ProgressComponent } from './components/progress/progress.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { UsersComponent } from './components/users/users.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceAftermathComponent } from './components/attendance/attendance.aftermath.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { RsvpMessageComponent } from './components/rsvp/rsvp.message.component';
import { AttendanceSavedMessageComponent } from './components/attendance/attendance.saved.message.component';
import { ReportComponent } from './components/report/report.component';
import { BlogComponent } from './components/blog/blog.component';
import { ArticleComponent } from './components/article/article.component';
import { TemplateComponent } from './components/template/template.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { CharityComponent } from './components/charity/charity.component';
import { CharityEditorComponent } from './components/charity-editor/charity-editor.component';
import { CharityListComponent } from './components/charity-list/charity-list.component';
import { CharityContributionComponent } from './components/charity-contribution/charity-contribution.component';


FullCalendarModule.registerPlugins([
  listPlugin,
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainNavComponent,
    TopNavComponent,
    BottomNavComponent,
    ProgressComponent,
    HomeComponent,
    EventsComponent,
    TimestampPipe,
    UsersComponent,
    AttendanceComponent,
    AttendanceAftermathComponent,
    AttendanceSavedMessageComponent,
    RsvpComponent,
    RsvpMessageComponent,
    ReportComponent,
    BlogComponent,
    ArticleComponent,
    ArticleEditorComponent,
    EventEditorComponent,
    CharityComponent,
    CharityEditorComponent,
    CharityListComponent,
    CharityContributionComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    QuillModule.forRoot(),
    FullCalendarModule
  ],
  providers: [AuthService, FirestoreService, ProgressService
  ],
  entryComponents: [
    AttendanceComponent,
    AttendanceAftermathComponent,
    AttendanceSavedMessageComponent,
    RsvpMessageComponent,
    ArticleEditorComponent,
    EventEditorComponent,
    CharityEditorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
