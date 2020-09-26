import { Role } from './role.enum';
import { IAuthStatus } from './auth.status';
import {PhoneType} from './user-data';

export interface Phone {
    type: string;
    number: string;
    id: number;
}
export interface User {
    id: string;
    email: string;
    name: {
        first: string;
        middle: string;
        last: string;
    };
    picture: string;
    role: string;
    status: boolean;
    dateOfBirth: Date;
    address: {
        line1: string;
        line2: string;
        city: string;
        state: string;
        zip: string;
    };
    phones: Phone[];
}
export const getFullName = (user: User): string => {
    const {
        name: { first, middle, last },
    } = user;
    return `${first} ${middle} ${last}`;
};

export const getPhoneTypes = () => Object.keys(PhoneType);

export const getAuthStatus = (): IAuthStatus => {
    const item = localStorage.getItem('user-status') || '';
    return item ? JSON.parse(item) : this.authService.defaultAuthStatus;
};
