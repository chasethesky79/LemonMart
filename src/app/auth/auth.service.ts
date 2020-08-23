import { Injectable } from '@angular/core';
import { IAuthStatus, IServerAuthResponse } from '../models/auth.status';
import { Role } from '../models/role.enum';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { sign } from 'fake-jwt-sign';
import * as decode from 'jwt-decode';
import { catchError, map } from 'rxjs/operators';
import { transformError } from '../utils/error.utils';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    readonly defaultAuthStatus: IAuthStatus = {
        userRole: Role.None,
        isAuthenticated: false,
        userId: null,
    };
    readonly authStatus$ = new BehaviorSubject<IAuthStatus>(this.defaultAuthStatus);

    constructor() {}

    login(email: string, password: string): Observable<IAuthStatus> {
        const authResponse$ = this.fakeAuthProvider(email, password).pipe(
            map((value) => decode(value.accessToken) as IAuthStatus),
            catchError(transformError)
        );
        authResponse$.subscribe((value) => this.authStatus$.next(value), this.logout);
        return authResponse$;
    }

    logout(): void {
        this.authStatus$.next(this.defaultAuthStatus);
    }

    private fakeAuthProvider(email: string, password: string): Observable<IServerAuthResponse> {
        const emailLower = email.toLowerCase();
        const authStatus = {
            isAuthenticated: true,
            userId: 'e4d1bc2ab25c',
            userRole: emailLower.endsWith('cashier')
                ? Role.Cashier
                : emailLower.endsWith('clerk')
                ? Role.Clerk
                : emailLower.endsWith('manager')
                ? Role.Manager
                : Role.None,
        } as IAuthStatus;

        const authResponse = {
            accessToken: sign(authStatus, 'secret', {
                expiresIn: '1h',
                algorithm: 'none',
            }),
        };
        return of(authResponse);
    }
}
