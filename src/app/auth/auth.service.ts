import { Injectable } from '@angular/core';
import {IAuthStatus, IServerAuthResponse} from '../models/auth.status';
import {Role} from '../models/role.enum';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly defaultAuthStatus: IAuthStatus = {
    userRole: Role.None,
    isAuthenticated: false,
    userId: null
  };
  readonly authStatus$ = new BehaviorSubject<IAuthStatus>(this.defaultAuthStatus);

  constructor() { }

  private fakeAuthProvider(email: string, password: string): Observable<IServerAuthResponse> {
     return null;
  }
}
