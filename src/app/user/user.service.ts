import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { getAuthStatus, User } from '../models/user';
import { IAuthStatus } from '../models/auth.status';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { transformError } from '../utils/error.utils';

@Injectable()
export class UserService {
    currentUser: Observable<User>;
    constructor(private httpClient: HttpClient, private authService: AuthService) {
        const userStatus: IAuthStatus = getAuthStatus();
        this.currentUser = this.getCurrentUser(userStatus?.userId);
    }

    getCurrentUser(id: string): Observable<User> {
        return this.httpClient.get<User>(`${environment.baseUrl}/v1/user/${id}`).pipe(catchError(transformError));
    }

    updateUser(user: User): Observable<User> {
        localStorage.setItem('draft-user', user ? JSON.stringify(user) : '');
        const id = user.id || 0;
        return this.httpClient.put<User>(`${environment.baseUrl}/v1/user/${id}`, user).pipe(catchError(transformError));
    }
}
