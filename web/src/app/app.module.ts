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
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { TimestampPipe } from './pipes/timestamp.pipe';
import { EventsInfoComponent } from './components/events/events.info.component';
import { EventsEditorComponent } from './components/events/events.editor.component';
import { UsersComponent } from './components/users/users.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceAftermathComponent } from './components/attendance/attendance.aftermath.component';
import { EventsPastEditorComponent } from './components/events/events.past.editor.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { RsvpMessageComponent } from './components/rsvp/rsvp.message.component';
import { AttendanceSavedMessageComponent } from './components/attendance/attendance.saved.message.component';
import { ReportComponent } from './components/report/report.component';
import { BlogComponent } from './components/blog/blog.component';
import { ArticleComponent } from './components/article/article.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainNavComponent,
    ProgressComponent,
    HomeComponent,
    EventsComponent,
    EventsInfoComponent,
    EventsEditorComponent,
    EventsPastEditorComponent,
    TimestampPipe,
    UsersComponent,
    AttendanceComponent,
    AttendanceAftermathComponent,
    AttendanceSavedMessageComponent,
    RsvpComponent,
    RsvpMessageComponent,
    ReportComponent,
    BlogComponent,
    ArticleComponent
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
    QuillModule
  ],
  providers: [AuthService, FirestoreService, ProgressService
  ],
  entryComponents: [
    EventsInfoComponent,
    EventsEditorComponent,
    EventsPastEditorComponent,
    AttendanceComponent,
    AttendanceAftermathComponent,
    AttendanceSavedMessageComponent,
    RsvpMessageComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
