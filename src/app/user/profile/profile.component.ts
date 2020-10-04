import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IAuthStatus } from '../../models/auth.status';
import { map } from 'rxjs/operators';
import { Phone, User } from '../../models/user';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/role.enum';
import {
    birthDateValidator,
    emailValidator,
    oneCharValidator,
    optionalTextValidator,
    requiredTextValidator,
    usaPhoneNumberValidator,
    usaZipCodeValidator,
    usStateFilter,
} from '../../utils/validations';
import { PhoneType, USState, usStates } from '../../models/user-data';
import * as moment from 'moment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
    constructor(private userService: UserService, private formBuilder: FormBuilder) {}

    userForm: FormGroup;
    isUserAManager: boolean;
    states: USState[] = usStates;
    yearsOld: number;
    phones = [
        { id: 1, type: PhoneType.Home, number: '234-788-1234' },
        { id: 2, type: PhoneType.Mobile, number: '970-221-2232' },
        { id: 3, type: PhoneType.Work, number: '223-321-2233' },
    ] as Phone[];

    ngOnInit(): void {
        const userStatus: IAuthStatus = localStorage.getItem('user-status') ? JSON.parse(localStorage.getItem('user-status')) : null;
        if (userStatus) {
            const { userRole } = userStatus;
            const user = this.buildUser(userRole);
            this.isUserAManager = userRole === Role.Manager;
            this.buildUserForm(user);
            this.userForm
                .get('address')
                ?.get('state')
                ?.valueChanges.pipe(map((value) => usStateFilter(value)))
                .subscribe((filteredStates: USState[]) => (this.states = filteredStates));
        }
    }

    private buildUser(userRole: string): User {
        const user = {
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
            phones: this.phones,
        } as any;
        return user;
    }

    getOptionText(option): string {
        return option.name;
    }

    get phoneTypes(): PhoneType[] {
        return Object.values(PhoneType);
    }

    get rolesArray(): FormArray {
        return this.userForm && (this.userForm.get('roles') as FormArray);
    }

    dateOfBirthChange(value: string): void {
        const startDate = moment(new Date(value)); // yyyy-MM-dd
        const endDate = moment(Date.now()); // yyyy-MM-dd
        this.yearsOld = endDate.diff(startDate, 'years');
    }

    get phonesArray(): FormArray {
        return this.userForm && (this.userForm.get('phoneList') as FormArray);
    }

    private buildUserForm(user: User): void {
        const {
            email,
            name: { first, middle, last },
            dateOfBirth,
            role,
            address: { line1, line2, city, state, zip },
            phones,
        } = user;
        this.userForm = this.formBuilder.group({
            email: [{ value: email || '', disabled: role !== Role.Manager }, emailValidator],
            name: this.formBuilder.group({
                first: [first || '', requiredTextValidator],
                middle: [middle || '', oneCharValidator],
                last: [last || '', requiredTextValidator],
            }),
            roles: this.formBuilder.array(
                Object.keys(Role).map((entry) => this.formBuilder.group({ role: entry, selected: role === entry.toLowerCase() }))
            ),
            dateOfBirth: [dateOfBirth || '', birthDateValidator],
            address: this.formBuilder.group({
                line1: [line1 || '', requiredTextValidator],
                line2: [line2 || '', optionalTextValidator],
                city: [city || '', requiredTextValidator],
                state: [state || '', requiredTextValidator],
                zip: [zip || '', usaZipCodeValidator],
            }),
            phoneList: this.formBuilder.array(
                phones.map((item: Phone) =>
                    this.formBuilder.group({
                        ...(item.type && { type: item.type }),
                        ...(item.id && { id: item.id }),
                        ...(item.number && { number: [item.number, usaPhoneNumberValidator] }),
                    })
                )
            ),
        });
    }

    removePhoneControl(id: number): void {
        this.phones = this.phones.filter((phone) => phone.id !== id);
        this.ngOnInit();
    }

    addPhoneControl(): void {
        this.phones = [
            ...this.phones,
            {
                id: this.phones.length + 1,
                number: '',
                type: PhoneType.Mobile,
            },
        ];
        this.ngOnInit();
    }
}
