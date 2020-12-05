import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { UserEditorComponent } from './components/user-editor/user-editor.component';

import { ApiModule } from './generated/api.module';
import { BASE_PATH } from './generated/variables';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserHistoryEditorComponent } from './components/user-history-editor/user-history-editor.component';
import { HomeComponent } from './components/home/home.component';
import { MarkdownDirective } from './directives/markdown.directive';
import { DefaultOAuthInterceptor } from './services/auth-interceptor';
import { MeComponent } from './components/me/me.component';


const config: AuthConfig = {
  clientId: '1054193493527-lqdqib6a7hqfa33h9coko00kunvloaaa.apps.googleusercontent.com',
  issuer: 'https://accounts.google.com',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  // issuer: 'http://localhost:8180/auth/realms/mark_auth',
  // clientId: 'mark_auth-client',
  redirectUri: `${window.location.origin}`,
  scope: 'openid profile email',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,

  sessionChecksEnabled: true
};

const authModuleConfig: OAuthModuleConfig = {
  // Inject "Authorization: Bearer ..." header for these APIs:
  resourceServer: {
    // allowedUrls: ['https://sqless.net'],
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
    TemplateComponent,
    UserEditorComponent,
    UserHistoryComponent,
    UserHistoryEditorComponent,
    HomeComponent,
    MarkdownDirective,
    MeComponent
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
    OAuthModule.forRoot(authModuleConfig),
    ApiModule
  ],
  providers: [AuthService, ProgressService,
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: OAuthStorage, useValue: sessionStorage },
    { provide: AuthConfig, useValue: config },
    // { provide: BASE_PATH, useValue: 'https://sqless.net' },
    { provide: BASE_PATH, useValue: 'http://localhost:9000' },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor, multi: true }
  ],
  entryComponents: [
    AttendanceComponent,
    AttendanceAftermathComponent,
    AttendanceSavedMessageComponent,
    RsvpMessageComponent,
    ArticleEditorComponent,
    EventEditorComponent,
    UserEditorComponent,
    UserHistoryEditorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
