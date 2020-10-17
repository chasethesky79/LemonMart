import { Role } from './role.enum';
import { IAuthStatus } from './auth.status';
import { PhoneType } from './user-data';

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
    fullName: string;
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
export const phoneList = [
    { id: 1, type: PhoneType.Home, number: '234-788-1234' },
    { id: 2, type: PhoneType.Mobile, number: '970-221-2232' },
    { id: 3, type: PhoneType.Work, number: '223-321-2233' },
] as Phone[];

export const getAuthStatus = (): IAuthStatus => {
    const item = localStorage.getItem('user-status') || '';
    return item ? JSON.parse(item) : this.authService.defaultAuthStatus;
};

export type UserSearchFilter = {
    search: string;
    pagesToSkip: string;
    pageSize: string;
};

export interface IUsers {
    items: User[];
    total: number;
}
