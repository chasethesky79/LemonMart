import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = localStorage.getItem('jwt') || null;
        if (token) {
            const authRequest = request.clone({
                setHeaders: {
                    authorization: `Bearer ${token}`,
                },
            });
            return next.handle(authRequest).pipe(
                catchError((err, caught) => {
                    if (err.status === 401) {
                        this.router.navigate(['/user/login'], {
                            queryParams: {
                                redirectUrl: this.router.routerState.snapshot.url,
                            },
                        });
                    }
                    throw new Error(err);
                })
            );
        }
        return next.handle(request);
    }
}
