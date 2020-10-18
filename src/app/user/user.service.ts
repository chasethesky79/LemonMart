import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { getAuthStatus, IUsers, User, UserSearchFilter } from '../models/user';
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

    getUsers(pageSize = 10, search = '', pagesToSkip = 0): Observable<IUsers> {
        const params = {
            ...(search && { search }),
            ...(pagesToSkip && { pagesToSkip }),
            ...(pageSize && { pageSize }),
        } as any;
        return this.httpClient
            .get<IUsers>(`${environment.baseUrl}/v1/users`, { params })
            .pipe(catchError(transformError));
    }
}
