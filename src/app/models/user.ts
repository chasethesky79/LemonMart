import {Role} from './role.enum';

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
  role: Role;
  status: boolean;
  dateOfBirth: Date;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: Phone[];
}
export const getFullName = (user: User): string => {
  const { name: { first, middle, last}} = user;
  return `${first} ${middle} ${last}`;
};
