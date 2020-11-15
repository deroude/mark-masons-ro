import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { OAuthModule, AuthConfig, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ProgressService } from './services/progress';
import { AuthService } from './services/auth';
import { ProgressComponent } from './components/progress/progress.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { EventsComponent } from './components/events/events.component';
import { UsersComponent } from './components/users/users.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceAftermathComponent } from './components/attendance/attendance.aftermath.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { RsvpMessageComponent } from './components/rsvp/rsvp.message.component';
import { AttendanceSavedMessageComponent } from './components/attendance/attendance.saved.message.component';
import { BlogComponent } from './components/blog/blog.component';
import { ArticleComponent } from './components/article/article.component';
import { TemplateComponent } from './components/template/template.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ArticleEditorComponent } from './components/article-editor/article-editor.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';


const config: AuthConfig = {
  issuer: 'http://localhost:8180/auth/realms/mark_auth',
  clientId: 'mark_auth-client',
  redirectUri: window.location.origin,
  scope: 'openid profile email roles',
  responseType: 'code',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,

  sessionChecksEnabled: true
};

const authModuleConfig: OAuthModuleConfig = {
  // Inject "Authorization: Bearer ..." header for these APIs:
  resourceServer: {
    allowedUrls: ['http://localhost:9000'],
    sendAccessToken: true,
  },
};

FullCalendarModule.registerPlugins([
  listPlugin,
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    TopNavComponent,
    BottomNavComponent,
    ProgressComponent,
    EventsComponent,
    UsersComponent,
    AttendanceComponent,
    AttendanceAftermathComponent,
    AttendanceSavedMessageComponent,
    RsvpComponent,
    RsvpMessageComponent,
    BlogComponent,
    ArticleComponent,
    ArticleEditorComponent,
    EventEditorComponent,
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
    QuillModule.forRoot(),
    FullCalendarModule,
    OAuthModule.forRoot(authModuleConfig)
  ],
  providers: [AuthService, ProgressService,
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: OAuthStorage, useValue: localStorage },
    { provide: AuthConfig, useValue: config }],
  entryComponents: [
    AttendanceComponent,
    AttendanceAftermathComponent,
    AttendanceSavedMessageComponent,
    RsvpMessageComponent,
    ArticleEditorComponent,
    EventEditorComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
