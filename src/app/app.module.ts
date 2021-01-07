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
import { EventListComponent } from './components/event/event-list/event-list.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceAftermathComponent } from './components/attendance/attendance.aftermath.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { RsvpMessageComponent } from './components/rsvp/rsvp.message.component';
import { AttendanceSavedMessageComponent } from './components/attendance/attendance.saved.message.component';
import { BlogComponent } from './components/article/blog/blog.component';
import { ArticleCardComponent } from './components/article/article-card/article-card.component';
import { TemplateComponent } from './components/template/template.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { ArticleEditorComponent } from './components/article/article-editor/article-editor.component';
import { EventEditorComponent } from './components/event/event-editor/event-editor.component';
import { UserEditorComponent } from './components/user/user-editor/user-editor.component';

import { ApiModule } from './generated/api.module';
import { BASE_PATH } from './generated/variables';
import { UserHistoryListComponent } from './components/user/user-history-list/user-history-list.component';
import { UserHistoryEditorComponent } from './components/user/user-history-editor/user-history-editor.component';
import { HomeComponent } from './components/home/home.component';
import { MarkdownDirective } from './directives/markdown.directive';
import { DefaultOAuthInterceptor } from './services/auth-interceptor';
import { MeComponent } from './components/me/me.component';
import { LodgeListComponent } from './components/lodge/lodge-list/lodge-list.component';
import { LodgeEditorComponent } from './components/lodge/lodge-editor/lodge-editor.component';
import { UserMarkComponent } from './components/user/user-mark/user-mark.component';


const config: AuthConfig = {
  clientId: 'NRev10wUw2hQ5l2Ve7cxyzcCtSnW9yvv',
  // clientId: '1054193493527-lqdqib6a7hqfa33h9coko00kunvloaaa.apps.googleusercontent.com',
  // issuer: 'https://accounts.google.com',
  issuer: 'https://mark-masons-ro.eu.auth0.com/',
  // tokenEndpoint: 'https://mark-masons-ro.eu.auth0.com/oauth/token',
  // issuer: 'http://localhost:8180/auth/realms/mark_auth',
  // clientId: 'mark_auth-client',
  responseType: 'code',
  redirectUri: `${window.location.origin}`,
  scope: 'openid profile email',
  showDebugInformation: true,
  strictDiscoveryDocumentValidation: false,
  sessionChecksEnabled: true
};

const authModuleConfig: OAuthModuleConfig = {
  // Inject "Authorization: Bearer ..." header for these APIs:
  resourceServer: {
    allowedUrls: ['https://mark-masons.ro'],
    // allowedUrls: ['http://localhost:9000'],
    sendAccessToken: true
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
    EventListComponent,
    UserListComponent,
    AttendanceComponent,
    AttendanceAftermathComponent,
    AttendanceSavedMessageComponent,
    RsvpComponent,
    RsvpMessageComponent,
    BlogComponent,
    ArticleCardComponent,
    ArticleEditorComponent,
    EventEditorComponent,
    TemplateComponent,
    UserEditorComponent,
    UserHistoryListComponent,
    UserHistoryEditorComponent,
    HomeComponent,
    MarkdownDirective,
    MeComponent,
    LodgeListComponent,
    LodgeEditorComponent,
    UserMarkComponent
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
    { provide: BASE_PATH, useValue: 'https://mark-masons.ro/api' },
    // { provide: BASE_PATH, useValue: 'http://localhost:9000' },
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
