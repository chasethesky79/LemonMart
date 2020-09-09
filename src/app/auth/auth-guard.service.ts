import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthStatus } from '../models/auth.status';
import { AuthService } from './auth.service';
import { NotificationService } from '../notification/notification.service';
import { getAuthStatus } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
    constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.validateLogin(route);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.validateLogin(childRoute);
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        return this.validateLogin();
    }

    private validateLogin(route?: ActivatedRouteSnapshot): boolean {
        if (route) {
            const userStatus: IAuthStatus = getAuthStatus();
            const {
                data: { expectedRole },
            } = route;
            const { userRole, isAuthenticated } = userStatus;
            const roleMatch = userRole === expectedRole;
            if (!isAuthenticated) {
                this.notificationService.openErrorSnack('Please login to access this page');
                this.router.navigate(['login']);
                return false;
            }

            if (!roleMatch) {
                this.notificationService.openErrorSnack(
                    'You are not authorized to access this page, ' + 'please login with correct credentials'
                );
                this.router.navigate(['login']);
                return false;
            }
        }
        return true;
    }
}
