import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { ProgressService } from './progress';
import { UserService } from '@api/user.service';
import { User } from '@model/user';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class AuthService implements CanActivate {

    username: string;

    constructor(
        protected router: Router,
        private userService: UserService,
        private oauthService: OAuthService,
        private httpClient: HttpClient,
        private progress: ProgressService) {
        oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));

        // Load information from Auth0 (could also be configured manually)
        oauthService.loadDiscoveryDocumentAndTryLogin();

        oauthService.setupAutomaticSilentRefresh();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        throw new Error('Method not implemented.');
    }

    hasAccess(resource: string): boolean {
        return false;
    }

    login(): void { this.oauthService.initLoginFlow(); }
    logout(): void { this.oauthService.logOut(); }
    refresh(): void { this.oauthService.silentRefresh(); }

    get userEmail(): string {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) { return null; }
        // tslint:disable-next-line:no-string-literal
        return claims['email'];
    }

    get userName(): string {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) { return null; }
        // tslint:disable-next-line:no-string-literal
        return claims['name'];
    }

    get Roles(): string[] {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) { return []; }
        // tslint:disable-next-line:no-string-literal
        return claims['realm_access']['roles'];
    }

    get loggedIn(): boolean {
        return !!this.oauthService.getAccessToken();
    }


}
