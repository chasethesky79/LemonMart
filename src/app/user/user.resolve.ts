import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { IAuthStatus } from '../models/auth.status';
import { phoneList } from '../models/user';

@Injectable()
export class UserResolve implements Resolve<User> {
    constructor() {}

    resolve(route: ActivatedRouteSnapshot): User {
        const userStatus: IAuthStatus = localStorage.getItem('user-status') ? JSON.parse(localStorage.getItem('user-status')) : null;
        if (userStatus) {
            const { userRole } = userStatus;
            return this.buildUser(userRole);
        }
    }

    /**
     * Returns a mocked user object
     * @param userRole The role of the user
     */
    private buildUser(userRole: string): User {
        return {
            id: '123',
            email: 'seshadri.bharath@yahoo.com',
            name: {
                first: 'Bharath',
                middle: 'M',
                last: 'Seshadri',
            },
            role: userRole,
            dateOfBirth: new Date(),
            address: {
                line1: 'No 3 Shanumugam Street',
                line2: 'Royapettah',
                city: 'Chennai',
                state: '',
                zip: '600014',
            },
            phones: phoneList,
        } as any;
    }
}
