import { Validators } from '@angular/forms';
import {USState, usStates} from '../models/user-data';

export const emailValidator = [Validators.required, Validators.email];
export const passwordValidator = [Validators.required, Validators.minLength(8), Validators.maxLength(50)];
export const optionalTextValidator = [Validators.minLength(2), Validators.maxLength(50)];
export const requiredTextValidator = optionalTextValidator.concat(Validators.required);
export const oneCharValidator = [Validators.minLength(1), Validators.maxLength(1)];
export const birthDateValidator = [
    Validators.required,
    Validators.min(new Date().getFullYear() - 100),
    Validators.max(new Date().getFullYear()),
];
export const usaZipCodeValidator = [Validators.required, Validators.pattern(/^\d{5}$|^\d{5}-\d{4}$/)];
export const usaPhoneNumberValidator = [Validators.required, Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)];
export const usStateFilter = (value: string): USState[] =>
    usStates.filter(
        (usState) => usState?.code?.toLowerCase() === value.toLowerCase() || usState.name?.toLowerCase().includes(value.toLowerCase())
    );
