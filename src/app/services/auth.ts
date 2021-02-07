import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService, OAuthErrorEvent } from 'angular-oauth2-oidc';


@Injectable({
    providedIn: 'root',
})
export class AuthService implements CanActivate {

    username: string;

    constructor(
        protected router: Router,
        private oauthService: OAuthService) {
        oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.log(e));

        // Load information from Auth0 (could also be configured manually)
        oauthService.loadDiscoveryDocumentAndTryLogin();

        oauthService.setupAutomaticSilentRefresh();
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        switch (route.url[0].path) {
            case 'lodge-admin':
                return this.isLodgeAdmin();
            case 'order-admin':
                return this.isOrderAdmin();
        }
        return this.isRegularUser();
    }

    isLodgeAdmin(): boolean {
        return this.hasAccess('lodge');
    }

    isOrderAdmin(): boolean {
        return this.hasAccess('order');
    }

    isRegularUser(): boolean {
        return this.loggedIn;
    }

    private hasAccess(resource: string): boolean {
        return this.loggedIn && this.oauthService.getIdentityClaims()['https://mark-masons.ro/roles'].includes(resource);
    }

    login(): void { this.oauthService.initLoginFlow(); }
    logout(): void { this.oauthService.logOut(); this.router.navigate(['']); }
    refresh(): Promise<any> { return this.oauthService.silentRefresh(); }

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

    get roles(): string[] {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) { return []; }
        // tslint:disable-next-line:no-string-literal
        return claims['realm_access']['roles'];
    }

    get loggedIn(): boolean {
        return !!this.oauthService.getAccessToken();
    }

    get validIdToken(): boolean {
        return this.oauthService.hasValidIdToken();
    }

}
