import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { IAuthStatus } from '../models/auth.status';
import { Role } from '../models/role.enum';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return the corresponding authentication status for a specific email and password', () => {
        const mockEmail = 'seshadri.bharath@clerk';
        const mockPassword = '123';
        const authResponse$ = service.login(mockEmail, mockPassword);
        authResponse$.subscribe((authStatus: IAuthStatus) => {
            expect(authStatus.isAuthenticated).toBe(true);
            expect(authStatus.userRole).toEqual(Role.Clerk);
        });
    });
});
