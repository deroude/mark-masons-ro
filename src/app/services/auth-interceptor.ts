import { Injectable, Inject, Optional } from '@angular/core';
import { OAuthModuleConfig, OAuthResourceServerErrorHandler, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

@Injectable()
export class DefaultOAuthInterceptor implements HttpInterceptor {

    constructor(
        private authStorage: OAuthStorage,
        private authService: OAuthService,
        private errorHandler: OAuthResourceServerErrorHandler,
        @Optional() private moduleConfig: OAuthModuleConfig
    ) {
    }

    private checkUrl(url: string): boolean {
        const found = this.moduleConfig.resourceServer.allowedUrls.find(u => url.startsWith(u));
        return !!found;
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const url = req.url.toLowerCase();

        if (!this.moduleConfig) { return next.handle(req); }
        if (!this.moduleConfig.resourceServer) { return next.handle(req); }
        if (!this.moduleConfig.resourceServer.allowedUrls) { return next.handle(req); }
        if (!this.checkUrl(url)) { return next.handle(req); }

        const sendAccessToken = this.moduleConfig.resourceServer.sendAccessToken;

        if (sendAccessToken) {
            if (this.authService.hasValidIdToken()) {
                return next.handle(this.adjustRequest(req)).pipe(catchError(err => this.errorHandler.handleError(err)));
            } else {
                return from(this.authService.silentRefresh()).pipe(switchMap(re => {
                    return next.handle(this.adjustRequest(req)).pipe(catchError(err => this.errorHandler.handleError(err)));
                }));
            }
        }
    }

    private adjustRequest(req: HttpRequest<any>): HttpRequest<any> {
        const token = this.authStorage.getItem('id_token');
        const header = 'Bearer ' + token;

        const headers = req.headers
            .set('Authorization', header);

        return req.clone({ headers });
    }

}
