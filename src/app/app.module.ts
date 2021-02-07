import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { OAuthModule, AuthConfig, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ProgressService } from './services/progress';
import { AuthService } from './services/auth';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { ApiModule } from './generated/api.module';
import { BASE_PATH } from './generated/variables';
import { DefaultOAuthInterceptor } from './services/auth-interceptor';

import { CommonMarkModule } from './components/common/common.module';


const config: AuthConfig = {
  clientId: 'NRev10wUw2hQ5l2Ve7cxyzcCtSnW9yvv',
  issuer: 'https://mark-masons-ro.eu.auth0.com/',
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
    allowedUrls: [environment.apiPath],
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
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    OAuthModule.forRoot(authModuleConfig),
    ApiModule,
    CommonMarkModule
  ],
  providers: [AuthService, ProgressService,
    { provide: OAuthModuleConfig, useValue: authModuleConfig },
    { provide: OAuthStorage, useValue: sessionStorage },
    { provide: AuthConfig, useValue: config },
    { provide: BASE_PATH, useValue: environment.apiPath },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultOAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
